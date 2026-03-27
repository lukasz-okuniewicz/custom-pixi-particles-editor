"use client";

import { useBehaviourSectionCollapse } from "@context/SidebarBehaviourAccordionContext";

import { BfInputNumber, BfCheckbox } from "@components/properties/BehaviourFieldWrappers";
import { useCallback, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import { propertyHint } from "@components/properties/behaviourPropertyHints";
import FlowFieldDriftDescription from "@components/html/behaviourDescriptions/FlowFieldDrift";

export default function FlowFieldDriftProperties({ defaultConfig, index, accordionPanelId }) {
  const { isSubmenuVisible, toggleSubmenuVisibility } = useBehaviourSectionCollapse(accordionPanelId);
    if (index === -1) {
    index = (defaultConfig.emitterConfig?.behaviours?.push({}) || 1) - 1;
  }
  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = { name: "FlowFieldDriftBehaviour", enabled: false, priority: 35, fieldScale: 0.008, fieldStrength: 120, curlAmount: 0.35, timeScale: 0.45 };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);
  const updateBehaviours = () => {
    defaultConfig.emitterConfig.behaviours[index] = behaviour;
    updateProps("emitterConfig.behaviours", defaultConfig.emitterConfig.behaviours);
  };
  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;
  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>Flow Field Drift Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        <FlowFieldDriftDescription />
        <BfCheckbox label="Enabled" id="flowField-enabled" tooltipText={propertyHint("flowField-enabled")} onChange={(v) => { behaviour.enabled = v; updateBehaviours(); }} checked={behaviour.enabled ?? keysToInitialize.enabled} />
        <BfInputNumber label="Priority" id="flowField-priority" tooltipText={propertyHint("flowField-priority")} value={behaviour.priority ?? keysToInitialize.priority} step="10" onChange={(v) => { behaviour.priority = v; updateBehaviours(); }} />
        <BfInputNumber label="Field Scale" id="flowField-fieldScale" tooltipText={propertyHint("flowField-fieldScale")} value={behaviour.fieldScale ?? keysToInitialize.fieldScale} step="0.001" onChange={(v) => { behaviour.fieldScale = v; updateBehaviours(); }} />
        <BfInputNumber label="Field Strength" id="flowField-fieldStrength" tooltipText={propertyHint("flowField-fieldStrength")} value={behaviour.fieldStrength ?? keysToInitialize.fieldStrength} step="1" onChange={(v) => { behaviour.fieldStrength = v; updateBehaviours(); }} />
        <BfInputNumber label="Curl Amount" id="flowField-curlAmount" tooltipText={propertyHint("flowField-curlAmount")} value={behaviour.curlAmount ?? keysToInitialize.curlAmount} step="0.01" onChange={(v) => { behaviour.curlAmount = v; updateBehaviours(); }} />
        <BfInputNumber label="Time Scale" id="flowField-timeScale" tooltipText={propertyHint("flowField-timeScale")} value={behaviour.timeScale ?? keysToInitialize.timeScale} step="0.01" onChange={(v) => { behaviour.timeScale = v; updateBehaviours(); }} />
      </div>
    </>
  );
}
