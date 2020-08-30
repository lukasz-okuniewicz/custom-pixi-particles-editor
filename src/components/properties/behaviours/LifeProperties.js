"use client";

import { useCallback, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import LifeDescription from "@components/html/behaviourDescriptions/Life";

export default function LifeProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    enabled: true,
    priority: 10000,
    maxLifeTime: 1.4,
    timeVariance: 0.4,
    name: "LifeBehaviour",
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
      <legend onClick={toggleSubmenuVisibility}>Life Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        <LifeDescription />
        <InputNumber
          label="Priority"
          id="color-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          min="0"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <hr />
        <InputNumber
          label="Max Life Time"
          id="max-life-time"
          value={behaviour.maxLifeTime ?? keysToInitialize.maxLifeTime}
          step="1"
          onChange={(value) => {
            behaviour.maxLifeTime = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Time Variance"
          id="time-variance"
          value={behaviour.timeVariance ?? keysToInitialize.timeVariance}
          step="1"
          onChange={(value) => {
            behaviour.timeVariance = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
