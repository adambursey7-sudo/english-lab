// Resuelve a ciegas (con `claude -p`, sin la clave) cada ejercicio que se corrige solo y compara con la clave del banco.
// Gasta cuota de Claude. Guarda lo que no coincide en docs/loop-mejora-total/calidad-ciego.json y se puede repetir:
// salta lo que ya está en salida/ciego-cache.json.
//
// Uso:  node scripts/resolver-ciego.mjs [--paralelo 4] [--examen c1|pau] [--numero N] [--rehacer]
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createServer } from 'vite';

const args = process.argv.slice(2);
const opt = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
const paralelo = Number(opt('--paralelo')) || 4;
const soloExamen = opt('--examen');
const soloNumero = opt('--numero') ? Number(opt('--numero')) : undefined;
const rehacer = args.includes('--rehacer');

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
const { BANCO } = await vite.ssrLoadModule('/src/banco/index.ts');
const { extraerJson } = await vite.ssrLoadModule('/src/motor/guiaEstilo.ts');

mkdirSync('salida', { recursive: true });
const rutaCache = 'salida/ciego-cache.json';
const cache = !rehacer && existsSync(rutaCache) ? JSON.parse(readFileSync(rutaCache, 'utf8')) : {};
const EVALUABLES = ['opciones', 'emparejar', 'palabra', 'verdaderoFalso'];
const norm = (t) => String(t).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

function preguntar(texto) {
  return new Promise((resolve, reject) => {
    const p = spawn('claude', ['-p', '--model', 'sonnet', '--tools', '', '--no-session-persistence'], { shell: process.platform === 'win32' });
    let out = '';
    let err = '';
    p.stdout.on('data', (d) => (out += d));
    p.stderr.on('data', (d) => (err += d));
    p.on('close', (c) => (c === 0 ? resolve(out) : reject(new Error(`claude falló (${c}): ${err.slice(0, 200)}`))));
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

async function resolver(e) {
  const evaluables = e.items.filter((i) => EVALUABLES.includes(i.tipo));
  const texto = await preguntar(
    `Solve this exam exercise as a careful student. Reply with ONLY a JSON object mapping each question number to your answer: ` +
      `the option letter (A, B, C…) for multiple choice and matching (letters follow the order of the options/sections), the word(s) for gaps, ` +
      `TRUE or FALSE for true/false.\n\n${JSON.stringify(examenCiego(e))}`,
  );
  const dadas = extraerJson(texto);
  const fallos = [];
  for (const i of evaluables) {
    const d = dadas[String(i.n)];
    let bien = false;
    if (d !== undefined) {
      if (i.tipo === 'opciones' || i.tipo === 'emparejar') bien = String(d).trim().toUpperCase().charCodeAt(0) - 65 === i.correcta;
      else if (i.tipo === 'palabra') bien = i.correctas.some((c) => norm(c) === norm(d));
      else bien = String(d).trim().toUpperCase().startsWith(i.correcta ? 'T' : 'F');
    }
    if (!bien) fallos.push({ n: i.n, dada: d ?? null, clave: i.tipo === 'opciones' || i.tipo === 'emparejar' ? String.fromCharCode(65 + i.correcta) : i.tipo === 'palabra' ? i.correctas : i.correcta });
  }
  return { total: evaluables.length, fallos };
}

const lista = BANCO.filter((e) => e.items.some((i) => EVALUABLES.includes(i.tipo)))
  .filter((e) => (!soloExamen || e.examen === soloExamen) && (soloNumero === undefined || e.examenNumero === soloNumero))
  .filter((e) => cache[e.id] === undefined);
console.log(`${lista.length} ejercicios por resolver (${Object.keys(cache).length} en caché)`);
let siguiente = 0;
async function trabajador() {
  while (siguiente < lista.length) {
    const e = lista[siguiente++];
    for (let intento = 1; intento <= 2; intento++) {
      try {
        cache[e.id] = await resolver(e);
        writeFileSync(rutaCache, JSON.stringify(cache, null, 1));
        const r = cache[e.id];
        console.log(`${r.fallos.length ? '✘' : '✔'} ${e.id} (${r.total - r.fallos.length}/${r.total})${r.fallos.length ? ' ' + JSON.stringify(r.fallos) : ''}`);
        break;
      } catch (err) {
        if (intento === 2) console.log(`! ${e.id}: ${err.message}`);
      }
    }
  }
}
await Promise.all(Array.from({ length: paralelo }, trabajador));

const resumen = BANCO.filter((e) => cache[e.id]?.fallos.length).map((e) => ({ id: e.id, examen: e.examen, numero: e.examenNumero, ...cache[e.id] }));
mkdirSync('docs/loop-mejora-total', { recursive: true });
writeFileSync('docs/loop-mejora-total/calidad-ciego.json', JSON.stringify(resumen, null, 1) + '\n');
const preguntas = Object.values(cache).reduce((s, r) => s + r.total, 0);
const malas = Object.values(cache).reduce((s, r) => s + r.fallos.length, 0);
console.log(`Hecho: ${Object.keys(cache).length} ejercicios, ${preguntas} preguntas, ${malas} no coinciden (${((1 - malas / preguntas) * 100).toFixed(1)} % de acuerdo).`);
await vite.close();
