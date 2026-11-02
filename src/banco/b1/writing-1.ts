import type { Ejercicio } from '../tipos';

// Inglés B1 (certificación de Canarias) · Producción escrita · examen 1. Tarea 1: texto corto de 90–110 palabras
// (correspondencia, notas); tarea 2: 130–160 palabras (relato, blog, descripción, informe). 75 minutos en total.
// Criterios: las cuatro escalas del apéndice de producción escrita (léxica, gramatical, discursiva, adecuación a la
// tarea), bandas 1–5. Redactado de cero.

export const CRITERIOS_B1 = [
  'Adecuación a la tarea: cumplo todos los puntos del enunciado, respeto el tipo de texto, el lector y el registro, y me ajusto a las palabras pedidas.',
  'Organización (discursiva): párrafos claros, principio y final, ideas ordenadas y enlazadas con conectores sencillos (and, but, because, so, then, after that, however).',
  'Gramática: frases correctas con tiempos variados (presente, pasado, futuro, algún condicional o comparativo); los errores no impiden entenderme.',
  'Léxico: vocabulario suficiente y variado para el tema, sin repetir siempre las mismas palabras y con la ortografía cuidada.',
];

export const WRITING_B1_1: Ejercicio[] = [
  {
    id: 'b1-pro-1-1-visit',
    examen: 'b1',
    destreza: 'writing',
    parte: 1,
    nombreParte: 'Short message',
    examenNumero: 1,
    titulo: 'A visit from an English friend',
    instrucciones: 'Write your answer in 90–110 words.',
    minutos: 30,
    items: [
      {
        n: 1,
        tipo: 'redaccion',
        tipoTexto: 'email',
        enunciado:
          'Your English friend Sam is going to visit you next month. This is part of the message you received:\n\n' +
          '“I can’t wait to see you! I’ll stay for a week. What shall we do? Tell me when to arrive and what I should bring.”\n\n' +
          'Write an email to Sam. In your email:\n• say you are happy about the visit\n• suggest two things you can do together\n• tell him when and where you will meet\n• say what he should bring',
        minPalabras: 90,
        maxPalabras: 110,
        modelo:
          'Hi Sam,\n\n' +
          'Thanks for your message! I’m really happy that you are coming to visit me next month.\n\n' +
          'I have some ideas for your stay. On Saturday we can go to the beach in the morning and have lunch in a small restaurant near the port. On Sunday there is a market in the old town, and you can buy presents for your family there.\n\n' +
          'Please tell me what time your plane arrives. I’ll wait for you at the airport, next to the information desk. Remember to bring a light jacket for the evenings and a swimsuit, of course!\n\n' +
          'See you soon,\nLucía',
        criterios: CRITERIOS_B1,
        explicacion:
          'El modelo cubre los cuatro puntos en este orden: alegría por la visita, dos planes (playa y mercado), dónde y cuándo se encuentran (aeropuerto; falta la hora, que Sam debe confirmar) y qué llevar. Registro informal propio de un amigo: saludo, contracciones y despedida cercana.',
      },
    ],
  },
  {
    id: 'b1-pro-1-2-surprise',
    examen: 'b1',
    destreza: 'writing',
    parte: 2,
    nombreParte: 'Story',
    examenNumero: 1,
    titulo: 'A surprise',
    instrucciones: 'Write your answer in 130–160 words.',
    minutos: 45,
    items: [
      {
        n: 2,
        tipo: 'redaccion',
        tipoTexto: 'story',
        enunciado:
          'You are writing a story for the school magazine. Your story must begin with this sentence:\n\n' +
          '“When I opened the door, I couldn’t believe what I saw.”\n\n' +
          'Write your story.',
        minPalabras: 130,
        maxPalabras: 160,
        modelo:
          'When I opened the door, I couldn’t believe what I saw. My living room was full of balloons, and all my friends were standing in the middle of it, shouting “Happy birthday!”\n\n' +
          'That morning I had been very sad. My best friend Carla had told me she was too busy to see me, and my family had gone out without saying goodbye. I thought everybody had forgotten my birthday, so I spent the whole afternoon walking alone in the park.\n\n' +
          'When I got home, it was already dark. I was tired and I only wanted to go to bed. Then I opened the door and saw the lights, the cake and the faces of the people I love.\n\n' +
          'Carla gave me a big hug and said, “Did you really think we could forget you?” I started to laugh and cry at the same time. It was the best birthday of my life.',
        criterios: CRITERIOS_B1,
        explicacion:
          'El modelo empieza con la frase obligatoria, usa pasado simple y pasado perfecto («had been», «had told») para ordenar los hechos, enlaza con «that morning», «when I got home», «then» y cierra con una reacción y una conclusión personal.',
      },
    ],
  },
];
