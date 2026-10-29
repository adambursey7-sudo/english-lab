import { useEffect, useRef, useState } from 'react';
import { NOMBRES_EXAMEN, type Examen } from '../banco/tipos';
import { Cara } from '../componentes/Cara';
import { apuntarFallo, esperaPin, perfilesDe, pinCorrecto, type Perfil } from '../motor/perfiles';

const EXAMENES: Examen[] = ['c1', 'pau'];

interface Props {
  onEntrar: (perfil: Perfil, pin: string) => void;
  onInvitado: () => void;
}

/** Primera pantalla: cada alumno entra en su perfil con su PIN; sin cuenta se practica sin guardar nada. */
export function Perfiles({ onEntrar, onInvitado }: Props) {
  const [elegido, setElegido] = useState<Perfil>();

  if (elegido) return <TecladoPin perfil={elegido} onBien={(pin) => onEntrar(elegido, pin)} onVolver={() => setElegido(undefined)} />;

  return (
    <div className="app">
      <header className="cabecera aula">
        <div className="cabecera-dentro">
          <div className="marca">
            <img className="logo" src={`${import.meta.env.BASE_URL}img/logo.png`} alt="Aprende Inglés con Kate" width="60" height="70" />
            <div>
              <div className="sub">English Lab</div>
              <div className="titulo">¿Quién eres?</div>
              <div className="racha">Entra en tu perfil con el PIN que te dio Adam</div>
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
                <button key={p.id} type="button" className={`perfil tono-${x === 'pau' ? 'prueba' : 'reading-use'}`} onClick={() => setElegido(p)}>
                  <span className="avatar" aria-hidden="true"><Cara perfil={p} /></span>
                  <b>{p.nombre}</b>
                  <span className="candado" aria-label="con PIN"><IconoCandado /></span>
                </button>
              ))}
            </div>
          </section>
        ))}

        <section className="invitado-entrar">
          <button type="button" className="btn sec" onClick={onInvitado}>Entrar sin cuenta</button>
          <p className="silencio pequeno">Puedes practicar igual, pero no se guarda tu progreso ni ves las notas de Adam.</p>
        </section>
      </main>
    </div>
  );
}

function TecladoPin({ perfil, onBien, onVolver }: { perfil: Perfil; onBien: (pin: string) => void; onVolver: () => void }) {
  const [pin, setPinVisible] = useState('');
  // El PIN de verdad va en una referencia: dos teclas seguidas antes de pintar no se pisan.
  const actual = useRef('');
  const setPin = (valor: string | ((p: string) => string)) => {
    actual.current = typeof valor === 'function' ? valor(actual.current) : valor;
    setPinVisible(actual.current);
  };
  const [mal, setMal] = useState(false);
  const [espera, setEspera] = useState(() => esperaPin());

  // Cuenta atrás tras varios fallos seguidos.
  useEffect(() => {
    if (espera === 0) return;
    const t = window.setTimeout(() => setEspera(esperaPin()), 1000);
    return () => window.clearTimeout(t);
  }, [espera]);

  const pulsar = (cifra: string) => {
    if (espera > 0 || actual.current.length >= 4) return;
    const nuevo = actual.current + cifra;
    setMal(false);
    setPin(nuevo);
    if (nuevo.length < 4) return;
    if (pinCorrecto(perfil, nuevo)) {
      onBien(nuevo);
      return;
    }
    apuntarFallo();
    // Deja ver el cuarto punto un momento antes de vaciar.
    window.setTimeout(() => {
      setPin('');
      setMal(true);
      setEspera(esperaPin());
    }, 250);
  };

  // En el ordenador también vale el teclado.
  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      if (/^\d$/.test(e.key)) pulsar(e.key);
      else if (e.key === 'Backspace') setPin((p) => p.slice(0, -1));
      else if (e.key === 'Escape') onVolver();
    };
    window.addEventListener('keydown', tecla);
    return () => window.removeEventListener('keydown', tecla);
  });

  const tono = perfil.examen === 'pau' ? 'prueba' : 'reading-use';
  return (
    <div className="app">
      <header className="cabecera aula">
        <div className="cabecera-dentro">
          <div className="marca">
            <span className={`avatar-grande tono-${tono}`} aria-hidden="true"><Cara perfil={perfil} /></span>
            <div>
              <div className="sub">English Lab · {NOMBRES_EXAMEN[perfil.examen]}</div>
              <div className="titulo">Hola, {perfil.nombre}</div>
              <div className="racha">Escribe tu PIN de 4 números</div>
            </div>
          </div>
          <button type="button" className="btn chico sec claro cambiar-perfil mini" onClick={onVolver}>Volver</button>
        </div>
      </header>

      <main className={`contenido pin tono-${tono}`}>
        <div className={`puntos${mal ? ' mal' : ''}`} aria-live="polite" aria-label={`${pin.length} de 4 números`}>
          {[0, 1, 2, 3].map((i) => <span key={i} className={i < pin.length ? 'lleno' : ''} />)}
        </div>
        <p className={`aviso-pin${mal ? ' mal' : ''}`} role="status">
          {espera > 0 ? `Demasiados intentos. Espera ${espera} s.` : mal ? 'Ese no es. Prueba otra vez.' : ' '}
        </p>
        <div className="teclado" role="group" aria-label="Teclado del PIN">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((c) => (
            <button key={c} type="button" disabled={espera > 0} onClick={() => pulsar(c)}>{c}</button>
          ))}
          <span />
          <button type="button" disabled={espera > 0} onClick={() => pulsar('0')}>0</button>
          <button type="button" className="borrar" aria-label="Borrar" onClick={() => setPin((p) => p.slice(0, -1))}>⌫</button>
        </div>
        <p className="silencio pequeno centrado">¿No te acuerdas? Pídeselo a Adam.</p>
      </main>
    </div>
  );
}

function IconoCandado() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
