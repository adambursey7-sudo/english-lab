// Prueba el servidor de entregas en local con datos de mentira (carpeta temporal, alumnos de prueba): PIN, bloqueo,
// tamaños, entradas mal formadas, subidas a la vez, nombres con ../ y que la clave de Adam no salga en los registros.
// Uso: node scripts/probar-servidor.mjs        (sale con código 1 si algo falla)
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdtempSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const PUERTO = 4190 + Math.floor(Math.random() * 500);
const base = `http://127.0.0.1:${PUERTO}`;
const dir = mkdtempSync(join(tmpdir(), 'elab-servidor-'));
const huella = (id, pin) => createHash('sha256').update(`english-lab:${id}:${pin}`).digest('hex');
const perfiles = join(dir, 'perfiles.ts');
writeFileSync(perfiles, `export const PERFILES = [\n  { id: 'ana', nombre: 'Ana', examen: 'c1', pin: '${huella('ana', '1234')}' },\n  { id: 'luis', nombre: 'Luis', examen: 'pau', pin: '${huella('luis', '4321')}' },\n];\n`);
const datos = join(dir, 'datos');

const proc = spawn(process.execPath, ['servidor/servidor.mjs'], { env: { ...process.env, PUERTO: String(PUERTO), ENTREGAS_DIR: datos, PERFILES_TS: perfiles }, stdio: ['ignore', 'pipe', 'pipe'] });
let registro = '';
proc.stdout.on('data', (d) => (registro += d));
proc.stderr.on('data', (d) => (registro += d));
await new Promise((ok, mal) => { const t = setInterval(async () => { try { if ((await fetch(`${base}/api/ping`)).ok) { clearInterval(t); ok(); } } catch {} }, 150); setTimeout(() => mal(new Error('no arranca')), 8000); });
const CLAVE = readFileSync(join(datos, 'clave-adam.txt'), 'utf8').trim();

let fallos = 0;
const prueba = (nombre, ok, detalle = '') => { if (!ok) fallos++; console.log(`${ok ? '✔' : '✘'} ${nombre}${detalle ? ' — ' + detalle : ''}`); };
const alumno = (id = 'ana', pin = '1234', extra = {}) => ({ 'X-Alumno': id, 'X-Pin': pin, ...extra });
const json = (h = alumno()) => ({ ...h, 'Content-Type': 'application/json' });
// Si el servidor corta la conexión (p. ej. al rechazar un cuerpo enorme) se cuenta como estado 0 en vez de romper la prueba.
const post = (ruta, cuerpo, cabeceras) => fetch(base + ruta, { method: 'POST', headers: cabeceras, body: cuerpo }).catch((e) => ({ status: 0, json: async () => ({}), error: e }));
const entrega = (texto = 'Hello world', extra = {}) => JSON.stringify({ ejercicio: 'c1-writing-1', n: 1, numero: 4, parte: 1, titulo: 'Essay', texto, ...extra });
const adam = (c = CLAVE) => ({ Authorization: `Bearer ${c}` });
const audioFalso = (n = 5000) => Buffer.alloc(n, 7);

// --- PIN ---
prueba('Entrega con PIN bueno: 201', (await post('/api/entrega', entrega(), json())).status === 201);
prueba('Sin cabeceras: 401', (await post('/api/entrega', entrega(), { 'Content-Type': 'application/json' })).status === 401);
prueba('Alumno que no existe: 401', (await post('/api/entrega', entrega(), json(alumno('pepe')))).status === 401);
prueba('PIN de otro alumno: 401', (await post('/api/entrega', entrega(), json(alumno('ana', '4321')))).status === 401);
prueba('PIN con letras o largo: 401', (await post('/api/entrega', entrega(), json(alumno('ana', '12a4')))).status === 401 && (await post('/api/entrega', entrega(), json(alumno('ana', '123456')))).status === 401);
prueba('Cada alumno recibe solo sus notas', (await (await fetch(`${base}/api/notas`, { headers: alumno('luis', '4321') })).json()).ana === undefined);

// --- Bloqueo por fallos (con luis) ---
const codigos = [];
for (let i = 0; i < 6; i++) codigos.push((await post('/api/entrega', entrega(), json(alumno('luis', '0000')))).status);
prueba('5 PIN malos y luego bloqueo 429', codigos.slice(0, 5).every((c) => c === 401) && codigos[5] === 429, codigos.join(','));
prueba('Bloqueado aunque ponga el PIN bueno: 429', (await post('/api/entrega', entrega(), json(alumno('luis', '4321')))).status === 429);
prueba('Ana no se ve afectada por el bloqueo de Luis', (await post('/api/entrega', entrega(), json())).status === 201);

// --- Tamaños y formato ---
prueba('JSON de 300 KB: 413', (await post('/api/entrega', entrega('x'.repeat(300_000)), json())).status === 413);
prueba('Texto largo (50 000) se recorta a 20 000', await (async () => {
  const r = await post('/api/entrega', entrega('palabra '.repeat(8000)), json());
  const id = (await r.json()).id;
  const g = JSON.parse(readFileSync(join(datos, 'entregas', 'ana', `${id}.json`), 'utf8'));
  return r.status === 201 && g.texto.length <= 20_000;
})());
prueba('Audio de 26 MB: 413', (await post('/api/audio?ejercicio=x', audioFalso(26_000_000), alumno('ana', '1234', { 'Content-Type': 'audio/webm' }))).status === 413);
prueba('Audio de 20 bytes: 400', (await post('/api/audio?ejercicio=x', audioFalso(20), alumno('ana', '1234', { 'Content-Type': 'audio/webm' }))).status === 400);
prueba('Audio con tipo raro (text/html): 415', (await post('/api/audio?ejercicio=x', audioFalso(), alumno('ana', '1234', { 'Content-Type': 'text/html' }))).status === 415);
prueba('Audio bueno: 201', (await post('/api/audio?ejercicio=c1-speaking-1&n=1', audioFalso(), alumno('ana', '1234', { 'Content-Type': 'audio/webm;codecs=opus' }))).status === 201);

// --- Mal formadas ---
const malas = [['no es JSON', '{nope'], ['null', 'null'], ['un número', '5'], ['una lista', '[1,2]'], ['texto vacío', entrega('   ')], ['texto es objeto', JSON.stringify({ texto: { a: 1 } })], ['vacío', '']];
for (const [nombre, c] of malas) {
  const r = await post('/api/entrega', c, json());
  prueba(`Entrada mal formada (${nombre}): 400 y no 500`, r.status === 400, String(r.status));
}
prueba('Ruta que no existe: 404', (await fetch(`${base}/api/nada`)).status === 404);
prueba('Método raro en /api/entrega: 404', (await fetch(`${base}/api/entrega`, { method: 'DELETE' })).status === 404);

// --- Nombres maliciosos ---
const antes = (a) => (existsSync(join(datos, 'entregas', a)) ? readdirSync(join(datos, 'entregas', a)).length : 0);
const fuera = () => readdirSync(datos).filter((f) => f !== 'entregas' && f !== 'clave-adam.txt' && f !== 'perfiles.ts' && f !== 'notas.json');
prueba('ejercicio y título con ../ no escapan de la carpeta', await (async () => {
  const r = await post('/api/entrega', entrega('hola', { ejercicio: '../../../etc/passwd', titulo: '..\\..\\boom/../x' }), json());
  const id = (await r.json()).id;
  const g = JSON.parse(readFileSync(join(datos, 'entregas', 'ana', `${id}.json`), 'utf8'));
  return r.status === 201 && !/[./\\]/.test(g.ejercicio) && fuera().length === 0;
})(), '');
prueba('Alumno con ../ en la cabecera: 401', (await post('/api/entrega', entrega(), json(alumno('../ana', '1234')))).status === 401);
prueba('Audio con ../ en la consulta no escapa', await (async () => {
  const r = await post('/api/audio?ejercicio=../../x&titulo=../../../y', audioFalso(), alumno('ana', '1234', { 'Content-Type': 'audio/mp4' }));
  return r.status === 201 && fuera().length === 0;
})());
prueba('Descargar audio con ../ en la ruta: 404', (await fetch(`${base}/api/admin/audio/..%2F..%2Fana/x.webm`, { headers: adam() })).status === 404 && (await fetch(`${base}/api/admin/audio/ana/..%2F..%2Fclave-adam.txt`, { headers: adam() })).status === 404);

// --- Dos a la vez ---
const [a, b] = await Promise.all([post('/api/entrega', entrega('uno'), json()), post('/api/entrega', entrega('dos'), json())]);
const ia = (await a.json()).id;
const ib = (await b.json()).id;
prueba('Dos subidas a la vez: las dos entran con id distinto', a.status === 201 && b.status === 201 && ia !== ib);
const veinte = await Promise.all(Array.from({ length: 20 }, (_, i) => post('/api/entrega', entrega(`t${i}`), json())));
const ids = new Set();
for (const r of veinte) if (r.status === 201) ids.add((await r.json()).id);
prueba('20 subidas a la vez (hasta el límite por hora): sin pérdidas ni ids repetidos', ids.size === veinte.filter((r) => r.status === 201).length && ids.size >= 10, `${ids.size} entraron`);

// --- Panel de Adam ---
prueba('Panel sin clave: 401', (await fetch(`${base}/api/admin/entregas`)).status === 401);
prueba('Panel con clave buena: 200 y lista las entregas', await (async () => { const r = await fetch(`${base}/api/admin/entregas`, { headers: adam() }); return r.status === 200 && (await r.json()).length > 5; })());
const lista = await (await fetch(`${base}/api/admin/entregas`, { headers: adam() })).json();
const una = lista.find((e) => e.tipo === 'texto');
const notaMala = async (c) => (await post('/api/admin/nota', c, { ...adam(), 'Content-Type': 'application/json' })).status;
prueba('Nota con JSON roto: 400 y no 500', (await notaMala('{x')) === 400);
prueba('Nota con null: 400', (await notaMala('null')) === 400);
prueba('Nota fuera de rango: 400', (await notaMala(JSON.stringify({ alumno: 'ana', id: una.id, nota: 11 }))) === 400);
prueba('Nota con id raro: 400', (await notaMala(JSON.stringify({ alumno: 'ana', id: '../../notas', nota: 5 }))) === 400);
prueba('Nota buena: 200', (await notaMala(JSON.stringify({ alumno: 'ana', id: una.id, nota: 8, sobre: 10, comentario: 'Good <b>job</b>' }))) === 200);
const notas = await (await fetch(`${base}/api/notas`, { headers: alumno() })).json();
prueba('La nota llega al alumno', notas.ana?.length === 1 && notas.ana[0].nota === 8);
const dosNotas = await Promise.all([1, 2, 3, 4, 5].map((n) => post('/api/admin/nota', JSON.stringify({ alumno: 'ana', id: una.id, nota: n }), { ...adam(), 'Content-Type': 'application/json' })));
const notas2 = await (await fetch(`${base}/api/notas`, { headers: alumno() })).json();
prueba('Cinco notas a la vez: no se pierde ninguna', dosNotas.every((r) => r.status === 200) && notas2.ana.length === 6, `${notas2.ana.length}`);
const gc = [];
for (let i = 0; i < 10; i++) gc.push((await fetch(`${base}/api/admin/entregas`, { headers: adam('mala') })).status);
// (el «Panel sin clave» de arriba ya contó como el primer fallo)
prueba('Clave mala: siempre 401 (no hay bloqueo que se pueda provocar desde fuera)', gc.every((c) => c === 401), gc.join(','));
prueba('Tras muchas claves malas, la buena de Adam sigue entrando', (await fetch(`${base}/api/admin/entregas`, { headers: adam() })).status === 200);

// --- Clave en registros ---
prueba('La clave de Adam no sale en los registros del servidor', !registro.includes(CLAVE), registro.includes('Error') ? 'hay errores en el registro' : '');
prueba('El registro no tiene errores internos (500)', !/TypeError|SyntaxError|at .*\.mjs/.test(registro), registro.split('\n').find((l) => /Error/.test(l)) ?? '');

// --- Cabeceras ---
const ping = await fetch(`${base}/api/ping`, { headers: { Origin: 'https://malo.example' } });
prueba('Origen desconocido: sin CORS', ping.headers.get('access-control-allow-origin') === null);
const ok = await fetch(`${base}/api/ping`, { headers: { Origin: 'https://adambursey7-sudo.github.io' } });
prueba('GitHub Pages sí tiene CORS', ok.headers.get('access-control-allow-origin') === 'https://adambursey7-sudo.github.io');
const pag = await fetch(`${base}/corregir`);
prueba('La página de corregir lleva Content-Security-Policy', (pag.headers.get('content-security-policy') ?? '').includes("default-src 'self'"));

proc.kill();
if (process.env.VER_REGISTRO) console.log('--- registro ---\n' + registro);
console.log(fallos === 0 ? '\nTodo bien.' : `\n${fallos} prueba(s) con fallo.`);
process.exit(fallos === 0 ? 0 : 1);
