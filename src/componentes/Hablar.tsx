import { useEffect, useRef, useState } from 'react';
import type { ItemHablar } from '../banco/tipos';
import { formatoReloj } from '../motor/entregas';

type Fase = 'quieto' | 'leyendo' | 'hablando' | 'hecho';

interface Props {
  item: ItemHablar;
  valor: string;
  onCambia: (v: string) => void;
}

/** Una parte del Speaking: lo que dice el examinador, las preguntas o la hoja, un reloj por fases y grabar con el micro (opcional). */
export function EntradaHablar({ item, valor, onCambia }: Props) {
  const [fase, setFase] = useState<Fase>(valor === 'hecho' ? 'hecho' : 'quieto');
  const [restante, setRestante] = useState(0);
  const [grabando, setGrabando] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [avisoMicro, setAvisoMicro] = useState('');
  const grabadora = useRef<MediaRecorder | null>(null);
  const trozos = useRef<Blob[]>([]);

  useEffect(() => {
    if (fase !== 'leyendo' && fase !== 'hablando') return;
    const t = setInterval(() => setRestante((r) => r - 1), 1000);
    return () => clearInterval(t);
  }, [fase]);

  useEffect(() => {
    if (restante > 0) return;
    if (fase === 'leyendo') {
      setFase('hablando');
      setRestante(item.segundos);
    } else if (fase === 'hablando') {
      setFase('hecho');
      onCambia('hecho');
      pararGrabacion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restante, fase]);

  const empezar = () => {
    if (item.segundosLectura) {
      setFase('leyendo');
      setRestante(item.segundosLectura);
    } else {
      setFase('hablando');
      setRestante(item.segundos);
    }
  };

  const grabar = async () => {
    try {
      const flujo = await navigator.mediaDevices.getUserMedia({ audio: true });
      const tipo = ['audio/mp4', 'audio/webm;codecs=opus', 'audio/webm'].find((t) => MediaRecorder.isTypeSupported(t));
      const g = new MediaRecorder(flujo, tipo ? { mimeType: tipo } : undefined);
      trozos.current = [];
      g.ondataavailable = (e) => trozos.current.push(e.data);
      g.onstop = () => {
        flujo.getTracks().forEach((p) => p.stop());
        const blob = new Blob(trozos.current, { type: g.mimeType });
        setAudioUrl(URL.createObjectURL(blob));
        setGrabando(false);
      };
      g.start();
      grabadora.current = g;
      setGrabando(true);
      setAvisoMicro('');
      if (fase === 'quieto') empezar();
    } catch {
      setAvisoMicro('No se pudo usar el micro. Puedes practicar sin grabar.');
    }
  };

  const pararGrabacion = () => {
    if (grabadora.current && grabadora.current.state !== 'inactive') grabadora.current.stop();
  };

  const compartirAudio = async () => {
    if (!audioUrl) return;
    const blob = await (await fetch(audioUrl)).blob();
    const archivo = new File([blob], `speaking-part-${item.n}.${blob.type.includes('mp4') ? 'm4a' : 'webm'}`, { type: blob.type });
    const nav = navigator as Navigator & { canShare?: (d: { files: File[] }) => boolean; share?: (d: { files: File[]; title?: string }) => Promise<void> };
    if (nav.canShare?.({ files: [archivo] }) && nav.share) {
      try {
        await nav.share({ files: [archivo], title: 'English Lab · speaking' });
        return;
      } catch {
        // cancelado
      }
    }
    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = archivo.name;
    a.click();
  };

  return (
    <div className="hablar">
      {item.pregunta && <h3>{item.pregunta}</h3>}
      <p className="examinador">
        <span className="eyebrow">Examiner</span>
        {item.interlocutor}
      </p>

      {item.imagenes && (
        <div className="imagenes">
          {item.imagenes.map((d, i) => (
            <div key={i} className="imagen">
              <span className="letra-grande">{i + 1}</span>
              <p>{d}</p>
            </div>
          ))}
        </div>
      )}

      {item.preguntaCentral && (
        <div className="hoja-ideas" role="img" aria-label={`${item.preguntaCentral} ${item.ideas?.join(', ')}`}>
          {item.ideas?.map((idea, i) => (
            <span key={i} className="idea" style={{ gridArea: `i${i + 1}` }}>{idea}</span>
          ))}
          <span className="central">{item.preguntaCentral}</span>
        </div>
      )}

      {item.preguntas.length > 0 && (
        <ul className="preguntas-hablar">
          {item.preguntas.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      )}

      <div className="reloj-hablar" data-fase={fase}>
        {fase === 'quieto' && (
          <>
            <button type="button" className="btn chico" onClick={empezar}>
              Empezar · {item.segundosLectura ? `${item.segundosLectura} s para leer + ` : ''}{formatoReloj(item.segundos)}
            </button>
            <button type="button" className="btn sec chico" onClick={grabar}>Empezar grabando</button>
          </>
        )}
        {(fase === 'leyendo' || fase === 'hablando') && (
          <>
            <span className="cuenta">{formatoReloj(restante)}</span>
            <span className="silencio">{fase === 'leyendo' ? 'Lee la hoja' : 'Habla'}{grabando ? ' · grabando' : ''}</span>
            <button type="button" className="btn sec chico" onClick={() => { setFase('hecho'); onCambia('hecho'); pararGrabacion(); }}>Terminar</button>
          </>
        )}
        {fase === 'hecho' && (
          <>
            <span className="silencio">Hecho.</span>
            <button type="button" className="btn enlace" onClick={() => { setFase('quieto'); setAudioUrl(null); onCambia(''); }}>Repetir</button>
          </>
        )}
      </div>
      {avisoMicro && <p className="silencio pequeno">{avisoMicro}</p>}
      {audioUrl && (
        <div className="fila" style={{ gap: 10, alignItems: 'center' }}>
          <audio controls src={audioUrl} style={{ maxWidth: '100%' }} />
          <button type="button" className="btn sec chico" onClick={compartirAudio}>Enviar a Adam</button>
        </div>
      )}
      {item.modelo && (
        <details className="plegable">
          <summary>Cómo hacerlo bien</summary>
          <p className="explica">{item.modelo}</p>
        </details>
      )}
    </div>
  );
}
