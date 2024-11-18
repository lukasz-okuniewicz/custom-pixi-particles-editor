"use client";

import { useCallback, useState } from "react";
import { initializeProperty, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import InputNumber from "@components/html/InputNumber";

export default function AngularVelocityProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    priority: 0,
    enabled: false,
    degrees: 0,
    degreesVariance: 0,
    maxRadius: 0,
    maxRadiusVariance: 0,
    minRadius: 0,
    minRadiusVariance: 0,
    name: "AngularVelocityBehaviour",
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
        Angular Velocity Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <Checkbox
          label="Enabled"
          id="angular-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? false}
        />
        <InputNumber
          label="Degrees/sec"
          id="degrees"
          value={behaviour.degrees ?? 0}
          step="1"
          onChange={(value) => {
            behaviour.degrees = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Degrees/sec Variance"
          id="degrees"
          value={behaviour.degreesVariance ?? 0}
          step="1"
          onChange={(value) => {
            behaviour.degreesVariance = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Max Radius"
          id="degrees"
          value={behaviour.maxRadius ?? 0}
          step="1"
          onChange={(value) => {
            behaviour.maxRadius = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Max Radius Variance"
          id="degrees"
          value={behaviour.maxRadiusVariance ?? 0}
          step="1"
          onChange={(value) => {
            behaviour.maxRadiusVariance = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Min Radius"
          id="degrees"
          value={behaviour.minRadius ?? 0}
          step="1"
          onChange={(value) => {
            behaviour.minRadius = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Min Radius Variance"
          id="degrees"
          value={behaviour.minRadiusVariance ?? 0}
          step="1"
          onChange={(value) => {
            behaviour.minRadiusVariance = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
