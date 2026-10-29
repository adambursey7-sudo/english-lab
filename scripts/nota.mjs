// Apunta una nota de Adam (speaking, writing…) en public/notas/notas.json.
// Uso: node scripts/nota.mjs <alumno> <destreza> <nota> ["comentario"] [--examen N] [--parte N] [--sobre N] [--fecha AAAA-MM-DD]
//   alumno:   eduardo | gabriela | adam | josito | laurita
//   destreza: speaking | writing | listening | reading-use | prueba   (prueba = PAU)
// Ejemplo:  node scripts/nota.mjs eduardo speaking 7.5 "Buena fluidez; cuida la pronunciación de -ed" --examen 1 --parte 2
// Después: git add public/notas/notas.json && git commit -m "Nota de Eduardo" && git push  →  GitHub Pages la publica.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ARCHIVO = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'notas', 'notas.json');
const ALUMNOS = { eduardo: 'c1', gabriela: 'c1', adam: 'c1', josito: 'pau', laurita: 'pau' };
const DESTREZAS = ['speaking', 'writing', 'listening', 'reading-use', 'prueba'];

const args = process.argv.slice(2);
const opciones = {};
const sueltos = [];
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('--')) opciones[args[i].slice(2)] = args[++i];
  else sueltos.push(args[i]);
}
const [alumno, destreza, notaTexto, comentario] = sueltos;

const falla = (msg) => {
  console.error(`Error: ${msg}`);
  console.error('Uso: node scripts/nota.mjs <alumno> <destreza> <nota> ["comentario"] [--examen N] [--parte N] [--sobre N] [--fecha AAAA-MM-DD]');
  process.exit(1);
};
if (!(alumno in ALUMNOS)) falla(`alumno desconocido «${alumno}» (vale: ${Object.keys(ALUMNOS).join(', ')})`);
if (!DESTREZAS.includes(destreza)) falla(`destreza desconocida «${destreza}» (vale: ${DESTREZAS.join(', ')})`);
const nota = Number(String(notaTexto).replace(',', '.'));
if (!Number.isFinite(nota)) falla(`nota no válida «${notaTexto}»`);
const fecha = opciones.fecha ?? new Date().toISOString().slice(0, 10);
if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) falla(`fecha no válida «${fecha}» (AAAA-MM-DD)`);

const examen = destreza === 'prueba' ? 'pau' : ALUMNOS[alumno];
const nueva = { fecha, examen, destreza, nota };
if (opciones.sobre) nueva.sobre = Number(opciones.sobre);
if (opciones.examen) nueva.numero = Number(opciones.examen);
if (opciones.parte) nueva.parte = Number(opciones.parte);
if (comentario) nueva.comentario = comentario;

const datos = JSON.parse(readFileSync(ARCHIVO, 'utf8'));
datos[alumno] = [...(datos[alumno] ?? []), nueva];
writeFileSync(ARCHIVO, `${JSON.stringify(datos, null, 2)}\n`, 'utf8');
console.log(`Apuntada a ${alumno}: ${destreza} ${nota}${nueva.sobre ? ` sobre ${nueva.sobre}` : ''}${nueva.numero ? ` · examen ${nueva.numero}` : ''}${nueva.parte ? ` · parte ${nueva.parte}` : ''} (${fecha}).`);
console.log(`Ahora ${datos[alumno].length} ${datos[alumno].length === 1 ? 'nota' : 'notas'}. Para publicarla: git add public/notas/notas.json && git commit -m "Nota de ${alumno}" && git push`);
