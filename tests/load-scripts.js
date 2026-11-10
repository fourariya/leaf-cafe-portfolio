// Loads the browser's classic scripts (src/*.js) into an isolated node:vm context.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

export const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

export function loadScripts(...files) {
  const context = vm.createContext({});
  for (const file of files) {
    const code = fs.readFileSync(path.join(root, "src", file), "utf8");
    vm.runInContext(code, context, { filename: file });
  }
  return context;
}
