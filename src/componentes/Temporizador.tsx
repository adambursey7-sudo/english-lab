import { useEffect, useState } from 'react';

/** Cuenta atrás en minutos. Al llegar a cero no corta nada: se pone en rojo y sigue contando en negativo, como un reloj de examen. */
export function Temporizador({ minutos }: { minutos: number }) {
  const [inicio] = useState(() => Date.now());
  const [ahora, setAhora] = useState(inicio);

  useEffect(() => {
    const id = setInterval(() => setAhora(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const restante = minutos * 60 - Math.floor((ahora - inicio) / 1000);
  const agotado = restante < 0;
  const abs = Math.abs(restante);
  const mm = String(Math.floor(abs / 60)).padStart(2, '0');
  const ss = String(abs % 60).padStart(2, '0');
  return (
    <span className={`reloj${agotado ? ' agotado' : ''}`} aria-label="Tiempo restante">
      {agotado ? '−' : ''}{mm}:{ss}
    </span>
  );
}
