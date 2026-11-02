import type { Ejercicio } from '../tipos';

// Inglés B2 (certificación de Canarias) · Comprensión escrita · examen 1. Tres tareas: emparejar 6, opción múltiple 8 y
// respuesta corta (≤ 3 palabras) 10; unas 1.500 palabras en total. Formato en docs/formatos.md. Redactado de cero;
// personas, lugares y estudios inventados.

export const READING_B2_1: Ejercicio[] = [
  {
    id: 'b2-cte-1-1-remote-work',
    examen: 'b2',
    destreza: 'comprension-escrita',
    parte: 1,
    nombreParte: 'Matching',
    examenNumero: 1,
    titulo: 'Working from home: seven experiences',
    instrucciones:
      'Read the seven texts (A–G) in which people talk about working from home, and the six statements below. Choose the text (A–G) which matches each statement. There is one text that you do not need.',
    minutos: 15,
    secciones: [
      {
        letra: 'A',
        titulo: 'Daniel, software tester',
        texto:
          'Since my company let us work from home, my output has gone up by about a third. At the office there was always someone with a question or a birthday cake to celebrate, and I used to finish my real work in the evening. Now I switch off my notifications for a few hours, and my team has noticed the difference. I have no plans to go back to the open-plan floor.',
      },
      {
        letra: 'B',
        titulo: 'Priya, accountant',
        texto:
          'I used to spend two and a half hours a day travelling and a small fortune on season tickets, lunches and clothes I rarely wore anywhere else. Working from the spare bedroom has cut all of that. Last year I paid off my car loan earlier than planned, which is not something I ever expected to say about an office job.',
      },
      {
        letra: 'C',
        titulo: 'Tomás, translator',
        texto:
          'The best thing about being able to work from anywhere is that we finally left the capital. The rent on our flat was absurd, and now we have a house with a garden in a village two hours away. I join video calls from the kitchen, and the only thing I miss is a decent bookshop.',
      },
      {
        letra: 'D',
        titulo: 'Helen, project manager',
        texto:
          'I like my home office, but I have noticed that nobody mentions my name when promotions are discussed. My manager is a lovely person, yet out of sight does seem to mean out of mind. Colleagues who are in the building every day get the interesting projects. I am thinking of asking to go in at least two days a week.',
      },
      {
        letra: 'E',
        titulo: 'Ravi, designer',
        texto:
          'I never thought I would say this, but I find it hard to stop. The laptop is on the kitchen table, so after dinner I often “just check one email”, and suddenly it is eleven o’clock. My partner has asked me to move the computer into another room and close the door at six. I am trying, but it is not easy.',
      },
      {
        letra: 'F',
        titulo: 'Mei, marketing assistant',
        texto:
          'Starting a new job from home felt lonely at first. So a few of us who joined the company in the same month began a virtual coffee break every morning, with cameras on and no talk about work allowed. It has become the best part of my day, and I now know my colleagues better than I did in my last office job.',
      },
      {
        letra: 'G',
        titulo: 'Óscar, civil servant',
        texto:
          'My job cannot be done at home because I have to attend to the public, so for me nothing has changed. I do envy my friends when I see them having lunch in their gardens. Perhaps in a few years my department will find a way to offer at least one day a week of remote work.',
      },
    ],
    opcionesComunes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    items: [
      {
        n: 1,
        tipo: 'emparejar',
        pregunta: 'This person felt isolated at the beginning but has found a way to keep in touch with colleagues.',
        correcta: 5,
        explicacion: 'F: Mei se sentía sola al principio y el café virtual diario con sus compañeros resolvió el problema.',
      },
      {
        n: 2,
        tipo: 'emparejar',
        pregunta: 'This person works more efficiently now because there are fewer interruptions.',
        correcta: 0,
        explicacion: 'A: Daniel produce un tercio más porque apaga las notificaciones y ya no le interrumpen preguntas ni celebraciones.',
      },
      {
        n: 3,
        tipo: 'emparejar',
        pregunta: 'This person has been able to save money thanks to the new way of working.',
        correcta: 1,
        explicacion: 'B: Priya se ahorra transporte, comidas y ropa, y liquidó antes el préstamo del coche.',
      },
      {
        n: 4,
        tipo: 'emparejar',
        pregunta: 'This person finds it difficult to separate working time from personal time.',
        correcta: 4,
        explicacion: 'E: Ravi no consigue «parar»: el portátil está en la cocina y se pone a trabajar después de cenar.',
      },
      {
        n: 5,
        tipo: 'emparejar',
        pregunta: 'This person has moved to a new place because of the change in working conditions.',
        correcta: 2,
        explicacion: 'C: Tomás y su pareja dejaron la capital y se mudaron a un pueblo con casa y jardín.',
      },
      {
        n: 6,
        tipo: 'emparejar',
        pregunta: 'This person worries that working from home may be harming their career.',
        correcta: 3,
        explicacion: 'D: Helen nota que no se la tiene en cuenta en los ascensos ni en los proyectos interesantes. El texto G sobra: su trabajo no puede hacerse en casa.',
      },
    ],
  },
  {
    id: 'b2-cte-1-2-river',
    examen: 'b2',
    destreza: 'comprension-escrita',
    parte: 2,
    nombreParte: 'Multiple choice',
    examenNumero: 1,
    titulo: 'Letting the river breathe',
    instrucciones: 'Read the article and answer questions 7–14. For each question, choose the correct answer (A, B, C or D).',
    minutos: 25,
    texto:
      'For most of the twentieth century, the River Aldren was treated as a drain with a famous name. Where it crossed the centre of Harlow Bridge, engineers had forced it into a concrete channel, three metres deep and barely wider than a road, so that heavy rain would be carried away quickly. It worked, more or less, but nobody walked beside it, and the water that eventually reached the sea was as grey as the walls around it.\n\n' +
      'That changed in 2016, when a series of floods damaged more than two hundred homes. The council, which had been ready to spend millions on a taller wall, instead listened to a young hydrologist, Dr Amara Okafor, who argued that the real problem was not too little concrete but too little room. “A river that is trapped has no choice but to rise,” she told the councillors. “If you give it somewhere to spread out, it will do the work for you.” Several of them laughed. Within a year, the same councillors were voting for her plan.\n\n' +
      'The project removed almost a kilometre of concrete and replaced it with a gently sloping bank, a series of shallow pools and a wide meadow that is designed to flood. Residents were told that for a few days each winter the park would be under water, and many of them were doubtful. However, the first test came sooner than anyone had expected: in the second winter the river rose higher than it had done in thirty years. The meadow disappeared, the streets stayed dry, and the council received more thank-you letters than complaints.\n\n' +
      'The surprises were not only about flooding. Within three years, ecologists had counted forty species of birds along the banks, including kingfishers, which had not been seen in the city since the 1960s. On the nearby streets, summer temperatures fell by almost two degrees, and a café that had been about to close reported its best season ever. Property prices around the park have risen, which has created a new worry: that the people who lived through the bad years may no longer be able to afford to stay.\n\n' +
      'Dr Okafor is cautious about calling the scheme a model for everyone. “Our city had a spare field upstream and a council willing to take a risk,” she says. “Many places have neither.” She also warns that nature does not follow a timetable: some of the new plants failed, and the pools need regular cleaning during dry summers. Still, delegations from five countries have visited this year, and in the old concrete channel a few hundred metres downstream, workers have just started to break up the first slab.',
    items: [
      {
        n: 7,
        tipo: 'opciones',
        pregunta: 'What was the purpose of the concrete channel in the city centre?',
        opciones: ['To make the river easier to cross.', 'To remove rainwater from the city fast.', 'To keep the water clean as it reached the sea.', 'To create a space where people could walk.'],
        correcta: 1,
        explicacion: 'Se construyó «so that heavy rain would be carried away quickly». Nadie paseaba junto al río y el agua llegaba gris al mar.',
      },
      {
        n: 8,
        tipo: 'opciones',
        pregunta: 'What did Dr Okafor believe had caused the floods?',
        opciones: ['The walls beside the river were too low.', 'The councillors had spent too little money.', 'The river did not have enough space.', 'The rainfall had become heavier than before.'],
        correcta: 2,
        explicacion: 'Su tesis: el problema no era «too little concrete but too little room», es decir, faltaba espacio para el río.',
      },
      {
        n: 9,
        tipo: 'opciones',
        pregunta: 'What does the writer suggest by “Several of them laughed. Within a year, the same councillors were voting for her plan”?',
        opciones: ['The councillors did not take the problem seriously.', 'The councillors quickly changed their opinion.', 'Dr Okafor had to argue with many councillors.', 'Dr Okafor’s plan was cheaper than the wall.'],
        correcta: 1,
        explicacion: 'El contraste entre la risa inicial y el voto favorable un año después muestra un cambio rápido de opinión. El coste no se compara en el texto.',
      },
      {
        n: 10,
        tipo: 'opciones',
        pregunta: 'What happened in the second winter after the project?',
        opciones: ['The meadow flooded but the streets were not damaged.', 'The park was closed for several months.', 'Residents complained about the water in their homes.', 'The river reached its lowest level in thirty years.'],
        correcta: 0,
        explicacion: 'El río subió más que en treinta años: se inundó la pradera, pero «the streets stayed dry» y llegaron más cartas de agradecimiento que de queja.',
      },
      {
        n: 11,
        tipo: 'opciones',
        pregunta: 'Which unexpected effect of the project is described as a possible problem?',
        opciones: ['The return of rare birds to the area.', 'The cooler temperatures on the nearby streets.', 'The success of the local café.', 'The rise in the price of houses nearby.'],
        correcta: 3,
        explicacion: 'Los precios subieron y eso puede obligar a marcharse a los vecinos de siempre («may no longer be able to afford to stay»). Los demás efectos se presentan como positivos.',
      },
      {
        n: 12,
        tipo: 'opciones',
        pregunta: 'What does Dr Okafor mean when she says “Many places have neither”?',
        opciones: ['Few cities want to try new ideas.', 'Many cities are not worried about floods.', 'Many cities do not have the space or the courage to do it.', 'Few cities have a hydrologist like her.'],
        correcta: 2,
        explicacion: '«Neither» se refiere a las dos cosas que tenía su ciudad: un terreno libre río arriba y un ayuntamiento dispuesto a arriesgar.',
      },
      {
        n: 13,
        tipo: 'opciones',
        pregunta: 'What does Dr Okafor say about the project?',
        opciones: ['All the new plants have grown well.', 'It needs some care and not everything went as planned.', 'The pools have to be cleaned every winter.', 'It should be copied in every city.'],
        correcta: 1,
        explicacion: 'Reconoce que algunas plantas no prosperaron y que las balsas necesitan limpieza en veranos secos (no en invierno), y no cree que sirva de modelo para todos.',
      },
      {
        n: 14,
        tipo: 'opciones',
        pregunta: 'What is the writer’s attitude to the project?',
        opciones: ['Cautiously positive.', 'Strongly critical.', 'Completely uninterested.', 'Openly enthusiastic about every aspect.'],
        correcta: 0,
        explicacion: 'Describe los éxitos con datos, pero también recoge las dudas (encarecimiento, plantas que fallaron, límites del modelo): tono positivo pero prudente.',
      },
    ],
  },
  {
    id: 'b2-cte-1-3-boredom',
    examen: 'b2',
    destreza: 'comprension-escrita',
    parte: 3,
    nombreParte: 'Short answers',
    examenNumero: 1,
    titulo: 'In praise of boredom',
    instrucciones:
      'Read the text and answer questions 15–24. Write NO MORE THAN THREE WORDS taken from the text for each answer.',
    minutos: 30,
    texto:
      'Few people today ever have to wait without something to look at. The moment a queue forms or a train is delayed, phones appear in hands. Yet psychologists who study boredom argue that we may be losing something valuable. In one laboratory experiment, volunteers copied numbers from a phone book for twenty minutes before taking a creativity test. They then thought of more original uses for a plastic cup than a group who had gone straight to the test.\n\n' +
      'Researchers believe that boredom works as a signal. When a task offers no reward, the mind starts to look for something more interesting, and it wanders. This daydreaming mode is linked to planning the future and solving problems that had seemed impossible while we were concentrating. Many writers and scientists describe having their best ideas in the shower or on a long walk, precisely when nothing else demands their attention.\n\n' +
      'The problem is that constant entertainment leaves no space for this process. Teachers in several countries report that pupils find it harder to stay with a single activity for more than a few minutes, and many parents admit that they hand a tablet to their children at the first sign of complaint. Child psychologist Lena Fischer thinks this is a mistake. “Boredom is the starting point of imagination,” she says. “A child who has been allowed to be bored invents a game; a child who has been rescued from it waits to be entertained.”\n\n' +
      'Not all boredom is useful, however. Researchers distinguish between the mild kind that sparks creativity and a deeper, restless kind that can lead to frustration or even risky behaviour. People whose daily work is repetitive and meaningless, for example, show higher levels of stress. The key, they suggest, is choice: boredom that we accept for a short time is helpful, while boredom we cannot escape is not.\n\n' +
      'So how can we make room for it? Experts offer modest advice. Leave the phone in a drawer during a short journey. Take a walk without headphones. Keep a “boring hour” in the week, with no screens and no plans. Some people find it uncomfortable at first, and that is normal; after a few days, most report feeling calmer and noticing more of what is around them.',
    items: [
      {
        n: 15,
        tipo: 'palabra',
        pregunta: 'How long did the volunteers copy numbers before the creativity test?',
        correctas: ['twenty minutes'],
        maxPalabras: 3,
        explicacion: '«Copied numbers from a phone book for twenty minutes». Se admite «twenty minutes».',
      },
      {
        n: 16,
        tipo: 'palabra',
        pregunta: 'According to researchers, what does boredom work as?',
        correctas: ['a signal', 'signal'],
        maxPalabras: 3,
        explicacion: '«Boredom works as a signal»: avisa a la mente de que busque algo más interesante.',
      },
      {
        n: 17,
        tipo: 'palabra',
        pregunta: 'What name is given to the mode in which the mind wanders?',
        correctas: ['daydreaming', 'daydreaming mode', 'this daydreaming mode'],
        maxPalabras: 3,
        explicacion: '«This daydreaming mode is linked to planning the future…».',
      },
      {
        n: 18,
        tipo: 'palabra',
        pregunta: 'Who thinks that giving a tablet to a complaining child is a mistake?',
        correctas: ['Lena Fischer', 'Fischer', 'Dr Fischer'],
        maxPalabras: 3,
        explicacion: 'La psicóloga infantil Lena Fischer dice que es un error. Se admiten el nombre completo o solo el apellido.',
      },
      {
        n: 19,
        tipo: 'palabra',
        pregunta: 'According to Lena Fischer, what is boredom the starting point of?',
        correctas: ['imagination'],
        maxPalabras: 3,
        explicacion: '«Boredom is the starting point of imagination».',
      },
      {
        n: 20,
        tipo: 'palabra',
        pregunta: 'What do people with repetitive and meaningless work show higher levels of?',
        correctas: ['stress'],
        maxPalabras: 3,
        explicacion: '«Show higher levels of stress».',
      },
      {
        n: 21,
        tipo: 'palabra',
        pregunta: 'According to researchers, what is the key to useful boredom?',
        correctas: ['choice'],
        maxPalabras: 3,
        explicacion: '«The key, they suggest, is choice»: si aceptamos el aburrimiento durante poco tiempo, es útil.',
      },
      {
        n: 22,
        tipo: 'palabra',
        pregunta: 'Where should you leave your phone during a short journey?',
        correctas: ['in a drawer', 'a drawer', 'drawer'],
        maxPalabras: 3,
        explicacion: '«Leave the phone in a drawer during a short journey».',
      },
      {
        n: 23,
        tipo: 'palabra',
        pregunta: 'What should you take without headphones?',
        correctas: ['a walk', 'walk'],
        maxPalabras: 3,
        explicacion: '«Take a walk without headphones».',
      },
      {
        n: 24,
        tipo: 'palabra',
        pregunta: 'What name is given to the weekly hour with no screens and no plans?',
        correctas: ['boring hour', 'a boring hour', 'the boring hour'],
        maxPalabras: 3,
        explicacion: 'Se propone mantener una «boring hour» a la semana, sin pantallas ni planes.',
      },
    ],
  },
];
