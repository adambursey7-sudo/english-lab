import type { Ejercicio } from '../tipos';
import { CRITERIOS_PAU_CORTOS, CRITERIOS_PAU_REDACCION } from './examen-1';

// PAU de Canarias (EBAU) · Inglés · examen 3. Seis preguntas sobre un texto, nivel B1. Formato y criterios oficiales
// en docs/formatos.md. Texto y preguntas redactados de cero (nombres y lugares inventados).

const TEXTO =
  'Every morning at half past seven, about twenty people walk down to Porthallow beach and swim in the sea. In July this would not be news. In January, when the water temperature is below ten degrees, it is. The group, the Dawn Dippers, started five years ago with three friends who had promised each other to swim once a week all winter. “We thought we would give up after a month,” says Margaret Lowe, a retired nurse of sixty-eight. “Instead, more people joined us.”\n\n' +
  'The swimmers stay in the water for only a few minutes, and the rules are strict: nobody swims alone, nobody goes far from the shore, and everybody brings a warm drink and dry clothes for afterwards. Newcomers are asked to start in autumn, when the sea is still relatively warm, so that their bodies get used to the cold little by little. “The first thirty seconds are terrible,” admits Tom Reid, who joined last year. “Then you feel completely awake, better than after three coffees.”\n\n' +
  'Doctors have mixed opinions about the activity. Some studies suggest that cold water improves circulation, reduces stress and even helps with mild depression. However, specialists also warn that the shock of cold water can be dangerous for people with heart problems, and that nobody should enter the sea quickly or after drinking alcohol. Dr Hannah Price, a local doctor, sees both sides. “I would not recommend it to all my patients,” she says, “but for healthy people who do it sensibly, the benefits are real.”\n\n' +
  'For most Dawn Dippers, however, the main attraction is not medical. After the swim, they sit on the beach wrapped in towels, drinking tea and talking, sometimes for an hour. Several of them live alone, and the meeting is the best moment of their day. “I came for the swimming,” says Margaret, “but I stay for the people. In winter it is easy to feel isolated, and this group has become a kind of family.” They plan to swim on Christmas morning, and the local café has promised free hot chocolate for everyone who gets wet.';

export const PAU_EXAMEN_3: Ejercicio[] = [
  {
    id: 'pau-3-winter-swimmers',
    examen: 'pau',
    destreza: 'prueba',
    parte: 1,
    nombreParte: 'Comprensión del texto',
    examenNumero: 3,
    titulo: 'The neighbours who swim in the sea every winter morning',
    instrucciones:
      'Read the text and answer questions 1, 2 and 3. In question 1, copy the exact words from the text as evidence; in question 2, copy no more than 10 words; in question 3, find the word in the text that matches each definition.',
    minutos: 25,
    texto: TEXTO,
    items: [
      {
        n: 1,
        tipo: 'verdaderoFalso',
        pregunta: '1. Say whether the following sentences are TRUE or FALSE according to the text. COPY the evidence from the text. No marks will be given without the evidence. (1.5 points)',
        afirmacion: 'a) The group began with a few people who did not expect to continue for long.',
        correcta: true,
        pruebas: ['started five years ago with three friends', 'We thought we would give up after a month', 'started five years ago with three friends who had promised each other to swim once a week all winter'],
        explicacion: 'TRUE: empezaron «three friends» y pensaban dejarlo pronto: «We thought we would give up after a month». Cualquiera de las dos frases vale como prueba, pero copiada tal cual.',
      },
      {
        n: 2,
        tipo: 'verdaderoFalso',
        afirmacion: 'b) New members are advised to begin swimming in the coldest months of the year.',
        correcta: false,
        pruebas: ['Newcomers are asked to start in autumn, when the sea is still relatively warm', 'Newcomers are asked to start in autumn', 'so that their bodies get used to the cold little by little'],
        explicacion: 'FALSE: a los nuevos se les pide empezar en otoño, cuando el agua aún está templada, para acostumbrarse poco a poco. Sin la prueba copiada, la respuesta vale 0.',
      },
      {
        n: 3,
        tipo: 'verdaderoFalso',
        afirmacion: 'c) Dr Hannah Price thinks that cold water swimming is suitable for everybody.',
        correcta: false,
        pruebas: ['I would not recommend it to all my patients', 'the shock of cold water can be dangerous for people with heart problems'],
        explicacion: 'FALSE: «I would not recommend it to all my patients». Dice que es bueno para gente sana que lo hace con cabeza, no para todo el mundo.',
      },
      {
        n: 4,
        tipo: 'palabra',
        pregunta: '2. ANSWER the questions below. COPY no more than 10 words and/or a number from the text to answer each question. (1.5 points)\na) How long do the swimmers stay in the water?',
        correctas: ['only a few minutes', 'a few minutes', 'for only a few minutes', 'stay in the water for only a few minutes'],
        maxPalabras: 10,
        explicacion: '«The swimmers stay in the water for only a few minutes». Copiado del texto, sin parafrasear.',
      },
      {
        n: 5,
        tipo: 'palabra',
        pregunta: 'b) What must every swimmer bring to the beach?',
        correctas: ['a warm drink and dry clothes', 'a warm drink and dry clothes for afterwards', 'everybody brings a warm drink and dry clothes'],
        maxPalabras: 10,
        explicacion: '«everybody brings a warm drink and dry clothes for afterwards». Las dos cosas: la bebida caliente y la ropa seca.',
      },
      {
        n: 6,
        tipo: 'palabra',
        pregunta: 'c) What has the local café offered to do on Christmas morning?',
        correctas: ['free hot chocolate for everyone who gets wet', 'free hot chocolate', 'promised free hot chocolate', 'promised free hot chocolate for everyone who gets wet'],
        maxPalabras: 10,
        explicacion: '«the local café has promised free hot chocolate for everyone who gets wet» (hasta 10 palabras copiadas).',
      },
      {
        n: 7,
        tipo: 'palabra',
        pregunta: '3. FIND a word or expression in the text that means… (1 point)\nd) no longer working because of your age (paragraph 1)',
        correctas: ['retired'],
        explicacion: '«a retired nurse of sixty-eight». La palabra tal cual aparece en el texto.',
      },
      {
        n: 8,
        tipo: 'palabra',
        pregunta: 'e) people who have recently joined a group or started an activity (paragraph 2)',
        correctas: ['newcomers'],
        explicacion: '«Newcomers are asked to start in autumn».',
      },
      {
        n: 9,
        tipo: 'palabra',
        pregunta: 'f) tell someone about a possible danger (paragraph 3)',
        correctas: ['warn'],
        explicacion: '«specialists also warn that the shock of cold water can be dangerous».',
      },
      {
        n: 10,
        tipo: 'palabra',
        pregunta: 'g) alone and separated from other people (paragraph 4)',
        correctas: ['isolated'],
        explicacion: '«In winter it is easy to feel isolated».',
      },
    ],
  },
  {
    id: 'pau-3-conversation-sports-centre',
    examen: 'pau',
    destreza: 'prueba',
    parte: 4,
    nombreParte: 'Complete a conversation',
    examenNumero: 3,
    titulo: 'Phoning a sports centre about swimming lessons',
    instrucciones:
      '4. READ this conversation and COMPLETE your part. Write the numbers (1-6) and complete each sentence on your exam paper. (1.5 points) If a gap ends with a question mark, you must write a question.',
    minutos: 10,
    texto:
      'Receptionist: Good afternoon, Riverside Sports Centre. How can I help you?\n' +
      'You: {{1}}\n' +
      'Receptionist: Certainly. We have a beginners’ group and an intermediate group. Which level are you interested in?\n' +
      'You: {{2}}\n' +
      'Receptionist: No problem. The beginners’ group meets on Tuesdays and Thursdays at seven in the evening.\n' +
      'You: And {{3}}?\n' +
      'Receptionist: It’s forty-five euros a month, and the first lesson is free.\n' +
      'You: That sounds good. {{4}}?\n' +
      'Receptionist: Just a swimsuit, a towel and a swimming cap. Goggles are optional.\n' +
      'You: {{5}}\n' +
      'Receptionist: Great. Can you come to the reception tomorrow to fill in the form?\n' +
      'You: {{6}}',
    items: [
      { n: 1, tipo: 'redaccion', tipoTexto: 'dialogue', enunciado: 'Hueco 1', minPalabras: 2, maxPalabras: 25, modelo: 'Hello. I’m calling to ask about swimming lessons for adults.  /  Good afternoon. I’d like some information about your swimming courses, please.', criterios: CRITERIOS_PAU_CORTOS, explicacion: 'La recepcionista responde hablando de grupos y niveles: preguntas por las clases de natación.' },
      { n: 2, tipo: 'redaccion', tipoTexto: 'dialogue', enunciado: 'Hueco 2', minPalabras: 2, maxPalabras: 25, modelo: 'The beginners’ group, please. I can only swim a little.  /  I think the beginners’ level is best for me, because I’ve never had lessons.', criterios: CRITERIOS_PAU_CORTOS, explicacion: 'Eliges nivel; ella sigue con el horario «The beginners’ group meets…», así que el principiante es el que encaja.' },
      { n: 3, tipo: 'redaccion', tipoTexto: 'dialogue', enunciado: 'Hueco 3 (acaba en «?»: tiene que ser una pregunta)', minPalabras: 2, maxPalabras: 25, modelo: 'how much does the course cost  /  how much is it a month', criterios: CRITERIOS_PAU_CORTOS, explicacion: 'Contesta «It’s forty-five euros a month»: preguntas el precio. El «And» y el «?» ya están escritos.' },
      { n: 4, tipo: 'redaccion', tipoTexto: 'dialogue', enunciado: 'Hueco 4 (acaba en «?»: tiene que ser una pregunta)', minPalabras: 2, maxPalabras: 25, modelo: 'Do I need to bring anything special  /  What do I have to bring to the lessons', criterios: CRITERIOS_PAU_CORTOS, explicacion: 'Responde «Just a swimsuit, a towel and a swimming cap»: preguntas qué hay que llevar.' },
      { n: 5, tipo: 'redaccion', tipoTexto: 'dialogue', enunciado: 'Hueco 5', minPalabras: 2, maxPalabras: 25, modelo: 'Perfect. I’d like to sign up for the beginners’ group, then.  /  OK, I’ve got all that at home. I want to join the beginners’ group.', criterios: CRITERIOS_PAU_CORTOS, explicacion: 'Después de la información, te apuntas; ella dice «Great» y te pide que vayas a rellenar el formulario.' },
      { n: 6, tipo: 'redaccion', tipoTexto: 'dialogue', enunciado: 'Hueco 6', minPalabras: 2, maxPalabras: 25, modelo: 'Yes, of course. I’ll come after work, at about six.  /  Sure. I finish school at two, so I can be there in the afternoon.', criterios: CRITERIOS_PAU_CORTOS, explicacion: 'Contestas a «Can you come to the reception tomorrow?»: aceptas y dices cuándo.' },
    ],
  },
  {
    id: 'pau-3-situations',
    examen: 'pau',
    destreza: 'prueba',
    parte: 5,
    nombreParte: 'Comment on a situation',
    examenNumero: 3,
    instrucciones:
      '5. Choose ONLY 3 of the following situations and WRITE what you would say in each one to show that you understand the context of the situation. Write between 10 and 25 words. (1.5 points) Only the first three you answer will be marked.',
    minutos: 10,
    elegir: 3,
    items: [
      { n: 1, tipo: 'redaccion', tipoTexto: 'situation', enunciado: 'a) Your flatmate always leaves the kitchen dirty after cooking. Complain politely.', minPalabras: 10, maxPalabras: 25, modelo: 'Sorry to bring this up, but could you clean the kitchen after you cook? I always find dirty dishes when I want to use it.', criterios: CRITERIOS_PAU_CORTOS, explicacion: 'Quejarse sin ofender: suavizar («Sorry to bring this up, but…»), pedir con «could you…?» y explicar por qué molesta.' },
      { n: 2, tipo: 'redaccion', tipoTexto: 'situation', enunciado: 'b) Your grandmother is afraid of using the new tablet you gave her. Encourage her.', minPalabras: 10, maxPalabras: 25, modelo: 'Don’t worry, Grandma, it’s much easier than it looks. Let’s try it together, and you’ll be video-calling us in a few days!', criterios: CRITERIOS_PAU_CORTOS, explicacion: 'Animar: «Don’t worry», «You can do it», ofrecer ayuda y una imagen positiva del resultado.' },
      { n: 3, tipo: 'redaccion', tipoTexto: 'situation', enunciado: 'c) A friend invites you to go hiking on Sunday, but you have to work. Refuse and suggest another day.', minPalabras: 10, maxPalabras: 25, modelo: 'I’d love to, but I’m working on Sunday, I’m afraid. How about going next Saturday instead? The weather should be better.', criterios: CRITERIOS_PAU_CORTOS, explicacion: 'Rechazar con educación («I’d love to, but…») y proponer otra fecha («How about…?», «Why don’t we…?»).' },
      { n: 4, tipo: 'redaccion', tipoTexto: 'situation', enunciado: 'd) You see a classmate crying in the corridor. Show interest and offer your help.', minPalabras: 10, maxPalabras: 25, modelo: 'Hey, are you OK? You look really upset. If you want to talk about it, I’m here, and I can walk you home.', criterios: CRITERIOS_PAU_CORTOS, explicacion: 'Mostrar interés («Are you OK?», «What’s wrong?») y ofrecer ayuda («If you want…, I can…»).' },
      { n: 5, tipo: 'redaccion', tipoTexto: 'situation', enunciado: 'e) You borrowed your sister’s bike and you have broken the front light. Apologise and offer a solution.', minPalabras: 10, maxPalabras: 25, modelo: 'I’m really sorry, I broke the front light of your bike by accident. I’ll buy a new one this afternoon and fit it myself.', criterios: CRITERIOS_PAU_CORTOS, explicacion: 'Pedir perdón («I’m really sorry…»), decir qué pasó y ofrecer arreglarlo («I’ll buy / I’ll pay for…»).' },
    ],
  },
  {
    id: 'pau-3-composition',
    examen: 'pau',
    destreza: 'prueba',
    parte: 6,
    nombreParte: 'Composition',
    examenNumero: 3,
    instrucciones:
      '6. Choose ONE of the following topics and WRITE a composition of about 140-180 words. If you choose the email, DO NOT SIGN it. (3 points)',
    minutos: 30,
    elegir: 1,
    items: [
      {
        n: 1,
        tipo: 'redaccion',
        tipoTexto: 'composition',
        enunciado: 'a) Is it better to do sport with other people or on your own? Give your opinion.',
        minPalabras: 140,
        maxPalabras: 180,
        modelo:
          'Some people prefer to run or swim alone, while others cannot imagine doing sport without company. In my opinion, exercising with other people is better for most of us, although both options have their advantages.\n\n' +
          'The main reason is motivation. When you have agreed to meet a friend at seven in the morning, it is much harder to stay in bed. A group also makes sport safer, especially in activities such as swimming in the sea or cycling on the road, where an accident can happen at any moment. Furthermore, doing sport together is a good way to make friends and to feel part of a community, which is especially important for people who live alone.\n\n' +
          'On the other hand, exercising alone gives you freedom. You can choose your own time and speed, and some people find it relaxing to be on their own for a while.\n\n' +
          'To conclude, I believe that group sport offers more benefits, but the most important thing is to find the activity that makes you want to continue.',
        criterios: CRITERIOS_PAU_REDACCION,
        explicacion: 'Opinion essay: postura clara al principio, razones con ejemplos concretos (la cita a las siete, la seguridad en el mar), un párrafo breve con el otro punto de vista y conclusión. Conectores: furthermore, on the other hand, to conclude.',
      },
      {
        n: 2,
        tipo: 'redaccion',
        tipoTexto: 'email',
        enunciado: 'b) Write an email to a friend who has recently moved to your town inviting him or her to join the group you do sport with.',
        minPalabras: 140,
        maxPalabras: 180,
        modelo:
          'Hi Daniel,\n\n' +
          'How are you? I hope you are settling in well in your new flat. I know it is not easy to arrive in a town where you do not know many people, so I am writing to invite you to join my swimming group.\n\n' +
          'We are about fifteen people of all ages, and we meet on the beach every morning at half past seven, even in winter! The water is cold, but we only stay in for a few minutes, and afterwards we sit together with a hot drink and chat for a while. It is honestly the best part of my day, and everyone is really friendly.\n\n' +
          'You do not need to be a good swimmer, because we never go far from the shore. Just bring a towel, warm clothes and a flask of tea. Why don’t you come next Saturday? I can pick you up at seven and introduce you to everybody.\n\n' +
          'Let me know if you fancy it.\n\n' +
          'Take care,',
        criterios: CRITERIOS_PAU_REDACCION,
        explicacion: 'Email informal: saludo, motivo del correo, descripción del grupo con tus palabras, invitación concreta («Why don’t you come…?») y despedida SIN firmar.',
      },
    ],
  },
];
