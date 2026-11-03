import { useState } from 'react';
import { CONSEJOS_C1, consejosDe } from '../banco/consejos';
import { NOMBRES_DESTREZA, type Destreza } from '../banco/tipos';
import { ChecklistWriting } from '../componentes/ConsejosParte';

const DESTREZAS: Destreza[] = ['reading-use', 'writing', 'listening', 'speaking'];

interface Props {
  /** Destreza y parte con las que se abre (desde un resultado); sin ellas se ven todas. */
  destreza?: Destreza;
  parte?: number;
  onVolver: () => void;
}

export function Consejos({ destreza: inicial, parte, onVolver }: Props) {
  const [destreza, setDestreza] = useState<Destreza>(inicial && CONSEJOS_C1[inicial] ? inicial : 'reading-use');
  // La parte solo filtra mientras se mira la destreza con la que se abrió.
  const soloParte = destreza === inicial ? parte : undefined;
  const consejos = consejosDe(destreza, soloParte);

  return (
    <div className="app">
      <header className={`cabecera aula compacta tono-${destreza}`}>
        <div className="cabecera-dentro">
          <div>
            <div className="sub">Cambridge C1 Advanced</div>
            <div className="titulo">Consejos</div>
          </div>
          <button type="button" className="btn chico sec claro mini" onClick={onVolver}>Volver</button>
        </div>
      </header>

      <main className="contenido">
        <div className="fichas" role="group" aria-label="Papel">
          {DESTREZAS.map((d) => (
            <button key={d} className="ficha" aria-pressed={destreza === d} onClick={() => setDestreza(d)}>{NOMBRES_DESTREZA[d]}</button>
          ))}
        </div>

        {soloParte !== undefined && (
          <p className="silencio pequeno">Solo lo de la parte que acabas de hacer. Toca otro papel para ver todo.</p>
        )}

        {consejos.map((c) => (
          <section key={c.parte} className="hoja consejo">
            <h3>{c.parte === 0 ? c.titulo : `Part ${c.parte} · ${c.titulo}`}</h3>
            <ul>
              {c.puntos.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </section>
        ))}

        {destreza === 'writing' && <ChecklistWriting />}

        <button type="button" className="btn" onClick={onVolver}>Volver</button>
      </main>
    </div>
  );
}
