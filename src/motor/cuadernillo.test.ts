import { describe, expect, it } from 'vitest';
import { BANCO } from '../banco';
import { TIPOS_EVALUABLES } from '../banco/tipos';
import { claveDe, montarCuadernillo, numerosCuadernillo, partesListening } from './cuadernillo';

describe('cuadernillo', () => {
  it('hay al menos un examen entero de C1 y de PAU', () => {
    expect(numerosCuadernillo('c1')).toContain(1);
    expect(numerosCuadernillo('pau')).toContain(1);
  });

  it('el examen 1 de C1 trae los cuatro papers con todas sus partes en orden', () => {
    const c = montarCuadernillo('c1', 1);
    expect(c).toBeDefined();
    if (!c) return;
    expect(c.papeles.map((p) => p.destreza)).toEqual(['reading-use', 'writing', 'listening', 'speaking']);
    const reading = c.papeles[0];
    expect(reading.partes.map((e) => e.parte)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(reading.preguntas).toBe(56);
    expect(reading.minutos).toBe(90);
    expect(partesListening(c).map((e) => e.parte)).toEqual([1, 2, 3, 4]);
  });

  it('cada cuadernillo solo lleva partes de su número y ninguna repetida', () => {
    for (const examen of ['c1', 'pau'] as const) {
      for (const n of numerosCuadernillo(examen)) {
        const c = montarCuadernillo(examen, n);
        expect(c).toBeDefined();
        for (const p of c?.papeles ?? []) {
          expect(p.partes.every((e) => e.examenNumero === n && e.destreza === p.destreza)).toBe(true);
          expect(new Set(p.partes.map((e) => e.parte)).size).toBe(p.partes.length);
        }
      }
    }
  });

  it('un número que no existe no monta nada', () => {
    expect(montarCuadernillo('c1', 99)).toBeUndefined();
  });

  it('la clave tiene una línea por pregunta que se corrige sola, con respuesta y explicación', () => {
    for (const e of BANCO) {
      const clave = claveDe(e);
      expect(clave.length).toBe(e.items.filter((i) => TIPOS_EVALUABLES.has(i.tipo)).length);
      for (const l of clave) {
        expect(l.respuesta).not.toBe('');
        expect(l.explicacion).not.toBe('');
      }
    }
  });
});
