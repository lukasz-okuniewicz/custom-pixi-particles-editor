"use client";

import { useBehaviourSectionCollapse } from "@context/SidebarBehaviourAccordionContext";

import { BfInputNumber, BfCheckbox } from "@components/properties/BehaviourFieldWrappers";
import { useCallback, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import { propertyHint } from "@components/properties/behaviourPropertyHints";
import PredatorPreyDescription from "@components/html/behaviourDescriptions/PredatorPrey";

export default function PredatorPreyProperties({ defaultConfig, index, accordionPanelId }) {
  const { isSubmenuVisible, toggleSubmenuVisibility } = useBehaviourSectionCollapse(accordionPanelId);
    if (index === -1) {
    index = (defaultConfig.emitterConfig?.behaviours?.push({}) || 1) - 1;
  }
  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = { name: "PredatorPreyBehaviour", enabled: false, priority: 30, chaseStrength: 180, evadeStrength: 220, reactionRadius: 180, predatorRatio: 0.18 };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);
  const updateBehaviours = () => {
    defaultConfig.emitterConfig.behaviours[index] = behaviour;
    updateProps("emitterConfig.behaviours", defaultConfig.emitterConfig.behaviours);
  };
  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;
  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>Predator / Prey Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        <PredatorPreyDescription />
        <BfCheckbox label="Enabled" id="predatorPrey-enabled" tooltipText={propertyHint("predatorPrey-enabled")} onChange={(v) => { behaviour.enabled = v; updateBehaviours(); }} checked={behaviour.enabled ?? keysToInitialize.enabled} />
        <BfInputNumber label="Priority" id="predatorPrey-priority" tooltipText={propertyHint("predatorPrey-priority")} value={behaviour.priority ?? keysToInitialize.priority} step="1" onChange={(v) => { behaviour.priority = v; updateBehaviours(); }} />
        <BfInputNumber label="Chase Strength" id="predatorPrey-chaseStrength" tooltipText={propertyHint("predatorPrey-chaseStrength")} value={behaviour.chaseStrength ?? keysToInitialize.chaseStrength} step="1" onChange={(v) => { behaviour.chaseStrength = v; updateBehaviours(); }} />
        <BfInputNumber label="Evade Strength" id="predatorPrey-evadeStrength" tooltipText={propertyHint("predatorPrey-evadeStrength")} value={behaviour.evadeStrength ?? keysToInitialize.evadeStrength} step="1" onChange={(v) => { behaviour.evadeStrength = v; updateBehaviours(); }} />
        <BfInputNumber label="Reaction Radius" id="predatorPrey-reactionRadius" tooltipText={propertyHint("predatorPrey-reactionRadius")} value={behaviour.reactionRadius ?? keysToInitialize.reactionRadius} step="1" onChange={(v) => { behaviour.reactionRadius = v; updateBehaviours(); }} />
        <BfInputNumber label="Predator Ratio" id="predatorPrey-predatorRatio" tooltipText={propertyHint("predatorPrey-predatorRatio")} value={behaviour.predatorRatio ?? keysToInitialize.predatorRatio} step="0.01" min="0" max="1" onChange={(v) => { behaviour.predatorRatio = v; updateBehaviours(); }} />
      </div>
    </>
  );
}
