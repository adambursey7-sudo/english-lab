// Fábrica de EXÁMENES ENTEROS numerados (en el PC de Adam, con Claude Code): escribe todas las partes del examen N,
// las valida y hace que otra llamada las resuelva a ciegas (como scripts/fabrica.mjs), les pone `examenNumero` y las
// guarda juntas en src/banco/generados/examen-<c1|pau>-<N>.json. Se puede repetir: salta las partes que ya están hechas.
// Después: node scripts/exportar-guiones.mjs && python scripts/audios.py  (mp3 del listening del C1).
//
// Uso:  node scripts/examen-completo.mjs c1 4 [--paralelo 3]      node scripts/examen-completo.mjs pau 4
//       --seco: enseña los temas elegidos y no llama a la IA.   --solo reading-use/5: una sola parte.
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createServer } from 'vite';

const args = process.argv.slice(2);
const seco = args.includes('--seco');
const opt = (nombre) => { const i = args.indexOf(nombre); return i >= 0 ? args[i + 1] : undefined; };
const paralelo = Number(opt('--paralelo')) || 3;
const solo = opt('--solo');
const pos = args.filter((a, i) => !a.startsWith('--') && !args[i - 1]?.startsWith('--'));
const examen = pos[0];
const numero = Number(pos[1]);
if (!['c1', 'pau'].includes(examen) || !numero) {
  console.error('Uso: node scripts/examen-completo.mjs <c1|pau> <número del examen> [--paralelo 3] [--seco] [--solo destreza/parte]');
  process.exit(1);
}

const TEMAS_C1 = [
  'urban beekeeping', 'the return of vinyl records', 'learning a language as an adult', 'a lighthouse keeper\'s diary',
  'sleep science and shift work', 'restoring old paintings', 'remote work and loneliness', 'the history of tea',
  'marine biology and coral nurseries', 'community libraries', 'a village that bans cars', 'street food culture',
  'wearable technology and privacy', 'mountain rescue volunteers', 'the economics of second-hand fashion', 'a novel about a translator',
  'bird migration and light pollution', 'the rise of board-game cafés', 'architecture for ageing populations', 'ultra-marathon running',
  'memory and the way we tell stories', 'a failed expedition to Antarctica', 'vertical farming', 'jazz improvisation',
  'the psychology of procrastination', 'museums and digital archives', 'a family-run bakery under pressure', 'wild swimming',
  'public speaking anxiety', 'robots in care homes', 'the lost art of handwriting', 'a festival that changed a small town',
  'volunteer tourism: help or harm?', 'plant-based cooking', 'the first women astronomers', 'noise in the modern city',
  'apprenticeships versus university', 'a letter found in a second-hand book', 'water-saving gardens', 'the science of laughter',
  'cycling cities', 'a fishing community and tourism', 'creativity and boredom', 'documentary film-making in the field',
];
const TEMAS_PAU = [
  'social media and sleep', 'teenagers and part-time jobs', 'plastic-free schools', 'video games and learning', 'a new bike-sharing system',
  'sports clubs for girls', 'young volunteers and animal shelters', 'healthy lunches at school', 'mobile phones in class', 'summer camps abroad',
  'the benefits of reading for pleasure', 'recycling fashion', 'online shopping habits', 'tourism and local life in the Canary Islands',
  'e-sports as a career', 'homework: how much is too much?', 'student exchange programmes', 'urban gardens at school', 'streaming versus cinema',
  'cooking classes for teenagers', 'a school radio station', 'saving energy at home', 'learning to code', 'noise in cities', 'part-time study and sport',
];

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
const { BANCO } = await vite.ssrLoadModule('/src/banco/index.ts');
const { GUIA, promptEjercicio, extraerJson } = await vite.ssrLoadModule('/src/motor/guiaEstilo.ts');
const { validarEjercicio } = await vite.ssrLoadModule('/src/motor/validar.ts');

mkdirSync('src/banco/generados', { recursive: true });
const archivo = join('src/banco/generados', `examen-${examen}-${numero}.json`);
const hechos = existsSync(archivo) ? JSON.parse(readFileSync(archivo, 'utf8')) : [];
const textosDe = (e) => [e.texto ?? '', ...(e.secciones?.map((s) => s.texto) ?? [])];

const inicioTotal = Date.now();
let llamadas = 0;
function preguntar(texto) {
  llamadas++;
  return new Promise((resolver, rechazar) => {
    const p = spawn('claude', ['-p', '--model', 'sonnet', '--tools', '', '--no-session-persistence'], { shell: process.platform === 'win32' });
    let out = '';
    let err = '';
    p.stdout.on('data', (d) => (out += d));
    p.stderr.on('data', (d) => (err += d));
    p.on('close', (code) => (code === 0 ? resolver(out) : rechazar(new Error(`claude falló (${code}): ${(err || out).slice(0, 300)}`))));
    p.stdin.end(texto);
  });
}

function examenCiego(e) {
  const itemsCiegos = e.items.map((i) => {
    const { correcta: _a, correctas: _b, explicacion: _c, pruebas: _d, modelo: _m, ...resto } = i;
    return resto;
  });
  const { audio, ...base } = e;
  return { ...base, items: itemsCiegos, ...(audio ? { transcripcion: audio.guion.filter((l) => 'texto' in l).map((l) => `${l.quien}: ${l.texto}`).join('\n') } : {}) };
}
const norm = (t) => String(t).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

async function coincidenciaCiega(e) {
  const evaluables = e.items.filter((i) => ['opciones', 'emparejar', 'palabra', 'verdaderoFalso'].includes(i.tipo));
  if (evaluables.length === 0) return 1;
  const texto = await preguntar(
    `Solve this exam exercise as a careful student. Reply with ONLY a JSON object mapping each question number to your answer: ` +
      `the option letter (A, B, C…) for multiple choice and matching (letters follow the order of the options/sections), the word(s) for gaps, ` +
      `TRUE or FALSE for true/false.\n\n${JSON.stringify(examenCiego(e))}`,
  );
  let dadas;
  try { dadas = extraerJson(texto); } catch { return 0; }
  let bien = 0;
  for (const i of evaluables) {
    const d = dadas[String(i.n)];
    if (d === undefined) continue;
    if (i.tipo === 'opciones' || i.tipo === 'emparejar') bien += String(d).trim().toUpperCase().charCodeAt(0) - 65 === i.correcta ? 1 : 0;
    else if (i.tipo === 'palabra') bien += i.correctas.some((c) => norm(c) === norm(d)) ? 1 : 0;
    else bien += String(d).trim().toUpperCase().startsWith(i.correcta ? 'T' : 'F') ? 1 : 0;
  }
  return bien / evaluables.length;
}

// Temas: una lista barajada de forma estable por examen, distinta para cada parte.
const pool = examen === 'c1' ? TEMAS_C1 : TEMAS_PAU;
const temaDe = (k) => pool[(numero * 7 + k * 5) % pool.length];
let guias = GUIA.filter((g) => g.examen === examen);
if (solo) guias = guias.filter((g) => `${g.destreza}/${g.parte}` === solo);
const tareas = guias.map((g, k) => ({ g, tema: temaDe(k) }));
// En la PAU, la composición habla del mismo asunto que el texto.
if (examen === 'pau') for (const t of tareas) if (t.g.parte === 6) t.tema = `${temaDe(0)} (one topic is an opinion composition about this subject)`;

if (seco) {
  for (const t of tareas) console.log(`${t.g.destreza}/${t.g.parte}: ${t.tema}`);
  await vite.close();
  process.exit(0);
}

const yaEsta = (g) => hechos.some((e) => e.destreza === g.destreza && e.parte === g.parte);
let guardados = 0;
let fallidos = 0;

async function hacer({ g, tema }) {
  if (yaEsta(g)) return console.log(`= ${g.destreza}/${g.parte} ya estaba`);
  const ejemplo = BANCO.find((e) => e.examen === examen && e.destreza === g.destreza && e.parte === g.parte);
  if (!ejemplo) return console.log(`✘ ${g.destreza}/${g.parte}: no hay ejemplo en el banco`);
  let errores = [];
  for (let intento = 1; intento <= 3; intento++) {
    try {
      const e = extraerJson(await preguntar(promptEjercicio(g, ejemplo, tema, errores)));
      e.examen = examen;
      e.destreza = g.destreza;
      e.parte = g.parte;
      e.nombreParte = ejemplo.nombreParte;
      e.minutos = ejemplo.minutos;
      e.examenNumero = numero;
      e.id = `${examen}-${g.destreza}-${g.parte}-x${numero}`;
      if (e.audio) e.audio = { ...e.audio, archivo: `audio/${e.id}.mp3` };
      const otros = [...BANCO.flatMap(textosDe), ...hechos.flatMap(textosDe)];
      errores = validarEjercicio(e, otros);
      if (errores.length > 0) { console.log(`  ${g.destreza}/${g.parte} intento ${intento}: validador (${errores.length}): ${errores[0]}`); continue; }
      const coincide = await coincidenciaCiega(e);
      if (coincide < 0.8) {
        errores = [`Una persona que lo resolviera sin la clave solo acertaría el ${Math.round(coincide * 100)} %: hay preguntas ambiguas, con dos respuestas posibles o mal hechas. Hazlas inequívocas.`];
        console.log(`  ${g.destreza}/${g.parte} intento ${intento}: ${errores[0]}`);
        continue;
      }
      hechos.push(e);
      writeFileSync(archivo, JSON.stringify(hechos, null, 1) + '\n');
      guardados++;
      return console.log(`✔ ${g.destreza}/${g.parte} (${tema})`);
    } catch (err) {
      errores = [String(err.message ?? err)];
      console.log(`  ${g.destreza}/${g.parte} intento ${intento}: ${errores[0]}`);
    }
  }
  fallidos++;
  console.log(`✘ ${g.destreza}/${g.parte}: sin resultado válido tras 3 intentos`);
}

const cola = [...tareas];
await Promise.all(Array.from({ length: paralelo }, async () => { for (let t = cola.shift(); t; t = cola.shift()) await hacer(t); }));
await vite.close();
console.log(`Examen ${examen} ${numero}: ${guardados} partes nuevas, ${fallidos} fallidas, ${hechos.length}/${tareas.length} en el archivo.`);
const min = ((Date.now() - inicioTotal) / 60000).toFixed(1);
console.log(`Gasto: ${llamadas} llamadas a Claude (sonnet) en ${min} min.`);
process.exit(fallidos > 0 ? 2 : 0);
