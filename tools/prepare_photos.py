"""Crop and convert the menu photos into assets/photos/*.webp.

The source photos are free stock images from Pexels (Pexels License: free for
commercial use, no attribution required). They are illustrative stock photos
for a fictional café, not pictures of real products.

1. Download each source at 1600 px wide into a folder (not committed), named
   <key>.jpg, e.g. matcha.jpg:
   https://images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg?auto=compress&cs=tinysrgb&w=1600
2. Run:  .venv\\Scripts\\python tools\\prepare_photos.py <folder-with-originals>

Every photo gets the same treatment: a 1.19:1 crop (the menu card ratio),
resized to 1000x840, saved as WebP. No colour grading or filters.
"""

import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "photos"
SIZE = (1000, 840)  # 1.19:1, matches .product-media aspect-ratio
QUALITY = 80

# key: (pexels id, photographer, crop width as share of image width, focus x, focus y)
# focus = centre of the crop as a share of width/height, chosen so the food is the subject.
PHOTOS = {
    "matcha": (32972501, "Dicky Agustian", 0.85, 0.50, 0.66),
    "strawberry": (8134134, "Betül Nur", 1.00, 0.50, 0.58),
    "coffee": (11136849, "Federica Gioia", 0.90, 0.55, 0.62),
    "cheesecake": (27569550, "damla selen demir", 1.00, 0.50, 0.66),
    "croissant": (8105045, "solod_sha", 1.00, 0.50, 0.70),
    "cookies": (38594732, "Amine Kübranur Çakıroğlu", 1.00, 0.50, 0.70),
}

# Extra crops of the same originals: output name -> (source key, size, share, focus x, focus y).
# The hero "Signature Matcha" uses the menu's matcha photo in the hero arch (800:860).
EXTRA = {
    "hero-matcha": ("matcha", (1000, 1075), 0.78, 0.50, 0.61),
}


def crop_box(width, height, share, fx, fy, size=SIZE):
    """Largest size-ratio box of the given width share, centred on the focus, kept inside the image."""
    ratio = size[0] / size[1]
    w = width * share
    h = w / ratio
    if h > height:  # very wide source: fit by height instead
        h = height
        w = h * ratio
    left = min(max(fx * width - w / 2, 0), width - w)
    top = min(max(fy * height - h / 2, 0), height - h)
    return tuple(round(v) for v in (left, top, left + w, top + h))


def export(src_dir: Path, key: str, name: str, size, share, fx, fy) -> None:
    src = src_dir / f"{key}.jpg"
    if not src.exists():
        raise SystemExit(f"Missing original: {src}")
    im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    im = im.crop(crop_box(im.width, im.height, share, fx, fy, size))
    im = im.resize(size, Image.Resampling.LANCZOS)
    out = OUT / f"{name}.webp"
    im.save(out, "WEBP", quality=QUALITY, method=6)
    print(f"{out.relative_to(ROOT)}  {out.stat().st_size // 1024} KB")


def main(src_dir: Path) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for key, (_pid, _who, share, fx, fy) in PHOTOS.items():
        export(src_dir, key, f"menu-{key}", SIZE, share, fx, fy)
    for name, (key, size, share, fx, fy) in EXTRA.items():
        export(src_dir, key, name, size, share, fx, fy)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("usage: python tools/prepare_photos.py <folder-with-originals>")
    main(Path(sys.argv[1]))
