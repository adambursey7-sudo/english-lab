import { caraDe, type Perfil } from '../motor/perfiles';

/** Foto del alumno o, si no tiene, su inicial (va dentro del círculo `.avatar` o `.avatar-grande`). */
export function Cara({ perfil }: { perfil: Perfil }) {
  const { foto, letra } = caraDe(perfil);
  return foto ? <img src={foto} alt="" width="58" height="58" loading="lazy" /> : <>{letra}</>;
}
