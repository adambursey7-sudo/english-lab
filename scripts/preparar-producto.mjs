// Copia `public` a `public-producto` sin lo que es solo de la clase de Kate (fotos de alumnos, notas de Adam, intro,
// viñetas de nota). Lo usan `dev:producto` y `build:producto`.
import { cpSync, existsSync, rmSync } from 'node:fs';
import { sep } from 'node:path';

const EXCLUIR = ['notas', 'intro', 'img/nota-1.jpg', 'img/nota-2.jpg', 'img/nota-3.jpg', 'img/nota-4.jpg', 'img/nota-5.jpg',
  'img/vineta-1.png', 'img/vineta-2.png', 'img/vineta-3.png', 'img/vineta-4.png', 'img/vineta-5.png', 'img/logo.png', 'img/logo-redondo.png'];

if (existsSync('public-producto')) rmSync('public-producto', { recursive: true });
cpSync('public', 'public-producto', {
  recursive: true,
  filter: (origen) => {
    const rel = origen.split(sep).join('/').replace(/^public\/?/, '');
    return !(EXCLUIR.includes(rel) || /^img\/perfil-/.test(rel));
  },
});
console.log('public-producto listo');
