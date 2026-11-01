import { describe, expect, it } from 'vitest';
import { BANCO } from '../banco';
import { generarExamen, recetaCompleta, type Receta } from './generador';

const receta = (extra: Partial<Receta> = {}): Receta => ({ ...recetaCompleta('c1', 7), ...extra });
const ejercicios = (g: ReturnType<typeof generarExamen>) => g.papeles.flatMap((p) => p.partes);

describe('generador', () => {
  it('con la misma receta sale el mismo examen', () => {
    expect(generarExamen(receta()).ids).toEqual(generarExamen(receta()).ids);
  });

  it('no repite ejercicios y respeta las destrezas', () => {
    const ids = ejercicios(generarExamen(receta())).map((e) => e.id);
    expect(ids.length).toBeGreaterThan(0);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('evita los usados mientras queden otros de la misma parte', () => {
    const base = recetaCompleta('c1', 1);
    const primero = generarExamen(base);
    const segundo = generarExamen({ ...base, evitar: primero.ids });
    const conVariedad = base.partes.filter((p) => BANCO.filter((e) => e.examen === 'c1' && e.destreza === p.destreza && e.parte === p.parte).length > 1);
    expect(conVariedad.length).toBeGreaterThan(0);
    const nuevos = ejercicios(segundo).filter((e) => conVariedad.some((p) => p.destreza === e.destreza && p.parte === e.parte));
    expect(nuevos.every((e) => !primero.ids.includes(e.id))).toBe(true);
  });

  it('avisa de lo que falta si el banco no llega', () => {
    const g = generarExamen({ ...receta(), partes: [{ destreza: 'reading-use', parte: 1, cuantos: 99 }] });
    expect(g.faltan[0].cuantos).toBeGreaterThan(0);
  });

  it('soloAutomaticos deja fuera writing y speaking', () => {
    const g = generarExamen(receta({ soloAutomaticos: true }));
    expect(g.papeles.some((p) => p.destreza === 'writing' || p.destreza === 'speaking')).toBe(false);
  });

  it('la versión B cambia el orden de las opciones pero la correcta sigue siendo la misma', () => {
    const a = ejercicios(generarExamen(receta()));
    const b = ejercicios(generarExamen(receta({ version: 'B' })));
    let cambiadas = 0;
    for (const eb of b) {
      const ea = a.find((x) => x.id === eb.id);
      for (const ib of eb.items) {
        const ia = ea?.items.find((x) => x.n === ib.n);
        if (ib.tipo !== 'opciones' || ia?.tipo !== 'opciones') continue;
        expect(ib.opciones[ib.correcta]).toBe(ia.opciones[ia.correcta]);
        expect([...ib.opciones].sort()).toEqual([...ia.opciones].sort());
        if (ib.opciones.join() !== ia.opciones.join()) cambiadas++;
      }
    }
    expect(cambiadas).toBeGreaterThan(0);
  });
});
