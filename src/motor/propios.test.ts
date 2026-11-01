import { describe, expect, it } from 'vitest';
import { corrigeItem } from './corregir';
import { generarExamen, recetaCompleta } from './generador';
import { bancoCompleto, desdeHuecos, desdeOpciones, desdeVerdaderoFalso, exportarPropios, importarPropios, montarPropio, problemas, type DatosPropio } from './propios';

const datos: DatosPropio = { examen: 'c1', destreza: 'reading-use', parte: 2, titulo: 'Mi cloze', instrucciones: 'Fill each gap.', minutos: 8 };

describe('ejercicios propios', () => {
  it('los huecos entre corchetes se convierten en preguntas con varias respuestas válidas', () => {
    const { texto, items } = desdeHuecos('The cat sat [on/upon] the mat and [it] purred.');
    expect(texto).toBe('The cat sat {{1}} the mat and {{2}} purred.');
    expect(items.map((i) => i.correctas)).toEqual([['on', 'upon'], ['it']]);
    expect(corrigeItem(items[0], 'upon').correcto).toBe(true);
  });

  it('la opción múltiple lee la correcta marcada con *', () => {
    const items = desdeOpciones('Where is the cat?\nA) on the mat\n* B) in the box\nC) nowhere\n\nWho purrs?\n* the cat\nthe dog');
    expect(items).toHaveLength(2);
    expect(items[0].correcta).toBe(1);
    expect(items[0].opciones).toEqual(['on the mat', 'in the box', 'nowhere']);
    expect(items[1].correcta).toBe(0);
  });

  it('verdadero/falso exige la prueba del texto', () => {
    const items = desdeVerdaderoFalso('TRUE | The cat purrs. | The cat purred loudly.\nFALSE | The dog barks.');
    expect(items).toHaveLength(2);
    const e = montarPropio({ ...datos, examen: 'pau', destreza: 'prueba', parte: 1 }, items, 'The cat purred loudly all night.');
    expect(problemas(e)).toEqual(['La afirmación 2 necesita la frase del texto que la prueba.']);
  });

  it('avisa de lo que falta: correcta sin marcar, instrucciones vacías, hueco sin respuesta', () => {
    const sinCorrecta = montarPropio(datos, desdeOpciones('Q?\nuno\ndos'), undefined);
    expect(problemas(sinCorrecta).join(' ')).toContain('falta marcar la correcta');
    const vacio = montarPropio({ ...datos, instrucciones: '' }, [], undefined);
    expect(problemas(vacio)).toContain('Faltan las instrucciones para el alumno.');
    const hueco = montarPropio(datos, desdeHuecos('a [x] b').items, 'a {{1}} b {{2}}');
    expect(problemas(hueco)).toContain('El hueco 2 no tiene respuesta.');
  });

  it('un ejercicio propio entra en el generador con los del banco y el paquete se puede pasar a otro navegador', () => {
    const { texto, items } = desdeHuecos('It was [a] nice day.');
    const mio = montarPropio(datos, items, texto, 'mio-prueba');
    expect(problemas(mio)).toEqual([]);
    const banco = bancoCompleto([mio]);
    const receta = { ...recetaCompleta('c1', 3, banco), partes: [{ destreza: 'reading-use' as const, parte: 2, cuantos: 99 }] };
    expect(generarExamen(receta, banco).ids).toContain('mio-prueba');
    expect(importarPropios(exportarPropios([mio]))).toEqual([mio]);
    expect(importarPropios('{"ejercicios":[{"id":"otro","examen":"c1","items":[]}]}')).toEqual([]);
    expect(importarPropios('basura')).toBeNull();
  });
});
