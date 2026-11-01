import { useState } from 'react';
import { guardarLicencia, leerLicenciaGuardada, verificarLicencia, LIMITE_DEMO_GUARDADOS } from '../motor/licencia';
import { useLicencia } from '../motor/useLicencia';

/** Pantalla para activar la licencia (pegar la clave) y ver en qué estado está. */
export function Licencia() {
  const { estado, refrescar } = useLicencia();
  const [clave, setClave] = useState(leerLicenciaGuardada);
  const [aviso, setAviso] = useState('');

  const activar = async () => {
    const e = await verificarLicencia(clave);
    if (e.tipo === 'invalida' || e.tipo === 'demo') return setAviso(e.tipo === 'invalida' ? e.motivo : 'Esa clave no es una licencia.');
    guardarLicencia(clave);
    refrescar();
    setAviso(e.tipo === 'caducada' ? `La licencia de ${e.datos.academia} caducó el ${e.datos.hasta}.` : `Licencia activada para ${e.datos.academia}.`);
  };
  const quitar = () => {
    guardarLicencia('');
    setClave('');
    refrescar();
    setAviso('Licencia quitada de este navegador.');
  };

  return (
    <main className="contenido" style={{ maxWidth: 620, margin: '0 auto' }}>
      <p><a href="#/">‹ Volver</a></p>
      <h1>Licencia</h1>
      <p role="status">
        {estado.tipo === 'pro' && <><b>Versión completa</b> para {estado.datos.academia}{estado.datos.hasta ? `, válida hasta el ${estado.datos.hasta}` : ', sin caducidad'}.</>}
        {estado.tipo === 'caducada' && <><b>Licencia caducada</b> el {estado.datos.hasta}. Mientras tanto funciona como la demo.</>}
        {(estado.tipo === 'demo' || estado.tipo === 'invalida') && <><b>Versión de prueba.</b> Todo funciona, pero los PDF llevan una marca de agua «DEMO», se guardan como máximo {LIMITE_DEMO_GUARDADOS} exámenes y no se pueden crear ejercicios con IA. Los exámenes de muestra número 1 salen limpios.</>}
      </p>
      <label htmlFor="clave-licencia" style={{ display: 'block', fontWeight: 600, margin: '14px 0 4px' }}>Tu clave de licencia</label>
      <textarea id="clave-licencia" className="campo" rows={4} value={clave} onChange={(e) => setClave(e.target.value)} placeholder="ELAB1.…" spellCheck={false} />
      <div style={{ display: 'flex', gap: 8, margin: '10px 0' }}>
        <button type="button" className="btn" onClick={() => void activar()} disabled={clave.trim().length < 20}>Activar</button>
        {leerLicenciaGuardada() && <button type="button" className="btn sec" onClick={quitar}>Quitar licencia</button>}
      </div>
      {aviso && <p role="status">{aviso}</p>}
      <p className="silencio pequeno">La clave se comprueba en este navegador, sin conectarse a ningún servidor, y se guarda solo aquí. Si cambias de ordenador, vuelve a pegarla.</p>
    </main>
  );
}
