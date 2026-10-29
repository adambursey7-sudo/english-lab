import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/zilla-slab/600.css';
import '@fontsource/zilla-slab/700.css';
import './styles.css';
import { App } from './App';
import { registerSW } from 'virtual:pwa-register';

// Versión nueva publicada → se instala y la app se recarga sola. El iPhone no vuelve a abrir la app instalada, la
// «despierta», así que se busca versión nueva cada vez que vuelve a primer plano (y cada hora si se queda abierta).
registerSW({
  immediate: true,
  onRegisteredSW(_url, registro) {
    if (!registro) return;
    const buscar = () => registro.update().catch(() => undefined);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') buscar();
    });
    window.setInterval(buscar, 60 * 60 * 1000);
  },
});

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
