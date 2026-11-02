import { useMemo, useState } from 'react';
import { EXAMENES, ETIQUETA_EXAMEN, FICHA_EXAMEN, NOMBRES_DESTREZA, etiquetaParte, type Destreza, type Ejercicio, type Examen } from '../banco/tipos';
import { generarExamen, candidatos, recetaCompleta, type PedidoParte, type Receta } from '../motor/generador';
import { leerMarca } from '../marca';
import { LIMITE_DEMO_GUARDADOS } from '../motor/licencia';
import { useLicencia } from '../motor/useLicencia';
import { reglaPagina } from '../motor/paginas';
import { bancoCompleto, leerPropios } from '../motor/propios';
import { QR } from '../componentes/QR';
import { baseApp } from '../config';
import { codificarExamen } from '../motor/aula';
import { PAPELES_DE } from '../motor/cuadernillo';
import { esPropio } from '../motor/propios';
import { escribirGuardados, exportar, fusionar, gruposDe, hoy, importar, leerGuardados, nuevoId, usadosDe, type Guardado } from '../motor/misExamenes';
import { ClaveProfe, CuadernilloAlumno } from './Imprimir';
import './imprimir.css';
import './crear.css';

type Plantilla = { id: string; nombre: string; ayuda: string; destrezas: Destreza[] | 'todas'; soloAutomaticos: boolean };

const plantillasCambridge = (lectura: string): Plantilla[] => [
  { id: 'completo', nombre: 'Examen completo', ayuda: 'Las cuatro partes, como el día del examen', destrezas: 'todas', soloAutomaticos: false },
  { id: 'lectura', nombre: lectura, ayuda: 'Solo el papel de lectura', destrezas: ['reading-use'], soloAutomaticos: false },
  { id: 'listening', nombre: 'Listening', ayuda: 'Solo comprensión oral', destrezas: ['listening'], soloAutomaticos: false },
  { id: 'auto', nombre: 'Se corrige solo', ayuda: 'Sin writing ni speaking: corrección automática', destrezas: 'todas', soloAutomaticos: true },
];

const PLANTILLAS: Record<Examen, Plantilla[]> = {
  b1: plantillasCambridge('Reading'),
  b2: plantillasCambridge('Reading & Use of English'),
  c1: plantillasCambridge('Reading & Use of English'),
  pau: [
    { id: 'completo', nombre: 'Prueba completa', ayuda: 'Las seis preguntas', destrezas: 'todas', soloAutomaticos: false },
    { id: 'auto', nombre: 'Se corrige solo', ayuda: 'Sin redacción: corrección automática', destrezas: 'todas', soloAutomaticos: true },
  ],
};

function recetaDe(examen: Examen, plantilla: Plantilla, semilla: number, banco: Ejercicio[]): Receta {
  const base = recetaCompleta(examen, semilla, banco);
  const partes = plantilla.destrezas === 'todas' ? base.partes : base.partes.filter((p) => (plantilla.destrezas as Destreza[]).includes(p.destreza));
  return { ...base, partes, soloAutomaticos: plantilla.soloAutomaticos };
}

const nuevaSemilla = () => Math.floor(Math.random() * 1_000_000) + 1;

/** Pantalla del profe: elige tipo y partes, ve el examen montado y lo descarga en PDF. */
export function Crear() {
  const [examen, setExamen] = useState<Examen>('c1');
  const [plantilla, setPlantilla] = useState('completo');
  const [semilla, setSemilla] = useState(nuevaSemilla);
  const [version, setVersion] = useState<'A' | 'B'>('A');
  const [quitadas, setQuitadas] = useState<string[]>([]);
  const [verClave, setVerClave] = useState(false);
  const [guardados, setGuardados] = useState<Guardado[]>(leerGuardados);
  const [grupo, setGrupo] = useState('');
  const [nombre, setNombre] = useState('');
  const [evitarUsados, setEvitarUsados] = useState(true);
  const [aviso, setAviso] = useState('');
  const [fecha, setFecha] = useState('');
  const [enlace, setEnlace] = useState('');
  const [ahorro, setAhorro] = useState(true);
  const marca = leerMarca();
  const { pro } = useLicencia();
  const [propiosPrimero, setPropiosPrimero] = useState(true);
  // Los ejercicios que escribió el profe se leen al abrir la pantalla (el editor es otra pantalla).
  const banco = useMemo(() => bancoCompleto(leerPropios()), []);
  const hayPropios = banco.some((e) => esPropio(e.id));
  // Al abrir un examen guardado se respeta lo que evitó entonces (si no, su propio historial lo cambiaría).
  const [fijo, setFijo] = useState<string[] | null>(null);

  const p = PLANTILLAS[examen].find((x) => x.id === plantilla) ?? PLANTILLAS[examen][0];
  const base = useMemo(() => recetaDe(examen, p, semilla, banco), [examen, p, semilla, banco]);
  const clave = (x: PedidoParte) => `${x.destreza}/${x.parte}`;
  const usados = useMemo(() => fijo ?? (evitarUsados ? usadosDe(grupo, guardados) : []), [fijo, evitarUsados, grupo, guardados]);
  const receta: Receta = { ...base, version, evitar: usados, propiosPrimero: hayPropios && propiosPrimero, partes: base.partes.filter((x) => !quitadas.includes(clave(x))) };
  const generado = useMemo(() => generarExamen(receta, banco), [examen, plantilla, semilla, version, quitadas.join('|'), usados, propiosPrimero, banco]); // eslint-disable-line react-hooks/exhaustive-deps
  const conDatos = { ...generado, grupo: grupo.trim() || undefined, fechaExamen: fecha || undefined };
  const minutos = generado.papeles.reduce((n, x) => n + x.minutos, 0);
  const preguntas = generado.papeles.reduce((n, x) => n + x.preguntas, 0);

  const cambiarExamen = (e: Examen) => {
    setExamen(e);
    setPlantilla('completo');
    setQuitadas([]);
  };
  const cambiarPlantilla = (id: string) => {
    setPlantilla(id);
    setQuitadas([]);
  };
  const cambiarGuardados = (lista: Guardado[]) => {
    setGuardados(lista);
    escribirGuardados(lista);
  };
  const guardar = () => {
    if (!pro && guardados.length >= LIMITE_DEMO_GUARDADOS) return setAviso(`En la versión de prueba se guardan ${LIMITE_DEMO_GUARDADOS} exámenes como máximo. Borra alguno o activa tu licencia.`);
    const g: Guardado = { id: nuevoId(), nombre: nombre.trim() || `Test ${semilla} · ${version}`, grupo: grupo.trim(), fecha: hoy(), receta, ids: generado.ids };
    cambiarGuardados([g, ...guardados]);
    setFijo(receta.evitar); // el examen en pantalla no cambia al apuntarse en el historial
    setNombre('');
    setAviso(`Guardado en «Mis exámenes»${g.grupo ? ` para ${g.grupo}` : ''}.`);
  };
  const abrir = (g: Guardado) => {
    const completa = recetaDe(g.receta.examen, PLANTILLAS[g.receta.examen].find((x) => x.soloAutomaticos === g.receta.soloAutomaticos) ?? PLANTILLAS[g.receta.examen][0], g.receta.semilla, banco);
    setExamen(g.receta.examen);
    setPlantilla(g.receta.soloAutomaticos ? 'auto' : 'completo');
    setSemilla(g.receta.semilla);
    setVersion(g.receta.version);
    setQuitadas(completa.partes.filter((x) => !g.receta.partes.some((y) => clave(y) === clave(x))).map(clave));
    setGrupo(g.grupo);
    setEvitarUsados(g.receta.evitar.length > 0);
    setFijo(g.receta.evitar);
    setPropiosPrimero(g.receta.propiosPrimero === true);
    setAviso(`Abierto «${g.nombre}».`);
  };
  const duplicar = (g: Guardado) => cambiarGuardados([{ ...g, id: nuevoId(), nombre: `${g.nombre} (copia)`, fecha: hoy() }, ...guardados]);
  const borrar = (g: Guardado) => {
    if (window.confirm(`¿Borrar «${g.nombre}»? Dejará de contar en el historial del grupo.`)) cambiarGuardados(guardados.filter((x) => x.id !== g.id));
  };
  const descargarCopia = () => {
    const url = URL.createObjectURL(new Blob([exportar(guardados)], { type: 'application/json' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `mis-examenes-${hoy()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const leerCopia = async (f: File | undefined) => {
    if (!f) return;
    const nuevos = importar(await f.text());
    if (!nuevos) return setAviso('Ese archivo no es una copia de seguridad de la app.');
    cambiarGuardados(fusionar(guardados, nuevos));
    setAviso(`Copia cargada: ${nuevos.length} ${nuevos.length === 1 ? 'examen' : 'exámenes'}.`);
  };
  const hayPropiosEnExamen = generado.ids.some(esPropio);
  const compartirAula = () => {
    setEnlace(`${baseApp()}#/hacer/${codificarExamen({ v: 1, examen, titulo: generado.etiqueta ? `${generado.titulo} · ${generado.etiqueta}` : generado.titulo, ids: generado.ids, version, semilla, marca: { nombre: marca.nombre, color: marca.color } })}`);
  };
  const alternar = (x: PedidoParte) => setQuitadas((q) => (q.includes(clave(x)) ? q.filter((c) => c !== clave(x)) : [...q, clave(x)]));

  return (
    <div className={`imprimir crear ${verClave ? 'clave' : 'cuadernillo'}${ahorro ? ' ahorro' : ''}${pro ? '' : ' demo'}`}>
      <style>{reglaPagina(marca.nombre, `${generado.titulo} · ${generado.etiqueta ?? ''}`)}</style>
      <nav className="barra-pdf no-imprimir" aria-label="Crear examen">
        <a className="btn sec chico" href="#/">‹ Volver</a>
        <span className="barra-titulo">Crear examen</span>
        {!pro && <a className="btn sec chico" href="#/licencia">Versión de prueba · activar licencia</a>}
        <button type="button" className="btn chico" onClick={() => window.print()} disabled={generado.papeles.length === 0}>Descargar en PDF</button>
      </nav>

      {!pro && <div className="marca-agua" aria-hidden="true">DEMO</div>}
      <div className="crear-cuerpo">
        <aside className="crear-panel no-imprimir" aria-label="Opciones del examen">
          <h2>1. ¿Qué examen?</h2>
          <div className="fichas" role="group" aria-label="Tipo de examen">
            {EXAMENES.map((x) => (
              <button key={x} type="button" className="ficha" aria-pressed={examen === x} onClick={() => cambiarExamen(x)}>{FICHA_EXAMEN[x]}</button>
            ))}
          </div>

          <h2>2. ¿Cómo lo quieres?</h2>
          <div className="plantillas" role="group" aria-label="Plantilla">
            {PLANTILLAS[examen].map((x) => (
              <button key={x.id} type="button" className="plantilla" aria-pressed={x.id === p.id} onClick={() => cambiarPlantilla(x.id)}>
                <b>{x.nombre}</b>
                <small>{x.ayuda}</small>
              </button>
            ))}
          </div>

          <h2>3. Partes que entran</h2>
          <ul className="partes-lista">
            {base.partes.map((x) => {
              const hay = candidatos(base, x, banco).length;
              const orden = PAPELES_DE[examen].find((q) => q.destreza === x.destreza);
              return (
                <li key={clave(x)}>
                  <label>
                    <input type="checkbox" checked={!quitadas.includes(clave(x))} onChange={() => alternar(x)} />
                    <span>
                      {orden?.titulo ?? NOMBRES_DESTREZA[x.destreza]} · {etiquetaParte(examen, x.parte)}
                      <small> {banco.find((r) => r.examen === examen && r.destreza === x.destreza && r.parte === x.parte)?.nombreParte} ({hay} {hay === 1 ? 'ejercicio' : 'ejercicios'})</small>
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>

          <h2>4. Versión</h2>
          <div className="fichas" role="group" aria-label="Versión">
            <button type="button" className="ficha" aria-pressed={version === 'A'} onClick={() => setVersion('A')}>Versión A</button>
            <button type="button" className="ficha" aria-pressed={version === 'B'} onClick={() => setVersion('B')}>Versión B</button>
          </div>
          <p className="silencio pequeno">La B cambia el orden de las opciones en las preguntas de elegir, para repartir dos versiones en la misma clase.</p>

          <a className="btn sec" href="#/mis-ejercicios" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>Escribir mis propios ejercicios</a>
          {hayPropios && <label className="casilla"><input type="checkbox" checked={propiosPrimero} onChange={(e) => setPropiosPrimero(e.target.checked)} /> Usar primero mis ejercicios</label>}
          <button type="button" className="btn sec" onClick={() => { setSemilla(nuevaSemilla()); setFijo(null); }}>Generar otra mezcla</button>
          <p className="resumen-crear"><b>{preguntas}</b> preguntas · <b>{minutos}</b> min · {generado.papeles.length} {generado.papeles.length === 1 ? 'paper' : 'papers'}</p>
          {generado.faltan.length > 0 && <p className="silencio pequeno" role="status">En el banco no hay tantos ejercicios como pedías en alguna parte; se han puesto los que hay.</p>}

          <h2>5. Guardar</h2>
          <input className="campo-crear" aria-label="Grupo o clase" list="grupos-guardados" placeholder="Grupo o clase (opcional)" value={grupo} maxLength={60} onChange={(e) => { setGrupo(e.target.value); setFijo(null); }} />
          <datalist id="grupos-guardados">{gruposDe(guardados).map((x) => <option key={x} value={x} />)}</datalist>
          <input className="campo-crear" aria-label="Nombre del examen" placeholder="Nombre (opcional)" value={nombre} maxLength={80} onChange={(e) => setNombre(e.target.value)} />
          <label className="casilla"><input type="checkbox" checked={evitarUsados} onChange={(e) => { setEvitarUsados(e.target.checked); setFijo(null); }} /> No repetir ejercicios que ya hizo este grupo{usados.length > 0 && ` (${usados.length} ya usados)`}</label>
          <label className="casilla">Fecha del examen <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} /></label>
          <label className="casilla"><input type="checkbox" checked={ahorro} onChange={(e) => setAhorro(e.target.checked)} /> Blanco y negro, sin fondos grises (ahorra tinta)</label>
          <button type="button" className="btn" onClick={guardar} disabled={generado.papeles.length === 0}>Guardar en Mis exámenes</button>
          {aviso && <p className="silencio pequeno" role="status">{aviso}</p>}

          <h2>Mis exámenes ({guardados.length})</h2>
          {guardados.length === 0 ? (
            <p className="silencio pequeno">Aquí quedarán los exámenes que guardes, con su grupo y fecha.</p>
          ) : (
            <ul className="mis-examenes">
              {guardados.map((g) => (
                <li key={g.id}>
                  <b>{g.nombre}</b>
                  <small>{ETIQUETA_EXAMEN[g.receta.examen]} · versión {g.receta.version} · {g.fecha}{g.grupo && ` · ${g.grupo}`}</small>
                  <span className="acciones">
                    <button type="button" className="btn sec chico" onClick={() => abrir(g)}>Abrir</button>
                    <button type="button" className="btn sec chico" onClick={() => duplicar(g)}>Duplicar</button>
                    <button type="button" className="btn sec chico" onClick={() => borrar(g)}>Borrar</button>
                  </span>
                </li>
              ))}
            </ul>
          )}
          <button type="button" className="btn sec" onClick={descargarCopia} disabled={guardados.length === 0}>Descargar copia de seguridad</button>
          <label className="btn sec" style={{ display: 'block', textAlign: 'center', cursor: 'pointer' }}>
            Cargar una copia
            <input type="file" accept="application/json,.json" hidden onChange={(e) => { void leerCopia(e.target.files?.[0]); e.target.value = ''; }} />
          </label>

          <h2>Compartir con alumnos</h2>
          {!pro && <p className="silencio pequeno">El aula es de la versión completa. <a href="#/licencia">Activar licencia</a></p>}
          {hayPropiosEnExamen && <p className="silencio pequeno">Este examen lleva ejercicios tuyos: solo se pueden compartir por enlace los del banco. Desmarca «Usar primero mis ejercicios» o imprímelo.</p>}
          <button type="button" className="btn sec" onClick={compartirAula} disabled={!pro || hayPropiosEnExamen || generado.papeles.length === 0}>Crear enlace y QR para los alumnos</button>
          {enlace && (
            <div className="enlace-aula">
              <QR texto={enlace} lado={180} alt="QR del examen para los alumnos" />
              <textarea className="campo-crear" readOnly rows={3} value={enlace} aria-label="Enlace del examen" onFocus={(e) => e.currentTarget.select()} />
              <p className="silencio pequeno">Los alumnos lo abren en el móvil, lo hacen y te devuelven un código que pegas en <a href="#/aula">Mi clase</a>. El enlace dice qué ejercicios lleva: si cambias la mezcla, crea otro.</p>
            </div>
          )}
          <a className="btn sec" href="#/aula" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', marginTop: 8 }}>Mi clase (resultados)</a>

          <h2>Ver</h2>
          <div className="fichas" role="group" aria-label="Qué ver">
            <button type="button" className="ficha" aria-pressed={!verClave} onClick={() => setVerClave(false)}>Cuadernillo</button>
            <button type="button" className="ficha" aria-pressed={verClave} onClick={() => setVerClave(true)}>Clave del profe</button>
          </div>
        </aside>

        <section className="crear-vista" aria-label="Vista previa">
          {generado.papeles.length === 0 ? (
            <p className="silencio no-imprimir">Marca al menos una parte para ver el examen.</p>
          ) : verClave ? (
            <ClaveProfe c={conDatos} />
          ) : (
            <CuadernilloAlumno c={conDatos} />
          )}
        </section>
      </div>
    </div>
  );
}
