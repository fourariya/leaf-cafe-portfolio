"""Build leaf-cafe-standalone.html: one offline file with CSS, JS, SVGs and menu photos inlined.

Run from anywhere:  python tools/build_standalone.py
The standalone copy is for double-click previews and email attachments only.
Deploy the normal multi-file site (npm run build -> dist/) to hosting.
"""

import base64
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SCRIPTS = ["content.js", "logic.js", "main.js"]


MIME = {".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png"}


def data_uri(path: Path) -> str:
    return f"data:{MIME[path.suffix]};base64," + base64.b64encode(path.read_bytes()).decode()


def main() -> None:
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    css = (ROOT / "src" / "styles.css").read_text(encoding="utf-8")

    # Inline scripts would be blocked by the CSP, and web fonts need a network.
    html = re.sub(r'\s*<meta\s+http-equiv="Content-Security-Policy"[^>]*/>', "", html)
    html = re.sub(r'\s*<link rel="preconnect"[^>]*/>', "", html)
    html = re.sub(r'\s*<link\s+rel="stylesheet"\s+href="https://fonts[^>]*/>', "", html)

    html = html.replace('<link rel="stylesheet" href="src/styles.css" />', f"<style>\n{css}\n</style>")
    for name in SCRIPTS:
        html = html.replace(f'<script src="src/{name}" defer></script>', "")

    # Illustrations referenced directly in index.html.
    for asset in sorted((ROOT / "assets").glob("*.svg")):
        html = html.replace(f"assets/{asset.name}", data_uri(asset))
    # Menu photos are set from src/content.js ("photos/<file>"); main.js reads this map.
    photos = sorted((ROOT / "assets" / "photos").glob("*.webp"))
    if not photos:
        raise SystemExit("No menu photos in assets/photos; run tools/prepare_photos.py first.")
    menu_images = {f"photos/{p.name}": data_uri(p) for p in photos}
    # Photos referenced directly in index.html (the hero image).
    for p in photos:
        html = html.replace(f'src="assets/photos/{p.name}"', f'src="{data_uri(p)}"')
    if 'src="assets/' in html:
        raise SystemExit("An assets/ image in index.html was not inlined.")

    inline = [f"<script>window.__LEAF_ASSETS__ = {json.dumps(menu_images)};</script>"]
    inline += [f"<script>\n{(ROOT / 'src' / n).read_text(encoding='utf-8')}\n</script>" for n in SCRIPTS]
    html = html.replace("</body>", "\n".join(inline) + "\n</body>")

    if "src/" in re.sub(r"<script>[\s\S]*?</script>", "", html):
        raise SystemExit("A src/ reference was not inlined; check index.html markup.")

    out = ROOT / "leaf-cafe-standalone.html"
    out.write_text(html, encoding="utf-8", newline="\n")
    print(f"standalone generated: {out.name} ({out.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
