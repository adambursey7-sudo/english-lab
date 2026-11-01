import { BANCO } from '../banco';
import { ORDEN_DESTREZAS, TIPOS_EVALUABLES, type Destreza, type Ejercicio, type Examen, type Item } from '../banco/tipos';
import { PAPELES_DE, TITULO_EXAMEN, type Cuadernillo, type Papel } from './cuadernillo';

/** Qué se pide de una parte: cuántos ejercicios de esa parte entran en el examen. */
export interface PedidoParte {
  destreza: Destreza;
  parte: number;
  cuantos: number;
}

/** La receta con la que se monta un examen: con la misma receta (y semilla) sale siempre el mismo examen. */
export interface Receta {
  examen: Examen;
  partes: PedidoParte[];
  semilla: number;
  /** Versión del examen: la B reordena las opciones sin romper la clave. */
  version: 'A' | 'B';
  /** Ids de ejercicios ya usados con este grupo: se evitan mientras queden otros. */
  evitar: string[];
  /** Solo ejercicios que la app corrige sola (sin writing ni speaking). */
  soloAutomaticos: boolean;
}

export interface ExamenGenerado extends Cuadernillo {
  receta: Receta;
  /** Ids de los ejercicios usados, para apuntarlos en el historial de uso. */
  ids: string[];
  /** Partes pedidas que no se pudieron cubrir del todo (no hay tantos ejercicios en el banco). */
  faltan: PedidoParte[];
}

/** Generador de números pseudoaleatorios con semilla (mulberry32): determinista y suficiente para barajar. */
export function azar(semilla: number): () => number {
  let a = semilla >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function barajar<T>(lista: readonly T[], rnd: () => number): T[] {
  const r = [...lista];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

const esAutomatico = (e: Ejercicio) => e.items.some((i) => TIPOS_EVALUABLES.has(i.tipo));

/** Los ejercicios del banco que sirven para una parte (con la receta dada). */
export function candidatos(receta: Pick<Receta, 'examen' | 'soloAutomaticos'>, p: Pick<PedidoParte, 'destreza' | 'parte'>, banco: Ejercicio[] = BANCO): Ejercicio[] {
  return banco.filter((e) => e.examen === receta.examen && e.destreza === p.destreza && e.parte === p.parte && (!receta.soloAutomaticos || esAutomatico(e)));
}

/** Cambia el orden de las opciones de un item de opción múltiple y reajusta cuál es la correcta. */
function barajarOpciones(item: Item, rnd: () => number): Item {
  if (item.tipo !== 'opciones') return item;
  const orden = barajar(item.opciones.map((_, i) => i), rnd);
  return { ...item, opciones: orden.map((i) => item.opciones[i]), correcta: orden.indexOf(item.correcta) };
}

/** Versión B de un ejercicio: opciones de cada pregunta en otro orden (la clave se recalcula sola). */
function versionB(e: Ejercicio, rnd: () => number): Ejercicio {
  return { ...e, items: e.items.map((i) => barajarOpciones(i, rnd)) };
}

/** Monta un examen a partir de una receta. No toca el banco. */
export function generarExamen(receta: Receta, banco: Ejercicio[] = BANCO): ExamenGenerado {
  const rnd = azar(receta.semilla);
  const usados = new Set(receta.evitar);
  const elegidos: Ejercicio[] = [];
  const faltan: PedidoParte[] = [];
  for (const p of receta.partes) {
    const todos = candidatos(receta, p, banco);
    // Primero los que no se han usado con este grupo; si no bastan, se completa con los ya usados.
    const nuevos = barajar(todos.filter((e) => !usados.has(e.id)), rnd);
    const repetidos = barajar(todos.filter((e) => usados.has(e.id)), rnd);
    const tomados = [...nuevos, ...repetidos].slice(0, p.cuantos);
    if (tomados.length < p.cuantos) faltan.push({ ...p, cuantos: p.cuantos - tomados.length });
    elegidos.push(...tomados);
  }
  const resultado = receta.version === 'B' ? elegidos.map((e) => versionB(e, rnd)) : elegidos;
  const papeles: Papel[] = PAPELES_DE[receta.examen]
    .map((pp) => {
      const partes = resultado.filter((e) => e.destreza === pp.destreza).sort((a, b) => a.parte - b.parte);
      const preguntas = partes.reduce((n, e) => n + e.items.filter((i) => TIPOS_EVALUABLES.has(i.tipo)).length, 0);
      return { ...pp, partes, preguntas };
    })
    .filter((pp) => pp.partes.length > 0)
    .sort((a, b) => ORDEN_DESTREZAS.indexOf(a.destreza) - ORDEN_DESTREZAS.indexOf(b.destreza));
  return {
    examen: receta.examen,
    numero: receta.semilla,
    titulo: TITULO_EXAMEN[receta.examen],
    papeles,
    generado: true,
    etiqueta: `Test ${receta.semilla} · Version ${receta.version}`,
    receta,
    ids: resultado.map((e) => e.id),
    faltan,
  };
}

/** Receta de un examen completo: una de cada parte que existe en el banco. */
export function recetaCompleta(examen: Examen, semilla: number, banco: Ejercicio[] = BANCO): Receta {
  const claves = new Map<string, PedidoParte>();
  for (const e of banco.filter((x) => x.examen === examen)) claves.set(`${e.destreza}/${e.parte}`, { destreza: e.destreza, parte: e.parte, cuantos: 1 });
  const partes = [...claves.values()].sort((a, b) => ORDEN_DESTREZAS.indexOf(a.destreza) - ORDEN_DESTREZAS.indexOf(b.destreza) || a.parte - b.parte);
  return { examen, partes, semilla, version: 'A', evitar: [], soloAutomaticos: false };
}
