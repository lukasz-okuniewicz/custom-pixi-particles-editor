"use client";

import { useCallback, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import AizawaAttractorDescription from "@components/html/behaviourDescriptions/AizawaAttractor";

export default function AizawaAttractorProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "AizawaAttractorBehaviour",
    enabled: false,
    priority: 80,
    a: 0.95,
    b: 0.7,
    c: 0.6,
    d: 3.5,
    e: 0.25,
    f: 0.1,
    speed: 0.15,
    scaleXY: 1,
    writeDistanceForColor: true,
    writeSpeedForScale: true,
    distanceNormalize: 2,
    speedNormalize: 5,
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
      null,
      true,
    );
  };

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>
        Aizawa Attractor Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <AizawaAttractorDescription />
        <Checkbox
          label="Enabled"
          id="aizawa-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="aizawa-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Speed"
          id="aizawa-speed"
          value={behaviour.speed ?? keysToInitialize.speed}
          step="0.01"
          onChange={(value) => {
            behaviour.speed = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Scale XY"
          id="aizawa-scaleXY"
          value={behaviour.scaleXY ?? keysToInitialize.scaleXY}
          step="0.1"
          onChange={(value) => {
            behaviour.scaleXY = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="a"
          id="aizawa-a"
          value={behaviour.a ?? keysToInitialize.a}
          step="0.05"
          onChange={(value) => {
            behaviour.a = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="b"
          id="aizawa-b"
          value={behaviour.b ?? keysToInitialize.b}
          step="0.05"
          onChange={(value) => {
            behaviour.b = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="c"
          id="aizawa-c"
          value={behaviour.c ?? keysToInitialize.c}
          step="0.05"
          onChange={(value) => {
            behaviour.c = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="d"
          id="aizawa-d"
          value={behaviour.d ?? keysToInitialize.d}
          step="0.1"
          onChange={(value) => {
            behaviour.d = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="e"
          id="aizawa-e"
          value={behaviour.e ?? keysToInitialize.e}
          step="0.05"
          onChange={(value) => {
            behaviour.e = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="f"
          id="aizawa-f"
          value={behaviour.f ?? keysToInitialize.f}
          step="0.02"
          onChange={(value) => {
            behaviour.f = value;
            updateBehaviours();
          }}
        />
        <Checkbox
          label="Write Distance For Color"
          id="aizawa-writeDistanceForColor"
          onChange={(value) => {
            behaviour.writeDistanceForColor = value;
            updateBehaviours();
          }}
          checked={behaviour.writeDistanceForColor ?? keysToInitialize.writeDistanceForColor}
        />
        <Checkbox
          label="Write Speed For Scale"
          id="aizawa-writeSpeedForScale"
          onChange={(value) => {
            behaviour.writeSpeedForScale = value;
            updateBehaviours();
          }}
          checked={behaviour.writeSpeedForScale ?? keysToInitialize.writeSpeedForScale}
        />
        <InputNumber
          label="Distance Normalize"
          id="aizawa-distanceNormalize"
          value={behaviour.distanceNormalize ?? keysToInitialize.distanceNormalize}
          step="0.5"
          onChange={(value) => {
            behaviour.distanceNormalize = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Speed Normalize"
          id="aizawa-speedNormalize"
          value={behaviour.speedNormalize ?? keysToInitialize.speedNormalize}
          step="0.5"
          onChange={(value) => {
            behaviour.speedNormalize = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
