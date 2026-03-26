"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Loader } from "pixi.js-legacy";
import {
  BfInputNumber as RfInputNumber,
  BfCheckbox as RfCheckbox,
  BfInputString as RfInputString,
  BfColorPicker as RfColorPicker,
  BfFieldHint as RfSelectHint,
} from "@components/properties/BehaviourFieldWrappers";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import RecursiveFireworkDescription from "@components/html/behaviourDescriptions/RecursiveFirework";
import RecursiveFireworkIdeationControls from "./RecursiveFireworkIdeationControls";
import PresetLockControls from "./PresetLockControls";

/** Per-section hints for the Recursive Firework panel (toggle under each heading). */
const RF_HELP = {
  general:
    "Turn the behaviour on and set priority (order vs other behaviours). Presets rewrite this behaviour and often Position, Life, and Size so the shot matches the style. Device profile is a quick performance preset (spawn caps, LOD, heavy add-ons).",
  particleTextures:
    "Optional per-role texture keys (same asset names as General → predefined images). Pick one texture at a time from the menu to add it; remove with the button next to each entry. Comet = root rising shot. Explosion = recursive shell comets, shockwave, glow, carriers, micro-burst, secondary trail/crackle/tail. Explosion particles = main radial burst sparks. Leave lists empty to use the emitter’s default textures.",
  risingComet:
    "The comet is the rising phase before the burst. Curve and noise add sideways wobble; fade controls alpha along the comet life. Trail style and tail options only affect this phase.",
  pathJitter:
    "Curve force bends the path perpendicular to motion; noise adds higher-frequency wobble. Variance fields randomize those forces per particle.",
  explodeAim:
    "When to explode: life progress window, velocity apex, or distance from the launch anchor. Direction mode sets how burst directions are aimed (fixed angle, follow motion, radial from origin, or random per burst).",
  burstShape:
    "Shape picks how directions are distributed (ring, cone, star, etc.). Spread by depth and direction by depth override base spread and aim per recursion level. Child direction biases spawn directions relative to the parent.",
  cometFade:
    "Alpha envelope along the comet phase: fade in from invisible, fade out before the burst so the head reads cleanly.",
  explosionBurst:
    "The main burst: how many sparks spawn, how fast and long they live, base size, and alpha over the spark life. Works with spawn limits and depth tables in Advanced.",
  particleCounts:
    "Core counts and speeds for the explosion particles. Variance adds randomness so bursts feel organic.",
  spreadTiming:
    "Overall cone width in degrees, optional stagger so spawns are spread over time, and jitter on that stagger. Spread anisotropy and rotation squash or rotate the burst pattern.",
  colors:
    "Up to four palette stops used when strategy samples from the palette. Quick palette ideas apply a themed set of stops and strategy. Pipeline order: depth hue (Depth color palette) → role tint → palette animation → color program → depth saturation/alpha on the particle. Sparkle & Flicker frequency also affects lumaPulse and brightness flicker.",
  palettePrograms:
    "Palette animation (hue drift, depth swap, depth gradient) runs first; color program (warm/cool, luma pulse, life saturation) stacks on top so you can combine drift with a life gradient. Depth program presets fill alpha/saturation curves by depth—pair with recursion depth for staged fades.",
  depthTables:
    "Comma-separated lists indexed by depth (0 = first burst). Use to scale counts, chances, delays, spiral twist, etc. per level. Empty entries fall back to the single-value defaults above. Collapse this panel when tuning color only.",
  recursionChildren:
    "How deep the effect can recurse and how child comets differ from sparks (speed, life, color jitter). Child comet probability is the main dial for branching intensity.",
  perChildTuning:
    "Multipliers applied when a child comet or spark is created: speed and lifetime scaling, and how much RGB noise is applied to inherited colors.",
  explosionPhaseGating:
    "Which phases can trigger another burst (comet only, sparks only, or both). Minimum life progress avoids instant re-bursts. Visibility and brightness normalize cull or dim tiny contributions by depth.",
  spawnLimits:
    "Hard caps: particles spawned per frame, total particles in the pool budget, and max descendants per root shot. Lower these first if the effect is too heavy.",
  energyBudget:
    "Abstract energy passed down the tree: root budget, cost per child comet, loss per depth, and minimum energy required to recurse. Tighter energy reduces deep branching.",
  roleWeights:
    "Relative weights for spark, comet, glitter, crackle, and ember roles. Higher weight means that role is picked more often when a child is spawned. Normalize roughly to taste; zero disables a role.",
  branchingMode:
    "How child comets are chosen: pure probability, always one core ray, or fan-out bias. Recursion mode switches standard recursion, extra comet branching, or proximity chain reactions with the chain parameters below.",
  branchShaping:
    "Envelope shapes how branching probability varies by depth (Gaussian bump). Burst stability and variance damping make counts rounder or more deterministic. Recursion pacing blends burst delay with per-depth delay.",
  trailsSecondary:
    "Trail style affects comet rendering. Secondary sparkle/crackle spawn extra particles after bursts when heavy effects are enabled. Comet tail emits sparks behind rising comets.",
  sizeOverLife:
    "Separate size curves for the comet phase and the spark phase (start/end multipliers on top of base size).",
  sparkleBrightness:
    "Optional flicker and brightness variance on top of palette. Flicker frequency drives lumaPulse (color program) and spark brightness wobble when strength is above zero.",
  randomness:
    "Global seed and per-shot offset for repeatable variation. Seed sequence mode changes how the seed advances between shots (cycle, ping-pong, or random walk).",
  throttleEnvelope:
    "Adaptive throttle reduces spawn rates when the particle count is high relative to the budget. Burst envelope shapes how stagger delays ramp in, hold, and release across the burst indices.",
  environment:
    "Wind pushes velocities (constant vector or noise). Depth fog fades alpha by Z. LOD reduces recursion and secondary quality when many particles are alive. Heavy effects gates expensive add-ons.",
  wind:
    "Wind can target comet, sparks, or both. Constant wind uses vector times strength; noise mode uses a flowing field scaled by wind noise scale.",
  depthFog:
    "Linear fog between near and far Z: alpha is reduced as Z increases past near, up to far, scaled by fog alpha.",
  lod:
    "When enabled, particle count between near and far thresholds reduces max recursion depth and secondary spawn quality. Target frame time is a hint for future tuning.",
  heavyEffects:
    "Master switch for expensive extras: secondary particles, sparkle trail CPU, comet tail, some trail styles, shockwave/glow spawns, etc.",
  stagedPolish:
    "Optional two-stage shells, shock rings, glow halos, and delayed layered bursts layered on top of the main recursion.",
  twoStage:
    "Carriers are short-lived sparks that release a micro-burst after a delay; used for peony-style shells with a visible second pop.",
  shockwaveGlow:
    "Large short-lived particles for a shock disk and glow bloom; scales can vary by depth list. Layered explosion schedules extra delayed bursts at the same origin.",
  debug:
    "Editor/debug visualizations (depth, vectors, governor pressure, seed phase). Use for tuning; disable in production builds if your runtime draws them.",
  depthColorCurves:
    "Per-depth multipliers for alpha and saturation (comma lists). Falloff fields apply simple depth-based desaturation or alpha loss without full curves.",
  depth25d:
    "Simulated depth: Z velocity and acceleration, sprite z-index vs Z, perspective scale, and optional Z-based size scaling for parallax.",
  depthMotionZ:
    "Initial Z speed and variance plus Z acceleration (e.g. drift toward or away from camera during the shot).",
  drawOrder:
    "Maps particle Z to Pixi display z-index so nearer particles sort correctly with other objects.",
  perspective:
    "Vanishing scale: perspective depth is the reference distance; strength scales how strongly Z affects perceived size. Perspective Profile applies a ready-made look (Subtle, Dramatic, Extreme, Inverted) and can then be fine-tuned.",
  perspectiveProfile:
    "Quick look selector for depth feel. Subtle is backward-compatible. Dramatic and Extreme push strong near/far separation. Inverted flips the usual depth impression for stylized effects.",
  perspectiveCurve:
    "Non-linear depth response. 1.0 is neutral. Higher values exaggerate separation (near can grow faster while far collapses sooner). Lower values make transitions softer.",
  particleSizeDepth:
    "When enabled, perspective scale blends in by zScaleStrength so distant particles shrink smoothly. Far Scale Min prevents distant particles from vanishing completely; Near Scale Max caps (or allows huge) near-particle growth.",
  ideationModes:
    "Optional extended modes from the Recursive Firework ideation spec. Most default to off (echoCount 0, cell size 0, etc.). Respect spawn caps; heavy combinations need lower maxSpawnPerFrame.",
  ideationEcho:
    "Echo Bloom: samples the root comet path and schedules delayed bursts along the trail. echoCount 0 disables; 1+ enables (more layers = stronger echo). Final layer only limits child comets to the last echo.",
  ideationShear:
    "Shear asymmetry biases particle index spacing (spiral, ring, star, peony, willow, crossette, heart, and circle shell). Cone bias rotates aim. velocityBlendDepthCurve (comma list, 0–1 per depth) blends explosion aim toward parent velocity.",
  ideationMinefield:
    "Proximity mines: sparks queue micro-bursts when they cross grid cells after mine arm progress. Per-shot cap resets on each root explosion.",
  ideationSpiral:
    "Spiral burst shape tuning: turns and tightness. armRoleAlternate biases odd-index child roles toward comet vs spark.",
  ideationWave:
    "Wavefront interference: sine gate on spawn density from distances to origin (and optionally pointer). interferenceThreshold default -9 disables culling; raise toward 0 to thin bands.",
  ideationOrbit:
    "Orbital hatchery: with Two Stage, carriers spawn on a ring with tangential speed. hatchDelayMs extends carrier life; hatchCometChance promotes micro-burst sparks to child comets.",
  ideationCurvature:
    "Curvature detonator: sharp heading change pulls explode time earlier (cornerBurstScale) and fires a tangent micro-pop. Adds recursion depth penalty for subtree.",
  ideationZLayer:
    "Z-Layer Piercer: alternates child Z offset and biases child comet odds per near/far sheet.",
  ideationPedigree:
    "Color pedigree: rare sport hue jump and subtree tint; pedigreeSaturationFloor clamps minimum depth saturation.",
  ideationFork:
    "Lightning fork: caps crossette branch count, adds angular jitter, scales leaf-branch comet chance.",
  ideationCrystallize:
    "Grid crystallization: after main burst, delayed mini-shells at merged coarse grid cells.",
  ideationMagnetic:
    "Magnetic mouse bloom: late-life sparks drift toward Model.pointerWorld (editor updates via follow-mouse / pointer). outwardBiasDegrees blends burst aim away from cursor when pointer exists.",
  ideationMerge:
    "Collision spark swap: same-burst pairs within mergeRadius may merge (one grows, one removed). Budget per frame capped.",
  ideationLegendary:
    "Legendary sigil: rare depth-0 roll forces star burst, tight budget cap, shorter recursion, enables shock/glow for that shot only.",
  reactiveInputs:
    "Cross-behaviour modulation for Recursive Firework. Pick a signal source (SoundReactive/Pulse/BeatPhaseLock or auto), then choose a reactive mode. Keep mode off for baseline A/B comparisons.",
  reactiveMapping:
    "Gain scales incoming signal; smoothing damps jitter; threshold gates stronger responses; cooldown limits repeated beat spikes; influence scales mode effect. Shape jitter only affects spectralShapeMorph.",
  choreography:
    "New: show script (motif timeline), intent knobs, recursion grammar, force fields, beat-grid quantize, and diagnostics/replay pack capture. Most are easiest to edit as JSON. All default to off and won’t affect existing presets until enabled.",
};

/** One-click palette themes (explosionColors + strategy / animation). Keys match COLOR_PALETTE_IDEA_ORDER. */
const COLOR_PALETTE_IDEA_ORDER = [
  "tokyoNight",
  "sakura",
  "aurora",
  "goldRush",
  "deepSpace",
  "silverRain",
  "bloodMoon",
  "tropical",
  "lavenderHaze",
  "copperOxide",
  "matrixToxic",
  "vintagePhoto",
  "volcanic",
  "winterFrost",
  "neonSweep",
  "depthBands",
  "splitBurst",
];

const COLOR_PALETTE_IDEAS = {
  tokyoNight: {
    label: "Tokyo night",
    explosionColors: [
      { r: 30, g: 180, b: 255 },
      { r: 255, g: 40, b: 200 },
      { r: 80, g: 140, b: 255 },
      { r: 20, g: 60, b: 140 },
    ],
    paletteStrategy: "electric",
    depthColorPaletteMode: "rotate",
    paletteAnimationMode: "none",
    colorProgramMode: "none",
  },
  sakura: {
    label: "Sakura",
    explosionColors: [
      { r: 255, g: 200, b: 220 },
      { r: 255, g: 180, b: 210 },
      { r: 240, g: 170, b: 230 },
      { r: 255, g: 220, b: 235 },
    ],
    paletteStrategy: "pastel",
    depthColorPaletteMode: "inherit",
    paletteAnimationMode: "none",
    colorProgramMode: "none",
  },
  aurora: {
    label: "Aurora",
    explosionColors: [
      { r: 60, g: 255, b: 180 },
      { r: 40, g: 200, b: 160 },
      { r: 120, g: 90, b: 255 },
      { r: 30, g: 140, b: 255 },
    ],
    paletteStrategy: "randomFromPalette",
    depthColorPaletteMode: "inherit",
    paletteAnimationMode: "hueDrift",
    paletteDriftDegrees: 55,
    colorProgramMode: "none",
  },
  goldRush: {
    label: "Gold rush",
    explosionColors: [
      { r: 255, g: 220, b: 80 },
      { r: 255, g: 160, b: 40 },
      { r: 200, g: 90, b: 30 },
      { r: 255, g: 200, b: 120 },
    ],
    paletteStrategy: "heat",
    heatBias: 0.72,
    depthColorPaletteMode: "inherit",
    paletteAnimationMode: "none",
    colorProgramMode: "none",
  },
  deepSpace: {
    label: "Deep space",
    explosionColors: [
      { r: 40, g: 20, b: 90 },
      { r: 30, g: 80, b: 200 },
      { r: 120, g: 220, b: 255 },
      { r: 200, g: 100, b: 255 },
    ],
    paletteStrategy: "electric",
    depthColorPaletteMode: "inherit",
    paletteAnimationMode: "none",
    colorProgramMode: "none",
  },
  silverRain: {
    label: "Silver rain",
    explosionColors: [
      { r: 220, g: 228, b: 235 },
      { r: 190, g: 200, b: 210 },
      { r: 235, g: 240, b: 245 },
      { r: 170, g: 182, b: 195 },
    ],
    paletteStrategy: "monochrome",
    monochromeColor: { r: 200, g: 215, b: 228 },
    depthColorPaletteMode: "inherit",
    paletteAnimationMode: "none",
    colorProgramMode: "none",
  },
  bloodMoon: {
    label: "Blood moon",
    explosionColors: [
      { r: 140, g: 12, b: 28 },
      { r: 200, g: 35, b: 40 },
      { r: 90, g: 8, b: 22 },
      { r: 255, g: 80, b: 60 },
    ],
    paletteStrategy: "heat",
    heatBias: 0.88,
    depthColorPaletteMode: "inherit",
    paletteAnimationMode: "none",
    colorProgramMode: "none",
  },
  tropical: {
    label: "Tropical",
    explosionColors: [
      { r: 50, g: 255, b: 130 },
      { r: 0, g: 220, b: 240 },
      { r: 255, g: 200, b: 60 },
      { r: 255, g: 60, b: 180 },
    ],
    paletteStrategy: "triadic",
    depthColorPaletteMode: "inherit",
    paletteAnimationMode: "none",
    colorProgramMode: "none",
  },
  lavenderHaze: {
    label: "Lavender haze",
    explosionColors: [
      { r: 210, g: 190, b: 240 },
      { r: 185, g: 175, b: 220 },
      { r: 230, g: 225, b: 245 },
      { r: 160, g: 155, b: 200 },
    ],
    paletteStrategy: "pastel",
    childColorJitter: 16,
    depthColorPaletteMode: "inherit",
    paletteAnimationMode: "none",
    colorProgramMode: "none",
  },
  copperOxide: {
    label: "Copper oxide",
    explosionColors: [
      { r: 30, g: 140, b: 130 },
      { r: 184, g: 115, b: 51 },
      { r: 160, g: 62, b: 40 },
      { r: 50, g: 95, b: 110 },
    ],
    paletteStrategy: "complementary",
    depthColorPaletteMode: "splitComplement",
    paletteAnimationMode: "none",
    colorProgramMode: "none",
  },
  matrixToxic: {
    label: "Matrix / toxic",
    explosionColors: [
      { r: 15, g: 255, b: 80 },
      { r: 0, g: 120, b: 40 },
      { r: 40, g: 200, b: 90 },
      { r: 10, g: 60, b: 25 },
    ],
    paletteStrategy: "electric",
    depthColorPaletteMode: "inherit",
    paletteAnimationMode: "none",
    colorProgramMode: "lumaPulse",
    flickerFrequency: 32,
  },
  vintagePhoto: {
    label: "Vintage photo",
    explosionColors: [
      { r: 245, g: 220, b: 185 },
      { r: 210, g: 175, b: 150 },
      { r: 230, g: 200, b: 175 },
      { r: 180, g: 145, b: 125 },
    ],
    paletteStrategy: "pastel",
    depthColorPaletteMode: "inherit",
    paletteAnimationMode: "none",
    colorProgramMode: "none",
  },
  volcanic: {
    label: "Volcanic",
    explosionColors: [
      { r: 255, g: 240, b: 80 },
      { r: 255, g: 120, b: 20 },
      { r: 180, g: 20, b: 10 },
      { r: 40, g: 8, b: 6 },
    ],
    paletteStrategy: "heat",
    heatBias: 0.92,
    depthColorPaletteMode: "inherit",
    paletteAnimationMode: "none",
    colorProgramMode: "none",
  },
  winterFrost: {
    label: "Winter frost",
    explosionColors: [
      { r: 220, g: 245, b: 255 },
      { r: 180, g: 220, b: 255 },
      { r: 240, g: 235, b: 255 },
      { r: 200, g: 230, b: 248 },
    ],
    paletteStrategy: "pastel",
    depthColorPaletteMode: "inherit",
    paletteAnimationMode: "none",
    colorProgramMode: "coolToWarm",
  },
  neonSweep: {
    label: "Neon sweep",
    explosionColors: [
      { r: 255, g: 20, b: 120 },
      { r: 40, g: 255, b: 220 },
      { r: 255, g: 240, b: 60 },
      { r: 160, g: 80, b: 255 },
    ],
    paletteStrategy: "paletteSweep",
    depthColorPaletteMode: "inherit",
    paletteAnimationMode: "none",
    colorProgramMode: "none",
  },
  depthBands: {
    label: "Depth bands",
    explosionColors: [
      { r: 255, g: 100, b: 80 },
      { r: 255, g: 210, b: 90 },
      { r: 100, g: 200, b: 255 },
      { r: 200, g: 120, b: 255 },
    ],
    paletteStrategy: "depthAware",
    depthColorPaletteMode: "inherit",
    paletteAnimationMode: "depthGradient",
    colorProgramMode: "none",
  },
  splitBurst: {
    label: "Split burst",
    explosionColors: [
      { r: 255, g: 200, b: 100 },
      { r: 255, g: 140, b: 60 },
      { r: 120, g: 200, b: 255 },
      { r: 220, g: 100, b: 255 },
    ],
    paletteStrategy: "splitTriad",
    depthColorPaletteMode: "inherit",
    paletteAnimationMode: "none",
    colorProgramMode: "none",
  },
};

const PERSPECTIVE_PROFILES = {
  subtle: {
    label: "Subtle",
    perspectiveDepth: 1200,
    perspectiveStrength: 1,
    perspectiveExponent: 1,
    perspectiveFarScaleMin: 0.2,
    perspectiveNearScaleMax: 2,
    zScaleEnabled: true,
    zScaleStrength: 1,
  },
  dramatic: {
    label: "Dramatic",
    perspectiveDepth: 700,
    perspectiveStrength: 1.8,
    perspectiveExponent: 1.35,
    perspectiveFarScaleMin: 0.08,
    perspectiveNearScaleMax: 6,
    zScaleEnabled: true,
    zScaleStrength: 1,
  },
  extreme: {
    label: "Extreme",
    perspectiveDepth: 380,
    perspectiveStrength: 2.6,
    perspectiveExponent: 1.75,
    perspectiveFarScaleMin: 0.015,
    perspectiveNearScaleMax: 24,
    zScaleEnabled: true,
    zScaleStrength: 1,
  },
  inverted: {
    label: "Inverted",
    perspectiveDepth: 850,
    perspectiveStrength: 1.4,
    perspectiveExponent: 1.1,
    perspectiveFarScaleMin: 0.4,
    perspectiveNearScaleMax: 0.9,
    zScaleEnabled: true,
    zScaleStrength: 1,
  },
};

function RfSectionHelp({ children }) {
  const contentRef = useRef(null);
  const buttonRef = useRef(null);
  const toggleContent = () => {
    if (!contentRef.current || !buttonRef.current) return;
    const isShowing = contentRef.current.classList.toggle("show");
    buttonRef.current.innerText = isShowing ? "Hide help" : "Show help";
  };
  return (
    <div style={{ marginTop: 4 }}>
      <div
        className="showContent"
        onClick={toggleContent}
        ref={buttonRef}
        style={{ fontSize: 10, letterSpacing: "0.02em" }}
      >
        Show help
      </div>
      <div className="explanation" ref={contentRef}>
        <div
          className="text-muted"
          style={{ fontSize: 12, lineHeight: 1.45, whiteSpace: "pre-line" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function RfSectionLabel({ children, help }) {
  return (
    <div className="col-xs-12" style={{ margin: "12px 0 8px" }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          opacity: 0.72,
        }}
      >
        {children}
      </div>
      {help != null ? <RfSectionHelp>{help}</RfSectionHelp> : null}
    </div>
  );
}

function RfSubsectionLabel({ children, help }) {
  return (
    <div className="col-xs-12" style={{ margin: "8px 0 4px" }}>
      <div style={{ fontSize: 10, fontWeight: 600, opacity: 0.55 }}>
        {children}
      </div>
      {help != null ? <RfSectionHelp>{help}</RfSectionHelp> : null}
    </div>
  );
}

function RfTextureKeyPickerList({ id, label, value, elements, onChange, hintId }) {
  const safe = Array.isArray(value) ? value : [];
  const [pick, setPick] = useState("");

  const handlePickChange = (e) => {
    const v = e.target.value;
    if (!v) {
      setPick("");
      return;
    }
    setPick("");
    if (!safe.includes(v)) {
      onChange([...safe, v]);
    }
  };

  return (
    <div className="form-group">
      <label className="col-xs-4 form-label" htmlFor={id}>
        {label}
      </label>
      <div className="col-xs-8">
        <select
          id={id}
          className="form-control"
          value={pick}
          onChange={handlePickChange}
          disabled={elements.length === 0}
        >
          <option value="">— Add a texture —</option>
          {elements.map(({ key, displayName }) => (
            <option key={key} value={key}>
              {displayName}
            </option>
          ))}
        </select>
        {hintId ? <RfSelectHint id={hintId} /> : null}
        <div
          className="well well-sm"
          style={{ marginTop: 10, marginBottom: 0, padding: "8px 10px" }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              opacity: 0.55,
              marginBottom: 6,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Chosen ({safe.length})
          </div>
          {safe.length === 0 ? (
            <p className="text-muted" style={{ fontSize: 12, margin: 0 }}>
              None — uses emitter default textures for this role.
            </p>
          ) : (
            <ul
              className="list-unstyled"
              style={{ margin: 0, padding: 0 }}
            >
              {safe.map((texKey) => (
                <li
                  key={texKey}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "4px 0",
                    borderBottom: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <span
                    style={{
                      flex: 1,
                      fontSize: 12,
                      wordBreak: "break-all",
                    }}
                    title={texKey}
                  >
                    {texKey}
                  </span>
                  <button
                    type="button"
                    className="btn btn-default btn-xs"
                    onClick={() => onChange(safe.filter((k) => k !== texKey))}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RecursiveFireworkProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [advanced, setAdvanced] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState("");
  const [presetLocks, setPresetLocks] = useState({
    palette: false,
    recursion: false,
    reactive: false,
    performance: false,
  });
  const [deviceProfile, setDeviceProfile] = useState("balanced");
  const [listDrafts, setListDrafts] = useState({});

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "RecursiveFireworkBehaviour",
    enabled: false,
    priority: -5,
    triggerMode: "lifeProgress",
    directionMode: "fixed",
    cometCurve: 46,
    cometCurveVariance: 20,
    cometNoise: 18,
    cometNoiseVariance: 8,
    cometFadeIn: 0.08,
    cometFadeOut: 0.22,
    explosionTriggerMin: 0.45,
    explosionTriggerMax: 0.82,
    explodeDistance: 240,
    explosionParticleCount: 30,
    explosionParticleCountVariance: 14,
    explosionSpeed: 280,
    explosionSpeedVariance: 110,
    explosionLifetime: 1.1,
    explosionLifetimeVariance: 0.35,
    explosionSize: 1.1,
    explosionSizeVariance: 0.4,
    explosionAlphaStart: 1,
    explosionAlphaEnd: 0,
    spreadDegrees: 360,
    explosionDirectionDegrees: -90,
    explosionOriginAlongVelocityPx: 0,
    burstOriginAlongVelocityAutoScale: 1,
    burstOriginAlongVelocityFallbackHalfExtentPx: 64,
    directionByDepth: [-90, -90, -90],
    spreadByDepth: [360, 300, 220],
    burstStaggerMs: 0,
    burstStaggerJitter: 0,
    burstShape: "circle",
    coneDegrees: 80,
    starPoints: 5,
    peonyPetals: 12,
    willowArcJitter: 0.05,
    crossetteBranches: 4,
    horsetailTightness: 0.22,
    recursionDepth: 2,
    childCometProbability: 0.24,
    childSpeedMultiplier: 0.9,
    childLifetimeMultiplier: 0.85,
    childColorJitter: 34,
    childChanceByDepth: [0.24, 0.14, 0.06, 0],
    countByDepth: [34, 24, 12],
    speedByDepth: [300, 260, 220],
    zVelocity: 0,
    zVelocityVariance: 45,
    zAcceleration: 0,
    zIndexFactor: 0.8,
    zIndexBase: 0,
    perspectiveDepth: 1200,
    perspectiveStrength: 1,
    perspectiveProfile: "subtle",
    perspectiveExponent: 1,
    perspectiveFarScaleMin: 0.2,
    perspectiveNearScaleMax: 2,
    depthAlphaFalloff: 0,
    depthSaturationFalloff: 0,
    depthAlphaByDepth: [1, 0.9, 0.75, 0.6],
    depthSaturationByDepth: [1, 0.95, 0.88, 0.8],
    depthFogNear: 600,
    depthFogFar: 2600,
    depthFogAlpha: 0,
    maxSpawnPerFrame: 150,
    maxTotalSpawnBudget: 6000,
    maxSpawnPerSecond: 0,
    adaptiveThrottle: true,
    throttleStartRatio: 0.72,
    recursionPlannerStrength: 0,
    subtreeCullDepthRatio: 1.1,
    subtreeCullMinVisiblePerDepth: 0,
    reactiveSafetyDamping: 0,
    lodEnabled: false,
    lodTargetFrameMs: 16.7,
    lodParticleThresholdNear: 2000,
    lodParticleThresholdFar: 4500,
    lodDepthReduction: 1,
    lodSecondaryReduction: 0.5,
    explosionColors: [
      { r: 255, g: 230, b: 120 },
      { r: 255, g: 110, b: 90 },
      { r: 120, g: 200, b: 255 },
      { r: 220, g: 120, b: 255 },
    ],
    paletteStrategy: "randomFromPalette",
    paletteAnimationMode: "none",
    colorProgramMode: "none",
    roleColorTint: "none",
    depthColorPaletteMode: "inherit",
    paletteDriftDegrees: 45,
    monochromeColor: { r: 255, g: 170, b: 80 },
    heatBias: 0.6,
    hueShiftPerChild: 8,
    childChanceJitterPerBurst: 0,
    spreadAnisotropy: 1,
    spreadRotationDegrees: 0,
    depthProgram: "none",
    childDirectionMode: "radial",
    inheritDirectionStrength: 0.65,
    energyPerRootShot: 100,
    energyCostPerChild: 1,
    energyLossPerDepth: 0.18,
    minEnergyToRecurse: 8,
    recursionPhaseMode: "cometOnly",
    minLifeProgressBeforeExplode: 0.12,
    maxTotalChildrenPerShot: 900,
    minVisibleContribution: 0.03,
    brightnessNormalizeByDepth: 0,
    depthDelayByLevel: [0, 0.02, 0.05],
    burstEnvelope: { attack: 0, hold: 0.2, release: 0.8 },
    branchingMode: "probabilistic",
    minChildrenPerExplosion: 0,
    maxChildrenPerExplosionByDepth: [40, 24, 14, 8],
    childChanceDecayPerDepth: 0,
    childBurstScaleByDepth: [1, 0.82, 0.64, 0.5],
    childCometBiasByDepth: [1.1, 1, 0.85, 0.7],
    spiralTwistByDepth: [0, 8, 14, 20],
    childSpeedJitterByDepth: [0, 10, 18, 24],
    recursionDelayByDepth: [0, 0.015, 0.035, 0.06],
    depthEnergyByLevel: [1, 0.85, 0.7, 0.55],
    branchEnvelopePeakDepthRatio: 0.5,
    branchEnvelopeWidth: 0.55,
    branchEnvelopeStrength: 0,
    burstStability: 0,
    burstVarianceDamping: 0,
    recursionPacingBlend: 0,
    recursionPacingJitterMs: 0,
    seedSequenceMode: "fixedCycle",
    seedCycleLength: 16,
    seedRandomWalkStep: 104729,
    cometTailEnabled: false,
    cometTailSpawnChance: 0.06,
    cometTailScale: 0.45,
    cometTailLifeMultiplier: 0.35,
    secondarySparkleTrail: false,
    secondarySparkleChance: 0.1,
    secondarySparkleScale: 0.5,
    secondaryCrackle: false,
    secondaryCrackleChance: 0.1,
    secondaryCrackleCount: 4,
    roleWeights: { spark: 0.62, comet: 0.2, glitter: 0.1, crackle: 0.05, ember: 0.03 },
    twoStageEnabled: false,
    carrierCount: 8,
    carrierLife: 0.35,
    microBurstCount: 6,
    microBurstDelayMs: 120,
    microBurstSpread: 160,
    shockwaveEnabled: false,
    shockwaveSize: 2.4,
    shockwaveLife: 0.4,
    shockwaveByDepth: [1, 0.8, 0.6],
    glowEnabled: false,
    glowLife: 0.55,
    glowScale: 1.4,
    glowByDepth: [1, 0.85, 0.7],
    windEnabled: false,
    windMode: "constant",
    windVector: { x: 30, y: 0 },
    windStrength: 1,
    windNoiseScale: 0.015,
    windAffectComet: false,
    windAffectSparks: true,
    debugShowDepth: false,
    debugShowVectors: false,
    debugShowGovernor: false,
    debugShowShotSeed: false,
    seed: 0,
    seedPerShotOffset: 7919,
    recursionMode: "standard",
    childExplosionProbability: 1,
    maxChildrenPerLevel: 9999,
    maxChainTriggersPerFrame: 16,
    chainReactionDelayMs: 140,
    chainReactionRadius: 100,
    chainReactionProbability: 0.35,
    chainReactionDepthBoost: 0,
    trailStyle: "classic",
    cometSizeStart: 1,
    cometSizeEnd: 1,
    explosionSizeStart: 1,
    explosionSizeEnd: 0.15,
    flickerStrength: 0,
    flickerFrequency: 24,
    brightnessVariance: 0,
    zScaleEnabled: true,
    zScaleStrength: 1,
    layeredExplosionEnabled: false,
    layeredExplosionCount: 2,
    layeredExplosionDelayMs: 70,
    heavyEffectsEnabled: true,
    echoCount: 0,
    echoSpacingMs: 55,
    echoScaleFalloff: 0.72,
    echoChildCometChance: 1,
    echoChildCometsFinalLayerOnly: true,
    echoTrailSampleCap: 12,
    shearAsymmetry: 0,
    coneBiasDegrees: 0,
    velocityBlendDepthCurve: [],
    minefieldCellSize: 0,
    mineArmProgress: 0.55,
    maxMinesPerShot: 8,
    mineStaggerMs: 40,
    mineSpreadDegrees: 140,
    spiralTurns: 2.5,
    spiralTightness: 1,
    armRoleAlternate: false,
    waveK1: 0,
    waveK2: 0,
    interferenceThreshold: -9,
    waveAnchorMode: "originOnly",
    orbitRadius: 0,
    orbitSpeed: 0.35,
    hatchDelayMs: 0,
    hatchCometChance: 0,
    curvatureThresholdRad: 0,
    cornerBurstScale: 1,
    cornerCooldownMs: 220,
    cornerMicroBurstCount: 5,
    zSheetSeparation: 0,
    nearSheetCometBias: 1,
    farSheetCometBias: 1,
    pedigreeSaturationFloor: 0,
    sportProbability: 0,
    sportHueDelta: 42,
    forkArity: 0,
    forkAngleJitter: 0,
    leafCometChance: 0,
    gridCellPx: 0,
    maxCrystallizeNuclei: 6,
    crystallizeDelayMs: 80,
    magneticMousePullEnabled: false,
    mousePullStartProgress: 0.55,
    mousePullStrength: 0,
    outwardBiasDegrees: 0,
    legendaryChance: 0,
    sigilSides: 7,
    legendaryBudgetCap: 400,
    legendaryRecursionCap: 2,
    mergeRadius: 0,
    mergeProbability: 0,
    maxMergesPerFrame: 4,
    reactiveSource: "auto",
    reactiveSourceBlendMode: "single",
    reactiveSourceWeights: { soundReactive: 1, pulse: 1, beatPhaseLock: 1 },
    reactiveChannelWeights: {
      energy: 1,
      lowBand: 1,
      midBand: 1,
      highBand: 1,
      beat: 1,
      pulsePhase: 1,
      beatPhase: 1,
      beatPhaseToEnergy: 0,
    },
    reactiveSourcePriority: ["soundReactive", "pulse", "beatPhaseLock"],
    reactiveMode: "off",
    reactiveGain: 1,
    reactiveSmoothing: 0.24,
    reactiveThreshold: 0.35,
    reactiveEnvelopeAttackMs: 35,
    reactiveEnvelopeReleaseMs: 120,
    reactiveSoundUpdateEveryNFrames: 1,
    reactiveThresholdOn: 0.4,
    reactiveThresholdOff: 0.28,
    reactiveCooldownMs: 140,
    reactiveCooldownJitterMs: 0,
    reactiveInfluence: 0.6,
    reactiveShapeJitter: 0.45,
    reactiveAttack: 0.3,
    reactiveRelease: 0.14,
    reactiveRouting: { burstAmount: 1, recursionChance: 1, spread: 1, baseAngle: 1 },
    reactivePaletteHueRange: 90,
    reactivePaletteSaturationBoost: 0.35,
    debugReactiveSignals: false,
    debugReactiveLogEveryFrames: 24,
    reactiveTraceMode: "off",
    reactiveTraceValues: [],
    reactiveTraceLoop: true,
    reactiveV2: null,
    showScript: null,
    intent: null,
    recursionGrammar: null,
    fieldForces: null,
    musicQuantize: null,
    diagnostics: null,
    cometTextureKeys: [],
    explosionTextureKeys: [],
    explosionParticleTextureKeys: [],
  };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);

  const NUMERIC_LIST_KEYS = [
    "directionByDepth",
    "spreadByDepth",
    "childChanceByDepth",
    "countByDepth",
    "speedByDepth",
    "depthAlphaByDepth",
    "depthSaturationByDepth",
    "depthDelayByLevel",
    "maxChildrenPerExplosionByDepth",
    "childBurstScaleByDepth",
    "childCometBiasByDepth",
    "spiralTwistByDepth",
    "childSpeedJitterByDepth",
    "recursionDelayByDepth",
    "depthEnergyByLevel",
    "shockwaveByDepth",
    "glowByDepth",
    "velocityBlendDepthCurve",
  ];

  const toNumericValue = (entry) => {
    if (typeof entry === "number") {
      return Number.isFinite(entry) ? entry : null;
    }
    if (typeof entry === "string") {
      const parsed = parseFloat(entry.trim());
      return Number.isFinite(parsed) ? parsed : null;
    }
    if (entry && typeof entry === "object") {
      const objectValues = Object.values(entry);
      for (const objectValue of objectValues) {
        if (typeof objectValue === "number" && Number.isFinite(objectValue)) {
          return objectValue;
        }
        if (typeof objectValue === "string") {
          const parsed = parseFloat(objectValue.trim());
          if (Number.isFinite(parsed)) {
            return parsed;
          }
        }
      }
    }
    return null;
  };

  const sanitizeNumericList = (listValue, fallbackList) => {
    const sourceIsArray = Array.isArray(listValue);
    const source = sourceIsArray
      ? listValue
      : Array.isArray(fallbackList)
        ? fallbackList
        : [];

    const normalized = source
      .map((entry) => toNumericValue(entry))
      .filter((entry) => entry !== null);

    if (normalized.length > 0) {
      return normalized;
    }
    if (Array.isArray(fallbackList) && fallbackList.length > 0) {
      return [...fallbackList];
    }
    return [];
  };

  const sanitizeBehaviourLists = () => {
    NUMERIC_LIST_KEYS.forEach((key) => {
      behaviour[key] = sanitizeNumericList(behaviour[key], keysToInitialize[key]);
    });
  };

  sanitizeBehaviourLists();

  const toggleSubmenuVisibility = useCallback(() => {
    setIsSubmenuVisible((prev) => (prev === "collapse" ? "" : "collapse"));
  }, []);

  const updateBehaviours = () => {
    sanitizeBehaviourLists();
    const behaviours = defaultConfig.emitterConfig.behaviours || [];
    const nextBehaviour = { ...behaviour };
    const nextBehaviours = [...behaviours];
    nextBehaviours[index] = nextBehaviour;
    defaultConfig.emitterConfig.behaviours = nextBehaviours;
    behaviour = nextBehaviour;
    updateProps("emitterConfig.behaviours", nextBehaviours, undefined, true);
  };

  const applyDeviceProfile = (profile) => {
    setDeviceProfile(profile);
    if (profile === "quality") {
      behaviour.heavyEffectsEnabled = true;
      behaviour.maxSpawnPerFrame = Math.max(190, behaviour.maxSpawnPerFrame ?? 190);
      behaviour.maxTotalSpawnBudget = Math.max(5200, behaviour.maxTotalSpawnBudget ?? 5200);
      behaviour.lodEnabled = true;
      behaviour.lodParticleThresholdNear = 2200;
      behaviour.lodParticleThresholdFar = 5200;
      behaviour.lodDepthReduction = 1;
      behaviour.lodSecondaryReduction = 0.4;
      behaviour.maxChainTriggersPerFrame = Math.max(20, behaviour.maxChainTriggersPerFrame ?? 20);
    } else if (profile === "performance") {
      behaviour.heavyEffectsEnabled = false;
      behaviour.maxSpawnPerFrame = Math.min(130, behaviour.maxSpawnPerFrame ?? 130);
      behaviour.maxTotalSpawnBudget = Math.min(3200, behaviour.maxTotalSpawnBudget ?? 3200);
      behaviour.lodEnabled = true;
      behaviour.lodParticleThresholdNear = 1200;
      behaviour.lodParticleThresholdFar = 2800;
      behaviour.lodDepthReduction = Math.max(2, behaviour.lodDepthReduction ?? 2);
      behaviour.lodSecondaryReduction = Math.max(0.7, behaviour.lodSecondaryReduction ?? 0.7);
      behaviour.layeredExplosionEnabled = false;
      behaviour.secondarySparkleTrail = false;
      behaviour.secondaryCrackle = false;
      behaviour.cometTailEnabled = false;
      behaviour.maxChainTriggersPerFrame = Math.min(10, behaviour.maxChainTriggersPerFrame ?? 10);
      behaviour.chainReactionRadius = Math.min(90, behaviour.chainReactionRadius ?? 90);
    } else {
      behaviour.heavyEffectsEnabled = true;
      behaviour.maxSpawnPerFrame = 160;
      behaviour.maxTotalSpawnBudget = 4000;
      behaviour.lodEnabled = true;
      behaviour.lodParticleThresholdNear = 1650;
      behaviour.lodParticleThresholdFar = 3600;
      behaviour.lodDepthReduction = 1;
      behaviour.lodSecondaryReduction = 0.55;
      behaviour.maxChainTriggersPerFrame = 16;
    }
    updateBehaviours();
  };

  useEffect(() => {
    const maxSpawn = behaviour.maxSpawnPerFrame ?? keysToInitialize.maxSpawnPerFrame;
    const maxBudget = behaviour.maxTotalSpawnBudget ?? keysToInitialize.maxTotalSpawnBudget;
    const heavy = behaviour.heavyEffectsEnabled ?? keysToInitialize.heavyEffectsEnabled;
    const lodNear = behaviour.lodParticleThresholdNear ?? keysToInitialize.lodParticleThresholdNear;
    const lodDepthReduction = behaviour.lodDepthReduction ?? keysToInitialize.lodDepthReduction;
    const isPerf =
      !heavy &&
      maxSpawn <= 140 &&
      maxBudget <= 3400 &&
      lodNear <= 1300 &&
      lodDepthReduction >= 2;
    const isQuality =
      heavy &&
      maxSpawn >= 185 &&
      maxBudget >= 5000 &&
      lodNear >= 2000 &&
      lodDepthReduction <= 1;
    const inferred = isPerf ? "performance" : isQuality ? "quality" : "balanced";
    if (deviceProfile !== inferred) setDeviceProfile(inferred);
  }, [
    behaviour.maxSpawnPerFrame,
    behaviour.maxTotalSpawnBudget,
    behaviour.heavyEffectsEnabled,
    behaviour.lodParticleThresholdNear,
    behaviour.lodDepthReduction,
  ]);

  const ensureColor = (idx) => {
    if (!Array.isArray(behaviour.explosionColors)) {
      behaviour.explosionColors = [...keysToInitialize.explosionColors];
    }
    if (!behaviour.explosionColors[idx]) {
      behaviour.explosionColors[idx] = { r: 255, g: 255, b: 255 };
    }
  };

  const colorValue = (idx) => {
    ensureColor(idx);
    return {
      r: behaviour.explosionColors[idx].r ?? 255,
      g: behaviour.explosionColors[idx].g ?? 255,
      b: behaviour.explosionColors[idx].b ?? 255,
      a: 1,
    };
  };

  const applyColorPaletteIdea = (ideaId) => {
    const idea = COLOR_PALETTE_IDEAS[ideaId];
    if (!idea) return;
    if (Array.isArray(idea.explosionColors)) {
      behaviour.explosionColors = idea.explosionColors.map((c) => ({
        r: c.r,
        g: c.g,
        b: c.b,
      }));
    }
    if (idea.paletteStrategy !== undefined) behaviour.paletteStrategy = idea.paletteStrategy;
    if (idea.depthColorPaletteMode !== undefined)
      behaviour.depthColorPaletteMode = idea.depthColorPaletteMode;
    if (idea.paletteAnimationMode !== undefined)
      behaviour.paletteAnimationMode = idea.paletteAnimationMode;
    if (idea.paletteDriftDegrees !== undefined)
      behaviour.paletteDriftDegrees = idea.paletteDriftDegrees;
    if (idea.colorProgramMode !== undefined) behaviour.colorProgramMode = idea.colorProgramMode;
    if (idea.heatBias !== undefined) behaviour.heatBias = idea.heatBias;
    if (idea.monochromeColor !== undefined) {
      behaviour.monochromeColor = { ...idea.monochromeColor };
    }
    if (idea.childColorJitter !== undefined) behaviour.childColorJitter = idea.childColorJitter;
    if (idea.flickerStrength !== undefined) behaviour.flickerStrength = idea.flickerStrength;
    if (idea.flickerFrequency !== undefined) behaviour.flickerFrequency = idea.flickerFrequency;
    updateBehaviours();
  };

  const listToString = (arr, fallback = []) =>
    sanitizeNumericList(arr, fallback).join(", ");

  const stringToList = (v) =>
    String(v)
      .split(",")
      .map((x) => parseFloat(x.trim()))
      .filter((x) => !Number.isNaN(x));

  const getListInputValue = (key) =>
    Object.prototype.hasOwnProperty.call(listDrafts, key)
      ? listDrafts[key]
      : listToString(behaviour[key], keysToInitialize[key]);

  const editListInput = (key, value) => {
    setListDrafts((prev) => ({ ...prev, [key]: value }));
  };

  const commitListInput = (key) => {
    if (!Object.prototype.hasOwnProperty.call(listDrafts, key)) return;
    const nextRaw = listDrafts[key];
    behaviour[key] = stringToList(nextRaw);
    setListDrafts((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    updateBehaviours();
  };

  const complexityEstimate = (() => {
    const depth = Math.max(0, behaviour.recursionDepth ?? 0);
    const childChance = Math.max(
      0,
      Math.min(1, behaviour.childCometProbability ?? 0),
    );
    const count = Math.max(1, behaviour.explosionParticleCount ?? 1);
    let total = 0;
    let active = 1;
    for (let d = 0; d <= depth; d++) {
      total += active * count;
      active = active * count * childChance;
    }
    return Math.max(1, Math.round(total));
  })();
  const complexityRatio =
    complexityEstimate / Math.max(1, behaviour.maxTotalSpawnBudget ?? 1);
  const complexityLevel =
    complexityRatio < 0.35 ? "SAFE" : complexityRatio < 0.75 ? "WARN" : "RISK";

  const predefinedTextureElements = useMemo(() => {
    const textures =
      Loader.shared.resources?.["multipacked-0.json"]?.textures || {};
    const textures2 = Loader.shared.resources?.["images.json"]?.textures || {};
    const combinedTextures = { ...textures, ...textures2 };
    if (Object.keys(combinedTextures).length === 0) return [];
    return Object.keys(combinedTextures)
      .sort()
      .map((key) => ({ key, displayName: key }));
  }, []);

  const applyPreset = (preset) => {
    setSelectedPreset(preset);
    const LOCK_GROUPS = {
      palette: [
        "explosionColors",
        "paletteStrategy",
        "paletteAnimationMode",
        "paletteDriftDegrees",
        "colorProgramMode",
        "depthColorPaletteMode",
      ],
      recursion: [
        "recursionDepth",
        "recursionMode",
        "childCometProbability",
        "childChanceByDepth",
        "countByDepth",
        "speedByDepth",
        "branchingMode",
      ],
      reactive: [
        "reactiveSource",
        "reactiveMode",
        "reactiveGain",
        "reactiveSmoothing",
        "reactiveThreshold",
        "reactiveInfluence",
        "reactiveCooldownMs",
        "reactiveSourceBlendMode",
        "reactiveSourceWeights",
        "reactiveSourcePriority",
        "reactiveChannelWeights",
      ],
      performance: [
        "maxSpawnPerFrame",
        "maxTotalSpawnBudget",
        "maxSpawnPerSecond",
        "maxTotalChildrenPerShot",
        "adaptiveThrottle",
        "throttleStartRatio",
        "lodEnabled",
        "lodParticleThresholdNear",
        "lodParticleThresholdFar",
        "recursionPlannerStrength",
        "subtreeCullDepthRatio",
        "subtreeCullMinVisiblePerDepth",
        "reactiveSafetyDamping",
      ],
    };
    const lockedValues = {};
    Object.entries(presetLocks).forEach(([group, locked]) => {
      if (!locked) return;
      const keys = LOCK_GROUPS[group] || [];
      keys.forEach((k) => {
        lockedValues[k] = JSON.parse(JSON.stringify(behaviour[k]));
      });
    });
    behaviour = {
      ...behaviour,
      ...keysToInitialize,
      // Keep identity fields stable while resetting all tunables.
      name: "RecursiveFireworkBehaviour",
      enabled: behaviour.enabled ?? keysToInitialize.enabled,
      priority: behaviour.priority ?? keysToInitialize.priority,
    };
    const behaviours = defaultConfig?.emitterConfig?.behaviours || [];
    const positionIndex = behaviours.findIndex(
      (b) => b?.name === "PositionBehaviour",
    );
    const lifeIndex = behaviours.findIndex((b) => b?.name === "LifeBehaviour");
    const sizeIndex = behaviours.findIndex((b) => b?.name === "SizeBehaviour");
    const setBottomToTopLaunch = () => {
      if (positionIndex === -1) return;
      const positionBehaviour = behaviours[positionIndex] || {};
      positionBehaviour.enabled = true;
      positionBehaviour.velocity = { ...(positionBehaviour.velocity || {}), x: 0, y: -240 };
      positionBehaviour.velocityVariance = {
        ...(positionBehaviour.velocityVariance || {}),
        x: 45,
        y: 35,
      };
      positionBehaviour.acceleration = {
        ...(positionBehaviour.acceleration || {}),
        x: 0,
        y: 18,
      };
      positionBehaviour.accelerationVariance = {
        ...(positionBehaviour.accelerationVariance || {}),
        x: 6,
        y: 6,
      };
      defaultConfig.emitterConfig.behaviours[positionIndex] = positionBehaviour;
    };
    const setLaunch = (vx, vy, vvx, vvy, ax, ay, avx, avy) => {
      if (positionIndex === -1) return;
      const positionBehaviour = behaviours[positionIndex] || {};
      positionBehaviour.enabled = true;
      positionBehaviour.velocity = { ...(positionBehaviour.velocity || {}), x: vx, y: vy };
      positionBehaviour.velocityVariance = {
        ...(positionBehaviour.velocityVariance || {}),
        x: vvx,
        y: vvy,
      };
      positionBehaviour.acceleration = {
        ...(positionBehaviour.acceleration || {}),
        x: ax,
        y: ay,
      };
      positionBehaviour.accelerationVariance = {
        ...(positionBehaviour.accelerationVariance || {}),
        x: avx,
        y: avy,
      };
      defaultConfig.emitterConfig.behaviours[positionIndex] = positionBehaviour;
    };
    const setLifeAndSize = (life, lifeVar, sizeStart, sizeEnd) => {
      if (lifeIndex !== -1) {
        const lifeB = behaviours[lifeIndex] || {};
        lifeB.enabled = true;
        lifeB.maxLifeTime = life;
        lifeB.timeVariance = lifeVar;
        defaultConfig.emitterConfig.behaviours[lifeIndex] = lifeB;
      }
      if (sizeIndex !== -1) {
        const sizeB = behaviours[sizeIndex] || {};
        sizeB.enabled = true;
        sizeB.sizeStart = { x: sizeStart, y: sizeStart };
        sizeB.sizeEnd = { x: sizeEnd, y: sizeEnd };
        sizeB.startVariance = Math.max(0.05, sizeStart * 0.2);
        sizeB.endVariance = Math.max(0.05, sizeEnd * 0.2);
        defaultConfig.emitterConfig.behaviours[sizeIndex] = sizeB;
      }
    };

    if (preset === "classicFirework") {
      setLifeAndSize(2.05, 0.3, 1.15, 0.3);
      setLaunch(0, -280, 24, 30, 0, 24, 3, 3);
      behaviour.burstShape = "circle";
      behaviour.recursionMode = "standard";
      behaviour.trailStyle = "fadeTail";
      behaviour.paletteStrategy = "randomFromPalette";
      behaviour.recursionDepth = 2;
      behaviour.explosionParticleCount = 40;
      behaviour.explosionSpeed = 330;
      behaviour.childCometProbability = 0.18;
      behaviour.childExplosionProbability = 0.9;
      behaviour.heavyEffectsEnabled = true;
      behaviour.layeredExplosionEnabled = true;
      behaviour.layeredExplosionCount = 2;
      behaviour.layeredExplosionDelayMs = 65;
      behaviour.lodEnabled = true;
      behaviour.lodParticleThresholdNear = 1800;
      behaviour.lodParticleThresholdFar = 4200;
      behaviour.maxSpawnPerFrame = 180;
      behaviour.maxTotalSpawnBudget = 5200;
    } else if (preset === "cometShower") {
      setLifeAndSize(2.4, 0.4, 1.2, 0.2);
      setLaunch(-20, -250, 72, 40, 2, 22, 5, 4);
      behaviour.burstShape = "ring";
      behaviour.recursionMode = "branchingComets";
      behaviour.trailStyle = "glowStreak";
      behaviour.recursionDepth = 3;
      behaviour.childCometProbability = 0.42;
      behaviour.childExplosionProbability = 0.78;
      behaviour.explosionParticleCount = 26;
      behaviour.explosionSpeed = 280;
      behaviour.cometTailEnabled = true;
      behaviour.secondarySparkleTrail = true;
      behaviour.heavyEffectsEnabled = true;
      behaviour.lodEnabled = true;
      behaviour.lodParticleThresholdNear = 1700;
      behaviour.lodParticleThresholdFar = 3900;
      behaviour.lodDepthReduction = 2;
      behaviour.lodSecondaryReduction = 0.62;
      behaviour.maxSpawnPerFrame = 160;
      behaviour.maxTotalSpawnBudget = 4200;
    } else if (preset === "chainReaction") {
      setLifeAndSize(2.2, 0.35, 1.1, 0.25);
      setLaunch(0, -245, 26, 30, 0, 20, 2, 2);
      behaviour.burstShape = "circle";
      behaviour.recursionMode = "chainReaction";
      behaviour.chainReactionDelayMs = 180;
      behaviour.chainReactionRadius = 130;
      behaviour.chainReactionProbability = 0.48;
      behaviour.maxChainTriggersPerFrame = 20;
      behaviour.recursionDepth = 2;
      behaviour.childCometProbability = 0.16;
      behaviour.childExplosionProbability = 0.8;
      behaviour.heavyEffectsEnabled = false;
      behaviour.lodEnabled = true;
      behaviour.lodParticleThresholdNear = 1500;
      behaviour.lodParticleThresholdFar = 3200;
      behaviour.lodDepthReduction = 2;
      behaviour.maxSpawnPerFrame = 150;
      behaviour.maxTotalSpawnBudget = 3600;
    } else if (preset === "sparkleSpiral") {
      setLifeAndSize(2.05, 0.28, 1.08, 0.2);
      setLaunch(0, -260, 20, 26, 0, 18, 2, 2);
      behaviour.burstShape = "spiral";
      behaviour.trailStyle = "sparkleTrail";
      behaviour.recursionMode = "standard";
      behaviour.recursionDepth = 2;
      behaviour.explosionParticleCount = 52;
      behaviour.explosionSpeed = 300;
      behaviour.spiralTwistByDepth = [18, 34, 52];
      behaviour.flickerStrength = 0.22;
      behaviour.flickerFrequency = 28;
      behaviour.brightnessVariance = 28;
      behaviour.heavyEffectsEnabled = true;
      behaviour.secondarySparkleTrail = true;
      behaviour.secondarySparkleChance = 0.24;
      behaviour.lodEnabled = true;
      behaviour.lodParticleThresholdNear = 1650;
      behaviour.lodParticleThresholdFar = 3600;
      behaviour.maxSpawnPerFrame = 170;
      behaviour.maxTotalSpawnBudget = 4000;
    } else if (preset === "classic") {
      setLifeAndSize(1.9, 0.35, 1.1, 0.35);
      behaviour.directionMode = "fixed";
      behaviour.burstShape = "peony";
      behaviour.triggerMode = "lifeProgress";
      behaviour.burstShape = "circle";
      behaviour.paletteStrategy = "randomFromPalette";
      behaviour.recursionDepth = 2;
      behaviour.childCometProbability = 0.2;
      behaviour.branchEnvelopeStrength = 0.28;
      behaviour.branchEnvelopePeakDepthRatio = 0.46;
      behaviour.branchEnvelopeWidth = 0.62;
      behaviour.burstStability = 0.32;
      behaviour.burstVarianceDamping = 0.2;
      behaviour.recursionPacingBlend = 0.2;
      behaviour.recursionPacingJitterMs = 3;
      behaviour.secondaryCrackle = false;
      behaviour.secondarySparkleTrail = false;
    } else if (preset === "chrysanthemum") {
      setLifeAndSize(2.1, 0.4, 1.25, 0.25);
      behaviour.directionMode = "fixed";
      setLaunch(0, -285, 20, 28, 0, 28, 4, 4);
      behaviour.triggerMode = "lifeProgress";
      behaviour.explosionTriggerMin = 0.55;
      behaviour.explosionTriggerMax = 0.72;
      behaviour.explosionDirectionDegrees = -90;
      behaviour.burstShape = "circle";
      behaviour.paletteStrategy = "analogous";
      behaviour.recursionDepth = 1;
      behaviour.childCometProbability = 0.03;
      behaviour.spreadDegrees = 360;
      behaviour.explosionParticleCount = 54;
      behaviour.explosionSpeed = 360;
      behaviour.explosionSpeedVariance = 40;
      behaviour.secondarySparkleTrail = true;
      behaviour.secondarySparkleChance = 0.12;
      behaviour.secondaryCrackle = false;
      behaviour.branchEnvelopeStrength = 0.12;
      behaviour.branchEnvelopePeakDepthRatio = 0.4;
      behaviour.branchEnvelopeWidth = 0.72;
      behaviour.burstStability = 0.46;
      behaviour.burstVarianceDamping = 0.16;
      behaviour.recursionPacingBlend = 0.18;
      behaviour.recursionPacingJitterMs = 2;
    } else if (preset === "palm") {
      setLifeAndSize(1, 0.4, 1.5, 0.4);
      behaviour.directionMode = "fixed";
      behaviour.perspectiveDepth = 230;
      setLaunch(0, -220, 40, 24, 0, 16, 3, 3);
      behaviour.triggerMode = "lifeProgress";
      behaviour.explosionTriggerMin = 0.62;
      behaviour.explosionTriggerMax = 0.82;
      behaviour.directionByDepth = [-110];
      behaviour.spreadByDepth = [
        0
      ],
      behaviour.explosionDirectionDegrees = -90;
      behaviour.burstShape = "cone";
      behaviour.coneDegrees = 34;
      behaviour.paletteStrategy = "heat";
      behaviour.recursionDepth = 3;
      behaviour.childCometProbability = 0.58;
      behaviour.spreadDegrees = 0;
      behaviour.explosionParticleCount = 44;
      behaviour.explosionParticleCountVariance = 14;
      behaviour.explosionSpeed = 250;
      behaviour.explosionSpeedVariance = 120;
      behaviour.explosionLifetime = 1;
      behaviour.explosionLifetimeVariance = 0.35;
      behaviour.secondarySparkleTrail = false;
      behaviour.secondaryCrackle = false;
      behaviour.cometTailEnabled = true;
      behaviour.cometTailSpawnChance = 0.76;
      behaviour.cometTailScale = 4.45;
      behaviour.cometTailLifeMultiplier = 0.35;
      behaviour.countByDepth = [54];
      behaviour.speedByDepth = [300, 260, 220];
      behaviour.childChanceByDepth = [0.84];
      behaviour.maxChildrenPerExplosionByDepth = [54];
      behaviour.childDirectionMode = "radial";
      behaviour.inheritDirectionStrength = 0.65;
      behaviour.maxSpawnPerFrame = 200;
      behaviour.maxTotalSpawnBudget = 10000;
      behaviour.adaptiveThrottle = true;
      behaviour.throttleStartRatio = 0.72;
      behaviour.spiralTwistByDepth = [0],
      behaviour.explosionColors = [
        { r: 255, g: 230, b: 120 },
        { r: 255, g: 110, b: 90 },
        { r: 120, g: 200, b: 255 },
        { r: 220, g: 120, b: 255 },
      ];
      behaviour.branchEnvelopeStrength = 0.34;
      behaviour.branchEnvelopePeakDepthRatio = 0.52;
      behaviour.branchEnvelopeWidth = 0.58;
      behaviour.burstStability = 0.3;
      behaviour.burstVarianceDamping = 0.26;
      behaviour.recursionPacingBlend = 0.36;
      behaviour.recursionPacingJitterMs = 6;
    } else if (preset === "willow") {
      setLifeAndSize(2.6, 0.45, 1.35, 0.12);
      behaviour.directionMode = "fixed";
      behaviour.burstShape = "willow";
      setBottomToTopLaunch();
      behaviour.triggerMode = "distanceFromOrigin";
      behaviour.explodeDistance = 180;
      behaviour.explosionDirectionDegrees = -90;
      behaviour.paletteStrategy = "monochrome";
      behaviour.monochromeColor = { r: 255, g: 190, b: 120 };
      behaviour.recursionDepth = 3;
      behaviour.childCometProbability = 0.28;
      behaviour.secondarySparkleTrail = true;
      behaviour.secondarySparkleChance = 0.35;
      behaviour.windEnabled = false;
      behaviour.windMode = "constant";
      behaviour.windStrength = 0;
      behaviour.windVector = { x: 0, y: 0 };
      behaviour.windAffectComet = false;
      behaviour.windAffectSparks = false;
      behaviour.colorProgramMode = "none";
      behaviour.willowArcJitter = 0.05;
      behaviour.branchEnvelopeStrength = 0.28;
      behaviour.branchEnvelopePeakDepthRatio = 0.45;
      behaviour.branchEnvelopeWidth = 0.68;
      behaviour.burstStability = 0.4;
      behaviour.burstVarianceDamping = 0.2;
      behaviour.recursionPacingBlend = 0.3;
      behaviour.recursionPacingJitterMs = 5;
    } else if (preset === "crackle") {
      setLifeAndSize(1.6, 0.25, 0.95, 0.2);
      behaviour.directionMode = "fixed";
      behaviour.burstShape = "crossette";
      behaviour.triggerMode = "lifeProgress";
      behaviour.burstShape = "star";
      behaviour.starPoints = 6;
      behaviour.paletteStrategy = "complementary";
      behaviour.secondaryCrackle = true;
      behaviour.secondaryCrackleChance = 0.45;
      behaviour.secondaryCrackleCount = 6;
      behaviour.recursionDepth = 1;
      behaviour.childCometProbability = 0.05;
      behaviour.branchEnvelopeStrength = 0.1;
      behaviour.branchEnvelopePeakDepthRatio = 0.45;
      behaviour.branchEnvelopeWidth = 0.7;
      behaviour.burstStability = 0.5;
      behaviour.burstVarianceDamping = 0.14;
      behaviour.recursionPacingBlend = 0.14;
      behaviour.recursionPacingJitterMs = 2;
    } else if (preset === "twoStage") {
      setLifeAndSize(2.0, 0.3, 1.2, 0.25);
      setLaunch(0, -250, 16, 22, 0, 22, 2, 2);
      behaviour.burstShape = "peony";
      behaviour.peonyPetals = 14;
      behaviour.twoStageEnabled = true;
      behaviour.carrierCount = 10;
      behaviour.microBurstCount = 8;
      behaviour.microBurstDelayMs = 160;
      behaviour.microBurstSpread = 180;
      behaviour.shockwaveEnabled = true;
      behaviour.glowEnabled = true;
      behaviour.paletteStrategy = "analogous";
      behaviour.colorProgramMode = "warmToCool";
      behaviour.recursionDepth = 2;
      behaviour.branchEnvelopeStrength = 0.32;
      behaviour.branchEnvelopePeakDepthRatio = 0.5;
      behaviour.branchEnvelopeWidth = 0.62;
      behaviour.burstStability = 0.34;
      behaviour.burstVarianceDamping = 0.22;
      behaviour.recursionPacingBlend = 0.4;
      behaviour.recursionPacingJitterMs = 6;
    } else if (preset === "windWillow") {
      setLifeAndSize(2.9, 0.35, 1.3, 0.09);
      setLaunch(-40, -240, 28, 28, 4, 18, 5, 4);
      behaviour.burstShape = "willow";
      behaviour.triggerMode = "distanceFromOrigin";
      behaviour.explodeDistance = 170;
      behaviour.windEnabled = true;
      behaviour.windMode = "constant";
      behaviour.windVector = { x: 170, y: 10 };
      behaviour.windStrength = 2.2;
      behaviour.windNoiseScale = 0.01;
      behaviour.windAffectComet = true;
      behaviour.windAffectSparks = true;
      behaviour.willowArcJitter = 0.12;
      behaviour.paletteStrategy = "monochrome";
      behaviour.monochromeColor = { r: 255, g: 175, b: 130 };
      behaviour.colorProgramMode = "warmToCool";
      behaviour.spreadDegrees = 260;
      behaviour.recursionDepth = 2;
      behaviour.secondarySparkleTrail = true;
      behaviour.secondarySparkleChance = 0.45;
      behaviour.glowEnabled = true;
      behaviour.glowScale = 1.4;
      behaviour.glowLife = 0.55;
      behaviour.branchEnvelopeStrength = 0.24;
      behaviour.branchEnvelopePeakDepthRatio = 0.44;
      behaviour.branchEnvelopeWidth = 0.66;
      behaviour.burstStability = 0.35;
      behaviour.burstVarianceDamping = 0.22;
      behaviour.recursionPacingBlend = 0.28;
      behaviour.recursionPacingJitterMs = 5;
    } else if (preset === "palmCrown") {
      setLifeAndSize(2.55, 0.4, 1.25, 0.14);
      setLaunch(0, -230, 18, 28, 0, 16, 4, 3);
      behaviour.burstShape = "willow";
      behaviour.perspectiveDepth = 3000;
      behaviour.triggerMode = "lifeProgress";
      behaviour.explosionTriggerMin = 0.58;
      behaviour.explosionTriggerMax = 0.79;
      behaviour.recursionDepth = 2;
      behaviour.childCometProbability = 0.28;
      behaviour.depthProgram = "cascade";
      behaviour.depthColorPaletteMode = "rotate";
      behaviour.depthDelayByLevel = [0, 0.03, 0.07];
      behaviour.energyPerRootShot = 140;
      behaviour.energyCostPerChild = 1.2;
      behaviour.energyLossPerDepth = 0.22;
      behaviour.secondarySparkleTrail = true;
      behaviour.secondarySparkleChance = 0.22;
      behaviour.spreadDegrees = 250;
      behaviour.childDirectionMode = "inheritVelocity";
      behaviour.branchEnvelopeStrength = 0.3;
      behaviour.branchEnvelopePeakDepthRatio = 0.48;
      behaviour.branchEnvelopeWidth = 0.64;
      behaviour.burstStability = 0.38;
      behaviour.burstVarianceDamping = 0.25;
      behaviour.recursionPacingBlend = 0.32;
      behaviour.recursionPacingJitterMs = 6;
    } else if (preset === "spiderFractal") {
      setLifeAndSize(1.8, 0.25, 1.05, 0.2);
      setLaunch(0, -245, 38, 42, 0, 21, 4, 4);
      behaviour.burstShape = "crossette";
      behaviour.perspectiveDepth = 2000;
      behaviour.crossetteBranches = 6;
      behaviour.recursionDepth = 3;
      behaviour.childCometProbability = 0.38;
      behaviour.countByDepth = [24, 16, 11, 7];
      behaviour.speedByDepth = [320, 280, 245, 220];
      behaviour.spreadByDepth = [340, 260, 210, 170];
      behaviour.depthProgram = "fractal";
      behaviour.depthColorPaletteMode = "complement";
      behaviour.childDirectionMode = "tangentCurve";
      behaviour.inheritDirectionStrength = 0.7;
      behaviour.secondaryCrackle = true;
      behaviour.secondaryCrackleChance = 0.32;
      behaviour.childChanceJitterPerBurst = 0.1;
      behaviour.branchingMode = "guaranteedCore";
      behaviour.childBurstScaleByDepth = [1, 0.85, 0.7, 0.55];
      behaviour.maxChildrenPerExplosionByDepth = [28, 18, 12, 8];
      behaviour.branchEnvelopeStrength = 0.62;
      behaviour.branchEnvelopePeakDepthRatio = 0.58;
      behaviour.branchEnvelopeWidth = 0.48;
      behaviour.burstStability = 0.15;
      behaviour.burstVarianceDamping = 0.4;
      behaviour.recursionPacingBlend = 0.56;
      behaviour.recursionPacingJitterMs = 8;
      behaviour.seedSequenceMode = "pingPong";
    } else if (preset === "saturnRing") {
      setLifeAndSize(2.1, 0.3, 1.15, 0.25);
      setLaunch(0, -260, 20, 20, 0, 20, 3, 3);
      behaviour.burstShape = "ring";
      behaviour.spreadDegrees = 360;
      behaviour.spreadAnisotropy = 0.35;
      behaviour.spreadRotationDegrees = 0;
      behaviour.recursionDepth = 1;
      behaviour.childCometProbability = 0.08;
      behaviour.depthColorPaletteMode = "splitComplement";
      behaviour.depthProgram = "bloom";
      behaviour.explosionParticleCount = 60;
      behaviour.explosionSpeed = 330;
      behaviour.branchEnvelopeStrength = 0.14;
      behaviour.branchEnvelopePeakDepthRatio = 0.42;
      behaviour.branchEnvelopeWidth = 0.7;
      behaviour.burstStability = 0.44;
      behaviour.burstVarianceDamping = 0.18;
      behaviour.recursionPacingBlend = 0.2;
      behaviour.recursionPacingJitterMs = 3;
    } else if (preset === "phoenixRecall") {
      setLifeAndSize(2.2, 0.35, 1.2, 0.24);
      setLaunch(0, -250, 22, 25, 0, 22, 3, 3);
      behaviour.burstShape = "peony";
      behaviour.perspectiveDepth = 2000;
      behaviour.peonyPetals = 13;
      behaviour.twoStageEnabled = true;
      behaviour.carrierCount = 11;
      behaviour.microBurstCount = 9;
      behaviour.microBurstDelayMs = 200;
      behaviour.microBurstSpread = 150;
      behaviour.childDirectionMode = "reflected";
      behaviour.inheritDirectionStrength = 0.5;
      behaviour.depthDelayByLevel = [0, 0.05, 0.1];
      behaviour.energyPerRootShot = 150;
      behaviour.energyCostPerChild = 1.1;
      behaviour.depthProgram = "implode";
      behaviour.glowEnabled = true;
      behaviour.shockwaveEnabled = true;
      behaviour.seedSequenceMode = "fixedCycle";
      behaviour.seedCycleLength = 8;
      behaviour.branchEnvelopeStrength = 0.36;
      behaviour.branchEnvelopePeakDepthRatio = 0.54;
      behaviour.branchEnvelopeWidth = 0.58;
      behaviour.burstStability = 0.3;
      behaviour.burstVarianceDamping = 0.3;
      behaviour.recursionPacingBlend = 0.44;
      behaviour.recursionPacingJitterMs = 7;
    } else if (preset === "stormFront") {
      setLifeAndSize(2.8, 0.45, 1.3, 0.14);
      setLaunch(-45, -225, 36, 35, 6, 18, 6, 5);
      behaviour.burstShape = "willow";
      behaviour.triggerMode = "distanceFromOrigin";
      behaviour.explodeDistance = 180;
      behaviour.recursionDepth = 2;
      behaviour.childCometProbability = 0.25;
      behaviour.windEnabled = true;
      behaviour.windMode = "noise";
      behaviour.windStrength = 1.45;
      behaviour.windAffectComet = true;
      behaviour.windAffectSparks = true;
      behaviour.secondaryCrackle = true;
      behaviour.secondaryCrackleChance = 0.25;
      behaviour.depthFogAlpha = 0.28;
      behaviour.depthFogNear = 500;
      behaviour.depthFogFar = 2200;
      behaviour.seedSequenceMode = "randomWalk";
      behaviour.seedRandomWalkStep = 17389;
      behaviour.branchEnvelopeStrength = 0.48;
      behaviour.branchEnvelopePeakDepthRatio = 0.5;
      behaviour.branchEnvelopeWidth = 0.57;
      behaviour.burstStability = 0.22;
      behaviour.burstVarianceDamping = 0.36;
      behaviour.recursionPacingBlend = 0.42;
      behaviour.recursionPacingJitterMs = 10;
    } else if (preset === "fractalChrysanthemum") {
      setLifeAndSize(2.2, 0.35, 1.28, 0.22);
      setLaunch(0, -280, 22, 28, 0, 24, 3, 3);
      behaviour.burstShape = "circle";
      behaviour.paletteStrategy = "analogous";
      behaviour.depthProgram = "fractal";
      behaviour.recursionDepth = 3;
      behaviour.childCometProbability = 0.31;
      behaviour.countByDepth = [56, 24, 14, 8];
      behaviour.speedByDepth = [360, 300, 250, 210];
      behaviour.spreadByDepth = [360, 300, 230, 170];
      behaviour.depthColorPaletteMode = "rotate";
      behaviour.roleWeights = { spark: 0.45, comet: 0.28, glitter: 0.2, crackle: 0.04, ember: 0.03 };
      behaviour.branchEnvelopeStrength = 0.58;
      behaviour.branchEnvelopePeakDepthRatio = 0.6;
      behaviour.branchEnvelopeWidth = 0.46;
      behaviour.burstStability = 0.2;
      behaviour.burstVarianceDamping = 0.45;
      behaviour.recursionPacingBlend = 0.52;
      behaviour.recursionPacingJitterMs = 8;
    } else if (preset === "cometNest") {
      setLifeAndSize(2.0, 0.28, 1.1, 0.2);
      setLaunch(20, -250, 42, 34, 5, 18, 3, 3);
      behaviour.burstShape = "ring";
      behaviour.recursionDepth = 2;
      behaviour.childDirectionMode = "inheritVelocity";
      behaviour.inheritDirectionStrength = 0.8;
      behaviour.childCometProbability = 0.46;
      behaviour.roleWeights = { spark: 0.3, comet: 0.55, glitter: 0.1, crackle: 0.02, ember: 0.03 };
      behaviour.cometTailEnabled = true;
      behaviour.secondarySparkleTrail = true;
      behaviour.secondarySparkleChance = 0.18;
      behaviour.branchEnvelopeStrength = 0.56;
      behaviour.branchEnvelopePeakDepthRatio = 0.56;
      behaviour.branchEnvelopeWidth = 0.5;
      behaviour.burstStability = 0.18;
      behaviour.burstVarianceDamping = 0.42;
      behaviour.recursionPacingBlend = 0.5;
      behaviour.recursionPacingJitterMs = 8;
    } else if (preset === "palmCascadeRecursive") {
      setLifeAndSize(2.6, 0.38, 1.3, 0.12);
      setLaunch(0, -220, 15, 24, 0, 16, 2, 2);
      behaviour.burstShape = "willow";
      behaviour.recursionDepth = 3;
      behaviour.childCometProbability = 0.22;
      behaviour.spreadDegrees = 250;
      behaviour.depthDelayByLevel = [0, 0.05, 0.12, 0.2];
      behaviour.secondarySparkleTrail = true;
      behaviour.secondarySparkleChance = 0.4;
      behaviour.roleWeights = { spark: 0.55, comet: 0.18, glitter: 0.2, crackle: 0.02, ember: 0.05 };
      behaviour.branchEnvelopeStrength = 0.42;
      behaviour.branchEnvelopePeakDepthRatio = 0.53;
      behaviour.branchEnvelopeWidth = 0.56;
      behaviour.burstStability = 0.27;
      behaviour.burstVarianceDamping = 0.34;
      behaviour.recursionPacingBlend = 0.44;
      behaviour.recursionPacingJitterMs = 7;
    } else if (preset === "dnaSpiralBurst") {
      setLifeAndSize(2.15, 0.3, 1.16, 0.21);
      setLaunch(0, -255, 22, 24, 0, 19, 2, 2);
      behaviour.burstShape = "ring";
      behaviour.spreadAnisotropy = 0.55;
      behaviour.spreadRotationDegrees = 32;
      behaviour.recursionDepth = 2;
      behaviour.childCometProbability = 0.17;
      behaviour.countByDepth = [52, 26, 12];
      behaviour.childChanceByDepth = [0.17, 0.09, 0];
      behaviour.depthColorPaletteMode = "splitComplement";
      behaviour.spiralTwistByDepth = [14, 28, 38];
      behaviour.branchingMode = "probabilistic";
      behaviour.childBurstScaleByDepth = [1, 0.75, 0.55];
      behaviour.roleWeights = { spark: 0.52, comet: 0.2, glitter: 0.24, crackle: 0.02, ember: 0.02 };
      behaviour.branchEnvelopeStrength = 0.4;
      behaviour.branchEnvelopePeakDepthRatio = 0.55;
      behaviour.branchEnvelopeWidth = 0.52;
      behaviour.burstStability = 0.24;
      behaviour.burstVarianceDamping = 0.35;
      behaviour.recursionPacingBlend = 0.43;
      behaviour.recursionPacingJitterMs = 7;
    } else if (preset === "thunderCrackleBloom") {
      setLifeAndSize(1.75, 0.22, 1.05, 0.16);
      setLaunch(0, -245, 25, 29, 0, 20, 3, 3);
      behaviour.burstShape = "star";
      behaviour.starPoints = 7;
      behaviour.recursionDepth = 2;
      behaviour.childCometProbability = 0.08;
      behaviour.secondaryCrackle = true;
      behaviour.secondaryCrackleChance = 0.52;
      behaviour.secondaryCrackleCount = 7;
      behaviour.branchingMode = "fanOut";
      behaviour.childChanceDecayPerDepth = 0.14;
      behaviour.minChildrenPerExplosion = 4;
      behaviour.maxChildrenPerExplosionByDepth = [42, 24, 14];
      behaviour.roleWeights = { spark: 0.4, comet: 0.08, glitter: 0.2, crackle: 0.3, ember: 0.02 };
      behaviour.explosionLifetime = 0.8;
      behaviour.explosionLifetimeVariance = 0.18;
      behaviour.branchEnvelopeStrength = 0.52;
      behaviour.branchEnvelopePeakDepthRatio = 0.54;
      behaviour.branchEnvelopeWidth = 0.5;
      behaviour.burstStability = 0.19;
      behaviour.burstVarianceDamping = 0.4;
      behaviour.recursionPacingBlend = 0.48;
      behaviour.recursionPacingJitterMs = 9;
    } else if (preset === "galaxyLattice") {
      setLifeAndSize(2.35, 0.34, 1.2, 0.22);
      setLaunch(0, -255, 20, 24, 0, 21, 2, 2);
      behaviour.burstShape = "ring";
      behaviour.spreadAnisotropy = 0.42;
      behaviour.recursionDepth = 3;
      behaviour.childCometProbability = 0.29;
      behaviour.branchingMode = "guaranteedCore";
      behaviour.countByDepth = [48, 26, 14, 8];
      behaviour.childChanceByDepth = [0.31, 0.2, 0.1, 0];
      behaviour.childBurstScaleByDepth = [1, 0.84, 0.62, 0.5];
      behaviour.childCometBiasByDepth = [1.1, 1, 0.85, 0.6];
      behaviour.spiralTwistByDepth = [6, 14, 20, 26];
      behaviour.depthEnergyByLevel = [1, 0.9, 0.72, 0.58];
      behaviour.recursionDelayByDepth = [0, 0.02, 0.05, 0.08];
      behaviour.depthProgram = "fractal";
      behaviour.depthColorPaletteMode = "rotate";
      behaviour.paletteAnimationMode = "hueDrift";
      behaviour.paletteDriftDegrees = 66;
      behaviour.branchEnvelopeStrength = 0.68;
      behaviour.branchEnvelopePeakDepthRatio = 0.6;
      behaviour.branchEnvelopeWidth = 0.44;
      behaviour.burstStability = 0.26;
      behaviour.burstVarianceDamping = 0.52;
      behaviour.recursionPacingBlend = 0.62;
      behaviour.recursionPacingJitterMs = 7;
      behaviour.glowEnabled = true;
      behaviour.glowScale = 1.55;
    } else if (preset === "novaPinwheel") {
      setLifeAndSize(1.95, 0.26, 1.08, 0.2);
      setLaunch(0, -245, 22, 28, 0, 18, 2, 2);
      behaviour.burstShape = "star";
      behaviour.starPoints = 8;
      behaviour.recursionDepth = 2;
      behaviour.childCometProbability = 0.24;
      behaviour.branchingMode = "fanOut";
      behaviour.minChildrenPerExplosion = 5;
      behaviour.maxChildrenPerExplosionByDepth = [54, 28, 16];
      behaviour.childChanceDecayPerDepth = 0.1;
      behaviour.childSpeedJitterByDepth = [0, 18, 30];
      behaviour.spiralTwistByDepth = [18, 34, 52];
      behaviour.childBurstScaleByDepth = [1.05, 0.9, 0.65];
      behaviour.secondaryCrackle = true;
      behaviour.secondaryCrackleChance = 0.34;
      behaviour.secondaryCrackleCount = 5;
      behaviour.shockwaveEnabled = true;
      behaviour.depthColorPaletteMode = "splitComplement";
      behaviour.branchEnvelopeStrength = 0.4;
      behaviour.branchEnvelopePeakDepthRatio = 0.5;
      behaviour.branchEnvelopeWidth = 0.5;
      behaviour.burstStability = 0.24;
      behaviour.burstVarianceDamping = 0.34;
      behaviour.recursionPacingBlend = 0.38;
      behaviour.recursionPacingJitterMs = 9;
    } else if (preset === "ideationEchoBloom") {
      // Only echo / layered bloom — disable other ideation channels so A/B/C presets read clearly.
      setLifeAndSize(2.15, 0.34, 1.14, 0.24);
      setLaunch(0, -270, 22, 26, 0, 19, 2, 2);
      behaviour.burstShape = "circle";
      behaviour.spreadDegrees = 360;
      behaviour.explosionDirectionDegrees = -90;
      behaviour.explosionTriggerMin = 0.48;
      behaviour.explosionTriggerMax = 0.76;
      behaviour.explosionParticleCount = 28;
      behaviour.explosionSpeed = 300;
      behaviour.explosionLifetime = 1.12;
      behaviour.recursionDepth = 2;
      behaviour.childCometProbability = 0.12;
      behaviour.minefieldCellSize = 0;
      behaviour.maxMinesPerShot = 8;
      behaviour.magneticMousePullEnabled = false;
      behaviour.mousePullStrength = 0;
      behaviour.outwardBiasDegrees = 0;
      behaviour.echoCount = 9;
      behaviour.echoSpacingMs = 165;
      behaviour.echoScaleFalloff = 0.62;
      behaviour.echoTrailSampleCap = 28;
      behaviour.echoChildCometChance = 1;
      behaviour.echoChildCometsFinalLayerOnly = false;
      behaviour.layeredExplosionEnabled = true;
      behaviour.layeredExplosionCount = 3;
      behaviour.layeredExplosionDelayMs = 95;
      behaviour.burstStaggerMs = 18;
      behaviour.paletteStrategy = "pastel";
      behaviour.paletteAnimationMode = "hueDrift";
      behaviour.paletteDriftDegrees = 22;
      behaviour.explosionColors = [
        { r: 255, g: 210, b: 140 },
        { r: 255, g: 150, b: 120 },
        { r: 255, g: 120, b: 200 },
        { r: 255, g: 245, b: 200 },
      ];
      behaviour.heavyEffectsEnabled = true;
      behaviour.maxSpawnPerFrame = 170;
      behaviour.maxTotalSpawnBudget = 5400;
    } else if (preset === "ideationMinefield") {
      // Ring + dense grid + slower sparks so many cell crossings (no echo / no magnetic).
      setLifeAndSize(2.2, 0.36, 1.08, 0.2);
      setLaunch(0, -258, 20, 24, 0, 17, 2, 2);
      behaviour.burstShape = "ring";
      behaviour.spreadDegrees = 360;
      behaviour.explosionDirectionDegrees = -90;
      behaviour.explosionParticleCount = 40;
      behaviour.explosionSpeed = 195;
      behaviour.explosionLifetime = 1.42;
      behaviour.explosionLifetimeVariance = 0.22;
      behaviour.recursionDepth = 2;
      behaviour.childCometProbability = 0.08;
      behaviour.echoCount = 0;
      behaviour.magneticMousePullEnabled = false;
      behaviour.mousePullStrength = 0;
      behaviour.outwardBiasDegrees = 0;
      behaviour.minefieldCellSize = 22;
      behaviour.mineArmProgress = 0.18;
      behaviour.maxMinesPerShot = 28;
      behaviour.mineStaggerMs = 22;
      behaviour.mineSpreadDegrees = 220;
      behaviour.microBurstCount = 12;
      behaviour.paletteStrategy = "electric";
      behaviour.explosionColors = [
        { r: 255, g: 200, b: 80 },
        { r: 80, g: 255, b: 220 },
        { r: 255, g: 100, b: 60 },
        { r: 200, g: 240, b: 255 },
      ];
      behaviour.heavyEffectsEnabled = true;
      behaviour.maxSpawnPerFrame = 175;
      behaviour.maxTotalSpawnBudget = 5600;
    } else if (preset === "ideationMagneticPull") {
      // Strong late-life pull toward pointer — move mouse over the canvas (follow mouse optional).
      setLifeAndSize(2.0, 0.3, 1.1, 0.22);
      setLaunch(0, -272, 24, 28, 0, 18, 3, 3);
      behaviour.burstShape = "star";
      behaviour.starPoints = 5;
      behaviour.spreadDegrees = 300;
      behaviour.explosionParticleCount = 44;
      behaviour.explosionSpeed = 255;
      behaviour.explosionLifetime = 1.25;
      behaviour.recursionDepth = 2;
      behaviour.childCometProbability = 0.09;
      behaviour.echoCount = 0;
      behaviour.minefieldCellSize = 0;
      behaviour.layeredExplosionEnabled = false;
      behaviour.magneticMousePullEnabled = true;
      behaviour.mousePullStartProgress = 0.04;
      behaviour.mousePullStrength = 1650;
      behaviour.outwardBiasDegrees = -28;
      behaviour.paletteStrategy = "triadic";
      behaviour.depthColorPaletteMode = "splitComplement";
      behaviour.explosionColors = [
        { r: 200, g: 120, b: 255 },
        { r: 120, g: 220, b: 255 },
        { r: 255, g: 200, b: 120 },
        { r: 255, g: 120, b: 180 },
      ];
      behaviour.heavyEffectsEnabled = true;
      behaviour.maxSpawnPerFrame = 175;
      behaviour.maxTotalSpawnBudget = 5000;
    } else if (preset === "reactiveBeatBurst") {
      setLifeAndSize(2.05, 0.28, 1.1, 0.2);
      setLaunch(0, -255, 26, 30, 0, 20, 2, 2);
      behaviour.burstShape = "ring";
      behaviour.recursionMode = "branchingComets";
      behaviour.recursionDepth = 2;
      behaviour.explosionParticleCount = 34;
      behaviour.explosionSpeed = 300;
      behaviour.reactiveSource = "soundReactive";
      behaviour.reactiveMode = "beatBurst";
      behaviour.reactiveGain = 1.15;
      behaviour.reactiveThreshold = 0.42;
      behaviour.reactiveInfluence = 0.7;
      behaviour.reactiveCooldownMs = 170;
    } else if (preset === "reactiveSpectrumMorph") {
      setLifeAndSize(2.2, 0.32, 1.05, 0.18);
      setLaunch(0, -245, 24, 26, 0, 18, 2, 2);
      behaviour.burstShape = "circle";
      behaviour.recursionDepth = 2;
      behaviour.spreadDegrees = 320;
      behaviour.reactiveSource = "soundReactive";
      behaviour.reactiveMode = "spectralShapeMorph";
      behaviour.reactiveGain = 1.1;
      behaviour.reactiveSmoothing = 0.32;
      behaviour.reactiveInfluence = 0.75;
      behaviour.reactiveShapeJitter = 0.65;
      behaviour.depthColorPaletteMode = "rotate";
      behaviour.paletteAnimationMode = "hueDrift";
      behaviour.paletteDriftDegrees = 54;
    } else if (preset === "reactivePhaseOrbit") {
      setLifeAndSize(2.15, 0.24, 1.08, 0.2);
      setLaunch(0, -238, 18, 22, 0, 17, 2, 2);
      behaviour.burstShape = "star";
      behaviour.starPoints = 7;
      behaviour.reactiveSource = "beatPhaseLock";
      behaviour.reactiveMode = "phaseLockedOrbit";
      behaviour.reactiveInfluence = 0.62;
      behaviour.reactiveGain = 1;
      behaviour.reactiveCooldownMs = 120;
    } else if (preset === "reactivePulse") {
      setLifeAndSize(2.1, 0.25, 1.08, 0.2);
      setLaunch(0, -250, 20, 22, 0, 18, 2, 2);
      behaviour.burstShape = "spiral";
      behaviour.spiralTurns = 2.8;
      behaviour.recursionDepth = 2;
      behaviour.reactiveSource = "pulse";
      behaviour.reactiveMode = "phaseLockedOrbit";
      behaviour.reactiveGain = 1.05;
      behaviour.reactiveInfluence = 0.8;
      behaviour.reactiveSmoothing = 0.2;
      behaviour.reactiveCooldownMs = 90;
    } else if (preset === "reactiveEnergyRecursion") {
      setLifeAndSize(2.15, 0.26, 1.08, 0.2);
      setLaunch(0, -252, 24, 28, 0, 18, 2, 2);
      behaviour.burstShape = "circle";
      behaviour.recursionMode = "branchingComets";
      behaviour.recursionDepth = 3;
      behaviour.childCometProbability = 0.19;
      behaviour.childChanceByDepth = [0.18, 0.14, 0.09, 0.04];
      behaviour.reactiveSource = "soundReactive";
      behaviour.reactiveMode = "energyRecursion";
      behaviour.reactiveGain = 1.2;
      behaviour.reactiveThreshold = 0.32;
      behaviour.reactiveInfluence = 0.86;
      behaviour.reactiveCooldownMs = 120;
    } else if (preset === "reactivePaletteMorph") {
      setLifeAndSize(2.1, 0.25, 1.08, 0.2);
      setLaunch(0, -248, 22, 24, 0, 18, 2, 2);
      behaviour.burstShape = "circle";
      behaviour.recursionDepth = 2;
      behaviour.reactiveSource = "soundReactive";
      behaviour.reactiveMode = "paletteEnergyMorph";
      behaviour.reactiveGain = 1.12;
      behaviour.reactiveInfluence = 0.82;
      behaviour.reactivePaletteHueRange = 110;
      behaviour.reactivePaletteSaturationBoost = 0.45;
      behaviour.paletteAnimationMode = "hueDrift";
      behaviour.paletteDriftDegrees = 18;
      behaviour.depthColorPaletteMode = "rotate";
    } else if (preset === "reactiveMultiSourceMix") {
      setLifeAndSize(2.15, 0.27, 1.1, 0.2);
      setLaunch(0, -252, 24, 28, 0, 18, 2, 2);
      behaviour.burstShape = "ring";
      behaviour.recursionDepth = 2;
      behaviour.reactiveSource = "auto";
      behaviour.reactiveSourceBlendMode = "weightedMix";
      behaviour.reactiveSourceWeights = { soundReactive: 1.2, pulse: 0.8, beatPhaseLock: 1 };
      behaviour.reactiveSourcePriority = ["soundReactive", "beatPhaseLock", "pulse"];
      behaviour.reactiveChannelWeights = {
        energy: 1,
        lowBand: 1,
        midBand: 1,
        highBand: 1,
        beat: 1.2,
        pulsePhase: 0.9,
        beatPhase: 1,
        beatPhaseToEnergy: 0.25,
      };
      behaviour.reactiveMode = "beatBurst";
      behaviour.reactiveGain = 1.08;
      behaviour.reactiveThreshold = 0.3;
      behaviour.reactiveInfluence = 0.76;
      behaviour.reactiveCooldownMs = 110;
    } else if (preset === "reactiveEchoBloom") {
      setLifeAndSize(2.15, 0.25, 1.08, 0.2);
      setLaunch(0, -246, 20, 24, 0, 17, 2, 2);
      behaviour.burstShape = "star";
      behaviour.starPoints = 6;
      behaviour.recursionDepth = 2;
      behaviour.echoCount = 2;
      behaviour.echoSpacingMs = 52;
      behaviour.echoScaleFalloff = 0.7;
      behaviour.reactiveSource = "soundReactive";
      behaviour.reactiveMode = "beatBurst";
      behaviour.reactiveGain = 1.2;
      behaviour.reactiveThreshold = 0.25;
      behaviour.reactiveInfluence = 0.78;
      behaviour.reactiveCooldownMs = 105;
    } else if (preset === "depthCathedral") {
      setLifeAndSize(2.05, 0.25, 1.05, 0.2);
      setLaunch(0, -255, 18, 26, 0, 18, 2, 2);
      behaviour.burstShape = "circle";
      behaviour.recursionDepth = 3;
      behaviour.depthProgram = "cascade";
      behaviour.depthColorPaletteMode = "rotate";
      behaviour.depthFogAlpha = 0.18;
      behaviour.depthFogNear = 700;
      behaviour.depthFogFar = 2800;
      behaviour.depthDelayByLevel = [0, 0.04, 0.09, 0.14];
      behaviour.paletteStrategy = "depthAware";
      behaviour.maxSpawnPerFrame = 150;
      behaviour.maxTotalSpawnBudget = 5600;
      behaviour.maxSpawnPerSecond = 1800;
    } else if (preset === "depthTunnelBloom") {
      setLifeAndSize(2.2, 0.32, 1.12, 0.18);
      setLaunch(0, -265, 24, 28, 0, 22, 2, 3);
      behaviour.burstShape = "ring";
      behaviour.recursionDepth = 3;
      behaviour.depthProgram = "bloom";
      behaviour.depthColorPaletteMode = "complement";
      behaviour.depthFogAlpha = 0.26;
      behaviour.depthFogNear = 520;
      behaviour.depthFogFar = 2100;
      behaviour.zSheetSeparation = 55;
      behaviour.nearSheetCometBias = 1.15;
      behaviour.farSheetCometBias = 0.82;
      behaviour.maxSpawnPerSecond = 1700;
    } else if (preset === "depthFractalRain") {
      setLifeAndSize(2.35, 0.35, 1.1, 0.12);
      setLaunch(0, -230, 42, 35, 0, 26, 3, 4);
      behaviour.burstShape = "willow";
      behaviour.recursionDepth = 4;
      behaviour.depthProgram = "fractal";
      behaviour.depthColorPaletteMode = "splitComplement";
      behaviour.paletteStrategy = "paletteSweep";
      behaviour.depthDelayByLevel = [0, 0.06, 0.14, 0.22, 0.28];
      behaviour.depthFogAlpha = 0.3;
      behaviour.maxSpawnPerFrame = 130;
      behaviour.maxTotalSpawnBudget = 5200;
      behaviour.maxSpawnPerSecond = 1500;
    }
    Object.entries(lockedValues).forEach(([k, v]) => {
      behaviour[k] = v;
    });
    updateBehaviours();
  };

  const applyPerspectiveProfile = (profileId) => {
    const profile =
      PERSPECTIVE_PROFILES[profileId] || PERSPECTIVE_PROFILES.subtle;
    behaviour.perspectiveProfile = profileId;
    behaviour.perspectiveDepth = profile.perspectiveDepth;
    behaviour.perspectiveStrength = profile.perspectiveStrength;
    behaviour.perspectiveExponent = profile.perspectiveExponent;
    behaviour.perspectiveFarScaleMin = profile.perspectiveFarScaleMin;
    behaviour.perspectiveNearScaleMax = profile.perspectiveNearScaleMax;
    behaviour.zScaleEnabled = profile.zScaleEnabled;
    behaviour.zScaleStrength = profile.zScaleStrength;
    updateBehaviours();
  };

  const presetEnvelopeWarnings = (() => {
    if (!selectedPreset) return [];
    const behaviours = defaultConfig?.emitterConfig?.behaviours || [];
    const position = behaviours.find((b) => b?.name === "PositionBehaviour") || {};
    const life = behaviours.find((b) => b?.name === "LifeBehaviour") || {};
    const size = behaviours.find((b) => b?.name === "SizeBehaviour") || {};
    const warnings = [];
    const vY = position?.velocity?.y ?? 0;
    const lifeT = life?.maxLifeTime ?? 0;
    const sizeStart = size?.sizeStart?.x ?? 0;
    if (selectedPreset === "palm" || selectedPreset === "willow" || selectedPreset === "windWillow") {
      if (vY > -100) warnings.push("PositionBehaviour.velocity.y should be negative enough for upward launch.");
    }
    if (selectedPreset === "twoStage" && lifeT < 1.2) {
      warnings.push("LifeBehaviour.maxLifeTime is low for two-stage separation visibility.");
    }
    if ((selectedPreset === "chrysanthemum" || selectedPreset === "classic") && sizeStart < 0.8) {
      warnings.push("SizeBehaviour.sizeStart appears too small for full crown silhouette.");
    }
    return warnings;
  })();

  const triggerMode = behaviour.triggerMode ?? "lifeProgress";
  const directionModeVal = behaviour.directionMode ?? "fixed";
  const burstShapeVal = behaviour.burstShape ?? "circle";
  const paletteStrategyVal = behaviour.paletteStrategy ?? "randomFromPalette";
  const paletteAnimVal = behaviour.paletteAnimationMode ?? "none";
  const recursionModeVal = behaviour.recursionMode ?? "standard";
  const reactiveSourceVal = behaviour.reactiveSource ?? "auto";
  const reactiveBlendModeVal = behaviour.reactiveSourceBlendMode ?? "single";
  const reactiveModeVal = behaviour.reactiveMode ?? "off";
  const reactivePriorityVal = Array.isArray(behaviour.reactiveSourcePriority)
    ? behaviour.reactiveSourcePriority
    : keysToInitialize.reactiveSourcePriority;
  const depthColorPaletteModeVal =
    behaviour.depthColorPaletteMode ?? "inherit";
  const depthProgramVal = behaviour.depthProgram ?? "none";
  const childDirectionModeVal = behaviour.childDirectionMode ?? "radial";
  const recursionPhaseModeVal = behaviour.recursionPhaseMode ?? "cometOnly";
  const seedSequenceModeVal = behaviour.seedSequenceMode ?? "fixedCycle";
  const secondaryCrackleOn = behaviour.secondaryCrackle ?? false;
  const windEnabled = behaviour.windEnabled ?? false;
  const windMode = behaviour.windMode ?? "constant";
  const lodEnabled = behaviour.lodEnabled ?? false;
  const adaptiveThrottle = behaviour.adaptiveThrottle ?? true;
  const twoStageEnabled = behaviour.twoStageEnabled ?? false;
  const shockwaveEnabled = behaviour.shockwaveEnabled ?? false;
  const layeredExplosionEnabled = behaviour.layeredExplosionEnabled ?? false;
  const glowEnabled = behaviour.glowEnabled ?? false;
  const cometTailEnabled = behaviour.cometTailEnabled ?? false;
  const secondarySparkleTrail = behaviour.secondarySparkleTrail ?? false;
  const zScaleEnabled = behaviour.zScaleEnabled ?? true;
  const flickerStrengthVal = behaviour.flickerStrength ?? 0;
  const allBehaviours = defaultConfig?.emitterConfig?.behaviours || [];
  const sourceBehaviourBySource = {
    soundReactive: "SoundReactiveBehaviour",
    pulse: "PulseBehaviour",
    beatPhaseLock: "BeatPhaseLockBehaviour",
  };
  const hasSourceBehaviour = {
    soundReactive: allBehaviours.some((b) => b?.name === "SoundReactiveBehaviour"),
    pulse: allBehaviours.some((b) => b?.name === "PulseBehaviour"),
    beatPhaseLock: allBehaviours.some((b) => b?.name === "BeatPhaseLockBehaviour"),
  };
  const sourceIsSatisfied =
    reactiveSourceVal === "auto" ||
    !!hasSourceBehaviour[reactiveSourceVal];
  const sourceHealthLabel =
    reactiveSourceVal === "auto"
      ? `auto (${Object.entries(hasSourceBehaviour).filter(([, ok]) => ok).map(([name]) => name).join(", ") || "none"})`
      : hasSourceBehaviour[reactiveSourceVal]
        ? `${reactiveSourceVal} active`
        : `${reactiveSourceVal} missing`;
  const orderedSourceHealth = reactivePriorityVal.map((sourceId) => ({
    sourceId,
    ready: !!hasSourceBehaviour[sourceId],
  }));
  const updateSourcePriority = useCallback(
    (next) => {
      const allowed = ["soundReactive", "pulse", "beatPhaseLock"];
      const uniq = [];
      next.forEach((entry) => {
        if (!allowed.includes(entry) || uniq.includes(entry)) return;
        uniq.push(entry);
      });
      allowed.forEach((entry) => {
        if (!uniq.includes(entry)) uniq.push(entry);
      });
      behaviour.reactiveSourcePriority = uniq;
      updateBehaviours();
    },
    [behaviour],
  );
  const updatePrioritySlot = useCallback(
    (slotIndex, value) => {
      const next = [...reactivePriorityVal];
      const existingIndex = next.indexOf(value);
      if (existingIndex >= 0) {
        const tmp = next[slotIndex];
        next[slotIndex] = next[existingIndex];
        next[existingIndex] = tmp;
      } else {
        next[slotIndex] = value;
      }
      updateSourcePriority(next);
    },
    [reactivePriorityVal, updateSourcePriority],
  );
  const clearReactiveTrace = useCallback(() => {
    behaviour.reactiveTraceValues = [];
    updateBehaviours();
  }, [behaviour]);
  const exportReactiveTrace = useCallback(async () => {
    const payload = JSON.stringify(behaviour.reactiveTraceValues || []);
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(payload);
      } catch {
        // Ignore clipboard failures and still expose prompt fallback.
      }
    }
    if (typeof window !== "undefined" && window.prompt) {
      window.prompt("Reactive trace JSON", payload);
    }
  }, [behaviour.reactiveTraceValues]);
  const importReactiveTrace = useCallback(() => {
    if (typeof window === "undefined" || !window.prompt) return;
    const raw = window.prompt("Paste reactive trace JSON array");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return;
      behaviour.reactiveTraceValues = parsed
        .map((entry) => parseFloat(entry))
        .filter((entry) => Number.isFinite(entry))
        .map((entry) => Math.max(0, Math.min(1, entry)));
      updateBehaviours();
    } catch {
      // Ignore malformed JSON payloads.
    }
  }, [behaviour]);

  const editJsonField = useCallback(
    (fieldKey, title, fallbackValue) => {
      if (typeof window === "undefined" || !window.prompt) return;
      const current = behaviour[fieldKey];
      const payload =
        current == null
          ? JSON.stringify(fallbackValue ?? null, null, 2)
          : JSON.stringify(current, null, 2);
      const raw = window.prompt(title, payload);
      if (raw == null) return;
      try {
        const parsed = raw.trim() ? JSON.parse(raw) : null;
        behaviour[fieldKey] = parsed;
        updateBehaviours();
      } catch {
        // ignore malformed json
      }
    },
    [behaviour],
  );
  const ensureReactiveSourceBehaviour = useCallback(
    (sourceId) => {
      if (!sourceBehaviourBySource[sourceId]) return;
      const behaviours = defaultConfig?.emitterConfig?.behaviours || [];
      if (behaviours.some((b) => b?.name === sourceBehaviourBySource[sourceId])) return;
      const injected = [...behaviours];
      if (sourceId === "soundReactive") {
        injected.push({
          enabled: true,
          priority: 0,
          isPlaying: true,
          frequencyFactor: 1.1,
          beatSensitivity: 0.9,
          useColor: false,
          useSize: false,
          useVelocity: false,
          useRotation: false,
          name: "SoundReactiveBehaviour",
        });
      } else if (sourceId === "pulse") {
        injected.push({
          enabled: true,
          priority: -35,
          frequency: 1.7,
          amplitude: 0.95,
          phaseOffset: 0,
          applyScalePulse: false,
          applyVelocityPulse: false,
          applyColorPulse: false,
          mode: "sine",
          name: "PulseBehaviour",
        });
      } else if (sourceId === "beatPhaseLock") {
        injected.push({
          enabled: true,
          priority: -35,
          bpm: 124,
          lockStrength: 0.88,
          jitter: 0.07,
          harmonic: 1,
          writePhaseForVisual: true,
          applyScalePulse: false,
          name: "BeatPhaseLockBehaviour",
        });
      }
      defaultConfig.emitterConfig.behaviours = injected;
      updateProps("emitterConfig.behaviours", injected, undefined, true);
    },
    [defaultConfig],
  );

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>
        Recursive Firework Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <RecursiveFireworkDescription />
        <RfSectionLabel help={RF_HELP.general}>General & presets</RfSectionLabel>
        <RfCheckbox
          label="Enabled"
          id="recursive-firework-enabled"
          checked={behaviour.enabled ?? keysToInitialize.enabled}
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
        />
        <RfInputNumber
          label="Priority"
          id="recursive-firework-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="1"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <div className="form-group">
          <label className="col-xs-4 form-label">Preset</label>
          <div className="col-xs-8">
            <button className="btn btn-default btn-block" onClick={() => applyPreset("classic")}>Classic (Cinematic)</button>
            <button className="btn btn-default btn-block" onClick={() => applyPreset("palm")}>Palm</button>
            <button className="btn btn-default btn-block" onClick={() => applyPreset("chainReaction")}>Chain Reaction</button>
            <button className="btn btn-default btn-block" onClick={() => applyPreset("saturnRing")}>Saturn Ring</button>
            <button className="btn btn-default btn-block" onClick={() => applyPreset("dnaSpiralBurst")}>DNA Spiral Burst</button>
            <button className="btn btn-default btn-block" onClick={() => applyPreset("ideationMinefield")}>Ideation: Proximity minefield</button>
            <button className="btn btn-default btn-block" onClick={() => applyPreset("ideationMagneticPull")}>Ideation: Magnetic mouse pull</button>
            <button className="btn btn-default btn-block" onClick={() => applyPreset("reactiveBeatBurst")}>Reactive: Beat burst</button>
            <button className="btn btn-default btn-block" onClick={() => applyPreset("reactiveMultiSourceMix")}>Reactive: Multi-source mix</button>
            <button className="btn btn-default btn-block" onClick={() => applyPreset("depthCathedral")}>Depth Narrative: Cathedral</button>
            <button className="btn btn-default btn-block" onClick={() => applyPreset("depthFractalRain")}>Depth Narrative: Fractal Rain</button>
          </div>
        </div>
        <div className="form-group">
          <label className="col-xs-4 form-label">Preset Locks</label>
          <PresetLockControls
            idPrefix="rf-preset-lock"
            value={presetLocks}
            onChange={setPresetLocks}
          />
        </div>
        <div className="form-group">
          <label className="col-xs-4 form-label" htmlFor="rf-device-profile">
            Device Profile
          </label>
          <div className="col-xs-8">
            <select
              id="rf-device-profile"
              className="form-control"
              value={deviceProfile}
              onChange={(e) => applyDeviceProfile(e.target.value)}
            >
              <option value="quality">quality</option>
              <option value="balanced">balanced</option>
              <option value="performance">performance</option>
            </select>
            <RfSelectHint id="rf-device-profile" />
          </div>
        </div>
        <RfCheckbox
          label="Advanced"
          id="recursive-firework-advanced"
          checked={advanced}
          onChange={(value) => setAdvanced(value)}
        />
        <p className="explanation">
          Complexity: <strong>{complexityLevel}</strong> (~{complexityEstimate} spawned descendants)
        </p>
        <details open style={{ marginBottom: 12 }}>
          <summary style={{ cursor: "pointer", fontWeight: 600, marginBottom: 8 }}>
            Reactive inputs
          </summary>
          <div>
            <RfSectionLabel help={RF_HELP.reactiveInputs}>
              Reactive inputs
            </RfSectionLabel>
            <RfSubsectionLabel help={RF_HELP.reactiveMapping}>
              Signal mapping
            </RfSubsectionLabel>
            <div className="form-group">
              <label className="col-xs-4 form-label" htmlFor="rf-reactive-source">
                Reactive Source
              </label>
              <div className="col-xs-8">
                <select
                  id="rf-reactive-source"
                  className="form-control"
                  value={reactiveSourceVal}
                  onChange={(e) => {
                    behaviour.reactiveSource = e.target.value;
                    if (e.target.value !== "auto") ensureReactiveSourceBehaviour(e.target.value);
                    updateBehaviours();
                  }}
                >
                  <option value="auto">auto</option>
                  <option value="soundReactive">soundReactive</option>
                  <option value="pulse">pulse</option>
                  <option value="beatPhaseLock">beatPhaseLock</option>
                </select>
                <RfSelectHint id="rf-reactive-source" />
                <p className="explanation" style={{ marginTop: 6 }}>
                  Source health: <strong>{sourceHealthLabel}</strong>
                </p>
                <div className="explanation" style={{ marginTop: 4 }}>
                  {orderedSourceHealth.map(({ sourceId, ready }) => (
                    <div key={`rf-source-health-${sourceId}`}>
                      {ready ? "Ready" : "Missing"}: {sourceId}
                    </div>
                  ))}
                </div>
                {reactiveSourceVal !== "auto" && !sourceIsSatisfied ? (
                  <button
                    type="button"
                    className="btn btn-default btn-xs"
                    onClick={() => ensureReactiveSourceBehaviour(reactiveSourceVal)}
                  >
                    Configure Source Stack
                  </button>
                ) : null}
              </div>
            </div>
            <div className="form-group">
              <label className="col-xs-4 form-label" htmlFor="rf-reactive-blend-mode">
                Source blend
              </label>
              <div className="col-xs-8">
                <select
                  id="rf-reactive-blend-mode"
                  className="form-control"
                  value={reactiveBlendModeVal}
                  onChange={(e) => {
                    behaviour.reactiveSourceBlendMode = e.target.value;
                    updateBehaviours();
                  }}
                >
                  <option value="single">single</option>
                  <option value="weightedMix">weightedMix</option>
                  <option value="max">max</option>
                  <option value="priority">priority</option>
                </select>
                <RfSelectHint id="rf-reactive-blend-mode" />
              </div>
            </div>
            {reactiveBlendModeVal === "priority" ? (
              <div className="form-group">
                <label className="col-xs-4 form-label">
                  Priority order
                </label>
                <div className="col-xs-8">
                  {[0, 1, 2].map((slotIndex) => (
                    <div key={`rf-priority-slot-${slotIndex}`} style={{ marginBottom: 6 }}>
                      <select
                        className="form-control"
                        value={reactivePriorityVal[slotIndex]}
                        onChange={(e) => updatePrioritySlot(slotIndex, e.target.value)}
                      >
                        <option value="soundReactive">soundReactive</option>
                        <option value="pulse">pulse</option>
                        <option value="beatPhaseLock">beatPhaseLock</option>
                      </select>
                    </div>
                  ))}
                  <RfSelectHint id="rf-reactive-priority-order" />
                </div>
              </div>
            ) : null}
            <div className="form-group">
              <label className="col-xs-4 form-label" htmlFor="rf-reactive-mode">
                Reactive Mode
              </label>
              <div className="col-xs-8">
                <select
                  id="rf-reactive-mode"
                  className="form-control"
                  value={reactiveModeVal}
                  onChange={(e) => {
                    behaviour.reactiveMode = e.target.value;
                    updateBehaviours();
                  }}
                >
                  <option value="off">off</option>
                  <option value="beatBurst">beatBurst</option>
                  <option value="spectralShapeMorph">spectralShapeMorph</option>
                  <option value="energyRecursion">energyRecursion</option>
                  <option value="phaseLockedOrbit">phaseLockedOrbit</option>
                  <option value="paletteEnergyMorph">paletteEnergyMorph</option>
                </select>
                <RfSelectHint id="rf-reactive-mode" />
              </div>
            </div>
            <RfInputNumber
              label="Reactive gain"
              id="recursive-firework-reactive-gain"
              value={behaviour.reactiveGain ?? keysToInitialize.reactiveGain}
              step="0.05"
              min="0"
              max="4"
              onChange={(value) => {
                behaviour.reactiveGain = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Reactive smoothing"
              id="recursive-firework-reactive-smoothing"
              value={behaviour.reactiveSmoothing ?? keysToInitialize.reactiveSmoothing}
              step="0.01"
              min="0"
              max="1"
              onChange={(value) => {
                behaviour.reactiveSmoothing = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Reactive threshold"
              id="recursive-firework-reactive-threshold"
              value={behaviour.reactiveThreshold ?? keysToInitialize.reactiveThreshold}
              step="0.01"
              min="0"
              max="1"
              onChange={(value) => {
                behaviour.reactiveThreshold = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Reactive cooldown (ms)"
              id="recursive-firework-reactive-cooldown"
              value={behaviour.reactiveCooldownMs ?? keysToInitialize.reactiveCooldownMs}
              step="1"
              min="0"
              max="2500"
              onChange={(value) => {
                behaviour.reactiveCooldownMs = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Reactive influence"
              id="recursive-firework-reactive-influence"
              value={behaviour.reactiveInfluence ?? keysToInitialize.reactiveInfluence}
              step="0.01"
              min="0"
              max="1"
              onChange={(value) => {
                behaviour.reactiveInfluence = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Shape jitter (spectral mode)"
              id="recursive-firework-reactive-shape-jitter"
              value={behaviour.reactiveShapeJitter ?? keysToInitialize.reactiveShapeJitter}
              step="0.01"
              min="0"
              max="1"
              onChange={(value) => {
                behaviour.reactiveShapeJitter = value;
                updateBehaviours();
              }}
            />
            <div className="form-group">
              <label className="col-xs-4 form-label" htmlFor="rf-reactive-trace-mode">
                Trace mode
              </label>
              <div className="col-xs-8">
                <select
                  id="rf-reactive-trace-mode"
                  className="form-control"
                  value={behaviour.reactiveTraceMode ?? "off"}
                  onChange={(e) => {
                    behaviour.reactiveTraceMode = e.target.value;
                    updateBehaviours();
                  }}
                >
                  <option value="off">off</option>
                  <option value="record">record</option>
                  <option value="playback">playback</option>
                </select>
                <RfSelectHint id="rf-reactive-trace-mode" />
                <p className="explanation" style={{ marginTop: 6 }}>
                  Stored samples: <strong>{(behaviour.reactiveTraceValues || []).length}</strong>
                </p>
              </div>
            </div>
            <RfCheckbox
              label="Trace loop playback"
              id="recursive-firework-reactive-trace-loop"
              checked={behaviour.reactiveTraceLoop ?? keysToInitialize.reactiveTraceLoop}
              onChange={(value) => {
                behaviour.reactiveTraceLoop = value;
                updateBehaviours();
              }}
            />
            <div className="form-group">
              <div className="col-xs-12" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button type="button" className="btn btn-default btn-xs" onClick={clearReactiveTrace}>
                  Clear trace
                </button>
                <button type="button" className="btn btn-default btn-xs" onClick={exportReactiveTrace}>
                  Export trace
                </button>
                <button type="button" className="btn btn-default btn-xs" onClick={importReactiveTrace}>
                  Import trace
                </button>
              </div>
            </div>

            <details style={{ marginTop: 10 }}>
              <summary style={{ cursor: "pointer", fontWeight: 600, marginBottom: 8 }}>
                ReactiveV2 (matrix)
              </summary>
              <div className="explanation" style={{ marginBottom: 8 }}>
                ReactiveV2 adds a modulation matrix that can drive spawn amount, recursion, spread, angle, and color from energy/onset/flux and phases.
              </div>
              <RfCheckbox
                label="Enable ReactiveV2"
                id="rf-reactivev2-enabled"
                checked={!!behaviour.reactiveV2?.enabled}
                onChange={(value) => {
                  if (value) {
                    behaviour.reactiveV2 = behaviour.reactiveV2 || { enabled: true };
                    behaviour.reactiveV2.enabled = true;
                  } else {
                    behaviour.reactiveV2 = null;
                  }
                  updateBehaviours();
                }}
              />
              {behaviour.reactiveV2?.enabled ? (
                <>
                  <RfCheckbox
                    label="ReactiveV2 debug (Inspector mapped)"
                    id="rf-reactivev2-debug"
                    checked={!!behaviour.reactiveV2?.debug}
                    onChange={(value) => {
                      behaviour.reactiveV2 = behaviour.reactiveV2 || { enabled: true };
                      behaviour.reactiveV2.debug = value;
                      updateBehaviours();
                    }}
                  />
                  <div className="form-group">
                    <div className="col-xs-12" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <button
                        type="button"
                        className="btn btn-default btn-xs"
                        onClick={() => {
                          behaviour.reactiveV2 = {
                            enabled: true,
                            debug: true,
                            gain: 1,
                            limiter: { knee: 0.25, ratio: 3, ceiling: 1 },
                            perf: { enabled: true, startRatio: 0.65, fullRatio: 0.92, minMult: 0.2 },
                            matrix: [
                              { source: "onset", target: "spawnAmountMult", amount: 0.9, curve: "easeOut" },
                              { source: "energy", target: "childChanceMult", amount: 0.6, curve: "smoothstep" },
                              { source: "phase2x", target: "baseAngleAddRad", amount: 1.0, curve: "linear" },
                            ],
                          };
                          updateBehaviours();
                        }}
                      >
                        Preset: EDM Punch
                      </button>
                      <button
                        type="button"
                        className="btn btn-default btn-xs"
                        onClick={() => {
                          behaviour.reactiveV2 = {
                            enabled: true,
                            debug: true,
                            gain: 1,
                            limiter: { knee: 0.35, ratio: 4, ceiling: 1 },
                            perf: { enabled: true, startRatio: 0.65, fullRatio: 0.92, minMult: 0.25 },
                            matrix: [
                              { source: "loudness", target: "spawnAmountMult", amount: 0.35, curve: "smoothstep" },
                              { source: "flux", target: "spreadMult", amount: 0.35, curve: "easeOut" },
                              { source: "energy", target: "paletteSatMult", amount: 0.35, curve: "smoothstep" },
                            ],
                          };
                          updateBehaviours();
                        }}
                      >
                        Preset: Ambient Bloom
                      </button>
                      <button
                        type="button"
                        className="btn btn-default btn-xs"
                        onClick={() => {
                          behaviour.reactiveV2 = {
                            enabled: true,
                            debug: true,
                            gain: 1,
                            limiter: { knee: 0.2, ratio: 3, ceiling: 1 },
                            perf: { enabled: true, startRatio: 0.65, fullRatio: 0.92, minMult: 0.2 },
                            matrix: [
                              { source: "onset", target: "spawnAmountMult", amount: 0.7, curve: "easeOut" },
                              { source: "flux", target: "spreadMult", amount: 0.55, curve: "easeOut" },
                              { source: "phase4x", target: "baseAngleAddRad", amount: 1.4, curve: "linear" },
                            ],
                          };
                          updateBehaviours();
                        }}
                      >
                        Preset: Drum-n-Bass Scatter
                      </button>
                      <button
                        type="button"
                        className="btn btn-default btn-xs"
                        onClick={() => {
                          behaviour.reactiveV2 = {
                            enabled: true,
                            debug: true,
                            gain: 1,
                            limiter: { knee: 0.35, ratio: 5, ceiling: 1 },
                            perf: { enabled: true, startRatio: 0.65, fullRatio: 0.92, minMult: 0.25 },
                            matrix: [
                              { source: "loudness", target: "spawnAmountMult", amount: 0.45, curve: "smoothstep" },
                              { source: "energy", target: "childChanceMult", amount: 0.35, curve: "smoothstep" },
                              { source: "energy", target: "paletteHueAddDeg", amount: 0.35, curve: "easeInOut" },
                            ],
                          };
                          updateBehaviours();
                        }}
                      >
                        Preset: Cinematic Swell
                      </button>
                    </div>
                  </div>
                </>
              ) : null}
            </details>
            {advanced && (
              <>
                <RfInputNumber
                  label="Reactive attack"
                  id="recursive-firework-reactive-attack"
                  value={behaviour.reactiveAttack ?? keysToInitialize.reactiveAttack}
                  step="0.01"
                  min="0"
                  max="1"
                  onChange={(value) => {
                    behaviour.reactiveAttack = value;
                    updateBehaviours();
                  }}
                />
                <RfInputNumber
                  label="Reactive release"
                  id="recursive-firework-reactive-release"
                  value={behaviour.reactiveRelease ?? keysToInitialize.reactiveRelease}
                  step="0.01"
                  min="0"
                  max="1"
                  onChange={(value) => {
                    behaviour.reactiveRelease = value;
                    updateBehaviours();
                  }}
                />
                <RfInputNumber
                  label="Threshold on"
                  id="recursive-firework-reactive-threshold-on"
                  value={behaviour.reactiveThresholdOn ?? keysToInitialize.reactiveThresholdOn}
                  step="0.01"
                  min="0"
                  max="1"
                  onChange={(value) => {
                    behaviour.reactiveThresholdOn = value;
                    updateBehaviours();
                  }}
                />
                <RfInputNumber
                  label="Threshold off"
                  id="recursive-firework-reactive-threshold-off"
                  value={behaviour.reactiveThresholdOff ?? keysToInitialize.reactiveThresholdOff}
                  step="0.01"
                  min="0"
                  max="1"
                  onChange={(value) => {
                    behaviour.reactiveThresholdOff = value;
                    updateBehaviours();
                  }}
                />
                <RfInputNumber
                  label="Cooldown jitter (ms)"
                  id="recursive-firework-reactive-cooldown-jitter"
                  value={behaviour.reactiveCooldownJitterMs ?? keysToInitialize.reactiveCooldownJitterMs}
                  step="1"
                  min="0"
                  max="1500"
                  onChange={(value) => {
                    behaviour.reactiveCooldownJitterMs = value;
                    updateBehaviours();
                  }}
                />
                <RfInputNumber
                  label="Reactive envelope attack (ms)"
                  id="recursive-firework-reactive-env-attack"
                  value={behaviour.reactiveEnvelopeAttackMs ?? keysToInitialize.reactiveEnvelopeAttackMs}
                  step="1"
                  min="1"
                  max="600"
                  onChange={(value) => {
                    behaviour.reactiveEnvelopeAttackMs = value;
                    updateBehaviours();
                  }}
                />
                <RfInputNumber
                  label="Reactive envelope release (ms)"
                  id="recursive-firework-reactive-env-release"
                  value={behaviour.reactiveEnvelopeReleaseMs ?? keysToInitialize.reactiveEnvelopeReleaseMs}
                  step="1"
                  min="1"
                  max="1200"
                  onChange={(value) => {
                    behaviour.reactiveEnvelopeReleaseMs = value;
                    updateBehaviours();
                  }}
                />
                <RfInputNumber
                  label="Sound update every N frames"
                  id="recursive-firework-reactive-sound-decimate"
                  value={behaviour.reactiveSoundUpdateEveryNFrames ?? keysToInitialize.reactiveSoundUpdateEveryNFrames}
                  step="1"
                  min="1"
                  max="12"
                  onChange={(value) => {
                    behaviour.reactiveSoundUpdateEveryNFrames = value;
                    updateBehaviours();
                  }}
                />
                <RfInputNumber
                  label="Weight: soundReactive"
                  id="recursive-firework-reactive-weight-sound"
                  value={behaviour.reactiveSourceWeights?.soundReactive ?? keysToInitialize.reactiveSourceWeights.soundReactive}
                  step="0.05"
                  min="0"
                  max="4"
                  onChange={(value) => {
                    behaviour.reactiveSourceWeights = { ...(behaviour.reactiveSourceWeights || keysToInitialize.reactiveSourceWeights), soundReactive: value };
                    updateBehaviours();
                  }}
                />
                <RfInputNumber
                  label="Weight: pulse"
                  id="recursive-firework-reactive-weight-pulse"
                  value={behaviour.reactiveSourceWeights?.pulse ?? keysToInitialize.reactiveSourceWeights.pulse}
                  step="0.05"
                  min="0"
                  max="4"
                  onChange={(value) => {
                    behaviour.reactiveSourceWeights = { ...(behaviour.reactiveSourceWeights || keysToInitialize.reactiveSourceWeights), pulse: value };
                    updateBehaviours();
                  }}
                />
                <RfInputNumber
                  label="Weight: beatPhaseLock"
                  id="recursive-firework-reactive-weight-beat"
                  value={behaviour.reactiveSourceWeights?.beatPhaseLock ?? keysToInitialize.reactiveSourceWeights.beatPhaseLock}
                  step="0.05"
                  min="0"
                  max="4"
                  onChange={(value) => {
                    behaviour.reactiveSourceWeights = { ...(behaviour.reactiveSourceWeights || keysToInitialize.reactiveSourceWeights), beatPhaseLock: value };
                    updateBehaviours();
                  }}
                />
                <RfInputNumber
                  label="Channel: energy"
                  id="recursive-firework-reactive-channel-energy"
                  value={behaviour.reactiveChannelWeights?.energy ?? keysToInitialize.reactiveChannelWeights.energy}
                  step="0.05"
                  min="0"
                  max="3"
                  onChange={(value) => {
                    behaviour.reactiveChannelWeights = { ...(behaviour.reactiveChannelWeights || keysToInitialize.reactiveChannelWeights), energy: value };
                    updateBehaviours();
                  }}
                />
                <RfInputNumber
                  label="Channel: beat"
                  id="recursive-firework-reactive-channel-beat"
                  value={behaviour.reactiveChannelWeights?.beat ?? keysToInitialize.reactiveChannelWeights.beat}
                  step="0.05"
                  min="0"
                  max="3"
                  onChange={(value) => {
                    behaviour.reactiveChannelWeights = { ...(behaviour.reactiveChannelWeights || keysToInitialize.reactiveChannelWeights), beat: value };
                    updateBehaviours();
                  }}
                />
                <RfInputNumber
                  label="BeatPhase->Energy"
                  id="recursive-firework-reactive-channel-beat-energy"
                  value={behaviour.reactiveChannelWeights?.beatPhaseToEnergy ?? keysToInitialize.reactiveChannelWeights.beatPhaseToEnergy}
                  step="0.05"
                  min="0"
                  max="1.5"
                  onChange={(value) => {
                    behaviour.reactiveChannelWeights = { ...(behaviour.reactiveChannelWeights || keysToInitialize.reactiveChannelWeights), beatPhaseToEnergy: value };
                    updateBehaviours();
                  }}
                />
                <RfInputNumber
                  label="Route: burst amount"
                  id="recursive-firework-reactive-route-burst"
                  value={behaviour.reactiveRouting?.burstAmount ?? keysToInitialize.reactiveRouting.burstAmount}
                  step="0.05"
                  min="0"
                  max="1.5"
                  onChange={(value) => {
                    behaviour.reactiveRouting = { ...(behaviour.reactiveRouting || keysToInitialize.reactiveRouting), burstAmount: value };
                    updateBehaviours();
                  }}
                />
                <RfInputNumber
                  label="Route: recursion chance"
                  id="recursive-firework-reactive-route-recursion"
                  value={behaviour.reactiveRouting?.recursionChance ?? keysToInitialize.reactiveRouting.recursionChance}
                  step="0.05"
                  min="0"
                  max="1.5"
                  onChange={(value) => {
                    behaviour.reactiveRouting = { ...(behaviour.reactiveRouting || keysToInitialize.reactiveRouting), recursionChance: value };
                    updateBehaviours();
                  }}
                />
                <RfInputNumber
                  label="Route: spread"
                  id="recursive-firework-reactive-route-spread"
                  value={behaviour.reactiveRouting?.spread ?? keysToInitialize.reactiveRouting.spread}
                  step="0.05"
                  min="0"
                  max="1.5"
                  onChange={(value) => {
                    behaviour.reactiveRouting = { ...(behaviour.reactiveRouting || keysToInitialize.reactiveRouting), spread: value };
                    updateBehaviours();
                  }}
                />
                <RfInputNumber
                  label="Route: base angle"
                  id="recursive-firework-reactive-route-angle"
                  value={behaviour.reactiveRouting?.baseAngle ?? keysToInitialize.reactiveRouting.baseAngle}
                  step="0.05"
                  min="0"
                  max="1.5"
                  onChange={(value) => {
                    behaviour.reactiveRouting = { ...(behaviour.reactiveRouting || keysToInitialize.reactiveRouting), baseAngle: value };
                    updateBehaviours();
                  }}
                />
                <RfInputNumber
                  label="Palette hue range"
                  id="recursive-firework-reactive-palette-hue-range"
                  value={behaviour.reactivePaletteHueRange ?? keysToInitialize.reactivePaletteHueRange}
                  step="1"
                  min="0"
                  max="180"
                  onChange={(value) => {
                    behaviour.reactivePaletteHueRange = value;
                    updateBehaviours();
                  }}
                />
                <RfInputNumber
                  label="Palette saturation boost"
                  id="recursive-firework-reactive-palette-saturation"
                  value={behaviour.reactivePaletteSaturationBoost ?? keysToInitialize.reactivePaletteSaturationBoost}
                  step="0.05"
                  min="0"
                  max="2"
                  onChange={(value) => {
                    behaviour.reactivePaletteSaturationBoost = value;
                    updateBehaviours();
                  }}
                />
                <RfCheckbox
                  label="Debug reactive logs"
                  id="recursive-firework-debug-reactive-signals"
                  checked={behaviour.debugReactiveSignals ?? keysToInitialize.debugReactiveSignals}
                  onChange={(value) => {
                    behaviour.debugReactiveSignals = value;
                    updateBehaviours();
                  }}
                />
                <RfInputNumber
                  label="Debug log every N frames"
                  id="recursive-firework-debug-reactive-frequency"
                  value={behaviour.debugReactiveLogEveryFrames ?? keysToInitialize.debugReactiveLogEveryFrames}
                  step="1"
                  min="1"
                  max="240"
                  onChange={(value) => {
                    behaviour.debugReactiveLogEveryFrames = value;
                    updateBehaviours();
                  }}
                />
              </>
            )}
          </div>
        </details>
        {advanced && selectedPreset ? (
          <p className="explanation">
            Preset lock check ({selectedPreset}): {presetEnvelopeWarnings.length ? presetEnvelopeWarnings.join(" ") : "OK"}
          </p>
        ) : null}
        <RfSectionLabel help={RF_HELP.particleTextures}>
          Particle images
        </RfSectionLabel>
        {predefinedTextureElements.length === 0 ? (
          <p className="col-xs-12 text-muted" style={{ fontSize: 12 }}>
            Load assets (same as General Properties) to list texture keys here.
          </p>
        ) : (
          <>
            <RfTextureKeyPickerList
              id="rf-tex-comet"
              label="Comet"
              hintId="rf-tex-comet"
              elements={predefinedTextureElements}
              value={behaviour.cometTextureKeys}
              onChange={(next) => {
                behaviour.cometTextureKeys = next;
                updateBehaviours();
              }}
            />
            <RfTextureKeyPickerList
              id="rf-tex-explosion"
              label="Explosion"
              hintId="rf-tex-explosion"
              elements={predefinedTextureElements}
              value={behaviour.explosionTextureKeys}
              onChange={(next) => {
                behaviour.explosionTextureKeys = next;
                updateBehaviours();
              }}
            />
            <RfTextureKeyPickerList
              id="rf-tex-explosion-particles"
              label="Explosion particles"
              hintId="rf-tex-explosion-particles"
              elements={predefinedTextureElements}
              value={behaviour.explosionParticleTextureKeys}
              onChange={(next) => {
                behaviour.explosionParticleTextureKeys = next;
                updateBehaviours();
              }}
            />
          </>
        )}
        <hr />
        <RfSectionLabel help={RF_HELP.risingComet}>Rising comet</RfSectionLabel>
        <RfSubsectionLabel help={RF_HELP.pathJitter}>Path & jitter</RfSubsectionLabel>
        <RfInputNumber
          label="Curve Force"
          id="recursive-firework-comet-curve"
          value={behaviour.cometCurve ?? keysToInitialize.cometCurve}
          step="1"
          onChange={(value) => {
            behaviour.cometCurve = value;
            updateBehaviours();
          }}
        />
        {advanced && (
          <details open style={{ marginBottom: 12 }}>
            <summary style={{ cursor: "pointer", fontWeight: 600, marginBottom: 8 }}>
              Advanced — motion, trigger &amp; burst shape
            </summary>
            <div>
            <RfSectionLabel help={RF_HELP.explodeAim}>When it explodes & aim (advanced)</RfSectionLabel>
            <div className="form-group">
              <label className="col-xs-4 form-label" htmlFor="rf-trigger-mode">
                Trigger Mode
              </label>
              <div className="col-xs-8">
                <select
                  id="rf-trigger-mode"
                  className="form-control"
                  value={behaviour.triggerMode ?? "lifeProgress"}
                  onChange={(e) => {
                    behaviour.triggerMode = e.target.value;
                    updateBehaviours();
                  }}
                >
                  <option value="lifeProgress">lifeProgress</option>
                  <option value="apex">apex</option>
                  <option value="distanceFromOrigin">distanceFromOrigin</option>
                </select>
                <RfSelectHint id="rf-trigger-mode" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-xs-4 form-label" htmlFor="rf-direction-mode">
                Direction Mode
              </label>
              <div className="col-xs-8">
                <select
                  id="rf-direction-mode"
                  className="form-control"
                  value={behaviour.directionMode ?? "fixed"}
                  onChange={(e) => {
                    behaviour.directionMode = e.target.value;
                    updateBehaviours();
                  }}
                >
                  <option value="fixed">fixed</option>
                  <option value="followVelocity">followVelocity</option>
                  <option value="awayFromCenter">awayFromCenter</option>
                  <option value="randomPerBurst">randomPerBurst</option>
                </select>
                <RfSelectHint id="rf-direction-mode" />
              </div>
            </div>
            {triggerMode === "distanceFromOrigin" && (
              <RfInputNumber
                label="Explode Distance"
                id="recursive-firework-explode-distance"
                value={behaviour.explodeDistance ?? keysToInitialize.explodeDistance}
                step="1"
                min="0"
                onChange={(value) => {
                  behaviour.explodeDistance = value;
                  updateBehaviours();
                }}
              />
            )}
            <RfInputNumber
              label="Curve Variance"
              id="recursive-firework-comet-curve-var"
              value={behaviour.cometCurveVariance ?? keysToInitialize.cometCurveVariance}
              step="1"
              min="0"
              onChange={(value) => {
                behaviour.cometCurveVariance = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Noise Variance"
              id="recursive-firework-comet-noise-var"
              value={behaviour.cometNoiseVariance ?? keysToInitialize.cometNoiseVariance}
              step="1"
              min="0"
              onChange={(value) => {
                behaviour.cometNoiseVariance = value;
                updateBehaviours();
              }}
            />
            <RfSectionLabel help={RF_HELP.burstShape}>Burst shape & spread by depth</RfSectionLabel>
            <div className="form-group">
              <label className="col-xs-4 form-label" htmlFor="rf-burst-shape">
                Burst Shape
              </label>
              <div className="col-xs-8">
                <select
                  id="rf-burst-shape"
                  className="form-control"
                  value={behaviour.burstShape ?? "circle"}
                  onChange={(e) => {
                    behaviour.burstShape = e.target.value;
                    updateBehaviours();
                  }}
                >
                  <option value="circle">circle</option>
                  <option value="ring">ring</option>
                  <option value="cone">cone</option>
                  <option value="star">star</option>
                  <option value="heart">heart</option>
                  <option value="peony">peony</option>
                  <option value="willow">willow</option>
                  <option value="crossette">crossette</option>
                  <option value="horsetail">horsetail</option>
                  <option value="spiral">spiral</option>
                </select>
                <RfSelectHint id="rf-burst-shape" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-xs-4 form-label" htmlFor="rf-child-direction">
                Child Direction
              </label>
              <div className="col-xs-8">
                <select
                  id="rf-child-direction"
                  className="form-control"
                  value={childDirectionModeVal}
                  onChange={(e) => {
                    behaviour.childDirectionMode = e.target.value;
                    updateBehaviours();
                  }}
                >
                  <option value="radial">radial</option>
                  <option value="inheritVelocity">inheritVelocity</option>
                  <option value="tangentCurve">tangentCurve</option>
                  <option value="reflected">reflected</option>
                </select>
                <RfSelectHint id="rf-child-direction" />
              </div>
            </div>
            <RfInputNumber
              label="Inherit Direction Strength"
              id="recursive-firework-inherit-dir-strength"
              value={
                behaviour.inheritDirectionStrength ??
                keysToInitialize.inheritDirectionStrength
              }
              step="0.01"
              min="0"
              max="1"
              onChange={(value) => {
                behaviour.inheritDirectionStrength = value;
                updateBehaviours();
              }}
            />
            {burstShapeVal === "cone" && (
              <RfInputNumber
                label="Cone Degrees"
                id="recursive-firework-cone-degrees"
                value={behaviour.coneDegrees ?? keysToInitialize.coneDegrees}
                step="1"
                min="1"
                max="360"
                onChange={(value) => {
                  behaviour.coneDegrees = value;
                  updateBehaviours();
                }}
              />
            )}
            {burstShapeVal === "star" && (
              <RfInputNumber
                label="Star Points"
                id="recursive-firework-star-points"
                value={behaviour.starPoints ?? keysToInitialize.starPoints}
                step="1"
                min="3"
                max="12"
                onChange={(value) => {
                  behaviour.starPoints = value;
                  updateBehaviours();
                }}
              />
            )}
            {burstShapeVal === "peony" && (
              <RfInputNumber
                label="Peony Petals"
                id="recursive-firework-peony-petals"
                value={behaviour.peonyPetals ?? keysToInitialize.peonyPetals}
                step="1"
                min="3"
                onChange={(value) => {
                  behaviour.peonyPetals = value;
                  updateBehaviours();
                }}
              />
            )}
            {burstShapeVal === "willow" && (
              <RfInputNumber
                label="Willow Arc Jitter"
                id="recursive-firework-willow-jitter"
                value={behaviour.willowArcJitter ?? keysToInitialize.willowArcJitter}
                step="0.01"
                min="0"
                onChange={(value) => {
                  behaviour.willowArcJitter = value;
                  updateBehaviours();
                }}
              />
            )}
            {burstShapeVal === "crossette" && (
              <RfInputNumber
                label="Crossette Branches"
                id="recursive-firework-crossette-branches"
                value={behaviour.crossetteBranches ?? keysToInitialize.crossetteBranches}
                step="1"
                min="2"
                onChange={(value) => {
                  behaviour.crossetteBranches = value;
                  updateBehaviours();
                }}
              />
            )}
            {burstShapeVal === "horsetail" && (
              <RfInputNumber
                label="Horsetail Tightness"
                id="recursive-firework-horsetail-tightness"
                value={behaviour.horsetailTightness ?? keysToInitialize.horsetailTightness}
                step="0.01"
                min="0.01"
                max="1"
                onChange={(value) => {
                  behaviour.horsetailTightness = value;
                  updateBehaviours();
                }}
              />
            )}
            <RfInputString
              label="Spread by Depth"
              id="recursive-firework-spread-by-depth"
              value={getListInputValue("spreadByDepth")}
              onChange={(value) => editListInput("spreadByDepth", value)}
              onBlur={() => commitListInput("spreadByDepth")}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitListInput("spreadByDepth");
              }}
            />
            {directionModeVal === "fixed" && (
              <RfInputString
                label="Direction by Depth"
                id="recursive-firework-direction-by-depth"
                value={getListInputValue("directionByDepth")}
                onChange={(value) => editListInput("directionByDepth", value)}
                onBlur={() => commitListInput("directionByDepth")}
                onKeyDown={(e) => {
                  if (e.key === "Enter") commitListInput("directionByDepth");
                }}
              />
            )}
            </div>
          </details>
        )}
        <RfInputNumber
          label="Noise Force"
          id="recursive-firework-comet-noise"
          value={behaviour.cometNoise ?? keysToInitialize.cometNoise}
          step="1"
          min="0"
          onChange={(value) => {
            behaviour.cometNoise = value;
            updateBehaviours();
          }}
        />
        <RfSubsectionLabel help={RF_HELP.cometFade}>Comet fade</RfSubsectionLabel>
        <RfInputNumber
          label="Fade In"
          id="recursive-firework-comet-fadein"
          value={behaviour.cometFadeIn ?? keysToInitialize.cometFadeIn}
          step="0.01"
          min="0"
          max="1"
          onChange={(value) => {
            behaviour.cometFadeIn = value;
            updateBehaviours();
          }}
        />
        <RfInputNumber
          label="Fade Out"
          id="recursive-firework-comet-fadeout"
          value={behaviour.cometFadeOut ?? keysToInitialize.cometFadeOut}
          step="0.01"
          min="0"
          max="1"
          onChange={(value) => {
            behaviour.cometFadeOut = value;
            updateBehaviours();
          }}
        />
        <hr />
        <RfSectionLabel help={RF_HELP.explosionBurst}>Explosion burst</RfSectionLabel>
        <RfSubsectionLabel help={RF_HELP.particleCounts}>Particle counts & motion</RfSubsectionLabel>
        <RfInputNumber
          label="Particles Count"
          id="recursive-firework-explosion-count"
          value={
            behaviour.explosionParticleCount ??
            keysToInitialize.explosionParticleCount
          }
          step="1"
          min="0"
          onChange={(value) => {
            behaviour.explosionParticleCount = value;
            updateBehaviours();
          }}
        />
        <RfInputNumber
          label="Count Variance"
          id="recursive-firework-explosion-count-var"
          value={
            behaviour.explosionParticleCountVariance ??
            keysToInitialize.explosionParticleCountVariance
          }
          step="1"
          min="0"
          onChange={(value) => {
            behaviour.explosionParticleCountVariance = value;
            updateBehaviours();
          }}
        />
        <RfInputNumber
          label="Explosion Speed"
          id="recursive-firework-explosion-speed"
          value={behaviour.explosionSpeed ?? keysToInitialize.explosionSpeed}
          step="1"
          min="0"
          onChange={(value) => {
            behaviour.explosionSpeed = value;
            updateBehaviours();
          }}
        />
        <RfInputNumber
          label="Speed Variance"
          id="recursive-firework-explosion-speed-var"
          value={
            behaviour.explosionSpeedVariance ??
            keysToInitialize.explosionSpeedVariance
          }
          step="1"
          min="0"
          onChange={(value) => {
            behaviour.explosionSpeedVariance = value;
            updateBehaviours();
          }}
        />
        <RfInputNumber
          label="Explosion Lifetime"
          id="recursive-firework-explosion-life"
          value={
            behaviour.explosionLifetime ?? keysToInitialize.explosionLifetime
          }
          step="0.05"
          min="0.05"
          onChange={(value) => {
            behaviour.explosionLifetime = value;
            updateBehaviours();
          }}
        />
        <RfInputNumber
          label="Life Variance"
          id="recursive-firework-explosion-life-var"
          value={
            behaviour.explosionLifetimeVariance ??
            keysToInitialize.explosionLifetimeVariance
          }
          step="0.05"
          min="0"
          onChange={(value) => {
            behaviour.explosionLifetimeVariance = value;
            updateBehaviours();
          }}
        />
        <RfInputNumber
          label="Explosion Size"
          id="recursive-firework-explosion-size"
          value={behaviour.explosionSize ?? keysToInitialize.explosionSize}
          step="0.05"
          min="0.02"
          onChange={(value) => {
            behaviour.explosionSize = value;
            updateBehaviours();
          }}
        />
        {advanced && (
          <>
            <RfInputNumber
              label="Explosion Size Variance"
              id="recursive-firework-explosion-size-var"
              value={behaviour.explosionSizeVariance ?? keysToInitialize.explosionSizeVariance}
              step="0.05"
              min="0"
              onChange={(value) => {
                behaviour.explosionSizeVariance = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Explosion Alpha Start"
              id="recursive-firework-explosion-alpha-start"
              value={behaviour.explosionAlphaStart ?? keysToInitialize.explosionAlphaStart}
              step="0.01"
              min="0"
              max="1"
              onChange={(value) => {
                behaviour.explosionAlphaStart = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Explosion Alpha End"
              id="recursive-firework-explosion-alpha-end"
              value={behaviour.explosionAlphaEnd ?? keysToInitialize.explosionAlphaEnd}
              step="0.01"
              min="0"
              max="1"
              onChange={(value) => {
                behaviour.explosionAlphaEnd = value;
                updateBehaviours();
              }}
            />
          </>
        )}
        <RfSubsectionLabel help={RF_HELP.spreadTiming}>Spread & timing</RfSubsectionLabel>
        <RfInputNumber
          label="Spread Degrees"
          id="recursive-firework-spread"
          value={behaviour.spreadDegrees ?? keysToInitialize.spreadDegrees}
          step="1"
          min="0"
          max="360"
          onChange={(value) => {
            behaviour.spreadDegrees = value;
            updateBehaviours();
          }}
        />
        {advanced && (
          <>
            <RfInputNumber
              label="Spread Anisotropy"
              id="recursive-firework-spread-anisotropy"
              value={behaviour.spreadAnisotropy ?? keysToInitialize.spreadAnisotropy}
              step="0.01"
              min="0.05"
              max="4"
              onChange={(value) => {
                behaviour.spreadAnisotropy = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Spread Rotation (deg)"
              id="recursive-firework-spread-rotation"
              value={
                behaviour.spreadRotationDegrees ??
                keysToInitialize.spreadRotationDegrees
              }
              step="1"
              onChange={(value) => {
                behaviour.spreadRotationDegrees = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Child Chance Jitter / Burst"
              id="recursive-firework-child-chance-jitter-burst"
              value={
                behaviour.childChanceJitterPerBurst ??
                keysToInitialize.childChanceJitterPerBurst
              }
              step="0.01"
              min="0"
              max="1"
              onChange={(value) => {
                behaviour.childChanceJitterPerBurst = value;
                updateBehaviours();
              }}
            />
          </>
        )}
        <RfInputNumber
          label="Burst Stagger (ms)"
          id="recursive-firework-burst-stagger"
          value={behaviour.burstStaggerMs ?? 0}
          step="1"
          min="0"
          onChange={(value) => {
            behaviour.burstStaggerMs = value;
            updateBehaviours();
          }}
        />
        {advanced && (
          <RfInputNumber
            label="Burst Stagger Jitter (ms)"
            id="recursive-firework-burst-stagger-jitter"
            value={behaviour.burstStaggerJitter ?? keysToInitialize.burstStaggerJitter}
            step="1"
            min="0"
            onChange={(value) => {
              behaviour.burstStaggerJitter = value;
              updateBehaviours();
            }}
          />
        )}
        {directionModeVal === "fixed" && (
          <RfInputNumber
            label="Explosion Direction"
            id="recursive-firework-direction"
            value={
              behaviour.explosionDirectionDegrees ??
              keysToInitialize.explosionDirectionDegrees
            }
            step="1"
            min="-180"
            max="180"
            onChange={(value) => {
              behaviour.explosionDirectionDegrees = value;
              updateBehaviours();
            }}
          />
        )}
        {advanced && (
          <>
            <RfInputNumber
              label="Burst auto (× half texture span, root; 0=off)"
              id="recursive-firework-origin-auto-scale"
              value={
                behaviour.burstOriginAlongVelocityAutoScale ??
                keysToInitialize.burstOriginAlongVelocityAutoScale
              }
              step="0.05"
              min="0"
              max="2"
              onChange={(value) => {
                behaviour.burstOriginAlongVelocityAutoScale = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Burst auto fallback half-extent (px × scale, no sprite)"
              id="recursive-firework-origin-fallback-half-extent"
              value={
                behaviour.burstOriginAlongVelocityFallbackHalfExtentPx ??
                keysToInitialize.burstOriginAlongVelocityFallbackHalfExtentPx
              }
              step="1"
              min="8"
              max="256"
              onChange={(value) => {
                behaviour.burstOriginAlongVelocityFallbackHalfExtentPx = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Extra burst origin along velocity (px, root)"
              id="recursive-firework-origin-along-velocity"
              value={
                behaviour.explosionOriginAlongVelocityPx ??
                keysToInitialize.explosionOriginAlongVelocityPx
              }
              step="1"
              onChange={(value) => {
                behaviour.explosionOriginAlongVelocityPx = value;
                updateBehaviours();
              }}
            />
          </>
        )}
        {triggerMode === "lifeProgress" && (
          <>
            <RfInputNumber
              label="Trigger Min"
              id="recursive-firework-trigger-min"
              value={
                behaviour.explosionTriggerMin ?? keysToInitialize.explosionTriggerMin
              }
              step="0.01"
              min="0"
              max="1"
              onChange={(value) => {
                behaviour.explosionTriggerMin = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Trigger Max"
              id="recursive-firework-trigger-max"
              value={
                behaviour.explosionTriggerMax ?? keysToInitialize.explosionTriggerMax
              }
              step="0.01"
              min="0"
              max="1"
              onChange={(value) => {
                behaviour.explosionTriggerMax = value;
                updateBehaviours();
              }}
            />
          </>
        )}
        <RfSectionLabel help={RF_HELP.colors}>Colors</RfSectionLabel>
        {(() => {
          const w = [];
          const cols = behaviour.explosionColors;
          const n = Array.isArray(cols) ? cols.length : 0;
          const anim = behaviour.paletteAnimationMode ?? "none";
          if (anim === "depthGradient" && n < 2) {
            w.push("depthGradient needs at least two palette stops (fill Color #1 and #2).");
          }
          if (anim === "depthSwap" && n === 0) {
            w.push("depthSwap needs at least one palette stop.");
          }
          if (!w.length) return null;
          return (
            <div className="col-xs-12 alert alert-warning" style={{ fontSize: 12, padding: "8px 12px", marginBottom: 8 }}>
              {w.map((msg, i) => (
                <div key={i}>{msg}</div>
              ))}
            </div>
          );
        })()}
        <RfColorPicker
          id="recursive-firework-color-1"
          label="Color #1"
          color={colorValue(0)}
          colorChanged={(color) => {
            ensureColor(0);
            behaviour.explosionColors[0].r = color.rgb.r;
            behaviour.explosionColors[0].g = color.rgb.g;
            behaviour.explosionColors[0].b = color.rgb.b;
            updateBehaviours();
          }}
        />
        {advanced && (
          <details open style={{ marginBottom: 12 }}>
            <summary style={{ cursor: "pointer", fontWeight: 600, marginBottom: 8 }}>
              Advanced — palette &amp; color programs
            </summary>
            <div>
            <RfSectionLabel help={RF_HELP.palettePrograms}>Palette & color programs</RfSectionLabel>
            <div className="form-group">
              <label className="col-xs-4 form-label" htmlFor="rf-palette">
                Palette Strategy
              </label>
              <div className="col-xs-8">
                <select
                  id="rf-palette"
                  className="form-control"
                  value={behaviour.paletteStrategy ?? "randomFromPalette"}
                  onChange={(e) => {
                    behaviour.paletteStrategy = e.target.value;
                    updateBehaviours();
                  }}
                >
                  <option value="randomFromPalette">randomFromPalette</option>
                  <option value="monochrome">monochrome</option>
                  <option value="analogous">analogous</option>
                  <option value="complementary">complementary</option>
                  <option value="heat">heat</option>
                  <option value="triadic">triadic</option>
                  <option value="pastel">pastel</option>
                  <option value="electric">electric</option>
                  <option value="splitTriad">splitTriad</option>
                  <option value="paletteSweep">paletteSweep</option>
                  <option value="depthAware">depthAware</option>
                </select>
                <RfSelectHint id="rf-palette" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-xs-4 form-label" htmlFor="rf-depth-color-palette">
                Depth Color Palette
              </label>
              <div className="col-xs-8">
                <select
                  id="rf-depth-color-palette"
                  className="form-control"
                  value={depthColorPaletteModeVal}
                  onChange={(e) => {
                    behaviour.depthColorPaletteMode = e.target.value;
                    updateBehaviours();
                  }}
                >
                  <option value="inherit">inherit</option>
                  <option value="rotate">rotate</option>
                  <option value="complement">complement</option>
                  <option value="splitComplement">splitComplement</option>
                </select>
                <RfSelectHint id="rf-depth-color-palette" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-xs-4 form-label" htmlFor="rf-depth-program">
                Depth Program
              </label>
              <div className="col-xs-8">
                <select
                  id="rf-depth-program"
                  className="form-control"
                  value={depthProgramVal}
                  onChange={(e) => {
                    behaviour.depthProgram = e.target.value;
                    updateBehaviours();
                  }}
                >
                  <option value="none">none</option>
                  <option value="bloom">bloom</option>
                  <option value="cascade">cascade</option>
                  <option value="implode">implode</option>
                  <option value="fractal">fractal</option>
                </select>
                <RfSelectHint id="rf-depth-program" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-xs-4 form-label" htmlFor="rf-palette-anim">
                Palette Animation
              </label>
              <div className="col-xs-8">
                <select
                  id="rf-palette-anim"
                  className="form-control"
                  value={behaviour.paletteAnimationMode ?? "none"}
                  onChange={(e) => {
                    behaviour.paletteAnimationMode = e.target.value;
                    updateBehaviours();
                  }}
                >
                  <option value="none">none</option>
                  <option value="hueDrift">hueDrift</option>
                  <option value="depthSwap">depthSwap</option>
                  <option value="depthGradient">depthGradient</option>
                </select>
                <RfSelectHint id="rf-palette-anim" />
              </div>
            </div>
            {paletteAnimVal === "hueDrift" && (
              <RfInputNumber
                label="Palette Drift Degrees"
                id="recursive-firework-palette-drift"
                value={behaviour.paletteDriftDegrees ?? keysToInitialize.paletteDriftDegrees}
                step="1"
                min="0"
                onChange={(value) => {
                  behaviour.paletteDriftDegrees = value;
                  updateBehaviours();
                }}
              />
            )}
            {paletteStrategyVal === "heat" && (
              <RfInputNumber
                label="Heat Bias"
                id="recursive-firework-heat-bias"
                value={behaviour.heatBias ?? keysToInitialize.heatBias}
                step="0.01"
                min="0"
                max="1"
                onChange={(value) => {
                  behaviour.heatBias = value;
                  updateBehaviours();
                }}
              />
            )}
            <RfInputNumber
              label="Hue Shift per Child"
              id="recursive-firework-hue-shift-child"
              value={behaviour.hueShiftPerChild ?? keysToInitialize.hueShiftPerChild}
              step="1"
              onChange={(value) => {
                behaviour.hueShiftPerChild = value;
                updateBehaviours();
              }}
            />
            <div className="form-group">
              <label className="col-xs-4 form-label" htmlFor="rf-color-program">
                Color Program
              </label>
              <div className="col-xs-8">
                <select
                  id="rf-color-program"
                  className="form-control"
                  value={behaviour.colorProgramMode ?? "none"}
                  onChange={(e) => {
                    behaviour.colorProgramMode = e.target.value;
                    updateBehaviours();
                  }}
                >
                  <option value="none">none</option>
                  <option value="warmToCool">warmToCool</option>
                  <option value="coolToWarm">coolToWarm</option>
                  <option value="lumaPulse">lumaPulse</option>
                  <option value="lifeDesaturate">lifeDesaturate</option>
                  <option value="lifeSaturate">lifeSaturate</option>
                </select>
                <RfSelectHint id="rf-color-program" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-xs-4 form-label" htmlFor="rf-role-color-tint">
                Role color tint
              </label>
              <div className="col-xs-8">
                <select
                  id="rf-role-color-tint"
                  className="form-control"
                  value={behaviour.roleColorTint ?? "none"}
                  onChange={(e) => {
                    behaviour.roleColorTint = e.target.value;
                    updateBehaviours();
                  }}
                >
                  <option value="none">none</option>
                  <option value="coolCometWarmSpark">coolCometWarmSpark</option>
                </select>
                <RfSelectHint id="rf-role-color-tint" />
              </div>
            </div>
            {paletteStrategyVal === "monochrome" && (
              <RfColorPicker
                id="recursive-firework-color-mono"
                label="Monochrome Color"
                color={{
                  r: behaviour.monochromeColor?.r ?? 255,
                  g: behaviour.monochromeColor?.g ?? 170,
                  b: behaviour.monochromeColor?.b ?? 80,
                  a: 1,
                }}
                colorChanged={(color) => {
                  behaviour.monochromeColor = { r: color.rgb.r, g: color.rgb.g, b: color.rgb.b };
                  updateBehaviours();
                }}
              />
            )}
            </div>
          </details>
        )}
        <RfColorPicker
          id="recursive-firework-color-2"
          label="Color #2"
          color={colorValue(1)}
          colorChanged={(color) => {
            ensureColor(1);
            behaviour.explosionColors[1].r = color.rgb.r;
            behaviour.explosionColors[1].g = color.rgb.g;
            behaviour.explosionColors[1].b = color.rgb.b;
            updateBehaviours();
          }}
        />
        <RfColorPicker
          id="recursive-firework-color-3"
          label="Color #3"
          color={colorValue(2)}
          colorChanged={(color) => {
            ensureColor(2);
            behaviour.explosionColors[2].r = color.rgb.r;
            behaviour.explosionColors[2].g = color.rgb.g;
            behaviour.explosionColors[2].b = color.rgb.b;
            updateBehaviours();
          }}
        />
        <RfColorPicker
          id="recursive-firework-color-4"
          label="Color #4"
          color={colorValue(3)}
          colorChanged={(color) => {
            ensureColor(3);
            behaviour.explosionColors[3].r = color.rgb.r;
            behaviour.explosionColors[3].g = color.rgb.g;
            behaviour.explosionColors[3].b = color.rgb.b;
            updateBehaviours();
          }}
        />
        <div className="form-group" style={{ marginTop: 6 }}>
          <label className="col-xs-4 form-label">Palette ideas</label>
          <div className="col-xs-8" style={{ paddingTop: 4 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {COLOR_PALETTE_IDEA_ORDER.map((id) => {
                const idea = COLOR_PALETTE_IDEAS[id];
                if (!idea) return null;
                return (
                  <button
                    key={id}
                    type="button"
                    className="btn btn-default btn-xs"
                    onClick={() => applyColorPaletteIdea(id)}
                  >
                    {idea.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <hr />
        <RfSectionLabel help={RF_HELP.recursionChildren}>Recursion & children</RfSectionLabel>
        <RfInputNumber
          label="Recursion Depth"
          id="recursive-firework-depth"
          value={behaviour.recursionDepth ?? keysToInitialize.recursionDepth}
          step="1"
          min="0"
          onChange={(value) => {
            behaviour.recursionDepth = value;
            updateBehaviours();
          }}
        />
        <RfSubsectionLabel help={RF_HELP.perChildTuning}>Per-child tuning</RfSubsectionLabel>
        <RfInputNumber
          label="Child Comet Chance"
          id="recursive-firework-child-chance"
          value={
            behaviour.childCometProbability ??
            keysToInitialize.childCometProbability
          }
          step="0.01"
          min="0"
          max="1"
          onChange={(value) => {
            behaviour.childCometProbability = value;
            updateBehaviours();
          }}
        />
        <RfInputNumber
          label="Child Speed Mult"
          id="recursive-firework-child-speed-mult"
          value={
            behaviour.childSpeedMultiplier ??
            keysToInitialize.childSpeedMultiplier
          }
          step="0.05"
          min="0"
          onChange={(value) => {
            behaviour.childSpeedMultiplier = value;
            updateBehaviours();
          }}
        />
        <RfInputNumber
          label="Child Life Mult"
          id="recursive-firework-child-life-mult"
          value={
            behaviour.childLifetimeMultiplier ??
            keysToInitialize.childLifetimeMultiplier
          }
          step="0.05"
          min="0.1"
          onChange={(value) => {
            behaviour.childLifetimeMultiplier = value;
            updateBehaviours();
          }}
        />
        <RfInputNumber
          label="Child Color Jitter"
          id="recursive-firework-child-color-jitter"
          value={behaviour.childColorJitter ?? keysToInitialize.childColorJitter}
          step="1"
          min="0"
          onChange={(value) => {
            behaviour.childColorJitter = value;
            updateBehaviours();
          }}
        />
        {advanced && (
          <>
            <RfSubsectionLabel help={RF_HELP.explosionPhaseGating}>Explosion phase gating</RfSubsectionLabel>
            <div className="form-group">
              <label className="col-xs-4 form-label" htmlFor="rf-recursion-phase">
                Recursion Phase Mode
              </label>
              <div className="col-xs-8">
                <select
                  id="rf-recursion-phase"
                  className="form-control"
                  value={recursionPhaseModeVal}
                  onChange={(e) => {
                    behaviour.recursionPhaseMode = e.target.value;
                    updateBehaviours();
                  }}
                >
                  <option value="cometOnly">cometOnly</option>
                  <option value="sparkOnly">sparkOnly</option>
                  <option value="both">both</option>
                </select>
                <RfSelectHint id="rf-recursion-phase" />
              </div>
            </div>
            <RfInputNumber
              label="Min Life Progress Before Explode"
              id="recursive-firework-min-life-explode"
              value={
                behaviour.minLifeProgressBeforeExplode ??
                keysToInitialize.minLifeProgressBeforeExplode
              }
              step="0.01"
              min="0"
              max="1"
              onChange={(value) => {
                behaviour.minLifeProgressBeforeExplode = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Min Visible Contribution"
              id="recursive-firework-min-visible"
              value={
                behaviour.minVisibleContribution ??
                keysToInitialize.minVisibleContribution
              }
              step="0.001"
              min="0"
              max="1"
              onChange={(value) => {
                behaviour.minVisibleContribution = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Brightness Normalize by Depth"
              id="recursive-firework-brightness-norm-depth"
              value={
                behaviour.brightnessNormalizeByDepth ??
                keysToInitialize.brightnessNormalizeByDepth
              }
              step="0.01"
              min="0"
              max="2"
              onChange={(value) => {
                behaviour.brightnessNormalizeByDepth = value;
                updateBehaviours();
              }}
            />
          </>
        )}
        <RfSectionLabel help={RF_HELP.spawnLimits}>Spawn limits</RfSectionLabel>
        <RfInputNumber
          label="Max Spawn / Frame"
          id="recursive-firework-max-frame"
          value={behaviour.maxSpawnPerFrame ?? keysToInitialize.maxSpawnPerFrame}
          step="1"
          min="1"
          onChange={(value) => {
            behaviour.maxSpawnPerFrame = value;
            updateBehaviours();
          }}
        />
        <RfInputNumber
          label="Max Total Spawn"
          id="recursive-firework-max-total"
          value={
            behaviour.maxTotalSpawnBudget ?? keysToInitialize.maxTotalSpawnBudget
          }
          step="1"
          min="1"
          onChange={(value) => {
            behaviour.maxTotalSpawnBudget = value;
            updateBehaviours();
          }}
        />
        <RfInputNumber
          label="Max Total Children per Shot"
          id="recursive-firework-max-children-shot"
          value={
            behaviour.maxTotalChildrenPerShot ??
            keysToInitialize.maxTotalChildrenPerShot
          }
          step="1"
          min="1"
          onChange={(value) => {
            behaviour.maxTotalChildrenPerShot = value;
            updateBehaviours();
          }}
        />
        <RfInputNumber
          label="Max Spawn / Second (0=off)"
          id="recursive-firework-max-second"
          value={behaviour.maxSpawnPerSecond ?? keysToInitialize.maxSpawnPerSecond}
          step="1"
          min="0"
          onChange={(value) => {
            behaviour.maxSpawnPerSecond = value;
            updateBehaviours();
          }}
        />
        <RfInputNumber
          label="Recursion Planner Strength"
          id="recursive-firework-recursion-planner-strength"
          value={behaviour.recursionPlannerStrength ?? keysToInitialize.recursionPlannerStrength}
          step="0.01"
          min="0"
          max="1"
          onChange={(value) => {
            behaviour.recursionPlannerStrength = value;
            updateBehaviours();
          }}
        />
        <RfInputNumber
          label="Subtree Cull Depth Ratio"
          id="recursive-firework-subtree-cull-depth-ratio"
          value={behaviour.subtreeCullDepthRatio ?? keysToInitialize.subtreeCullDepthRatio}
          step="0.01"
          min="0"
          max="2"
          onChange={(value) => {
            behaviour.subtreeCullDepthRatio = value;
            updateBehaviours();
          }}
        />
        <RfInputNumber
          label="Subtree Cull Min Visible/Depth"
          id="recursive-firework-subtree-cull-visible-depth"
          value={behaviour.subtreeCullMinVisiblePerDepth ?? keysToInitialize.subtreeCullMinVisiblePerDepth}
          step="0.005"
          min="0"
          max="1"
          onChange={(value) => {
            behaviour.subtreeCullMinVisiblePerDepth = value;
            updateBehaviours();
          }}
        />
        <RfInputNumber
          label="Reactive Safety Damping"
          id="recursive-firework-reactive-safety-damping"
          value={behaviour.reactiveSafetyDamping ?? keysToInitialize.reactiveSafetyDamping}
          step="0.01"
          min="0"
          max="1"
          onChange={(value) => {
            behaviour.reactiveSafetyDamping = value;
            updateBehaviours();
          }}
        />
        {advanced && (
          <>
            <details open style={{ marginBottom: 12 }}>
              <summary style={{ cursor: "pointer", fontWeight: 600, marginBottom: 8 }}>
                Advanced — depth tables &amp; per-level lists
              </summary>
              <div>
            <RfSectionLabel help={RF_HELP.depthTables}>Depth tables & tuning</RfSectionLabel>
            <RfInputString
              label="Count by Depth"
              id="recursive-firework-count-by-depth"
              value={getListInputValue("countByDepth")}
              onChange={(value) => editListInput("countByDepth", value)}
              onBlur={() => commitListInput("countByDepth")}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitListInput("countByDepth");
              }}
            />
            <RfInputString
              label="Speed by Depth"
              id="recursive-firework-speed-by-depth"
              value={getListInputValue("speedByDepth")}
              onChange={(value) => editListInput("speedByDepth", value)}
              onBlur={() => commitListInput("speedByDepth")}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitListInput("speedByDepth");
              }}
            />
            <RfInputString
              label="Child Chance by Depth"
              id="recursive-firework-child-by-depth"
              value={getListInputValue("childChanceByDepth")}
              onChange={(value) => editListInput("childChanceByDepth", value)}
              onBlur={() => commitListInput("childChanceByDepth")}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitListInput("childChanceByDepth");
              }}
            />
            <RfInputString
              label="Burst Scale by Depth"
              id="recursive-firework-burst-scale-depth"
              value={getListInputValue("childBurstScaleByDepth")}
              onChange={(value) => editListInput("childBurstScaleByDepth", value)}
              onBlur={() => commitListInput("childBurstScaleByDepth")}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitListInput("childBurstScaleByDepth");
              }}
            />
            <RfInputString
              label="Child Comet Bias by Depth"
              id="recursive-firework-child-bias-depth"
              value={getListInputValue("childCometBiasByDepth")}
              onChange={(value) => editListInput("childCometBiasByDepth", value)}
              onBlur={() => commitListInput("childCometBiasByDepth")}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitListInput("childCometBiasByDepth");
              }}
            />
            <RfInputString
              label="Max Children by Depth"
              id="recursive-firework-max-children-depth"
              value={getListInputValue("maxChildrenPerExplosionByDepth")}
              onChange={(value) =>
                editListInput("maxChildrenPerExplosionByDepth", value)
              }
              onBlur={() => commitListInput("maxChildrenPerExplosionByDepth")}
              onKeyDown={(e) => {
                if (e.key === "Enter")
                  commitListInput("maxChildrenPerExplosionByDepth");
              }}
            />
            <RfInputString
              label="Spiral Twist by Depth (deg)"
              id="recursive-firework-spiral-twist-depth"
              value={getListInputValue("spiralTwistByDepth")}
              onChange={(value) => editListInput("spiralTwistByDepth", value)}
              onBlur={() => commitListInput("spiralTwistByDepth")}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitListInput("spiralTwistByDepth");
              }}
            />
            <RfInputString
              label="Child Speed Jitter by Depth"
              id="recursive-firework-child-speed-jitter-depth"
              value={getListInputValue("childSpeedJitterByDepth")}
              onChange={(value) => editListInput("childSpeedJitterByDepth", value)}
              onBlur={() => commitListInput("childSpeedJitterByDepth")}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitListInput("childSpeedJitterByDepth");
              }}
            />
            <RfInputString
              label="Recursion Delay by Depth"
              id="recursive-firework-recursion-delay-depth"
              value={getListInputValue("recursionDelayByDepth")}
              onChange={(value) => editListInput("recursionDelayByDepth", value)}
              onBlur={() => commitListInput("recursionDelayByDepth")}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitListInput("recursionDelayByDepth");
              }}
            />
            <RfInputString
              label="Depth Energy by Level"
              id="recursive-firework-depth-energy-level"
              value={getListInputValue("depthEnergyByLevel")}
              onChange={(value) => editListInput("depthEnergyByLevel", value)}
              onBlur={() => commitListInput("depthEnergyByLevel")}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitListInput("depthEnergyByLevel");
              }}
            />
            <RfInputString
              label="Depth Delay by Level (sec)"
              id="recursive-firework-depth-delay-level"
              value={getListInputValue("depthDelayByLevel")}
              onChange={(value) => editListInput("depthDelayByLevel", value)}
              onBlur={() => commitListInput("depthDelayByLevel")}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitListInput("depthDelayByLevel");
              }}
            />
              </div>
            </details>
            <RfSectionLabel help={RF_HELP.energyBudget}>Energy budget</RfSectionLabel>
            <RfInputNumber
              label="Energy per Root Shot"
              id="recursive-firework-energy-root"
              value={
                behaviour.energyPerRootShot ?? keysToInitialize.energyPerRootShot
              }
              step="1"
              min="0"
              onChange={(value) => {
                behaviour.energyPerRootShot = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Energy Cost per Child"
              id="recursive-firework-energy-cost-child"
              value={
                behaviour.energyCostPerChild ??
                keysToInitialize.energyCostPerChild
              }
              step="0.05"
              min="0"
              onChange={(value) => {
                behaviour.energyCostPerChild = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Energy Loss per Depth"
              id="recursive-firework-energy-loss-depth"
              value={
                behaviour.energyLossPerDepth ??
                keysToInitialize.energyLossPerDepth
              }
              step="0.01"
              min="0"
              max="1"
              onChange={(value) => {
                behaviour.energyLossPerDepth = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Min Energy to Recurse"
              id="recursive-firework-min-energy-recurse"
              value={
                behaviour.minEnergyToRecurse ??
                keysToInitialize.minEnergyToRecurse
              }
              step="0.5"
              min="0"
              onChange={(value) => {
                behaviour.minEnergyToRecurse = value;
                updateBehaviours();
              }}
            />
            <RfSectionLabel help={RF_HELP.roleWeights}>Child role weights</RfSectionLabel>
            <RfInputNumber
              label="Weight: Spark"
              id="recursive-firework-rw-spark"
              value={
                (behaviour.roleWeights ?? keysToInitialize.roleWeights).spark ??
                keysToInitialize.roleWeights.spark
              }
              step="0.01"
              min="0"
              onChange={(value) => {
                behaviour.roleWeights = {
                  ...(behaviour.roleWeights || keysToInitialize.roleWeights),
                  spark: value,
                };
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Weight: Comet"
              id="recursive-firework-rw-comet"
              value={
                (behaviour.roleWeights ?? keysToInitialize.roleWeights).comet ??
                keysToInitialize.roleWeights.comet
              }
              step="0.01"
              min="0"
              onChange={(value) => {
                behaviour.roleWeights = {
                  ...(behaviour.roleWeights || keysToInitialize.roleWeights),
                  comet: value,
                };
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Weight: Glitter"
              id="recursive-firework-rw-glitter"
              value={
                (behaviour.roleWeights ?? keysToInitialize.roleWeights)
                  .glitter ?? keysToInitialize.roleWeights.glitter
              }
              step="0.01"
              min="0"
              onChange={(value) => {
                behaviour.roleWeights = {
                  ...(behaviour.roleWeights || keysToInitialize.roleWeights),
                  glitter: value,
                };
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Weight: Crackle"
              id="recursive-firework-rw-crackle"
              value={
                (behaviour.roleWeights ?? keysToInitialize.roleWeights)
                  .crackle ?? keysToInitialize.roleWeights.crackle
              }
              step="0.01"
              min="0"
              onChange={(value) => {
                behaviour.roleWeights = {
                  ...(behaviour.roleWeights || keysToInitialize.roleWeights),
                  crackle: value,
                };
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Weight: Ember"
              id="recursive-firework-rw-ember"
              value={
                (behaviour.roleWeights ?? keysToInitialize.roleWeights).ember ??
                keysToInitialize.roleWeights.ember
              }
              step="0.01"
              min="0"
              onChange={(value) => {
                behaviour.roleWeights = {
                  ...(behaviour.roleWeights || keysToInitialize.roleWeights),
                  ember: value,
                };
                updateBehaviours();
              }}
            />
            <RfSectionLabel help={RF_HELP.branchingMode}>Branching & recursion mode</RfSectionLabel>
            <div className="form-group">
              <label className="col-xs-4 form-label" htmlFor="rf-branching-mode">
                Branching Mode
              </label>
              <div className="col-xs-8">
                <select
                  id="rf-branching-mode"
                  className="form-control"
                  value={behaviour.branchingMode ?? "probabilistic"}
                  onChange={(e) => {
                    behaviour.branchingMode = e.target.value;
                    updateBehaviours();
                  }}
                >
                  <option value="probabilistic">probabilistic</option>
                  <option value="guaranteedCore">guaranteedCore</option>
                  <option value="fanOut">fanOut</option>
                </select>
                <RfSelectHint id="rf-branching-mode" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-xs-4 form-label" htmlFor="rf-recursion-mode">
                Recursion Mode
              </label>
              <div className="col-xs-8">
                <select
                  id="rf-recursion-mode"
                  className="form-control"
                  value={behaviour.recursionMode ?? "standard"}
                  onChange={(e) => {
                    behaviour.recursionMode = e.target.value;
                    updateBehaviours();
                  }}
                >
                  <option value="standard">standard</option>
                  <option value="branchingComets">branchingComets</option>
                  <option value="chainReaction">chainReaction</option>
                </select>
                <RfSelectHint id="rf-recursion-mode" />
              </div>
            </div>
            <RfInputNumber
              label="Min Children / Explosion"
              id="recursive-firework-min-children-explosion"
              value={behaviour.minChildrenPerExplosion ?? keysToInitialize.minChildrenPerExplosion}
              step="1"
              min="0"
              onChange={(value) => {
                behaviour.minChildrenPerExplosion = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Child Chance Decay / Depth"
              id="recursive-firework-child-chance-decay-depth"
              value={behaviour.childChanceDecayPerDepth ?? keysToInitialize.childChanceDecayPerDepth}
              step="0.01"
              min="0"
              max="1"
              onChange={(value) => {
                behaviour.childChanceDecayPerDepth = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Child Explosion Probability"
              id="recursive-firework-child-explosion-prob"
              value={behaviour.childExplosionProbability ?? keysToInitialize.childExplosionProbability}
              step="0.01"
              min="0"
              max="1"
              onChange={(value) => {
                behaviour.childExplosionProbability = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Max Children Per Level"
              id="recursive-firework-max-children-level"
              value={behaviour.maxChildrenPerLevel ?? keysToInitialize.maxChildrenPerLevel}
              step="1"
              min="1"
              onChange={(value) => {
                behaviour.maxChildrenPerLevel = value;
                updateBehaviours();
              }}
            />
            {recursionModeVal === "chainReaction" && (
              <>
                <RfInputNumber
                  label="Chain Delay (ms)"
                  id="recursive-firework-chain-delay"
                  value={behaviour.chainReactionDelayMs ?? keysToInitialize.chainReactionDelayMs}
                  step="1"
                  min="0"
                  onChange={(value) => {
                    behaviour.chainReactionDelayMs = value;
                    updateBehaviours();
                  }}
                />
                <RfInputNumber
                  label="Chain Radius"
                  id="recursive-firework-chain-radius"
                  value={behaviour.chainReactionRadius ?? keysToInitialize.chainReactionRadius}
                  step="1"
                  min="1"
                  onChange={(value) => {
                    behaviour.chainReactionRadius = value;
                    updateBehaviours();
                  }}
                />
                <RfInputNumber
                  label="Chain Probability"
                  id="recursive-firework-chain-prob"
                  value={behaviour.chainReactionProbability ?? keysToInitialize.chainReactionProbability}
                  step="0.01"
                  min="0"
                  max="1"
                  onChange={(value) => {
                    behaviour.chainReactionProbability = value;
                    updateBehaviours();
                  }}
                />
                <RfInputNumber
                  label="Max Chain Triggers / Frame"
                  id="recursive-firework-chain-frame-cap"
                  value={behaviour.maxChainTriggersPerFrame ?? keysToInitialize.maxChainTriggersPerFrame}
                  step="1"
                  min="1"
                  onChange={(value) => {
                    behaviour.maxChainTriggersPerFrame = value;
                    updateBehaviours();
                  }}
                />
                <RfInputNumber
                  label="Chain Reaction Depth Boost"
                  id="recursive-firework-chain-depth-boost"
                  value={
                    behaviour.chainReactionDepthBoost ??
                    keysToInitialize.chainReactionDepthBoost
                  }
                  step="1"
                  min="0"
                  onChange={(value) => {
                    behaviour.chainReactionDepthBoost = value;
                    updateBehaviours();
                  }}
                />
              </>
            )}
            <RfSectionLabel help={RF_HELP.branchShaping}>Branch shaping & burst feel</RfSectionLabel>
            <RfInputNumber
              label="Branch Envelope Peak Ratio"
              id="recursive-firework-branch-envelope-peak"
              value={behaviour.branchEnvelopePeakDepthRatio ?? keysToInitialize.branchEnvelopePeakDepthRatio}
              step="0.01"
              min="0"
              max="1"
              onChange={(value) => {
                behaviour.branchEnvelopePeakDepthRatio = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Branch Envelope Width"
              id="recursive-firework-branch-envelope-width"
              value={behaviour.branchEnvelopeWidth ?? keysToInitialize.branchEnvelopeWidth}
              step="0.01"
              min="0.05"
              max="2"
              onChange={(value) => {
                behaviour.branchEnvelopeWidth = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Branch Envelope Strength"
              id="recursive-firework-branch-envelope-strength"
              value={behaviour.branchEnvelopeStrength ?? keysToInitialize.branchEnvelopeStrength}
              step="0.01"
              min="0"
              max="1"
              onChange={(value) => {
                behaviour.branchEnvelopeStrength = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Burst Stability"
              id="recursive-firework-burst-stability"
              value={behaviour.burstStability ?? keysToInitialize.burstStability}
              step="0.01"
              min="0"
              max="1"
              onChange={(value) => {
                behaviour.burstStability = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Burst Variance Damping"
              id="recursive-firework-burst-variance-damping"
              value={behaviour.burstVarianceDamping ?? keysToInitialize.burstVarianceDamping}
              step="0.01"
              min="0"
              max="1"
              onChange={(value) => {
                behaviour.burstVarianceDamping = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Recursion Pacing Blend"
              id="recursive-firework-recursion-pacing-blend"
              value={behaviour.recursionPacingBlend ?? keysToInitialize.recursionPacingBlend}
              step="0.01"
              min="0"
              max="1"
              onChange={(value) => {
                behaviour.recursionPacingBlend = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Recursion Pacing Jitter (ms)"
              id="recursive-firework-recursion-pacing-jitter"
              value={behaviour.recursionPacingJitterMs ?? keysToInitialize.recursionPacingJitterMs}
              step="1"
              min="0"
              onChange={(value) => {
                behaviour.recursionPacingJitterMs = value;
                updateBehaviours();
              }}
            />
            <RfSectionLabel help={RF_HELP.trailsSecondary}>Trails & secondary particles</RfSectionLabel>
            <RfCheckbox
              label="Secondary Sparkle"
              id="recursive-firework-secondary-sparkle"
              checked={behaviour.secondarySparkleTrail ?? false}
              onChange={(value) => {
                behaviour.secondarySparkleTrail = value;
                updateBehaviours();
              }}
            />
            <div className="form-group">
              <label className="col-xs-4 form-label" htmlFor="rf-trail-style">
                Trail Style
              </label>
              <div className="col-xs-8">
                <select
                  id="rf-trail-style"
                  className="form-control"
                  value={behaviour.trailStyle ?? "classic"}
                  onChange={(e) => {
                    behaviour.trailStyle = e.target.value;
                    updateBehaviours();
                  }}
                >
                  <option value="classic">classic</option>
                  <option value="fadeTail">fadeTail</option>
                  <option value="glowStreak">glowStreak</option>
                  <option value="sparkleTrail">sparkleTrail</option>
                </select>
                <RfSelectHint id="rf-trail-style" />
              </div>
            </div>
            <RfCheckbox
              label="Comet Tail Sub-Emission"
              id="recursive-firework-tail-enabled"
              checked={behaviour.cometTailEnabled ?? false}
              onChange={(value) => {
                behaviour.cometTailEnabled = value;
                updateBehaviours();
              }}
            />
            {cometTailEnabled && (
              <>
                <RfInputNumber
                  label="Comet Tail Spawn Chance"
                  id="recursive-firework-tail-spawn-chance"
                  value={behaviour.cometTailSpawnChance ?? keysToInitialize.cometTailSpawnChance}
                  step="0.01"
                  min="0"
                  max="1"
                  onChange={(value) => {
                    behaviour.cometTailSpawnChance = value;
                    updateBehaviours();
                  }}
                />
                <RfInputNumber
                  label="Comet Tail Scale"
                  id="recursive-firework-tail-scale"
                  value={behaviour.cometTailScale ?? keysToInitialize.cometTailScale}
                  step="0.01"
                  min="0"
                  onChange={(value) => {
                    behaviour.cometTailScale = value;
                    updateBehaviours();
                  }}
                />
                <RfInputNumber
                  label="Comet Tail Life Mult"
                  id="recursive-firework-tail-life-mult"
                  value={behaviour.cometTailLifeMultiplier ?? keysToInitialize.cometTailLifeMultiplier}
                  step="0.01"
                  min="0"
                  onChange={(value) => {
                    behaviour.cometTailLifeMultiplier = value;
                    updateBehaviours();
                  }}
                />
              </>
            )}
            <RfSectionLabel help={RF_HELP.sizeOverLife}>Size over comet & explosion life</RfSectionLabel>
            <RfInputNumber
              label="Comet Size Start"
              id="recursive-firework-comet-size-start"
              value={behaviour.cometSizeStart ?? keysToInitialize.cometSizeStart}
              step="0.05"
              min="0.1"
              onChange={(value) => {
                behaviour.cometSizeStart = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Comet Size End"
              id="recursive-firework-comet-size-end"
              value={behaviour.cometSizeEnd ?? keysToInitialize.cometSizeEnd}
              step="0.05"
              min="0.05"
              onChange={(value) => {
                behaviour.cometSizeEnd = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Explosion Size Start"
              id="recursive-firework-explosion-size-start"
              value={behaviour.explosionSizeStart ?? keysToInitialize.explosionSizeStart}
              step="0.05"
              min="0.05"
              onChange={(value) => {
                behaviour.explosionSizeStart = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Explosion Size End"
              id="recursive-firework-explosion-size-end"
              value={behaviour.explosionSizeEnd ?? keysToInitialize.explosionSizeEnd}
              step="0.05"
              min="0.01"
              onChange={(value) => {
                behaviour.explosionSizeEnd = value;
                updateBehaviours();
              }}
            />
            <RfSubsectionLabel help={RF_HELP.sparkleBrightness}>Sparkle & brightness</RfSubsectionLabel>
            <RfInputNumber
              label="Flicker Strength"
              id="recursive-firework-flicker-strength"
              value={behaviour.flickerStrength ?? keysToInitialize.flickerStrength}
              step="0.01"
              min="0"
              max="1"
              onChange={(value) => {
                behaviour.flickerStrength = value;
                updateBehaviours();
              }}
            />
            {flickerStrengthVal > 0 && (
              <RfInputNumber
                label="Flicker Frequency"
                id="recursive-firework-flicker-frequency"
                value={behaviour.flickerFrequency ?? keysToInitialize.flickerFrequency}
                step="1"
                min="1"
                onChange={(value) => {
                  behaviour.flickerFrequency = value;
                  updateBehaviours();
                }}
              />
            )}
            <RfInputNumber
              label="Brightness Variance"
              id="recursive-firework-brightness-variance"
              value={behaviour.brightnessVariance ?? keysToInitialize.brightnessVariance}
              step="1"
              min="0"
              max="255"
              onChange={(value) => {
                behaviour.brightnessVariance = value;
                updateBehaviours();
              }}
            />
            {secondarySparkleTrail && (
              <>
                <RfInputNumber
                  label="Secondary Sparkle Chance"
                  id="recursive-firework-secondary-sparkle-chance"
                  value={
                    behaviour.secondarySparkleChance ??
                    keysToInitialize.secondarySparkleChance
                  }
                  step="0.01"
                  min="0"
                  max="1"
                  onChange={(value) => {
                    behaviour.secondarySparkleChance = value;
                    updateBehaviours();
                  }}
                />
                <RfInputNumber
                  label="Secondary Sparkle Scale"
                  id="recursive-firework-secondary-sparkle-scale"
                  value={behaviour.secondarySparkleScale ?? keysToInitialize.secondarySparkleScale}
                  step="0.01"
                  min="0"
                  onChange={(value) => {
                    behaviour.secondarySparkleScale = value;
                    updateBehaviours();
                  }}
                />
              </>
            )}
            <RfCheckbox
              label="Secondary Crackle"
              id="recursive-firework-secondary-crackle"
              checked={behaviour.secondaryCrackle ?? false}
              onChange={(value) => {
                behaviour.secondaryCrackle = value;
                updateBehaviours();
              }}
            />
            {secondaryCrackleOn && (
              <>
                <RfInputNumber
                  label="Secondary Crackle Chance"
                  id="recursive-firework-secondary-crackle-chance"
                  value={
                    behaviour.secondaryCrackleChance ??
                    keysToInitialize.secondaryCrackleChance
                  }
                  step="0.01"
                  min="0"
                  max="1"
                  onChange={(value) => {
                    behaviour.secondaryCrackleChance = value;
                    updateBehaviours();
                  }}
                />
                <RfInputNumber
                  label="Secondary Crackle Count"
                  id="recursive-firework-secondary-crackle-count"
                  value={
                    behaviour.secondaryCrackleCount ??
                    keysToInitialize.secondaryCrackleCount
                  }
                  step="1"
                  min="1"
                  onChange={(value) => {
                    behaviour.secondaryCrackleCount = value;
                    updateBehaviours();
                  }}
                />
              </>
            )}
            <RfSectionLabel help={RF_HELP.randomness}>Randomness</RfSectionLabel>
            <RfInputNumber
              label="Seed"
              id="recursive-firework-seed"
              value={behaviour.seed ?? 0}
              step="1"
              onChange={(value) => {
                behaviour.seed = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Seed Per Shot Offset"
              id="recursive-firework-seed-offset"
              value={behaviour.seedPerShotOffset ?? 7919}
              step="1"
              onChange={(value) => {
                behaviour.seedPerShotOffset = value;
                updateBehaviours();
              }}
            />
            <div className="form-group">
              <label className="col-xs-4 form-label" htmlFor="rf-seed-sequence">
                Seed Sequence Mode
              </label>
              <div className="col-xs-8">
                <select
                  id="rf-seed-sequence"
                  className="form-control"
                  value={seedSequenceModeVal}
                  onChange={(e) => {
                    behaviour.seedSequenceMode = e.target.value;
                    updateBehaviours();
                  }}
                >
                  <option value="fixedCycle">fixedCycle</option>
                  <option value="pingPong">pingPong</option>
                  <option value="randomWalk">randomWalk</option>
                </select>
                <RfSelectHint id="rf-seed-sequence" />
              </div>
            </div>
            {(seedSequenceModeVal === "fixedCycle" ||
              seedSequenceModeVal === "pingPong") && (
              <RfInputNumber
                label="Seed Cycle Length"
                id="recursive-firework-seed-cycle-len"
                value={
                  behaviour.seedCycleLength ?? keysToInitialize.seedCycleLength
                }
                step="1"
                min="1"
                onChange={(value) => {
                  behaviour.seedCycleLength = value;
                  updateBehaviours();
                }}
              />
            )}
            {seedSequenceModeVal === "randomWalk" && (
              <RfInputNumber
                label="Seed Random Walk Step"
                id="recursive-firework-seed-random-walk"
                value={
                  behaviour.seedRandomWalkStep ??
                  keysToInitialize.seedRandomWalkStep
                }
                step="1"
                min="1"
                onChange={(value) => {
                  behaviour.seedRandomWalkStep = value;
                  updateBehaviours();
                }}
              />
            )}
            <RfSectionLabel help={RF_HELP.throttleEnvelope}>Throttle & burst envelope</RfSectionLabel>
            <RfCheckbox
              label="Adaptive Throttle"
              id="recursive-firework-adaptive-throttle"
              checked={behaviour.adaptiveThrottle ?? true}
              onChange={(value) => {
                behaviour.adaptiveThrottle = value;
                updateBehaviours();
              }}
            />
            {adaptiveThrottle && (
              <RfInputNumber
                label="Throttle Start Ratio"
                id="recursive-firework-throttle-start-ratio"
                value={behaviour.throttleStartRatio ?? keysToInitialize.throttleStartRatio}
                step="0.01"
                min="0"
                max="1"
                onChange={(value) => {
                  behaviour.throttleStartRatio = value;
                  updateBehaviours();
                }}
              />
            )}
            <RfInputNumber
              label="Burst Envelope Attack"
              id="recursive-firework-burst-envelope-attack"
              value={behaviour.burstEnvelope?.attack ?? keysToInitialize.burstEnvelope.attack}
              step="0.01"
              min="0"
              max="1"
              onChange={(value) => {
                behaviour.burstEnvelope = { ...(behaviour.burstEnvelope || keysToInitialize.burstEnvelope), attack: value };
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Burst Envelope Hold"
              id="recursive-firework-burst-envelope-hold"
              value={behaviour.burstEnvelope?.hold ?? keysToInitialize.burstEnvelope.hold}
              step="0.01"
              min="0"
              max="1"
              onChange={(value) => {
                behaviour.burstEnvelope = { ...(behaviour.burstEnvelope || keysToInitialize.burstEnvelope), hold: value };
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Burst Envelope Release"
              id="recursive-firework-burst-envelope-release"
              value={behaviour.burstEnvelope?.release ?? keysToInitialize.burstEnvelope.release}
              step="0.01"
              min="0"
              max="1"
              onChange={(value) => {
                behaviour.burstEnvelope = { ...(behaviour.burstEnvelope || keysToInitialize.burstEnvelope), release: value };
                updateBehaviours();
              }}
            />
            <hr />
            <RfSectionLabel help={RF_HELP.environment}>Environment & performance</RfSectionLabel>
            <RfSubsectionLabel help={RF_HELP.wind}>Wind</RfSubsectionLabel>
            <RfCheckbox
              label="Wind Enabled"
              id="recursive-firework-wind-enabled"
              checked={behaviour.windEnabled ?? false}
              onChange={(value) => {
                behaviour.windEnabled = value;
                updateBehaviours();
              }}
            />
            {windEnabled && (
              <>
                <div className="form-group">
                  <label className="col-xs-4 form-label" htmlFor="rf-wind-mode">
                    Wind Mode
                  </label>
                  <div className="col-xs-8">
                    <select
                      id="rf-wind-mode"
                      className="form-control"
                      value={behaviour.windMode ?? "constant"}
                      onChange={(e) => {
                        behaviour.windMode = e.target.value;
                        updateBehaviours();
                      }}
                    >
                      <option value="constant">constant</option>
                      <option value="noise">noise</option>
                    </select>
                    <RfSelectHint id="rf-wind-mode" />
                  </div>
                </div>
                <RfInputNumber label="Wind X" id="recursive-firework-wind-x" value={behaviour.windVector?.x ?? 30} step="1" onChange={(value) => { behaviour.windVector = { ...(behaviour.windVector || {}), x: value }; updateBehaviours(); }} />
                <RfInputNumber label="Wind Y" id="recursive-firework-wind-y" value={behaviour.windVector?.y ?? 0} step="1" onChange={(value) => { behaviour.windVector = { ...(behaviour.windVector || {}), y: value }; updateBehaviours(); }} />
                <RfInputNumber label="Wind Strength" id="recursive-firework-wind-strength" value={behaviour.windStrength ?? 1} step="0.05" min="0" onChange={(value) => { behaviour.windStrength = value; updateBehaviours(); }} />
                {windMode === "noise" && (
                  <RfInputNumber label="Wind Noise Scale" id="recursive-firework-wind-noise-scale" value={behaviour.windNoiseScale ?? 0.015} step="0.001" min="0" onChange={(value) => { behaviour.windNoiseScale = value; updateBehaviours(); }} />
                )}
                <RfCheckbox label="Wind Affect Comet" id="recursive-firework-wind-comet" checked={behaviour.windAffectComet ?? false} onChange={(value) => { behaviour.windAffectComet = value; updateBehaviours(); }} />
                <RfCheckbox label="Wind Affect Sparks" id="recursive-firework-wind-sparks" checked={behaviour.windAffectSparks ?? true} onChange={(value) => { behaviour.windAffectSparks = value; updateBehaviours(); }} />
              </>
            )}
            <RfSubsectionLabel help={RF_HELP.depthFog}>Depth fog (Z)</RfSubsectionLabel>
            <RfInputNumber
              label="Depth Fog Near"
              id="recursive-firework-depth-fog-near"
              value={behaviour.depthFogNear ?? keysToInitialize.depthFogNear}
              step="10"
              onChange={(value) => {
                behaviour.depthFogNear = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Depth Fog Far"
              id="recursive-firework-depth-fog-far"
              value={behaviour.depthFogFar ?? keysToInitialize.depthFogFar}
              step="10"
              min="1"
              onChange={(value) => {
                behaviour.depthFogFar = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Depth Fog Alpha"
              id="recursive-firework-depth-fog-alpha"
              value={behaviour.depthFogAlpha ?? keysToInitialize.depthFogAlpha}
              step="0.01"
              min="0"
              max="1"
              onChange={(value) => {
                behaviour.depthFogAlpha = value;
                updateBehaviours();
              }}
            />
            <RfSubsectionLabel help={RF_HELP.lod}>Level of detail</RfSubsectionLabel>
            <RfCheckbox label="LOD Enabled" id="recursive-firework-lod-enabled" checked={behaviour.lodEnabled ?? false} onChange={(value) => { behaviour.lodEnabled = value; updateBehaviours(); }} />
            <RfSubsectionLabel help={RF_HELP.heavyEffects}>Heavy companion effects</RfSubsectionLabel>
            <RfCheckbox label="Heavy Effects Enabled" id="recursive-firework-heavy-enabled" checked={behaviour.heavyEffectsEnabled ?? true} onChange={(value) => { behaviour.heavyEffectsEnabled = value; updateBehaviours(); }} />
            {lodEnabled && (
              <>
                <RfInputNumber label="LOD Near Threshold" id="recursive-firework-lod-near" value={behaviour.lodParticleThresholdNear ?? 2000} step="1" min="0" onChange={(value) => { behaviour.lodParticleThresholdNear = value; updateBehaviours(); }} />
                <RfInputNumber label="LOD Far Threshold" id="recursive-firework-lod-far" value={behaviour.lodParticleThresholdFar ?? 4500} step="1" min="1" onChange={(value) => { behaviour.lodParticleThresholdFar = value; updateBehaviours(); }} />
                <RfInputNumber label="LOD Target Frame (ms)" id="recursive-firework-lod-target-frame" value={behaviour.lodTargetFrameMs ?? keysToInitialize.lodTargetFrameMs} step="0.1" min="0" onChange={(value) => { behaviour.lodTargetFrameMs = value; updateBehaviours(); }} />
                <RfInputNumber label="LOD Depth Reduction" id="recursive-firework-lod-depth-red" value={behaviour.lodDepthReduction ?? 1} step="1" min="0" onChange={(value) => { behaviour.lodDepthReduction = value; updateBehaviours(); }} />
                <RfInputNumber label="LOD Secondary Reduction" id="recursive-firework-lod-secondary-red" value={behaviour.lodSecondaryReduction ?? 0.5} step="0.05" min="0" max="1" onChange={(value) => { behaviour.lodSecondaryReduction = value; updateBehaviours(); }} />
              </>
            )}
            <hr />
            <RfSectionLabel help={RF_HELP.stagedPolish}>Staged bursts & polish</RfSectionLabel>
            <RfSubsectionLabel help={RF_HELP.twoStage}>Two-stage launch</RfSubsectionLabel>
            <RfCheckbox label="Two Stage Enabled" id="recursive-firework-two-stage" checked={behaviour.twoStageEnabled ?? false} onChange={(value) => { behaviour.twoStageEnabled = value; updateBehaviours(); }} />
            {twoStageEnabled && (
              <>
                <RfInputNumber label="Carrier Count" id="recursive-firework-carrier-count" value={behaviour.carrierCount ?? 8} step="1" min="1" onChange={(value) => { behaviour.carrierCount = value; updateBehaviours(); }} />
                <RfInputNumber label="Carrier Life" id="recursive-firework-carrier-life" value={behaviour.carrierLife ?? 0.35} step="0.01" min="0.05" onChange={(value) => { behaviour.carrierLife = value; updateBehaviours(); }} />
                <RfInputNumber label="Micro Burst Count" id="recursive-firework-micro-count" value={behaviour.microBurstCount ?? 6} step="1" min="1" onChange={(value) => { behaviour.microBurstCount = value; updateBehaviours(); }} />
                <RfInputNumber label="Micro Burst Delay (ms)" id="recursive-firework-micro-delay" value={behaviour.microBurstDelayMs ?? 120} step="1" min="0" onChange={(value) => { behaviour.microBurstDelayMs = value; updateBehaviours(); }} />
                <RfInputNumber label="Micro Burst Spread" id="recursive-firework-micro-spread" value={behaviour.microBurstSpread ?? 160} step="1" min="1" max="360" onChange={(value) => { behaviour.microBurstSpread = value; updateBehaviours(); }} />
              </>
            )}
            <RfSubsectionLabel help={RF_HELP.shockwaveGlow}>Shockwave, layers & glow</RfSubsectionLabel>
            <RfCheckbox label="Shockwave Enabled" id="recursive-firework-shockwave-enabled" checked={behaviour.shockwaveEnabled ?? false} onChange={(value) => { behaviour.shockwaveEnabled = value; updateBehaviours(); }} />
            {shockwaveEnabled && (
              <>
                <RfInputNumber label="Shockwave Size" id="recursive-firework-shockwave-size" value={behaviour.shockwaveSize ?? 2.4} step="0.05" min="0.1" onChange={(value) => { behaviour.shockwaveSize = value; updateBehaviours(); }} />
                <RfInputNumber label="Shockwave Life" id="recursive-firework-shockwave-life" value={behaviour.shockwaveLife ?? 0.4} step="0.01" min="0.05" onChange={(value) => { behaviour.shockwaveLife = value; updateBehaviours(); }} />
                <RfInputString
                  label="Shockwave by Depth"
                  id="recursive-firework-shockwave-by-depth"
                  value={getListInputValue("shockwaveByDepth")}
                  onChange={(value) => editListInput("shockwaveByDepth", value)}
                  onBlur={() => commitListInput("shockwaveByDepth")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") commitListInput("shockwaveByDepth");
                  }}
                />
              </>
            )}
            <RfCheckbox label="Layered Explosion Enabled" id="recursive-firework-layered-enabled" checked={behaviour.layeredExplosionEnabled ?? false} onChange={(value) => { behaviour.layeredExplosionEnabled = value; updateBehaviours(); }} />
            {layeredExplosionEnabled && (
              <>
                <RfInputNumber label="Layered Explosion Count" id="recursive-firework-layered-count" value={behaviour.layeredExplosionCount ?? 2} step="1" min="2" onChange={(value) => { behaviour.layeredExplosionCount = value; updateBehaviours(); }} />
                <RfInputNumber label="Layered Explosion Delay (ms)" id="recursive-firework-layered-delay" value={behaviour.layeredExplosionDelayMs ?? 70} step="1" min="0" onChange={(value) => { behaviour.layeredExplosionDelayMs = value; updateBehaviours(); }} />
              </>
            )}
            <RfCheckbox label="Glow Enabled" id="recursive-firework-glow-enabled" checked={behaviour.glowEnabled ?? false} onChange={(value) => { behaviour.glowEnabled = value; updateBehaviours(); }} />
            {glowEnabled && (
              <>
                <RfInputNumber label="Glow Life" id="recursive-firework-glow-life" value={behaviour.glowLife ?? 0.55} step="0.01" min="0.05" onChange={(value) => { behaviour.glowLife = value; updateBehaviours(); }} />
                <RfInputNumber label="Glow Scale" id="recursive-firework-glow-scale" value={behaviour.glowScale ?? 1.4} step="0.05" min="0.1" onChange={(value) => { behaviour.glowScale = value; updateBehaviours(); }} />
                <RfInputString
                  label="Glow by Depth"
                  id="recursive-firework-glow-by-depth"
                  value={getListInputValue("glowByDepth")}
                  onChange={(value) => editListInput("glowByDepth", value)}
                  onBlur={() => commitListInput("glowByDepth")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") commitListInput("glowByDepth");
                  }}
                />
              </>
            )}
            <RecursiveFireworkIdeationControls
              behaviour={behaviour}
              keysToInitialize={keysToInitialize}
              updateBehaviours={updateBehaviours}
              getListInputValue={getListInputValue}
              editListInput={editListInput}
              commitListInput={commitListInput}
              SectionLabel={RfSectionLabel}
              SubsectionLabel={RfSubsectionLabel}
              help={RF_HELP}
            />
            <RfSectionLabel help={RF_HELP.choreography}>
              Choreography & fields (new)
            </RfSectionLabel>
            <RfSubsectionLabel help={RF_HELP.choreography}>
              Show script (motif timeline)
            </RfSubsectionLabel>
            <RfCheckbox
              label="Show Script Enabled"
              id="recursive-firework-show-script-enabled"
              checked={behaviour.showScript?.enabled ?? false}
              onChange={(value) => {
                behaviour.showScript = mergeObjectsWithDefaults(
                  behaviour.showScript || {},
                  { enabled: value, keyframes: [], rootOnly: true },
                );
                behaviour.showScript.enabled = value;
                updateBehaviours();
              }}
            />
            <div className="form-group">
              <label className="col-xs-4 form-label">Show Script JSON</label>
              <div className="col-xs-8">
                <button
                  type="button"
                  className="btn btn-default btn-xs"
                  onClick={() =>
                    editJsonField("showScript", "Edit showScript JSON", {
                      enabled: true,
                      rootOnly: true,
                      keyframes: [
                        { t: 0, params: { burstShape: "circle", paletteStrategy: "randomFromPalette" } },
                        { t: 1.2, params: { burstShape: "willow", trailStyle: "fadeTail" } },
                      ],
                    })
                  }
                >
                  Edit
                </button>
              </div>
            </div>

            <RfSubsectionLabel help={RF_HELP.choreography}>Intent knobs</RfSubsectionLabel>
            <RfCheckbox
              label="Intent Enabled"
              id="recursive-firework-intent-enabled"
              checked={behaviour.intent != null}
              onChange={(value) => {
                behaviour.intent = value ? behaviour.intent || { elegance: 0.5, chaos: 0.2, density: 0.4, spectacle: 0.2, musicality: 0.2 } : null;
                updateBehaviours();
              }}
            />
            {behaviour.intent != null && (
              <>
                <RfInputNumber label="Elegance" id="recursive-firework-intent-elegance" value={behaviour.intent.elegance ?? 0} step="0.01" min="0" max="1" onChange={(v) => { behaviour.intent.elegance = v; updateBehaviours(); }} />
                <RfInputNumber label="Chaos" id="recursive-firework-intent-chaos" value={behaviour.intent.chaos ?? 0} step="0.01" min="0" max="1" onChange={(v) => { behaviour.intent.chaos = v; updateBehaviours(); }} />
                <RfInputNumber label="Density" id="recursive-firework-intent-density" value={behaviour.intent.density ?? 0} step="0.01" min="0" max="1" onChange={(v) => { behaviour.intent.density = v; updateBehaviours(); }} />
                <RfInputNumber label="Spectacle" id="recursive-firework-intent-spectacle" value={behaviour.intent.spectacle ?? 0} step="0.01" min="0" max="1" onChange={(v) => { behaviour.intent.spectacle = v; updateBehaviours(); }} />
                <RfInputNumber label="Musicality" id="recursive-firework-intent-musicality" value={behaviour.intent.musicality ?? 0} step="0.01" min="0" max="1" onChange={(v) => { behaviour.intent.musicality = v; updateBehaviours(); }} />
              </>
            )}

            <RfSubsectionLabel help={RF_HELP.choreography}>
              Recursion grammar (role transitions)
            </RfSubsectionLabel>
            <RfCheckbox
              label="Recursion Grammar Enabled"
              id="recursive-firework-grammar-enabled"
              checked={behaviour.recursionGrammar?.enabled ?? false}
              onChange={(value) => {
                behaviour.recursionGrammar = mergeObjectsWithDefaults(
                  behaviour.recursionGrammar || {},
                  {
                    enabled: value,
                    transitions: {
                      comet: [
                        { role: "spark", weight: 0.7 },
                        { role: "glitter", weight: 0.15 },
                        { role: "crackle", weight: 0.1 },
                        { role: "ember", weight: 0.05 },
                      ],
                      spark: [{ role: "ember", weight: 1 }],
                    },
                  },
                );
                behaviour.recursionGrammar.enabled = value;
                updateBehaviours();
              }}
            />
            <div className="form-group">
              <label className="col-xs-4 form-label">Grammar JSON</label>
              <div className="col-xs-8">
                <button
                  type="button"
                  className="btn btn-default btn-xs"
                  onClick={() =>
                    editJsonField("recursionGrammar", "Edit recursionGrammar JSON", {
                      enabled: true,
                      transitions: { comet: [{ role: "spark", weight: 1 }] },
                    })
                  }
                >
                  Edit
                </button>
              </div>
            </div>

            <RfSubsectionLabel help={RF_HELP.choreography}>Force fields</RfSubsectionLabel>
            <RfCheckbox
              label="Field Forces Enabled"
              id="recursive-firework-fields-enabled"
              checked={Array.isArray(behaviour.fieldForces) && behaviour.fieldForces.length > 0}
              onChange={(value) => {
                behaviour.fieldForces = value
                  ? behaviour.fieldForces || [{ enabled: true, type: "vortex", x: 0, y: 0, radius: 600, strength: 180, falloff: 0.35, swirl: 1 }]
                  : null;
                updateBehaviours();
              }}
            />
            <div className="form-group">
              <label className="col-xs-4 form-label">Fields JSON</label>
              <div className="col-xs-8">
                <button
                  type="button"
                  className="btn btn-default btn-xs"
                  onClick={() =>
                    editJsonField("fieldForces", "Edit fieldForces JSON array", [
                      { enabled: true, type: "attractor", x: 0, y: 0, radius: 900, strength: 80, falloff: 0.25, roles: ["spark"] },
                      { enabled: true, type: "vortex", x: 0, y: 0, radius: 650, strength: 160, falloff: 0.4, swirl: 1, roles: ["spark", "ember"] },
                    ])
                  }
                >
                  Edit
                </button>
              </div>
            </div>

            <RfSubsectionLabel help={RF_HELP.choreography}>Beat-grid quantize</RfSubsectionLabel>
            <RfCheckbox
              label="Music Quantize Enabled"
              id="recursive-firework-music-quantize-enabled"
              checked={behaviour.musicQuantize?.enabled ?? false}
              onChange={(value) => {
                behaviour.musicQuantize = mergeObjectsWithDefaults(
                  behaviour.musicQuantize || {},
                  { enabled: value, subdivisions: 4, window: 0.06, maxHoldLifeProgress: 0.92, rootOnly: true },
                );
                behaviour.musicQuantize.enabled = value;
                updateBehaviours();
              }}
            />
            {behaviour.musicQuantize?.enabled ? (
              <>
                <RfInputNumber label="Subdivisions" id="recursive-firework-music-quantize-subdiv" value={behaviour.musicQuantize.subdivisions ?? 4} step="1" min="1" onChange={(v) => { behaviour.musicQuantize.subdivisions = v; updateBehaviours(); }} />
                <RfInputNumber label="Window" id="recursive-firework-music-quantize-window" value={behaviour.musicQuantize.window ?? 0.06} step="0.01" min="0.005" max="0.49" onChange={(v) => { behaviour.musicQuantize.window = v; updateBehaviours(); }} />
                <RfInputNumber label="Max Hold LifeProgress" id="recursive-firework-music-quantize-maxhold" value={behaviour.musicQuantize.maxHoldLifeProgress ?? 0.92} step="0.01" min="0.2" max="1" onChange={(v) => { behaviour.musicQuantize.maxHoldLifeProgress = v; updateBehaviours(); }} />
              </>
            ) : null}

            <RfSubsectionLabel help={RF_HELP.choreography}>
              Diagnostics & replay pack
            </RfSubsectionLabel>
            <RfCheckbox
              label="Diagnostics Enabled"
              id="recursive-firework-diagnostics-enabled"
              checked={behaviour.diagnostics?.enabled ?? false}
              onChange={(value) => {
                behaviour.diagnostics = mergeObjectsWithDefaults(
                  behaviour.diagnostics || {},
                  { enabled: value, writeToReactiveDebug: true, everyNFrames: 6, includeReplayPack: true },
                );
                behaviour.diagnostics.enabled = value;
                updateBehaviours();
              }}
            />
            {behaviour.diagnostics?.enabled ? (
              <>
                <RfCheckbox label="Write to reactiveSignals.debug" id="recursive-firework-diagnostics-write" checked={behaviour.diagnostics.writeToReactiveDebug ?? true} onChange={(v) => { behaviour.diagnostics.writeToReactiveDebug = v; updateBehaviours(); }} />
                <RfInputNumber label="Every N Frames" id="recursive-firework-diagnostics-every" value={behaviour.diagnostics.everyNFrames ?? 6} step="1" min="1" onChange={(v) => { behaviour.diagnostics.everyNFrames = v; updateBehaviours(); }} />
                <RfCheckbox label="Include replay pack" id="recursive-firework-diagnostics-replay" checked={behaviour.diagnostics.includeReplayPack ?? true} onChange={(v) => { behaviour.diagnostics.includeReplayPack = v; updateBehaviours(); }} />
              </>
            ) : null}

            <RfSubsectionLabel help={RF_HELP.choreography}>
              Config group compatibility (JSON)
            </RfSubsectionLabel>
            <div className="form-group">
              <label className="col-xs-4 form-label">Recursion Group</label>
              <div className="col-xs-8">
                <button type="button" className="btn btn-default btn-xs" onClick={() => editJsonField("recursion", "Edit recursion group JSON", behaviour.recursion || {})}>
                  Edit
                </button>
              </div>
            </div>
            <div className="form-group">
              <label className="col-xs-4 form-label">Explosion Group</label>
              <div className="col-xs-8">
                <button type="button" className="btn btn-default btn-xs" onClick={() => editJsonField("explosion", "Edit explosion group JSON", behaviour.explosion || {})}>
                  Edit
                </button>
              </div>
            </div>
            <div className="form-group">
              <label className="col-xs-4 form-label">Trail Group</label>
              <div className="col-xs-8">
                <button type="button" className="btn btn-default btn-xs" onClick={() => editJsonField("trail", "Edit trail group JSON", behaviour.trail || {})}>
                  Edit
                </button>
              </div>
            </div>
            <div className="form-group">
              <label className="col-xs-4 form-label">Depth Group</label>
              <div className="col-xs-8">
                <button type="button" className="btn btn-default btn-xs" onClick={() => editJsonField("depth", "Edit depth group JSON", behaviour.depth || {})}>
                  Edit
                </button>
              </div>
            </div>
            <div className="form-group">
              <label className="col-xs-4 form-label">Performance Group</label>
              <div className="col-xs-8">
                <button type="button" className="btn btn-default btn-xs" onClick={() => editJsonField("performance", "Edit performance group JSON", behaviour.performance || {})}>
                  Edit
                </button>
              </div>
            </div>
            <RfSubsectionLabel help={RF_HELP.debug}>Debug overlays</RfSubsectionLabel>
            <RfCheckbox label="Debug Show Depth" id="recursive-firework-debug-depth" checked={behaviour.debugShowDepth ?? false} onChange={(value) => { behaviour.debugShowDepth = value; updateBehaviours(); }} />
            <RfCheckbox label="Debug Show Vectors" id="recursive-firework-debug-vectors" checked={behaviour.debugShowVectors ?? false} onChange={(value) => { behaviour.debugShowVectors = value; updateBehaviours(); }} />
            <RfCheckbox label="Debug Show Governor" id="recursive-firework-debug-governor" checked={behaviour.debugShowGovernor ?? false} onChange={(value) => { behaviour.debugShowGovernor = value; updateBehaviours(); }} />
            <RfCheckbox label="Debug Show Shot Seed" id="recursive-firework-debug-shot-seed" checked={behaviour.debugShowShotSeed ?? false} onChange={(value) => { behaviour.debugShowShotSeed = value; updateBehaviours(); }} />
            <RfSubsectionLabel help={RF_HELP.depthColorCurves}>Depth color curves</RfSubsectionLabel>
            <RfInputString
              label="Depth Alpha Curve"
              id="recursive-firework-depth-alpha-curve"
              value={getListInputValue("depthAlphaByDepth")}
              onChange={(value) => editListInput("depthAlphaByDepth", value)}
              onBlur={() => commitListInput("depthAlphaByDepth")}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitListInput("depthAlphaByDepth");
              }}
            />
            <RfInputString
              label="Depth Saturation Curve"
              id="recursive-firework-depth-sat-curve"
              value={getListInputValue("depthSaturationByDepth")}
              onChange={(value) => editListInput("depthSaturationByDepth", value)}
              onBlur={() => commitListInput("depthSaturationByDepth")}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitListInput("depthSaturationByDepth");
              }}
            />
            <RfInputNumber
              label="Depth Alpha Falloff"
              id="recursive-firework-depth-alpha-falloff"
              value={behaviour.depthAlphaFalloff ?? keysToInitialize.depthAlphaFalloff}
              step="0.01"
              min="0"
              onChange={(value) => {
                behaviour.depthAlphaFalloff = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Depth Saturation Falloff"
              id="recursive-firework-depth-sat-falloff"
              value={behaviour.depthSaturationFalloff ?? keysToInitialize.depthSaturationFalloff}
              step="0.01"
              min="0"
              onChange={(value) => {
                behaviour.depthSaturationFalloff = value;
                updateBehaviours();
              }}
            />
          </>
        )}
        <hr />
        <RfSectionLabel help={RF_HELP.depth25d}>2.5D depth & layering</RfSectionLabel>
        <RfSubsectionLabel help={RF_HELP.depthMotionZ}>Depth motion (Z)</RfSubsectionLabel>
        <RfInputNumber
          label="Z Velocity"
          id="recursive-firework-z-velocity"
          value={behaviour.zVelocity ?? keysToInitialize.zVelocity}
          step="1"
          onChange={(value) => {
            behaviour.zVelocity = value;
            updateBehaviours();
          }}
        />
        <RfInputNumber
          label="Z Velocity Var"
          id="recursive-firework-z-velocity-var"
          value={behaviour.zVelocityVariance ?? keysToInitialize.zVelocityVariance}
          step="1"
          min="0"
          onChange={(value) => {
            behaviour.zVelocityVariance = value;
            updateBehaviours();
          }}
        />
        <RfInputNumber
          label="Z Acceleration"
          id="recursive-firework-z-accel"
          value={behaviour.zAcceleration ?? keysToInitialize.zAcceleration}
          step="1"
          onChange={(value) => {
            behaviour.zAcceleration = value;
            updateBehaviours();
          }}
        />
        <RfSubsectionLabel help={RF_HELP.drawOrder}>Draw order</RfSubsectionLabel>
        <RfInputNumber
          label="Z Index Base"
          id="recursive-firework-z-base"
          value={behaviour.zIndexBase ?? keysToInitialize.zIndexBase}
          step="1"
          onChange={(value) => {
            behaviour.zIndexBase = value;
            updateBehaviours();
          }}
        />
        <RfInputNumber
          label="Z Index Factor"
          id="recursive-firework-z-factor"
          value={behaviour.zIndexFactor ?? keysToInitialize.zIndexFactor}
          step="0.05"
          onChange={(value) => {
            behaviour.zIndexFactor = value;
            updateBehaviours();
          }}
        />
        <RfSubsectionLabel help={RF_HELP.perspective}>Perspective</RfSubsectionLabel>
        <div className="form-group">
          <label className="col-xs-4 form-label" htmlFor="recursive-firework-perspective-profile">
            Perspective Profile
          </label>
          <div className="col-xs-8">
            <select
              id="recursive-firework-perspective-profile"
              className="form-control"
              value={behaviour.perspectiveProfile ?? keysToInitialize.perspectiveProfile}
              onChange={(e) => applyPerspectiveProfile(e.target.value)}
            >
              {Object.entries(PERSPECTIVE_PROFILES).map(([value, profile]) => (
                <option key={value} value={value}>
                  {profile.label}
                </option>
              ))}
            </select>
            <RfSelectHint id="rf-perspective-profile" />
          </div>
        </div>
        <RfSubsectionLabel help={RF_HELP.perspectiveProfile}>Perspective profile usage</RfSubsectionLabel>
        <RfInputNumber
          label="Perspective Depth"
          id="recursive-firework-perspective-depth"
          value={behaviour.perspectiveDepth ?? keysToInitialize.perspectiveDepth}
          step="10"
          min="1"
          onChange={(value) => {
            behaviour.perspectiveDepth = value;
            updateBehaviours();
          }}
        />
        <RfInputNumber
          label="Perspective Strength"
          id="recursive-firework-perspective-strength"
          value={
            behaviour.perspectiveStrength ?? keysToInitialize.perspectiveStrength
          }
          step="0.05"
          min="0"
          onChange={(value) => {
            behaviour.perspectiveStrength = value;
            updateBehaviours();
          }}
        />
        <RfInputNumber
          label="Perspective Curve"
          id="recursive-firework-perspective-exponent"
          value={behaviour.perspectiveExponent ?? keysToInitialize.perspectiveExponent}
          step="0.05"
          min="0.1"
          onChange={(value) => {
            behaviour.perspectiveExponent = value;
            updateBehaviours();
          }}
        />
        <RfSubsectionLabel help={RF_HELP.perspectiveCurve}>Perspective curve</RfSubsectionLabel>
        <RfSubsectionLabel help={RF_HELP.particleSizeDepth}>Particle size vs depth</RfSubsectionLabel>
        <RfCheckbox
          label="Z Scale Enabled"
          id="recursive-firework-z-scale-enabled"
          checked={behaviour.zScaleEnabled ?? true}
          onChange={(value) => {
            behaviour.zScaleEnabled = value;
            updateBehaviours();
          }}
        />
        {zScaleEnabled && (
          <>
            <RfInputNumber
              label="Z Scale Strength"
              id="recursive-firework-z-scale-strength"
              value={behaviour.zScaleStrength ?? keysToInitialize.zScaleStrength}
              step="0.05"
              min="0"
              max="1"
              onChange={(value) => {
                behaviour.zScaleStrength = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Far Scale Min"
              id="recursive-firework-perspective-far-scale-min"
              value={
                behaviour.perspectiveFarScaleMin ??
                keysToInitialize.perspectiveFarScaleMin
              }
              step="0.01"
              min="0.001"
              onChange={(value) => {
                behaviour.perspectiveFarScaleMin = value;
                updateBehaviours();
              }}
            />
            <RfInputNumber
              label="Near Scale Max"
              id="recursive-firework-perspective-near-scale-max"
              value={
                behaviour.perspectiveNearScaleMax ??
                keysToInitialize.perspectiveNearScaleMax
              }
              step="0.1"
              min="0.1"
              onChange={(value) => {
                behaviour.perspectiveNearScaleMax = value;
                updateBehaviours();
              }}
            />
          </>
        )}
      </div>
    </>
  );
}
