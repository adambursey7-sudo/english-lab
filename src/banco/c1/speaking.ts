import type { Ejercicio } from '../tipos';

// Cambridge C1 Advanced · Speaking, cuatro partes. Las fotos de la Part 2 van descritas en texto (sin fotos con derechos).
// Formato y frases del interlocutor en docs/formatos.md. Redactado de cero.

export const SPEAKING_C1: Ejercicio[] = [
  {
    id: 'c1-spk-1-interview-1',
    examen: 'c1',
    destreza: 'speaking',
    parte: 1,
    nombreParte: 'Interview',
    examenNumero: 1,
    instrucciones: 'The examiner asks you questions about yourself. Answer in full sentences and give reasons: two or three sentences per question is about right. About 2 minutes.',
    minutos: 2,
    items: [
      {
        n: 1,
        tipo: 'hablar',
        interlocutor: 'Good morning. My name is Sarah and this is my colleague, Tom. And your names are? … Thank you. First, we’d like to know something about you.',
        preguntas: [
          'Where are you from?',
          'What do you like most about living there?',
          'How do you usually spend your weekends?',
          'Is there a skill you would like to learn? Why?',
          'What do you hope to be doing in five years’ time?',
          'Do you prefer to plan things in advance or to be spontaneous?',
        ],
        segundos: 120,
        modelo:
          'Respuestas de dos o tres frases, con una razón o un ejemplo: «I’m from a small town on the coast, which sounds idyllic but can feel a bit cut off in winter. What I really value is…». Evita el «yes/no» seco y no memorices un discurso.',
      },
    ],
  },
  {
    id: 'c1-spk-2-long-turn-1',
    examen: 'c1',
    destreza: 'speaking',
    parte: 2,
    nombreParte: 'Long turn',
    examenNumero: 1,
    instrucciones:
      'You get three pictures and talk about two of them on your own for about a minute, answering the two questions written above the pictures. Then your partner answers a short question about your pictures (about 30 seconds). About 4 minutes in total.',
    minutos: 4,
    items: [
      {
        n: 1,
        tipo: 'hablar',
        pregunta: 'People learning something new',
        interlocutor:
          'In this part of the test, I’m going to give each of you three pictures. I’d like you to talk about two of them on your own for about a minute, and also to answer a question briefly about your partner’s pictures. Here are your pictures. They show people learning something new. I’d like you to compare two of the pictures, and say why the people might have decided to learn these things, and how they might be feeling.',
        imagenes: [
          'An older man in a small kitchen, following a recipe on a tablet propped against a jar. There is flour on the worktop, on his glasses and on the floor; a dog watches from the doorway.',
          'A teenage girl halfway up an indoor climbing wall, looking down at an instructor who is pointing at the next hold. Her friends are watching from a bench with their phones out.',
          'Three adults in a language class, one of them writing on a whiteboard with a marker while the other two laugh. A teacher stands to one side with a cup of coffee.',
        ],
        preguntas: ['Why might the people have decided to learn these things?', 'How might they be feeling?'],
        segundos: 60,
        modelo:
          'Compara (no describas una y luego la otra): «Whereas the man in the kitchen seems to be learning purely for himself, the girl on the wall is clearly being pushed by other people…». Especula con might, could, I imagine, presumably. Contesta a las DOS preguntas. Pregunta para el compañero (30 s): «Which of these things would you find the most difficult to learn? Why?»',
      },
      {
        n: 2,
        tipo: 'hablar',
        pregunta: 'People waiting',
        interlocutor:
          'Now, here are your pictures. They show people waiting. I’d like you to compare two of the pictures, and say why the people might be waiting, and how difficult it might be for them to stay patient.',
        imagenes: [
          'Commuters on a crowded station platform, all looking up at a departures board on which every train says “delayed”. One man is on the phone with his hand over his other ear.',
          'A family in a hospital waiting room: a mother with a sleeping toddler, a father staring at the clock, a grandmother knitting as if nothing were happening.',
          'A queue of fans in sleeping bags outside a shop at night, with hot drinks, under a large poster announcing a launch the next morning.',
        ],
        preguntas: ['Why might the people be waiting?', 'How difficult might it be for them to stay patient?'],
        segundos: 60,
        modelo:
          'Contrasta el tipo de espera: obligada y frustrante (la estación), angustiosa (el hospital), elegida y casi festiva (la cola). Usa lenguaje de especulación y de contraste (whereas, while, in contrast, on the other hand). Pregunta para el compañero: «Who do you think is finding the wait the most stressful? Why?»',
      },
    ],
  },
  {
    id: 'c1-spk-3-collaborative-1',
    examen: 'c1',
    destreza: 'speaking',
    parte: 3,
    nombreParte: 'Collaborative task',
    examenNumero: 1,
    instrucciones:
      'You and your partner discuss the question on the sheet, using the ideas around it, for about 2 minutes. Then you have about a minute to reach a decision together. You get 15 seconds to read the sheet first.',
    minutos: 4,
    items: [
      {
        n: 1,
        tipo: 'hablar',
        interlocutor:
          'Now, I’d like you to talk about something together for about two minutes. Here are some things that influence what people decide to buy and a question for you to discuss. First you have some time to look at the task. … Now, talk to each other about how important these things are when people decide what to buy.',
        preguntaCentral: 'How important are these things when people decide what to buy?',
        ideas: ['price', 'the opinions of friends', 'advertising', 'the reputation of the brand', 'concern for the environment'],
        preguntas: ['Now you have about a minute to decide which of these has the strongest influence on young people.'],
        segundos: 120,
        segundosLectura: 15,
        modelo:
          'No hace falta tocar las cinco ideas: dos o tres bien discutidas valen más. Haz preguntas al compañero («What do you make of…?», «Would you agree that…?»), muestra acuerdo y desacuerdo con matices («I see your point, but…»). En el minuto de decidir, llega a una decisión conjunta y dila en voz alta.',
      },
    ],
  },
  {
    id: 'c1-spk-4-discussion-1',
    examen: 'c1',
    destreza: 'speaking',
    parte: 4,
    nombreParte: 'Discussion',
    examenNumero: 1,
    instrucciones: 'The examiner asks you and your partner questions related to the topic of Part 3. Give opinions with reasons and react to what your partner says. About 5 minutes.',
    minutos: 5,
    items: [
      {
        n: 1,
        tipo: 'hablar',
        interlocutor: 'Use the following questions, in order, as appropriate: … What do you think? … Do you agree? … And you?',
        preguntas: [
          'Some people say that advertising should not be allowed on social media. What do you think?',
          'Do you think people buy more things than they need? Why?',
          'How much does the pressure to own the latest products affect young people?',
          'Is it better to spend money on experiences or on possessions?',
          'Some people say that shopping has become a leisure activity rather than a necessity. Do you agree?',
          'Should schools teach young people how to manage money? Why / why not?',
        ],
        segundos: 300,
        modelo:
          'Opiniones desarrolladas: postura, razón, ejemplo y un matiz («Although…, I’d argue that…»). Reacciona a lo que dice el compañero («That’s a fair point, though I’d add…»). Si no se te ocurre nada, gana tiempo con naturalidad: «That’s a tricky one. I suppose…».',
      },
    ],
  },
];
