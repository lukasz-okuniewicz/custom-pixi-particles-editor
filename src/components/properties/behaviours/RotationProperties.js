"use client";

import { useCallback, useState } from "react";
import { initializeProperty, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import InputNumber from "@components/html/InputNumber";

export default function RotationProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    priority: 0,
    enabled: false,
    rotation: 3,
    variance: 2,
    name: "RotationBehaviour",
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
      <legend onClick={toggleSubmenuVisibility}>Rotation Properties</legend>
      <div className={`${isSubmenuVisible}`}>
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
      </div>
    </>
  );
}
