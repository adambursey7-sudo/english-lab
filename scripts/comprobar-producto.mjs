// Comprueba que el paquete de producto (`dist-producto`) no lleva nada de la clase de Kate.
// Uso: npm run build:producto && npm run test:producto
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, sep } from 'node:path';

const RAIZ = 'dist-producto';
const PROHIBIDOS_EN_NOMBRE = [/perfil-/, /^notas\//, /^intro\//, /nota-\d/, /vineta-\d/, /logo/];
const PROHIBIDOS_EN_TEXTO = ['Eduardo', 'Gabriela', 'Josito', 'Laurita', 'Aroa', 'Aprende Inglés con Kate', 'english-lab:adam', '3574df32b00d'];

function archivos(dir) {
  return readdirSync(dir).flatMap((n) => {
    const ruta = join(dir, n);
    return statSync(ruta).isDirectory() ? archivos(ruta) : [ruta];
  });
}

let fallos = 0;
for (const ruta of archivos(RAIZ)) {
  const rel = ruta.split(sep).join('/').slice(RAIZ.length + 1);
  if (PROHIBIDOS_EN_NOMBRE.some((r) => r.test(rel))) { console.error('Archivo de la clase en el producto:', rel); fallos++; }
  if (/\.(js|css|html|json|webmanifest)$/.test(rel)) {
    const texto = readFileSync(ruta, 'utf8');
    for (const p of PROHIBIDOS_EN_TEXTO) if (texto.includes(p)) { console.error(`«${p}» aparece en`, rel); fallos++; }
  }
}
if (fallos) { console.error(`${fallos} problema(s).`); process.exit(1); }
console.log('Producto limpio: sin alumnos, fotos, notas, intro ni logo de Kate.');
