// Saca del banco los guiones de audio a un JSON para que scripts/audios.py genere los mp3.
// Uso: node scripts/exportar-guiones.mjs [salida.json]   (por defecto, salida/guiones.json)
import { build } from 'vite';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const salida = resolve(process.argv[2] ?? 'salida/guiones.json');
const carpeta = resolve('node_modules/.cache/english-lab');
mkdirSync(carpeta, { recursive: true });
mkdirSync(dirname(salida), { recursive: true });

// Compila el banco (TypeScript) a un módulo de Node con el propio Vite, sin dependencias nuevas.
await build({
  configFile: false,
  logLevel: 'silent',
  build: {
    ssr: resolve('src/banco/index.ts'),
    outDir: carpeta,
    emptyOutDir: false,
    minify: false,
    rollupOptions: { output: { format: 'es', entryFileNames: 'banco.mjs' } },
  },
});
const { BANCO } = await import(pathToFileURL(resolve(carpeta, 'banco.mjs')).href);

const guiones = BANCO.filter((e) => e.audio).map((e) => ({
  id: e.id,
  archivo: e.audio.archivo,
  hablantes: e.audio.hablantes,
  guion: e.audio.guion,
}));
writeFileSync(salida, JSON.stringify(guiones, null, 2), 'utf8');
console.log(`${guiones.length} guiones → ${salida}`);
