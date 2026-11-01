import { describe, expect, it } from 'vitest';
import { BANCO } from '../banco';
import { crearEjercicioIA, llamarAnthropic } from './ia';

const ejemplo = BANCO.find((e) => e.id === 'c1-rue-2-names')!;
const pedido = { examen: 'c1', destreza: 'reading-use', parte: 2 } as const;

describe('crear con IA', () => {
  it('acepta un ejercicio válido de la IA y lo marca como propio', async () => {
    // Una respuesta válida = el ejemplo con otro texto: el validador pide longitud, vocabulario y que no repita frases.
    const nuevo = { ...ejemplo, texto: ejemplo.texto!.replace(/\b(\w{4,})\b/g, (m) => `${m}s`), id: 'x' };
    const r = await crearEjercicioIA(pedido, BANCO, async () => JSON.stringify(nuevo));
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.ejercicio.id.startsWith('mio-ia-')).toBe(true);
  });

  it('si el validador la rechaza, se lo vuelve a pedir con los motivos y al final los devuelve', async () => {
    const prompts: string[] = [];
    const r = await crearEjercicioIA(pedido, BANCO, async (p) => {
      prompts.push(p);
      return JSON.stringify({ ...ejemplo, items: ejemplo.items.slice(0, 2) });
    });
    expect(r.ok).toBe(false);
    expect(prompts).toHaveLength(3);
    expect(prompts[1]).toContain('Debe tener 8 preguntas');
  });

  it('un fallo de clave se avisa sin reintentar', async () => {
    let llamadas = 0;
    const f = (async () => {
      llamadas++;
      return new Response('{}', { status: 401 });
    }) as unknown as typeof fetch;
    const r = await crearEjercicioIA(pedido, BANCO, llamarAnthropic('mala', f));
    expect(llamadas).toBe(1);
    expect(r).toEqual({ ok: false, motivos: ['La clave no es válida. Revísala en tu cuenta de Anthropic.'] });
  });

  it('una parte sin guía no se puede crear', async () => {
    const r = await crearEjercicioIA({ examen: 'c1', destreza: 'speaking', parte: 1 }, BANCO, async () => '');
    expect(r.ok).toBe(false);
  });
});
