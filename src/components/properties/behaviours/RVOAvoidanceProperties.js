"use client";

import { useBehaviourSectionCollapse } from "@context/SidebarBehaviourAccordionContext";

import {
  BfInputNumber,
  BfCheckbox,
} from "@components/properties/BehaviourFieldWrappers";
import { useCallback, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import RVOAvoidanceDescription from "@components/html/behaviourDescriptions/RVOAvoidance";

export default function RVOAvoidanceProperties({ defaultConfig, index, accordionPanelId }) {
  const { isSubmenuVisible, toggleSubmenuVisibility } = useBehaviourSectionCollapse(accordionPanelId);
    if (index === -1) {
    index = (defaultConfig.emitterConfig?.behaviours?.push({}) || 1) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "RVOAvoidanceBehaviour",
    enabled: false,
    priority: 255,
    neighborRadius: 45,
    timeHorizon: 0.4,
    maxAccel: 800,
    weight: 1,
    minSeparation: 18,
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
      <legend onClick={toggleSubmenuVisibility}>RVO Avoidance (lite)</legend>
      <div className={`${isSubmenuVisible}`}>
        <RVOAvoidanceDescription />
        <p className="text-xs opacity-80 mb-2">
          Neighbour avoidance; particle list is wired automatically from the
          emitter.
        </p>
        <BfCheckbox
          label="Enabled"
          id="rvo-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <BfInputNumber
          label="Priority"
          id="rvo-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="1"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Neighbor radius"
          id="rvo-neighborRadius"
          value={behaviour.neighborRadius ?? keysToInitialize.neighborRadius}
          step="1"
          onChange={(value) => {
            behaviour.neighborRadius = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Time horizon"
          id="rvo-timeHorizon"
          value={behaviour.timeHorizon ?? keysToInitialize.timeHorizon}
          step="0.05"
          min="0.05"
          onChange={(value) => {
            behaviour.timeHorizon = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Max accel"
          id="rvo-maxAccel"
          value={behaviour.maxAccel ?? keysToInitialize.maxAccel}
          step="10"
          onChange={(value) => {
            behaviour.maxAccel = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Weight"
          id="rvo-weight"
          value={behaviour.weight ?? keysToInitialize.weight}
          step="0.1"
          onChange={(value) => {
            behaviour.weight = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Min separation"
          id="rvo-minSep"
          value={behaviour.minSeparation ?? keysToInitialize.minSeparation}
          step="1"
          onChange={(value) => {
            behaviour.minSeparation = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
