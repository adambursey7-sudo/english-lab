// Servidor de entregas de English Lab (en el PC de Adam, sin dependencias): recibe los writings y las grabaciones de
// speaking que los alumnos mandan desde el móvil, y deja a Adam corregirlas en una página (/corregir) y ponerles nota.
// Los datos viven FUERA del repo (por defecto C:\dev\english-lab-entregas): son datos de alumnos.
//
// Uso:  node servidor/servidor.mjs            (puerto 4180)     o     servidor\arrancar.ps1
// Abrir al exterior: tailscale funnel --bg --https=10000 4180   (el 443 es de Jarvis y el 8443 de la vista previa).
// Seguridad: cada alumno se identifica con su PIN (la misma huella que la app), 5 fallos seguidos bloquean a ese alumno
// 15 minutos; la página de Adam pide una clave larga (clave-adam.txt, creada al primer arranque); tamaños limitados.
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync, createReadStream, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const PUERTO = Number(process.env.PUERTO ?? 4180);
const RAIZ = resolve(process.env.ENTREGAS_DIR ?? 'C:\\dev\\english-lab-entregas');
const MAX_JSON = 200_000;
const MAX_AUDIO = 25_000_000;
const ORIGENES = new Set([
  'https://adambursey7-sudo.github.io',
  'https://msi.tail0b94b8.ts.net:8443',
  'http://localhost:4173', 'http://localhost:5173', 'http://127.0.0.1:4173', 'http://127.0.0.1:5173',
]);
for (const o of (process.env.ORIGENES_EXTRA ?? '').split(',').filter(Boolean)) ORIGENES.add(o);

mkdirSync(join(RAIZ, 'entregas'), { recursive: true });
const archivoClave = join(RAIZ, 'clave-adam.txt');
if (!existsSync(archivoClave)) writeFileSync(archivoClave, randomBytes(24).toString('hex') + '\n');
const CLAVE_ADAM = readFileSync(archivoClave, 'utf8').trim();

/** Alumnos y huellas de PIN, leídos de la propia app para no repetirlos (src/motor/perfiles.ts). */
function leerPerfiles() {
  const fuente = readFileSync(process.env.PERFILES_TS ?? join(AQUI, '..', 'src', 'motor', 'perfiles.ts'), 'utf8');
  const perfiles = new Map();
  for (const m of fuente.matchAll(/\{\s*id:\s*'([a-z0-9-]+)'[^}]*?pin:\s*'([0-9a-f]{64})'/g)) perfiles.set(m[1], m[2]);
  return perfiles;
}
const PERFILES = leerPerfiles();

const igual = (a, b) => {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
};
const huella = (id, pin) => createHash('sha256').update(`english-lab:${id}:${pin}`).digest('hex');

// Bloqueo por fallos: id del alumno (o «adam-panel») → { veces, hasta }
const fallos = new Map();
function bloqueado(clave) {
  const f = fallos.get(clave);
  return f && f.hasta > Date.now();
}
function apuntaFallo(clave, tope) {
  const f = fallos.get(clave) ?? { veces: 0, hasta: 0 };
  f.veces += 1;
  if (f.veces >= tope) { f.hasta = Date.now() + 15 * 60_000; f.veces = 0; }
  fallos.set(clave, f);
}
// Límite de envíos por alumno: 60 por hora.
const envios = new Map();
function demasiados(id) {
  const ahora = Date.now();
  const lista = (envios.get(id) ?? []).filter((t) => ahora - t < 3_600_000);
  if (lista.length >= 60) return true;
  lista.push(ahora);
  envios.set(id, lista);
  return false;
}

class Fallo extends Error {
  constructor(estado, mensaje) { super(mensaje); this.estado = estado; }
}

function alumnoDe(req) {
  const id = String(req.headers['x-alumno'] ?? '').toLowerCase();
  const pin = String(req.headers['x-pin'] ?? '');
  if (!PERFILES.has(id) || !/^\d{4}$/.test(pin)) throw new Fallo(401, 'Alumno o PIN no válidos.');
  if (bloqueado(id)) throw new Fallo(429, 'Demasiados intentos: espera unos minutos.');
  if (!igual(huella(id, pin), PERFILES.get(id))) { apuntaFallo(id, 5); throw new Fallo(401, 'Alumno o PIN no válidos.'); }
  fallos.delete(id);
  return id;
}

function adamAutorizado(req) {
  if (bloqueado('adam-panel')) throw new Fallo(429, 'Demasiados intentos.');
  const t = String(req.headers.authorization ?? '').replace(/^Bearer /, '');
  if (!igual(t, CLAVE_ADAM)) { apuntaFallo('adam-panel', 10); throw new Fallo(401, 'Clave no válida.'); }
}

async function cuerpo(req, max) {
  const trozos = [];
  let total = 0;
  for await (const t of req) {
    total += t.length;
    if (total > max) throw new Fallo(413, 'Archivo demasiado grande.');
    trozos.push(t);
  }
  return Buffer.concat(trozos);
}

const limpio = (t, max = 120) => String(t ?? '').replace(/[^\p{L}\p{N} _.,:;()·/'’+-]/gu, '').slice(0, max);
const carpetaDe = (alumno) => { const c = join(RAIZ, 'entregas', alumno); mkdirSync(c, { recursive: true }); return c; };
const nuevoId = () => `${new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)}-${randomBytes(3).toString('hex')}`;

function listarEntregas(alumno) {
  const base = join(RAIZ, 'entregas');
  const alumnos = alumno ? [alumno] : existsSync(base) ? readdirSync(base) : [];
  const todas = [];
  for (const a of alumnos) {
    const c = join(base, a);
    if (!existsSync(c)) continue;
    for (const f of readdirSync(c).filter((x) => x.endsWith('.json'))) {
      try { todas.push(JSON.parse(readFileSync(join(c, f), 'utf8'))); } catch { /* archivo a medias: se ignora */ }
    }
  }
  return todas.sort((x, y) => y.fecha.localeCompare(x.fecha));
}

const archivoNotas = join(RAIZ, 'notas.json');
const leerNotas = () => (existsSync(archivoNotas) ? JSON.parse(readFileSync(archivoNotas, 'utf8')) : {});

function responder(res, estado, datos, extra = {}) {
  const texto = typeof datos === 'string' ? datos : JSON.stringify(datos);
  res.writeHead(estado, { 'Content-Type': typeof datos === 'string' ? 'text/html; charset=utf-8' : 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...extra });
  res.end(texto);
}

const servidor = createServer(async (req, res) => {
  const origen = String(req.headers.origin ?? '');
  const cors = ORIGENES.has(origen)
    ? { 'Access-Control-Allow-Origin': origen, Vary: 'Origin', 'Access-Control-Allow-Headers': 'Content-Type, X-Alumno, X-Pin, Authorization', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS' }
    : {};
  try {
    const url = new URL(req.url ?? '/', 'http://x');
    if (req.method === 'OPTIONS') { res.writeHead(204, cors); return res.end(); }

    if (req.method === 'GET' && url.pathname === '/api/ping') return responder(res, 200, { ok: true }, cors);

    // ---- alumnos ----
    if (req.method === 'POST' && url.pathname === '/api/entrega') {
      const alumno = alumnoDe(req);
      if (demasiados(alumno)) throw new Fallo(429, 'Demasiados envíos seguidos.');
      let datos;
      try { datos = JSON.parse((await cuerpo(req, MAX_JSON)).toString('utf8')); } catch (e) { throw e instanceof Fallo ? e : new Fallo(400, 'Envío mal formado.'); }
      const texto = String(datos.texto ?? '').slice(0, 20_000);
      if (!texto.trim()) throw new Fallo(400, 'No hay texto.');
      const meta = { id: nuevoId(), alumno, fecha: new Date().toISOString(), tipo: 'texto', ejercicio: limpio(datos.ejercicio), n: Number(datos.n) || 0, numero: Number(datos.numero) || 0, parte: Number(datos.parte) || 0, titulo: limpio(datos.titulo, 200), texto };
      writeFileSync(join(carpetaDe(alumno), `${meta.id}.json`), JSON.stringify(meta, null, 1));
      return responder(res, 201, { ok: true, id: meta.id }, cors);
    }
    if (req.method === 'POST' && url.pathname === '/api/audio') {
      const alumno = alumnoDe(req);
      if (demasiados(alumno)) throw new Fallo(429, 'Demasiados envíos seguidos.');
      const tipo = String(req.headers['content-type'] ?? '');
      const ext = /mp4|m4a|aac/.test(tipo) ? 'm4a' : /webm/.test(tipo) ? 'webm' : /ogg/.test(tipo) ? 'ogg' : /mpeg|mp3/.test(tipo) ? 'mp3' : '';
      if (!ext) throw new Fallo(415, 'Formato de audio no admitido.');
      const datos = await cuerpo(req, MAX_AUDIO);
      if (datos.length < 1000) throw new Fallo(400, 'La grabación está vacía.');
      const id = nuevoId();
      const c = carpetaDe(alumno);
      writeFileSync(join(c, `${id}.${ext}`), datos);
      const meta = { id, alumno, fecha: new Date().toISOString(), tipo: 'audio', ejercicio: limpio(url.searchParams.get('ejercicio')), n: Number(url.searchParams.get('n')) || 0, numero: Number(url.searchParams.get('numero')) || 0, parte: Number(url.searchParams.get('parte')) || 0, titulo: limpio(url.searchParams.get('titulo'), 200), audio: `${id}.${ext}` };
      writeFileSync(join(c, `${id}.json`), JSON.stringify(meta, null, 1));
      return responder(res, 201, { ok: true, id }, cors);
    }
    if (req.method === 'GET' && url.pathname === '/api/notas') {
      const alumno = alumnoDe(req);
      return responder(res, 200, { [alumno]: leerNotas()[alumno] ?? [] }, cors);
    }

    // ---- Adam ----
    if (url.pathname === '/corregir' && req.method === 'GET') return responder(res, 200, readFileSync(join(AQUI, 'corregir.html'), 'utf8'), { 'Content-Security-Policy': "default-src 'self' blob:; style-src 'unsafe-inline'; script-src 'unsafe-inline'; media-src blob:; connect-src 'self'" });
    if (url.pathname.startsWith('/api/admin/')) {
      adamAutorizado(req);
      if (req.method === 'GET' && url.pathname === '/api/admin/entregas') return responder(res, 200, listarEntregas(), cors);
      const m = /^\/api\/admin\/audio\/([a-z0-9-]+)\/([0-9T-]+-[0-9a-f]{6}\.(?:m4a|webm|ogg|mp3))$/.exec(url.pathname);
      if (req.method === 'GET' && m) {
        const ruta = join(RAIZ, 'entregas', m[1], m[2]);
        if (!existsSync(ruta)) throw new Fallo(404, 'No existe.');
        res.writeHead(200, { 'Content-Type': m[2].endsWith('m4a') ? 'audio/mp4' : m[2].endsWith('mp3') ? 'audio/mpeg' : m[2].endsWith('ogg') ? 'audio/ogg' : 'audio/webm', 'Content-Length': statSync(ruta).size, ...cors });
        return createReadStream(ruta).pipe(res);
      }
      if (req.method === 'POST' && url.pathname === '/api/admin/nota') {
        const d = JSON.parse((await cuerpo(req, MAX_JSON)).toString('utf8'));
        const alumno = String(d.alumno ?? '');
        const id = String(d.id ?? '');
        if (!PERFILES.has(alumno) || !/^[0-9T-]+-[0-9a-f]{6}$/.test(id)) throw new Fallo(400, 'Entrega no válida.');
        const ruta = join(RAIZ, 'entregas', alumno, `${id}.json`);
        if (!existsSync(ruta)) throw new Fallo(404, 'No existe.');
        const nota = Number(d.nota);
        const sobre = Number(d.sobre) || 10;
        if (!Number.isFinite(nota) || nota < 0 || nota > sobre) throw new Fallo(400, 'Nota no válida.');
        const meta = JSON.parse(readFileSync(ruta, 'utf8'));
        const examen = meta.ejercicio.startsWith('pau') ? 'pau' : 'c1';
        const destreza = examen === 'pau' ? 'prueba' : meta.tipo === 'audio' ? 'speaking' : 'writing';
        const registro = { fecha: new Date().toISOString().slice(0, 10), examen, destreza, nota, sobre, ...(meta.numero ? { numero: meta.numero } : {}), ...(meta.parte ? { parte: meta.parte } : {}), ...(d.comentario ? { comentario: limpio(d.comentario, 1000) } : {}) };
        const notas = leerNotas();
        notas[alumno] = [...(notas[alumno] ?? []), registro];
        writeFileSync(archivoNotas, JSON.stringify(notas, null, 1));
        meta.corregida = registro;
        writeFileSync(ruta, JSON.stringify(meta, null, 1));
        return responder(res, 200, { ok: true }, cors);
      }
    }
    throw new Fallo(404, 'No encontrado.');
  } catch (e) {
    const estado = e instanceof Fallo ? e.estado : 500;
    if (!(e instanceof Fallo)) console.error(e);
    responder(res, estado, { error: e instanceof Fallo ? e.message : 'Error del servidor.' }, cors);
  }
});

servidor.requestTimeout = 120_000;
servidor.listen(PUERTO, '127.0.0.1', () => {
  console.log(`English Lab · entregas en http://127.0.0.1:${PUERTO}/corregir   (datos en ${RAIZ}, ${PERFILES.size} alumnos)`);
  console.log(`Clave de Adam: ${archivoClave}`);
});
