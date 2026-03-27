"use client";

import { useBehaviourSectionCollapse } from "@context/SidebarBehaviourAccordionContext";

import {
  BfSelect,
  BfInputNumber,
  BfCheckbox,
} from "@components/properties/BehaviourFieldWrappers";
import { useCallback, useMemo, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import MoveToPointDescription from "@components/html/behaviourDescriptions/MoveToPoint";

export default function MoveToPointProperties({ defaultConfig, index, accordionPanelId }) {
  const { isSubmenuVisible, toggleSubmenuVisibility } = useBehaviourSectionCollapse(accordionPanelId);
    if (index === -1) {
    index = (defaultConfig.emitterConfig?.behaviours?.push({}) || 1) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "MoveToPointBehaviour",
    // false when behaviour is not in preset; presets with this behaviour set enabled explicitly (see ToroidalWrapProperties).
    enabled: false,
    active: false, // Initially not active (particles move normally)
    targetPoint: { x: 0, y: 0 }, // Default target, can be updated later
    speed: 200, // Speed of movement towards the target
    priority: -10, // Ensures it runs after other position behaviours
    killOnArrival: true, // Set this to true
    resetMaxLifeTime: false, // Set this to true
    arrivalThreshold: 1.0, // Optional: Adjust if needed
    pathType: "linear",
    sinusoidalAmplitude: 60, // Height of bounce
    sinusoidalFrequency: 5, // Number of bounces
  };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);

  const predefinedEase = useMemo(() => {
    const names = {
      None: true,
      "back.in": true,
      "back.out": true,
      "back.inOut": true,
      "power1.in": true,
      "power1.out": true,
      "power1.inOut": true,
      "bounce.in": true,
      "bounce.out": true,
      "bounce.inOut": true,
      "elastic.in": true,
      "elastic.out": true,
      "elastic.inOut": true,
      steps: true,
    };
    return Object.keys(names)
      .sort()
      .map((key) => ({
        key,
        displayName: key,
      }));
  }, []);

  const predefinedPathType = useMemo(() => {
    const names = {
      linear: true,
      sinusoidal: true,
    };
    return Object.keys(names)
      .sort()
      .map((key) => ({
        key,
        displayName: key,
      }));
  }, []);

  // Toggle submenu visibility
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
        Move To Point Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <MoveToPointDescription />
        <BfCheckbox
          label="Enabled"
          id="move-to-point-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <BfInputNumber
          label="Priority"
          id="color-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          min="0"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <hr />
        <BfCheckbox
          label="Active"
          id="move-to-point-active"
          onChange={(value) => {
            behaviour.active = value;
            updateBehaviours();
          }}
          checked={behaviour.active ?? keysToInitialize.active}
        />
        <BfCheckbox
          label="Kill On Arrival"
          id="move-to-point-killOnArrival"
          onChange={(value) => {
            behaviour.killOnArrival = value;
            updateBehaviours();
          }}
          checked={behaviour.killOnArrival ?? keysToInitialize.killOnArrival}
        />
        <BfCheckbox
          label="Reset Max Life Time on Kill"
          id="move-to-point-resetMaxLifeTime"
          onChange={(value) => {
            behaviour.resetMaxLifeTime = value;
            updateBehaviours();
          }}
          checked={
            behaviour.resetMaxLifeTime ?? keysToInitialize.resetMaxLifeTime
          }
        />

        <BfSelect
          label="Path Type"
          defaultValue={behaviour.pathType || keysToInitialize.pathType}
          onChange={(value) => {
            behaviour.pathType = value;
            updateBehaviours();
          }}
          elements={predefinedPathType}
        />
        <BfInputNumber
          label="Sinusoidal Amplitude"
          id="color-sinusoidalAmplitude"
          value={
            behaviour.sinusoidalAmplitude ??
            keysToInitialize.pathAmplitudesinusoidalAmplitude
          }
          step="10"
          min="0"
          onChange={(value) => {
            behaviour.sinusoidalAmplitude = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Sinusoidal Frequency"
          id="color-sinusoidalFrequency"
          value={
            behaviour.sinusoidalFrequency ??
            keysToInitialize.sinusoidalFrequency
          }
          step="10"
          min="0"
          onChange={(value) => {
            behaviour.sinusoidalFrequency = value;
            updateBehaviours();
          }}
        />
        <BfSelect
          label="Ease"
          defaultValue={behaviour.pathEasing || keysToInitialize.pathEasing}
          onChange={(value) => {
            behaviour.pathEasing = value;
            updateBehaviours();
          }}
          elements={predefinedEase}
        />
        <BfInputNumber
          label="Speed"
          id="speed"
          value={behaviour.speed ?? keysToInitialize.speed}
          step="1"
          onChange={(value) => {
            behaviour.speed = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Arrival Threshold"
          id="arrivalThreshold"
          value={
            behaviour.arrivalThreshold ?? keysToInitialize.arrivalThreshold
          }
          step="1"
          onChange={(value) => {
            behaviour.arrivalThreshold = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Target Point"
          id="targetPoint"
          params={["x", "y"]}
          value={[
            behaviour.targetPoint.x ?? keysToInitialize.targetPoint.x,
            behaviour.targetPoint.y ?? keysToInitialize.targetPoint.y,
          ]}
          step="1"
          onChange={(value, id) => {
            behaviour.targetPoint[id] = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
