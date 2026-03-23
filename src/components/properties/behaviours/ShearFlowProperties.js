"use client";

import { useCallback, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import ShearFlowDescription from "@components/html/behaviourDescriptions/ShearFlow";

export default function ShearFlowProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "ShearFlowBehaviour",
    enabled: false,
    priority: 305,
    pivot: { x: 0, y: 0 },
    shearYX: 0.15,
    shearXY: 0.12,
    radius: 0,
    oscillationHz: 0,
    blendWithVelocity: 1,
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
      <legend onClick={toggleSubmenuVisibility}>Shear Flow</legend>
      <div className={`${isSubmenuVisible}`}>
        <ShearFlowDescription />
        <p className="text-xs opacity-80 mb-2">
          Spatial shear on velocity (streaky flow). Higher priority runs before
          Position integration.
        </p>
        <Checkbox
          label="Enabled"
          id="shearFlow-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="shearFlow-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="1"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Pivot"
          id="shearFlow-pivot"
          params={["x", "y"]}
          value={[
            behaviour.pivot?.x ?? keysToInitialize.pivot.x,
            behaviour.pivot?.y ?? keysToInitialize.pivot.y,
          ]}
          step="1"
          onChange={(value, id) => {
            behaviour.pivot = behaviour.pivot || { ...keysToInitialize.pivot };
            behaviour.pivot[id] = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Shear Y→X (shearYX)"
          id="shearFlow-shearYX"
          value={behaviour.shearYX ?? keysToInitialize.shearYX}
          step="0.01"
          onChange={(value) => {
            behaviour.shearYX = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Shear X→Y (shearXY)"
          id="shearFlow-shearXY"
          value={behaviour.shearXY ?? keysToInitialize.shearXY}
          step="0.01"
          onChange={(value) => {
            behaviour.shearXY = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Radius (0 = global)"
          id="shearFlow-radius"
          value={behaviour.radius ?? keysToInitialize.radius}
          step="10"
          min="0"
          onChange={(value) => {
            behaviour.radius = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Oscillation Hz"
          id="shearFlow-oscillationHz"
          value={behaviour.oscillationHz ?? keysToInitialize.oscillationHz}
          step="0.1"
          min="0"
          onChange={(value) => {
            behaviour.oscillationHz = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Blend with velocity"
          id="shearFlow-blend"
          value={behaviour.blendWithVelocity ?? keysToInitialize.blendWithVelocity}
          step="0.05"
          min="0"
          max="1"
          onChange={(value) => {
            behaviour.blendWithVelocity = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
