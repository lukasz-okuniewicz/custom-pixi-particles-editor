"use client";

import { useCallback, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import LimitCycleDescription from "@components/html/behaviourDescriptions/LimitCycle";

export default function LimitCycleProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "LimitCycleBehaviour",
    enabled: false,
    priority: 220,
    angularFrequency: 4,
    targetRadius: 30,
    relaxationRate: 2,
    strength: 100,
    phaseSpread: true,
    initialRadiusFraction: 0.3,
    writePhaseForColor: true,
    writeRadiusForVisual: true,
    scaleByRadius: false,
    radiusScaleMin: 0.8,
    radiusScaleMax: 1.2,
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
        Limit Cycle Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <LimitCycleDescription />
        <Checkbox
          label="Enabled"
          id="limitcycle-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="limitcycle-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Angular Frequency"
          id="limitcycle-angularFrequency"
          value={behaviour.angularFrequency ?? keysToInitialize.angularFrequency}
          step="0.1"
          onChange={(value) => {
            behaviour.angularFrequency = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Target Radius"
          id="limitcycle-targetRadius"
          value={behaviour.targetRadius ?? keysToInitialize.targetRadius}
          step="1"
          min="0"
          onChange={(value) => {
            behaviour.targetRadius = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Relaxation Rate"
          id="limitcycle-relaxationRate"
          value={behaviour.relaxationRate ?? keysToInitialize.relaxationRate}
          step="0.1"
          onChange={(value) => {
            behaviour.relaxationRate = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Strength"
          id="limitcycle-strength"
          value={behaviour.strength ?? keysToInitialize.strength}
          step="5"
          onChange={(value) => {
            behaviour.strength = value;
            updateBehaviours();
          }}
        />
        <Checkbox
          label="Phase Spread"
          id="limitcycle-phaseSpread"
          onChange={(value) => {
            behaviour.phaseSpread = value;
            updateBehaviours();
          }}
          checked={behaviour.phaseSpread ?? keysToInitialize.phaseSpread}
        />
        <InputNumber
          label="Initial Radius Fraction"
          id="limitcycle-initialRadiusFraction"
          value={behaviour.initialRadiusFraction ?? keysToInitialize.initialRadiusFraction}
          step="0.1"
          min="0"
          max="1"
          onChange={(value) => {
            behaviour.initialRadiusFraction = value;
            updateBehaviours();
          }}
        />
        <Checkbox
          label="Write Phase For Color"
          id="limitcycle-writePhaseForColor"
          onChange={(value) => {
            behaviour.writePhaseForColor = value;
            updateBehaviours();
          }}
          checked={behaviour.writePhaseForColor ?? keysToInitialize.writePhaseForColor}
        />
        <Checkbox
          label="Write Radius For Visual"
          id="limitcycle-writeRadiusForVisual"
          onChange={(value) => {
            behaviour.writeRadiusForVisual = value;
            updateBehaviours();
          }}
          checked={behaviour.writeRadiusForVisual ?? keysToInitialize.writeRadiusForVisual}
        />
        <Checkbox
          label="Scale By Radius"
          id="limitcycle-scaleByRadius"
          onChange={(value) => {
            behaviour.scaleByRadius = value;
            updateBehaviours();
          }}
          checked={behaviour.scaleByRadius ?? keysToInitialize.scaleByRadius}
        />
        <InputNumber
          label="Radius Scale Min"
          id="limitcycle-radiusScaleMin"
          value={behaviour.radiusScaleMin ?? keysToInitialize.radiusScaleMin}
          step="0.1"
          onChange={(value) => {
            behaviour.radiusScaleMin = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Radius Scale Max"
          id="limitcycle-radiusScaleMax"
          value={behaviour.radiusScaleMax ?? keysToInitialize.radiusScaleMax}
          step="0.1"
          onChange={(value) => {
            behaviour.radiusScaleMax = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
