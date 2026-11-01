import { describe, expect, it } from 'vitest';
import { BANCO } from '../banco';
import { codificarEntrega, codificarExamen, decodificarEntrega, decodificarExamen, leerEntregas, montarDesdeIds, resumenClase, type Entrega, type ExamenAula } from './aula';
import { generarExamen, recetaCompleta } from './generador';

const base: ExamenAula = { v: 1, examen: 'c1', titulo: 'Test 7 · Version B', ids: [], version: 'B', semilla: 7, marca: { nombre: 'Academia Sol', color: '#1f4e79' } };

describe('aula', () => {
  it('el examen del enlace se reconstruye idéntico al generado, también en versión B', () => {
    const receta = { ...recetaCompleta('c1', 7), version: 'B' as const, soloAutomaticos: true };
    const g = generarExamen(receta);
    const enlace = codificarExamen({ ...base, ids: g.ids });
    const leido = decodificarExamen(enlace)!;
    expect(leido.marca.nombre).toBe('Academia Sol');
    const { ejercicios, faltan } = montarDesdeIds(leido, BANCO);
    expect(faltan).toEqual([]);
    expect(ejercicios).toEqual(g.papeles.flatMap((p) => p.partes).sort((a, b) => g.ids.indexOf(a.id) - g.ids.indexOf(b.id)));
  });

  it('un enlace roto o manipulado no se acepta y lo que enseña se limpia', () => {
    expect(decodificarExamen('basura')).toBeNull();
    expect(decodificarExamen(codificarExamen({ ...base, ids: [] }))).toBeNull();
    const sucio = decodificarExamen(codificarExamen({ ...base, ids: ['c1-rue-1-libraries', '<script>x</script>'], marca: { nombre: 'A'.repeat(200), color: 'rojo' } }))!;
    expect(sucio.ids).toEqual(['c1-rue-1-libraries']);
    expect(sucio.marca.nombre.length).toBe(60);
    expect(sucio.marca.color).toBe('#34502b');
  });

  it('un id que no está en esta versión de la app se avisa', () => {
    const { faltan } = montarDesdeIds({ ...base, ids: ['c1-rue-1-libraries', 'no-existe'] }, BANCO);
    expect(faltan).toEqual(['no-existe']);
  });

  it('la entrega viaja como texto y no admite notas imposibles', () => {
    const e: Entrega = { v: 1, alumno: 'Ana García', titulo: 'Test 7', fecha: '2026-11-20', partes: [{ id: 'a', ok: 5, total: 8 }] };
    expect(decodificarEntrega(codificarEntrega(e))).toEqual(e);
    expect(decodificarEntrega(codificarEntrega({ ...e, partes: [{ id: 'a', ok: 9, total: 8 }] }))).toBeNull();
    expect(decodificarEntrega('ELABR1.zzz')).toBeNull();
  });

  it('la clase suma entregas, saca la media y ordena las partes de peor a mejor', () => {
    const a: Entrega = { v: 1, alumno: 'Ana', titulo: 't', fecha: '', partes: [{ id: 'p1', ok: 8, total: 8 }, { id: 'p2', ok: 2, total: 8 }] };
    const b: Entrega = { v: 1, alumno: 'Beto', titulo: 't', fecha: '', partes: [{ id: 'p1', ok: 4, total: 8 }, { id: 'p2', ok: 0, total: 8 }] };
    const r = resumenClase([a, b]);
    expect(r.alumnos.map((x) => x.porcentaje)).toEqual([63, 25]);
    expect(r.media).toBe(44);
    expect(r.partes.map((p) => p.id)).toEqual(['p2', 'p1']);
    const { entregas, ignoradas } = leerEntregas(`${codificarEntrega(a)}\n  ${codificarEntrega(b)} basura`);
    expect(entregas).toHaveLength(2);
    expect(ignoradas).toBe(1);
  });
});
