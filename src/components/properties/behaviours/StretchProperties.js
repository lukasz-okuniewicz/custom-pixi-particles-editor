"use client";

import { useBehaviourSectionCollapse } from "@context/SidebarBehaviourAccordionContext";

import {
  BfInputNumber,
  BfCheckbox,
} from "@components/properties/BehaviourFieldWrappers";
import { useCallback, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import StretchDescription from "@components/html/behaviourDescriptions/Stretch";

export default function StretchProperties({ defaultConfig, index, accordionPanelId }) {
  const { isSubmenuVisible, toggleSubmenuVisibility } = useBehaviourSectionCollapse(accordionPanelId);
    if (index === -1) {
    index = (defaultConfig.emitterConfig?.behaviours?.push({}) || 1) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    enabled: false,
    priority: 0,
    baseScale: 0.1,
    stretchFactor: 0.1,
    minStretch: 1,
    maxStretch: 3,
    name: "StretchBehaviour",
  };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);

  // Toggle submenu visibility
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
      <legend onClick={toggleSubmenuVisibility}>Stretch Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        <StretchDescription />
        <BfCheckbox
          label="Enabled"
          id="emit-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? false}
        />
        <BfInputNumber
          label="Priority"
          id="emit-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          min="0"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Base Scale"
          id="baseScale"
          value={behaviour.baseScale ?? keysToInitialize.baseScale}
          step="1"
          onChange={(value) => {
            behaviour.baseScale = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Stretch Factor"
          id="stretchFactor"
          value={behaviour.stretchFactor ?? keysToInitialize.stretchFactor}
          step="0.1"
          onChange={(value) => {
            behaviour.stretchFactor = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Min Stretch"
          id="minStretch"
          value={behaviour.minStretch ?? keysToInitialize.minStretch}
          step="1"
          onChange={(value) => {
            behaviour.minStretch = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Max Stretch"
          id="maxStretch"
          value={behaviour.maxStretch ?? keysToInitialize.maxStretch}
          step="1"
          onChange={(value) => {
            behaviour.maxStretch = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
