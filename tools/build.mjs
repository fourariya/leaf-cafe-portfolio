// Copies only the files the website needs into dist/ for static hosting.
// No bundling or minifying: the deployed source stays readable on purpose.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

const ENTRIES = [
  "index.html",
  "_headers", // Netlify security headers

  "src/styles.css",
  "src/content.js",
  "src/logic.js",
  "src/main.js",
  "assets",
];

// dist/ is generated output (gitignored); rebuild it from scratch every time.
fs.rmSync(dist, { recursive: true, force: true });

let files = 0;
for (const entry of ENTRIES) {
  const from = path.join(root, entry);
  if (!fs.existsSync(from)) throw new Error(`Missing build input: ${entry}`);
  fs.cpSync(from, path.join(dist, entry), { recursive: true });
  files += fs.statSync(from).isDirectory() ? fs.readdirSync(from).length : 1;
}

console.log(`Built dist/ with ${files} files.`);
