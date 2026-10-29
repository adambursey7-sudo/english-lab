import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { sha256 } from './sha256';
import { PERFILES, huellaPin, pinCorrecto } from './perfiles';

describe('perfiles con PIN', () => {
  it('sha256 coincide con el de Node (el que usa scripts/pin.mjs)', () => {
    for (const texto of ['', 'abc', 'english-lab:eduardo:0420', 'ñandú 🦜', 'x'.repeat(200)]) {
      expect(sha256(texto)).toBe(createHash('sha256').update(texto).digest('hex'));
    }
  });

  it('el PIN correcto abre y uno distinto no', () => {
    const perfil = { ...PERFILES[0], pin: huellaPin(PERFILES[0].id, '1234') };
    expect(pinCorrecto(perfil, '1234')).toBe(true);
    expect(pinCorrecto(perfil, '1235')).toBe(false);
    expect(pinCorrecto({ ...perfil, pin: '' }, '1234')).toBe(false);
  });

  it('todos los alumnos tienen PIN puesto', () => {
    for (const p of PERFILES) expect(p.pin, p.nombre).toMatch(/^[0-9a-f]{64}$/);
  });
});
