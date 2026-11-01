import { ES_PRODUCTO } from './marca';

// Dónde vive la app para quien la abre desde fuera (el QR del cuadernillo en PDF apunta aquí).
// GitHub Pages de la cuenta de Adam; si el repositorio cambia de nombre o de cuenta, basta con cambiar esta línea.
// Mientras no esté publicado en Pages, vale el enlace provisional de Tailscale: 'https://msi.tail0b94b8.ts.net:8443/'.
export const URL_PUBLICA = 'https://adambursey7-sudo.github.io/english-lab/';

/** Dónde vive la app: en la clase de Kate, su página pública; en el producto, donde la haya puesto cada academia. */
export function baseApp(): string {
  return ES_PRODUCTO && typeof location !== 'undefined' ? location.origin + location.pathname : URL_PUBLICA;
}

/** Enlace a la página de audio de un examen (la que abre el QR del cuadernillo). */
export function enlaceAudio(examen: string, numero: number, base: string = baseApp()): string {
  return `${base}#/audio/${examen}/${numero}`;
}

/** Enlace al audio de un examen generado: lleva los ejercicios de listening elegidos (la mezcla no tiene número). */
export function enlaceAudioMezcla(ids: string[], base: string = baseApp()): string {
  return `${base}#/audio/mezcla/${ids.join('~')}`;
}
