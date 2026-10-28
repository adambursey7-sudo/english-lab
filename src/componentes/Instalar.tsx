import { useState } from 'react';

const CLAVE = 'english-lab.instalar-visto';

function instalada(): boolean {
  return (navigator as Navigator & { standalone?: boolean }).standalone === true || window.matchMedia('(display-mode: standalone)').matches;
}

function esIphone(): boolean {
  return /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

/**
 * Una línea discreta al final del inicio, «Tenla como una app», que se despliega con las instrucciones de añadirla a
 * la pantalla de inicio. Solo sale cuando la app se abre en el navegador; «Entendido» la quita para siempre.
 */
export function Instalar() {
  const [visto, setVisto] = useState(() => {
    try {
      return localStorage.getItem(CLAVE) === '1';
    } catch {
      return false;
    }
  });
  if (visto || instalada()) return null;

  const cerrar = () => {
    setVisto(true);
    try {
      localStorage.setItem(CLAVE, '1');
    } catch {
      // sin almacenamiento: volverá a salir la próxima vez, no pasa nada
    }
  };

  return (
    <details className="instalar-linea">
      <summary><b>Tenla como una app</b> en tu móvil, con su icono y a pantalla completa. Cómo</summary>
      {esIphone() ? (
        <p>Toca el botón <b>Compartir</b> (el cuadrado con la flecha) y después <b>Añadir a pantalla de inicio</b>.</p>
      ) : (
        <p>Abre el menú del navegador (los tres puntos) y toca <b>Instalar aplicación</b> o <b>Añadir a pantalla de inicio</b>.</p>
      )}
      <button className="btn enlace" onClick={cerrar}>Entendido, no me lo recuerdes más</button>
    </details>
  );
}
