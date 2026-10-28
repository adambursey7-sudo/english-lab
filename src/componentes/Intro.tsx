import { useEffect, useRef, useState } from 'react';

const VIDEO = `${import.meta.env.BASE_URL}intro/intro.mp4`;
/** Si el vídeo no ha arrancado en este tiempo (red lenta, autoplay bloqueado), se entra sin intro. */
const ESPERA_MAXIMA = 3500;

/**
 * Intro de la app: el vídeo del logo de Kate, con música, a pantalla completa cada vez que se abre la app
 * (móvil y ordenador). Intenta sonar desde el principio; si el navegador no deja sonido sin tocar nada,
 * arranca en silencio y ofrece «Oír». «Saltar» la quita en cualquier momento.
 */
export function Intro({ onFin }: { onFin: () => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const [silencio, setSilencio] = useState(false);
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
    let arrancado = false;
    const marcarArrancado = () => {
      arrancado = true;
    };
    v.addEventListener('playing', marcarArrancado);

    // Primero con sonido; si el navegador lo rechaza (autoplay sin gesto), en silencio.
    v.muted = false;
    v.play().catch(() => {
      v.muted = true;
      setSilencio(true);
      v.play().catch(terminar);
    });

    const vigilante = window.setTimeout(() => {
      if (!arrancado) terminar();
    }, ESPERA_MAXIMA);
    return () => {
      window.clearTimeout(vigilante);
      v.removeEventListener('playing', marcarArrancado);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const oir = () => {
    const v = video.current;
    if (!v) return;
    v.muted = false;
    // Si acaba de empezar, se vuelve al principio para que la música se oiga entera.
    if (v.currentTime < 2) v.currentTime = 0;
    setSilencio(false);
    v.play().catch(() => undefined);
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
      <div className="intro-botones">
        {silencio && (
          <button className="btn intro-btn" onClick={oir}>
            <span aria-hidden="true">🔊</span> Oír
          </button>
        )}
        <button className="btn intro-btn sec" onClick={terminar}>
          Saltar
        </button>
      </div>
      <p className="intro-credito">Música: «Carefree», Kevin MacLeod (incompetech.com) · CC BY 4.0</p>
    </div>
  );
}
