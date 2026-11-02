// Guía de estilo para que una IA escriba ejercicios nuevos como los de Cambridge B1 Preliminary, B2 First y C1 Advanced y la PAU de Canarias.
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
  /**
   * Para partes que aún no tienen ejemplo propio en el banco: `examen/destreza/parte` de otra parte con la misma forma
   * JSON (B1 y B2 se apoyan en las de C1). La tarea manda en número y tipo de preguntas; el ejemplo solo da el esquema.
   */
  forma?: string;
  /** Nombre de la parte y minutos cuando no salen del ejemplo (las partes con `forma`). */
  nombreParte?: string;
  minutos?: number;
}

export const ESTILO_GENERAL: Record<Examen, string[]> = {
  c1: [
    'Level: CEFR C1. Natural, current British English; vocabulary and structures a good B2/C1 learner is expected to master (collocations, phrasal verbs, inversion, cleft sentences, mixed conditionals, participle clauses, nuanced linking words).',
    'Texts must read like real articles, essays, reviews or fiction extracts: a clear voice, concrete detail, no textbook feel. Original content only: invent the topic, the people and the facts.',
    'Avoid sensitive or distressing topics (violence, politics of living people, explicit content). Prefer science, culture, work, travel, education, environment, technology, sport, arts and everyday life.',
  ],
  b1: [
    'Level: CEFR B1 (Cambridge B1 Preliminary). Clear, natural British English with common vocabulary and everyday topics; structures a B1 learner knows (present perfect, comparatives, first conditional, modals of advice and obligation, passive in the present and past, reported speech basics). No idioms that need explaining.',
    'Texts are real-world and friendly: messages, notices, emails, adverts, blog posts, short articles and stories about teenagers and young adults (school, hobbies, travel, food, sport, shopping, technology, health). Original content only: invent the people, places and facts.',
    'Avoid sensitive or distressing topics. Keep sentences short and clear; at most a few words above B1 that the context makes easy to guess.',
    'Everything is in English, as in the real test; only the field `explicacion` is written in Spanish, for the teacher.',
  ],
  b2: [
    'Level: CEFR B2 (Cambridge B2 First). Natural, current British English; vocabulary and structures an upper-intermediate learner is expected to handle (phrasal verbs, collocations, conditionals up to the third, passive, reported speech, wish/if only, relative clauses, linking words of contrast and result).',
    'Texts must read like real magazine articles, blog posts, reviews, emails or fiction extracts: a clear voice, concrete detail, no textbook feel. Original content only: invent the topic, the people and the facts.',
    'Avoid sensitive or distressing topics (violence, politics of living people, explicit content). Prefer travel, education, work, technology, environment, sport, arts, health and everyday life.',
    'Everything is in English, as in the real test; only the field `explicacion` is written in Spanish, for the teacher.',
  ],
  pau: [
    'Level: CEFR B1 (upper B1 / low B2 reading). Clear journalistic English adapted from the press: short paragraphs, mostly common vocabulary with some topic words the student can infer; no idioms that need explaining.',
    'The reading text is about 300–350 words on a current issue for young people (technology, health, environment, education, society, culture). Original text only.',
    'Everything is in English, as in the real test; only the field `explicacion` is written in Spanish, for the teacher.',
  ],
};

const DESCRIPCION_EXAMEN: Record<Examen, string> = {
  b1: 'the Cambridge B1 Preliminary exam',
  b2: 'the Cambridge B2 First exam',
  c1: 'the Cambridge C1 Advanced exam',
  pau: 'the Spanish university entrance exam (PAU) in the Canary Islands',
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

  // ---- B1 Preliminary ----
  {
    examen: 'b1', destreza: 'reading-use', parte: 1, forma: 'c1/reading-use/5', nombreParte: 'Short texts', minutos: 6,
    tarea: 'Five short real-world texts (a text message, an email, a notice, an advert, a note…; 30–70 words each) each followed by one question with 3 options (A–C): 5 questions in total.',
    estilo: ['Put the five texts in `secciones` (letra A–E, a short `titulo` such as «Text message» or «Notice»); the example\'s single `texto` is not used. Each item is `opciones` with a short `pregunta` (What is the purpose of…? What must you do? What does the writer suggest?), 3 options and `correcta` 0–2.', 'Questions test gist, purpose, the main message or a detail. Wrong options use words from the text but say something that is not true or not asked.'],
  },
  {
    examen: 'b1', destreza: 'reading-use', parte: 2, forma: 'c1/reading-use/8', nombreParte: 'Matching', minutos: 8,
    tarea: 'Five people who each want something (a course, a gift, a place to eat, a holiday…) and eight short texts A–H (about 60–90 words each, adverts or descriptions). The student matches each person with the one text that suits them.',
    estilo: ['Put the eight texts in `secciones` (letra A–H) and no `texto`. The 5 items are `emparejar` with `correcta` = index (0–7) of the text; the `pregunta` describes the person in 2–3 lines with 2–3 requirements. Three texts are extra.', 'Each text fits exactly one person; the other texts fail on one detail (price, time, age, place…). Requirements are paraphrased, never copied.'],
  },
  {
    examen: 'b1', destreza: 'reading-use', parte: 3, forma: 'c1/reading-use/5', nombreParte: 'Long text', minutos: 8,
    tarea: 'One longer text (about 350–450 words: a blog post, an interview report, a story or an article about a person\'s experience) and 5 questions with 3 options (A–C), in the order of the text.',
    estilo: ['Questions test detail, opinion, attitude, reference («it» / «they»), and the writer\'s feelings; the last may be about the whole text. Each item is `opciones` with 3 options and a short `pregunta`.', 'Options are paraphrases; wrong ones use words from the text but say something different.'],
  },
  {
    examen: 'b1', destreza: 'reading-use', parte: 4, forma: 'c1/reading-use/7', nombreParte: 'Gapped text', minutos: 8,
    tarea: 'A text of about 250–330 words (a story, a letter or an article) from which 5 sentences have been removed, plus 8 sentences A–H (three extra) to put back.',
    estilo: ['Mark the gaps in `texto` as `{{n}}` (n = 1–5) and store the 8 sentences in `opcionesComunes`; the 5 items are `emparejar` with `correcta` = index of the sentence. Follow the shape of the example.', 'Each missing sentence is linked to its neighbours by a pronoun, a time word, a linking word or a repeated idea, not by topic alone. The extra sentences are tempting but wrong.'],
  },
  {
    examen: 'b1', destreza: 'reading-use', parte: 5, forma: 'c1/reading-use/1', nombreParte: 'Multiple-choice cloze', minutos: 8,
    tarea: 'Multiple-choice cloze: a short text (about 100–150 words, an email or a short article) with 6 gaps; each gap has 4 options (A–D).',
    estilo: ['The four options are the same part of speech; only one fits. Test everyday vocabulary, prepositions after verbs, phrasal verbs, linking words and fixed phrases. `{{n}}` markers go from 1 to 6; each item has `opciones` (4), `correcta` 0–3 and a Spanish `explicacion`.'],
  },
  {
    examen: 'b1', destreza: 'reading-use', parte: 6, forma: 'c1/reading-use/2', nombreParte: 'Open cloze', minutos: 7,
    tarea: 'Open cloze: a short text (about 100–150 words) with 6 gaps; the student writes ONE word in each.',
    estilo: ['Only grammar words: articles, prepositions, auxiliaries, pronouns, conjunctions, quantifiers, parts of simple fixed phrases. Exactly one natural answer per gap (list real alternatives in `correctas`). `{{n}}` markers go from 1 to 6.'],
  },
  {
    examen: 'b1', destreza: 'writing', parte: 1, forma: 'c1/writing/1', nombreParte: 'Email', minutos: 20,
    tarea: 'Part 1 (compulsory): a short email from an English-speaking friend with four notes or questions to react to; the student writes a reply of about 100 words.',
    estilo: ['One item of type `redaccion` with `tipoTexto` "email", an `enunciado` that gives the situation, the friend\'s email (with some parts the student must answer or react to) and the instruction «Write your email in about 100 words», `minPalabras` 90, `maxPalabras` 130, a model of about 100 words at B1 level and `criterios` for Content, Communicative Achievement, Organisation and Language.'],
  },
  {
    examen: 'b1', destreza: 'writing', parte: 2, forma: 'c1/writing/2', nombreParte: 'Choice of task', minutos: 25,
    tarea: 'Part 2: two tasks to choose from (`elegir` = 1): an article (for a school or English-language magazine) or a story (given its first sentence or a title). About 100 words.',
    estilo: ['Exactly two items of type `redaccion`: the article with `tipoTexto` "composition" and the story with `tipoTexto` "composition" too. Each has its own `enunciado`, `minPalabras` 90, `maxPalabras` 130, a model of about 100 words and `criterios`.'],
  },
  {
    examen: 'b1', destreza: 'listening', parte: 1, forma: 'c1/listening/1', nombreParte: 'Short dialogues', minutos: 8,
    tarea: 'Seven short recordings (a dialogue or a monologue of 15–30 seconds each, everyday situations) with one question and 3 options (A–C) each: 7 items. The options are short phrases (they replace the pictures of the real test).',
    estilo: ['Write the full script in `audio.guion` with the supervisor lines («Question 1» …), the pauses and speaker ids, following the shape of the example, each recording played twice (`veces` 2). Questions about what, where, when, how much, why or who. The answer is never said with exactly the words of the option.'],
  },
  {
    examen: 'b1', destreza: 'listening', parte: 2, forma: 'c1/listening/3', nombreParte: 'Multiple choice (monologue)', minutos: 8,
    tarea: 'A talk or interview of about 2 minutes (one main speaker, perhaps an interviewer) and 6 questions with 3 options (A–C), in the order of the recording.',
    estilo: ['Topics: a hobby, a trip, a job, a school project, a festival. Questions test detail, opinion and reason. Items are `opciones` with a short `pregunta` and 3 options.'],
  },
  {
    examen: 'b1', destreza: 'listening', parte: 3, forma: 'c1/listening/2', nombreParte: 'Gap fill', minutos: 9,
    tarea: 'A monologue of about 2 minutes (a talk about a place, a course, an event or a plan) and 6 sentences or notes to complete with ONE word or a number / a short phrase heard in the recording.',
    estilo: ['Each item has `frase` with its `{{n}}` and the exact words in `correctas`; they appear exactly in the script and are spelled clearly (names are spelled out in the script when they are not obvious). Distractors are mentioned near the answers.'],
  },
  {
    examen: 'b1', destreza: 'listening', parte: 4, forma: 'c1/listening/3', nombreParte: 'Multiple choice (conversation)', minutos: 10,
    tarea: 'A conversation of about 2–3 minutes between two friends or relatives and 6 questions with 3 options (A–C), in the order of the recording.',
    estilo: ['Questions test attitude, opinion, agreement, preference and reason. The speakers may change their mind; the answer is rarely said in the option\'s words.'],
  },
  {
    examen: 'b1', destreza: 'speaking', parte: 1, forma: 'c1/speaking/1', nombreParte: 'Interview', minutos: 2,
    tarea: 'Interview: the examiner asks personal questions (one item with the opening lines of the examiner and 6 questions on everyday topics: home, school, free time, food, plans, holidays).',
    estilo: ['One item of type `hablar` with `interlocutor`, `preguntas`, `segundos` 120 and a Spanish `modelo` with tips. Questions are simple and open; some ask for a short past or future answer.'],
  },
  {
    examen: 'b1', destreza: 'speaking', parte: 2, forma: 'c1/speaking/3', nombreParte: 'Collaborative task', minutos: 3,
    tarea: 'Simulated situation: the examiner gives a scenario (choose a present for a friend, plan a day out, decide what to take on a trip) and five ideas shown as pictures (described in text). The two candidates talk about them and decide together.',
    estilo: ['One item of type `hablar` with `preguntaCentral` (the situation and what to decide), exactly 5 short `ideas`, `segundos` 120, `segundosLectura` 10, an `interlocutor` that follows the shape of the example and a Spanish `modelo` with useful language for suggesting, agreeing and deciding.'],
  },
  {
    examen: 'b1', destreza: 'speaking', parte: 3, forma: 'c1/speaking/2', nombreParte: 'Describing a photo', minutos: 3,
    tarea: 'Long turn: two items, one for each candidate; each gets ONE photograph (described in text) and talks about it for about one minute: where the people are, what they are doing, what they look like and how they feel.',
    estilo: ['Two items of type `hablar`; each has exactly ONE description in `imagenes` (vivid, no real people or brands), one or two `preguntas` (Please tell us what you can see in your photograph), `segundos` 60, and a Spanish `modelo` with a structure for describing a photo. The two photos have different topics.'],
  },
  {
    examen: 'b1', destreza: 'speaking', parte: 4, forma: 'c1/speaking/4', nombreParte: 'Discussion', minutos: 4,
    tarea: 'Discussion: one item with 5 questions about the topic of Part 3 or related to it, put to each candidate (likes and dislikes, habits, preferences, experiences).',
    estilo: ['`preguntas` are about the students\' own lives and opinions, in simple English; `segundos` 180; Spanish `modelo` with ideas for developing answers.'],
  },

  // ---- B2 First ----
  {
    examen: 'b2', destreza: 'reading-use', parte: 1, forma: 'c1/reading-use/1', nombreParte: 'Multiple-choice cloze', minutos: 6,
    tarea: 'Multiple-choice cloze: a short text (about 160–220 words) with 8 gaps; each gap has 4 options (A–D).',
    estilo: ['The four options are the same part of speech and similar in meaning; only one fits the collocation, phrasal verb, fixed expression or connotation. Test vocabulary, not grammar.', 'The text uses `{{n}}` markers (n = 1–8) and each item has `opciones` and `correcta` (0–3) plus a Spanish `explicacion` that says why the others fail.'],
  },
  {
    examen: 'b2', destreza: 'reading-use', parte: 2, forma: 'c1/reading-use/2', nombreParte: 'Open cloze', minutos: 6,
    tarea: 'Open cloze: a short text (about 160–220 words) with 8 gaps; the student writes ONE word in each.',
    estilo: ['Mostly grammar words: prepositions, articles, auxiliaries, pronouns, relatives, conjunctions, quantifiers, parts of fixed expressions. Exactly one natural answer per gap (list real alternatives in `correctas`).'],
  },
  {
    examen: 'b2', destreza: 'reading-use', parte: 3, forma: 'c1/reading-use/3', nombreParte: 'Word formation', minutos: 8,
    tarea: 'Word formation: a text (about 160–220 words) with 8 gaps; at the end of the line the root word is given in capitals (`raiz`) and the student forms the right word.',
    estilo: ['Mix noun, adjective, adverb and verb forms; include at least one negative prefix (un-, im-, dis-, in-) and one plural or double change. The root must never be the answer itself. Put all accepted spellings in `correctas`.'],
  },
  {
    examen: 'b2', destreza: 'reading-use', parte: 4, forma: 'c1/reading-use/4', nombreParte: 'Key word transformation', minutos: 11,
    tarea: 'Key word transformation: 6 items. Each has a first sentence (`frase`), a key word in capitals (`clave`) and a second sentence with a gap (`inicio` + gap + `fin`) to complete with between TWO and FIVE words including the key word, unchanged.',
    estilo: ['Test one structure per item: passive, reported speech, conditionals, wish, causative, comparison, modal of deduction, gerund/infinitive, phrasal verb, used to / be used to.', 'The first answer in `correctas` must be the model answer that uses the key word; add real alternatives after it. Make sure the gap really needs 2–5 words.'],
  },
  {
    examen: 'b2', destreza: 'reading-use', parte: 5, forma: 'c1/reading-use/5', nombreParte: 'Multiple choice', minutos: 14,
    tarea: 'Multiple choice: a long text (about 550–700 words, magazine article, blog or fiction extract) and 6 questions with 4 options (A–D), in the order of the text.',
    estilo: ['Questions test detail, opinion, purpose, tone, reference and inference; the last one may be about the whole text. Options are paraphrases, never copied phrases; wrong options use words from the text but say something different. Each question has a short `pregunta` and a Spanish `explicacion`.'],
  },
  {
    examen: 'b2', destreza: 'reading-use', parte: 6, forma: 'c1/reading-use/7', nombreParte: 'Gapped text', minutos: 14,
    tarea: 'Gapped text: an article of about 450–600 words from which 6 paragraphs were removed, plus 7 paragraphs A–G (one extra) to put back.',
    estilo: ['Each missing paragraph is connected to its neighbours by a reference (pronoun, linking word, repeated idea, time sequence), not by topic alone. The extra paragraph must be tempting but wrong. Follow the shape of the example exactly (gaps as `{{n}}` in `texto`, paragraphs in `opcionesComunes`). `opcionesComunes` must hold exactly 7 paragraphs (A–G, one is extra) and each `correcta` is an index from 0 to 6, with six different values.'],
  },
  {
    examen: 'b2', destreza: 'reading-use', parte: 7, forma: 'c1/reading-use/8', nombreParte: 'Multiple matching', minutos: 16,
    tarea: 'Multiple matching: one article in 4–5 sections A–E, or several short texts, and 10 statements to match with the section that contains the idea.',
    estilo: ['Put the sections in `secciones`. Statements paraphrase the text (never copy it); one section can answer more than one statement; each statement matches exactly one section. Items are `emparejar` with `correcta` = index of the section and the statement in `pregunta`.'],
  },
  {
    examen: 'b2', destreza: 'writing', parte: 1, forma: 'c1/writing/1', nombreParte: 'Essay', minutos: 40,
    tarea: 'Essay (compulsory): a context, an essay question and two ideas given plus a space for the student\'s own idea; write 140–190 words for the teacher.',
    estilo: ['One item of type `redaccion` with `tipoTexto` "essay", an `enunciado` with the question, two notes to use and the third («your own idea»), `minPalabras` 140, `maxPalabras` 190, a good model of about 170 words at B2 level and `criterios` for Content, Communicative Achievement, Organisation and Language.'],
  },
  {
    examen: 'b2', destreza: 'writing', parte: 2, forma: 'c1/writing/2', nombreParte: 'Choice of task', minutos: 40,
    tarea: 'Part 2: three tasks to choose from (`elegir` = 1): for example an article, an email/letter, a report or a review. Each fixes context, purpose and reader; 140–190 words.',
    estilo: ['Three different text types, realistic situations (school, a language course, a local event, a trip), a clear reader and register for each. Every task has its own `modelo` of about 170 words, `minPalabras` 140, `maxPalabras` 190 and `criterios`.'],
  },
  {
    examen: 'b2', destreza: 'listening', parte: 1, forma: 'c1/listening/1', nombreParte: 'Multiple choice (extracts)', minutos: 10,
    tarea: 'Eight short unrelated extracts (monologues or exchanges between two speakers, about 30 seconds each) with one question and 3 options (A–C) each: 8 items.',
    estilo: ['Ordinary situations with natural speech. Questions about gist, detail, attitude, opinion, purpose or feeling. Write the full script in `audio.guion` with the supervisor lines, pauses and speaker ids following the example; each extract is played twice (`veces` 2).'],
  },
  {
    examen: 'b2', destreza: 'listening', parte: 2, forma: 'c1/listening/2', nombreParte: 'Sentence completion', minutos: 10,
    tarea: 'Sentence completion: a monologue of about 3 minutes and 10 sentences to complete with a word or short phrase heard in the recording.',
    estilo: ['The missing words are said clearly and appear exactly in the script; distractors are mentioned near them. Each item has `frase` with its `{{n}}` and the exact words in `correctas` (1–3 words).'],
  },
  {
    examen: 'b2', destreza: 'listening', parte: 3, forma: 'c1/listening/4', nombreParte: 'Multiple matching', minutos: 10,
    tarea: 'Five short monologues on one theme (five people talking about the same kind of experience) and ONE task with 8 options A–H; the student matches each speaker with the option that fits; three options are not used.',
    estilo: ['Use ONE list in `opcionesComunes` (8 options, A–H) and 5 `emparejar` items; do NOT use `listas`. Each speaker gives the answer in different words from the option. Write the whole script with the supervisor lines and the speaker ids.'],
  },
  {
    examen: 'b2', destreza: 'listening', parte: 4, forma: 'c1/listening/3', nombreParte: 'Multiple choice (interview)', minutos: 10,
    tarea: 'An interview or a discussion of about 3 minutes (two or more speakers) with 7 questions with 3 options (A–C) about opinion, attitude and detail.',
    estilo: ['Speakers may disagree or change their mind; the answer is rarely stated in the same words as the option.'],
  },
  {
    examen: 'b2', destreza: 'speaking', parte: 1, forma: 'c1/speaking/1', nombreParte: 'Interview', minutos: 2,
    tarea: 'Interview: the examiner asks personal questions (one item with the opening lines of the examiner and 6 questions on everyday topics: home, free time, studies or work, plans, travel).',
    estilo: ['One item of type `hablar` with `interlocutor`, `preguntas`, `segundos` 120 and a Spanish `modelo` with tips. Questions are open and invite two or three sentences.'],
  },
  {
    examen: 'b2', destreza: 'speaking', parte: 2, forma: 'c1/speaking/2', nombreParte: 'Long turn', minutos: 4,
    tarea: 'Long turn: two items; each gives TWO pictures (described in text) on one theme, a written question to answer while comparing them for one minute, and a short follow-up question for the partner.',
    estilo: ['Items of type `hablar` with exactly two descriptions in `imagenes` (vivid, no real people or brands), a `preguntas` list with the comparing question (e.g. «Why might the people have chosen to do these things?») and the partner\'s question, and `segundos` 60. The two items use different themes. Spanish `modelo` explains how to compare.'],
  },
  {
    examen: 'b2', destreza: 'speaking', parte: 3, forma: 'c1/speaking/3', nombreParte: 'Collaborative task', minutos: 4,
    tarea: 'Collaborative task: one item with a central question and five ideas around it; two candidates discuss for two minutes and decide in one minute.',
    estilo: ['`preguntaCentral` plus 5 `ideas` (short noun phrases), `segundos` 180, `segundosLectura` 15, `interlocutor` as in the example and a Spanish `modelo` with useful language.'],
  },
  {
    examen: 'b2', destreza: 'speaking', parte: 4, forma: 'c1/speaking/4', nombreParte: 'Discussion', minutos: 4,
    tarea: 'Discussion: one item with 6 opinion questions that widen the topic of Part 3, put to each candidate and to both.',
    estilo: ['`preguntas` go from concrete to abstract (society, future, values); `segundos` 240; Spanish `modelo` with ideas for developing answers.'],
  },
];

export function guiaDe(examen: Examen, destreza: Destreza, parte: number): GuiaParte | undefined {
  return GUIA.find((g) => g.examen === examen && g.destreza === destreza && g.parte === parte);
}

/** Ejemplo de forma para una parte: uno propio del banco o, si no lo hay, el de la parte indicada en `forma`. */
export function ejemploDe(g: GuiaParte, banco: Ejercicio[]): Ejercicio | undefined {
  const propio = banco.find((e) => e.examen === g.examen && e.destreza === g.destreza && e.parte === g.parte);
  if (propio || !g.forma) return propio;
  const [examen, destreza, parte] = g.forma.split('/');
  return banco.find((e) => e.examen === examen && e.destreza === destreza && e.parte === Number(parte));
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
    `You are an experienced item writer for ${DESCRIPCION_EXAMEN[g.examen]}.`,
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
    g.forma
      ? `Keep these values: "examen": "${g.examen}", "destreza": "${g.destreza}", "parte": ${g.parte}. The example is from a different exam and only shows the JSON shape: the number of items, the item types and the lengths are the ones in the task description, not the example's. Use a short unique English slug in "id" (it will be replaced).`
      : `Keep these values: "examen": "${g.examen}", "destreza": "${g.destreza}", "parte": ${g.parte}, and the same "tipo" of items and the same number of items as the example. Use a short unique English slug in "id" (it will be replaced).`,
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
