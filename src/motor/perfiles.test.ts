import { createHash } from 'node:crypto';
import { describe, expect, it, vi } from 'vitest';
import { EXAMENES } from '../banco/tipos';
import { sha256 } from './sha256';
import { PERFILES, elegirPerfil, etiquetaExamenes, examenesDe, huellaPin, perfilActivo, perfilesDe, pinCorrecto } from './perfiles';

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

describe('qué examen ve cada uno', () => {
  it('cada alumno solo el suyo; Adam y el invitado, los dos', () => {
    for (const p of PERFILES) expect(examenesDe(p)).toEqual(p.profe ? [...EXAMENES] : (p.examenes ?? [p.examen]));
    expect(examenesDe(PERFILES.find((p) => p.id === 'maria'))).toEqual(['pau']);
    expect(examenesDe(PERFILES.find((p) => p.id === 'eduardo'))).toEqual(['c1']);
    expect(examenesDe(PERFILES.find((p) => p.id === 'alba'))).toEqual(['b1', 'b2']);
    expect(examenesDe(undefined)).toEqual([...EXAMENES]);
  });

  it('Alba sale en B1 y en B2 y en ningún otro examen', () => {
    expect(perfilesDe('b1').map((p) => p.id)).toEqual(['alba']);
    expect(perfilesDe('b2').map((p) => p.id)).toEqual(['alba', 'sergio']);
    expect(perfilesDe('c1').map((p) => p.id)).not.toContain('alba');
    expect(perfilesDe('pau').map((p) => p.id)).not.toContain('alba');
    expect(etiquetaExamenes(PERFILES.find((p) => p.id === 'alba')!)).toBe('Cambridge B1 + B2');
    expect(etiquetaExamenes(PERFILES.find((p) => p.id === 'maria')!)).toBe('PAU · Inglés');
  });
});

describe('sesión', () => {
  it('solo vale si lleva el PIN bueno; escribir el nombre a mano no abre', () => {
    const datos = new Map<string, string>();
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => datos.get(k) ?? null,
      setItem: (k: string, v: string) => void datos.set(k, v),
      removeItem: (k: string) => void datos.delete(k),
    });
    const perfil = PERFILES[0];
    const pinReal = perfil.pin;
    perfil.pin = huellaPin(perfil.id, '1234');
    try {
      elegirPerfil(perfil, '1234');
      expect(perfilActivo()).toBe(perfil);
      datos.set('english-lab.sesion', perfil.id);
      expect(perfilActivo()).toBeUndefined();
      datos.set('english-lab.sesion', `${perfil.id}:9999`);
      expect(perfilActivo()).toBeUndefined();
      datos.set('english-lab.perfil', 'viejo');
      perfilActivo();
      expect(datos.has('english-lab.perfil')).toBe(false);
    } finally {
      perfil.pin = pinReal;
      vi.unstubAllGlobals();
    }
  });
});
