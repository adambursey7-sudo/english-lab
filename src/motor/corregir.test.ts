import { describe, expect, it } from 'vitest';
import { corrigeEjercicio, corrigeItem, cuentaPalabras, normaliza, textoRespuesta } from './corregir';
import { elegir, montarExamen, practicarParte } from './examen';
import { BANCO, partesDe } from '../banco';
import type { Ejercicio, Item } from '../banco/tipos';

const opciones: Item = { n: 1, tipo: 'opciones', opciones: ['regarded', 'believed', 'thought', 'assumed'], correcta: 0, explicacion: '' };
const palabra: Item = { n: 9, tipo: 'palabra', correctas: ['one'], explicacion: '' };
const transformacion: Item = {
  n: 25, tipo: 'transformacion', clave: 'ONLY', frase: '', inicio: '', fin: '',
  correctas: ['did I realise', 'did I realize'], explicacion: '',
};

describe('normaliza', () => {
  it('ignora mayúsculas, espacios, punto final y comillas curvas', () => {
    expect(normaliza('  Did I  Realise. ')).toBe('did i realise');
    expect(normaliza('wish you’d told')).toBe("wish you'd told");
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
  it('textoRespuesta enseña la letra en las opciones', () => {
    expect(textoRespuesta(corrigeItem(opciones, '2'))).toBe('C thought');
    expect(textoRespuesta(corrigeItem(opciones, undefined))).toBe('');
    expect(textoRespuesta(corrigeItem(palabra, 'one'))).toBe('one');
  });
});

describe('cuentaPalabras', () => {
  it('cuenta las contracciones como dos palabras', () => {
    expect(cuentaPalabras('did I realise')).toBe(3);
    expect(cuentaPalabras("wish you'd told")).toBe(4);
    expect(cuentaPalabras('')).toBe(0);
  });
});

describe('banco', () => {
  it('cada ejercicio tiene id único, items con n único y huecos del texto que existen', () => {
    const ids = new Set<string>();
    for (const e of BANCO) {
      expect(ids.has(e.id)).toBe(false);
      ids.add(e.id);
      const ns = e.items.map((i) => i.n);
      expect(new Set(ns).size).toBe(ns.length);
      if (e.texto) {
        const huecos = [...e.texto.matchAll(/\{\{(\d+)\}\}/g)].map((m) => Number(m[1]));
        expect(huecos.sort((a, b) => a - b)).toEqual([...ns].sort((a, b) => a - b));
      }
      for (const item of e.items) {
        if (item.tipo === 'opciones') expect(item.opciones[item.correcta]).toBeDefined();
        else {
          expect(item.correctas.length).toBeGreaterThan(0);
          if (item.tipo === 'transformacion') {
            for (const c of item.correctas) {
              const n = cuentaPalabras(c);
              expect(n, `${e.id} ${item.n}: "${c}"`).toBeGreaterThanOrEqual(2);
              expect(n, `${e.id} ${item.n}: "${c}"`).toBeLessThanOrEqual(6);
            }
          }
        }
        expect(item.explicacion.length).toBeGreaterThan(10);
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
