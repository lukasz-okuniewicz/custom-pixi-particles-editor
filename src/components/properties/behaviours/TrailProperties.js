"use client";

import {
  BfInputNumber,
  BfCheckbox,
} from "@components/properties/BehaviourFieldWrappers";
import { useCallback, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import TrailDescription from "@components/html/behaviourDescriptions/Trail";

export default function TrailProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "TrailBehaviour",
    enabled: false,
    priority: -20,
    minAlpha: 0.2,
    maxAlpha: 1,
    speedForMaxAlpha: 200,
    scaleBySpeed: false,
    minScale: 0.5,
    maxScale: 1,
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
      <legend onClick={toggleSubmenuVisibility}>
        Trail Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <TrailDescription />
        <BfCheckbox
          label="Enabled"
          id="trail-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <BfInputNumber
          label="Priority"
          id="trail-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Min Alpha"
          id="trail-minAlpha"
          value={behaviour.minAlpha ?? keysToInitialize.minAlpha}
          step="0.1"
          min="0"
          max="1"
          onChange={(value) => {
            behaviour.minAlpha = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Max Alpha"
          id="trail-maxAlpha"
          value={behaviour.maxAlpha ?? keysToInitialize.maxAlpha}
          step="0.1"
          min="0"
          max="1"
          onChange={(value) => {
            behaviour.maxAlpha = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Speed For Max Alpha"
          id="trail-speedForMaxAlpha"
          value={behaviour.speedForMaxAlpha ?? keysToInitialize.speedForMaxAlpha}
          step="10"
          onChange={(value) => {
            behaviour.speedForMaxAlpha = value;
            updateBehaviours();
          }}
        />
        <BfCheckbox
          label="Scale By Speed"
          id="trail-scaleBySpeed"
          onChange={(value) => {
            behaviour.scaleBySpeed = value;
            updateBehaviours();
          }}
          checked={behaviour.scaleBySpeed ?? keysToInitialize.scaleBySpeed}
        />
        <BfInputNumber
          label="Min Scale"
          id="trail-minScale"
          value={behaviour.minScale ?? keysToInitialize.minScale}
          step="0.1"
          min="0"
          onChange={(value) => {
            behaviour.minScale = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Max Scale"
          id="trail-maxScale"
          value={behaviour.maxScale ?? keysToInitialize.maxScale}
          step="0.1"
          min="0"
          onChange={(value) => {
            behaviour.maxScale = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
