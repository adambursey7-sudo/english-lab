// Fábrica de ejercicios nuevos (en el PC de Adam, con Claude Code): escribe ejercicios de una parte con la guía de
// estilo, los pasa por el validador, hace que otra llamada los resuelva a ciegas (si no coincide con la clave, se
// descarta) y guarda los buenos en src/banco/generados/. Gasta cuota de Claude: pedir pocos de cada vez.
//
// Uso:  node scripts/fabrica.mjs c1/reading-use/2 [cuantos=1] [--tema "urban gardens"] [--seco]
//       node scripts/fabrica.mjs --todas [cuantos=1]        (una pasada por todas las partes generables)
// --seco: solo enseña el encargo y no llama a la IA.  FUENTES_TXT=<carpeta con .txt>: textos de muestra con los
// que se comprueba que lo generado no se les parece (fuera del repo).
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createServer } from 'vite';

const args = process.argv.slice(2);
const seco = args.includes('--seco');
const todas = args.includes('--todas');
const iTema = args.indexOf('--tema');
const tema = iTema >= 0 ? args[iTema + 1] : undefined;
const posicionales = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--tema');
const clave = todas ? null : posicionales[0];
const cuantos = Number(todas ? posicionales[0] : posicionales[1]) || 1;
if (!todas && !clave) {
  console.error('Falta la parte, por ejemplo: node scripts/fabrica.mjs c1/reading-use/2 3   (o --todas)');
  process.exit(1);
}

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
const { BANCO } = await vite.ssrLoadModule('/src/banco/index.ts');
const { GUIA, ejemploDe, promptEjercicio, extraerJson } = await vite.ssrLoadModule('/src/motor/guiaEstilo.ts');
const { validarEjercicio } = await vite.ssrLoadModule('/src/motor/validar.ts');

const carpetaGenerados = 'src/banco/generados';
mkdirSync(carpetaGenerados, { recursive: true });

const textosDe = (e) => [e.texto ?? '', ...(e.secciones?.map((s) => s.texto) ?? [])];
const fuentes = process.env.FUENTES_TXT && existsSync(process.env.FUENTES_TXT)
  ? readdirSync(process.env.FUENTES_TXT).filter((f) => f.endsWith('.txt')).map((f) => readFileSync(join(process.env.FUENTES_TXT, f), 'utf8'))
  : [];

function preguntar(texto) {
  const r = spawnSync('claude', ['-p', '--model', 'sonnet', '--tools', '', '--no-session-persistence'], { input: texto, encoding: 'utf8', maxBuffer: 20_000_000, shell: process.platform === 'win32' });
  if (r.status !== 0) throw new Error(`claude falló (${r.status}): ${(r.stderr || r.stdout || '').slice(0, 300)}`);
  return r.stdout;
}

/** Quita la clave del ejercicio para que otra llamada lo resuelva a ciegas. */
function examenCiego(e) {
  const itemsCiegos = e.items.map((i) => {
    const { correcta: _a, correctas: _b, explicacion: _c, pruebas: _d, modelo: _m, ...resto } = i;
    return resto;
  });
  const { audio, ...base } = e;
  return { ...base, items: itemsCiegos, ...(audio ? { transcripcion: audio.guion.filter((l) => 'texto' in l).map((l) => `${l.quien}: ${l.texto}`).join('\n') } : {}) };
}

const norm = (t) => String(t).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

/** Qué parte de las preguntas que se corrigen sola contesta igual la IA a ciegas que la clave. */
function coincidenciaCiega(e) {
  const evaluables = e.items.filter((i) => ['opciones', 'emparejar', 'palabra', 'verdaderoFalso'].includes(i.tipo));
  if (evaluables.length === 0) return 1;
  const texto = preguntar(
    `Solve this exam exercise as a careful student. Reply with ONLY a JSON object mapping each question number to your answer: ` +
      `the option letter (A, B, C…) for multiple choice and matching (letters follow the order of the options/sections), the word(s) for gaps, ` +
      `TRUE or FALSE for true/false.\n\n${JSON.stringify(examenCiego(e))}`,
  );
  let dadas;
  try {
    dadas = extraerJson(texto);
  } catch {
    return 0;
  }
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

const objetivos = todas ? GUIA.map((g) => `${g.examen}/${g.destreza}/${g.parte}`) : [clave];
let guardados = 0;
let descartados = 0;
for (const objetivo of objetivos) {
  const [examen, destreza, parteTxt] = objetivo.split('/');
  const parte = Number(parteTxt);
  const guia = GUIA.find((g) => g.examen === examen && g.destreza === destreza && g.parte === parte);
  const ejemplo = guia && ejemploDe(guia, BANCO);
  if (!guia || !ejemplo) {
    console.error(`No se puede generar ${objetivo}: no hay guía o ejemplo.`);
    continue;
  }
  const archivo = join(carpetaGenerados, `${examen}-${destreza}-${parte}.json`);
  const hechos = existsSync(archivo) ? JSON.parse(readFileSync(archivo, 'utf8')) : [];
  for (let n = 0; n < cuantos; n++) {
    if (seco) {
      console.log(promptEjercicio(guia, ejemplo, tema));
      continue;
    }
    let errores = [];
    let bueno = null;
    for (let intento = 1; intento <= 3 && !bueno; intento++) {
      try {
        const e = extraerJson(preguntar(promptEjercicio(guia, ejemplo, tema, errores)));
        e.examen = examen;
        e.destreza = destreza;
        e.parte = parte;
        e.nombreParte = guia.nombreParte ?? ejemplo.nombreParte;
        e.minutos = guia.minutos ?? ejemplo.minutos;
        delete e.examenNumero;
        e.id = `gen-${examen}-${destreza}-${parte}-${Date.now().toString(36)}${n}`;
        if (e.audio) e.audio = { ...e.audio, archivo: `audio/${e.id}.mp3` };
        const otros = [...BANCO.flatMap(textosDe), ...hechos.flatMap(textosDe), ...fuentes];
        errores = validarEjercicio(e, otros);
        if (errores.length > 0) {
          console.log(`  intento ${intento}: rechazado por el validador (${errores.length}): ${errores[0]}`);
          continue;
        }
        const coincide = coincidenciaCiega(e);
        if (coincide < 0.8) {
          errores = [`Una persona que lo resolviera sin la clave solo acertaría el ${Math.round(coincide * 100)} %: hay preguntas ambiguas, con dos respuestas posibles o mal hechas. Hazlas inequívocas.`];
          console.log(`  intento ${intento}: ${errores[0]}`);
          continue;
        }
        bueno = e;
      } catch (err) {
        errores = [String(err.message ?? err)];
        console.log(`  intento ${intento}: ${errores[0]}`);
      }
    }
    if (bueno) {
      hechos.push(bueno);
      writeFileSync(archivo, JSON.stringify(hechos, null, 1) + '\n');
      guardados++;
      console.log(`✔ ${bueno.id} guardado en ${archivo}`);
    } else {
      descartados++;
      console.log(`✘ ${objetivo}: sin resultado válido tras 3 intentos`);
    }
  }
}
await vite.close();
if (!seco) console.log(`Hecho: ${guardados} guardados, ${descartados} descartados.`);
