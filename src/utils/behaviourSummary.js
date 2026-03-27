import { getCustomBehaviourEntries } from "@utils";

/**
 * Default `enabled` when the field is omitted from config (matches each panel’s keysToInitialize).
 * PositionBehaviour has no enabled flag — always counts as on when present.
 */
export const BEHAVIOUR_DEFAULT_ENABLED = {
  AngularVelocityBehaviour: false,
  LifeBehaviour: true,
  ColorBehaviour: false,
  PositionBehaviour: true,
  WarpBehaviour: false,
  SizeBehaviour: false,
  EmitDirectionBehaviour: false,
  RotationBehaviour: false,
  TurbulenceBehaviour: false,
  CollisionBehaviour: false,
  AttractionRepulsionBehaviour: false,
  NoiseBasedMotionBehaviour: false,
  ForceFieldsBehaviour: false,
  SpawnBehaviour: true,
  TimelineBehaviour: false,
  GroupingBehaviour: false,
  SoundReactiveBehaviour: false,
  LightEffectBehaviour: false,
  StretchBehaviour: false,
  TemperatureBehaviour: false,
  MoveToPointBehaviour: true,
  PointToPointBehaviour: false,
  FormPatternBehaviour: true,
  VortexBehaviour: false,
  PulseBehaviour: false,
  RippleBehaviour: false,
  OrbitBehaviour: false,
  FlickerBehaviour: false,
  WobbleBehaviour: false,
  ColorCycleBehaviour: false,
  ConstrainToShapeBehaviour: false,
  GravityWellBehaviour: false,
  TrailBehaviour: false,
  BounceBehaviour: false,
  ToroidalWrapBehaviour: true,
  HomingBehaviour: false,
  FloatUpBehaviour: false,
  MagnetBehaviour: false,
  NearMissDispersionBehaviour: false,
  ConversionCascadeBehaviour: false,
  BoidsFlockingBehaviour: false,
  ProximityStateBehaviour: false,
  PhaseFieldFlowBehaviour: false,
  PhaseCoherenceBehaviour: false,
  CurvatureFlowBehaviour: false,
  LimitCycleBehaviour: false,
  AizawaAttractorBehaviour: false,
  ToroidalFlowBehaviour: false,
  ProximityTriggeredPhaseBehaviour: false,
  LissajousHarmonicLatticeBehaviour: false,
  JacobianCurlFieldBehaviour: false,
  ShearFlowBehaviour: false,
  ObstacleSDFSteerBehaviour: false,
  RVOAvoidanceBehaviour: false,
  EmitterAttractorLinkBehaviour: false,
  KelvinWakeBehaviour: false,
  BezierFlowTubeBehaviour: false,
  ScreenSpaceFlowMapBehaviour: false,
  BeatPhaseLockBehaviour: false,
  DamageFlashRippleBehaviour: false,
  RecursiveFireworkBehaviour: false,
  FlockingBehaviour: false,
  FlowFieldDriftBehaviour: false,
  TemperatureSimulationBehaviour: false,
  PredatorPreyBehaviour: false,
  GlitchBehaviour: false,
};

/** Sidebar section label → behaviour class name (must match Menu.js ordering labels). */
export const BEHAVIOUR_NAME_TO_LABEL = {
  AizawaAttractorBehaviour: "Aizawa Attractor",
  AngularVelocityBehaviour: "Angular Velocity",
  BeatPhaseLockBehaviour: "Beat Phase Lock",
  BezierFlowTubeBehaviour: "Bezier Flow Tube",
  DamageFlashRippleBehaviour: "Damage Flash Ripple",
  FlockingBehaviour: "Flocking",
  FlowFieldDriftBehaviour: "Flow Field Drift",
  GlitchBehaviour: "Glitch (Emergent)",
  EmitterAttractorLinkBehaviour: "Emitter Attractor Link",
  JacobianCurlFieldBehaviour: "Jacobian Curl-Field",
  KelvinWakeBehaviour: "Kelvin Wake",
  LissajousHarmonicLatticeBehaviour: "Lissajous Harmonic Lattice",
  AttractionRepulsionBehaviour: "Attraction Repulsion",
  BoidsFlockingBehaviour: "Boids Flocking",
  BounceBehaviour: "Bounce",
  ToroidalWrapBehaviour: "Toroidal Wrap",
  CollisionBehaviour: "Collision",
  ColorBehaviour: "Color",
  ColorCycleBehaviour: "Color Cycle",
  ConstrainToShapeBehaviour: "Constrain To Shape",
  EmitDirectionBehaviour: "Emit Direction",
  FlickerBehaviour: "Flicker",
  FloatUpBehaviour: "Float Up",
  ForceFieldsBehaviour: "Force Fields",
  GravityWellBehaviour: "Gravity Well",
  GroupingBehaviour: "Grouping",
  HomingBehaviour: "Homing",
  LifeBehaviour: "Life",
  LightEffectBehaviour: "Light Effect",
  MagnetBehaviour: "Magnet",
  MoveToPointBehaviour: "Move To Point",
  PointToPointBehaviour: "Point To Point",
  FormPatternBehaviour: "Form Pattern",
  NoiseBasedMotionBehaviour: "Noise Based Motion",
  ObstacleSDFSteerBehaviour: "Obstacle SDF Steer",
  OrbitBehaviour: "Orbit",
  PhaseFieldFlowBehaviour: "Phase Field Flow",
  PhaseCoherenceBehaviour: "Phase Coherence",
  CurvatureFlowBehaviour: "Curvature Flow",
  LimitCycleBehaviour: "Limit Cycle",
  PositionBehaviour: "Position",
  WarpBehaviour: "Warp",
  PredatorPreyBehaviour: "Predator Prey",
  ConversionCascadeBehaviour: "Conversion Cascade",
  NearMissDispersionBehaviour: "Near Miss Dispersion",
  ProximityStateBehaviour: "Proximity State",
  ProximityTriggeredPhaseBehaviour: "Proximity Triggered Phase",
  PulseBehaviour: "Pulse",
  RippleBehaviour: "Ripple",
  RecursiveFireworkBehaviour: "Recursive Firework",
  RVOAvoidanceBehaviour: "RVO Avoidance",
  RotationBehaviour: "Rotation",
  SizeBehaviour: "Size",
  ScreenSpaceFlowMapBehaviour: "Screen Space Flow Map",
  ShearFlowBehaviour: "Shear Flow",
  SoundReactiveBehaviour: "Sound Reactive",
  SpawnBehaviour: "Spawn",
  StretchBehaviour: "Stretch",
  TemperatureBehaviour: "Temperature",
  TemperatureSimulationBehaviour: "Temperature Simulation",
  TimelineBehaviour: "Timeline",
  ToroidalFlowBehaviour: "Toroidal Flow",
  TrailBehaviour: "Trail",
  TurbulenceBehaviour: "Turbulence",
  VortexBehaviour: "Vortex",
  WobbleBehaviour: "Wobble",
};

const builtInSet = new Set(Object.keys(BEHAVIOUR_NAME_TO_LABEL));

export function menuLabelToPanelId(label) {
  const slug = label
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  return `behaviour-panel-${slug || "section"}`;
}

/** Always shown in the sidebar summary; not a behaviour row in config. */
export const EMISSION_TYPE_SUMMARY = {
  label: "Emission Type",
  panelId: menuLabelToPanelId("Emission Type"),
  key: "_emission-type",
};

/**
 * Sidebar section titles from Menu.js (default particle sidebar). Order here is arbitrary;
 * {@link getAllSidebarNavItems} sorts by label like the menu.
 */
export const SIDEBAR_SECTION_LABELS = [
  "Aizawa Attractor",
  "Angular Velocity",
  "Attraction Repulsion",
  "Beat Phase Lock",
  "Bezier Flow Tube",
  "Boids Flocking",
  "Bounce",
  "Collision",
  "Color",
  "Color Cycle",
  "Constrain To Shape",
  "Conversion Cascade",
  "Curvature Flow",
  "Custom Behaviour",
  "Damage Flash Ripple",
  "Flocking",
  "Flow Field Drift",
  "Glitch (Emergent)",
  "Emit Direction",
  "Emission Type",
  "Emitter Attractor Link",
  "Flicker",
  "Float Up",
  "Force Fields",
  "Form Pattern",
  "Gravity Well",
  "Grouping",
  "Homing",
  "Jacobian Curl-Field",
  "Kelvin Wake",
  "Life",
  "Light Effect",
  "Limit Cycle",
  "Lissajous Harmonic Lattice",
  "Magnet",
  "Metaball Pass",
  "Move To Point",
  "Point To Point",
  "Near Miss Dispersion",
  "Noise Based Motion",
  "Obstacle SDF Steer",
  "Orbit",
  "Particle links (mesh)",
  "Particles List",
  "Phase Coherence",
  "Phase Field Flow",
  "Position",
  "Warp",
  "Predator Prey",
  "Proximity State",
  "Proximity Triggered Phase",
  "Pulse",
  "Recursive Firework",
  "Ripple",
  "Rotation",
  "RVO Avoidance",
  "Screen Space Flow Map",
  "Shear Flow",
  "Size",
  "Sound Reactive",
  "Spawn",
  "Stretch",
  "Temperature",
  "Temperature Simulation",
  "Timeline",
  "Toroidal Flow",
  "Toroidal Wrap",
  "Trail",
  "Turbulence",
  "Vortex",
  "Wobble",
];

/** Sidebar jump targets for the command palette (includes sections without behaviour rows). */
export const COMMAND_PALETTE_SECTION_LABELS = [
  ...new Set([...SIDEBAR_SECTION_LABELS, "General Properties"]),
].sort((a, b) => a.localeCompare(b));

/** Shared localStorage key for section favourites used by summary + menu ordering. */
export const SIDEBAR_FAVOURITES_STORAGE_KEY = "particleEditor.sidebarPinnedNav.v1";
/** Preference: when true, favourite behaviour sections are listed first in the main panel list. */
export const SIDEBAR_FAVOURITES_FIRST_STORAGE_KEY =
  "particleEditor.sidebarFavouritesFirst.v1";

/**
 * Every navigable sidebar row: built-in sections plus one entry per custom behaviour name.
 * @returns {{ label: string, panelId: string, key: string }[]}
 */
export function getAllSidebarNavItems(config) {
  const rows = SIDEBAR_SECTION_LABELS.map((label) => {
    const panelId = menuLabelToPanelId(label);
    return { label, panelId, key: panelId };
  });
  for (const { index, name } of getCustomBehaviourEntries(config)) {
    rows.push({
      label: `Custom: ${name}`,
      panelId: menuLabelToPanelId("Custom Behaviour"),
      key: `custom-all-${String(name)}-${index}`,
    });
  }
  rows.sort((a, b) => a.label.localeCompare(b.label));
  return rows;
}

export function getEffectiveBehaviourEnabled(behaviour, name) {
  if (!name) return false;
  if (!builtInSet.has(name)) {
    return behaviour.enabled !== false;
  }
  if (behaviour.enabled !== undefined && behaviour.enabled !== null) {
    return Boolean(behaviour.enabled);
  }
  const def = BEHAVIOUR_DEFAULT_ENABLED[name];
  return def !== undefined ? def : true;
}

/**
 * @returns {{ label: string, panelId: string, key: string }[]}
 */
export function getEnabledBehaviourSummaries(config) {
  const behaviours = config?.emitterConfig?.behaviours;
  if (!Array.isArray(behaviours)) return [];

  const out = [];
  for (let i = 0; i < behaviours.length; i++) {
    const b = behaviours[i];
    const name = b?.name;
    if (!name) continue;
    if (!getEffectiveBehaviourEnabled(b, name)) continue;

    if (builtInSet.has(name)) {
      const label = BEHAVIOUR_NAME_TO_LABEL[name];
      if (!label) continue;
      out.push({
        label,
        panelId: menuLabelToPanelId(label),
        key: `${name}-${i}`,
      });
    } else {
      out.push({
        label: `Custom: ${name}`,
        panelId: menuLabelToPanelId("Custom Behaviour"),
        key: `custom-${name}-${i}`,
      });
    }
  }

  return out.sort((a, b) => a.label.localeCompare(b.label));
}
