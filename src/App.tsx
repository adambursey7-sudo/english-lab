import { useEffect, useMemo, useState } from 'react';
import { BANCO } from './banco';
import { borrarBorrador, guardarBorrador, leerBorrador, tieneRespuestas } from './motor/borrador';
import type { Destreza, Ejercicio, Respuestas } from './banco/tipos';
import { Consejos } from './pantallas/Consejos';
import { apuntarVistos } from './motor/examen';
import { elegirPerfil, examenesDe, perfilActivo, salirPerfil, type Perfil } from './motor/perfiles';
import { Inicio } from './pantallas/Inicio';
import { PantallaEjercicio } from './pantallas/Ejercicio';
import { Resultado } from './pantallas/Resultado';
import { MisResultados } from './pantallas/MisResultados';
import { Perfiles } from './pantallas/Perfiles';
import { Imprimir } from './pantallas/Imprimir';
import { Crear } from './pantallas/Crear';
import { Editor } from './pantallas/Editor';
import { Licencia } from './pantallas/Licencia';
import { Aula } from './pantallas/Aula';
import { Hacer } from './pantallas/Hacer';
import { PaginaAudio } from './pantallas/PaginaAudio';
import type { Examen } from './banco/tipos';
import { Intro } from './componentes/Intro';
import { Asistente } from './componentes/Asistente';
import { aplicarColor, ES_PRODUCTO, MODO_CLASE, marcaConfigurada } from './marca';

type Estado =
  | { pantalla: 'inicio' }
  | { pantalla: 'resultados' }
  | { pantalla: 'ejercicio'; lista: Ejercicio[]; i: number; respuestas: Record<string, Respuestas>; inicios: Record<string, number> }
  | { pantalla: 'resultado'; lista: Ejercicio[]; respuestas: Record<string, Respuestas>; /** Ya apuntado y con el pop-up visto (se vuelve de Consejos). */ visto?: boolean }
  | { pantalla: 'consejos'; destreza?: Destreza; parte?: number; atras: Estado };

/** Rutas por hash que viven fuera del flujo normal: el cuadernillo imprimible y la página de audio del QR. */
type Ruta = { tipo: 'imprimir'; examen: Examen; numero: number; modo: 'cuadernillo' | 'clave' } | { tipo: 'audio'; examen: Examen; numero: number } | { tipo: 'mezcla'; ids: string[] } | { tipo: 'crear' } | { tipo: 'editor' } | { tipo: 'licencia' } | { tipo: 'aula' } | { tipo: 'hacer'; payload: string };

export function rutaDe(hash: string): Ruta | null {
  if (ES_PRODUCTO && /^#\/crear\/?$/.test(hash)) return { tipo: 'crear' };
  if (ES_PRODUCTO && /^#\/mis-ejercicios\/?$/.test(hash)) return { tipo: 'editor' };
  if (ES_PRODUCTO && /^#\/licencia\/?$/.test(hash)) return { tipo: 'licencia' };
  if (ES_PRODUCTO && /^#\/aula\/?$/.test(hash)) return { tipo: 'aula' };
  const hacer = /^#\/hacer\/([\w-]{20,4000})\/?$/.exec(hash);
  if (hacer) return { tipo: 'hacer', payload: hacer[1] };
  const mezcla = /^#\/audio\/mezcla\/([\w.~-]{1,400})\/?$/.exec(hash);
  if (mezcla) return { tipo: 'mezcla', ids: mezcla[1].split('~') };
  const m = /^#\/(imprimir|audio)\/(b1can|b2can|b1|b2|c1|pau)\/(\d+)(\/clave)?\/?$/.exec(hash);
  if (!m) return null;
  const examen = m[2] as Examen;
  const numero = Number(m[3]);
  if (m[1] === 'audio') return { tipo: 'audio', examen, numero };
  return { tipo: 'imprimir', examen, numero, modo: m[4] ? 'clave' : 'cuadernillo' };
}

export function App() {
  const [estado, setEstado] = useState<Estado>({ pantalla: 'inicio' });
  const [ruta, setRuta] = useState<Ruta | null>(() => rutaDe(window.location.hash));
  // Quién practica en este móvil (cada alumno entra con su PIN y tiene su progreso); si no ha dicho quién es, se le
  // pregunta. El modo invitado no se recuerda: la próxima vez vuelve a salir «¿Quién eres?».
  const [perfil, setPerfil] = useState<Perfil | undefined>(MODO_CLASE ? perfilActivo : undefined);
  const [invitado, setInvitado] = useState(!MODO_CLASE);
  useEffect(() => {
    const alCambiar = () => setRuta(rutaDe(window.location.hash));
    window.addEventListener('hashchange', alCambiar);
    return () => window.removeEventListener('hashchange', alCambiar);
  }, []);
  // La intro (vídeo con música) sale cada vez que se abre la app, en el móvil y en el ordenador.
  // Si se entra por el cuadernillo o la página de audio (QR), al volver a la app no hay intro.
  const [intro, setIntro] = useState(() => MODO_CLASE && rutaDe(window.location.hash) === null);
  // Primera vez de una academia (solo en producto): nombre, logo y color antes de empezar.
  const [asistente, setAsistente] = useState(() => ES_PRODUCTO && !marcaConfigurada());
  useEffect(() => aplicarColor(), []);
  const paso = estado.pantalla === 'ejercicio' ? estado.i : -1;

  // Si el alumno cierra la app a mitad de un ejercicio, se guarda lo contestado y el reloj para que pueda seguir.
  const perfilId = perfil?.id;
  useEffect(() => {
    if (estado.pantalla !== 'ejercicio' || !tieneRespuestas(estado.respuestas)) return;
    guardarBorrador(perfilId, { ids: estado.lista.map((e) => e.id), i: estado.i, respuestas: estado.respuestas, inicios: estado.inicios });
  }, [estado, perfilId]);
  const borrador = useMemo(
    () => (estado.pantalla === 'inicio' ? leerBorrador(perfilId, (id) => BANCO.some((e) => e.id === id)) : undefined),
    [estado.pantalla, perfilId],
  );

  // Cada pantalla nueva empieza arriba del todo (si no, se hereda el scroll de la anterior).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [estado.pantalla, paso, perfil, invitado]);

  // Un alumno solo abre el cuadernillo de su examen (el audio del QR sigue abierto: se usa desde el papel).
  // Si no es el suyo, se quita el enlace de la barra y se queda en su inicio.
  const cuadernilloAjeno = ruta?.tipo === 'imprimir' && !examenesDe(perfil).includes(ruta.examen);
  useEffect(() => {
    if (!cuadernilloAjeno) return;
    history.replaceState(null, '', window.location.pathname + window.location.search);
    setRuta(null);
  }, [cuadernilloAjeno]);

  if (ruta?.tipo === 'crear') return <Crear />;
  if (ruta?.tipo === 'editor') return <Editor />;
  if (ruta?.tipo === 'licencia') return <Licencia />;
  if (ruta?.tipo === 'aula') return <Aula />;
  if (ruta?.tipo === 'hacer') return <Hacer payload={ruta.payload} />;
  if (ruta?.tipo === 'imprimir' && !cuadernilloAjeno) return <Imprimir examen={ruta.examen} numero={ruta.numero} modo={ruta.modo} />;
  if (ruta?.tipo === 'mezcla') return <PaginaAudio ids={ruta.ids} />;
  if (ruta?.tipo === 'audio') return <PaginaAudio examen={ruta.examen} numero={ruta.numero} />;

  if (asistente) return <Asistente onListo={() => setAsistente(false)} />;

  if (intro) {
    return <Intro onFin={() => setIntro(false)} />;
  }

  if (!perfil && !invitado) {
    return (
      <Perfiles
        onEntrar={(p, pin) => {
          elegirPerfil(p, pin);
          setPerfil(p);
          setEstado({ pantalla: 'inicio' });
        }}
        onInvitado={() => {
          setInvitado(true);
          setEstado({ pantalla: 'inicio' });
        }}
      />
    );
  }

  const cambiarPerfil = () => {
    if (!MODO_CLASE) return;
    salirPerfil();
    setPerfil(undefined);
    setInvitado(false);
  };
  const empezar = (lista: Ejercicio[]) => {
    borrarBorrador(perfilId);
    setEstado({ pantalla: 'ejercicio', lista, i: 0, respuestas: {}, inicios: {} });
  };
  const continuar = () => {
    if (!borrador) return;
    const lista = borrador.ids.map((id) => BANCO.find((e) => e.id === id)).filter((e): e is Ejercicio => e !== undefined);
    setEstado({ pantalla: 'ejercicio', lista, i: borrador.i, respuestas: borrador.respuestas, inicios: borrador.inicios });
  };

  // «Mi progreso» es solo de quien tiene cuenta.
  if (estado.pantalla === 'inicio' || (estado.pantalla === 'resultados' && !perfil)) {
    return (
      <Inicio
        perfil={perfil}
        borrador={borrador ? { titulo: BANCO.find((e) => e.id === borrador.ids[borrador.i])?.nombreParte ?? '', i: borrador.i + 1, total: borrador.ids.length } : undefined}
        onContinuar={continuar}
        onDescartar={() => {
          borrarBorrador(perfilId);
          setEstado({ pantalla: 'inicio' });
        }}
        onEmpezar={empezar} onResultados={() => setEstado({ pantalla: 'resultados' })}
        onCambiarPerfil={cambiarPerfil}
        onConsejos={() => setEstado({ pantalla: 'consejos', atras: { pantalla: 'inicio' } })}
      />
    );
  }

  if (estado.pantalla === 'consejos') {
    return <Consejos destreza={estado.destreza} parte={estado.parte} onVolver={() => setEstado(estado.atras)} />;
  }

  if (estado.pantalla === 'resultados') {
    if (!perfil) return null;
    return <MisResultados perfil={perfil} onInicio={() => setEstado({ pantalla: 'inicio' })} onEmpezar={empezar} />;
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
        inicio={estado.inicios[ejercicio.id]}
        onInicio={(t) => setEstado((e) => (e.pantalla !== 'ejercicio' || e.inicios[ejercicio.id] !== undefined ? e : { ...e, inicios: { ...e.inicios, [ejercicio.id]: t } }))}
        onCambia={(n, valor) =>
          setEstado((e) =>
            e.pantalla !== 'ejercicio' ? e : { ...e, respuestas: { ...e.respuestas, [ejercicio.id]: { ...(e.respuestas[ejercicio.id] ?? {}), [n]: valor } } },
          )
        }
        onSiguiente={() => {
          if (ultimo) {
            apuntarVistos(estado.lista.map((e) => e.id));
            borrarBorrador(perfilId);
            setEstado({ pantalla: 'resultado', lista: estado.lista, respuestas: estado.respuestas });
          } else {
            setEstado({ ...estado, i: estado.i + 1 });
          }
        }}
        onSalir={() => {
          borrarBorrador(perfilId);
          setEstado({ pantalla: 'inicio' });
        }}
      />
    );
  }

  return (
    <Resultado
      lista={estado.lista}
      respuestas={estado.respuestas}
      onRepetir={() => setEstado({ pantalla: 'ejercicio', lista: estado.lista, i: 0, respuestas: {}, inicios: {} })}
      onInicio={() => setEstado({ pantalla: 'inicio' })}
      onConsejos={(destreza, parte) => setEstado({ pantalla: 'consejos', destreza, parte, atras: { ...estado, visto: true } })}
      visto={estado.visto}
      onEmpezar={(lista) => (lista.length > 0 ? empezar(lista) : setEstado({ pantalla: 'inicio' }))}
    />
  );
}
