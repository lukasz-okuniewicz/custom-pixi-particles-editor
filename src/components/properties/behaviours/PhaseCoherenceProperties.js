"use client";

import { useCallback, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import PhaseCoherenceDescription from "@components/html/behaviourDescriptions/PhaseCoherence";

export default function PhaseCoherenceProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
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

  const toggleSubmenuVisibility = useCallback(() => {
    setIsSubmenuVisible((prev) => (prev === "collapse" ? "" : "collapse"));
  }, []);

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
        <Checkbox
          label="Enabled"
          id="phasecoherence-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="phasecoherence-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Natural Frequency"
          id="phasecoherence-naturalFrequency"
          value={behaviour.naturalFrequency ?? keysToInitialize.naturalFrequency}
          step="0.1"
          onChange={(value) => {
            behaviour.naturalFrequency = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Coupling Strength"
          id="phasecoherence-couplingStrength"
          value={behaviour.couplingStrength ?? keysToInitialize.couplingStrength}
          step="0.1"
          onChange={(value) => {
            behaviour.couplingStrength = value;
            updateBehaviours();
          }}
        />
        <InputNumber
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
        <InputNumber
          label="Drift Strength"
          id="phasecoherence-driftStrength"
          value={behaviour.driftStrength ?? keysToInitialize.driftStrength}
          step="1"
          onChange={(value) => {
            behaviour.driftStrength = value;
            updateBehaviours();
          }}
        />
        <Checkbox
          label="Write Phase For Color"
          id="phasecoherence-writePhaseForColor"
          onChange={(value) => {
            behaviour.writePhaseForColor = value;
            updateBehaviours();
          }}
          checked={behaviour.writePhaseForColor ?? keysToInitialize.writePhaseForColor}
        />
        <Checkbox
          label="Write Order For Visual"
          id="phasecoherence-writeOrderForVisual"
          onChange={(value) => {
            behaviour.writeOrderForVisual = value;
            updateBehaviours();
          }}
          checked={behaviour.writeOrderForVisual ?? keysToInitialize.writeOrderForVisual}
        />
        <Checkbox
          label="Scale By Order"
          id="phasecoherence-scaleByOrder"
          onChange={(value) => {
            behaviour.scaleByOrder = value;
            updateBehaviours();
          }}
          checked={behaviour.scaleByOrder ?? keysToInitialize.scaleByOrder}
        />
        <InputNumber
          label="Order Scale Min"
          id="phasecoherence-orderScaleMin"
          value={behaviour.orderScaleMin ?? keysToInitialize.orderScaleMin}
          step="0.1"
          onChange={(value) => {
            behaviour.orderScaleMin = value;
            updateBehaviours();
          }}
        />
        <InputNumber
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
