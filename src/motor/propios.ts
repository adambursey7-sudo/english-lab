import { BANCO } from '../banco';
import { problemas } from './validar';
import type { Destreza, Ejercicio, Examen, Item, ItemOpciones, ItemPalabra, ItemVerdaderoFalso } from '../banco/tipos';

// Ejercicios que escribe el profe. Se guardan en su navegador con la misma forma que los del banco, así el generador, el
// PDF y la clave los tratan igual. Sus ids empiezan por «mio-».

export { problemas };

export const PREFIJO_PROPIO = 'mio-';
export const esPropio = (id: string) => id.startsWith(PREFIJO_PROPIO);

const CLAVE = 'english-lab.mis-ejercicios';

/** Dónde se mezcla el ejercicio y con qué datos generales (lo que pide el formulario). */
export interface DatosPropio {
  examen: Examen;
  destreza: Destreza;
  parte: number;
  titulo: string;
  instrucciones: string;
  minutos: number;
}

/** Huecos: «The cat sat [on/upon] the mat.» → texto con {{1}} y una palabra aceptada por hueco (varias separadas por /). */
export function desdeHuecos(texto: string): { texto: string; items: ItemPalabra[] } {
  const items: ItemPalabra[] = [];
  const nuevo = texto.replace(/\[([^\]]+)\]/g, (_, dentro: string) => {
    const n = items.length + 1;
    const correctas = dentro.split('/').map((x) => x.trim()).filter(Boolean);
    items.push({ n, tipo: 'palabra', correctas, explicacion: `Respuesta: ${correctas.join(' / ')}.` });
    return `{{${n}}}`;
  });
  return { texto: nuevo, items };
}

/** Opción múltiple: bloques separados por una línea en blanco; primera línea = pregunta; las demás, opciones, con * la correcta. */
export function desdeOpciones(texto: string): ItemOpciones[] {
  const items: ItemOpciones[] = [];
  for (const bloque of texto.split(/\n\s*\n/)) {
    const lineas = bloque.split('\n').map((l) => l.trim()).filter(Boolean);
    if (lineas.length < 3) continue;
    const opciones = lineas.slice(1).map((l) => l.replace(/^\*\s*/, '').replace(/^[A-Da-d][).]\s+/, ''));
    const correcta = lineas.slice(1).findIndex((l) => l.startsWith('*'));
    items.push({ n: items.length + 1, tipo: 'opciones', pregunta: lineas[0], opciones, correcta, explicacion: correcta >= 0 ? `Correcta: ${opciones[correcta]}.` : '' });
  }
  return items;
}

/** Verdadero/falso con prueba: una línea por afirmación, «TRUE | afirmación | frase del texto que lo prueba». */
export function desdeVerdaderoFalso(texto: string): ItemVerdaderoFalso[] {
  const items: ItemVerdaderoFalso[] = [];
  for (const linea of texto.split('\n')) {
    const [vf, afirmacion, ...resto] = linea.split('|').map((x) => x.trim());
    if (!afirmacion || !/^(true|false)$/i.test(vf)) continue;
    const prueba = resto.join('|').trim();
    items.push({ n: items.length + 1, tipo: 'verdaderoFalso', afirmacion, correcta: /^true$/i.test(vf), pruebas: prueba ? [prueba] : [], explicacion: prueba ? `Prueba: «${prueba}»` : '' });
  }
  return items;
}

export const nuevoIdPropio = () => `${PREFIJO_PROPIO}${Date.now().toString(36)}${Math.floor(Math.random() * 1e5).toString(36)}`;

/** Monta el ejercicio a partir de los datos y los items ya leídos. */
export function montarPropio(d: DatosPropio, items: Item[], texto: string | undefined, id: string = nuevoIdPropio()): Ejercicio {
  return {
    id,
    examen: d.examen,
    destreza: d.destreza,
    parte: d.parte,
    nombreParte: d.titulo.trim() || 'Mi ejercicio',
    titulo: d.titulo.trim() || undefined,
    instrucciones: d.instrucciones.trim(),
    minutos: Math.max(1, Math.min(120, Math.round(d.minutos) || 10)),
    texto: texto?.trim() || undefined,
    items,
  };
}

/** Limpia lo que venga guardado: solo ejercicios con id propio, de un examen conocido y sin problemas. */
export function propioValido(v: unknown): Ejercicio | null {
  if (!v || typeof v !== 'object') return null;
  const e = v as Ejercicio;
  if (typeof e.id !== 'string' || !esPropio(e.id) || (e.examen !== 'c1' && e.examen !== 'pau') || !Array.isArray(e.items)) return null;
  if (typeof e.instrucciones !== 'string' || typeof e.nombreParte !== 'string' || !Number.isInteger(e.parte) || typeof e.destreza !== 'string') return null;
  return problemas(e).length === 0 ? e : null;
}

export function leerPropios(): Ejercicio[] {
  try {
    const bruto = JSON.parse(localStorage.getItem(CLAVE) ?? '[]');
    return Array.isArray(bruto) ? bruto.map(propioValido).filter((e): e is Ejercicio => e !== null) : [];
  } catch {
    return [];
  }
}

export function escribirPropios(lista: Ejercicio[]): void {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(lista));
  } catch {
    /* sin almacenamiento: valen solo mientras la página siga abierta */
  }
}

export function exportarPropios(lista: Ejercicio[]): string {
  return JSON.stringify({ version: 1, ejercicios: lista }, null, 2);
}

/** Lee un paquete de ejercicios; null si el archivo no lo es. */
export function importarPropios(texto: string): Ejercicio[] | null {
  try {
    const bruto = JSON.parse(texto) as { ejercicios?: unknown };
    if (!bruto || !Array.isArray(bruto.ejercicios)) return null;
    return bruto.ejercicios.map(propioValido).filter((e): e is Ejercicio => e !== null);
  } catch {
    return null;
  }
}

/** El banco de la app más los ejercicios del profe: lo que usa el generador. */
export function bancoCompleto(propios: Ejercicio[] = leerPropios()): Ejercicio[] {
  return [...BANCO, ...propios];
}

/** Lo que escribió el profe en el formulario, para poder editar el ejercicio después (el ejercicio ya montado no lo recuerda). */
export interface Fuente {
  plantilla: 'huecos' | 'opciones' | 'vf' | 'redaccion';
  datos: DatosPropio;
  texto: string;
  items: string;
  minPalabras: number;
  maxPalabras: number;
  modelo: string;
}

const CLAVE_FUENTES = 'english-lab.mis-ejercicios-fuente';

export function leerFuentes(): Record<string, Fuente> {
  try {
    const bruto = JSON.parse(localStorage.getItem(CLAVE_FUENTES) ?? '{}');
    return bruto && typeof bruto === 'object' && !Array.isArray(bruto) ? (bruto as Record<string, Fuente>) : {};
  } catch {
    return {};
  }
}

export function escribirFuentes(f: Record<string, Fuente>): void {
  try {
    localStorage.setItem(CLAVE_FUENTES, JSON.stringify(f));
  } catch {
    /* sin almacenamiento */
  }
}

/** Del formulario al ejercicio: según la plantilla lee los huecos, las opciones, el verdadero/falso o la redacción. */
export function ejercicioDesde(f: Fuente, id?: string): Ejercicio {
  switch (f.plantilla) {
    case 'huecos': {
      const { texto, items } = desdeHuecos(f.texto);
      return montarPropio(f.datos, items, texto, id);
    }
    case 'opciones':
      return montarPropio(f.datos, desdeOpciones(f.items), f.texto, id);
    case 'vf':
      return montarPropio(f.datos, desdeVerdaderoFalso(f.items), f.texto, id);
    case 'redaccion':
      return montarPropio(
        f.datos,
        [{ n: 1, tipo: 'redaccion', tipoTexto: 'essay', enunciado: f.texto.trim(), minPalabras: f.minPalabras, maxPalabras: f.maxPalabras, modelo: f.modelo.trim(), criterios: [] }],
        undefined,
        id,
      );
  }
}
