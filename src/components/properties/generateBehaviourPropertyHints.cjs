/**
 * Regenerate: node src/components/properties/generateBehaviourPropertyHints.cjs
 * Merges recursiveFireworkPropertyHints (quality copy) with auto hints for every id="..." in behaviour panels + General Properties.
 */
const fs = require("fs");
const path = require("path");

const BEHAVIOURS_DIR = path.join(__dirname, "behaviours");
const RF_HINTS_FILE = path.join(BEHAVIOURS_DIR, "recursiveFireworkPropertyHints.js");
const OUT = path.join(__dirname, "behaviourPropertyHints.js");

/** Keys not discoverable by scanning (dynamic ids, shared copy). */
const EXTRA_HINTS = {
  "custom-behaviour-raw-json":
    "Raw JSON for this behaviour (must include name and match what BehaviourRegistry expects). Invalid JSON is kept until it parses.",
  "custom-behaviour-enabled":
    "When off, this behaviour is skipped at runtime even though it stays in the config list.",
  "custom-behaviour-priority":
    "Sort order relative to other behaviours (higher typically runs later; exact ordering depends on the engine).",

  "attraction-influence-position":
    "X/Y of the influence center. Use Select Position to pick from the stage, or type coordinates.",
  "attraction-influence-strength":
    "Force at the center: positive pulls particles toward this point, negative pushes them away.",
  "attraction-influence-range":
    "Falloff distance—particles beyond this radius feel much weaker force.",

  "force-field-position":
    "X/Y center of the field (or origin used by the field type).",
  "force-field-radius":
    "Radius of the field’s area of effect.",
  "force-field-strength":
    "How strongly the field accelerates particles (meaning of the sign depends on field type).",
  "force-field-direction":
    "Wind direction as an XY vector (used when Type is wind).",

  "collision-line-point":
    "One endpoint of the collision segment (XY). Two endpoints define a line particles bounce off.",

  "colorCycle-stop-t":
    "Stop position along the cycle from 0 to 1. Keep stops sorted for predictable blending.",
  "colorCycle-stop-color":
    "Color sampled at this stop along the cycle.",

  "color-gradient-stop":
    "Color for this stop in the particle color gradient.",

  "timeline-keyframe-color":
    "Particle color at this timeline keyframe.",

  "temperature-zone-center":
    "X/Y center of this temperature zone.",
  "temperature-zone-radius":
    "Radius of the zone from its center.",
  "temperature-zone-velocity":
    "Velocity modifier (XY) applied to particles inside the zone.",
  "temperature-zone-color":
    "Color associated with this zone for the temperature behaviour.",

  "bezier-p0":
    "Cubic Bézier start anchor (XY) in local space.",
  "bezier-p1":
    "First control point (XY)—pulls the curve from P0.",
  "bezier-p2":
    "Second control point (XY)—pulls the curve toward P3.",
  "bezier-p3":
    "Cubic Bézier end anchor (XY) in local space.",
};

function loadRecursiveFireworkHints() {
  const s = fs.readFileSync(RF_HINTS_FILE, "utf8");
  const marker = "export const RF_PROP_HINTS = ";
  const i = s.indexOf(marker);
  if (i === -1) throw new Error("RF_PROP_HINTS not found in recursiveFireworkPropertyHints.js");
  let rest = s.slice(i + marker.length).trim();
  if (rest.endsWith(";")) rest = rest.slice(0, -1).trim();
  return new Function(`return (${rest})`)();
}

function humanizeId(id) {
  const words = id
    .split(/[-_]/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
  const label = words.join(" ");
  return `${label}. This control configures the value shown in the label above.`;
}

const EXTRA_SCAN_FILES = [path.join(__dirname, "GeneralProperties.js")];

function collectIdsFromDir() {
  const ids = new Set();
  const files = fs.readdirSync(BEHAVIOURS_DIR);
  for (const name of files) {
    if (!name.endsWith(".js")) continue;
    if (name === "recursiveFireworkPropertyHints.js") continue;
    if (name.startsWith("generate")) continue;
    const p = path.join(BEHAVIOURS_DIR, name);
    const fileContent = fs.readFileSync(p, "utf8");
    const re = /\bid="([^"]+)"/g;
    let m;
    while ((m = re.exec(fileContent))) ids.add(m[1]);
  }
  for (const p of EXTRA_SCAN_FILES) {
    if (!fs.existsSync(p)) continue;
    const fileContent = fs.readFileSync(p, "utf8");
    const re = /\bid="([^"]+)"/g;
    let m;
    while ((m = re.exec(fileContent))) ids.add(m[1]);
  }
  return ids;
}

function hintForSelectLabel(label) {
  return `${label}: choose an option for this dropdown; the label above names what it controls.`;
}

/** Labels from <Select … label="…" /> or <BfSelect … /> after codemod. */
function collectSelectLabelsFromDir() {
  const labels = new Set();
  const files = fs.readdirSync(BEHAVIOURS_DIR);
  for (const name of files) {
    if (!name.endsWith(".js")) continue;
    if (name === "recursiveFireworkPropertyHints.js") continue;
    if (name.startsWith("generate")) continue;
    const p = path.join(BEHAVIOURS_DIR, name);
    const fileContent = fs.readFileSync(p, "utf8");
    const re = /<(?:Select|BfSelect)[\s\S]*?label="([^"]+)"/g;
    let m;
    while ((m = re.exec(fileContent))) labels.add(m[1]);
  }
  for (const p of EXTRA_SCAN_FILES) {
    if (!fs.existsSync(p)) continue;
    const fileContent = fs.readFileSync(p, "utf8");
    const re = /<(?:Select|BfSelect)[\s\S]*?label="([^"]+)"/g;
    let m;
    while ((m = re.exec(fileContent))) labels.add(m[1]);
  }
  return labels;
}

function main() {
  const RF_PROP_HINTS = loadRecursiveFireworkHints();
  const scannedIds = collectIdsFromDir();
  const merged = {};

  for (const id of scannedIds) {
    merged[id] =
      RF_PROP_HINTS[id] != null && RF_PROP_HINTS[id] !== ""
        ? RF_PROP_HINTS[id]
        : humanizeId(id);
  }
  for (const id of Object.keys(RF_PROP_HINTS)) {
    merged[id] = RF_PROP_HINTS[id];
  }

  for (const label of collectSelectLabelsFromDir()) {
    const key = `select:${label}`;
    if (merged[key] == null || merged[key] === "") {
      merged[key] = hintForSelectLabel(label);
    }
  }

  for (const [k, v] of Object.entries(EXTRA_HINTS)) {
    merged[k] = v;
  }

  const keys = Object.keys(merged).sort((a, b) => a.localeCompare(b));
  const lines = [
    "/** Auto-generated property hints for behaviour editor tooltips. */",
    "/** Regenerate: node src/components/properties/generateBehaviourPropertyHints.cjs */",
    "",
    "export const PROPERTY_HINTS = {",
  ];
  for (const k of keys) {
    const escaped = JSON.stringify(merged[k]);
    lines.push(`  ${JSON.stringify(k)}: ${escaped},`);
  }
  lines.push("};");
  lines.push("");
  lines.push('export function propertyHint(id) {');
  lines.push('  return PROPERTY_HINTS[id] ?? "";');
  lines.push("}");
  lines.push("");
  fs.writeFileSync(OUT, lines.join("\n"), "utf8");
  console.log(`Wrote ${OUT} (${keys.length} keys)`);
}

main();
