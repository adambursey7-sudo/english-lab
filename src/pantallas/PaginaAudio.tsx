import { NOMBRES_EXAMEN, etiquetaParte, type Examen } from '../banco/tipos';
import { Reproductor } from '../componentes/Reproductor';
import { montarCuadernillo, partesListening } from '../motor/cuadernillo';

interface Props {
  examen: Examen;
  numero: number;
}

/** La página que abre el QR del cuadernillo: las grabaciones del listening del examen N, en orden. */
export function PaginaAudio({ examen, numero }: Props) {
  const cuadernillo = montarCuadernillo(examen, numero);
  const partes = cuadernillo ? partesListening(cuadernillo) : [];
  return (
    <div className="app">
      <header className="cabecera aula compacta tono-listening">
        <div className="cabecera-dentro">
          <div style={{ minWidth: 0 }}>
            <div className="sub">{NOMBRES_EXAMEN[examen]} · Examen {numero}</div>
            <div className="titulo">Audio del listening</div>
          </div>
          <a className="btn chico sec claro" href="#/">App</a>
        </div>
      </header>
      <main className="contenido">
        {partes.length === 0 ? (
          <div className="hoja vacio">
            <h3>Este examen no tiene listening</h3>
            <p className="silencio">Comprueba el número del examen en la portada del cuadernillo.</p>
          </div>
        ) : (
          <>
            <p className="instrucciones">
              Cada grabación lleva las instrucciones y las pausas del examen de verdad, y cada parte se oye dos veces. Escribe las respuestas en el cuadernillo.
            </p>
            {partes.map((e) => (
              <section key={e.id} className="hoja" style={{ gap: 10 }}>
                <h3>{etiquetaParte(e.examen, e.parte)} · {e.nombreParte}</h3>
                <p className="silencio pequeno">{e.instrucciones}</p>
                {e.audio && <Reproductor audio={e.audio} />}
              </section>
            ))}
          </>
        )}
      </main>
    </div>
  );
}
