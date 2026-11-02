#!/bin/sh
# Genera de una tanda los exámenes que faltan: C1 4–10 y PAU 5–10 (el PAU 4 ya está). Se puede relanzar: salta lo hecho.
cd "$(dirname "$0")/.." || exit 1
for n in 4 5 6 7 8 9 10; do
  node scripts/examen-completo.mjs c1 $n --paralelo 3
  [ $n -ge 5 ] && node scripts/examen-completo.mjs pau $n --paralelo 3
done
echo TANDA-TERMINADA
