import type { Ejercicio } from '../tipos';

// Cambridge C1 Advanced · Speaking · examen 2, cuatro partes. Las fotos de la Part 2 van descritas en texto (sin fotos con derechos).
// Formato y frases del interlocutor en docs/formatos.md. Redactado de cero.

export const SPEAKING_C1_2: Ejercicio[] = [
  {
    id: 'c1-spk-1-interview-2',
    examen: 'c1',
    destreza: 'speaking',
    parte: 1,
    nombreParte: 'Interview',
    examenNumero: 2,
    instrucciones: 'The examiner asks you questions about yourself. Answer in full sentences and give reasons: two or three sentences per question is about right. About 2 minutes.',
    minutos: 2,
    items: [
      {
        n: 1,
        tipo: 'hablar',
        interlocutor: 'Good afternoon. My name is Daniel and this is my colleague, Priya. And your names are? … Thank you. First, we’d like to know something about you.',
        preguntas: [
          'Do you live in a house or a flat? What is it like?',
          'What kind of music do you enjoy listening to? Why?',
          'How important is it for you to spend time outdoors?',
          'Tell us about a place you would like to visit one day.',
          'Do you prefer studying or working on your own or with other people? Why?',
          'What is the most interesting thing you have done recently?',
        ],
        segundos: 120,
        modelo:
          'Dos o tres frases por pregunta, con una razón o un ejemplo: «I live in a flat on the fourth floor, which is great for the views but less so when the lift breaks down. What I like most is…». Nada de respuestas de una palabra ni de discursos memorizados; si no entiendes algo, pide que lo repitan con naturalidad («Sorry, could you say that again?»).',
      },
    ],
  },
  {
    id: 'c1-spk-2-long-turn-2',
    examen: 'c1',
    destreza: 'speaking',
    parte: 2,
    nombreParte: 'Long turn',
    examenNumero: 2,
    instrucciones:
      'You get three pictures and talk about two of them on your own for about a minute, answering the two questions written above the pictures. Then your partner answers a short question about your pictures (about 30 seconds). About 4 minutes in total.',
    minutos: 4,
    items: [
      {
        n: 1,
        tipo: 'hablar',
        pregunta: 'People using technology outdoors',
        interlocutor:
          'In this part of the test, I’m going to give each of you three pictures. I’d like you to talk about two of them on your own for about a minute, and also to answer a question briefly about your partner’s pictures. Here are your pictures. They show people using technology outdoors. I’d like you to compare two of the pictures, and say why the people might be using technology in these situations, and how useful it might be to them.',
        imagenes: [
          'A woman jogging along a riverside path at dawn, glancing at a smartwatch on her wrist. She has headphones in, and a stone bridge is just behind her.',
          'A group of teenagers in a park, crowded around one phone held up on a stick, filming themselves dancing. An elderly man on a nearby bench is watching them over his newspaper.',
          'A farmer standing in a muddy field in the rain, holding a controller and looking up at a drone. A flock of sheep is scattered across the hillside in the distance.',
        ],
        preguntas: ['Why might the people be using technology in these situations?', 'How useful might it be to them?'],
        segundos: 60,
        modelo:
          'Compara desde el principio, no describas una foto y luego la otra: «While the runner is using technology to keep track of herself, the teenagers are using it to be seen by other people…». Especula con might, could, presumably, I imagine. Contesta a las DOS preguntas y reparte el minuto entre las dos fotos. Pregunta para el compañero (30 s): «Which of these people do you think could manage most easily without the technology? Why?»',
      },
      {
        n: 2,
        tipo: 'hablar',
        pregunta: 'People celebrating something',
        interlocutor:
          'Now, here are your pictures. They show people celebrating something. I’d like you to compare two of the pictures, and say what the people might be celebrating, and how memorable these celebrations might be for the people involved.',
        imagenes: [
          'A family around a kitchen table with a homemade, slightly lopsided cake. A small boy is blowing out the candles while his grandmother films him on a tablet and a dog waits hopefully under the table.',
          'A crowd of football fans in a town square at night, wearing scarves and waving flags, some of them climbing onto a fountain. A police officer stands to one side with her arms folded.',
          'Two colleagues in an office corridor. One is holding up a framed certificate while the other shakes her hand; a single balloon is tied to a chair and there is a half-eaten tray of biscuits on a desk.',
        ],
        preguntas: ['What might the people be celebrating?', 'How memorable might these celebrations be for the people involved?'],
        segundos: 60,
        modelo:
          'Contrasta el tipo de celebración: íntima y familiar (la tarta), masiva y pública (los aficionados), discreta y algo forzada (la oficina). Usa lenguaje de contraste (whereas, in contrast, unlike) y de especulación. En la segunda pregunta, piensa en para quién será memorable y por qué («the boy will probably remember it for years, whereas the colleague may have forgotten the biscuits by Monday»). Pregunta para el compañero: «Which of these celebrations would you most like to be part of? Why?»',
      },
    ],
  },
  {
    id: 'c1-spk-3-collaborative-2',
    examen: 'c1',
    destreza: 'speaking',
    parte: 3,
    nombreParte: 'Collaborative task',
    examenNumero: 2,
    instrucciones:
      'You and your partner discuss the question on the sheet, using the ideas around it, for about 2 minutes. Then you have about a minute to reach a decision together. You get 15 seconds to read the sheet first.',
    minutos: 4,
    items: [
      {
        n: 1,
        tipo: 'hablar',
        interlocutor:
          'Now, I’d like you to talk about something together for about two minutes. Here are some things that can affect young people’s wellbeing and a question for you to discuss. First you have some time to look at the task. … Now, talk to each other about how much these things affect young people’s wellbeing.',
        preguntaCentral: 'How much do these things affect young people’s wellbeing?',
        ideas: ['social media', 'sport and exercise', 'exams', 'friendships', 'money'],
        preguntas: ['Now you have about a minute to decide which of these things schools could do most to help with.'],
        segundos: 120,
        segundosLectura: 15,
        modelo:
          'No hace falta tocar las cinco ideas: dos o tres bien discutidas valen más que las cinco de pasada. Invita al compañero a hablar («What’s your take on…?», «Would you say that…?»), apoya y matiza («I’d go along with that, up to a point…»). Algunas ideas afectan en positivo y en negativo a la vez (el deporte, las amistades): dilo. En el minuto final, llegad a una decisión y decidla en voz alta aunque no estéis del todo de acuerdo.',
      },
    ],
  },
  {
    id: 'c1-spk-4-discussion-2',
    examen: 'c1',
    destreza: 'speaking',
    parte: 4,
    nombreParte: 'Discussion',
    examenNumero: 2,
    instrucciones: 'The examiner asks you and your partner questions related to the topic of Part 3. Give opinions with reasons and react to what your partner says. About 5 minutes.',
    minutos: 5,
    items: [
      {
        n: 1,
        tipo: 'hablar',
        interlocutor: 'Use the following questions, in order, as appropriate: … What do you think? … Do you agree? … And you?',
        preguntas: [
          'Some people say that social media does more harm than good to young people. What do you think?',
          'Should there be a minimum age for using social media? Why / why not?',
          'Do you think young people today are under more pressure than previous generations were? Why?',
          'How important is it for schools to teach students how to look after their mental health?',
          'Some people say that the pressure to succeed comes mainly from parents. Do you agree?',
          'Is it possible to be happy without being successful? Why / why not?',
        ],
        segundos: 300,
        modelo:
          'Opiniones desarrolladas: postura, razón, ejemplo y un matiz («I’d say it depends largely on how it’s used; a teenager who…»). Reacciona a lo que dice el compañero («I take your point, but…», «That’s true, and I’d add that…»). Si la pregunta es difícil, gana tiempo con naturalidad: «That’s not an easy one to answer. Off the top of my head, I’d say…».',
      },
    ],
  },
];
