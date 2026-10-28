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
