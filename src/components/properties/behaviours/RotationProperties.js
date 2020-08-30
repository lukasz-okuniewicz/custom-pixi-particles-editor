"use client";

import { useCallback, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import InputNumber from "@components/html/InputNumber";
import RotationDescription from "@components/html/behaviourDescriptions/Rotation";

export default function RotationProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    priority: 0,
    enabled: false,
    rotation: 3,
    variance: 2,
    oscillate: false,
    oscillationSpeed: 1,
    oscillationAmplitude: 0,
    useNoise: false,
    noiseScale: 0.1,
    acceleration: 0,
    clockwise: false,
    name: "RotationBehaviour",
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
      <legend onClick={toggleSubmenuVisibility}>Rotation Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        <RotationDescription />
        <Checkbox
          label="Enabled"
          id="rotation-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="rotation-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          min="0"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Rotation"
          id="rotation"
          value={behaviour.rotation ?? keysToInitialize.rotation}
          step="0.1"
          onChange={(value) => {
            behaviour.rotation = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Variance"
          id="rotation-variance"
          value={behaviour.variance ?? keysToInitialize.variance}
          step="0.1"
          onChange={(value) => {
            behaviour.variance = value;
            updateBehaviours();
          }}
        />
        <Checkbox
          label="Oscillate"
          id="oscillate"
          onChange={(value) => {
            behaviour.oscillate = value;
            updateBehaviours();
          }}
          checked={behaviour.oscillate ?? keysToInitialize.oscillate}
        />
        {behaviour.oscillate && (
          <>
            <InputNumber
              label="Oscillation Speed"
              id="oscillationSpeed"
              value={
                behaviour.oscillationSpeed ?? keysToInitialize.oscillationSpeed
              }
              step="1"
              onChange={(value) => {
                behaviour.oscillationSpeed = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Oscillation Amplitude"
              id="oscillationAmplitude"
              value={
                behaviour.oscillationAmplitude ??
                keysToInitialize.oscillationAmplitude
              }
              step="0.1"
              onChange={(value) => {
                behaviour.oscillationAmplitude = value;
                updateBehaviours();
              }}
            />
          </>
        )}
        <Checkbox
          label="Use Noise"
          id="useNoise"
          onChange={(value) => {
            behaviour.useNoise = value;
            updateBehaviours();
          }}
          checked={behaviour.useNoise ?? keysToInitialize.useNoise}
        />
        {behaviour.useNoise && (
          <>
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
          </>
        )}
        <InputNumber
          label="Acceleration"
          id="acceleration"
          value={behaviour.acceleration ?? keysToInitialize.acceleration}
          step="0.1"
          onChange={(value) => {
            behaviour.acceleration = value;
            updateBehaviours();
          }}
        />
        <Checkbox
          label="Clockwise"
          id="clockwise"
          onChange={(value) => {
            behaviour.clockwise = value;
            updateBehaviours();
          }}
          checked={behaviour.clockwise ?? keysToInitialize.clockwise}
        />
      </div>
    </>
  );
}
