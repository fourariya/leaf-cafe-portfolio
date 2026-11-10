# Leaf Café — verified checks (2026-11-10, Windows 11)

This file records only what was **actually run** on the current source. Re-run the checks after any change.

## Automated checks — PASS

| Check               | Command                                                                   | Result                                                                                 |
| ------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Formatting          | `npm run format:check`                                                    | All matched files use Prettier code style                                              |
| Lint                | `npm run lint`                                                            | 0 problems                                                                             |
| Unit + static tests | `npm test`                                                                | 20 / 20 pass                                                                           |
| All of the above    | `npm run check`                                                           | exit code 0                                                                            |
| Test sensitivity    | mutation run on a temp copy with `<b>` injected into a translated element | the markup test failed as expected (`heroLine3`); the original file hash was unchanged |
| Production build    | `npm run build`                                                           | `dist/` with 15 files (index.html, src/, assets/)                                      |
| Standalone build    | `python tools/build_standalone.py`                                        | `leaf-cafe-standalone.html`, 116,600 bytes, no external requests                       |

## Browser checks (Playwright, Chromium) — PASS

Run against three targets: the source site, the built `dist/` folder, and `leaf-cafe-standalone.html`.

- **Functional suite at 375, 768 and 1440 px:** 225 of 225 checks passed. It covers the skip link, the image loading, the nav links, the mobile menu (open, Esc, focus return), back to top, the filters (3/3/6 plus the screen-reader status), the bag (badge, toast, drawer focus, + / − / remove totals, focus trap, Esc), TH/EN switching with the choice saved across a reload, the form (field errors, `aria-invalid`, focus on the first error, success, reset, zero network requests), overflow after interactions, and console errors or failed requests (0).
- **Horizontal overflow at 320, 375, 768, 1024, 1440 and 1920 px:** none on any target.
- **Accessibility basics (375 and 1440 px, TH and EN):**
  - Text contrast: AA on all text. The only exception is the "." in the logo, which counts as part of the logotype.
  - Controls are 24×24 px or larger. The smallest are the TH/EN buttons at 34–40 × 36 px.
  - Structure: no text under 12 px, one `h1`, no skipped heading levels, every control has a name, every field has a label, every image has `alt`, and the header, nav, main and footer landmarks are present.
  - Focus ring: 3 px solid `#3f6b2f`.
  - Reduced motion: smooth scroll and transitions are turned off.
- **Content-Security-Policy is enforced:** the browser blocked an injected inline style on the source site.

## NOT VERIFIED

- `python tests/smoke.spec.py` and `python tests/capture_gallery.py`. Selectors are updated and the syntax parses, but Python Playwright is not installed in the project venv. The same flows were covered by the Playwright checks above.
- Safari, Firefox and real phones. Only Chromium (desktop and emulated mobile) was tested.
- A formal accessibility audit with assistive technology. No screen reader was used.
- Any public deployment. Nothing has been deployed yet.

## Known limitations

- The ticker band is static. It is wider than small screens on purpose, so its text runs off the right edge.
- The bag and the contact form are demos only. Nothing is ordered, paid, sent or stored.
