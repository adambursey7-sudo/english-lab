import { describe, expect, it } from 'vitest';
import { exportar, fusionar, guardadoValido, gruposDe, importar, usadosDe, type Guardado } from './misExamenes';
import { generarExamen, recetaCompleta } from './generador';

function ejemplo(id: string, grupo: string): Guardado {
  const receta = recetaCompleta('c1', 5);
  return { id, nombre: `Test ${id}`, grupo, fecha: '2026-11-01', receta, ids: generarExamen(receta).ids };
}

describe('mis exámenes', () => {
  it('guarda y recupera una copia de seguridad sin perder nada', () => {
    const a = [ejemplo('a', '1º Bach'), ejemplo('b', '')];
    expect(importar(exportar(a))).toEqual(a);
  });

  it('rechaza lo que no es una copia y limpia lo que viene roto', () => {
    expect(importar('no es json')).toBeNull();
    expect(importar('{"otra":1}')).toBeNull();
    const roto = { id: 'x', receta: { examen: 'toefl', partes: [], semilla: 1 } };
    expect(guardadoValido(roto)).toBeNull();
    const raro = guardadoValido({ ...ejemplo('c', 'g'), nombre: '  <b>hola</b>  '.repeat(20), receta: { ...recetaCompleta('pau', 3), version: 'Z' } });
    expect(raro?.nombre.length).toBeLessThanOrEqual(80);
    expect(raro?.receta.version).toBe('A');
  });

  it('el historial de un grupo junta lo que ya se le puso, sin mezclar grupos', () => {
    const lista = [ejemplo('a', '1º Bach'), ejemplo('b', '2º Bach')];
    expect(usadosDe('1º bach', lista)).toEqual(lista[0].ids);
    expect(usadosDe('', lista)).toEqual([]);
    expect(usadosDe('otro', lista)).toEqual([]);
    expect(gruposDe(lista)).toEqual(['1º Bach', '2º Bach']);
  });

  it('al fusionar, lo importado reemplaza lo que tiene el mismo id', () => {
    const r = fusionar([ejemplo('a', 'x')], [{ ...ejemplo('a', 'y') }, ejemplo('b', 'z')]);
    expect(r.map((g) => g.grupo).sort()).toEqual(['y', 'z']);
  });
});
