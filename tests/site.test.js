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

test("demo disclosure stays visible in both languages", () => {
  assert.match(copy.th.menuFootnote, /สมมติ/);
  assert.match(copy.en.menuFootnote, /fictional/i);
  assert.match(copy.th.bagNote, /ยังไม่รองรับการสั่งซื้อ/);
  assert.match(copy.en.formNote, /No message is sent/);
});
