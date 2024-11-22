"use client";

import { Fragment, useCallback, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import InputNumber from "@components/html/InputNumber";
import NoiseBasedMotionDescription from "@components/html/behaviourDescriptions/NoiseBasedMotion";

export default function NoiseBasedMotionProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    enabled: false,
    priority: 50,
    noiseScale: 0.1,
    noiseIntensity: 200,
    noiseSpeed: 6,
    noiseDirection: { x: 1, y: 1 },
    name: "NoiseBasedMotionBehaviour",
  };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);

  // Toggle submenu visibility
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
        Noise Based Motion Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <NoiseBasedMotionDescription />
        <Checkbox
          label="Enabled"
          id="noise-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="noise-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          min="0"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Noise Scale"
          id="noiseScale"
          value={behaviour.noiseScale ?? keysToInitialize.noiseScale}
          step="0.1"
          onChange={(value) => {
            behaviour.noiseScale = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Noise Intensity"
          id="noiseIntensity"
          value={behaviour.noiseIntensity ?? keysToInitialize.noiseIntensity}
          step="100"
          onChange={(value) => {
            behaviour.noiseIntensity = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Noise Speed"
          id="noiseSpeed"
          value={behaviour.noiseSpeed ?? keysToInitialize.noiseSpeed}
          step="1"
          onChange={(value) => {
            behaviour.noiseSpeed = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Noise Direction"
          id="noiseDirection"
          params={["x", "y"]}
          value={[
            behaviour.noiseDirection.x ?? keysToInitialize.noiseDirection.x,
            behaviour.noiseDirection.y ?? keysToInitialize.noiseDirection.y,
          ]}
          step="1"
          onChange={(value, id) => {
            behaviour.noiseDirection[id] = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
