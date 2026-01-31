"use client";

import { useCallback, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import JacobianCurlFieldDescription from "@components/html/behaviourDescriptions/JacobianCurlField";

export default function JacobianCurlFieldProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
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

  const toggleSubmenuVisibility = useCallback(() => {
    setIsSubmenuVisible((prev) => (prev === "collapse" ? "" : "collapse"));
  }, []);

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
        <Checkbox
          label="Enabled"
          id="curl-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="curl-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Noise Scale"
          id="curl-noiseScale"
          value={behaviour.noiseScale ?? keysToInitialize.noiseScale}
          step="0.002"
          onChange={(value) => {
            behaviour.noiseScale = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Speed"
          id="curl-speed"
          value={behaviour.speed ?? keysToInitialize.speed}
          step="5"
          onChange={(value) => {
            behaviour.speed = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Scale XY"
          id="curl-scaleXY"
          value={behaviour.scaleXY ?? keysToInitialize.scaleXY}
          step="0.1"
          onChange={(value) => {
            behaviour.scaleXY = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Curl Magnitude Normalize"
          id="curl-curlMagnitudeNormalize"
          value={behaviour.curlMagnitudeNormalize ?? keysToInitialize.curlMagnitudeNormalize}
          step="0.5"
          onChange={(value) => {
            behaviour.curlMagnitudeNormalize = value;
            updateBehaviours();
          }}
        />
        <Checkbox
          label="Write Curl Magnitude For Hue"
          id="curl-writeCurlMagnitudeForHue"
          onChange={(value) => {
            behaviour.writeCurlMagnitudeForHue = value;
            updateBehaviours();
          }}
          checked={behaviour.writeCurlMagnitudeForHue ?? keysToInitialize.writeCurlMagnitudeForHue}
        />
        <Checkbox
          label="Apply Hue To Color"
          id="curl-applyHueToColor"
          onChange={(value) => {
            behaviour.applyHueToColor = value;
            updateBehaviours();
          }}
          checked={behaviour.applyHueToColor ?? keysToInitialize.applyHueToColor}
        />
        <InputNumber
          label="Hue Straight (blue)"
          id="curl-hueStraight"
          value={behaviour.hueStraight ?? keysToInitialize.hueStraight}
          step="10"
          onChange={(value) => {
            behaviour.hueStraight = value;
            updateBehaviours();
          }}
        />
        <InputNumber
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
