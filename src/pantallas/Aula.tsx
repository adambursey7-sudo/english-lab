import { useMemo, useState } from 'react';
import { BANCO } from '../banco';
import { escribirAula, leerAula, leerEntregas, resumenClase, type Entrega } from '../motor/aula';
import { useLicencia } from '../motor/useLicencia';

/** Tabla de la clase: el profe pega los resultados que le mandan los alumnos y ve notas, media y partes más falladas. */
export function Aula() {
  const { pro } = useLicencia();
  const [entregas, setEntregas] = useState<Entrega[]>(leerAula);
  const [pegado, setPegado] = useState('');
  const [aviso, setAviso] = useState('');
  const resumen = useMemo(() => resumenClase(entregas), [entregas]);

  const cambiar = (lista: Entrega[]) => {
    setEntregas(lista);
    escribirAula(lista);
  };
  const anadir = () => {
    const { entregas: nuevas, ignoradas } = leerEntregas(pegado);
    if (nuevas.length === 0) return setAviso('No he entendido nada de lo que has pegado. Pega los códigos que empiezan por ELABR1.');
    // Si un alumno manda dos veces el mismo examen, vale la última.
    const claves = new Set(nuevas.map((e) => `${e.alumno}|${e.titulo}`));
    cambiar([...entregas.filter((e) => !claves.has(`${e.alumno}|${e.titulo}`)), ...nuevas]);
    setPegado('');
    setAviso(`${nuevas.length} ${nuevas.length === 1 ? 'resultado añadido' : 'resultados añadidos'}${ignoradas ? `; ${ignoradas} no se entendieron` : ''}.`);
  };
  const nombreParte = (id: string) => BANCO.find((e) => e.id === id)?.nombreParte ?? id;

  return (
    <main className="contenido" style={{ maxWidth: 720, margin: '0 auto' }}>
      <p><a href="#/">‹ Volver</a></p>
      <h1>Mi clase</h1>
      {!pro && <p className="silencio" role="status">El aula es de la versión completa. <a href="#/licencia">Activar licencia</a></p>}
      <label htmlFor="pegar" style={{ display: 'block', fontWeight: 600, margin: '10px 0 4px' }}>Pega aquí los resultados de tus alumnos (uno por línea)</label>
      <textarea id="pegar" className="campo" rows={4} value={pegado} onChange={(e) => setPegado(e.target.value)} placeholder="ELABR1.…" spellCheck={false} disabled={!pro} />
      <button type="button" className="btn" style={{ margin: '10px 0' }} onClick={anadir} disabled={!pro || pegado.trim().length < 10}>Añadir a la tabla</button>
      {aviso && <p role="status">{aviso}</p>}

      {entregas.length === 0 ? (
        <p className="silencio">Todavía no hay resultados. Comparte un examen desde «Crear examen» y pega aquí lo que te devuelvan.</p>
      ) : (
        <>
          <p><b>{entregas.length}</b> {entregas.length === 1 ? 'alumno' : 'alumnos'} · media de la clase <b>{resumen.media ?? '—'}{resumen.media !== null && ' %'}</b></p>
          <table className="tabla-aula" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr><th align="left">Alumno</th><th align="left">Examen</th><th align="right">Aciertos</th><th align="right">Nota</th><th /></tr></thead>
            <tbody>
              {resumen.alumnos.map((a, i) => (
                <tr key={`${a.alumno}${a.titulo}`} style={{ borderTop: '1px solid var(--line)' }}>
                  <td>{a.alumno}</td><td>{a.titulo}</td><td align="right">{a.ok}/{a.total}</td><td align="right"><b>{a.porcentaje} %</b></td>
                  <td align="right"><button type="button" className="btn enlace" onClick={() => cambiar(entregas.filter((_, j) => j !== i))} aria-label={`Quitar a ${a.alumno}`}>✕</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>Dónde fallan más</h2>
          <ol>
            {resumen.partes.slice(0, 5).map((p) => <li key={p.id}>{nombreParte(p.id)}: {p.porcentaje} % de acierto ({p.intentos} {p.intentos === 1 ? 'alumno' : 'alumnos'})</li>)}
          </ol>
          <button type="button" className="btn sec chico" onClick={() => window.confirm('¿Vaciar la tabla de la clase?') && cambiar([])}>Vaciar la tabla</button>
        </>
      )}
      <p className="silencio pequeno">Los resultados se guardan solo en este navegador.</p>
    </main>
  );
}
