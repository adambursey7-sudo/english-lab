import type { Ejercicio } from '../tipos';
import { INSTRUCCIONES, NOMBRES_PARTE } from './use-of-english';
import { NOMBRES_PARTE_READING } from './reading';

// Cambridge C1 Advanced · Reading and Use of English · examen 2 (Parts 1–8). Redactado de cero, al estilo del examen.
// Formato oficial en docs/formatos.md.

export const READING_USE_C1_2: Ejercicio[] = [
  {
    id: 'c1-rue-1-naps-2',
    examen: 'c1',
    destreza: 'reading-use',
    parte: 1,
    nombreParte: NOMBRES_PARTE[1],
    examenNumero: 2,
    titulo: 'The return of the afternoon nap',
    instrucciones: INSTRUCCIONES[1],
    minutos: 10,
    texto:
      'For much of the twentieth century, the afternoon nap was {{1}} as a sign of laziness, something that belonged to small children and the very old. Anyone caught dozing at their desk could expect, at the very {{2}}, a raised eyebrow. In recent years, however, the nap has undergone a remarkable change of fortune. Sleep researchers now {{3}} to the view that a short rest in the early afternoon can sharpen concentration, lift the mood and even {{4}} a part in lowering blood pressure. Some companies have gone so {{5}} as to install sleeping pods in their offices, although it remains to be seen whether employees actually dare to use them.\n\n' +
      'The key, it seems, lies in timing. A nap of twenty minutes or so leaves most people feeling refreshed, {{6}} one of an hour or more can bring on a heavy, confused feeling that takes a long time to {{7}} off. Experts also warn against napping late in the day, since this almost invariably {{8}} with sleep at night. The ideal nap, in short, is brief, early and, ideally, taken somewhere other than one’s desk.',
    items: [
      { n: 1, tipo: 'opciones', opciones: ['rejected', 'dismissed', 'denied', 'refused'], correcta: 1, explicacion: '«Dismiss something as…» = descartar algo como (una tontería, un signo de pereza). «Reject» y «refuse» no llevan «as», y «deny» significa negar.' },
      { n: 2, tipo: 'opciones', opciones: ['least', 'less', 'lowest', 'minimum'], correcta: 0, explicacion: '«At the very least» = como mínimo. Es una expresión fija: «at the very lowest / minimum» no existen con este sentido y «less» no encaja.' },
      { n: 3, tipo: 'opciones', opciones: ['hold', 'subscribe', 'agree', 'approve'], correcta: 1, explicacion: '«Subscribe to the view that…» = compartir la opinión de que. «Hold the view» va sin «to», «agree» pide «with» y «approve» pide «of».' },
      { n: 4, tipo: 'opciones', opciones: ['take', 'make', 'play', 'do'], correcta: 2, explicacion: '«Play a part in (doing) something» = contribuir a. Ninguno de los otros tres verbos forma esta colocación con «part».' },
      { n: 5, tipo: 'opciones', opciones: ['much', 'long', 'far', 'deep'], correcta: 2, explicacion: '«Go so far as to do something» = llegar al extremo de hacer algo. Expresión fija con «far».' },
      { n: 6, tipo: 'opciones', opciones: ['unless', 'whereas', 'despite', 'otherwise'], correcta: 1, explicacion: '«Whereas» contrasta la siesta corta (refresca) con la larga (atonta). «Unless» y «otherwise» no tienen sentido aquí, y «despite» exige un sustantivo, no una oración.' },
      { n: 7, tipo: 'opciones', opciones: ['pass', 'go', 'die', 'wear'], correcta: 3, explicacion: '«Wear off» = desaparecer poco a poco (un efecto, una sensación). «Pass off» no significa eso, y «go off» / «die off» no se usan con «feeling».' },
      { n: 8, tipo: 'opciones', opciones: ['disturbs', 'prevents', 'interferes', 'damages'], correcta: 2, explicacion: '«Interfere with» = estorbar, dificultar. Los otros tres verbos son transitivos: irían directamente con «sleep», sin «with».' },
    ],
  },
  {
    id: 'c1-rue-2-sad-songs-2',
    examen: 'c1',
    destreza: 'reading-use',
    parte: 2,
    nombreParte: NOMBRES_PARTE[2],
    examenNumero: 2,
    titulo: 'Why we listen to sad songs',
    instrucciones: INSTRUCCIONES[2],
    minutos: 10,
    texto:
      'It is {{9}} of the puzzles of human behaviour that people who would go to great lengths to avoid feeling sad in everyday life will happily pay to listen to music that makes them cry. {{10}} might expect sad songs to be a minority taste, yet they are among the most streamed in the world.\n\n' +
      'Psychologists have put {{11}} several explanations. One is that sad music allows us to experience strong emotion {{12}} any of the real-life consequences: nobody has actually left us, and the song will be over in four minutes. Another is that it makes us feel {{13}} alone. Hearing a stranger describe exactly what we are going through can be oddly comforting, {{14}} if the stranger is a millionaire singing from a stage on the other side of the world.\n\n' +
      'There may also be a chemical side to it. Music that moves us appears to trigger the release of substances in the brain associated {{15}} comfort and bonding, which would explain why a melancholy song can leave us feeling better rather {{16}} worse. Whatever the reason, it seems the appetite for a good cry set to music is here to stay. Streaming services, which can see exactly what we listen to and when, report that the saddest songs are played most often late at night, and most of all on Sunday evenings.',
    items: [
      { n: 9, tipo: 'palabra', correctas: ['one'], explicacion: '«It is one of the puzzles of…»: «one of + plural». No vale «some» (iría con «of the» pero no con «it is»).' },
      { n: 10, tipo: 'palabra', correctas: ['one', 'you', 'we'], explicacion: 'Sujeto impersonal: «One / You might expect…» = cabría esperar. «They» no funciona porque no hay a quién se refiera.' },
      { n: 11, tipo: 'palabra', correctas: ['forward', 'forth'], explicacion: '«Put forward an explanation» = proponer una explicación. «Put forth» es más formal pero también vale.' },
      { n: 12, tipo: 'palabra', correctas: ['without'], explicacion: '«Without any of the real-life consequences»: sentimos la emoción sin sus consecuencias. La frase siguiente lo confirma: «nobody has actually left us».' },
      { n: 13, tipo: 'palabra', correctas: ['less'], explicacion: '«It makes us feel less alone»: la canción nos hace sentir menos solos, como explica la frase que sigue («oddly comforting»).' },
      { n: 14, tipo: 'palabra', correctas: ['even'], explicacion: '«Even if the stranger is a millionaire» = aunque el desconocido sea millonario. «Although if» no es correcto.' },
      { n: 15, tipo: 'palabra', correctas: ['with'], explicacion: '«Associated with comfort and bonding»: «associate» siempre va con «with».' },
      { n: 16, tipo: 'palabra', correctas: ['than'], explicacion: '«Better rather than worse» = mejor en vez de peor. «Rather» pide «than».' },
    ],
  },
  {
    id: 'c1-rue-3-second-hand-2',
    examen: 'c1',
    destreza: 'reading-use',
    parte: 3,
    nombreParte: NOMBRES_PARTE[3],
    examenNumero: 2,
    titulo: 'Second-hand and proud of it',
    instrucciones: INSTRUCCIONES[3],
    minutos: 10,
    texto:
      'Not so long ago, buying second-hand clothes was something people did out of {{17}} rather than choice, and few would have admitted to it. Today the situation is almost {{18}}. Markets and online platforms selling used clothing have become hugely {{19}}, especially among the young, who see a vintage jacket as a mark of {{20}} rather than of poverty.\n\n' +
      'Part of the appeal is {{21}} financial, but there is more to it than price. Many shoppers are {{22}} uneasy about the environmental cost of clothes that are worn a handful of times and thrown away. Buying second-hand feels like a small act of {{23}} against that cycle. There is also the thrill of the hunt: the {{24}} discovery of a perfect coat at the bottom of a pile is a pleasure that no ordinary shop can offer. Retailers have noticed, and several large chains now run second-hand sections of their own, which rather suggests that the trend is here to stay.',
    items: [
      { n: 17, tipo: 'palabra', raiz: 'NECESSARY', correctas: ['necessity'], explicacion: 'Sustantivo tras «out of»: «out of necessity» = por necesidad. Ojo a la ortografía: necess-ity, sin la «a» de «necessary».' },
      { n: 18, tipo: 'palabra', raiz: 'RECOGNISE', correctas: ['unrecognisable', 'unrecognizable'], explicacion: 'Adjetivo con prefijo negativo: un-recognis-able, «casi irreconocible». Se admite la grafía con z.' },
      { n: 19, tipo: 'palabra', raiz: 'FASHION', correctas: ['fashionable'], explicacion: 'Adjetivo después de «hugely»: «hugely fashionable» = muy de moda.' },
      { n: 20, tipo: 'palabra', raiz: 'INDIVIDUAL', correctas: ['individuality'], explicacion: 'Sustantivo: «a mark of individuality» = una señal de personalidad propia. No «individualism», que es una postura ideológica.' },
      { n: 21, tipo: 'palabra', raiz: 'DOUBT', correctas: ['undoubtedly'], explicacion: 'Adverbio con prefijo negativo que modifica a «financial»: «undoubtedly financial» = sin duda económico.' },
      { n: 22, tipo: 'palabra', raiz: 'INCREASE', correctas: ['increasingly'], explicacion: 'Adverbio que modifica al adjetivo «uneasy»: «increasingly uneasy» = cada vez más incómodos.' },
      { n: 23, tipo: 'palabra', raiz: 'RESIST', correctas: ['resistance'], explicacion: 'Sustantivo tras «act of»: «an act of resistance». No «resistant», que es adjetivo.' },
      { n: 24, tipo: 'palabra', raiz: 'LIKELY', correctas: ['unlikely'], explicacion: 'Adjetivo con prefijo negativo: «the unlikely discovery» = el hallazgo improbable, inesperado.' },
    ],
  },
  {
    id: 'c1-rue-4-set-2',
    examen: 'c1',
    destreza: 'reading-use',
    parte: 4,
    nombreParte: NOMBRES_PARTE[4],
    examenNumero: 2,
    instrucciones: INSTRUCCIONES[4],
    minutos: 12,
    items: [
      {
        n: 25, tipo: 'transformacion', clave: 'HARDLY',
        frase: 'As soon as we arrived, it started to rain.',
        inicio: 'Hardly', fin: 'it started to rain.',
        correctas: ['had we arrived when', 'had we got there when'],
        explicacion: '«Hardly» al principio de la frase exige inversión con past perfect: «Hardly had we arrived… when…». Con «hardly» va «when», no «than» (eso es con «no sooner»).',
      },
      {
        n: 26, tipo: 'transformacion', clave: 'ACCOUNT',
        frase: 'Please remember that the museum is closed on Mondays.',
        inicio: 'Please take', fin: 'the museum is closed on Mondays.',
        correctas: ['into account that', 'into account the fact that'],
        explicacion: '«Take into account (the fact) that…» = tener en cuenta que. No cambies «account» ni pongas «in» en vez de «into».',
      },
      {
        n: 27, tipo: 'transformacion', clave: 'RATHER',
        frase: 'I would prefer to stay in tonight instead of going out.',
        inicio: 'I', fin: 'out tonight.',
        correctas: ['would rather stay in than go', 'would rather stay home than go'],
        explicacion: '«Would rather + infinitivo sin to + than + infinitivo sin to»: «would rather stay in than go out». Ojo: después de «than» va «go», no «going».',
      },
      {
        n: 28, tipo: 'transformacion', clave: 'SUPPOSED',
        frase: 'People say that the old castle is haunted.',
        inicio: 'The old castle', fin: 'haunted.',
        correctas: ['is supposed to be'],
        explicacion: '«Be supposed to be» = se dice que, se supone que. Es la forma de expresar lo que dice la gente con la palabra «supposed».',
      },
      {
        n: 29, tipo: 'transformacion', clave: 'DESPITE',
        frase: 'Although he trained very hard, he was not picked for the team.',
        inicio: 'He was not picked for the team', fin: 'he trained.',
        correctas: ['despite how hard', 'in spite of how hard'],
        explicacion: '«Despite» no puede ir seguido de «although» ni de una oración con sujeto y verbo: hace falta un sustantivo o una pregunta indirecta, «despite how hard he trained».',
      },
      {
        n: 30, tipo: 'transformacion', clave: 'WHETHER',
        frase: 'I do not care if it rains: we are going to the beach.',
        inicio: 'We are going to the beach', fin: 'not.',
        correctas: ['whether it rains or'],
        explicacion: '«Whether it rains or not» = llueva o no. «Whether… or not» es la estructura que expresa que algo da igual.',
      },
    ],
  },
  {
    id: 'c1-rue-5-ferry-home-2',
    examen: 'c1',
    destreza: 'reading-use',
    parte: 5,
    nombreParte: NOMBRES_PARTE_READING[5],
    examenNumero: 2,
    titulo: 'The ferry home',
    instrucciones:
      'You are going to read an extract from a novel in which a woman returns to the island where she grew up. For questions 31–36, choose the answer (A, B, C or D) which you think fits best according to the text.',
    minutos: 15,
    texto:
      'The ferry still left at a quarter past seven, and the man who took the tickets was still called Pieter, although his hair had gone white and he looked at Ana for a full three seconds before he said her name. She had been prepared for the island to have changed. She had not been prepared for it to have stayed the same, and for her to be the thing that was different.\n\n' +
      'Fourteen years. She had left at eighteen with one suitcase and the absolute certainty that she would never come back except for funerals, and so far she had kept her word: her grandmother’s, her uncle’s, and now, in the folder on her lap, the papers for the house. Her mother had moved to the mainland years ago and wanted nothing more to do with the place. “Sell it,” she had said on the phone, in the voice she used for things that were already decided. “Sell it, and don’t let them talk you into staying for lunch.”\n\n' +
      'Ana had every intention of following this advice. She had taken two days off, booked a return ticket and arranged to meet the estate agent at ten. By the time the ferry rounded the headland and the harbour came into view, white houses stacked up the hill like crockery on a shelf, she had rehearsed the whole visit in her head and found nothing in it that could go wrong.\n\n' +
      'The house was smaller than she remembered, which she had expected, and in better condition, which she had not. Somebody had been painting the shutters. Somebody had been watering the geraniums on the step, and had left a bag of lemons hanging from the door handle with no note. Ana stood in the kitchen with the lemons in her hand and felt, for the first time that day, something other than impatience.\n\n' +
      'The estate agent was a young woman who had not been born when Ana left and who talked about the property with the brisk enthusiasm of someone working through a list. A buyer from the city was interested, she said. A couple wanted it for the summers. The price was good; the market was good; everything, apparently, was good. Ana nodded, signed where she was asked to sign, and said she would think about the offers, which was not at all what she had planned to say.\n\n' +
      'Afterwards she walked, because there was nothing else to do until the evening ferry. The island was two hours from end to end on foot, and she had done it a hundred times as a girl, usually in a temper. She passed the school, which had closed, and the bakery, which had not. The woman behind the counter gave her a roll she had not ordered and would not take money for it, and said, as if continuing a conversation they had been having for years, that the lemons were from Tomás, who had looked after the garden since her grandmother died and would be glad to know somebody was finally in the house.\n\n' +
      'It was this, more than anything, that undid her. Not the view, which was as beautiful as the postcards had always claimed and which she had long ago decided was a kind of trick. Not the house. It was the discovery that in her absence she had been looked after; that the place she had so thoroughly rejected had quietly kept a space for her, without asking anything in return and without, apparently, expecting her to notice.\n\n' +
      'She missed the evening ferry. She told herself it was because she had lost track of time on the cliff path, which was true as far as it went. Pieter, when she turned up at the harbour the next morning, did not comment. He took her ticket, looked at her for three seconds, and said that the lemons this year were the best in a decade, and that Tomás would be at the bar from six, if she happened to be passing.\n\n' +
      'Ana took the ferry. She had a job and a flat and a life, and none of it was here. But she had not signed the second set of papers, the ones that would have accepted the couple’s offer, and when the estate agent rang the following week to ask whether she had made up her mind, Ana heard herself say that she needed a little more time, and that she might come over again in the spring, to see how the garden was doing.',
    items: [
      {
        n: 31,
        tipo: 'opciones',
        pregunta: 'What does the first paragraph suggest about Ana’s return to the island?',
        opciones: ['She was shocked by how much the island had changed.', 'She had assumed that the islanders would have forgotten her.', 'She found it unsettling that the island was just as she had left it.', 'She was offended that Pieter did not recognise her immediately.'],
        correcta: 2,
        explicacion: '«She had not been prepared for it to have stayed the same, and for her to be the thing that was different» (C). La isla NO ha cambiado (A no); Pieter sí la reconoce, solo tarda tres segundos (D no); nada dice que esperara que la olvidaran (B no).',
      },
      {
        n: 32,
        tipo: 'opciones',
        pregunta: 'What do we learn about Ana’s mother in the second paragraph?',
        opciones: ['She hopes that Ana will decide to keep the house.', 'She is worried that Ana might be persuaded to stay.', 'She left the island after a disagreement with the family.', 'She has not yet decided what to do with the house.'],
        correcta: 1,
        explicacion: '«Sell it, and don’t let them talk you into staying for lunch»: teme que la convenzan de quedarse (B). Quiere vender, con «the voice she used for things that were already decided» (A y D no). No se habla de ninguna pelea familiar (C no).',
      },
      {
        n: 33,
        tipo: 'opciones',
        pregunta: 'The writer compares the houses to crockery on a shelf in order to',
        opciones: ['emphasise how fragile the village looks from the sea.', 'suggest that the island has become overcrowded.', 'convey how neatly they are arranged on the hillside.', 'show that Ana no longer notices the view.'],
        correcta: 2,
        explicacion: '«Stacked up the hill like crockery on a shelf»: platos apilados en orden, blancos y uno sobre otro (C). No hay idea de fragilidad ni de masificación, y Ana sí ve el puerto (D no).',
      },
      {
        n: 34,
        tipo: 'opciones',
        pregunta: 'How did Ana behave with the estate agent?',
        opciones: ['She was irritated by the woman’s inexperience.', 'She did not react in the way she had intended to.', 'She was reassured by the information she was given.', 'She rejected the offers without hesitation.'],
        correcta: 1,
        explicacion: '«Said she would think about the offers, which was not at all what she had planned to say» (B). No rechaza nada (D no) ni se muestra irritada; la juventud de la agente se menciona sin reproche (A no).',
      },
      {
        n: 35,
        tipo: 'opciones',
        pregunta: 'What does the narrator say finally “undid” Ana?',
        opciones: ['realising that someone had been caring for her property all along', 'the beauty of the island, which she had tried hard to forget', 'the generosity of the woman in the bakery', 'discovering that her old school had closed'],
        correcta: 0,
        explicacion: '«It was the discovery that in her absence she had been looked after» (A). La narradora descarta la vista expresamente («Not the view») y la panadera es solo quien se lo cuenta; lo del colegio se menciona de pasada.',
      },
      {
        n: 36,
        tipo: 'opciones',
        pregunta: 'What is implied about Ana at the end of the extract?',
        opciones: ['She has decided to move back to the island permanently.', 'She regrets not accepting the couple’s offer.', 'She is no longer sure that she wants to sell the house.', 'She has arranged to meet Tomás in the spring.'],
        correcta: 2,
        explicacion: 'No ha firmado la aceptación de la oferta y pide «a little more time» (C). Sigue con su vida en la ciudad («none of it was here»), así que no ha decidido volver (A no). No hay arrepentimiento ni cita cerrada con Tomás (B y D no).',
      },
    ],
  },
  {
    id: 'c1-rue-6-mass-tourism-2',
    examen: 'c1',
    destreza: 'reading-use',
    parte: 6,
    nombreParte: NOMBRES_PARTE_READING[6],
    examenNumero: 2,
    titulo: 'Mass tourism',
    instrucciones:
      'You are going to read four extracts from articles in which writers give their views on mass tourism in popular destinations. For questions 37–40, choose from the writers A–D. The writers may be chosen more than once.',
    minutos: 12,
    secciones: [
      {
        letra: 'A',
        texto:
          'Walk through any historic port in August and you will hear the complaint that tourism has ruined the place. It is worth remembering who is making it. The restaurant owner, the boat operator and the woman renting out her spare room are not ruined; they are earning in three months what their parents earned in a year, and the money stays in the town. What has unquestionably suffered is the texture of local life: festivals rearranged for the convenience of coach parties, the dialect giving way to a sort of international menu English. The fashionable solution is to cap visitor numbers, and I understand the appeal, but every cap I have seen has simply created a black market in permits and pushed the crowds to the next town along. The remedy, if there is one, lies with town councils, which have the power to decide what gets built and where, and have so far declined to use it.',
      },
      {
        letra: 'B',
        texto:
          'The defenders of mass tourism like to talk about jobs, and jobs there are: seasonal, badly paid, and in businesses owned by hotel chains and booking platforms headquartered elsewhere. Precious little of what the visitor spends ends up in local pockets. On the cultural question, however, I part company with the pessimists. Places have always absorbed outsiders and been changed by them, and the idea that there was a pure local culture before the first cruise ship arrived is itself a tourist fantasy. Living traditions adapt; that is how they survive. What impresses me is the evidence from cities that have introduced daily limits on arrivals: quieter streets, calmer residents and, interestingly, visitors who report enjoying themselves more. But rules only go so far. In the end it is the individual traveller who decides whether to join the queue at the famous viewpoint or walk twenty minutes to the one nobody photographs.',
      },
      {
        letra: 'C',
        texto:
          'I have lived in a tourist town all my life, and I am tired of being told by visiting journalists that it has lost its soul. It has not. The same families run the same bars, the same saints are carried through the same streets, and if the procession now has an audience with cameras, the people carrying the saint do not seem to mind. Nor do I accept that the money all flows out. My neighbours have put children through university on the proceeds of a bakery that would have closed decades ago without the summer trade. Where I do agree with the critics is on numbers. There is a point beyond which a street simply cannot hold more people, and the towns that have had the nerve to set a daily limit have been proved right. Getting there, though, is not something visitors can do for us. It takes a council prepared to say no to the next hotel.',
      },
      {
        letra: 'D',
        texto:
          'Nobody who has watched a village turn into a stage set can seriously maintain that mass tourism leaves local culture intact. The bakery becomes a shop selling fridge magnets; the fishermen’s bar becomes a cocktail lounge; the fishermen, priced out of their own harbour, move inland. And for what? The profits are banked by airlines, platforms and investment funds, while the people who actually live there get a few months of waiting tables. Visitor caps, which the industry calls unworkable, are the one measure that has made a measurable difference wherever they have been tried, and they should be far more widespread. But I would not wait for governments to act. If anything is going to change, it will be because travellers themselves begin to behave differently: staying longer, spending in places owned by residents, and resisting the urge to be exactly where everyone else is. The responsibility, uncomfortably, is ours.',
      },
    ],
    opcionesComunes: ['Writer A', 'Writer B', 'Writer C', 'Writer D'],
    items: [
      {
        n: 37,
        tipo: 'emparejar',
        pregunta: 'Which writer shares Writer A’s view on who benefits financially from tourism?',
        correcta: 2,
        explicacion: 'A: el dinero «stays in the town» y los vecinos ganan bien. B («precious little… ends up in local pockets») y D («the profits are banked by airlines, platforms and investment funds») dicen lo contrario. C coincide con A: «Nor do I accept that the money all flows out… put children through university on the proceeds of a bakery».',
      },
      {
        n: 38,
        tipo: 'emparejar',
        pregunta: 'Which writer has a different opinion from the others on whether limiting visitor numbers is effective?',
        correcta: 0,
        explicacion: 'B («quieter streets, calmer residents»), C («have been proved right») y D («the one measure that has made a measurable difference») defienden los topes. A es el único en contra: «every cap I have seen has simply created a black market in permits and pushed the crowds to the next town».',
      },
      {
        n: 39,
        tipo: 'emparejar',
        pregunta: 'Which writer shares Writer D’s opinion about who should take responsibility for changing the situation?',
        correcta: 1,
        explicacion: 'D: «The responsibility, uncomfortably, is ours» (los viajeros). A («lies with town councils») y C («It takes a council») lo dejan en manos de las autoridades. B coincide con D: «In the end it is the individual traveller who decides».',
      },
      {
        n: 40,
        tipo: 'emparejar',
        pregunta: 'Which writer shares Writer C’s view on the effect of tourism on local culture?',
        correcta: 1,
        explicacion: 'C dice que su pueblo no ha perdido el alma («It has not»). A («the texture of local life» ha sufrido) y D («a stage set», «fridge magnets») ven daño. B coincide con C: «Living traditions adapt; that is how they survive».',
      },
    ],
  },
  {
    id: 'c1-rue-7-lighthouse-2',
    examen: 'c1',
    destreza: 'reading-use',
    parte: 7,
    nombreParte: NOMBRES_PARTE_READING[7],
    examenNumero: 2,
    titulo: 'The woman who brought back the light',
    instrucciones:
      'You are going to read an article about a woman who restored an abandoned lighthouse. Six paragraphs have been removed from the article. Choose from the paragraphs A–G the one which fits each gap (41–46). There is one extra paragraph which you do not need to use.',
    minutos: 15,
    texto:
      'When Marguerite Lind bought the lighthouse at Skerry Point, the estate agent’s particulars ran to a single page and ended with the phrase “in need of some attention”. The roof had gone. The spiral staircase stopped two floors short of the lamp room, and the lamp room itself was occupied by a colony of gulls that had been in residence for longer than most of the villagers across the bay.\n\n' +
      '{{41}}\n\n' +
      'The first year was spent simply making the tower safe. Scaffolding had to be brought across on a barge, and for weeks at a time the weather made it impossible to work at all. Lind lived in a caravan at the foot of the rock and learned, from videos and from the retired builders who began drifting over from the village to see what she was doing, how to mix lime mortar and lay a slate.\n\n' +
      '{{42}}\n\n' +
      'The lamp itself presented a different kind of problem. The original lens had been removed when the lighthouse was decommissioned in the nineteen-eighties and sold, nobody knew to whom. Lind spent the better part of a year writing to museums, auction houses and collectors, and received a great many polite replies and no useful information.\n\n' +
      '{{43}}\n\n' +
      'Reinstalling it took a further six months, and required the kind of precision that Lind had thought she had left behind with her career. Each of the glass prisms had to be cleaned, checked and set back into its brass frame by hand, and a single one out of place would have thrown the whole beam off course.\n\n' +
      '{{44}}\n\n' +
      'The light was switched on again on a wet evening in October, five years almost to the day after she had signed the contract. It has no official function; ships navigate by satellite now, and the local coastguard was polite but firm about not wanting it on their charts.\n\n' +
      '{{45}}\n\n' +
      'Lind now opens the lighthouse to visitors two days a week and has turned the keeper’s cottage into a small museum of the village’s maritime history, run entirely by volunteers, most of whom she first met when they turned up at her caravan with a bag of tools.\n\n' +
      '{{46}}',
    opcionesComunes: [
      'Asked what she would say to anyone tempted to do the same, she is cautious. “Don’t do it for the view,” she says. “Do it because you can’t bear not to. And make sure you do it somewhere with neighbours.”',
      'The work also forced her to confront the small matter of the height. The lamp room is thirty metres above the rock, reached by a staircase she herself had rebuilt, and for the first few months she climbed it with her eyes fixed on the step in front of her. “Then one day I looked up,” she says, “and I haven’t really looked down since.”',
      'It eventually turned up in a garden in the south of the country, where it had served for three decades as an unusually expensive ornament. The owner, once he understood what Lind was doing, refused to take any money for it. The lens arrived on a lorry wrapped in blankets, and the whole village came down to the harbour to watch it being lifted ashore.',
      'The second lighthouse, on the far side of the bay, had fared even worse. It was demolished in the nineties after a winter storm took most of the tower, and today only the base remains, a ring of stone that the children of the village use as a swimming platform in summer.',
      'She was not, by her own account, an obvious candidate for the job. A retired accountant with no experience of building work and a well-documented fear of heights, she had seen the sale advertised while on holiday and put in an offer before she had told her family. “I think I assumed somebody sensible would outbid me,” she says. “Nobody did.”',
      'That did not seem to matter to anyone present. Fishermen who had spent their lives at sea stood on the quay and watched the beam sweep across the water, and several of them were seen to wipe their eyes. “It isn’t for the ships,” one of them told a local reporter. “It’s for us. It means the place is still here.”',
      'Those visits soon became something more. The builders brought tools, then friends, then grandchildren, and by the end of the second summer there was a rota pinned to the caravan door. Lind insists she never asked for help. “They just kept turning up,” she says. “I think they had been watching that light fall down for forty years and it had bothered them more than they let on.”',
    ],
    items: [
      { n: 41, tipo: 'emparejar', pregunta: 'Gap 41', correcta: 4, explicacion: '«She was not… an obvious candidate for the job» retoma a Lind y el estado ruinoso del faro, y presenta su falta de experiencia y su miedo a las alturas, que vuelven a salir después (los constructores que le enseñan; el párrafo del hueco 44).' },
      { n: 42, tipo: 'emparejar', pregunta: 'Gap 42', correcta: 6, explicacion: '«Those visits» son las de «the retired builders who began drifting over from the village». El párrafo cuenta cómo esas visitas se convierten en ayuda organizada («a rota pinned to the caravan door»).' },
      { n: 43, tipo: 'emparejar', pregunta: 'Gap 43', correcta: 2, explicacion: '«It eventually turned up in a garden» responde a la búsqueda de la lente («sold, nobody knew to whom… no useful information»), y «The lens arrived on a lorry» da paso a «Reinstalling it took a further six months».' },
      { n: 44, tipo: 'emparejar', pregunta: 'Gap 44', correcta: 1, explicacion: '«The work also forced her to confront the small matter of the height» retoma el miedo a las alturas anunciado en el párrafo del hueco 41 y encaja tras el trabajo minucioso en la sala de la lámpara, antes de que se encienda la luz.' },
      { n: 45, tipo: 'emparejar', pregunta: 'Gap 45', correcta: 5, explicacion: '«That did not seem to matter to anyone present» se refiere a que la luz «has no official function». Los pescadores que lloran y «It isn’t for the ships. It’s for us» explican para qué sirve el faro.' },
      { n: 46, tipo: 'emparejar', pregunta: 'Gap 46', correcta: 0, explicacion: 'El consejo final («Asked what she would say to anyone tempted to do the same») cierra el artículo, y «somewhere with neighbours» remata la idea de los voluntarios del párrafo anterior. El párrafo D sobra: habla de un segundo faro que no aparece en ninguna otra parte del texto.' },
    ],
  },
  {
    id: 'c1-rue-8-new-city-2',
    examen: 'c1',
    destreza: 'reading-use',
    parte: 8,
    nombreParte: NOMBRES_PARTE_READING[8],
    examenNumero: 2,
    titulo: 'Starting again somewhere else',
    instrucciones:
      'You are going to read an article in which four people describe moving to a different town or city. For questions 47–56, choose from the people (A–D). The people may be chosen more than once.',
    minutos: 15,
    secciones: [
      {
        letra: 'A',
        titulo: 'Lena',
        texto:
          'I didn’t choose the town; my partner’s job did, and I arrived resentful and determined to hate it. For the first winter I succeeded. It was dark by four, I knew nobody, and the one thing I had been promised, a shorter commute, turned out to mean a twenty-minute walk through horizontal rain. What turned it round was, of all things, a choir. I joined because a colleague simply would not stop asking, and within a month I had more friends than I had made in ten years in the capital. People here have time, and they spend it on each other. I still miss the anonymity of a big city, the pleasure of being nobody in a crowd, and I suspect I always will. But when we were offered the chance to move back last year, I was the one who said no, which surprised my partner a good deal more than it surprised me.',
      },
      {
        letra: 'B',
        titulo: 'Rashid',
        texto:
          'My reasons were entirely practical. I work from home, my rent in the city had doubled in five years, and a flat twice the size was available for half the price three hours up the motorway. I did the sums and moved within a month. What I had not done was think about anything other than money. I underestimated how much of my social life had simply been proximity: friends I saw because they lived two streets away, and who, it turned out, were not going to make a six-hour round trip for a coffee. The first year was genuinely lonely. I am better now, mainly because I forced myself to say yes to everything, including a five-a-side football team I am far too old for. My advice to anyone doing this is to budget for the train fares back to see people. The flat is lovely. It is not, on its own, a life.',
      },
      {
        letra: 'C',
        titulo: 'Carmen',
        texto:
          'I moved abroad for a two-year contract and have now been here for eleven years, which tells you most of what you need to know. The hardest part was not the language, although that was hard enough; it was the small humiliations of being incompetent at things I had done without thinking since childhood. I could not read a parking sign. I did not know which queue to join at the post office. For a professional woman in her thirties, being treated as slightly stupid every day was exhausting in a way I had not anticipated. What kept me here was the work, which was better than anything I had been offered at home, and then, gradually, the city itself. I know its shortcuts now. I correct the pronunciation of newcomers. I go home twice a year and feel, each time, a little more like a visitor there and a little less like one here.',
      },
      {
        letra: 'D',
        titulo: 'Gareth',
        texto:
          'We moved to the coast when I retired because we had always said we would, and I would caution anyone against moving somewhere purely because of a promise made thirty years earlier. The town we had loved on holiday turned out, in February, to be a different place: shuttered, windy and with a bus every two hours. My wife took to it immediately. I did not. I had gone from being somebody at work, with a diary and a door with my name on it, to being a man who walked a dog along a beach, and nobody had warned me how much I would mind. It took a volunteer post at the lifeboat station to put that right. I am useful again, and I know the people on the quay by name. I would not move back; my wife would never forgive me. But I wish I had understood, before we came, that I was not just changing my address.',
      },
    ],
    opcionesComunes: ['Lena', 'Rashid', 'Carmen', 'Gareth'],
    items: [
      { n: 47, tipo: 'emparejar', pregunta: 'Which person joined a group only because someone kept insisting?', correcta: 0, explicacion: 'Lena: «I joined because a colleague simply would not stop asking». Rashid se apuntó al fútbol por decisión propia («I forced myself to say yes to everything»).' },
      { n: 48, tipo: 'emparejar', pregunta: 'Which person admits they failed to consider the social consequences of moving?', correcta: 1, explicacion: 'Rashid: «What I had not done was think about anything other than money. I underestimated how much of my social life had simply been proximity».' },
      { n: 49, tipo: 'emparejar', pregunta: 'Which person felt embarrassed about being unable to manage everyday tasks?', correcta: 2, explicacion: 'Carmen: «the small humiliations of being incompetent at things I had done without thinking since childhood. I could not read a parking sign».' },
      { n: 50, tipo: 'emparejar', pregunta: 'Which person has turned down an opportunity to return to where they came from?', correcta: 0, explicacion: 'Lena: «when we were offered the chance to move back last year, I was the one who said no». Gareth dice que no volvería, pero nadie se lo ha ofrecido.' },
      { n: 51, tipo: 'emparejar', pregunta: 'Which person found the loss of their professional status hard to bear?', correcta: 3, explicacion: 'Gareth: «I had gone from being somebody at work, with a diary and a door with my name on it, to being a man who walked a dog along a beach, and nobody had warned me how much I would mind».' },
      { n: 52, tipo: 'emparejar', pregunta: 'Which person mentions a partner who adapted more quickly than they did?', correcta: 3, explicacion: 'Gareth: «My wife took to it immediately. I did not». La pareja de Lena no aparece adaptándose antes que ella.' },
      { n: 53, tipo: 'emparejar', pregunta: 'Which person feels increasingly detached from their place of origin?', correcta: 2, explicacion: 'Carmen: «I go home twice a year and feel, each time, a little more like a visitor there and a little less like one here».' },
      { n: 54, tipo: 'emparejar', pregunta: 'Which person advises others to set money aside for visiting old friends?', correcta: 1, explicacion: 'Rashid: «My advice to anyone doing this is to budget for the train fares back to see people».' },
      { n: 55, tipo: 'emparejar', pregunta: 'Which person found that a benefit they had been promised was not what it seemed?', correcta: 0, explicacion: 'Lena: «the one thing I had been promised, a shorter commute, turned out to mean a twenty-minute walk through horizontal rain». A Gareth nadie le prometió nada: la expectativa venía de sus propias vacaciones.' },
      { n: 56, tipo: 'emparejar', pregunta: 'Which person has stayed much longer than they originally intended?', correcta: 2, explicacion: 'Carmen: «I moved abroad for a two-year contract and have now been here for eleven years».' },
    ],
  },
];
