"use client";

import { useBehaviourSectionCollapse } from "@context/SidebarBehaviourAccordionContext";

import {
  BfInputNumber,
  BfCheckbox,
  BfJsonTextarea,
} from "@components/properties/BehaviourFieldWrappers";
import { useCallback, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import ScreenSpaceFlowMapDescription from "@components/html/behaviourDescriptions/ScreenSpaceFlowMap";

export default function ScreenSpaceFlowMapProperties({ defaultConfig, index, accordionPanelId }) {
  const { isSubmenuVisible, toggleSubmenuVisibility } = useBehaviourSectionCollapse(accordionPanelId);
    if (index === -1) {
    index = (defaultConfig.emitterConfig?.behaviours?.push({}) || 1) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "ScreenSpaceFlowMapBehaviour",
    enabled: false,
    priority: 302,
    gridWidth: 8,
    gridHeight: 8,
    worldMinX: -400,
    worldMinY: -300,
    worldMaxX: 400,
    worldMaxY: 300,
    flowData: [],
    strength: 1,
    bilinear: true,
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
      <legend onClick={toggleSubmenuVisibility}>Screen Space Flow Map</legend>
      <div className={`${isSubmenuVisible}`}>
        <ScreenSpaceFlowMapDescription />
        <p className="text-xs opacity-80 mb-2">
          CPU grid [vx,vy] pairs row-major. Populate flowData from code or paste
          a JSON number array (length = width×height×2).
        </p>
        <BfCheckbox
          label="Enabled"
          id="ssfm-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <BfInputNumber
          label="Priority"
          id="ssfm-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="1"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Grid width"
          id="ssfm-gw"
          value={behaviour.gridWidth ?? keysToInitialize.gridWidth}
          step="1"
          min="1"
          onChange={(value) => {
            behaviour.gridWidth = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Grid height"
          id="ssfm-gh"
          value={behaviour.gridHeight ?? keysToInitialize.gridHeight}
          step="1"
          min="1"
          onChange={(value) => {
            behaviour.gridHeight = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="World min"
          id="ssfm-wmin"
          params={["x", "y"]}
          value={[
            behaviour.worldMinX ?? keysToInitialize.worldMinX,
            behaviour.worldMinY ?? keysToInitialize.worldMinY,
          ]}
          step="10"
          onChange={(value, id) => {
            if (id === "x") behaviour.worldMinX = value;
            else behaviour.worldMinY = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="World max"
          id="ssfm-wmax"
          params={["x", "y"]}
          value={[
            behaviour.worldMaxX ?? keysToInitialize.worldMaxX,
            behaviour.worldMaxY ?? keysToInitialize.worldMaxY,
          ]}
          step="10"
          onChange={(value, id) => {
            if (id === "x") behaviour.worldMaxX = value;
            else behaviour.worldMaxY = value;
            updateBehaviours();
          }}
        />
        <BfJsonTextarea
          id="ssfm-flowData"
          label="flowData (JSON array)"
          value={behaviour.flowData ?? []}
          onValidJson={(parsed) => {
            behaviour.flowData = parsed;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Strength"
          id="ssfm-strength"
          value={behaviour.strength ?? keysToInitialize.strength}
          step="0.1"
          onChange={(value) => {
            behaviour.strength = value;
            updateBehaviours();
          }}
        />
        <BfCheckbox
          label="Bilinear"
          id="ssfm-bilinear"
          onChange={(value) => {
            behaviour.bilinear = value;
            updateBehaviours();
          }}
          checked={behaviour.bilinear ?? keysToInitialize.bilinear}
        />
      </div>
    </>
  );
}
