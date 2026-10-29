import { useEffect, useRef, useState } from 'react';

const VIDEO = `${import.meta.env.BASE_URL}intro/intro.mp4`;
/** Si el vídeo no ha arrancado en este tiempo (red lenta, autoplay bloqueado), se entra sin intro. */
const ESPERA_MAXIMA = 3500;

/**
 * Intro de la app: el vídeo del logo de Kate, con música, a pantalla completa cada vez que se abre la app
 * (móvil y ordenador). Intenta sonar desde el principio; si el navegador no deja sonido sin tocar nada
 * (el iPhone casi siempre), espera quieta en el primer fotograma con «Toca para empezar»: así la música
 * siempre se oye entera. «Saltar» la quita en cualquier momento.
 */
export function Intro({ onFin }: { onFin: () => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const [esperaToque, setEsperaToque] = useState(false);
  const [saliendo, setSaliendo] = useState(false);
  const terminado = useRef(false);

  const terminar = () => {
    if (terminado.current) return;
    terminado.current = true;
    setSaliendo(true);
    window.setTimeout(onFin, 450);
  };

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    // «Listo» = o suena, o está esperando el toque con el primer fotograma ya cargado.
    let listo = false;
    const marcarListo = () => {
      listo = true;
    };
    v.addEventListener('playing', marcarListo);

    // Primero con sonido; si el navegador lo rechaza (autoplay sin gesto), se espera a que toquen.
    v.muted = false;
    // Cualquier otro fallo (p. ej. AbortError mientras carga) lo deciden `playing`, `onError` o el vigilante.
    v.play().catch((e: DOMException) => {
      if (e.name !== 'NotAllowedError') return;
      listo = true;
      setEsperaToque(true);
    });
    // Descarga entera una vez para que la caché «intro» tenga copia completa y pueda servir los trozos sin conexión.
    fetch(VIDEO).catch(() => undefined);

    const vigilante = window.setTimeout(() => {
      if (!listo) terminar();
    }, ESPERA_MAXIMA);
    return () => {
      window.clearTimeout(vigilante);
      v.removeEventListener('playing', marcarListo);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const empezar = () => {
    const v = video.current;
    if (!v) return;
    v.muted = false;
    v.currentTime = 0;
    setEsperaToque(false);
    v.play().catch(terminar);
  };

  return (
    <div className={`intro${saliendo ? ' saliendo' : ''}`} role="dialog" aria-label="Intro de English Lab">
      <video
        ref={video}
        className="intro-video"
        src={VIDEO}
        playsInline
        preload="auto"
        onEnded={terminar}
        onError={terminar}
        aria-hidden="true"
      />
      {esperaToque && (
        <button className="intro-tocar" onClick={empezar}>
          <span><span aria-hidden="true">▶</span> Toca para empezar</span>
        </button>
      )}
      <div className="intro-botones">
        <button className="btn intro-btn sec" onClick={terminar}>
          Saltar
        </button>
      </div>
      <p className="intro-credito">Música: «Carefree», Kevin MacLeod (incompetech.com) · CC BY 4.0</p>
    </div>
  );
}
