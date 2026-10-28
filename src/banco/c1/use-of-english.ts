import type { Ejercicio } from '../tipos';

// Cambridge C1 Advanced · Reading and Use of English, Parts 1–4. Redactados de cero, al estilo del examen.

export const INSTRUCCIONES = {
  1: 'For questions 1–8, read the text below and decide which answer (A, B, C or D) best fits each gap.',
  2: 'For questions 9–16, read the text below and think of the word which best fits each gap. Use only one word in each gap.',
  3: 'For questions 17–24, read the text below. Use the word given in capitals at the end of some of the lines to form a word that fits in the gap in the same line.',
  4: 'For questions 25–30, complete the second sentence so that it has a similar meaning to the first sentence, using the word given. Do not change the word given. You must use between three and six words, including the word given.',
} as const;

export const NOMBRES_PARTE = {
  1: 'Multiple-choice cloze',
  2: 'Open cloze',
  3: 'Word formation',
  4: 'Key word transformations',
} as const;

export const USE_OF_ENGLISH_C1: Ejercicio[] = [
  {
    id: 'c1-rue-1-libraries',
    examen: 'c1',
    destreza: 'reading-use',
    parte: 1,
    nombreParte: NOMBRES_PARTE[1],
    titulo: 'The quiet revival of the public library',
    instrucciones: INSTRUCCIONES[1],
    minutos: 10,
    texto:
      'Public libraries were, not so long ago, widely {{1}} as being on their way out. With information just a few clicks away, the argument {{2}}, who would bother to visit a building full of paper? Yet the predictions have proved {{3}} premature. Across many countries, visitor numbers are rising again, and the reasons have little to do with books.\n\n' +
      'Libraries have quietly {{4}} themselves as the last genuinely free indoor public spaces: somewhere to work, to keep warm, to meet, or simply to be left alone. Many now run coding clubs, language exchanges and legal advice sessions {{5}} with the usual lending service. Critics argue that this stretches the {{6}} of what a library is for, and that local councils are using libraries to paper over cuts made elsewhere. Librarians, for their {{7}}, see things differently. The institution, they say, has always adapted to whatever its community {{8}} in need of, and that community now needs a room with a door that is open to everyone.',
    items: [
      { n: 1, tipo: 'opciones', opciones: ['regarded', 'believed', 'thought', 'assumed'], correcta: 0, explicacion: 'Only "regarded" takes "as": "widely regarded as being…". The other three would need "to be" ("widely believed to be").' },
      { n: 2, tipo: 'opciones', opciones: ['went', 'flowed', 'moved', 'passed'], correcta: 0, explicacion: '"The argument went" means "this is how the argument was put". It is a fixed use of "go".' },
      { n: 3, tipo: 'opciones', opciones: ['widely', 'highly', 'somewhat', 'deeply'], correcta: 2, explicacion: '"Somewhat premature" means "a little too early". "Highly" and "deeply" do not collocate with "premature".' },
      { n: 4, tipo: 'opciones', opciones: ['restored', 'reinvented', 'recovered', 'renewed'], correcta: 1, explicacion: '"Reinvent yourself as" is the collocation for taking on a new role or identity.' },
      { n: 5, tipo: 'opciones', opciones: ['together', 'alongside', 'beside', 'apart'], correcta: 0, explicacion: '"Together with" is the only option that works with "with". "Alongside" means the same but is used without "with".' },
      { n: 6, tipo: 'opciones', opciones: ['definition', 'outline', 'border', 'range'], correcta: 0, explicacion: '"Stretch the definition of" = make the meaning of something wider than usual.' },
      { n: 7, tipo: 'opciones', opciones: ['part', 'side', 'turn', 'account'], correcta: 0, explicacion: '"For their part" introduces the point of view of a different group. The other nouns do not form this expression.' },
      { n: 8, tipo: 'opciones', opciones: ['finds', 'stands', 'happens', 'turns'], correcta: 1, explicacion: '"Stand in need of" is a formal way of saying "need". "Finds" would need "itself" and "happens" would need "to be".' },
    ],
  },
  {
    id: 'c1-rue-2-names',
    examen: 'c1',
    destreza: 'reading-use',
    parte: 2,
    nombreParte: NOMBRES_PARTE[2],
    titulo: 'Why we forget names',
    instrucciones: INSTRUCCIONES[2],
    minutos: 10,
    texto:
      'Most of us have, at {{9}} time or another, been introduced to someone and forgotten their name within seconds. {{10}} embarrassing as this is, it is not a sign of a failing memory. Names are simply hard to remember, and the reason has {{11}} to do with how the brain stores information. A face, a job or an accent all carry meaning that can be linked to things we already know. A name, {{12}} the other hand, is arbitrary: there is nothing about a person called Sarah that makes her any more Sarah-like than Emma.\n\n' +
      '{{13}} is more, we are usually distracted at the moment of introduction, busy thinking about what to say {{14}} than listening. Memory experts suggest repeating the name aloud straight away and using it in conversation. It may feel forced, but it gives the brain a second chance to make a connection it would {{15}} have missed. Failing that, there is always the time-honoured strategy of asking a friend to find {{16}} for you.',
    items: [
      { n: 9, tipo: 'palabra', correctas: ['one'], explicacion: '"At one time or another" = on some occasion. It is a fixed expression.' },
      { n: 10, tipo: 'palabra', correctas: ['as'], explicacion: '"As embarrassing as this is" = although this is embarrassing. The structure is "as + adjective + as + clause".' },
      { n: 11, tipo: 'palabra', correctas: ['everything', 'much', 'something', 'more'], explicacion: '"Has everything / much / something to do with" links the reason to how the brain works. "A lot" would need two words.' },
      { n: 12, tipo: 'palabra', correctas: ['on'], explicacion: '"On the other hand" contrasts a name with a face, a job or an accent.' },
      { n: 13, tipo: 'palabra', correctas: ['what'], explicacion: '"What is more" adds a further point, like "furthermore".' },
      { n: 14, tipo: 'palabra', correctas: ['rather'], explicacion: '"Rather than listening" = instead of listening.' },
      { n: 15, tipo: 'palabra', correctas: ['otherwise'], explicacion: '"A connection it would otherwise have missed" = if it had not had that second chance.' },
      { n: 16, tipo: 'palabra', correctas: ['out'], explicacion: '"Find out" = discover. Your friend discovers the name so you do not have to ask.' },
    ],
  },
  {
    id: 'c1-rue-3-puzzles',
    examen: 'c1',
    destreza: 'reading-use',
    parte: 3,
    nombreParte: NOMBRES_PARTE[3],
    titulo: 'The appeal of difficult puzzles',
    instrucciones: INSTRUCCIONES[3],
    minutos: 10,
    texto:
      'There is something {{17}} about a puzzle that refuses to be solved. Psychologists have long been {{18}} by the fact that people willingly spend hours on tasks that bring no obvious reward. One {{19}} is that the brain treats an unsolved problem as a kind of unfinished business, which produces a mild but {{20}} sense of tension. Solving the puzzle brings relief, and the {{21}} that follows is out of all proportion to the achievement itself.\n\n' +
      'This may be why puzzle apps are so {{22}} successful: they offer a steady supply of small, {{23}} goals. There is, however, a darker side. Designers know exactly how to keep users hooked, and the line between a healthy hobby and a {{24}} habit can be surprisingly thin.',
    items: [
      { n: 17, tipo: 'palabra', raiz: 'RESIST', correctas: ['irresistible'], explicacion: 'Adjective with negative prefix: ir- + resist + -ible. Note the double "r" and the "-ible" ending.' },
      { n: 18, tipo: 'palabra', raiz: 'INTRIGUE', correctas: ['intrigued'], explicacion: 'Passive participle: "have long been intrigued by". The -ed form describes how the psychologists feel.' },
      { n: 19, tipo: 'palabra', raiz: 'EXPLAIN', correctas: ['explanation'], explicacion: 'A noun is needed after "One". Watch the spelling: the "i" of "explain" disappears.' },
      { n: 20, tipo: 'palabra', raiz: 'PERSIST', correctas: ['persistent'], explicacion: 'Adjective describing "sense of tension": "mild but persistent". Ending in -ent, not -ant.' },
      { n: 21, tipo: 'palabra', raiz: 'PLEASE', correctas: ['pleasure'], explicacion: 'Noun after "the": "the pleasure that follows".' },
      { n: 22, tipo: 'palabra', raiz: 'COMMERCE', correctas: ['commercially'], explicacion: 'An adverb modifies "successful": "commercially successful".' },
      { n: 23, tipo: 'palabra', raiz: 'ACHIEVE', correctas: ['achievable'], explicacion: 'Adjective describing "goals": goals that can be achieved.' },
      { n: 24, tipo: 'palabra', raiz: 'COMPEL', correctas: ['compulsive'], explicacion: 'Adjective: "a compulsive habit" is one you cannot stop. Note the change from "compel" to "compuls-".' },
    ],
  },
  {
    id: 'c1-rue-4-set-a',
    examen: 'c1',
    destreza: 'reading-use',
    parte: 4,
    nombreParte: NOMBRES_PARTE[4],
    instrucciones: INSTRUCCIONES[4],
    minutos: 12,
    items: [
      {
        n: 25, tipo: 'transformacion', clave: 'ONLY',
        frase: "I didn't realise how tired I was until I sat down.",
        inicio: 'Only when I sat down', fin: 'how tired I was.',
        correctas: ['did I realise', 'did I realize'],
        explicacion: 'After "Only when…" at the start of a sentence, the subject and auxiliary are inverted: "did I realise".',
      },
      {
        n: 26, tipo: 'transformacion', clave: 'WISH',
        frase: "It's a pity you didn't tell me about the problem earlier.",
        inicio: 'I', fin: 'me about the problem earlier.',
        correctas: ['wish you had told', "wish you'd told"],
        explicacion: 'A regret about the past: "wish + past perfect" (wish you had told).',
      },
      {
        n: 27, tipo: 'transformacion', clave: 'PUT',
        frase: 'The company has decided to postpone the launch because of the technical problems.',
        inicio: 'The launch', fin: 'because of the technical problems.',
        correctas: ['has been put off', 'is being put off', 'is going to be put off', 'is to be put off'],
        explicacion: '"Put off" = postpone, in the passive: "has been put off".',
      },
      {
        n: 28, tipo: 'transformacion', clave: 'COME',
        frase: 'She finds it very difficult to accept criticism.',
        inicio: 'Accepting criticism', fin: 'to her.',
        correctas: ['does not come easily', "doesn't come easily", 'does not come naturally', "doesn't come naturally", 'does not come easy', "doesn't come easy"],
        explicacion: '"Something does not come easily / naturally to someone" = they find it difficult.',
      },
      {
        n: 29, tipo: 'transformacion', clave: 'INTENTION',
        frase: "I'm sure he didn't mean to offend you.",
        inicio: "I'm sure he", fin: 'offending you.',
        correctas: ['had no intention of', 'did not have any intention of', "didn't have any intention of"],
        explicacion: '"Have no intention of + -ing" = not mean to do something.',
      },
      {
        n: 30, tipo: 'transformacion', clave: 'FAR',
        frase: 'The hotel was much more expensive than we had expected.',
        inicio: 'The hotel turned out to be', fin: 'we had expected.',
        correctas: ['far more expensive than'],
        explicacion: '"Far more expensive than" = much more expensive than. "Far" strengthens the comparative.',
      },
    ],
  },
];
