import { ORDEN_DESTREZAS, type Destreza, type Ejercicio, type Examen } from './tipos';
import { USE_OF_ENGLISH_C1 } from './c1/use-of-english';
import { READING_C1 } from './c1/reading';
import { WRITING_C1 } from './c1/writing';
import { SPEAKING_C1 } from './c1/speaking';
import { LISTENING_C1 } from './c1/listening';
import { PAU_EXAMEN_1 } from './pau/examen-1';
import { READING_USE_C1_2 } from './c1/reading-use-2';
import { LISTENING_C1_2 } from './c1/listening-2';
import { WRITING_C1_2 } from './c1/writing-2';
import { SPEAKING_C1_2 } from './c1/speaking-2';
import { PAU_EXAMEN_2 } from './pau/examen-2';
import { PAU_EXAMEN_3 } from './pau/examen-3';

/** Todo el banco. Cada archivo de banco/<examen>/ exporta su lista y se suma aquí. */
export const BANCO: Ejercicio[] = [
  // Examen 1
  ...USE_OF_ENGLISH_C1, ...READING_C1, ...WRITING_C1, ...LISTENING_C1, ...SPEAKING_C1, ...PAU_EXAMEN_1,
  // Examen 2 (y 3 de la PAU)
  ...READING_USE_C1_2, ...WRITING_C1_2, ...LISTENING_C1_2, ...SPEAKING_C1_2, ...PAU_EXAMEN_2, ...PAU_EXAMEN_3,
];

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
