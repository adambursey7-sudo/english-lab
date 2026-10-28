import { ORDEN_DESTREZAS, type Destreza, type Ejercicio, type Examen } from './tipos';
import { USE_OF_ENGLISH_C1 } from './c1/use-of-english';
import { READING_C1 } from './c1/reading';
import { WRITING_C1 } from './c1/writing';
import { SPEAKING_C1 } from './c1/speaking';
import { LISTENING_C1 } from './c1/listening';

/** Todo el banco. Cada archivo de banco/<examen>/ exporta su lista y se suma aquí. */
export const BANCO: Ejercicio[] = [...USE_OF_ENGLISH_C1, ...READING_C1, ...WRITING_C1, ...LISTENING_C1, ...SPEAKING_C1];

export function ejerciciosDe(examen: Examen, destreza: Destreza): Ejercicio[] {
  return BANCO.filter((e) => e.examen === examen && e.destreza === destreza);
}

export interface ResumenParte {
  parte: number;
  nombreParte: string;
  cuantos: number;
  minutos: number;
}

/** Las partes que existen en el banco para un examen y destreza, en orden, con cuántos ejercicios hay de cada una. */
export function partesDe(examen: Examen, destreza: Destreza): ResumenParte[] {
  const porParte = new Map<number, ResumenParte>();
  for (const e of ejerciciosDe(examen, destreza)) {
    const r = porParte.get(e.parte) ?? { parte: e.parte, nombreParte: e.nombreParte, cuantos: 0, minutos: e.minutos };
    r.cuantos += 1;
    porParte.set(e.parte, r);
  }
  return [...porParte.values()].sort((a, b) => a.parte - b.parte);
}

export function destrezasDe(examen: Examen): Destreza[] {
  const presentes = new Set(BANCO.filter((e) => e.examen === examen).map((e) => e.destreza));
  return ORDEN_DESTREZAS.filter((d) => presentes.has(d));
}
