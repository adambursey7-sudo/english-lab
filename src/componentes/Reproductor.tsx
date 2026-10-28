import { useEffect, useRef, useState } from 'react';
import type { Audio } from '../banco/tipos';
import { formatoReloj } from '../motor/entregas';

interface Props {
  audio: Audio;
  /** Base de la app (`import.meta.env.BASE_URL`), para encontrar el mp3 también en GitHub Pages. */
  base?: string;
}

type Modo = 'cargando' | 'mp3' | 'voz' | 'sin-voz';

/**
 * Reproductor del listening: el mp3 hecho en el PC (con las instrucciones y las pausas del examen) y, si no existe,
 * la voz del móvil leyendo el guion. Sin transcripción a la vista: esa sale al corregir.
 */
export function Reproductor({ audio, base = import.meta.env.BASE_URL }: Props) {
  const [modo, setModo] = useState<Modo>('cargando');
  const [sonando, setSonando] = useState(false);
  const [tiempo, setTiempo] = useState(0);
  const [duracion, setDuracion] = useState(0);
  const [linea, setLinea] = useState(-1);
  const ref = useRef<HTMLAudioElement>(null);
  const cancelado = useRef(false);
  const src = `${base}${audio.archivo}`;

  useEffect(() => {
    let vivo = true;
    fetch(src, { method: 'HEAD' })
      .then((r) => {
        if (!vivo) return;
        if (r.ok && (r.headers.get('content-type') ?? '').includes('audio')) setModo('mp3');
        else setModo('speechSynthesis' in window ? 'voz' : 'sin-voz');
      })
      .catch(() => vivo && setModo('speechSynthesis' in window ? 'voz' : 'sin-voz'));
    return () => {
      vivo = false;
      cancelado.current = true;
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, [src]);

  // mp3
  const alternar = () => {
    const a = ref.current;
    if (!a) return;
    if (a.paused) void a.play();
    else a.pause();
  };
  const saltar = (s: number) => {
    const a = ref.current;
    if (a) a.currentTime = Math.max(0, Math.min(a.duration || 0, a.currentTime + s));
  };

  // Voz del móvil: lee el guion línea a línea, respetando las pausas (acortadas a 8 s como mucho).
  const leerConVoz = async () => {
    const sintesis = window.speechSynthesis;
    if (sonando) {
      sintesis.cancel();
      cancelado.current = true;
      setSonando(false);
      return;
    }
    cancelado.current = false;
    setSonando(true);
    const voces = sintesis.getVoices().filter((v) => v.lang.startsWith('en'));
    const vozDe = (id: string) => {
      const i = audio.hablantes.findIndex((h) => h.id === id);
      return voces.length ? voces[(i + voces.length) % voces.length] : undefined;
    };
    for (let i = 0; i < audio.guion.length; i++) {
      if (cancelado.current) break;
      const l = audio.guion[i];
      setLinea(i);
      if ('pausa' in l) {
        await new Promise((r) => setTimeout(r, Math.min(l.pausa, 8000)));
        continue;
      }
      await new Promise<void>((resolver) => {
        const u = new SpeechSynthesisUtterance(l.texto);
        u.lang = 'en-GB';
        const v = vozDe(l.quien);
        if (v) u.voice = v;
        u.rate = 0.95;
        u.onend = () => resolver();
        u.onerror = () => resolver();
        sintesis.speak(u);
      });
    }
    setLinea(-1);
    setSonando(false);
  };

  if (modo === 'cargando') return <div className="reproductor"><span className="silencio">Preparando el audio…</span></div>;

  if (modo === 'sin-voz') {
    return <div className="reproductor"><span className="silencio">Este móvil no puede reproducir el audio. Prueba en otro navegador.</span></div>;
  }

  if (modo === 'voz') {
    const total = audio.guion.filter((l) => 'quien' in l).length;
    const hechas = audio.guion.slice(0, linea + 1).filter((l) => 'quien' in l).length;
    return (
      <div className="reproductor">
        <button type="button" className="btn-play" onClick={leerConVoz} aria-label={sonando ? 'Parar' : 'Reproducir'}>
          {sonando ? '■' : '▶'}
        </button>
        <div className="reproductor-datos">
          <span className="reproductor-titulo">Audio con la voz del móvil</span>
          <span className="silencio pequeno">
            {sonando ? `Leyendo… ${hechas}/${total}` : 'No hay grabación todavía: el móvil lee el guion con sus voces. Se oye dos veces, como en el examen.'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="reproductor">
      <audio
        ref={ref}
        src={src}
        preload="metadata"
        onPlay={() => setSonando(true)}
        onPause={() => setSonando(false)}
        onTimeUpdate={(e) => setTiempo(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuracion(e.currentTarget.duration)}
        onEnded={() => setSonando(false)}
      />
      <button type="button" className="btn-play" onClick={alternar} aria-label={sonando ? 'Pausa' : 'Reproducir'}>
        {sonando ? '❚❚' : '▶'}
      </button>
      <div className="reproductor-datos">
        <div className="reproductor-barra" onClick={(e) => {
          const a = ref.current;
          if (!a || !duracion) return;
          const r = e.currentTarget.getBoundingClientRect();
          a.currentTime = ((e.clientX - r.left) / r.width) * duracion;
        }}>
          <div style={{ width: duracion ? `${(tiempo / duracion) * 100}%` : '0%' }} />
        </div>
        <div className="reproductor-fila">
          <span className="reloj">{formatoReloj(tiempo)} / {formatoReloj(duracion)}</span>
          <span className="reproductor-saltos">
            <button type="button" className="btn enlace" onClick={() => saltar(-10)}>−10 s</button>
            <button type="button" className="btn enlace" onClick={() => saltar(10)}>+10 s</button>
          </span>
        </div>
        <span className="silencio pequeno">Con las instrucciones y las pausas del examen; cada parte se oye dos veces.</span>
      </div>
    </div>
  );
}
