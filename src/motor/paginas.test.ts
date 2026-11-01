import { describe, expect, it } from 'vitest';
import { cssTexto, reglaPagina } from './paginas';

describe('regla de página', () => {
  it('escapa comillas, barras y saltos de línea del nombre de la academia', () => {
    expect(cssTexto('Sol "A" \\ B\n')).toBe('Sol \\"A\\" \\\\ B ');
  });
  it('lleva academia, título y número de página', () => {
    const css = reglaPagina('Academia Sol', 'C1 · Test 5');
    expect(css).toContain('"Academia Sol"');
    expect(css).toContain('"C1 · Test 5"');
    expect(css).toContain('counter(page) " of " counter(pages)');
  });
  it('un nombre malicioso no puede cerrar el string ni la regla', () => {
    const css = reglaPagina('x"; } body { display:none } /*', 't');
    expect(css).not.toContain('"x";');
  });
});
