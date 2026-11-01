// Licencias de la app: crear el par de claves (una sola vez), emitir una clave para una academia y comprobarla.
//   node scripts/licencia.mjs init                       crea el par en la carpeta de claves y enseña la pública
//   node scripts/licencia.mjs emitir "Academia Sol" [--hasta 2027-11-30]
//   node scripts/licencia.mjs verificar <clave>
// La clave PRIVADA se guarda FUERA del repositorio (LICENCIAS_DIR o C:\dev\english-lab-licencias). Quien la tenga puede
// emitir licencias: hacer copia de seguridad en un sitio seguro y no compartirla nunca. Si se pierde, hay que estrenar
// par de claves y cambiar CLAVE_PUBLICA en src/motor/licencia.ts (las licencias antiguas dejarían de valer).
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { emitirLicencia, base64url, verificarLicencia, CLAVE_PUBLICA } from '../src/motor/licencia.ts';

const carpeta = process.env.LICENCIAS_DIR ?? 'C:/dev/english-lab-licencias';
const archivoPrivada = join(carpeta, 'privada.pkcs8.b64');
const [orden, ...resto] = process.argv.slice(2);

async function privada() {
  if (!existsSync(archivoPrivada)) throw new Error(`No hay clave privada en ${archivoPrivada}. Ejecuta primero: node scripts/licencia.mjs init`);
  const pkcs8 = Buffer.from(readFileSync(archivoPrivada, 'utf8').trim(), 'base64');
  return crypto.subtle.importKey('pkcs8', pkcs8, 'Ed25519', false, ['sign']);
}

if (orden === 'init') {
  if (existsSync(archivoPrivada)) {
    console.error(`Ya existe un par de claves en ${carpeta}. No se sobrescribe (las licencias ya emitidas dejarían de valer).`);
    process.exit(1);
  }
  const par = await crypto.subtle.generateKey('Ed25519', true, ['sign', 'verify']);
  mkdirSync(carpeta, { recursive: true });
  writeFileSync(archivoPrivada, Buffer.from(await crypto.subtle.exportKey('pkcs8', par.privateKey)).toString('base64'));
  const publica = base64url(new Uint8Array(await crypto.subtle.exportKey('raw', par.publicKey)));
  console.log(`Clave privada guardada en ${archivoPrivada} (haz copia de seguridad; no la compartas).`);
  console.log(`Clave pública (pégala en CLAVE_PUBLICA de src/motor/licencia.ts):\n${publica}`);
} else if (orden === 'emitir') {
  const academia = resto.find((a, i) => !a.startsWith('--') && resto[i - 1] !== '--hasta');
  const i = resto.indexOf('--hasta');
  const hasta = i >= 0 ? resto[i + 1] : null;
  if (!academia) throw new Error('Falta el nombre de la academia: node scripts/licencia.mjs emitir "Academia Sol" [--hasta 2027-11-30]');
  if (hasta !== null && !/^\d{4}-\d{2}-\d{2}$/.test(hasta)) throw new Error('La fecha va como AAAA-MM-DD.');
  const clave = await emitirLicencia({ v: 1, academia, hasta, plan: 'pro', emitida: new Date().toISOString().slice(0, 10) }, await privada());
  const e = await verificarLicencia(clave);
  if (e.tipo !== 'pro') throw new Error(`La clave emitida no se verifica con la pública del código (${e.tipo}). ¿Está CLAVE_PUBLICA al día?`);
  console.log(`Licencia para «${academia}»${hasta ? ` hasta ${hasta}` : ' (sin caducidad)'}:\n\n${clave}\n`);
} else if (orden === 'verificar') {
  const e = await verificarLicencia(resto[0] ?? '');
  console.log(e.tipo === 'invalida' ? `Inválida: ${e.motivo}` : `${e.tipo}: ${e.datos.academia}${e.datos.hasta ? `, hasta ${e.datos.hasta}` : ', sin caducidad'}`);
  if (CLAVE_PUBLICA === 'CAMBIAR_POR_LA_PUBLICA') console.log('Aviso: CLAVE_PUBLICA aún no está configurada.');
} else {
  console.error('Uso: node scripts/licencia.mjs init | emitir "Academia" [--hasta AAAA-MM-DD] | verificar <clave>');
  process.exit(1);
}
