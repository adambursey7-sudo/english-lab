import type { Examen } from '../banco/tipos';
import { sha256 } from './sha256';

/** Un alumno de Adam: su nombre, el examen que prepara (el que se abre por defecto) y la huella de su PIN. */
export interface Perfil {
  id: string;
  nombre: string;
  examen: Examen;
  /** sha256 de `english-lab:<id>:<PIN>`; el PIN de 4 cifras lo da Adam y se cambia con `node scripts/pin.mjs`. */
  pin: string;
}

/**
 * Los alumnos (29/10/2026). El progreso de cada uno se guarda aparte en el móvil con su id. El PIN es un candado
 * sencillo para que nadie entre en el perfil de otro: la app no tiene servidor y el repo es público.
 */
export const PERFILES: Perfil[] = [
  { id: 'eduardo', nombre: 'Eduardo', examen: 'c1', pin: '3574df32b00dcf72020feb3f58962cafefc62ab4e458b86db6c456c1448982fa' },
  { id: 'gabriela', nombre: 'Gabriela', examen: 'c1', pin: '33e1b7047a2b091869f79833b2fea1554a2b3c07e252cae6ce483bc3ace7cd3e' },
  { id: 'adam', nombre: 'Adam', examen: 'c1', pin: '97712cda8fec868a35dfca9d7edaef7948d9ecd430625ec69a59c71ea66b8859' },
  { id: 'josito', nombre: 'Josito', examen: 'pau', pin: '0512b2cbc0140857bf9194d238549e0e0f2d5208781c7957e9d445d82e15e056' },
  { id: 'laurita', nombre: 'Laurita', examen: 'pau', pin: '50bbf9689ff85f26db13a397d9967c3394c574ea17eb51bf126d3bcc43390a6a' },
];

// Clave nueva desde que hay PIN: quien había elegido perfil antes tiene que meter su PIN una vez.
const CLAVE = 'english-lab.sesion';
const FALLOS = 'english-lab.fallos-pin';

export function perfilDe(id: string | null | undefined): Perfil | undefined {
  return PERFILES.find((p) => p.id === id);
}

/** El alumno elegido en este móvil, o undefined si todavía no ha dicho quién es. */
export function perfilActivo(): Perfil | undefined {
  try {
    return perfilDe(localStorage.getItem(CLAVE));
  } catch {
    return undefined;
  }
}

export function huellaPin(id: string, pin: string): string {
  return sha256(`english-lab:${id}:${pin}`);
}

export function pinCorrecto(perfil: Perfil, pin: string): boolean {
  return perfil.pin !== '' && huellaPin(perfil.id, pin) === perfil.pin;
}

/** Tras 3 fallos seguidos hay que esperar 30 s (y otros 30 por cada fallo más). Devuelve los segundos que faltan. */
export function esperaPin(ahora = Date.now()): number {
  const { veces, ultimo } = leerFallos();
  if (veces < 3) return 0;
  return Math.max(0, Math.ceil((ultimo + (veces - 2) * 30_000 - ahora) / 1000));
}

export function apuntarFallo(ahora = Date.now()): void {
  try {
    localStorage.setItem(FALLOS, JSON.stringify({ veces: leerFallos().veces + 1, ultimo: ahora }));
  } catch {
    // Sin almacenamiento no se cuenta la espera.
  }
}

function leerFallos(): { veces: number; ultimo: number } {
  try {
    const f = JSON.parse(localStorage.getItem(FALLOS) ?? 'null') as { veces?: unknown; ultimo?: unknown } | null;
    return { veces: typeof f?.veces === 'number' ? f.veces : 0, ultimo: typeof f?.ultimo === 'number' ? f.ultimo : 0 };
  } catch {
    return { veces: 0, ultimo: 0 };
  }
}

/** Entra con su perfil (el PIN ya comprobado) y se queda dentro en este móvil hasta que pulse «Salir». */
export function elegirPerfil(id: string): void {
  try {
    localStorage.setItem(CLAVE, id);
    localStorage.removeItem(FALLOS);
  } catch {
    // Sin almacenamiento: se le volverá a preguntar la próxima vez.
  }
}

export function salirPerfil(): void {
  try {
    localStorage.removeItem(CLAVE);
  } catch {
    // nada que quitar
  }
}

/** Perfiles de un examen, en el orden de la lista. */
export function perfilesDe(examen: Examen): Perfil[] {
  return PERFILES.filter((p) => p.examen === examen);
}

export function inicial(nombre: string): string {
  return nombre.trim().charAt(0).toUpperCase();
}
