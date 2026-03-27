import { PROPERTY_HINTS } from "@components/properties/behaviourPropertyHints";
import { menuLabelToPanelId, COMMAND_PALETTE_SECTION_LABELS } from "@utils/behaviourSummary";
import { bestFuzzyScore } from "@utils/navSearch";

/**
 * Longer keys first: hint key prefix (one or more hyphen-separated segments) → sidebar section title.
 * Must match titles used in Menu.js / {@link SIDEBAR_SECTION_LABELS}.
 */
const HINT_PREFIX_TO_SECTION = {
  "recursive-firework": "Recursive Firework",
  "sound-reactive": "Sound Reactive",
  "toroidal-wrap": "Toroidal Wrap",
  "colorCycle": "Color Cycle",
  "soundReactive": "Sound Reactive",
  "flowField": "Flow Field Drift",
  "floatUp": "Float Up",
  "gravityWell": "Gravity Well",
  "lightEffect": "Light Effect",
  "nearMiss": "Near Miss Dispersion",
  "obstacleSdf": "Obstacle SDF Steer",
  "predatorPrey": "Predator Prey",
  "phasecoherence": "Phase Coherence",
  "phasefield": "Phase Field Flow",
  "curvatureflow": "Curvature Flow",
  "tempSim": "Temperature Simulation",
  "conversionCascade": "Conversion Cascade",
  "glitchBh": "Glitch (Emergent)",
  "limitcycle": "Limit Cycle",
  "lissajous": "Lissajous Harmonic Lattice",
  "liquid-mercury": "General Properties",
  "magneticAssembly": "General Properties",
  "proxtrig": "Proximity Triggered Phase",
  "shearFlow": "Shear Flow",
  aizawa: "Aizawa Attractor",
  angle: "Emit Direction",
  angular: "Angular Velocity",
  animated: "Particles List",
  attraction: "Attraction Repulsion",
  back: "Move To Point",
  base: "Spawn",
  bezier: "Bezier Flow Tube",
  boids: "Boids Flocking",
  bounce: "Bounce",
  bpl: "Beat Phase Lock",
  camera: "Warp",
  closer: "Warp",
  collision: "Collision",
  color: "Color",
  constrain: "Constrain To Shape",
  crystallize: "General Properties",
  curl: "Jacobian Curl-Field",
  custom: "Custom Behaviour",
  dfr: "Damage Flash Ripple",
  dissolve: "General Properties",
  eal: "Emitter Attractor Link",
  emit: "Emit Direction",
  "fade-in": "Color",
  flicker: "Flicker",
  flocking: "Flocking",
  follow: "Position",
  force: "Force Fields",
  form: "Form Pattern",
  general: "General Properties",
  ghost: "General Properties",
  glitch: "General Properties",
  granular: "General Properties",
  gravity: "Gravity Well",
  homing: "Homing",
  infinite: "Timeline",
  kelvin: "Kelvin Wake",
  magnet: "Magnet",
  melt: "General Properties",
  move: "Move To Point",
  noise: "Noise Based Motion",
  orbit: "Orbit",
  pixel: "Pixel Sort",
  point: "Spawn",
  position: "Position",
  prism: "General Properties",
  proximity: "Proximity State",
  pulse: "Pulse",
  recursive: "Recursive Firework",
  rf: "Recursive Firework",
  ripple: "Ripple",
  rotation: "Rotation",
  rvo: "RVO Avoidance",
  shatter: "General Properties",
  show: "Particle links (mesh)",
  sin: "Position",
  size: "Size",
  slitscan: "General Properties",
  sound: "Sound Reactive",
  ssfm: "Screen Space Flow Map",
  temperature: "Temperature",
  texture: "Particles List",
  time: "Timeline",
  timeline: "Timeline",
  toroidal: "Toroidal Flow",
  trail: "Trail",
  turbulence: "Turbulence",
  variant: "General Properties",
  velocity: "Position",
  vortex: "Vortex",
  wobble: "Wobble",
  beatSensitivity: "Beat Phase Lock",
  blastDirection: "Spawn",
  arrivalThreshold: "Homing",
  cellScale: "Form Pattern",
  cellSize: "Ghost",
  center: "Gravity Well",
  dispersionStrength: "Near Miss Dispersion",
  driftStrength: "Flow Field Drift",
  dynamicRadiusSpeed: "Orbit",
  edgeRoundness: "Constrain To Shape",
  explosionOrigin: "Shatter",
  fresnelPower: "Prism Refraction",
  grainSize: "Granular Erosion",
  groupCenter: "Grouping",
  highlightStrength: "Liquid Mercury",
  jitter: "Turbulence",
  lifetime: "Life",
  lightIntensity: "Light Effect",
  lightSource: "Light Effect",
  maxGhosts: "Ghost",
  mirrorTransition: "Dissolve",
  noiseDirection: "Noise Based Motion",
  orbitSpeed: "Orbit",
  particleDensity: "Metaball Pass",
  reflectivity: "Liquid Mercury",
  rgbOffset: "Glitch",
  rotationStrength: "Rotation",
  scanSpeed: "Slit-Scan",
  select: "General Properties",
  trailRangeLength: "Trail",
  trailSpeed: "Trail",
  turbSimulation: "Temperature Simulation",
  volumetricIntensity: "Light Effect",
  windAngle: "Temperature",
};

/** Optional panel ids for effect-only sections not in default particle sidebar — Crystallize etc. may be missing on DOM. */
const SINGLE_KEY_HINT_SECTION = {
  alpha: "Color",
  amplitude: "Wobble",
  anchor: "Size",
  apex: "Kelvin Wake",
  attenuationFactor: "Attraction Repulsion",
  attractionStrength: "Attraction Repulsion",
  baseRadius: "Vortex",
  baseScale: "Size",
  blurAmount: "Ghost",
  clockwise: "Orbit",
  columns: "Form Pattern",
  coneAngle: "Spawn",
  control1: "Bezier Flow Tube",
  control2: "Bezier Flow Tube",
  degrees: "Emit Direction",
  delta: "Timeline",
  direction: "Emit Direction",
  directionalLight: "Light Effect",
  duration: "Life",
  erosionProgress: "Granular Erosion",
  flickerIntensity: "Flicker",
  fogDensity: "Glitch",
  fontSize: "Form Pattern",
  friction: "Bounce",
  frequency: "Wobble",
  gravity: "Position",
  height: "Constrain To Shape",
  horizontalSpread: "Spawn",
  lifetime: "Life",
  oscillate: "Angular Velocity",
  pitch: "Sound Reactive",
  priority: "Spawn",
  radius: "Spawn",
  rotation: "Rotation",
  scatterRange: "Dissolve",
  speed: "Position",
  spread: "Emit Direction",
  stretch: "Stretch",
  threshold: "Pixel Sort",
  turbulence: "Turbulence",
  viscosity: "Liquid Mercury",
  warp: "Warp",
  word: "Form Pattern",
};

const sortedPrefixes = Object.keys(HINT_PREFIX_TO_SECTION).sort(
  (a, b) => b.length - a.length,
);

function resolveSectionForHintKey(hintKey) {
  if (hintKey.includes("-")) {
    const parts = hintKey.split("-");
    const maxK = Math.min(parts.length, 4);
    for (let k = maxK; k >= 1; k--) {
      const cand = parts.slice(0, k).join("-");
      if (HINT_PREFIX_TO_SECTION[cand]) return HINT_PREFIX_TO_SECTION[cand];
    }
    for (const prefix of sortedPrefixes) {
      if (hintKey === prefix || hintKey.startsWith(`${prefix}-`)) {
        return HINT_PREFIX_TO_SECTION[prefix];
      }
    }
  } else {
    if (HINT_PREFIX_TO_SECTION[hintKey]) return HINT_PREFIX_TO_SECTION[hintKey];
  }
  if (!hintKey.includes("-") && SINGLE_KEY_HINT_SECTION[hintKey]) {
    return SINGLE_KEY_HINT_SECTION[hintKey];
  }
  return null;
}

function inferSectionFromHint(hintKey, hintText) {
  const pool = COMMAND_PALETTE_SECTION_LABELS.filter(
    (label) => label !== "General Properties",
  );
  const scoreByLabel = pool.map((label) => {
    const score = bestFuzzyScore(hintKey, [label, label.replace(/\s+/g, "")]) +
      bestFuzzyScore(hintText, [label]);
    return { label, score };
  });
  scoreByLabel.sort((a, b) => b.score - a.score);
  const top = scoreByLabel[0];
  return top && top.score >= 820 ? top.label : null;
}

function hintSnippet(text) {
  if (!text || typeof text !== "string") return "";
  const t = text.trim();
  const dot = t.indexOf(".");
  return (dot >= 0 ? t.slice(0, dot) : t).slice(0, 140);
}

let cachedRows = null;

/**
 * @returns {{ panelId: string, sectionLabel: string, searchBlob: string, hintKey: string }[]}
 */
export function getPropertyHintSearchRows() {
  if (cachedRows) return cachedRows;
  /** @type {Map<string, { panelId: string, sectionLabel: string, searchBlob: string, hintKey: string }>} */
  const byKey = new Map();
  for (const [hintKey, hintText] of Object.entries(PROPERTY_HINTS)) {
    const sectionLabel =
      resolveSectionForHintKey(hintKey) || inferSectionFromHint(hintKey, hintText);
    if (!sectionLabel) continue;
    const panelId = menuLabelToPanelId(sectionLabel);
    const snippet = hintSnippet(hintText);
    const searchBlob = `${hintKey} ${snippet} ${sectionLabel}`.toLowerCase();
    if (!byKey.has(hintKey)) {
      byKey.set(hintKey, { panelId, sectionLabel, searchBlob, hintKey });
    }
  }
  cachedRows = Array.from(byKey.values());
  return cachedRows;
}

/**
 * @param {string} query
 * @param {number} [limit]
 * @returns {{ panelId: string, sectionLabel: string, hintKey: string, snippet: string }[]}
 */
export function filterPropertyHintsForSearch(query, limit = 40) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const rows = getPropertyHintSearchRows();
  const out = [];
  for (const row of rows) {
    const raw = PROPERTY_HINTS[row.hintKey];
    const snippet = hintSnippet(typeof raw === "string" ? raw : row.hintKey);
    const score = bestFuzzyScore(q, [
      row.hintKey,
      row.sectionLabel,
      row.searchBlob,
      snippet,
    ]);
    if (score <= 0) continue;
    out.push({
      panelId: row.panelId,
      sectionLabel: row.sectionLabel,
      hintKey: row.hintKey,
      snippet,
      score,
    });
  }
  out.sort((a, b) => b.score - a.score || a.sectionLabel.localeCompare(b.sectionLabel));
  return out.slice(0, limit).map(({ score, ...rest }) => rest);
}
