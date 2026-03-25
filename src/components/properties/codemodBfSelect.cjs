/**
 * One-off: node src/components/properties/codemodBfSelect.cjs
 */
const fs = require("fs");
const path = require("path");

const BEHAVIOURS_DIR = path.join(__dirname, "behaviours");

function ensureBfSelectImport(c) {
  if (/import\s*\{[^}]*\bBfSelect\b/.test(c)) return c;
  const marker = 'from "@components/properties/BehaviourFieldWrappers"';
  const idx = c.indexOf(marker);
  if (idx === -1) return c;
  const start = c.lastIndexOf("import {", idx);
  if (start === -1) return c;
  const brace = c.indexOf("{", start);
  return `${c.slice(0, brace + 1)}\n  BfSelect,${c.slice(brace + 1)}`;
}

function processFile(filePath) {
  let c = fs.readFileSync(filePath, "utf8");
  if (!c.includes('import Select from "@components/html/Select"')) return false;
  c = c.replace(/^import Select from "@components\/html\/Select";\r?\n/m, "");
  c = c.replace(/<Select\b/g, "<BfSelect");
  if (!c.includes("BehaviourFieldWrappers")) {
    const importLine = `import { BfSelect } from "@components/properties/BehaviourFieldWrappers";\n`;
    if (/^"use client";\r?\n\r?\n/.test(c)) {
      c = c.replace(/^"use client";\r?\n\r?\n/, `"use client";\n\n${importLine}`);
    } else {
      c = importLine + c;
    }
  } else {
    c = ensureBfSelectImport(c);
  }
  fs.writeFileSync(filePath, c, "utf8");
  return true;
}

function main() {
  const files = fs.readdirSync(BEHAVIOURS_DIR);
  let n = 0;
  for (const name of files) {
    if (!name.endsWith(".js")) continue;
    if (name.startsWith("generate")) continue;
    const p = path.join(BEHAVIOURS_DIR, name);
    if (processFile(p)) {
      console.log("updated", name);
      n++;
    }
  }
  console.log(`Done (${n} files).`);
}

main();
