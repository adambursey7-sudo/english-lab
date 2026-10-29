import { useEffect, useState } from 'react';
import { BANCO } from '../banco';
import { NOMBRES_DESTREZA, NOMBRES_EXAMEN, etiquetaParte, type Destreza, type Ejercicio, type Examen } from '../banco/tipos';
import { bandaDe } from '../motor/corregir';
import { practicarParte } from '../motor/examen';
import { borrarHistorial, leerHistorial, paraMejorar, porcentaje, resumenDestreza, type ParteParaMejorar, type Registro } from '../motor/historial';
import { cargarNotas, fechaNota, leerNotasGuardadas, mediaNotas, notasDe, sobreDiez, textoNota, tituloNota, type NotaProfe, type NotasProfe } from '../motor/notas';
import type { Perfil } from '../motor/perfiles';

interface Props {
  perfil: Perfil;
  onInicio: () => void;
  /** Practicar una parte desde «Para mejorar». */
  onEmpezar: (lista: Ejercicio[]) => void;
}

const DESTREZAS: Record<Examen, Destreza[]> = {
  c1: ['reading-use', 'writing', 'listening', 'speaking'],
  pau: ['prueba'],
};

const TEXTO_ESTADO: Record<ParteParaMejorar['estado'], string> = {
  floja: 'Floja: repásala',
  regular: 'Regular: una vez más',
  'sin-hacer': 'Sin hacer todavía',
  bien: 'Va bien',
};

/** Progreso del alumno: resumen por destreza, dónde mejorar, las notas que pone Adam y todo lo hecho, por días. */
export function MisResultados({ perfil, onInicio, onEmpezar }: Props) {
  const [historial, setHistorial] = useState<Registro[]>(() => leerHistorial(perfil.id));
  const [notas, setNotas] = useState<NotasProfe>(leerNotasGuardadas);
  const [cargando, setCargando] = useState(true);
  const [confirmar, setConfirmar] = useState(false);
  const porId = new Map<string, Ejercicio>(BANCO.map((e) => [e.id, e]));
  const dias = agruparPorDia(historial);
  const misNotas = notasDe(notas, perfil.id);
  const examenes = (['c1', 'pau'] as Examen[]).filter((x) => x === perfil.examen || historial.some((r) => porId.get(r.id)?.examen === x) || misNotas.some((n) => n.examen === x));
  const mejorar = examenes.flatMap((x) => paraMejorar(historial, x));
  const pendientes = mejorar.filter((p) => p.estado !== 'bien');
  const vacio = historial.length === 0 && misNotas.length === 0;

  useEffect(() => {
    let vivo = true;
    cargarNotas().then((n) => {
      if (!vivo) return;
      setNotas(n);
      setCargando(false);
    });
    return () => {
      vivo = false;
    };
  }, []);

  const borrar = () => {
    borrarHistorial(perfil.id);
    setHistorial([]);
    setConfirmar(false);
  };

  return (
    <div className="app">
      <header className="cabecera aula compacta">
        <div className="cabecera-dentro">
          <div style={{ minWidth: 0 }}>
            <div className="sub">English Lab · {perfil.nombre}</div>
            <div className="titulo">Mi progreso</div>
          </div>
          <button type="button" className="btn chico sec claro" onClick={onInicio}>Inicio</button>
        </div>
      </header>

      <main className="contenido resultados">
        {vacio ? (
          <div className="hoja vacio">
            <h3>Todavía no hay nada, {perfil.nombre}</h3>
            <p className="silencio">Cuando corrijas un ejercicio, aquí quedará apuntado con su nota, verás dónde flojeas y las notas que te ponga Adam en los speaking y los writing.</p>
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
                    const deAdam = mediaNotas(misNotas.filter((n) => n.examen === x && n.destreza === d));
                    if (r.hechas === 0 && deAdam === null) return null;
                    const banda = r.media === null ? null : bandaDe(x, r.media);
                    return (
                      <div key={d} className={`ficha destreza resumen tono-${d}`}>
                        <b>{NOMBRES_DESTREZA[d]}</b>
                        <small>{r.hechas} de {r.partes} {r.partes === 1 ? 'parte hecha' : 'partes hechas'}</small>
                        <span className="progreso" aria-hidden="true"><span style={{ width: `${r.partes === 0 ? 0 : (r.hechas / r.partes) * 100}%` }} /></span>
                        {r.media !== null && banda && <small className="dato">mejores notas: {r.media}&nbsp;% · {banda.etiqueta}</small>}
                        {deAdam !== null && <small className="dato">nota de Adam: {textoNota(deAdam)}/10</small>}
                        {r.media === null && deAdam === null && <small className="dato">se corrige con Adam</small>}
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}

            <section className="bloque">
              <h2>Para mejorar</h2>
              {pendientes.length === 0 ? (
                <p className="silencio">Todas las partes que se corrigen solas van bien (70 % o más). ¡Sigue así!</p>
              ) : (
                <>
                  <p className="silencio pequeno">De peor a mejor. Toca una para practicarla ahora.</p>
                  <div className="lista">
                    {pendientes.slice(0, 6).map((p) => (
                      <button key={`${p.examen}-${p.destreza}-${p.parte}`} type="button" className={`tarjeta mejorar ${p.estado} tono-${p.destreza}`} onClick={() => onEmpezar(practicarParte(p.examen, p.destreza, p.parte))}>
                        <b>{etiquetaParte(p.examen, p.parte)} · {p.nombreParte}</b>
                        <small>
                          {NOMBRES_DESTREZA[p.destreza]}{examenes.length > 1 ? ` · ${NOMBRES_EXAMEN[p.examen]}` : ''} · {TEXTO_ESTADO[p.estado]}
                          {p.veces > 0 && ` · ${p.veces} ${p.veces === 1 ? 'vez' : 'veces'}`}
                        </small>
                        {p.mejor ? (
                          <span className={`mejor ${p.estado === 'regular' ? 'regular' : 'mal'}`}>{p.mejor.aciertos}/{p.mejor.total}</span>
                        ) : (
                          <span className="flecha" aria-hidden="true">›</span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </section>

            <section className="bloque">
              <h2>Notas de Adam</h2>
              {misNotas.length === 0 ? (
                <p className="silencio">{cargando ? 'Buscando notas nuevas…' : 'Cuando Adam corrija un speaking o un writing, la nota y su comentario saldrán aquí.'}</p>
              ) : (
                <div className="lista">
                  {misNotas.map((n, i) => (
                    <TarjetaNota key={`${n.fecha}-${n.destreza}-${i}`} nota={n} conExamen={examenes.length > 1} />
                  ))}
                </div>
              )}
            </section>

            {historial.length > 0 && (
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
            )}

            {historial.length > 0 && (
              <div className="acciones">
                {confirmar ? (
                  <div className="fila-botones">
                    <button type="button" className="btn sec peligro" onClick={borrar}>Sí, borrar todo</button>
                    <button type="button" className="btn sec" onClick={() => setConfirmar(false)}>No</button>
                  </div>
                ) : (
                  <button type="button" className="btn enlace" onClick={() => setConfirmar(true)}>Borrar mi historial de este móvil</button>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

/** Una nota de Adam: qué era, la nota y su comentario. */
function TarjetaNota({ nota, conExamen }: { nota: NotaProfe; conExamen: boolean }) {
  const diez = sobreDiez(nota);
  const sobre = nota.sobre && nota.sobre > 0 ? nota.sobre : 10;
  return (
    <div className={`tarjeta quieta nota-profe tono-${nota.destreza}`}>
      <b>{tituloNota(nota)}</b>
      <small>{conExamen ? `${NOMBRES_EXAMEN[nota.examen]} · ` : ''}{fechaNota(nota.fecha)}</small>
      <span className={`mejor ${diez >= 7 ? 'bien' : diez >= 5 ? 'regular' : 'mal'}`}>{textoNota(nota.nota)}/{sobre}</span>
      {nota.comentario && <p className="comentario">{nota.comentario}</p>}
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
