import type { Ejercicio } from '../tipos';

// Inglés B1 (certificación de Canarias) · Comprensión escrita · examen 1. Tres tareas: emparejar 6, opción múltiple 8 y
// verdadero/falso 11; unas 1.100 palabras en total. Formato en docs/formatos.md. Redactado de cero; personas, lugares
// y negocios inventados.

export const READING_B1_1: Ejercicio[] = [
  {
    id: 'b1-cte-1-1-weekend',
    examen: 'b1',
    destreza: 'comprension-escrita',
    parte: 1,
    nombreParte: 'Matching',
    examenNumero: 1,
    titulo: 'Things to do this weekend',
    instrucciones:
      'Read the eight advertisements (A–H) and the six situations below. Choose the advertisement (A–H) which suits each person best. There are two advertisements that you do not need.',
    minutos: 15,
    secciones: [
      {
        letra: 'A',
        titulo: 'Marlow Bay Kayak Club',
        texto:
          'Try kayaking on the calm water of Marlow Bay. Lessons for complete beginners every Saturday at 10 a.m. All equipment is included, but you must be able to swim. Groups are small, so book early. Children under 14 must come with an adult. Wetsuits can be hired for a small fee.',
      },
      {
        letra: 'B',
        titulo: 'Tiny Hands Baking School',
        texto:
          'Sunday morning workshops for children aged 6 to 12. Little cooks learn to make bread, biscuits and pizza, and they take home everything they bake. Aprons are provided. Parents can wait in our café next door. Places are limited to twelve children.',
      },
      {
        letra: 'C',
        titulo: 'Moonlight Cinema',
        texto:
          'Films under the stars every Friday in July and August. Bring a blanket and something warm to drink. Films are shown in their original language with subtitles. Tickets are sold at the gate from 8 p.m. Food and drinks are also available at our stand.',
      },
      {
        letra: 'D',
        titulo: 'The Book Swap Café',
        texto:
          'Bring a book you have already read and take another one home, completely free. There is a quiet corner for reading and the coffee is cheap. Open every day except Monday. New books arrive all the time. You can also join our book club on the first Thursday of the month.',
      },
      {
        letra: 'E',
        titulo: 'Green Steps Walking Group',
        texto:
          'Join our Sunday walks in the hills, about ten kilometres each time. They are free and suitable for all ages. We meet at the railway station at 9 a.m. Bring your own lunch and good shoes. Our guide knows the hills very well and tells interesting stories about the area.',
      },
      {
        letra: 'F',
        titulo: 'Code Camp for Teens',
        texto:
          'A five-morning course during the school holidays for young people aged 13 to 17. You will learn to create your own games and apps. Laptops are provided and no experience is needed. Places are limited. On the last day, every student shows their project to their families.',
      },
      {
        letra: 'G',
        titulo: 'City Language Exchange',
        texto:
          'Every Wednesday evening, meet people from all over the world and practise your English, Spanish or German in relaxed conversations. Just buy a coffee for two euros and sit with us. No registration needed. Teachers from a nearby school sometimes join us to help beginners.',
      },
      {
        letra: 'H',
        titulo: 'Rock Rainy-Day Climbing Centre',
        texto:
          'Indoor climbing wall for all levels, open until 10 p.m. every day. Climbing shoes can be hired at the desk. Students pay half price on weekdays. Our instructors will help you on your first visit.',
      },
    ],
    opcionesComunes: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    items: [
      {
        n: 1,
        tipo: 'emparejar',
        pregunta: 'Marta wants to be outdoors on Sunday, but she does not want to pay anything.',
        correcta: 4,
        explicacion: 'E: las caminatas de Green Steps son en domingo, al aire libre y gratis. El Book Swap Café (D) también es gratis, pero es un local cerrado.',
      },
      {
        n: 2,
        tipo: 'emparejar',
        pregunta: 'Luis is 15 and would like to learn how to make computer programs during the holidays.',
        correcta: 5,
        explicacion: 'F: «Code Camp for Teens» es un curso en vacaciones para jóvenes de 13 a 17 años en el que se crean juegos y aplicaciones.',
      },
      {
        n: 3,
        tipo: 'emparejar',
        pregunta: 'Nora loves reading and wants to get some new books without spending money.',
        correcta: 3,
        explicacion: 'D: en el Book Swap Café se cambia un libro ya leído por otro, «completely free».',
      },
      {
        n: 4,
        tipo: 'emparejar',
        pregunta: 'Kofi has just moved to the city and would like to practise his English with other people in the evening.',
        correcta: 6,
        explicacion: 'G: «City Language Exchange» es los miércoles por la tarde-noche y consiste en conversar para practicar idiomas.',
      },
      {
        n: 5,
        tipo: 'emparejar',
        pregunta: 'The Ruiz family is looking for an activity where their eight-year-old twins can learn to cook.',
        correcta: 1,
        explicacion: 'B: «Tiny Hands Baking School» es para niños de 6 a 12 años y se aprende a hacer pan, galletas y pizza.',
      },
      {
        n: 6,
        tipo: 'emparejar',
        pregunta: 'Inés would like to try a water sport, but she has never done it before.',
        correcta: 0,
        explicacion: 'A: las clases de kayak son para principiantes absolutos. Sobran C (cine al aire libre) y H (escalada).',
      },
    ],
  },
  {
    id: 'b1-cte-1-2-second-hand',
    examen: 'b1',
    destreza: 'comprension-escrita',
    parte: 2,
    nombreParte: 'Multiple choice',
    examenNumero: 1,
    titulo: 'The shop where nothing is new',
    instrucciones: 'Read the article and answer questions 7–14. For each question, choose the correct answer (A, B or C).',
    minutos: 20,
    texto:
      'When Clara Benítez opened her second-hand clothes shop in the town of Alvera two years ago, most of her friends thought she was making a mistake. “They told me nobody would pay for clothes that other people had already worn,” she says, laughing. “Now they all come here to buy their jackets.”\n\n' +
      'Clara got the idea while she was studying design at university. She had very little money, so she began buying clothes in charity shops and changing them a little: a new button here, a shorter sleeve there. Her flatmates started asking where she found her clothes, and soon she was selling them to other students. When she finished her studies she could not find a job in a fashion company, so she decided to try her luck on her own.\n\n' +
      'The shop is small, but it is full of colour. Every item is washed, repaired if necessary and hung by size, not by price. Clara buys most of her stock from local families who are clearing out their wardrobes, and she pays them with vouchers that can be spent in the shop. “People like that system,” she explains. “They get something back, and the clothes stay in the town instead of going into a bin.”\n\n' +
      'Not everything has been easy. During the first winter Clara worked seven days a week, and in February she nearly closed because there were too few customers. What saved the shop was a photo on social media of a woman wearing a coat from the shop to a wedding. It was shared thousands of times, and the following weekend there was a queue outside the door. Since then, Clara has employed two part-time assistants and started a monthly workshop where people learn to mend their own clothes.\n\n' +
      'Her next plan is a website, but she is in no hurry. “I want every customer who comes in to be able to touch the fabric and try things on,” she says. “A screen can’t do that. For now, I’m happy with the shop as it is.”',
    items: [
      {
        n: 7,
        tipo: 'opciones',
        pregunta: 'Why did Clara’s friends doubt her idea at first?',
        opciones: ['They thought the shop would be too small.', 'They did not think people would want used clothes.', 'They believed she had no experience in design.'],
        correcta: 1,
        explicacion: 'Clara cuenta que le decían que nadie pagaría por ropa que otros ya habían llevado puesta («nobody would pay for clothes that other people had already worn»).',
      },
      {
        n: 8,
        tipo: 'opciones',
        pregunta: 'How did Clara start to sell clothes?',
        opciones: ['She sold them at a market in her town.', 'She gave them to her flatmates as presents.', 'She changed cheap clothes and sold them to other students.'],
        correcta: 2,
        explicacion: 'Compraba ropa en tiendas benéficas, la arreglaba un poco y acabó vendiéndola a otros estudiantes. No hay mercado ni regalos en el texto.',
      },
      {
        n: 9,
        tipo: 'opciones',
        pregunta: 'Why did Clara open her own shop?',
        opciones: ['She could not find work in the fashion industry.', 'Her family offered her a place for free.', 'A fashion company asked her to sell their clothes.'],
        correcta: 0,
        explicacion: '«She could not find a job in a fashion company, so she decided to try her luck on her own».',
      },
      {
        n: 10,
        tipo: 'opciones',
        pregunta: 'How does Clara pay for most of her stock?',
        opciones: ['She pays the families in cash.', 'She exchanges it for other clothes.', 'She gives the families vouchers for the shop.'],
        correcta: 2,
        explicacion: 'Paga a las familias con vales («vouchers») que se pueden gastar en la tienda.',
      },
      {
        n: 11,
        tipo: 'opciones',
        pregunta: 'What nearly made Clara close the shop?',
        opciones: ['The rent was too expensive.', 'There were not enough customers.', 'She was too tired to continue working.'],
        correcta: 1,
        explicacion: 'En febrero casi cierra «because there were too few customers». Trabajaba siete días, pero ese no fue el motivo.',
      },
      {
        n: 12,
        tipo: 'opciones',
        pregunta: 'What happened after the photo was shared on social media?',
        opciones: ['A lot more people came to the shop.', 'Clara was invited to a wedding.', 'Clara decided to stop making changes to the clothes.'],
        correcta: 0,
        explicacion: 'Al fin de semana siguiente había cola en la puerta: llegó mucha más gente.',
      },
      {
        n: 13,
        tipo: 'opciones',
        pregunta: 'Apart from selling clothes, what does Clara offer now?',
        opciones: ['Lessons on how to design clothes.', 'A service to wash customers’ clothes.', 'A monthly workshop to learn to repair clothes.'],
        correcta: 2,
        explicacion: 'Organiza un taller mensual donde se aprende a arreglar la propia ropa («to mend their own clothes»).',
      },
      {
        n: 14,
        tipo: 'opciones',
        pregunta: 'What does Clara think about selling clothes online?',
        opciones: ['She will do it as soon as possible.', 'She wants customers to be able to touch and try the clothes first.', 'She believes it is a bad idea for any shop.'],
        correcta: 1,
        explicacion: 'Su próximo plan es una web, pero sin prisa, porque quiere que los clientes toquen la tela y se prueben la ropa. No dice que sea mala idea en general.',
      },
    ],
  },
  {
    id: 'b1-cte-1-3-teen-sleep',
    examen: 'b1',
    destreza: 'comprension-escrita',
    parte: 3,
    nombreParte: 'True or false',
    examenNumero: 1,
    titulo: 'Why teenagers need their sleep',
    instrucciones: 'Read the text and decide whether the sentences (15–25) are TRUE or FALSE according to the text.',
    minutos: 25,
    texto:
      'Many teenagers go to bed late and find it hard to get up for school in the morning. For years, adults thought this was just laziness. Now scientists say there is a biological reason. During adolescence the body clock changes, and the brain starts to produce the hormone that makes us sleepy about two hours later than in children or adults. This means that a fifteen-year-old who is not tired at ten o’clock at night is probably not being difficult.\n\n' +
      'The problem is that most schools start early. A study carried out in several European cities found that students who began lessons at eight o’clock slept on average one hour less than those who began at half past nine. They also made more mistakes in tests and said they felt sad more often. In one town, a school that moved its first class forty-five minutes later saw fewer students arriving late, and teachers reported that pupils were more active in the morning.\n\n' +
      'However, changing school hours is not easy. Parents who work need to leave home early and cannot always be there when their children get up. Bus companies would have to change their timetables, and sports clubs that use the school facilities in the afternoon would have to start later too. Because of this, many schools prefer smaller solutions, such as giving advice about sleep.\n\n' +
      'Doctors give some simple tips. First, teenagers should avoid screens for an hour before going to sleep, because the light of a phone tells the brain that it is still daytime. Second, they should not drink coffee or energy drinks after lunch. Finally, they should try to wake up at a similar time every day, even at the weekend. Sleeping until midday on Sunday may feel wonderful, but it makes Monday morning even harder.\n\n' +
      'Experts also point out that sleep is not a waste of time. During the night the brain organises what we learned during the day, so a student who studies until very late and sleeps only five hours may remember less than one who studies a little less and sleeps eight hours.',
    items: [
      {
        n: 15,
        tipo: 'opciones',
        pregunta: 'Scientists think there is a biological reason why teenagers go to bed late.',
        opciones: ['True', 'False'],
        correcta: 0,
        explicacion: 'TRUE: «Now scientists say there is a biological reason»: durante la adolescencia cambia el reloj del cuerpo.',
      },
      {
        n: 16,
        tipo: 'opciones',
        pregunta: 'Teenagers start to feel sleepy earlier than children do.',
        opciones: ['True', 'False'],
        correcta: 1,
        explicacion: 'FALSE: la hormona del sueño aparece unas dos horas más TARDE que en niños o adultos.',
      },
      {
        n: 17,
        tipo: 'opciones',
        pregunta: 'In the European study, students who started at eight o’clock slept more than the others.',
        opciones: ['True', 'False'],
        correcta: 1,
        explicacion: 'FALSE: los que empezaban a las ocho dormían de media una hora MENOS que los que empezaban a las nueve y media.',
      },
      {
        n: 18,
        tipo: 'opciones',
        pregunta: 'The students with the early start said they felt sad more often.',
        opciones: ['True', 'False'],
        correcta: 0,
        explicacion: 'TRUE: «They also made more mistakes in tests and said they felt sad more often».',
      },
      {
        n: 19,
        tipo: 'opciones',
        pregunta: 'More students arrived late at the school that moved its first class to a later time.',
        opciones: ['True', 'False'],
        correcta: 1,
        explicacion: 'FALSE: allí llegaron MENOS alumnos tarde («fewer students arriving late»).',
      },
      {
        n: 20,
        tipo: 'opciones',
        pregunta: 'In that school, teachers noticed that pupils were more active in the morning.',
        opciones: ['True', 'False'],
        correcta: 0,
        explicacion: 'TRUE: «teachers reported that pupils were more active in the morning».',
      },
      {
        n: 21,
        tipo: 'opciones',
        pregunta: 'Working parents can easily adapt to a later start at school.',
        opciones: ['True', 'False'],
        correcta: 1,
        explicacion: 'FALSE: los padres que trabajan tienen que salir temprano y no siempre pueden estar en casa; cambiar el horario «is not easy».',
      },
      {
        n: 22,
        tipo: 'opciones',
        pregunta: 'Sports clubs that use the school in the afternoon would also be affected by a later start.',
        opciones: ['True', 'False'],
        correcta: 0,
        explicacion: 'TRUE: «sports clubs [...] would have to start later too».',
      },
      {
        n: 23,
        tipo: 'opciones',
        pregunta: 'Doctors advise teenagers to look at their phones for an hour before they go to sleep.',
        opciones: ['True', 'False'],
        correcta: 1,
        explicacion: 'FALSE: aconsejan lo contrario, evitar las pantallas durante la hora previa a dormir.',
      },
      {
        n: 24,
        tipo: 'opciones',
        pregunta: 'Sleeping until midday on Sunday makes Monday morning easier.',
        opciones: ['True', 'False'],
        correcta: 1,
        explicacion: 'FALSE: «it makes Monday morning even harder».',
      },
      {
        n: 25,
        tipo: 'opciones',
        pregunta: 'A student who sleeps eight hours may remember more than one who studies late and sleeps five.',
        opciones: ['True', 'False'],
        correcta: 0,
        explicacion: 'TRUE: durante la noche el cerebro organiza lo aprendido, así que dormir ocho horas puede ayudar a recordar más.',
      },
    ],
  },
];
