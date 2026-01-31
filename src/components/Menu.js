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

const sidebarBaseClass =
  "editor-sidebar fixed right-0 top-0 bottom-0 overflow-y-auto overflow-x-hidden block p-5 z-20 bg-[#181a1b] border-l border-l-[rgba(140,130,115,0.5)]";

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
        <PixelSortEffectProperties defaultConfig={defaultConfig} />
      </div>
    )

  if (defaultConfig.particlePredefinedEffect === "prismRefractionEffect")
    return (
      <div className={sidebarClass} onClick={(e) => { e.stopPropagation(); }}>
        {closeButton}
        <LoadAndSaveProperties defaultConfig={defaultConfig} />
        <GeneralProperties defaultConfig={defaultConfig} fullConfig={fullConfig} handlePredefinedEffectChange={handlePredefinedEffectChange} />
        <PrismRefractionEffectProperties defaultConfig={defaultConfig} />
      </div>
    )

  if (defaultConfig.particlePredefinedEffect === "crystallizeEffect")
    return (
      <div className={sidebarClass} onClick={(e) => { e.stopPropagation(); }}>
        {closeButton}
        <LoadAndSaveProperties defaultConfig={defaultConfig} />
        <GeneralProperties defaultConfig={defaultConfig} fullConfig={fullConfig} handlePredefinedEffectChange={handlePredefinedEffectChange} />
        <CrystallizeEffectProperties defaultConfig={defaultConfig} />
      </div>
    )

  if (defaultConfig.particlePredefinedEffect === "slitScanEffect")
    return (
      <div className={sidebarClass} onClick={(e) => { e.stopPropagation(); }}>
        {closeButton}
        <LoadAndSaveProperties defaultConfig={defaultConfig} />
        <GeneralProperties defaultConfig={defaultConfig} fullConfig={fullConfig} handlePredefinedEffectChange={handlePredefinedEffectChange} />
        <SlitScanEffectProperties defaultConfig={defaultConfig} />
      </div>
    )

  if (defaultConfig.particlePredefinedEffect === "granularErosionEffect")
    return (
      <div className={sidebarClass} onClick={(e) => { e.stopPropagation(); }}>
        {closeButton}
        <LoadAndSaveProperties defaultConfig={defaultConfig} />
        <GeneralProperties defaultConfig={defaultConfig} fullConfig={fullConfig} handlePredefinedEffectChange={handlePredefinedEffectChange} />
        <GranularErosionEffectProperties defaultConfig={defaultConfig} />
      </div>
    )

  if (defaultConfig.particlePredefinedEffect === "liquidMercuryEffect")
    return (
      <div className={sidebarClass} onClick={(e) => { e.stopPropagation(); }}>
        {closeButton}
        <LoadAndSaveProperties defaultConfig={defaultConfig} />
        <GeneralProperties defaultConfig={defaultConfig} fullConfig={fullConfig} handlePredefinedEffectChange={handlePredefinedEffectChange} />
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
      {[
        { label: "Aizawa Attractor", Component: AizawaAttractorProperties, getIndex: () => getConfigIndexByName("AizawaAttractorBehaviour", defaultConfig) },
        { label: "Angular Velocity", Component: AngularVelocityProperties, getIndex: () => getConfigIndexByName("AngularVelocityBehaviour", defaultConfig) },
        { label: "Jacobian Curl-Field", Component: JacobianCurlFieldProperties, getIndex: () => getConfigIndexByName("JacobianCurlFieldBehaviour", defaultConfig) },
        { label: "Lissajous Harmonic Lattice", Component: LissajousHarmonicLatticeProperties, getIndex: () => getConfigIndexByName("LissajousHarmonicLatticeBehaviour", defaultConfig) },
        { label: "Attraction Repulsion", Component: AttractionRepulsionProperties, getIndex: () => getConfigIndexByName("AttractionRepulsionBehaviour", defaultConfig) },
        { label: "Boids Flocking", Component: BoidsFlockingProperties, getIndex: () => getConfigIndexByName("BoidsFlockingBehaviour", defaultConfig) },
        { label: "Bounce", Component: BounceProperties, getIndex: () => getConfigIndexByName("BounceBehaviour", defaultConfig) },
        { label: "Collision", Component: CollisionProperties, getIndex: () => getConfigIndexByName("CollisionBehaviour", defaultConfig) },
        { label: "Color", Component: ColorProperties, getIndex: () => getConfigIndexByName("ColorBehaviour", defaultConfig) },
        { label: "Color Cycle", Component: ColorCycleProperties, getIndex: () => getConfigIndexByName("ColorCycleBehaviour", defaultConfig) },
        { label: "Constrain To Shape", Component: ConstrainToShapeProperties, getIndex: () => getConfigIndexByName("ConstrainToShapeBehaviour", defaultConfig) },
        { label: "Custom Behaviour", Component: CustomBehaviourProperties, customBehaviours: true },
        { label: "Emit Direction", Component: EmitDirectionProperties, getIndex: () => getConfigIndexByName("EmitDirectionBehaviour", defaultConfig) },
        { label: "Emission Type", Component: EmissionTypeProperties },
        { label: "Flicker", Component: FlickerProperties, getIndex: () => getConfigIndexByName("FlickerBehaviour", defaultConfig) },
        { label: "Float Up", Component: FloatUpProperties, getIndex: () => getConfigIndexByName("FloatUpBehaviour", defaultConfig) },
        { label: "Force Fields", Component: ForceFieldsProperties, getIndex: () => getConfigIndexByName("ForceFieldsBehaviour", defaultConfig) },
        { label: "Gravity Well", Component: GravityWellProperties, getIndex: () => getConfigIndexByName("GravityWellBehaviour", defaultConfig) },
        { label: "Grouping", Component: GroupingProperties, getIndex: () => getConfigIndexByName("GroupingBehaviour", defaultConfig) },
        { label: "Homing", Component: HomingProperties, getIndex: () => getConfigIndexByName("HomingBehaviour", defaultConfig) },
        { label: "Life", Component: LifeProperties, getIndex: () => getConfigIndexByName("LifeBehaviour", defaultConfig) },
        { label: "Light Effect", Component: LightEffectProperties, getIndex: () => getConfigIndexByName("LightEffectBehaviour", defaultConfig) },
        { label: "Magnet", Component: MagnetProperties, getIndex: () => getConfigIndexByName("MagnetBehaviour", defaultConfig) },
        { label: "Move To Point", Component: MoveToPointProperties, getIndex: () => getConfigIndexByName("MoveToPointBehaviour", defaultConfig) },
        { label: "Noise Based Motion", Component: NoiseBasedMotionProperties, getIndex: () => getConfigIndexByName("NoiseBasedMotionBehaviour", defaultConfig) },
        { label: "Orbit", Component: OrbitProperties, getIndex: () => getConfigIndexByName("OrbitBehaviour", defaultConfig) },
        { label: "Particles List", Component: ParticlesList },
        { label: "Phase Field Flow", Component: PhaseFieldFlowProperties, getIndex: () => getConfigIndexByName("PhaseFieldFlowBehaviour", defaultConfig) },
        { label: "Phase Coherence", Component: PhaseCoherenceProperties, getIndex: () => getConfigIndexByName("PhaseCoherenceBehaviour", defaultConfig) },
        { label: "Curvature Flow", Component: CurvatureFlowProperties, getIndex: () => getConfigIndexByName("CurvatureFlowBehaviour", defaultConfig) },
        { label: "Limit Cycle", Component: LimitCycleProperties, getIndex: () => getConfigIndexByName("LimitCycleBehaviour", defaultConfig) },
        { label: "Position", Component: PositionProperties, getIndex: () => getConfigIndexByName("PositionBehaviour", defaultConfig) },
        { label: "Conversion Cascade", Component: ConversionCascadeProperties, getIndex: () => getConfigIndexByName("ConversionCascadeBehaviour", defaultConfig) },
        { label: "Near Miss Dispersion", Component: NearMissDispersionProperties, getIndex: () => getConfigIndexByName("NearMissDispersionBehaviour", defaultConfig) },
        { label: "Proximity State", Component: ProximityStateProperties, getIndex: () => getConfigIndexByName("ProximityStateBehaviour", defaultConfig) },
        { label: "Proximity Triggered Phase", Component: ProximityTriggeredPhaseProperties, getIndex: () => getConfigIndexByName("ProximityTriggeredPhaseBehaviour", defaultConfig) },
        { label: "Pulse", Component: PulseProperties, getIndex: () => getConfigIndexByName("PulseBehaviour", defaultConfig) },
        { label: "Ripple", Component: RippleProperties, getIndex: () => getConfigIndexByName("RippleBehaviour", defaultConfig) },
        { label: "Rotation", Component: RotationProperties, getIndex: () => getConfigIndexByName("RotationBehaviour", defaultConfig) },
        { label: "Size", Component: SizeProperties, getIndex: () => getConfigIndexByName("SizeBehaviour", defaultConfig) },
        { label: "Sound Reactive", Component: SoundReactiveProperties, getIndex: () => getConfigIndexByName("SoundReactiveBehaviour", defaultConfig) },
        { label: "Spawn", Component: SpawnProperties, getIndex: () => getConfigIndexByName("SpawnBehaviour", defaultConfig) },
        { label: "Stretch", Component: StretchProperties, getIndex: () => getConfigIndexByName("StretchBehaviour", defaultConfig) },
        { label: "Temperature", Component: TemperatureProperties, getIndex: () => getConfigIndexByName("TemperatureBehaviour", defaultConfig) },
        { label: "Timeline", Component: TimelineProperties, getIndex: () => getConfigIndexByName("TimelineBehaviour", defaultConfig) },
        { label: "Toroidal Flow", Component: ToroidalFlowProperties, getIndex: () => getConfigIndexByName("ToroidalFlowBehaviour", defaultConfig) },
        { label: "Trail", Component: TrailProperties, getIndex: () => getConfigIndexByName("TrailBehaviour", defaultConfig) },
        { label: "Turbulence", Component: TurbulenceProperties, getIndex: () => getConfigIndexByName("TurbulenceBehaviour", defaultConfig) },
        { label: "Vortex", Component: VortexProperties, getIndex: () => getConfigIndexByName("VortexBehaviour", defaultConfig) },
        { label: "Wireframe 3D", Component: Wireframe3DProperties, getIndex: () => getConfigIndexByName("Wireframe3DBehaviour", defaultConfig) },
        { label: "Wobble", Component: WobbleProperties, getIndex: () => getConfigIndexByName("WobbleBehaviour", defaultConfig) },
      ]
        .sort((a, b) => a.label.localeCompare(b.label))
        .map(({ label, Component, getIndex, customBehaviours }) =>
          customBehaviours ? (
            <Component
              key={label}
              defaultConfig={defaultConfig}
              customBehaviours={getCustomBehaviourEntries(defaultConfig)}
            />
          ) : Component === EmissionTypeProperties ? (
            <Component key={label} defaultConfig={defaultConfig} />
          ) : Component === ParticlesList ? (
            <Component key={label} defaultConfig={defaultConfig} />
          ) : (
            <Component
              key={label}
              defaultConfig={defaultConfig}
              index={getIndex()}
            />
          )
        )}
    </div>
  );
};

export default Menu;
