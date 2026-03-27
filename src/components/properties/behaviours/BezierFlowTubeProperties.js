"use client";

import { useBehaviourSectionCollapse } from "@context/SidebarBehaviourAccordionContext";

import {
  BfInputNumber,
  BfCheckbox,
} from "@components/properties/BehaviourFieldWrappers";
import { propertyHint } from "@components/properties/behaviourPropertyHints";
import { useCallback, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import BezierFlowTubeDescription from "@components/html/behaviourDescriptions/BezierFlowTube";

export default function BezierFlowTubeProperties({ defaultConfig, index, accordionPanelId }) {
  const { isSubmenuVisible, toggleSubmenuVisibility } = useBehaviourSectionCollapse(accordionPanelId);
    if (index === -1) {
    index = (defaultConfig.emitterConfig?.behaviours?.push({}) || 1) - 1;
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

  const updateBehaviours = () => {
    defaultConfig.emitterConfig.behaviours[index] = behaviour;
    updateProps(
      "emitterConfig.behaviours",
      defaultConfig.emitterConfig.behaviours,
    );
  };

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  const pt = (key, label) => (
    <BfInputNumber
      label={label}
      id={`bezier-${key}`}
      params={["x", "y"]}
      value={[
        behaviour[key]?.x ?? keysToInitialize[key].x,
        behaviour[key]?.y ?? keysToInitialize[key].y,
      ]}
      step="5"
      tooltipText={propertyHint(`bezier-${key}`)}
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
        <BfCheckbox
          label="Enabled"
          id="bezier-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <BfInputNumber
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
        <BfInputNumber
          label="Speed"
          id="bezier-speed"
          value={behaviour.speed ?? keysToInitialize.speed}
          step="5"
          onChange={(value) => {
            behaviour.speed = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Noise amplitude"
          id="bezier-noise"
          value={behaviour.noiseAmp ?? keysToInitialize.noiseAmp}
          step="1"
          onChange={(value) => {
            behaviour.noiseAmp = value;
            updateBehaviours();
          }}
        />
        <BfCheckbox
          label="Loop t"
          id="bezier-loop"
          onChange={(value) => {
            behaviour.loop = value;
            updateBehaviours();
          }}
          checked={behaviour.loop ?? keysToInitialize.loop}
        />
        <BfCheckbox
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
