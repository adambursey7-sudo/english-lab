// Modelo del banco de ejercicios. Los textos de los ejercicios van en inglés; los nombres y la interfaz, en español.

export type Examen = 'c1' | 'pau';
export type Destreza = 'reading-use' | 'writing' | 'listening' | 'speaking';

/** Elegir una opción entre varias (Part 1, Reading Parts 5–8…). `correcta` es el índice en `opciones`. */
export interface ItemOpciones {
  n: number;
  tipo: 'opciones';
  opciones: string[];
  correcta: number;
  explicacion: string;
}

/** Escribir una palabra (open cloze, word formation). `raiz` es la palabra en mayúsculas que hay que transformar. */
export interface ItemPalabra {
  n: number;
  tipo: 'palabra';
  correctas: string[];
  raiz?: string;
  explicacion: string;
}

/** Key word transformation: completar la segunda frase con 3–6 palabras usando la clave. */
export interface ItemTransformacion {
  n: number;
  tipo: 'transformacion';
  frase: string;
  clave: string;
  inicio: string;
  fin: string;
  correctas: string[];
  explicacion: string;
}

export type Item = ItemOpciones | ItemPalabra | ItemTransformacion;

export interface Ejercicio {
  id: string;
  examen: Examen;
  destreza: Destreza;
  /** Número de la parte dentro del examen (Part 1, Part 2…). */
  parte: number;
  nombreParte: string;
  titulo?: string;
  instrucciones: string;
  minutos: number;
  /** Texto con los huecos marcados como {{n}}. Las partes sin texto (Part 4) no lo llevan. */
  texto?: string;
  items: Item[];
}

/** Respuestas del alumno a un ejercicio: número del item → lo que escribió (en opciones, el índice como texto). */
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
};
