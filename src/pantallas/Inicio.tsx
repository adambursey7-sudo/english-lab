import { useEffect, useState } from 'react';
import { destrezasDe, partesDe } from '../banco';
import { NOMBRES_DESTREZA, NOMBRES_EXAMEN, etiquetaParte, type Destreza, type Ejercicio, type Examen } from '../banco/tipos';
import { Instalar } from '../componentes/Instalar';
import { minutosDe, montarExamen, montarExamenNumero, numerosExamen, practicarParte } from '../motor/examen';
import { hechosEstaSemana, leerHistorial, mejorDeParte, porcentaje, resumenDestreza } from '../motor/historial';
import { cargarNotas, leerNotasGuardadas, mediaNotas, notasDe, textoNota, type NotasProfe } from '../motor/notas';
import type { Perfil } from '../motor/perfiles';

const EXAMENES: Examen[] = ['c1', 'pau'];
/** Papeles que se ofrecen por examen (la PAU solo tiene la prueba escrita). */
const DESTREZAS: Record<Examen, Destreza[]> = {
  c1: ['reading-use', 'writing', 'listening', 'speaking'],
  pau: ['prueba'],
};

/** Una frase corta por destreza para la tarjeta. */
const LEMA: Record<Destreza, string> = {
  'reading-use': 'Textos, huecos y transformaciones',
  writing: 'Essay y una tarea a elegir',
  listening: 'Cuatro partes con audio',
  speaking: 'Con reloj y micro',
  prueba: 'Texto, diálogo, situaciones y redacción',
};

interface Props {
  perfil: Perfil;
  onEmpezar: (lista: Ejercicio[]) => void;
  onResultados: () => void;
  onCambiarPerfil: () => void;
}

export function Inicio({ perfil, onEmpezar, onResultados, onCambiarPerfil }: Props) {
  const [examen, setExamen] = useState<Examen>(perfil.examen);
  const [destrezaElegida, setDestreza] = useState<Destreza>(DESTREZAS[perfil.examen][0]);
  const [historial] = useState(() => leerHistorial(perfil.id));
  const [notas, setNotas] = useState<NotasProfe>(leerNotasGuardadas);
  /** Qué examen completo: un número concreto o 'azar' (una parte de cada, al azar). */
  const [numeroElegido, setNumero] = useState<number | 'azar'>(1);
  // Al cambiar de examen, la destreza tiene que existir en él (la PAU solo tiene «prueba»).
  const destreza = DESTREZAS[examen].includes(destrezaElegida) ? destrezaElegida : DESTREZAS[examen][0];
  const disponibles = destrezasDe(examen);
  const partes = partesDe(examen, destreza);
  const numeros = numerosExamen(examen, destreza);
  const numero = numeroElegido !== 'azar' && !numeros.includes(numeroElegido) ? (numeros[0] ?? 'azar') : numeroElegido;
  const examenCompleto = numero === 'azar' ? montarExamen(examen, destreza) : montarExamenNumero(examen, destreza, numero);
  const semana = hechosEstaSemana(historial);
  const misNotas = notasDe(notas, perfil.id);

  // Las notas de Adam se bajan al abrir (si no hay red, quedan las de la última vez).
  useEffect(() => {
    let vivo = true;
    cargarNotas().then((n) => {
      if (vivo) setNotas(n);
    });
    return () => {
      vivo = false;
    };
  }, []);

  return (
    <div className="app">
      <header className="cabecera aula">
        <div className="cabecera-dentro">
          <div className="marca">
            <img className="logo" src={`${import.meta.env.BASE_URL}img/logo.png`} alt="Aprende Inglés con Kate" width="60" height="70" />
            <div>
              <div className="sub">English Lab</div>
              <div className="titulo">Hola, {perfil.nombre}</div>
              <button type="button" className="racha" onClick={onResultados}>
                {semana === 0 ? 'Nada hecho esta semana todavía' : `${semana} ${semana === 1 ? 'ejercicio hecho' : 'ejercicios hechos'} esta semana`}
                <span className="racha-enlace">{historial.length === 0 && misNotas.length === 0 ? '' : 'Mi progreso ›'}</span>
              </button>
            </div>
          </div>
          <button type="button" className="btn chico sec claro cambiar-perfil mini" onClick={onCambiarPerfil} aria-label={`Cambiar de alumno (ahora ${perfil.nombre})`}>
            Cambiar
          </button>
        </div>
      </header>

      <main className="contenido inicio">
        <div className="fichas" role="group" aria-label="Examen">
          {EXAMENES.map((e) => (
            <button key={e} className="ficha" aria-pressed={examen === e} onClick={() => setExamen(e)}>
              {NOMBRES_EXAMEN[e]}
            </button>
          ))}
        </div>

        {examenCompleto.length > 0 && (
          <section className={`examen-completo tono-${destreza}`}>
            <div>
              <h2>Examen completo</h2>
              <p className="silencio">
                {NOMBRES_DESTREZA[destreza]}: {examenCompleto.length === 1 ? 'una parte' : `${examenCompleto.length} partes seguidas`}, {minutosDe(examenCompleto)} min. Como el día del examen; se corrige al final.
              </p>
            </div>
            <button className="btn chico" onClick={() => onEmpezar(examenCompleto)}>Empezar</button>
            {numeros.length > 1 && (
              <div className="numeros fichas" role="group" aria-label="Qué examen">
                {numeros.map((n) => (
                  <button key={n} className="ficha mini" aria-pressed={numero === n} onClick={() => setNumero(n)}>Examen {n}</button>
                ))}
                <button className="ficha mini" aria-pressed={numero === 'azar'} onClick={() => setNumero('azar')}>Mezcla</button>
              </div>
            )}
            {numero !== 'azar' && (
              <a className="enlace-pdf" href={`#/imprimir/${examen}/${numero}`} target="_blank" rel="noopener">
                Cuadernillo en PDF del examen {numero} <span className="silencio">(todas las partes, para hacerlo en papel)</span>
              </a>
            )}
          </section>
        )}

        <section className="bloque">
          <h2>Elige qué practicar</h2>
          <div className={`destrezas${DESTREZAS[examen].length === 1 ? ' una' : ''}`} role="group" aria-label="Parte del examen">
            {DESTREZAS[examen].map((d) => {
              const r = resumenDestreza(historial, examen, d);
              const hay = disponibles.includes(d);
              const deAdam = mediaNotas(misNotas.filter((n) => n.examen === examen && n.destreza === d));
              return (
                <button key={d} className={`ficha destreza tono-${d}`} aria-pressed={destreza === d} disabled={!hay} onClick={() => setDestreza(d)}>
                  <span className="icono" aria-hidden="true"><IconoDestreza destreza={d} /></span>
                  <b>{NOMBRES_DESTREZA[d]}</b>
                  <small>{hay ? LEMA[d] : 'En preparación'}</small>
                  {hay && (
                    <>
                      <span className="progreso" aria-hidden="true"><span style={{ width: `${r.partes === 0 ? 0 : (r.hechas / r.partes) * 100}%` }} /></span>
                      <small className="dato">
                        {r.hechas === 0 ? `${r.partes} ${r.partes === 1 ? 'parte' : 'partes'} por hacer` : `${r.hechas} de ${r.partes} hechas`}
                        {r.media !== null && ` · media ${r.media} %`}
                        {deAdam !== null && ` · Adam: ${textoNota(deAdam)}/10`}
                      </small>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {partes.length === 0 ? (
          <div className="hoja">
            <h3>Todavía no hay ejercicios aquí</h3>
            <p className="silencio">Esta parte del banco está en preparación.</p>
          </div>
        ) : (
          <section className="bloque">
            <h2>Una parte suelta</h2>
            <div className="lista">
              {partes.map((p) => {
                const mejor = mejorDeParte(historial, examen, destreza, p.parte);
                return (
                  <button key={p.parte} className="tarjeta" onClick={() => onEmpezar(practicarParte(examen, destreza, p.parte))}>
                    <b>{etiquetaParte(examen, p.parte)} · {p.nombreParte}</b>
                    <small>{p.minutos} min · {p.cuantos} {p.cuantos === 1 ? 'ejercicio' : 'ejercicios'}</small>
                    {mejor ? (
                      <span className={`mejor ${porcentaje(mejor) >= 70 ? 'bien' : porcentaje(mejor) >= 50 ? 'regular' : 'mal'}`}>{mejor.aciertos}/{mejor.total}</span>
                    ) : (
                      <span className="flecha" aria-hidden="true">›</span>
                    )}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        <Instalar />
      </main>
    </div>
  );
}

/** Iconos propios, un trazo por destreza. */
function IconoDestreza({ destreza }: { destreza: Destreza }) {
  const comun = { width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (destreza) {
    case 'reading-use':
      return <svg {...comun}><path d="M3 5h7a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H3z" /><path d="M21 5h-7a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h7z" /></svg>;
    case 'writing':
      return <svg {...comun}><path d="M4 20h4l10-10-4-4L4 16z" /><path d="M12.5 7.5l4 4" /></svg>;
    case 'listening':
      return <svg {...comun}><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" /></svg>;
    case 'speaking':
      return <svg {...comun}><path d="M4 5h16v10H9l-5 4z" /><path d="M8 9h8M8 12h5" /></svg>;
    case 'prueba':
      return <svg {...comun}><path d="M6 3h9l4 4v14H6z" /><path d="M15 3v4h4" /><path d="M9 12h6M9 16h6" /></svg>;
  }
}
