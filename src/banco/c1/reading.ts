import type { Ejercicio } from '../tipos';

// Cambridge C1 Advanced · Reading and Use of English, Parts 5–8. Redactados de cero, al estilo del examen.
// Formato oficial en docs/formatos.md.

export const NOMBRES_PARTE_READING = {
  5: 'Multiple choice',
  6: 'Cross-text multiple matching',
  7: 'Gapped text',
  8: 'Multiple matching',
} as const;

export const READING_C1: Ejercicio[] = [
  {
    id: 'c1-rue-5-workshop',
    examen: 'c1',
    destreza: 'reading-use',
    parte: 5,
    nombreParte: NOMBRES_PARTE_READING[5],
    examenNumero: 1,
    titulo: 'The workshop',
    instrucciones:
      'You are going to read an extract from a novel in which a woman inherits her grandfather’s clock-repair workshop. For questions 31–36, choose the answer (A, B, C or D) which you think fits best according to the text.',
    minutos: 15,
    texto:
      'My grandfather repaired clocks for fifty-one years in a room at the back of the house, and in all that time I never once saw him bring a clock into the kitchen. The workshop had its own door, its own kettle, its own radio tuned permanently to a station nobody else listened to. When he came through to eat he washed his hands with a particular soap and the smell of oil came with him anyway, but he never talked about what he had been doing. It was not that he was hiding anything. The work simply belonged to another room, and he seemed to think that was where it should stay.\n\n' +
      'The letters were in the second drawer of the bench, under the catalogues. There were perhaps two hundred of them, going back to the nineteen-seventies, and almost all of them were from customers. Some were short: a date, a thank-you, a cheque that was no longer attached. Others ran to several pages. A woman in Aberdeen had written to him every Christmas for thirty years about a carriage clock that had belonged to her mother. A man he had apparently never met described, in a tiny slanting hand, the sound his grandfather clock made at three in the morning and asked whether it was possible that a clock could be lonely. My grandfather had kept them all, and had answered them all, and I had known nothing about any of it. I sat on the floor with the drawer in my lap and read until the light went.\n\n' +
      'There is a great deal to do when somebody dies, and I was grateful for it. The forms, the phone calls, the bank that needed a certificate and then needed it again in a different format: all of it was dull and necessary and left no room for anything else. People talk about the machinery of grief as though it were a cruelty, but I found it kind. For three weeks I was simply a person with a list, and every evening the list was a little shorter.\n\n' +
      'Then the list ran out, and on the first morning with nothing on it a man knocked at the workshop door. He was holding a clock wrapped in a tea towel. My grandfather, he said, had promised to look at it in the spring. I explained, and he was sorry, and then he stood there, and I understood that he was waiting for me to take the clock. I knew nothing. I could not have told you which end of a screwdriver to hold. But I had read two hundred letters by then, and I found that I could not say no to the tea towel. I took it, and wrote his name in the book, and felt my face go hot as I did so, because I had just made a promise I had no way of keeping.\n\n' +
      'The clock is on the bench now. I have opened the back, which took me most of an afternoon, and I have looked inside, and I have closed it again. I have also, I should say, had a letter from an auction house offering to clear the workshop, and I have not answered it. I am aware that I cannot go on like this indefinitely, that at some point I will have to be either a person who mends clocks or a person who does not. What I have decided, for the moment, is not to decide. The radio is still on the station nobody listens to. I have not changed it, and I notice that I have started washing my hands with the particular soap.',
    items: [
      {
        n: 31,
        tipo: 'opciones',
        pregunta: 'In the first paragraph, the narrator suggests that her grandfather',
        opciones: ['was secretive about his work.', 'resented the time his work demanded.', 'saw his work as something separate from the rest of life.', 'expected her to take over the workshop one day.'],
        correcta: 2,
        explicacion: '«The work simply belonged to another room, and he seemed to think that was where it should stay» (C). La narradora descarta A expresamente: «It was not that he was hiding anything». No hay nada de resentimiento ni de que esperara que ella siguiera.',
      },
      {
        n: 32,
        tipo: 'opciones',
        pregunta: 'What does the narrator say about the letters?',
        opciones: ['They revealed a side of her grandfather she had not known.', 'They showed that he had been unhappy in his work.', 'They were mostly concerned with payment.', 'They had been written for her to find.'],
        correcta: 0,
        explicacion: '«My grandfather had kept them all, and had answered them all, and I had known nothing about any of it» (A). Solo «some» hablaban de cheques (C no); nada indica infelicidad ni que las dejara para ella.',
      },
      {
        n: 33,
        tipo: 'opciones',
        pregunta: 'What does the narrator mean by “the machinery of grief” in the third paragraph?',
        opciones: ['the practical tasks that follow a death', 'the way sadness returns when least expected', 'the pressure to behave in a particular way', 'the support offered by other people'],
        correcta: 0,
        explicacion: 'El párrafo entero habla de «the forms, the phone calls, the bank»: las tareas prácticas tras una muerte (A). Y a ella le parecen «kind», no una crueldad.',
      },
      {
        n: 34,
        tipo: 'opciones',
        pregunta: 'How did the narrator feel when she took the man’s clock?',
        opciones: ['annoyed that he had interrupted her', 'ashamed of having made a promise she could not keep', 'surprised that her grandfather still had customers', 'relieved to have something to do at last'],
        correcta: 1,
        explicacion: '«Felt my face go hot… because I had just made a promise I had no way of keeping» (B). Sabía que había clientes por las cartas (C no); el alivio es del párrafo anterior, con la lista, no con el reloj (D no).',
      },
      {
        n: 35,
        tipo: 'opciones',
        pregunta: 'What is implied about the narrator’s situation at the end of the extract?',
        opciones: ['She has decided to sell the workshop.', 'She is deliberately putting off a decision.', 'She has committed herself to learning the trade.', 'She intends to keep the workshop open only for a short time.'],
        correcta: 1,
        explicacion: '«What I have decided, for the moment, is not to decide» (B). No ha contestado a la casa de subastas (A no) y no se ha comprometido a aprender: abrió el reloj y lo volvió a cerrar (C no).',
      },
      {
        n: 36,
        tipo: 'opciones',
        pregunta: 'Which of the following best describes the narrator’s attitude to her grandfather in the extract as a whole?',
        opciones: ['affectionate but puzzled by him', 'resentful of his absence from her life', 'admiring above all of his technical skill', 'guilty about having neglected him'],
        correcta: 0,
        explicacion: 'Cariño (el jabón, la radio que no cambia) mezclado con desconcierto («I had known nothing about any of it») (A). No hay reproches ni culpa, y de su destreza técnica apenas habla.',
      },
    ],
  },
  {
    id: 'c1-rue-8-learning-to-cook',
    examen: 'c1',
    destreza: 'reading-use',
    parte: 8,
    nombreParte: NOMBRES_PARTE_READING[8],
    examenNumero: 1,
    titulo: 'How I learned to cook',
    instrucciones:
      'You are going to read an article in which four people describe how they learned to cook. For questions 47–56, choose from the people (A–D). The people may be chosen more than once.',
    minutos: 15,
    secciones: [
      {
        letra: 'A',
        titulo: 'Nadia',
        texto:
          'I learned in my grandmother’s kitchen, and I learned the way she had learned: by watching. There were no books in that kitchen and nothing was ever written down. She measured flour in her cupped hands and salt by the look of it, and if you asked her how much, she would say “enough”. For years I hated being in there. It was hot, it was slow, and it kept me from my friends; cooking was a chore that had been handed to me because I was the eldest girl. What changed my mind, oddly, was being made to taste. She would put the spoon in my mouth every two minutes and ask what was missing, and one day I knew. Now I feed twenty people on a Sunday without thinking about it. My one sorrow is that when she died, the recipes died with her. I had them in my hands but not on paper, and there are dishes I have never managed to get right since.',
      },
      {
        letra: 'B',
        titulo: 'Tom',
        texto:
          'My motive was entirely financial. In my first year at university I worked out that I was spending more on takeaways than on rent, so I bought a pan and started watching videos. The early results were grim. I set off the fire alarm twice in a week and produced a curry that my flatmate described, generously, as “a soup”. The turning point was a video in which a chef said that beginners should follow a recipe to the letter, with scales and a timer, and stop trying to be clever. I did exactly that for six months, and it worked. Now I am slightly obsessed with technique, with why things happen in a pan. The one thing I have never learned to enjoy is cooking for guests. The moment someone is watching, I lose all pleasure in it; I would rather cook for myself and send people a photo.',
      },
      {
        letra: 'C',
        titulo: 'Priya',
        texto:
          'I did it the expensive way. At thirty-four I left an office job I disliked and spent my savings on a twelve-week professional course. I had cooked at home for years and thought I was competent; the first morning showed me I was not. Everything was about speed. You had to dice an onion in under a minute, and the instructors stood behind you with a stopwatch. I found that relentless pace far harder than any of the actual techniques, and I went home in tears more than once. But it rewired me. The thing people never expect me to say is that the biggest change was not in how I cook but in how I shop: I now buy whole vegetables, whole fish, and I plan a week at a time, because that is how a kitchen runs. I work two nights a week in a restaurant now, which is enough.',
      },
      {
        letra: 'D',
        titulo: 'Owen',
        texto:
          'I never intended to learn. My partner did all the cooking, and happily, until she became seriously ill and could not stand at the stove. Somebody had to, and there was only me. I bought one book, a plain one with no photographs, and I cooked from it every single night for a year. I did not look at anything else. The same book, often the same ten dishes, until I could do them without reading. People ask me for advice and I only have one piece: make the same thing again and again until it is boring, and then make it again. I still cannot invent anything; put me in front of an open fridge and I freeze. But cooking became the way I looked after her, and even now that she is well it is still that. It was never about the food.',
      },
    ],
    opcionesComunes: ['Nadia', 'Tom', 'Priya', 'Owen'],
    items: [
      { n: 47, tipo: 'emparejar', pregunta: 'Which person learned to cook because they had to look after someone?', correcta: 3, explicacion: 'Owen: «My partner… became seriously ill… Somebody had to, and there was only me».' },
      { n: 48, tipo: 'emparejar', pregunta: 'Which person believes that repeating one dish is the best way to improve?', correcta: 3, explicacion: 'Owen: «make the same thing again and again until it is boring, and then make it again».' },
      { n: 49, tipo: 'emparejar', pregunta: 'Which person regrets not having recorded what they were taught?', correcta: 0, explicacion: 'Nadia: «when she died, the recipes died with her. I had them in my hands but not on paper».' },
      { n: 50, tipo: 'emparejar', pregunta: 'Which person says that precision mattered more than creativity at the beginning?', correcta: 1, explicacion: 'Tom: «follow a recipe to the letter, with scales and a timer, and stop trying to be clever».' },
      { n: 51, tipo: 'emparejar', pregunta: 'Which person took up cooking mainly to save money?', correcta: 1, explicacion: 'Tom: «My motive was entirely financial… spending more on takeaways than on rent».' },
      { n: 52, tipo: 'emparejar', pregunta: 'Which person found the pace of their training difficult?', correcta: 2, explicacion: 'Priya: «I found that relentless pace far harder than any of the actual techniques».' },
      { n: 53, tipo: 'emparejar', pregunta: 'Which person has changed the way they buy food?', correcta: 2, explicacion: 'Priya: «the biggest change was not in how I cook but in how I shop».' },
      { n: 54, tipo: 'emparejar', pregunta: 'Which person initially saw cooking as an unwelcome duty?', correcta: 0, explicacion: 'Nadia: «cooking was a chore that had been handed to me because I was the eldest girl».' },
      { n: 55, tipo: 'emparejar', pregunta: 'Which person does not enjoy cooking when other people are going to eat the food?', correcta: 1, explicacion: 'Tom: «The one thing I have never learned to enjoy is cooking for guests… I lose all pleasure in it».' },
      { n: 56, tipo: 'emparejar', pregunta: 'Which person learned without any written instructions?', correcta: 0, explicacion: 'Nadia: «There were no books in that kitchen and nothing was ever written down». Owen usó un libro (D no).' },
    ],
  },
  {
    id: 'c1-rue-6-remote-work',
    examen: 'c1',
    destreza: 'reading-use',
    parte: 6,
    nombreParte: NOMBRES_PARTE_READING[6],
    examenNumero: 1,
    titulo: 'Working from home',
    instrucciones:
      'You are going to read four extracts from articles in which writers give their views on working from home. For questions 37–40, choose from the writers A–D. The writers may be chosen more than once.',
    minutos: 12,
    secciones: [
      {
        letra: 'A',
        texto:
          'The evidence on productivity is, by now, hard to argue with: people who are spared the daily commute and the interruptions of an open-plan office simply get more done. What troubles me is what happens to the places we have left behind. City centres were built around the office worker, and the sandwich bars, dry cleaners and small theatres that depended on that daily tide are closing one by one. Managers who still insist on seeing staff at their desks are fighting a battle they have already lost; trust, not surveillance, is what keeps a dispersed team honest. But we should be clear-eyed about the cost to individuals. A screen is a poor substitute for the casual conversation at the kettle, and for many younger employees the silence of a shared flat is doing real harm.',
      },
      {
        letra: 'B',
        texto:
          'Nobody who has tried it seriously doubts that remote work makes most knowledge workers more efficient; the figures from company after company point the same way. The predictions of empty, dying cities, however, strike me as hysterical. Cities have survived plagues, wars and the arrival of the motor car, and they will reinvent themselves around people who come in three days a week rather than five. The managers who grumble about not being able to see their teams are, frankly, revealing more about themselves than about their staff: a manager who needs to watch people work has never learned to manage. As for loneliness, I suspect the problem is overstated. People are perfectly capable of finding company outside the office, and many report that their friendships have deepened now that they are no longer exhausted by the commute.',
      },
      {
        letra: 'C',
        texto:
          'I remain unconvinced by the productivity argument. What the surveys measure is hours logged and emails answered, and remote staff do plenty of both; whether they produce better ideas is another matter, and my own experience suggests that they do not. Meanwhile the damage to our towns is plain for anyone who walks through a business district at lunchtime. The scepticism of managers, which it is fashionable to mock, seems to me entirely reasonable: they are being asked to vouch for the work of people they rarely see, and the tools for doing so are still crude. The one claim I would resist is that home working is making us lonelier. Offices were never the warm communities that nostalgia now paints them, and most people I know are glad to be rid of the forced sociability.',
      },
      {
        letra: 'D',
        texto:
          'The productivity gains are real and, for some roles, dramatic; I have watched a sluggish department become genuinely effective once it stopped commuting. I am less persuaded by the laments for the city centre. Districts that were deserted after six in the evening were hardly thriving, and the conversion of offices into housing and studios may leave us with better places than before. Where I do have sympathy is with the managers. It is easy to accuse them of distrust, but they carry responsibility for results they can no longer observe being produced, and the caution many of them show is a rational response to that. The real worry, to my mind, is isolation. The informal mentoring that happened across desks has quietly vanished, and the people who are suffering most are the new recruits, who have never met the colleagues they message every day.',
      },
    ],
    opcionesComunes: ['Writer A', 'Writer B', 'Writer C', 'Writer D'],
    items: [
      {
        n: 37,
        tipo: 'emparejar',
        pregunta: 'Which writer has a different opinion from the others about whether working from home makes people more productive?',
        correcta: 2,
        explicacion:
          'A, B y D dan por hecho que se trabaja más («hard to argue with», «nobody… seriously doubts», «the productivity gains are real»). C es el único que lo pone en duda: «I remain unconvinced by the productivity argument… whether they produce better ideas is another matter».',
      },
      {
        n: 38,
        tipo: 'emparejar',
        pregunta: 'Which writer shares Writer A’s view on the effect of home working on city centres?',
        correcta: 2,
        explicacion:
          'A dice que los centros se vacían («closing one by one»). B («hysterical») y D («less persuaded by the laments») creen que se exagera. C coincide con A: «the damage to our towns is plain for anyone who walks through a business district».',
      },
      {
        n: 39,
        tipo: 'emparejar',
        pregunta: 'Which writer shares Writer C’s opinion of managers who are reluctant to trust remote staff?',
        correcta: 3,
        explicacion:
          'C defiende a los jefes desconfiados («entirely reasonable»). A y B los critican («a battle they have already lost», «has never learned to manage»). D es quien les da la razón: «the caution many of them show is a rational response».',
      },
      {
        n: 40,
        tipo: 'emparejar',
        pregunta: 'Which writer takes a similar view to Writer D on the risk of isolation?',
        correcta: 0,
        explicacion:
          'D ve el aislamiento como el verdadero problema («The real worry… is isolation»). B («overstated») y C («the one claim I would resist») lo niegan. A coincide con D: «the silence of a shared flat is doing real harm».',
      },
    ],
  },
  {
    id: 'c1-rue-7-bus-map',
    examen: 'c1',
    destreza: 'reading-use',
    parte: 7,
    nombreParte: NOMBRES_PARTE_READING[7],
    examenNumero: 1,
    titulo: 'The man who mapped the unmappable',
    instrucciones:
      'You are going to read an article about a man who made a map of his city’s bus routes. Six paragraphs have been removed from the article. Choose from the paragraphs A–G the one which fits each gap (41–46). There is one extra paragraph which you do not need to use.',
    minutos: 15,
    texto:
      'When Daniel Okoro arrived in the city as a student, he did what every newcomer does: he asked how to get to the university. The answer, delivered with a shrug, was that he should stand on the corner and wait for a minibus with the right word painted on its windscreen. Which word, nobody could quite say.\n\n' +
      '{{41}}\n\n' +
      'The city’s transport system, like those of many fast-growing cities, had never been designed. It had simply accumulated. Thousands of privately owned minibuses followed routes that existed only in the heads of their drivers, stopping wherever a passenger waved and changing course when the traffic demanded.\n\n' +
      '{{42}}\n\n' +
      'Okoro’s idea was almost absurdly simple. He would ride every route, carrying a phone that recorded where he went, and then he would draw what he found. He gave himself a year. It took three.\n\n' +
      '{{43}}\n\n' +
      'He recruited help. Students, retired drivers and a handful of unusually patient taxi passengers began sending him their own recordings, and the map grew into something no single person could have produced. By the end of the second year it showed more than four hundred routes.\n\n' +
      '{{44}}\n\n' +
      'The breakthrough came from an unexpected direction. A graphic designer who had seen the project online offered to redraw it in the style of the famous London Underground diagram, straightening the lines and spacing the stops evenly whatever the real distances between them.\n\n' +
      '{{45}}\n\n' +
      'Today the map is printed on the walls of the main bus stations and lives on the phones of several hundred thousand people. The city authorities, who initially regarded the whole exercise with suspicion, now use it to plan where new roads should go.\n\n' +
      '{{46}}',
    opcionesComunes: [
      'The university itself, meanwhile, had moved to a new campus on the far side of the river, a decision that was to cause Okoro a different set of problems entirely.',
      'For the people who had grown up with it, this was not chaos but knowledge. They knew which corner to stand on and which hand signal meant which destination. For everyone else, including the city’s own planners, the network was invisible.',
      'Okoro is characteristically unimpressed by this official endorsement. The map, he points out, still belongs to the people who ride the buses, and it is they, not the planners, who keep sending him the corrections that keep it alive.',
      'That first journey took him two hours and three wrong buses. It was, he says now, the most useful morning of his education, because it showed him a problem that nobody else seemed to think was a problem at all.',
      'Purists objected that this misrepresented the city. Okoro’s reply was that a map is not a photograph; its job is to be understood, and the new version was understood by everyone who picked it up.',
      'What it did not show, at first, was how to read it. Early versions were so dense with coloured lines that even Okoro struggled to follow a single journey across the page, and testers politely described them as beautiful and useless.',
      'Part of the difficulty was that routes refused to stay still. A road closure, a new market, a dispute between drivers’ associations: any of these could shift a line by several streets, and Okoro would return to find his map already out of date.',
    ],
    items: [
      { n: 41, tipo: 'emparejar', pregunta: 'Gap 41', correcta: 3, explicacion: '«That first journey» retoma el viaje a la universidad del primer párrafo, y «a problem that nobody else seemed to think was a problem» prepara la descripción del sistema de autobuses que viene después.' },
      { n: 42, tipo: 'emparejar', pregunta: 'Gap 42', correcta: 1, explicacion: '«For the people who had grown up with it, this was not chaos» se refiere al sistema que «had never been designed». Y «the network was invisible» lleva a la idea de dibujarlo.' },
      { n: 43, tipo: 'emparejar', pregunta: 'Gap 43', correcta: 6, explicacion: '«Part of the difficulty» explica por qué «It took three» (años) en vez de uno: las rutas cambiaban. Es el único párrafo que habla de la dificultad del trabajo.' },
      { n: 44, tipo: 'emparejar', pregunta: 'Gap 44', correcta: 5, explicacion: '«What it did not show… was how to read it» contrasta con «it showed more than four hundred routes». Y «beautiful and useless» prepara «The breakthrough» del párrafo siguiente.' },
      { n: 45, tipo: 'emparejar', pregunta: 'Gap 45', correcta: 4, explicacion: '«Purists objected that this misrepresented the city» responde a enderezar las líneas y espaciar las paradas «whatever the real distances». «A map is not a photograph» es la defensa de ese cambio.' },
      { n: 46, tipo: 'emparejar', pregunta: 'Gap 46', correcta: 2, explicacion: '«This official endorsement» es que las autoridades usen el mapa, y el párrafo cierra el artículo volviendo a la gente que manda correcciones. El párrafo A sobra: habla de problemas con la universidad que no vuelven a salir.' },
    ],
  },
];
