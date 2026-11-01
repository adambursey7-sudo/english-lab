import type { Ejercicio } from '../tipos';
import { INSTRUCCIONES, NOMBRES_PARTE } from './use-of-english';
import { NOMBRES_PARTE_READING } from './reading';

// Cambridge C1 Advanced · Reading and Use of English · examen 3 (Parts 1–8). Redactado de cero, al estilo del examen.
// Formato oficial en docs/formatos.md.

export const READING_USE_C1_3: Ejercicio[] = [
  {
    id: 'c1-rue-1-dark-skies-3',
    examen: 'c1',
    destreza: 'reading-use',
    parte: 1,
    nombreParte: NOMBRES_PARTE[1],
    examenNumero: 3,
    titulo: 'Losing the stars',
    instrucciones: INSTRUCCIONES[1],
    minutos: 10,
    texto:
      'For most of human history, anyone who looked up on a clear night could see the Milky Way arching overhead like a river of pale light. Today, a growing number of people have never seen it. Streetlights, illuminated signs and floodlit car parks combine to produce a permanent glow that {{1}} out the stars, a problem {{2}} as light pollution.\n\n' +
      'Campaigners are now {{3}} pressure on councils to create “dark sky reserves”, areas where outdoor lighting is strictly controlled. Visitors to one such reserve often {{4}} the experience as deeply moving, and some say it has changed the way they think about their place in the universe. Local businesses have been quick to {{5}} advantage of the new interest by offering stargazing weekends. Critics argue that dimming the lights will make streets feel less safe, but the evidence {{6}} that this fear is largely unfounded. In fact, well-designed lighting, which shines downwards and only where it is needed, can be both safer and cheaper, and several councils are now {{7}} to the idea. Progress is likely to be slow, however, since many residents {{8}} to the belief that bright streets are safe streets.',
    items: [
      { n: 1, tipo: 'opciones', opciones: ['blots', 'fades', 'sweeps', 'rubs'], correcta: 0, explicacion: '«Blot out» = tapar por completo, borrar de la vista. «Fade out» es intransitivo en este sentido, y «sweep out» y «rub out» no encajan con las estrellas.' },
      { n: 2, tipo: 'opciones', opciones: ['known', 'called', 'named', 'titled'], correcta: 0, explicacion: '«Known as» = conocido como. Con «called» y «named» no se pone «as», y «titled» se usa con libros o películas.' },
      { n: 3, tipo: 'opciones', opciones: ['making', 'setting', 'putting', 'giving'], correcta: 2, explicacion: '«Put pressure on somebody (to do something)» = presionar a alguien. Es la única colocación posible con «pressure on».' },
      { n: 4, tipo: 'opciones', opciones: ['describe', 'explain', 'tell', 'name'], correcta: 0, explicacion: '«Describe something as…» = calificar algo de. «Explain» y «tell» no se construyen con «as», y «name» tampoco encaja en este sentido.' },
      { n: 5, tipo: 'opciones', opciones: ['make', 'have', 'take', 'use'], correcta: 2, explicacion: '«Take advantage of» = aprovechar. Expresión fija; con los otros verbos habría que decir «make use of» o «have the advantage of».' },
      { n: 6, tipo: 'opciones', opciones: ['advises', 'suggests', 'recommends', 'proposes'], correcta: 1, explicacion: '«The evidence suggests that…» = los datos indican que. «Advise» y «recommend» se usan con personas y consejos, y «propose» no encaja con «evidence».' },
      { n: 7, tipo: 'opciones', opciones: ['heating', 'turning', 'warming', 'leaning'], correcta: 2, explicacion: '«Warm to an idea» = empezar a gustarle a uno una idea. «Lean» pide «towards», y «turn» o «heat» no forman esta expresión.' },
      { n: 8, tipo: 'opciones', opciones: ['fix', 'tie', 'grasp', 'cling'], correcta: 3, explicacion: '«Cling to a belief» = aferrarse a una creencia. «Fix», «tie» y «grasp» no van con «to» en este sentido.' },
    ],
  },
  {
    id: 'c1-rue-2-handwriting-3',
    examen: 'c1',
    destreza: 'reading-use',
    parte: 2,
    nombreParte: NOMBRES_PARTE[2],
    examenNumero: 3,
    titulo: 'The surprising power of handwriting',
    instrucciones: INSTRUCCIONES[2],
    minutos: 10,
    texto:
      'In an age of keyboards and touchscreens, it would be easy to assume that handwriting is a skill {{9}} is dying out. {{10}} the contrary, a growing body of research suggests that writing by hand may be more valuable than ever. In one well-known experiment, students who took notes with a pen remembered considerably {{11}} of a lecture than those who typed, apparently because they could not write down every word and were forced to decide what mattered.\n\n' +
      'Handwriting also seems to help young children learn to read. Those who practise forming letters {{12}} hand recognise them faster than children who only see them on a screen. {{13}} the benefits, however, many schools have cut back on handwriting lessons to make room for computer skills. Teachers who regret this point out that the two do not have to be taught {{14}} the expense of each other.\n\n' +
      'Not everyone is convinced. Some argue that, {{15}} long as pupils can type quickly, the way in which they record information is irrelevant. Yet there is no need for the choice to be one {{16}} the other, and anyone who has ever stared at a blank page knows that a pen can sometimes unlock ideas that a keyboard never does.',
    items: [
      { n: 9, tipo: 'palabra', correctas: ['that', 'which'], explicacion: 'Pronombre relativo con antecedente «skill»: «a skill that / which is dying out».' },
      { n: 10, tipo: 'palabra', correctas: ['on'], explicacion: '«On the contrary» = al contrario. Expresión fija; no vale «in».' },
      { n: 11, tipo: 'palabra', correctas: ['more'], explicacion: '«Considerably more of a lecture than…»: comparativo de cantidad, con «than» después.' },
      { n: 12, tipo: 'palabra', correctas: ['by'], explicacion: '«By hand» = a mano. Expresión fija con «by» para el modo de hacer algo.' },
      { n: 13, tipo: 'palabra', correctas: ['despite'], explicacion: '«Despite the benefits» = a pesar de las ventajas: concesión seguida de un sustantivo. «In spite of» son tres palabras y no cabe en un solo hueco.' },
      { n: 14, tipo: 'palabra', correctas: ['at'], explicacion: '«At the expense of» = a costa de. Expresión fija.' },
      { n: 15, tipo: 'palabra', correctas: ['as', 'so'], explicacion: '«As long as / so long as» = siempre que, con tal de que.' },
      { n: 16, tipo: 'palabra', correctas: ['or'], explicacion: '«One or the other» = lo uno o lo otro. La estructura es «one… or the other».' },
    ],
  },
  {
    id: 'c1-rue-3-museums-3',
    examen: 'c1',
    destreza: 'reading-use',
    parte: 3,
    nombreParte: NOMBRES_PARTE[3],
    examenNumero: 3,
    titulo: 'The museum of today',
    instrucciones: INSTRUCCIONES[3],
    minutos: 10,
    texto:
      'Museums used to have a reputation for being {{17}} places, full of glass cases and hushed voices. Today, many of them are doing everything they can to change that image. Visitors are encouraged to touch objects, to take part in {{18}} workshops and even to sleep overnight among the exhibits. The {{19}} of this approach is clear: attendance figures have risen sharply wherever it has been tried.\n\n' +
      'Some experts, however, are {{20}} about the trend, arguing that a museum’s first duty is the {{21}} of its collections rather than the entertainment of its visitors. They fear that too much emphasis on fun may make people less {{22}} to concentrate on the objects themselves. Defenders of the new style point out that a museum that nobody visits is of little {{23}} to anyone. It is {{24}}, then, that most directors now see the future in a compromise.',
    items: [
      { n: 17, tipo: 'palabra', raiz: 'ATTRACT', correctas: ['unattractive'], explicacion: 'Adjetivo con prefijo negativo: «unattractive places» = lugares poco atractivos. El contexto (cristal, voces bajas) pide un sentido negativo.' },
      { n: 18, tipo: 'palabra', raiz: 'ACT', correctas: ['interactive'], explicacion: 'Adjetivo delante de «workshops»: «interactive workshops» = talleres en los que se participa. La raíz es «ACT»: inter-act-ive.' },
      { n: 19, tipo: 'palabra', raiz: 'SUCCEED', correctas: ['success'], explicacion: 'Sustantivo tras «the»: «the success of this approach». Ojo: succeed → success (se pierde la «d», se gana una «s»).' },
      { n: 20, tipo: 'palabra', raiz: 'CAUTION', correctas: ['cautious'], explicacion: 'Adjetivo tras «are»: «cautious about the trend» = recelosos ante la moda. Sin la «n» final de «caution».' },
      { n: 21, tipo: 'palabra', raiz: 'PRESERVE', correctas: ['preservation'], explicacion: 'Sustantivo tras «the» y antes de «of»: «the preservation of its collections» = la conservación de sus colecciones. Cambia la «v» por «vation».' },
      { n: 22, tipo: 'palabra', raiz: 'INCLINE', correctas: ['inclined'], explicacion: '«Less inclined to concentrate» = menos dispuestos a concentrarse. El participio «inclined» + infinitivo con «to».' },
      { n: 23, tipo: 'palabra', raiz: 'RELEVANT', correctas: ['relevance'], explicacion: 'Sustantivo tras «of little»: «of little relevance» = de poca importancia. No «relevancy», que es poco habitual.' },
      { n: 24, tipo: 'palabra', raiz: 'SURPRISE', correctas: ['unsurprising'], explicacion: 'Adjetivo negativo tras «It is… then, that»: «unsurprising» = nada sorprendente. El prefijo negativo es obligatorio por el sentido.' },
    ],
  },
  {
    id: 'c1-rue-4-set-3',
    examen: 'c1',
    destreza: 'reading-use',
    parte: 4,
    nombreParte: NOMBRES_PARTE[4],
    examenNumero: 3,
    instrucciones: INSTRUCCIONES[4],
    minutos: 12,
    items: [
      {
        n: 25, tipo: 'transformacion', clave: 'WISH',
        frase: 'I regret not saving more money when I was younger.',
        inicio: 'I', fin: 'more money when I was younger.',
        correctas: ['wish i had saved', 'wish i would have saved'],
        explicacion: '«Wish + past perfect» expresa arrepentimiento por el pasado: «I wish I had saved». No sirve «wish I saved», que se refiere al presente.',
      },
      {
        n: 26, tipo: 'transformacion', clave: 'HAVE',
        frase: 'A mechanic is going to service our car on Friday.',
        inicio: 'We are going', fin: 'on Friday.',
        correctas: ['to have our car serviced', 'to have the car serviced'],
        explicacion: 'Estructura causativa: «have + objeto + participio» = encargar que alguien haga algo: «to have our car serviced». No es «we service».',
      },
      {
        n: 27, tipo: 'transformacion', clave: 'LIKELY',
        frase: 'It is probable that the manager will accept the proposal.',
        inicio: 'The manager', fin: 'the proposal.',
        correctas: ['is likely to accept', 'is very likely to accept'],
        explicacion: '«Be likely to + infinitivo» = ser probable que. Con «likely» el sujeto de la frase pasa a ser «the manager», no «it».',
      },
      {
        n: 28, tipo: 'transformacion', clave: 'USED',
        frase: 'The noise from the road no longer bothers us.',
        inicio: 'We have', fin: 'the noise from the road.',
        correctas: ['got used to', 'become used to', 'grown used to', 'gotten used to'],
        explicacion: '«Get / become / grow used to + sustantivo» = acostumbrarse a. Con «have» hace falta un participio: «got» o «become» o «grown», seguido de «used to».',
      },
      {
        n: 29, tipo: 'transformacion', clave: 'PROVIDED',
        frase: 'You can borrow my car if you promise to drive carefully.',
        inicio: 'You can borrow my car', fin: 'drive carefully.',
        correctas: ['provided that you promise to', 'provided you promise to'],
        explicacion: '«Provided (that)» = con tal de que, y sustituye a «if». Después sigue la oración completa: «provided that you promise to drive carefully».',
      },
      {
        n: 30, tipo: 'transformacion', clave: 'SUCH',
        frase: 'The film was so frightening that I could not watch the end.',
        inicio: 'It was', fin: 'that I could not watch the end.',
        correctas: ['such a frightening film', 'such a frightening movie'],
        explicacion: '«Such a + adjetivo + sustantivo + that» = tan… que. Con «so» se usa el adjetivo solo; con «such» hace falta el sustantivo: «such a frightening film».',
      },
    ],
  },
  {
    id: 'c1-rue-5-last-customer-3',
    examen: 'c1',
    destreza: 'reading-use',
    parte: 5,
    nombreParte: NOMBRES_PARTE_READING[5],
    examenNumero: 3,
    titulo: 'The last customer',
    instrucciones:
      'You are going to read an extract from a novel in which a man is closing down his shop. For questions 31–36, choose the answer (A, B, C or D) which you think fits best according to the text.',
    minutos: 15,
    texto:
      'The sign on the door of Hollis & Son, Shoe Repairs, had said CLOSED since Tuesday, but Walter Hollis had come in anyway, as he had every morning for forty-one years, because he could think of nothing else to do with his hands. He put the kettle on. He sat on the high stool behind the counter. For a while he listened to the shop, which made the small, settling noises of a place that had not yet realised it was no longer wanted.\n\n' +
      'His son had been very reasonable about it. Daniel had come up from the city at the weekend, in a suit that did not belong in the shop, and had presented the figures on the counter like a doctor with an X-ray. Nobody mended shoes any more, he said. People bought new ones for the price of a repair. The rent had increased again, and there was a coffee chain that was desperate for the lease. He had said all this gently, and Walter had nodded in all the right places and had said that he quite understood, which was true. Understanding had never been the difficulty.\n\n' +
      'What nobody had mentioned was the smell. Leather and glue and polish: it was in his clothes and in his hair, and Marjorie used to say that she could find him in the dark by it. It occurred to him now that when the shop was empty and cleaned, as the agent insisted it must be by the end of the month, the smell would be the last thing to leave, and that he would not be able to say exactly when it had gone.\n\n' +
      'At ten past nine the bell rang. A girl of perhaps sixteen stood in the doorway holding a pair of white trainers by their laces, as if they might bite. “Are you open?” she said. Walter opened his mouth to say that he was not. “Depends what’s wrong with them,” he heard himself say instead. She put the trainers on the counter. The sole of the left one had come away from the upper in a gaping, grinning split, and she explained that she had worn them to a friend’s party, that her mother had been, in her words, “actually quite scary” about it, and that she had no money until Friday. Walter turned the shoe over in his hands. It was inexpensive, glued rather than stitched, and not really worth the trouble. Any sensible person would have told her to buy another pair.\n\n' +
      '“Come back at four,” he said. He worked deliberately, with the door locked and the sign still reading CLOSED, and he was surprised by how little he had forgotten. The glue, the clamp, the sewing awl he had not touched in months: his hands knew where everything was. At one point he caught himself humming. When the girl came back, she turned the trainers over and over as if to check they were real. “Thank you,” she said. “Seriously. Everyone else just said to chuck them.” He said that it had been no trouble, and found, to his surprise, that this was true.\n\n' +
      'After she had gone, Walter stood for a considerable time in the empty shop. Nothing had changed. The rent was still due, Daniel’s figures were still on the back of an envelope by the till, and in three weeks a young man in an apron would be selling coffee where he stood. But he found that he was no longer listening to the shop for signs of its ending. He took down the sign, turned it over and, after considering for a moment, wrote on the back in pencil: “Open until the end of the month. Repairs while you wait.” Then he put the kettle on again.',
    items: [
      {
        n: 31,
        tipo: 'opciones',
        pregunta: 'What does the first paragraph suggest about Walter?',
        opciones: ['He was hoping that a customer would turn up.', 'He found it difficult to adjust to the idea that the shop was finished.', 'He was relieved that he no longer had to work every day.', 'He was worried that someone might break into the shop.'],
        correcta: 1,
        explicacion: 'Sigue yendo cada mañana «because he could think of nothing else to do with his hands» y la tienda «had not yet realised it was no longer wanted»: le cuesta asumir que ha terminado (B). No espera clientes (A), no habla de alivio (C) ni de ladrones (D).',
      },
      {
        n: 32,
        tipo: 'opciones',
        pregunta: 'How did Walter react to his son’s explanation?',
        opciones: ['He felt that Daniel was being unfair to him.', 'He accepted that his son’s reasoning was sound.', 'He was annoyed that Daniel had not visited sooner.', 'He hoped that Daniel would offer him some money.'],
        correcta: 1,
        explicacion: '«Said that he quite understood, which was true». Daniel habló «gently» y «very reasonable» (A no). No hay reproche por las visitas (C) ni petición de dinero (D). La frase final, «Understanding had never been the difficulty», muestra que entiende pero le duele.',
      },
      {
        n: 33,
        tipo: 'opciones',
        pregunta: 'Why does the writer mention the smell in the third paragraph?',
        opciones: ['to show that Walter had become tired of his work', 'to explain why the shop needs a thorough clean', 'to suggest that Walter would lose his past gradually, almost without noticing', 'to hint that Marjorie had not liked the shop'],
        correcta: 2,
        explicacion: '«The smell would be the last thing to leave, and he would not be able to say exactly when it had gone»: lo que le une a su vida (y a Marjorie) se irá poco a poco, sin que se dé cuenta (C). No hay cansancio (A) ni crítica de Marjorie, que lo encontraba por el olor (D).',
      },
      {
        n: 34,
        tipo: 'opciones',
        pregunta: 'What does Walter’s response to the girl in the fourth paragraph show?',
        opciones: ['He realised at once that the shoe could not be mended.', 'He acted before he had really made up his mind.', 'He wanted to teach the girl a lesson about taking care of her things.', 'He was reluctant because he was short of time.'],
        correcta: 1,
        explicacion: '«Walter opened his mouth to say that he was not. “Depends what’s wrong with them,” he heard himself say instead»: dice lo contrario de lo que pensaba decir (B). La zapatilla «was not really worth the trouble» pero la arregla (A no), y no hay lección ni prisa (C y D).',
      },
      {
        n: 35,
        tipo: 'opciones',
        pregunta: 'How did Walter feel while he was repairing the trainers?',
        opciones: ['anxious that he might have lost his skill', 'pleased at how much he still remembered', 'resentful that he had agreed to help', 'impatient to finish before anyone saw him'],
        correcta: 1,
        explicacion: '«He was surprised by how little he had forgotten… his hands knew where everything was. At one point he caught himself humming» (B). Trabaja «slowly», con la puerta cerrada, pero no por vergüenza ni por prisa (D no); no hay ansiedad ni resentimiento (A y C).',
      },
      {
        n: 36,
        tipo: 'opciones',
        pregunta: 'What is suggested by the final paragraph?',
        opciones: ['Walter has decided to ignore his son’s advice for good.', 'Walter’s attitude to the end of the shop has changed, although the facts have not.', 'Walter expects the girl to bring other customers.', 'Walter regrets having repaired the trainers for nothing.'],
        correcta: 1,
        explicacion: '«Nothing had changed. The rent was still due… But he found that he was no longer listening to the shop for signs of its ending» (B). Los hechos siguen igual: el cartel solo dice que abrirá «until the end of the month», así que no ignora el consejo de Daniel (A no). No menciona a más clientes ni se arrepiente (C y D).',
      },
    ],
  },
  {
    id: 'c1-rue-6-libraries-3',
    examen: 'c1',
    destreza: 'reading-use',
    parte: 6,
    nombreParte: NOMBRES_PARTE_READING[6],
    examenNumero: 3,
    titulo: 'Public libraries',
    instrucciones:
      'You are going to read four extracts from articles in which writers give their views on the future of public libraries. For questions 37–40, choose from the writers A–D. The writers may be chosen more than once.',
    minutos: 12,
    secciones: [
      {
        letra: 'A',
        texto:
          'I grew up in a house with no books, and what turned me into a reader was a Saturday-morning habit: my mother walked me to the library, and a woman behind the desk, whose name I have never forgotten, put a book in my hand and said that I might like it. That is not a luxury; it is how a country produces readers, and it should be paid for the way we pay for roads, out of local taxation, with qualified staff on the payroll. I am suspicious of the fashion for rescuing closing branches with volunteers. Kind people cannot do the work of a trained librarian, and a service that depends on goodwill will disappear the day the goodwill runs out. Nor do I want my library turned into a leisure centre with a bookshelf in the corner. A quiet room, a long table and the right book: that is quite enough.',
      },
      {
        letra: 'B',
        texto:
          'For many children, the library is where reading begins, and anyone who doubts that should spend a Saturday in ours. But I would be the last person to claim that books are the whole story. Our branch now hosts a baby-rhyme session, a job club, a repair café and a Thursday lunch for people who might otherwise speak to nobody all week. I see no shame in the fact that we earn a good part of our keep by hiring out rooms and running a small café; councils are never going to pay for everything, and the volunteers who help out on those days are, in my experience, at least as committed as the paid staff. The libraries that survive will be the ones prepared to be useful to more kinds of people than they were a hundred years ago.',
      },
      {
        letra: 'C',
        texto:
          'People who defend libraries have a habit of describing what they were like in 1985. Nobody under forty goes out to borrow a novel when the same novel is on a phone in thirty seconds, and I see no reason why shelves of paper should be heated and lit at the public’s expense. What people really come for these days is a warm room, a reliable wifi connection and some company, which are perfectly good things to offer but have little to do with books. If a village wants its library to stay open, let it find volunteers and let those who use it contribute a modest fee; I do not accept that it is the business of the taxpayer. The sooner we admit that the book collection is no longer the point, the sooner something better can take its place.',
      },
      {
        letra: 'D',
        texto:
          'It is easy to be sentimental about libraries, and just as easy to dismiss them, but both reactions miss what they actually do. A library gives an old man somewhere to read the paper in the warm, a student somewhere to work without having to buy a coffee, and a family without a computer a way to apply for a job. These benefits are real but hard to measure, and that is exactly why they get cut. I do not think the answer is to run libraries on goodwill. Volunteers are a wonderful addition to a service, not a substitute for the people who know where to find what you need. And the printed book matters too: browse a shelf and you find the one you were not looking for. A library is a public good, and public goods are paid for by the public, through taxes.',
      },
    ],
    opcionesComunes: ['Writer A', 'Writer B', 'Writer C', 'Writer D'],
    items: [
      {
        n: 37,
        tipo: 'emparejar',
        pregunta: 'Which writer shares Writer A’s view on the use of volunteers in libraries?',
        correcta: 3,
        explicacion: 'A desconfía de salvar bibliotecas con voluntarios («Kind people cannot do the work of a trained librarian»). B lo ve bien («at least as committed as the paid staff») y C lo propone («let it find volunteers»). D coincide con A: «Volunteers are a wonderful addition… not a substitute for the people who know where to find what you need».',
      },
      {
        n: 38,
        tipo: 'emparejar',
        pregunta: 'Which writer has a different opinion from the others about the importance of printed books in libraries?',
        correcta: 2,
        explicacion: 'A («the right book»), B («where reading begins») y D («the printed book matters too») los defienden. C es la única en contra: «shelves of paper should be heated and lit at the public’s expense… the book collection is no longer the point».',
      },
      {
        n: 39,
        tipo: 'emparejar',
        pregunta: 'Which writer shares Writer A’s opinion about the role of libraries in children’s reading?',
        correcta: 1,
        explicacion: 'A: la biblioteca «is how a country produces readers». B coincide: «For many children, the library is where reading begins». C y D no hablan de los niños.',
      },
      {
        n: 40,
        tipo: 'emparejar',
        pregunta: 'Which writer shares Writer D’s view on who should pay for libraries?',
        correcta: 0,
        explicacion: 'D: «public goods are paid for by the public, through taxes». A coincide: «out of local taxation». B defiende que la biblioteca se financie en gran parte sola (alquiler de salas, café) y C quiere que paguen los usuarios («a modest fee») y no el contribuyente.',
      },
    ],
  },
  {
    id: 'c1-rue-7-apple-detective-3',
    examen: 'c1',
    destreza: 'reading-use',
    parte: 7,
    nombreParte: NOMBRES_PARTE_READING[7],
    examenNumero: 3,
    titulo: 'The apple detective',
    instrucciones:
      'You are going to read an article about a woman who set out to find a lost variety of apple. Six paragraphs have been removed from the article. Choose from the paragraphs A–G the one which fits each gap (41–46). There is one extra paragraph which you do not need to use.',
    minutos: 15,
    texto:
      'When Tom Aldous first showed Inés Calder the photograph, she assumed it was a joke. It showed a smiling farmer in 1931 holding an apple the size of a child’s fist, its skin streaked red and gold, and on the back someone had written in careful pencil: “Hartley Sweet, best in the county.” No such variety appeared in any catalogue. As far as anyone knew, it had never existed. Inés, a retired schoolteacher with a garden full of old fruit trees, was not the sort of person to leave a mystery alone.\n\n' +
      '{{41}}\n\n' +
      'Marlow, when she finally reached it, turned out to be a handful of cottages at the end of a muddy lane. Most of its orchards had been grubbed up in the seventies, when supermarkets began to ask for apples that looked and tasted the same wherever they came from.\n\n' +
      '{{42}}\n\n' +
      'Inés found the tree on a wet afternoon in October, half hidden by brambles, its trunk split but its branches heavy with fruit. “It was smaller than the apple in the photograph,” she says. “But I bit into one, and it was exactly as the pencil had promised.”\n\n' +
      '{{43}}\n\n' +
      'The verdict, when it came in a brown envelope the following spring, was startling: the apple matched nothing in the collection. As far as science was concerned, Hartley Sweet was a variety that had never been recorded.\n\n' +
      '{{44}}\n\n' +
      'Word travelled. Farmers from three neighbouring villages asked for grafts, a cider maker ordered two hundred young trees, and the village school planted a row beside the playing field.\n\n' +
      '{{45}}\n\n' +
      'Inés took the news calmly. “I never wanted it in a supermarket,” she says. “A thing like that deserves to be eaten by people who know where it comes from.”\n\n' +
      '{{46}}',
    opcionesComunes: [
      'Not everybody was convinced. A buyer for a supermarket chain, who had been sent a box as a courtesy, replied that the apple was charming but bruised far too easily to be sold.',
      'For three weeks she walked the lanes with a notebook, asking anyone she met about apples. Most people were puzzled. One woman, however, remembered a gnarled old tree in the hedge behind the chapel which bore fruit every autumn that nobody had ever been able to name.',
      'Today Hartley Sweet grows in more than forty gardens and orchards across the county. Every October Inés holds a tasting day at the chapel, where the original tree, propped up now with a wooden frame, still bears a modest crop. “It was never meant to be everywhere,” she says. “It was meant to be somewhere.”',
      'The same story is told about the Dunmore Russet, an apple said to have been rediscovered in a Welsh garden in the nineties, although experts have never been able to confirm it.',
      'She began in the obvious place, the county archive, where she spent a winter reading nursery catalogues and the minutes of long-forgotten horticultural societies. For weeks she found nothing, until a single line in a handwritten ledger recorded that a Hartley Sweet had been sold to a farm near the village of Marlow in 1928.',
      'By then, though, Inés was no longer waiting for permission. The previous winter she had taken cuttings and grafted them onto young rootstocks in her own garden, using methods she had learned from a book published in 1912. Within three years the first of the new trees were bearing fruit.',
      'Finding a tree, however, is not the same as proving what it is. Inés sent samples to a fruit specialist, who compared them with those in a national collection, a process that took the best part of a year.',
    ],
    items: [
      { n: 41, tipo: 'emparejar', pregunta: 'Gap 41', correcta: 4, explicacion: '«She began in the obvious place» continúa la frase final del primer párrafo («not the sort of person to leave a mystery alone») y acaba nombrando el pueblo de Marlow, que el párrafo siguiente retoma: «Marlow, when she finally reached it…».' },
      { n: 42, tipo: 'emparejar', pregunta: 'Gap 42', correcta: 1, explicacion: 'El párrafo cuenta cómo Inés pregunta por las manzanas por los caminos de Marlow y menciona «a gnarled old tree in the hedge behind the chapel». El siguiente empieza «Inés found the tree», así que necesita que el árbol ya haya aparecido.' },
      { n: 43, tipo: 'emparejar', pregunta: 'Gap 43', correcta: 6, explicacion: '«Finding a tree, however, is not the same as proving what it is» contrasta con el éxito del hallazgo, y el especialista del párrafo explica el «verdict» que llega después («The verdict, when it came…»).' },
      { n: 44, tipo: 'emparejar', pregunta: 'Gap 44', correcta: 5, explicacion: '«By then, though» se refiere al año de espera del dictamen, y «the previous winter she had taken cuttings» explica de dónde salen los árboles de los que «Word travelled» y los injertos que piden los granjeros.' },
      { n: 45, tipo: 'emparejar', pregunta: 'Gap 45', correcta: 0, explicacion: 'El comprador del supermercado rechaza la manzana porque se magulla fácilmente; «Inés took the news calmly» se refiere a ese rechazo («the news»), y «I never wanted it in a supermarket» lo remata.' },
      { n: 46, tipo: 'emparejar', pregunta: 'Gap 46', correcta: 2, explicacion: 'Cierra el artículo con el resultado actual: «Today Hartley Sweet grows in more than forty gardens» y la frase final de Inés, «It was meant to be somewhere». El párrafo D sobra: habla de otra manzana, la Dunmore Russet, que no aparece en ninguna otra parte del texto.' },
    ],
  },
  {
    id: 'c1-rue-8-career-change-3',
    examen: 'c1',
    destreza: 'reading-use',
    parte: 8,
    nombreParte: NOMBRES_PARTE_READING[8],
    examenNumero: 3,
    titulo: 'A different job, a different life',
    instrucciones:
      'You are going to read an article in which four people describe changing careers in mid-life. For questions 47–56, choose from the people (A–D). The people may be chosen more than once.',
    minutos: 15,
    secciones: [
      {
        letra: 'A',
        titulo: 'Mira',
        texto:
          'For fifteen years I was a solicitor, and for most of them I was quietly miserable without being able to say why. It was my sister who said it first, over a birthday lunch: “You light up when you talk about the wardrobe you built.” I enrolled on an evening course the following week. Not everybody was supportive. Two close friends, to their credit, told me honestly that they gave the idea six months, and I am rather pleased to have proved them wrong. The money is poor and the work is physical, but I would not go back. What I love is the end of the day. I can stand in my workshop, look at a table that did not exist that morning and know that I made it. In law, the result of a year’s work was often a stack of paper in somebody else’s filing cabinet.',
      },
      {
        letra: 'B',
        titulo: 'Tomás',
        texto:
          'I was an engineer for twenty-two years before I retrained as a primary school teacher at forty-five. I knew the salary would be lower; what I had not worked out was how much lower once the cost of the training year was added, and for two years we were a good deal poorer than I had promised my wife we would be. The first term was strange, too. Most of my fellow trainees were twenty-three and I felt like a visiting uncle, asking where the staffroom was. But I found, to my surprise, that explaining a bridge to a client prepares you rather well for explaining fractions to eight-year-olds: you learn very quickly to find the picture that makes the idea clear. There are days when I think I am too old for the noise, but they are fewer than the good ones.',
      },
      {
        letra: 'C',
        titulo: 'Hannah',
        texto:
          'I had read all the advice about leaving a corporate job and I followed it: build up your savings, keep your contacts, work out your costs to the last penny. The practical side of opening a bakery went more or less as the books said it would. What nobody warned me about was the loneliness. I had spent years surrounded by people, and now I was alone at four in the morning with a bag of flour and my own doubts. It took me a year to learn to enjoy it. I am much less driven than I was. I used to want a regional chain; now I want one good loaf, baked well, and to be home by lunch. My former colleagues find this baffling. I find it restful.',
      },
      {
        letra: 'D',
        titulo: 'Idris',
        texto:
          'For twenty years I told myself that I would leave the bank when the children had left home. When they did, I was fifty-three, and it took me another two years to act; now I want to shake the man I was. I am a gardener for a housing association, and on the first morning I spent in the rain digging a border I thought, so this is what I have been missing. If you are thinking about a change, my advice is not to resign on a wave of enthusiasm. Ask if you can spend a month shadowing someone who does the job. I did, and a wet week in February told me more than any brochure could.',
      },
    ],
    opcionesComunes: ['Mira', 'Tomás', 'Hannah', 'Idris'],
    items: [
      { n: 47, tipo: 'emparejar', pregunta: 'Which person was encouraged by a relative to think about a different career?', correcta: 0, explicacion: 'Mira: «It was my sister who said it first… “You light up when you talk about the wardrobe you built.”». Tomás menciona a su mujer, pero no para animarle.' },
      { n: 48, tipo: 'emparejar', pregunta: 'Which person found the cost of changing career higher than expected?', correcta: 1, explicacion: 'Tomás: «what I had not worked out was how much lower once the cost of the training year was added, and for two years we were a good deal poorer than I had promised my wife». Mira dice que el dinero es poco, pero no que lo esperara de otra manera.' },
      { n: 49, tipo: 'emparejar', pregunta: 'Which person felt out of place among younger colleagues?', correcta: 1, explicacion: 'Tomás: «Most of my fellow trainees were twenty-three and I felt like a visiting uncle, asking where the staffroom was».' },
      { n: 50, tipo: 'emparejar', pregunta: 'Which person enjoys being able to see the results of their work?', correcta: 0, explicacion: 'Mira: «I can stand in my workshop, look at a table that did not exist that morning and know that I made it. In law, the result of a year’s work was often a stack of paper».' },
      { n: 51, tipo: 'emparejar', pregunta: 'Which person was prepared for the practical difficulties but not for the emotional ones?', correcta: 2, explicacion: 'Hannah: «The practical side of opening a bakery went more or less as the books said it would. What nobody warned me about was the loneliness».' },
      { n: 52, tipo: 'emparejar', pregunta: 'Which person recommends trying out a new career before committing to it?', correcta: 3, explicacion: 'Idris: «my advice is not to resign on a wave of enthusiasm. Ask if you can spend a month shadowing someone who does the job».' },
      { n: 53, tipo: 'emparejar', pregunta: 'Which person found that a skill from their previous career was useful in the new one?', correcta: 1, explicacion: 'Tomás: «explaining a bridge to a client prepares you rather well for explaining fractions to eight-year-olds».' },
      { n: 54, tipo: 'emparejar', pregunta: 'Which person is less ambitious than they used to be?', correcta: 2, explicacion: 'Hannah: «I am much less driven than I was. I used to want a regional chain; now I want one good loaf, baked well, and to be home by lunch».' },
      { n: 55, tipo: 'emparejar', pregunta: 'Which person regrets not making the change earlier?', correcta: 3, explicacion: 'Idris: «it took me another two years to act; now I want to shake the man I was».' },
      { n: 56, tipo: 'emparejar', pregunta: 'Which person says that some friends doubted the change would last?', correcta: 0, explicacion: 'Mira: «Two close friends… told me honestly that they gave the idea six months, and I am rather pleased to have proved them wrong».' },
    ],
  },
];
