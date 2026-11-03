import type { Ejercicio } from '../tipos';
import { CRITERIOS_MEDIACION } from '../b2/mediacion-1';

// Inglés B1 (certificación de Canarias) · Mediación escrita · examen 1. Texto fuente de 110–130 palabras y respuesta de
// 50–60 palabras para alguien que no entiende el texto original. Aquí el texto fuente va en español (el idioma de la
// fuente en la prueba real está por confirmar). Redactado de cero.

export const MEDIACION_B1_1: Ejercicio[] = [
  {
    id: 'b1-med-1-1-excursion',
    examen: 'b1can',
    destreza: 'mediacion',
    parte: 1,
    nombreParte: 'Written mediation',
    examenNumero: 1,
    titulo: 'A school trip',
    instrucciones: 'Read the text and write your answer in 50–60 words.',
    minutos: 35,
    items: [
      {
        n: 1,
        tipo: 'redaccion',
        tipoTexto: 'mediation',
        enunciado:
          'Your English friend Anna is staying with your family and does not understand Spanish. She has found this notice from your school:\n\n' +
          '«EXCURSIÓN A LA RESERVA NATURAL DE LAS LAGUNAS\n' +
          'El próximo viernes 14 de marzo los alumnos de 4.º de ESO visitaremos la Reserva Natural de Las Lagunas. La salida será a las 8:30 desde la puerta principal del instituto y el regreso está previsto a las 17:00. El autobús y la entrada al centro de visitantes cuestan 12 euros, que se entregarán a la tutora antes del miércoles. Cada alumno debe llevar calzado cómodo, una gorra, una botella de agua y su comida, porque no habrá ningún sitio donde comprarla. Se recomienda también un chubasquero si el tiempo es inestable. En caso de lluvia fuerte, la excursión se aplazará al viernes 21. Quienes no puedan asistir deben avisar a la tutora por escrito.»\n\n' +
          'Write a short email to Anna in English. Explain the most important information: where and when the trip is, how much it costs and what she needs to bring.',
        minPalabras: 50,
        maxPalabras: 60,
        modelo:
          'Hi Anna, our class is going on a trip to the Las Lagunas nature reserve on Friday 14 March. We leave school at 8:30 and come back at 5 p.m. It costs 12 euros. We need comfortable shoes, a cap, water and our own lunch. If it rains a lot, the trip will be on 21 March. Tom',
        criterios: CRITERIOS_MEDIACION,
        explicacion:
          'En mediación no se traduce: se selecciona lo que el lector necesita (lugar, fecha, horas, precio, qué llevar) y se deja fuera el resto (a quién se paga, el aviso por escrito). El modelo reformula con sus propias palabras y añade el dato de la lluvia por ser relevante.',
      },
    ],
  },
];
