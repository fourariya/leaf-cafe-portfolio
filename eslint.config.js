import js from "@eslint/js";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  // Generated output and third-party code (the Python venv vendors some JS).
  globalIgnores([
    "dist",
    "coverage",
    "output",
    ".venv",
    ".playwright-mcp",
    "leaf-cafe-standalone.html",
  ]),
  js.configs.recommended,
  {
    rules: {
      eqeqeq: "error",
      "no-var": "error",
      "prefer-const": "error",
      "no-self-compare": "error",
    },
  },
  {
    // Classic browser scripts (not modules) so the page also opens from file://
    files: ["src/**/*.js"],
    languageOptions: { sourceType: "script", globals: globals.browser },
  },
  {
    files: ["tests/**/*.js", "tools/**/*.mjs", "*.config.js"],
    languageOptions: { globals: globals.node },
  },
]);
