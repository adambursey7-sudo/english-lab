import { useMemo, useState } from 'react';
import { BANCO } from '../banco';
import { etiquetaParte, type Ejercicio, type Examen } from '../banco/tipos';
import { PAPELES_DE } from '../motor/cuadernillo';
import {
  ejercicioDesde, escribirFuentes, escribirPropios, exportarPropios, importarPropios, leerFuentes, leerPropios, nuevoIdPropio, problemas, type Fuente,
} from '../motor/propios';
import { ParteImpresa } from './Imprimir';
import './imprimir.css';
import './crear.css';

type Plantilla = Fuente['plantilla'];

const PLANTILLAS: { id: Plantilla; nombre: string; ayuda: string; ejemplo: string; instrucciones: string; campo: string }[] = [
  {
    id: 'huecos', nombre: 'Huecos abiertos', ayuda: 'Un texto con palabras que faltan. Escribe cada respuesta entre corchetes; si vale más de una, sepáralas con /.',
    ejemplo: 'She has lived in London [for/since] ten years, and she [still] misses her hometown.',
    instrucciones: 'Read the text below and think of the word which best fits each gap. Use only one word in each gap.', campo: 'Texto con las respuestas [entre corchetes]',
  },
  {
    id: 'opciones', nombre: 'Opción múltiple', ayuda: 'Cada pregunta es un bloque; la primera línea es la pregunta y las demás, las opciones. Marca la correcta con *. Deja una línea en blanco entre preguntas.',
    ejemplo: 'Why did the writer move to the coast?\nA to save money\n* B to be near her family\nC to change job\nD to study',
    instrucciones: 'For questions 1–3, choose the answer (A, B, C or D) which fits best according to the text.', campo: 'Texto de lectura (opcional)',
  },
  {
    id: 'vf', nombre: 'Verdadero o falso', ayuda: 'Una línea por afirmación: TRUE o FALSE, la afirmación y la frase del texto que lo prueba, separadas por |.',
    ejemplo: 'TRUE | The town has a market on Fridays. | Every Friday the square fills with stalls.\nFALSE | The market closed in 2010.',
    instrucciones: 'Decide whether each statement is TRUE or FALSE and copy the words from the text that prove it.', campo: 'Texto de lectura',
  },
  {
    id: 'redaccion', nombre: 'Redacción', ayuda: 'Un enunciado para escribir. La app no la corrige: se manda al profe y el alumno la compara con el modelo.',
    ejemplo: '', instrucciones: 'Write your answer in 150–200 words.', campo: 'Enunciado',
  },
];

const vacia = (p: Plantilla, examen: Examen, destreza: Fuente['datos']['destreza'], parte: number): Fuente => ({
  plantilla: p,
  datos: { examen, destreza, parte, titulo: '', instrucciones: PLANTILLAS.find((x) => x.id === p)?.instrucciones ?? '', minutos: 10 },
  texto: '',
  items: '',
  minPalabras: 150,
  maxPalabras: 200,
  modelo: '',
});

/** Partes donde se puede mezclar un ejercicio propio (todas menos las de audio y speaking, que necesitan grabaciones). */
function lugares(examen: Examen) {
  const vistas = new Map<string, { destreza: Fuente['datos']['destreza']; parte: number; texto: string }>();
  for (const e of BANCO.filter((x) => x.examen === examen && x.destreza !== 'listening' && x.destreza !== 'speaking')) {
    const papel = PAPELES_DE[examen].find((p) => p.destreza === e.destreza)?.titulo ?? e.destreza;
    vistas.set(`${e.destreza}/${e.parte}`, { destreza: e.destreza, parte: e.parte, texto: `${papel} · ${etiquetaParte(examen, e.parte)} · ${e.nombreParte}` });
  }
  return [...vistas.values()];
}

/** Editor de ejercicios propios: el profe escribe los suyos y se mezclan con los del banco al crear un examen. */
export function Editor() {
  const [propios, setPropios] = useState<Ejercicio[]>(leerPropios);
  const [fuentes, setFuentes] = useState(leerFuentes);
  const [editando, setEditando] = useState<string | null>(null);
  const [f, setF] = useState<Fuente>(() => vacia('huecos', 'c1', 'reading-use', 2));
  const [aviso, setAviso] = useState('');

  const plantilla = PLANTILLAS.find((p) => p.id === f.plantilla) ?? PLANTILLAS[0];
  const sitios = useMemo(() => lugares(f.datos.examen), [f.datos.examen]);
  const ejercicio = useMemo(() => ejercicioDesde(f, editando ?? 'mio-vista-previa'), [f, editando]);
  const fallos = problemas(ejercicio);

  const cambia = (parcial: Partial<Fuente>) => setF((x) => ({ ...x, ...parcial }));
  const cambiaDatos = (parcial: Partial<Fuente['datos']>) => setF((x) => ({ ...x, datos: { ...x.datos, ...parcial } }));
  const elegirPlantilla = (p: Plantilla) => setF((x) => ({ ...x, plantilla: p, datos: { ...x.datos, instrucciones: PLANTILLAS.find((q) => q.id === p)?.instrucciones ?? '' } }));
  const elegirExamen = (examen: Examen) => {
    const primero = lugares(examen)[0];
    setF((x) => ({ ...x, datos: { ...x.datos, examen, destreza: primero.destreza, parte: primero.parte } }));
  };

  const persistir = (lista: Ejercicio[], fs: Record<string, Fuente>) => {
    setPropios(lista);
    setFuentes(fs);
    escribirPropios(lista);
    escribirFuentes(fs);
  };
  const guardar = () => {
    const id = editando ?? nuevoIdPropio();
    const nuevo = ejercicioDesde(f, id);
    persistir(editando ? propios.map((e) => (e.id === id ? nuevo : e)) : [nuevo, ...propios], { ...fuentes, [id]: f });
    setAviso(editando ? 'Cambios guardados.' : 'Guardado. Ya se mezcla con los del banco al crear un examen.');
    setEditando(null);
    setF(vacia(f.plantilla, f.datos.examen, f.datos.destreza, f.datos.parte));
  };
  const editar = (e: Ejercicio) => {
    const fuente = fuentes[e.id];
    if (!fuente) return setAviso('Este ejercicio se importó sin su formulario: bórralo y vuelve a crearlo si quieres cambiarlo.');
    setEditando(e.id);
    setF(fuente);
    setAviso('');
  };
  const borrar = (e: Ejercicio) => {
    if (!window.confirm(`¿Borrar «${e.nombreParte}»? Los exámenes ya guardados que lo usaron conservarán su lista, pero no podrás volver a montarlos igual.`)) return;
    const { [e.id]: _quitada, ...resto } = fuentes;
    persistir(propios.filter((x) => x.id !== e.id), resto);
    if (editando === e.id) {
      setEditando(null);
      setF(vacia('huecos', 'c1', 'reading-use', 2));
    }
  };
  const descargar = () => {
    const url = URL.createObjectURL(new Blob([exportarPropios(propios)], { type: 'application/json' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mis-ejercicios.json';
    a.click();
    URL.revokeObjectURL(url);
  };
  const cargar = async (archivo: File | undefined) => {
    if (!archivo) return;
    const nuevos = importarPropios(await archivo.text());
    if (!nuevos) return setAviso('Ese archivo no es un paquete de ejercicios de la app.');
    const ids = new Set(nuevos.map((e) => e.id));
    persistir([...nuevos, ...propios.filter((e) => !ids.has(e.id))], fuentes);
    setAviso(`Paquete cargado: ${nuevos.length} ${nuevos.length === 1 ? 'ejercicio' : 'ejercicios'}.`);
  };

  return (
    <div className="imprimir crear cuadernillo">
      <nav className="barra-pdf no-imprimir" aria-label="Mis ejercicios">
        <a className="btn sec chico" href="#/crear">‹ Crear examen</a>
        <span className="barra-titulo">Mis ejercicios</span>
      </nav>
      <div className="crear-cuerpo">
        <aside className="crear-panel no-imprimir" aria-label="Formulario">
          <h2>{editando ? 'Editar ejercicio' : 'Nuevo ejercicio'}</h2>
          <div className="plantillas" role="group" aria-label="Tipo de ejercicio">
            {PLANTILLAS.map((p) => (
              <button key={p.id} type="button" className="plantilla" aria-pressed={f.plantilla === p.id} onClick={() => elegirPlantilla(p.id)}>
                <b>{p.nombre}</b>
              </button>
            ))}
          </div>
          <p className="silencio pequeno">{plantilla.ayuda}</p>

          <h2>Dónde se mezcla</h2>
          <div className="fichas" role="group" aria-label="Examen">
            <button type="button" className="ficha" aria-pressed={f.datos.examen === 'c1'} onClick={() => elegirExamen('c1')}>C1 Advanced</button>
            <button type="button" className="ficha" aria-pressed={f.datos.examen === 'pau'} onClick={() => elegirExamen('pau')}>PAU Canarias</button>
          </div>
          <select className="campo-crear" aria-label="Parte del examen" value={`${f.datos.destreza}/${f.datos.parte}`} onChange={(e) => { const [d, n] = e.target.value.split('/'); cambiaDatos({ destreza: d as Fuente['datos']['destreza'], parte: Number(n) }); }}>
            {sitios.map((s) => <option key={`${s.destreza}/${s.parte}`} value={`${s.destreza}/${s.parte}`}>{s.texto}</option>)}
          </select>

          <h2>Contenido</h2>
          <input className="campo-crear" aria-label="Título" placeholder="Título (opcional)" maxLength={80} value={f.datos.titulo} onChange={(e) => cambiaDatos({ titulo: e.target.value })} />
          <textarea className="campo-crear" aria-label="Instrucciones para el alumno" rows={3} value={f.datos.instrucciones} onChange={(e) => cambiaDatos({ instrucciones: e.target.value })} />
          <label className="casilla">Minutos <input type="number" min={1} max={120} value={f.datos.minutos} onChange={(e) => cambiaDatos({ minutos: Number(e.target.value) })} style={{ width: 70 }} /></label>
          <textarea className="campo-crear" aria-label={plantilla.campo} placeholder={plantilla.campo} rows={7} value={f.texto} onChange={(e) => cambia({ texto: e.target.value })} />
          {(f.plantilla === 'opciones' || f.plantilla === 'vf') && (
            <textarea className="campo-crear" aria-label="Preguntas" placeholder={plantilla.ejemplo} rows={8} value={f.items} onChange={(e) => cambia({ items: e.target.value })} />
          )}
          {f.plantilla === 'huecos' && f.texto === '' && <p className="silencio pequeno">Ejemplo: {plantilla.ejemplo}</p>}
          {f.plantilla === 'redaccion' && (
            <>
              <label className="casilla">Palabras entre <input type="number" min={1} value={f.minPalabras} onChange={(e) => cambia({ minPalabras: Number(e.target.value) })} style={{ width: 70 }} /> y <input type="number" min={1} value={f.maxPalabras} onChange={(e) => cambia({ maxPalabras: Number(e.target.value) })} style={{ width: 70 }} /></label>
              <textarea className="campo-crear" aria-label="Respuesta modelo" placeholder="Respuesta modelo (la verá el alumno al terminar)" rows={5} value={f.modelo} onChange={(e) => cambia({ modelo: e.target.value })} />
            </>
          )}

          {fallos.length > 0 && f.texto + f.items !== '' && (
            <ul className="silencio pequeno" role="status" style={{ paddingLeft: 18 }}>{fallos.map((x) => <li key={x}>{x}</li>)}</ul>
          )}
          <button type="button" className="btn" onClick={guardar} disabled={fallos.length > 0}>{editando ? 'Guardar cambios' : 'Guardar ejercicio'}</button>
          {editando && <button type="button" className="btn sec" onClick={() => { setEditando(null); setF(vacia('huecos', 'c1', 'reading-use', 2)); }}>Cancelar</button>}
          {aviso && <p className="silencio pequeno" role="status">{aviso}</p>}

          <h2>Mis ejercicios ({propios.length})</h2>
          {propios.length === 0 ? <p className="silencio pequeno">Aún no has escrito ninguno.</p> : (
            <ul className="mis-examenes">
              {propios.map((e) => (
                <li key={e.id}>
                  <b>{e.nombreParte}</b>
                  <small>{e.examen === 'c1' ? 'C1' : 'PAU'} · {etiquetaParte(e.examen, e.parte)} · {e.items.length} {e.items.length === 1 ? 'pregunta' : 'preguntas'}</small>
                  <span className="acciones">
                    <button type="button" className="btn sec chico" onClick={() => editar(e)}>Editar</button>
                    <button type="button" className="btn sec chico" onClick={() => borrar(e)}>Borrar</button>
                  </span>
                </li>
              ))}
            </ul>
          )}
          <button type="button" className="btn sec" onClick={descargar} disabled={propios.length === 0}>Descargar paquete</button>
          <label className="btn sec" style={{ display: 'block', textAlign: 'center', cursor: 'pointer' }}>
            Cargar un paquete
            <input type="file" accept="application/json,.json" hidden onChange={(e) => { void cargar(e.target.files?.[0]); e.target.value = ''; }} />
          </label>
        </aside>
        <section className="crear-vista" aria-label="Vista previa">
          <main className="pagina">
            {ejercicio.items.length === 0 && f.texto === '' ? <p className="silencio no-imprimir">Aquí verás cómo queda el ejercicio en el papel.</p> : <ParteImpresa e={ejercicio} />}
          </main>
        </section>
      </div>
    </div>
  );
}
