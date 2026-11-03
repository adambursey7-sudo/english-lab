import { describe, expect, it } from 'vitest';
import { ejerciciosDe } from '../banco';
import { corrigeEjercicio } from './corregir';
import { anclaFallo, fallosDe, motivoCorto } from './fallos';

describe('motivoCorto', () => {
  it('se queda con la primera frase', () => {
    expect(motivoCorto('«Cope with» es la colocación. Las otras no encajan.')).toBe('«Cope with» es la colocación.');
  });
  it('recorta las frases largas', () => {
    const largo = 'palabra '.repeat(40);
    const m = motivoCorto(largo, 50);
    expect(m.length).toBeLessThanOrEqual(50);
    expect(m.endsWith('…')).toBe(true);
  });
});

describe('fallosDe', () => {
  const ej = ejerciciosDe('c1', 'reading-use').find((e) => e.parte === 2)!;

  it('sin respuestas, todos los items son fallo y llevan ancla y motivo', () => {
    const fallos = fallosDe([corrigeEjercicio(ej, {})]);
    expect(fallos).toHaveLength(ej.items.length);
    expect(fallos[0].ancla).toBe(anclaFallo(ej.id, ej.items[0].n));
    expect(fallos[0].tuya).toBe('');
    expect(fallos[0].motivo).not.toBe('');
  });

  it('con todo bien no hay fallos', () => {
    const respuestas = Object.fromEntries(ej.items.map((i) => [i.n, 'correctas' in i ? i.correctas[0] : '']));
    expect(fallosDe([corrigeEjercicio(ej, respuestas)])).toHaveLength(0);
  });
});
