# Leaf Café — Web Development Portfolio Demo

A polished, bilingual, responsive **fictional café** website. This is a standalone frontend demonstration built for a Fastwork Web Development portfolio, **not** a real café or a completed client engagement.

## Features

- Responsive landing page for desktop, tablet and mobile
- Thai/English language toggle (saves only language preference in `localStorage`)
- Filterable menu with six fictional products
- Interactive sample selection bag with add/remove and totals; **no checkout or payment**
- Accessible mobile navigation and keyboard-friendly side drawer
- Frontend-only contact form with validation and **no network submission or server storage**
- Eight original vector illustrations saved in `assets/` (no photo licensing required)
- No JavaScript framework or third-party runtime dependencies

## Run locally

**Option A — double-click `index.html` or the self-contained `leaf-cafe-standalone.html`.** Both run in modern browsers; the standalone version needs no other files.

**Option B — VS Code Live Server.** Open this folder and choose “Open with Live Server”.

**Option C — Python.** From inside this folder:

```shell
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## Tests

The test script `tests/smoke.spec.py` uses Python Playwright to test the self-contained HTML demo. It requires the Playwright Python package and Chrome (or Chromium) but does **not** need a web server. Start with the built-in dependency-free code check:

```shell
npm run check
```

For optional browser interactions and fresh screenshots:

```shell
python tests/smoke.spec.py
```

If Python Playwright is unavailable, open the site normally and test it through your existing Claude Code + Playwright MCP instead. Use a project-local virtual environment for any Python test dependencies.

## Suggested Windows placement

Copy the project folder to:

`C:\fastwork\projects\leaf-cafe\`

Open **that folder by itself** in VS Code, then run `git init`. Keep it separate from your reusable templates.

## Before publishing

- Review responsive views at 375, 768, and 1440 px.
- Use an actual screenshot taken from the functioning site for your Fastwork portfolio.
- Clearly label it **“Demo project / Concept website”**, not “client work.”
- For real client use, replace all fictional copy, sample products/prices and illustrated imagery as needed.
- The demo form currently does **not** send any data. Wire it to a backend only with explicit scope and privacy protections.

## Licensing and dependencies

The original SVG illustrations and website code were created specifically for this portfolio demo. The optional Google Fonts CSS import loads external font files from Google when online; the site uses local font fallbacks when offline. Remove this import if client requirements prohibit third-party font requests.

## Deployment

Deploy as a **static website** using GitHub Pages, Netlify, or Vercel. There is no build step. Connect the repository or upload the folder, and point the host at `index.html`.

A public live URL cannot be created from this offline artifact alone; deployment must be done from your own account or authorized hosting workflow.
