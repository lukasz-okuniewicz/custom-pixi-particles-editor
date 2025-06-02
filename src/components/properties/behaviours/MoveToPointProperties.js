"use client";

import { useCallback, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import MoveToPointDescription from "@components/html/behaviourDescriptions/MoveToPoint";

export default function MoveToPointProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "MoveToPointBehaviour",
    enabled: true, // Behaviour is enabled
    active: false, // Initially not active (particles move normally)
    targetPoint: { x: 0, y: 0 }, // Default target, can be updated later
    speed: 200, // Speed of movement towards the target
    priority: -10, // Ensures it runs after other position behaviours
    killOnArrival: true, // Set this to true
    resetMaxLifeTime: false, // Set this to true
    arrivalThreshold: 1.0, // Optional: Adjust if needed
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
        Move To Point Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <MoveToPointDescription />
        <Checkbox
          label="Enabled"
          id="move-to-point-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <Checkbox
          label="Active"
          id="move-to-point-active"
          onChange={(value) => {
            behaviour.active = value;
            updateBehaviours();
          }}
          checked={behaviour.active ?? keysToInitialize.active}
        />
        <Checkbox
          label="Kill On Arrival"
          id="move-to-point-killOnArrival"
          onChange={(value) => {
            behaviour.killOnArrival = value;
            updateBehaviours();
          }}
          checked={behaviour.killOnArrival ?? keysToInitialize.killOnArrival}
        />
        <Checkbox
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
        <InputNumber
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
        <InputNumber
          label="Speed"
          id="speed"
          value={behaviour.speed ?? keysToInitialize.speed}
          step="1"
          onChange={(value) => {
            behaviour.speed = value;
            updateBehaviours();
          }}
        />
        <InputNumber
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
        <InputNumber
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
