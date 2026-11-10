"""Build leaf-cafe-standalone.html: one offline file with CSS, JS and SVGs inlined.

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


def data_uri(path: Path) -> str:
    return "data:image/svg+xml;base64," + base64.b64encode(path.read_bytes()).decode()


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

    assets = sorted((ROOT / "assets").glob("*.svg"))
    for asset in assets:
        html = html.replace(f"assets/{asset.name}", data_uri(asset))
    menu_images = {a.name: data_uri(a) for a in assets if a.name.startswith("menu-")}

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
