"use client";

import { useCallback, useState } from "react";
import { initializeProperty, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import InputNumber from "@components/html/InputNumber";

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
    name: "EmitDirectionBehaviour",
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
      <legend onClick={toggleSubmenuVisibility}>
        Emit Direction Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <Checkbox
          label="Enabled"
          id="emit-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? false}
        />
        <InputNumber
          label="Angle"
          id="angle"
          value={behaviour.angle ?? keysToInitialize.angle}
          step="1"
          onChange={(value) => {
            behaviour.angle = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Variance"
          id="angle-variance"
          value={behaviour.variance ?? keysToInitialize.variance}
          step="1"
          onChange={(value) => {
            behaviour.variance = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
