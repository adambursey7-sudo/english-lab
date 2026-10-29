// PIN de 4 cifras de cada alumno. En la app solo se guarda la huella (sha256), nunca el número.
//   node scripts/pin.mjs                  → PIN nuevo al azar para todos
//   node scripts/pin.mjs eduardo          → PIN nuevo al azar para uno
//   node scripts/pin.mjs eduardo 1234     → ese PIN para ese alumno
// Los números quedan en «PIN English Lab.txt» del Escritorio (fuera del repo, que es público).
// Para publicarlo: commit + push a master.
import { createHash, randomInt } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const ARCHIVO = new URL('../src/motor/perfiles.ts', import.meta.url);
const [quien, pinDado] = process.argv.slice(2);
if (pinDado !== undefined && !/^\d{4}$/.test(pinDado)) {
  console.error('El PIN tiene que ser de 4 números.');
  process.exit(1);
}

let fuente = readFileSync(ARCHIVO, 'utf8');
const ids = [...fuente.matchAll(/\{ id: '([a-z0-9-]+)', nombre: '([^']+)'/g)].map((m) => ({ id: m[1], nombre: m[2] }));
const elegidos = quien ? ids.filter((p) => p.id === quien) : ids;
if (elegidos.length === 0) {
  console.error(`No hay ningún alumno «${quien}». Están: ${ids.map((p) => p.id).join(', ')}`);
  process.exit(1);
}

const escritorio = [join(homedir(), 'OneDrive', 'Escritorio'), join(homedir(), 'Desktop')].find(existsSync) ?? homedir();
const txt = join(escritorio, 'PIN English Lab.txt');
// Se conservan los PIN de los demás que ya estaban en el .txt.
const apuntados = new Map(existsSync(txt) ? [...readFileSync(txt, 'utf8').matchAll(/^(.+?): (\d{4})\r?$/gm)].map((m) => [m[1], m[2]]) : []);

for (const p of elegidos) {
  const pin = pinDado ?? String(randomInt(0, 10000)).padStart(4, '0');
  const huella = createHash('sha256').update(`english-lab:${p.id}:${pin}`).digest('hex');
  fuente = fuente.replace(new RegExp(`(\\{ id: '${p.id}',[^}]*?pin: ')[0-9a-f]*(')`), `$1${huella}$2`);
  apuntados.set(p.nombre, pin);
  console.log(`${p.nombre}: ${pin}`);
}
writeFileSync(ARCHIVO, fuente);

const lineas = ids.filter((p) => apuntados.has(p.nombre)).map((p) => `${p.nombre}: ${apuntados.get(p.nombre)}`);
writeFileSync(txt, `PIN de English Lab (cada alumno entra en su perfil con el suyo)\r\n\r\n${lineas.join('\r\n')}\r\n`);
console.log(`Apuntados en ${txt}`);
