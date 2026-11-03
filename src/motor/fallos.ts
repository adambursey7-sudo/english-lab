import { etiquetaParte } from '../banco/tipos';
import { comunesDe, letra, textoRespuesta, type EjercicioCorregido } from './corregir';

/** Un fallo explicado en una línea, para el pop-up del resultado. */
export interface Fallo {
  /** Id del ancla del item en la pantalla de resultado (`fallo-<ejercicio>-<n>`). */
  ancla: string;
  parte: string;
  n: number;
  /** Lo que puso el alumno (vacío si no contestó). */
  tuya: string;
  buena: string;
  /** Primera frase de la explicación del banco: el porqué. */
  motivo: string;
}

export function anclaFallo(ejercicioId: string, n: number): string {
  return `fallo-${ejercicioId}-${n}`;
}

/** Primera frase de una explicación, recortada para que quepa en el pop-up. */
export function motivoCorto(explicacion: string, max = 150): string {
  const limpia = explicacion.replace(/\s+/g, ' ').trim();
  const fin = limpia.search(/[.!?](\s|$)/);
  const frase = fin === -1 ? limpia : limpia.slice(0, fin + 1);
  if (frase.length <= max) return frase;
  return `${frase.slice(0, max - 1).trimEnd()}…`;
}

/** Los items que se corrigen solos y están mal, en orden, con su motivo. */
export function fallosDe(corregidos: EjercicioCorregido[]): Fallo[] {
  const fallos: Fallo[] = [];
  for (const c of corregidos) {
    for (const ic of c.items) {
      if (!ic.evaluable || ic.correcto) continue;
      const comunes = comunesDe(c.ejercicio, ic.item);
      const buena = ic.item.tipo === 'opciones' ? `${letra(ic.item.correcta)} ${ic.solucion}` : ic.solucion;
      fallos.push({
        ancla: anclaFallo(c.ejercicio.id, ic.item.n),
        parte: etiquetaParte(c.ejercicio.examen, c.ejercicio.parte),
        n: ic.item.n,
        tuya: textoRespuesta(ic, comunes),
        buena,
        motivo: 'explicacion' in ic.item && ic.item.explicacion ? motivoCorto(ic.item.explicacion) : '',
      });
    }
  }
  return fallos;
}
