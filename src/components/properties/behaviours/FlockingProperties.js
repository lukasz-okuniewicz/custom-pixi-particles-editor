"use client";

import { useBehaviourSectionCollapse } from "@context/SidebarBehaviourAccordionContext";

import { BfInputNumber, BfCheckbox } from "@components/properties/BehaviourFieldWrappers";
import { useCallback, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import { propertyHint } from "@components/properties/behaviourPropertyHints";
import FlockingDescription from "@components/html/behaviourDescriptions/Flocking";

export default function FlockingProperties({ defaultConfig, index, accordionPanelId }) {
  const { isSubmenuVisible, toggleSubmenuVisibility } = useBehaviourSectionCollapse(accordionPanelId);
    if (index === -1) {
    index = (defaultConfig.emitterConfig?.behaviours?.push({}) || 1) - 1;
  }
  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "FlockingBehaviour",
    enabled: false,
    priority: 250,
    separationRadius: 34,
    separationStrength: 1.4,
    alignmentRadius: 56,
    alignmentStrength: 0.9,
    cohesionRadius: 84,
    cohesionStrength: 0.55,
    maxSpeed: 320,
    maxSteerForce: 520,
  };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);
  const updateBehaviours = () => {
    defaultConfig.emitterConfig.behaviours[index] = behaviour;
    updateProps("emitterConfig.behaviours", defaultConfig.emitterConfig.behaviours);
  };
  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;
  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>Flocking Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        <FlockingDescription />
        <BfCheckbox label="Enabled" id="flocking-enabled" tooltipText={propertyHint("flocking-enabled")} onChange={(v) => { behaviour.enabled = v; updateBehaviours(); }} checked={behaviour.enabled ?? keysToInitialize.enabled} />
        <BfInputNumber label="Priority" id="flocking-priority" tooltipText={propertyHint("flocking-priority")} value={behaviour.priority ?? keysToInitialize.priority} step="10" onChange={(v) => { behaviour.priority = v; updateBehaviours(); }} />
        <BfInputNumber label="Separation Radius" id="flocking-separationRadius" tooltipText={propertyHint("flocking-separationRadius")} value={behaviour.separationRadius ?? keysToInitialize.separationRadius} step="1" onChange={(v) => { behaviour.separationRadius = v; updateBehaviours(); }} />
        <BfInputNumber label="Separation Strength" id="flocking-separationStrength" tooltipText={propertyHint("flocking-separationStrength")} value={behaviour.separationStrength ?? keysToInitialize.separationStrength} step="0.1" onChange={(v) => { behaviour.separationStrength = v; updateBehaviours(); }} />
        <BfInputNumber label="Alignment Radius" id="flocking-alignmentRadius" tooltipText={propertyHint("flocking-alignmentRadius")} value={behaviour.alignmentRadius ?? keysToInitialize.alignmentRadius} step="1" onChange={(v) => { behaviour.alignmentRadius = v; updateBehaviours(); }} />
        <BfInputNumber label="Alignment Strength" id="flocking-alignmentStrength" tooltipText={propertyHint("flocking-alignmentStrength")} value={behaviour.alignmentStrength ?? keysToInitialize.alignmentStrength} step="0.1" onChange={(v) => { behaviour.alignmentStrength = v; updateBehaviours(); }} />
        <BfInputNumber label="Cohesion Radius" id="flocking-cohesionRadius" tooltipText={propertyHint("flocking-cohesionRadius")} value={behaviour.cohesionRadius ?? keysToInitialize.cohesionRadius} step="1" onChange={(v) => { behaviour.cohesionRadius = v; updateBehaviours(); }} />
        <BfInputNumber label="Cohesion Strength" id="flocking-cohesionStrength" tooltipText={propertyHint("flocking-cohesionStrength")} value={behaviour.cohesionStrength ?? keysToInitialize.cohesionStrength} step="0.1" onChange={(v) => { behaviour.cohesionStrength = v; updateBehaviours(); }} />
        <BfInputNumber label="Max Speed" id="flocking-maxSpeed" tooltipText={propertyHint("flocking-maxSpeed")} value={behaviour.maxSpeed ?? keysToInitialize.maxSpeed} step="10" onChange={(v) => { behaviour.maxSpeed = v; updateBehaviours(); }} />
        <BfInputNumber label="Max Steer Force" id="flocking-maxSteerForce" tooltipText={propertyHint("flocking-maxSteerForce")} value={behaviour.maxSteerForce ?? keysToInitialize.maxSteerForce} step="10" onChange={(v) => { behaviour.maxSteerForce = v; updateBehaviours(); }} />
      </div>
    </>
  );
}
