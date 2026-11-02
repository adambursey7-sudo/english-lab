import type { Ejercicio } from '../tipos';

// Inglés B2 (certificación de Canarias) · Producción escrita · examen 1. Tarea 1: texto corto de 100–120 palabras;
// tarea 2: 230–275 palabras (ensayo, reseña, carta al director, relato). 90 minutos en total.
// Criterios: las cuatro escalas del apéndice de producción escrita (léxica, gramatical, discursiva, adecuación a la
// tarea), bandas 1–5. Redactado de cero.

export const CRITERIOS_B2 = [
  'Adecuación a la tarea: cumplo todos los puntos, el registro encaja con el lector (formal o informal) y respeto las convenciones del tipo de texto y la extensión.',
  'Organización (discursiva): estructura clara (introducción, desarrollo, cierre), párrafos con una idea cada uno y conectores variados (although, moreover, as a result, on the other hand, in conclusion).',
  'Gramática: estructuras variadas y bien controladas (condicionales, pasivas, oraciones de relativo, estilo indirecto); los errores son pocos y no estorban.',
  'Léxico: vocabulario amplio y preciso para el tema, con colocaciones y expresiones propias del B2, sin repeticiones y con buena ortografía.',
];

export const WRITING_B2_1: Ejercicio[] = [
  {
    id: 'b2-pro-1-1-volunteer',
    examen: 'b2',
    destreza: 'writing',
    parte: 1,
    nombreParte: 'Short text',
    examenNumero: 1,
    titulo: 'A volunteer programme',
    instrucciones: 'Write your answer in 100–120 words.',
    minutos: 30,
    items: [
      {
        n: 1,
        tipo: 'redaccion',
        tipoTexto: 'email',
        enunciado:
          'You have seen this advertisement for a summer volunteer programme:\n\n' +
          '“Help us clean and protect the beaches of our island! Two weeks in July, accommodation included. No experience needed. Apply now to Ms Dawson, the programme coordinator.”\n\n' +
          'Write an email to Ms Dawson. In your email:\n• introduce yourself and say why you are interested\n• ask about the daily timetable and the type of accommodation\n• mention a food allergy and ask whether it would be a problem\n• ask how to apply',
        minPalabras: 100,
        maxPalabras: 120,
        modelo:
          'Dear Ms Dawson,\n\n' +
          'I am writing in response to your advertisement for the summer volunteer programme. I am a nineteen-year-old biology student, and I have always been concerned about the pollution of our coastline, so I would be delighted to take part.\n\n' +
          'Could you please tell me what a typical day involves and what kind of accommodation is provided? I should also mention that I have a mild allergy to nuts. I would be grateful if you could let me know whether this would cause any difficulty.\n\n' +
          'Finally, I would like to know how to apply and what the deadline is.\n\n' +
          'I look forward to hearing from you.\n\nYours sincerely,\nMarta Santos',
        criterios: CRITERIOS_B2,
        explicacion:
          'Correo formal a alguien a quien no conoces: «Dear Ms Dawson», sin contracciones, frases como «I am writing in response to…», «Could you please…» y «I would be grateful if…», y cierre «Yours sincerely». El modelo cubre los cuatro puntos, uno por bloque, y se queda dentro de las 100–120 palabras.',
      },
    ],
  },
  {
    id: 'b2-pro-1-2-letter-editor',
    examen: 'b2',
    destreza: 'writing',
    parte: 2,
    nombreParte: 'Letter to the editor',
    examenNumero: 1,
    titulo: 'Closing the old town to cars',
    instrucciones: 'Write your answer in 230–275 words.',
    minutos: 60,
    items: [
      {
        n: 2,
        tipo: 'redaccion',
        tipoTexto: 'letter',
        enunciado:
          'You have read the following news item in your local newspaper:\n\n' +
          '“From next January, the narrow streets of the old town will be closed to private cars. Residents will be able to park only in two car parks on the edge of the area. The council says the aim is to reduce noise and pollution, but some shop owners fear they will lose customers.”\n\n' +
          'Write a letter to the editor of the newspaper giving your opinion on the council’s plan. In your letter you should:\n• explain what you think about the decision\n• describe the advantages and the disadvantages\n• suggest what the council could do to help the people most affected',
        minPalabras: 230,
        maxPalabras: 275,
        modelo:
          'Dear Editor,\n\n' +
          'I am writing in response to your recent article about the council’s decision to close the old town to private cars. Although I understand the concerns of some shop owners, I firmly believe that this is a step in the right direction.\n\n' +
          'The main advantage is obvious to anybody who has walked through our historic centre on a Saturday afternoon: the streets are narrow, the air is heavy with exhaust fumes and the noise makes conversation difficult. Without traffic, the area would become safer for children and elderly people, and it would be much more pleasant for the tourists who, after all, are the reason many businesses exist at all. Experience in other European towns shows that, once cars disappear, more people tend to stroll, sit on café terraces and spend money.\n\n' +
          'That said, the plan is not without problems. Residents who are carrying heavy shopping or who have reduced mobility could find the walk from the car park exhausting, and delivery drivers may struggle to supply the shops during the day. In the first months, some businesses may well lose customers who simply prefer the convenience of parking at the door.\n\n' +
          'For these reasons, I would suggest that the council allows deliveries only in the early morning, offers a free electric minibus between the car parks and the main square, and provides a reduced parking fee for residents.\n\n' +
          'In short, the measure has real benefits, provided it is introduced with care and with support for those who are affected.\n\n' +
          'Yours faithfully,\nElena Ruiz',
        criterios: CRITERIOS_B2,
        explicacion:
          'Estructura de carta al director: motivo de la carta y opinión clara (párrafo 1), ventajas (2), inconvenientes (3), propuestas concretas para los más afectados (4) y cierre (5). Registro formal, conectores variados (although, after all, that said, for these reasons, provided) y estructuras B2 (condicional, relativas, pasiva implícita). Se firma «Yours faithfully» porque empieza con «Dear Editor».',
      },
    ],
  },
];
