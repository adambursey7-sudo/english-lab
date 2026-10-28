import type { Ejercicio } from '../tipos';

// PAU de Canarias (EBAU) · Inglés · examen 1. Seis preguntas sobre un texto, nivel B1. Formato y criterios oficiales
// en docs/formatos.md. Texto y preguntas redactados de cero (nombres y lugares inventados).

const TEXTO =
  'In the small town of Marlow Bridge, the library has stopped being only about books. Since last spring, residents have been able to borrow a drill, a tent, a sewing machine or even a popcorn maker in the same way they borrow a novel. The idea, known as a “library of things”, came from Ruth Adeyemi, a librarian who was tired of seeing people buy expensive tools they would use once and then leave in a cupboard for years.\n\n' +
  '“Most people need a drill for about fifteen minutes a year,” Ruth explains. “It makes no sense for every house in the street to own one.” The library started with forty objects donated by local families and now has more than three hundred. Members pay a small annual fee, and each item can be kept for a week. The most popular things, according to Ruth, are not the tools but the party equipment: speakers, projectors and a chocolate fountain that is booked every weekend until Christmas.\n\n' +
  'Not everyone was convinced at first. Some older members complained that the library was becoming a shop, and a local hardware store worried about losing customers. However, the owner of the store, Dan Fletcher, now admits that the opposite has happened. “People borrow a tool, discover they like doing things themselves, and then come to me to buy materials,” he says. “My sales have actually gone up.”\n\n' +
  'The project has also had an unexpected social effect. Because members must return items in person, they often stay to chat, and a group of them has started a monthly repair evening where volunteers help fix broken objects for free. Ruth believes this is the real success of the scheme. “We wanted to save people money,” she says. “What we did not expect was to give them a reason to talk to their neighbours.” The town council is now studying whether to open a second library of things on the other side of the river.';

const CRITERIOS_PAU_CORTOS = [
  'Lo que escribo encaja con la situación o con la conversación (si el hueco acaba en «?», es una pregunta).',
  'Sin errores de gramática ni de ortografía: cada error baja la nota (0,25 → 0,20 → 0,15 → 0).',
  'Ni muy corto ni muy largo: en las situaciones, entre 10 y 25 palabras.',
];

const CRITERIOS_PAU_REDACCION = [
  'Presentación: párrafos claros, puntuación correcta.',
  'Organización: estructura del tipo de texto (email; for & against; opinion essay), registro adecuado, ideas enlazadas con conectores.',
  'Contenido: me ciño al tema, ideas suficientes y variadas, sin repeticiones.',
  'Corrección gramatical: frases bien construidas, variedad de estructuras, sin traducir del español.',
  'Vocabulario: rico y no copiado del texto; menos de 4 faltas de ortografía (más de 3 restan).',
];

export const PAU_EXAMEN_1: Ejercicio[] = [
  {
    id: 'pau-1-library-of-things',
    examen: 'pau',
    destreza: 'prueba',
    parte: 1,
    nombreParte: 'Comprensión del texto',
    examenNumero: 1,
    titulo: 'The library where you can borrow a drill',
    instrucciones:
      'Read the text and answer questions 1, 2 and 3. In question 1, copy the exact words from the text as evidence; in question 2, copy no more than 10 words; in question 3, find the word in the text that matches each definition.',
    minutos: 25,
    texto: TEXTO,
    items: [
      {
        n: 1,
        tipo: 'verdaderoFalso',
        pregunta: '1. Say whether the following sentences are TRUE or FALSE according to the text. COPY the evidence from the text. No marks will be given without the evidence. (1.5 points)',
        afirmacion: 'a) The library of things began with objects bought by the town council.',
        correcta: false,
        pruebas: ['The library started with forty objects donated by local families', 'started with forty objects donated by local families'],
        explicacion: 'FALSE: los objetos los donaron las familias, no los compró el ayuntamiento. La prueba hay que copiarla tal cual del texto: ni con puntos suspensivos ni con el número de línea.',
      },
      {
        n: 2,
        tipo: 'verdaderoFalso',
        afirmacion: 'b) The hardware store has sold more since the library of things opened.',
        correcta: true,
        pruebas: ['My sales have actually gone up', '“My sales have actually gone up.”', 'the owner of the store, Dan Fletcher, now admits that the opposite has happened'],
        explicacion: 'TRUE: «My sales have actually gone up». También vale la frase anterior sobre que ha pasado lo contrario de lo que temía.',
      },
      {
        n: 3,
        tipo: 'verdaderoFalso',
        afirmacion: 'c) Ruth thinks that saving money is the most important result of the project.',
        correcta: false,
        pruebas: ['Ruth believes this is the real success of the scheme', 'What we did not expect was to give them a reason to talk to their neighbours'],
        explicacion: 'FALSE: para Ruth el verdadero éxito es el efecto social (la gente habla con sus vecinos), no el ahorro.',
      },
      {
        n: 4,
        tipo: 'palabra',
        pregunta: '2. ANSWER the questions below. COPY no more than 10 words and/or a number from the text to answer each question. (1.5 points)\na) How long can a member keep an object?',
        correctas: ['each item can be kept for a week', 'a week', 'for a week', 'kept for a week'],
        maxPalabras: 10,
        explicacion: '«Each item can be kept for a week». Hay que copiar del texto, no parafrasear («one week» no vale si no está escrito así).',
      },
      {
        n: 5,
        tipo: 'palabra',
        pregunta: 'b) Which objects do people borrow most often?',
        correctas: ['the party equipment', 'party equipment', 'speakers, projectors and a chocolate fountain', 'not the tools but the party equipment'],
        maxPalabras: 10,
        explicacion: '«The most popular things… are not the tools but the party equipment: speakers, projectors and a chocolate fountain».',
      },
      {
        n: 6,
        tipo: 'palabra',
        pregunta: 'c) What is the town council considering doing?',
        correctas: ['open a second library of things', 'to open a second library of things', 'whether to open a second library of things', 'open a second library of things on the other side of the river', 'to open a second library of things on the other side of the river'],
        maxPalabras: 10,
        explicacion: '«The town council is now studying whether to open a second library of things on the other side of the river» (hasta 10 palabras copiadas).',
      },
      {
        n: 7,
        tipo: 'palabra',
        pregunta: '3. FIND a word or expression in the text that means… (1 point)\nd) people who live in a place (paragraph 1)',
        correctas: ['residents'],
        explicacion: '«residents have been able to borrow a drill». Hay que escribir la palabra tal cual aparece en el texto.',
      },
      {
        n: 8,
        tipo: 'palabra',
        pregunta: 'e) given as a gift, without payment (paragraph 2)',
        correctas: ['donated'],
        explicacion: '«forty objects donated by local families».',
      },
      {
        n: 9,
        tipo: 'palabra',
        pregunta: 'f) accepts that something is true, although unwillingly (paragraph 3)',
        correctas: ['admits'],
        explicacion: '«Dan Fletcher, now admits that the opposite has happened».',
      },
      {
        n: 10,
        tipo: 'palabra',
        pregunta: 'g) not expected (paragraph 4)',
        correctas: ['unexpected'],
        explicacion: '«an unexpected social effect».',
      },
    ],
  },
  {
    id: 'pau-1-conversation-trip',
    examen: 'pau',
    destreza: 'prueba',
    parte: 4,
    nombreParte: 'Complete a conversation',
    examenNumero: 1,
    titulo: 'Planning a weekend trip with a friend',
    instrucciones:
      '4. READ this conversation and COMPLETE your part. Write the numbers (1-6) and complete each sentence on your exam paper. (1.5 points) If a gap ends with a question mark, you must write a question.',
    minutos: 10,
    texto:
      'Your friend: I’ve been thinking we should go somewhere this weekend. Just the two of us.\n' +
      'You: Great idea! {{1}}\n' +
      'Your friend: Somewhere by the sea, I think. I need a break from the city.\n' +
      'You: And {{2}}?\n' +
      'Your friend: By bus. It’s cheaper than the train and it leaves from the station near my house.\n' +
      'You: Perfect. {{3}}\n' +
      'Your friend: I had thought about it, but I don’t know any good places to stay.\n' +
      'You: Don’t worry, my cousin lives there. {{4}}\n' +
      'Your friend: That would be fantastic!\n' +
      'You: And {{5}}?\n' +
      'Your friend: Let’s leave on Friday after class, so we have two whole days.\n' +
      'Your friend: I’m really looking forward to it.\n' +
      'You: {{6}}',
    items: [
      { n: 1, tipo: 'redaccion', tipoTexto: 'dialogue', enunciado: 'Hueco 1', minPalabras: 2, maxPalabras: 25, modelo: 'Where would you like to go?  /  Have you got any place in mind?', criterios: CRITERIOS_PAU_CORTOS, explicacion: 'La respuesta del amigo («Somewhere by the sea») indica que preguntas adónde ir.' },
      { n: 2, tipo: 'redaccion', tipoTexto: 'dialogue', enunciado: 'Hueco 2 (acaba en «?»: tiene que ser una pregunta)', minPalabras: 2, maxPalabras: 25, modelo: 'how are we getting there  /  how will we travel', criterios: CRITERIOS_PAU_CORTOS, explicacion: 'Contesta «By bus», así que preguntas cómo ir. Ojo: el «And» ya está escrito y el «?» también.' },
      { n: 3, tipo: 'redaccion', tipoTexto: 'dialogue', enunciado: 'Hueco 3', minPalabras: 2, maxPalabras: 25, modelo: 'Have you booked a hotel yet?  /  Have you thought about where we’ll sleep?', criterios: CRITERIOS_PAU_CORTOS, explicacion: '«I had thought about it, but I don’t know any good places to stay» responde a una pregunta sobre el alojamiento.' },
      { n: 4, tipo: 'redaccion', tipoTexto: 'dialogue', enunciado: 'Hueco 4', minPalabras: 2, maxPalabras: 25, modelo: 'I’m sure she can let us stay at her place.  /  I’ll ask him if we can sleep at his flat.', criterios: CRITERIOS_PAU_CORTOS, explicacion: 'Después de «my cousin lives there» y antes de «That would be fantastic!»: ofreces que os deje dormir allí.' },
      { n: 5, tipo: 'redaccion', tipoTexto: 'dialogue', enunciado: 'Hueco 5 (acaba en «?»: tiene que ser una pregunta)', minPalabras: 2, maxPalabras: 25, modelo: 'when do you want to leave  /  when shall we go', criterios: CRITERIOS_PAU_CORTOS, explicacion: 'Contesta «Let’s leave on Friday after class»: preguntas cuándo salir.' },
      { n: 6, tipo: 'redaccion', tipoTexto: 'dialogue', enunciado: 'Hueco 6', minPalabras: 2, maxPalabras: 25, modelo: 'Me too! It’s going to be a great weekend.  /  So am I. I can’t wait!', criterios: CRITERIOS_PAU_CORTOS, explicacion: 'Cierra la conversación respondiendo a «I’m really looking forward to it» con el mismo entusiasmo.' },
    ],
  },
  {
    id: 'pau-1-situations',
    examen: 'pau',
    destreza: 'prueba',
    parte: 5,
    nombreParte: 'Comment on a situation',
    examenNumero: 1,
    instrucciones:
      '5. Choose ONLY 3 of the following situations and WRITE what you would say in each one to show that you understand the context of the situation. Write between 10 and 25 words. (1.5 points) Only the first three you answer will be marked.',
    minutos: 10,
    elegir: 3,
    items: [
      { n: 1, tipo: 'redaccion', tipoTexto: 'situation', enunciado: 'a) “Students should be allowed to use their phones in class,” your classmate says. Give your opinion.', minPalabras: 10, maxPalabras: 25, modelo: 'I don’t agree with you. Phones are really distracting, and most of us would end up chatting instead of listening to the teacher.', criterios: CRITERIOS_PAU_CORTOS, explicacion: 'Acto de habla: dar una opinión («I think / I don’t agree because…») con una razón. 10–25 palabras.' },
      { n: 2, tipo: 'redaccion', tipoTexto: 'situation', enunciado: 'b) Your neighbour asks you how your driving test went. Inform her about it.', minPalabras: 10, maxPalabras: 25, modelo: 'It went really well, thanks! I was nervous at the beginning, but I passed, so I can finally drive to school next week.', criterios: CRITERIOS_PAU_CORTOS, explicacion: 'Informar: contar cómo fue, en pasado, con un detalle.' },
      { n: 3, tipo: 'redaccion', tipoTexto: 'situation', enunciado: 'c) You arrive at the cinema and realise you have left the tickets at home. Suggest a solution to your friend.', minPalabras: 10, maxPalabras: 25, modelo: 'I’m so sorry! Why don’t we show them the confirmation email on my phone? I’m sure they’ll let us in with that.', criterios: CRITERIOS_PAU_CORTOS, explicacion: 'Sugerir una solución: «Why don’t we…?», «We could…», «How about…?».' },
      { n: 4, tipo: 'redaccion', tipoTexto: 'situation', enunciado: 'd) You promised to help your brother with his homework but you forgot. Apologise.', minPalabras: 10, maxPalabras: 25, modelo: 'I’m really sorry, I completely forgot about your homework. Let’s do it right now, and I promise it won’t happen again.', criterios: CRITERIOS_PAU_CORTOS, explicacion: 'Pedir perdón: «I’m really sorry…», explicar y ofrecer compensar.' },
      { n: 5, tipo: 'redaccion', tipoTexto: 'situation', enunciado: 'e) Your aunt invites you to spend the summer working on her farm. Refuse politely.', minPalabras: 10, maxPalabras: 25, modelo: 'Thank you so much for the offer, but I’m afraid I can’t this summer. I’ve already signed up for an English course abroad.', criterios: CRITERIOS_PAU_CORTOS, explicacion: 'Rechazar con educación: agradecer, «I’m afraid I can’t…» y dar una razón.' },
    ],
  },
  {
    id: 'pau-1-composition',
    examen: 'pau',
    destreza: 'prueba',
    parte: 6,
    nombreParte: 'Composition',
    examenNumero: 1,
    instrucciones:
      '6. Choose ONE of the following topics and WRITE a composition of about 140-180 words. If you choose the email, DO NOT SIGN it. (3 points)',
    minutos: 30,
    elegir: 1,
    items: [
      {
        n: 1,
        tipo: 'redaccion',
        tipoTexto: 'composition',
        enunciado: 'a) Is it better to borrow things or to own them? Give your opinion.',
        minPalabras: 140,
        maxPalabras: 180,
        modelo:
          'Nowadays many people own things they hardly ever use, so the question of whether we should borrow instead of buy is more important than ever. In my opinion, borrowing is usually the better choice, although it depends on the object.\n\n' +
          'On the one hand, borrowing saves money and space. Most of us need a drill or a tent only once or twice a year, and it makes no sense to pay a lot for something that will spend its life in a cupboard. Moreover, sharing things is good for the environment, because fewer products have to be made and thrown away.\n\n' +
          'On the other hand, there are objects we use every day, such as a phone or a bike, and owning them is more practical. Besides, some people feel uncomfortable using things that belong to others and worry about breaking them.\n\n' +
          'To sum up, I believe we should own the things we use constantly and borrow the rest. It is cheaper, greener and, as the library in the text shows, it can even help us meet our neighbours.',
        criterios: CRITERIOS_PAU_REDACCION,
        explicacion: 'Opinion essay: introducción con la postura, un párrafo por idea con conectores (on the one hand, moreover, besides, to sum up), conclusión. Entre 140 y 180 palabras: por debajo de 140 baja el tope de nota.',
      },
      {
        n: 2,
        tipo: 'redaccion',
        tipoTexto: 'email',
        enunciado: 'b) Write an email to a friend from another town telling him or her about the library of things and suggesting that you both visit it together.',
        minPalabras: 140,
        maxPalabras: 180,
        modelo:
          'Hi Marta,\n\n' +
          'How are you? I hope your exams are going well. I’m writing because I’ve just discovered something in my town that I think you’ll love.\n\n' +
          'Our library has become a “library of things”. Instead of only books, you can now borrow tools, a tent, a projector and even a chocolate fountain! You pay a small fee once a year and you can keep each object for a week. I borrowed a sewing machine last weekend and finally repaired my old jacket.\n\n' +
          'The best part is that there is a repair evening every month, where volunteers help you fix broken things for free. Everyone is really friendly and I’ve met lots of people from the neighbourhood.\n\n' +
          'Why don’t you come next Saturday? We could borrow a couple of bikes and then go to the repair evening together. You could stay at my place, of course.\n\n' +
          'Let me know if you can make it.\n\n' +
          'Lots of love,',
        criterios: CRITERIOS_PAU_REDACCION,
        explicacion: 'Email informal: saludo, motivo, cuerpo con los datos del texto contados con tus palabras (no copiados), propuesta («Why don’t you…?») y despedida SIN firmar.',
      },
    ],
  },
];
