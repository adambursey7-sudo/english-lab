import type { Ejercicio } from '../banco/tipos';
import { URL_SERVIDOR } from '../config';
import { credencialesActivas } from './perfiles';

/**
 * Entregas al servidor del PC de Adam (`servidor/servidor.mjs`). Solo con sesión de alumno (con su PIN): el invitado
 * comparte por WhatsApp como siempre. Si el PC está apagado o no hay red, falla sin romper nada y la app cae al compartir.
 */
export type ResultadoEnvio = 'enviado' | 'sin-servidor' | 'sin-sesion';

const ESPERA_MS = 8000;

function cabeceras(extra: Record<string, string> = {}): Record<string, string> | undefined {
  const c = credencialesActivas();
  return c ? { 'X-Alumno': c.id, 'X-Pin': c.pin, ...extra } : undefined;
}

async function conLimite(url: string, init: RequestInit, ms = ESPERA_MS): Promise<Response> {
  const control = new AbortController();
  const t = setTimeout(() => control.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: control.signal });
  } finally {
    clearTimeout(t);
  }
}

export function hayServidor(): boolean {
  return URL_SERVIDOR !== '' && credencialesActivas() !== undefined;
}

export async function enviarTexto(ejercicio: Ejercicio, n: number, texto: string, titulo: string): Promise<ResultadoEnvio> {
  const h = cabeceras({ 'Content-Type': 'application/json' });
  if (!URL_SERVIDOR || !h) return 'sin-sesion';
  try {
    const r = await conLimite(`${URL_SERVIDOR}/api/entrega`, {
      method: 'POST',
      headers: h,
      body: JSON.stringify({ ejercicio: ejercicio.id, n, numero: ejercicio.examenNumero ?? 0, parte: ejercicio.parte, titulo, texto }),
    });
    return r.ok ? 'enviado' : 'sin-servidor';
  } catch {
    return 'sin-servidor';
  }
}

export async function enviarAudio(blob: Blob, ejercicio: Ejercicio, n: number, titulo: string): Promise<ResultadoEnvio> {
  const h = cabeceras({ 'Content-Type': blob.type || 'audio/mp4' });
  if (!URL_SERVIDOR || !h) return 'sin-sesion';
  const q = new URLSearchParams({ ejercicio: ejercicio.id, n: String(n), numero: String(ejercicio.examenNumero ?? 0), parte: String(ejercicio.parte), titulo });
  try {
    const r = await conLimite(`${URL_SERVIDOR}/api/audio?${q}`, { method: 'POST', headers: h, body: blob }, 60_000);
    return r.ok ? 'enviado' : 'sin-servidor';
  } catch {
    return 'sin-servidor';
  }
}

/** Las notas que Adam puso desde la página de corregir (JSON de `NotasProfe`, sin filtrar), o null si no hay servidor. */
export async function pedirNotasServidor(): Promise<unknown | null> {
  const h = cabeceras();
  if (!URL_SERVIDOR || !h) return null;
  try {
    const r = await conLimite(`${URL_SERVIDOR}/api/notas`, { headers: h }, 4000);
    return r.ok ? await r.json() : null;
  } catch {
    return null;
  }
}
