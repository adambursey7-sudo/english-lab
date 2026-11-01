import { describe, expect, it } from 'vitest';
import { BANCO } from '../banco';
import { densidadLarga, solapamiento, validarEjercicio } from './validar';

describe('validador', () => {
  it('todo el banco actual pasa (el banco es la vara de medir)', () => {
    for (const e of BANCO) {
      const otros = BANCO.filter((x) => x.id !== e.id).flatMap((x) => [x.texto ?? '', ...(x.secciones?.map((s) => s.texto) ?? [])]);
      const clave = `${e.examen}/${e.destreza}/${e.parte}`;
      if (clave.includes('speaking')) continue;
      expect(validarEjercicio(e, otros), e.id).toEqual([]);
    }
  });

  it('rechaza un texto demasiado corto, con pocas preguntas y vocabulario simple', () => {
    const base = BANCO.find((e) => e.id === 'c1-rue-2-names')!;
    const malo = { ...base, texto: 'The cat is on the mat. It is a big cat. {{1}} {{2}}', items: base.items.slice(0, 2) };
    const f = validarEjercicio(malo).join(' ');
    expect(f).toContain('Debe tener 8 preguntas');
    expect(f).toContain('palabras');
  });

  it('detecta un texto copiado de otro', () => {
    const base = BANCO.find((e) => e.id === 'c1-rue-5-ferry-home-2')!;
    expect(solapamiento(base, [base.texto!])).toBeGreaterThan(0.9);
    expect(validarEjercicio(base, [base.texto!]).join(' ')).toContain('Repite frases');
  });

  it('mide palabras largas', () => {
    expect(densidadLarga('cat dog sun')).toBe(0);
    expect(densidadLarga('extraordinary circumstances')).toBe(1);
  });
});
