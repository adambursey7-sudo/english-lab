import { useEffect, useState } from 'react';
import type { Ejercicio, Respuestas } from './banco/tipos';
import { apuntarVistos } from './motor/examen';
import { Inicio } from './pantallas/Inicio';
import { PantallaEjercicio } from './pantallas/Ejercicio';
import { Resultado } from './pantallas/Resultado';

type Estado =
  | { pantalla: 'inicio' }
  | { pantalla: 'ejercicio'; lista: Ejercicio[]; i: number; respuestas: Record<string, Respuestas> }
  | { pantalla: 'resultado'; lista: Ejercicio[]; respuestas: Record<string, Respuestas> };

export function App() {
  const [estado, setEstado] = useState<Estado>({ pantalla: 'inicio' });
  const paso = estado.pantalla === 'ejercicio' ? estado.i : -1;

  // Cada pantalla nueva empieza arriba del todo (si no, se hereda el scroll de la anterior).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [estado.pantalla, paso]);

  if (estado.pantalla === 'inicio') {
    return <Inicio onEmpezar={(lista) => setEstado({ pantalla: 'ejercicio', lista, i: 0, respuestas: {} })} />;
  }

  if (estado.pantalla === 'ejercicio') {
    const ejercicio = estado.lista[estado.i];
    const ultimo = estado.i === estado.lista.length - 1;
    return (
      <PantallaEjercicio
        key={ejercicio.id}
        ejercicio={ejercicio}
        posicion={{ i: estado.i + 1, total: estado.lista.length }}
        respuestas={estado.respuestas[ejercicio.id] ?? {}}
        onCambia={(n, valor) =>
          setEstado((e) =>
            e.pantalla !== 'ejercicio' ? e : { ...e, respuestas: { ...e.respuestas, [ejercicio.id]: { ...(e.respuestas[ejercicio.id] ?? {}), [n]: valor } } },
          )
        }
        onSiguiente={() => {
          if (ultimo) {
            apuntarVistos(estado.lista.map((e) => e.id));
            setEstado({ pantalla: 'resultado', lista: estado.lista, respuestas: estado.respuestas });
          } else {
            setEstado({ ...estado, i: estado.i + 1 });
          }
        }}
        onSalir={() => setEstado({ pantalla: 'inicio' })}
      />
    );
  }

  return (
    <Resultado
      lista={estado.lista}
      respuestas={estado.respuestas}
      onRepetir={() => setEstado({ pantalla: 'ejercicio', lista: estado.lista, i: 0, respuestas: {} })}
      onInicio={() => setEstado({ pantalla: 'inicio' })}
      onEmpezar={(lista) => (lista.length > 0 ? setEstado({ pantalla: 'ejercicio', lista, i: 0, respuestas: {} }) : setEstado({ pantalla: 'inicio' }))}
    />
  );
}
