"use client";

import { useCallback, useState } from "react";
import { initializeProperty, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import InputNumber from "@components/html/InputNumber";

export default function SizeProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    enabled: false,
    priority: 0,
    allowNegativeValues: false,
    sizeStart: { x: 1, y: 1 },
    sizeEnd: { x: 0, y: 0 },
    startVariance: 0.1,
    endVariance: 0,
    name: "SizeBehaviour",
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
      <legend onClick={toggleSubmenuVisibility}>Size Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        <Checkbox
          label="Enabled"
          id="size-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Size Start"
          id="size-start"
          params={["x", "y"]}
          value={[
            behaviour.sizeStart.x ?? keysToInitialize.sizeStart.x,
            behaviour.sizeStart.y ?? keysToInitialize.sizeStart.y,
          ]}
          step="0.1"
          onChange={(value, id) => {
            behaviour.sizeStart[id] = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Start Variance"
          id="size-start-variance"
          value={behaviour.startVariance ?? keysToInitialize.startVariance}
          step="0.1"
          onChange={(value) => {
            behaviour.startVariance = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Size End"
          id="size-end"
          params={["x", "y"]}
          value={[
            behaviour.sizeEnd.x ?? keysToInitialize.sizeEnd.x,
            behaviour.sizeEnd.y ?? keysToInitialize.sizeEnd.y,
          ]}
          step="0.1"
          onChange={(value, id) => {
            behaviour.sizeEnd[id] = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="End Variance"
          id="size-end-variance"
          value={behaviour.endVariance ?? keysToInitialize.endVariance}
          step="0.1"
          onChange={(value) => {
            behaviour.endVariance = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
