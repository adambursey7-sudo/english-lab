import { useState } from 'react';
import type { Ejercicio, ItemRedaccion } from '../banco/tipos';
import { palabrasRedaccion } from '../motor/corregir';
import { avisoPalabras, bandaPalabras, compartir, textoParaCompartir } from '../motor/entregas';

const NOMBRE_TIPO: Record<ItemRedaccion['tipoTexto'], string> = {
  essay: 'Essay',
  email: 'Email',
  letter: 'Letter',
  proposal: 'Proposal',
  report: 'Report',
  review: 'Review',
  composition: 'Composition',
  situation: 'Situación',
  dialogue: 'Diálogo',
};

export function Enunciado({ texto }: { texto: string }) {
  return (
    <div className="enunciado">
      {texto.split(/\n\n+/).map((p, i) => (
        <p key={i}>
          {p.split('\n').map((linea, j) => (
            <span key={j}>
              {j > 0 && <br />}
              {linea}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}

interface PropsEntrada {
  item: ItemRedaccion;
  valor: string;
  onCambia: (v: string) => void;
  /** Cuando hay que elegir una tarea entre varias: si esta está abierta o solo se ve el enunciado. */
  elegible?: boolean;
  abierta?: boolean;
  /** Ya se han elegido todas las que pide el ejercicio (3 de 5): las demás no se pueden abrir. */
  cupoLleno?: boolean;
  onElegir?: () => void;
  onQuitar?: () => void;
}

/** Las réplicas del diálogo y las situaciones de la PAU son cortas: cuadro pequeño, sin la cabecera grande. */
const CORTAS: ReadonlySet<ItemRedaccion['tipoTexto']> = new Set(['dialogue', 'situation']);

/** Cuadro de texto de una redacción con contador de palabras. */
export function EntradaRedaccion({ item, valor, onCambia, elegible = false, abierta = true, cupoLleno = false, onElegir, onQuitar }: PropsEntrada) {
  const palabras = palabrasRedaccion(valor);
  const banda = bandaPalabras(palabras, item.minPalabras, item.maxPalabras);
  const corta = CORTAS.has(item.tipoTexto);
  const replica = item.tipoTexto === 'dialogue';
  return (
    <div className={`redaccion${replica ? ' replica-item' : ''}`}>
      <div className="cabeza">
        <span className="num">{item.n}</span>
        {replica ? (
          <span className="pregunta pequeno">{item.enunciado}</span>
        ) : (
          <span className="tipo-texto">{NOMBRE_TIPO[item.tipoTexto]} · {item.minPalabras}–{item.maxPalabras} palabras</span>
        )}
      </div>
      {!replica && <Enunciado texto={item.enunciado} />}
      {elegible && !abierta ? (
        <button type="button" className="btn sec chico" disabled={cupoLleno} onClick={onElegir}>
          {cupoLleno ? 'Ya has elegido las que tocan' : corta ? 'Elegir esta situación' : 'Elegir esta tarea'}
        </button>
      ) : (
        <>
          <textarea
            id={`respuesta-${item.n}`}
            className={`campo ${corta ? 'replica' : 'texto-largo'}`}
            rows={replica ? 2 : corta ? 3 : 10}
            autoCapitalize="sentences"
            spellCheck={false}
            placeholder={replica ? 'Lo que dices tú…' : 'Escribe aquí tu respuesta…'}
            value={valor}
            onChange={(e) => onCambia(e.target.value)}
          />
          <div className="fila-contador">
            <span className={`contador banda-${banda}`}>{avisoPalabras(palabras, item.minPalabras, item.maxPalabras)}</span>
            {elegible && onQuitar && <button type="button" className="btn enlace" onClick={onQuitar}>Cambiar</button>}
          </div>
        </>
      )}
    </div>
  );
}

interface PropsResultado {
  ejercicio: Ejercicio;
  item: ItemRedaccion;
  texto: string;
}

/** Una réplica del diálogo de la PAU al corregir: lo tuyo, la respuesta modelo y por qué, en una fila compacta. */
export function ResultadoReplica({ item, texto }: { item: ItemRedaccion; texto: string }) {
  const escrito = texto.trim() !== '';
  return (
    <div className="resultado-replica">
      <div className="fila">
        <span className="num" style={{ fontWeight: 700 }}>{item.n}</span>
        {escrito ? <span>{texto.trim()}</span> : <span className="silencio">sin contestar</span>}
      </div>
      <div className="modelo-corto">{item.modelo}</div>
      {item.explicacion && <p className="explica">{item.explicacion}</p>}
    </div>
  );
}

/** Lo que se ve al terminar: tu texto, el modelo plegado, la lista para autoevaluarse y el botón de mandárselo a Adam. */
export function ResultadoRedaccion({ ejercicio, item, texto }: PropsResultado) {
  const [marcados, setMarcados] = useState<boolean[]>(() => item.criterios.map(() => false));
  const [aviso, setAviso] = useState('');
  const palabras = palabrasRedaccion(texto);
  const banda = bandaPalabras(palabras, item.minPalabras, item.maxPalabras);
  const escrito = texto.trim() !== '';

  const enviar = async () => {
    const que = await compartir(textoParaCompartir(ejercicio, item, texto), 'English Lab · redacción');
    setAviso(que === 'compartido' ? 'Enviado.' : que === 'copiado' ? 'Texto copiado y WhatsApp abierto: pégalo en el chat de Adam.' : 'No se pudo compartir: copia el texto a mano.');
  };

  return (
    <div className="resultado-item pendiente">
      <div className="fila">
        <span className="num" style={{ fontWeight: 700 }}>{item.n}</span>
        <span className="tipo-texto">{NOMBRE_TIPO[item.tipoTexto]}</span>
        {escrito ? <span className={`contador banda-${banda}`}>{avisoPalabras(palabras, item.minPalabras, item.maxPalabras)}</span> : <span className="silencio">sin escribir</span>}
      </div>
      {escrito && (
        <>
          <div className="tu-texto">{texto.split(/\n\n+/).map((p, i) => <p key={i}>{p}</p>)}</div>
          <div className="fila" style={{ gap: 8 }}>
            <button type="button" className="btn chico" onClick={enviar}>Enviar a Adam</button>
            {aviso && <span className="silencio pequeno">{aviso}</span>}
          </div>
          <p className="silencio pequeno">La corrección de los writings la hace Adam. Mientras, compárala con el modelo y repasa la lista.</p>
        </>
      )}
      <details className="plegable">
        <summary>Ver una respuesta modelo</summary>
        <div className="tu-texto modelo">{item.modelo.split(/\n\n+/).map((p, i) => <p key={i}>{p.split('\n').map((l, j) => <span key={j}>{j > 0 && <br />}{l}</span>)}</p>)}</div>
        {item.explicacion && <p className="explica">{item.explicacion}</p>}
      </details>
      <details className="plegable">
        <summary>Lista para autoevaluarte</summary>
        <ul className="criterios">
          {item.criterios.map((c, i) => (
            <li key={i}>
              <label>
                <input type="checkbox" checked={marcados[i]} onChange={() => setMarcados((m) => m.map((v, j) => (j === i ? !v : v)))} />
                <span>{c}</span>
              </label>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
