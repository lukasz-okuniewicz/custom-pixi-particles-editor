"use client";

import LoadAndSaveProperties from "@components/properties/LoadAndSaveProperties";
import GeneralProperties from "@components/properties/GeneralProperties";
import ParticleEffectsSelectControl from "@components/properties/ParticleEffectsSelectControl";
import EmissionTypeProperties from "@components/properties/EmissionTypeProperties";
import LifeProperties from "@components/properties/behaviours/LifeProperties";
import SizeProperties from "@components/properties/behaviours/SizeProperties";
import RotationProperties from "@components/properties/behaviours/RotationProperties";
import PositionProperties from "@components/properties/behaviours/PositionProperties";
import WarpProperties from "@components/properties/behaviours/WarpProperties";
import CollisionProperties from "@components/properties/behaviours/CollisionProperties";
import ColorProperties from "@components/properties/behaviours/ColorProperties";
import AngularVelocityProperties from "@components/properties/behaviours/AngularVelocityProperties";
import EmitDirectionProperties from "@components/properties/behaviours/EmitDirectionProperties";
import TurbulenceProperties from "@components/properties/behaviours/TurbulenceProperties";
import { getConfigIndexByName, getCustomBehaviourEntries } from "@utils";
import ParticlesList from "@components/particlesList";
import AttractionRepulsionProperties from "@components/properties/behaviours/AttractionRepulsionProperties";
import NoiseBasedMotionProperties from "@components/properties/behaviours/NoiseBasedMotionBehaviour";
import ForceFieldsProperties from "@components/properties/behaviours/ForceFieldsBehaviour";
import SpawnProperties from "@components/properties/behaviours/SpawnProperties";
import TimelineProperties from "@components/properties/behaviours/TimelineProperties";
import GroupingProperties from "@components/properties/behaviours/GroupingProperties";
import SoundReactiveProperties from "@components/properties/behaviours/SoundReactiveProperties";
import LightEffectProperties from "@components/properties/behaviours/LightEffectProperties";
import StretchProperties from "@components/properties/behaviours/StretchProperties";
import TemperatureProperties from "@components/properties/behaviours/TemperatureProperties";
import MoveToPointProperties from "@components/properties/behaviours/MoveToPointProperties";
import PointToPointProperties from "@components/properties/behaviours/PointToPointProperties";
import FormPatternProperties from "@components/properties/behaviours/FormPatternProperties";
import VortexProperties from "@components/properties/behaviours/VortexProperties";
import PulseProperties from "@components/properties/behaviours/PulseProperties";
import RippleProperties from "@components/properties/behaviours/RippleProperties";
import OrbitProperties from "@components/properties/behaviours/OrbitProperties";
import FlickerProperties from "@components/properties/behaviours/FlickerProperties";
import WobbleProperties from "@components/properties/behaviours/WobbleProperties";
import ColorCycleProperties from "@components/properties/behaviours/ColorCycleProperties";
import ConstrainToShapeProperties from "@components/properties/behaviours/ConstrainToShapeProperties";
import GravityWellProperties from "@components/properties/behaviours/GravityWellProperties";
import TrailProperties from "@components/properties/behaviours/TrailProperties";
import BounceProperties from "@components/properties/behaviours/BounceProperties";
import ToroidalWrapProperties from "@components/properties/behaviours/ToroidalWrapProperties";
import HomingProperties from "@components/properties/behaviours/HomingProperties";
import FloatUpProperties from "@components/properties/behaviours/FloatUpProperties";
import MagnetProperties from "@components/properties/behaviours/MagnetProperties";
import CustomBehaviourProperties from "@components/properties/behaviours/CustomBehaviourProperties";
import ShatterEffectProperties from "@components/properties/behaviours/ShatterEffectProperties";
import DissolveEffectProperties from "@components/properties/behaviours/DissolveEffectProperties";
import MagneticAssemblyEffectProperties from "@components/properties/behaviours/MagneticAssemblyEffectProperties";
import GhostEffectProperties from "@components/properties/behaviours/GhostEffectProperties";
import GlitchEffectProperties from "@components/properties/behaviours/GlitchEffectProperties";
import MeltEffectProperties from "@components/properties/behaviours/MeltEffectProperties";
import PixelSortEffectProperties from "@components/properties/behaviours/PixelSortEffectProperties";
import PrismRefractionEffectProperties from "@components/properties/behaviours/PrismRefractionEffectProperties";
import CrystallizeEffectProperties from "@components/properties/behaviours/CrystallizeEffectProperties";
import SlitScanEffectProperties from "@components/properties/behaviours/SlitScanEffectProperties";
import GranularErosionEffectProperties from "@components/properties/behaviours/GranularErosionEffectProperties";
import LiquidMercuryEffectProperties from "@components/properties/behaviours/LiquidMercuryEffectProperties";
import NearMissDispersionProperties from "@components/properties/behaviours/NearMissDispersionProperties";
import ConversionCascadeProperties from "@components/properties/behaviours/ConversionCascadeProperties";
import BoidsFlockingProperties from "@components/properties/behaviours/BoidsFlockingProperties";
import ProximityStateProperties from "@components/properties/behaviours/ProximityStateProperties";
import PhaseFieldFlowProperties from "@components/properties/behaviours/PhaseFieldFlowProperties";
import PhaseCoherenceProperties from "@components/properties/behaviours/PhaseCoherenceProperties";
import CurvatureFlowProperties from "@components/properties/behaviours/CurvatureFlowProperties";
import LimitCycleProperties from "@components/properties/behaviours/LimitCycleProperties";
import AizawaAttractorProperties from "@components/properties/behaviours/AizawaAttractorProperties";
import ToroidalFlowProperties from "@components/properties/behaviours/ToroidalFlowProperties";
import ProximityTriggeredPhaseProperties from "@components/properties/behaviours/ProximityTriggeredPhaseProperties";
import LissajousHarmonicLatticeProperties from "@components/properties/behaviours/LissajousHarmonicLatticeProperties";
import JacobianCurlFieldProperties from "@components/properties/behaviours/JacobianCurlFieldProperties";
import ShearFlowProperties from "@components/properties/behaviours/ShearFlowProperties";
import ObstacleSDFSteerProperties from "@components/properties/behaviours/ObstacleSDFSteerProperties";
import RVOAvoidanceProperties from "@components/properties/behaviours/RVOAvoidanceProperties";
import EmitterAttractorLinkProperties from "@components/properties/behaviours/EmitterAttractorLinkProperties";
import KelvinWakeProperties from "@components/properties/behaviours/KelvinWakeProperties";
import BezierFlowTubeProperties from "@components/properties/behaviours/BezierFlowTubeProperties";
import ScreenSpaceFlowMapProperties from "@components/properties/behaviours/ScreenSpaceFlowMapProperties";
import BeatPhaseLockProperties from "@components/properties/behaviours/BeatPhaseLockProperties";
import DamageFlashRippleProperties from "@components/properties/behaviours/DamageFlashRippleProperties";
import RecursiveFireworkProperties from "@components/properties/behaviours/RecursiveFireworkProperties";
import FlockingProperties from "@components/properties/behaviours/FlockingProperties";
import FlowFieldDriftProperties from "@components/properties/behaviours/FlowFieldDriftProperties";
import TemperatureSimulationProperties from "@components/properties/behaviours/TemperatureSimulationProperties";
import PredatorPreyProperties from "@components/properties/behaviours/PredatorPreyProperties";
import GlitchBehaviourProperties from "@components/properties/behaviours/GlitchBehaviourProperties";
import MetaballPassProperties from "@components/properties/MetaballPassProperties";
import ParticleLinksProperties from "@components/properties/ParticleLinksProperties";
import ActiveBehavioursSummary from "@components/ActiveBehavioursSummary";
import SidebarAccordionToggle from "@components/SidebarAccordionToggle";
import {
  SidebarBehaviourAccordionProvider,
  useSidebarBehaviourAccordion,
} from "@context/SidebarBehaviourAccordionContext";
import { useEditorSidebarResize } from "@hooks/useEditorSidebarResize";
import { useEffect, useMemo, useRef, useState } from "react";
import { GENERAL_PROPERTIES_PANEL_ID, scrollToSidebarPanel } from "@utils/editorNav";
import {
  getEffectiveBehaviourEnabled,
  menuLabelToPanelId,
  SIDEBAR_FAVOURITES_STORAGE_KEY,
  SIDEBAR_FAVOURITES_FIRST_STORAGE_KEY,
} from "@utils/behaviourSummary";

function isEmissionTypeItem(item) {
  return item.Component === EmissionTypeProperties;
}

const SIDEBAR_FAVOURITES_CHANGED_EVENT = "editor-sidebar-favourites-changed";

function readFavouriteLabels() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SIDEBAR_FAVOURITES_STORAGE_KEY);
    const parsed = JSON.parse(raw || "[]");
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function readFavouritesFirstPreference() {
  if (typeof window === "undefined") return true;
  try {
    const raw = window.localStorage.getItem(SIDEBAR_FAVOURITES_FIRST_STORAGE_KEY);
    if (raw === null) return true;
    if (raw === "true" || raw === "1") return true;
    if (raw === "false" || raw === "0") return false;
    return JSON.parse(raw) !== false;
  } catch {
    return true;
  }
}

/** Stable panel ids for sprite/image effect property panels (effect-only sidebar). */
const PARTICLE_EFFECT_ACCORDION_PANEL_IDS = {
  shatterEffect: menuLabelToPanelId("Shatter Effect Properties"),
  dissolveEffect: menuLabelToPanelId("Dissolve Effect Properties"),
  magneticAssemblyEffect: menuLabelToPanelId("Magnetic Assembly Effect Properties"),
  ghostEffect: menuLabelToPanelId("Ghost Effect Properties"),
  glitchEffect: menuLabelToPanelId("Glitch Effect Properties"),
  meltEffect: menuLabelToPanelId("Melt Effect Properties"),
  pixelSortEffect: menuLabelToPanelId("Pixel Sort Effect Properties"),
  prismRefractionEffect: menuLabelToPanelId("Prism Refraction Effect Properties"),
  crystallizeEffect: menuLabelToPanelId("Crystallize Effect Properties"),
  slitScanEffect: menuLabelToPanelId("Slit-Scan Effect Properties"),
  granularErosionEffect: menuLabelToPanelId("Granular Erosion Effect Properties"),
  liquidMercuryEffect: menuLabelToPanelId("Liquid Mercury Effect Properties"),
};

const sidebarBaseClass =
  "editor-sidebar fixed right-0 top-0 bottom-0 overflow-y-auto overflow-x-hidden block p-5 z-20 bg-[#181a1b] border-l border-l-[rgba(140,130,115,0.5)]";

function isBehaviourSectionHighlighted(defaultConfig, item) {
  if (isEmissionTypeItem(item)) {
    return true;
  }
  if (item.Component === ParticleLinksProperties) {
    return defaultConfig.particleLinks?.enabled === true;
  }
  if (item.customBehaviours) {
    const customs = getCustomBehaviourEntries(defaultConfig);
    return customs.some(({ index }) => {
      const b = defaultConfig.emitterConfig.behaviours?.[index];
      return b?.name && getEffectiveBehaviourEnabled(b, b.name);
    });
  }
  if (!item.behaviourName) return false;
  const idx = getConfigIndexByName(item.behaviourName, defaultConfig);
  if (idx < 0) return false;
  const b = defaultConfig.emitterConfig.behaviours?.[idx];
  return getEffectiveBehaviourEnabled(b || {}, item.behaviourName);
}

const PREDEFINED_EFFECT_COMPONENTS = {
  shatterEffect: ShatterEffectProperties,
  dissolveEffect: DissolveEffectProperties,
  magneticAssemblyEffect: MagneticAssemblyEffectProperties,
  ghostEffect: GhostEffectProperties,
  glitchEffect: GlitchEffectProperties,
  meltEffect: MeltEffectProperties,
  pixelSortEffect: PixelSortEffectProperties,
  prismRefractionEffect: PrismRefractionEffectProperties,
  crystallizeEffect: CrystallizeEffectProperties,
  slitScanEffect: SlitScanEffectProperties,
  granularErosionEffect: GranularErosionEffectProperties,
  liquidMercuryEffect: LiquidMercuryEffectProperties,
};

function LazyMenuSection({
  item,
  defaultConfig,
  fullConfig,
  customBehaviourEntries,
  favouriteSet,
  toggleFavouriteLabel,
  sidebarRootRef,
}) {
  const { openPanelId } = useSidebarBehaviourAccordion();
  const rowRef = useRef(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const {
    label,
    Component,
    getIndex,
    customBehaviours,
    metaball,
    isGeneralProperties,
  } = item;

  if (customBehaviours && customBehaviourEntries.length === 0) return null;
  const panelId = isGeneralProperties
    ? GENERAL_PROPERTIES_PANEL_ID
    : menuLabelToPanelId(label);
  const behaviourOn = isBehaviourSectionHighlighted(defaultConfig, item);
  const isFavourite = favouriteSet.has(label);

  useEffect(() => {
    const root = sidebarRootRef.current;
    const node = rowRef.current;
    if (!root || !node || typeof IntersectionObserver === "undefined") {
      setIsNearViewport(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIsNearViewport(entry.isIntersecting),
      { root, rootMargin: "480px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [sidebarRootRef]);

  const shouldMountInner =
    isActivated ||
    isNearViewport ||
    isFavourite ||
    behaviourOn ||
    openPanelId === panelId;

  useEffect(() => {
    if (shouldMountInner && !isActivated) {
      setIsActivated(true);
    }
  }, [isActivated, shouldMountInner]);

  const inner = !isActivated ? (
    <button
      type="button"
      className="btn btn-default btn-block"
      onClick={() => setIsActivated(true)}
      aria-label={`Load ${label} panel`}
    >
      Load {label}
    </button>
  ) : isGeneralProperties ? (
    <Component
      defaultConfig={defaultConfig}
      fullConfig={fullConfig}
      accordionPanelId={GENERAL_PROPERTIES_PANEL_ID}
      wrapInSection={false}
    />
  ) : customBehaviours ? (
    <Component
      defaultConfig={defaultConfig}
      customBehaviours={customBehaviourEntries}
      accordionPanelId={panelId}
    />
  ) : Component === EmissionTypeProperties ||
    Component === ParticleLinksProperties ? (
    <Component defaultConfig={defaultConfig} accordionPanelId={panelId} />
  ) : Component === ParticlesList ? (
    <Component defaultConfig={defaultConfig} accordionPanelId={panelId} />
  ) : metaball ? (
    <Component defaultConfig={defaultConfig} accordionPanelId={panelId} />
  ) : (
    <Component
      defaultConfig={defaultConfig}
      index={getIndex()}
      accordionPanelId={panelId}
    />
  );

  return (
    <div
      ref={rowRef}
      id={panelId}
      className={
        behaviourOn
          ? "editor-sidebar-section editor-sidebar-section--behaviour-on"
          : "editor-sidebar-section"
      }
    >
      <button
        type="button"
        className={
          isFavourite
            ? "editor-sidebar-favourite-btn editor-sidebar-favourite-btn--active"
            : "editor-sidebar-favourite-btn"
        }
        onClick={(e) => {
          e.stopPropagation();
          toggleFavouriteLabel(label);
        }}
        aria-label={
          isFavourite
            ? `Remove ${label} from favourites`
            : `Add ${label} to favourites`
        }
        title={isFavourite ? "Remove from favourites" : "Add to favourites"}
      >
        <span className="editor-sidebar-favourite-btn__icon">
          {isFavourite ? "★" : "☆"}
        </span>
      </button>
      {inner}
    </div>
  );
}

const Menu = ({
  defaultConfig,
  fullConfig,
  handlePredefinedEffectChange,
  isDirty = false,
  validationWarnings = [],
  isMobileMenuOpen = false,
  onCloseMenu,
}) => {
  const { onResizeHandleMouseDown } = useEditorSidebarResize();
  const sidebarRef = useRef(null);
  const [favouriteLabels, setFavouriteLabels] = useState(readFavouriteLabels);
  const [favouritesFirst, setFavouritesFirst] = useState(
    readFavouritesFirstPreference,
  );
  const resizeHandle = (
    <div
      className="editor-sidebar-resize-handle"
      onMouseDown={onResizeHandleMouseDown}
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize sidebar"
      tabIndex={-1}
    />
  );
  const sidebarClass = `${sidebarBaseClass}${isMobileMenuOpen ? " editor-sidebar--open" : ""} editor-sidebar--compact`;
  const warningsRows = (validationWarnings || []).map((w) =>
    typeof w === "string" ? { message: w, panelId: null } : w,
  );
  const warningsCard = warningsRows.length ? (
    <div id="editor-warnings-card" className="editor-warnings-card">
      <div className="editor-onboarding-card__title">Validation warnings</div>
      <ul className="editor-onboarding-card__list">
        {warningsRows.map((w) => (
          <li key={w.message}>
            {w.panelId ? (
              <button
                type="button"
                className="editor-warnings-card__link"
                onClick={() => scrollToSidebarPanel(w.panelId)}
              >
                {w.message}
              </button>
            ) : (
              w.message
            )}
          </li>
        ))}
      </ul>
    </div>
  ) : null;
  const closeButton = onCloseMenu ? (
    <button
      type="button"
      aria-label="Close menu"
      className="editor-sidebar-close"
      onClick={onCloseMenu}
    >
      ×
    </button>
  ) : null;
  const EffectPanel = PREDEFINED_EFFECT_COMPONENTS[defaultConfig.particlePredefinedEffect];
  /** Landing preset: behaviour panels intentionally render nothing but were still wrapped in empty sections. */
  const hideParticleBehaviourSidebar =
    defaultConfig.particlePredefinedEffect === "coffeeShop";
  const dynamicSections = useMemo(
    () =>
      [
        { label: "Aizawa Attractor", Component: AizawaAttractorProperties, behaviourName: "AizawaAttractorBehaviour", getIndex: () => getConfigIndexByName("AizawaAttractorBehaviour", defaultConfig) },
        { label: "Angular Velocity", Component: AngularVelocityProperties, behaviourName: "AngularVelocityBehaviour", getIndex: () => getConfigIndexByName("AngularVelocityBehaviour", defaultConfig) },
        { label: "Beat Phase Lock", Component: BeatPhaseLockProperties, behaviourName: "BeatPhaseLockBehaviour", getIndex: () => getConfigIndexByName("BeatPhaseLockBehaviour", defaultConfig) },
        { label: "Bezier Flow Tube", Component: BezierFlowTubeProperties, behaviourName: "BezierFlowTubeBehaviour", getIndex: () => getConfigIndexByName("BezierFlowTubeBehaviour", defaultConfig) },
        { label: "Damage Flash Ripple", Component: DamageFlashRippleProperties, behaviourName: "DamageFlashRippleBehaviour", getIndex: () => getConfigIndexByName("DamageFlashRippleBehaviour", defaultConfig) },
        { label: "Emitter Attractor Link", Component: EmitterAttractorLinkProperties, behaviourName: "EmitterAttractorLinkBehaviour", getIndex: () => getConfigIndexByName("EmitterAttractorLinkBehaviour", defaultConfig) },
        { label: "Jacobian Curl-Field", Component: JacobianCurlFieldProperties, behaviourName: "JacobianCurlFieldBehaviour", getIndex: () => getConfigIndexByName("JacobianCurlFieldBehaviour", defaultConfig) },
        { label: "Kelvin Wake", Component: KelvinWakeProperties, behaviourName: "KelvinWakeBehaviour", getIndex: () => getConfigIndexByName("KelvinWakeBehaviour", defaultConfig) },
        { label: "Lissajous Harmonic Lattice", Component: LissajousHarmonicLatticeProperties, behaviourName: "LissajousHarmonicLatticeBehaviour", getIndex: () => getConfigIndexByName("LissajousHarmonicLatticeBehaviour", defaultConfig) },
        { label: "Attraction Repulsion", Component: AttractionRepulsionProperties, behaviourName: "AttractionRepulsionBehaviour", getIndex: () => getConfigIndexByName("AttractionRepulsionBehaviour", defaultConfig) },
        { label: "Boids Flocking", Component: BoidsFlockingProperties, behaviourName: "BoidsFlockingBehaviour", getIndex: () => getConfigIndexByName("BoidsFlockingBehaviour", defaultConfig) },
        { label: "Bounce", Component: BounceProperties, behaviourName: "BounceBehaviour", getIndex: () => getConfigIndexByName("BounceBehaviour", defaultConfig) },
        { label: "Toroidal Wrap", Component: ToroidalWrapProperties, behaviourName: "ToroidalWrapBehaviour", getIndex: () => getConfigIndexByName("ToroidalWrapBehaviour", defaultConfig) },
        { label: "Collision", Component: CollisionProperties, behaviourName: "CollisionBehaviour", getIndex: () => getConfigIndexByName("CollisionBehaviour", defaultConfig) },
        { label: "Color", Component: ColorProperties, behaviourName: "ColorBehaviour", getIndex: () => getConfigIndexByName("ColorBehaviour", defaultConfig) },
        { label: "Color Cycle", Component: ColorCycleProperties, behaviourName: "ColorCycleBehaviour", getIndex: () => getConfigIndexByName("ColorCycleBehaviour", defaultConfig) },
        { label: "Constrain To Shape", Component: ConstrainToShapeProperties, behaviourName: "ConstrainToShapeBehaviour", getIndex: () => getConfigIndexByName("ConstrainToShapeBehaviour", defaultConfig) },
        { label: "Custom Behaviour", Component: CustomBehaviourProperties, customBehaviours: true },
        { label: "Emit Direction", Component: EmitDirectionProperties, behaviourName: "EmitDirectionBehaviour", getIndex: () => getConfigIndexByName("EmitDirectionBehaviour", defaultConfig) },
        { label: "Emission Type", Component: EmissionTypeProperties },
        { label: "Flicker", Component: FlickerProperties, behaviourName: "FlickerBehaviour", getIndex: () => getConfigIndexByName("FlickerBehaviour", defaultConfig) },
        { label: "Flocking", Component: FlockingProperties, behaviourName: "FlockingBehaviour", getIndex: () => getConfigIndexByName("FlockingBehaviour", defaultConfig) },
        { label: "Float Up", Component: FloatUpProperties, behaviourName: "FloatUpBehaviour", getIndex: () => getConfigIndexByName("FloatUpBehaviour", defaultConfig) },
        { label: "Flow Field Drift", Component: FlowFieldDriftProperties, behaviourName: "FlowFieldDriftBehaviour", getIndex: () => getConfigIndexByName("FlowFieldDriftBehaviour", defaultConfig) },
        { label: "Force Fields", Component: ForceFieldsProperties, behaviourName: "ForceFieldsBehaviour", getIndex: () => getConfigIndexByName("ForceFieldsBehaviour", defaultConfig) },
        { label: "Gravity Well", Component: GravityWellProperties, behaviourName: "GravityWellBehaviour", getIndex: () => getConfigIndexByName("GravityWellBehaviour", defaultConfig) },
        { label: "Glitch (Emergent)", Component: GlitchBehaviourProperties, behaviourName: "GlitchBehaviour", getIndex: () => getConfigIndexByName("GlitchBehaviour", defaultConfig) },
        { label: "Grouping", Component: GroupingProperties, behaviourName: "GroupingBehaviour", getIndex: () => getConfigIndexByName("GroupingBehaviour", defaultConfig) },
        { label: "Homing", Component: HomingProperties, behaviourName: "HomingBehaviour", getIndex: () => getConfigIndexByName("HomingBehaviour", defaultConfig) },
        { label: "Life", Component: LifeProperties, behaviourName: "LifeBehaviour", getIndex: () => getConfigIndexByName("LifeBehaviour", defaultConfig) },
        { label: "Light Effect", Component: LightEffectProperties, behaviourName: "LightEffectBehaviour", getIndex: () => getConfigIndexByName("LightEffectBehaviour", defaultConfig) },
        { label: "Magnet", Component: MagnetProperties, behaviourName: "MagnetBehaviour", getIndex: () => getConfigIndexByName("MagnetBehaviour", defaultConfig) },
        { label: "Metaball Pass", Component: MetaballPassProperties, metaball: true },
        { label: "Move To Point", Component: MoveToPointProperties, behaviourName: "MoveToPointBehaviour", getIndex: () => getConfigIndexByName("MoveToPointBehaviour", defaultConfig) },
        { label: "Point To Point", Component: PointToPointProperties, behaviourName: "PointToPointBehaviour", getIndex: () => getConfigIndexByName("PointToPointBehaviour", defaultConfig) },
        { label: "Form Pattern", Component: FormPatternProperties, behaviourName: "FormPatternBehaviour", getIndex: () => getConfigIndexByName("FormPatternBehaviour", defaultConfig) },
        { label: "Noise Based Motion", Component: NoiseBasedMotionProperties, behaviourName: "NoiseBasedMotionBehaviour", getIndex: () => getConfigIndexByName("NoiseBasedMotionBehaviour", defaultConfig) },
        { label: "Obstacle SDF Steer", Component: ObstacleSDFSteerProperties, behaviourName: "ObstacleSDFSteerBehaviour", getIndex: () => getConfigIndexByName("ObstacleSDFSteerBehaviour", defaultConfig) },
        { label: "Orbit", Component: OrbitProperties, behaviourName: "OrbitBehaviour", getIndex: () => getConfigIndexByName("OrbitBehaviour", defaultConfig) },
        { label: "Particle links (mesh)", Component: ParticleLinksProperties },
        { label: "Particles List", Component: ParticlesList },
        { label: "Phase Field Flow", Component: PhaseFieldFlowProperties, behaviourName: "PhaseFieldFlowBehaviour", getIndex: () => getConfigIndexByName("PhaseFieldFlowBehaviour", defaultConfig) },
        { label: "Phase Coherence", Component: PhaseCoherenceProperties, behaviourName: "PhaseCoherenceBehaviour", getIndex: () => getConfigIndexByName("PhaseCoherenceBehaviour", defaultConfig) },
        { label: "Curvature Flow", Component: CurvatureFlowProperties, behaviourName: "CurvatureFlowBehaviour", getIndex: () => getConfigIndexByName("CurvatureFlowBehaviour", defaultConfig) },
        { label: "Limit Cycle", Component: LimitCycleProperties, behaviourName: "LimitCycleBehaviour", getIndex: () => getConfigIndexByName("LimitCycleBehaviour", defaultConfig) },
        { label: "Position", Component: PositionProperties, behaviourName: "PositionBehaviour", getIndex: () => getConfigIndexByName("PositionBehaviour", defaultConfig) },
        { label: "Warp", Component: WarpProperties, behaviourName: "WarpBehaviour", getIndex: () => getConfigIndexByName("WarpBehaviour", defaultConfig) },
        { label: "Predator Prey", Component: PredatorPreyProperties, behaviourName: "PredatorPreyBehaviour", getIndex: () => getConfigIndexByName("PredatorPreyBehaviour", defaultConfig) },
        { label: "Conversion Cascade", Component: ConversionCascadeProperties, behaviourName: "ConversionCascadeBehaviour", getIndex: () => getConfigIndexByName("ConversionCascadeBehaviour", defaultConfig) },
        { label: "Near Miss Dispersion", Component: NearMissDispersionProperties, behaviourName: "NearMissDispersionBehaviour", getIndex: () => getConfigIndexByName("NearMissDispersionBehaviour", defaultConfig) },
        { label: "Proximity State", Component: ProximityStateProperties, behaviourName: "ProximityStateBehaviour", getIndex: () => getConfigIndexByName("ProximityStateBehaviour", defaultConfig) },
        { label: "Proximity Triggered Phase", Component: ProximityTriggeredPhaseProperties, behaviourName: "ProximityTriggeredPhaseBehaviour", getIndex: () => getConfigIndexByName("ProximityTriggeredPhaseBehaviour", defaultConfig) },
        { label: "Pulse", Component: PulseProperties, behaviourName: "PulseBehaviour", getIndex: () => getConfigIndexByName("PulseBehaviour", defaultConfig) },
        { label: "Ripple", Component: RippleProperties, behaviourName: "RippleBehaviour", getIndex: () => getConfigIndexByName("RippleBehaviour", defaultConfig) },
        { label: "Recursive Firework", Component: RecursiveFireworkProperties, behaviourName: "RecursiveFireworkBehaviour", getIndex: () => getConfigIndexByName("RecursiveFireworkBehaviour", defaultConfig) },
        { label: "RVO Avoidance", Component: RVOAvoidanceProperties, behaviourName: "RVOAvoidanceBehaviour", getIndex: () => getConfigIndexByName("RVOAvoidanceBehaviour", defaultConfig) },
        { label: "Rotation", Component: RotationProperties, behaviourName: "RotationBehaviour", getIndex: () => getConfigIndexByName("RotationBehaviour", defaultConfig) },
        { label: "Size", Component: SizeProperties, behaviourName: "SizeBehaviour", getIndex: () => getConfigIndexByName("SizeBehaviour", defaultConfig) },
        { label: "Screen Space Flow Map", Component: ScreenSpaceFlowMapProperties, behaviourName: "ScreenSpaceFlowMapBehaviour", getIndex: () => getConfigIndexByName("ScreenSpaceFlowMapBehaviour", defaultConfig) },
        { label: "Shear Flow", Component: ShearFlowProperties, behaviourName: "ShearFlowBehaviour", getIndex: () => getConfigIndexByName("ShearFlowBehaviour", defaultConfig) },
        { label: "Sound Reactive", Component: SoundReactiveProperties, behaviourName: "SoundReactiveBehaviour", getIndex: () => getConfigIndexByName("SoundReactiveBehaviour", defaultConfig) },
        { label: "Spawn", Component: SpawnProperties, behaviourName: "SpawnBehaviour", getIndex: () => getConfigIndexByName("SpawnBehaviour", defaultConfig) },
        { label: "Stretch", Component: StretchProperties, behaviourName: "StretchBehaviour", getIndex: () => getConfigIndexByName("StretchBehaviour", defaultConfig) },
        { label: "Temperature", Component: TemperatureProperties, behaviourName: "TemperatureBehaviour", getIndex: () => getConfigIndexByName("TemperatureBehaviour", defaultConfig) },
        { label: "Temperature Simulation", Component: TemperatureSimulationProperties, behaviourName: "TemperatureSimulationBehaviour", getIndex: () => getConfigIndexByName("TemperatureSimulationBehaviour", defaultConfig) },
        { label: "Timeline", Component: TimelineProperties, behaviourName: "TimelineBehaviour", getIndex: () => getConfigIndexByName("TimelineBehaviour", defaultConfig) },
        { label: "Toroidal Flow", Component: ToroidalFlowProperties, behaviourName: "ToroidalFlowBehaviour", getIndex: () => getConfigIndexByName("ToroidalFlowBehaviour", defaultConfig) },
        { label: "Trail", Component: TrailProperties, behaviourName: "TrailBehaviour", getIndex: () => getConfigIndexByName("TrailBehaviour", defaultConfig) },
        { label: "Turbulence", Component: TurbulenceProperties, behaviourName: "TurbulenceBehaviour", getIndex: () => getConfigIndexByName("TurbulenceBehaviour", defaultConfig) },
        { label: "Vortex", Component: VortexProperties, behaviourName: "VortexBehaviour", getIndex: () => getConfigIndexByName("VortexBehaviour", defaultConfig) },
        { label: "Wobble", Component: WobbleProperties, behaviourName: "WobbleBehaviour", getIndex: () => getConfigIndexByName("WobbleBehaviour", defaultConfig) },
      ].sort((a, b) => a.label.localeCompare(b.label)),
    [defaultConfig],
  );
  useEffect(() => {
    const refreshFavouriteLabels = () => setFavouriteLabels(readFavouriteLabels());
    refreshFavouriteLabels();
    const onStorage = (e) => {
      if (!e || e.key === SIDEBAR_FAVOURITES_STORAGE_KEY || e.key === null) {
        refreshFavouriteLabels();
      }
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener(SIDEBAR_FAVOURITES_CHANGED_EVENT, refreshFavouriteLabels);
    window.addEventListener("focus", refreshFavouriteLabels);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(SIDEBAR_FAVOURITES_CHANGED_EVENT, refreshFavouriteLabels);
      window.removeEventListener("focus", refreshFavouriteLabels);
    };
  }, []);

  const orderedDynamicSections = useMemo(() => {
    const allSections = [
      ...dynamicSections,
      {
        label: "General Properties",
        Component: GeneralProperties,
        isGeneralProperties: true,
      },
    ].sort((a, b) => a.label.localeCompare(b.label));
    if (!favouritesFirst) return allSections;
    if (!Array.isArray(allSections) || allSections.length === 0) return allSections;
    const favSet = new Set(favouriteLabels);
    const favourites = allSections.filter((row) => favSet.has(row.label));
    const others = allSections.filter((row) => !favSet.has(row.label));
    return [...favourites, ...others];
  }, [dynamicSections, favouriteLabels, favouritesFirst]);
  const favouriteSet = useMemo(() => new Set(favouriteLabels), [favouriteLabels]);
  const customBehaviourEntries = useMemo(
    () => getCustomBehaviourEntries(defaultConfig),
    [defaultConfig],
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(
        SIDEBAR_FAVOURITES_STORAGE_KEY,
        JSON.stringify(favouriteLabels),
      );
    } catch {
      /* ignore */
    }
  }, [favouriteLabels]);

  const toggleFavouriteLabel = (label) => {
    setFavouriteLabels((prev) =>
      prev.includes(label)
        ? prev.filter((x) => x !== label)
        : [...prev, label],
    );
  };
  const topControls = (
    <>
      <p className="editor-shortcuts-hint">
        Shortcuts: <kbd className="editor-kbd">Ctrl/Cmd+K</kbd> command palette, <kbd className="editor-kbd">Ctrl/Cmd+S</kbd> save, <kbd className="editor-kbd">Ctrl/Cmd+F</kbd> search, <kbd className="editor-kbd">M</kbd> menu, <kbd className="editor-kbd">/</kbd> focus search.
      </p>
      <div className="editor-top-quick-actions">
        {warningsRows.length ? (
          <button
            type="button"
            className="editor-warning-badge"
            onClick={() => scrollToSidebarPanel("editor-warnings-card")}
            title="Jump to validation warnings"
          >
            Warnings: {warningsRows.length}
          </button>
        ) : null}
        <span className="editor-shortcuts-inline-hint">
          Press <kbd className="editor-kbd">?</kbd> for shortcuts
        </span>
      </div>
      <SidebarAccordionToggle />
      <label className="editor-sidebar-pref-row">
        <input
          type="checkbox"
          className="editor-sidebar-pref-row__input"
          checked={favouritesFirst}
          onChange={(e) => {
            const next = e.target.checked;
            setFavouritesFirst(next);
            try {
              window.localStorage.setItem(
                SIDEBAR_FAVOURITES_FIRST_STORAGE_KEY,
                String(next),
              );
            } catch {
              /* ignore */
            }
          }}
        />
        <span className="editor-sidebar-pref-row__label">
          Show favourites first
        </span>
      </label>
      <ParticleEffectsSelectControl
        defaultConfig={defaultConfig}
        fullConfig={fullConfig}
        handlePredefinedEffectChange={handlePredefinedEffectChange}
      />
      {warningsCard}
    </>
  );
  if (EffectPanel) {
    return (
      <SidebarBehaviourAccordionProvider>
        <div
          ref={sidebarRef}
          className={sidebarClass}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {resizeHandle}
          {closeButton}
          {topControls}
          <LoadAndSaveProperties defaultConfig={defaultConfig} isDirty={isDirty} />
          <GeneralProperties
            defaultConfig={defaultConfig}
            fullConfig={fullConfig}
            accordionPanelId={GENERAL_PROPERTIES_PANEL_ID}
          />
          <EffectPanel
            defaultConfig={defaultConfig}
            accordionPanelId={
              PARTICLE_EFFECT_ACCORDION_PANEL_IDS[defaultConfig.particlePredefinedEffect]
            }
          />
        </div>
      </SidebarBehaviourAccordionProvider>
    );
  }

  return (
    <SidebarBehaviourAccordionProvider>
      <div
        ref={sidebarRef}
        className={sidebarClass}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {resizeHandle}
        {closeButton}
        {topControls}
        <LoadAndSaveProperties defaultConfig={defaultConfig} isDirty={isDirty} />
        {!hideParticleBehaviourSidebar ? (
          <ActiveBehavioursSummary defaultConfig={defaultConfig} />
        ) : null}
      {/** When adding sidebar sections, sync `SIDEBAR_SECTION_LABELS` in `@utils/behaviourSummary`. */}
      {!hideParticleBehaviourSidebar
        ? orderedDynamicSections.map((item) => {
          return (
            <LazyMenuSection
              key={item.label}
              item={item}
              defaultConfig={defaultConfig}
              fullConfig={fullConfig}
              customBehaviourEntries={customBehaviourEntries}
              favouriteSet={favouriteSet}
              toggleFavouriteLabel={toggleFavouriteLabel}
              sidebarRootRef={sidebarRef}
            />
          );
        })
        : null}
      </div>
    </SidebarBehaviourAccordionProvider>
  );
};

export default Menu;
