// Dónde vive la app para quien la abre desde fuera (el QR del cuadernillo en PDF apunta aquí).
// GitHub Pages de la cuenta de Adam; si el repositorio cambia de nombre o de cuenta, basta con cambiar esta línea.
// Mientras no esté publicado en Pages, vale el enlace provisional de Tailscale: 'https://msi.tail0b94b8.ts.net:8443/'.
export const URL_PUBLICA = 'https://adambursey7-sudo.github.io/english-lab/';

/** Enlace a la página de audio de un examen (la que abre el QR del cuadernillo). */
export function enlaceAudio(examen: string, numero: number, base: string = URL_PUBLICA): string {
  return `${base}#/audio/${examen}/${numero}`;
}
