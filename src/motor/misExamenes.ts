import { ORDEN_DESTREZAS, type Examen } from '../banco/tipos';
import type { Receta } from './generador';

/** Un examen guardado por el profe: la receta para volver a montarlo igual y los ejercicios que usó (historial). */
export interface Guardado {
  id: string;
  nombre: string;
  /** Grupo al que se le puso (para no repetirle ejercicios); vacío = sin grupo. */
  grupo: string;
  /** Fecha ISO (solo el día). */
  fecha: string;
  receta: Receta;
  ids: string[];
}

const CLAVE = 'english-lab.mis-examenes';

const texto = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const lista = (v: unknown, max: number): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string').slice(0, max) : []);

function recetaValida(r: unknown): Receta | null {
  if (!r || typeof r !== 'object') return null;
  const g = r as Record<string, unknown>;
  if (!['c1', 'pau', 'b1', 'b2'].includes(g.examen as string) || !Array.isArray(g.partes) || typeof g.semilla !== 'number') return null;
  const partes = g.partes
    .filter((p): p is Record<string, unknown> => !!p && typeof p === 'object')
    .filter((p) => ORDEN_DESTREZAS.includes(p.destreza as never) && Number.isInteger(p.parte) && Number.isInteger(p.cuantos) && (p.cuantos as number) > 0 && (p.cuantos as number) <= 20)
    .map((p) => ({ destreza: p.destreza as Receta['partes'][number]['destreza'], parte: p.parte as number, cuantos: p.cuantos as number }));
  return {
    examen: g.examen as Examen,
    partes,
    semilla: Math.trunc(g.semilla),
    version: g.version === 'B' ? 'B' : 'A',
    evitar: lista(g.evitar, 2000),
    soloAutomaticos: g.soloAutomaticos === true,
    ...(g.propiosPrimero === true ? { propiosPrimero: true } : {}),
  };
}

/** Limpia un examen guardado venga de donde venga (navegador o archivo de copia); null si no vale. */
export function guardadoValido(v: unknown): Guardado | null {
  if (!v || typeof v !== 'object') return null;
  const g = v as Record<string, unknown>;
  const receta = recetaValida(g.receta);
  const id = texto(g.id, 60);
  if (!receta || !id) return null;
  return {
    id,
    nombre: texto(g.nombre, 80) || 'Examen sin nombre',
    grupo: texto(g.grupo, 60),
    fecha: /^\d{4}-\d{2}-\d{2}$/.test(String(g.fecha)) ? String(g.fecha) : hoy(),
    receta,
    ids: lista(g.ids, 2000),
  };
}

export const hoy = () => new Date().toISOString().slice(0, 10);

export const nuevoId = () => `${Date.now().toString(36)}${Math.floor(Math.random() * 1e6).toString(36)}`;

export function leerGuardados(): Guardado[] {
  try {
    const bruto = JSON.parse(localStorage.getItem(CLAVE) ?? '[]');
    return Array.isArray(bruto) ? bruto.map(guardadoValido).filter((g): g is Guardado => g !== null) : [];
  } catch {
    return [];
  }
}

export function escribirGuardados(lista: Guardado[]): void {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(lista));
  } catch {
    /* sin almacenamiento: lo guardado vale solo mientras la página siga abierta */
  }
}

/** Ids de los ejercicios que ya se han puesto a un grupo. Sin grupo, no hay historial. */
export function usadosDe(grupo: string, guardados: Guardado[]): string[] {
  const g = grupo.trim().toLowerCase();
  if (!g) return [];
  return [...new Set(guardados.filter((x) => x.grupo.toLowerCase() === g).flatMap((x) => x.ids))];
}

/** Grupos distintos que ya existen, para sugerirlos al guardar. */
export function gruposDe(guardados: Guardado[]): string[] {
  return [...new Set(guardados.map((g) => g.grupo).filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

/** Copia de seguridad en JSON (para guardar en un archivo). */
export function exportar(guardados: Guardado[]): string {
  return JSON.stringify({ version: 1, examenes: guardados }, null, 2);
}

/** Lee una copia de seguridad: devuelve los exámenes válidos, o null si el archivo no es una copia. */
export function importar(textoJson: string): Guardado[] | null {
  try {
    const bruto = JSON.parse(textoJson) as { examenes?: unknown };
    if (!bruto || !Array.isArray(bruto.examenes)) return null;
    return bruto.examenes.map(guardadoValido).filter((g): g is Guardado => g !== null);
  } catch {
    return null;
  }
}

/** Suma lo importado a lo que ya hay (si el id existe, gana lo importado). */
export function fusionar(actuales: Guardado[], nuevos: Guardado[]): Guardado[] {
  const porId = new Map(actuales.map((g) => [g.id, g]));
  for (const n of nuevos) porId.set(n.id, n);
  return [...porId.values()];
}
