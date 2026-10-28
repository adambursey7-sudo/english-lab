"""Genera los iconos de la app (public/) con Pillow a partir del logo redondo de Kate (public/img/logo.png):
fondo blanco y el logo centrado. El «maskable» lleva más margen porque Android recorta los bordes."""
from pathlib import Path
from PIL import Image

PUBLIC = Path(__file__).resolve().parent.parent / "public"
LOGO = Image.open(PUBLIC / "img" / "logo.png").convert("RGBA")
BLANCO = (255, 255, 255, 255)


def dibujar(tam: int, ocupa: float) -> Image.Image:
    """Cuadrado blanco de `tam` px con el logo ocupando `ocupa` del lado (sin transparencia: iOS la pinta de negro)."""
    img = Image.new("RGBA", (tam, tam), BLANCO)
    lado = round(tam * ocupa)
    escala = lado / max(LOGO.size)
    logo = LOGO.resize((round(LOGO.width * escala), round(LOGO.height * escala)), Image.LANCZOS)
    img.alpha_composite(logo, ((tam - logo.width) // 2, (tam - logo.height) // 2))
    return img.convert("RGB")


PUBLIC.mkdir(exist_ok=True)
dibujar(512, 0.92).save(PUBLIC / "icon-512.png")
dibujar(192, 0.92).save(PUBLIC / "icon-192.png")
dibujar(512, 0.72).save(PUBLIC / "icon-maskable-512.png")
dibujar(180, 0.94).save(PUBLIC / "apple-touch-icon.png")
dibujar(64, 0.96).save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
print("iconos listos en", PUBLIC)
