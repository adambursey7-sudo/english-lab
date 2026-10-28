import { useState } from 'react';
import type { Ejercicio, Respuestas } from '../banco/tipos';
import { NOMBRES_EXAMEN, etiquetaParte } from '../banco/tipos';
import { TextoHuecos } from '../componentes/TextoHuecos';
import { FRASES_VINETA, alternativasDe, comunesDe, corrigeEjercicio, letra, partesVerdaderoFalso, textoRespuesta, vinetaDe, type ItemCorregido } from '../motor/corregir';
import { ResultadoRedaccion, ResultadoReplica } from '../componentes/Redaccion';
import { compartir, textoEjercicioParaCompartir } from '../motor/entregas';

interface Props {
  lista: Ejercicio[];
  respuestas: Record<string, Respuestas>;
  onRepetir: () => void;
  onInicio: () => void;
}

export function Resultado({ lista, respuestas, onRepetir, onInicio }: Props) {
  const corregidos = lista.map((e) => corrigeEjercicio(e, respuestas[e.id] ?? {}));
  const aciertos = corregidos.reduce((n, c) => n + c.aciertos, 0);
  const total = corregidos.reduce((n, c) => n + c.total, 0);
  const porcentaje = total === 0 ? 0 : Math.round((aciertos / total) * 100);
  const pendientes = corregidos.reduce((n, c) => n + c.pendientes, 0);
  const soloLibre = total === 0;

  return (
    <div className="app">
      <header className="cabecera">
        <div className="cabecera-dentro">
          <div>
            <div className="sub">{NOMBRES_EXAMEN[lista[0]?.examen ?? 'c1']}</div>
            <div className="titulo">Corrección</div>
          </div>
        </div>
      </header>

      <main className="contenido">
        {soloLibre ? (
          <div className="hoja nota-grande">
            <div className="cifra" style={{ fontSize: 28 }}>{pendientes > 0 ? 'Guardado' : 'Terminado'}</div>
            <p className="silencio">
              {pendientes > 0
                ? 'Esta parte no se corrige sola: mándasela a Adam con el botón y, mientras, compárala con el modelo.'
                : 'Esta parte no se corrige sola. Lee «Cómo hacerlo bien» y repítela cuando quieras.'}
            </p>
          </div>
        ) : (
          <div className="hoja nota-grande">
            <div className="vineta-nota">
              <img src={`${import.meta.env.BASE_URL}img/nota-${vinetaDe(porcentaje)}.jpg`} alt={FRASES_VINETA[vinetaDe(porcentaje)]} />
            </div>
            <div className="cifra">
              {aciertos} <span>de {total}</span>
            </div>
            <div className="barra" aria-hidden="true"><div style={{ width: `${porcentaje}%` }} /></div>
            <p className="silencio">{frase(porcentaje)}</p>
            {pendientes > 0 && <p className="silencio pequeno">Además hay {pendientes} {pendientes === 1 ? 'texto' : 'textos'} para que corrija Adam.</p>}
          </div>
        )}

        {corregidos.map((c) => (
          <section key={c.ejercicio.id} style={{ display: 'grid', gap: 12 }}>
            <h2>
              {etiquetaParte(c.ejercicio.examen, c.ejercicio.parte)} · {c.ejercicio.nombreParte}
              {c.total > 0 && <span className="silencio"> · {c.aciertos}/{c.total}</span>}
            </h2>

            {c.ejercicio.texto && (
              <div className="hoja">
                <TextoHuecos
                  texto={c.ejercicio.texto}
                  titulo={c.ejercicio.titulo}
                  hueco={(n) => {
                    const ic = c.items.find((x) => x.item.n === n);
                    if (!ic) return null;
                    const it = ic.item;
                    // Réplica del diálogo (PAU): texto libre, no hay bien ni mal; en el hueco va lo que escribió, recortado.
                    if (it.tipo === 'redaccion') {
                      const escrito = ic.respuesta.trim();
                      return <span className="hueco libre"><span className="num">{n}</span>{escrito ? (escrito.length > 34 ? `${escrito.slice(0, 32).trimEnd()}…` : escrito) : '……'}</span>;
                    }
                    const conLetra = it.tipo === 'opciones' || it.tipo === 'emparejar';
                    const tuya = conLetra ? (ic.respuesta === '' ? '' : letra(Number(ic.respuesta))) : ic.respuesta;
                    const buena = it.tipo === 'opciones' || it.tipo === 'emparejar' ? letra(it.correcta) : ic.solucion;
                    if (ic.correcto) return <span className="hueco ok"><span className="num">{n}</span>{buena}</span>;
                    return (
                      <>
                        {tuya && <span className="hueco ko"><span className="num">{n}</span>{tuya}</span>}
                        <span className={`hueco ok${tuya ? '' : ' vacio'}`}>{!tuya && <span className="num">{n}</span>}{buena}</span>
                      </>
                    );
                  }}
                />
              </div>
            )}

            {c.ejercicio.audio && (
              <details className="hoja plegable">
                <summary>Ver la transcripción</summary>
                <div className="transcripcion">
                  {c.ejercicio.audio.guion.map((l, i) =>
                    'quien' in l ? (
                      <p key={i}>
                        <b>{c.ejercicio.audio?.hablantes.find((h) => h.id === l.quien)?.descripcion ?? l.quien}:</b> {l.texto}
                      </p>
                    ) : null,
                  )}
                </div>
              </details>
            )}

            {c.ejercicio.secciones && (
              <details className="hoja plegable">
                <summary>Volver a leer los textos</summary>
                {c.ejercicio.secciones.map((s) => (
                  <section key={s.letra} className="seccion">
                    <div className="seccion-cabeza"><span className="letra-grande">{s.letra}</span>{s.titulo && <b>{s.titulo}</b>}</div>
                    <div className="texto">{s.texto.split(/\n\n+/).map((p, i) => <p key={i}>{p}</p>)}</div>
                  </section>
                ))}
              </details>
            )}

            {c.ejercicio.items.some((i) => i.tipo === 'redaccion' && i.tipoTexto === 'dialogue') && (
              <EnviarDialogo ejercicio={c.ejercicio} respuestas={respuestas[c.ejercicio.id] ?? {}} />
            )}

            <div className="items">
              {c.items.map((ic) => {
                if (ic.item.tipo === 'redaccion' && ic.item.tipoTexto === 'dialogue') {
                  return <ResultadoReplica key={ic.item.n} item={ic.item} texto={ic.respuesta} />;
                }
                if (ic.item.tipo === 'redaccion') {
                  if (c.ejercicio.elegir !== undefined && ic.respuesta.trim() === '') return null;
                  return <ResultadoRedaccion key={ic.item.n} ejercicio={c.ejercicio} item={ic.item} texto={ic.respuesta} />;
                }
                if (ic.item.tipo === 'hablar') {
                  return (
                    <div key={ic.item.n} className="resultado-item pendiente">
                      <div className="fila"><span className="num" style={{ fontWeight: 700 }}>{ic.item.n}</span><span>{ic.item.pregunta ?? c.ejercicio.nombreParte}</span><span className="silencio">{ic.respuesta === 'hecho' ? 'hecha' : 'sin hacer'}</span></div>
                      {ic.item.modelo && <p className="explica">{ic.item.modelo}</p>}
                    </div>
                  );
                }
                return <ResultadoItem key={ic.item.n} ic={ic} comunes={comunesDe(c.ejercicio, ic.item)} />;
              })}
            </div>
          </section>
        ))}

        <div className="lista">
          <button className="btn" onClick={onInicio}>Otro ejercicio</button>
          <button className="btn sec" onClick={onRepetir}>Repetir este</button>
        </div>
      </main>
    </div>
  );
}

/** Diálogo de la PAU: un solo botón para mandarle a Adam todas las réplicas juntas. */
function EnviarDialogo({ ejercicio, respuestas }: { ejercicio: Ejercicio; respuestas: Respuestas }) {
  const [aviso, setAviso] = useState('');
  const escritas = ejercicio.items.filter((i) => i.tipo === 'redaccion' && (respuestas[i.n] ?? '').trim() !== '').length;
  if (escritas === 0) return <p className="silencio pequeno">No has escrito ninguna réplica. Abajo tienes una respuesta modelo para cada hueco.</p>;
  const enviar = async () => {
    const que = await compartir(textoEjercicioParaCompartir(ejercicio, respuestas), 'English Lab · diálogo');
    setAviso(que === 'compartido' ? 'Enviado.' : que === 'copiado' ? 'Texto copiado y WhatsApp abierto: pégalo en el chat de Adam.' : 'No se pudo compartir: copia el texto a mano.');
  };
  return (
    <div className="fila" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      <button type="button" className="btn chico" onClick={enviar}>Enviar el diálogo a Adam</button>
      <span className="silencio pequeno">{aviso || `${escritas} de ${ejercicio.items.length} réplicas. Compáralas con el modelo mientras Adam las corrige.`}</span>
    </div>
  );
}

function ResultadoItem({ ic, comunes = [] }: { ic: ItemCorregido; comunes?: string[] }) {
  const tuya = textoRespuesta(ic, comunes);
  const buena = ic.item.tipo === 'opciones' ? `${letra(ic.item.correcta)} ${ic.solucion}` : ic.solucion;
  const alternativas = alternativasDe(ic.item);
  // Verdadero/falso: acertar TRUE/FALSE sin la prueba (o con una prueba que no vale) no puntúa en la PAU; se avisa.
  const matizVF = ic.item.tipo === 'verdaderoFalso' && !ic.correcto && partesVerdaderoFalso(ic.respuesta).valor === ic.item.correcta
    ? (partesVerdaderoFalso(ic.respuesta).prueba.trim() === '' ? 'TRUE/FALSE bien, pero sin prueba copiada no puntúa.' : 'TRUE/FALSE bien, pero la prueba copiada no es la que lo demuestra.')
    : '';
  return (
    <div className={`resultado-item${ic.correcto ? '' : ' mal'}`}>
      {ic.item.pregunta && ic.item.tipo !== 'emparejar' && <p className="pregunta">{ic.item.pregunta}</p>}
      {ic.item.pregunta && ic.item.tipo === 'emparejar' && !/^Gap \d+$/.test(ic.item.pregunta) && <p className="pregunta">{ic.item.pregunta}</p>}
      {ic.item.tipo === 'verdaderoFalso' && <p className="afirmacion">{ic.item.afirmacion}</p>}
      {matizVF && <span className="matiz">{matizVF}</span>}
      <div className="fila">
        <span className="num" style={{ fontWeight: 700 }}>{ic.item.n}</span>
        <span className={`marca ${ic.correcto ? 'ok' : 'ko'}`}>{ic.correcto ? '✓' : '✗'}</span>
        {!ic.correcto && <span className="tuya">{tuya || 'sin contestar'}</span>}
        <span className="buena">{buena}</span>
        {alternativas.length > 0 && <span className="silencio pequeno">también: {alternativas.join(' · ')}</span>}
      </div>
      {ic.item.tipo === 'transformacion' && (
        <p className="silencio pequeno">{ic.item.inicio} <b>{ic.solucion}</b> {ic.item.fin}</p>
      )}
      {ic.item.tipo === 'palabra' && ic.item.frase && (
        <p className="silencio pequeno">{ic.item.frase.replace(`{{${ic.item.n}}}`, '____')}</p>
      )}
      {'explicacion' in ic.item && ic.item.explicacion && <p className="explica">{ic.item.explicacion}</p>}
    </div>
  );
}

function frase(p: number): string {
  if (p === 100) return 'Perfecto. Ni un fallo.';
  if (p >= 80) return 'Muy bien. Revisa los fallos: en el examen de verdad, esto es nota de aprobado holgado.';
  if (p >= 60) return 'Bien. Estás en la zona de aprobado; lee las explicaciones de los fallos.';
  if (p >= 40) return 'Flojo. Vuelve a hacer esta parte después de leer las explicaciones.';
  return 'Toca repasar. Lee cada explicación con calma y repite el ejercicio.';
}
