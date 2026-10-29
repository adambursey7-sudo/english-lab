import { useState } from 'react';
import { BANCO } from '../banco';
import { NOMBRES_DESTREZA, NOMBRES_EXAMEN, etiquetaParte, type Destreza, type Ejercicio, type Examen } from '../banco/tipos';
import { bandaDe } from '../motor/corregir';
import { borrarHistorial, leerHistorial, porcentaje, resumenDestreza, type Registro } from '../motor/historial';

interface Props {
  onInicio: () => void;
}

const DESTREZAS: Record<Examen, Destreza[]> = {
  c1: ['reading-use', 'writing', 'listening', 'speaking'],
  pau: ['prueba'],
};

/** Historial guardado en este móvil: resumen por destreza y la lista de todo lo hecho, por días. */
export function MisResultados({ onInicio }: Props) {
  const [historial, setHistorial] = useState<Registro[]>(leerHistorial);
  const [confirmar, setConfirmar] = useState(false);
  const porId = new Map<string, Ejercicio>(BANCO.map((e) => [e.id, e]));
  const dias = agruparPorDia(historial);
  const examenes = (['c1', 'pau'] as Examen[]).filter((x) => historial.some((r) => porId.get(r.id)?.examen === x));

  const borrar = () => {
    borrarHistorial();
    setHistorial([]);
    setConfirmar(false);
  };

  return (
    <div className="app">
      <header className="cabecera aula compacta">
        <div className="cabecera-dentro">
          <div style={{ minWidth: 0 }}>
            <div className="sub">English Lab</div>
            <div className="titulo">Mis resultados</div>
          </div>
          <button type="button" className="btn chico sec claro" onClick={onInicio}>Inicio</button>
        </div>
      </header>

      <main className="contenido resultados">
        {historial.length === 0 ? (
          <div className="hoja vacio">
            <h3>Todavía no hay nada</h3>
            <p className="silencio">Cuando corrijas un ejercicio, aquí quedará apuntado con su nota. Solo se guarda en este móvil.</p>
            <button type="button" className="btn" onClick={onInicio}>Empezar a practicar</button>
          </div>
        ) : (
          <>
            {examenes.map((x) => (
              <section key={x} className="bloque">
                <h2>{NOMBRES_EXAMEN[x]}</h2>
                <div className={`destrezas${DESTREZAS[x].length === 1 ? ' una' : ''}`}>
                  {DESTREZAS[x].map((d) => {
                    const r = resumenDestreza(historial, x, d);
                    if (r.hechas === 0) return null;
                    const banda = r.media === null ? null : bandaDe(x, r.media);
                    return (
                      <div key={d} className={`ficha destreza resumen tono-${d}`}>
                        <b>{NOMBRES_DESTREZA[d]}</b>
                        <small>{r.hechas} de {r.partes} {r.partes === 1 ? 'parte hecha' : 'partes hechas'}</small>
                        <span className="progreso" aria-hidden="true"><span style={{ width: `${r.partes === 0 ? 0 : (r.hechas / r.partes) * 100}%` }} /></span>
                        {r.media !== null && banda && <small className="dato">mejores notas: {r.media}&nbsp;% · {banda.etiqueta}</small>}
                        {r.media === null && <small className="dato">se corrige con Adam</small>}
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}

            <section className="bloque">
              <h2>Todo lo hecho</h2>
              {dias.map((dia) => (
                <div key={dia.clave} className="dia">
                  <div className="eyebrow">{dia.etiqueta}</div>
                  <div className="lista">
                    {dia.registros.map((r, i) => {
                      const e = porId.get(r.id);
                      const p = porcentaje(r);
                      const nota = r.total === 0 ? null : p;
                      return (
                        <div key={`${r.id}-${r.fecha}-${i}`} className={`tarjeta quieta${e ? ` tono-${e.destreza}` : ''}`}>
                          <b>{e ? `${etiquetaParte(e.examen, e.parte)} · ${e.nombreParte}` : 'Ejercicio retirado del banco'}</b>
                          <small>{e ? `${NOMBRES_EXAMEN[e.examen]} · ${NOMBRES_DESTREZA[e.destreza]}` : ''}{e?.examenNumero ? ` · examen ${e.examenNumero}` : ''} · {hora(r.fecha)}</small>
                          {nota === null ? (
                            <span className="mejor neutro">enviado</span>
                          ) : (
                            <span className={`mejor ${p >= 70 ? 'bien' : p >= 50 ? 'regular' : 'mal'}`}>{r.aciertos}/{r.total}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </section>

            <div className="acciones">
              {confirmar ? (
                <div className="fila-botones">
                  <button type="button" className="btn sec peligro" onClick={borrar}>Sí, borrar todo</button>
                  <button type="button" className="btn sec" onClick={() => setConfirmar(false)}>No</button>
                </div>
              ) : (
                <button type="button" className="btn enlace" onClick={() => setConfirmar(true)}>Borrar mi historial</button>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

interface Dia {
  clave: string;
  etiqueta: string;
  registros: Registro[];
}

/** Agrupa el historial por día (los más recientes primero) con una etiqueta legible: «Hoy», «Ayer» o la fecha. */
export function agruparPorDia(historial: Registro[], ahora = new Date()): Dia[] {
  const dias = new Map<string, Dia>();
  const hoy = claveDia(ahora);
  const ayer = claveDia(new Date(ahora.getTime() - 24 * 3600 * 1000));
  for (const r of [...historial].reverse()) {
    const fecha = new Date(r.fecha);
    if (Number.isNaN(fecha.getTime())) continue;
    const clave = claveDia(fecha);
    const dia = dias.get(clave) ?? {
      clave,
      etiqueta: clave === hoy ? 'Hoy' : clave === ayer ? 'Ayer' : fecha.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }),
      registros: [],
    };
    dia.registros.push(r);
    dias.set(clave, dia);
  }
  return [...dias.values()];
}

function claveDia(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function hora(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}
