"use client";

import { useCallback, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import WobbleDescription from "@components/html/behaviourDescriptions/Wobble";

export default function WobbleProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "WobbleBehaviour",
    enabled: false,
    priority: 60,
    frequency: 4,
    amplitudeX: 8,
    amplitudeY: 8,
    wobbleRotation: false,
    rotationAmplitude: 0.2,
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
        Wobble Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <WobbleDescription />
        <Checkbox
          label="Enabled"
          id="wobble-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="wobble-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Frequency"
          id="wobble-frequency"
          value={behaviour.frequency ?? keysToInitialize.frequency}
          step="0.5"
          onChange={(value) => {
            behaviour.frequency = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Amplitude X"
          id="wobble-amplitudeX"
          value={behaviour.amplitudeX ?? keysToInitialize.amplitudeX}
          step="1"
          onChange={(value) => {
            behaviour.amplitudeX = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Amplitude Y"
          id="wobble-amplitudeY"
          value={behaviour.amplitudeY ?? keysToInitialize.amplitudeY}
          step="1"
          onChange={(value) => {
            behaviour.amplitudeY = value;
            updateBehaviours();
          }}
        />
        <Checkbox
          label="Wobble Rotation"
          id="wobble-wobbleRotation"
          onChange={(value) => {
            behaviour.wobbleRotation = value;
            updateBehaviours();
          }}
          checked={behaviour.wobbleRotation ?? keysToInitialize.wobbleRotation}
        />
        <InputNumber
          label="Rotation Amplitude"
          id="wobble-rotationAmplitude"
          value={behaviour.rotationAmplitude ?? keysToInitialize.rotationAmplitude}
          step="0.1"
          onChange={(value) => {
            behaviour.rotationAmplitude = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
