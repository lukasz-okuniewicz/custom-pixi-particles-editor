"use client";

import { useCallback, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import DamageFlashRippleDescription from "@components/html/behaviourDescriptions/DamageFlashRipple";

export default function DamageFlashRippleProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "DamageFlashRippleBehaviour",
    enabled: false,
    priority: 240,
    centerX: 0,
    centerY: 0,
    triggerRipple: false,
    waveSpeed: 350,
    waveThickness: 80,
    strength: 600,
    duration: 1.2,
    writeRadialPhase: true,
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
      <legend onClick={toggleSubmenuVisibility}>Damage / Flash Ripple</legend>
      <div className={`${isSubmenuVisible}`}>
        <DamageFlashRippleDescription />
        <p className="text-xs opacity-80 mb-2">
          Set triggerRipple true (or tick below) to fire an expanding ring
          impulse from center.
        </p>
        <Checkbox
          label="Enabled"
          id="dfr-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <Checkbox
          label="Trigger ripple"
          id="dfr-trigger"
          onChange={(value) => {
            behaviour.triggerRipple = value;
            updateBehaviours();
          }}
          checked={behaviour.triggerRipple ?? keysToInitialize.triggerRipple}
        />
        <InputNumber
          label="Priority"
          id="dfr-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="1"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Center"
          id="dfr-center"
          params={["x", "y"]}
          value={[
            behaviour.centerX ?? keysToInitialize.centerX,
            behaviour.centerY ?? keysToInitialize.centerY,
          ]}
          step="1"
          onChange={(value, id) => {
            if (id === "x") behaviour.centerX = value;
            else behaviour.centerY = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Wave speed"
          id="dfr-speed"
          value={behaviour.waveSpeed ?? keysToInitialize.waveSpeed}
          step="10"
          onChange={(value) => {
            behaviour.waveSpeed = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Wave thickness"
          id="dfr-thick"
          value={behaviour.waveThickness ?? keysToInitialize.waveThickness}
          step="5"
          onChange={(value) => {
            behaviour.waveThickness = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Strength"
          id="dfr-strength"
          value={behaviour.strength ?? keysToInitialize.strength}
          step="10"
          onChange={(value) => {
            behaviour.strength = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Duration"
          id="dfr-duration"
          value={behaviour.duration ?? keysToInitialize.duration}
          step="0.1"
          min="0.1"
          onChange={(value) => {
            behaviour.duration = value;
            updateBehaviours();
          }}
        />
        <Checkbox
          label="Write radial phase"
          id="dfr-write"
          onChange={(value) => {
            behaviour.writeRadialPhase = value;
            updateBehaviours();
          }}
          checked={
            behaviour.writeRadialPhase ?? keysToInitialize.writeRadialPhase
          }
        />
      </div>
    </>
  );
}
