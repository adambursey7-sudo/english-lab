import { NOMBRES_DESTREZA, NOMBRES_EXAMEN, etiquetaParte, type Destreza, type Examen } from '../banco/tipos';

/**
 * Notas que pone Adam (speaking, writing…). Viven en `public/notas/notas.json`, que Adam actualiza con
 * `node scripts/nota.mjs` y sube a GitHub Pages; la app las descarga al abrir «Mi progreso» y guarda la última copia
 * en el móvil para verlas sin conexión.
 */
export interface NotaProfe {
  /** AAAA-MM-DD */
  fecha: string;
  examen: Examen;
  destreza: Destreza;
  nota: number;
  /** Sobre cuánto (10 si falta). */
  sobre?: number;
  /** Número del examen (examen 1, 2…), si lo hay. */
  numero?: number;
  parte?: number;
  comentario?: string;
}

/** id del alumno → sus notas. */
export type NotasProfe = Record<string, NotaProfe[]>;

const CLAVE = 'english-lab.notas';
const EXAMENES: readonly string[] = ['c1', 'pau'];
const DESTREZAS: readonly string[] = ['reading-use', 'writing', 'listening', 'speaking', 'prueba'];

function esNota(x: unknown): x is NotaProfe {
  if (typeof x !== 'object' || x === null) return false;
  const n = x as Record<string, unknown>;
  return typeof n.fecha === 'string' && EXAMENES.includes(n.examen as string) && DESTREZAS.includes(n.destreza as string) && typeof n.nota === 'number' && Number.isFinite(n.nota);
}

/** Se queda solo con lo que tiene forma de nota; las claves que empiezan por «_» son ayuda para quien edita el archivo. */
export function filtrarNotas(crudo: unknown): NotasProfe {
  if (typeof crudo !== 'object' || crudo === null || Array.isArray(crudo)) return {};
  const limpio: NotasProfe = {};
  for (const [id, lista] of Object.entries(crudo as Record<string, unknown>)) {
    if (id.startsWith('_') || !Array.isArray(lista)) continue;
    limpio[id] = lista.filter(esNota);
  }
  return limpio;
}

export function leerNotasGuardadas(): NotasProfe {
  try {
    const crudo = localStorage.getItem(CLAVE);
    return crudo ? filtrarNotas(JSON.parse(crudo)) : {};
  } catch {
    return {};
  }
}

/** Descarga las notas publicadas; si no hay red, devuelve la última copia guardada en el móvil. */
export async function cargarNotas(base: string = import.meta.env.BASE_URL): Promise<NotasProfe> {
  try {
    const respuesta = await fetch(`${base}notas/notas.json?t=${Date.now()}`, { cache: 'no-store' });
    if (!respuesta.ok) throw new Error(String(respuesta.status));
    const notas = filtrarNotas(await respuesta.json());
    try {
      localStorage.setItem(CLAVE, JSON.stringify(notas));
    } catch {
      // sin almacenamiento: se verán igualmente esta vez
    }
    return notas;
  } catch {
    return leerNotasGuardadas();
  }
}

/** Las notas de un alumno, las más recientes primero. */
export function notasDe(notas: NotasProfe, perfilId: string | undefined): NotaProfe[] {
  if (!perfilId) return [];
  return [...(notas[perfilId] ?? [])].sort((a, b) => b.fecha.localeCompare(a.fecha));
}

/** Nota pasada a sobre 10 (Adam puede poner «4 sobre 5» en el speaking de Cambridge). */
export function sobreDiez(n: NotaProfe): number {
  const sobre = n.sobre && n.sobre > 0 ? n.sobre : 10;
  return Math.round((n.nota / sobre) * 100) / 10;
}

/** Media sobre 10 de una lista de notas, o null si está vacía. */
export function mediaNotas(lista: NotaProfe[]): number | null {
  if (lista.length === 0) return null;
  return Math.round((lista.reduce((s, n) => s + sobreDiez(n), 0) / lista.length) * 10) / 10;
}

export function textoNota(n: number): string {
  return n.toFixed(1).replace(/\.0$/, '').replace('.', ',');
}

/** «Speaking · examen 1 · Part 2» */
export function tituloNota(n: NotaProfe): string {
  const trozos = [NOMBRES_DESTREZA[n.destreza]];
  if (n.numero) trozos.push(`examen ${n.numero}`);
  if (n.parte) trozos.push(etiquetaParte(n.examen, n.parte));
  return trozos.join(' · ');
}

export function fechaNota(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });
}

export function nombreExamenNota(n: NotaProfe): string {
  return NOMBRES_EXAMEN[n.examen];
}
