import { useState } from 'react';
import { CHECKLIST_WRITING, consejosDe } from '../banco/consejos';
import type { Destreza } from '../banco/tipos';
import { PROFE } from '../marca';

/** Casillas para repasar el texto antes de enviarlo; no se guardan. */
export function ChecklistWriting() {
  const [marcadas, setMarcadas] = useState<Set<number>>(new Set());
  return (
    <section className="hoja consejo">
      <h3>Antes de enviarlo a {PROFE}</h3>
      <ul className="checklist">
        {CHECKLIST_WRITING.map((t, i) => (
          <li key={t}>
            <label>
              <input
                type="checkbox"
                checked={marcadas.has(i)}
                onChange={() => setMarcadas((m) => { const n = new Set(m); if (n.has(i)) n.delete(i); else n.add(i); return n; })}
              />
              <span>{t}</span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Consejos de la parte que se está haciendo, plegados para no estorbar ni perder las respuestas. */
export function ConsejosParte({ destreza, parte }: { destreza: Destreza; parte: number }) {
  const consejos = consejosDe(destreza, parte);
  if (consejos.length === 0 && destreza !== 'writing') return null;
  return (
    <details className="hoja consejo plegable">
      <summary>Consejos para esta parte</summary>
      {consejos.map((c) => (
        <div key={c.parte}>
          <h3>{c.parte === 0 ? c.titulo : `Part ${c.parte} · ${c.titulo}`}</h3>
          <ul>
            {c.puntos.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
      ))}
    </details>
  );
}
