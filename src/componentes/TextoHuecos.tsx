import type { ReactNode } from 'react';

interface Props {
  texto: string;
  titulo?: string;
  /** Qué pintar en el hueco n. */
  hueco: (n: number) => ReactNode;
}

/** «Your friend: …», «You: …»: quién habla en cada línea de un diálogo, para ponerlo en negrita. */
const HABLANTE = /^([A-Z][\w’' ]{0,24}):\s/;

/**
 * Pinta el texto de un ejercicio con sus párrafos y sus huecos {{n}}. Un salto de línea solo (sin párrafo nuevo) es
 * una línea de diálogo: se respeta y, si empieza con «Alguien:», el nombre va en negrita.
 */
export function TextoHuecos({ texto, titulo, hueco }: Props) {
  const parrafos = texto.split(/\n\n+/);
  const conHuecos = (trozo: string, clave: string) =>
    trozo.split(/(\{\{\d+\}\})/).map((t, j) => {
      const m = /^\{\{(\d+)\}\}$/.exec(t);
      return m ? <span key={`${clave}-${j}`}>{hueco(Number(m[1]))}</span> : t;
    });
  return (
    <div className="texto">
      {titulo && <h3>{titulo}</h3>}
      {parrafos.map((parrafo, i) => {
        const lineas = parrafo.split('\n');
        if (lineas.length === 1) return <p key={i}>{conHuecos(parrafo, String(i))}</p>;
        return (
          <p key={i} className="dialogo">
            {lineas.map((linea, k) => {
              const m = HABLANTE.exec(linea);
              return (
                <span key={k} className="linea">
                  {m && <b className="hablante">{m[1]}:</b>}
                  {m ? ' ' : ''}
                  {conHuecos(m ? linea.slice(m[0].length) : linea, `${i}-${k}`)}
                </span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}
