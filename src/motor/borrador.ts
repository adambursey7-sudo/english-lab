import type { Ejercicio, Respuestas } from '../banco/tipos';

/**
 * Lo que se guarda para poder seguir donde se dejó si el alumno cierra la app (o el iPhone la descarga de memoria)
 * a mitad de un ejercicio: qué ejercicios, en cuál va, qué ha contestado y cuándo arrancó el reloj de cada uno.
 */
export interface Borrador {
  ids: string[];
  i: number;
  respuestas: Record<string, Respuestas>;
  inicios: Record<string, number>;
  guardado: number;
}

const CLAVE = 'english-lab.borrador';
/** Pasado este tiempo ya no se ofrece seguir: el reloj del examen no tendría sentido. */
export const CADUCA_MS = 24 * 60 * 60 * 1000;

const clave = (perfilId?: string) => `${CLAVE}:${perfilId ?? 'invitado'}`;

export function guardarBorrador(perfilId: string | undefined, b: Omit<Borrador, 'guardado'>, ahora = Date.now()): void {
  try {
    localStorage.setItem(clave(perfilId), JSON.stringify({ ...b, guardado: ahora }));
  } catch {
    // Sin almacenamiento (modo privado, lleno): se practica igual, solo que no se podrá reanudar.
  }
}

export function borrarBorrador(perfilId?: string): void {
  try {
    localStorage.removeItem(clave(perfilId));
  } catch {
    // nada
  }
}

/** El borrador de este alumno si existe, es reciente y todos sus ejercicios siguen en el banco; si no, `undefined`. */
export function leerBorrador(perfilId: string | undefined, existe: (id: string) => boolean, ahora = Date.now()): Borrador | undefined {
  try {
    const crudo = localStorage.getItem(clave(perfilId));
    if (!crudo) return undefined;
    const b = JSON.parse(crudo) as Partial<Borrador>;
    if (!Array.isArray(b.ids) || b.ids.length === 0 || !b.ids.every((x) => typeof x === 'string' && existe(x))) return undefined;
    if (typeof b.i !== 'number' || b.i < 0 || b.i >= b.ids.length) return undefined;
    if (typeof b.guardado !== 'number' || ahora - b.guardado > CADUCA_MS) return undefined;
    const respuestas = b.respuestas && typeof b.respuestas === 'object' ? b.respuestas : {};
    const inicios = b.inicios && typeof b.inicios === 'object' ? b.inicios : {};
    return { ids: b.ids, i: b.i, respuestas, inicios, guardado: b.guardado };
  } catch {
    return undefined;
  }
}

/** ¿Hay algo que merezca la pena guardar? (Un ejercicio recién abierto y sin tocar, no.) */
export function tieneRespuestas(respuestas: Record<string, Respuestas>): boolean {
  return Object.values(respuestas).some((r) => Object.values(r).some((v) => v.trim() !== ''));
}

export function resumenBorrador(lista: Ejercicio[], i: number): string {
  const e = lista[i];
  return lista.length > 1 ? `${e.nombreParte} · ${i + 1} de ${lista.length}` : e.nombreParte;
}
