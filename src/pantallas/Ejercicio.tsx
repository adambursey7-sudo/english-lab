import { useState } from 'react';
import type { Ejercicio, Item, Respuestas } from '../banco/tipos';
import { NOMBRES_EXAMEN, TIPOS_EVALUABLES, etiquetaParte } from '../banco/tipos';
import { EntradaHablar } from '../componentes/Hablar';
import { EntradaRedaccion } from '../componentes/Redaccion';
import { Reproductor } from '../componentes/Reproductor';
import { Temporizador } from '../componentes/Temporizador';
import { TextoHuecos } from '../componentes/TextoHuecos';
import { EntradaVerdaderoFalso } from '../componentes/VerdaderoFalso';
import { comunesDe, cuentaPalabras, letra } from '../motor/corregir';
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
  // Con «elige 1 de 3» o «3 de 5», las tareas abiertas: las que ya tengan texto o las que se elijan, hasta `elegir`.
  const [elegidas, setElegidas] = useState<number[]>(() => ejercicio.items.filter((i) => (respuestas[i.n] ?? '').trim() !== '').map((i) => i.n));
  const contestados = ejercicio.items.filter((i) => (respuestas[i.n] ?? '').trim() !== '').length;
  const porContestar = ejercicio.elegir ?? ejercicio.items.length;
  const cupoLleno = ejercicio.elegir !== undefined && elegidas.length >= ejercicio.elegir;
  const quitar = (n: number) => {
    setElegidas((l) => l.filter((x) => x !== n));
    if ((respuestas[n] ?? '') !== '') onCambia(n, '');
  };
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
      <header className={`cabecera aula compacta tono-${ejercicio.destreza}`}>
        <div className="cabecera-dentro">
          <div style={{ minWidth: 0 }}>
            <div className="sub">
              {NOMBRES_EXAMEN[ejercicio.examen]}
              {posicion.total > 1 ? ` · ${posicion.i} de ${posicion.total}` : ''}
            </div>
            <div className="titulo">{etiquetaParte(ejercicio.examen, ejercicio.parte)} · {ejercicio.nombreParte}</div>
          </div>
          <Temporizador minutos={ejercicio.minutos} />
        </div>
        <div className="avance" aria-label={`${contestados} de ${porContestar} contestadas`}>
          <span style={{ width: `${porContestar === 0 ? 0 : Math.min(100, (contestados / porContestar) * 100)}%` }} />
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
                // En el diálogo de la PAU la réplica puede ser larga: en el hueco se enseña recortada.
                const mostrado = conLetra ? (valor === '' ? '' : letra(Number(valor))) : valor.length > 34 ? `${valor.slice(0, 32).trimEnd()}…` : valor;
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

        {ejercicio.listas && (
          <div className="hoja comunes">
            {ejercicio.listas.map((l, k) => (
              <div key={k} className="lista-tarea">
                <div className="eyebrow">{l.titulo}</div>
                {l.opciones.map((o, i) => {
                  const usadaEn = ejercicio.items.find((it) => it.tipo === 'emparejar' && it.lista === k && respuestas[it.n] === String(i));
                  return (
                    <div key={i} className={`comun${usadaEn ? ' usada' : ''}`}>
                      <span className="letra-grande">{letra(i)}</span>
                      <span className="comun-texto">{o}</span>
                      {usadaEn && <span className="comun-donde">→ {usadaEn.n}</span>}
                    </div>
                  );
                })}
              </div>
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
                comunes={comunesDe(ejercicio, item)}
                elegible={ejercicio.elegir !== undefined}
                abierta={ejercicio.elegir === undefined || elegidas.includes(item.n)}
                cupoLleno={cupoLleno}
                onElegir={() => setElegidas((l) => (l.includes(item.n) ? l : [...l, item.n]))}
                onQuitar={() => quitar(item.n)}
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
  cupoLleno?: boolean;
  onElegir?: () => void;
  onQuitar?: () => void;
}

function ItemEntrada({ item, valor, onCambia, comunes = [], elegible, abierta, cupoLleno, onElegir, onQuitar }: PropsItem) {
  if (item.tipo === 'emparejar') {
    const cortas = comunes.every((o) => o.length <= 24);
    return (
      <>
        <div className="cabeza">
          <span className="num">{item.n}</span>
          {item.pregunta && !/^Gap \d+$/.test(item.pregunta) && <span className="pregunta">{item.pregunta}</span>}
          {item.lista !== undefined && <span className="tipo-texto">Task {item.lista + 1}</span>}
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
        <div className={`opciones${item.opciones.every((o) => o.length <= 14) ? ' cortas' : ''}`} role="group" aria-label={`Pregunta ${item.n}`}>
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
          placeholder={item.raiz ? `Forma de ${item.raiz}` : item.maxPalabras ? `Copia hasta ${item.maxPalabras} palabras del texto` : item.frase ? 'Una palabra o frase corta' : 'Una sola palabra'}
          value={valor}
          onChange={(e) => onCambia(e.target.value)}
        />
      </>
    );
  }

  if (item.tipo === 'redaccion') {
    return <EntradaRedaccion item={item} valor={valor} onCambia={onCambia} elegible={elegible} abierta={abierta} cupoLleno={cupoLleno} onElegir={onElegir} onQuitar={onQuitar} />;
  }

  if (item.tipo === 'hablar') {
    return <EntradaHablar item={item} valor={valor} onCambia={onCambia} />;
  }

  if (item.tipo === 'verdaderoFalso') {
    return <EntradaVerdaderoFalso item={item} valor={valor} onCambia={onCambia} />;
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
