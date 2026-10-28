"""Genera los iconos de la app (public/) con Pillow: fondo azul marino, hoja de examen y tick rojo."""
from pathlib import Path
from PIL import Image, ImageDraw

PUBLIC = Path(__file__).resolve().parent.parent / "public"
NAVY, PAPER, PEN, LINE = (27, 39, 66), (246, 247, 244), (200, 55, 45), (212, 216, 223)

def dibujar(tam: int, margen: float, redondeo: bool) -> Image.Image:
    img = Image.new("RGBA", (tam, tam), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    r = tam * 0.22 if redondeo else 0
    d.rounded_rectangle((0, 0, tam - 1, tam - 1), radius=r, fill=NAVY)
    # hoja
    m = tam * margen
    x0, y0, x1, y1 = m, m * 0.85, tam - m, tam - m * 0.85
    d.rounded_rectangle((x0, y0, x1, y1), radius=tam * 0.04, fill=PAPER)
    # líneas de texto
    g = (y1 - y0) / 7
    for i in range(1, 5):
        y = y0 + g * i
        w = (x1 - x0) * (0.62 if i % 2 else 0.5)
        d.rounded_rectangle((x0 + g * 0.6, y - g * 0.1, x0 + g * 0.6 + w, y + g * 0.1), radius=g * 0.1, fill=LINE)
    # tick rojo
    t = tam * 0.055
    cx, cy = x1 - (x1 - x0) * 0.30, y1 - (y1 - y0) * 0.26
    d.line([(cx - t * 2.2, cy), (cx - t * 0.6, cy + t * 1.6), (cx + t * 2.6, cy - t * 2.6)], fill=PEN, width=int(t * 1.1), joint="curve")
    return img

PUBLIC.mkdir(exist_ok=True)
dibujar(512, 0.17, True).save(PUBLIC / "icon-512.png")
dibujar(192, 0.17, True).save(PUBLIC / "icon-192.png")
dibujar(512, 0.24, False).save(PUBLIC / "icon-maskable-512.png")
dibujar(180, 0.17, False).save(PUBLIC / "apple-touch-icon.png")
dibujar(64, 0.17, True).save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
print("iconos listos en", PUBLIC)
