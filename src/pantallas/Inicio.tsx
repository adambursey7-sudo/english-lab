import { useState } from 'react';
import { destrezasDe, partesDe } from '../banco';
import { NOMBRES_DESTREZA, NOMBRES_EXAMEN, etiquetaParte, type Destreza, type Ejercicio, type Examen } from '../banco/tipos';
import { Instalar } from '../componentes/Instalar';
import { minutosDe, montarExamen, practicarParte } from '../motor/examen';

const EXAMENES: Examen[] = ['c1', 'pau'];
/** Papeles que se ofrecen por examen (la PAU solo tiene la prueba escrita). */
const DESTREZAS: Record<Examen, Destreza[]> = {
  c1: ['reading-use', 'writing', 'listening', 'speaking'],
  pau: ['prueba'],
};

export function Inicio({ onEmpezar }: { onEmpezar: (lista: Ejercicio[]) => void }) {
  const [examen, setExamen] = useState<Examen>('c1');
  const [destrezaElegida, setDestreza] = useState<Destreza>('reading-use');
  // Al cambiar de examen, la destreza tiene que existir en él (la PAU solo tiene «prueba»).
  const destreza = DESTREZAS[examen].includes(destrezaElegida) ? destrezaElegida : DESTREZAS[examen][0];
  const disponibles = destrezasDe(examen);
  const partes = partesDe(examen, destreza);
  const examenCompleto = montarExamen(examen, destreza);

  return (
    <div className="app">
      <header className="cabecera">
        <div className="cabecera-dentro">
          <div>
            <div className="sub">English Lab</div>
            <div className="titulo">¿Qué practicamos hoy?</div>
          </div>
        </div>
      </header>

      <main className="contenido">
        <Instalar />

        <section style={{ display: 'grid', gap: 8 }}>
          <div className="eyebrow">Examen</div>
          <div className="fichas" role="group" aria-label="Examen">
            {EXAMENES.map((e) => (
              <button key={e} className="ficha" aria-pressed={examen === e} onClick={() => setExamen(e)}>
                {NOMBRES_EXAMEN[e]}
              </button>
            ))}
          </div>
        </section>

        <section style={{ display: 'grid', gap: 8 }}>
          <div className="eyebrow">Parte del examen</div>
          <div className="fichas" role="group" aria-label="Destreza">
            {DESTREZAS[examen].map((d) => (
              <button key={d} className="ficha" aria-pressed={destreza === d} disabled={!disponibles.includes(d)} onClick={() => setDestreza(d)}>
                {NOMBRES_DESTREZA[d]}
              </button>
            ))}
          </div>
        </section>

        {partes.length === 0 ? (
          <div className="hoja">
            <h2>Todavía no hay ejercicios aquí</h2>
            <p className="silencio">Esta parte del banco está en preparación. De momento puedes practicar Reading &amp; Use of English de C1.</p>
          </div>
        ) : (
          <>
            <section style={{ display: 'grid', gap: 10 }}>
              <div className="eyebrow">Practicar una parte suelta</div>
              <div className="lista">
                {partes.map((p) => (
                  <button key={p.parte} className="tarjeta" onClick={() => onEmpezar(practicarParte(examen, destreza, p.parte))}>
                    <b>{etiquetaParte(examen, p.parte)} · {p.nombreParte}</b>
                    <small>{p.minutos} min · {p.cuantos} {p.cuantos === 1 ? 'ejercicio' : 'ejercicios'} en el banco</small>
                    <span className="flecha" aria-hidden="true">›</span>
                  </button>
                ))}
              </div>
            </section>

            <button className="btn" onClick={() => onEmpezar(examenCompleto)}>
              Montar un examen completo · {minutosDe(examenCompleto)} min
            </button>
            <p className="silencio pequeno">Un ejercicio de cada parte, elegidos entre los que aún no has hecho. Se corrige al terminar, con la explicación de cada fallo.</p>
          </>
        )}
      </main>
    </div>
  );
}
