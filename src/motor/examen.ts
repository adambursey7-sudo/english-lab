import type { Destreza, Ejercicio, Examen } from '../banco/tipos';
import { ejerciciosDe } from '../banco';

const CLAVE_VISTOS = 'english-lab.vistos';
const MAX_VISTOS = 400;

/** Ids de los ejercicios ya hechos en este móvil (los más recientes al final). Sin almacenamiento, lista vacía. */
export function leerVistos(): string[] {
  try {
    const crudo = localStorage.getItem(CLAVE_VISTOS);
    const lista: unknown = crudo ? JSON.parse(crudo) : [];
    return Array.isArray(lista) ? lista.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

export function apuntarVistos(ids: string[]): void {
  try {
    const sin = leerVistos().filter((id) => !ids.includes(id));
    localStorage.setItem(CLAVE_VISTOS, JSON.stringify([...sin, ...ids].slice(-MAX_VISTOS)));
  } catch {
    // Sin almacenamiento (modo privado, etc.): no pasa nada, solo se repetirán antes los ejercicios.
  }
}

/** Elige un ejercicio al azar, prefiriendo los que no se han hecho; si se han hecho todos, el que hace más tiempo. */
export function elegir(candidatos: Ejercicio[], vistos: string[], azar: () => number = Math.random): Ejercicio | undefined {
  if (candidatos.length === 0) return undefined;
  const nuevos = candidatos.filter((e) => !vistos.includes(e.id));
  if (nuevos.length > 0) return nuevos[Math.floor(azar() * nuevos.length)];
  return [...candidatos].sort((a, b) => vistos.indexOf(a.id) - vistos.indexOf(b.id))[0];
}

/** Un examen completo: un ejercicio de cada parte, en orden. */
export function montarExamen(examen: Examen, destreza: Destreza, vistos: string[] = leerVistos(), azar: () => number = Math.random): Ejercicio[] {
  const todos = ejerciciosDe(examen, destreza);
  const partes = [...new Set(todos.map((e) => e.parte))].sort((a, b) => a - b);
  return partes.flatMap((parte) => {
    const elegido = elegir(todos.filter((e) => e.parte === parte), vistos, azar);
    return elegido ? [elegido] : [];
  });
}

/** Números de examen completos que hay en el banco para esa destreza (examen 1, 2…), ordenados. */
export function numerosExamen(examen: Examen, destreza: Destreza): number[] {
  const numeros = ejerciciosDe(examen, destreza).map((e) => e.examenNumero).filter((n): n is number => n !== undefined);
  return [...new Set(numeros)].sort((a, b) => a - b);
}

/** El examen número N tal cual: todas sus partes en orden (una por parte). Si falta una parte, se rellena con otra del banco. */
export function montarExamenNumero(examen: Examen, destreza: Destreza, numero: number, vistos: string[] = leerVistos(), azar: () => number = Math.random): Ejercicio[] {
  const todos = ejerciciosDe(examen, destreza);
  const partes = [...new Set(todos.map((e) => e.parte))].sort((a, b) => a - b);
  return partes.flatMap((parte) => {
    const propio = todos.find((e) => e.parte === parte && e.examenNumero === numero);
    const elegido = propio ?? elegir(todos.filter((e) => e.parte === parte), vistos, azar);
    return elegido ? [elegido] : [];
  });
}

/** Solo una parte, para practicarla suelta. */
export function practicarParte(examen: Examen, destreza: Destreza, parte: number, vistos: string[] = leerVistos(), azar: () => number = Math.random): Ejercicio[] {
  const elegido = elegir(ejerciciosDe(examen, destreza).filter((e) => e.parte === parte), vistos, azar);
  return elegido ? [elegido] : [];
}

export function minutosDe(lista: Ejercicio[]): number {
  return lista.reduce((n, e) => n + e.minutos, 0);
}
