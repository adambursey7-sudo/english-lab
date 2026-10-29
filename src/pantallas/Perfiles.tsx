import { NOMBRES_EXAMEN, type Examen } from '../banco/tipos';
import { inicial, perfilesDe, type Perfil } from '../motor/perfiles';

const EXAMENES: Examen[] = ['c1', 'pau'];

/** Primera pantalla: quién va a practicar. Cada alumno tiene su progreso aparte y sus notas de Adam. */
export function Perfiles({ onElegir }: { onElegir: (perfil: Perfil) => void }) {
  return (
    <div className="app">
      <header className="cabecera aula">
        <div className="cabecera-dentro">
          <div className="marca">
            <img className="logo" src={`${import.meta.env.BASE_URL}img/logo.png`} alt="Aprende Inglés con Kate" width="60" height="70" />
            <div>
              <div className="sub">English Lab</div>
              <div className="titulo">¿Quién eres?</div>
              <div className="racha">Tu progreso se guarda con tu nombre</div>
            </div>
          </div>
        </div>
      </header>

      <main className="contenido inicio">
        {EXAMENES.map((x) => (
          <section key={x} className="bloque">
            <h2>{NOMBRES_EXAMEN[x]}</h2>
            <div className="perfiles">
              {perfilesDe(x).map((p) => (
                <button key={p.id} type="button" className={`perfil tono-${x === 'pau' ? 'prueba' : 'reading-use'}`} onClick={() => onElegir(p)}>
                  <span className="avatar" aria-hidden="true">{inicial(p.nombre)}</span>
                  <b>{p.nombre}</b>
                  <span className="flecha" aria-hidden="true">›</span>
                </button>
              ))}
            </div>
          </section>
        ))}
        <p className="silencio pequeno">
          Lo que corrige la app se apunta en este móvil con tu nombre. Las notas de los speaking y los writing te las pone Adam y salen en «Mi progreso».
        </p>
      </main>
    </div>
  );
}
