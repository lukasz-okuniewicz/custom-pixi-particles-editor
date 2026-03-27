"use client";

import { useBehaviourSectionCollapse } from "@context/SidebarBehaviourAccordionContext";

import {
  BfInputNumber,
  BfCheckbox,
} from "@components/properties/BehaviourFieldWrappers";
import { useCallback, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import EmitterAttractorLinkDescription from "@components/html/behaviourDescriptions/EmitterAttractorLink";

export default function EmitterAttractorLinkProperties({ defaultConfig, index, accordionPanelId }) {
  const { isSubmenuVisible, toggleSubmenuVisibility } = useBehaviourSectionCollapse(accordionPanelId);
    if (index === -1) {
    index = (defaultConfig.emitterConfig?.behaviours?.push({}) || 1) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "EmitterAttractorLinkBehaviour",
    enabled: false,
    priority: 230,
    active: true,
    targetX: 0,
    targetY: 0,
    strength: 120,
    falloff: 0,
    axisMask: 3,
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
      <legend onClick={toggleSubmenuVisibility}>Emitter Attractor Link</legend>
      <div className={`${isSubmenuVisible}`}>
        <EmitterAttractorLinkDescription />
        <p className="text-xs opacity-80 mb-2">
          Spring toward targetX/targetY (e.g. another transform). Update targets
          from gameplay code.
        </p>
        <BfCheckbox
          label="Enabled"
          id="eal-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <BfCheckbox
          label="Active"
          id="eal-active"
          onChange={(value) => {
            behaviour.active = value;
            updateBehaviours();
          }}
          checked={behaviour.active ?? keysToInitialize.active}
        />
        <BfInputNumber
          label="Priority"
          id="eal-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="1"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Target"
          id="eal-target"
          params={["x", "y"]}
          value={[
            behaviour.targetX ?? keysToInitialize.targetX,
            behaviour.targetY ?? keysToInitialize.targetY,
          ]}
          step="1"
          onChange={(value, id) => {
            if (id === "x") behaviour.targetX = value;
            else behaviour.targetY = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Strength"
          id="eal-strength"
          value={behaviour.strength ?? keysToInitialize.strength}
          step="5"
          onChange={(value) => {
            behaviour.strength = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Falloff"
          id="eal-falloff"
          value={behaviour.falloff ?? keysToInitialize.falloff}
          step="0.1"
          min="0"
          onChange={(value) => {
            behaviour.falloff = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Axis mask (1=x,2=y,3=both)"
          id="eal-axisMask"
          value={behaviour.axisMask ?? keysToInitialize.axisMask}
          step="1"
          min="0"
          max="3"
          onChange={(value) => {
            behaviour.axisMask = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
