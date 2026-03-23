"use client";

import { useCallback, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import KelvinWakeDescription from "@components/html/behaviourDescriptions/KelvinWake";

export default function KelvinWakeProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "KelvinWakeBehaviour",
    enabled: false,
    priority: 212,
    sourceX: 0,
    sourceY: 0,
    sourceVelocityX: 200,
    sourceVelocityY: 0,
    wakeAngle: 0.45,
    strength: 90,
    decayAlongRay: 0.004,
    lateralJitter: 12,
    maxWakeDistance: 500,
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
      <legend onClick={toggleSubmenuVisibility}>Kelvin Wake</legend>
      <div className={`${isSubmenuVisible}`}>
        <KelvinWakeDescription />
        <p className="text-xs opacity-80 mb-2">
          V-shaped wake behind a moving source. Update source position/velocity
          from gameplay.
        </p>
        <Checkbox
          label="Enabled"
          id="kelvin-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="kelvin-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="1"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Source"
          id="kelvin-src"
          params={["x", "y"]}
          value={[
            behaviour.sourceX ?? keysToInitialize.sourceX,
            behaviour.sourceY ?? keysToInitialize.sourceY,
          ]}
          step="1"
          onChange={(value, id) => {
            if (id === "x") behaviour.sourceX = value;
            else behaviour.sourceY = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Source velocity"
          id="kelvin-vel"
          params={["x", "y"]}
          value={[
            behaviour.sourceVelocityX ?? keysToInitialize.sourceVelocityX,
            behaviour.sourceVelocityY ?? keysToInitialize.sourceVelocityY,
          ]}
          step="5"
          onChange={(value, id) => {
            if (id === "x") behaviour.sourceVelocityX = value;
            else behaviour.sourceVelocityY = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Wake half-angle (rad)"
          id="kelvin-angle"
          value={behaviour.wakeAngle ?? keysToInitialize.wakeAngle}
          step="0.05"
          onChange={(value) => {
            behaviour.wakeAngle = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Strength"
          id="kelvin-strength"
          value={behaviour.strength ?? keysToInitialize.strength}
          step="5"
          onChange={(value) => {
            behaviour.strength = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Decay along ray"
          id="kelvin-decay"
          value={behaviour.decayAlongRay ?? keysToInitialize.decayAlongRay}
          step="0.001"
          min="0"
          onChange={(value) => {
            behaviour.decayAlongRay = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Lateral jitter"
          id="kelvin-jitter"
          value={behaviour.lateralJitter ?? keysToInitialize.lateralJitter}
          step="1"
          onChange={(value) => {
            behaviour.lateralJitter = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Max wake distance"
          id="kelvin-maxD"
          value={behaviour.maxWakeDistance ?? keysToInitialize.maxWakeDistance}
          step="10"
          min="1"
          onChange={(value) => {
            behaviour.maxWakeDistance = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
