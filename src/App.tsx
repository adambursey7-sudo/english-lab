import { useEffect, useState } from 'react';
import type { Ejercicio, Respuestas } from './banco/tipos';
import { apuntarVistos } from './motor/examen';
import { Inicio } from './pantallas/Inicio';
import { PantallaEjercicio } from './pantallas/Ejercicio';
import { Resultado } from './pantallas/Resultado';
import { MisResultados } from './pantallas/MisResultados';
import { Imprimir } from './pantallas/Imprimir';
import { PaginaAudio } from './pantallas/PaginaAudio';
import type { Examen } from './banco/tipos';
import { Intro } from './componentes/Intro';

type Estado =
  | { pantalla: 'inicio' }
  | { pantalla: 'resultados' }
  | { pantalla: 'ejercicio'; lista: Ejercicio[]; i: number; respuestas: Record<string, Respuestas> }
  | { pantalla: 'resultado'; lista: Ejercicio[]; respuestas: Record<string, Respuestas> };

/** Rutas por hash que viven fuera del flujo normal: el cuadernillo imprimible y la página de audio del QR. */
type Ruta = { tipo: 'imprimir'; examen: Examen; numero: number; modo: 'cuadernillo' | 'clave' } | { tipo: 'audio'; examen: Examen; numero: number };

export function rutaDe(hash: string): Ruta | null {
  const m = /^#\/(imprimir|audio)\/(c1|pau)\/(\d+)(\/clave)?\/?$/.exec(hash);
  if (!m) return null;
  const examen = m[2] as Examen;
  const numero = Number(m[3]);
  if (m[1] === 'audio') return { tipo: 'audio', examen, numero };
  return { tipo: 'imprimir', examen, numero, modo: m[4] ? 'clave' : 'cuadernillo' };
}

export function App() {
  const [estado, setEstado] = useState<Estado>({ pantalla: 'inicio' });
  const [ruta, setRuta] = useState<Ruta | null>(() => rutaDe(window.location.hash));
  useEffect(() => {
    const alCambiar = () => setRuta(rutaDe(window.location.hash));
    window.addEventListener('hashchange', alCambiar);
    return () => window.removeEventListener('hashchange', alCambiar);
  }, []);
  // La intro (vídeo con música) sale cada vez que se abre la app, en el móvil y en el ordenador.
  const [intro, setIntro] = useState(true);
  const paso = estado.pantalla === 'ejercicio' ? estado.i : -1;

  // Cada pantalla nueva empieza arriba del todo (si no, se hereda el scroll de la anterior).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [estado.pantalla, paso]);

  if (ruta?.tipo === 'imprimir') return <Imprimir examen={ruta.examen} numero={ruta.numero} modo={ruta.modo} />;
  if (ruta?.tipo === 'audio') return <PaginaAudio examen={ruta.examen} numero={ruta.numero} />;

  if (intro) {
    return <Intro onFin={() => setIntro(false)} />;
  }

  if (estado.pantalla === 'inicio') {
    return <Inicio onEmpezar={(lista) => setEstado({ pantalla: 'ejercicio', lista, i: 0, respuestas: {} })} onResultados={() => setEstado({ pantalla: 'resultados' })} />;
  }

  if (estado.pantalla === 'resultados') {
    return <MisResultados onInicio={() => setEstado({ pantalla: 'inicio' })} />;
  }

  if (estado.pantalla === 'ejercicio') {
    const ejercicio = estado.lista[estado.i];
    const ultimo = estado.i === estado.lista.length - 1;
    return (
      <PantallaEjercicio
        key={ejercicio.id}
        ejercicio={ejercicio}
        posicion={{ i: estado.i + 1, total: estado.lista.length }}
        respuestas={estado.respuestas[ejercicio.id] ?? {}}
        onCambia={(n, valor) =>
          setEstado((e) =>
            e.pantalla !== 'ejercicio' ? e : { ...e, respuestas: { ...e.respuestas, [ejercicio.id]: { ...(e.respuestas[ejercicio.id] ?? {}), [n]: valor } } },
          )
        }
        onSiguiente={() => {
          if (ultimo) {
            apuntarVistos(estado.lista.map((e) => e.id));
            setEstado({ pantalla: 'resultado', lista: estado.lista, respuestas: estado.respuestas });
          } else {
            setEstado({ ...estado, i: estado.i + 1 });
          }
        }}
        onSalir={() => setEstado({ pantalla: 'inicio' })}
      />
    );
  }

  return (
    <Resultado
      lista={estado.lista}
      respuestas={estado.respuestas}
      onRepetir={() => setEstado({ pantalla: 'ejercicio', lista: estado.lista, i: 0, respuestas: {} })}
      onInicio={() => setEstado({ pantalla: 'inicio' })}
      onEmpezar={(lista) => (lista.length > 0 ? setEstado({ pantalla: 'ejercicio', lista, i: 0, respuestas: {} }) : setEstado({ pantalla: 'inicio' }))}
    />
  );
}
