import type { Ejercicio, Respuestas } from '../banco/tipos';
import { NOMBRES_EXAMEN } from '../banco/tipos';
import { TextoHuecos } from '../componentes/TextoHuecos';
import { corrigeEjercicio, letra, textoRespuesta, type ItemCorregido } from '../motor/corregir';

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
        <div className="hoja nota-grande">
          <div className="cifra">
            {aciertos} <span>de {total}</span>
          </div>
          <div className="barra" aria-hidden="true"><div style={{ width: `${porcentaje}%` }} /></div>
          <p className="silencio">{frase(porcentaje)}</p>
        </div>

        {corregidos.map((c) => (
          <section key={c.ejercicio.id} style={{ display: 'grid', gap: 12 }}>
            <h2>
              Part {c.ejercicio.parte} · {c.ejercicio.nombreParte} <span className="silencio">· {c.aciertos}/{c.total}</span>
            </h2>

            {c.ejercicio.texto && (
              <div className="hoja">
                <TextoHuecos
                  texto={c.ejercicio.texto}
                  titulo={c.ejercicio.titulo}
                  hueco={(n) => {
                    const ic = c.items.find((x) => x.item.n === n);
                    if (!ic) return null;
                    const tuya = ic.item.tipo === 'opciones' ? (ic.respuesta === '' ? '' : letra(Number(ic.respuesta))) : ic.respuesta;
                    const buena = ic.item.tipo === 'opciones' ? letra(ic.item.correcta) : ic.solucion;
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

            <div className="items">
              {c.items.map((ic) => <ResultadoItem key={ic.item.n} ic={ic} />)}
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

function ResultadoItem({ ic }: { ic: ItemCorregido }) {
  const tuya = textoRespuesta(ic);
  const buena = ic.item.tipo === 'opciones' ? `${letra(ic.item.correcta)} ${ic.solucion}` : ic.solucion;
  return (
    <div className={`resultado-item${ic.correcto ? '' : ' mal'}`}>
      <div className="fila">
        <span className="num" style={{ fontWeight: 700 }}>{ic.item.n}</span>
        <span className={`marca ${ic.correcto ? 'ok' : 'ko'}`}>{ic.correcto ? '✓' : '✗'}</span>
        {!ic.correcto && <span className="tuya">{tuya || 'sin contestar'}</span>}
        <span className="buena">{buena}</span>
        {ic.item.tipo !== 'opciones' && ic.item.correctas.length > 1 && (
          <span className="silencio pequeno">también: {ic.item.correctas.slice(1).join(' · ')}</span>
        )}
      </div>
      {ic.item.tipo === 'transformacion' && (
        <p className="silencio pequeno">{ic.item.inicio} <b>{ic.solucion}</b> {ic.item.fin}</p>
      )}
      <p className="explica">{ic.item.explicacion}</p>
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
