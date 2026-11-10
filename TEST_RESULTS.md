# Leaf Café — verified checks (2026-11-10)

The website was authored and tested in an isolated container. This report records what was **actually run**, not what is merely expected.

## PASS

- `npm run check` — JavaScript parses; key HTML nodes, bilingual dictionary, demo-only form behavior, responsive CSS and artwork files exist.
- Python Playwright browser smoke test using headless Chromium with the self-contained HTML version:
  - Six products render; filters show 3 drinks and 3 desserts.
  - Sample selection bag supports add, remove, quantity and correct totals; closes on Escape.
  - TH ↔ EN language toggle updates the page, menu item labels and navigation.
  - Demo contact form rejects invalid data, shows an on-page success message for valid data, and does not perform a network submission.
  - Mobile menu opens/closes and navigates to a section.
  - No uncaught JavaScript page errors occurred in the tested paths.
- Layout overflow check passed at viewport widths **320, 375, 390, 768, 1024, 1440 and 1920 px**.
- Screenshots captured from the running self-contained demo, including desktop, mobile, menu, contact, and English hero.

## Not verified / intentionally excluded

- No public deployment/live URL has been made.
- No actual café, order/payment processor, email inbox or backend exists; all business content and prices are fictional.
- No formal third-party accessibility audit or cross-browser Safari/Firefox test was performed.
- The browser test uses the inlined single-file version rather than navigating to a locally served HTTP origin, due to navigation restrictions in the test container. The main multi-file version shares the same HTML, CSS and JS source.
- The optional remote Google Fonts request was disabled in the self-contained version; locally available fallbacks were used for screenshots.

## Local testing on Windows

Open the extracted folder in VS Code and run `npm run check`. Open `index.html` with Live Server and let Claude Code + Playwright MCP test the actual multi-file site under your local HTTP server before publishing. The optional `tests/smoke.spec.py` can run if Python Playwright and Chrome are available.
