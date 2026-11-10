"""Browser smoke tests for the fully offline single-file demo (Python Playwright)."""
from pathlib import Path
from playwright.sync_api import sync_playwright

HTML=(Path(__file__).resolve().parent.parent / 'leaf-cafe-standalone.html').read_text(encoding='utf-8')
ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT / 'screenshots'
OUT.mkdir(exist_ok=True)

def test_desktop(browser):
    page=browser.new_page(viewport={'width':1440,'height':900},device_scale_factor=1)
    errors=[]
    page.on('pageerror',lambda e: errors.append(str(e)))
    page.goto('about:blank'); page.set_content(HTML, wait_until='domcontentloaded')
    page.locator('.product-card').first.wait_for()
    assert page.locator('.product-card').count()==6
    assert page.locator('html').get_attribute('lang')=='th'
    # Cards filter
    page.locator('[data-filter="dessert"]').click()
    assert page.locator('.product-card').count()==3
    page.locator('[data-filter="drink"]').click()
    assert page.locator('.product-card').count()==3
    page.locator('[data-filter="all"]').click()
    assert page.locator('.product-card').count()==6
    # Menu items can be added, removed, and totaled
    page.locator('.product-card .add-button').first.click()
    assert page.locator('#bag-count').inner_text()=='1'
    page.locator('#bag-open').click()
    assert page.locator('#bag-drawer').get_attribute('aria-hidden')=='false'
    assert page.locator('#bag-total').inner_text()=='฿135'
    page.locator('.bag-remove').click()
    assert page.locator('#bag-total').inner_text()=='฿0'
    page.keyboard.press('Escape')
    assert page.locator('#bag-drawer').get_attribute('aria-hidden')=='true'
    # Language toggle, menu and labels
    page.locator('#lang-toggle').click()
    assert page.locator('html').get_attribute('lang')=='en'
    assert page.get_by_text('Explore our menu').is_visible()
    assert page.locator('.product-card').count()==6
    page.locator('#lang-toggle').click()
    assert page.locator('html').get_attribute('lang')=='th'
    # Contact form validation + deliberate no backend submission
    page.locator('#form-name').fill('A')
    page.locator('#form-email').fill('wrong')
    page.locator('#form-message').fill('short')
    page.locator('#contact-form button[type="submit"]').click()
    assert 'กรุณา' in page.locator('#form-feedback').inner_text()
    page.locator('#form-name').fill('Demo Customer')
    page.locator('#form-email').fill('demo@example.com')
    page.locator('#form-message').fill('This is only a demo contact message.')
    page.locator('#contact-form button[type="submit"]').click()
    assert 'ไม่มีข้อมูล' in page.locator('#form-feedback').inner_text()
    assert page.locator('#form-name').input_value()==''
    assert not errors, errors
    # Fresh page at top for portfolio screenshots
    page.goto('about:blank'); page.set_content(HTML, wait_until='domcontentloaded')
    page.locator('.product-card').first.wait_for()
    page.evaluate('window.scrollTo(0,0)')
    page.screenshot(path=str(OUT/'leaf-cafe-desktop.png'),animations='disabled')
    page.screenshot(path=str(OUT/'leaf-cafe-full-page.png'),full_page=True,animations='disabled')
    assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth'), 'Desktop horizontal overflow'
    page.close()
    return errors

def test_mobile(browser):
    page=browser.new_page(viewport={'width':390,'height':844},device_scale_factor=1,is_mobile=True,has_touch=True)
    errors=[]
    page.on('pageerror',lambda e: errors.append(str(e)))
    page.goto('about:blank'); page.set_content(HTML, wait_until='domcontentloaded')
    page.locator('.product-card').first.wait_for()
    assert page.locator('.product-card').count()==6
    assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth'), f"Mobile overflow {page.evaluate('document.documentElement.scrollWidth')}"
    page.locator('#menu-toggle').click()
    assert page.locator('#menu-toggle').get_attribute('aria-expanded')=='true'
    assert page.locator('#mobile-nav').is_visible()
    page.locator('#mobile-nav a').first.click()
    assert page.locator('#mobile-nav').is_hidden()
    page.locator('#bag-open').click()
    assert page.locator('#bag-drawer').get_attribute('aria-hidden')=='false'
    page.keyboard.press('Escape')
    assert page.locator('#bag-drawer').get_attribute('aria-hidden')=='true'
    page.goto('about:blank'); page.set_content(HTML, wait_until='domcontentloaded')
    page.screenshot(path=str(OUT/'leaf-cafe-mobile.png'),animations='disabled')
    page.screenshot(path=str(OUT/'leaf-cafe-mobile-full.png'),full_page=True,animations='disabled')
    assert not errors, errors
    page.close()

if __name__=='__main__':
    with sync_playwright() as p:
        chromium_path=Path('/usr/bin/chromium')
        if chromium_path.exists():
            browser=p.chromium.launch(headless=True,executable_path=str(chromium_path),args=['--no-sandbox'])
        else:
            browser=p.chromium.launch(headless=True,channel='chrome')
        test_desktop(browser)
        print('PASS: desktop navigation, filtering, cart, language, validation, overflow and JS console')
        test_mobile(browser)
        print('PASS: mobile navigation, modal, overflow and JS console')
        browser.close()
