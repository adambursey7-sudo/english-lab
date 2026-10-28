import { describe, expect, it } from 'vitest';
import { alternativasDe, comunesDe, corrigeEjercicio, corrigeItem, cuentaPalabras, normaliza, palabrasRedaccion, textoRespuesta, vinetaDe, bandaDe } from './corregir';
import { elegir, montarExamen, practicarParte, montarExamenNumero, numerosExamen } from './examen';
import { BANCO, partesDe } from '../banco';
import { TIPOS_EVALUABLES, type Ejercicio, type Item } from '../banco/tipos';

const opciones: Item = { n: 1, tipo: 'opciones', opciones: ['regarded', 'believed', 'thought', 'assumed'], correcta: 0, explicacion: '' };
const palabra: Item = { n: 9, tipo: 'palabra', correctas: ['one'], explicacion: '' };
const transformacion: Item = {
  n: 25, tipo: 'transformacion', clave: 'ONLY', frase: '', inicio: '', fin: '',
  correctas: ['did I realise', 'did I realize'], explicacion: '',
};
const emparejar: Item = { n: 37, tipo: 'emparejar', pregunta: 'shares Writer A’s view', correcta: 2, explicacion: '' };
const comunes = ['Writer A', 'Writer B', 'Writer C', 'Writer D'];
const copiar: Item = { n: 2, tipo: 'palabra', pregunta: 'What did the film achieve?', correctas: ['the biggest box office hit'], maxPalabras: 10, explicacion: '' };
const verdaderoFalso: Item = {
  n: 1, tipo: 'verdaderoFalso', afirmacion: 'The album is only sold digitally.', correcta: false,
  pruebas: ['Physical copies of the soundtrack are available', 'Physical copies of the soundtrack, this being Barbie, are available'], explicacion: '',
};
const redaccion: Item = {
  n: 1, tipo: 'redaccion', tipoTexto: 'essay', enunciado: 'Write an essay.', minPalabras: 220, maxPalabras: 260, modelo: 'A model essay…', criterios: ['Content'],
};
const hablar: Item = { n: 1, tipo: 'hablar', interlocutor: 'Where are you from?', preguntas: ['Where are you from?'], segundos: 120 };

describe('normaliza', () => {
  it('ignora mayúsculas, espacios, puntuación final y comillas', () => {
    expect(normaliza('  Did I  Realise. ')).toBe('did i realise');
    expect(normaliza('wish you’d told')).toBe("wish you'd told");
    expect(normaliza('“Physical copies are available”,')).toBe('physical copies are available');
    expect(normaliza('')).toBe('');
  });
});

describe('corrigeItem', () => {
  it('opciones: compara el índice elegido', () => {
    expect(corrigeItem(opciones, '0').correcto).toBe(true);
    expect(corrigeItem(opciones, '1').correcto).toBe(false);
    expect(corrigeItem(opciones, undefined).correcto).toBe(false);
    expect(corrigeItem(opciones, '').correcto).toBe(false);
  });
  it('palabra: acepta cualquier variante correcta, sin importar mayúsculas', () => {
    expect(corrigeItem(palabra, 'One').correcto).toBe(true);
    expect(corrigeItem(palabra, 'some').correcto).toBe(false);
    expect(corrigeItem(palabra, '   ').correcto).toBe(false);
  });
  it('transformación: acepta las alternativas', () => {
    expect(corrigeItem(transformacion, 'did I realize').correcto).toBe(true);
    expect(corrigeItem(transformacion, 'I realised').correcto).toBe(false);
    expect(corrigeItem(transformacion, 'x').solucion).toBe('did I realise');
  });
  it('comunesDe elige la lista del item o la común', () => {
    const e = { opcionesComunes: ['x', 'y'], listas: [{ titulo: 'Task One', opciones: ['a', 'b'] }, { titulo: 'Task Two', opciones: ['c'] }] };
    expect(comunesDe(e, emparejar)).toEqual(['x', 'y']);
    expect(comunesDe(e, { ...emparejar, lista: 1 })).toEqual(['c']);
    expect(comunesDe({}, { ...emparejar, lista: 3 })).toEqual([]);
  });
  it('emparejar: elige de la lista común y la solución lleva la letra', () => {
    expect(corrigeItem(emparejar, '2', comunes).correcto).toBe(true);
    expect(corrigeItem(emparejar, '0', comunes).correcto).toBe(false);
    expect(corrigeItem(emparejar, '2', comunes).solucion).toBe('C Writer C');
    expect(textoRespuesta(corrigeItem(emparejar, '1', comunes), comunes)).toBe('B Writer B');
  });
  it('copiar del texto: vale el fragmento exacto, con tope de palabras', () => {
    expect(corrigeItem(copiar, 'The biggest box office hit.').correcto).toBe(true);
    expect(corrigeItem(copiar, 'it became the biggest box office hit, and now its soundtrack').correcto).toBe(false);
    expect(corrigeItem(copiar, 'a huge hit').correcto).toBe(false);
  });
  it('verdadero/falso: hace falta la palabra entera y la prueba copiada', () => {
    expect(corrigeItem(verdaderoFalso, 'FALSE\nPhysical copies of the soundtrack are available').correcto).toBe(true);
    expect(corrigeItem(verdaderoFalso, 'false\n“Physical copies of the soundtrack are available”.').correcto).toBe(true);
    expect(corrigeItem(verdaderoFalso, 'TRUE\nPhysical copies of the soundtrack are available').correcto).toBe(false);
    expect(corrigeItem(verdaderoFalso, 'FALSE').correcto).toBe(false);
    expect(corrigeItem(verdaderoFalso, 'F\nPhysical copies').correcto).toBe(false);
    expect(textoRespuesta(corrigeItem(verdaderoFalso, 'FALSE\nPhysical copies'))).toBe('FALSE — “Physical copies”');
    expect(corrigeItem(verdaderoFalso, '').solucion).toContain('FALSE');
    expect(alternativasDe(verdaderoFalso)).toHaveLength(1);
  });
  it('redacción y speaking no se corrigen solos', () => {
    const r = corrigeItem(redaccion, 'My essay');
    expect(r.evaluable).toBe(false);
    expect(r.correcto).toBe(false);
    expect(r.solucion).toBe('A model essay…');
    expect(corrigeItem(hablar, '').evaluable).toBe(false);
  });
  it('textoRespuesta enseña la letra en las opciones', () => {
    expect(textoRespuesta(corrigeItem(opciones, '2'))).toBe('C thought');
    expect(textoRespuesta(corrigeItem(opciones, undefined))).toBe('');
    expect(textoRespuesta(corrigeItem(palabra, 'one'))).toBe('one');
  });
});

describe('corrigeEjercicio', () => {
  it('cuenta aparte lo evaluable y lo pendiente de Adam', () => {
    const e: Ejercicio = {
      id: 'x', examen: 'pau', destreza: 'prueba', parte: 6, nombreParte: 'Composition', instrucciones: '', minutos: 30,
      items: [redaccion, { ...redaccion, n: 2 }], elegir: 1,
    };
    const c = corrigeEjercicio(e, { 1: 'Some text' });
    expect(c.total).toBe(0);
    expect(c.aciertos).toBe(0);
    expect(c.pendientes).toBe(1);
  });
});

describe('cuentaPalabras', () => {
  it('cuenta las contracciones como dos palabras', () => {
    expect(cuentaPalabras('did I realise')).toBe(3);
    expect(cuentaPalabras("wish you'd told")).toBe(4);
    expect(cuentaPalabras('')).toBe(0);
  });
  it('palabrasRedaccion cuenta trozos separados por espacios', () => {
    expect(palabrasRedaccion('I don’t think so.\n\nSecond paragraph here')).toBe(7);
    expect(palabrasRedaccion('   ')).toBe(0);
  });
});

describe('banco', () => {
  it('cada ejercicio está bien formado', () => {
    const ids = new Set<string>();
    for (const e of BANCO) {
      expect(ids.has(e.id), `id repetido ${e.id}`).toBe(false);
      ids.add(e.id);
      const ns = e.items.map((i) => i.n);
      expect(new Set(ns).size, `${e.id}: n repetido`).toBe(ns.length);
      if (e.texto) {
        const huecos = [...e.texto.matchAll(/\{\{(\d+)\}\}/g)].map((m) => Number(m[1]));
        for (const h of huecos) expect(ns, `${e.id}: hueco ${h} sin item`).toContain(h);
      }
      if (e.elegir !== undefined) expect(e.elegir, `${e.id}: elegir`).toBeLessThan(e.items.length);
      if (e.secciones) expect(new Set(e.secciones.map((s) => s.letra)).size).toBe(e.secciones.length);
      if (e.audio) {
        expect(e.audio.hablantes.length).toBeGreaterThan(0);
        const hablantes = new Set(e.audio.hablantes.map((h) => h.id));
        for (const l of e.audio.guion) if ('quien' in l) expect(hablantes.has(l.quien), `${e.id}: hablante ${l.quien}`).toBe(true);
      }
      for (const item of e.items) {
        const donde = `${e.id} ${item.n}`;
        switch (item.tipo) {
          case 'opciones':
            expect(item.opciones[item.correcta], donde).toBeDefined();
            break;
          case 'emparejar':
            expect(comunesDe(e, item)[item.correcta], `${donde}: falta en la lista de opciones`).toBeDefined();
            break;
          case 'palabra':
            expect(item.correctas.length, donde).toBeGreaterThan(0);
            if (item.frase) expect(item.frase, donde).toContain(`{{${item.n}}}`);
            break;
          case 'transformacion':
            for (const c of item.correctas) {
              const n = cuentaPalabras(c);
              expect(n, `${donde}: "${c}"`).toBeGreaterThanOrEqual(2);
              expect(n, `${donde}: "${c}"`).toBeLessThanOrEqual(6);
            }
            break;
          case 'verdaderoFalso': {
            const todo = normaliza([e.texto ?? '', ...(e.secciones ?? []).map((s) => s.texto)].join(' '));
            for (const p of item.pruebas) expect(todo, `${donde}: la prueba no está en el texto`).toContain(normaliza(p));
            break;
          }
          case 'redaccion':
            expect(item.modelo.length, donde).toBeGreaterThan(40);
            expect(item.minPalabras, donde).toBeLessThan(item.maxPalabras);
            expect(item.criterios.length, donde).toBeGreaterThan(0);
            break;
          case 'hablar':
            expect(item.segundos, donde).toBeGreaterThan(0);
            expect(item.preguntas.length + (item.imagenes?.length ?? 0) + (item.ideas?.length ?? 0), donde).toBeGreaterThan(0);
            break;
        }
        if (TIPOS_EVALUABLES.has(item.tipo)) expect(('explicacion' in item ? item.explicacion ?? '' : '').length, donde).toBeGreaterThan(10);
      }
    }
  });
  it('corrige un ejercicio entero del banco', () => {
    const e = BANCO.find((x) => x.id === 'c1-rue-2-names') as Ejercicio;
    const todas = Object.fromEntries(e.items.map((i) => [i.n, i.tipo === 'palabra' ? i.correctas[0] : '']));
    expect(corrigeEjercicio(e, todas).aciertos).toBe(8);
    expect(corrigeEjercicio(e, {}).aciertos).toBe(0);
  });
});

describe('montar exámenes', () => {
  it('un examen de C1 Use of English lleva una parte de cada, en orden', () => {
    const lista = montarExamen('c1', 'reading-use', [], () => 0);
    expect(lista.map((e) => e.parte)).toEqual(partesDe('c1', 'reading-use').map((p) => p.parte));
  });
  it('un examen numerado trae sus propias partes en orden', () => {
    for (const n of numerosExamen('c1', 'reading-use')) {
      const lista = montarExamenNumero('c1', 'reading-use', n, [], () => 0);
      expect(lista.map((e) => e.parte)).toEqual(partesDe('c1', 'reading-use').map((p) => p.parte));
      expect(lista.every((e) => e.examenNumero === n), `examen ${n} mezcla partes de otro`).toBe(true);
    }
    expect(numerosExamen('pau', 'prueba').length).toBeGreaterThan(0);
  });
  it('practicar una parte devuelve solo esa', () => {
    expect(practicarParte('c1', 'reading-use', 3, []).map((e) => e.parte)).toEqual([3]);
    expect(practicarParte('c1', 'reading-use', 99, [])).toEqual([]);
  });
  it('elegir prefiere lo no visto y, si todo está visto, lo más antiguo', () => {
    const a = { id: 'a' } as Ejercicio, b = { id: 'b' } as Ejercicio;
    expect(elegir([a, b], ['a'], () => 0)?.id).toBe('b');
    expect(elegir([a, b], ['b', 'a'], () => 0)?.id).toBe('b');
    expect(elegir([], [])).toBeUndefined();
  });
});

describe('vinetaDe', () => {
  it('elige la viñeta de Kate por la nota sobre 10', () => {
    expect(vinetaDe(0)).toBe(1);
    expect(vinetaDe(30)).toBe(1);
    expect(vinetaDe(35)).toBe(2);
    expect(vinetaDe(49)).toBe(2);
    expect(vinetaDe(50)).toBe(3);
    expect(vinetaDe(69)).toBe(3);
    expect(vinetaDe(70)).toBe(4);
    expect(vinetaDe(89)).toBe(4);
    expect(vinetaDe(90)).toBe(5);
    expect(vinetaDe(100)).toBe(5);
  });
});

describe('bandaDe', () => {
  it('banda estimada del C1 y nota sobre 10 en la PAU', () => {
    expect(bandaDe('c1', 80).etiqueta).toBe('Grade A');
    expect(bandaDe('c1', 79).etiqueta).toBe('Grade B');
    expect(bandaDe('c1', 60).etiqueta).toBe('Grade C');
    expect(bandaDe('c1', 45).etiqueta).toBe('Nivel B2');
    expect(bandaDe('c1', 10).etiqueta).toBe('Por debajo de B2');
    expect(bandaDe('pau', 75).etiqueta).toBe('7,5 sobre 10');
    expect(bandaDe('pau', 100).etiqueta).toBe('10,0 sobre 10');
  });
});
