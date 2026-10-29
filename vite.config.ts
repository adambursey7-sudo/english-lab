import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// `npm run build:pages` (modo `pages`) compila para GitHub Pages, que sirve la app en /english-lab/.
export default defineConfig(({ mode }) => ({
  base: mode === 'pages' ? '/english-lab/' : '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // La app entera (banco de ejercicios y viñetas de Kate incluidos) se guarda al instalarla: funciona sin conexión.
      // El vídeo de la intro NO va en esa caché: Safari pide los vídeos a trozos (Range) y la caché de instalación solo
      // sabe darlos enteros, así que en el iPhone fallaba o salía sin sonido. Va aparte, con soporte de trozos.
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,ico,woff2}'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.endsWith('.mp4'),
            handler: 'CacheFirst',
            options: { cacheName: 'intro', rangeRequests: true, cacheableResponse: { statuses: [200] } },
          },
        ],
      },
      manifest: {
        name: 'English Lab',
        short_name: 'English Lab',
        description: 'Exámenes de inglés tipo Cambridge y PAU para practicar y corregir en el móvil.',
        categories: ['education'],
        lang: 'es',
        theme_color: '#34502b',
        background_color: '#f3eee4',
        display: 'standalone',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
  // `npm run preview` detrás de Tailscale Funnel (enlace público provisional mientras no esté en GitHub Pages).
  preview: { allowedHosts: ['.ts.net'] },
  test: { include: ['src/**/*.test.ts'] },
}));
