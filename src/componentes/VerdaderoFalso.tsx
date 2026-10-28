import type { ItemVerdaderoFalso } from '../banco/tipos';
import { partesVerdaderoFalso } from '../motor/corregir';
import { Enunciado } from './Redaccion';

interface Props {
  item: ItemVerdaderoFalso;
  valor: string;
  onCambia: (v: string) => void;
}

/** PAU, pregunta 1: TRUE o FALSE y la prueba copiada del texto. La respuesta se guarda como «TRUE\nprueba». */
export function EntradaVerdaderoFalso({ item, valor, onCambia }: Props) {
  const { valor: elegido, prueba } = partesVerdaderoFalso(valor);
  const guardar = (nuevo: boolean | null, nuevaPrueba: string) => {
    if (nuevo === null && nuevaPrueba.trim() === '') return onCambia('');
    onCambia(`${nuevo === null ? '' : nuevo ? 'TRUE' : 'FALSE'}\n${nuevaPrueba}`);
  };
  return (
    <div className="vf">
      <div className="cabeza">
        <span className="num">{item.n}</span>
        {item.pregunta && <span className="pregunta">{item.pregunta}</span>}
      </div>
      <Enunciado texto={item.afirmacion} />
      <div className="letras vf-botones" role="group" aria-label={`Pregunta ${item.n}: verdadero o falso`}>
        {([true, false] as const).map((v) => (
          <button key={String(v)} type="button" className="letra-btn vf-btn" aria-pressed={elegido === v} onClick={() => guardar(elegido === v ? null : v, prueba)}>
            {v ? 'TRUE' : 'FALSE'}
          </button>
        ))}
      </div>
      <textarea
        id={`respuesta-${item.n}`}
        className="campo replica"
        rows={2}
        autoCapitalize="none"
        spellCheck={false}
        placeholder="Copia aquí las palabras exactas del texto que lo demuestran"
        value={prueba}
        onChange={(e) => guardar(elegido, e.target.value)}
      />
      <span className="contador">Sin la prueba copiada del texto, la respuesta no puntúa.</span>
    </div>
  );
}
