import { describe, expect, it } from 'vitest';
import { estadoDe, hechosEstaSemana, mejorDeParte, mejorNota, paraMejorar, porcentaje, rachaDias, resumenDestreza, type Registro } from './historial';
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

describe('para mejorar', () => {
  it('ordena de peor a mejor y deja fuera writing y speaking', () => {
    const lista = paraMejorar(historial, 'c1');
    expect(lista.some((p) => p.destreza === 'writing' || p.destreza === 'speaking')).toBe(false);
    // Nada flojo ni regular: primero lo que falta por hacer, al final lo que va bien (75 % antes que 100 %).
    expect(lista[0].estado).toBe('sin-hacer');
    const bien = lista.filter((p) => p.estado === 'bien');
    expect(bien.map((p) => p.parte)).toEqual([1, 2]);
    expect(bien[0].veces).toBe(2);
    const floja = paraMejorar([{ id: part1.id, fecha: '2026-10-20T10:00:00.000Z', aciertos: 2, total: 8 }], 'c1');
    expect(floja[0]).toMatchObject({ destreza: 'reading-use', parte: 1, estado: 'floja' });
  });
  it('estadoDe separa floja, regular y bien', () => {
    expect([estadoDe(undefined), estadoDe(20), estadoDe(50), estadoDe(69), estadoDe(70)]).toEqual(['sin-hacer', 'floja', 'regular', 'regular', 'bien']);
  });
});

describe('rachaDias', () => {
  const en = (dia: string) => ({ id: 'x', fecha: new Date(`${dia}T12:00:00`).toISOString(), aciertos: 1, total: 1 });
  const hoy = new Date('2026-10-29T18:00:00');
  it('cuenta los días seguidos hasta hoy', () => {
    expect(rachaDias([en('2026-10-27'), en('2026-10-28'), en('2026-10-29'), en('2026-10-29')], hoy)).toBe(3);
  });
  it('si hoy no ha practicado, cuenta hasta ayer', () => {
    expect(rachaDias([en('2026-10-27'), en('2026-10-28')], hoy)).toBe(2);
  });
  it('un hueco corta la racha', () => {
    expect(rachaDias([en('2026-10-25'), en('2026-10-29')], hoy)).toBe(1);
    expect(rachaDias([], hoy)).toBe(0);
  });
});
