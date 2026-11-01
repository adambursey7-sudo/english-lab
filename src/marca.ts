// Marca de la app: nombre, logo y color. En la versión de clase es la de Kate (fija); en la de producto la
// academia que compra la pone en el asistente de primera vez y se guarda en su navegador (nada sale de él).
export const ES_PRODUCTO = import.meta.env.MODE === 'producto';

export interface Marca {
  /** Nombre que sale en cabeceras y en el PDF. */
  nombre: string;
  /** Logo como ruta o data URL; vacío = sin logo. */
  logo: string;
  /** Texto alternativo del logo. */
  logoAlt: string;
  /** Color principal (cabeceras y PDF). */
  color: string;
}

const CLAVE = 'english-lab.marca';

/** Nombre provisional del producto (Adam aún no ha elegido el definitivo). */
export const NOMBRE_PRODUCTO = 'English Lab';

const CLASE: Marca = { nombre: 'English Lab', logo: 'img/logo.png', logoAlt: 'Aprende Inglés con Kate', color: '#34502b' };
const BASE: Marca = { nombre: NOMBRE_PRODUCTO, logo: '', logoAlt: '', color: '#34502b' };

const COLOR = /^#[0-9a-f]{6}$/i;

/** Limpia lo que venga guardado: tipos y longitudes razonables, color válido; lo que falte se rellena con la base. */
export function marcaDesde(guardado: unknown): Marca {
  if (!guardado || typeof guardado !== 'object') return { ...BASE };
  const g = guardado as Record<string, unknown>;
  const texto = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
  const logo = typeof g.logo === 'string' && g.logo.startsWith('data:image/') && g.logo.length < 400_000 ? g.logo : '';
  return {
    nombre: texto(g.nombre, 60) || BASE.nombre,
    logo,
    logoAlt: texto(g.nombre, 60) || BASE.logoAlt,
    color: typeof g.color === 'string' && COLOR.test(g.color) ? g.color : BASE.color,
  };
}

export function leerMarca(): Marca {
  if (!ES_PRODUCTO) return CLASE;
  try {
    return marcaDesde(JSON.parse(localStorage.getItem(CLAVE) ?? 'null'));
  } catch {
    return { ...BASE };
  }
}

export function guardarMarca(m: Partial<Marca>): Marca {
  const nueva = marcaDesde({ ...leerMarca(), ...m });
  try {
    localStorage.setItem(CLAVE, JSON.stringify(nueva));
  } catch {
    /* sin almacenamiento: la marca vale solo mientras la página siga abierta */
  }
  return nueva;
}

/** Ruta del logo lista para un <img> (los de datos van tal cual; los del proyecto cuelgan de la base de la app). */
export function urlLogo(m: Marca, base: string = import.meta.env.BASE_URL): string {
  if (!m.logo) return '';
  return m.logo.startsWith('data:') ? m.logo : `${base}${m.logo}`;
}

/** ¿Se enseñan perfiles con PIN, intro y viñetas de Kate? Solo en la versión de clase. */
export const MODO_CLASE = !ES_PRODUCTO;

/** Cómo llama la app a quien corrige: Adam en la clase de Kate, «tu profe» en el producto. */
export const PROFE = MODO_CLASE ? 'Adam' : 'tu profe';

/** ¿La academia ya pasó por el asistente de primera vez? Solo tiene sentido en producto. */
export function marcaConfigurada(): boolean {
  try {
    return localStorage.getItem(CLAVE) !== null;
  } catch {
    return true; // sin almacenamiento no se puede recordar: no se insiste con el asistente
  }
}

/** Pinta el color de la academia en la app (en la versión de clase no se toca). */
export function aplicarColor(m: Marca = leerMarca()) {
  if (ES_PRODUCTO) document.documentElement.style.setProperty('--ok', m.color);
}
