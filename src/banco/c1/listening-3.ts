import type { Ejercicio } from '../tipos';
import { SUPERVISOR, dosVeces } from './listening';

// Cambridge C1 Advanced · Listening · examen 3. Guiones redactados de cero; el supervisor lee las instrucciones como en
// el examen. Formato oficial y guion tipo en docs/formatos.md. Los mp3 se generan con scripts/audios.py (edge-tts + ffmpeg).

export const LISTENING_C1_3: Ejercicio[] = [
  {
    id: 'c1-lis-1-extracts-3',
    examen: 'c1',
    destreza: 'listening',
    parte: 1,
    nombreParte: 'Multiple choice (extracts)',
    examenNumero: 3,
    instrucciones:
      'You will hear three different extracts. For questions 1–6, choose the answer (A, B or C) which fits best according to what you hear. There are two questions for each extract. You hear each extract twice.',
    minutos: 8,
    texto:
      'Extract One\nYou hear two friends talking about a play they took part in at a community theatre.\n\n' +
      'Extract Two\nYou hear part of a radio interview with a woman who has written a book about a long walk.\n\n' +
      'Extract Three\nYou hear two colleagues discussing their company’s plan to try a four-day working week.',
    audio: {
      archivo: 'audio/c1-lis-1-extracts-3.mp3',
      veces: 2,
      hablantes: [
        SUPERVISOR,
        { id: 'f1', descripcion: 'Woman (Extract One)', voz: 'en-GB-SoniaNeural' },
        { id: 'm1', descripcion: 'Man (Extract One)', voz: 'en-AU-WilliamNeural' },
        { id: 'int', descripcion: 'Interviewer (Extract Two)', voz: 'en-US-GuyNeural' },
        { id: 'f2', descripcion: 'Author, Rachel Doyle (Extract Two)', voz: 'en-IE-EmilyNeural' },
        { id: 'f3', descripcion: 'Woman (Extract Three)', voz: 'en-NZ-MollyNeural' },
        { id: 'm3', descripcion: 'Man (Extract Three)', voz: 'en-GB-ThomasNeural' },
      ],
      guion: [
        { quien: 'sup', texto: 'English Lab. Listening test three. Part One. You will hear three different extracts. For questions one to six, choose the answer, A, B or C, which fits best according to what you hear. There are two questions for each extract. You will hear each extract twice.' },
        { pausa: 2000 },
        { quien: 'sup', texto: 'Extract One. You hear two friends talking about a play they took part in at a community theatre. Now look at questions one and two.' },
        ...dosVeces(
          [
            { quien: 'm1', texto: 'So the show is over. Did it turn out the way you expected?' },
            { quien: 'f1', texto: 'Well, I expected it to be hard work, and it was, though no more than I had bargained for. Rehearsals three nights a week, lines to learn on the bus. I even expected to be terrified on the first night, and I was, I very nearly walked out. What I had not expected was that forty people of every age, a retired postman, a teenager, the vicar, would get on so well. By the third week we were eating together and swapping costumes. I think I will miss that more than the applause.' },
            { quien: 'm1', texto: 'I found the cast lovely too, but what I had never realised was how much waiting around there is. Hours in a cold hall for two minutes on stage. Still, I would do it again. The director has asked if I would like to try a bigger part next year, which I am flattered by, although I am honestly not sure my nerves could take it.' },
          ],
          15000,
        ),
        { quien: 'sup', texto: 'Extract Two. You hear part of a radio interview with a woman who has written a book about a long walk. Now look at questions three and four.' },
        ...dosVeces(
          [
            { quien: 'int', texto: 'Rachel, your book describes walking the whole length of the coast of Wales. People always want to know why. What was the reason?' },
            { quien: 'f2', texto: 'People expect a crisis, that I had lost my job or my marriage had ended. Nothing so dramatic, I am afraid. I turned fifty, and I realised that I had not done anything really difficult for years. I wanted to find out whether I still could. That was all.' },
            { quien: 'int', texto: 'And what surprised you most along the way?' },
            { quien: 'f2', texto: 'I had imagined the hardest thing would be the blisters, and the loneliness, and yes, the first few days were lonely. People were kind, too, but I had rather expected that. What astonished me was how little I needed. Everything I owned for those four months fitted in a rucksack that weighed eight kilos, and I did not miss a single thing I had left behind. I came home and looked at my house and wondered what all the cupboards were for.' },
          ],
          15000,
        ),
        { quien: 'sup', texto: 'Extract Three. You hear two colleagues discussing their company’s plan to try a four-day working week. Now look at questions five and six.' },
        ...dosVeces(
          [
            { quien: 'm3', texto: 'So the trial starts next month. You must be delighted.' },
            { quien: 'f3', texto: 'I am, mostly. Though I keep thinking about the Fridays. Clients will go on expecting answers whatever the company calendar says.' },
            { quien: 'm3', texto: 'That is not my worry, really. It is that we will end up squeezing five days of work into four. I read about another firm where that happened. People were exhausted by Thursday and the whole benefit disappeared within three months.' },
            { quien: 'f3', texto: 'Perhaps. But I think it depends on cutting the meetings. Half of ours could be an email. If they are serious about that, it will work. If not, then yes, we will all just be tired.' },
            { quien: 'm3', texto: 'If they did that, I would be won over.' },
          ],
          15000,
        ),
        { quien: 'sup', texto: 'That is the end of Part One.' },
      ],
    },
    items: [
      {
        n: 1,
        tipo: 'opciones',
        pregunta: 'What surprised the woman about taking part in the play?',
        opciones: ['how much work was involved', 'how well the cast got on', 'how nervous she felt on the first night'],
        correcta: 1,
        explicacion: '«What I had not expected was that forty people of every age… would get on so well» (B). El trabajo era «no more than I had bargained for» (A no) y los nervios del estreno sí los esperaba: «I even expected to be terrified» (C no).',
      },
      {
        n: 2,
        tipo: 'opciones',
        pregunta: 'How does the man feel about taking part again?',
        opciones: ['hesitant about accepting a larger role', 'disappointed not to have been offered a better part', 'unwilling to repeat the experience'],
        correcta: 0,
        explicacion: '«The director has asked if I would like to try a bigger part… I am flattered by, although I am honestly not sure my nerves could take it» (A). Dice «I would do it again» (C no) y no se queja de su papel (B no).',
      },
      {
        n: 3,
        tipo: 'opciones',
        pregunta: 'Why did the author decide to walk the coast?',
        opciones: ['She had lost her job.', 'She wanted to test herself.', 'She needed to recover from an illness.'],
        correcta: 1,
        explicacion: '«I had not done anything really difficult for years. I wanted to find out whether I still could» (B). Descarta A expresamente: «that I had lost my job… Nothing so dramatic». No menciona ninguna enfermedad (C no).',
      },
      {
        n: 4,
        tipo: 'opciones',
        pregunta: 'What does she say surprised her most about the walk?',
        opciones: ['the kindness of the people she met', 'how few possessions she needed', 'how lonely she felt'],
        correcta: 1,
        explicacion: '«What astonished me was how little I needed… I did not miss a single thing I had left behind» (B). La amabilidad la esperaba («I had rather expected that», A no) y la soledad solo duró «the first few days» (C no).',
      },
      {
        n: 5,
        tipo: 'opciones',
        pregunta: 'What is the man’s main concern about the four-day week?',
        opciones: ['Clients may complain.', 'Staff may have to work harder in less time.', 'The trial may be cancelled.'],
        correcta: 1,
        explicacion: '«We will end up squeezing five days of work into four… People were exhausted by Thursday» (B). Los clientes son la preocupación de ella: «That is not my worry, really» (A no). Nadie habla de cancelar la prueba (C no).',
      },
      {
        n: 6,
        tipo: 'opciones',
        pregunta: 'The woman believes the trial will be a success if',
        opciones: ['the company takes on more staff.', 'the number of meetings is reduced.', 'clients are warned in advance.'],
        correcta: 1,
        explicacion: '«I think it depends on cutting the meetings. Half of ours could be an email» (B). No habla de contratar más personal (A no), y los clientes son una preocupación aparte, no la condición del éxito (C no).',
      },
    ],
  },
  {
    id: 'c1-lis-2-mountain-hut-3',
    examen: 'c1',
    destreza: 'listening',
    parte: 2,
    nombreParte: 'Sentence completion',
    examenNumero: 3,
    titulo: 'A month in a mountain hut',
    instrucciones:
      'You will hear a student called Nina Rees talking about a month she spent working in a mountain hut. For questions 7–14, complete the sentences with a word or short phrase. You hear the recording twice.',
    minutos: 10,
    audio: {
      archivo: 'audio/c1-lis-2-mountain-hut-3.mp3',
      veces: 2,
      hablantes: [SUPERVISOR, { id: 'nina', descripcion: 'Nina Rees, a student', voz: 'en-GB-MaisieNeural' }],
      guion: [
        { quien: 'sup', texto: 'Part Two. You will hear a student called Nina Rees talking about a month she spent working in a mountain hut. For questions seven to fourteen, complete the sentences with a word or short phrase. You now have forty-five seconds to look at Part Two.' },
        ...dosVeces(
          [
            {
              quien: 'nina',
              texto:
                'Hello. I am Nina, and I would like to tell you about the month I spent last summer working in a mountain hut in the Alps. ' +
                'I heard about the job through my cousin, who had done the same thing two years earlier. She told me it would change my life, which I thought was a bit of an exaggeration. ' +
                'The hut stands at two thousand four hundred metres, and the only way to reach it is on foot, a climb of about four hours. A helicopter brings in supplies once a week, but the bread is different. The warden’s husband carries it up on his back every Friday, and you can smell it from the path. ' +
                'Before I started, I imagined I would spend my days cooking. In fact I was surprised by how much of my time went on washing up. We had eighty guests on a busy night, three courses, and one sink. ' +
                'There is no mains electricity up there. Everything runs on solar panels, so if the weather is bad for a few days, the lights go off at nine, and you learn to make your supper by torchlight. ' +
                'The hardest part was not the work or the altitude. It was the mornings. Guests who want to reach the summit before the clouds come in set off at four, so someone has to be up at half past three with the breakfast ready. That someone was usually me. ' +
                'In my third week a thunderstorm kept twenty walkers trapped in the hut for an extra day. I thought it would be a disaster. It turned out to be the best day of the summer. ' +
                'Which brings me to my favourite part of the day, the evenings. When the work was done, the guests played cards together, people from nine different countries, none of us with a language in common, shouting at each other over the rules. I have never laughed so much. ' +
                'It has left me with a plan. I am going back to university in September, but I want to train as a mountain guide after I graduate. My parents are still getting used to the idea. My cousin, of course, just said, I told you so.',
            },
          ],
          45000,
          10000,
          10000,
        ),
        { quien: 'sup', texto: 'That is the end of Part Two.' },
      ],
    },
    items: [
      { n: 7, tipo: 'palabra', frase: 'Nina heard about the job from her {{7}}.', correctas: ['cousin'], explicacion: '«I heard about the job through my cousin, who had done the same thing two years earlier».' },
      { n: 8, tipo: 'palabra', frase: 'A helicopter brings supplies once a week, but the {{8}} is carried up on foot.', correctas: ['bread'], explicacion: '«A helicopter brings in supplies once a week, but the bread is different. The warden’s husband carries it up on his back».' },
      { n: 9, tipo: 'palabra', frase: 'Nina was surprised by how much of her time went on {{9}}.', correctas: ['washing up', 'washing-up', 'the washing up', 'the washing-up'], explicacion: '«I imagined I would spend my days cooking. In fact I was surprised by how much of my time went on washing up».' },
      { n: 10, tipo: 'palabra', frase: 'The hut gets its electricity from {{10}} panels.', correctas: ['solar'], explicacion: '«There is no mains electricity up there. Everything runs on solar panels».' },
      { n: 11, tipo: 'palabra', frase: 'Guests who want to reach the summit leave the hut at {{11}} in the morning.', correctas: ['four', '4', '4am', '4 am', '4 a.m.', 'four o’clock', 'four o\'clock'], explicacion: '«Guests who want to reach the summit before the clouds come in set off at four». A las tres y media se levanta Nina, no los huéspedes.' },
      { n: 12, tipo: 'palabra', frase: 'In Nina’s third week, a {{12}} kept twenty walkers in the hut for an extra day.', correctas: ['thunderstorm', 'storm'], explicacion: '«In my third week a thunderstorm kept twenty walkers trapped in the hut for an extra day».' },
      { n: 13, tipo: 'palabra', frase: 'In the evenings, the guests played {{13}} together.', correctas: ['cards', 'card games', 'a card game'], explicacion: '«When the work was done, the guests played cards together, people from nine different countries».' },
      { n: 14, tipo: 'palabra', frase: 'After she graduates, Nina wants to train as a {{14}}.', correctas: ['mountain guide', 'guide'], explicacion: '«I want to train as a mountain guide after I graduate».' },
    ],
  },
  {
    id: 'c1-lis-3-village-radio-3',
    examen: 'c1',
    destreza: 'listening',
    parte: 3,
    nombreParte: 'Multiple choice (interview)',
    examenNumero: 3,
    titulo: 'A village radio station',
    instrucciones:
      'You will hear part of an interview with two people, Fran Calloway and Dev Chaudhry, who started a community radio station in their valley. For questions 15–20, choose the answer (A, B, C or D) which fits best according to what you hear. You hear the recording twice.',
    minutos: 10,
    audio: {
      archivo: 'audio/c1-lis-3-village-radio-3.mp3',
      veces: 2,
      hablantes: [
        SUPERVISOR,
        { id: 'int', descripcion: 'Interviewer', voz: 'en-GB-ThomasNeural' },
        { id: 'fra', descripcion: 'Fran Calloway', voz: 'en-AU-NatashaNeural' },
        { id: 'dev', descripcion: 'Dev Chaudhry', voz: 'en-IE-ConnorNeural' },
      ],
      guion: [
        { quien: 'sup', texto: 'Part Three. You will hear part of an interview with two people, Fran Calloway and Dev Chaudhry, who started a community radio station in their valley. For questions fifteen to twenty, choose the answer, A, B, C or D, which fits best according to what you hear. You now have seventy seconds to look at Part Three.' },
        ...dosVeces(
          [
            { quien: 'int', texto: 'Fran, Dev, welcome. Fran, the station began five years ago. People assume it was set up to replace the local newspaper, which had closed. Is that right?' },
            { quien: 'fra', texto: 'That is what people assume, but no, the paper had closed years earlier and nobody had missed it much. It started with the floods. The road was cut off for three days, nobody knew which bridges were open, and the only information was on social media, half of it wrong. A neighbour of ours had an old transmitter in his shed. By the end of that week we were reading out road reports from a kitchen table.' },
            { quien: 'int', texto: 'Dev, I imagine that the start was difficult. What was the biggest obstacle?' },
            { quien: 'dev', texto: 'Everyone expects me to say the licence, and it did take months of form-filling, but that was just paperwork. The money was fine too, we had a donated room and second-hand equipment. We even had more volunteers than we needed. What was hard was getting anybody to listen. People assumed a station run from a kitchen would be amateurish, and for the first six months our audience was, I would say, our mothers.' },
            { quien: 'int', texto: 'And what changed?' },
            { quien: 'fra', texto: 'Honestly, the phone-in. We put a gardening programme on a Sunday, presented by a man of eighty-one, Walter, who knew every plant in the valley, and the lines were jammed from the first minute. People ring in to ask, argue, boast about their marrows.' },
            { quien: 'dev', texto: 'It is true of everything that works. The programmes people love are the ones where they can pick up the phone. The news bulletin, the music shows, they are fine, but nobody talks about them in the shop the next morning.' },
            { quien: 'int', texto: 'Does it bother you when things go wrong on air?' },
            { quien: 'fra', texto: 'I used to try to stamp out every mistake. We even took a training course. But the day a listener heard a presenter’s dog knock the microphone off the table, and wrote in to say that was the moment she knew we were real, I changed my mind. The day we sound slick is the day we lose the audience.' },
            { quien: 'dev', texto: 'I would have said that years ago, but I am glad you got there.' },
            { quien: 'int', texto: 'Dev, I understand a large supermarket chain offered to sponsor the station.' },
            { quien: 'dev', texto: 'They did, and the money was generous, a lot more than we raise from local adverts. But they wanted a say in what we broadcast, and that would have been the end of it. We said thank you, and no. Nobody on the team argued.' },
            { quien: 'int', texto: 'Finally, where do you see the station in ten years? Dev?' },
            { quien: 'dev', texto: 'I would like to reach the next valleys. I get emails every month from people asking if we can cover them too, and I think it is possible.' },
            { quien: 'fra', texto: 'I would rather stay small, to be honest. What matters most to me is that in ten years somebody who grew up here is running it, not me. That is why we started the youth show last year. Four of those teenagers now present their own programmes, and they are better at it than we are.' },
          ],
          70000,
        ),
        { quien: 'sup', texto: 'That is the end of Part Three.' },
      ],
    },
    items: [
      {
        n: 15,
        tipo: 'opciones',
        pregunta: 'Fran says the radio station was originally set up',
        opciones: ['to replace a local newspaper.', 'to give young people experience of the media.', 'to provide information during an emergency.', 'to advertise local businesses.'],
        correcta: 2,
        explicacion: '«It started with the floods… nobody knew which bridges were open… we were reading out road reports from a kitchen table» (C). Lo del periódico es lo que «people assume» (A no); los jóvenes llegaron después y la publicidad, solo para pagar gastos.',
      },
      {
        n: 16,
        tipo: 'opciones',
        pregunta: 'What does Dev say was the greatest difficulty at the beginning?',
        opciones: ['getting a broadcasting licence', 'finding enough volunteers', 'paying for equipment', 'attracting an audience'],
        correcta: 3,
        explicacion: '«What was hard was getting anybody to listen… for the first six months our audience was, I would say, our mothers» (D). La licencia fue «just paperwork» (A), tenían más voluntarios de los necesarios (B) y el dinero estaba «fine» (C).',
      },
      {
        n: 17,
        tipo: 'opciones',
        pregunta: 'What do Fran and Dev agree about the most successful programmes?',
        opciones: ['They are presented by experienced broadcasters.', 'They are broadcast at weekends.', 'They are the news programmes.', 'They allow listeners to take part.'],
        correcta: 3,
        explicacion: 'Fran: «People ring in to ask, argue, boast»; Dev: «The programmes people love are the ones where they can pick up the phone» (D). El presentador de la tertulia tiene 81 años y no es profesional (A no); el domingo es un dato, no la razón del éxito (B no); las noticias «are fine» pero nadie habla de ellas (C no).',
      },
      {
        n: 18,
        tipo: 'opciones',
        pregunta: 'How does Fran now feel about mistakes made on air?',
        opciones: ['She would like to remove them through more training.', 'She thinks they make the station seem genuine.', 'She is only willing to accept them in music programmes.', 'She believes they put listeners off.'],
        correcta: 1,
        explicacion: '«The day a listener heard a presenter’s dog knock the microphone… that was the moment she knew we were real, I changed my mind. The day we sound slick is the day we lose the audience» (B). Antes intentaba eliminarlos, incluso con un curso (A es lo que pensaba antes).',
      },
      {
        n: 19,
        tipo: 'opciones',
        pregunta: 'Why did the station refuse the supermarket’s offer?',
        opciones: ['The amount of money was too small.', 'The company wanted influence over programme content.', 'Some of the volunteers objected to the company.', 'The offer would have meant moving to new premises.'],
        correcta: 1,
        explicacion: '«They wanted a say in what we broadcast, and that would have been the end of it» (B). El dinero era generoso, «a lot more than we raise from local adverts» (A no), y nadie del equipo discutió la decisión (C no).',
      },
      {
        n: 20,
        tipo: 'opciones',
        pregunta: 'What does Fran most want for the station’s future?',
        opciones: ['to broadcast to neighbouring valleys', 'to start a television channel', 'to see it run by young local people', 'to stay exactly as it is'],
        correcta: 2,
        explicacion: '«What matters most to me is that in ten years somebody who grew up here is running it… That is why we started the youth show» (C). Ampliar a otros valles es el deseo de Dev (A es el distractor); ella prefiere seguir pequeña, pero no dice que no quiera cambios (D no).',
      },
    ],
  },
  {
    id: 'c1-lis-4-best-advice-3',
    examen: 'c1',
    destreza: 'listening',
    parte: 4,
    nombreParte: 'Multiple matching',
    examenNumero: 3,
    instrucciones:
      'You will hear five short extracts in which people are talking about a piece of advice they were given. While you listen you must complete both tasks. TASK ONE: for questions 21–25, choose from the list (A–H) the person who gave the advice. TASK TWO: for questions 26–30, choose from the list (A–H) how the advice has affected each speaker. You hear the recording twice.',
    minutos: 10,
    listas: [
      {
        titulo: 'Task One · the person who gave the advice',
        opciones: ['a parent', 'a teacher', 'a former boss', 'a neighbour', 'a friend', 'a sports coach', 'a stranger', 'a grandparent'],
      },
      {
        titulo: 'Task Two · how the advice has affected the speaker',
        opciones: [
          'It made me braver about taking risks.',
          'It helped me manage my money.',
          'It made me less critical of other people.',
          'It helped me stay calm under pressure.',
          'It made me more patient.',
          'It encouraged me to change career.',
          'It taught me to say no.',
          'It made me appreciate small pleasures.',
        ],
      },
    ],
    audio: {
      archivo: 'audio/c1-lis-4-best-advice-3.mp3',
      veces: 2,
      hablantes: [
        SUPERVISOR,
        { id: 's1', descripcion: 'Speaker One', voz: 'en-GB-SoniaNeural' },
        { id: 's2', descripcion: 'Speaker Two', voz: 'en-NZ-MitchellNeural' },
        { id: 's3', descripcion: 'Speaker Three', voz: 'en-AU-NatashaNeural' },
        { id: 's4', descripcion: 'Speaker Four', voz: 'en-GB-RyanNeural' },
        { id: 's5', descripcion: 'Speaker Five', voz: 'en-IE-EmilyNeural' },
      ],
      guion: [
        { quien: 'sup', texto: 'Part Four consists of two tasks. You will hear five short extracts in which people are talking about a piece of advice they were given. Look at Task One. For questions twenty-one to twenty-five, choose from the list, A to H, the person who gave the advice. Now look at Task Two. For questions twenty-six to thirty, choose from the list, A to H, how the advice has affected each speaker. While you listen you must complete both tasks. You now have forty-five seconds to look at Part Four.' },
        ...dosVeces(
          [
            { quien: 'sup', texto: 'Speaker One.' },
            { pausa: 800 },
            { quien: 's1', texto: 'I was at a bus stop, in tears, because I had been offered a place on a course abroad and had spent a week looking for reasons to refuse it. A woman I had never met asked what was wrong, listened, and said, nobody ever feels ready, you just go. Then her bus came and she was gone. My mother had told me almost the same thing and I had ignored her completely, which says something about how advice works. I went. I have since moved countries twice and started a business, and each time I hear that sentence in my head.' },
            { pausa: 2500 },
            { quien: 'sup', texto: 'Speaker Two.' },
            { pausa: 800 },
            { quien: 's2', texto: 'My grandmother never had much money, and her great rule was, eat the good biscuit on a Tuesday. Do not save it for the visitor who never comes. As a teenager I thought it was a silly thing to say. Now I find myself buying the proper coffee for a Wednesday morning, or lighting the candle when nobody is coming for dinner. It has not helped me with money, I am still hopeless, but it has made the ordinary days a good deal better, and I think of her every time.' },
            { pausa: 2500 },
            { quien: 'sup', texto: 'Speaker Three.' },
            { pausa: 800 },
            { quien: 's3', texto: 'I worked in a hospital pharmacy for years, and my manager then, a very tall, quiet man, once said to me before a terrible meeting, anyone can be calm when things are going well. Breathe out slowly, and answer after you have counted to three. It sounded like nonsense, but I tried it that afternoon and it worked. I use it now in every difficult conversation, including with my teenage son, although I would not say he has noticed.' },
            { pausa: 2500 },
            { quien: 'sup', texto: 'Speaker Four.' },
            { pausa: 800 },
            { quien: 's4', texto: 'I swam at a good level when I was young, and I was impatient. I wanted to get faster every week, and when I did not, I sulked. My coach, a woman called Bev, just said, the water does not care how you feel, you have to come back tomorrow. At the time I found it infuriating. But I am not a swimmer any more, I am a carpenter, and the same sentence gets me through the weeks when a job drags on and nothing seems to come together. I am much easier to live with than I was.' },
            { pausa: 2500 },
            { quien: 'sup', texto: 'Speaker Five.' },
            { pausa: 800 },
            { quien: 's5', texto: 'I was the girl who said yes to every committee, every favour, every request, and I was worn out at nineteen. My literature teacher, who I think had been watching me for a while, kept me behind one afternoon and said, you are allowed to say no, and the world will carry on. It took me about a year to actually do it. These days I have quite a short list of commitments and I do all of them properly. My friends say I have become much more fun to be around, although that was never the point.' },
          ],
          45000,
          10000,
          10000,
        ),
        { quien: 'sup', texto: 'That is the end of Part Four.' },
      ],
    },
    items: [
      { n: 21, tipo: 'emparejar', lista: 0, pregunta: 'Speaker 1', correcta: 6, explicacion: '«A woman I had never met asked what was wrong, listened, and said, nobody ever feels ready, you just go»: una desconocida (G). Su madre dijo algo parecido pero no le hizo caso (A es el distractor).' },
      { n: 22, tipo: 'emparejar', lista: 0, pregunta: 'Speaker 2', correcta: 7, explicacion: '«My grandmother never had much money, and her great rule was, eat the good biscuit on a Tuesday»: la abuela (H).' },
      { n: 23, tipo: 'emparejar', lista: 0, pregunta: 'Speaker 3', correcta: 2, explicacion: '«My manager then, a very tall, quiet man, once said to me… anyone can be calm when things are going well»: su antiguo jefe (C).' },
      { n: 24, tipo: 'emparejar', lista: 0, pregunta: 'Speaker 4', correcta: 5, explicacion: '«My coach, a woman called Bev, just said, the water does not care how you feel»: su entrenadora (F).' },
      { n: 25, tipo: 'emparejar', lista: 0, pregunta: 'Speaker 5', correcta: 1, explicacion: '«My literature teacher… kept me behind one afternoon and said, you are allowed to say no»: su profesora (B).' },
      { n: 26, tipo: 'emparejar', lista: 1, pregunta: 'Speaker 1', correcta: 0, explicacion: '«I have since moved countries twice and started a business, and each time I hear that sentence in my head»: la ha hecho más valiente para arriesgarse (A).' },
      { n: 27, tipo: 'emparejar', lista: 1, pregunta: 'Speaker 2', correcta: 7, explicacion: '«It has made the ordinary days a good deal better»: disfruta de los pequeños placeres (H). Con el dinero no ha ayudado: «It has not helped me with money, I am still hopeless» (B no).' },
      { n: 28, tipo: 'emparejar', lista: 1, pregunta: 'Speaker 3', correcta: 3, explicacion: '«Breathe out slowly, and answer after you have counted to three… I use it now in every difficult conversation»: mantener la calma bajo presión (D).' },
      { n: 29, tipo: 'emparejar', lista: 1, pregunta: 'Speaker 4', correcta: 4, explicacion: '«The same sentence gets me through the weeks when a job drags on… I am much easier to live with»: más paciente (E).' },
      { n: 30, tipo: 'emparejar', lista: 1, pregunta: 'Speaker 5', correcta: 6, explicacion: '«You are allowed to say no… These days I have quite a short list of commitments»: aprendió a decir que no (G).' },
    ],
  },
];
