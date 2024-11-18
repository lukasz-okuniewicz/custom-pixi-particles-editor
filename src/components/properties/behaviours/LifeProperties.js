"use client";

import { useCallback, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { initializeProperty, updateProps } from "@utils";

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
        <span className="explanation">
          <span>
            <b>Life properties</b> in a particle system define how long
            particles exist before disappearing:
          </span>
          <ul>
            <li>
              <b>Max Lifetime</b>: Specifies the maximum duration a particle
              stays active.
            </li>
            <li>
              <b>Variance</b>: Adds randomness to the lifetime, making particles
              expire at slightly different times.
            </li>
          </ul>
          <span>
            These settings create natural, dynamic effects by ensuring particles
            don’t all behave identically, enhancing the overall realism of the
            system.
          </span>
        </span>
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
