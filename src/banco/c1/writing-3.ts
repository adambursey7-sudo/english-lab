import type { Ejercicio } from '../tipos';
import { CRITERIOS_C1 } from './writing';

// Cambridge C1 Advanced · Writing · examen 3. Part 1: essay obligatorio. Part 2: elegir una de tres (proposal, email, review).
// Formato oficial en docs/formatos.md. Redactado de cero; nombres de lugares, personas y productos inventados.

export const WRITING_C1_3: Ejercicio[] = [
  {
    id: 'c1-wri-1-remote-work-3',
    examen: 'c1',
    destreza: 'writing',
    parte: 1,
    nombreParte: 'Essay',
    examenNumero: 3,
    instrucciones: 'You must answer this question. Write your answer in 220–260 words in an appropriate style.',
    minutos: 45,
    items: [
      {
        n: 1,
        tipo: 'redaccion',
        tipoTexto: 'essay',
        enunciado:
          'Your class has attended a lecture on how working from home is changing towns and cities. You have made the notes below:\n\n' +
          'Ways in which working from home is changing communities:\n• local shops and cafés\n• public transport\n• friendships and social life\n\n' +
          'Some opinions expressed in the lecture:\n“My street is alive in the daytime for the first time in years.”\n“Nobody is going to build a railway for a three-day week.”\n“You can’t make a friend through a screen.”\n\n' +
          'Write an essay for your tutor discussing two of the ways in your notes. You should explain which way is more important, giving reasons in support of your answer.\n\n' +
          'You may, if you wish, make use of the opinions expressed in the lecture, but you should use your own words as far as possible.',
        minPalabras: 220,
        maxPalabras: 260,
        modelo:
          'Few changes in recent years have been as quiet, or as far-reaching, as the move of millions of workers from the office to the spare room. Of the effects on communities, I shall consider local businesses and public transport, since both depend directly on where people spend their working day.\n\n' +
          'Neighbourhood shops and cafés have, on the whole, benefited. Streets that once emptied at eight in the morning now have customers at ten and at three, and a baker who used to rely on commuters passing through a station can now count on the people who live around the corner. Admittedly, the gain is uneven. Shops in business districts have lost the lunchtime trade that kept them going, and some will not survive.\n\n' +
          'Public transport faces a more serious problem. Railways and bus routes are designed around a morning and an evening peak, and it is the passengers in those peaks who pay for the system. If many people travel only two or three days a week, the income falls while the cost of running the service stays almost the same. Fares may have to rise, or services be cut, and the people who suffer most are those who cannot work from home at all.\n\n' +
          'In my view, public transport is the more important issue. A cafe can reopen in a different street, but a railway line, once closed, is almost never rebuilt, and a town without reliable transport becomes harder to live in for everyone. Local shops will adapt; the transport network is much slower to do so.',
        criterios: CRITERIOS_C1,
        explicacion:
          'El modelo elige DOS de los tres puntos (comercio local y transporte público), da un párrafo a cada uno con ventaja e inconveniente y decide en el cierre cuál es más importante y por qué. Reformula las opiniones de la charla en lugar de citarlas («nobody is going to build a railway for a three-day week» pasa a «the income falls while the cost… stays almost the same»). Registro formal, sin contracciones, conectores variados (admittedly, on the whole, since).',
      },
    ],
  },
  {
    id: 'c1-wri-2-set-3',
    examen: 'c1',
    destreza: 'writing',
    parte: 2,
    nombreParte: 'Choice of task',
    examenNumero: 3,
    instrucciones: 'Write an answer to ONE of the questions 2–4 in this part. Write your answer in 220–260 words in an appropriate style.',
    minutos: 45,
    elegir: 1,
    items: [
      {
        n: 2,
        tipo: 'redaccion',
        tipoTexto: 'proposal',
        enunciado:
          'You are a member of the committee of your town’s youth club. The club has received a grant to improve its building and has asked members to send in proposals.\n\n' +
          'Your proposal should explain what improvements you think the club most needs, say how these would benefit the young people who use it, and suggest how the club could involve its members in making the changes.\n\n' +
          'Write your proposal.',
        minPalabras: 220,
        maxPalabras: 260,
        modelo:
          'Proposal: using the grant to improve the youth club\n\n' +
          'Introduction\nThis proposal sets out the improvements that I believe the club most needs, explains how they would benefit our members and suggests ways in which members themselves could help to carry them out.\n\n' +
          'Improvements needed\nThe building has three clear weaknesses. Firstly, the main hall is used for everything from table tennis to homework, and as a result it is rarely suitable for any of them. I recommend dividing it with a movable partition, creating a quiet study area and a separate space for games. Secondly, the kitchen is too small for the cookery sessions that are so popular, and its equipment is old. Finally, the wi-fi is unreliable, which makes it almost impossible to run the coding workshops that were requested by older members.\n\n' +
          'Benefits\nA quiet area would give members who have nowhere to study at home a regular place to work, while a better kitchen would allow us to double the number of cookery places. Reliable internet would let us offer practical skills that members are keen to learn and that will help them find work.\n\n' +
          'Involving members\nMembers should not simply be given a finished building. I suggest that a group of volunteers help to choose colours and furniture, that older members help the contractors with painting, and that the cookery group plan the opening party.\n\n' +
          'Conclusion\nThese changes would cost less than the full amount of the grant and would make the club useful to far more young people. I strongly recommend that the committee adopt them.',
        criterios: CRITERIOS_C1,
        explicacion:
          'Una proposal lleva título y encabezados, registro formal y recomendaciones concretas («I recommend», «I suggest»). Cubre los tres puntos del enunciado (mejoras, beneficios, cómo implicar a los socios) y cierra pidiendo una decisión al comité. Cada mejora se justifica con una necesidad real, no solo se enumera.',
      },
      {
        n: 3,
        tipo: 'redaccion',
        tipoTexto: 'email',
        enunciado:
          'You have just returned from a three-day language course in another country. The course organiser, Mr Whitfield, has sent you this email:\n\n' +
          '“We would be grateful for your honest feedback on the course. Please tell us what you found most useful, what you think we should change, and whether you would recommend the course to a friend.”\n\n' +
          'Write your email to Mr Whitfield.',
        minPalabras: 220,
        maxPalabras: 260,
        modelo:
          'Subject: Feedback on the three-day course\n\n' +
          'Dear Mr Whitfield,\n\n' +
          'Thank you for asking for my opinion of the course. I enjoyed it a great deal and learned more in three days than I had expected, so I am happy to give you some honest comments.\n\n' +
          'The most useful part by far was the afternoon conversation workshop. Working in groups of four with a teacher who corrected us only at the end meant that we could speak freely, and I noticed a real difference in my confidence by the second day. The vocabulary sessions in the morning were also valuable, particularly the one about idioms, although they could have been a little shorter.\n\n' +
          'There are two things I would change. First, the timetable was very full, and there was hardly any time for lunch; I suggest a longer break in the middle of the day. Second, the written materials were sometimes difficult to follow because the print was small and several exercises had no answers. A simple answer sheet at the end of each session would make self-study far easier.\n\n' +
          'Despite these small problems, I would certainly recommend the course to a friend, especially someone who is shy about speaking, since the atmosphere was so friendly. I have already told two of my classmates about it, and I hope that some of them will join the next course.\n\n' +
          'Thank you once again for a very worthwhile experience.\n\n' +
          'Yours sincerely,\nAlex Marín',
        criterios: CRITERIOS_C1,
        explicacion:
          'Un email formal (a un organizador que no conoces) lleva asunto, «Dear Mr Whitfield», «Yours sincerely», y responde a los tres puntos que pide: lo más útil (el taller de conversación), qué cambiar (el horario y los materiales) y si lo recomienda (sí, con una razón). Registro cortés pero natural, con ejemplos concretos en cada párrafo.',
      },
      {
        n: 4,
        tipo: 'redaccion',
        tipoTexto: 'review',
        enunciado:
          'You see this announcement in an English-language magazine for students:\n\n' +
          '“We are looking for reviews of a place to eat or drink near a school or university. Tell us what the place is like, what you think of the food and service, and say whether you would recommend it to other students.”\n\n' +
          'Write your review.',
        minPalabras: 220,
        maxPalabras: 260,
        modelo:
          'Worth the queue: a review of The Copper Kettle\n\n' +
          'Every university has a café that quietly belongs to its students, and for ours it is The Copper Kettle, a narrow room two minutes from the main library that smells of toast from eight in the morning.\n\n' +
          'The place itself is far from stylish. The chairs do not match, the walls are covered with old posters, and in winter the windows steam up until you cannot see the street. This is, however, exactly its charm: nobody minds if you stay three hours over a single coffee, and on any afternoon you will find groups revising at every table.\n\n' +
          'The menu is short and sensible. The soup of the day, served with thick bread for under four pounds, is the best value in the neighbourhood, and the vegetarian pie has a loyal following. Cakes, on the other hand, can be dry, and the coffee is only average. Service is cheerful but slow at lunchtime, when the queue sometimes reaches the door; if you have a lecture at one, go early or take a sandwich with you.\n\n' +
          'What lifts The Copper Kettle above the competition is the owner, Marta, who remembers regular customers’ names and quietly gives free refills to anyone who looks as though they are panicking about an exam.\n\n' +
          'I would recommend it without hesitation to students who want a friendly place to work and eat cheaply, though not to anyone in a hurry or in search of gourmet cooking.',
        criterios: CRITERIOS_C1,
        explicacion:
          'Una review lleva título atractivo, describe el lugar con detalles concretos (sillas, ventanas, ambiente), valora comida y servicio con aspectos buenos y malos, y cierra con una recomendación matizada: para quién sí y para quién no. Registro semiformal con toques personales («quietly belongs to its students»). Responde a las tres preguntas del anuncio.',
      },
    ],
  },
];
