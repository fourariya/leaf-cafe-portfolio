"""Capture the menu and contact section screenshots from the standalone demo.

Needs the same setup as tests/smoke.spec.py (project venv + Python Playwright).
Run: `python tests/capture_gallery.py`  (writes screenshots/leaf-cafe-menu.png and -contact.png)
"""

from pathlib import Path

from playwright.sync_api import Error as PlaywrightError
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
HTML = (ROOT / "leaf-cafe-standalone.html").read_text(encoding="utf-8")
OUT = ROOT / "screenshots"
OUT.mkdir(exist_ok=True)


def launch(p):
    for channel in ("chrome", "msedge", None):
        try:
            return p.chromium.launch(headless=True, channel=channel)
        except PlaywrightError:
            continue
    raise SystemExit("No Chromium-based browser found.")


with sync_playwright() as p:
    browser = launch(p)
    page = browser.new_page(viewport={"width": 1440, "height": 900}, device_scale_factor=2)
    page.goto("about:blank")
    page.set_content(HTML, wait_until="domcontentloaded")
    page.locator(".product-card").first.wait_for()
    page.locator("#menu").screenshot(path=str(OUT / "leaf-cafe-menu.png"), animations="disabled")
    page.locator("#contact").screenshot(path=str(OUT / "leaf-cafe-contact.png"), animations="disabled")
    browser.close()
print("menu & contact images generated")
