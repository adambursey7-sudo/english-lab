# Loop «English Lab mejor y más bonita»

Pedido por Adam el 28/10/2026: mejorar la app, que sea **visiblemente más bonita y ordenada**, añadir **todos los tipos
de examen de Cambridge C1** (Reading, Writing, Listening con audio y Speaking) y la **PAU de inglés**, y poder
**montar un examen entero nuevo en PDF** con todas sus partes y un **QR para el audio** del listening.

Rama `loop/mejorar` (desde `master` c04b511), carpeta `C:\dev\english-lab`. Sin push ni unión a `master` hasta que
Adam lo pruebe. Sigue siempre el `CLAUDE.md` del proyecto (ejercicios de cero, sin marcas oficiales, interfaz en
español, ejercicios en inglés, nombres de código en español).

## Reglas de cada vuelta
1. Leer este archivo (sección «Estado») y hacer **un solo paso** del plan, el siguiente que no esté hecho. Si un paso
   es grande, partirlo (3a-1, 3a-2) y apuntarlo. Nada de empezar dos pasos en la misma vuelta.
2. Antes de dar por hecho un paso: `npm run typecheck` y `npm test` limpios. Los ejercicios nuevos pasan por el test
   del banco (ids únicos, huecos que existen, explicaciones). Commit en `loop/mejorar` con mensaje en español.
3. **Capturas**: servidor de desarrollo en el 5173 (si `http://localhost:5173` no contesta, arrancar
   `npx vite --port 5173 --strictPort` en segundo plano desde la carpeta del proyecto). Capturas con Chrome sin
   ventana, con un perfil propio para no tocar el Chrome de Adam:
   `& "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --user-data-dir=<scratchpad>\chrome --window-size=390,844 --screenshot=<png> <url>`
   (móvil 390×844 y, cuando toque, tablet 820×1180). Pasarlas a JPEG de 1400 px con Pillow y guardarlas en
   `docs/loop-mejorar/capturas/<vuelta>/`.
4. **Página de bocetos** (regla de Adam, «Loops con bocetos»): `docs/loop-mejorar/bocetos/index.html`, una entrada por
   vuelta arriba del todo, con las capturas, «Hecho» y «Mejorable» (chinchetas numeradas sobre la captura). Los pasos
   de diseño van dibujados en SVG si no hay captura. Publicarla como Artifact (copiar la carpeta al scratchpad de la
   sesión, porque `C:\dev` no está bajo el directorio de trabajo) y apuntar el enlace aquí la primera vez; después,
   republicar al mismo enlace. **Lo mejorable lo arregla el loop por su cuenta** en la vuelta siguiente si cabe.
5. Apuntar la vuelta en «Registro de vueltas» (Hecho / Comprobado / Falló / Capturas / Cómo probarlo) y actualizar
   «Estado». Mantener el `CLAUDE.md` del proyecto al día cuando cambie la estructura.
6. Hablar claro con Adam: nada de códigos de paso ni ids en los avisos; nombres reales («la pantalla de Listening»).
7. **Avisos por Telegram** (`C:\Users\adamg\OneDrive\Escritorio\claude\llamadas\llamame.ps1 -Titulo ... -Informe ...`,
   solo lo importante, sin rutas ni cifras técnicas): en la vuelta 1 (para que elija el estilo), si el loop se queda
   bloqueado, y al cerrar (con el enlace de los bocetos). Nada más.
8. Consumo: revisión `/code-review low` solo al cerrar un bloque (no en cada vuelta); `medium` al cerrar el PDF
   (abre archivos y enlaces). Nada de `npm run build` en medio del loop: el enlace público sirve `dist` y no debe
   quedarse a medias; se reconstruye solo en el cierre (vuelta 20).
9. Si un paso falla dos veces por la misma causa, apuntarlo y pasar al siguiente; no quedarse atascado.
10. Tope: **20 vueltas** en esta tanda. Si el plan se acaba antes, cerrar (bloque 8) y parar el loop.

## Lo que decidió Claude al preparar el loop (Adam puede cambiarlo)
- **Formatos de los exámenes: de internet.** Cambridge publica muestras gratis de C1 Advanced (cambridgeenglish.org,
  «sample papers» y el handbook) y la EBAU de Canarias publica sus modelos y exámenes de otros años (ULL / ULPGC /
  Gobierno de Canarias). Se bajan a una carpeta fuera del repo (`C:\dev\english-lab-fuentes`, solo para leer, no se
  ejecuta nada de ahí) y se apunta en `docs/formatos.md` la estructura exacta de cada parte: número de preguntas,
  minutos, instrucciones oficiales (en inglés), puntuación. **El contenido nunca se copia**: los textos, preguntas y
  audios se redactan de cero. Si Adam tiene los modelos que usan sus alumnos (el colegio, la academia), que los deje en
  `C:\dev\english-lab-fuentes\de-adam\` y el loop los lee para afinar.
- **PAU = EBAU de Canarias** (Adam está en Canarias): comprensión lectora con preguntas abiertas y de verdadero/falso
  con justificación, uso de la lengua (rephrasing, vocabulario) y redacción de 120–150 palabras. Si el modelo 2026 ha
  cambiado, manda lo que diga la web oficial.
- **Audio**: guiones en el banco (quién habla, qué voz); mp3 hechos en el PC con `edge-tts` (voces británicas e
  irlandesas variadas, incluida una de niña: `en-GB-MaisieNeural`), con las pausas y las frases de instrucciones de
  un listening de verdad. Se guardan en `public/audio/<id>.mp3` y la app los sirve; respaldo: la voz del móvil
  (`speechSynthesis`) si no hay mp3.
- **PDF**: una vista de impresión dentro de la app (`#/imprimir/<examen>/<numero>`): portada, todas las partes en
  orden, hoja de respuestas y, aparte, la clave con explicaciones. El QR (paquete `qrcode`, pequeño) apunta a la
  página de audio de la app (`#/audio/<examen>/<numero>`) en el enlace público (Tailscale ahora, GitHub Pages después).
  El PDF lo genera `scripts/pdf.ps1` con Chrome sin ventana (`--print-to-pdf`) en `salida/`; en el móvil o el PC, un
  botón «Descargar en PDF» usa la impresión del navegador.
- **Diseño**: en la vuelta 1 se dibujan **tres direcciones visuales** en la página de bocetos (ventajas e inconvenientes
  de cada una, con una recomendada) y se avisa a Adam por Telegram. Mientras elige, el loop hace lo que no depende del
  diseño (banco, modelo, audio, PDF). Si en la vuelta 8 no ha contestado, se aplica la recomendada y se avisa
  (regla «dictado ambiguo: móntalo»).
- Las partes de C1 que no se corrigen solas (Writing y Speaking) se guardan en el móvil y se envían a Adam con el
  botón de compartir (WhatsApp); la corrección por Jarvis queda para otro loop.

## Plan (bloques y pasos)
**0. Preparar** — 0a (hecho al lanzar): commit inicial `c04b511` en `master`, rama `loop/mejorar`, carpetas de docs.

**1. Auditoría, formatos y direcciones visuales**
- 1a. Auditoría de la app de hoy (capturas de Inicio, Ejercicio y Resultado en móvil) con lista de lo mejorable.
  Tres direcciones visuales dibujadas en SVG en la página de bocetos (p. ej. «cuaderno corregido», «aula limpia y
  moderna», «examen oficial sobrio»), cada una con ventajas, inconvenientes y una recomendada. Aviso a Adam por Telegram.
- 1b. Formatos de internet → `docs/formatos.md` (C1 Advanced completo y EBAU Canarias de inglés, con las partes,
  preguntas, minutos y puntuación). Dibujar en los bocetos el mapa del banco: examen → destreza → parte.

**2. Modelo del banco y pantallas que faltan**
- 2a. Ampliar `src/banco/tipos.ts` con los tipos de item nuevos: emparejar (Reading Parts 6–8, Listening Part 4),
  párrafos en huecos (Reading Part 7), completar frase (Listening Part 2), pregunta abierta con respuesta modelo (PAU),
  redacción (Writing: tipo, palabras mín./máx., enunciado, criterios) y hablar (Speaking: preguntas, turno largo con
  descripción de las imágenes, tarea en pareja). Audio por ejercicio (guion con hablantes y voz). Tests del banco.
- 2b. Pantallas: lectura con texto largo y preguntas a un lado o debajo (Reading 5), emparejar tocando (6–8), texto con
  párrafos arrastrables o elegibles (7). Corrección de todas ellas en `corregir.ts` con tests.
- 2c. Pantalla de Writing: enunciado, cuadro de texto con contador de palabras y reloj, guardar en el móvil y
  «Enviar a Adam» (compartir). Pantalla de Speaking: cronómetro por parte, preguntas, grabar con el micro (opcional)
  y compartir el audio.
- 2d. Pantalla de Listening: reproductor grande (reproducir, pausa, volver 10 s, «segunda escucha»), transcripción
  escondida hasta corregir, respaldo con la voz del móvil si no hay mp3.

**3. Un examen completo de cada**
- 3a. C1 Reading Parts 5–8 (examen 1): un ejercicio de cada, textos de la longitud oficial.
- 3b. C1 Writing examen 1 (Part 1 essay obligatorio y Part 2 con tres opciones) con criterios y un modelo de
  respuesta para enseñar tras enviar.
- 3c. C1 Listening examen 1: guiones de las 4 partes con hablantes variados, `scripts/audios.py` (edge-tts) y los mp3
  en `public/audio/`. Ojo con el peso: mp3 a 48 kbps mono, y que la PWA no los guarde todos de golpe (precache solo
  de la app; los audios, al reproducirlos).
- 3d. C1 Speaking examen 1 (4 partes) con descripciones de imágenes en texto (sin fotos con derechos; si hace falta
  una imagen, dibujo SVG propio o prompt para que Adam la genere, en inglés).
- 3e. PAU (EBAU Canarias) examen 1 completo: texto, comprensión, uso de la lengua y redacción, con corrección donde
  se pueda y respuesta modelo donde no.

**4. Bonita y ordenada** (con la dirección elegida por Adam o la recomendada; skill `frontend-design`)
- 4a. Inicio: orden examen → destreza → parte, tarjetas con progreso (hechos / total, mejor nota), «Examen completo»
  y «Una parte», banner de instalar más discreto, cabecera con identidad, modo oscuro cuidado.
- 4b. Ejercicio y Resultado: lectura cómoda (ancho de línea, tamaño), huecos claros, barra de progreso y reloj
  visibles sin estorbar, resultado con nota tipo examen (porcentaje y banda), explicaciones plegables, botones
  «Repetir», «Otro de esta parte», «Siguiente parte».
- 4c. Detalles: transiciones suaves, estados vacíos, iconos propios en SVG, tipografía, foco y accesibilidad
  (tamaño táctil ≥ 44 px, contraste), pantalla de «Mis resultados» (historial local).

**5. Examen en PDF con QR**
- 5a. Vista de impresión `#/imprimir/<examen>/<n>`: portada (nombre del examen, número, tiempo, instrucciones
  generales), todas las partes en orden con numeración oficial, hoja de respuestas; `@page` A4, saltos de página,
  tipografía de examen. Página `#/audio/<examen>/<n>` con reproductor y las partes del listening en orden, con las
  pausas del examen real.
- 5b. QR (paquete `qrcode`) en la portada y en la página del listening del PDF, apuntando a la página de audio en el
  enlace público (configurable en `src/config.ts`: Tailscale ahora, GitHub Pages después). Clave de respuestas aparte
  (`#/imprimir/<examen>/<n>/clave`) con explicaciones.
- 5c. `scripts/pdf.ps1 -Examen c1 -Numero 1`: arranca la vista en el servidor que haya (5173 o 4173) y genera con Chrome
  sin ventana `salida/c1-examen-1.pdf` y `salida/c1-examen-1-clave.pdf`; botón «Descargar en PDF» en la app
  (impresión del navegador). Probar con el examen 1 de C1 y de PAU y mirar el PDF página a página (capturas en los
  bocetos). `/code-review medium` al cerrar este bloque.

**6. Crecer el banco** (vueltas 12–19, una por vuelta, alternando C1 y PAU; el objetivo final de Adam son 20 exámenes
por tipo, esta tanda llega hasta donde dé)
- 6a. C1 examen 2 completo (todas las partes, audios incluidos). 6b. PAU examen 2. 6c. C1 examen 3. 6d. PAU examen 3.
  6e. C1 examen 4. 6f. PAU examen 4. 6g. C1 examen 5. 6h. PAU examen 5.
- Calidad en cada uno: un subagente revisor (solo lectura) comprueba cada ejercicio: una sola respuesta correcta,
  nivel C1 real (vocabulario, estructuras), instrucciones oficiales, sin erratas, sin nombres reales ni marcas. Lo que
  falle se arregla en la misma vuelta.

**7. Repaso** — 7a. Pasar la app entera en móvil (capturas de todas las pantallas), arreglar lo mejorable acumulado,
`/code-review low`.

**8. Cierre** — 8a. `npm run build` (actualiza el enlace público de Tailscale), `CLAUDE.md` al día, boceto final
(«Cambios» antes/después y «Mejoras para el próximo loop»), memoria de Claude (`english-lab.md`), aviso a Adam por
Telegram con el enlace de los bocetos y cómo probarlo en el iPhone. Parar el loop.

## Estado
- 28/10: loop preparado por Claude (rama, commit inicial, este plan).
- Vuelta 1 (28/10): 1a hecho. Página de bocetos: https://claude.ai/artifact/Qy1nZpguQL2g38Msth8XpA (republicar al
  mismo enlace; copiar `docs/loop-mejorar/bocetos/` y las capturas al scratchpad de la sesión antes de publicar).
  Avisado Adam por Telegram para que elija estilo (A cuaderno, B aula moderna [recomendado], C examen oficial).
  Adam confirma B para la app y C para el PDF.
- Vuelta 2 (28/10): 1b hecho (`docs/formatos.md`, fuentes en `C:\dev\english-lab-fuentes\`). **Bloque 1 cerrado.**
- Vuelta 3 (28/10): 2a hecho (modelo del banco ampliado, corrección con «pendiente», tests).
- Vuelta 4 (28/10): 2b hecho (pantallas de secciones, lista común, emparejar y huecos de párrafo) con los
  ejercicios del examen 1 de Part 6 y Part 7 ya escritos. **Siguiente: 2c (pantallas de Writing y Speaking).**
  Ojo: 3a queda reducido a Part 5 y Part 8 (los otros dos ya están).

## Decisiones de Adam
- 28/10 (vuelta 1): **estilo B «aula moderna» para la app y C «examen oficial» para el cuadernillo en PDF**, como
  recomendaba Claude. El bloque 4 aplica B; el bloque 5 aplica C al PDF. Ya no hay que esperar a la vuelta 8.
- (pendiente) ¿Modelos de examen propios en `C:\dev\english-lab-fuentes\de-adam\`? —

## Registro de vueltas
(una entrada por vuelta: Hecho / Comprobado / Falló / Capturas / Cómo probarlo)

### Vuelta 1 · 1a. Auditoría y tres estilos
- Hecho: `scripts/capturas.mjs` (playwright-core fuera del repo, en el scratchpad de la sesión, variable
  `PLAYWRIGHT_CORE`; usa el Chrome instalado sin ventana; móvil 390×844 claro y oscuro, tablet 820×1180; recorre
  Inicio → Part 1 → contesta dos → Corregir). Capturas a JPEG 1400 px con Pillow. Página de bocetos creada con la
  entrada de la vuelta 1: 6 capturas con 9 chinchetas, Hecho/Mejorable y las tres direcciones visuales en SVG
  (A cuaderno corregido, B aula moderna, C examen oficial sobrio) con ventajas e inconvenientes; propuesta: B para la
  app y C para el cuadernillo en PDF.
- Comprobado: sin errores de página en las capturas; typecheck y tests no cambian (no se tocó código de la app).
- Falló: nada.
- Mejorable (entra en 4a/4b): aviso de instalar demasiado grande; destrezas apagadas sin explicación; examen
  completo fuera de la vista; reloj pequeño sin aviso; preguntas lejos del texto (abrir opciones al tocar el hueco;
  dos columnas en tablet); opciones A–D en 2×2; nota con porcentaje y banda; «Siguiente parte» y «Otro de esta
  parte»; historial de resultados.
- Capturas: `docs/loop-mejorar/capturas/1a/`.
- Cómo probarlo: abrir la página de bocetos en el móvil y elegir estilo.

### Vuelta 2 · 1b. Formatos de los exámenes
- Hecho: bajadas a `C:\dev\english-lab-fuentes\` (fuera del repo) el manual del C1 Advanced de Cambridge (94 págs.,
  texto extraído con pypdf a `handbook.txt`) y, de la PAU de Canarias, el modelo 2026, el modelo resuelto, los exámenes
  de junio (ciencias) y julio de 2026 y los criterios de corrección 2026-27. `docs/formatos.md`: tablas de las 8 partes
  de Reading & Use (preguntas, puntos, longitud de textos), Writing (tareas, escalas de corrección, enunciado tipo del
  essay), Listening (4 partes, guion completo del supervisor con pausas y «twice», instrucciones impresas), Speaking
  (tiempos y frases del interlocutor), y las 6 preguntas de la PAU con enunciados oficiales y criterios de calificación
  al detalle (lo que vale 0). Mapa del banco: PAU como destreza única `prueba` con 6 partes (1–3 comparten texto en un
  ejercicio con tres bloques); `examenNumero` en cada ejercicio para montar exámenes enteros en PDF. Entrada en los
  bocetos con el mapa del banco en SVG.
- Comprobado: nada de código tocado; typecheck y tests iguales.
- Falló: el manual no se podía leer por WebFetch (pesa 16 MB); se bajó con curl y se extrajo con pypdf.
- Decisiones para el bloque 2: banda estimada del C1 por porcentaje (≥ 80 A, 70–79 B, 60–69 C, 45–59 B2); fotos del
  Speaking como dibujos o descripciones; PAU 4–6 con respuesta modelo y rúbrica, sin corrección automática.
- Capturas: ninguna (sin UI); mapa en los bocetos.
- Cómo probarlo: leer `docs/formatos.md`; en los bocetos, el mapa de la vuelta 2.

### Vuelta 3 · 2a. Modelo del banco
- Hecho: `src/banco/tipos.ts`: destreza `prueba` (PAU); items `opciones`, `emparejar` (de `opcionesComunes` del
  ejercicio), `palabra` (ahora con `frase` {{n}}, `maxPalabras`, `pregunta`), `transformacion`, `verdaderoFalso`
  (afirmación + `pruebas`), `redaccion` (tipoTexto, min/max palabras, modelo, criterios) y `hablar` (interlocutor,
  preguntas, imágenes descritas, pregunta central e ideas, segundos). `TIPOS_EVALUABLES`. Ejercicio: `examenNumero`,
  `secciones` (letra + texto), `opcionesComunes`, `elegir`, `audio` (archivo, hablantes con voz edge-tts, guion con
  pausas, veces). `ORDEN_DESTREZAS`. `corregir.ts`: `corrigeItem(item, respuesta, comunes)`, `evaluable`, `pendientes`
  en `corrigeEjercicio`, `partesVerdaderoFalso` (respuesta «TRUE\nprueba»), `alternativasDe`, `palabrasRedaccion`;
  `normaliza` quita también comillas y puntuación de los extremos. Inicio: destrezas por examen (PAU solo «Prueba
  escrita»). Ejercicio/Resultado: aviso provisional para los tipos sin pantalla y explicación opcional.
- Comprobado: typecheck limpio; 17 tests en verde (nuevos: emparejar, copiar con tope, verdadero/falso, pendientes).
- Falló: un error de tipos en el test (explicación opcional), arreglado.
- Capturas: ninguna (nada visible cambia); esquema de tipos en los bocetos.
- Cómo probarlo: `npm test`; la app sigue igual.

### Vuelta 4 · 2b. Pantallas de Reading (secciones, emparejar, párrafos)
- Hecho: `Ejercicio.tsx`: bloque de `secciones` (letra grande + texto), bloque de `opcionesComunes` cuando son
  largas (párrafos A–G) con tachado y «→ 41» al usarlas, botones de letra (`.letra-btn`) para `emparejar` (con
  etiqueta pequeña solo si dice algo más que la letra), huecos de párrafo como caja (`.hueco.parrafo`), `pregunta`
  visible en opciones y palabra. `Resultado.tsx`: letras en los huecos de emparejar, textos plegados («Volver a leer
  los textos»), enunciado de la pregunta en cada corrección, `comunes` a `ResultadoItem`. CSS nuevo. Banco:
  `src/banco/c1/reading.ts` con `c1-rue-6-remote-work` (4 textos, 37–40) y `c1-rue-7-bus-map` (41–46, sobra A),
  los dos del examen 1. `scripts/capturas.mjs` acepta un cuarto argumento con partes («6,7») y las recorre.
- Comprobado: typecheck limpio; 17 tests en verde (el test del banco valida los dos ejercicios nuevos); capturas de
  Part 6 y Part 7 revisadas, sin errores de página.
- Falló: un error de tipos en la corrección (narrowing de `correcta`), arreglado.
- Capturas: `docs/loop-mejorar/capturas/2b/` (07-parte-6*, 07-parte-7*).
- Mejorable (para 4b): elegir el párrafo desde el propio hueco; dos columnas en tablet.
- Cómo probarlo: Inicio → Reading & Use of English → «Part 6 · Cross-text multiple matching» o «Part 7 · Gapped
  text»; contesta tocando letras y corrige.
