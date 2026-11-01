// Licencias sin servidor: la clave es un texto firmado con Ed25519 por quien vende la app; aquí solo se comprueba la firma
// con la clave PÚBLICA. La privada vive fuera del repo (`scripts/licencia.mjs`). No importa nada en ejecución para que ese
// script cargue este archivo directamente con Node.

/** Clave pública de verificación (32 bytes en base64). Se cambia solo si se estrena par de claves. */
export const CLAVE_PUBLICA = 'Hj4cH2CXkYsxp0HkiT-l32W4lI2KXko7uEHJPtB9PsU';

export interface DatosLicencia {
  v: 1;
  academia: string;
  /** Último día de uso (AAAA-MM-DD) o null si no caduca. */
  hasta: string | null;
  plan: 'pro';
  emitida: string;
}

export type EstadoLicencia =
  | { tipo: 'demo' }
  | { tipo: 'pro'; datos: DatosLicencia }
  | { tipo: 'caducada'; datos: DatosLicencia }
  | { tipo: 'invalida'; motivo: string };

const PREFIJO = 'ELAB1';
const CLAVE_GUARDADA = 'english-lab.licencia';

const aBytes = (t: string): Uint8Array<ArrayBuffer> => new Uint8Array([...new TextEncoder().encode(t)]);

export function base64url(bytes: Uint8Array): string {
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function desdeBase64url(t: string): Uint8Array<ArrayBuffer> {
  const b64 = t.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(t.length / 4) * 4, '=');
  const s = atob(b64);
  return Uint8Array.from(s, (c) => c.charCodeAt(0));
}

/** Firma unos datos y devuelve la clave de licencia lista para dar al cliente. */
export async function emitirLicencia(datos: DatosLicencia, privada: CryptoKey): Promise<string> {
  const cuerpo = base64url(aBytes(JSON.stringify(datos)));
  const firma = new Uint8Array(await crypto.subtle.sign('Ed25519', privada, aBytes(cuerpo)));
  return `${PREFIJO}.${cuerpo}.${base64url(firma)}`;
}

const hoyISO = (d: Date) => d.toISOString().slice(0, 10);

function datosValidos(v: unknown): DatosLicencia | null {
  if (!v || typeof v !== 'object') return null;
  const d = v as Record<string, unknown>;
  const fecha = (x: unknown) => typeof x === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(x);
  if (d.v !== 1 || d.plan !== 'pro' || typeof d.academia !== 'string' || !fecha(d.emitida) || !(d.hasta === null || fecha(d.hasta))) return null;
  return { v: 1, academia: d.academia.slice(0, 80), hasta: d.hasta as string | null, plan: 'pro', emitida: d.emitida as string };
}

/** Comprueba una clave de licencia: firma, formato y caducidad. No necesita red. */
export async function verificarLicencia(clave: string, publica: string = CLAVE_PUBLICA, ahora: Date = new Date()): Promise<EstadoLicencia> {
  const partes = clave.trim().split('.');
  if (partes.length !== 3 || partes[0] !== PREFIJO) return { tipo: 'invalida', motivo: 'Esa clave no tiene el formato de una licencia.' };
  try {
    const llave = await crypto.subtle.importKey('raw', desdeBase64url(publica), 'Ed25519', false, ['verify']);
    const firmaBuena = await crypto.subtle.verify('Ed25519', llave, desdeBase64url(partes[2]), aBytes(partes[1]));
    if (!firmaBuena) return { tipo: 'invalida', motivo: 'La clave no es auténtica: revisa que la hayas copiado entera.' };
    const datos = datosValidos(JSON.parse(new TextDecoder().decode(desdeBase64url(partes[1]))));
    if (!datos) return { tipo: 'invalida', motivo: 'La clave está firmada pero sus datos no se entienden.' };
    return datos.hasta !== null && datos.hasta < hoyISO(ahora) ? { tipo: 'caducada', datos } : { tipo: 'pro', datos };
  } catch {
    return { tipo: 'invalida', motivo: 'Tu navegador no puede comprobar la licencia (hace falta uno actualizado).' };
  }
}

export function leerLicenciaGuardada(): string {
  try {
    return localStorage.getItem(CLAVE_GUARDADA) ?? '';
  } catch {
    return '';
  }
}

export function guardarLicencia(clave: string): void {
  try {
    if (clave) localStorage.setItem(CLAVE_GUARDADA, clave.trim());
    else localStorage.removeItem(CLAVE_GUARDADA);
  } catch {
    /* sin almacenamiento: vale solo mientras la página siga abierta */
  }
}

/** Estado de la licencia guardada: sin clave, demo. */
export async function estadoLicencia(): Promise<EstadoLicencia> {
  const clave = leerLicenciaGuardada();
  if (!clave) return { tipo: 'demo' };
  const e = await verificarLicencia(clave);
  return e.tipo === 'invalida' ? { tipo: 'demo' } : e;
}

/** Límites de la demo (sin licencia o con la licencia caducada). */
export const LIMITE_DEMO_GUARDADOS = 3;
export const esPro = (e: EstadoLicencia) => e.tipo === 'pro';
