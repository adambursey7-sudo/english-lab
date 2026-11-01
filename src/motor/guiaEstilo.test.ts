import { describe, expect, it } from 'vitest';
import { BANCO } from '../banco';
import { GUIA, extraerJson, guiaDe, promptEjercicio } from './guiaEstilo';
import { REGLAS } from './validar';

describe('guía de estilo', () => {
  it('cada parte con regla de validación tiene guía y un ejemplo en el banco', () => {
    for (const clave of Object.keys(REGLAS)) {
      const [examen, destreza, parte] = clave.split('/');
      const g = GUIA.find((x) => x.examen === examen && x.destreza === destreza && x.parte === Number(parte));
      expect(g, clave).toBeDefined();
      expect(BANCO.some((e) => e.examen === examen && e.destreza === destreza && e.parte === Number(parte)), `${clave} sin ejemplo`).toBe(true);
    }
    expect(GUIA.length).toBe(Object.keys(REGLAS).length);
  });

  it('el encargo lleva la tarea, el ejemplo y los fallos anteriores', () => {
    const g = guiaDe('c1', 'reading-use', 2)!;
    const ejemplo = BANCO.find((e) => e.examen === 'c1' && e.destreza === 'reading-use' && e.parte === 2)!;
    const p = promptEjercicio(g, ejemplo, 'urban gardens', ['Debe tener 8 preguntas y tiene 7.']);
    expect(p).toContain('Open cloze');
    expect(p).toContain('urban gardens');
    expect(p).toContain(ejemplo.id);
    expect(p).toContain('Debe tener 8 preguntas y tiene 7.');
  });

  it('extrae el JSON aunque venga con vallas y texto', () => {
    expect(extraerJson('Here you go:\n```json\n{"a":1}\n```\nEnjoy')).toEqual({ a: 1 });
    expect(() => extraerJson('sin json')).toThrow();
  });
});
