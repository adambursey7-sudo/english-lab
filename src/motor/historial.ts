import { destrezasDe, ejerciciosDe, partesDe } from '../banco';
import type { Destreza, Examen } from '../banco/tipos';
import { perfilActivo } from './perfiles';

/** Un ejercicio corregido en este móvil: cuántas acertó de cuántas se corrigen solas (0 de 0 en Writing y Speaking). */
export interface Registro {
  id: string;
  fecha: string;
  aciertos: number;
  total: number;
}

const CLAVE = 'english-lab.historial';
const MAX = 500;

/** Cada alumno tiene su historial en el móvil; sin alumno elegido se usa la clave antigua. */
function claveDe(perfilId: string | undefined): string {
  return perfilId ? `${CLAVE}:${perfilId}` : CLAVE;
}

export function leerHistorial(perfilId: string | undefined = perfilActivo()?.id): Registro[] {
  try {
    const crudo = localStorage.getItem(claveDe(perfilId));
    const lista: unknown = crudo ? JSON.parse(crudo) : [];
    return Array.isArray(lista) ? lista.filter((r): r is Registro => typeof r === 'object' && r !== null && typeof (r as Registro).id === 'string') : [];
  } catch {
    return [];
  }
}

/** Apunta los ejercicios recién corregidos (los más recientes al final). Sin almacenamiento, no pasa nada. */
export function apuntarResultado(resultados: Omit<Registro, 'fecha'>[], ahora = new Date(), perfilId: string | undefined = perfilActivo()?.id): void {
  if (resultados.length === 0) return;
  try {
    const fecha = ahora.toISOString();
    const nuevos = resultados.map((r) => ({ ...r, fecha }));
    localStorage.setItem(claveDe(perfilId), JSON.stringify([...leerHistorial(perfilId), ...nuevos].slice(-MAX)));
  } catch {
    // Sin almacenamiento (modo privado): el inicio no enseñará progreso, nada más.
  }
}

/** Borra todo el historial de este alumno en este móvil (lo pide desde «Mi progreso»). */
export function borrarHistorial(perfilId: string | undefined = perfilActivo()?.id): void {
  try {
    localStorage.removeItem(claveDe(perfilId));
  } catch {
    // Sin almacenamiento no hay nada que borrar.
  }
}

export function porcentaje(r: Pick<Registro, 'aciertos' | 'total'>): number {
  return r.total === 0 ? 0 : Math.round((r.aciertos / r.total) * 100);
}

/** La mejor vez que se hizo un ejercicio (por porcentaje); solo cuenta lo que se corrige solo. */
export function mejorNota(historial: Registro[], id: string): Registro | undefined {
  return historial.filter((r) => r.id === id && r.total > 0).reduce<Registro | undefined>((mejor, r) => (!mejor || porcentaje(r) > porcentaje(mejor) ? r : mejor), undefined);
}

/** La mejor nota de una parte (cualquiera de sus ejercicios). */
export function mejorDeParte(historial: Registro[], examen: Examen, destreza: Destreza, parte: number): Registro | undefined {
  const ids = ejerciciosDe(examen, destreza).filter((e) => e.parte === parte).map((e) => e.id);
  return ids.map((id) => mejorNota(historial, id)).reduce<Registro | undefined>((mejor, r) => (r && (!mejor || porcentaje(r) > porcentaje(mejor)) ? r : mejor), undefined);
}

export interface ResumenDestreza {
  /** Partes distintas que hay en el banco. */
  partes: number;
  /** Partes de las que se ha hecho al menos un ejercicio (también las que no se corrigen solas). */
  hechas: number;
  /** Media de las mejores notas de las partes que se corrigen solas, o null si no hay ninguna. */
  media: number | null;
}

export function resumenDestreza(historial: Registro[], examen: Examen, destreza: Destreza): ResumenDestreza {
  const ejercicios = ejerciciosDe(examen, destreza);
  const partes = [...new Set(ejercicios.map((e) => e.parte))];
  const hechosIds = new Set(historial.map((r) => r.id));
  const hechas = partes.filter((p) => ejercicios.some((e) => e.parte === p && hechosIds.has(e.id)));
  const notas = partes.map((p) => mejorDeParte(historial, examen, destreza, p)).filter((r): r is Registro => r !== undefined).map(porcentaje);
  return { partes: partes.length, hechas: hechas.length, media: notas.length === 0 ? null : Math.round(notas.reduce((a, b) => a + b, 0) / notas.length) };
}

/** Ejercicios hechos en los últimos siete días. */
export function hechosEstaSemana(historial: Registro[], ahora = new Date()): number {
  const desde = ahora.getTime() - 7 * 24 * 3600 * 1000;
  return historial.filter((r) => Date.parse(r.fecha) >= desde).length;
}

/** Cómo va una parte que se corrige sola: floja (< 50 %), regular (50–69 %), bien (≥ 70 %) o sin hacer. */
export type EstadoParte = 'floja' | 'regular' | 'bien' | 'sin-hacer';

export interface ParteParaMejorar {
  examen: Examen;
  destreza: Destreza;
  parte: number;
  nombreParte: string;
  estado: EstadoParte;
  /** La mejor vez, si la hay. */
  mejor?: Registro;
  /** Veces que se ha hecho. */
  veces: number;
}

export function estadoDe(p: number | undefined): EstadoParte {
  if (p === undefined) return 'sin-hacer';
  if (p >= 70) return 'bien';
  if (p >= 50) return 'regular';
  return 'floja';
}

/**
 * Dónde hay que mejorar en un examen: las partes que se corrigen solas, de peor a mejor (primero las flojas, luego las
 * regulares, luego las que faltan por hacer y al final las que ya van bien). Writing y Speaking no entran: esas las
 * puntúa Adam y salen en «Notas de Adam».
 */
export function paraMejorar(historial: Registro[], examen: Examen): ParteParaMejorar[] {
  const orden: Record<EstadoParte, number> = { floja: 0, regular: 1, 'sin-hacer': 2, bien: 3 };
  const lista: ParteParaMejorar[] = [];
  for (const destreza of destrezasDe(examen)) {
    const ejercicios = ejerciciosDe(examen, destreza);
    for (const p of partesDe(examen, destreza)) {
      const deLaParte = ejercicios.filter((e) => e.parte === p.parte);
      if (!deLaParte.some((e) => e.items.some((i) => i.tipo !== 'redaccion' && i.tipo !== 'hablar'))) continue;
      const ids = new Set(deLaParte.map((e) => e.id));
      const mejor = mejorDeParte(historial, examen, destreza, p.parte);
      lista.push({
        examen,
        destreza,
        parte: p.parte,
        nombreParte: p.nombreParte,
        estado: estadoDe(mejor ? porcentaje(mejor) : undefined),
        mejor,
        veces: historial.filter((r) => ids.has(r.id)).length,
      });
    }
  }
  return lista.sort((a, b) => orden[a.estado] - orden[b.estado] || porcentaje(a.mejor ?? { aciertos: 0, total: 0 }) - porcentaje(b.mejor ?? { aciertos: 0, total: 0 }) || a.destreza.localeCompare(b.destreza) || a.parte - b.parte);
}
