"use client";

import { useCallback, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import InputNumber from "@components/html/InputNumber";
import AngularVelocityDescription from "@components/html/behaviourDescriptions/AngularVelocity";

export default function AngularVelocityProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    priority: 100,
    enabled: false,
    degrees: 0,
    degreesVariance: 0,
    maxRadius: 0,
    maxRadiusVariance: 0,
    minRadius: 0,
    minRadiusVariance: 0,
    oscillate: false,
    oscillationSpeed: 1,
    oscillationAmplitude: 10,
    linearRadiusReduction: true,
    dynamicRadius: true,
    name: "AngularVelocityBehaviour",
  };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);

  // Toggle submenu visibility
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
        Angular Velocity Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <AngularVelocityDescription />
        <Checkbox
          label="Enabled"
          id="angular-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="angular-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          min="0"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Degrees/sec"
          id="degrees"
          value={behaviour.degrees ?? keysToInitialize.degrees}
          step="1"
          onChange={(value) => {
            behaviour.degrees = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Degrees/sec Variance"
          id="degrees"
          value={behaviour.degreesVariance ?? keysToInitialize.degreesVariance}
          step="1"
          onChange={(value) => {
            behaviour.degreesVariance = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Max Radius"
          id="degrees"
          value={behaviour.maxRadius ?? keysToInitialize.maxRadius}
          step="1"
          onChange={(value) => {
            behaviour.maxRadius = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Max Radius Variance"
          id="degrees"
          value={
            behaviour.maxRadiusVariance ?? keysToInitialize.maxRadiusVariance
          }
          step="1"
          onChange={(value) => {
            behaviour.maxRadiusVariance = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Min Radius"
          id="degrees"
          value={behaviour.minRadius ?? keysToInitialize.minRadius}
          step="1"
          onChange={(value) => {
            behaviour.minRadius = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Min Radius Variance"
          id="degrees"
          value={
            behaviour.minRadiusVariance ?? keysToInitialize.minRadiusVariance
          }
          step="1"
          onChange={(value) => {
            behaviour.minRadiusVariance = value;
            updateBehaviours();
          }}
        />
        <Checkbox
          label="Oscillate"
          id="angular-oscillate"
          onChange={(value) => {
            behaviour.oscillate = value;
            updateBehaviours();
          }}
          checked={behaviour.oscillate ?? keysToInitialize.oscillate}
        />
        {behaviour.oscillate && (
          <>
            <InputNumber
              label="Oscillation Speed"
              id="oscillationSpeed"
              value={
                behaviour.oscillationSpeed ?? keysToInitialize.oscillationSpeed
              }
              step="1"
              onChange={(value) => {
                behaviour.oscillationSpeed = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Oscillation Amplitude"
              id="oscillationAmplitude"
              value={
                behaviour.oscillationAmplitude ??
                keysToInitialize.oscillationAmplitude
              }
              step="1"
              onChange={(value) => {
                behaviour.oscillationAmplitude = value;
                updateBehaviours();
              }}
            />
          </>
        )}
        <Checkbox
          label="Linear Radius Reduction"
          id="angular-linearRadiusReduction"
          onChange={(value) => {
            behaviour.linearRadiusReduction = value;
            updateBehaviours();
          }}
          checked={
            behaviour.linearRadiusReduction ??
            keysToInitialize.linearRadiusReduction
          }
        />
        <Checkbox
          label="Dynamic Radius"
          id="angular-dynamicRadius"
          onChange={(value) => {
            behaviour.dynamicRadius = value;
            updateBehaviours();
          }}
          checked={behaviour.dynamicRadius ?? keysToInitialize.dynamicRadius}
        />
      </div>
    </>
  );
}
