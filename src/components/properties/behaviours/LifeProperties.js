"use client";

import { useCallback, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { initializeProperty, updateProps } from "@utils";

export default function LifeProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    enabled: true,
    priority: 10000,
    maxLifeTime: 1.4,
    timeVariance: 0.4,
    name: "LifeBehaviour",
  };
  Object.keys(keysToInitialize).forEach((key) => {
    initializeProperty(behaviour, key, keysToInitialize[key]);
  });

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
