import { describe, expect, it } from 'vitest';
import { hechosEstaSemana, mejorDeParte, mejorNota, porcentaje, resumenDestreza, type Registro } from './historial';
import { ejerciciosDe } from '../banco';

const c1 = ejerciciosDe('c1', 'reading-use');
const part1 = c1.find((e) => e.parte === 1)!;
const part2 = c1.find((e) => e.parte === 2)!;
const writing = ejerciciosDe('c1', 'writing')[0]!;

const historial: Registro[] = [
  { id: part1.id, fecha: '2026-10-20T10:00:00.000Z', aciertos: 3, total: 8 },
  { id: part1.id, fecha: '2026-10-27T10:00:00.000Z', aciertos: 6, total: 8 },
  { id: part2.id, fecha: '2026-10-27T11:00:00.000Z', aciertos: 8, total: 8 },
  { id: writing.id, fecha: '2026-10-27T12:00:00.000Z', aciertos: 0, total: 0 },
];

describe('historial de resultados', () => {
  it('la mejor nota es la de mayor porcentaje', () => {
    expect(porcentaje({ aciertos: 6, total: 8 })).toBe(75);
    expect(mejorNota(historial, part1.id)?.aciertos).toBe(6);
    expect(mejorNota(historial, writing.id)).toBeUndefined();
    expect(mejorNota(historial, 'no-existe')).toBeUndefined();
  });
  it('resume una destreza: partes hechas y media de las mejores notas', () => {
    const r = resumenDestreza(historial, 'c1', 'reading-use');
    expect(r.partes).toBe(8);
    expect(r.hechas).toBe(2);
    expect(r.media).toBe(Math.round((75 + 100) / 2));
    expect(mejorDeParte(historial, 'c1', 'reading-use', 2)?.aciertos).toBe(8);
    expect(mejorDeParte(historial, 'c1', 'reading-use', 3)).toBeUndefined();
  });
  it('el writing cuenta como hecho aunque no tenga nota', () => {
    const r = resumenDestreza(historial, 'c1', 'writing');
    expect(r.hechas).toBe(1);
    expect(r.media).toBeNull();
    expect(resumenDestreza([], 'pau', 'prueba')).toEqual({ partes: 4, hechas: 0, media: null });
  });
  it('cuenta lo hecho en los últimos siete días', () => {
    expect(hechosEstaSemana(historial, new Date('2026-10-28T12:00:00.000Z'))).toBe(3);
    expect(hechosEstaSemana(historial, new Date('2026-11-10T12:00:00.000Z'))).toBe(0);
  });
});
