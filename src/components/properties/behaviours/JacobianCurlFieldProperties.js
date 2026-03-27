"use client";

import { useBehaviourSectionCollapse } from "@context/SidebarBehaviourAccordionContext";

import {
  BfInputNumber,
  BfCheckbox,
} from "@components/properties/BehaviourFieldWrappers";
import { useCallback, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import JacobianCurlFieldDescription from "@components/html/behaviourDescriptions/JacobianCurlField";

export default function JacobianCurlFieldProperties({ defaultConfig, index, accordionPanelId }) {
  const { isSubmenuVisible, toggleSubmenuVisibility } = useBehaviourSectionCollapse(accordionPanelId);
    if (index === -1) {
    index = (defaultConfig.emitterConfig?.behaviours?.push({}) || 1) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "JacobianCurlFieldBehaviour",
    enabled: false,
    priority: -55,
    noiseScale: 0.01,
    speed: 50,
    scaleXY: 1,
    curlMagnitudeNormalize: 2,
    writeCurlMagnitudeForHue: true,
    applyHueToColor: true,
    hueStraight: 240,
    hueEddy: 0,
  };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);

  const updateBehaviours = () => {
    defaultConfig.emitterConfig.behaviours[index] = behaviour;
    updateProps(
      "emitterConfig.behaviours",
      defaultConfig.emitterConfig.behaviours,
      null,
      true,
    );
  };

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>
        Jacobian Curl-Field Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <JacobianCurlFieldDescription />
        <BfCheckbox
          label="Enabled"
          id="curl-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <BfInputNumber
          label="Priority"
          id="curl-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Noise Scale"
          id="curl-noiseScale"
          value={behaviour.noiseScale ?? keysToInitialize.noiseScale}
          step="0.002"
          onChange={(value) => {
            behaviour.noiseScale = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Speed"
          id="curl-speed"
          value={behaviour.speed ?? keysToInitialize.speed}
          step="5"
          onChange={(value) => {
            behaviour.speed = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Scale XY"
          id="curl-scaleXY"
          value={behaviour.scaleXY ?? keysToInitialize.scaleXY}
          step="0.1"
          onChange={(value) => {
            behaviour.scaleXY = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Curl Magnitude Normalize"
          id="curl-curlMagnitudeNormalize"
          value={behaviour.curlMagnitudeNormalize ?? keysToInitialize.curlMagnitudeNormalize}
          step="0.5"
          onChange={(value) => {
            behaviour.curlMagnitudeNormalize = value;
            updateBehaviours();
          }}
        />
        <BfCheckbox
          label="Write Curl Magnitude For Hue"
          id="curl-writeCurlMagnitudeForHue"
          onChange={(value) => {
            behaviour.writeCurlMagnitudeForHue = value;
            updateBehaviours();
          }}
          checked={behaviour.writeCurlMagnitudeForHue ?? keysToInitialize.writeCurlMagnitudeForHue}
        />
        <BfCheckbox
          label="Apply Hue To Color"
          id="curl-applyHueToColor"
          onChange={(value) => {
            behaviour.applyHueToColor = value;
            updateBehaviours();
          }}
          checked={behaviour.applyHueToColor ?? keysToInitialize.applyHueToColor}
        />
        <BfInputNumber
          label="Hue Straight (blue)"
          id="curl-hueStraight"
          value={behaviour.hueStraight ?? keysToInitialize.hueStraight}
          step="10"
          onChange={(value) => {
            behaviour.hueStraight = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Hue Eddy (red)"
          id="curl-hueEddy"
          value={behaviour.hueEddy ?? keysToInitialize.hueEddy}
          step="10"
          onChange={(value) => {
            behaviour.hueEddy = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
