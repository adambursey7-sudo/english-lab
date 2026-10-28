"""Genera los iconos de la app (public/) con Pillow a partir del logo de Kate (public/img/logo.png, la lámina
«Aprende Inglés con Kate»): fondo del mismo crema que la lámina y el logo centrado entero. El «maskable» lleva más
margen porque Android recorta los bordes. Sin transparencia: iOS la pinta de negro."""
from pathlib import Path
from PIL import Image

PUBLIC = Path(__file__).resolve().parent.parent / "public"
LOGO = Image.open(PUBLIC / "img" / "logo.png").convert("RGBA")
CREMA = (236, 230, 218, 255)


def dibujar(tam: int, ocupa: float) -> Image.Image:
    """Cuadrado crema de `tam` px con el logo entero ocupando `ocupa` del lado (por su lado mayor)."""
    img = Image.new("RGBA", (tam, tam), CREMA)
    lado = round(tam * ocupa)
    escala = lado / max(LOGO.size)
    logo = LOGO.resize((round(LOGO.width * escala), round(LOGO.height * escala)), Image.LANCZOS)
    img.alpha_composite(logo, ((tam - logo.width) // 2, (tam - logo.height) // 2))
    return img.convert("RGB")


PUBLIC.mkdir(exist_ok=True)
dibujar(512, 1.0).save(PUBLIC / "icon-512.png")
dibujar(192, 1.0).save(PUBLIC / "icon-192.png")
dibujar(512, 0.78).save(PUBLIC / "icon-maskable-512.png")
dibujar(180, 1.0).save(PUBLIC / "apple-touch-icon.png")
dibujar(64, 1.0).save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
print("iconos listos en", PUBLIC)
