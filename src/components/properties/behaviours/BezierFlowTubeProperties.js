"use client";

import { useCallback, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import BezierFlowTubeDescription from "@components/html/behaviourDescriptions/BezierFlowTube";

export default function BezierFlowTubeProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "BezierFlowTubeBehaviour",
    enabled: false,
    priority: -58,
    p0: { x: -200, y: 0 },
    p1: { x: -80, y: 120 },
    p2: { x: 80, y: -80 },
    p3: { x: 200, y: 0 },
    speed: 80,
    noiseAmp: 25,
    loop: false,
    alignRotation: false,
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

  const pt = (key, label) => (
    <InputNumber
      label={label}
      id={`bezier-${key}`}
      params={["x", "y"]}
      value={[
        behaviour[key]?.x ?? keysToInitialize[key].x,
        behaviour[key]?.y ?? keysToInitialize[key].y,
      ]}
      step="5"
      onChange={(value, id) => {
        behaviour[key] = behaviour[key] || { ...keysToInitialize[key] };
        behaviour[key][id] = value;
        updateBehaviours();
      }}
    />
  );

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>Bezier Flow Tube</legend>
      <div className={`${isSubmenuVisible}`}>
        <BezierFlowTubeDescription />
        <p className="text-xs opacity-80 mb-2">
          Particles follow a cubic Bezier; runs after Position (priority -58).
        </p>
        <Checkbox
          label="Enabled"
          id="bezier-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="bezier-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="1"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        {pt("p0", "P0")}
        {pt("p1", "P1")}
        {pt("p2", "P2")}
        {pt("p3", "P3")}
        <InputNumber
          label="Speed"
          id="bezier-speed"
          value={behaviour.speed ?? keysToInitialize.speed}
          step="5"
          onChange={(value) => {
            behaviour.speed = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Noise amplitude"
          id="bezier-noise"
          value={behaviour.noiseAmp ?? keysToInitialize.noiseAmp}
          step="1"
          onChange={(value) => {
            behaviour.noiseAmp = value;
            updateBehaviours();
          }}
        />
        <Checkbox
          label="Loop t"
          id="bezier-loop"
          onChange={(value) => {
            behaviour.loop = value;
            updateBehaviours();
          }}
          checked={behaviour.loop ?? keysToInitialize.loop}
        />
        <Checkbox
          label="Align rotation to tangent"
          id="bezier-align"
          onChange={(value) => {
            behaviour.alignRotation = value;
            updateBehaviours();
          }}
          checked={behaviour.alignRotation ?? keysToInitialize.alignRotation}
        />
      </div>
    </>
  );
}
