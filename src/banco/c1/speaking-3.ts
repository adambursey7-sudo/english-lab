import type { Ejercicio } from '../tipos';

// Cambridge C1 Advanced · Speaking · examen 3, cuatro partes. Las fotos de la Part 2 van descritas en texto (sin fotos con derechos).
// Formato y frases del interlocutor en docs/formatos.md. Redactado de cero.

export const SPEAKING_C1_3: Ejercicio[] = [
  {
    id: 'c1-spk-1-interview-3',
    examen: 'c1',
    destreza: 'speaking',
    parte: 1,
    nombreParte: 'Interview',
    examenNumero: 3,
    instrucciones: 'The examiner asks you questions about yourself. Answer in full sentences and give reasons: two or three sentences per question is about right. About 2 minutes.',
    minutos: 2,
    items: [
      {
        n: 1,
        tipo: 'hablar',
        interlocutor: 'Good morning. My name is Helen and this is my colleague, Marcus. And your names are? … Thank you. First, we’d like to know something about you.',
        preguntas: [
          'Where are you from? What do you like about living there?',
          'What do you usually do at the weekend?',
          'Do you enjoy cooking? Why / why not?',
          'Tell us about a teacher who has influenced you.',
          'How do you usually keep in touch with friends who live far away?',
          'What would you like to be doing in five years’ time?',
        ],
        segundos: 120,
        modelo:
          'Dos o tres frases por pregunta, con una razón o un ejemplo: «I come from a small town on the coast, which is lovely in summer but rather quiet the rest of the year. What I like most is…». Evita respuestas de una palabra y los discursos aprendidos de memoria. Si no has entendido, pide que lo repitan con naturalidad («Sorry, could you say that again?»).',
      },
    ],
  },
  {
    id: 'c1-spk-2-long-turn-3',
    examen: 'c1',
    destreza: 'speaking',
    parte: 2,
    nombreParte: 'Long turn',
    examenNumero: 3,
    instrucciones:
      'You get three pictures and talk about two of them on your own for about a minute, answering the two questions written above the pictures. Then your partner answers a short question about your pictures (about 30 seconds). About 4 minutes in total.',
    minutos: 4,
    items: [
      {
        n: 1,
        tipo: 'hablar',
        pregunta: 'People learning something new',
        interlocutor:
          'In this part of the test, I’m going to give each of you three pictures. I’d like you to talk about two of them on your own for about a minute, and also to answer a question briefly about your partner’s pictures. Here are your pictures. They show people learning something new. I’d like you to compare two of the pictures, and say what might be difficult about learning in these situations, and what the people might gain from the experience.',
        imagenes: [
          'An older man in a swimming pool with a float under each arm, while a young instructor crouches on the side and shows him how to kick. Two children in the next lane are watching and giggling.',
          'A woman in her thirties at a kitchen table with a laptop, wearing headphones and frowning at a page of Japanese characters. A cup of tea has gone cold beside her and there are sticky notes on the shelf behind.',
          'Three teenagers around a garage workbench, taking apart an old motorcycle engine under the guidance of a mechanic with oily hands. One of them is holding up a part and looking at it with confusion.',
        ],
        preguntas: ['What might be difficult about learning in these situations?', 'What might the people gain from the experience?'],
        segundos: 60,
        modelo:
          'Compara desde el principio en lugar de describir una foto y luego la otra: «While the man in the pool is probably feeling a bit self-conscious, the woman at her laptop is dealing with a different kind of challenge, which is staying motivated on her own…». Especula con might, could, presumably, I imagine. Contesta a las DOS preguntas y reparte el minuto. Pregunta para el compañero (30 s): «Which of these people do you think will find it easiest to keep going? Why?»',
      },
      {
        n: 2,
        tipo: 'hablar',
        pregunta: 'People travelling to work',
        interlocutor:
          'Now, here are your pictures. They show people travelling to work in different ways. I’d like you to compare two of the pictures, and say what the advantages and disadvantages of travelling in this way might be, and how the people might be feeling at this moment.',
        imagenes: [
          'A packed underground carriage at rush hour. Commuters stand shoulder to shoulder, most of them looking at their phones; one man is reading a book held awkwardly above his head.',
          'A woman in a suit and trainers cycling along a tree-lined canal path in the early morning, a briefcase strapped to the back of her bike. A heron stands in the shallows beside her.',
          'A man alone in a car at a standstill in heavy traffic, drumming his fingers on the wheel. Through the windscreen can be seen a long queue of red tail lights stretching into the rain.',
        ],
        preguntas: ['What might be the advantages and disadvantages of travelling in this way?', 'How might the people be feeling at this moment?'],
        segundos: 60,
        modelo:
          'Elige las dos fotos que más se pueden contrastar (por ejemplo, la ciclista y el conductor atascado) y úsalas para hablar de ventajas y desventajas de cada medio de transporte, no solo de cómo se sienten. Lenguaje de contraste (whereas, unlike, on the other hand) y de especulación (she may well be, he looks as if). Pregunta para el compañero: «Which of these ways of travelling to work would you least like to do every day? Why?»',
      },
    ],
  },
  {
    id: 'c1-spk-3-collaborative-3',
    examen: 'c1',
    destreza: 'speaking',
    parte: 3,
    nombreParte: 'Collaborative task',
    examenNumero: 3,
    instrucciones:
      'You and your partner discuss the question on the sheet, using the ideas around it, for about 2 minutes. Then you have about a minute to reach a decision together. You get 15 seconds to read the sheet first.',
    minutos: 4,
    items: [
      {
        n: 1,
        tipo: 'hablar',
        interlocutor:
          'Now, I’d like you to talk about something together for about two minutes. Here are some things that people can do to make their town a better place to live and a question for you to discuss. First you have some time to look at the task. … Now, talk to each other about how much difference each of these things could make to a town.',
        preguntaCentral: 'How much difference could each of these things make to a town?',
        ideas: ['more green spaces', 'cheaper public transport', 'a bigger choice of shops', 'more cultural events', 'cleaner streets'],
        preguntas: ['Now you have about a minute to decide which of these things the town council should spend its money on first.'],
        segundos: 120,
        segundosLectura: 15,
        modelo:
          'No hace falta pasar por las cinco ideas: dos o tres bien discutidas valen más que las cinco de pasada. Pasa la palabra al compañero («What do you reckon?», «Would you agree that…?») y reacciona a lo que dice («That’s a fair point, though I’d argue that…»). Algunas ideas se relacionan entre sí (el transporte barato y las calles limpias): dilo. En el último minuto llegad a una decisión y decidla en voz alta, aunque no estéis del todo de acuerdo.',
      },
    ],
  },
  {
    id: 'c1-spk-4-discussion-3',
    examen: 'c1',
    destreza: 'speaking',
    parte: 4,
    nombreParte: 'Discussion',
    examenNumero: 3,
    instrucciones: 'The examiner asks you and your partner questions related to the topic of Part 3. Give opinions with reasons and react to what your partner says. About 5 minutes.',
    minutos: 5,
    items: [
      {
        n: 1,
        tipo: 'hablar',
        interlocutor: 'Use the following questions, in order, as appropriate: … What do you think? … Do you agree? … And you?',
        preguntas: [
          'Some people prefer to live in a big city, while others like a small town. What are the advantages of each?',
          'Do you think it is important for people to know their neighbours? Why / why not?',
          'Who should be responsible for keeping public places clean: the authorities or the people who use them?',
          'Some people say that young people are leaving small towns because there is nothing for them to do. How far do you agree?',
          'How can a community encourage its residents to take more pride in where they live?',
          'Do you think towns will be very different in fifty years’ time? In what ways?',
        ],
        segundos: 300,
        modelo:
          'Opiniones desarrolladas: postura, razón, ejemplo y un matiz («I’d say it depends on the size of the place; in a village, for instance…»). Reacciona al compañero («I see where you’re coming from, but…», «That’s true, and I’d add that…»). Si la pregunta es difícil, gana tiempo con naturalidad: «That’s an interesting question. Off the top of my head, I’d say…».',
      },
    ],
  },
];
