"use client";

import { useBehaviourSectionCollapse } from "@context/SidebarBehaviourAccordionContext";

import { BfInputNumber, BfCheckbox } from "@components/properties/BehaviourFieldWrappers";
import { useCallback, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import { propertyHint } from "@components/properties/behaviourPropertyHints";
import TemperatureSimulationDescription from "@components/html/behaviourDescriptions/TemperatureSimulation";

export default function TemperatureSimulationProperties({ defaultConfig, index, accordionPanelId }) {
  const { isSubmenuVisible, toggleSubmenuVisibility } = useBehaviourSectionCollapse(accordionPanelId);
    if (index === -1) {
    index = (defaultConfig.emitterConfig?.behaviours?.push({}) || 1) - 1;
  }
  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = { name: "TemperatureSimulationBehaviour", enabled: false, priority: 0, baseTemperature: 1, coolingRate: 0.25, buoyancyStrength: 140 };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);
  const updateBehaviours = () => {
    defaultConfig.emitterConfig.behaviours[index] = behaviour;
    updateProps("emitterConfig.behaviours", defaultConfig.emitterConfig.behaviours);
  };
  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;
  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>Temperature Simulation Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        <TemperatureSimulationDescription />
        <BfCheckbox label="Enabled" id="tempSim-enabled" tooltipText={propertyHint("tempSim-enabled")} onChange={(v) => { behaviour.enabled = v; updateBehaviours(); }} checked={behaviour.enabled ?? keysToInitialize.enabled} />
        <BfInputNumber label="Priority" id="tempSim-priority" tooltipText={propertyHint("tempSim-priority")} value={behaviour.priority ?? keysToInitialize.priority} step="1" onChange={(v) => { behaviour.priority = v; updateBehaviours(); }} />
        <BfInputNumber label="Base Temperature" id="tempSim-baseTemperature" tooltipText={propertyHint("tempSim-baseTemperature")} value={behaviour.baseTemperature ?? keysToInitialize.baseTemperature} step="0.01" onChange={(v) => { behaviour.baseTemperature = v; updateBehaviours(); }} />
        <BfInputNumber label="Cooling Rate" id="tempSim-coolingRate" tooltipText={propertyHint("tempSim-coolingRate")} value={behaviour.coolingRate ?? keysToInitialize.coolingRate} step="0.01" onChange={(v) => { behaviour.coolingRate = v; updateBehaviours(); }} />
        <BfInputNumber label="Buoyancy Strength" id="tempSim-buoyancyStrength" tooltipText={propertyHint("tempSim-buoyancyStrength")} value={behaviour.buoyancyStrength ?? keysToInitialize.buoyancyStrength} step="1" onChange={(v) => { behaviour.buoyancyStrength = v; updateBehaviours(); }} />
      </div>
    </>
  );
}
