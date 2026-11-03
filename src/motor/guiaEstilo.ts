// Guía de estilo para que una IA escriba ejercicios nuevos como los de Cambridge C1 Advanced y la PAU de Canarias.
// Sale de los manuales oficiales, de docs/formatos.md y de exámenes de muestra: se aprende el estilo, nunca se copia texto.
// Sin importaciones en ejecución (solo tipos) para que la fábrica del PC (`scripts/fabrica.mjs`) la cargue con Node.
import type { Destreza, Ejercicio, Examen } from '../banco/tipos';

export interface GuiaParte {
  examen: Examen;
  destreza: Destreza;
  parte: number;
  /** Qué es la tarea y qué hace el alumno. */
  tarea: string;
  /** Consejos de estilo propios de esta parte (distractores, tipo de huecos, registro…). */
  estilo: string[];
}

export const ESTILO_GENERAL: Record<Examen, string[]> = {
  c1: [
    'Level: CEFR C1. Natural, current British English; vocabulary and structures a good B2/C1 learner is expected to master (collocations, phrasal verbs, inversion, cleft sentences, mixed conditionals, participle clauses, nuanced linking words).',
    'Texts must read like real articles, essays, reviews or fiction extracts: a clear voice, concrete detail, no textbook feel. Original content only: invent the topic, the people and the facts.',
    'Avoid sensitive or distressing topics (violence, politics of living people, explicit content). Prefer science, culture, work, travel, education, environment, technology, sport, arts and everyday life.',
  ],
  pau: [
    'Level: CEFR B1 (upper B1 / low B2 reading). Clear journalistic English adapted from the press: short paragraphs, mostly common vocabulary with some topic words the student can infer; no idioms that need explaining.',
    'The reading text is about 300–350 words on a current issue for young people (technology, health, environment, education, society, culture). Original text only.',
    'Everything is in English, as in the real test; only the field `explicacion` is written in Spanish, for the teacher.',
  ],
  b1: [
    'Level: CEFR B1. Clear, current English: common vocabulary, short and medium sentences, familiar topics (daily life, hobbies, travel, study, health, technology). No idioms that need explaining.',
    'Original content only: invent the topic, the people and the facts. Everything is in English; only `explicacion` is in Spanish.',
  ],
  b2: [
    'Level: CEFR B2. Natural English with some abstract topics (society, work, environment, culture, science), clear argument structure and a wider range of vocabulary and linking words.',
    'Original content only: invent the topic, the people and the facts. Everything is in English; only `explicacion` is in Spanish.',
  ],
};

export const GUIA: GuiaParte[] = [
  {
    examen: 'c1', destreza: 'reading-use', parte: 1,
    tarea: 'Multiple-choice cloze: a short text (about 200 words) with 8 gaps; each gap has 4 options (A–D).',
    estilo: ['The four options are the same part of speech and similar in meaning; only one fits the collocation, phrasal verb, fixed expression or connotation. Test vocabulary, not grammar.', 'Vary what is tested: collocation, phrasal verb, shades of meaning, linking word, fixed phrase.', 'The text uses `{{n}}` markers (n = 1–8) and each item has `opciones` and `correcta` (index 0–3) plus a Spanish `explicacion` that says why the others fail.'],
  },
  {
    examen: 'c1', destreza: 'reading-use', parte: 2,
    tarea: 'Open cloze: a short text (about 200 words) with 8 gaps; the student writes ONE word in each.',
    estilo: ['Mostly grammar words: prepositions, articles, auxiliaries, pronouns, relatives, conjunctions, quantifiers, parts of fixed expressions. Exactly one natural answer per gap (list real alternatives in `correctas`).', 'Never leave a gap that could take two very different words; no content words that depend on a dictionary.'],
  },
  {
    examen: 'c1', destreza: 'reading-use', parte: 3,
    tarea: 'Word formation: a text (about 200 words) with 8 gaps; at the end of the line the root word is given in capitals (`raiz`) and the student forms the right word.',
    estilo: ['Mix noun, adjective, adverb and verb forms; include at least one negative prefix or suffix change (un-, im-, dis-, -less) and one plural or double change.', 'The root must never be the answer itself. Put all accepted spellings in `correctas`.'],
  },
  {
    examen: 'c1', destreza: 'reading-use', parte: 4,
    tarea: 'Key word transformation: 6 items. Each has a first sentence (`frase`), a key word in capitals (`clave`) and a second sentence with a gap (`inicio` + gap + `fin`) to complete with 3–6 words including the key word, unchanged.',
    estilo: ['Test one structure per item: passive, reported speech, conditionals, wish, causative, inversion, comparison, modal of deduction, gerund/infinitive, phrasal verb.', 'The first answer in `correctas` must be the model answer that uses the key word; add real alternatives after it. Make sure the gap really needs 3–6 words.'],
  },
  {
    examen: 'c1', destreza: 'reading-use', parte: 5,
    tarea: 'Multiple choice: a long text (about 700–800 words, article or fiction extract) and 6 questions with 4 options (A–D), in the order of the text.',
    estilo: ['Questions test detail, attitude, purpose, implication, reference and tone; the last one may be about the whole text. Options are paraphrases, never copied phrases.', 'The wrong options are plausible: they use words from the text but say something different. Each question has a short `pregunta` and a Spanish `explicacion`.'],
  },
  {
    examen: 'c1', destreza: 'reading-use', parte: 6,
    tarea: 'Cross-text multiple matching: four short texts A–D (about 150 words each, in `secciones`, by different writers) on one topic and 4 questions asking which writer shares or differs in an opinion.',
    estilo: ['The four writers must hold clearly different but overlapping views, so each question needs reading all four. Use `opcionesComunes` = ["A","B","C","D"] and `emparejar` items whose `correcta` is the index.', 'Questions look like «Which writer has a different view from the others about…?» or «…and writer C share the opinion that…».'],
  },
  {
    examen: 'c1', destreza: 'reading-use', parte: 7,
    tarea: 'Gapped text: an article (about 700 words in the real exam; keep to the structure of the example) from which 6 paragraphs were removed, plus 7 paragraphs A–G (one extra) to put back.',
    estilo: ['Each missing paragraph is connected to its neighbours by a reference (pronoun, linking word, repeated idea, time sequence), not by topic alone. The extra paragraph must be tempting but wrong.', 'Follow the shape of the example exactly (how the gaps and the lettered paragraphs are stored).'],
  },
  {
    examen: 'c1', destreza: 'reading-use', parte: 8,
    tarea: 'Multiple matching: one article in 4–6 sections A–F, or several short texts, and 10 statements to match with the section that contains the idea.',
    estilo: ['Statements paraphrase the text (never copy it); one section can answer more than one statement; each statement matches exactly one section. Items are `emparejar` with `correcta` = index of the section.'],
  },
  {
    examen: 'c1', destreza: 'writing', parte: 1,
    tarea: 'Essay (compulsory): a context, three points to discuss (two to be chosen), three short opinions, and an instruction to write 220–260 words for a tutor.',
    estilo: ['One item of type `redaccion` with `tipoTexto` "essay", an `enunciado` with the context, the three points and the opinions, a good 220–260-word `modelo` at C1 level, and `criterios` for Content, Communicative Achievement, Organisation and Language.'],
  },
  {
    examen: 'c1', destreza: 'writing', parte: 2,
    tarea: 'Part 2: three tasks to choose from (`elegir` = 1): for example an email/letter, a proposal, a report, a review or an article. Each fixes context, purpose and reader; 220–260 words.',
    estilo: ['Three different text types, realistic situations, a clear reader and register for each. Every task has its own `modelo` and `criterios`.'],
  },
  {
    examen: 'c1', destreza: 'listening', parte: 1,
    tarea: 'Three short extracts (about one minute each, two speakers) with two 3-option questions each (6 items).',
    estilo: ['Ordinary situations with natural speech (hesitations, interruptions). Questions about gist, detail, attitude, function or agreement. Write the full script in `audio.guion` with the supervisor lines, pauses and speaker ids, following the example.'],
  },
  {
    examen: 'c1', destreza: 'listening', parte: 2,
    tarea: 'Sentence completion: a monologue (about 3 minutes) and 8 sentences to complete with a word or short phrase heard in the recording.',
    estilo: ['The missing words are said clearly and appear exactly in the script; distractors are mentioned near them. Each item has `frase` with its `{{n}}` and the exact words in `correctas`.'],
  },
  {
    examen: 'c1', destreza: 'listening', parte: 3,
    tarea: 'Interview or discussion (3–4 minutes, two or more speakers) with 6 four-option questions about opinion and attitude.',
    estilo: ['Speakers may disagree or change their mind; the answer is rarely stated in the same words as the option.'],
  },
  {
    examen: 'c1', destreza: 'listening', parte: 4,
    tarea: 'Five short monologues on one theme and two tasks (Task One and Task Two, 5 questions each) with 8 options A–H in each list; three options are not used.',
    estilo: ['Two different aspects of the same speakers (for example the reason and the result). Use `listas` with two lists and `lista` in each item.'],
  },
  {
    examen: 'c1', destreza: 'speaking', parte: 1,
    tarea: 'Interview: the examiner asks personal questions (one item with the opening lines of the examiner and 6 questions on everyday topics: home, free time, studies or work, plans).',
    estilo: ['One item of type `hablar` with `interlocutor`, `preguntas`, `segundos` 120 and a Spanish `modelo` with tips. Questions are open and invite two or three sentences.'],
  },
  {
    examen: 'c1', destreza: 'speaking', parte: 2,
    tarea: 'Long turn: two items; each gives three pictures (described in text) on one theme, two written questions to answer while comparing two of them for one minute, and a short follow-up question for the partner.',
    estilo: ['Items of type `hablar` with `imagenes` (three vivid descriptions, no real people or brands), `preguntas` (two questions) and `segundos` 60. The two items use different themes. The `interlocutor` text follows the example. Spanish `modelo` explains how to compare.'],
  },
  {
    examen: 'c1', destreza: 'speaking', parte: 3,
    tarea: 'Collaborative task: one item with a central question and five ideas around it; two candidates discuss for two minutes and decide in one minute.',
    estilo: ['`preguntaCentral` plus 5 `ideas` (short noun phrases), `segundos` 180, `segundosLectura` 15, `interlocutor` as in the example and a Spanish `modelo` with useful language.'],
  },
  {
    examen: 'c1', destreza: 'speaking', parte: 4,
    tarea: 'Discussion: one item with 6 opinion questions that widen the topic of Part 3, put to each candidate and to both.',
    estilo: ['`preguntas` go from concrete to abstract (society, future, values); `segundos` 300; Spanish `modelo` with ideas for developing answers.'],
  },
  {
    examen: 'pau', destreza: 'prueba', parte: 1,
    tarea: 'Questions 1–3 on one text of about 300–350 words: 1) three TRUE/FALSE with the evidence copied from the text; 2) three short questions answered by copying at most 10 words; 3) four «find a word or expression that means…» items.',
    estilo: ['True/false statements paraphrase the text and the proof must be copied exactly from it (each `pruebas` entry is an exact fragment of `texto`). Short-question answers are exact fragments of 10 words or fewer.', 'Vocabulary definitions point to a word that appears in the text, in the same form; mention the lines or paragraph to look in.', 'The text is divided in paragraphs and reads like an adapted newspaper article.'],
  },
  {
    examen: 'pau', destreza: 'prueba', parte: 4,
    tarea: 'Complete a conversation: a short dialogue (title, two speakers, the student plays «You») with 6 gaps in the student\'s lines; when a gap ends in «?» the student writes a question.',
    estilo: ['Everyday B1 situations (booking, shopping, a trip, a problem at school). The gaps need a sentence, not a word. Each item is a `redaccion` with a model answer, 4–15 words.'],
  },
  {
    examen: 'pau', destreza: 'prueba', parte: 5,
    tarea: 'Comment on a situation: five situations (a–e) with a speech act each (give an opinion, suggest, apologise, refuse politely, complain, advise…); the student chooses 3 (`elegir` = 3) and writes 10–25 words.',
    estilo: ['Short, concrete situations a teenager could face; the speech act is clear. Every item is a `redaccion` with `minPalabras` 10, `maxPalabras` 25 and a model answer.'],
  },
  {
    examen: 'pau', destreza: 'prueba', parte: 6,
    tarea: 'Composition: two topics (`elegir` = 1), about 140–180 words; one is an opinion or for-and-against composition, the other an email or informal letter (not to be signed).',
    estilo: ['`minPalabras` 140, `maxPalabras` 180, a model answer of about 160 words in B1 English with linking words, and `criterios` for presentation, organisation, content, grammar and vocabulary.'],
  },
  {
    examen: 'b1', destreza: 'comprension-escrita', parte: 1,
    tarea: 'Matching: eight short advertisements or notices A–H (about 50 words each, in `secciones`) and 6 situations about different people; the student chooses the one that suits each person. Two texts are not used.',
    estilo: ['`opcionesComunes` = ["A",…,"H"]; each item is an `emparejar` with the situation in `pregunta`. Each situation must fit exactly one text on at least two details (age, price, day, level), and the distractors share some words with it.'],
  },
  {
    examen: 'b1', destreza: 'comprension-escrita', parte: 2,
    tarea: 'Multiple choice: an article of about 350–400 words and 8–9 questions with three options (A–C), in the order of the text.',
    estilo: ['Everyday topic told as a short story or profile. Options are paraphrases, never copied phrases; the wrong ones reuse words of the text but say something different. Each item has `pregunta`, `opciones`, `correcta` and a Spanish `explicacion`.'],
  },
  {
    examen: 'b1', destreza: 'comprension-escrita', parte: 3,
    tarea: 'True or false: a text of about 330–380 words and 10–11 statements.',
    estilo: ['Use `opciones` ["True","False"] with `correcta` 0 or 1. Statements paraphrase the text in order; about half are false because one detail is changed (more/less, earlier/later) or reversed. Explain in Spanish where the answer is.'],
  },
  {
    examen: 'b1', destreza: 'writing', parte: 1,
    tarea: 'Short message of 90–110 words (email, note, chat) with four bullet points to cover.',
    estilo: ['One item `redaccion` with `tipoTexto` "email" or "note", `minPalabras` 90, `maxPalabras` 110, a model inside the range and `criterios` for adecuación, organización, gramática y léxico.'],
  },
  {
    examen: 'b1', destreza: 'writing', parte: 2,
    tarea: 'Longer text of 130–160 words: story, blog post, description or standard report.',
    estilo: ['One item `redaccion` (`tipoTexto` "story", "blog", "report"…), `minPalabras` 130, `maxPalabras` 160, a B1 model with linking words and `criterios` for the four scales.'],
  },
  {
    examen: 'b1', destreza: 'mediacion', parte: 1,
    tarea: 'Written mediation: a source text of 110–130 words and a short answer of 50–60 words for a reader who cannot understand the original.',
    estilo: ['One item `redaccion` with `tipoTexto` "mediation"; put the source text in the `enunciado`. The model selects the key facts and rewords them, without translating line by line.'],
  },
  {
    examen: 'b2', destreza: 'comprension-escrita', parte: 1,
    tarea: 'Matching: seven short texts A–G (about 60–70 words each, in `secciones`, by different people) and 6 statements; one text is not used.',
    estilo: ['`opcionesComunes` = ["A",…,"G"]; each statement is an `emparejar` item paraphrasing an idea (never the same words), so the student must read for meaning. Include a text that fits no statement.'],
  },
  {
    examen: 'b2', destreza: 'comprension-escrita', parte: 2,
    tarea: 'Multiple choice: an article of about 450–550 words and 8–9 questions with four options (A–D), in the order of the text.',
    estilo: ['Test detail, purpose, attitude, reference and the meaning of a phrase; the last question may be about tone. Options are paraphrases and the distractors are plausible. Spanish `explicacion` for each item.'],
  },
  {
    examen: 'b2', destreza: 'comprension-escrita', parte: 3,
    tarea: 'Short answers: a text of about 380–450 words and 10 questions answered with no more than three words taken from the text.',
    estilo: ['Each item is a `palabra` with `maxPalabras` 3 and `correctas` listing every accepted form that appears in the text (with or without article). Questions follow the order of the text and have one clear answer.'],
  },
  {
    examen: 'b2', destreza: 'writing', parte: 1,
    tarea: 'Short text of 100–120 words (formal or informal email, message) with four points to cover.',
    estilo: ['One item `redaccion` with `tipoTexto` "email", `minPalabras` 100, `maxPalabras` 120, a model within the range and `criterios` for the four scales.'],
  },
  {
    examen: 'b2', destreza: 'writing', parte: 2,
    tarea: 'Longer text of 230–275 words: essay, review, letter to the editor or story.',
    estilo: ['One item `redaccion`, `minPalabras` 230, `maxPalabras` 275, a B2 model with a clear structure and varied linkers, and `criterios` for the four scales.'],
  },
  {
    examen: 'b2', destreza: 'mediacion', parte: 1,
    tarea: 'Written mediation: a source text of 150–170 words and a summary of 70–80 words for a reader who cannot understand the original.',
    estilo: ['One item `redaccion` with `tipoTexto` "mediation"; put the source text in the `enunciado` and name the points the answer must cover. The model rewords and leaves out secondary figures.'],
  },
];

export function guiaDe(examen: Examen, destreza: Destreza, parte: number): GuiaParte | undefined {
  return GUIA.find((g) => g.examen === examen && g.destreza === destreza && g.parte === parte);
}

/** Partes que se pueden generar (las que tienen guía). */
export const PARTES_GENERABLES = GUIA.map((g) => ({ examen: g.examen, destreza: g.destreza, parte: g.parte }));

/** Quita del ejemplo lo que no hace falta para que la IA lo copie por forma (id, número de examen, audio ya grabado). */
function ejemploLimpio(e: Ejercicio): Ejercicio {
  const { examenNumero: _n, ...resto } = e;
  return resto;
}

/**
 * Instrucciones para la IA: escribe un ejercicio NUEVO de esa parte con la misma forma JSON que el ejemplo.
 * Devuelve el texto del encargo (el sistema y el usuario van juntos para que sirva igual en la fábrica y en el navegador).
 */
export function promptEjercicio(g: GuiaParte, ejemplo: Ejercicio, tema?: string, errores: string[] = []): string {
  const lineas = [
    `You are an experienced item writer for ${g.examen === 'c1' ? 'the Cambridge C1 Advanced exam' : 'the Spanish university entrance exam (PAU) in the Canary Islands'}.`,
    `Write ONE new exercise for this part: ${g.tarea}`,
    '',
    'General style:',
    ...ESTILO_GENERAL[g.examen].map((x) => `- ${x}`),
    'Style for this part:',
    ...g.estilo.map((x) => `- ${x}`),
    '',
    tema ? `Topic suggestion: ${tema}.` : 'Choose an original topic of your own.',
    'Write everything from scratch: do not reuse or paraphrase any existing exam text or the text of the example. The example only shows the JSON shape.',
    '',
    'Reply with ONLY a JSON object (no markdown fences, no comments) with exactly the same fields and structure as this example, with all-new content:',
    JSON.stringify(ejemploLimpio(ejemplo)),
    '',
    `Keep these values: "examen": "${g.examen}", "destreza": "${g.destreza}", "parte": ${g.parte}, and the same "tipo" of items and the same number of items as the example. Use a short unique English slug in "id" (it will be replaced).`,
  ];
  if (errores.length > 0) lineas.push('', 'Your previous attempt was rejected by the automatic checker for these reasons; fix all of them:', ...errores.map((x) => `- ${x}`));
  return lineas.join('\n');
}

/** Saca el objeto JSON de la respuesta de la IA, aunque venga con texto o con ``` alrededor. */
export function extraerJson(respuesta: string): unknown {
  const sinValla = respuesta.replace(/```(?:json)?/gi, '');
  const ini = sinValla.indexOf('{');
  if (ini < 0) throw new Error('La respuesta no trae ningún ejercicio.');
  // Se corta en la llave que cierra la primera (ignorando las de dentro de los textos), por si la IA añade comentarios después.
  let profundidad = 0;
  let enTexto = false;
  for (let i = ini; i < sinValla.length; i++) {
    const c = sinValla[i];
    if (enTexto) {
      if (c === '\\') i++;
      else if (c === '"') enTexto = false;
    } else if (c === '"') enTexto = true;
    else if (c === '{') profundidad++;
    else if (c === '}' && --profundidad === 0) return JSON.parse(sinValla.slice(ini, i + 1));
  }
  throw new Error('La respuesta no trae ningún ejercicio.');
}
