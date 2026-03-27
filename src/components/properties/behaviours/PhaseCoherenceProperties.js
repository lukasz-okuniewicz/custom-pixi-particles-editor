"use client";

import { useBehaviourSectionCollapse } from "@context/SidebarBehaviourAccordionContext";

import {
  BfInputNumber,
  BfCheckbox,
} from "@components/properties/BehaviourFieldWrappers";
import { useCallback, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import PhaseCoherenceDescription from "@components/html/behaviourDescriptions/PhaseCoherence";

export default function PhaseCoherenceProperties({ defaultConfig, index, accordionPanelId }) {
  const { isSubmenuVisible, toggleSubmenuVisibility } = useBehaviourSectionCollapse(accordionPanelId);
    if (index === -1) {
    index = (defaultConfig.emitterConfig?.behaviours?.push({}) || 1) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "PhaseCoherenceBehaviour",
    enabled: false,
    priority: 248,
    naturalFrequency: 2,
    couplingStrength: 3,
    radius: 80,
    driftStrength: 0,
    writePhaseForColor: true,
    writeOrderForVisual: true,
    scaleByOrder: false,
    orderScaleMin: 0.7,
    orderScaleMax: 1.3,
  };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);

  const updateBehaviours = () => {
    defaultConfig.emitterConfig.behaviours[index] = behaviour;
    updateProps(
      "emitterConfig.behaviours",
      defaultConfig.emitterConfig.behaviours,
      null,
      true,
    );
  };

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>
        Phase Coherence Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <PhaseCoherenceDescription />
        <BfCheckbox
          label="Enabled"
          id="phasecoherence-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <BfInputNumber
          label="Priority"
          id="phasecoherence-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Natural Frequency"
          id="phasecoherence-naturalFrequency"
          value={behaviour.naturalFrequency ?? keysToInitialize.naturalFrequency}
          step="0.1"
          onChange={(value) => {
            behaviour.naturalFrequency = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Coupling Strength"
          id="phasecoherence-couplingStrength"
          value={behaviour.couplingStrength ?? keysToInitialize.couplingStrength}
          step="0.1"
          onChange={(value) => {
            behaviour.couplingStrength = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Radius"
          id="phasecoherence-radius"
          value={behaviour.radius ?? keysToInitialize.radius}
          step="1"
          min="0"
          onChange={(value) => {
            behaviour.radius = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Drift Strength"
          id="phasecoherence-driftStrength"
          value={behaviour.driftStrength ?? keysToInitialize.driftStrength}
          step="1"
          onChange={(value) => {
            behaviour.driftStrength = value;
            updateBehaviours();
          }}
        />
        <BfCheckbox
          label="Write Phase For Color"
          id="phasecoherence-writePhaseForColor"
          onChange={(value) => {
            behaviour.writePhaseForColor = value;
            updateBehaviours();
          }}
          checked={behaviour.writePhaseForColor ?? keysToInitialize.writePhaseForColor}
        />
        <BfCheckbox
          label="Write Order For Visual"
          id="phasecoherence-writeOrderForVisual"
          onChange={(value) => {
            behaviour.writeOrderForVisual = value;
            updateBehaviours();
          }}
          checked={behaviour.writeOrderForVisual ?? keysToInitialize.writeOrderForVisual}
        />
        <BfCheckbox
          label="Scale By Order"
          id="phasecoherence-scaleByOrder"
          onChange={(value) => {
            behaviour.scaleByOrder = value;
            updateBehaviours();
          }}
          checked={behaviour.scaleByOrder ?? keysToInitialize.scaleByOrder}
        />
        <BfInputNumber
          label="Order Scale Min"
          id="phasecoherence-orderScaleMin"
          value={behaviour.orderScaleMin ?? keysToInitialize.orderScaleMin}
          step="0.1"
          onChange={(value) => {
            behaviour.orderScaleMin = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Order Scale Max"
          id="phasecoherence-orderScaleMax"
          value={behaviour.orderScaleMax ?? keysToInitialize.orderScaleMax}
          step="0.1"
          onChange={(value) => {
            behaviour.orderScaleMax = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
