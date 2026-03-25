"use client";

import {
  BfInputNumber,
  BfCheckbox,
} from "@components/properties/BehaviourFieldWrappers";
import { useCallback, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import PhaseFieldFlowDescription from "@components/html/behaviourDescriptions/PhaseFieldFlow";

export default function PhaseFieldFlowProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "PhaseFieldFlowBehaviour",
    enabled: false,
    priority: 210,
    strength: 80,
    scaleX: 0.02,
    scaleY: 0.02,
    timeScale: 1,
    strength2: 40,
    scaleX2: 0.015,
    scaleY2: 0.025,
    timeScale2: 1.3,
    writeSpeedForColor: true,
    writePhaseForVisual: true,
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
        Phase Field Flow Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <PhaseFieldFlowDescription />
        <BfCheckbox
          label="Enabled"
          id="phasefield-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <BfInputNumber
          label="Priority"
          id="phasefield-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Strength"
          id="phasefield-strength"
          value={behaviour.strength ?? keysToInitialize.strength}
          step="5"
          onChange={(value) => {
            behaviour.strength = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Scale X"
          id="phasefield-scaleX"
          value={behaviour.scaleX ?? keysToInitialize.scaleX}
          step="0.001"
          onChange={(value) => {
            behaviour.scaleX = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Scale Y"
          id="phasefield-scaleY"
          value={behaviour.scaleY ?? keysToInitialize.scaleY}
          step="0.001"
          onChange={(value) => {
            behaviour.scaleY = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Time Scale"
          id="phasefield-timeScale"
          value={behaviour.timeScale ?? keysToInitialize.timeScale}
          step="0.1"
          onChange={(value) => {
            behaviour.timeScale = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Strength 2"
          id="phasefield-strength2"
          value={behaviour.strength2 ?? keysToInitialize.strength2}
          step="5"
          onChange={(value) => {
            behaviour.strength2 = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Scale X2"
          id="phasefield-scaleX2"
          value={behaviour.scaleX2 ?? keysToInitialize.scaleX2}
          step="0.001"
          onChange={(value) => {
            behaviour.scaleX2 = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Scale Y2"
          id="phasefield-scaleY2"
          value={behaviour.scaleY2 ?? keysToInitialize.scaleY2}
          step="0.001"
          onChange={(value) => {
            behaviour.scaleY2 = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Time Scale 2"
          id="phasefield-timeScale2"
          value={behaviour.timeScale2 ?? keysToInitialize.timeScale2}
          step="0.1"
          onChange={(value) => {
            behaviour.timeScale2 = value;
            updateBehaviours();
          }}
        />
        <BfCheckbox
          label="Write Speed For Color"
          id="phasefield-writeSpeedForColor"
          onChange={(value) => {
            behaviour.writeSpeedForColor = value;
            updateBehaviours();
          }}
          checked={behaviour.writeSpeedForColor ?? keysToInitialize.writeSpeedForColor}
        />
        <BfCheckbox
          label="Write Phase For Visual"
          id="phasefield-writePhaseForVisual"
          onChange={(value) => {
            behaviour.writePhaseForVisual = value;
            updateBehaviours();
          }}
          checked={behaviour.writePhaseForVisual ?? keysToInitialize.writePhaseForVisual}
        />
      </div>
    </>
  );
}
