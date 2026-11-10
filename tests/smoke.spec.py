"""Browser smoke tests for the offline single-file demo (Python Playwright).

Needs: a project-local venv with `pip install playwright`, plus Chrome or Edge
installed (or `python -m playwright install chromium`).
Rebuild the standalone file first: `python tools/build_standalone.py`.
Run: `python tests/smoke.spec.py`
Debug screenshots go to output/smoke/ (gitignored) so the curated
portfolio images in screenshots/ are never overwritten by a test run.
"""

from pathlib import Path

from playwright.sync_api import Error as PlaywrightError
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
HTML = (ROOT / "leaf-cafe-standalone.html").read_text(encoding="utf-8")
OUT = ROOT / "output" / "smoke"
OUT.mkdir(parents=True, exist_ok=True)

NO_OVERFLOW = "document.documentElement.scrollWidth <= document.documentElement.clientWidth"


def open_page(browser, **viewport):
    page = browser.new_page(**viewport)
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.goto("about:blank")
    page.set_content(HTML, wait_until="domcontentloaded")
    page.locator(".product-card").first.wait_for()
    return page, errors


def test_desktop(browser):
    page, errors = open_page(browser, viewport={"width": 1440, "height": 900})
    cards = page.locator(".product-card")
    assert cards.count() == 6
    assert page.locator("html").get_attribute("lang") == "th"

    # Menu filters
    page.locator('[data-filter="dessert"]').click()
    assert cards.count() == 3
    page.locator('[data-filter="drink"]').click()
    assert cards.count() == 3
    page.locator('[data-filter="all"]').click()
    assert cards.count() == 6

    # Demo bag: add, change quantity, remove, totals, Escape
    page.locator(".product-card .add-button").first.click()
    assert page.locator("#bag-count").inner_text() == "1"
    page.locator("#bag-open").click()
    assert page.locator("#bag-drawer").get_attribute("aria-hidden") == "false"
    assert page.locator("#bag-total").inner_text() == "฿135"
    page.locator('[data-focus-key="matcha:inc"]').click()
    assert page.locator("#bag-total").inner_text() == "฿270"
    page.locator(".bag-remove").click()
    assert page.locator("#bag-total").inner_text() == "฿0"
    page.keyboard.press("Escape")
    assert page.locator("#bag-drawer").get_attribute("aria-hidden") == "true"

    # Language switch (TH <-> EN segmented buttons)
    page.locator('[data-lang="en"]').click()
    assert page.locator("html").get_attribute("lang") == "en"
    assert page.get_by_text("See the full menu").is_visible()
    assert cards.count() == 6
    page.locator('[data-lang="th"]').click()
    assert page.locator("html").get_attribute("lang") == "th"

    # Contact form: per-field errors, then a demo-only success with no submission
    submit = page.locator('#contact-form button[type="submit"]')
    page.locator("#form-name").fill("A")
    page.locator("#form-email").fill("wrong")
    page.locator("#form-message").fill("short")
    submit.click()
    assert "กรุณา" in page.locator("#form-feedback").inner_text()
    assert page.locator("#form-email").get_attribute("aria-invalid") == "true"
    assert page.locator(".field-error:not([hidden])").count() == 3
    page.locator("#form-name").fill("Demo Customer")
    page.locator("#form-email").fill("demo@example.com")
    page.locator("#form-message").fill("This is only a demo contact message.")
    submit.click()
    assert "ไม่มีข้อมูล" in page.locator("#form-feedback").inner_text()
    assert page.locator("#form-name").input_value() == ""

    assert page.evaluate(NO_OVERFLOW), "Desktop horizontal overflow"
    page.screenshot(path=str(OUT / "desktop.png"), animations="disabled")
    assert not errors, errors
    page.close()


def test_mobile(browser):
    page, errors = open_page(
        browser,
        viewport={"width": 390, "height": 844},
        is_mobile=True,
        has_touch=True,
    )
    assert page.locator(".product-card").count() == 6
    assert page.evaluate(NO_OVERFLOW), "Mobile horizontal overflow"

    toggle = page.locator("#menu-toggle")
    toggle.click()
    assert toggle.get_attribute("aria-expanded") == "true"
    assert page.locator("#mobile-nav").is_visible()
    page.locator("#mobile-nav a").first.click()
    assert page.locator("#mobile-nav").is_hidden()

    page.locator("#bag-open").click()
    assert page.locator("#bag-drawer").get_attribute("aria-hidden") == "false"
    page.keyboard.press("Escape")
    assert page.locator("#bag-drawer").get_attribute("aria-hidden") == "true"

    page.screenshot(path=str(OUT / "mobile.png"), animations="disabled")
    assert not errors, errors
    page.close()


def test_bag_scroll_stability(browser):
    """Regression: closing the bag must not move the page (was a 458px jump).

    Uses real mouse clicks at coordinates, because locator.click() scrolls the
    target into view first and would hide the bug.
    """
    for width, height in ((375, 812), (768, 1024), (1440, 900)):
        for method in ("x", "escape", "backdrop", "continue"):
            page, errors = open_page(browser, viewport={"width": width, "height": height})
            page.evaluate(
                "() => { const c = document.querySelectorAll('.product-card')[3];"
                " window.scrollTo({ top: c.getBoundingClientRect().top + scrollY - 200, behavior: 'instant' }); }"
            )
            page.wait_for_timeout(300)
            start = page.evaluate("scrollY")
            for _ in range(5):
                if method == "continue":
                    page.evaluate(f"window.scrollTo({{ top: {start}, behavior: 'instant' }})")
                    page.wait_for_timeout(150)
                before = page.evaluate("scrollY")
                click_center(page, "#bag-open")
                page.wait_for_timeout(400)
                assert page.locator("#bag-drawer").get_attribute("aria-hidden") == "false"
                if method == "x":
                    click_center(page, "#bag-close")
                elif method == "escape":
                    page.keyboard.press("Escape")
                elif method == "continue":
                    click_center(page, "#bag-continue")
                else:
                    drawer = page.locator("#bag-drawer").bounding_box()
                    if drawer["x"] < 40:  # full-width drawer on phones: no backdrop to click
                        page.keyboard.press("Escape")
                    else:
                        page.mouse.click(drawer["x"] / 2, height / 2)
                page.wait_for_timeout(1300)
                assert page.locator("#bag-drawer").get_attribute("aria-hidden") == "true"
                assert not page.evaluate("document.body.classList.contains('no-scroll')")
                after = page.evaluate("scrollY")
                if method == "continue":
                    menu_top = page.evaluate("document.getElementById('menu').getBoundingClientRect().top")
                    assert 0 <= menu_top <= 120, f"{width}px continue: menu top {menu_top}"
                else:
                    assert abs(after - before) <= 1, f"{width}px {method}: moved {after - before}px"
                    assert abs(after - start) <= 1, f"{width}px {method}: drifted {after - start}px"
                    assert page.evaluate("document.activeElement.id") == "bag-open"
            assert not errors, errors
            page.close()


def click_center(page, selector):
    box = page.locator(selector).bounding_box()
    page.mouse.click(box["x"] + box["width"] / 2, box["y"] + box["height"] / 2)


def launch(p):
    """Prefer an installed Chrome/Edge; fall back to Playwright's own Chromium."""
    for channel in ("chrome", "msedge", None):
        try:
            return p.chromium.launch(headless=True, channel=channel)
        except PlaywrightError:
            continue
    raise SystemExit("No Chromium-based browser found. Install Chrome/Edge or run: python -m playwright install chromium")


if __name__ == "__main__":
    with sync_playwright() as p:
        browser = launch(p)
        test_desktop(browser)
        print("PASS: desktop filters, bag, language, form validation, overflow and JS errors")
        test_mobile(browser)
        print("PASS: mobile navigation, drawer, overflow and JS errors")
        test_bag_scroll_stability(browser)
        print("PASS: bag close keeps scroll position (X / Esc / backdrop) and continue goes to the menu")
        browser.close()
