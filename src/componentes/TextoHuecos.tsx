import type { ReactNode } from 'react';

interface Props {
  texto: string;
  titulo?: string;
  /** Qué pintar en el hueco n. */
  hueco: (n: number) => ReactNode;
}

/** Pinta el texto de un ejercicio con sus párrafos y sus huecos {{n}}. */
export function TextoHuecos({ texto, titulo, hueco }: Props) {
  const parrafos = texto.split(/\n\n+/);
  return (
    <div className="texto">
      {titulo && <h3>{titulo}</h3>}
      {parrafos.map((parrafo, i) => (
        <p key={i}>
          {parrafo.split(/(\{\{\d+\}\})/).map((trozo, j) => {
            const m = /^\{\{(\d+)\}\}$/.exec(trozo);
            return m ? <span key={j}>{hueco(Number(m[1]))}</span> : trozo;
          })}
        </p>
      ))}
    </div>
  );
}
