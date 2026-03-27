"use client";

import { useBehaviourSectionCollapse } from "@context/SidebarBehaviourAccordionContext";

import { BfInputNumber, BfCheckbox } from "@components/properties/BehaviourFieldWrappers";
import { useCallback, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import { propertyHint } from "@components/properties/behaviourPropertyHints";
import GlitchBehaviourDescription from "@components/html/behaviourDescriptions/GlitchBehaviour";

export default function GlitchBehaviourProperties({ defaultConfig, index, accordionPanelId }) {
  const { isSubmenuVisible, toggleSubmenuVisibility } = useBehaviourSectionCollapse(accordionPanelId);
    if (index === -1) {
    index = (defaultConfig.emitterConfig?.behaviours?.push({}) || 1) - 1;
  }
  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = { name: "GlitchBehaviour", enabled: false, priority: -18, jitterProbability: 0.08, teleportProbability: 0.006, jitterDistance: 6, teleportDistance: 90, chromaticShift: 24 };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);
  const updateBehaviours = () => {
    defaultConfig.emitterConfig.behaviours[index] = behaviour;
    updateProps("emitterConfig.behaviours", defaultConfig.emitterConfig.behaviours);
  };
  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;
  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>Glitch Behaviour Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        <GlitchBehaviourDescription />
        <BfCheckbox label="Enabled" id="glitchBh-enabled" tooltipText={propertyHint("glitchBh-enabled")} onChange={(v) => { behaviour.enabled = v; updateBehaviours(); }} checked={behaviour.enabled ?? keysToInitialize.enabled} />
        <BfInputNumber label="Priority" id="glitchBh-priority" tooltipText={propertyHint("glitchBh-priority")} value={behaviour.priority ?? keysToInitialize.priority} step="1" onChange={(v) => { behaviour.priority = v; updateBehaviours(); }} />
        <BfInputNumber label="Jitter Probability" id="glitchBh-jitterProbability" tooltipText={propertyHint("glitchBh-jitterProbability")} value={behaviour.jitterProbability ?? keysToInitialize.jitterProbability} step="0.001" min="0" max="1" onChange={(v) => { behaviour.jitterProbability = v; updateBehaviours(); }} />
        <BfInputNumber label="Teleport Probability" id="glitchBh-teleportProbability" tooltipText={propertyHint("glitchBh-teleportProbability")} value={behaviour.teleportProbability ?? keysToInitialize.teleportProbability} step="0.001" min="0" max="1" onChange={(v) => { behaviour.teleportProbability = v; updateBehaviours(); }} />
        <BfInputNumber label="Jitter Distance" id="glitchBh-jitterDistance" tooltipText={propertyHint("glitchBh-jitterDistance")} value={behaviour.jitterDistance ?? keysToInitialize.jitterDistance} step="1" onChange={(v) => { behaviour.jitterDistance = v; updateBehaviours(); }} />
        <BfInputNumber label="Teleport Distance" id="glitchBh-teleportDistance" tooltipText={propertyHint("glitchBh-teleportDistance")} value={behaviour.teleportDistance ?? keysToInitialize.teleportDistance} step="1" onChange={(v) => { behaviour.teleportDistance = v; updateBehaviours(); }} />
        <BfInputNumber label="Chromatic Shift" id="glitchBh-chromaticShift" tooltipText={propertyHint("glitchBh-chromaticShift")} value={behaviour.chromaticShift ?? keysToInitialize.chromaticShift} step="1" onChange={(v) => { behaviour.chromaticShift = v; updateBehaviours(); }} />
      </div>
    </>
  );
}
