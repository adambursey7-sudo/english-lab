import { useCallback, useEffect, useState } from 'react';
import { estadoLicencia, esPro, type EstadoLicencia } from './licencia';

/** Estado de la licencia en pantalla: mientras se comprueba cuenta como demo (la marca de agua se quita al confirmar la Pro). */
export function useLicencia() {
  const [estado, setEstado] = useState<EstadoLicencia>({ tipo: 'demo' });
  const refrescar = useCallback(() => {
    void estadoLicencia().then(setEstado);
  }, []);
  useEffect(refrescar, [refrescar]);
  return { estado, pro: esPro(estado), refrescar };
}
