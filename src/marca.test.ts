import { describe, expect, it } from 'vitest';
import { marcaDesde, urlLogo } from './marca';

describe('marca', () => {
  it('rellena lo que falta con la marca base', () => {
    const m = marcaDesde(null);
    expect(m.nombre).toBe('English Lab');
    expect(m.logo).toBe('');
    expect(m.color).toBe('#34502b');
  });

  it('acepta nombre y color válidos y recorta el nombre', () => {
    const m = marcaDesde({ nombre: '  Academia Sol  ', color: '#112233' });
    expect(m.nombre).toBe('Academia Sol');
    expect(m.color).toBe('#112233');
  });

  it('rechaza colores raros y logos que no son imagen o son enormes', () => {
    expect(marcaDesde({ color: 'red; background:url(x)' }).color).toBe('#34502b');
    expect(marcaDesde({ logo: 'https://malo.example/x.png' }).logo).toBe('');
    expect(marcaDesde({ logo: 'data:image/png;base64,' + 'A'.repeat(500_000) }).logo).toBe('');
    expect(marcaDesde({ logo: 'data:image/png;base64,AAAA' }).logo).toBe('data:image/png;base64,AAAA');
  });

  it('urlLogo cuelga los logos del proyecto de la base y deja los de datos', () => {
    expect(urlLogo({ nombre: 'x', logo: 'img/logo.png', logoAlt: '', color: '#000000' }, '/english-lab/')).toBe('/english-lab/img/logo.png');
    expect(urlLogo({ nombre: 'x', logo: 'data:image/png;base64,AA', logoAlt: '', color: '#000000' }, '/')).toBe('data:image/png;base64,AA');
    expect(urlLogo({ nombre: 'x', logo: '', logoAlt: '', color: '#000000' })).toBe('');
  });
});
