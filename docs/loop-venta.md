# Loop «English Lab para vender»

Pedido por Adam el 1/11/2026: convertir English Lab en una **app para la venta**: generador de exámenes, PDF imprimible
de calidad profesional y todo lo que haga falta para que un profe o una academia de inglés la compre y la use sin
ayuda. Adam dijo: «no me esperes, termínalo cuando sea, sin prisa». Por eso el loop decide con valores por defecto
(regla «dictado ambiguo: móntalo»), lo apunta en «Decisiones de Claude» y sigue.

Rama `loop/venta` en la copia `C:\dev\english-lab-t-venta` (desde `master` fb290d3). `node_modules` es un enlace a
`C:\dev\english-lab\node_modules`. **No tocar `C:\dev\english-lab`**: otra sesión trabaja ahí en el C1 examen 3
(`tablon/english-lab-c1-3`). Sigue siempre el `CLAUDE.md` del proyecto (ejercicios de cero, sin marcas oficiales,
interfaz en español, ejercicios en inglés, nombres de código en español, repo público: nada de datos personales).

## Qué se vende (hipótesis de partida, el bloque 1 la confirma o la corrige)
- **Cliente:** profes particulares y academias pequeñas de inglés que preparan **Cambridge C1 Advanced** y la **PAU de
  inglés (Canarias)**, y que hoy montan sus exámenes copiando y pegando en Word.
- **Producto:** una web instalable (PWA, sin servidor, funciona sin conexión) que se usa sobre todo **en el ordenador
  del profe**: elige qué examen quiere, la app lo **genera**, lo **imprime en PDF** con el nombre de su academia, con
  hoja de respuestas, clave de corrección y QR del audio; y los alumnos pueden hacerlo en el móvil y corregirse solos.
- **Lo que hoy es solo de la clase de Kate** (perfiles con nombre, PIN, fotos, notas de Adam, intro con vídeo, viñetas
  de nota, logo de Kate) **no va en el producto**: se queda en la versión de clase, que debe seguir funcionando igual.
- **Cómo se cobra:** licencia de pago único por academia (o anual) con clave que se comprueba sin servidor. El loop deja
  todo preparado, pero **no abre cuentas de pago ni publica nada**: eso lo decide y lo hace Adam (ver «Para Adam»).

## Reglas de cada vuelta
1. Leer este archivo («Estado») y hacer **un solo paso**, el siguiente sin hacer. Si es grande, partirlo (3a-1, 3a-2) y
   apuntarlo. Nada de empezar dos pasos en la misma vuelta.
2. Antes de dar un paso por hecho: `npm run typecheck` y `npm test` limpios (desde `C:\dev\english-lab-t-venta`). Todo
   motor nuevo lleva tests. Commit en `loop/venta` con mensaje en español.
3. **Ver lo que se hace:** servidor en el puerto **5273** (`npx vite --port 5273 --strictPort` en segundo plano) y
   capturas con `scripts/capturas.mjs` o Chrome sin ventana con perfil propio en el scratchpad. El producto se usa en
   ordenador: capturar **PC 1366×768 y 1920×1080**, tablet 820×1180 y móvil 390×844. Los PDF se miran página a página
   (`pypdfium2`). Capturas en `docs/loop-venta/capturas/<vuelta>/` (JPEG 1400 px).
4. **Bocetos:** `docs/loop-venta/bocetos/index.html`, entrada nueva arriba en cada vuelta con capturas, «Hecho» y
   «Mejorable». Se publica como Artifact **al cerrar cada bloque** (copiar a la temporal de la sesión; cargar antes
   `artifact-design`) y se anota el enlace aquí. Lo mejorable lo arregla el loop en la vuelta siguiente si cabe.
5. Apuntar la vuelta en «Registro» (Hecho / Comprobado / Falló / Cómo probarlo) y actualizar «Estado». Mantener el
   `CLAUDE.md` al día cuando cambie la estructura.
6. Con Adam, claro: nada de códigos de paso ni ids; nombres reales («la pantalla Crear examen»).
7. **Telegram** (`C:\Users\adamg\OneDrive\Escritorio\claude\llamadas\llamame.ps1 -Titulo ... -Informe ...`): solo al
   cerrar cada bloque grande (3, 5, 7) con lo importante y sin rutas, y si el loop se bloquea. Nada más.
8. Revisión: `/code-review low` al cerrar cada bloque; **`/code-review medium` y `/security-review` una vez** al cerrar
   el bloque de licencias y el de «Aula» (tocan claves, enlaces y datos de alumnos). `/simplify` solo al final.
9. Si un paso falla dos veces por la misma causa, apuntarlo y pasar al siguiente. Si falla 2 veces seguidas y es
   importante, pasar solo ese problema a un subagente con `model: "fable"` (una vez por problema).
10. **No hacer nunca sin que Adam lo diga:** unir a `master`, `git push`, publicar en Pages, crear cuentas o enlaces de
    pago, mandar correos, tocar `C:\dev\english-lab`. El trabajo se queda en la rama.
11. Consumo: sin revisores en cada vuelta, pocas capturas, un solo servidor. Al cerrar cada bloque, avisar en una línea
    «buen momento para `/compact`». Tope por tanda: **24 vueltas**; si se llega al tope, cerrar y dejar «Siguiente».

## Decisiones de Claude (Adam puede cambiarlas)
- **Dos versiones de la misma base:** modo de compilación `producto` (genérico, con la marca del cliente) y modo `clase`
  (el actual de Kate, con perfiles y PIN). Una variable `import.meta.env` / `mode` decide; el banco y los motores son
  comunes. Así nada de la clase se pierde y el producto no arrastra datos personales.
- **Nombre del producto:** provisional «English Lab»; se escribe en un solo sitio (`src/marca.ts`) para cambiarlo. No
  usar «Cambridge» como marca propia: «tipo C1 Advanced» con aviso de que no está afiliado ni respaldado por Cambridge
  (el cuadernillo de hoy dice «C1 Advanced · Practice test»: se revisa en el bloque 7).
- **Sin servidor:** licencia con clave firmada (Ed25519, clave privada fuera del repo, solo la pública en la app). Se
  dice con honestidad que un informático podría saltársela: vale para academias, no para piratas.
- **«Aula» sin servidor:** el examen generado viaja en un enlace/QR (ids + semilla); el alumno lo hace en el móvil y
  devuelve su resultado como texto o QR; el profe los pega en una tabla de clase. Sin cuentas ni datos en la nube.
- **El profe no necesita saber nada:** primera pantalla guiada (academia, logo, colores) y examen de ejemplo listo.
- **Contenido (actualizado 1/11):** el generador de IA (bloque 6) es el corazón; el generador de exámenes mezcla ejercicios del banco; la rama `tablon/english-lab-c1-3` (otra sesión) añadirá el
  C1 examen 3. Este loop no escribe exámenes enteros nuevos salvo piezas sueltas por parte para dar variedad (bloque 6).

## Plan (bloques y pasos)
**0. Preparar** — 0a hecho: rama, copia de trabajo, este plan.

**1. Producto y mercado**
- 1a. Investigar en la web (pocas búsquedas): qué hacen los generadores de exámenes y las plataformas de inglés para
  profes (precios, qué incluyen, quejas habituales) y qué dice Cambridge/PAU sobre usar sus nombres y formatos.
  `docs/venta/mercado.md` (resumen con enlaces, sin copiar textos) y propuesta de precio y de versiones (Básica / Pro).
- 1b. Auditoría de la app de hoy **con ojos de profe que paga**: capturas en PC, qué le falta para comprarla, lista
  priorizada. Tres direcciones para la pantalla principal del profe (boceto SVG, ventajas e inconvenientes, una
  recomendada).

**2. Separar producto de clase**
- 2a. `src/marca.ts` (nombre de la academia, logo, colores, pie del PDF) leída de configuración guardada; modo
  `producto` vs `clase` en `vite.config.ts`, `package.json` (`build:producto`, `build:clase`) y `App.tsx`.
- 2b. En modo producto: sin perfiles, PIN, fotos, notas de Adam ni intro; la pantalla de inicio es la del profe.
  Comprobar que el build de producto no contiene nombres ni fotos de alumnos (test que busca en `dist`).
- 2c. Asistente de primera vez: nombre de la academia, logo (subir imagen → se guarda en el navegador), color,
  idioma del texto de apoyo. Todo se aplica a la app y al PDF.

**3. Generador de exámenes (el corazón)**
- 3a. Motor `src/motor/generador.ts`: dada una receta (examen, partes, cuántos ejercicios por parte, semilla, evitar
  los ya usados, solo corrección automática sí/no) devuelve un examen montado; determinista por semilla; versiones A/B
  con distinto orden de preguntas y de opciones sin romper la clave. Tests.
- 3b. Pantalla «Crear examen»: elegir tipo, partes, minutos y versión; vista previa; botón «Generar otra mezcla».
- 3c. «Mis exámenes»: guardar recetas y exámenes generados en el navegador, duplicar, borrar, exportar e importar
  copia de seguridad (archivo JSON).
- 3d. Historial de uso: qué ejercicios se han puesto ya a cada grupo (para no repetirlos). Tests.

**4. PDF imprimible profesional** (estilo «examen oficial», A4)
- 4a. Cabecera y pie con nombre de la academia, logo, título, número de página («Page 2 of 8»), grupo, fecha y casillas
  de nombre; tamaños y márgenes de examen real; opción «ahorrar tinta».
- 4b. Hoja de respuestas del alumno (rejilla para marcar) y clave del profe (respuestas, alternativas aceptadas,
  explicaciones, criterios de writing y speaking) en PDF aparte; versión A/B con su propia clave.
- 4c. QR del audio y reproductor web propio, que funcione con la marca del cliente; opción de generar un PDF solo de
  una destreza (hoja suelta) o de una parte.
- 4d. Revisión de maquetación página a página del examen de C1 y de la PAU (capturas), sin cortes feos, sin páginas
  vacías, listening con instrucciones; `scripts/pdf.ps1` para generar por lotes. `/code-review low`.

**5. Editor de ejercicios propios**
- 5a. Plantillas de los tipos más usados (opción múltiple, huecos con opciones, huecos abiertos, formación de palabras,
  transformaciones, verdadero/falso, redacción) con formulario y vista previa.
- 5b. Guardado en el navegador, mezcla con el banco en el generador y validación igual que la del test del banco
  (huecos que existen, una sola respuesta, etc.). Exportar/importar un paquete de ejercicios.
- 5c. Importar desde texto pegado (formato sencillo de líneas) para pasar ejercicios de Word en un minuto.

**6. Generador con IA (decisión de Adam, 1/11: «que la propia aplicación genere los exámenes» con los parámetros de
Cambridge C1 y de la PAU, solo esos dos; Adam aporta muchos exámenes de muestra en `C:\dev\english-lab-fuentes\de-adam\`)**
- 6a. Guía de estilo por parte (`docs/estilo/c1-*.md`, `docs/estilo/pau.md`): longitud, registro, tipo de huecos,
  distractores, vocabulario y estructuras C1, temas y criterios de la PAU, sacada de los manuales oficiales, de `formatos.md`
  y de los exámenes de Adam. Se aprende el estilo; **nunca se copia texto** (los exámenes de muestra no entran en el repo).
- 6b. Validador automático (`src/motor/validar.ts`, el mismo del test del banco más nivel de vocabulario y longitud) que
  rechaza lo mal hecho y devuelve el motivo para regenerar.
- 6c. Fábrica por lotes en el PC (`scripts/fabrica.mjs`): genera ejercicios nuevos con Claude según la guía, los pasa por
  el validador y por un revisor de solo lectura, y los guarda en el banco. Meta: variedad suficiente por parte para que el
  generador de exámenes mezcle de verdad.
- 6d. Botón «Crear ejercicio nuevo» dentro de la app (Pro): llamada directa del navegador a la IA con la clave del propio
  profe (guardada solo en su navegador), misma guía y mismo validador; se guarda en «Mis ejercicios». Sin servidor propio.
- 6e. Banco de muestra de la demo: 1 examen de C1 y 1 de PAU desbloqueados siempre.

**7. Aula sin servidor y licencias**
- 7a. Enlace/QR de examen para alumnos (ids + semilla + marca); el alumno lo hace y se corrige solo.
- 7b. Devolver resultado: texto y QR con nombre, nota por parte y respuestas; el profe lo pega o lo escanea y ve la
  tabla de la clase (media, partes más falladas). Nada sale del navegador.
- 7c. Licencias: `scripts/licencia.mjs` (par de claves en carpeta fuera del repo, genera claves por academia con nombre
  y caducidad); `src/motor/licencia.ts` comprueba la firma sin servidor; pantalla «Activar licencia»; sin clave =
  **demo** (exámenes de muestra, PDF con marca de agua, sin guardar más de 3 exámenes). Tests.
- 7d. `/code-review medium` + `/security-review` de licencias, enlaces de examen y resultados.

**8. Cara comercial**
- 8a. Página de venta (`web/index.html`, estática y aparte de la app): qué es, capturas, precio propuesto, preguntas
  frecuentes, demo en vivo. En español y en inglés.
- 8b. Textos legales mínimos (condiciones de licencia, privacidad: «los datos no salen de tu navegador», aviso de marcas)
  como borrador para que Adam los revise con quien corresponda. Manual del profe en PDF de 4 páginas con capturas.
- 8c. Revisión de nombres: «C1 Advanced» y «Cambridge» en la app, el PDF y la web, según lo investigado en 1a.

**9. Pulido para el ordenador**
- 9a. Layout ancho del profe (barra lateral, atajos, vista previa al lado), modo oscuro cuidado, tamaños de texto,
  accesibilidad (foco, contraste, 44 px en móvil).
- 9b. Pasar la app entera en PC, tablet y móvil con capturas; arreglar lo acumulado como «Mejorable».

**10. Cierre**
- 10a. `npm run build:producto` y `build:clase`, test de que el producto no lleva datos de alumnos, `CLAUDE.md` al día,
  `/simplify`, boceto final («Cambios» y «Mejoras para el próximo loop»), memoria (`english-lab.md` y una nueva
  `english-lab-venta.md`), aviso a Adam por Telegram con lo importante y la lista «Para Adam». Parar el loop.

## Para Adam (lo único que no puede hacer Claude)
Se rellena según avanza el loop. De partida: elegir el nombre definitivo del producto; abrir la cuenta donde cobrar
(Lemon Squeezy, Gumroad, Stripe…) y fijar el precio; revisar los textos legales; probarlo con un profe de verdad;
decidir cuándo unir `loop/venta` a `master` y publicarlo; guardar la clave privada de licencias en un sitio seguro.

## Estado
- 1/11: loop preparado (rama `loop/venta`, copia `english-lab-t-venta`, este plan). Vuelta 1: 1a hecho (`docs/venta/mercado.md`). Vuelta 2: 1b hecho (auditoría y tres formas de pantalla; elegida B con plantillas de C, por defecto). **Bloque 1 cerrado.**
- Vuelta 3 (1/11): 2a y 2b hechos: `src/marca.ts` (nombre, logo y color de la academia, guardados en el navegador), modo `producto` (`npm run dev:producto` en el 5273, `npm run build:producto`, `npm run test:producto`). El paquete de producto sale sin perfiles, fotos, notas de Adam, intro, viñetas ni logo de Kate. 
- Vuelta 4 (1/11): 2c hecho: asistente de primera vez (`src/componentes/Asistente.tsx`: nombre, logo reducido a 256 px y color, guardados en el navegador) y textos «tu profe» (`PROFE` en `src/marca.ts`). Falta el título del PDF sin «Cambridge» como nombre y un sitio para cambiar la marca luego (llega con el panel del bloque 3). 3a hecho: `src/motor/generador.ts` (receta + semilla → examen; evita ejercicios usados; versión B con opciones barajadas; 6 tests). Siguiente: 3b (pantalla «Crear examen» con vista previa).
- 1/11: fuentes para el bloque 6 en `C:\dev\english-lab-fuentes\de-adam\` (fuera del repo): 3 exámenes PAU de Adam (junio 25 ciencias y HCCSS, reserva julio 26), de Cambridge el cuadernillo oficial de muestras 2015 (47 págs., 2 papers completos con claves), hojas oficiales de las partes 5, 6, 8 y Writing 1 y la guía de candidatos. Hay Reading, Writing y claves; Listening y Speaking solo en el cuadernillo de muestras.

## Registro de vueltas
(una entrada por vuelta: Hecho / Comprobado / Falló / Capturas / Cómo probarlo)

### Vuelta 2 · 1b. Auditoría de profe y pantalla principal
- Hecho: capturas en PC (1366×768) de inicio y cuadernillo; lista de lo mejorable (columna estrecha en PC, solo exámenes
  fijos, marca de Kate, PDF sin grupo/fecha/páginas/versión A/B, «Cambridge» como nombre, sin guardar ni repartir);
  tres formas de pantalla (A asistente, B panel con vista previa, C plantillas) en `docs/loop-venta/bocetos/index.html`.
- Decisión por defecto: B con atajos de C (Adam puede cambiarla en el bloque 3).
- Comprobado: sin errores de página. Código sin tocar.
- Cómo probarlo: abrir `bocetos/index.html`.

### Vuelta 3 · 2a + 2b. Marca y modo producto
- Hecho: `src/marca.ts` + test; `ES_PRODUCTO`/`MODO_CLASE` según `--mode producto`; `PERFILES` vacío en producto (el minificador quita los datos); `public-producto` sin lo de la clase (`scripts/preparar-producto.mjs`); sin intro, perfiles ni viñetas de Kate en producto; `scripts/comprobar-producto.mjs` busca nombres, fotos, huellas de PIN y logo en el paquete.
- Comprobado: typecheck y tests en verde; el build de producto pasa la comprobación y el de clase sí contiene los nombres (la prueba muerde).
- Mejorable: textos «Enviar a Adam»/«para que corrija Adam» en Redaccion/Resultado; el título del PDF dice «C1 Advanced · Practice test»; la cabecera de producto aún es provisional (el panel del profe llega en el bloque 3).
