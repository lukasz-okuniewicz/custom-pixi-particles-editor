/**
 * One-off: node src/components/properties/codemodBehaviourFieldHints.cjs
 * Replaces InputNumber/Checkbox/InputString/ColorPicker with Bf* wrappers.
 */
const fs = require("fs");
const path = require("path");

const BEHAVIOURS_DIR = path.join(__dirname, "behaviours");

function processStandardFile(filePath) {
  let c = fs.readFileSync(filePath, "utf8");
  if (c.includes("BfInputNumber")) return false;

  const had = {
    InputNumber: /<InputNumber[\s/>]/.test(c),
    Checkbox: /<Checkbox[\s/>]/.test(c),
    InputString: /<InputString[\s/>]/.test(c),
    ColorPicker: /<ColorPicker[\s/>]/.test(c),
  };
  if (!had.InputNumber && !had.Checkbox && !had.InputString && !had.ColorPicker)
    return false;

  c = c.replace(/<InputNumber\b/g, "<BfInputNumber");
  c = c.replace(/<Checkbox\b/g, "<BfCheckbox");
  c = c.replace(/<InputString\b/g, "<BfInputString");
  c = c.replace(/<ColorPicker\b/g, "<BfColorPicker");

  c = c.replace(
    /^import InputNumber from "@components\/html\/InputNumber";\r?\n/m,
    "",
  );
  c = c.replace(
    /^import Checkbox from "@components\/html\/Checkbox";\r?\n/m,
    "",
  );
  c = c.replace(
    /^import InputString from "@components\/html\/InputString";\r?\n/m,
    "",
  );
  c = c.replace(
    /^import ColorPicker from "@components\/html\/ColorPicker";\r?\n/m,
    "",
  );

  const needed = [];
  if (had.InputNumber) needed.push("BfInputNumber");
  if (had.Checkbox) needed.push("BfCheckbox");
  if (had.InputString) needed.push("BfInputString");
  if (had.ColorPicker) needed.push("BfColorPicker");

  const importLine = `import {\n  ${needed.join(",\n  ")},\n} from "@components/properties/BehaviourFieldWrappers";\n`;
  const useClient = /^"use client";\r?\n\r?\n/;
  if (useClient.test(c)) {
    c = c.replace(useClient, `"use client";\n\n${importLine}`);
  } else {
    c = importLine + c;
  }

  fs.writeFileSync(filePath, c, "utf8");
  return true;
}

function main() {
  const files = fs.readdirSync(BEHAVIOURS_DIR);
  let n = 0;
  for (const name of files) {
    if (!name.endsWith(".js")) continue;
    if (name === "RecursiveFireworkProperties.js") continue;
    if (name === "recursiveFireworkPropertyHints.js") continue;
    if (name.startsWith("generate")) continue;
    const p = path.join(BEHAVIOURS_DIR, name);
    if (processStandardFile(p)) {
      console.log("updated", name);
      n++;
    }
  }
  console.log(`Done (${n} files).`);
}

main();
