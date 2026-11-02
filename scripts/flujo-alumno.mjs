// Recorre en un móvil de 390 px lo que hace un alumno (elegir examen, reloj, audio limitado, corregir, reanudar,
// micro denegado, enviar a Adam sin servidor, sin red) y saca capturas. Entra como Adam con un PIN de prueba que solo
// existe en esta página (se cambia la huella al vuelo; no se toca el código).
// Uso: node scripts/flujo-alumno.mjs <carpeta-salida> [url]     (PLAYWRIGHT_CORE = carpeta de playwright-core)
import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createRequire } from 'node:module';

const salida = process.argv[2] ?? 'docs/loop-mejora-total/capturas/tramo2';
const url = process.argv[3] ?? 'http://127.0.0.1:5290/';
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_CORE);
mkdirSync(salida, { recursive: true });

const huella = createHash('sha256').update('english-lab:adam:1234').digest('hex');
const resultados = [];
const anota = (nombre, ok, detalle = '') => {
  resultados.push({ nombre, ok, detalle });
  console.log(`${ok ? '✔' : '✘'} ${nombre}${detalle ? ' — ' + detalle : ''}`);
};

const navegador = await chromium.launch({ channel: 'chrome', headless: true, args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--autoplay-policy=no-user-gesture-required'] });
const contexto = await navegador.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, permissions: [] });
await contexto.addInitScript(() => {
  try { if (!localStorage.getItem('english-lab.sesion')) localStorage.setItem('english-lab.sesion', 'adam:1234'); } catch {}
});
await contexto.route('**/src/motor/perfiles.ts*', async (ruta) => {
  const r = await ruta.fetch();
  const t = (await r.text()).replace('97712cda8fec868a35dfca9d7edaef7948d9ecd430625ec69a59c71ea66b8859', huella);
  await ruta.fulfill({ response: r, body: t });
});
const pagina = await contexto.newPage();
const errores = [];
pagina.on('pageerror', (e) => errores.push(e.message));
const foto = async (n, entera = false) => { await pagina.waitForTimeout(300); await pagina.screenshot({ path: join(salida, `${n}.png`), fullPage: entera }); };
const sinDesbordeHorizontal = async (donde) => {
  const d = await pagina.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  anota(`Sin scroll horizontal (${donde})`, d <= 1, d > 1 ? `${d}px de más` : '');
};

async function abrir() {
  await pagina.goto(url, { waitUntil: 'domcontentloaded' });
  const saltar = pagina.getByRole('button', { name: /saltar/i });
  if (await saltar.count()) await saltar.first().click({ timeout: 3000 }).catch(() => {});
  await pagina.waitForSelector('.cabecera', { timeout: 15000 });
}

// 1. Inicio
await abrir();
await foto('01-inicio');
anota('Entra con PIN y se ve el inicio', (await pagina.locator('.cabecera .titulo').first().innerText()).includes('Hola'));
await sinDesbordeHorizontal('inicio');

// 2. Reading and Use of English parte 2 (huecos): reloj, contestar, cerrar y reanudar
await pagina.locator('.tarjeta').first().click();
await pagina.waitForSelector('.item');
await foto('02-ejercicio');
const reloj1 = await pagina.locator('.reloj').first().innerText();
await sinDesbordeHorizontal('ejercicio');
const primero = pagina.locator('.item').first();
if (await primero.locator('.opcion').count()) await primero.locator('.opcion').nth(1).click();
else await primero.locator('input').first().fill('prueba');
await pagina.waitForTimeout(2500);
const reloj2 = await pagina.locator('.reloj').first().innerText();
anota('El reloj corre', reloj1 !== reloj2, `${reloj1} → ${reloj2}`);
// «Cierra la app»: recarga la página y comprueba que ofrece seguir
await abrir();
const aviso = pagina.locator('[aria-label="Ejercicio a medias"]');
anota('Tras cerrar, ofrece seguir donde lo dejó', (await aviso.count()) === 1);
await foto('03-reanudar');
await aviso.getByRole('button', { name: 'Seguir' }).click();
await pagina.waitForSelector('.item');
const pulsada = await pagina.locator('.item').first().locator('.opcion[aria-pressed="true"], input').first().evaluate((el) => (el.tagName === 'INPUT' ? el.value : 'opcion')).catch(() => '');
anota('Recupera lo contestado', pulsada !== '' , String(pulsada));
const reloj3 = await pagina.locator('.reloj').first().innerText();
anota('El reloj no se reinicia al reanudar', reloj3 <= reloj2, `${reloj2} → ${reloj3}`);
await foto('04-reanudado');
// Descartar
await pagina.getByRole('button', { name: /salir del ejercicio/i }).click();
await pagina.getByRole('button', { name: /sí, salir/i }).click();
await pagina.waitForSelector('.cabecera');
anota('Salir sin corregir borra el borrador', (await pagina.locator('[aria-label="Ejercicio a medias"]').count()) === 0);

// 3. Listening: audio limitado
await pagina.getByRole('button', { name: /listening/i }).first().click().catch(() => {});
await foto('05-listening-inicio');
const tarjetaL = pagina.locator('.tarjeta').filter({ hasText: /listening|part 1|multiple/i }).first();
if (await tarjetaL.count()) await tarjetaL.click();
await pagina.waitForSelector('.reproductor', { timeout: 8000 }).catch(() => {});
await foto('06-listening');
const saltos = await pagina.getByRole('button', { name: /[−+]10 s/ }).count();
anota('Audio en modo examen: sin saltos de 10 s', saltos === 0);
await pagina.getByRole('button', { name: 'Practicar' }).click().catch(() => {});
anota('Modo práctica permite saltar', (await pagina.getByRole('button', { name: /[−+]10 s/ }).count()) === 2);
await pagina.getByRole('button', { name: 'Modo examen' }).click().catch(() => {});

// 4. Sin red con el audio
await contexto.setOffline(true);
await pagina.getByRole('button', { name: 'Practicar' }).click().catch(() => {});
await pagina.locator('.btn-play').click();
await pagina.waitForTimeout(800);
const avisoOffline = await pagina.locator('.reproductor [role="alert"]').allInnerTexts();
await foto('07-audio-sin-red');
anota('Sin red: el audio avisa en vez de quedarse mudo', avisoOffline.length > 0, avisoOffline.join(' | ').slice(0, 90));
await contexto.setOffline(false);

// 5. Writing: enviar a Adam con el servidor caído (cae a compartir/WhatsApp)
await pagina.route('**/*.ts.net:10000/**', (r) => r.abort());
await pagina.getByRole('button', { name: /salir del ejercicio/i }).click();
await pagina.getByRole('button', { name: /sí, salir/i }).click();
await pagina.waitForSelector('.cabecera');
await pagina.getByRole('button', { name: /writing/i }).first().click().catch(() => {});
await pagina.locator('.tarjeta').filter({ hasText: /essay|part 1/i }).first().click();
await pagina.waitForSelector('textarea');
await pagina.locator('textarea').first().fill('Nowadays, many people think that technology has changed the way we live. '.repeat(14));
await foto('08-writing');
await pagina.getByRole('button', { name: /corregir|terminar/i }).first().click();
await pagina.waitForSelector('.tu-texto, .resultado, .nota', { timeout: 8000 }).catch(() => {});
await foto('09-writing-resultado');
const enviar = pagina.getByRole('button', { name: /enviar a adam/i }).first();
anota('Hay botón «Enviar a Adam» en el writing', (await enviar.count()) > 0);
if (await enviar.count()) {
  await pagina.evaluate(() => { window.open = () => null; });
  await enviar.click();
  await pagina.waitForTimeout(2500);
  const aviso = await pagina.locator('.fila .silencio.pequeno').allInnerTexts();
  await foto('10-writing-enviado');
  anota('Sin servidor, cae a compartir/WhatsApp', aviso.some((x) => /no responde|copiado|Enviado\./.test(x)), aviso.join(' | ').slice(0, 120));
}

writeFileSync(join(salida, 'resultado.json'), JSON.stringify({ resultados, errores }, null, 1));
console.log('Errores de página:', errores.length ? errores : 'ninguno');
await navegador.close();
