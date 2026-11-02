// Auditoría del banco entero (C1 y PAU): estructura, reglas de cada parte, claves, tiempos, audios, longitudes y
// frases repetidas entre exámenes. No gasta cuota de Claude. Escribe docs/loop-mejora-total/calidad-auditoria.txt.
//
// Uso:  node scripts/auditar-banco.mjs [--fuentes <carpeta con .txt>]
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { createServer } from 'vite';

const args = process.argv.slice(2);
const iF = args.indexOf('--fuentes');
const carpetaFuentes = iF >= 0 ? args[iF + 1] : process.env.FUENTES_TXT;

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
const { BANCO } = await vite.ssrLoadModule('/src/banco/index.ts');
const { problemas, validarEjercicio, REGLAS, trozos } = await vite.ssrLoadModule('/src/motor/validar.ts');

const textoDe = (e) => [e.texto ?? '', ...(e.secciones?.map((s) => s.texto) ?? [])].join(' ').trim();
const palabras = (t) => (t.trim() ? t.trim().split(/\s+/).length : 0);

// Minutos oficiales por papel (suma de las partes del examen).
const MINUTOS = {
  'c1/reading-use': [90, 90], 'c1/writing': [90, 90], 'c1/listening': [38, 45], 'c1/speaking': [14, 16],
  'pau/prueba': [75, 75],
};
const PALABRAS_WRITING = { c1: [220, 260] };

const problemasPorExamen = new Map(); // "c1 4" -> [{nivel, texto}]
const anota = (e, nivel, texto) => {
  const k = `${e.examen} ${e.examenNumero ?? '—'}`;
  if (!problemasPorExamen.has(k)) problemasPorExamen.set(k, []);
  problemasPorExamen.get(k).push({ nivel, texto: `[${e.id}] ${texto}` });
};

// Índice de trozos de 6 palabras → ejercicios, para detectar frases repetidas entre ejercicios distintos.
const indice = new Map();
const trozosDe = new Map();
for (const e of BANCO) {
  const t = textoDe(e);
  if (palabras(t) < 60) continue;
  const s = trozos(t);
  trozosDe.set(e.id, s);
  for (const x of s) {
    if (!indice.has(x)) indice.set(x, new Set());
    indice.get(x).add(e.id);
  }
}

const fuentes = carpetaFuentes && existsSync(carpetaFuentes)
  ? readdirSync(carpetaFuentes).filter((f) => f.endsWith('.txt')).map((f) => readFileSync(join(carpetaFuentes, f), 'utf8'))
  : [];
const trozosFuentes = new Set();
for (const f of fuentes) for (const x of trozos(f)) trozosFuentes.add(x);

const ids = new Map();
const letras = new Map(); // examen número → conteo de letras correctas
for (const e of BANCO) {
  ids.set(e.id, (ids.get(e.id) ?? 0) + 1);
  for (const f of problemas(e)) anota(e, 'ERROR', f);
  if (e.examenNumero === undefined) anota(e, 'AVISO', 'sin examenNumero');
  // Reglas de la parte (sin la parte de solapamiento, que se hace abajo con todos a la vez).
  const r = REGLAS[`${e.examen}/${e.destreza}/${e.parte}`];
  if (!r) anota(e, 'AVISO', `sin regla para ${e.examen}/${e.destreza}/${e.parte}`);
  else for (const f of validarEjercicio(e, []).filter((x) => !x.startsWith('Repite frases'))) anota(e, 'AVISO', f);
  // Claves
  const nombres = new Set();
  for (const i of e.items) {
    if ((/placeholder|lorem ipsum/i.test(JSON.stringify(i)) || /\bTODO\b/.test(JSON.stringify(i)))) anota(e, 'ERROR', `pregunta ${i.n}: texto de relleno sin terminar`);
    if (i.explicacion && i.explicacion.trim().length < 15) anota(e, 'AVISO', `pregunta ${i.n}: explicación demasiado corta`);
    if (!i.explicacion && ['opciones', 'emparejar', 'palabra', 'transformacion', 'verdaderoFalso'].includes(i.tipo)) anota(e, 'AVISO', `pregunta ${i.n} sin explicación`);
    if (i.tipo === 'opciones') {
      const k = `${e.examen} ${e.examenNumero}`;
      const c = letras.get(k) ?? [0, 0, 0, 0];
      c[i.correcta] = (c[i.correcta] ?? 0) + 1;
      letras.set(k, c);
      const correcta = i.opciones[i.correcta]?.trim().toLowerCase();
      if (i.opciones.filter((o) => o.trim().toLowerCase() === correcta).length > 1) anota(e, 'ERROR', `pregunta ${i.n}: la correcta aparece repetida entre las opciones`);
      if (/\b(all of the above|none of the above)\b/i.test(i.opciones.join(' '))) anota(e, 'AVISO', `pregunta ${i.n}: opción «all/none of the above»`);
    }
    if (i.tipo === 'palabra' || i.tipo === 'transformacion') {
      if (i.correctas.some((c) => !c.trim())) anota(e, 'ERROR', `pregunta ${i.n}: respuesta vacía`);
      if (new Set(i.correctas.map((c) => c.trim().toLowerCase())).size !== i.correctas.length) anota(e, 'AVISO', `pregunta ${i.n}: respuestas repetidas`);
      if (e.destreza === 'reading-use' && e.parte === 2 && i.correctas.some((c) => c.trim().split(/\s+/).length > 1)) anota(e, 'ERROR', `pregunta ${i.n}: en el open cloze solo vale UNA palabra`);
    }
    if (i.tipo === 'redaccion' && PALABRAS_WRITING[e.examen] && e.destreza === 'writing') {
      const [a, b] = PALABRAS_WRITING[e.examen];
      if (i.minPalabras !== a || i.maxPalabras !== b) anota(e, 'AVISO', `redacción ${i.n}: pide ${i.minPalabras}–${i.maxPalabras} palabras y el examen real ${a}–${b}`);
      const m = palabras(i.modelo);
      if (m < a - 15 || m > b + 25) anota(e, 'AVISO', `redacción ${i.n}: el modelo tiene ${m} palabras (fuera de ${a}–${b})`);
      if (!i.criterios?.length) anota(e, 'AVISO', `redacción ${i.n}: sin criterios`);
    }
    if (i.tipo === 'hablar' && !(i.segundos > 0)) anota(e, 'ERROR', `speaking ${i.n}: sin segundos`);
  }
  // Audio
  if (e.destreza === 'listening') {
    if (!e.audio) anota(e, 'ERROR', 'listening sin audio');
    else {
      const ruta = join('public', e.audio.archivo);
      if (!existsSync(ruta)) anota(e, 'ERROR', `no existe ${e.audio.archivo}`);
      else if (statSync(ruta).size < 200_000) anota(e, 'ERROR', `${e.audio.archivo} pesa muy poco (${statSync(ruta).size} bytes)`);
      const habla = e.audio.guion.filter((l) => 'texto' in l);
      if (habla.length < 2) anota(e, 'ERROR', 'guion sin transcripción');
      if (e.examen === 'c1' && e.audio.veces !== 2) anota(e, 'AVISO', `se oye ${e.audio.veces} veces (en el examen real 2)`);
      for (const h of e.audio.hablantes) if (!/^en-[A-Z]{2}-\w+Neural$/.test(h.voz)) anota(e, 'ERROR', `voz rara: ${h.voz}`);
    }
  }
  // Solapamiento con otros ejercicios y con las fuentes
  const mios = trozosDe.get(e.id);
  if (mios) {
    const porOtro = new Map();
    let deFuentes = 0;
    for (const x of mios) {
      for (const otro of indice.get(x) ?? []) if (otro !== e.id) porOtro.set(otro, (porOtro.get(otro) ?? 0) + 1);
      if (trozosFuentes.has(x)) deFuentes++;
    }
    for (const [otro, n] of porOtro) if (n / mios.size > 0.1 && e.id < otro) anota(e, 'AVISO', `comparte ${Math.round((n / mios.size) * 100)} % de frases con ${otro}`);
    if (mios.size && deFuentes / mios.size > 0.03) anota(e, 'ERROR', `copia ${Math.round((deFuentes / mios.size) * 100)} % de frases de las fuentes de muestra`);
  }
}
for (const [id, n] of ids) if (n > 1) anota({ examen: '?', examenNumero: '?', id }, 'ERROR', `id repetido ${n} veces`);

// Tiempos y partes completas por examen y papel
const grupos = new Map();
for (const e of BANCO) {
  const k = `${e.examen} ${e.examenNumero ?? '—'}`;
  const g = grupos.get(k) ?? { examen: e.examen, numero: e.examenNumero, papeles: new Map() };
  const p = g.papeles.get(e.destreza) ?? { minutos: 0, partes: [], items: 0 };
  p.minutos += e.minutos ?? 0;
  p.partes.push(e.parte);
  p.items += e.items.length;
  g.papeles.set(e.destreza, p);
  grupos.set(k, g);
}
const PARTES_ESPERADAS = {
  'c1/reading-use': [1, 2, 3, 4, 5, 6, 7, 8], 'c1/writing': [1, 2], 'c1/listening': [1, 2, 3, 4], 'c1/speaking': [1, 2, 3, 4],
  'pau/prueba': [1, 4, 5, 6],
};
const lineas = [];
for (const [k, g] of [...grupos].sort((a, b) => a[0].localeCompare(b[0], 'es', { numeric: true }))) {
  if (g.numero === undefined) continue;
  for (const [destreza, esperadas] of Object.entries(PARTES_ESPERADAS)) {
    if (!destreza.startsWith(g.examen + '/')) continue;
    const d = destreza.split('/')[1];
    const p = g.papeles.get(d);
    if (!p) { anota({ examen: g.examen, examenNumero: g.numero, id: k }, 'ERROR', `falta el papel ${d}`); continue; }
    const tiene = [...new Set(p.partes)].sort((a, b) => a - b).join(',');
    if (tiene !== esperadas.join(',')) anota({ examen: g.examen, examenNumero: g.numero, id: k }, 'ERROR', `${d}: partes ${tiene} (esperadas ${esperadas.join(',')})`);
    const [lo, hi] = MINUTOS[destreza];
    if (p.minutos < lo || p.minutos > hi) anota({ examen: g.examen, examenNumero: g.numero, id: k }, 'AVISO', `${d}: suma ${p.minutos} min (oficial ${lo}–${hi})`);
  }
}
for (const [k, c] of [...letras].sort((a, b) => a[0].localeCompare(b[0], 'es', { numeric: true }))) {
  const total = c.reduce((s, x) => s + x, 0);
  const max = Math.max(...c);
  if (total >= 12 && max / total > 0.5) lineas.push(`  ${k}: reparto de letras correctas (A–D) ${c.join('/')}: demasiado cargado en una`);
}

let errores = 0;
let avisos = 0;
const out = [`AUDITORÍA DEL BANCO · ${new Date().toISOString().slice(0, 10)} · ${BANCO.length} ejercicios en ${grupos.size} exámenes`, ''];
for (const [k, lista] of [...problemasPorExamen].sort((a, b) => a[0].localeCompare(b[0], 'es', { numeric: true }))) {
  out.push(`== ${k}`);
  for (const p of lista) { out.push(`  ${p.nivel}: ${p.texto}`); p.nivel === 'ERROR' ? errores++ : avisos++; }
}
if (lineas.length) out.push('', '== Letras', ...lineas);
out.push('', `Errores: ${errores} · Avisos: ${avisos}`);
mkdirSync('docs/loop-mejora-total', { recursive: true });
writeFileSync('docs/loop-mejora-total/calidad-auditoria.txt', out.join('\n') + '\n');
console.log(out.join('\n'));
await vite.close();
