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
      // La app entera (banco de ejercicios incluido y vídeo de la intro) se guarda al instalarla: funciona sin conexión.
      workbox: { globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}', 'intro/*.mp4'] },
      manifest: {
        name: 'English Lab',
        short_name: 'English Lab',
        description: 'Exámenes de inglés tipo Cambridge y PAU para practicar y corregir en el móvil.',
        categories: ['education'],
        lang: 'es',
        theme_color: '#1b2742',
        background_color: '#f6f7f4',
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
