/**
 * Default `enabled` when the field is omitted from config (matches each panel’s keysToInitialize).
 * PositionBehaviour has no enabled flag — always counts as on when present.
 */
export const BEHAVIOUR_DEFAULT_ENABLED = {
  AngularVelocityBehaviour: false,
  LifeBehaviour: true,
  ColorBehaviour: false,
  PositionBehaviour: true,
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
  FormPatternBehaviour: true,
  Wireframe3DBehaviour: false,
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
};

/** Sidebar section label → behaviour class name (must match Menu.js ordering labels). */
export const BEHAVIOUR_NAME_TO_LABEL = {
  AizawaAttractorBehaviour: "Aizawa Attractor",
  AngularVelocityBehaviour: "Angular Velocity",
  BeatPhaseLockBehaviour: "Beat Phase Lock",
  BezierFlowTubeBehaviour: "Bezier Flow Tube",
  DamageFlashRippleBehaviour: "Damage Flash Ripple",
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
  FormPatternBehaviour: "Form Pattern",
  NoiseBasedMotionBehaviour: "Noise Based Motion",
  ObstacleSDFSteerBehaviour: "Obstacle SDF Steer",
  OrbitBehaviour: "Orbit",
  PhaseFieldFlowBehaviour: "Phase Field Flow",
  PhaseCoherenceBehaviour: "Phase Coherence",
  CurvatureFlowBehaviour: "Curvature Flow",
  LimitCycleBehaviour: "Limit Cycle",
  PositionBehaviour: "Position",
  ConversionCascadeBehaviour: "Conversion Cascade",
  NearMissDispersionBehaviour: "Near Miss Dispersion",
  ProximityStateBehaviour: "Proximity State",
  ProximityTriggeredPhaseBehaviour: "Proximity Triggered Phase",
  PulseBehaviour: "Pulse",
  RippleBehaviour: "Ripple",
  RVOAvoidanceBehaviour: "RVO Avoidance",
  RotationBehaviour: "Rotation",
  SizeBehaviour: "Size",
  ScreenSpaceFlowMapBehaviour: "Screen Space Flow Map",
  ShearFlowBehaviour: "Shear Flow",
  SoundReactiveBehaviour: "Sound Reactive",
  SpawnBehaviour: "Spawn",
  StretchBehaviour: "Stretch",
  TemperatureBehaviour: "Temperature",
  TimelineBehaviour: "Timeline",
  ToroidalFlowBehaviour: "Toroidal Flow",
  TrailBehaviour: "Trail",
  TurbulenceBehaviour: "Turbulence",
  VortexBehaviour: "Vortex",
  Wireframe3DBehaviour: "Wireframe 3D",
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
