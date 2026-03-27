"use client";

import { useBehaviourSectionCollapse } from "@context/SidebarBehaviourAccordionContext";

import {
  BfInputNumber,
  BfCheckbox,
} from "@components/properties/BehaviourFieldWrappers";
import { useCallback, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import ToroidalWrapDescription from "@components/html/behaviourDescriptions/ToroidalWrap";

export default function ToroidalWrapProperties({ defaultConfig, index, accordionPanelId }) {
  const { isSubmenuVisible, toggleSubmenuVisibility } = useBehaviourSectionCollapse(accordionPanelId);
    if (index === -1) {
    index = (defaultConfig.emitterConfig?.behaviours?.push({}) || 1) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "ToroidalWrapBehaviour",
    // false: presets without this behaviour use an empty merge target; true looked "enabled" incorrectly (see BounceProperties).
    enabled: false,
    priority: 45,
    wrapX: true,
    wrapY: true,
    useCanvasBounds: false,
    minX: -400,
    maxX: 400,
    minY: -300,
    maxY: 300,
    inset: 0,
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
      <legend onClick={toggleSubmenuVisibility}>
        Toroidal Wrap Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <ToroidalWrapDescription />
        <BfCheckbox
          label="Enabled"
          id="toroidal-wrap-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <BfInputNumber
          label="Priority"
          id="toroidal-wrap-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="1"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <BfCheckbox
          label="Wrap X"
          id="toroidal-wrap-x"
          onChange={(value) => {
            behaviour.wrapX = value;
            updateBehaviours();
          }}
          checked={behaviour.wrapX ?? keysToInitialize.wrapX}
        />
        <BfCheckbox
          label="Wrap Y"
          id="toroidal-wrap-y"
          onChange={(value) => {
            behaviour.wrapY = value;
            updateBehaviours();
          }}
          checked={behaviour.wrapY ?? keysToInitialize.wrapY}
        />
        <BfCheckbox
          label="Use canvas size (auto bounds)"
          id="toroidal-use-canvas"
          onChange={(value) => {
            behaviour.useCanvasBounds = value;
            updateBehaviours();
          }}
          checked={behaviour.useCanvasBounds ?? keysToInitialize.useCanvasBounds}
        />
        {!behaviour.useCanvasBounds && (
          <>
        <BfInputNumber
          label="Min X"
          id="toroidal-minX"
          value={behaviour.minX ?? keysToInitialize.minX}
          step="10"
          onChange={(value) => {
            behaviour.minX = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Max X"
          id="toroidal-maxX"
          value={behaviour.maxX ?? keysToInitialize.maxX}
          step="10"
          onChange={(value) => {
            behaviour.maxX = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Min Y"
          id="toroidal-minY"
          value={behaviour.minY ?? keysToInitialize.minY}
          step="10"
          onChange={(value) => {
            behaviour.minY = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Max Y"
          id="toroidal-maxY"
          value={behaviour.maxY ?? keysToInitialize.maxY}
          step="10"
          onChange={(value) => {
            behaviour.maxY = value;
            updateBehaviours();
          }}
        />
          </>
        )}
        <BfInputNumber
          label="Inset"
          id="toroidal-inset"
          value={behaviour.inset ?? keysToInitialize.inset}
          step="1"
          min="0"
          onChange={(value) => {
            behaviour.inset = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
