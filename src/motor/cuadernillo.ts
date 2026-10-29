import { BANCO } from '../banco';
import { ORDEN_DESTREZAS, TIPOS_EVALUABLES, type Destreza, type Ejercicio, type Examen, type Item } from '../banco/tipos';
import { alternativasDe, comunesDe, solucionDe } from './corregir';

/** Un «paper» del cuadernillo: una destreza entera con sus partes en orden. */
export interface Papel {
  destreza: Destreza;
  /** Nombre oficial en inglés para el cuadernillo («Reading and Use of English»). */
  titulo: string;
  /** Minutos oficiales del paper entero. */
  minutos: number;
  partes: Ejercicio[];
  /** Preguntas que se corrigen solas (las que van en la hoja de respuestas). */
  preguntas: number;
}

export interface Cuadernillo {
  examen: Examen;
  numero: number;
  titulo: string;
  papeles: Papel[];
}

const TITULO_EXAMEN: Record<Examen, string> = {
  c1: 'C1 Advanced · Practice test',
  pau: 'Prueba de inglés · PAU Canarias (modelo de práctica)',
};

const PAPELES: Record<Examen, { destreza: Destreza; titulo: string; minutos: number }[]> = {
  c1: [
    { destreza: 'reading-use', titulo: 'Reading and Use of English', minutos: 90 },
    { destreza: 'writing', titulo: 'Writing', minutos: 90 },
    { destreza: 'listening', titulo: 'Listening', minutos: 40 },
    { destreza: 'speaking', titulo: 'Speaking', minutos: 15 },
  ],
  pau: [{ destreza: 'prueba', titulo: 'Prueba escrita', minutos: 90 }],
};

/** Números de examen que se pueden montar enteros (hay al menos una parte con ese número). */
export function numerosCuadernillo(examen: Examen, banco: Ejercicio[] = BANCO): number[] {
  const numeros = banco.filter((e) => e.examen === examen).map((e) => e.examenNumero).filter((n): n is number => n !== undefined);
  return [...new Set(numeros)].sort((a, b) => a - b);
}

/** El examen número N entero, paper a paper y parte a parte, tal cual está en el banco (sin rellenar con otros). */
export function montarCuadernillo(examen: Examen, numero: number, banco: Ejercicio[] = BANCO): Cuadernillo | undefined {
  const propios = banco.filter((e) => e.examen === examen && e.examenNumero === numero);
  if (propios.length === 0) return undefined;
  const papeles = PAPELES[examen]
    .map((p) => {
      const partes = propios.filter((e) => e.destreza === p.destreza).sort((a, b) => a.parte - b.parte);
      return { ...p, partes, preguntas: partes.reduce((n, e) => n + e.items.filter((i) => TIPOS_EVALUABLES.has(i.tipo)).length, 0) };
    })
    .filter((p) => p.partes.length > 0)
    .sort((a, b) => ORDEN_DESTREZAS.indexOf(a.destreza) - ORDEN_DESTREZAS.indexOf(b.destreza));
  return { examen, numero, titulo: TITULO_EXAMEN[examen], papeles };
}

export interface LineaClave {
  n: number;
  item: Item;
  respuesta: string;
  tambien: string[];
  explicacion: string;
}

/** La clave de respuestas de una parte: número, respuesta, otras aceptadas y explicación (solo lo que se corrige solo). */
export function claveDe(ejercicio: Ejercicio): LineaClave[] {
  return ejercicio.items
    .filter((i) => TIPOS_EVALUABLES.has(i.tipo))
    .map((item) => ({
      n: item.n,
      item,
      respuesta: respuestaCorta(item, comunesDe(ejercicio, item)),
      tambien: alternativasDe(item),
      explicacion: 'explicacion' in item ? item.explicacion ?? '' : '',
    }));
}

/** Respuesta como va en una clave impresa: la letra en las de elegir, la palabra en las de escribir. */
function respuestaCorta(item: Item, comunes: string[]): string {
  if (item.tipo === 'opciones' || item.tipo === 'emparejar') return letra(item.correcta);
  if (item.tipo === 'verdaderoFalso') return `${item.correcta ? 'TRUE' : 'FALSE'} — “${item.pruebas[0] ?? ''}”`;
  return solucionDe(item, comunes);
}

export function letra(indice: number): string {
  return String.fromCharCode(65 + indice);
}

/** Partes del listening de un cuadernillo, para la página de audio del QR. */
export function partesListening(cuadernillo: Cuadernillo): Ejercicio[] {
  return cuadernillo.papeles.find((p) => p.destreza === 'listening')?.partes ?? [];
}
