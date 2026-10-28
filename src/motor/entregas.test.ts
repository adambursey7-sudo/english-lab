import { describe, expect, it } from 'vitest';
import { avisoPalabras, bandaPalabras, formatoReloj, textoEjercicioParaCompartir, textoParaCompartir } from './entregas';
import type { Ejercicio, ItemRedaccion } from '../banco/tipos';

const item: ItemRedaccion = { n: 2, tipo: 'redaccion', tipoTexto: 'review', enunciado: 'x', minPalabras: 220, maxPalabras: 260, modelo: 'm', criterios: ['c'] };
const ejercicio: Ejercicio = { id: 'w', examen: 'c1', destreza: 'writing', parte: 2, nombreParte: 'Choice of task', instrucciones: '', minutos: 45, items: [item] };

describe('palabras de una redacción', () => {
  it('clasifica por bandas', () => {
    expect(bandaPalabras(0, 220, 260)).toBe('vacio');
    expect(bandaPalabras(100, 220, 260)).toBe('pocas');
    expect(bandaPalabras(240, 220, 260)).toBe('bien');
    expect(bandaPalabras(300, 220, 260)).toBe('muchas');
  });
  it('avisa cuántas faltan o sobran', () => {
    expect(avisoPalabras(200, 220, 260)).toContain('faltan 20');
    expect(avisoPalabras(270, 220, 260)).toContain('te pasas en 10');
    expect(avisoPalabras(230, 220, 260)).toBe('230 palabras · bien');
  });
});

describe('texto para compartir', () => {
  it('lleva la tarea, el número de palabras y el texto', () => {
    const t = textoParaCompartir(ejercicio, item, 'One two three.', 'Ana');
    expect(t.startsWith('Ana · Cambridge C1 Advanced · Part 2 · Choice of task (review, tarea 2)')).toBe(true);
    expect(t).toContain('3 palabras');
    expect(t.endsWith('One two three.')).toBe(true);
  });
});

describe('reloj', () => {
  it('formatea minutos y segundos', () => {
    expect(formatoReloj(125)).toBe('2:05');
    expect(formatoReloj(0)).toBe('0:00');
    expect(formatoReloj(-3)).toBe('0:00');
  });
});

describe('texto de un ejercicio entero para compartir', () => {
  it('junta las réplicas contestadas con la etiqueta de la PAU', () => {
    const replica = (n: number): ItemRedaccion => ({ n, tipo: 'redaccion', tipoTexto: 'dialogue', enunciado: `Hueco ${n}`, minPalabras: 2, maxPalabras: 25, modelo: 'm', criterios: [] });
    const dialogo: Ejercicio = { id: 'd', examen: 'pau', destreza: 'prueba', parte: 4, nombreParte: 'Complete a conversation', instrucciones: '', minutos: 10, items: [replica(1), replica(2), replica(3)] };
    const t = textoEjercicioParaCompartir(dialogo, { 1: 'Where would you like to go?', 3: ' Me too! ' });
    expect(t).toBe(['PAU · Inglés · Pregunta 4 · Complete a conversation', '', '1. Where would you like to go?', '3. Me too!'].join('\n'));
  });
});
