"""Genera los mp3 del listening a partir de los guiones del banco.

Uso (desde la carpeta del proyecto):
    node scripts/exportar-guiones.mjs
    python scripts/audios.py [--solo id] [--forzar]

Cada línea del guion se sintetiza con edge-tts con la voz de su hablante; las pausas se hacen con ffmpeg
(silencio) y todo se une en un solo mp3 (24 kHz, mono, 48 kbps) en public/<archivo>. No se regenera lo que ya existe
salvo con --forzar. Hace falta tener ffmpeg en el PATH y el paquete edge-tts.
"""
from __future__ import annotations

import argparse
import asyncio
import hashlib
import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

import edge_tts

RAIZ = Path(__file__).resolve().parent.parent
PUBLIC = RAIZ / "public"
CACHE = RAIZ / "node_modules" / ".cache" / "english-lab" / "tts"


def silencio(ms: int, destino: Path) -> None:
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono", "-t", f"{ms / 1000:.3f}",
         "-c:a", "libmp3lame", "-b:a", "48k", str(destino)],
        check=True,
    )


async def sintetiza(texto: str, voz: str, destino: Path) -> None:
    if destino.exists() and destino.stat().st_size > 0:
        return
    ultimo: Exception | None = None
    for intento in range(4):
        try:
            comunicador = edge_tts.Communicate(texto, voz)
            await comunicador.save(str(destino))
            if destino.stat().st_size > 0:
                return
        except Exception as e:  # el servicio falla a veces: se reintenta
            ultimo = e
            if destino.exists():
                destino.unlink()
            await asyncio.sleep(2 + intento * 2)
    raise RuntimeError(f"edge-tts no devolvió audio para «{texto[:60]}…» con {voz}: {ultimo}")


def normaliza(entrada: Path, salida: Path) -> None:
    """Pasa un trozo a 24 kHz mono 48 kbps para que todos los trozos se puedan unir sin cortes."""
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-i", str(entrada), "-ar", "24000", "-ac", "1", "-c:a", "libmp3lame", "-b:a", "48k", str(salida)],
        check=True,
    )


async def genera(guion: dict, forzar: bool) -> Path | None:
    destino = PUBLIC / guion["archivo"]
    if destino.exists() and not forzar:
        print(f"  ya existe: {destino.relative_to(RAIZ)}")
        return None
    voces = {h["id"]: h["voz"] for h in guion["hablantes"]}
    CACHE.mkdir(parents=True, exist_ok=True)
    trozos: list[Path] = []
    with tempfile.TemporaryDirectory() as tmp:
        carpeta = Path(tmp)
        for i, linea in enumerate(guion["guion"]):
            if "pausa" in linea:
                p = carpeta / f"{i:04d}-pausa.mp3"
                silencio(int(linea["pausa"]), p)
                trozos.append(p)
                continue
            voz = voces[linea["quien"]]
            clave = hashlib.sha1(f"{voz}|{linea['texto']}".encode("utf-8")).hexdigest()[:20]
            bruto = CACHE / f"{clave}.mp3"
            await sintetiza(linea["texto"], voz, bruto)
            p = carpeta / f"{i:04d}-{linea['quien']}.mp3"
            normaliza(bruto, p)
            trozos.append(p)
        lista = carpeta / "lista.txt"
        lista.write_text("".join(f"file '{t.as_posix()}'\n" for t in trozos), encoding="utf-8")
        destino.parent.mkdir(parents=True, exist_ok=True)
        subprocess.run(
            ["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", str(lista), "-c", "copy", str(destino)],
            check=True,
        )
    return destino


def duracion(archivo: Path) -> float:
    salida = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", str(archivo)],
        capture_output=True, text=True, check=True,
    ).stdout.strip()
    return float(salida or 0)


async def principal() -> int:
    try:
        sys.stdout.reconfigure(encoding="utf-8")  # la consola de Windows va en cp1252
    except Exception:
        pass
    parser = argparse.ArgumentParser()
    parser.add_argument("--guiones", default=str(RAIZ / "salida" / "guiones.json"))
    parser.add_argument("--solo", help="id del ejercicio")
    parser.add_argument("--forzar", action="store_true")
    args = parser.parse_args()
    if not shutil.which("ffmpeg"):
        print("Falta ffmpeg en el PATH.")
        return 1
    guiones = json.loads(Path(args.guiones).read_text(encoding="utf-8"))
    for g in guiones:
        if args.solo and g["id"] != args.solo:
            continue
        print(g["id"])
        hecho = await genera(g, args.forzar)
        if hecho:
            seg = duracion(hecho)
            print(f"  → {hecho.relative_to(RAIZ)} · {seg / 60:.1f} min · {hecho.stat().st_size // 1024} KB")
    return 0


if __name__ == "__main__":
    sys.exit(asyncio.run(principal()))
