"use client";

import { useCallback, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import NearMissDispersionDescription from "@components/html/behaviourDescriptions/NearMissDispersion";

export default function NearMissDispersionProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "NearMissDispersionBehaviour",
    enabled: false,
    priority: 200,
    triggered: false,
    scatterAngle: 1.57,
    scatterStrength: 300,
    scatterVariance: 100,
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
    );
  };

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>
        Near Miss Dispersion Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <NearMissDispersionDescription />
        <Checkbox
          label="Enabled"
          id="nearMiss-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <Checkbox
          label="Triggered (Simulate)"
          id="nearMiss-triggered"
          onChange={(value) => {
            behaviour.triggered = value;
            updateBehaviours();
          }}
          checked={behaviour.triggered ?? keysToInitialize.triggered}
        />
        <InputNumber
          label="Scatter Angle (rad)"
          id="nearMiss-scatterAngle"
          value={behaviour.scatterAngle ?? keysToInitialize.scatterAngle}
          step="0.1"
          onChange={(value) => {
            behaviour.scatterAngle = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Scatter Strength"
          id="nearMiss-scatterStrength"
          value={behaviour.scatterStrength ?? keysToInitialize.scatterStrength}
          step="10"
          onChange={(value) => {
            behaviour.scatterStrength = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Scatter Variance"
          id="nearMiss-scatterVariance"
          value={behaviour.scatterVariance ?? keysToInitialize.scatterVariance}
          step="10"
          onChange={(value) => {
            behaviour.scatterVariance = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
