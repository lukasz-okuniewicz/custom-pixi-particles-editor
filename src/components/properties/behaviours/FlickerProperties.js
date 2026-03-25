"use client";

import {
  BfSelect,
  BfInputNumber,
  BfCheckbox,
} from "@components/properties/BehaviourFieldWrappers";
import { useCallback, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import FlickerDescription from "@components/html/behaviourDescriptions/Flicker";

export default function FlickerProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "FlickerBehaviour",
    enabled: false,
    priority: 180,
    intensity: 0.3,
    speed: 8,
    flickerAlpha: true,
    flickerSize: false,
    mode: "noise",
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

  const modeOptions = [
    { key: "noise", displayName: "Noise" },
    { key: "random", displayName: "Random" },
  ];

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>
        Flicker Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <FlickerDescription />
        <BfCheckbox
          label="Enabled"
          id="flicker-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <BfInputNumber
          label="Priority"
          id="flicker-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Intensity"
          id="flicker-intensity"
          value={behaviour.intensity ?? keysToInitialize.intensity}
          step="0.1"
          onChange={(value) => {
            behaviour.intensity = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Speed"
          id="flicker-speed"
          value={behaviour.speed ?? keysToInitialize.speed}
          step="1"
          onChange={(value) => {
            behaviour.speed = value;
            updateBehaviours();
          }}
        />
        <BfCheckbox
          label="Flicker Alpha"
          id="flicker-flickerAlpha"
          onChange={(value) => {
            behaviour.flickerAlpha = value;
            updateBehaviours();
          }}
          checked={behaviour.flickerAlpha ?? keysToInitialize.flickerAlpha}
        />
        <BfCheckbox
          label="Flicker Size"
          id="flicker-flickerSize"
          onChange={(value) => {
            behaviour.flickerSize = value;
            updateBehaviours();
          }}
          checked={behaviour.flickerSize ?? keysToInitialize.flickerSize}
        />
        <BfSelect
          label="Mode"
          defaultValue={behaviour.mode ?? keysToInitialize.mode}
          onChange={(value) => {
            behaviour.mode = value;
            updateBehaviours();
          }}
          elements={modeOptions}
        />
      </div>
    </>
  );
}
