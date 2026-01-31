"use client";

import { useCallback, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import Select from "@components/html/Select";
import ColorPicker from "@components/html/ColorPicker";
import PulseDescription from "@components/html/behaviourDescriptions/Pulse";

export default function PulseProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "PulseBehaviour",
    enabled: false,
    priority: 200,
    frequency: 3,
    amplitude: 0.3,
    pulseSize: true,
    pulseAlpha: true,
    pulseColor: false,
    colorBlend: { r: 255, g: 255, b: 255 },
    mode: "life",
    phaseOffset: 0,
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

  const modeOptions = [
    { key: "life", displayName: "Life" },
    { key: "time", displayName: "Time" },
  ];

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>
        Pulse Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <PulseDescription />
        <Checkbox
          label="Enabled"
          id="pulse-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="pulse-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Frequency"
          id="pulse-frequency"
          value={behaviour.frequency ?? keysToInitialize.frequency}
          step="0.5"
          onChange={(value) => {
            behaviour.frequency = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Amplitude"
          id="pulse-amplitude"
          value={behaviour.amplitude ?? keysToInitialize.amplitude}
          step="0.1"
          onChange={(value) => {
            behaviour.amplitude = value;
            updateBehaviours();
          }}
        />
        <Checkbox
          label="Pulse Size"
          id="pulse-pulseSize"
          onChange={(value) => {
            behaviour.pulseSize = value;
            updateBehaviours();
          }}
          checked={behaviour.pulseSize ?? keysToInitialize.pulseSize}
        />
        <Checkbox
          label="Pulse Alpha"
          id="pulse-pulseAlpha"
          onChange={(value) => {
            behaviour.pulseAlpha = value;
            updateBehaviours();
          }}
          checked={behaviour.pulseAlpha ?? keysToInitialize.pulseAlpha}
        />
        <Checkbox
          label="Pulse Color"
          id="pulse-pulseColor"
          onChange={(value) => {
            behaviour.pulseColor = value;
            updateBehaviours();
          }}
          checked={behaviour.pulseColor ?? keysToInitialize.pulseColor}
        />
        {behaviour.pulseColor && (
          <ColorPicker
            label="Color Blend"
            value={
              behaviour.colorBlend ?? {
                _r: 255,
                _g: 255,
                _b: 255,
                _alpha: 1,
              }
            }
            onChange={(value) => {
              behaviour.colorBlend = {
                r: value._r,
                g: value._g,
                b: value._b,
              };
              updateBehaviours();
            }}
          />
        )}
        <Select
          label="Mode"
          defaultValue={behaviour.mode ?? keysToInitialize.mode}
          onChange={(value) => {
            behaviour.mode = value;
            updateBehaviours();
          }}
          elements={modeOptions}
        />
        <InputNumber
          label="Phase Offset"
          id="pulse-phaseOffset"
          value={behaviour.phaseOffset ?? keysToInitialize.phaseOffset}
          step="0.1"
          onChange={(value) => {
            behaviour.phaseOffset = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
