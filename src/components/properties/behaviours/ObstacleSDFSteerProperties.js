"use client";

import { useCallback, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import ObstacleSDFSteerDescription from "@components/html/behaviourDescriptions/ObstacleSDFSteer";

const defaultPrimitives = [
  { type: "circle", cx: 0, cy: 0, r: 80 },
];

export default function ObstacleSDFSteerProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "ObstacleSDFSteerBehaviour",
    enabled: false,
    priority: 290,
    primitives: defaultPrimitives,
    margin: 4,
    pushStrength: 400,
    slipFactor: 0.35,
    maxPushPerFrame: 120,
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
      <legend onClick={toggleSubmenuVisibility}>Obstacle SDF Steer</legend>
      <div className={`${isSubmenuVisible}`}>
        <ObstacleSDFSteerDescription />
        <p className="text-xs opacity-80 mb-2">
          Union of circles and axis-aligned boxes (JSON array). Gradient push
          when inside/near surface.
        </p>
        <Checkbox
          label="Enabled"
          id="obstacleSdf-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="obstacleSdf-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="1"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <label className="block text-sm mt-2" htmlFor="obstacleSdf-primitives">
          Primitives JSON
        </label>
        <textarea
          id="obstacleSdf-primitives"
          className="w-full font-mono text-xs p-2 bg-[#1e2122] border border-[#444] rounded min-h-[100px]"
          defaultValue={JSON.stringify(
            behaviour.primitives ?? keysToInitialize.primitives,
            null,
            2,
          )}
          onBlur={(e) => {
            try {
              behaviour.primitives = JSON.parse(e.target.value || "[]");
              updateBehaviours();
            } catch {
              /* keep invalid JSON until valid */
            }
          }}
        />
        <InputNumber
          label="Margin"
          id="obstacleSdf-margin"
          value={behaviour.margin ?? keysToInitialize.margin}
          step="1"
          onChange={(value) => {
            behaviour.margin = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Push strength"
          id="obstacleSdf-push"
          value={behaviour.pushStrength ?? keysToInitialize.pushStrength}
          step="10"
          onChange={(value) => {
            behaviour.pushStrength = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Slip factor"
          id="obstacleSdf-slip"
          value={behaviour.slipFactor ?? keysToInitialize.slipFactor}
          step="0.05"
          min="0"
          max="1"
          onChange={(value) => {
            behaviour.slipFactor = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Max push / frame"
          id="obstacleSdf-maxPush"
          value={behaviour.maxPushPerFrame ?? keysToInitialize.maxPushPerFrame}
          step="10"
          onChange={(value) => {
            behaviour.maxPushPerFrame = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
