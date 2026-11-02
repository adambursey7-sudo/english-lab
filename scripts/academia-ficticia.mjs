// Recorre como lo haría una academia nueva («Academia Sol») la versión de producto: asistente de marca, examen,
// PDF con QR, licencia (con un par de claves TEMPORAL: no toca la clave privada real), un alumno que lo hace y la tabla
// de la clase. Saca capturas y un resumen en <carpeta-salida>.
// Uso: node scripts/academia-ficticia.mjs <carpeta-salida> [url]   (PLAYWRIGHT_CORE = carpeta de playwright-core)
// Hace falta `npm run dev:producto` en marcha (puerto 5273) o pasar otra url.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createRequire } from 'node:module';
import { deflateSync } from 'node:zlib';
import { base64url, emitirLicencia, CLAVE_PUBLICA } from '../src/motor/licencia.ts';

const salida = process.argv[2] ?? 'docs/loop-mejora-total/capturas/tramo4';
const url = process.argv[3] ?? 'http://127.0.0.1:5273/';
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_CORE);
mkdirSync(salida, { recursive: true });

const resultados = [];
const anota = (nombre, ok, detalle = '') => {
  resultados.push({ nombre, ok, detalle });
  console.log(`${ok ? '✔' : '✘'} ${nombre}${detalle ? ' — ' + detalle : ''}`);
};

// Un PNG de 64x64 naranja hecho a mano, como «logo» de la academia.
function pngNaranja() {
  const crc = (buf) => {
    let c, tabla = [];
    for (let n = 0; n < 256; n++) { c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; tabla[n] = c >>> 0; }
    let x = 0xffffffff;
    for (const b of buf) x = tabla[(x ^ b) & 255] ^ (x >>> 8);
    return (x ^ 0xffffffff) >>> 0;
  };
  const trozo = (tipo, datos) => {
    const t = Buffer.concat([Buffer.from(tipo), datos]);
    const l = Buffer.alloc(4); l.writeUInt32BE(datos.length);
    const c = Buffer.alloc(4); c.writeUInt32BE(crc(t));
    return Buffer.concat([l, t, c]);
  };
  const cab = Buffer.alloc(13); cab.writeUInt32BE(64, 0); cab.writeUInt32BE(64, 4); cab[8] = 8; cab[9] = 2;
  const fila = Buffer.concat([Buffer.from([0]), Buffer.from(Array.from({ length: 64 }, () => [230, 126, 34]).flat())]);
  const crudo = Buffer.concat(Array.from({ length: 64 }, () => fila));
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), trozo('IHDR', cab), trozo('IDAT', deflateSync(crudo)), trozo('IEND', Buffer.alloc(0))]);
}

// Par de claves temporal y licencia de la academia ficticia (solo vale en esta prueba).
const par = await crypto.subtle.generateKey('Ed25519', true, ['sign', 'verify']);
const publicaTemporal = base64url(new Uint8Array(await crypto.subtle.exportKey('raw', par.publicKey)));
const licencia = await emitirLicencia({ v: 1, academia: 'Academia Sol', hasta: null, plan: 'pro', emitida: new Date().toISOString().slice(0, 10) }, par.privateKey);
const caducada = await emitirLicencia({ v: 1, academia: 'Academia Sol', hasta: '2020-01-01', plan: 'pro', emitida: '2019-01-01' }, par.privateKey);

const navegador = await chromium.launch({ channel: 'chrome', headless: true });
const contexto = await navegador.newContext({ viewport: { width: 1100, height: 900 }, deviceScaleFactor: 1 });
await contexto.route('**/src/motor/licencia.ts*', async (ruta) => {
  const r = await ruta.fetch();
  await ruta.fulfill({ response: r, body: (await r.text()).replace(CLAVE_PUBLICA, publicaTemporal) });
});
const pagina = await contexto.newPage();
const errores = [];
pagina.on('pageerror', (e) => errores.push(e.message));
const foto = async (n, entera = false) => { await pagina.waitForTimeout(400); await pagina.screenshot({ path: join(salida, `${n}.png`), fullPage: entera }); };
const iraHash = async (h) => { await pagina.goto(url + h, { waitUntil: 'domcontentloaded' }); await pagina.waitForTimeout(500); };

// 1. Asistente de primera vez
await pagina.goto(url, { waitUntil: 'domcontentloaded' });
await pagina.waitForSelector('#asist-nombre');
await foto('01-asistente');
anota('Producto: sale el asistente de primera vez', true);
anota('Producto: sin nada de Kate en la pantalla', !/Kate|Eduardo|Gabriela/.test(await pagina.locator('body').innerText()));
await pagina.fill('#asist-nombre', 'Academia Sol');
await pagina.setInputFiles('#asist-logo', { name: 'logo.png', mimeType: 'image/png', buffer: pngNaranja() });
await pagina.waitForSelector('img[alt="Tu logo"]');
await pagina.getByRole('button', { name: 'Color #b4472b' }).click();
await foto('02-asistente-relleno');
await pagina.getByRole('button', { name: 'Empezar' }).click();
await pagina.waitForSelector('.cabecera');
await foto('03-inicio-academia');
const cab = await pagina.locator('.cabecera').first().innerText();
anota('La cabecera lleva el nombre de la academia', /academia sol/i.test(cab), cab.replace(/\s+/g, ' ').slice(0, 60));
anota('El logo de la academia está en la cabecera', (await pagina.locator('.cabecera img[src^="data:image/png"]').count()) > 0);
await pagina.reload({ waitUntil: 'domcontentloaded' });
await pagina.waitForSelector('.cabecera');
anota('La marca se recuerda al recargar', /academia sol/i.test(await pagina.locator('.cabecera').first().innerText()));

// 2. Demo: marca de agua y tope de guardados
await iraHash('#/crear');
await pagina.waitForSelector('.crear-vista');
anota('Sin licencia: marca de agua DEMO', (await pagina.locator('.marca-agua').count()) === 1);
await foto('04-crear-demo');
for (let i = 0; i < 4; i++) await pagina.getByRole('button', { name: 'Guardar en Mis exámenes' }).click();
const avisoTope = await pagina.locator('[role="status"]').filter({ hasText: /versión de prueba/i }).allInnerTexts();
anota('Sin licencia: tope de exámenes guardados', avisoTope.length > 0, avisoTope[0]?.slice(0, 80));

// 3. Licencia
await iraHash('#/licencia');
await pagina.fill('#clave-licencia', licencia.slice(0, -4) + 'AAAA');
await pagina.getByRole('button', { name: 'Activar' }).click();
anota('Licencia manipulada: se rechaza', /no es auténtica|no se entienden/.test(await pagina.locator('[role="status"]').last().innerText()));
await pagina.fill('#clave-licencia', caducada);
await pagina.getByRole('button', { name: 'Activar' }).click();
anota('Licencia caducada: avisa', /caducó/.test(await pagina.locator('[role="status"]').last().innerText()));
await pagina.fill('#clave-licencia', licencia);
await pagina.getByRole('button', { name: 'Activar' }).click();
await pagina.waitForTimeout(300);
anota('Licencia buena: se activa para la academia', /Licencia activada para Academia Sol/.test(await pagina.locator('[role="status"]').last().innerText()));
await foto('05-licencia');

// 4. Crear examen PAU que se corrige solo, enlace + QR, PDF
await iraHash('#/crear');
await pagina.waitForSelector('.crear-vista');
anota('Con licencia: sin marca de agua', (await pagina.locator('.marca-agua').count()) === 0);
await pagina.getByRole('button', { name: 'PAU Canarias' }).click();
await pagina.getByRole('button', { name: /Se corrige solo/ }).click();
await pagina.fill('input[aria-label="Grupo o clase"]', '2º Bachillerato A');
await foto('06-crear-pau');
await pagina.getByRole('button', { name: /Crear enlace y QR/ }).click();
await pagina.waitForSelector('img[alt="QR del examen para los alumnos"]');
const enlace = await pagina.locator('textarea[aria-label="Enlace del examen"]').inputValue();
anota('Enlace del examen creado', /#\/hacer\//.test(enlace), `${enlace.length} caracteres`);
anota('QR del examen dibujado', (await pagina.locator('img[alt="QR del examen para los alumnos"]').getAttribute('src'))?.startsWith('data:image/png'));
await foto('07-enlace-qr');

// PDF del cuadernillo (vista de impresión de la propia pantalla Crear)
await pagina.emulateMedia({ media: 'print' });
const pdf = await pagina.pdf({ format: 'A4', printBackground: true });
writeFileSync(join(salida, 'cuadernillo-academia-sol.pdf'), pdf);
anota('PDF del cuadernillo generado', pdf.length > 40_000, `${Math.round(pdf.length / 1024)} KB`);
const textoImpreso = await pagina.locator('.crear-vista').innerText();
anota('PDF: lleva el nombre de la academia y no dice DEMO', /Academia Sol/.test(await pagina.locator('style').allInnerTexts().then((t) => t.join(' '))) && !/DEMO/.test(textoImpreso));
await pagina.emulateMedia({ media: 'screen' });

// 5. El alumno lo hace en el móvil con ese enlace
const movil = await contexto.newPage({ viewport: { width: 390, height: 844 } });
movil.on('pageerror', (e) => errores.push('alumno: ' + e.message));
await movil.goto(enlace.replace(/^https?:\/\/[^#]*/, url.replace(/\/$/, '') + '/'), { waitUntil: 'domcontentloaded' });
await movil.waitForSelector('#alumno');
await movil.screenshot({ path: join(salida, '08-alumno-entrada.png') });
anota('El alumno ve el nombre de la academia', /academia sol/i.test(await movil.locator('main').innerText()));
await movil.fill('#alumno', 'Lucía Pérez');
await movil.getByRole('button', { name: 'Empezar' }).click();
for (let i = 0; i < 12; i++) {
  await movil.waitForSelector('.item, .tu-texto, textarea, .pie .btn', { timeout: 8000 }).catch(() => {});
  const primero = movil.locator('.item').first();
  if (await primero.count()) {
    if (await primero.locator('.opcion').count()) await primero.locator('.opcion').first().click().catch(() => {});
  }
  const boton = movil.locator('.pie .btn').first();
  if (!(await boton.count())) break;
  const t = await boton.innerText();
  await boton.click();
  if (/Corregir|Terminar/.test(t)) break;
}
await movil.waitForSelector('textarea[aria-label="Código de tu resultado"]', { timeout: 10000 });
await movil.screenshot({ path: join(salida, '09-alumno-resultado.png'), fullPage: true });
const codigo = await movil.locator('textarea[aria-label="Código de tu resultado"]').inputValue();
anota('El alumno obtiene su código de resultado', codigo.startsWith('ELABR1.'), `${codigo.length} caracteres`);
anota('Resultado con QR para el profe', (await movil.locator('img[alt="QR con tu resultado"]').count()) === 1);
await movil.close();

// 6. La academia pega el resultado en «Mi clase»
await iraHash('#/aula');
await pagina.fill('#pegar', codigo + '\nbasura que no es un resultado');
await pagina.getByRole('button', { name: 'Añadir a la tabla' }).click();
await pagina.waitForSelector('.tabla-aula');
const tabla = await pagina.locator('.tabla-aula').innerText();
anota('Mi clase: sale el alumno con su nota', /Lucía Pérez/.test(tabla), tabla.replace(/\s+/g, ' ').slice(0, 80));
anota('Mi clase: avisa de la línea que no entendió', /1 no se entendieron/.test(await pagina.locator('[role="status"]').last().innerText()));
await foto('10-mi-clase');

writeFileSync(join(salida, 'resultado.json'), JSON.stringify({ resultados, errores }, null, 1));
console.log('Errores de página:', errores.length ? errores : 'ninguno');
await navegador.close();
process.exit(resultados.every((r) => r.ok) && errores.length === 0 ? 0 : 1);
