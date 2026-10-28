// Modelo del banco de ejercicios. Los textos de los ejercicios van en inglés; los nombres y la interfaz, en español.
// Formatos oficiales en docs/formatos.md.

export type Examen = 'c1' | 'pau';
/** Papel del examen. En la PAU solo hay uno (`prueba`, 6 preguntas sobre un texto). */
export type Destreza = 'reading-use' | 'writing' | 'listening' | 'speaking' | 'prueba';

interface ItemBase {
  n: number;
  /** Enunciado del item cuando no basta con el hueco del texto (pregunta de Reading Part 5, definición de la PAU…). */
  pregunta?: string;
}

/** Elegir una opción entre varias, propias del item (Part 1, Reading Part 5, Listening 1 y 3). `correcta` es el índice en `opciones`. */
export interface ItemOpciones extends ItemBase {
  tipo: 'opciones';
  opciones: string[];
  correcta: number;
  explicacion: string;
}

/** Elegir de la lista común del ejercicio (`opcionesComunes`): escritores A–D, párrafos A–G, secciones, lista A–H del Listening 4. */
export interface ItemEmparejar extends ItemBase {
  tipo: 'emparejar';
  correcta: number;
  explicacion: string;
}

/**
 * Escribir una palabra o un trozo de texto que se compara con las correctas: open cloze, word formation (`raiz`),
 * completar frases del Listening 2 (`frase` con {{n}}), buscar la palabra del texto (PAU 3) y copiar el fragmento que
 * responde (PAU 2, `maxPalabras`).
 */
export interface ItemPalabra extends ItemBase {
  tipo: 'palabra';
  correctas: string[];
  raiz?: string;
  frase?: string;
  maxPalabras?: number;
  explicacion: string;
}

/** Key word transformation: completar la segunda frase con 3–6 palabras usando la clave. */
export interface ItemTransformacion extends ItemBase {
  tipo: 'transformacion';
  frase: string;
  clave: string;
  inicio: string;
  fin: string;
  correctas: string[];
  explicacion: string;
}

/** PAU 1: TRUE/FALSE con la prueba copiada del texto. La respuesta del alumno es «TRUE» o «FALSE», salto de línea y la prueba. */
export interface ItemVerdaderoFalso extends ItemBase {
  tipo: 'verdaderoFalso';
  afirmacion: string;
  correcta: boolean;
  /** Fragmentos del texto que valen como prueba (se compara normalizado; cualquiera de ellos). */
  pruebas: string[];
  explicacion: string;
}

export type TipoTexto = 'essay' | 'email' | 'letter' | 'proposal' | 'report' | 'review' | 'composition' | 'situation' | 'dialogue';

/** Texto libre que corrige Adam: Writing del C1, redacción y situaciones de la PAU, réplicas del diálogo. Se enseña un modelo. */
export interface ItemRedaccion extends ItemBase {
  tipo: 'redaccion';
  tipoTexto: TipoTexto;
  enunciado: string;
  minPalabras: number;
  maxPalabras: number;
  /** Respuesta modelo que se enseña al terminar. */
  modelo: string;
  /** Lista de comprobación para autoevaluarse (de las escalas oficiales). */
  criterios: string[];
  explicacion?: string;
}

/** Speaking: una parte o fase con reloj, preguntas del interlocutor y, si toca, imágenes descritas o ideas de la hoja. */
export interface ItemHablar extends ItemBase {
  tipo: 'hablar';
  /** Lo que dice el examinador (en inglés). */
  interlocutor: string;
  preguntas: string[];
  /** Part 2: las tres fotos, descritas en texto (sin fotos con derechos). */
  imagenes?: string[];
  /** Part 3: pregunta del centro de la hoja e ideas alrededor. */
  preguntaCentral?: string;
  ideas?: string[];
  segundos: number;
  segundosLectura?: number;
  /** Ejemplo de respuesta o puntos que conviene tocar. */
  modelo?: string;
}

export type Item = ItemOpciones | ItemEmparejar | ItemPalabra | ItemTransformacion | ItemVerdaderoFalso | ItemRedaccion | ItemHablar;

/** Tipos que la app corrige sola; el resto se guarda y se manda a Adam. */
export const TIPOS_EVALUABLES: ReadonlySet<Item['tipo']> = new Set<Item['tipo']>(['opciones', 'emparejar', 'palabra', 'transformacion', 'verdaderoFalso']);

export interface Hablante {
  id: string;
  /** Quién es (en inglés, para la transcripción): «Josh, a botany student». */
  descripcion: string;
  /** Voz de edge-tts: en-GB-RyanNeural, en-GB-SoniaNeural, en-GB-MaisieNeural (niña), en-IE-ConnorNeural, en-AU-NatashaNeural… */
  voz: string;
}

export type LineaGuion = { quien: string; texto: string } | { pausa: number };

export interface Audio {
  /** Ruta del mp3 dentro de public/ (p. ej. `audio/c1-lis-1-1.mp3`). Si no existe, la app lee el guion con la voz del móvil. */
  archivo: string;
  hablantes: Hablante[];
  /** Guion completo, con el supervisor incluido. `pausa` en milisegundos. */
  guion: LineaGuion[];
  /** Veces que se oye en el examen real (2 en Cambridge). */
  veces: number;
}

export interface Seccion {
  letra: string;
  titulo?: string;
  texto: string;
}

export interface Ejercicio {
  id: string;
  examen: Examen;
  destreza: Destreza;
  /** Número de la parte dentro del examen (Part 1, Part 2…; en la PAU, la pregunta 1–6). */
  parte: number;
  nombreParte: string;
  /** Número del examen completo al que pertenece (examen 1, 2…), para montarlo entero en PDF. */
  examenNumero?: number;
  titulo?: string;
  instrucciones: string;
  minutos: number;
  /** Texto con los huecos marcados como {{n}}. Las partes sin texto (Part 4) no lo llevan. */
  texto?: string;
  /** Varios textos o secciones con letra (Reading 6 y 8). */
  secciones?: Seccion[];
  /** Lista común de la que eligen los items `emparejar` (A, B, C… por orden). */
  opcionesComunes?: string[];
  /** El alumno solo responde a N de los items (Writing Part 2: 1 de 3; PAU 5: 3 de 5). */
  elegir?: number;
  audio?: Audio;
  items: Item[];
}

/** Respuestas del alumno a un ejercicio: número del item → lo que escribió (en opciones y emparejar, el índice como texto). */
export type Respuestas = Record<number, string>;

export const NOMBRES_EXAMEN: Record<Examen, string> = {
  c1: 'Cambridge C1 Advanced',
  pau: 'PAU · Inglés',
};

export const NOMBRES_DESTREZA: Record<Destreza, string> = {
  'reading-use': 'Reading & Use of English',
  writing: 'Writing',
  listening: 'Listening',
  speaking: 'Speaking',
  prueba: 'Prueba escrita',
};

export const ORDEN_DESTREZAS: Destreza[] = ['reading-use', 'writing', 'listening', 'speaking', 'prueba'];
