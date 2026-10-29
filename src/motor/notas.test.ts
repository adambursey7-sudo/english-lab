import { describe, expect, it } from 'vitest';
import { filtrarNotas, mediaNotas, notasDe, sobreDiez, textoNota, tituloNota, type NotaProfe } from './notas';
import { PERFILES, perfilDe, perfilesDe } from './perfiles';

const nota = (extra: Partial<NotaProfe>): NotaProfe => ({ fecha: '2026-10-29', examen: 'c1', destreza: 'speaking', nota: 7.5, ...extra });

describe('notas de Adam', () => {
  it('se queda solo con lo que tiene forma de nota e ignora la ayuda del archivo', () => {
    const crudo = {
      _como: 'texto de ayuda',
      eduardo: [nota({}), { fecha: '2026-10-29', examen: 'b2', destreza: 'speaking', nota: 5 }, { fecha: 1, nota: 'x' }, null],
      josito: 'no es una lista',
    };
    const limpio = filtrarNotas(crudo);
    expect(Object.keys(limpio)).toEqual(['eduardo']);
    expect(limpio.eduardo).toHaveLength(1);
    expect(filtrarNotas(null)).toEqual({});
    expect(filtrarNotas([1, 2])).toEqual({});
  });
  it('ordena las notas de un alumno de la más reciente a la más antigua', () => {
    const notas = { eduardo: [nota({ fecha: '2026-10-01' }), nota({ fecha: '2026-10-29' }), nota({ fecha: '2026-10-15' })] };
    expect(notasDe(notas, 'eduardo').map((n) => n.fecha)).toEqual(['2026-10-29', '2026-10-15', '2026-10-01']);
    expect(notasDe(notas, 'gabriela')).toEqual([]);
    expect(notasDe(notas, undefined)).toEqual([]);
  });
  it('pasa a sobre 10 y hace la media', () => {
    expect(sobreDiez(nota({ nota: 4, sobre: 5 }))).toBe(8);
    expect(sobreDiez(nota({ nota: 7.5 }))).toBe(7.5);
    expect(mediaNotas([nota({ nota: 4, sobre: 5 }), nota({ nota: 6 })])).toBe(7);
    expect(mediaNotas([])).toBeNull();
    expect(textoNota(7.5)).toBe('7,5');
    expect(textoNota(8)).toBe('8');
  });
  it('titula la nota con la destreza, el examen y la parte', () => {
    expect(tituloNota(nota({ numero: 1, parte: 2 }))).toBe('Speaking · examen 1 · Part 2');
    expect(tituloNota(nota({ examen: 'pau', destreza: 'prueba', parte: 6 }))).toBe('Prueba escrita · Pregunta 6');
    expect(tituloNota(nota({ destreza: 'writing' }))).toBe('Writing');
  });
});

describe('perfiles', () => {
  it('hay tres del C1 y cuatro de la PAU, con ids únicos', () => {
    expect(perfilesDe('c1').map((p) => p.nombre)).toEqual(['Eduardo', 'Gabriela', 'Adam']);
    expect(perfilesDe('pau').map((p) => p.nombre)).toEqual(['Josito', 'Laurita', 'María', 'Aroa']);
    expect(new Set(PERFILES.map((p) => p.id)).size).toBe(PERFILES.length);
    expect(perfilDe('josito')?.examen).toBe('pau');
    expect(perfilDe('nadie')).toBeUndefined();
  });
});
