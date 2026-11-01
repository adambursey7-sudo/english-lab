import { useState } from 'react';
import { aplicarColor, guardarMarca, leerMarca } from '../marca';

/** Reduce el logo subido a un PNG pequeño (lado mayor 256 px) para que quepa en el navegador. */
function reducirLogo(archivo: File): Promise<string> {
  return new Promise((resolver, rechazar) => {
    const url = URL.createObjectURL(archivo);
    const img = new Image();
    img.onload = () => {
      const k = Math.min(1, 256 / Math.max(img.width, img.height));
      const c = document.createElement('canvas');
      c.width = Math.max(1, Math.round(img.width * k));
      c.height = Math.max(1, Math.round(img.height * k));
      c.getContext('2d')?.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      resolver(c.toDataURL('image/png'));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      rechazar(new Error('imagen'));
    };
    img.src = url;
  });
}

const COLORES = ['#34502b', '#1f4e79', '#8a2b3d', '#5b3b8c', '#b4472b', '#2f2f2f'];

/** Primera vez que una academia abre la app: nombre, logo y color. Todo queda en su navegador. */
export function Asistente({ onListo }: { onListo: () => void }) {
  const inicial = leerMarca();
  const [nombre, setNombre] = useState('');
  const [logo, setLogo] = useState('');
  const [color, setColor] = useState(inicial.color);
  const [aviso, setAviso] = useState('');

  const subir = async (f: File | undefined) => {
    if (!f) return;
    try {
      setLogo(await reducirLogo(f));
      setAviso('');
    } catch {
      setAviso('No se pudo leer esa imagen. Prueba con un PNG o JPG.');
    }
  };
  const elegirColor = (c: string) => {
    setColor(c);
    aplicarColor({ ...inicial, color: c });
  };
  const terminar = () => {
    const m = guardarMarca({ nombre: nombre.trim() || inicial.nombre, logo, color });
    aplicarColor(m);
    onListo();
  };

  return (
    <main className="contenido" style={{ maxWidth: 560, margin: "0 auto" }}>
      <h1>Bienvenido</h1>
      <p className="silencio">Personaliza la app con los datos de tu academia. Saldrán en la pantalla y en los PDF que imprimas. Puedes cambiarlo luego.</p>
      <label style={{ display: "block", fontWeight: 600, margin: "14px 0 4px" }} htmlFor="asist-nombre">Nombre de tu academia o de tu clase</label>
      <input id="asist-nombre" className="campo" value={nombre} maxLength={60} placeholder={inicial.nombre} onChange={(e) => setNombre(e.target.value)} />
      <label style={{ display: "block", fontWeight: 600, margin: "14px 0 4px" }} htmlFor="asist-logo">Logo (opcional)</label>
      <input id="asist-logo" type="file" accept="image/*" onChange={(e) => void subir(e.target.files?.[0])} />
      {logo && <img src={logo} alt="Tu logo" width="80" style={{ objectFit: 'contain', margin: '8px 0' }} />}
      {aviso && <p className="silencio" role="alert">{aviso}</p>}
      <div style={{ fontWeight: 600, margin: "14px 0 4px" }}>Color principal</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '4px 0 16px' }}>
        {COLORES.map((c) => (
          <button
            key={c}
            type="button"
            aria-label={`Color ${c}`}
            aria-pressed={c === color}
            onClick={() => elegirColor(c)}
            style={{ width: 36, height: 36, borderRadius: '50%', background: c, border: c === color ? '3px solid var(--ink)' : '2px solid var(--line)' }}
          />
        ))}
      </div>
      <button type="button" className="btn" onClick={terminar}>Empezar</button>
    </main>
  );
}
