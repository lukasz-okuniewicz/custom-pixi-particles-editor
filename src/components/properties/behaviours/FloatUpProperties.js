"use client";

import { useCallback, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import FloatUpDescription from "@components/html/behaviourDescriptions/FloatUp";

export default function FloatUpProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "FloatUpBehaviour",
    enabled: false,
    priority: -10,
    direction: 90,
    speed: 80,
    fadeOut: true,
    shrinkOverLife: false,
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
        Float Up Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <FloatUpDescription />
        <Checkbox
          label="Enabled"
          id="floatUp-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="floatUp-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Direction (°)"
          id="floatUp-direction"
          value={behaviour.direction ?? keysToInitialize.direction}
          step="15"
          onChange={(value) => {
            behaviour.direction = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Speed"
          id="floatUp-speed"
          value={behaviour.speed ?? keysToInitialize.speed}
          step="5"
          onChange={(value) => {
            behaviour.speed = value;
            updateBehaviours();
          }}
        />
        <Checkbox
          label="Fade Out"
          id="floatUp-fadeOut"
          onChange={(value) => {
            behaviour.fadeOut = value;
            updateBehaviours();
          }}
          checked={behaviour.fadeOut ?? keysToInitialize.fadeOut}
        />
        <Checkbox
          label="Shrink Over Life"
          id="floatUp-shrinkOverLife"
          onChange={(value) => {
            behaviour.shrinkOverLife = value;
            updateBehaviours();
          }}
          checked={behaviour.shrinkOverLife ?? keysToInitialize.shrinkOverLife}
        />
      </div>
    </>
  );
}
