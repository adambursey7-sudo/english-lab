import { leerMarca, urlLogo } from '../marca';
import { useEffect, useRef, useState } from 'react';
import { Cara } from '../componentes/Cara';
import { apuntarFallo, esperaPin, etiquetaExamenes, PERFILES, pinCorrecto, type Perfil } from '../motor/perfiles';

interface Props {
  onEntrar: (perfil: Perfil, pin: string) => void;
  onInvitado: () => void;
}

/** Primera pantalla: cada alumno entra en su perfil con su PIN; sin cuenta se practica sin guardar nada. */
export function Perfiles({ onEntrar, onInvitado }: Props) {
  const marca = leerMarca();
  const [elegido, setElegido] = useState<Perfil>();
  const [texto, setTexto] = useState('');
  const [noHay, setNoHay] = useState(false);
  const buscar = (e: React.FormEvent) => {
    e.preventDefault();
    const hallado = PERFILES.find((p) => limpia(p.nombre) === limpia(texto));
    if (hallado) setElegido(hallado);
    else setNoHay(true);
  };

  if (elegido) return <TecladoPin perfil={elegido} onBien={(pin) => onEntrar(elegido, pin)} onVolver={() => setElegido(undefined)} />;

  return (
    <div className="app">
      <header className="cabecera aula">
        <div className="cabecera-dentro">
          <div className="marca">
            {urlLogo(marca) && <img className="logo" src={urlLogo(marca)} alt={marca.logoAlt} width="60" height="70" />}
            <div>
              <div className="sub">{marca.nombre}</div>
              <div className="titulo">¿Quién eres?</div>
              <div className="racha">Busca tu usuario y entra con el PIN que te dio Adam</div>
            </div>
          </div>
        </div>
      </header>

      <main className="contenido inicio">
        <form className="buscar-usuario" onSubmit={buscar}>
          <label htmlFor="buscar-usuario"><b>Buscar usuario</b></label>
          <input id="buscar-usuario" type="text" autoComplete="off" autoCapitalize="words" placeholder="Tu nombre (y la inicial de tu apellido)" value={texto} onChange={(e) => { setTexto(e.target.value); setNoHay(false); }} />
          <button type="submit" className="btn">Buscar</button>
          {noHay && <p className="aviso-pin mal" role="status">No encuentro ese usuario. Revisa cómo está escrito o pídeselo a Adam.</p>}
        </form>

        <section className="invitado-entrar">
          <button type="button" className="btn sec" onClick={onInvitado}>Entrar sin cuenta</button>
          <p className="silencio pequeno">Puedes practicar igual, pero no se guarda tu progreso ni ves las notas de Adam.</p>
        </section>
      </main>
    </div>
  );
}

/** Sin mayúsculas, tildes ni espacios de más: «maria l» vale para «María L». */
function limpia(t: string): string {
  return t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
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
              <div className="sub">English Lab · {etiquetaExamenes(perfil)}</div>
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
