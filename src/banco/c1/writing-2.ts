import type { Ejercicio } from '../tipos';
import { CRITERIOS_C1 } from './writing';

// Cambridge C1 Advanced · Writing · examen 2. Part 1: essay obligatorio. Part 2: elegir una de tres (report, letter, review).
// Formato oficial en docs/formatos.md. Redactado de cero; nombres de lugares, personas y productos inventados.

export const WRITING_C1_2: Ejercicio[] = [
  {
    id: 'c1-wri-1-volunteering-2',
    examen: 'c1',
    destreza: 'writing',
    parte: 1,
    nombreParte: 'Essay',
    examenNumero: 2,
    instrucciones: 'You must answer this question. Write your answer in 220–260 words in an appropriate style.',
    minutos: 45,
    items: [
      {
        n: 1,
        tipo: 'redaccion',
        tipoTexto: 'essay',
        enunciado:
          'Your class has attended a panel discussion on how to encourage more people to do voluntary work in their community. You have made the notes below:\n\n' +
          'Ways to encourage people to do voluntary work:\n• offering rewards\n• advertising campaigns\n• making it compulsory at school\n\n' +
          'Some opinions expressed in the discussion:\n“If you pay people, it isn’t volunteering any more.”\n“Most people simply don’t know what help is needed.”\n“Nobody ever forgot the week they spent helping at a food bank.”\n\n' +
          'Write an essay for your tutor discussing two of the ways in your notes. You should explain which way would be more effective in encouraging people to do voluntary work, giving reasons in support of your answer.\n\n' +
          'You may, if you wish, make use of the opinions expressed in the discussion, but you should use your own words as far as possible.',
        minPalabras: 220,
        maxPalabras: 260,
        modelo:
          'Charities everywhere complain that they cannot find enough volunteers, yet surveys suggest that most people would like to help if only they knew how. Of the methods proposed, advertising campaigns and compulsory volunteering at school seem to me the two most worth considering.\n\n' +
          'A well-designed campaign addresses the most common obstacle, which is simply ignorance. People rarely refuse to help; they just never hear that the local shelter needs drivers or that the hospital wants readers for patients. Campaigns that name a specific task, a place and a time have proved remarkably effective, because they turn a vague good intention into a decision. Their weakness is that they tend to attract people who were already inclined to volunteer, and their effect fades as soon as the posters come down.\n\n' +
          'Making voluntary work part of the school curriculum reaches everyone, including those who would never respond to an advertisement. A fortnight spent helping at a care home or cleaning a beach can leave a far deeper impression than any lesson, and many adults trace a lifetime of involvement back to one such experience. The obvious objection is that compulsory kindness is a contradiction in terms, and that resentful teenagers make poor helpers. In my experience, however, the resentment rarely survives the first day.\n\n' +
          'On balance, I believe the school route is more effective, since it creates the habit early rather than appealing to adults who have already settled into their routines. Campaigns are useful, but they only work on those who are listening.',
        criterios: CRITERIOS_C1,
        explicacion:
          'El modelo elige DOS de los tres puntos (campañas y voluntariado obligatorio en el instituto), dedica un párrafo a cada uno con ventaja e inconveniente, y en el cierre decide cuál es más eficaz y por qué. Usa las opiniones del debate con otras palabras («simply ignorance», «rarely survives the first day»), registro formal sin contracciones y conectores variados (yet, however, on balance, since).',
      },
    ],
  },
  {
    id: 'c1-wri-2-set-2',
    examen: 'c1',
    destreza: 'writing',
    parte: 2,
    nombreParte: 'Choice of task',
    examenNumero: 2,
    instrucciones: 'Write an answer to ONE of the questions 2–4 in this part. Write your answer in 220–260 words in an appropriate style.',
    minutos: 45,
    elegir: 1,
    items: [
      {
        n: 2,
        tipo: 'redaccion',
        tipoTexto: 'report',
        enunciado:
          'The principal of your college is concerned about how students travel to the college every day and has asked you to write a report.\n\n' +
          'Your report should describe how students currently travel to the college, identify any problems with their journeys, and recommend changes that would make travelling to the college easier and more environmentally friendly.\n\n' +
          'Write your report.',
        minPalabras: 220,
        maxPalabras: 260,
        modelo:
          'Report: how students travel to the college\n\n' +
          'Introduction\nThe aim of this report is to describe how students currently travel to the college, to outline the main problems they face and to recommend improvements.\n\n' +
          'Current situation\nIn a survey of 240 students carried out last month, 45% said they came by car, either driving themselves or being dropped off by parents; 30% used the bus; 20% walked; and only 5% cycled. Significantly, almost all car users live within five kilometres of the college.\n\n' +
          'Problems\nThree difficulties were mentioned repeatedly. Firstly, the only bus that serves the college arrives at 8.55, five minutes before lessons begin, and is frequently full. Secondly, there is nowhere secure to leave a bicycle, which discourages those who would otherwise cycle. Finally, the road outside the main gate is congested every morning, and several students described crossing it as dangerous.\n\n' +
          'Recommendations\nI would suggest the following measures:\n• asking the bus company to add an earlier service at 8.30\n• installing covered, lockable bicycle racks near the entrance\n• introducing a car-sharing scheme through the college website\n• requesting a pedestrian crossing from the town council\n\n' +
          'Conclusion\nMost students live close enough to walk or cycle but choose not to because of the problems described above. If these measures were adopted, I am confident that car use would fall considerably within a year.',
        criterios: CRITERIOS_C1,
        explicacion:
          'Un report lleva título y encabezados (Introduction, Current situation, Problems, Recommendations, Conclusion), registro formal e impersonal, datos concretos (los porcentajes de la encuesta) y recomendaciones claras, aquí en viñetas. Describe el presente, señala los problemas y propone cambios: las tres cosas que pide el enunciado.',
      },
      {
        n: 3,
        tipo: 'redaccion',
        tipoTexto: 'letter',
        enunciado:
          'You have read the following announcement in your local English-language newspaper:\n\n' +
          '“The council has announced plans to close Riverside Park and sell the land for housing. We would like to hear our readers’ views before the final decision is made next month.”\n\n' +
          'Write a letter to the editor giving your opinion on the plans, explaining why the park matters to local people, and suggesting what should happen instead.\n\n' +
          'Write your letter.',
        minPalabras: 220,
        maxPalabras: 260,
        modelo:
          'Dear Editor,\n\n' +
          'I am writing in response to your article about the council’s plan to close Riverside Park and sell the land for housing. As a resident of the area for over fifteen years, I am strongly opposed to the proposal, and I would like to explain why.\n\n' +
          'The council describes the park as “underused”, which suggests that nobody from the planning department has visited it on a Saturday morning. The football pitches are booked every weekend, the playground is the only one within walking distance for several hundred families, and the running club that meets by the bandstand has grown to more than sixty members. For the older residents of the flats on Mill Street, the benches by the river are the only green space they can reach without taking a bus.\n\n' +
          'Nobody denies that the town needs more homes. However, there are alternatives that would not deprive the community of its only park. The former bus depot on Station Road has stood empty for six years and is large enough for at least as many houses as the council proposes to build. Developing it would also bring life back to a neglected part of town.\n\n' +
          'I would therefore urge the council to withdraw its plan and to consult residents properly before any further decision is taken. I would also encourage your readers to attend the public meeting on 14 March and make their views known.\n\n' +
          'Yours faithfully,\nElena Marsh',
        criterios: CRITERIOS_C1,
        explicacion:
          'Carta formal al director: «Dear Editor» y «Yours faithfully», motivo en la primera línea, postura clara («strongly opposed»), argumentos concretos de por qué importa el parque, una alternativa realista y una petición final. Registro formal pero con fuerza («nobody from the planning department has visited it on a Saturday morning»). Responde a las TRES partes del enunciado.',
      },
      {
        n: 4,
        tipo: 'redaccion',
        tipoTexto: 'review',
        enunciado:
          'You see this announcement on an English-language website for language learners:\n\n' +
          '“Have you used an app to learn a language? We want honest reviews! Tell us what the app offers, what worked for you and what didn’t, and say who you think would benefit most from using it.”\n\n' +
          'Write your review.',
        minPalabras: 220,
        maxPalabras: 260,
        modelo:
          'Fifteen minutes a day: a review of Lingoleap\n\n' +
          'I downloaded Lingoleap eighteen months ago with the usual New Year resolve to finally learn Portuguese and, unusually for me, I am still using it. That alone says something, though not everything.\n\n' +
          'The app is built around short daily lessons of ten to fifteen minutes that mix vocabulary, listening and a little grammar, with a streak counter that rewards you for not missing a day. The lessons are well paced, and the recordings use real speakers from Brazil and Portugal rather than a robot voice, which I appreciated. What worked best for me was the speaking practice: you repeat sentences into the microphone and the app tells you which sounds you are mangling. After a few months I could, to my astonishment, order a meal in Lisbon without switching to English.\n\n' +
          'The weaknesses become clear once you pass the beginner stage. Grammar is explained in tiny pop-up notes that are easy to skip, so I reached the intermediate level with a decent vocabulary and no real idea of how the subjunctive worked. The streak system, meanwhile, pushed me towards quick, easy lessons rather than difficult ones, simply to keep the number going.\n\n' +
          'I would recommend Lingoleap wholeheartedly to complete beginners and to anyone who struggles to find time for a class. Learners who already have a foundation, however, will outgrow it quickly and should look for something with proper grammar explanations.',
        criterios: CRITERIOS_C1,
        explicacion:
          'Una review lleva título, cuenta la experiencia propia con detalle (qué ofrece la app, un ejemplo concreto de lo que funcionó: pedir en Lisboa), lo que no funcionó, y cierra diciendo a quién se la recomienda y a quién no. Registro semiformal con algo de humor («which sounds you are mangling»). Contesta a las tres preguntas del anuncio.',
      },
    ],
  },
];
