import type { Ejercicio, LineaGuion } from '../tipos';

// Cambridge C1 Advanced · Listening. Guiones redactados de cero; el supervisor lee las instrucciones como en el examen.
// Formato oficial y guion tipo en docs/formatos.md. Los mp3 se generan con scripts/audios.py (edge-tts + ffmpeg).

export const SUPERVISOR = { id: 'sup', descripcion: 'Supervisor', voz: 'en-GB-LibbyNeural' };

/** Un trozo que en el examen se oye dos veces: aviso, pausa, audio, pausa, «again», audio, pausa. */
export function dosVeces(lineas: LineaGuion[], antes: number, entre = 5000, despues = 5000): LineaGuion[] {
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
  {
    id: 'c1-lis-3-repair-cafe-1',
    examen: 'c1',
    destreza: 'listening',
    parte: 3,
    nombreParte: 'Multiple choice (interview)',
    examenNumero: 1,
    titulo: 'A repair café',
    instrucciones:
      'You will hear part of an interview with two people, Hannah Reyes and Marcus Boyd, who organise a repair café, where volunteers help people mend broken household objects. For questions 15–20, choose the answer (A, B, C or D) which fits best according to what you hear. You hear the recording twice.',
    minutos: 10,
    audio: {
      archivo: 'audio/c1-lis-3-repair-cafe-1.mp3',
      veces: 2,
      hablantes: [
        SUPERVISOR,
        { id: 'int', descripcion: 'Interviewer', voz: 'en-GB-ThomasNeural' },
        { id: 'han', descripcion: 'Hannah Reyes', voz: 'en-GB-SoniaNeural' },
        { id: 'mar', descripcion: 'Marcus Boyd', voz: 'en-IE-ConnorNeural' },
      ],
      guion: [
        { quien: 'sup', texto: 'Part Three. You will hear part of an interview with two people, Hannah Reyes and Marcus Boyd, who organise a repair café, where volunteers help people mend broken household objects. For questions fifteen to twenty, choose the answer, A, B, C or D, which fits best according to what you hear. You now have seventy seconds to look at Part Three.' },
        ...dosVeces(
          [
            { quien: 'int', texto: 'Hannah, Marcus, welcome. Hannah, the repair café was your idea originally. Where did it come from?' },
            { quien: 'han', texto: 'From a toaster, believe it or not. Mine stopped working, and it was a good one, so I spent a whole afternoon ringing around trying to find somebody who would look at it. Nobody would. The shops told me to buy a new one, and the one repair man I found said it would cost more than the toaster was worth. I was absolutely furious, and I thought, there must be other people in this position. The environmental side of it, all the waste we produce, I only really started thinking about later, once we were up and running. And yes, I have met half the neighbourhood through it, but that was never the plan.' },
            { quien: 'int', texto: 'Marcus, you look after the volunteers. Who are they?' },
            { quien: 'mar', texto: 'People always assume they are all retired engineers, and we do have a couple. But we also have a seventeen-year-old who fixes phones, a nurse who sews, a bus driver who is a genius with bicycles. And when you ask them why they come, you get a different answer every time. One does it for the company, one because she hates waste, one, frankly, because he likes being the person who knows things. What they have in common is that they are happy to explain what they are doing, which matters, because we are not a free repair service. Most of them have been with us for years now.' },
            { quien: 'int', texto: 'And the people who bring things in. What are they like?' },
            { quien: 'han', texto: 'Some of them have genuinely never held a screwdriver, and I will admit that can be funny. But what strikes me again and again is that they want to learn. They could sit and wait while we fix it; instead, nearly everyone pulls up a chair and asks to have a go.' },
            { quien: 'mar', texto: 'That is my experience too. I expected people to drop things off and come back later, as if we were a shop. Hardly anyone does. They want to be able to do it themselves next time, and they are not afraid to ask what must feel like stupid questions.' },
            { quien: 'int', texto: 'Marcus, what gets in the way of a repair? What is the biggest obstacle?' },
            { quien: 'mar', texto: 'People will tell you it is the parts, and parts can be expensive, that is true. But the real problem comes earlier than that. So many products are now put together in a way that assumes they will never be opened: glued shut, with screws you need special tools for, batteries you cannot reach. The manufacturer has decided for you that the thing is disposable. Once you are inside, honestly, most repairs are not that difficult.' },
            { quien: 'int', texto: 'Hannah, where does the café go from here?' },
            { quien: 'han', texto: 'I get asked whether we should start charging and turn it into a business, and I always say no, that would change what it is. We are busier every month, which is wonderful, but I will be honest: if three particular people stopped coming, I am not sure we would survive. That worries me more than anything. I am not going anywhere, but we need to spread the load.' },
            { quien: 'int', texto: 'Last question for both of you. What is the single most important thing the café does?' },
            { quien: 'mar', texto: 'Everyone quotes the figures, the tonnes of waste we have kept out of landfill, and that is real. But for me it is what people take home that matters, and I do not mean the toaster. They leave knowing how to do something they could not do when they arrived.' },
            { quien: 'han', texto: 'I would say exactly the same. The money people save is nice, and the friendships are lovely, but watching someone realise they can fix things themselves, that is the point of it.' },
          ],
          70000,
          10000,
          10000,
        ),
        { quien: 'sup', texto: 'That is the end of Part Three.' },
      ],
    },
    items: [
      {
        n: 15,
        tipo: 'opciones',
        pregunta: 'Hannah says she started the repair café because',
        opciones: ['she was frustrated by how hard it was to get something fixed.', 'she wanted to meet people in her neighbourhood.', 'she had skills she was not using in her job.', 'she was worried about the amount of waste being produced.'],
        correcta: 0,
        explicacion: 'La tostadora: «Nobody would… I was absolutely furious» (A). Lo del desperdicio lo pensó «later» (D no) y conocer al barrio «was never the plan» (B no).',
      },
      {
        n: 16,
        tipo: 'opciones',
        pregunta: 'What does Marcus say about the volunteers?',
        opciones: ['Most of them are retired professionals.', 'They are reluctant to teach others.', 'Their reasons for coming vary more than people assume.', 'They tend not to stay for long.'],
        correcta: 2,
        explicacion: '«People always assume they are all retired engineers… you get a different answer every time» (C). Les gusta explicar (B no) y «most of them have been with us for years» (D no).',
      },
      {
        n: 17,
        tipo: 'opciones',
        pregunta: 'How do Hannah and Marcus both feel about the people who bring things in?',
        opciones: ['amused by how little some of them know', 'impressed by their willingness to learn', 'concerned that they expect too much', 'irritated when they do not help'],
        correcta: 1,
        explicacion: 'Los dos: «they want to learn… asks to have a go» y «they want to be able to do it themselves next time» (B). Lo de la gracia lo dice solo Hannah y de pasada (A no es lo que comparten).',
      },
      {
        n: 18,
        tipo: 'opciones',
        pregunta: 'Marcus thinks the biggest obstacle to repairing modern products is',
        opciones: ['the cost of spare parts.', 'the way they are designed.', 'the lack of instructions from manufacturers.', 'the attitude of the owners.'],
        correcta: 1,
        explicacion: '«The real problem comes earlier than that… glued shut, screws you need special tools for» (B). Los repuestos son lo que «people will tell you», no su opinión (A es el distractor).',
      },
      {
        n: 19,
        tipo: 'opciones',
        pregunta: 'What does Hannah say about the future of the café?',
        opciones: ['She would like it to become a paid service.', 'She is confident it will keep growing.', 'She fears it depends too much on a few people.', 'She intends to hand it over to someone else.'],
        correcta: 2,
        explicacion: '«If three particular people stopped coming, I am not sure we would survive. That worries me more than anything» (C). Cobrar: «I always say no» (A no). «I am not going anywhere» (D no).',
      },
      {
        n: 20,
        tipo: 'opciones',
        pregunta: 'Marcus and Hannah agree that the main benefit of the café is',
        opciones: ['the money people save.', 'the sense of community it creates.', 'the skills people take away.', 'the reduction in waste.'],
        correcta: 2,
        explicacion: 'Marcus: «they leave knowing how to do something»; Hannah: «watching someone realise they can fix things themselves, that is the point» (C). El desperdicio es «real» pero no lo principal (D no).',
      },
    ],
  },
  {
    id: 'c1-lis-4-solo-journeys-1',
    examen: 'c1',
    destreza: 'listening',
    parte: 4,
    nombreParte: 'Multiple matching',
    examenNumero: 1,
    instrucciones:
      'You will hear five short extracts in which people are talking about a journey they made on their own. While you listen you must complete both tasks. TASK ONE: for questions 21–25, choose from the list (A–H) the reason each speaker gives for travelling alone. TASK TWO: for questions 26–30, choose from the list (A–H) what each speaker says they gained from the journey. You hear the recording twice.',
    minutos: 10,
    listas: [
      {
        titulo: 'Task One · the reason each speaker gives for travelling alone',
        opciones: ['to recover from a difficult time', 'to prove something to their family', 'because a companion dropped out', 'to practise a language', 'to avoid having to compromise', 'as part of their work', 'to visit a relative', 'because it was cheaper'],
      },
      {
        titulo: 'Task Two · what each speaker says they gained from the journey',
        opciones: ['greater patience', 'a new interest', 'a lasting friendship', 'confidence in their own judgement', 'a change of career', 'a better relationship with their family', 'an appreciation of home', 'a desire to travel more'],
      },
    ],
    audio: {
      archivo: 'audio/c1-lis-4-solo-journeys-1.mp3',
      veces: 2,
      hablantes: [
        SUPERVISOR,
        { id: 's1', descripcion: 'Speaker One', voz: 'en-GB-RyanNeural' },
        { id: 's2', descripcion: 'Speaker Two', voz: 'en-AU-NatashaNeural' },
        { id: 's3', descripcion: 'Speaker Three', voz: 'en-IE-EmilyNeural' },
        { id: 's4', descripcion: 'Speaker Four', voz: 'en-GB-ThomasNeural' },
        { id: 's5', descripcion: 'Speaker Five', voz: 'en-GB-MaisieNeural' },
      ],
      guion: [
        { quien: 'sup', texto: 'Part Four consists of two tasks. You will hear five short extracts in which people are talking about a journey they made on their own. Look at Task One. For questions twenty-one to twenty-five, choose from the list, A to H, the reason each speaker gives for travelling alone. Now look at Task Two. For questions twenty-six to thirty, choose from the list, A to H, what each speaker says they gained from the journey. While you listen you must complete both tasks. You now have forty-five seconds to look at Part Four.' },
        ...dosVeces(
          [
            { quien: 'sup', texto: 'Speaker One.' },
            { pausa: 800 },
            { quien: 's1', texto: 'It was supposed to be the two of us, my brother and me, three weeks walking across the north of Spain. Then a week before we left he broke his ankle playing football, and everyone assumed I would cancel. I nearly did. But the tickets were bought and I thought, why not. The first few days were hard, I will not pretend otherwise. By the end, though, something had shifted. I had made every decision for three weeks, where to sleep, when to stop, which way to go, and nothing terrible had happened. I came home trusting myself in a way I simply had not before.' },
            { pausa: 2500 },
            { quien: 'sup', texto: 'Speaker Two.' },
            { pausa: 800 },
            { quien: 's2', texto: 'I love my friends, but travelling with them is exhausting. Somebody wants the beach, somebody wants the museum, somebody is hungry, and you spend half the holiday negotiating. So last year I went to the Scottish islands by myself, and I did exactly what I wanted every single day, which was mostly nothing. On about the fourth day I borrowed some binoculars from the woman who ran the guesthouse, just to pass the time, and now, a year later, I have my own pair and I spend every weekend looking at birds. I had never given them a second thought before.' },
            { pausa: 2500 },
            { quien: 'sup', texto: 'Speaker Three.' },
            { pausa: 800 },
            { quien: 's3', texto: 'I did not choose to go alone, the company sent me. Six weeks in a city where I knew nobody, setting up a new office. I expected it to be lonely, and the first fortnight it was. Then I started having lunch in the same tiny place every day, and the owner, who was about my mother’s age, started sitting down with me. We talked about everything. That was eight years ago. We still write to each other every month, and she came to my wedding. I have had plenty of work trips since, but that is the one I think about.' },
            { pausa: 2500 },
            { quien: 'sup', texto: 'Speaker Four.' },
            { pausa: 800 },
            { quien: 's4', texto: 'I went because I needed to get away. I had been through a rough year, a divorce, my father’s illness, and I was not sleeping. A friend lent me a cottage on the coast of Portugal and I went for a month, on my own, with a pile of books. I walked a great deal and I did a lot of thinking. People expect me to say it made me want to keep travelling, and I understand why, but the truth is the opposite. What I discovered, sitting on that beautiful empty beach, was how much I missed my own kitchen, my own street, the people who knew me. I came home early.' },
            { pausa: 2500 },
            { quien: 'sup', texto: 'Speaker Five.' },
            { pausa: 800 },
            { quien: 's5', texto: 'My Italian was terrible, and I was fed up with it, so I went to Bologna for a month with a rule: no English. If I had gone with anyone from home, we would have spoken English the whole time, so it had to be alone. It was embarrassing at first, ordering coffee like a toddler. But it worked, more or less. The thing I did not expect was what it did to me afterwards. I had never been much of a traveller, and now I cannot stop planning the next trip. I have a list of six countries on my wall.' },
          ],
          45000,
          10000,
          10000,
        ),
        { quien: 'sup', texto: 'That is the end of Part Four.' },
      ],
    },
    items: [
      { n: 21, tipo: 'emparejar', lista: 0, pregunta: 'Speaker 1', correcta: 2, explicacion: 'Iba con su hermano y «he broke his ankle… everyone assumed I would cancel»: el acompañante se cayó (C).' },
      { n: 22, tipo: 'emparejar', lista: 0, pregunta: 'Speaker 2', correcta: 4, explicacion: '«You spend half the holiday negotiating… I did exactly what I wanted every single day»: para no tener que ceder (E).' },
      { n: 23, tipo: 'emparejar', lista: 0, pregunta: 'Speaker 3', correcta: 5, explicacion: '«I did not choose to go alone, the company sent me… setting up a new office»: por trabajo (F).' },
      { n: 24, tipo: 'emparejar', lista: 0, pregunta: 'Speaker 4', correcta: 0, explicacion: '«I had been through a rough year, a divorce, my father’s illness»: para recuperarse de una mala racha (A).' },
      { n: 25, tipo: 'emparejar', lista: 0, pregunta: 'Speaker 5', correcta: 3, explicacion: '«My Italian was terrible… a rule: no English… it had to be alone»: para practicar un idioma (D).' },
      { n: 26, tipo: 'emparejar', lista: 1, pregunta: 'Speaker 1', correcta: 3, explicacion: '«I had made every decision for three weeks… I came home trusting myself»: confianza en su propio criterio (D).' },
      { n: 27, tipo: 'emparejar', lista: 1, pregunta: 'Speaker 2', correcta: 1, explicacion: 'Los prismáticos: «now… I spend every weekend looking at birds. I had never given them a second thought»: una afición nueva (B).' },
      { n: 28, tipo: 'emparejar', lista: 1, pregunta: 'Speaker 3', correcta: 2, explicacion: 'La dueña del restaurante: «we still write to each other every month, and she came to my wedding»: una amistad duradera (C).' },
      { n: 29, tipo: 'emparejar', lista: 1, pregunta: 'Speaker 4', correcta: 6, explicacion: '«How much I missed my own kitchen, my own street… I came home early»: valorar su casa (G). Dice explícitamente que NO le dio ganas de viajar más (H es el distractor).' },
      { n: 30, tipo: 'emparejar', lista: 1, pregunta: 'Speaker 5', correcta: 7, explicacion: '«Now I cannot stop planning the next trip. I have a list of six countries»: ganas de viajar más (H).' },
    ],
  },
];
