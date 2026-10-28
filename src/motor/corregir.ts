import type { Ejercicio, Item, Respuestas } from '../banco/tipos';
import { TIPOS_EVALUABLES } from '../banco/tipos';

/** Deja una respuesta escrita lista para comparar: minúsculas, sin espacios de más, sin puntuación de los extremos, comillas rectas. */
export function normaliza(texto: string): string {
  return texto
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^["'(]+|["'),.;:!?]+$/g, '')
    .trim();
}

export interface ItemCorregido {
  item: Item;
  /** Lo que escribió el alumno, tal cual (vacío si no contestó). */
  respuesta: string;
  /** La respuesta buena para mostrar (la primera aceptada, o el modelo). */
  solucion: string;
  correcto: boolean;
  /** false en redacción y speaking: no se corrige sola, se manda a Adam. */
  evaluable: boolean;
}

export function solucionDe(item: Item, comunes: string[] = []): string {
  switch (item.tipo) {
    case 'opciones':
      return item.opciones[item.correcta] ?? '';
    case 'emparejar':
      return `${letra(item.correcta)} ${comunes[item.correcta] ?? ''}`.trim();
    case 'palabra':
    case 'transformacion':
      return item.correctas[0] ?? '';
    case 'verdaderoFalso':
      return `${item.correcta ? 'TRUE' : 'FALSE'} — “${item.pruebas[0] ?? ''}”`;
    case 'redaccion':
      return item.modelo;
    case 'hablar':
      return item.modelo ?? '';
  }
}

/** Separa una respuesta de verdadero/falso en las dos partes: la palabra y la prueba copiada. */
export function partesVerdaderoFalso(respuesta: string): { valor: boolean | null; prueba: string } {
  const [primera = '', ...resto] = respuesta.split('\n');
  const palabra = primera.trim().toUpperCase();
  const valor = palabra === 'TRUE' ? true : palabra === 'FALSE' ? false : null;
  return { valor, prueba: resto.join('\n').trim() };
}

export function corrigeItem(item: Item, respuesta: string | undefined, comunes: string[] = []): ItemCorregido {
  const dada = respuesta ?? '';
  const evaluable = TIPOS_EVALUABLES.has(item.tipo);
  let correcto = false;
  switch (item.tipo) {
    case 'opciones':
    case 'emparejar':
      correcto = dada !== '' && Number(dada) === item.correcta;
      break;
    case 'palabra': {
      const limpia = normaliza(dada);
      const cabe = item.maxPalabras === undefined || cuentaPalabras(limpia) <= item.maxPalabras;
      correcto = limpia !== '' && cabe && item.correctas.some((c) => normaliza(c) === limpia);
      break;
    }
    case 'transformacion': {
      const limpia = normaliza(dada);
      correcto = limpia !== '' && item.correctas.some((c) => normaliza(c) === limpia);
      break;
    }
    case 'verdaderoFalso': {
      const { valor, prueba } = partesVerdaderoFalso(dada);
      const limpia = normaliza(prueba);
      correcto = valor === item.correcta && limpia !== '' && item.pruebas.some((p) => normaliza(p) === limpia);
      break;
    }
    case 'redaccion':
    case 'hablar':
      correcto = false;
  }
  return { item, respuesta: dada, solucion: solucionDe(item, comunes), correcto, evaluable };
}

export interface EjercicioCorregido {
  ejercicio: Ejercicio;
  items: ItemCorregido[];
  aciertos: number;
  /** Items que se corrigen solos. */
  total: number;
  /** Items de texto libre contestados, pendientes de que los corrija Adam. */
  pendientes: number;
}

export function corrigeEjercicio(ejercicio: Ejercicio, respuestas: Respuestas): EjercicioCorregido {
  const items = ejercicio.items.map((item) => corrigeItem(item, respuestas[item.n], ejercicio.opcionesComunes));
  const evaluables = items.filter((i) => i.evaluable);
  return {
    ejercicio,
    items,
    aciertos: evaluables.filter((i) => i.correcto).length,
    total: evaluables.length,
    pendientes: items.filter((i) => !i.evaluable && i.respuesta.trim() !== '').length,
  };
}

/** Lo que el alumno ve en la opción elegida (letra y texto), o vacío si no eligió. */
export function textoRespuesta(c: ItemCorregido, comunes: string[] = []): string {
  if (c.item.tipo === 'opciones' || c.item.tipo === 'emparejar') {
    const i = Number(c.respuesta);
    if (c.respuesta === '' || Number.isNaN(i)) return '';
    const lista = c.item.tipo === 'opciones' ? c.item.opciones : comunes;
    return `${letra(i)} ${lista[i] ?? ''}`.trim();
  }
  if (c.item.tipo === 'verdaderoFalso') {
    const { valor, prueba } = partesVerdaderoFalso(c.respuesta);
    return valor === null ? '' : `${valor ? 'TRUE' : 'FALSE'}${prueba ? ` — “${prueba}”` : ''}`;
  }
  return c.respuesta;
}

/** Otras respuestas aceptadas además de la primera (para enseñar «también: …»). */
export function alternativasDe(item: Item): string[] {
  if (item.tipo === 'palabra' || item.tipo === 'transformacion') return item.correctas.slice(1);
  if (item.tipo === 'verdaderoFalso') return item.pruebas.slice(1);
  return [];
}

export function letra(indice: number): string {
  return String.fromCharCode(65 + indice);
}

/** Cuenta palabras de una transformación (las contracciones cuentan como dos, como en Cambridge). */
export function cuentaPalabras(texto: string): number {
  const limpia = normaliza(texto);
  if (!limpia) return 0;
  return limpia.split(' ').reduce((n, p) => n + (/\w'\w/.test(p) ? 2 : 1), 0);
}

/** Palabras de una redacción (como las cuenta un corrector: trozos separados por espacios). */
export function palabrasRedaccion(texto: string): number {
  const limpia = texto.trim();
  return limpia === '' ? 0 : limpia.split(/\s+/).length;
}
