# Leaf Café — verified checks (2026-11-10, Windows 11)

This file records only what was **actually run** on the current source. Re-run the checks after any change.

## Automated checks — PASS

| Check                                    | Command                                                                                      | Result                                                                                         |
| ---------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Formatting                               | `npm run format:check`                                                                       | All matched files use Prettier code style                                                      |
| Lint                                     | `npm run lint`                                                                               | 0 problems                                                                                     |
| Unit + static tests                      | `npm test`                                                                                   | 23 / 23 pass                                                                                   |
| All of the above                         | `npm run check`                                                                              | exit code 0                                                                                    |
| Test sensitivity (markup)                | mutation run on a temp copy with `<b>` injected into a translated element                    | failed as expected (`heroLine3`); original unchanged                                           |
| Test sensitivity (scroll, Thai tracking) | temp copies with `preventScroll`, `scrollbar-gutter` or the Thai `letter-spacing: 0` removed | each failed as expected; original hashes unchanged                                             |
| Production build                         | `npm run build`                                                                              | `dist/` with 16 files, including `assets/photos/`                                              |
| Standalone build                         | `python tools/build_standalone.py`                                                           | `leaf-cafe-standalone.html`, about 639 KB, with 6 WebP photos inlined and no external requests |

## Browser checks (Playwright, Chromium) — PASS

Run against three targets: the source site, the built `dist/` folder, and `leaf-cafe-standalone.html`.

- **Functional suite at 375, 768 and 1440 px:** 204 of 204 checks passed (68 per target). Coverage:
  - Menu photos: 6 WebP files at 1000×840 fill the 1.19:1 cards, and the stock-photo note is shown.
  - Thai headings use Kanit with `letter-spacing` 0 and weight 500. English headings keep −0.04em and weight 600.
  - No heading is clipped by an `overflow: hidden` container.
  - Nav links, the mobile menu (Esc returns focus), back to top, and the filters (3/3/6).
  - Bag: the thumbnails show the matching photos, and + / remove update the totals.
  - TH/EN switching, and the language choice persists after a reload.
  - Form validation, success message and reset, with zero network requests.
  - No overflow after interactions. Console errors, warnings and failed requests: 0.
- **Bag close scroll regression:** 4 close methods × 3 widths × 5 repetitions, on all three targets: 33 PASS and 3 N/A.
  - ×, Esc and backdrop: the scroll position changed by 0 px on every close, with 0 px drift after five open/close cycles.
  - Focus returns to the bag button, body scrolling is restored, and the mouse wheel scrolls the page again.
  - "Continue" goes to the menu section on purpose (section top 88–104 px, hash `#menu`).
  - N/A: there is no backdrop at 375 px, because the drawer covers the whole screen.
- **Horizontal overflow and images at 320, 375, 768, 1024, 1440 and 1920 px:** no overflow, and all 8 images decoded on every target.
- **Thai typography:** padded crops at 320, 375, 768 and 1440 px show tone marks and vowels intact, with no collisions or awkward wrapping.
- **Accessibility basics:** measured in the previous round. Text contrast is AA, except the logo "." (logotype exception). Controls are at least 24 px. Landmarks, labels and focus ring are in place. Reduced motion is supported.

## NOT VERIFIED

- `python tests/smoke.spec.py`, including the new `test_bag_scroll_stability`, and `python tests/capture_gallery.py`. The syntax parses, but Python Playwright is not installed in the project venv. The same flows were run through Playwright MCP above.
- Safari, Firefox and real phones. Only Chromium (desktop and emulated mobile) was tested.
- A formal accessibility audit with assistive technology. No screen reader was used.
- Any public deployment. Nothing has been deployed yet.

## Known limitations

- The ticker band is static. It is wider than small screens on purpose, so its text runs off the right edge.
- The bag and the contact form are demos only. Nothing is ordered, paid, sent or stored.
- The menu photos are Pexels stock images used for illustration, credited in `assets/photos/CREDITS.md`. They are not the café's real products, which is fictional anyway.
