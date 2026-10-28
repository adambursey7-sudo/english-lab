# English Lab

App web instalable (PWA, React 19 + TypeScript + Vite) de Adam para practicar exámenes de inglés: Cambridge C1 Advanced y PAU de inglés, con corrección automática y explicación de cada fallo. Más adelante: B1/B2, Escuela de Idiomas, «Mis clases» con código y un modo profe conectado a Jarvis (PC de Adam) para crear ejercicios y corregir writings. Diseño y decisiones del 28/10/2026: https://claude.ai/artifact/VU4Y3GGuvbLfQYTyF2c5Kt

## Decisiones
- **Alumnos (forma A):** el banco va dentro de la app, se corrige en el móvil, sin servidor ni PC. Writing y speaking se mandan a Adam (pendiente).
- **Adam (forma B):** modo profe que habla con Jarvis en su PC (pendiente).
- **Reparto:** enlace público en GitHub Pages (`npm run build:pages`, base `/english-lab/`) → WhatsApp → «Añadir a pantalla de inicio». Cuenta de GitHub de Adam: pendiente de iniciar sesión (`gh auth login`).
- **Alcance ahora:** solo C1 y PAU; meta 200 ejercicios por tipo, empezando por unos 20 exámenes.
- Ejercicios redactados de cero al estilo de cada examen. Sin marcas ni logos oficiales. Nunca nombres de alumnos en el código.
- Interfaz en español, ejercicios en inglés. Nombres de código en español.
- Listening: guion con quién habla; audios hechos en el PC de Adam con edge-tts (voces variadas, incluida una de niña) y la voz del móvil de respaldo (pendiente).

## Estructura
- `src/banco/tipos.ts`: modelo (`Ejercicio`, `Item` = opciones | emparejar | palabra | transformacion | verdaderoFalso | redaccion | hablar, `Respuestas`, `Audio` con guion y hablantes). Los huecos del texto van como `{{n}}`; `opcionesComunes` es la lista A, B, C… de los items `emparejar`; `examenNumero` agrupa las partes de un examen completo. Formatos oficiales en `docs/formatos.md`. Loop en marcha: `docs/loop-mejorar.md`.
- `src/banco/<examen>/*.ts`: ejercicios; cada archivo exporta una lista y se suma en `src/banco/index.ts` (`BANCO`, `partesDe`, `destrezasDe`).
- `src/motor/corregir.ts`: corrección pura (`normaliza`, `corrigeEjercicio` con `aciertos`/`total`/`pendientes`, `cuentaPalabras`, `palabrasRedaccion`); redacción y speaking no se corrigen solos (`evaluable: false`). `src/motor/examen.ts`: montar examen/parte y «vistos» en localStorage.
- `src/pantallas/`: Inicio → Ejercicio (reloj, huecos tocables, entradas) → Resultado (texto corregido en verde/rojo y explicaciones).
- `src/componentes/`: `TextoHuecos`, `Temporizador`, `Instalar` (guía de añadir a inicio en iPhone/Android), `Redaccion` (writing: contador, elegir tarea, enviar a Adam, modelo y criterios), `Hablar` (speaking: reloj por fases, grabar con el micro, hoja de ideas).
- `src/motor/entregas.ts`: palabras por bandas, texto para compartir, entregas en localStorage, compartir (Web Share → portapapeles + WhatsApp).
- `scripts/iconos.py`: iconos de `public/` con Pillow.

## Comandos
- `npm run dev` (abierto a la wifi para probar en el iPhone), `npm run build`, `npm run build:pages`, `npm test`, `npm run typecheck`.
- Al añadir ejercicios: `npm test` comprueba ids únicos, huecos que existen, transformaciones de 3–6 palabras y explicaciones.
- **Enlace público provisional (28/10):** `npm run build` + `npx vite preview --host 127.0.0.1 --port 4173 --strictPort` en una ventana propia, publicado con `tailscale funnel --bg --https=8443 4173` → https://msi.tail0b94b8.ts.net:8443 (depende del PC de Adam encendido; `preview.allowedHosts` permite `.ts.net`). Apagar con `tailscale funnel --https=8443 off`. El puerto 443 de Tailscale lo usa Jarvis (solo tailnet): no tocarlo. Sustituir por GitHub Pages cuando Adam inicie sesión.
