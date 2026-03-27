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

function splitCamelCase(text) {
  return String(text)
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");
}

function titleFromToken(token) {
  return splitCamelCase(token)
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

const PREFIX_LABEL_OVERRIDES = {
  tempSim: "Temperature Simulation",
  glitchBh: "Glitch Behaviour",
  bpl: "Beat Phase Lock",
  dfr: "Damage Flash Ripple",
  eal: "Emitter Attractor Link",
  rvo: "RVO Avoidance",
  ssfm: "Screen Space Flow Map",
  boids: "Boids Flocking",
  flowField: "Flow Field Drift",
  predatorPrey: "Predator Prey",
  colorCycle: "Color Cycle",
  temp: "Temperature",
};

function normalizePrefixLabel(prefixRaw) {
  const trimmed = String(prefixRaw || "").trim();
  if (!trimmed) return "";
  if (PREFIX_LABEL_OVERRIDES[trimmed]) return PREFIX_LABEL_OVERRIDES[trimmed];

  return titleFromToken(trimmed)
    .replace(/\bXy\b/g, "XY")
    .replace(/\bRgb\b/g, "RGB")
    .replace(/\bRvo\b/g, "RVO")
    .replace(/\bSdf\b/g, "SDF")
    .replace(/\bLod\b/g, "LOD");
}

function tokenizeId(id) {
  const raw = String(id || "");
  const normalized = raw.replace(/^select:/, "");
  const parts = normalized.split("-");
  const leaf = parts[parts.length - 1] || normalized;
  const prefixRaw = parts.length > 1 ? parts.slice(0, -1).join("-") : "";
  return {
    raw,
    normalized,
    prefix: normalizePrefixLabel(prefixRaw),
    leaf,
    keyLower: normalized.toLowerCase(),
    leafLower: leaf.toLowerCase(),
    label: titleFromToken(leaf),
  };
}

function isGenericHint(text) {
  return typeof text === "string" &&
    /This control configures the value shown in the label above\.$/.test(text.trim());
}

function sentenceForLeafToken(ctx) {
  const t = ctx.leafLower;
  const label = ctx.label;

  if (t === "enabled") return "Turns this effect on or off without deleting its settings.";
  if (t === "priority") return "Sets processing order against other behaviours; adjust when effects need to happen earlier or later.";
  if (t === "speed") return "Controls how fast the visible motion or progression happens.";
  if (t.includes("strength")) return "Controls effect intensity; higher values make the visual result more pronounced.";
  if (t.includes("distance")) return "Distance used for this interaction or trigger.";
  if (t.includes("radius") || t.includes("range")) return "Defines the area of influence around the effect center.";
  if (t.includes("threshold")) return "Sets the cutoff where this effect starts to apply.";
  if (t.includes("duration")) return "How long this effect lasts before it ends.";
  if (t.includes("probability") || t === "chance") return "Chance from 0 to 1 that this event happens on each evaluation.";
  if (t === "start") return "Starting value at spawn or at the beginning of particle life.";
  if (t === "end") return "Target value near the end of particle life.";
  if (t.startsWith("min")) return "Minimum limit used by this behaviour.";
  if (t.startsWith("max")) return "Maximum limit used by this behaviour.";
  if (t.includes("scale")) return "Scales the magnitude of this effect.";
  if (t.includes("alpha") || t.includes("opacity")) return "Controls transparency; lower values make particles more see-through.";
  if (t.includes("color") || t === "hue" || t === "tint") return "Chooses the color used by this effect.";
  if (t.includes("size")) return "Controls particle size contribution from this effect.";
  if (t.includes("bounce")) return "How strongly particles rebound after impact.";
  if (t.includes("rotation") || t.includes("angle")) return "Controls rotation amount or direction.";
  if (t.includes("frequency")) return "How often this modulation repeats over time.";
  if (t.includes("amplitude")) return "Maximum swing from the baseline value.";
  if (t.includes("jitter")) return "Random variation amount; increase for noisier, less uniform motion.";
  if (t.includes("noise")) return "Noise contribution used to break up uniform patterns.";
  if (t.includes("seed")) return "Random seed for repeatable variation patterns.";
  if (t.includes("density")) return "Controls local packing/density response in this behaviour.";
  if (t.includes("falloff")) return "How quickly influence fades with distance.";
  if (t.includes("center") || t.includes("position") || t === "origin") return "Sets the XY location used as the effect reference point.";
  if (t.includes("direction")) return "Sets the movement direction vector or heading.";
  if (t === "maxspeed" || t === "minspeed" || t === "maxvelocity" || t === "minvelocity") return "Constrains movement speed to this limit.";
  if (t.includes("count") || t.includes("amount")) return "Number of particles or events generated by this control.";

  return `Adjusts ${label.toLowerCase()} for this behaviour.`;
}

function buildHintForId(id) {
  const ctx = tokenizeId(id);
  const lead = ctx.prefix ? `${ctx.prefix}: ` : "";
  return `${lead}${sentenceForLeafToken(ctx)}`;
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
  return `${label}: choose the mode/preset that defines how this behavior looks or responds in motion.`;
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
    const existing = RF_PROP_HINTS[id];
    merged[id] =
      existing != null && existing !== "" && !isGenericHint(existing)
        ? existing
        : buildHintForId(id);
  }
  for (const id of Object.keys(RF_PROP_HINTS)) {
    const existing = RF_PROP_HINTS[id];
    merged[id] =
      existing != null && existing !== "" && !isGenericHint(existing)
        ? existing
        : buildHintForId(id);
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
