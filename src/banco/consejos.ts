// Consejos por destreza y parte del C1 Advanced, resumidos con palabras propias a partir de las guías públicas de
// Cambridge (ver docs/cambridge-consejos.md). La interfaz va en español; los ejemplos, en inglés.

import type { Destreza } from './tipos';

export interface ConsejoParte {
  /** Número de parte dentro de la destreza; 0 = consejos generales de la destreza. */
  parte: number;
  titulo: string;
  puntos: string[];
}

export const CONSEJOS_C1: Partial<Record<Destreza, ConsejoParte[]>> = {
  'reading-use': [
    { parte: 0, titulo: 'En general', puntos: [
      'No se resta por fallar: contesta siempre, aunque sea adivinando.',
      'Reading y Use of English son un solo papel con dos notas. Reparte el tiempo y no te quedes atascado en una parte.',
      'En las partes 5–8 usa solo el texto, no lo que tú sepas del tema.',
      'Lleva un cuaderno de colocaciones, preposiciones, phrasal verbs y familias de palabras.',
    ] },
    { parte: 1, titulo: 'Cloze de opciones', puntos: [
      'Lee todo el texto antes de rellenar y resúmelo en una frase.',
      'Mide colocaciones, phrasal verbs, conectores y matices entre sinónimos.',
      'Al corregir, apunta por qué las otras tres opciones no encajan.',
    ] },
    { parte: 2, titulo: 'Cloze abierto', puntos: [
      'Siempre es una sola palabra, casi siempre gramatical: preposición, artículo, auxiliar, relativo o conector.',
      'Lee la frase entera antes y después del hueco.',
      'Haz tu lista de errores típicos (concordancia, plurales, ortografía).',
    ] },
    { parte: 3, titulo: 'Word formation', puntos: [
      'Primero decide la clase de palabra (nombre, adjetivo, adverbio…) y luego el significado.',
      'Casi siempre hay algún prefijo negativo: un-, in-, il-, im-, dis-, mis-.',
      'A veces cambia por dentro (long → length) o va en plural.',
      'Cada palabra en mayúsculas solo vale para el hueco de su línea.',
    ] },
    { parte: 4, titulo: 'Transformaciones', puntos: [
      'De 3 a 6 palabras, incluida la clave, sin cambiarla.',
      'Fíjate en el tiempo verbal, el singular/plural y lo que hay antes y después del hueco.',
      'Entrena paráfrasis: activa/pasiva, sinónimos, estructuras equivalentes.',
      'En papel escribes solo lo que va en el hueco.',
    ] },
    { parte: 5, titulo: 'Opción múltiple', puntos: [
      'Lee el texto una vez rápido; luego cada pregunta y busca dónde está la respuesta.',
      'Cuidado con elegir una opción solo porque repite una palabra del texto: debe encajar todo el sentido.',
      'Las preguntas siguen el orden del texto.',
    ] },
    { parte: 6, titulo: 'Cuatro textos', puntos: [
      'Mira si la pregunta pide opiniones parecidas o distintas.',
      'Subraya palabras de actitud: positiva/negativa, seguro/dudoso.',
      'No decidas tras leer un solo texto.',
    ] },
    { parte: 7, titulo: 'Párrafos quitados', puntos: [
      'Lee primero el texto con huecos para ver la estructura.',
      'Pistas: conectores, repetición y sinónimos, pronombres (this, that, these), tiempos verbales, marcas de tiempo.',
      'Descarta por qué el párrafo sobrante no encaja y relee el texto completo al terminar.',
    ] },
    { parte: 8, titulo: 'Emparejar', puntos: [
      'Lee rápido para tener el mapa de secciones; luego busca la paráfrasis de toda la afirmación, no de una palabra.',
      'Una sección puede usarse varias veces.',
    ] },
  ],
  writing: [
    { parte: 0, titulo: 'En general', puntos: [
      'Dos tareas de 220–260 palabras y 90 minutos: reserva tiempo para planear y para revisar.',
      'Se evalúa en cuatro criterios: Content, Communicative Achievement, Organisation y Language.',
      'Varía estructuras y vocabulario, mezcla frases cortas y largas y no repitas palabras.',
      'Escribe con bolígrafo y no mezcles ortografía británica y americana.',
    ] },
    { parte: 1, titulo: 'Essay', puntos: [
      'Elige solo dos de los tres puntos y di cuál es más importante y por qué.',
      'Usa las opiniones del enunciado con tus palabras: copiar no puntúa.',
      'Introducción, párrafos claros, ejemplos concretos y conclusión.',
    ] },
    { parte: 2, titulo: 'Carta, propuesta, informe o reseña', puntos: [
      'Carta o email: piensa quién lee y ajusta el registro; no escribas direcciones.',
      'Proposal o report: tono neutro o formal, con encabezados y sugerencias apoyadas en datos.',
      'Review: no solo describas; evalúa si sirve al lector que indica el enunciado.',
    ] },
  ],
  listening: [
    { parte: 0, titulo: 'En general', puntos: [
      'Antes de cada audio, lee las preguntas: te dicen el tema y evitan que te pierdas.',
      'Cada audio suena dos veces. Si pierdes una pregunta, sigue y recupérala en la segunda escucha.',
      'Tienes 5 minutos al final para pasar las respuestas a la hoja. La ortografía debe ser correcta.',
    ] },
    { parte: 1, titulo: 'Tres extractos', puntos: [
      'Dos preguntas por extracto: idea general, función, actitud o acuerdo.',
      'Fíjate en quién habla y qué relación tienen.',
    ] },
    { parte: 2, titulo: 'Completar frases', puntos: [
      'Ocho huecos. Escribe la palabra tal cual la oyes, normalmente hasta tres palabras.',
      'Predice la clase de palabra y mira a/an, plurales y el texto de antes y después del hueco.',
    ] },
    { parte: 3, titulo: 'Entrevista', puntos: [
      'Seis preguntas sobre opiniones y actitudes, no sobre datos sueltos.',
      'Vocabulario típico: insists, suggests, denies, admits, regrets, resents; doubtful, convinced.',
    ] },
    { parte: 4, titulo: 'Cinco hablantes, dos tareas', puntos: [
      'Cada hablante tiene dos respuestas; sobran tres letras en cada lista.',
      'Estrategia A: tarea 1 en la primera escucha y tarea 2 en la segunda. Estrategia B: ambas en la primera y comprobar en la segunda.',
      'Se busca la idea general y la actitud, no cada palabra.',
    ] },
  ],
  speaking: [
    { parte: 0, titulo: 'En general', puntos: [
      'Unos 15 minutos con dos examinadores y otro candidato. Se evalúan gramática, léxico, discurso, pronunciación y comunicación.',
      'No memorices respuestas. Habla claro y alto, sin pausas largas.',
      'Si no recuerdas una palabra, parafrasea: «It’s the thing you use for…», «I’m not sure of the exact word but…».',
      'Puedes pedir que repitan la pregunta.',
    ] },
    { parte: 1, titulo: 'Preguntas personales', puntos: [
      'Respuestas completas y naturales, sin acaparar la conversación.',
    ] },
    { parte: 2, titulo: 'Comparar fotos', puntos: [
      'No solo describas: compara y responde a la pregunta del examinador.',
      'Especula («It seems that…», «appears to be…») y compara («whereas», «one similarity is…»).',
      'No digas «that’s all»: sigue hasta que el examinador diga «Thank you».',
    ] },
    { parte: 3, titulo: 'Tarea colaborativa', puntos: [
      'No hace falta llegar a un acuerdo ni tocar los cinco puntos: mejor profundizar en varios.',
      'Gestiona la conversación: «Shall we start with…?», «What do you think?», «Shall we move on?».',
      'Acepta y discrepa con educación e implica a tu compañero.',
    ] },
    { parte: 4, titulo: 'Discusión', puntos: [
      'Ideas más abstractas: justifica y matiza.',
      'Para ganar tiempo: «That’s something I’ve never really thought about, but on reflection I’d say…».',
      'Si no sabes del tema, no cambies de tema: di que sabes poco y relaciónalo con algo que conozcas.',
    ] },
  ],
};

/** Consejos que valen para una parte: los generales de la destreza y los de esa parte (si hay). */
export function consejosDe(destreza: Destreza, parte?: number): ConsejoParte[] {
  const lista = CONSEJOS_C1[destreza] ?? [];
  return lista.filter((c) => c.parte === 0 || parte === undefined || c.parte === parte);
}

/** Lista de comprobación del Writing antes de enviarlo (C1). */
export const CHECKLIST_WRITING: string[] = [
  '¿Cubro todos los puntos del enunciado y solo lo relevante?',
  '¿Desarrollo las ideas con ejemplos o ideas propias?',
  '¿Cumplo el propósito (explicar, persuadir, sugerir, disculparme…)?',
  '¿El registro es el adecuado para quien lee?',
  '¿Hay párrafos claros y conectores entre las ideas?',
  '¿Uso vocabulario variado, sin repetir palabras?',
  '¿Mezclo gramática sencilla y compleja?',
  '¿He revisado ortografía y puntuación?',
];
