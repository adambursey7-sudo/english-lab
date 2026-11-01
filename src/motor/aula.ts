// «Aula» sin servidor: el profe comparte un examen con un enlace (o QR) y los alumnos devuelven su resultado como un texto
// que el profe pega en su tabla de clase. Todo viaja en el propio texto: no hay cuentas ni datos en ningún servidor.
import type { Ejercicio, Examen } from '../banco/tipos';
import { base64url, desdeBase64url } from './licencia';
import { versionB } from './generador';

export interface ExamenAula {
  v: 1;
  examen: Examen;
  titulo: string;
  /** Ejercicios del banco que lleva el examen, en orden. */
  ids: string[];
  version: 'A' | 'B';
  semilla: number;
  /** Marca de la academia que lo manda (lo que ve el alumno al abrir el enlace). */
  marca: { nombre: string; color: string };
}

const texto = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const aBase64 = (o: unknown) => base64url(new TextEncoder().encode(JSON.stringify(o)));
const desdeBase64 = (t: string): unknown => JSON.parse(new TextDecoder().decode(desdeBase64url(t)));

export function codificarExamen(x: ExamenAula): string {
  return aBase64(x);
}

/** Lee el examen de un enlace; null si está roto o manipulado (se limpia todo lo que se enseña). */
export function decodificarExamen(t: string): ExamenAula | null {
  try {
    const g = desdeBase64(t) as Record<string, unknown>;
    if (!g || g.v !== 1 || (g.examen !== 'c1' && g.examen !== 'pau') || !Array.isArray(g.ids)) return null;
    const ids = g.ids.filter((i): i is string => typeof i === 'string' && /^[\w.-]{1,80}$/.test(i)).slice(0, 60);
    if (ids.length === 0) return null;
    const marca = (g.marca ?? {}) as Record<string, unknown>;
    return {
      v: 1,
      examen: g.examen,
      titulo: texto(g.titulo, 80) || 'Examen',
      ids,
      version: g.version === 'B' ? 'B' : 'A',
      semilla: Number.isFinite(g.semilla) ? Math.trunc(g.semilla as number) : 0,
      marca: { nombre: texto(marca.nombre, 60) || 'English Lab', color: /^#[0-9a-f]{6}$/i.test(String(marca.color)) ? String(marca.color) : '#34502b' },
    };
  } catch {
    return null;
  }
}

/** Monta los ejercicios del enlace con el banco de esta app (los ids que no existan se avisan en `faltan`). */
export function montarDesdeIds(x: ExamenAula, banco: Ejercicio[]): { ejercicios: Ejercicio[]; faltan: string[] } {
  const ejercicios: Ejercicio[] = [];
  const faltan: string[] = [];
  for (const id of x.ids) {
    const e = banco.find((b) => b.id === id);
    if (e) ejercicios.push(x.version === 'B' ? versionB(e, x.semilla) : e);
    else faltan.push(id);
  }
  return { ejercicios, faltan };
}

/** Lo que devuelve un alumno: quién es, qué examen y cuántas acertó en cada parte. */
export interface Entrega {
  v: 1;
  alumno: string;
  titulo: string;
  fecha: string;
  partes: { id: string; ok: number; total: number }[];
}

const PREFIJO_ENTREGA = 'ELABR1';

export function codificarEntrega(e: Entrega): string {
  return `${PREFIJO_ENTREGA}.${aBase64(e)}`;
}

export function decodificarEntrega(linea: string): Entrega | null {
  const t = linea.trim();
  if (!t.startsWith(`${PREFIJO_ENTREGA}.`)) return null;
  try {
    const g = desdeBase64(t.slice(PREFIJO_ENTREGA.length + 1)) as Record<string, unknown>;
    if (!g || g.v !== 1 || !Array.isArray(g.partes)) return null;
    const partes = g.partes
      .filter((p): p is Record<string, unknown> => !!p && typeof p === 'object')
      .map((p) => ({ id: texto(p.id, 80), ok: Number(p.ok), total: Number(p.total) }))
      .filter((p) => p.id && Number.isInteger(p.ok) && Number.isInteger(p.total) && p.total >= 0 && p.ok >= 0 && p.ok <= p.total)
      .slice(0, 60);
    if (partes.length === 0) return null;
    return {
      v: 1,
      alumno: texto(g.alumno, 60) || 'Sin nombre',
      titulo: texto(g.titulo, 80),
      fecha: /^\d{4}-\d{2}-\d{2}$/.test(String(g.fecha)) ? String(g.fecha) : '',
      partes,
    };
  } catch {
    return null;
  }
}

/** Pega varias entregas (una por línea): devuelve las válidas y cuántas líneas no se entendieron. */
export function leerEntregas(pegado: string): { entregas: Entrega[]; ignoradas: number } {
  const lineas = pegado.split(/\s+/).filter(Boolean);
  const entregas: Entrega[] = [];
  let ignoradas = 0;
  for (const l of lineas) {
    const e = decodificarEntrega(l);
    if (e) entregas.push(e);
    else ignoradas++;
  }
  return { entregas, ignoradas };
}

export interface ResumenClase {
  alumnos: { alumno: string; titulo: string; ok: number; total: number; porcentaje: number }[];
  media: number | null;
  /** Partes con su porcentaje de acierto en la clase, de peor a mejor. */
  partes: { id: string; porcentaje: number; intentos: number }[];
}

const pct = (ok: number, total: number) => (total === 0 ? 0 : Math.round((ok / total) * 100));

export function resumenClase(entregas: Entrega[]): ResumenClase {
  const alumnos = entregas.map((e) => {
    const ok = e.partes.reduce((n, p) => n + p.ok, 0);
    const total = e.partes.reduce((n, p) => n + p.total, 0);
    return { alumno: e.alumno, titulo: e.titulo, ok, total, porcentaje: pct(ok, total) };
  });
  const porParte = new Map<string, { ok: number; total: number; intentos: number }>();
  for (const e of entregas) {
    for (const p of e.partes) {
      const x = porParte.get(p.id) ?? { ok: 0, total: 0, intentos: 0 };
      x.ok += p.ok;
      x.total += p.total;
      x.intentos += 1;
      porParte.set(p.id, x);
    }
  }
  const conNota = alumnos.filter((a) => a.total > 0);
  return {
    alumnos,
    media: conNota.length === 0 ? null : Math.round(conNota.reduce((n, a) => n + a.porcentaje, 0) / conNota.length),
    partes: [...porParte.entries()].map(([id, x]) => ({ id, porcentaje: pct(x.ok, x.total), intentos: x.intentos })).sort((a, b) => a.porcentaje - b.porcentaje),
  };
}

const CLAVE_AULA = 'english-lab.aula';

export function leerAula(): Entrega[] {
  try {
    const bruto = JSON.parse(localStorage.getItem(CLAVE_AULA) ?? '[]') as string[];
    return Array.isArray(bruto) ? bruto.map((l) => decodificarEntrega(String(l))).filter((e): e is Entrega => e !== null) : [];
  } catch {
    return [];
  }
}

export function escribirAula(entregas: Entrega[]): void {
  try {
    localStorage.setItem(CLAVE_AULA, JSON.stringify(entregas.map(codificarEntrega)));
  } catch {
    /* sin almacenamiento: la tabla vale solo mientras la página siga abierta */
  }
}
