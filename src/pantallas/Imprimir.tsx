import { Fragment } from 'react';
import type { Ejercicio, Item, ItemHablar, ItemRedaccion } from '../banco/tipos';
import { NOMBRES_EXAMEN, TIPOS_EVALUABLES, etiquetaParte, type Examen } from '../banco/tipos';
import { QR } from '../componentes/QR';
import { TextoHuecos } from '../componentes/TextoHuecos';
import { enlaceAudio } from '../config';
import { claveDe, letra, montarCuadernillo, partesListening, type Cuadernillo, type Papel } from '../motor/cuadernillo';
import './imprimir.css';

interface Props {
  examen: Examen;
  numero: number;
  /** `cuadernillo`: el examen para el alumno. `clave`: las respuestas con explicaciones, para el profe. */
  modo: 'cuadernillo' | 'clave';
}

/**
 * Vista de impresión (estilo «examen oficial»: blanco y negro, A4, sobrio). Se abre en `#/imprimir/<examen>/<n>` y
 * `#/imprimir/<examen>/<n>/clave`; el PDF sale con «Descargar en PDF» (impresión del navegador) o con `scripts/pdf.ps1`.
 */
export function Imprimir({ examen, numero, modo }: Props) {
  const cuadernillo = montarCuadernillo(examen, numero);
  if (!cuadernillo) {
    return (
      <div className="imprimir">
        <Barra examen={examen} numero={numero} modo={modo} />
        <main className="pagina">
          <h1>No existe el examen {numero} de {NOMBRES_EXAMEN[examen]}</h1>
          <p>Todavía no hay ninguna parte con ese número en el banco.</p>
        </main>
      </div>
    );
  }
  return (
    <div className={`imprimir ${modo}`}>
      <Barra examen={examen} numero={numero} modo={modo} />
      {modo === 'cuadernillo' ? <CuadernilloAlumno c={cuadernillo} /> : <ClaveProfe c={cuadernillo} />}
    </div>
  );
}

/** Botones que no salen en el papel: volver, descargar, cambiar entre cuadernillo y clave, abrir el audio. */
function Barra({ examen, numero, modo }: Props) {
  return (
    <nav className="barra-pdf no-imprimir" aria-label="Opciones del cuadernillo">
      <a className="btn sec chico" href="#/">‹ Volver a la app</a>
      <span className="barra-titulo">{NOMBRES_EXAMEN[examen]} · Examen {numero} · {modo === 'clave' ? 'Clave de respuestas' : 'Cuadernillo'}</span>
      <a className="btn sec chico" href={modo === 'clave' ? `#/imprimir/${examen}/${numero}` : `#/imprimir/${examen}/${numero}/clave`}>
        {modo === 'clave' ? 'Ver el cuadernillo' : 'Ver la clave'}
      </a>
      <a className="btn sec chico" href={`#/audio/${examen}/${numero}`}>Audio del listening</a>
      <button type="button" className="btn chico" onClick={() => window.print()}>Descargar en PDF</button>
    </nav>
  );
}

function CuadernilloAlumno({ c }: { c: Cuadernillo }) {
  const listening = partesListening(c);
  const audio = enlaceAudio(c.examen, c.numero);
  const total = c.papeles.reduce((n, p) => n + p.minutos, 0);
  return (
    <main className="pagina">
      {/* Portada */}
      <section className="portada">
        <div className="portada-marca">English Lab</div>
        <h1>{c.titulo}</h1>
        <div className="portada-numero">Examen {c.numero}</div>
        <table className="tabla papeles">
          <thead>
            <tr><th>Paper</th><th>Parts</th><th>Questions</th><th>Time</th></tr>
          </thead>
          <tbody>
            {c.papeles.map((p, i) => (
              <tr key={p.destreza}>
                <td>{c.examen === 'c1' ? `Paper ${i + 1} · ` : ''}{p.titulo}</td>
                <td>{p.partes.length}</td>
                <td>{p.preguntas > 0 ? p.preguntas : '—'}</td>
                <td>{minutos(p.minutos)}</td>
              </tr>
            ))}
            <tr className="total"><td>Total</td><td /><td /><td>{minutos(total)}</td></tr>
          </tbody>
        </table>
        <div className="instrucciones-generales">
          <h3>Instructions to candidates</h3>
          <ul>
            <li>Do not open this booklet until you are told to do so.</li>
            <li>Write your name and the date in the spaces below.</li>
            <li>Read the instructions for each part carefully. Answer all the questions unless the instructions say otherwise.</li>
            <li>Write your answers on the answer sheet at the end of the booklet. Use a pencil or a pen with blue or black ink.</li>
            <li>You must not use a dictionary.</li>
            {listening.length > 0 && <li>For the Listening paper, scan the QR code to play the recordings. Each recording is played twice.</li>}
          </ul>
        </div>
        <div className="firma">
          <div><span>Name</span><span className="linea" /></div>
          <div><span>Date</span><span className="linea corta" /></div>
        </div>
        {listening.length > 0 && (
          <div className="portada-qr">
            <QR texto={audio} lado={150} alt="QR del audio del listening" />
            <div>
              <b>Listening audio</b>
              <p>Scan the code or open:</p>
              <p className="url">{audio}</p>
            </div>
          </div>
        )}
      </section>

      {c.papeles.map((p, i) => (
        <PapelImpreso key={p.destreza} c={c} papel={p} indice={i} audio={audio} />
      ))}

      <HojaRespuestas c={c} />
    </main>
  );
}

function PapelImpreso({ c, papel, indice, audio }: { c: Cuadernillo; papel: Papel; indice: number; audio: string }) {
  return (
    <section className="papel">
      <header className="papel-cabecera">
        <div className="papel-nombre">{c.examen === 'c1' ? `Paper ${indice + 1}` : 'PAU · Inglés'}</div>
        <h2>{papel.titulo}</h2>
        <div className="papel-datos">
          {minutos(papel.minutos)}
          {papel.preguntas > 0 && ` · ${papel.preguntas} questions`}
          {papel.destreza === 'listening' && ' · approximately'}
        </div>
      </header>
      {papel.destreza === 'listening' && (
        <div className="aviso-audio">
          <QR texto={audio} lado={96} alt="QR del audio del listening" />
          <div>
            <b>Play the recording</b>
            <p>Scan the code or open <span className="url">{audio}</span>. The recording includes the instructions and the pauses of the real test, and each part is played twice.</p>
          </div>
        </div>
      )}
      {papel.destreza === 'speaking' && (
        <p className="nota-papel">Interlocutor’s script and candidate prompts. The Speaking test is taken in pairs with two examiners; this booklet lets you practise with a partner or a teacher.</p>
      )}
      {papel.partes.map((e) => (
        <ParteImpresa key={e.id} e={e} />
      ))}
    </section>
  );
}

function ParteImpresa({ e }: { e: Ejercicio }) {
  const conLetra = (it: Item | undefined) => it?.tipo === 'opciones' || it?.tipo === 'emparejar';
  const conOpcionesLargas = e.opcionesComunes && e.opcionesComunes.some((o) => o.length > 24);
  return (
    <article className="parte">
      <h3>
        {etiquetaParte(e.examen, e.parte)}
        <span className="parte-nombre"> · {e.nombreParte}</span>
      </h3>
      <p className="parte-instrucciones">{e.instrucciones}</p>
      {e.elegir !== undefined && e.items.some((i) => i.tipo === 'redaccion') && e.items.length > e.elegir && (
        <p className="parte-instrucciones"><b>Answer {e.elegir === 1 ? 'ONE' : e.elegir} of the {e.items.length} tasks.</b></p>
      )}

      {e.texto && (
        <div className="texto-examen">
          <TextoHuecos
            texto={e.texto}
            titulo={e.titulo}
            hueco={(n) => {
              const it = e.items.find((i) => i.n === n);
              if (it?.tipo === 'emparejar') return <span className="hueco-parrafo">{n}</span>;
              return (
                <>
                  <span className="hueco-impreso">({n}) {conLetra(it) ? '……' : '……………'}</span>
                  {it?.tipo === 'palabra' && it.raiz && <span className="raiz-impresa">{it.raiz.toUpperCase()}</span>}
                </>
              );
            }}
          />
        </div>
      )}

      {e.secciones && (
        <div className="texto-examen secciones">
          {e.titulo && !e.texto && <h4>{e.titulo}</h4>}
          {e.secciones.map((s) => (
            <div key={s.letra} className="seccion-impresa">
              <div className="seccion-letra">{s.letra}</div>
              <div>
                {s.titulo && <b className="seccion-titulo">{s.titulo}</b>}
                {s.texto.split(/\n\n+/).map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          ))}
        </div>
      )}

      {conOpcionesLargas && e.opcionesComunes && (
        <div className="comunes-impresas">
          <div className="eyebrow-impreso">{e.parte === 7 && e.destreza === 'reading-use' ? 'Missing paragraphs (there is one extra paragraph which you do not need to use)' : 'Options'}</div>
          {e.opcionesComunes.map((o, i) => (
            <div key={i} className="comun-impresa"><span className="seccion-letra">{letra(i)}</span><span>{o}</span></div>
          ))}
        </div>
      )}

      {e.listas && (
        <div className="listas-impresas">
          {e.listas.map((l, k) => (
            <div key={k} className="lista-impresa">
              <div className="eyebrow-impreso">{l.titulo}</div>
              <ol className="lista-letras">
                {l.opciones.map((o, i) => <li key={i}><span className="letra-pequena">{letra(i)}</span>{o}</li>)}
              </ol>
            </div>
          ))}
        </div>
      )}

      {e.opcionesComunes && !conOpcionesLargas && e.items.some((i) => i.tipo === 'emparejar') && (
        <p className="parte-instrucciones">Choose from: {e.opcionesComunes.map((o, i) => `${letra(i)} ${o}`).join(' · ')}.</p>
      )}

      <div className="items-impresos">
        {e.items.map((it) => (
          <ItemImpreso key={it.n} e={e} it={it} />
        ))}
      </div>
    </article>
  );
}

function ItemImpreso({ e, it }: { e: Ejercicio; it: Item }) {
  switch (it.tipo) {
    case 'opciones':
      return (
        <div className="item-impreso">
          <span className="n">{it.n}</span>
          <div>
            {it.pregunta && <p className="pregunta-impresa">{it.pregunta}</p>}
            <div className={`opciones-impresas${it.opciones.every((o) => o.length <= 18) ? ' en-fila' : ''}`}>
              {it.opciones.map((o, i) => <span key={i}><b>{letra(i)}</b> {o}</span>)}
            </div>
          </div>
        </div>
      );
    case 'emparejar': {
      const esHueco = !it.pregunta || /^Gap \d+$/.test(it.pregunta);
      if (esHueco && e.texto) return null; // los huecos de párrafo ya están en el texto
      return (
        <div className="item-impreso">
          <span className="n">{it.n}</span>
          <div className="fila-impresa">
            {it.lista !== undefined && <span className="tarea-impresa">Task {it.lista + 1}</span>}
            <span>{esHueco ? '' : it.pregunta}</span>
            <span className="cajita" />
          </div>
        </div>
      );
    }
    case 'palabra': {
      if (it.frase) {
        const [antes, despues] = it.frase.split(`{{${it.n}}}`);
        return (
          <div className="item-impreso">
            <span className="n">{it.n}</span>
            <p className="frase-impresa">{antes}<span className="linea-respuesta" />{despues}</p>
          </div>
        );
      }
      if (it.raiz && e.texto) return null; // word formation: el hueco y la raíz van en el texto
      return (
        <div className="item-impreso">
          <span className="n">{it.n}</span>
          <div>
            {it.pregunta && <p className="pregunta-impresa">{it.pregunta}</p>}
            <div className="lineas-respuesta una" />
          </div>
        </div>
      );
    }
    case 'transformacion':
      return (
        <div className="item-impreso transformacion-impresa">
          <span className="n">{it.n}</span>
          <div>
            <p>{it.frase}</p>
            <p className="clave-impresa">{it.clave.toUpperCase()}</p>
            <p>{it.inicio} <span className="linea-respuesta larga" /> {it.fin}</p>
          </div>
        </div>
      );
    case 'verdaderoFalso':
      return (
        <div className="item-impreso">
          <span className="n">{it.n}</span>
          <div>
            <p className="pregunta-impresa">{it.afirmacion}</p>
            <p className="vf-impreso"><span className="cajita" /> TRUE <span className="cajita" /> FALSE</p>
            <p className="pequena">Evidence from the text:</p>
            <div className="lineas-respuesta dos" />
          </div>
        </div>
      );
    case 'redaccion':
      return <RedaccionImpresa it={it} />;
    case 'hablar':
      return <HablarImpreso it={it} />;
  }
}

const NOMBRE_TIPO: Record<ItemRedaccion['tipoTexto'], string> = {
  essay: 'Essay', email: 'Email', letter: 'Letter', proposal: 'Proposal', report: 'Report', review: 'Review',
  composition: 'Composition', situation: 'Situation', dialogue: 'Dialogue',
};

function RedaccionImpresa({ it }: { it: ItemRedaccion }) {
  const esReplica = it.tipoTexto === 'dialogue';
  return (
    <div className={`item-impreso redaccion-impresa${esReplica ? ' replica' : ''}`}>
      <span className="n">{it.n}</span>
      <div>
        {!esReplica && <div className="eyebrow-impreso">{NOMBRE_TIPO[it.tipoTexto]} · {it.minPalabras}–{it.maxPalabras} words</div>}
        {it.pregunta && <p className="pregunta-impresa">{it.pregunta}</p>}
        {it.enunciado && !esReplica && <div className="enunciado-impreso">{it.enunciado.split(/\n\n+/).map((p, i) => <p key={i}>{p}</p>)}</div>}
        {esReplica ? <div className="lineas-respuesta dos" /> : <div className={`lineas-respuesta ${it.maxPalabras >= 200 ? 'muchas' : 'varias'}`} />}
      </div>
    </div>
  );
}

function HablarImpreso({ it }: { it: ItemHablar }) {
  return (
    <div className="item-impreso hablar-impreso">
      <span className="n">{it.n}</span>
      <div>
        {it.pregunta && <p className="pregunta-impresa">{it.pregunta}</p>}
        <p className="interlocutor-impreso"><b>Interlocutor:</b> {it.interlocutor}</p>
        {it.preguntas.length > 0 && (
          <ul className="preguntas-impresas">{it.preguntas.map((q, i) => <li key={i}>{q}</li>)}</ul>
        )}
        {it.imagenes && (
          <div className="imagenes-impresas">
            {it.imagenes.map((img, i) => <div key={i} className="imagen-impresa"><span className="seccion-letra">{letra(i)}</span><p>{img}</p></div>)}
          </div>
        )}
        {it.preguntaCentral && (
          <div className="hoja-ideas-impresa">
            <div className="central">{it.preguntaCentral}</div>
            <div className="ideas">{it.ideas?.map((idea, i) => <span key={i}>{idea}</span>)}</div>
          </div>
        )}
        <p className="pequena">Time: {it.segundosLectura ? `${it.segundosLectura} seconds to read, then ` : ''}{it.segundos >= 60 ? `${Math.round(it.segundos / 60)} min` : `${it.segundos} s`}.</p>
      </div>
    </div>
  );
}

/** Hoja de respuestas: una casilla por pregunta que se corrige sola, por paper y parte. */
function HojaRespuestas({ c }: { c: Cuadernillo }) {
  const papeles = c.papeles.filter((p) => p.preguntas > 0);
  if (papeles.length === 0) return null;
  return (
    <section className="papel hoja-respuestas">
      <header className="papel-cabecera">
        <div className="papel-nombre">Answer sheet</div>
        <h2>{c.titulo} · Examen {c.numero}</h2>
        <div className="papel-datos">Write one answer per box. For multiple-choice questions, write the letter.</div>
      </header>
      <div className="firma"><div><span>Name</span><span className="linea" /></div></div>
      {papeles.map((p) => (
        <div key={p.destreza} className="hoja-papel">
          <h3>{p.titulo}</h3>
          {p.partes.map((e) => {
            const evaluables = e.items.filter((i) => TIPOS_EVALUABLES.has(i.tipo));
            if (evaluables.length === 0) return null;
            return (
              <div key={e.id} className="hoja-parte">
                <div className="hoja-parte-nombre">{etiquetaParte(e.examen, e.parte)}</div>
                <div className={`casillas${evaluables.every((i) => i.tipo === 'opciones' || i.tipo === 'emparejar') ? ' letras' : ''}`}>
                  {evaluables.map((i) => (
                    <div key={i.n} className="casilla"><span className="n">{i.n}</span><span className="caja" /></div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </section>
  );
}

/** La clave: respuestas y explicaciones de cada parte, modelos de Writing y guía del Speaking. Para el profe. */
function ClaveProfe({ c }: { c: Cuadernillo }) {
  return (
    <main className="pagina">
      <section className="portada clave-portada">
        <div className="portada-marca">English Lab</div>
        <h1>Answer key</h1>
        <div className="portada-numero">{c.titulo} · Examen {c.numero}</div>
        <p className="pequena">Respuestas, otras formas aceptadas y por qué; modelos de respuesta de las partes que corrige el profesor.</p>
      </section>
      {c.papeles.map((p) => (
        <section key={p.destreza} className="papel">
          <header className="papel-cabecera">
            <h2>{p.titulo}</h2>
            {p.preguntas > 0 && <div className="papel-datos">{p.preguntas} questions</div>}
          </header>
          {p.partes.map((e) => {
            const clave = claveDe(e);
            const libres = e.items.filter((i): i is ItemRedaccion | ItemHablar => i.tipo === 'redaccion' || i.tipo === 'hablar');
            return (
              <article key={e.id} className="parte">
                <h3>{etiquetaParte(e.examen, e.parte)}<span className="parte-nombre"> · {e.nombreParte}</span></h3>
                {clave.length > 0 && (
                  <table className="tabla clave">
                    <thead><tr><th>#</th><th>Answer</th><th>Why</th></tr></thead>
                    <tbody>
                      {clave.map((l) => (
                        <tr key={l.n}>
                          <td className="n">{l.n}</td>
                          <td className="respuesta">
                            {l.respuesta}
                            {l.item.tipo === 'opciones' && <span className="pequena"> {l.item.opciones[l.item.correcta]}</span>}
                            {l.tambien.length > 0 && <div className="pequena">also: {l.tambien.join(' · ')}</div>}
                          </td>
                          <td>{l.explicacion}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {libres.map((it) => (
                  <Fragment key={it.n}>
                    {it.tipo === 'redaccion' ? (
                      <div className="modelo-impreso">
                        <div className="eyebrow-impreso">{it.n} · {NOMBRE_TIPO[it.tipoTexto]} · model answer</div>
                        {it.modelo.split(/\n\n+/).map((p, i) => <p key={i}>{p.split('\n').map((l, j) => <span key={j}>{j > 0 && <br />}{l}</span>)}</p>)}
                        {it.explicacion && <p className="pequena">{it.explicacion}</p>}
                        {it.tipoTexto !== 'dialogue' && it.criterios.length > 0 && (
                          <ul className="criterios-impresos">{it.criterios.map((cr, i) => <li key={i}>{cr}</li>)}</ul>
                        )}
                      </div>
                    ) : (
                      it.modelo && (
                        <div className="modelo-impreso">
                          <div className="eyebrow-impreso">{it.n} · {it.pregunta ?? e.nombreParte} · guidance</div>
                          <p>{it.modelo}</p>
                        </div>
                      )
                    )}
                  </Fragment>
                ))}
                {e.audio && (
                  <details className="transcripcion-impresa">
                    <summary>Transcript</summary>
                    {e.audio.guion.map((l, i) => ('quien' in l ? <p key={i}><b>{e.audio?.hablantes.find((h) => h.id === l.quien)?.descripcion ?? l.quien}:</b> {l.texto}</p> : null))}
                  </details>
                )}
              </article>
            );
          })}
        </section>
      ))}
    </main>
  );
}

function minutos(m: number): string {
  if (m >= 60) {
    const h = Math.floor(m / 60);
    const r = m % 60;
    return r === 0 ? `${h} hour${h > 1 ? 's' : ''}` : `${h} hour${h > 1 ? 's' : ''} ${r} minutes`;
  }
  return `${m} minutes`;
}
