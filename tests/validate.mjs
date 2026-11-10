import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(root, 'index.html'),'utf8');
const script = fs.readFileSync(path.join(root, 'script.js'),'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'),'utf8');
const assets = fs.readdirSync(path.join(root,'assets'));
assert.match(html, /lang="th"/);
assert.match(html, /id="lang-toggle"/);
assert.match(html, /id="contact-form"/);
assert.match(html, /id="bag-open"/);
assert.match(html, /id="product-grid"/);
assert.match(script, /const copy = \{\s*th:/);
assert.match(script, /en: \{/);
assert.match(script, /event\.preventDefault\(\)/);
assert.match(script, /localStorage\.setItem\('leaf-cafe-lang'/);
assert.match(css, /@media\(max-width:700px\)/);
assert.equal(assets.filter((x)=>x.endsWith('.svg')).length,9);
for(const filename of ['hero-matcha.svg','cafe-interior.svg','menu-matcha.svg','menu-strawberry.svg','menu-coffee.svg','menu-cheesecake.svg','menu-croissant.svg','menu-cookies.svg']){
 assert(fs.existsSync(path.join(root,'assets',filename)), `${filename} is missing`);
}
console.log('PASS: static structure, bilingual wiring, demo form, CSS responsiveness and 9 SVG assets (8 illustrations + favicon)');
