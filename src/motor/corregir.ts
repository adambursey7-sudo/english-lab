import type { Ejercicio, Item, Respuestas } from '../banco/tipos';

/** Deja una respuesta escrita lista para comparar: minúsculas, sin espacios de más, sin punto final, comillas rectas. */
export function normaliza(texto: string): string {
  return texto
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[.!?]+$/, '')
    .trim();
}

export interface ItemCorregido {
  item: Item;
  /** Lo que escribió el alumno, tal cual (vacío si no contestó). */
  respuesta: string;
  /** La respuesta buena para mostrar (la primera aceptada). */
  solucion: string;
  correcto: boolean;
}

export function solucionDe(item: Item): string {
  return item.tipo === 'opciones' ? item.opciones[item.correcta] : item.correctas[0];
}

export function corrigeItem(item: Item, respuesta: string | undefined): ItemCorregido {
  const dada = respuesta ?? '';
  let correcto = false;
  if (item.tipo === 'opciones') {
    correcto = dada !== '' && Number(dada) === item.correcta;
  } else {
    const limpia = normaliza(dada);
    correcto = limpia !== '' && item.correctas.some((c) => normaliza(c) === limpia);
  }
  return { item, respuesta: dada, solucion: solucionDe(item), correcto };
}

export interface EjercicioCorregido {
  ejercicio: Ejercicio;
  items: ItemCorregido[];
  aciertos: number;
  total: number;
}

export function corrigeEjercicio(ejercicio: Ejercicio, respuestas: Respuestas): EjercicioCorregido {
  const items = ejercicio.items.map((item) => corrigeItem(item, respuestas[item.n]));
  return { ejercicio, items, aciertos: items.filter((i) => i.correcto).length, total: items.length };
}

/** Lo que el alumno ve en la opción elegida (letra y texto), o vacío si no eligió. */
export function textoRespuesta(c: ItemCorregido): string {
  if (c.item.tipo !== 'opciones') return c.respuesta;
  const i = Number(c.respuesta);
  return c.respuesta === '' || Number.isNaN(i) ? '' : `${letra(i)} ${c.item.opciones[i] ?? ''}`;
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
