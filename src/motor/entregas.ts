import type { Ejercicio, ItemRedaccion } from '../banco/tipos';
import { NOMBRES_EXAMEN } from '../banco/tipos';
import { palabrasRedaccion } from './corregir';

/** Cómo va el número de palabras respecto a lo que pide la tarea. */
export type BandaPalabras = 'vacio' | 'pocas' | 'bien' | 'muchas';

export function bandaPalabras(n: number, min: number, max: number): BandaPalabras {
  if (n === 0) return 'vacio';
  if (n < min) return 'pocas';
  if (n > max) return 'muchas';
  return 'bien';
}

export function avisoPalabras(n: number, min: number, max: number): string {
  switch (bandaPalabras(n, min, max)) {
    case 'vacio':
      return `Entre ${min} y ${max} palabras.`;
    case 'pocas':
      return `${n} ${n === 1 ? 'palabra' : 'palabras'} · faltan ${min - n} para llegar a ${min}`;
    case 'muchas':
      return `${n} palabras · te pasas en ${n - max} (máximo ${max})`;
    case 'bien':
      return `${n} palabras · bien`;
  }
}

/** Texto que se manda a Adam (WhatsApp, compartir del móvil): qué tarea era y lo escrito. */
export function textoParaCompartir(ejercicio: Ejercicio, item: ItemRedaccion, texto: string, nombre = ''): string {
  const quien = nombre.trim() ? `${nombre.trim()} · ` : '';
  const cabecera = `${quien}${NOMBRES_EXAMEN[ejercicio.examen]} · Part ${ejercicio.parte} · ${ejercicio.nombreParte} (${item.tipoTexto}, tarea ${item.n})`;
  return `${cabecera}\n${palabrasRedaccion(texto)} palabras\n\n${texto.trim()}`;
}

export interface Entrega {
  id: string;
  fecha: string;
  ejercicio: string;
  n: number;
  texto: string;
}

const CLAVE = 'english-lab.entregas';
const MAX = 60;

export function leerEntregas(): Entrega[] {
  try {
    const crudo = localStorage.getItem(CLAVE);
    const lista: unknown = crudo ? JSON.parse(crudo) : [];
    return Array.isArray(lista) ? (lista as Entrega[]) : [];
  } catch {
    return [];
  }
}

/** Guarda lo escrito en el móvil (por si se cierra la app antes de enviarlo). */
export function guardarEntrega(ejercicio: Ejercicio, n: number, texto: string, ahora = new Date()): void {
  if (!texto.trim()) return;
  try {
    const sin = leerEntregas().filter((e) => !(e.ejercicio === ejercicio.id && e.n === n));
    const nueva: Entrega = { id: `${ejercicio.id}-${n}-${ahora.getTime()}`, fecha: ahora.toISOString(), ejercicio: ejercicio.id, n, texto };
    localStorage.setItem(CLAVE, JSON.stringify([...sin, nueva].slice(-MAX)));
  } catch {
    // sin almacenamiento: se pierde al cerrar, el alumno puede compartirlo antes
  }
}

/** Abre el compartir del móvil si existe; si no, copia el texto y abre WhatsApp. Devuelve qué pasó para avisar. */
export async function compartir(texto: string, titulo: string): Promise<'compartido' | 'copiado' | 'nada'> {
  const nav = navigator as Navigator & { share?: (d: { title?: string; text?: string }) => Promise<void> };
  if (nav.share) {
    try {
      await nav.share({ title: titulo, text: texto });
      return 'compartido';
    } catch {
      // cancelado por el usuario o no permitido: probamos lo siguiente
    }
  }
  try {
    await navigator.clipboard.writeText(texto);
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
    return 'copiado';
  } catch {
    return 'nada';
  }
}

export function formatoReloj(segundos: number): string {
  const s = Math.max(0, Math.round(segundos));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}
