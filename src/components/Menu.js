"use client";

import LoadAndSaveProperties from "@components/properties/LoadAndSaveProperties";
import GeneralProperties from "@components/properties/GeneralProperties";
import EmissionTypeProperties from "@components/properties/EmissionTypeProperties";
import LifeProperties from "@components/properties/behaviours/LifeProperties";
import SizeProperties from "@components/properties/behaviours/SizeProperties";
import RotationProperties from "@components/properties/behaviours/RotationProperties";
import PositionProperties from "@components/properties/behaviours/PositionProperties";
import CollisionProperties from "@components/properties/behaviours/CollisionProperties";
import ColorProperties from "@components/properties/behaviours/ColorProperties";
import AngularVelocityProperties from "@components/properties/behaviours/AngularVelocityProperties";
import EmitDirectionProperties from "@components/properties/behaviours/EmitDirectionProperties";
import TurbulenceProperties from "@components/properties/behaviours/TurbulenceProperties";
import { getConfigIndexByName, getCustomBehaviourEntries } from "@utils";
import React from "react";
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
import FormPatternProperties from "@components/properties/behaviours/FormPatternProperties";
import Wireframe3DProperties from "@components/properties/behaviours/Wireframe3DProperties";
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
import MetaballPassProperties from "@components/properties/MetaballPassProperties";
import ParticleLinksProperties from "@components/properties/ParticleLinksProperties";
import ActiveBehavioursSummary from "@components/ActiveBehavioursSummary";
import {
  getEffectiveBehaviourEnabled,
  menuLabelToPanelId,
} from "@utils/behaviourSummary";

const sidebarBaseClass =
  "editor-sidebar fixed right-0 top-0 bottom-0 overflow-y-auto overflow-x-hidden block p-5 z-20 bg-[#181a1b] border-l border-l-[rgba(140,130,115,0.5)]";

function isBehaviourSectionHighlighted(defaultConfig, item) {
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

const Menu = ({
  defaultConfig,
  fullConfig,
  handlePredefinedEffectChange,
  isMobileMenuOpen = false,
  onCloseMenu,
}) => {
  const sidebarClass = `${sidebarBaseClass}${isMobileMenuOpen ? " editor-sidebar--open" : ""}`;
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

  if (defaultConfig.particlePredefinedEffect === "shatterEffect")
    return (
      <div
        className={sidebarClass}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {closeButton}
        <LoadAndSaveProperties defaultConfig={defaultConfig} />
      <GeneralProperties
        defaultConfig={defaultConfig}
        fullConfig={fullConfig}
        handlePredefinedEffectChange={handlePredefinedEffectChange}
      />
      <ParticleLinksProperties defaultConfig={defaultConfig} />
      <ShatterEffectProperties defaultConfig={defaultConfig} />
    </div>
  )

  if (defaultConfig.particlePredefinedEffect === "dissolveEffect")
    return (
      <div
        className={sidebarClass}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {closeButton}
        <LoadAndSaveProperties defaultConfig={defaultConfig} />
        <GeneralProperties
        defaultConfig={defaultConfig}
        fullConfig={fullConfig}
        handlePredefinedEffectChange={handlePredefinedEffectChange}
      />
      <ParticleLinksProperties defaultConfig={defaultConfig} />
      <DissolveEffectProperties defaultConfig={defaultConfig} />
    </div>
  )

  if (defaultConfig.particlePredefinedEffect === "magneticAssemblyEffect")
    return (
      <div
        className={sidebarClass}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {closeButton}
        <LoadAndSaveProperties defaultConfig={defaultConfig} />
        <GeneralProperties
        defaultConfig={defaultConfig}
        fullConfig={fullConfig}
        handlePredefinedEffectChange={handlePredefinedEffectChange}
      />
      <ParticleLinksProperties defaultConfig={defaultConfig} />
      <MagneticAssemblyEffectProperties defaultConfig={defaultConfig} />
    </div>
  )

  if (defaultConfig.particlePredefinedEffect === "ghostEffect")
    return (
      <div
        className={sidebarClass}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {closeButton}
        <LoadAndSaveProperties defaultConfig={defaultConfig} />
        <GeneralProperties
        defaultConfig={defaultConfig}
        fullConfig={fullConfig}
        handlePredefinedEffectChange={handlePredefinedEffectChange}
      />
      <ParticleLinksProperties defaultConfig={defaultConfig} />
      <GhostEffectProperties defaultConfig={defaultConfig} />
    </div>
  )

  if (defaultConfig.particlePredefinedEffect === "glitchEffect")
    return (
      <div
        className={sidebarClass}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {closeButton}
        <LoadAndSaveProperties defaultConfig={defaultConfig} />
        <GeneralProperties
        defaultConfig={defaultConfig}
        fullConfig={fullConfig}
        handlePredefinedEffectChange={handlePredefinedEffectChange}
      />
      <ParticleLinksProperties defaultConfig={defaultConfig} />
      <GlitchEffectProperties defaultConfig={defaultConfig} />
    </div>
  )

  if (defaultConfig.particlePredefinedEffect === "meltEffect")
    return (
      <div
        className={sidebarClass}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {closeButton}
        <LoadAndSaveProperties defaultConfig={defaultConfig} />
        <GeneralProperties
        defaultConfig={defaultConfig}
        fullConfig={fullConfig}
        handlePredefinedEffectChange={handlePredefinedEffectChange}
      />
      <ParticleLinksProperties defaultConfig={defaultConfig} />
      <MeltEffectProperties defaultConfig={defaultConfig} />
    </div>
  )

  if (defaultConfig.particlePredefinedEffect === "pixelSortEffect")
    return (
      <div
        className={sidebarClass}
        onClick={(e) => { e.stopPropagation(); }}
      >
        {closeButton}
        <LoadAndSaveProperties defaultConfig={defaultConfig} />
        <GeneralProperties defaultConfig={defaultConfig} fullConfig={fullConfig} handlePredefinedEffectChange={handlePredefinedEffectChange} />
        <ParticleLinksProperties defaultConfig={defaultConfig} />
        <PixelSortEffectProperties defaultConfig={defaultConfig} />
      </div>
    )

  if (defaultConfig.particlePredefinedEffect === "prismRefractionEffect")
    return (
      <div className={sidebarClass} onClick={(e) => { e.stopPropagation(); }}>
        {closeButton}
        <LoadAndSaveProperties defaultConfig={defaultConfig} />
        <GeneralProperties defaultConfig={defaultConfig} fullConfig={fullConfig} handlePredefinedEffectChange={handlePredefinedEffectChange} />
        <ParticleLinksProperties defaultConfig={defaultConfig} />
        <PrismRefractionEffectProperties defaultConfig={defaultConfig} />
      </div>
    )

  if (defaultConfig.particlePredefinedEffect === "crystallizeEffect")
    return (
      <div className={sidebarClass} onClick={(e) => { e.stopPropagation(); }}>
        {closeButton}
        <LoadAndSaveProperties defaultConfig={defaultConfig} />
        <GeneralProperties defaultConfig={defaultConfig} fullConfig={fullConfig} handlePredefinedEffectChange={handlePredefinedEffectChange} />
        <ParticleLinksProperties defaultConfig={defaultConfig} />
        <CrystallizeEffectProperties defaultConfig={defaultConfig} />
      </div>
    )

  if (defaultConfig.particlePredefinedEffect === "slitScanEffect")
    return (
      <div className={sidebarClass} onClick={(e) => { e.stopPropagation(); }}>
        {closeButton}
        <LoadAndSaveProperties defaultConfig={defaultConfig} />
        <GeneralProperties defaultConfig={defaultConfig} fullConfig={fullConfig} handlePredefinedEffectChange={handlePredefinedEffectChange} />
        <ParticleLinksProperties defaultConfig={defaultConfig} />
        <SlitScanEffectProperties defaultConfig={defaultConfig} />
      </div>
    )

  if (defaultConfig.particlePredefinedEffect === "granularErosionEffect")
    return (
      <div className={sidebarClass} onClick={(e) => { e.stopPropagation(); }}>
        {closeButton}
        <LoadAndSaveProperties defaultConfig={defaultConfig} />
        <GeneralProperties defaultConfig={defaultConfig} fullConfig={fullConfig} handlePredefinedEffectChange={handlePredefinedEffectChange} />
        <ParticleLinksProperties defaultConfig={defaultConfig} />
        <GranularErosionEffectProperties defaultConfig={defaultConfig} />
      </div>
    )

  if (defaultConfig.particlePredefinedEffect === "liquidMercuryEffect")
    return (
      <div className={sidebarClass} onClick={(e) => { e.stopPropagation(); }}>
        {closeButton}
        <LoadAndSaveProperties defaultConfig={defaultConfig} />
        <GeneralProperties defaultConfig={defaultConfig} fullConfig={fullConfig} handlePredefinedEffectChange={handlePredefinedEffectChange} />
        <ParticleLinksProperties defaultConfig={defaultConfig} />
        <LiquidMercuryEffectProperties defaultConfig={defaultConfig} />
      </div>
    )

  return (
    <div
      className={sidebarClass}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {closeButton}
      <LoadAndSaveProperties defaultConfig={defaultConfig} />
      <GeneralProperties
        defaultConfig={defaultConfig}
        fullConfig={fullConfig}
        handlePredefinedEffectChange={handlePredefinedEffectChange}
      />
      <ActiveBehavioursSummary defaultConfig={defaultConfig} />
      {[
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
        { label: "Float Up", Component: FloatUpProperties, behaviourName: "FloatUpBehaviour", getIndex: () => getConfigIndexByName("FloatUpBehaviour", defaultConfig) },
        { label: "Force Fields", Component: ForceFieldsProperties, behaviourName: "ForceFieldsBehaviour", getIndex: () => getConfigIndexByName("ForceFieldsBehaviour", defaultConfig) },
        { label: "Gravity Well", Component: GravityWellProperties, behaviourName: "GravityWellBehaviour", getIndex: () => getConfigIndexByName("GravityWellBehaviour", defaultConfig) },
        { label: "Grouping", Component: GroupingProperties, behaviourName: "GroupingBehaviour", getIndex: () => getConfigIndexByName("GroupingBehaviour", defaultConfig) },
        { label: "Homing", Component: HomingProperties, behaviourName: "HomingBehaviour", getIndex: () => getConfigIndexByName("HomingBehaviour", defaultConfig) },
        { label: "Life", Component: LifeProperties, behaviourName: "LifeBehaviour", getIndex: () => getConfigIndexByName("LifeBehaviour", defaultConfig) },
        { label: "Light Effect", Component: LightEffectProperties, behaviourName: "LightEffectBehaviour", getIndex: () => getConfigIndexByName("LightEffectBehaviour", defaultConfig) },
        { label: "Magnet", Component: MagnetProperties, behaviourName: "MagnetBehaviour", getIndex: () => getConfigIndexByName("MagnetBehaviour", defaultConfig) },
        {
          label: "Metaball Pass",
          Component: MetaballPassProperties,
          metaball: true,
        },
        { label: "Move To Point", Component: MoveToPointProperties, behaviourName: "MoveToPointBehaviour", getIndex: () => getConfigIndexByName("MoveToPointBehaviour", defaultConfig) },
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
        { label: "Conversion Cascade", Component: ConversionCascadeProperties, behaviourName: "ConversionCascadeBehaviour", getIndex: () => getConfigIndexByName("ConversionCascadeBehaviour", defaultConfig) },
        { label: "Near Miss Dispersion", Component: NearMissDispersionProperties, behaviourName: "NearMissDispersionBehaviour", getIndex: () => getConfigIndexByName("NearMissDispersionBehaviour", defaultConfig) },
        { label: "Proximity State", Component: ProximityStateProperties, behaviourName: "ProximityStateBehaviour", getIndex: () => getConfigIndexByName("ProximityStateBehaviour", defaultConfig) },
        { label: "Proximity Triggered Phase", Component: ProximityTriggeredPhaseProperties, behaviourName: "ProximityTriggeredPhaseBehaviour", getIndex: () => getConfigIndexByName("ProximityTriggeredPhaseBehaviour", defaultConfig) },
        { label: "Pulse", Component: PulseProperties, behaviourName: "PulseBehaviour", getIndex: () => getConfigIndexByName("PulseBehaviour", defaultConfig) },
        { label: "Ripple", Component: RippleProperties, behaviourName: "RippleBehaviour", getIndex: () => getConfigIndexByName("RippleBehaviour", defaultConfig) },
        { label: "RVO Avoidance", Component: RVOAvoidanceProperties, behaviourName: "RVOAvoidanceBehaviour", getIndex: () => getConfigIndexByName("RVOAvoidanceBehaviour", defaultConfig) },
        { label: "Rotation", Component: RotationProperties, behaviourName: "RotationBehaviour", getIndex: () => getConfigIndexByName("RotationBehaviour", defaultConfig) },
        { label: "Size", Component: SizeProperties, behaviourName: "SizeBehaviour", getIndex: () => getConfigIndexByName("SizeBehaviour", defaultConfig) },
        { label: "Screen Space Flow Map", Component: ScreenSpaceFlowMapProperties, behaviourName: "ScreenSpaceFlowMapBehaviour", getIndex: () => getConfigIndexByName("ScreenSpaceFlowMapBehaviour", defaultConfig) },
        { label: "Shear Flow", Component: ShearFlowProperties, behaviourName: "ShearFlowBehaviour", getIndex: () => getConfigIndexByName("ShearFlowBehaviour", defaultConfig) },
        { label: "Sound Reactive", Component: SoundReactiveProperties, behaviourName: "SoundReactiveBehaviour", getIndex: () => getConfigIndexByName("SoundReactiveBehaviour", defaultConfig) },
        { label: "Spawn", Component: SpawnProperties, behaviourName: "SpawnBehaviour", getIndex: () => getConfigIndexByName("SpawnBehaviour", defaultConfig) },
        { label: "Stretch", Component: StretchProperties, behaviourName: "StretchBehaviour", getIndex: () => getConfigIndexByName("StretchBehaviour", defaultConfig) },
        { label: "Temperature", Component: TemperatureProperties, behaviourName: "TemperatureBehaviour", getIndex: () => getConfigIndexByName("TemperatureBehaviour", defaultConfig) },
        { label: "Timeline", Component: TimelineProperties, behaviourName: "TimelineBehaviour", getIndex: () => getConfigIndexByName("TimelineBehaviour", defaultConfig) },
        { label: "Toroidal Flow", Component: ToroidalFlowProperties, behaviourName: "ToroidalFlowBehaviour", getIndex: () => getConfigIndexByName("ToroidalFlowBehaviour", defaultConfig) },
        { label: "Trail", Component: TrailProperties, behaviourName: "TrailBehaviour", getIndex: () => getConfigIndexByName("TrailBehaviour", defaultConfig) },
        { label: "Turbulence", Component: TurbulenceProperties, behaviourName: "TurbulenceBehaviour", getIndex: () => getConfigIndexByName("TurbulenceBehaviour", defaultConfig) },
        { label: "Vortex", Component: VortexProperties, behaviourName: "VortexBehaviour", getIndex: () => getConfigIndexByName("VortexBehaviour", defaultConfig) },
        { label: "Wireframe 3D", Component: Wireframe3DProperties, behaviourName: "Wireframe3DBehaviour", getIndex: () => getConfigIndexByName("Wireframe3DBehaviour", defaultConfig) },
        { label: "Wobble", Component: WobbleProperties, behaviourName: "WobbleBehaviour", getIndex: () => getConfigIndexByName("WobbleBehaviour", defaultConfig) },
      ]
        .sort((a, b) => a.label.localeCompare(b.label))
        .map((item) => {
          const { label, Component, getIndex, customBehaviours, metaball } =
            item;
          const panelId = menuLabelToPanelId(label);
          const behaviourOn = isBehaviourSectionHighlighted(defaultConfig, item);
          const inner =
            customBehaviours ? (
              <Component
                defaultConfig={defaultConfig}
                customBehaviours={getCustomBehaviourEntries(defaultConfig)}
              />
            ) : Component === EmissionTypeProperties ||
              Component === ParticleLinksProperties ? (
              <Component defaultConfig={defaultConfig} />
            ) : Component === ParticlesList ? (
              <Component defaultConfig={defaultConfig} />
            ) : metaball ? (
              <Component defaultConfig={defaultConfig} />
            ) : (
              <Component
                defaultConfig={defaultConfig}
                index={getIndex()}
              />
            );
          return (
            <div
              key={label}
              id={panelId}
              className={
                behaviourOn
                  ? "editor-sidebar-section editor-sidebar-section--behaviour-on"
                  : "editor-sidebar-section"
              }
            >
              {inner}
            </div>
          );
        })}
    </div>
  );
};

export default Menu;
