import type { Ejercicio } from '../tipos';
import { SUPERVISOR, dosVeces } from './listening';

// Cambridge C1 Advanced · Listening · examen 2. Guiones redactados de cero; el supervisor lee las instrucciones como en
// el examen. Formato oficial y guion tipo en docs/formatos.md. Los mp3 se generan con scripts/audios.py (edge-tts + ffmpeg).

export const LISTENING_C1_2: Ejercicio[] = [
  {
    id: 'c1-lis-1-extracts-2',
    examen: 'c1',
    destreza: 'listening',
    parte: 1,
    nombreParte: 'Multiple choice (extracts)',
    examenNumero: 2,
    instrucciones:
      'You will hear three different extracts. For questions 1–6, choose the answer (A, B or C) which fits best according to what you hear. There are two questions for each extract. You hear each extract twice.',
    minutos: 8,
    texto:
      'Extract One\nYou hear two friends talking about a small-town film festival they went to.\n\n' +
      'Extract Two\nYou hear part of a radio interview with a man who runs a bicycle delivery service.\n\n' +
      'Extract Three\nYou hear two colleagues discussing their company’s move to a new office.',
    audio: {
      archivo: 'audio/c1-lis-1-extracts-2.mp3',
      veces: 2,
      hablantes: [
        SUPERVISOR,
        { id: 'f1', descripcion: 'Woman (Extract One)', voz: 'en-GB-SoniaNeural' },
        { id: 'm1', descripcion: 'Man (Extract One)', voz: 'en-IE-ConnorNeural' },
        { id: 'int', descripcion: 'Interviewer (Extract Two)', voz: 'en-GB-ThomasNeural' },
        { id: 'm2', descripcion: 'Delivery company owner (Extract Two)', voz: 'en-NZ-MitchellNeural' },
        { id: 'f3', descripcion: 'Woman (Extract Three)', voz: 'en-AU-NatashaNeural' },
        { id: 'm3', descripcion: 'Man (Extract Three)', voz: 'en-GB-RyanNeural' },
      ],
      guion: [
        { quien: 'sup', texto: 'English Lab. Listening test two. Part One. You will hear three different extracts. For questions one to six, choose the answer, A, B or C, which fits best according to what you hear. There are two questions for each extract. You will hear each extract twice.' },
        { pausa: 2000 },
        { quien: 'sup', texto: 'Extract One. You hear two friends talking about a small-town film festival they went to. Now look at questions one and two.' },
        ...dosVeces(
          [
            { quien: 'm1', texto: 'So, now that you have had a week to think about it, what stays with you from the festival?' },
            { quien: 'f1', texto: 'Not the films, oddly. Some were wonderful and some were frankly hard work, which is what you expect from a programme like that. The talks with the directors were fine, if a bit long. What I keep coming back to is the town itself. The whole place turned into a cinema for four days. People watching films in the square with blankets, the baker running a late screening in his shop, children handing out the programmes. I have never felt anything like it at a festival.' },
            { quien: 'm1', texto: 'I know what you mean. And I will say this: I have been to the big festivals, where you queue for an hour and the screening starts late anyway. Here every film started on the dot, and if you had a question there was always somebody in a yellow T-shirt who actually knew the answer. Honestly, the big ones could learn a thing or two.' },
            { quien: 'f1', texto: 'It did get a bit chaotic on the Saturday evening, though.' },
            { quien: 'm1', texto: 'A bit, but they sorted it out in ten minutes. I have already put next year in my diary.' },
          ],
          15000,
        ),
        { quien: 'sup', texto: 'Extract Two. You hear part of a radio interview with a man who runs a bicycle delivery service. Now look at questions three and four.' },
        ...dosVeces(
          [
            { quien: 'int', texto: 'Your company delivers parcels across the city centre entirely by bike. Where did the idea come from?' },
            { quien: 'm2', texto: 'People assume I am a cycling fanatic, and I do enjoy it, but that was not it. I was working for an ordinary courier firm, vans, the usual thing, and I kept watching our drivers sit in traffic for forty minutes to travel a mile and a half. In the centre nobody could do the short trips quickly, and nobody seemed interested in trying. So I handed in my notice, which my mother thought was madness, and bought three cargo bikes.' },
            { quien: 'int', texto: 'And five years on, what is the hardest part of running it?' },
            { quien: 'm2', texto: 'Everyone asks about the rain, and yes, January is grim, but you buy decent clothing and you get on with it. Drivers are, honestly, more considerate than they were when we started. What keeps me awake at night is staffing. The job is hard, physically, and the people who are good at it tend to be young and move on after a year or so. I spend far more of my week recruiting than I do riding.' },
          ],
          15000,
        ),
        { quien: 'sup', texto: 'Extract Three. You hear two colleagues discussing their company’s move to a new office. Now look at questions five and six.' },
        ...dosVeces(
          [
            { quien: 'm3', texto: 'You have been very quiet about the new building. I thought you would be pleased, it is closer to your flat.' },
            { quien: 'f3', texto: 'It is, the journey is ten minutes shorter, and the building is lovely, I am not disputing any of that. It is the layout. One enormous room, no walls, everybody’s phone calls bouncing off the glass. I write for a living. I cannot do that with forty conversations going on around me.' },
            { quien: 'm3', texto: 'There are the little booths for calls.' },
            { quien: 'f3', texto: 'Four booths for sixty people. You do the maths.' },
            { quien: 'm3', texto: 'Look, I do not think it is a disaster, and I am sure we will adapt, we always do. What annoys me is that they sent round that survey asking what we wanted the week after the lease was signed. If they had asked six months earlier, we would have told them about the noise, and they could have planned for it. Now it is a fix after the fact, and fixes after the fact are always worse and more expensive.' },
            { quien: 'f3', texto: 'Well, at least you are annoyed too. I was starting to feel like the only one.' },
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
        pregunta: 'What does the woman say she remembers most about the festival?',
        opciones: ['the quality of the films', 'the atmosphere in the town', 'the talks given by the directors'],
        correcta: 1,
        explicacion: '«Not the films, oddly… The talks… were fine, if a bit long. What I keep coming back to is the town itself. The whole place turned into a cinema» (B). Las películas fueron desiguales (A no) y las charlas, «a bit long» (C no).',
      },
      {
        n: 2,
        tipo: 'opciones',
        pregunta: 'What does the man say about the way the festival was organised?',
        opciones: ['It compared well with larger events.', 'It relied too heavily on volunteers.', 'It became chaotic too often.'],
        correcta: 0,
        explicacion: '«I have been to the big festivals, where you queue for an hour… Here every film started on the dot… the big ones could learn a thing or two» (A). El caos del sábado lo menciona ella y él le quita importancia: «they sorted it out in ten minutes» (C no).',
      },
      {
        n: 3,
        tipo: 'opciones',
        pregunta: 'Why did the man start his bicycle delivery company?',
        opciones: ['He had always been passionate about cycling.', 'He noticed a need that van companies could not meet.', 'He had lost his job with a courier firm.'],
        correcta: 1,
        explicacion: '«In the centre nobody could do the short trips quickly, and nobody seemed interested in trying. So… I bought three cargo bikes» (B). Que le guste la bici «was not it» (A no) y no lo despidieron: «I handed in my notice» (C no).',
      },
      {
        n: 4,
        tipo: 'opciones',
        pregunta: 'What does he find most difficult about running the business now?',
        opciones: ['keeping enough riders', 'coping with the winter weather', 'dealing with other road users'],
        correcta: 0,
        explicacion: '«What keeps me awake at night is staffing… I spend far more of my week recruiting than I do riding» (A). La lluvia: «you get on with it» (B no); los conductores son «more considerate than they were» (C no).',
      },
      {
        n: 5,
        tipo: 'opciones',
        pregunta: 'What is the woman’s main objection to the new office?',
        opciones: ['It takes her longer to get there.', 'It is too noisy for the kind of work she does.', 'It has no rooms for private meetings.'],
        correcta: 1,
        explicacion: '«It is the layout. One enormous room, no walls, everybody’s phone calls… I write for a living. I cannot do that with forty conversations going on» (B). El trayecto es más corto (A no); hay cabinas para llamadas, aunque pocas (C no es su queja principal).',
      },
      {
        n: 6,
        tipo: 'opciones',
        pregunta: 'The man feels that the management',
        opciones: ['should have asked for staff opinions earlier.', 'has dealt with the move as well as possible.', 'did not budget enough for the move.'],
        correcta: 0,
        explicacion: '«They sent round that survey asking what we wanted the week after the lease was signed. If they had asked six months earlier, we would have told them about the noise» (A). No cree que sea un desastre, pero sí critica el momento de la encuesta (B no). El coste lo menciona solo como consecuencia de arreglar las cosas tarde (C no).',
      },
    ],
  },
  {
    id: 'c1-lis-2-city-bees-2',
    examen: 'c1',
    destreza: 'listening',
    parte: 2,
    nombreParte: 'Sentence completion',
    examenNumero: 2,
    titulo: 'A summer with an urban beekeeper',
    instrucciones:
      'You will hear a student called Leo Hartley talking about a summer he spent helping a beekeeper who keeps bees in the city. For questions 7–14, complete the sentences with a word or short phrase. You hear the recording twice.',
    minutos: 10,
    audio: {
      archivo: 'audio/c1-lis-2-city-bees-2.mp3',
      veces: 2,
      hablantes: [SUPERVISOR, { id: 'leo', descripcion: 'Leo Hartley, a student', voz: 'en-CA-LiamNeural' }],
      guion: [
        { quien: 'sup', texto: 'Part Two. You will hear a student called Leo Hartley talking about a summer he spent helping a beekeeper who keeps bees in the city. For questions seven to fourteen, complete the sentences with a word or short phrase. You now have forty-five seconds to look at Part Two.' },
        ...dosVeces(
          [
            {
              quien: 'leo',
              texto:
                'Hello. I am Leo, and I want to tell you about the ten weeks I spent this summer helping a woman called Ada, who keeps bees in the middle of the city. ' +
                'People assume I found her through the university, or that I saw something in the library, because that is where students find things. In fact it was a handwritten card pinned up at my local swimming pool, between an advert for guitar lessons and a lost cat. It said, help wanted, no experience needed, must not be afraid of heights. I nearly did not ring. ' +
                'The heights part is important, because Ada keeps her bees above the street. She has a few hives in a school garden and two in a car park, but most of them, about twenty, are on the roof of a hotel in the centre, which lets her use the space in exchange for honey for the breakfast tables. ' +
                'Before I started, I was worried about being stung, obviously, and about the height. What I had not thought about at all was the heat. You wear a full suit, gloves, a veil, and you are standing on a flat roof in July. I nearly fainted on my second day. The stings, when they came, were nothing by comparison. ' +
                'Ada has been doing this for thirty years, and I asked her once what makes a good beekeeper. I expected her to say knowledge, or being strong, because the boxes are heavy. She said the only thing that really matters is being calm. Bees read you. If you are rushed or frightened, they know, and they behave accordingly. ' +
                'The thing that genuinely surprised me was the honey. I had assumed city honey would be a poor cousin of the country stuff. It is the opposite, and the reason is not the lack of pesticides, although that helps. It is the sheer variety of flowers. A city has thousands of gardens, parks, balconies, railway banks, all with different plants, whereas a field has one crop. The honey from the hotel roof tastes different every month. ' +
                'I loved almost all of the work, even extracting, which is sticky and endless. The job I came to dread was labelling. Every single jar, by hand, with the date and the location, hundreds of them, and if the label was crooked Ada would quietly peel it off and hand it back. ' +
                'Ask people what threatens city bees and they say pollution, or the cold winters. Ada worries about neither. Her real fear is the number of hives. Beekeeping has become fashionable, and there are now so many hives in the city that the bees are competing for the same flowers, and some colonies simply cannot feed themselves. More bees, she says, is not the same as more bees surviving. ' +
                'One last thing. I arrived in June as an economics student. In September I am switching my degree to biology, which my parents are still getting used to. Ada, when I told her, just nodded and handed me a jar.',
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
      { n: 7, tipo: 'palabra', frase: 'Leo found out about the job from a card at his local {{7}}.', correctas: ['swimming pool', 'pool'], explicacion: '«A handwritten card pinned up at my local swimming pool». La universidad y la biblioteca son lo que «people assume».' },
      { n: 8, tipo: 'palabra', frase: 'Most of Ada’s hives are on the roof of a {{8}}.', correctas: ['hotel'], explicacion: '«Most of them, about twenty, are on the roof of a hotel in the centre». El jardín del colegio y el aparcamiento tienen solo unas pocas.' },
      { n: 9, tipo: 'palabra', frase: 'At the beginning, Leo’s biggest problem was in fact the {{9}}.', correctas: ['heat'], explicacion: '«What I had not thought about at all was the heat… I nearly fainted on my second day». Las picaduras y la altura eran lo que temía antes.' },
      { n: 10, tipo: 'palabra', frase: 'Ada believes that the most important quality in a beekeeper is being {{10}}.', correctas: ['calm'], explicacion: '«The only thing that really matters is being calm». Conocimientos y fuerza son lo que Leo esperaba que dijera.' },
      { n: 11, tipo: 'palabra', frase: 'Leo says city honey is better mainly because of the variety of {{11}} the bees can visit.', correctas: ['flowers'], explicacion: '«The reason is not the lack of pesticides, although that helps. It is the sheer variety of flowers».' },
      { n: 12, tipo: 'palabra', frase: 'The task Leo liked least was {{12}} the jars.', correctas: ['labelling', 'labeling'], explicacion: '«The job I came to dread was labelling. Every single jar, by hand». Extraer la miel le gustaba a pesar de ser pegajoso.' },
      { n: 13, tipo: 'palabra', frase: 'According to Ada, the greatest threat to the bees is the growing number of {{13}} in the city.', correctas: ['hives', 'beehives', 'bee hives'], explicacion: '«Her real fear is the number of hives… the bees are competing for the same flowers». Contaminación y frío son lo que dice la gente.' },
      { n: 14, tipo: 'palabra', frase: 'Leo has decided to change his degree to {{14}}.', correctas: ['biology'], explicacion: '«In September I am switching my degree to biology». Economía es lo que estudiaba antes.' },
    ],
  },
  {
    id: 'c1-lis-3-music-school-2',
    examen: 'c1',
    destreza: 'listening',
    parte: 3,
    nombreParte: 'Multiple choice (interview)',
    examenNumero: 2,
    titulo: 'A small music school',
    instrucciones:
      'You will hear part of an interview with two people, Grace Mallory and Sam Okafor, who left their careers to open a small music school. For questions 15–20, choose the answer (A, B, C or D) which fits best according to what you hear. You hear the recording twice.',
    minutos: 10,
    audio: {
      archivo: 'audio/c1-lis-3-music-school-2.mp3',
      veces: 2,
      hablantes: [
        SUPERVISOR,
        { id: 'int', descripcion: 'Interviewer', voz: 'en-IE-EmilyNeural' },
        { id: 'gra', descripcion: 'Grace Mallory', voz: 'en-GB-SoniaNeural' },
        { id: 'sam', descripcion: 'Sam Okafor', voz: 'en-GB-RyanNeural' },
      ],
      guion: [
        { quien: 'sup', texto: 'Part Three. You will hear part of an interview with two people, Grace Mallory and Sam Okafor, who left their careers to open a small music school. For questions fifteen to twenty, choose the answer, A, B, C or D, which fits best according to what you hear. You now have seventy seconds to look at Part Three.' },
        ...dosVeces(
          [
            { quien: 'int', texto: 'Grace, Sam, thank you for coming in. Grace, four years ago you were an accountant with a large firm. What made you walk away from that?' },
            { quien: 'gra', texto: 'People expect a dramatic story, and there is not one. I was not ill, and I was not unhappy, exactly. I was good at the job and well paid. But I got to the end of one tax year and realised I could not name a single thing I had done in twelve months that mattered to anybody. Teaching was not some childhood dream, by the way. I had never even considered it. It was Sam who suggested it, over a very long dinner, and I laughed at him.' },
            { quien: 'int', texto: 'Sam, you were a professional trumpet player. How was the first year of the school?' },
            { quien: 'sam', texto: 'Harder than either of us had imagined, but not for the reasons we had imagined. Money was tight, but roughly what we had planned for. We found the building in a fortnight, an old dentist’s surgery, oddly enough, which is why two of the rooms have sinks. What floored us was the administration. Insurance, safety checks, a form for every child, the accounts.' },
            { quien: 'gra', texto: 'Which you would think I would relish. I had spent twenty years doing other people’s accounts. Doing my own turned out to be a completely different kind of misery.' },
            { quien: 'int', texto: 'You teach children and adults. Is there a difference?' },
            { quien: 'sam', texto: 'Adults are a joy, with one exception: they apologise constantly. Every wrong note comes with a sorry. A child just plays it again.' },
            { quien: 'gra', texto: 'Exactly that. A child who gets something wrong is simply wrong, and moves on. An adult who gets something wrong believes it says something about them as a person. Half of what I do with my adult students is persuading them to stop judging themselves long enough to play.' },
            { quien: 'int', texto: 'Grace, what is your position on music exams? Some schools have abandoned them.' },
            { quien: 'gra', texto: 'We get asked this a lot, and I know several schools have gone exam-free entirely. We have not. For a certain kind of student, the one who needs a date on the calendar to practise at all, an exam is the best gift you can give them. For others it is poison; it turns something they love into something they fear. So we offer them, and we spend a surprising amount of time talking parents out of them.' },
            { quien: 'int', texto: 'Sam, looking back, is there anything you would do differently?' },
            { quien: 'sam', texto: 'Grace will tell you our fees were far too low, and she is right, but that was fixable, we simply put them up. What I would change is that we tried to do everything ourselves for two whole years. The teaching, the cleaning, the website, the phones. By the time we hired our first teacher we were both exhausted and, frankly, teaching badly. We should have done it in month six.' },
            { quien: 'gra', texto: 'I would have said the fees. But he is right. The staffing was the bigger mistake.' },
            { quien: 'int', texto: 'Last question for you both. What has the school given you, personally?' },
            { quien: 'gra', texto: 'People expect me to say freedom, and we certainly do not have that; I work longer hours now than I ever did at the firm. What I did not see coming was that I would fall back in love with the cello. Explaining a phrase to a nine-year-old forces you to hear it again, properly, for the first time in years.' },
            { quien: 'sam', texto: 'That is it exactly. I had not practised seriously for a decade when we opened. Now I do, every morning, partly because I am embarrassed not to in front of the students. The town has been very kind to us, and we have made friends, but that is not the thing. The thing is that I am playing again.' },
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
        pregunta: 'Grace says she left her job as an accountant because',
        opciones: ['she had always wanted to teach.', 'a health problem forced her to stop.', 'she felt her work had no real value.', 'she received an offer she could not refuse.'],
        correcta: 2,
        explicacion: '«I could not name a single thing I had done in twelve months that mattered to anybody» (C). «I was not ill» (B no); enseñar «was not some childhood dream» (A no).',
      },
      {
        n: 16,
        tipo: 'opciones',
        pregunta: 'According to Sam, the most difficult aspect of the first year was',
        opciones: ['losing more money than expected.', 'the amount of paperwork involved.', 'finding suitable premises.', 'disagreements about how to run the school.'],
        correcta: 1,
        explicacion: '«What floored us was the administration. Insurance, safety checks, a form for every child, the accounts» (B). El dinero fue «roughly what we had planned for» (A no) y el edificio lo encontraron «in a fortnight» (C no).',
      },
      {
        n: 17,
        tipo: 'opciones',
        pregunta: 'What do Grace and Sam both say about teaching adults?',
        opciones: ['They find it more rewarding than teaching children.', 'Adults are too hard on themselves.', 'Adults need more patience than children.', 'Adults are harder to motivate.'],
        correcta: 1,
        explicacion: 'Sam: «they apologise constantly»; Grace: «an adult who gets something wrong believes it says something about them as a person… persuading them to stop judging themselves» (B). Ninguno dice que sea más gratificante ni más difícil de motivar.',
      },
      {
        n: 18,
        tipo: 'opciones',
        pregunta: 'What is Grace’s view of music exams?',
        opciones: ['The school refuses to enter students for them.', 'They suit some students but harm others.', 'Parents value them more than they should.', 'They are becoming less relevant every year.'],
        correcta: 1,
        explicacion: '«For a certain kind of student… an exam is the best gift you can give them. For others it is poison» (B). La escuela sí los ofrece (A no). Que convencen a padres de no hacerlos es un detalle, no su postura general (C no).',
      },
      {
        n: 19,
        tipo: 'opciones',
        pregunta: 'What does Sam regret about the way they started?',
        opciones: ['charging too little for lessons', 'not employing other teachers sooner', 'leaving his previous career too suddenly', 'taking on too many students'],
        correcta: 1,
        explicacion: '«We tried to do everything ourselves for two whole years… We should have done it in month six» (B). Las tarifas bajas eran «fixable» y es lo que habría dicho Grace, aunque ella misma acaba dándole la razón (A es el distractor).',
      },
      {
        n: 20,
        tipo: 'opciones',
        pregunta: 'Grace and Sam agree that the main thing the school has given them is',
        opciones: ['more control over their time.', 'a renewed enthusiasm for playing their instruments.', 'a sense of belonging in the town.', 'a stronger partnership with each other.'],
        correcta: 1,
        explicacion: 'Grace: «I would fall back in love with the cello»; Sam: «The thing is that I am playing again» (B). Libertad: «we certainly do not have that» (A no); el pueblo «is not the thing» (C no).',
      },
    ],
  },
  {
    id: 'c1-lis-4-abandoned-hobbies-2',
    examen: 'c1',
    destreza: 'listening',
    parte: 4,
    nombreParte: 'Multiple matching',
    examenNumero: 2,
    instrucciones:
      'You will hear five short extracts in which people are talking about a hobby they gave up. While you listen you must complete both tasks. TASK ONE: for questions 21–25, choose from the list (A–H) the reason each speaker gives for giving up the hobby. TASK TWO: for questions 26–30, choose from the list (A–H) how each speaker feels about it now. You hear the recording twice.',
    minutos: 10,
    listas: [
      {
        titulo: 'Task One · the reason each speaker gives for giving up the hobby',
        opciones: ['an injury', 'the cost', 'a change in family circumstances', 'pressure from other people', 'the hobby becoming competitive', 'moving to another area', 'an unpleasant experience with a teacher', 'no longer finding it a challenge'],
      },
      {
        titulo: 'Task Two · how each speaker feels about it now',
        opciones: ['relieved to have stopped', 'determined to take it up again', 'sad about the friendships that were lost', 'grateful for what it taught them', 'guilty about the money spent', 'surprised at how little they miss it', 'nostalgic but with no wish to return', 'embarrassed about how seriously they took it'],
      },
    ],
    audio: {
      archivo: 'audio/c1-lis-4-abandoned-hobbies-2.mp3',
      veces: 2,
      hablantes: [
        SUPERVISOR,
        { id: 's1', descripcion: 'Speaker One', voz: 'en-AU-WilliamNeural' },
        { id: 's2', descripcion: 'Speaker Two', voz: 'en-GB-MaisieNeural' },
        { id: 's3', descripcion: 'Speaker Three', voz: 'en-GB-ThomasNeural' },
        { id: 's4', descripcion: 'Speaker Four', voz: 'en-NZ-MollyNeural' },
        { id: 's5', descripcion: 'Speaker Five', voz: 'en-CA-ClaraNeural' },
      ],
      guion: [
        { quien: 'sup', texto: 'Part Four consists of two tasks. You will hear five short extracts in which people are talking about a hobby they gave up. Look at Task One. For questions twenty-one to twenty-five, choose from the list, A to H, the reason each speaker gives for giving up the hobby. Now look at Task Two. For questions twenty-six to thirty, choose from the list, A to H, how each speaker feels about it now. While you listen you must complete both tasks. You now have forty-five seconds to look at Part Four.' },
        ...dosVeces(
          [
            { quien: 'sup', texto: 'Speaker One.' },
            { pausa: 800 },
            { quien: 's1', texto: 'I rowed for the pleasure of it, for years. Early mornings, mist on the river, nobody talking. It was not that I had got too good for it, far from it. Then the club put me in a crew, and suddenly it was all timings and rankings and a coach shouting at us from a bicycle on the bank. The fun drained out of it in a single season, and I stopped. I assumed I would be pining for it. I drive past the river most days, and I feel, honestly, not very much, which still surprises me. I am not embarrassed about any of it. It just quietly ended.' },
            { pausa: 2500 },
            { quien: 'sup', texto: 'Speaker Two.' },
            { pausa: 800 },
            { quien: 's2', texto: 'I danced from the age of six, ballet, four evenings a week. I had some knee trouble at fifteen, but that was not what finished it. My parents were convinced it would get in the way of my exams, my teachers at school said exactly the same, and at sixteen you simply do not have the arguments to push back against all of them at once. So I stopped. What I miss now is not the dancing. It is the girls I danced with. We saw each other practically every day for ten years, and within one term of my leaving we had lost touch completely. I think about that far more than I think about ballet.' },
            { pausa: 2500 },
            { quien: 'sup', texto: 'Speaker Three.' },
            { pausa: 800 },
            { quien: 's3', texto: 'Chess, at club level, every Tuesday evening for fifteen years. People assume it was the move that ended it, and we did move house around then, but the club was still only twenty minutes away. No, it was the twins. A hobby that needs four quiet hours on a weekday evening simply does not survive two newborn babies. I have kept the board, though, and the clock. The twins are seven now and can more or less put themselves to bed, and the plan, and it really is a plan, is that I will be back at the club in September. I have already emailed the secretary.' },
            { pausa: 2500 },
            { quien: 'sup', texto: 'Speaker Four.' },
            { pausa: 800 },
            { quien: 's4', texto: 'Pottery. I did it seriously for about six years. The evening classes were affordable enough; it was everything after that. Once I wanted to make more than the class allowed, there was clay, glazes, kiln time, renting a corner of a studio. Some months it was costing more than my rent, and eventually I had to stop. I am not relieved, exactly, and I do not regret a single penny. The strange thing is that I use it every day. Not the pottery itself. The patience, and the way it taught me to pay attention to my hands. I am a physiotherapist now, and I am convinced that is where my hands learned to notice things.' },
            { pausa: 2500 },
            { quien: 'sup', texto: 'Speaker Five.' },
            { pausa: 800 },
            { quien: 's5', texto: 'I played the trumpet from the age of nine, and I was decent. I had the same lovely teacher for six years, and then she retired. The man who replaced her, well, cruel is a strong word, but he mocked. He would imitate my mistakes back at me. After three lessons I put the trumpet in its case and never opened it again. That was twenty years ago. I hear a brass band in the street and I am fifteen again, completely happy, I could cry. But do I want to go back to it? No. That is a room I have left, and I am fine with the door being closed.' },
          ],
          45000,
          10000,
          10000,
        ),
        { quien: 'sup', texto: 'That is the end of Part Four.' },
      ],
    },
    items: [
      { n: 21, tipo: 'emparejar', lista: 0, pregunta: 'Speaker 1', correcta: 4, explicacion: '«The club put me in a crew, and suddenly it was all timings and rankings… The fun drained out of it»: el hobby se volvió competitivo (E). Descarta H expresamente: «It was not that I had got too good for it».' },
      { n: 22, tipo: 'emparejar', lista: 0, pregunta: 'Speaker 2', correcta: 3, explicacion: '«My parents were convinced it would get in the way of my exams, my teachers… said exactly the same»: presión de otras personas (D). La lesión de rodilla «was not what finished it» (A es el distractor).' },
      { n: 23, tipo: 'emparejar', lista: 0, pregunta: 'Speaker 3', correcta: 2, explicacion: '«It was the twins. A hobby that needs four quiet hours… does not survive two newborn babies»: cambio en la familia (C). La mudanza no fue la causa: «the club was still only twenty minutes away» (F es el distractor).' },
      { n: 24, tipo: 'emparejar', lista: 0, pregunta: 'Speaker 4', correcta: 1, explicacion: '«Clay, glazes, kiln time, renting a corner of a studio. Some months it was costing more than my rent»: el coste (B).' },
      { n: 25, tipo: 'emparejar', lista: 0, pregunta: 'Speaker 5', correcta: 6, explicacion: '«The man who replaced her… mocked. He would imitate my mistakes back at me. After three lessons I put the trumpet in its case»: una mala experiencia con un profesor (G).' },
      { n: 26, tipo: 'emparejar', lista: 1, pregunta: 'Speaker 1', correcta: 5, explicacion: '«I assumed I would be pining for it… I feel, honestly, not very much, which still surprises me»: le sorprende lo poco que lo echa de menos (F). «I am not embarrassed» descarta H.' },
      { n: 27, tipo: 'emparejar', lista: 1, pregunta: 'Speaker 2', correcta: 2, explicacion: '«What I miss now is not the dancing. It is the girls I danced with… we had lost touch completely»: pena por las amistades perdidas (C).' },
      { n: 28, tipo: 'emparejar', lista: 1, pregunta: 'Speaker 3', correcta: 1, explicacion: '«The plan, and it really is a plan, is that I will be back at the club in September. I have already emailed the secretary»: decidido a retomarlo (B).' },
      { n: 29, tipo: 'emparejar', lista: 1, pregunta: 'Speaker 4', correcta: 3, explicacion: '«I use it every day… The patience, and the way it taught me to pay attention to my hands»: agradecida por lo que le enseñó (D). «I do not regret a single penny» descarta E y «I am not relieved» descarta A.' },
      { n: 30, tipo: 'emparejar', lista: 1, pregunta: 'Speaker 5', correcta: 6, explicacion: '«I hear a brass band… and I am fifteen again, completely happy… But do I want to go back to it? No»: nostalgia sin ganas de volver (G).' },
    ],
  },
];
