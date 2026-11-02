import { beforeEach, describe, expect, it } from 'vitest';
import { CADUCA_MS, borrarBorrador, guardarBorrador, leerBorrador, tieneRespuestas } from './borrador';

const memoria = new Map<string, string>();
beforeEach(() => {
  memoria.clear();
  (globalThis as unknown as { localStorage: Storage }).localStorage = {
    getItem: (k: string) => memoria.get(k) ?? null,
    setItem: (k: string, v: string) => void memoria.set(k, v),
    removeItem: (k: string) => void memoria.delete(k),
  } as Storage;
});

const base = { ids: ['a', 'b'], i: 1, respuestas: { a: { 1: '0' } }, inicios: { b: 1000 } };

describe('borrador', () => {
  it('guarda y recupera lo mismo', () => {
    guardarBorrador('ana', base, 5000);
    expect(leerBorrador('ana', () => true, 6000)).toEqual({ ...base, guardado: 5000 });
  });

  it('es de cada alumno', () => {
    guardarBorrador('ana', base);
    expect(leerBorrador('luis', () => true)).toBeUndefined();
    expect(leerBorrador(undefined, () => true)).toBeUndefined();
  });

  it('caduca a las 24 horas', () => {
    guardarBorrador('ana', base, 0);
    expect(leerBorrador('ana', () => true, CADUCA_MS)).toBeDefined();
    expect(leerBorrador('ana', () => true, CADUCA_MS + 1)).toBeUndefined();
  });

  it('no sirve si un ejercicio ya no existe o el índice no cuadra', () => {
    guardarBorrador('ana', base);
    expect(leerBorrador('ana', (id) => id !== 'b')).toBeUndefined();
    guardarBorrador('ana', { ...base, i: 7 });
    expect(leerBorrador('ana', () => true)).toBeUndefined();
  });

  it('aguanta basura en el almacenamiento', () => {
    memoria.set('english-lab.borrador:ana', '{no es json');
    expect(leerBorrador('ana', () => true)).toBeUndefined();
    memoria.set('english-lab.borrador:ana', JSON.stringify({ ids: 'a', i: 0, guardado: Date.now() }));
    expect(leerBorrador('ana', () => true)).toBeUndefined();
  });

  it('se borra', () => {
    guardarBorrador('ana', base);
    borrarBorrador('ana');
    expect(leerBorrador('ana', () => true)).toBeUndefined();
  });

  it('solo guarda si hay algo contestado', () => {
    expect(tieneRespuestas({})).toBe(false);
    expect(tieneRespuestas({ a: { 1: '  ' } })).toBe(false);
    expect(tieneRespuestas({ a: { 1: '0' } })).toBe(true);
  });
});
