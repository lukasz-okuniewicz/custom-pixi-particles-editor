"use client";

import { useBehaviourSectionCollapse } from "@context/SidebarBehaviourAccordionContext";

import {
  BfInputNumber,
  BfCheckbox,
} from "@components/properties/BehaviourFieldWrappers";
import { useCallback, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import KelvinWakeDescription from "@components/html/behaviourDescriptions/KelvinWake";

export default function KelvinWakeProperties({ defaultConfig, index, accordionPanelId }) {
  const { isSubmenuVisible, toggleSubmenuVisibility } = useBehaviourSectionCollapse(accordionPanelId);
    if (index === -1) {
    index = (defaultConfig.emitterConfig?.behaviours?.push({}) || 1) - 1;
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
        <BfCheckbox
          label="Enabled"
          id="kelvin-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <BfInputNumber
          label="Priority"
          id="kelvin-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="1"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
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
        <BfInputNumber
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
        <BfInputNumber
          label="Wake half-angle (rad)"
          id="kelvin-angle"
          value={behaviour.wakeAngle ?? keysToInitialize.wakeAngle}
          step="0.05"
          onChange={(value) => {
            behaviour.wakeAngle = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Strength"
          id="kelvin-strength"
          value={behaviour.strength ?? keysToInitialize.strength}
          step="5"
          onChange={(value) => {
            behaviour.strength = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
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
        <BfInputNumber
          label="Lateral jitter"
          id="kelvin-jitter"
          value={behaviour.lateralJitter ?? keysToInitialize.lateralJitter}
          step="1"
          onChange={(value) => {
            behaviour.lateralJitter = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
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
