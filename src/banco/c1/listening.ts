import type { Ejercicio, LineaGuion } from '../tipos';

// Cambridge C1 Advanced · Listening. Guiones redactados de cero; el supervisor lee las instrucciones como en el examen.
// Formato oficial y guion tipo en docs/formatos.md. Los mp3 se generan con scripts/audios.py (edge-tts + ffmpeg).

const SUPERVISOR = { id: 'sup', descripcion: 'Supervisor', voz: 'en-GB-LibbyNeural' };

/** Un trozo que en el examen se oye dos veces: aviso, pausa, audio, pausa, «again», audio, pausa. */
function dosVeces(lineas: LineaGuion[], antes: number, entre = 5000, despues = 5000): LineaGuion[] {
  return [{ pausa: antes }, ...lineas, { pausa: entre }, { quien: 'sup', texto: 'Now you will hear it again.' }, { pausa: 1500 }, ...lineas, { pausa: despues }];
}

export const LISTENING_C1: Ejercicio[] = [
  {
    id: 'c1-lis-1-extracts-1',
    examen: 'c1',
    destreza: 'listening',
    parte: 1,
    nombreParte: 'Multiple choice (extracts)',
    examenNumero: 1,
    instrucciones:
      'You will hear three different extracts. For questions 1–6, choose the answer (A, B or C) which fits best according to what you hear. There are two questions for each extract. You hear each extract twice.',
    minutos: 8,
    texto:
      'Extract One\nYou hear two friends talking about a cookery course they attended.\n\n' +
      'Extract Two\nYou hear part of a radio interview with a woman who runs a small bookshop.\n\n' +
      'Extract Three\nYou hear two colleagues discussing a training day at work.',
    audio: {
      archivo: 'audio/c1-lis-1-extracts-1.mp3',
      veces: 2,
      hablantes: [
        SUPERVISOR,
        { id: 'm1', descripcion: 'Man (Extract One)', voz: 'en-GB-RyanNeural' },
        { id: 'f1', descripcion: 'Woman (Extract One)', voz: 'en-GB-SoniaNeural' },
        { id: 'int', descripcion: 'Interviewer (Extract Two)', voz: 'en-IE-ConnorNeural' },
        { id: 'f2', descripcion: 'Bookshop owner (Extract Two)', voz: 'en-AU-NatashaNeural' },
        { id: 'm3', descripcion: 'Man (Extract Three)', voz: 'en-GB-ThomasNeural' },
        { id: 'f3', descripcion: 'Woman (Extract Three)', voz: 'en-IE-EmilyNeural' },
      ],
      guion: [
        { quien: 'sup', texto: 'English Lab. Listening test one. Part One. You will hear three different extracts. For questions one to six, choose the answer, A, B or C, which fits best according to what you hear. There are two questions for each extract. You will hear each extract twice.' },
        { pausa: 2000 },
        { quien: 'sup', texto: 'Extract One. You hear two friends talking about a cookery course they attended. Now look at questions one and two.' },
        ...dosVeces(
          [
            { quien: 'f1', texto: 'So, be honest, was the course worth the money? You were quite sceptical before we started.' },
            { quien: 'm1', texto: 'I was, and I still think it was overpriced. But I have to admit I got more out of it than I expected. Not so much from the recipes themselves, which you could find anywhere, and not really from the instructor telling me my sauce was too thin, which I knew already. It was the little things she showed us: how to hold the knife, how to get the pan properly hot before anything goes in. I use those every single day now.' },
            { quien: 'f1', texto: 'That is exactly what I noticed. I assumed I would forget everything within a week, the way I do with most courses. Instead I caught myself last night planning the whole meal in my head before I started, which I never used to do. I have no idea when that happened, but it has clearly stuck.' },
            { quien: 'm1', texto: 'So you would do another one?' },
            { quien: 'f1', texto: 'Only if someone else is paying.' },
          ],
          15000,
        ),
        { quien: 'sup', texto: 'Extract Two. You hear part of a radio interview with a woman who runs a small bookshop. Now look at questions three and four.' },
        ...dosVeces(
          [
            { quien: 'int', texto: 'Everyone told you a small bookshop could not survive these days. Five years on, you are still here. What did they get wrong?' },
            { quien: 'f2', texto: 'They underestimated the customers, mainly. I expected people to come in once, browse, and then buy the same book cheaper online. Some do, of course. But the surprising thing has been how many of them keep coming back week after week, even when they could get the book for less elsewhere. They want the shop to exist, and they have decided that buying here is how they make that happen.' },
            { quien: 'int', texto: 'And the big online retailers? Do you see them as the enemy?' },
            { quien: 'f2', texto: 'I used to. I cannot match their prices and I stopped trying years ago. But I have come round to a different view. They have made reading so cheap and so easy that there are simply more readers around than there were, and a certain number of those readers eventually want a real shop with a real person in it. In a strange way, they have been sending me customers without meaning to.' },
          ],
          15000,
        ),
        { quien: 'sup', texto: 'Extract Three. You hear two colleagues discussing a training day at work. Now look at questions five and six.' },
        ...dosVeces(
          [
            { quien: 'm3', texto: 'Well, that was a long day. Although, to be fair, it ran to time, which is more than you can say for most of these things.' },
            { quien: 'f3', texto: 'True, and the venue was fine, the lunch was fine, the slides worked. My problem is that none of it was about what we actually do. Two hours on presentation skills, when half of us have never given a presentation in our lives, and not a word about the new booking system, which is the thing everyone is struggling with.' },
            { quien: 'm3', texto: 'That is exactly what I thought. It was all competently done, it just answered questions nobody was asking. I am not going to make a fuss about it, there is no point complaining after the event. But they are already planning the next one, so I am going to put together a short list of what we would actually find useful and send it to the organisers before they book anyone.' },
            { quien: 'f3', texto: 'Put my name on it too.' },
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
        pregunta: 'What did the man find most useful about the course?',
        opciones: ['the chance to cook unfamiliar dishes', 'the feedback from the instructor', 'the techniques he was shown'],
        correcta: 2,
        explicacion: 'Dice que las recetas «you could find anywhere» (A no) y que el comentario de la profesora sobre la salsa ya lo sabía (B no). Lo útil fueron «the little things she showed us: how to hold the knife, how to get the pan properly hot» (C).',
      },
      {
        n: 2,
        tipo: 'opciones',
        pregunta: 'How does the woman feel about the course now?',
        opciones: ['disappointed by how little she remembers', 'surprised that it has changed her habits', 'annoyed that it was so expensive'],
        correcta: 1,
        explicacion: '«I assumed I would forget everything… Instead I caught myself… planning the whole meal… it has clearly stuck»: le sorprende que le haya cambiado la costumbre (B). Lo del precio lo dice él, no ella (C no).',
      },
      {
        n: 3,
        tipo: 'opciones',
        pregunta: 'What does the bookshop owner say about her customers?',
        opciones: ['They are more loyal than she expected.', 'They mostly come for recommendations.', 'They buy fewer books than before.'],
        correcta: 0,
        explicacion: '«The surprising thing has been how many of them keep coming back week after week, even when they could get the book for less elsewhere»: más fieles de lo que esperaba (A). No habla de recomendaciones ni de comprar menos.',
      },
      {
        n: 4,
        tipo: 'opciones',
        pregunta: 'What is her attitude to the big online retailers now?',
        opciones: ['She refuses to compete with them on price.', 'She believes they have made people read less.', 'She thinks they have unintentionally helped her.'],
        correcta: 2,
        explicacion: 'Antes los veía como el enemigo; ahora: «they have been sending me customers without meaning to» (C). Lo del precio es verdad pero es lo que hacía «years ago», no su actitud de ahora (A es un distractor). Dice que hay MÁS lectores, no menos (B no).',
      },
      {
        n: 5,
        tipo: 'opciones',
        pregunta: 'The two colleagues agree that the training day',
        opciones: ['was poorly organised.', 'dealt with the wrong topics.', 'went on for too long.'],
        correcta: 1,
        explicacion: 'Los dos dicen que estuvo bien organizado («ran to time», «the venue was fine…»). Ella: «none of it was about what we actually do»; él: «it answered questions nobody was asking» (B). Él dice que fue largo pero acabó a su hora: no es en lo que coinciden (C no).',
      },
      {
        n: 6,
        tipo: 'opciones',
        pregunta: 'What does the man intend to do?',
        opciones: ['complain to the organisers', 'suggest changes for next time', 'avoid future training days'],
        correcta: 1,
        explicacion: '«There is no point complaining after the event» (A no). «I am going to put together a short list of what we would actually find useful and send it to the organisers before they book anyone» (B).',
      },
    ],
  },
  {
    id: 'c1-lis-2-rescue-centre-1',
    examen: 'c1',
    destreza: 'listening',
    parte: 2,
    nombreParte: 'Sentence completion',
    examenNumero: 1,
    titulo: 'A summer at a wildlife rescue centre',
    instrucciones:
      'You will hear a student called Mia Carter talking about a summer she spent working at a wildlife rescue centre. For questions 7–14, complete the sentences with a word or short phrase. You hear the recording twice.',
    minutos: 10,
    audio: {
      archivo: 'audio/c1-lis-2-rescue-centre-1.mp3',
      veces: 2,
      hablantes: [SUPERVISOR, { id: 'mia', descripcion: 'Mia Carter, a student', voz: 'en-GB-MaisieNeural' }],
      guion: [
        { quien: 'sup', texto: 'Part Two. You will hear a student called Mia Carter talking about a summer she spent working at a wildlife rescue centre. For questions seven to fourteen, complete the sentences with a word or short phrase. You now have forty-five seconds to look at Part Two.' },
        ...dosVeces(
          [
            {
              quien: 'mia',
              texto:
                'Hi everyone. My name is Mia, and last summer I spent eight weeks as a volunteer at a wildlife rescue centre about an hour from where I live. People always assume I found it through the university, or through a friend who had done it before, but actually it was my dentist. She had a poster in her waiting room, and I was so bored waiting for my appointment that I read the whole thing and took a photo of it. ' +
                'Before I started, I was worried about the kind of animals I would have to deal with. I had read that the centre took in foxes and even the occasional deer, and I had visions of being bitten. In the end, the animal that really frightened me was a swan. If you have never had one hiss at you from close range, I can tell you it is far more alarming than any fox. ' +
                'People ask me what you need to do this kind of work, and they expect me to say that you need to love animals, or to be good at science. Those things help. But the quality the staff kept coming back to, and the one I lacked most at the beginning, was patience. Everything takes longer than you think, and nothing can be rushed. ' +
                'The days were long. The vans went out at seven, which sounds reasonable, except that the animals had to be fed and cleaned before that, so we started at six, and I am not a morning person. ' +
                'The thing that genuinely shocked me was the reason most of the animals were there. I had expected illness, or attacks by dogs and cats, and there was some of that. But by a long way the biggest cause of injury was cars. Hedgehogs, badgers, owls: almost all of them had been hit on the road. ' +
                'I enjoyed nearly everything, even the cleaning. The one task I dreaded was the paperwork. Every animal that came in needed a report for the vet, with weights and symptoms and what we had done, and writing those reports accurately when you are exhausted was by far the hardest part of my day. ' +
                'The centre itself is wonderful, but it has one enormous problem, and it is not money, although money is tight, and it is not staff. It is space. There are simply not enough pens, so in a busy week animals that should be kept apart end up next to each other. ' +
                'I am going back next year, but not to the same place. I have applied to a centre in Scotland that works with seals, which is a completely different world, and I cannot wait.',
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
      { n: 7, tipo: 'palabra', frase: 'Mia first heard about the rescue centre from her {{7}}.', correctas: ['dentist'], explicacion: '«It was my dentist. She had a poster in her waiting room». Universidad y amigo son los distractores («People always assume…»).' },
      { n: 8, tipo: 'palabra', frase: 'The animal that Mia found most frightening was a {{8}}.', correctas: ['swan'], explicacion: '«The animal that really frightened me was a swan». Foxes y deer son lo que temía antes de empezar.' },
      { n: 9, tipo: 'palabra', frase: 'According to the staff, the most important quality for the work is {{9}}.', correctas: ['patience'], explicacion: '«The quality the staff kept coming back to… was patience». Amar a los animales y la ciencia «help», pero no es lo principal.' },
      { n: 10, tipo: 'palabra', frase: 'Mia’s working day began at {{10}} in the morning.', correctas: ['six', '6', 'six o’clock', "six o'clock", '6 o’clock', "6 o'clock"], explicacion: 'Las furgonetas salían a las siete, pero «we started at six». El 7 es el distractor.' },
      { n: 11, tipo: 'palabra', frase: 'Mia was shocked to learn that most of the animals had been injured by {{11}}.', correctas: ['cars', 'a car', 'car'], explicacion: '«By a long way the biggest cause of injury was cars». Enfermedad y ataques de perros y gatos existían, pero eran menos.' },
      { n: 12, tipo: 'palabra', frase: 'The task Mia found hardest was writing {{12}} for the vet.', correctas: ['reports', 'the reports', 'a report'], explicacion: '«Every animal that came in needed a report for the vet… writing those reports accurately… was by far the hardest part».' },
      { n: 13, tipo: 'palabra', frase: 'Mia says the centre’s biggest problem is a lack of {{13}}.', correctas: ['space'], explicacion: '«It is not money… it is not staff. It is space». Dinero y personal son los distractores.' },
      { n: 14, tipo: 'palabra', frase: 'Next year Mia hopes to work at a centre in {{14}}.', correctas: ['Scotland'], explicacion: '«I have applied to a centre in Scotland that works with seals».' },
    ],
  },
];
