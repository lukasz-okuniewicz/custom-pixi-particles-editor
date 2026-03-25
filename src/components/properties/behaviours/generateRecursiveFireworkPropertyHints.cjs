/**
 * One-off / regen: node generateRecursiveFireworkPropertyHints.cjs
 * Writes recursiveFireworkPropertyHints.js from the id list + hint templates.
 */
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "RecursiveFireworkProperties.js");
const OUT = path.join(__dirname, "recursiveFireworkPropertyHints.js");

const s = fs.readFileSync(SRC, "utf8");
const re = /id="(recursive-firework[^"]+|rf-[^"]+)"/g;
const ids = new Set();
let m;
while ((m = re.exec(s))) ids.add(m[1]);
ids.add("recursive-firework-color-1");
ids.add("recursive-firework-color-2");
ids.add("recursive-firework-color-3");
ids.add("recursive-firework-color-4");
ids.add("recursive-firework-color-mono");

/** @param {string} id */
function hintFor(id) {
  const H = {
    "recursive-firework-enabled":
      "When off, Recursive Firework does not run (no comet, no bursts).",
    "recursive-firework-priority":
      "Execution order vs other behaviours; higher runs first.",
    "recursive-firework-advanced":
      "Unlocks trigger modes, burst shapes, depth tables, and extended tuning.",
    "recursive-firework-comet-curve":
      "Lateral steering strength perpendicular to velocity while rising (comet wobble).",
    "recursive-firework-comet-curve-var":
      "Random spread applied to curve force per particle.",
    "recursive-firework-comet-noise":
      "Higher-frequency wobble layered on the comet path.",
    "recursive-firework-comet-noise-var":
      "Variance for the noise term.",
    "recursive-firework-comet-fadein":
      "Fraction of comet life (0–1) to ramp alpha from 0 to full.",
    "recursive-firework-comet-fadeout":
      "Fraction of the end of comet life used to fade alpha out before burst.",
    "recursive-firework-explode-distance":
      "For distance trigger: explode when the comet moves this far from its anchored origin.",
    "recursive-firework-explosion-count":
      "Base number of sparks in a burst (before variance and depth tables).",
    "recursive-firework-explosion-count-var":
      "Random +/- spread added to the burst count.",
    "recursive-firework-explosion-speed":
      "Outbound speed of burst particles (world units/sec scale used by the sim).",
    "recursive-firework-explosion-speed-var":
      "Random variation added to each spark’s speed.",
    "recursive-firework-explosion-life":
      "Typical lifetime of explosion sparks (seconds).",
    "recursive-firework-explosion-life-var":
      "Random variation on spark lifetime.",
    "recursive-firework-explosion-size":
      "Base visual size scale for sparks relative to the behaviour’s size state.",
    "recursive-firework-explosion-size-var":
      "Random variation on spark base size.",
    "recursive-firework-explosion-alpha-start":
      "Spark alpha at birth (0–1).",
    "recursive-firework-explosion-alpha-end":
      "Spark alpha at end of life (0–1).",
    "recursive-firework-spread":
      "Total cone angle in degrees for distributing burst directions.",
    "recursive-firework-spread-anisotropy":
      "Stretches or pinches the burst pattern (1 = isotropic ellipse scaling in pattern space).",
    "recursive-firework-spread-rotation":
      "Rotates the anisotropic spread pattern in degrees.",
    "recursive-firework-child-chance-jitter-burst":
      "Extra random jitter (0–1) added to child-comet probability each burst.",
    "recursive-firework-burst-stagger":
      "Delay between successive spawns in a burst (ms).",
    "recursive-firework-burst-stagger-jitter":
      "Random jitter (ms) added per spawn index for stagger.",
    "recursive-firework-direction":
      "Base aim angle in degrees when direction mode is fixed (often up = -90).",
    "recursive-firework-trigger-min":
      "Minimum life progress (0–1) for random explode time when using lifeProgress trigger.",
    "recursive-firework-trigger-max":
      "Maximum life progress (0–1) for random explode time.",
    "recursive-firework-palette-drift":
      "Degrees of hue drift when palette animation is hueDrift.",
    "recursive-firework-heat-bias":
      "Bias toward hot colors when palette strategy is heat (0–1).",
    "recursive-firework-hue-shift-child":
      "Hue shift applied per recursion depth for variety.",
    "recursive-firework-depth":
      "Maximum recursion depth (how many generations of child comets/sparks).",
    "recursive-firework-child-chance":
      "Probability a child becomes a comet (can recurse) vs a spark.",
    "recursive-firework-child-speed-mult":
      "Speed multiplier for child comets relative to the burst speed.",
    "recursive-firework-child-life-mult":
      "Lifetime multiplier for child comets.",
    "recursive-firework-child-color-jitter":
      "RGB noise amplitude when inheriting/jittering colors for children.",
    "recursive-firework-min-life-explode":
      "Minimum normalized life before a secondary explosion is allowed (spark/comet phases).",
    "recursive-firework-min-visible":
      "Culls contributions smaller than this visibility product (size × alpha).",
    "recursive-firework-brightness-norm-depth":
      "Normalizes perceived brightness by depth (higher = stronger depth dimming).",
    "recursive-firework-max-frame":
      "Hard cap on new particles spawned in a single frame (performance).",
    "recursive-firework-max-total":
      "Upper bound on live particles; behaviour throttles spawns near this.",
    "recursive-firework-max-children-shot":
      "Max descendants spawned from one root shot (prevents runaway trees).",
    "recursive-firework-energy-root":
      "Starting energy budget for the root burst used by recursion/energy gating.",
    "recursive-firework-energy-cost-child":
      "Energy subtracted when spawning a child comet.",
    "recursive-firework-energy-loss-depth":
      "Fractional energy loss applied per depth level.",
    "recursive-firework-min-energy-recurse":
      "Minimum energy required to allow another comet recursion.",
    "recursive-firework-rw-spark": "Weight for standard spark children.",
    "recursive-firework-rw-comet": "Weight for child comet (recursive) picks.",
    "recursive-firework-rw-glitter": "Weight for short bright glitter sparks.",
    "recursive-firework-rw-crackle": "Weight for fast crackle-style sparks.",
    "recursive-firework-rw-ember": "Weight for slow fading ember sparks.",
    "recursive-firework-min-children-explosion":
      "Floor on rounded burst count after stability/caps.",
    "recursive-firework-child-chance-decay-depth":
      "Per-depth multiplier decay on child comet probability (0–1 per level).",
    "recursive-firework-child-explosion-prob":
      "Scales probability that a qualifying child comet actually explodes again.",
    "recursive-firework-max-children-level":
      "Hard cap on children spawned at a single depth level.",
    "recursive-firework-chain-delay":
      "Delay before chain-reaction events can propagate (ms).",
    "recursive-firework-chain-radius":
      "Radius within which sparks can trigger chain reactions.",
    "recursive-firework-chain-prob":
      "Chance a nearby spark triggers a chained explosion (0–1).",
    "recursive-firework-chain-frame-cap":
      "Max chain triggers processed per frame (performance).",
    "recursive-firework-chain-depth-boost":
      "Extra depth tolerance when matching chain-reaction events.",
    "recursive-firework-branch-envelope-peak":
      "Normalized depth (0–1) where branching probability peaks.",
    "recursive-firework-branch-envelope-width":
      "Width of the Gaussian envelope over depth (branch emphasis window).",
    "recursive-firework-branch-envelope-strength":
      "How strongly the envelope modulates branching (0 = off).",
    "recursive-firework-burst-stability":
      "Blends rounded vs floored spawn counts (higher = more stable/less noisy).",
    "recursive-firework-burst-variance-damping":
      "Reduces count variance at deeper levels.",
    "recursive-firework-recursion-pacing-blend":
      "Blends burst stagger with per-depth recursion delay (0–1).",
    "recursive-firework-recursion-pacing-jitter":
      "Extra timing jitter (ms) for child activation delays.",
    "recursive-firework-secondary-sparkle":
      "Spawns extra sparkle particles along bursts (requires heavy effects).",
    "recursive-firework-secondary-sparkle-chance":
      "Probability of a secondary sparkle when enabled.",
    "recursive-firework-secondary-sparkle-scale":
      "Size scale for secondary sparkles.",
    "recursive-firework-tail-enabled":
      "Emit small trail sparks behind rising child comets.",
    "recursive-firework-tail-spawn-chance":
      "Chance per frame/update to emit a tail spark.",
    "recursive-firework-tail-scale":
      "Size multiplier for tail sparks.",
    "recursive-firework-tail-life-mult":
      "Lifetime multiplier for tail sparks vs base spark life.",
    "recursive-firework-comet-size-start":
      "Comet size multiplier at the start of comet life.",
    "recursive-firework-comet-size-end":
      "Comet size multiplier at end of comet phase.",
    "recursive-firework-explosion-size-start":
      "Spark size multiplier at birth.",
    "recursive-firework-explosion-size-end":
      "Spark size multiplier at end of life.",
    "recursive-firework-flicker-strength":
      "Amplitude of sinusoidal brightness flicker (0–1).",
    "recursive-firework-flicker-frequency":
      "Flicker frequency combined with life and uid (visual sparkle rate).",
    "recursive-firework-brightness-variance":
      "Random per-particle brightness offset (0–255 scale in behaviour).",
    "recursive-firework-secondary-crackle":
      "Spawns small crackle burst clusters (requires heavy effects).",
    "recursive-firework-secondary-crackle-chance":
      "Chance to spawn crackle clusters when enabled.",
    "recursive-firework-secondary-crackle-count":
      "Number of crackle sparks per cluster.",
    "recursive-firework-seed":
      "Base deterministic seed; 0 uses Math.random() instead.",
    "recursive-firework-seed-offset":
      "Salt mixed into per-shot randomness for variation between shots.",
    "recursive-firework-seed-cycle-len":
      "Length of the seed cycle for fixedCycle / pingPong modes.",
    "recursive-firework-seed-random-walk":
      "Step size for randomWalk seed mode between shots.",
    "recursive-firework-adaptive-throttle":
      "Scales spawn counts when particle load is high vs budget.",
    "recursive-firework-throttle-start-ratio":
      "Normalized list length ratio where adaptive throttling begins (0–1).",
    "recursive-firework-burst-envelope-attack":
      "Normalized burst progress (0–1) where stagger envelope ramps in.",
    "recursive-firework-burst-envelope-hold":
      "Hold point for stagger envelope shaping.",
    "recursive-firework-burst-envelope-release":
      "Normalized point where envelope release phase dominates.",
    "recursive-firework-wind-enabled":
      "Applies wind acceleration to comet and/or sparks.",
    "recursive-firework-wind-x": "Constant wind vector X component (editor units).",
    "recursive-firework-wind-y": "Constant wind vector Y component.",
    "recursive-firework-wind-strength": "Scales wind influence on velocity.",
    "recursive-firework-wind-noise":
      "Spatial/temporal scale for noise wind (smaller = smoother).",
    "recursive-firework-wind-comet": "Apply wind during the comet phase.",
    "recursive-firework-wind-sparks": "Apply wind to explosion sparks.",
    "recursive-firework-depth-fog-near":
      "Z where depth fog starts attenuating alpha.",
    "recursive-firework-depth-fog-far":
      "Z where fog reaches full strength (with depthFogAlpha).",
    "recursive-firework-depth-fog-alpha":
      "Maximum alpha reduction from depth fog (0–1).",
    "recursive-firework-lod-enabled":
      "Reduce recursion and secondary quality when many particles are alive.",
    "recursive-firework-heavy-enabled":
      "Enables expensive secondary effects (tails, sparkle trails, some styles).",
    "recursive-firework-lod-near":
      "Particle count below which full quality is used.",
    "recursive-firework-lod-far":
      "Particle count at which LOD reaches maximum reduction.",
    "recursive-firework-lod-target-frame":
      "Target frame time hint for LOD (ms).",
    "recursive-firework-lod-depth-red":
      "How many recursion levels to subtract at full LOD.",
    "recursive-firework-lod-secondary-red":
      "How much to reduce secondary spawn governor at full LOD (0–1).",
    "recursive-firework-two-stage":
      "Carrier sparks that release micro-bursts after a delay (shell-within-shell).",
    "recursive-firework-carrier-count":
      "Number of carrier sparks spawned in two-stage mode.",
    "recursive-firework-carrier-life":
      "Lifetime of each carrier before micro-burst (seconds).",
    "recursive-firework-micro-count":
      "Sparks per micro-burst release.",
    "recursive-firework-micro-delay":
      "Delay (ms) before carriers pop micro-bursts (normalized by life).",
    "recursive-firework-micro-spread":
      "Cone spread in degrees for micro-burst directions.",
    "recursive-firework-shockwave-enabled":
      "Spawns a ring shock particle for impact readability.",
    "recursive-firework-shockwave-size":
      "Visual size scale of the shockwave particle.",
    "recursive-firework-shockwave-life":
      "Lifetime of the shockwave sprite/particle.",
    "recursive-firework-layered-enabled":
      "Schedules extra delayed bursts (chain-style layering) after main burst.",
    "recursive-firework-layered-count":
      "Number of delayed layers (minimum 2 when enabled).",
    "recursive-firework-layered-delay":
      "Delay between layered bursts (ms).",
    "recursive-firework-glow-enabled":
      "Spawns a soft glow particle at burst centers.",
    "recursive-firework-glow-life": "Lifetime of glow particles.",
    "recursive-firework-glow-scale": "Size multiplier for glow vs sparks.",
    "recursive-firework-debug-depth":
      "Visualize recursion depth (debug; may require renderer support).",
    "recursive-firework-debug-vectors":
      "Show motion/aim vectors for debugging.",
    "recursive-firework-debug-governor":
      "Show adaptive spawn governor state.",
    "recursive-firework-debug-shot-seed":
      "Show per-shot seed diagnostics.",
    "recursive-firework-depth-alpha-falloff":
      "Simple per-depth alpha multiplier by depth index (not the list curve).",
    "recursive-firework-depth-sat-falloff":
      "Simple per-depth desaturation by depth index.",
    "recursive-firework-z-velocity":
      "Initial Z velocity toward/away from camera (2.5D).",
    "recursive-firework-z-velocity-var":
      "Random spread on initial Z velocity.",
    "recursive-firework-z-accel":
      "Z acceleration (e.g. drift) applied over time.",
    "recursive-firework-z-base":
      "Base z-index before Z contribution.",
    "recursive-firework-z-factor":
      "z-index increment per unit Z for draw order.",
    "recursive-firework-perspective-depth":
      "Reference distance for perspective size scaling (larger = flatter).",
    "recursive-firework-perspective-strength":
      "How strongly Z changes perceived scale (0 = off).",
    "recursive-firework-z-scale-enabled":
      "Apply perspective-based size scaling each frame.",
    "recursive-firework-z-scale-strength":
      "Blend factor (0–1) for Z scale vs identity.",
    "recursive-firework-inherit-dir-strength":
      "How much inherited velocity/tangent/reflection biases spawn angles (0–1).",
    "recursive-firework-cone-degrees":
      "Cone aperture in degrees when burst shape is cone.",
    "recursive-firework-star-points":
      "Number of star points for star/crossette-related shapes.",
    "recursive-firework-peony-petals":
      "Petals / lobes for peony distribution.",
    "recursive-firework-willow-jitter":
      "Random angular jitter for willow-style falling arcs.",
    "recursive-firework-crossette-branches":
      "Number of branches for crossette pattern.",
    "recursive-firework-horsetail-tightness":
      "Tightness of horsetail curtain (0–1).",
    "recursive-firework-color-1":
      "First palette anchor (RGB). Used by randomFromPalette, heat, analogous, etc.",
    "recursive-firework-color-2":
      "Second palette anchor. More stops give richer variety when the strategy samples between them.",
    "recursive-firework-color-3":
      "Third palette anchor for strategies that blend or rotate across multiple colors.",
    "recursive-firework-color-4":
      "Fourth palette anchor; all four define the main explosion color set.",
    "recursive-firework-color-mono":
      "Base color when palette strategy is monochrome.",
  };

  const listHint =
    "Comma-separated numbers, one per depth (index 0 = first burst level). Last value repeats for deeper levels.";
  const listKeys = new Set([
    "recursive-firework-spread-by-depth",
    "recursive-firework-direction-by-depth",
    "recursive-firework-count-by-depth",
    "recursive-firework-speed-by-depth",
    "recursive-firework-child-by-depth",
    "recursive-firework-burst-scale-depth",
    "recursive-firework-child-bias-depth",
    "recursive-firework-max-children-depth",
    "recursive-firework-spiral-twist-depth",
    "recursive-firework-child-speed-jitter-depth",
    "recursive-firework-recursion-delay-depth",
    "recursive-firework-depth-energy-level",
    "recursive-firework-depth-delay-level",
    "recursive-firework-shockwave-by-depth",
    "recursive-firework-glow-by-depth",
    "recursive-firework-depth-alpha-curve",
    "recursive-firework-depth-sat-curve",
  ]);
  if (listKeys.has(id)) return listHint;

  if (H[id]) return H[id];

  const rf = {
    "rf-device-profile":
      "Quick preset: adjusts spawn caps, LOD, and heavy companion effects for quality vs performance.",
    "rf-trigger-mode":
      "lifeProgress: explode in a random window; apex: when vertical velocity flips; distanceFromOrigin: after flying a set distance.",
    "rf-direction-mode":
      "How the burst aim is chosen: fixed angle, follow velocity, radial from origin, or random per burst.",
    "rf-burst-shape":
      "Pattern used to distribute burst directions (ring, cone, willow, spiral, etc.).",
    "rf-child-direction":
      "Biases child spawn directions: radial, inherit parent motion, tangent, or reflected.",
    "rf-palette":
      "How to pick RGB from explosionColors: randomFromPalette, monochrome, analogous, complementary, heat, triadic (120°), pastel, electric, splitTriad (0° / ±150°), paletteSweep (lerp two stops), depthAware (shallow vs deep palette halves).",
    "rf-depth-color-palette":
      "Per-depth hue treatment: inherit, rotate hue, complement, or split-complement.",
    "rf-depth-program":
      "Preset depth alpha/saturation curves (none, bloom, cascade, implode, fractal). Works with recursion depth and depth tables—stronger recursion makes cascade/implode ramps more visible.",
    "rf-palette-anim":
      "none; hueDrift (life); depthSwap (snap to stop by depth); depthGradient (walk stops by depth). Stacks with Color program: animation runs first, then warm/cool/luma/life saturation.",
    "rf-color-program":
      "Runs after palette animation: none; warmToCool; coolToWarm; lumaPulse (rate scales with Flicker frequency); lifeDesaturate / lifeSaturate (RGB saturation vs gray over spark life).",
    "rf-role-color-tint":
      "Per-phase hue bias after depth palette: coolCometWarmSpark shifts the rising comet cooler and explosion sparks slightly warmer for readability.",
    "rf-recursion-phase":
      "Whether only comets, only sparks, or both can trigger recursive bursts.",
    "rf-branching-mode":
      "How child comets are chosen: probabilistic, guaranteed first ray, or fan-out bias.",
    "rf-recursion-mode":
      "standard: normal tree; branchingComets: boosted comets; chainReaction: proximity chains.",
    "rf-trail-style":
      "Visual treatment along the comet: classic, fading tail, glow streak, or sparkle trail.",
    "rf-seed-sequence":
      "How the RNG seed advances each shot: fixed cycle, ping-pong, or random walk.",
    "rf-wind-mode":
      "constant: steady vector; noise: flowing sinusoidal field scaled by strength.",
  };

  if (rf[id]) return rf[id];

  return `Controls the behaviour property tied to id “${id}”.`;
}

const sorted = [...ids].sort();
const lines = [
  "/** Auto-generated hints for Recursive Firework property controls (tooltipText). */",
  "/** Regenerate: node generateRecursiveFireworkPropertyHints.cjs */",
  "",
  "export const RF_PROP_HINTS = {",
];
for (const id of sorted) {
  const text = hintFor(id).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  lines.push(`  "${id}": "${text}",`);
}
lines.push("};", "");
fs.writeFileSync(OUT, lines.join("\n"));
console.log("Wrote", OUT, "keys:", sorted.length);
