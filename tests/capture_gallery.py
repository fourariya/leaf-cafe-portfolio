"""Capture menu and contact screenshots from the standalone demo."""
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parent.parent
HTML=(ROOT/'leaf-cafe-standalone.html').read_text(encoding='utf-8')
OUT=ROOT/'screenshots';OUT.mkdir(exist_ok=True)
with sync_playwright() as p:
  chromium=Path('/usr/bin/chromium')
  browser=p.chromium.launch(headless=True,executable_path=str(chromium) if chromium.exists() else None,channel=None if chromium.exists() else 'chrome',args=['--no-sandbox'] if chromium.exists() else [])
  page=browser.new_page(viewport={'width':1440,'height':900},device_scale_factor=1)
  page.goto('about:blank');page.set_content(HTML,wait_until='domcontentloaded')
  page.locator('.product-card').first.wait_for()
  page.locator('#menu').screenshot(path=str(OUT/'leaf-cafe-menu.png'),animations='disabled')
  page.locator('#contact').screenshot(path=str(OUT/'leaf-cafe-contact.png'),animations='disabled')
  browser.close()
print('menu & contact images generated')
