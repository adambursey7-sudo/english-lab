import type { Ejercicio } from '../tipos';

// Cambridge C1 Advanced · Writing. Part 1: essay obligatorio. Part 2: elegir una de tres (email/letter, proposal, report, review).
// Formato oficial en docs/formatos.md. Redactado de cero; nombres de programas, lugares y personas inventados.

export const CRITERIOS_C1 = [
  'Content: he hecho todo lo que pide la tarea (cada punto del enunciado) y quien lo lea queda bien informado.',
  'Communicative Achievement: el registro es el adecuado para el lector (formal con el tutor o el director; cercano con un amigo) y sigo las convenciones del tipo de texto.',
  'Organisation: párrafos claros con una idea cada uno, introducción y cierre, conectores variados (however, on balance, provided that, what is more…).',
  'Language: vocabulario preciso y variado, estructuras complejas (condicionales, pasivas, relativas, inversión) y pocos errores, ninguno que estorbe.',
];

export const WRITING_C1: Ejercicio[] = [
  {
    id: 'c1-wri-1-schools-work',
    examen: 'c1',
    destreza: 'writing',
    parte: 1,
    nombreParte: 'Essay',
    examenNumero: 1,
    instrucciones: 'You must answer this question. Write your answer in 220–260 words in an appropriate style.',
    minutos: 45,
    items: [
      {
        n: 1,
        tipo: 'redaccion',
        tipoTexto: 'essay',
        enunciado:
          'Your class has attended a panel discussion on the best ways for schools to prepare students for working life. You have made the notes below:\n\n' +
          'Ways schools could prepare students for working life:\n• work experience placements\n• careers advice\n• lessons in practical skills\n\n' +
          'Some opinions expressed in the discussion:\n“A week in a real office teaches you more than a term of lessons.”\n“Most teenagers have no idea what jobs actually exist.”\n“Schools should teach us how to pay tax, not just algebra.”\n\n' +
          'Write an essay for your tutor discussing two of the ways in your notes. You should explain which way would be more effective in preparing students for working life, giving reasons in support of your answer.\n\n' +
          'You may, if you wish, make use of the opinions expressed in the discussion, but you should use your own words as far as possible.',
        minPalabras: 220,
        maxPalabras: 260,
        modelo:
          'Schools are often accused of sending young people into the world of work unprepared. Of the methods discussed, work experience placements and lessons in practical skills seem to me the most promising, and I will consider each in turn.\n\n' +
          'A placement, even a short one, gives students something no classroom can offer: the experience of being treated as an adult with responsibilities. Those who have spent a week in a real workplace tend to return with a clearer sense of what they enjoy and, just as usefully, of what they would rather avoid. The drawback is that placements are unevenly distributed. Students whose families have professional contacts find interesting positions easily, while others end up stacking shelves, so schools would need to organise placements centrally if they were to be fair.\n\n' +
          'Teaching practical skills such as managing money, writing a formal email or understanding a payslip has the advantage of reaching every student equally. These are things that many adults genuinely struggle with, and a few well-designed lessons could save a great deal of later confusion. However, such lessons risk becoming abstract if they are not connected to a real context, and teenagers are quick to dismiss anything that feels artificial.\n\n' +
          'On balance, I believe work experience is the more effective method, provided it is properly organised. Practical skills are valuable, but they are best learned when students can see why they matter, and nothing demonstrates that more clearly than a week of real work.',
        criterios: CRITERIOS_C1,
        explicacion:
          'El modelo trata DOS de los tres puntos (placements y practical skills), compara ventajas e inconvenientes de cada uno y dice claramente cuál es mejor y por qué. Registro formal: sin contracciones, con conectores (however, on balance, provided that) y una frase de cierre que resume la postura.',
      },
    ],
  },
  {
    id: 'c1-wri-2-set-1',
    examen: 'c1',
    destreza: 'writing',
    parte: 2,
    nombreParte: 'Choice of task',
    examenNumero: 1,
    instrucciones: 'Write an answer to ONE of the questions 2–4 in this part. Write your answer in 220–260 words in an appropriate style.',
    minutos: 45,
    elegir: 1,
    items: [
      {
        n: 2,
        tipo: 'redaccion',
        tipoTexto: 'review',
        enunciado:
          'You see this announcement on an English-language website for people who enjoy learning in their free time:\n\n' +
          '“Reviews wanted! Have you taken an evening course that turned out to be better, or worse, than you expected? Write a review of the course, describing what it involved and explaining what you gained from it. Say whether you would recommend it to other readers.”\n\n' +
          'Write your review.',
        minPalabras: 220,
        maxPalabras: 260,
        modelo:
          'Pottery for the Impatient: ten Tuesdays well spent\n\n' +
          'I signed up for this beginners’ course at my local community centre on a whim, expecting to produce a lopsided bowl and never return. Ten weeks later I own four lopsided bowls, a mug that holds coffee without leaking, and a new respect for anyone who makes a living with their hands.\n\n' +
          'The course runs for two hours every Tuesday evening and takes a maximum of eight students, which matters more than it sounds. Our tutor, a working potter with thirty years’ experience, had time to stand behind each of us at the wheel, and her corrections were immediate and specific: a wrist too stiff, a thumb pressing too hard. The first three sessions were spent entirely on centring the clay, which was frustrating but, as she kept insisting, unavoidable. By week six most of us could throw something recognisable.\n\n' +
          'What I gained was not really a skill but a habit. For two hours a week it was impossible to think about work or look at a phone, because the clay collapses the moment your attention wanders. Several of us remarked that we slept better on Tuesdays.\n\n' +
          'My only reservation is the cost of materials, which is not included and adds up. That aside, I would recommend the course without hesitation to anyone who, like me, spends too much of the week in front of a screen.',
        criterios: CRITERIOS_C1,
        explicacion:
          'Una review lleva título, describe la experiencia con detalle concreto (qué, cuánto dura, cómo es el profesor), dice qué se sacó de ella y termina con una recomendación clara con un matiz. Registro semiformal: directo, con algo de humor, sin coloquialismos excesivos.',
      },
      {
        n: 3,
        tipo: 'redaccion',
        tipoTexto: 'proposal',
        enunciado:
          'You are a member of the student council at your college. The principal has asked for proposals on how to make better use of a large room on the ground floor that is currently used only for storage.\n\n' +
          'Write a proposal explaining what the room could be used for, how students would benefit, and what changes would need to be made.\n\n' +
          'Write your proposal.',
        minPalabras: 220,
        maxPalabras: 260,
        modelo:
          'Proposal: a quiet study room on the ground floor\n\n' +
          'Introduction\nThe purpose of this proposal is to suggest a new use for the ground-floor storage room and to outline the changes that would make it possible.\n\n' +
          'The problem\nAt present there is nowhere in the college to study in silence. The library closes at five, the canteen is noisy, and students with a free period either go home or sit in corridors. A survey carried out by the student council in March found that 72% of respondents would use a quiet room at least twice a week.\n\n' +
          'The proposal\nThe storage room is large, has two windows and is rarely entered. I propose that it be converted into a quiet study room, open from eight until seven, with individual desks, a small number of lockable lockers and a strict no-talking rule enforced by a student rota.\n\n' +
          'Benefits\nStudents who travel long distances could work between classes instead of wasting the time. Those preparing for exams would have a dependable alternative to the library, and the room would relieve pressure on the canteen, which is currently used for studying as much as for eating.\n\n' +
          'Changes needed\nThe stored equipment would have to be moved to the basement, the room repainted, and roughly twenty desks and chairs purchased. Second-hand furniture would keep the cost under two thousand euros.\n\n' +
          'Conclusion\nI believe this modest investment would benefit a large number of students, and I would be glad to discuss the details.',
        criterios: CRITERIOS_C1,
        explicacion:
          'Un proposal va con encabezados (Introduction, The proposal, Benefits, Changes needed, Conclusion), registro formal e impersonal, propone algo concreto y lo justifica con datos o razones. Mira hacia el futuro: lo que se haría y lo que haría falta.',
      },
      {
        n: 4,
        tipo: 'redaccion',
        tipoTexto: 'email',
        enunciado:
          'You have received an email from an English-speaking friend who is thinking of coming to your town for a year to study:\n\n' +
          '“I’d love to know what the town is really like to live in: the good and the bad! And do you have any advice about finding somewhere to live? I don’t want to end up in the wrong place.”\n\n' +
          'Write your email.',
        minPalabras: 220,
        maxPalabras: 260,
        modelo:
          'Hi Jamie,\n\n' +
          'Great news that you’re thinking of coming here for a year! I’ll be honest with you, because that’s what you asked for.\n\n' +
          'The good first. The town is small enough to cross on foot in half an hour, which means you’ll bump into people constantly and feel at home within weeks. The weather is kind for most of the year, the coffee is cheap and the beach is a ten-minute bus ride away, which does wonders for your mood after a long day in the library.\n\n' +
          'Now the bad. Nightlife is limited to the same three bars, and if you want a proper concert or exhibition you’ll have to travel to the city. The buses stop running at eleven, so plan your evenings accordingly. And the summer heat in July and August is genuinely exhausting; you’ll understand why everyone disappears between two and five.\n\n' +
          'As for somewhere to live, avoid the flats near the port: they look charming online but they’re damp and noisy. The streets behind the university are ideal. Start looking in June, because by September the good rooms have gone, and never pay a deposit before you’ve seen the place in person or had someone you trust check it for you. If you like, I can go and look at a couple of flats on your behalf.\n\n' +
          'Let me know when you’ve decided, and I’ll have a room on my sofa ready for your first week.\n\n' +
          'All the best,\nLucía',
        criterios: CRITERIOS_C1,
        explicacion:
          'Un email a un amigo va en registro informal (contracciones, frases directas, algo de humor) pero bien organizado: saludo, lo bueno, lo malo, el consejo sobre la vivienda, ofrecimiento y despedida. Contesta a las TRES cosas que pregunta el amigo.',
      },
    ],
  },
];
