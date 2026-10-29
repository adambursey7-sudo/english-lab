import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface Props {
  /** Lo que codifica el QR (normalmente un enlace). */
  texto: string;
  /** Lado en píxeles. */
  lado?: number;
  alt?: string;
}

/** Código QR dibujado en el navegador (paquete `qrcode`), para la portada y la hoja del listening del cuadernillo. */
export function QR({ texto, lado = 200, alt = 'Código QR' }: Props) {
  const [src, setSrc] = useState('');
  useEffect(() => {
    let vivo = true;
    QRCode.toDataURL(texto, { margin: 1, width: lado * 2, errorCorrectionLevel: 'M', color: { dark: '#000000', light: '#ffffff' } })
      .then((url) => vivo && setSrc(url))
      .catch(() => vivo && setSrc(''));
    return () => {
      vivo = false;
    };
  }, [texto, lado]);
  if (!src) return <div className="qr" style={{ width: lado, height: lado }} aria-hidden="true" />;
  return <img className="qr" src={src} width={lado} height={lado} alt={alt} />;
}
