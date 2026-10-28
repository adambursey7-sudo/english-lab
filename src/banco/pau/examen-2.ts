import type { Ejercicio } from '../tipos';
import { CRITERIOS_PAU_CORTOS, CRITERIOS_PAU_REDACCION } from './examen-1';

// PAU de Canarias (EBAU) · Inglés · examen 2. Seis preguntas sobre un texto, nivel B1. Formato y criterios oficiales
// en docs/formatos.md. Texto y preguntas redactados de cero (nombres y lugares inventados).

const TEXTO =
  'Three years ago, the playground of Greenhill Secondary School, in the suburbs of Westbury, was a square of grey concrete where nobody wanted to spend their breaks. Today it is covered with wooden boxes full of tomatoes, lettuces, strawberries and herbs. The transformation began when a biology teacher, Elena Marsh, asked the head teacher for permission to plant a few vegetables with her students as a science experiment. “I only wanted to show them how a seed becomes a plant,” she remembers. “I never imagined it would change the whole school.”\n\n' +
  'The experiment grew quickly. Students from every year group now spend one hour a week in the garden, and the oldest ones are responsible for watering during the holidays. Every Saturday morning, a group of volunteers takes the vegetables to the neighbourhood market, where they sell them from a small stall. The money is not used for the garden itself, which is paid for by the school, but to buy books and sports equipment. Last year the stall earned almost four thousand pounds.\n\n' +
  'The project has had its critics. Some parents complained that their children were spending time digging instead of preparing for their exams, and a few neighbours were worried about the smell of the compost. However, the results have surprised everyone. Science marks have improved, and teachers say that students who used to be difficult in class are calmer and more cooperative after an hour outside. “Working with your hands teaches you patience,” Elena says. “You cannot shout at a tomato to make it grow faster.”\n\n' +
  'Perhaps the most unexpected change has been in what the students eat. Before the garden, most of them bought crisps and chocolate at the school shop. Now many bring salads from home, and the canteen uses the school’s own vegetables twice a week. Several students have started small gardens on their balconies, and one of them, sixteen-year-old Leo Barrett, has decided to study agriculture at university. “I used to think vegetables came from the supermarket,” he admits. “Now I know how much work there is behind a single carrot.”';

export const PAU_EXAMEN_2: Ejercicio[] = [
  {
    id: 'pau-2-school-garden',
    examen: 'pau',
    destreza: 'prueba',
    parte: 1,
    nombreParte: 'Comprensión del texto',
    examenNumero: 2,
    titulo: 'The school that grows its own lunch',
    instrucciones:
      'Read the text and answer questions 1, 2 and 3. In question 1, copy the exact words from the text as evidence; in question 2, copy no more than 10 words; in question 3, find the word in the text that matches each definition.',
    minutos: 25,
    texto: TEXTO,
    items: [
      {
        n: 1,
        tipo: 'verdaderoFalso',
        pregunta: '1. Say whether the following sentences are TRUE or FALSE according to the text. COPY the evidence from the text. No marks will be given without the evidence. (1.5 points)',
        afirmacion: 'a) The garden was originally planned as a way of raising money for the school.',
        correcta: false,
        pruebas: ['asked the head teacher for permission to plant a few vegetables with her students as a science experiment', 'as a science experiment', 'I only wanted to show them how a seed becomes a plant'],
        explicacion: 'FALSE: empezó como un experimento de ciencias («as a science experiment»; «I only wanted to show them how a seed becomes a plant»). El dinero vino después. Recuerda: sin la prueba copiada tal cual, la pregunta vale 0.',
      },
      {
        n: 2,
        tipo: 'verdaderoFalso',
        afirmacion: 'b) The school pays the costs of the garden.',
        correcta: true,
        pruebas: ['The money is not used for the garden itself, which is paid for by the school', 'the garden itself, which is paid for by the school', 'which is paid for by the school'],
        explicacion: 'TRUE: «the garden itself, which is paid for by the school». Lo del puesto del mercado se gasta en libros y material deportivo, no en el huerto.',
      },
      {
        n: 3,
        tipo: 'verdaderoFalso',
        afirmacion: 'c) All the parents supported the project from the beginning.',
        correcta: false,
        pruebas: ['Some parents complained that their children were spending time digging instead of preparing for their exams', 'Some parents complained', 'The project has had its critics'],
        explicacion: 'FALSE: «Some parents complained that their children were spending time digging instead of preparing for their exams». Ojo con «all»: basta con que algunos se quejaran para que la frase sea falsa.',
      },
      {
        n: 4,
        tipo: 'palabra',
        pregunta: '2. ANSWER the questions below. COPY no more than 10 words and/or a number from the text to answer each question. (1.5 points)\na) Who looks after the garden during the holidays?',
        correctas: ['the oldest ones', 'the oldest ones are responsible for watering', 'the oldest ones are responsible for watering during the holidays', 'the oldest students'],
        maxPalabras: 10,
        explicacion: '«The oldest ones are responsible for watering during the holidays». Hay que copiar del texto, no explicarlo con tus palabras.',
      },
      {
        n: 5,
        tipo: 'palabra',
        pregunta: 'b) What is the money from the market stall used for?',
        correctas: ['to buy books and sports equipment', 'books and sports equipment', 'buy books and sports equipment'],
        maxPalabras: 10,
        explicacion: '«…but to buy books and sports equipment». No vale «for the garden»: el texto dice justo lo contrario.',
      },
      {
        n: 6,
        tipo: 'palabra',
        pregunta: 'c) What does Leo Barrett want to do when he finishes school?',
        correctas: ['study agriculture at university', 'to study agriculture at university', 'has decided to study agriculture at university', 'study agriculture'],
        maxPalabras: 10,
        explicacion: '«Leo Barrett, has decided to study agriculture at university» (hasta 10 palabras copiadas).',
      },
      {
        n: 7,
        tipo: 'palabra',
        pregunta: '3. FIND a word or expression in the text that means… (1 point)\nd) the person in charge of a school (paragraph 1)',
        correctas: ['head teacher'],
        explicacion: '«asked the head teacher for permission». Son dos palabras y hay que escribirlas tal cual.',
      },
      {
        n: 8,
        tipo: 'palabra',
        pregunta: 'e) people who work without being paid (paragraph 2)',
        correctas: ['volunteers'],
        explicacion: '«a group of volunteers takes the vegetables to the neighbourhood market».',
      },
      {
        n: 9,
        tipo: 'palabra',
        pregunta: 'f) a small table or structure where things are sold in a market (paragraph 2)',
        correctas: ['stall'],
        explicacion: '«they sell them from a small stall».',
      },
      {
        n: 10,
        tipo: 'palabra',
        pregunta: 'g) the place where food is served in a school or a workplace (paragraph 4)',
        correctas: ['canteen'],
        explicacion: '«the canteen uses the school’s own vegetables twice a week».',
      },
    ],
  },
  {
    id: 'pau-2-conversation-shop',
    examen: 'pau',
    destreza: 'prueba',
    parte: 4,
    nombreParte: 'Complete a conversation',
    examenNumero: 2,
    titulo: 'Returning a jacket to a shop',
    instrucciones:
      '4. READ this conversation and COMPLETE your part. Write the numbers (1-6) and complete each sentence on your exam paper. (1.5 points) If a gap ends with a question mark, you must write a question.',
    minutos: 10,
    texto:
      'Shop assistant: Good morning. How can I help you?\n' +
      'You: {{1}}\n' +
      'Shop assistant: Of course. Is there a problem with it?\n' +
      'You: {{2}}\n' +
      'Shop assistant: I see. Have you got the receipt?\n' +
      'You: {{3}}\n' +
      'Shop assistant: Thank you. Would you prefer a refund or an exchange?\n' +
      'You: An exchange, if possible. {{4}}?\n' +
      'Shop assistant: Let me check… Yes, we have it in medium. Would you like to try it on?\n' +
      'You: {{5}}\n' +
      'Shop assistant: The changing rooms are at the back of the shop, next to the shoes.\n' +
      'You: Thanks. By the way, {{6}}?\n' +
      'Shop assistant: We close at nine tonight, so there’s no hurry.',
    items: [
      { n: 1, tipo: 'redaccion', tipoTexto: 'dialogue', enunciado: 'Hueco 1', minPalabras: 2, maxPalabras: 25, modelo: 'Hello. I’d like to return this jacket I bought last week.  /  Good morning. I bought this jacket here on Saturday and I want to return it.', criterios: CRITERIOS_PAU_CORTOS, explicacion: 'La dependienta contesta «Is there a problem with it?», así que has traído algo para devolver o cambiar.' },
      { n: 2, tipo: 'redaccion', tipoTexto: 'dialogue', enunciado: 'Hueco 2', minPalabras: 2, maxPalabras: 25, modelo: 'Yes, it’s too small for me.  /  Yes, the zip is broken and one of the buttons is missing.', criterios: CRITERIOS_PAU_CORTOS, explicacion: 'Explicas el problema. Más adelante pides una talla mayor, así que «it’s too small» encaja perfectamente.' },
      { n: 3, tipo: 'redaccion', tipoTexto: 'dialogue', enunciado: 'Hueco 3', minPalabras: 2, maxPalabras: 25, modelo: 'Yes, here it is.  /  Yes, I’ve got it in my bag. I paid by card.', criterios: CRITERIOS_PAU_CORTOS, explicacion: 'Contestas a «Have you got the receipt?»: sí, y se lo das (o explicas cómo pagaste).' },
      { n: 4, tipo: 'redaccion', tipoTexto: 'dialogue', enunciado: 'Hueco 4 (acaba en «?»: tiene que ser una pregunta)', minPalabras: 2, maxPalabras: 25, modelo: 'Have you got the same jacket in a bigger size  /  Do you have this one in a medium', criterios: CRITERIOS_PAU_CORTOS, explicacion: 'Responde «Yes, we have it in medium»: preguntas por una talla más grande. El «?» ya está escrito.' },
      { n: 5, tipo: 'redaccion', tipoTexto: 'dialogue', enunciado: 'Hueco 5', minPalabras: 2, maxPalabras: 25, modelo: 'Yes, please. That would be great.  /  Yes, I’d like to make sure it fits this time.', criterios: CRITERIOS_PAU_CORTOS, explicacion: 'Aceptas probártela; la dependienta te dice a continuación dónde están los probadores.' },
      { n: 6, tipo: 'redaccion', tipoTexto: 'dialogue', enunciado: 'Hueco 6 (acaba en «?»: tiene que ser una pregunta)', minPalabras: 2, maxPalabras: 25, modelo: 'what time do you close today  /  until what time are you open tonight', criterios: CRITERIOS_PAU_CORTOS, explicacion: 'Contesta «We close at nine tonight»: preguntas la hora de cierre. Como empieza con «By the way,», la pregunta va sin mayúscula inicial.' },
    ],
  },
  {
    id: 'pau-2-situations',
    examen: 'pau',
    destreza: 'prueba',
    parte: 5,
    nombreParte: 'Comment on a situation',
    examenNumero: 2,
    instrucciones:
      '5. Choose ONLY 3 of the following situations and WRITE what you would say in each one to show that you understand the context of the situation. Write between 10 and 25 words. (1.5 points) Only the first three you answer will be marked.',
    minutos: 10,
    elegir: 3,
    items: [
      { n: 1, tipo: 'redaccion', tipoTexto: 'situation', enunciado: 'a) Your friend wants to spend all his savings on a very expensive mobile phone. Give him advice.', minPalabras: 10, maxPalabras: 25, modelo: 'If I were you, I wouldn’t spend everything on a phone. Why don’t you wait for the sales and keep some money for emergencies?', criterios: CRITERIOS_PAU_CORTOS, explicacion: 'Aconsejar: «If I were you…», «You should…», «Why don’t you…?» con una razón. 10–25 palabras.' },
      { n: 2, tipo: 'redaccion', tipoTexto: 'situation', enunciado: 'b) You are at a restaurant and the waiter brings you a dish you did not order. Complain politely.', minPalabras: 10, maxPalabras: 25, modelo: 'Excuse me, I’m afraid this isn’t what I ordered. I asked for the grilled fish, not the chicken. Could you change it, please?', criterios: CRITERIOS_PAU_CORTOS, explicacion: 'Quejarse con educación: «Excuse me, I’m afraid…», decir cuál es el error y pedir que lo arreglen.' },
      { n: 3, tipo: 'redaccion', tipoTexto: 'situation', enunciado: 'c) Your cousin has just passed her university entrance exam. Congratulate her.', minPalabras: 10, maxPalabras: 25, modelo: 'Congratulations! I knew you could do it. You worked so hard this year, so you really deserve it. We have to celebrate!', criterios: CRITERIOS_PAU_CORTOS, explicacion: 'Felicitar: «Congratulations!», «Well done!», reconocer el esfuerzo y proponer celebrarlo.' },
      { n: 4, tipo: 'redaccion', tipoTexto: 'situation', enunciado: 'd) A tourist stops you in the street and asks how to get to the train station. Give directions.', minPalabras: 10, maxPalabras: 25, modelo: 'Of course. Go straight on until the traffic lights, then turn left. The station is on your right, opposite the park. It’s a five-minute walk.', criterios: CRITERIOS_PAU_CORTOS, explicacion: 'Dar indicaciones: imperativos (go straight on, turn left), referencias (traffic lights, opposite the park) y la distancia o el tiempo.' },
      { n: 5, tipo: 'redaccion', tipoTexto: 'situation', enunciado: 'e) Your teacher asks you why you did not hand in your project on time. Explain the reason.', minPalabras: 10, maxPalabras: 25, modelo: 'I’m sorry, I was ill last week and I couldn’t finish it. I’ve almost completed it now, so could I give it to you tomorrow?', criterios: CRITERIOS_PAU_CORTOS, explicacion: 'Explicar una razón: disculpa breve, causa en pasado y una propuesta para solucionarlo.' },
    ],
  },
  {
    id: 'pau-2-composition',
    examen: 'pau',
    destreza: 'prueba',
    parte: 6,
    nombreParte: 'Composition',
    examenNumero: 2,
    instrucciones:
      '6. Choose ONE of the following topics and WRITE a composition of about 140-180 words. If you choose the email, DO NOT SIGN it. (3 points)',
    minutos: 30,
    elegir: 1,
    items: [
      {
        n: 1,
        tipo: 'redaccion',
        tipoTexto: 'composition',
        enunciado: 'a) Should every secondary school have a vegetable garden? Give your opinion.',
        minPalabras: 140,
        maxPalabras: 180,
        modelo:
          'Many schools are looking for new ways to make learning more practical, and vegetable gardens have become popular. In my opinion, every secondary school should have one, because the benefits go far beyond biology lessons.\n\n' +
          'First of all, a garden teaches students where food comes from. Many teenagers have never seen a carrot growing, and when they plant one themselves they start to appreciate the work of farmers. Besides, working outside helps them relax, and teachers often notice that difficult students behave better after some time in the fresh air.\n\n' +
          'However, a garden needs space, water and somebody to look after it during the holidays, and not all schools can afford that. Some parents also worry that gardening takes time away from exams.\n\n' +
          'In my view, these problems can be solved if the whole school community takes part. A garden is not a waste of time but a different kind of classroom, and I believe every student deserves the chance to learn in it.',
        criterios: CRITERIOS_PAU_REDACCION,
        explicacion: 'Opinion essay: la postura en la introducción, un párrafo de razones a favor, otro con las pegas y una conclusión que vuelve a tu opinión. Conectores: first of all, besides, however, in my view. Entre 140 y 180 palabras.',
      },
      {
        n: 2,
        tipo: 'redaccion',
        tipoTexto: 'composition',
        enunciado: 'b) Eating only local products: advantages and disadvantages.',
        minPalabras: 140,
        maxPalabras: 180,
        modelo:
          'Nowadays we can buy fruit from the other side of the world at any time of the year, but more and more people are deciding to eat only products from their own region. Like everything, this choice has advantages and disadvantages.\n\n' +
          'On the one hand, local food is fresher, because it does not spend days in a lorry or a plane, and it usually tastes better. Moreover, buying from nearby farmers helps the local economy and reduces pollution, since the food travels shorter distances.\n\n' +
          'On the other hand, eating only local products can be limiting. In winter, the variety of fruit and vegetables is small, and some basic things, such as coffee or chocolate, cannot be grown in most countries. In addition, local products are sometimes more expensive than those sold in big supermarkets.\n\n' +
          'To sum up, I think that eating local food is a good habit, but it should not become a strict rule. The best option is to buy local when possible and enjoy other products from time to time.',
        criterios: CRITERIOS_PAU_REDACCION,
        explicacion: 'For & against: introducción neutra, un párrafo de ventajas (on the one hand, moreover), otro de inconvenientes (on the other hand, in addition) y una conclusión con tu opinión. No mezcles ventajas e inconvenientes en el mismo párrafo.',
      },
    ],
  },
];
