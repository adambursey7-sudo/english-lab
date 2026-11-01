// Crear ejercicios nuevos con IA desde el navegador, con la clave de la propia academia (no hay servidor nuestro):
// la clave se guarda solo en este navegador y la petición va directa a Anthropic.
import type { Destreza, Ejercicio, Examen } from '../banco/tipos';
import { extraerJson, guiaDe, promptEjercicio } from './guiaEstilo';
import { PREFIJO_PROPIO } from './propios';
import { validarEjercicio } from './validar';

export const MODELO_IA = 'claude-sonnet-5-5';
const CLAVE = 'english-lab.clave-ia';

export function leerClaveIA(): string {
  try {
    return localStorage.getItem(CLAVE) ?? '';
  } catch {
    return '';
  }
}

export function guardarClaveIA(clave: string): void {
  try {
    if (clave) localStorage.setItem(CLAVE, clave);
    else localStorage.removeItem(CLAVE);
  } catch {
    /* sin almacenamiento: vale solo mientras la página siga abierta */
  }
}

/** Una llamada a la IA: recibe el encargo y devuelve el texto de la respuesta. */
export type Llamar = (prompt: string) => Promise<string>;

/** La llamada de verdad, directa del navegador a la API de Anthropic. */
export function llamarAnthropic(clave: string, f: typeof fetch = fetch): Llamar {
  return async (prompt) => {
    const r = await f('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': clave,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({ model: MODELO_IA, max_tokens: 8000, messages: [{ role: 'user', content: prompt }] }),
    });
    if (r.status === 401) throw new Error('La clave no es válida. Revísala en tu cuenta de Anthropic.');
    if (r.status === 429) throw new Error('Demasiadas peticiones seguidas o sin saldo en tu cuenta. Espera un poco e inténtalo otra vez.');
    if (!r.ok) throw new Error(`La IA respondió con un error (${r.status}).`);
    const j = (await r.json()) as { content?: { type: string; text?: string }[] };
    const texto = j.content?.filter((c) => c.type === 'text').map((c) => c.text ?? '').join('') ?? '';
    if (!texto) throw new Error('La IA no devolvió nada.');
    return texto;
  };
}

export interface PedidoIA {
  examen: Examen;
  destreza: Destreza;
  parte: number;
  tema?: string;
}

export type ResultadoIA = { ok: true; ejercicio: Ejercicio } | { ok: false; motivos: string[] };

const textosDe = (e: Ejercicio) => [e.texto ?? '', ...(e.secciones?.map((s) => s.texto) ?? [])];

/**
 * Pide un ejercicio nuevo, lo pasa por el validador y, si falla, se lo devuelve a la IA con los motivos (hasta 3 intentos).
 * `banco` sirve de ejemplo de forma y para comprobar que no repite frases.
 */
export async function crearEjercicioIA(p: PedidoIA, banco: Ejercicio[], llamar: Llamar, intentos = 3): Promise<ResultadoIA> {
  const guia = guiaDe(p.examen, p.destreza, p.parte);
  const ejemplo = banco.find((e) => e.examen === p.examen && e.destreza === p.destreza && e.parte === p.parte);
  if (!guia || !ejemplo) return { ok: false, motivos: ['Esta parte todavía no se puede crear con IA.'] };
  const otros = banco.flatMap(textosDe);
  let motivos: string[] = [];
  for (let i = 0; i < intentos; i++) {
    try {
      const e = extraerJson(await llamar(promptEjercicio(guia, ejemplo, p.tema, motivos))) as Ejercicio;
      e.examen = p.examen;
      e.destreza = p.destreza;
      e.parte = p.parte;
      e.nombreParte = ejemplo.nombreParte;
      e.minutos = ejemplo.minutos;
      delete e.examenNumero;
      e.id = `${PREFIJO_PROPIO}ia-${Date.now().toString(36)}${Math.floor(Math.random() * 1e4).toString(36)}`;
      if (e.audio) e.audio = { ...e.audio, archivo: `audio/${e.id}.mp3` };
      motivos = validarEjercicio(e, otros);
      if (motivos.length === 0) return { ok: true, ejercicio: e };
    } catch (err) {
      // Un fallo de red o de clave no se arregla reintentando: se avisa tal cual.
      if (err instanceof Error && !(err instanceof SyntaxError) && !/ningún ejercicio/.test(err.message)) return { ok: false, motivos: [err.message] };
      motivos = ['La respuesta no era un ejercicio en el formato pedido.'];
    }
  }
  return { ok: false, motivos };
}
