// Validador de ejercicios: lo usan el editor del profe, la fábrica del PC y el botón de la IA. No importa nada en
// ejecución (solo tipos) para que `scripts/fabrica.mjs` lo cargue directamente con Node.
import type { Ejercicio, Item } from '../banco/tipos';

/** Lo que está mal en la estructura de un ejercicio (lista vacía = vale). Misma comprobación que el test del banco, en lenguaje claro. */
export function problemas(e: Ejercicio): string[] {
  const fallos: string[] = [];
  if (!e.instrucciones.trim()) fallos.push('Faltan las instrucciones para el alumno.');
  if (e.items.length === 0) fallos.push('No hay ninguna pregunta.');
  const ns = e.items.map((i) => i.n);
  if (new Set(ns).size !== ns.length) fallos.push('Hay preguntas con el mismo número.');
  if (e.texto) {
    for (const m of e.texto.matchAll(/\{\{(\d+)\}\}/g)) if (!ns.includes(Number(m[1]))) fallos.push(`El hueco ${m[1]} no tiene respuesta.`);
  }
  const comunes = e.opcionesComunes?.length ?? 0;
  const TIPOS = ['opciones', 'emparejar', 'palabra', 'transformacion', 'verdaderoFalso', 'redaccion', 'hablar'];
  for (const i of e.items as Item[]) {
    if (!TIPOS.includes(i.tipo)) fallos.push(`La pregunta ${i.n} es de un tipo desconocido.`);
    else if (i.tipo === 'opciones') {
      if (i.opciones.length < 2) fallos.push(`La pregunta ${i.n} necesita al menos dos opciones.`);
      if (new Set(i.opciones.map((o) => o.trim().toLowerCase())).size !== i.opciones.length) fallos.push(`La pregunta ${i.n} tiene opciones repetidas.`);
      if (!Number.isInteger(i.correcta) || i.correcta < 0 || i.correcta >= i.opciones.length) fallos.push(`En la pregunta ${i.n} falta marcar la correcta con *.`);
    } else if (i.tipo === 'emparejar') {
      const lista = i.lista !== undefined ? e.listas?.[i.lista]?.opciones.length ?? 0 : comunes;
      if (!Number.isInteger(i.correcta) || i.correcta < 0 || i.correcta >= lista) fallos.push(`La pregunta ${i.n} apunta a una opción que no existe.`);
    } else if (i.tipo === 'palabra') {
      if (i.correctas.length === 0) fallos.push(`El hueco ${i.n} no tiene respuesta.`);
      if (i.frase && !i.frase.includes(`{{${i.n}}}`)) fallos.push(`La frase ${i.n} no marca su hueco.`);
    } else if (i.tipo === 'transformacion') {
      if (i.correctas.length === 0) fallos.push(`La transformación ${i.n} no tiene respuesta.`);
      // La principal (la primera) es la que sale en la clave: debe cumplir la regla del examen. Las demás son variantes aceptadas.
      const c = i.correctas[0] ?? '';
      const n = c.trim().split(/\s+/).length;
      if (n < 2 || n > 7) fallos.push(`La transformación ${i.n}: «${c}» debe tener entre 3 y 6 palabras.`);
      if (!`${i.inicio} ${c} ${i.fin}`.toLowerCase().split(/\s+/).includes(i.clave.toLowerCase())) fallos.push(`La transformación ${i.n}: «${c}» no usa la palabra clave ${i.clave}.`);
    } else if (i.tipo === 'verdaderoFalso') {
      if (i.pruebas.length === 0) fallos.push(`La afirmación ${i.n} necesita la frase del texto que la prueba.`);
      else if (e.texto && !i.pruebas.some((p) => normaliza(e.texto ?? '').includes(normaliza(p)))) fallos.push(`La prueba de la afirmación ${i.n} no está copiada tal cual del texto.`);
    } else if (i.tipo === 'redaccion') {
      if (!i.enunciado.trim()) fallos.push('Falta el enunciado de la redacción.');
      if (i.minPalabras > i.maxPalabras) fallos.push('El mínimo de palabras es mayor que el máximo.');
    }
  }
  if (e.elegir !== undefined && e.elegir >= e.items.length) fallos.push('«Elegir» pide más preguntas de las que hay.');
  if (e.secciones && new Set(e.secciones.map((s) => s.letra)).size !== e.secciones.length) fallos.push('Hay secciones con la misma letra.');
  if (e.audio) {
    const hablantes = new Set(e.audio.hablantes.map((h) => h.id));
    for (const l of e.audio.guion) if ('quien' in l && !hablantes.has(l.quien)) fallos.push(`El guion nombra a un hablante que no existe: ${l.quien}.`);
  }
  return fallos;
}

const normaliza = (t: string) => t.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const palabras = (t: string) => (t.trim() ? t.trim().split(/\s+/).length : 0);

/** Qué se exige a cada parte para parecerse a la del examen de verdad (número de preguntas, longitud de los textos, tipos). */
export interface ReglasParte {
  preguntas: [number, number];
  /** Palabras del texto principal (`texto`) o, si hay `secciones`, de todas juntas. */
  palabrasTexto?: [number, number];
  tipos: Item['tipo'][];
}

export const REGLAS: Record<string, ReglasParte> = {
  'c1/reading-use/1': { preguntas: [8, 8], palabrasTexto: [120, 260], tipos: ['opciones'] },
  'c1/reading-use/2': { preguntas: [8, 8], palabrasTexto: [120, 260], tipos: ['palabra'] },
  'c1/reading-use/3': { preguntas: [8, 8], palabrasTexto: [100, 260], tipos: ['palabra'] },
  'c1/reading-use/4': { preguntas: [6, 6], tipos: ['transformacion'] },
  'c1/reading-use/5': { preguntas: [6, 6], palabrasTexto: [550, 950], tipos: ['opciones'] },
  'c1/reading-use/6': { preguntas: [4, 4], palabrasTexto: [480, 800], tipos: ['emparejar'] },
  'c1/reading-use/7': { preguntas: [6, 6], palabrasTexto: [200, 900], tipos: ['emparejar'] },
  'c1/reading-use/8': { preguntas: [10, 10], palabrasTexto: [450, 900], tipos: ['emparejar'] },
  'c1/writing/1': { preguntas: [1, 1], tipos: ['redaccion'] },
  'c1/writing/2': { preguntas: [3, 3], tipos: ['redaccion'] },
  'c1/listening/1': { preguntas: [6, 6], tipos: ['opciones'] },
  'c1/listening/2': { preguntas: [8, 8], tipos: ['palabra'] },
  'c1/listening/3': { preguntas: [6, 6], tipos: ['opciones'] },
  'c1/listening/4': { preguntas: [10, 10], tipos: ['emparejar'] },
  'pau/prueba/1': { preguntas: [10, 10], palabrasTexto: [270, 400], tipos: ['verdaderoFalso', 'palabra'] },
  'pau/prueba/4': { preguntas: [6, 6], palabrasTexto: [60, 220], tipos: ['redaccion'] },
  'pau/prueba/5': { preguntas: [5, 5], tipos: ['redaccion'] },
  'pau/prueba/6': { preguntas: [2, 2], tipos: ['redaccion'] },
};

/** Palabras de 8 letras o más sobre el total: una medida burda de si el vocabulario está a la altura (C1 más que PAU). */
export function densidadLarga(texto: string): number {
  const p = normaliza(texto).split(' ').filter(Boolean);
  return p.length === 0 ? 0 : p.filter((w) => w.length >= 8).length / p.length;
}

const MINIMO_LARGAS: Record<string, number> = { c1: 0.05, pau: 0.03 };

/** Texto del ejercicio que hay que cuidar (el principal o todas las secciones). */
function textoDe(e: Ejercicio): string {
  return [e.texto ?? '', ...(e.secciones?.map((s) => s.texto) ?? [])].join(' ').trim();
}

/** Trozos de 6 palabras seguidas del texto, para comparar si dos textos comparten frases. */
export function trozos(texto: string, n = 6): Set<string> {
  const p = normaliza(texto).split(' ').filter(Boolean);
  const r = new Set<string>();
  for (let i = 0; i + n <= p.length; i++) r.add(p.slice(i, i + n).join(' '));
  return r;
}

/** Parte (0–1) de los trozos del ejercicio que ya salen en otros textos: sirve para no copiar ni repetirse. */
export function solapamiento(e: Ejercicio, otros: Iterable<string>): number {
  const mios = trozos(textoDe(e));
  if (mios.size === 0) return 0;
  const ajenos = new Set<string>();
  for (const t of otros) for (const x of trozos(t)) ajenos.add(x);
  let comunes = 0;
  for (const x of mios) if (ajenos.has(x)) comunes++;
  return comunes / mios.size;
}

/**
 * Validación completa de un ejercicio nuevo: estructura + parecido al examen real (preguntas, longitud, tipos, nivel de
 * vocabulario) + que no repita frases de otros textos (`otros`: el banco y, en la fábrica, las fuentes de muestra).
 */
export function validarEjercicio(e: Ejercicio, otros: Iterable<string> = []): string[] {
  const fallos = problemas(e);
  const r = REGLAS[`${e.examen}/${e.destreza}/${e.parte}`];
  if (!r) return [...fallos, `No hay regla para ${e.examen}/${e.destreza}/${e.parte}: esa parte no se puede generar.`];
  const n = e.items.length;
  if (n < r.preguntas[0] || n > r.preguntas[1]) fallos.push(`Debe tener ${r.preguntas[0] === r.preguntas[1] ? r.preguntas[0] : `${r.preguntas[0]}–${r.preguntas[1]}`} preguntas y tiene ${n}.`);
  for (const i of e.items) if (!r.tipos.includes(i.tipo)) fallos.push(`La pregunta ${i.n} es de tipo «${i.tipo}», que esta parte no usa.`);
  const t = textoDe(e);
  if (r.palabrasTexto) {
    const pal = palabras(t);
    if (pal < r.palabrasTexto[0] || pal > r.palabrasTexto[1]) fallos.push(`El texto tiene ${pal} palabras y debería tener entre ${r.palabrasTexto[0]} y ${r.palabrasTexto[1]}.`);
    const minimo = MINIMO_LARGAS[e.examen];
    if (pal > 0 && densidadLarga(t) < minimo) fallos.push(`El vocabulario es demasiado sencillo para ${e.examen === 'c1' ? 'C1' : 'la PAU'} (pocas palabras largas).`);
  }
  // Los textos cortos (la presentación del listening) repiten fórmulas por naturaleza: solo se comparan los de verdad.
  const solape = palabras(t) >= 60 ? solapamiento(e, otros) : 0;
  if (solape > 0.1) fallos.push(`Repite frases de otros textos (${Math.round(solape * 100)} % de coincidencia).`);
  return fallos;
}
