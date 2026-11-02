import type { Ejercicio } from '../tipos';

// Inglés B2 (certificación de Canarias) · Mediación escrita · examen 1. Texto fuente de 150–170 palabras y respuesta de
// 70–80 palabras. Aquí el texto fuente va en español (el idioma de la fuente en la prueba real está por confirmar).
// Criterios basados en las escalas de mediación escrita (apéndice VII, por verificar con las bandas exactas).
// Redactado de cero.

export const CRITERIOS_MEDIACION = [
  'Selección de la información: transmito las ideas principales que el lector necesita y dejo fuera los detalles que sobran.',
  'Reformulación: lo explico con mis propias palabras, sin traducir frase por frase ni copiar estructuras del texto original.',
  'Adecuación y organización: el registro encaja con el lector (amigo, colega, jefe), la información va ordenada y respeto la extensión pedida.',
  'Lengua: gramática y vocabulario correctos y variados; los errores no impiden que el lector lo entienda.',
];

export const MEDIACION_B2_1: Ejercicio[] = [
  {
    id: 'b2-med-1-1-four-day-week',
    examen: 'b2',
    destreza: 'mediacion',
    parte: 1,
    nombreParte: 'Written mediation',
    examenNumero: 1,
    titulo: 'A four-day working week',
    instrucciones: 'Read the text and write your answer in 70–80 words.',
    minutos: 35,
    items: [
      {
        n: 1,
        tipo: 'redaccion',
        tipoTexto: 'mediation',
        enunciado:
          'An English colleague, Jo, does not speak Spanish and asks you what this news item says:\n\n' +
          '«El Ayuntamiento de Valdemora ha anunciado que, a partir de septiembre, probará durante un año la semana laboral de cuatro días en sus oficinas municipales. La medida afectará a cinco departamentos, entre ellos Urbanismo y Cultura. Los 180 trabajadores del programa mantendrán su sueldo y trabajarán de lunes a jueves, con una jornada diaria algo más larga. El objetivo es comprobar si se reduce el absentismo y mejora la atención a los vecinos, ya que el horario de ventanilla no cambiará: cada oficina turnará a su personal para que siempre haya alguien disponible. Los sindicatos han recibido la medida con cautela. Aunque celebran la iniciativa, piden que se evalúe el estrés de quienes hacen jornadas de diez horas y que el experimento no sirva para recortar plantillas. Expertos de la universidad regional seguirán el proyecto y publicarán un informe al terminar el año. Si los resultados son positivos, el ayuntamiento estudiará ampliar la medida al resto de sus servicios.»\n\n' +
          'Write an email to Jo in English summarising the main ideas: what the plan is, why it is being tried, how the unions have reacted and what will happen next.',
        minPalabras: 70,
        maxPalabras: 80,
        modelo:
          'Hi Jo, the town council of Valdemora is going to test a four-day working week in its offices for a year, starting in September. Employees will keep their salary and work longer days from Monday to Thursday. The aim is to reduce absence and improve the service, so staff will work in shifts. The unions welcome the idea but are worried about stress and job cuts. Experts will publish a report, and the trial may be extended. Best, Ana',
        criterios: CRITERIOS_MEDIACION,
        explicacion:
          'El modelo recoge los cuatro puntos pedidos (plan, motivo, reacción sindical y próximo paso) y omite cifras y detalles secundarios (los 180 trabajadores, las diez horas). Reformula («absentismo» → «absence», «turnará» → «work in shifts») en lugar de traducir literalmente y mantiene el tono de un correo entre colegas.',
      },
    ],
  },
];
