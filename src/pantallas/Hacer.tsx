import { useMemo, useState } from 'react';
import { BANCO } from '../banco';
import type { Ejercicio, Respuestas } from '../banco/tipos';
import { QR } from '../componentes/QR';
import { codificarEntrega, decodificarExamen, montarDesdeIds, type Entrega } from '../motor/aula';
import { compartir } from '../motor/entregas';
import { corrigeEjercicio } from '../motor/corregir';
import { PantallaEjercicio } from './Ejercicio';

type Fase = { f: 'nombre' } | { f: 'ejercicio'; i: number } | { f: 'fin' };

/** El alumno abre el enlace del profe: pone su nombre, hace el examen y devuelve el resultado como texto o QR. */
export function Hacer({ payload }: { payload: string }) {
  const examen = useMemo(() => decodificarExamen(payload), [payload]);
  const montado = useMemo(() => (examen ? montarDesdeIds(examen, BANCO) : null), [examen]);
  const [fase, setFase] = useState<Fase>({ f: 'nombre' });
  const [alumno, setAlumno] = useState('');
  const [respuestas, setRespuestas] = useState<Record<string, Respuestas>>({});
  const [aviso, setAviso] = useState('');

  if (!examen || !montado || montado.ejercicios.length === 0) {
    return (
      <main className="contenido" style={{ maxWidth: 560, margin: '0 auto' }}>
        <h1>Este enlace no funciona</h1>
        <p className="silencio">El enlace está incompleto o es de una versión distinta de la app. Pídele a tu profe que te lo mande otra vez.</p>
      </main>
    );
  }
  const lista: Ejercicio[] = montado.ejercicios;
  const color = { ['--ok' as string]: examen.marca.color } as React.CSSProperties;

  if (fase.f === 'nombre') {
    return (
      <main className="contenido" style={{ ...color, maxWidth: 560, margin: '0 auto' }}>
        <p className="silencio" style={{ letterSpacing: '.12em', textTransform: 'uppercase' }}>{examen.marca.nombre}</p>
        <h1>{examen.titulo}</h1>
        <p className="silencio">{lista.length} {lista.length === 1 ? 'parte' : 'partes'}. Al terminar verás tu nota y podrás mandarle el resultado a tu profe.</p>
        {montado.faltan.length > 0 && <p role="alert">Faltan {montado.faltan.length} ejercicios en esta versión de la app: tu profe verá el resultado sin ellos.</p>}
        <label htmlFor="alumno" style={{ display: 'block', fontWeight: 600, margin: '14px 0 4px' }}>Tu nombre</label>
        <input id="alumno" className="campo" value={alumno} maxLength={60} autoComplete="name" onChange={(e) => setAlumno(e.target.value)} />
        <button type="button" className="btn" style={{ marginTop: 14 }} disabled={alumno.trim().length < 2} onClick={() => setFase({ f: 'ejercicio', i: 0 })}>Empezar</button>
      </main>
    );
  }

  if (fase.f === 'ejercicio') {
    const e = lista[fase.i];
    return (
      <div style={color}>
        <PantallaEjercicio
          key={e.id}
          ejercicio={e}
          posicion={{ i: fase.i + 1, total: lista.length }}
          respuestas={respuestas[e.id] ?? {}}
          onCambia={(n, valor) => setRespuestas((r) => ({ ...r, [e.id]: { ...(r[e.id] ?? {}), [n]: valor } }))}
          onSiguiente={() => setFase(fase.i === lista.length - 1 ? { f: 'fin' } : { f: 'ejercicio', i: fase.i + 1 })}
          onSalir={() => setFase({ f: 'nombre' })}
        />
      </div>
    );
  }

  const corregidos = lista.map((e) => corrigeEjercicio(e, respuestas[e.id] ?? {}));
  const entrega: Entrega = {
    v: 1,
    alumno: alumno.trim(),
    titulo: examen.titulo,
    fecha: new Date().toLocaleDateString('sv-SE'),
    partes: corregidos.filter((c) => c.total > 0).map((c) => ({ id: c.ejercicio.id, ok: c.aciertos, total: c.total })),
  };
  const ok = entrega.partes.reduce((n, p) => n + p.ok, 0);
  const total = entrega.partes.reduce((n, p) => n + p.total, 0);
  const texto = codificarEntrega(entrega);
  const pendientes = corregidos.reduce((n, c) => n + c.pendientes, 0);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(texto);
      setAviso('Copiado. Pégaselo a tu profe.');
    } catch {
      setAviso('No se pudo copiar: mantén pulsado el texto y cópialo a mano.');
    }
  };
  const enviar = async () => {
    const que = await compartir(texto, examen.titulo);
    setAviso(que === 'compartido' ? 'Enviado.' : que === 'copiado' ? 'Copiado. Pégaselo a tu profe.' : 'No se pudo enviar: copia el texto a mano.');
  };

  return (
    <main className="contenido" style={{ ...color, maxWidth: 560, margin: '0 auto' }}>
      <p className="silencio" style={{ letterSpacing: '.12em', textTransform: 'uppercase' }}>{examen.marca.nombre}</p>
      <h1>{entrega.alumno}, has terminado</h1>
      <p style={{ fontSize: 22 }}><b>{ok}</b> de <b>{total}</b> aciertos{total > 0 && ` (${Math.round((ok / total) * 100)} %)`}</p>
      <ul>
        {corregidos.map((c) => (
          <li key={c.ejercicio.id}>{c.ejercicio.nombreParte}: {c.total > 0 ? `${c.aciertos} de ${c.total}` : 'texto libre'}</li>
        ))}
      </ul>
      {pendientes > 0 && <p className="silencio">Los textos que has escrito (writing, redacciones) los corrige tu profe: entrégaselos aparte.</p>}
      <h2>Manda tu resultado</h2>
      <p className="silencio">Pásale este código a tu profe (por WhatsApp, correo o enseñándole el QR). Solo lleva tu nombre y tus aciertos por parte.</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '8px 0' }}>
        <button type="button" className="btn chico" onClick={() => void enviar()}>Enviar</button>
        <button type="button" className="btn sec chico" onClick={() => void copiar()}>Copiar</button>
      </div>
      {aviso && <p role="status">{aviso}</p>}
      <QR texto={texto} lado={200} alt="QR con tu resultado" />
      <textarea className="campo" readOnly rows={4} value={texto} onFocus={(e) => e.currentTarget.select()} aria-label="Código de tu resultado" style={{ marginTop: 10 }} />
    </main>
  );
}
