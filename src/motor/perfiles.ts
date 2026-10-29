import type { Examen } from '../banco/tipos';

/** Un alumno de Adam: su nombre y el examen que prepara (el que se abre por defecto). */
export interface Perfil {
  id: string;
  nombre: string;
  examen: Examen;
}

/** Los alumnos (29/10/2026). El progreso de cada uno se guarda aparte en el móvil con su id. */
export const PERFILES: Perfil[] = [
  { id: 'eduardo', nombre: 'Eduardo', examen: 'c1' },
  { id: 'gabriela', nombre: 'Gabriela', examen: 'c1' },
  { id: 'adam', nombre: 'Adam', examen: 'c1' },
  { id: 'josito', nombre: 'Josito', examen: 'pau' },
  { id: 'laurita', nombre: 'Laurita', examen: 'pau' },
];

const CLAVE = 'english-lab.perfil';

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

export function elegirPerfil(id: string): void {
  try {
    localStorage.setItem(CLAVE, id);
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
