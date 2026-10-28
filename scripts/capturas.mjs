// Capturas de la app en móvil (y tablet) para la página de bocetos del loop.
// Uso: node scripts/capturas.mjs <carpeta-salida> [url]
// Necesita playwright-core fuera del repo: variable PLAYWRIGHT_CORE con la ruta de su carpeta node_modules/playwright-core.
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { createRequire } from 'node:module';

const salida = process.argv[2] ?? 'docs/loop-mejorar/capturas/sin-nombre';
const url = process.argv[3] ?? 'http://localhost:5173/';
const rutaPw = process.env.PLAYWRIGHT_CORE;
if (!rutaPw) {
  console.error('Falta PLAYWRIGHT_CORE (carpeta de playwright-core).');
  process.exit(1);
}
const { chromium } = createRequire(import.meta.url)(rutaPw);
mkdirSync(salida, { recursive: true });

const navegador = await chromium.launch({ channel: 'chrome', headless: true });
const movil = await navegador.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  colorScheme: 'light',
});
const pagina = await movil.newPage();
pagina.on('pageerror', (e) => console.error('Error en la página:', e.message));

const foto = async (nombre, entera = false) => {
  await pagina.waitForTimeout(250);
  await pagina.screenshot({ path: join(salida, `${nombre}.png`), fullPage: entera });
  console.log('Captura', nombre);
};

await pagina.goto(url, { waitUntil: 'networkidle' });
await foto('01-inicio');
await foto('01-inicio-entera', true);

// Una parte suelta: la primera tarjeta.
await pagina.locator('.tarjeta').first().click();
await pagina.waitForSelector('.item');
await foto('02-ejercicio');

// Contesta a algo para que se vea cómo queda: primera opción de las dos primeras preguntas o texto en los campos.
const opciones = pagina.locator('.item .opcion');
if ((await opciones.count()) > 0) {
  await opciones.nth(0).click();
  await pagina.locator('.item').nth(1).locator('.opcion').nth(2).click();
} else {
  const campos = pagina.locator('.item .campo');
  await campos.nth(0).fill('which');
  await campos.nth(1).fill('wrong answer');
}
await pagina.locator('.item').nth(1).scrollIntoViewIfNeeded();
await foto('03-ejercicio-contestando');
await foto('03-ejercicio-entera', true);

await pagina.locator('.pie .btn').first().click();
await pagina.waitForSelector('.nota-grande');
await foto('04-resultado');
await foto('04-resultado-entera', true);

// De vuelta al inicio: ya hay historial, así que las tarjetas enseñan progreso y mejor nota.
await pagina.locator('.lista .btn', { hasText: 'Otro ejercicio' }).first().click();
await pagina.waitForSelector('.destrezas');
await foto('08-inicio-progreso');
await foto('08-inicio-progreso-entera', true);

// Partes sueltas que se pidan (cuarto argumento: "6,7,writing/2,speaking/3"): se abre cada una, se contesta la primera
// pregunta y se captura. Sin prefijo es Reading & Use of English.
const CHIPS = { 'reading-use': 'Reading & Use of English', writing: 'Writing', listening: 'Listening', speaking: 'Speaking', prueba: 'Prueba escrita' };
for (const pedido of (process.argv[4] ?? '').split(',').filter(Boolean)) {
  const [destreza, parte] = pedido.includes('/') ? pedido.split('/') : ['reading-use', pedido];
  const nombre = `07-${destreza === 'reading-use' ? 'parte' : destreza}-${parte}`;
  await pagina.goto(url, { waitUntil: 'networkidle' });
  // La PAU es otro examen: su ficha va primero. Sus partes se llaman «Preguntas 1–3» y «Pregunta N».
  if (destreza === 'prueba') await pagina.locator('.ficha', { hasText: 'PAU' }).first().click();
  else if (destreza !== 'reading-use') await pagina.locator('.ficha', { hasText: CHIPS[destreza] }).first().click();
  const etiqueta = destreza === 'prueba' ? (parte === '1' ? 'Preguntas 1–3 ·' : `Pregunta ${parte} ·`) : `Part ${parte} ·`;
  await pagina.locator('.tarjeta', { hasText: etiqueta }).first().click();
  await pagina.waitForSelector('.item');
  await foto(nombre);
  const primera = pagina.locator('.item').first();
  const letraBtn = primera.locator('.letra-btn');
  const elegir = primera.locator('button', { hasText: /^Elegir esta/ });
  const corta = primera.locator('textarea.replica');
  if ((await letraBtn.count()) > 0) {
    await letraBtn.nth(1).click();
    // Verdadero/falso de la PAU: además, la prueba copiada del texto.
    if ((await corta.count()) > 0) await corta.fill('The library started with forty objects donated by local families');
  } else if ((await primera.locator('.opcion').count()) > 0) await primera.locator('.opcion').nth(1).click();
  else if ((await elegir.count()) > 0) {
    await elegir.click();
    if ((await corta.count()) > 0) await corta.fill('I don’t agree with you. Phones are really distracting, and most of us would end up chatting.');
    else await primera.locator('textarea').fill('This is a sample answer written to see how the counter and the layout behave. '.repeat(4));
  } else if ((await corta.count()) > 0) {
    await corta.fill('Where would you like to go?');
    await pagina.locator('.item').nth(1).locator('textarea').fill('how are we getting there');
  } else if ((await primera.locator('textarea').count()) > 0) {
    await primera.locator('textarea').fill('This is a sample answer written to see how the counter and the layout behave. '.repeat(4));
  } else if ((await primera.locator('.reloj-hablar .btn').count()) > 0) {
    await primera.locator('.reloj-hablar .btn').first().click();
    await pagina.waitForTimeout(1200);
  }
  await primera.scrollIntoViewIfNeeded();
  await foto(`${nombre}-contestando`);
  await foto(`${nombre}-entera`, true);
  await pagina.locator('.pie .btn').first().click();
  await pagina.waitForSelector('.nota-grande');
  await foto(`${nombre}-resultado-entera`, true);
}

// Modo oscuro del inicio.
await pagina.emulateMedia({ colorScheme: 'dark' });
await pagina.goto(url, { waitUntil: 'networkidle' });
await foto('05-inicio-oscuro');

// Tablet.
const tablet = await navegador.newContext({ viewport: { width: 820, height: 1180 }, deviceScaleFactor: 1.5, isMobile: true, hasTouch: true });
const pt = await tablet.newPage();
await pt.goto(url, { waitUntil: 'networkidle' });
await pt.waitForTimeout(250);
await pt.screenshot({ path: join(salida, '06-inicio-tablet.png') });
console.log('Captura 06-inicio-tablet');

await navegador.close();
