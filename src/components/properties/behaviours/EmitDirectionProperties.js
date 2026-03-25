"use client";

import {
  BfInputNumber,
  BfCheckbox,
} from "@components/properties/BehaviourFieldWrappers";
import { useCallback, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import EmitDirectionDescription from "@components/html/behaviourDescriptions/EmitDirection";

export default function EmitDirectionProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    priority: 0,
    enabled: false,
    angle: 5,
    variance: 5,
    oscillate: false,
    oscillationSpeed: 1,
    oscillationAmplitude: 0,
    useNoise: false,
    noiseScale: 0.1,
    velocityScaling: false,
    name: "EmitDirectionBehaviour",
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
        Emit Direction Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <EmitDirectionDescription />
        <BfCheckbox
          label="Enabled"
          id="emit-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? false}
        />
        <BfInputNumber
          label="Priority"
          id="emit-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          min="0"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Angle"
          id="angle"
          value={behaviour.angle ?? keysToInitialize.angle}
          step="1"
          onChange={(value) => {
            behaviour.angle = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Variance"
          id="angle-variance"
          value={behaviour.variance ?? keysToInitialize.variance}
          step="1"
          onChange={(value) => {
            behaviour.variance = value;
            updateBehaviours();
          }}
        />
        <BfCheckbox
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
            <BfInputNumber
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
            <BfInputNumber
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
        <BfCheckbox
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
            <BfInputNumber
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
        <BfCheckbox
          label="Velocity Scaling"
          id="velocityScaling"
          onChange={(value) => {
            behaviour.velocityScaling = value;
            updateBehaviours();
          }}
          checked={
            behaviour.velocityScaling ?? keysToInitialize.velocityScaling
          }
        />
      </div>
    </>
  );
}
