// Static checks on the shipped files: structure, bilingual completeness, demo-only behavior.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { loadScripts, root } from "./load-scripts.js";

const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const html = read("index.html");
const main = read("src/main.js");
const css = read("src/styles.css");
const { LeafContent } = loadScripts("content.js");
const { copy, products } = LeafContent;

test("page has Thai default language and the key interactive regions", () => {
  assert.match(html, /<html lang="th">/);
  for (const id of [
    "contact-form",
    "bag-open",
    "bag-drawer",
    "product-grid",
    "menu-toggle",
    "mobile-nav",
  ]) {
    assert.match(html, new RegExp(`id="${id}"`), `#${id} missing`);
  }
  assert.match(html, /data-lang="th"/);
  assert.match(html, /data-lang="en"/);
});

test("Thai and English dictionaries have exactly the same keys", () => {
  const th = Object.keys(copy.th).sort();
  const en = Object.keys(copy.en).sort();
  assert.deepEqual(
    th.filter((k) => !en.includes(k)),
    [],
    "keys only in th",
  );
  assert.deepEqual(
    en.filter((k) => !th.includes(k)),
    [],
    "keys only in en",
  );
});

test("every data-i18n key used in index.html exists in the dictionary", () => {
  const used = [
    ...html.matchAll(/data-i18n(?:-placeholder|-alt|-label)?="([^"]+)"/g),
  ].map((m) => m[1]);
  assert.ok(used.length > 40, "expected many translated nodes");
  const missing = [...new Set(used)].filter(
    (key) => !Object.hasOwn(copy.th, key),
  );
  assert.deepEqual(missing, []);
});

test("data-i18n elements hold plain text only (translation must not wipe markup)", () => {
  const offenders = [];
  for (const match of html.matchAll(
    /<(\w+)\b[^>]*\sdata-i18n="([^"]+)"[^>]*>([\s\S]*?)<\/\1\s*>/g,
  )) {
    if (match[3].includes("<")) offenders.push(match[2]);
  }
  assert.deepEqual(offenders, []);
});

test("products are complete in both languages and their images exist", () => {
  assert.equal(products.length, 6);
  for (const p of products) {
    assert.ok(
      p.th.name && p.th.desc && p.en.name && p.en.desc,
      `${p.id} copy incomplete`,
    );
    assert.ok(Number.isInteger(p.price) && p.price > 0, `${p.id} price`);
    assert.ok(
      fs.existsSync(path.join(root, "assets", p.image)),
      `${p.image} missing`,
    );
  }
});

test("all assets referenced by index.html exist", () => {
  const refs = [
    ...html.matchAll(/(?:src|href)="((?:assets|src)\/[^"]+)"/g),
  ].map((m) => m[1]);
  for (const ref of refs)
    assert.ok(fs.existsSync(path.join(root, ref)), `${ref} missing`);
});

test("demo form and bag never make network requests", () => {
  for (const file of ["src/main.js", "src/logic.js", "src/content.js"]) {
    const code = read(file);
    assert.doesNotMatch(
      code,
      /\bfetch\s*\(|XMLHttpRequest|sendBeacon|WebSocket|\.submit\(\)/,
      file,
    );
  }
  assert.match(main, /event\.preventDefault\(\)/);
  assert.match(
    html,
    /form-action 'none'/,
    "CSP blocks form submission even without JS",
  );
  assert.match(html, /connect-src 'none'/);
});

test("only the language preference is stored in the browser", () => {
  const writes = [...main.matchAll(/localStorage\.setItem\(([^,]+),/g)].map(
    (m) => m[1].trim(),
  );
  assert.deepEqual(writes, ["LANG_STORAGE_KEY"]);
  assert.match(main, /LANG_STORAGE_KEY = "leaf-cafe-lang"/);
});

test("CSS keeps responsive breakpoints and reduced-motion support", () => {
  for (const bp of [
    "max-width: 940px",
    "max-width: 700px",
    "max-width: 360px",
  ]) {
    assert.ok(css.includes(`@media (${bp})`), bp);
  }
  assert.match(css, /prefers-reduced-motion: reduce/);
});

// Regression guards for the bag-close scroll jump. Browser behaviour is covered by
// tests/smoke.spec.py (test_bag_scroll_stability); these catch the fix being removed.
test("closing the bag restores focus without scrolling the page", () => {
  assert.match(
    main,
    /focusBeforeBag\.focus\(\{\s*preventScroll:\s*true\s*\}\)/,
    "focus() on the sticky-header trigger must use preventScroll",
  );
  assert.match(
    css,
    /html\s*\{[^}]*scrollbar-gutter:\s*stable/,
    "scrollbar-gutter keeps layout width when the bag locks scrolling",
  );
});

// Thai headings must not inherit the negative tracking used for Latin display text.
test("Thai display headings reset letter-spacing", () => {
  const thHero = css.match(/:lang\(th\) \.hero h1 \{[^}]*\}/);
  const thH2 = css.match(/:lang\(th\) \.contact-copy h2 \{[^}]*\}/);
  assert.ok(thHero && /letter-spacing:\s*0;/.test(thHero[0]), "hero h1");
  assert.ok(thH2 && /letter-spacing:\s*0;/.test(thH2[0]), "section h2");
  // These rules must come after the Latin rules they override (same cascade layer).
  assert.ok(css.indexOf(":lang(th) .hero h1 {") > css.indexOf(".hero h1 {"));
  assert.ok(
    css.indexOf(":lang(th) .section-heading h2,") >
      css.indexOf(".section-heading h2,"),
  );
});

test("every menu photo is a local WebP with a documented credit", () => {
  const credits = read("assets/photos/CREDITS.md");
  for (const p of products) {
    assert.match(p.image, /^photos\/menu-[a-z]+\.webp$/, `${p.id} image path`);
    const file = p.image.split("/")[1];
    assert.ok(
      credits.includes(`\`${file}\``),
      `${file} missing from CREDITS.md`,
    );
  }
  assert.match(credits, /pexels\.com\/license/);
  // Stock photos must not be presented as the café's real products.
  assert.match(copy.th.menuFootnote, /ภาพสต็อก/);
  assert.match(copy.en.menuFootnote, /stock images, not real products/);
});

// Social crawlers (Facebook, LINE, X) ignore relative image URLs.
test("social preview metadata uses absolute HTTPS URLs", () => {
  const attr = (pattern) => html.match(pattern)?.[1];
  const ogImage = attr(/property="og:image"\s+content="([^"]+)"/);
  const twImage = attr(/name="twitter:image"\s+content="([^"]+)"/);
  const ogUrl = attr(/property="og:url"\s+content="([^"]+)"/);
  const canonical = attr(/rel="canonical"\s+href="([^"]+)"/);
  for (const [name, value] of Object.entries({
    ogImage,
    twImage,
    ogUrl,
    canonical,
  })) {
    assert.match(
      value ?? "",
      /^https:\/\//,
      `${name} must be an absolute https URL`,
    );
  }
  assert.ok(ogImage.endsWith("/assets/og-image.png"));
  assert.equal(twImage, ogImage);
  assert.equal(ogUrl, canonical);
  assert.ok(fs.existsSync(path.join(root, "assets", "og-image.png")));
});

test("Netlify _headers ships security headers and is copied by the build", () => {
  const headers = read("_headers");
  assert.match(headers, /^\/\*$/m, "rules apply to every path");
  for (const rule of [
    /X-Content-Type-Options: nosniff/,
    /X-Frame-Options: DENY/,
    /Referrer-Policy: strict-origin-when-cross-origin/,
    /Content-Security-Policy: .*frame-ancestors 'none'/,
  ]) {
    assert.match(headers, rule);
  }
  // The header CSP must not be looser than the <meta> CSP in index.html.
  const metaCsp = html.match(
    /http-equiv="Content-Security-Policy"\s+content="([^"]+)"/,
  )[1];
  const headerCsp = headers.match(/Content-Security-Policy: (.+)/)[1];
  for (const directive of metaCsp.split(";").map((d) => d.trim())) {
    assert.ok(
      headerCsp.includes(directive),
      `header CSP missing: ${directive}`,
    );
  }
  assert.match(read("tools/build.mjs"), /"_headers"/);
});

test("demo disclosure stays visible in both languages", () => {
  assert.match(copy.th.menuFootnote, /สมมติ/);
  assert.match(copy.en.menuFootnote, /fictional/i);
  assert.match(copy.th.bagNote, /ยังไม่รองรับการสั่งซื้อ/);
  assert.match(copy.en.formNote, /No message is sent/);
});
