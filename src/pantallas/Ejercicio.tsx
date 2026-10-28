import { useState } from 'react';
import type { Ejercicio, Item, Respuestas } from '../banco/tipos';
import { NOMBRES_EXAMEN, TIPOS_EVALUABLES } from '../banco/tipos';
import { EntradaHablar } from '../componentes/Hablar';
import { EntradaRedaccion } from '../componentes/Redaccion';
import { Reproductor } from '../componentes/Reproductor';
import { Temporizador } from '../componentes/Temporizador';
import { TextoHuecos } from '../componentes/TextoHuecos';
import { cuentaPalabras, letra } from '../motor/corregir';
import { guardarEntrega } from '../motor/entregas';

interface Props {
  ejercicio: Ejercicio;
  posicion: { i: number; total: number };
  respuestas: Respuestas;
  onCambia: (n: number, valor: string) => void;
  onSiguiente: () => void;
  onSalir: () => void;
}

export function PantallaEjercicio({ ejercicio, posicion, respuestas, onCambia, onSiguiente, onSalir }: Props) {
  const [activo, setActivo] = useState<number | null>(null);
  const [confirmarSalida, setConfirmarSalida] = useState(false);
  // Con «elige 1 de 3», la tarea abierta: la que ya tenga texto o la que se elija.
  const [elegida, setElegida] = useState<number | null>(() => ejercicio.items.find((i) => (respuestas[i.n] ?? '').trim() !== '')?.n ?? null);
  const contestados = ejercicio.items.filter((i) => (respuestas[i.n] ?? '').trim() !== '').length;
  const porContestar = ejercicio.elegir ?? ejercicio.items.length;
  const ultimo = posicion.i === posicion.total;
  const seCorrige = ejercicio.items.some((i) => TIPOS_EVALUABLES.has(i.tipo));

  const terminar = () => {
    for (const i of ejercicio.items) if (i.tipo === 'redaccion') guardarEntrega(ejercicio, i.n, respuestas[i.n] ?? '');
    onSiguiente();
  };

  const irA = (n: number) => {
    setActivo(n);
    document.getElementById(`item-${n}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="app">
      <header className="cabecera">
        <div className="cabecera-dentro">
          <div style={{ minWidth: 0 }}>
            <div className="sub">
              {NOMBRES_EXAMEN[ejercicio.examen]}
              {posicion.total > 1 ? ` · ${posicion.i} de ${posicion.total}` : ''}
            </div>
            <div className="titulo">Part {ejercicio.parte} · {ejercicio.nombreParte}</div>
          </div>
          <Temporizador minutos={ejercicio.minutos} />
        </div>
      </header>

      <main className="contenido">
        <p className="instrucciones">{ejercicio.instrucciones}</p>

        {ejercicio.audio && <Reproductor key={ejercicio.id} audio={ejercicio.audio} />}

        {ejercicio.texto && (
          <div className="hoja">
            <TextoHuecos
              texto={ejercicio.texto}
              titulo={ejercicio.titulo}
              hueco={(n) => {
                const item = ejercicio.items.find((i) => i.n === n);
                const valor = respuestas[n] ?? '';
                const conLetra = item?.tipo === 'opciones' || item?.tipo === 'emparejar';
                const mostrado = conLetra ? (valor === '' ? '' : letra(Number(valor))) : valor;
                return (
                  <>
                    <button type="button" className={`hueco${activo === n ? ' activo' : ''}${item?.tipo === 'emparejar' ? ' parrafo' : ''}`} onClick={() => irA(n)} aria-label={`Hueco ${n}`}>
                      <span className="num">{n}</span>
                      {mostrado || '……'}
                    </button>
                    {item?.tipo === 'palabra' && item.raiz && <span className="raiz">{item.raiz}</span>}
                  </>
                );
              }}
            />
          </div>
        )}

        {ejercicio.secciones && (
          <div className="hoja">
            {ejercicio.titulo && !ejercicio.texto && <h3>{ejercicio.titulo}</h3>}
            {ejercicio.secciones.map((s) => (
              <section key={s.letra} className="seccion">
                <div className="seccion-cabeza">
                  <span className="letra-grande">{s.letra}</span>
                  {s.titulo && <b>{s.titulo}</b>}
                </div>
                <div className="texto">
                  {s.texto.split(/\n\n+/).map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </section>
            ))}
          </div>
        )}

        {ejercicio.opcionesComunes && ejercicio.opcionesComunes.some((o) => o.length > 24) && (
          <div className="hoja comunes">
            <div className="eyebrow">{ejercicio.parte === 7 && ejercicio.destreza === 'reading-use' ? 'Párrafos que faltan (sobra uno)' : 'Opciones'}</div>
            {ejercicio.opcionesComunes.map((o, i) => {
              const usadaEn = ejercicio.items.find((it) => it.tipo === 'emparejar' && respuestas[it.n] === String(i));
              return (
                <div key={i} className={`comun${usadaEn ? ' usada' : ''}`}>
                  <span className="letra-grande">{letra(i)}</span>
                  <span className="comun-texto">{o}</span>
                  {usadaEn && <span className="comun-donde">→ {usadaEn.n}</span>}
                </div>
              );
            })}
          </div>
        )}

        <div className="items">
          {ejercicio.items.map((item) => (
            <div key={item.n} id={`item-${item.n}`} className={`item${activo === item.n ? ' activo' : ''}`} onFocus={() => setActivo(item.n)}>
              <ItemEntrada
                item={item}
                valor={respuestas[item.n] ?? ''}
                onCambia={(v) => onCambia(item.n, v)}
                comunes={ejercicio.opcionesComunes}
                elegible={ejercicio.elegir !== undefined}
                abierta={ejercicio.elegir === undefined || elegida === item.n}
                onElegir={() => setElegida(item.n)}
              />
            </div>
          ))}
        </div>

        <div className="pie">
          <button className="btn" onClick={terminar}>
            {ultimo ? (seCorrige ? 'Corregir' : 'Terminar') : 'Siguiente parte'} · {contestados}/{porContestar} {porContestar === 1 ? 'hecha' : 'hechas'}
          </button>
          {confirmarSalida ? (
            <div className="fila" style={{ display: 'flex', gap: 8 }}>
              <button className="btn sec" onClick={onSalir}>Sí, salir sin corregir</button>
              <button className="btn sec" onClick={() => setConfirmarSalida(false)}>Seguir</button>
            </div>
          ) : (
            <button className="btn enlace" onClick={() => setConfirmarSalida(true)}>Salir del ejercicio</button>
          )}
        </div>
      </main>
    </div>
  );
}

interface PropsItem {
  item: Item;
  valor: string;
  onCambia: (v: string) => void;
  comunes?: string[];
  elegible?: boolean;
  abierta?: boolean;
  onElegir?: () => void;
}

function ItemEntrada({ item, valor, onCambia, comunes = [], elegible, abierta, onElegir }: PropsItem) {
  if (item.tipo === 'emparejar') {
    const cortas = comunes.every((o) => o.length <= 24);
    return (
      <>
        <div className="cabeza">
          <span className="num">{item.n}</span>
          {item.pregunta && !/^Gap \d+$/.test(item.pregunta) && <span className="pregunta">{item.pregunta}</span>}
        </div>
        <div className="letras" role="group" aria-label={`Pregunta ${item.n}`}>
          {comunes.map((o, i) => {
            const etiqueta = o.replace(/^(Writer|Section|Speaker|Text|Paragraph) /, '');
            return (
              <button key={i} type="button" className="letra-btn" aria-pressed={valor === String(i)} onClick={() => onCambia(valor === String(i) ? '' : String(i))} title={o}>
                {letra(i)}
                {cortas && etiqueta !== letra(i) && <small>{etiqueta}</small>}
              </button>
            );
          })}
        </div>
      </>
    );
  }

  if (item.tipo === 'opciones') {
    return (
      <>
        <div className="cabeza">
          <span className="num">{item.n}</span>
          {item.pregunta && <span className="pregunta">{item.pregunta}</span>}
        </div>
        <div className="opciones" role="group" aria-label={`Pregunta ${item.n}`}>
          {item.opciones.map((op, i) => (
            <button key={i} type="button" className="opcion" aria-pressed={valor === String(i)} onClick={() => onCambia(valor === String(i) ? '' : String(i))}>
              <span className="letra">{letra(i)}</span>
              <span>{op}</span>
            </button>
          ))}
        </div>
      </>
    );
  }

  if (item.tipo === 'palabra' && item.frase) {
    // Completar una frase (Listening Part 2): la entrada va dentro de la frase.
    const [antes, despues] = item.frase.split(`{{${item.n}}}`);
    return (
      <>
        <div className="cabeza"><span className="num">{item.n}</span></div>
        <div className="frase-hueco">
          <span>{antes}</span>
          <input
            id={`respuesta-${item.n}`}
            className="campo"
            type="text"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="palabra o frase corta"
            value={valor}
            onChange={(e) => onCambia(e.target.value)}
          />
          <span>{despues}</span>
        </div>
      </>
    );
  }

  if (item.tipo === 'palabra') {
    return (
      <>
        <div className="cabeza">
          <span className="num">{item.n}</span>
          {item.raiz && <span className="raiz">{item.raiz}</span>}
          {item.pregunta && <span className="pregunta">{item.pregunta}</span>}
        </div>
        <input
          id={`respuesta-${item.n}`}
          className="campo"
          type="text"
          inputMode="text"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          placeholder={item.raiz ? `Forma de ${item.raiz}` : 'Una sola palabra'}
          value={valor}
          onChange={(e) => onCambia(e.target.value)}
        />
      </>
    );
  }

  if (item.tipo === 'redaccion') {
    return <EntradaRedaccion item={item} valor={valor} onCambia={onCambia} elegible={elegible} abierta={abierta} onElegir={onElegir} />;
  }

  if (item.tipo === 'hablar') {
    return <EntradaHablar item={item} valor={valor} onCambia={onCambia} />;
  }

  if (item.tipo !== 'transformacion') {
    // Verdadero/falso de la PAU tiene pantalla propia (bloque 3 del loop).
    return <p className="silencio">Este tipo de ejercicio llega en una próxima versión.</p>;
  }

  const palabras = cuentaPalabras(valor);
  const fuera = palabras > 0 && (palabras < 3 || palabras > 6);
  return (
    <div className="transformacion">
      <div className="cabeza"><span className="num">{item.n}</span></div>
      <p className="frase">{item.frase}</p>
      <p className="clave">{item.clave}</p>
      <div className="segunda">
        <span>{item.inicio}</span>
        <input
          id={`respuesta-${item.n}`}
          className="campo"
          type="text"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="3 a 6 palabras"
          value={valor}
          onChange={(e) => onCambia(e.target.value)}
        />
        <span>{item.fin}</span>
      </div>
      <span className={`contador${fuera ? ' mal' : ''}`}>
        {palabras === 0 ? 'Entre tres y seis palabras, incluida la clave.' : `${palabras} ${palabras === 1 ? 'palabra' : 'palabras'}${fuera ? ' · tienen que ser de 3 a 6' : ''}`}
      </span>
    </div>
  );
}
