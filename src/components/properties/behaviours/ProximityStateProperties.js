"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import ProximityStateDescription from "@components/html/behaviourDescriptions/ProximityState";
import { Point } from "pixi.js";
import pixiRefs from "@pixi/pixiRefs";

export default function ProximityStateProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [isSelectingPosition, setIsSelectingPosition] = useState(false);
  const isSelectingPositionRef = useRef(false);

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "ProximityStateBehaviour",
    enabled: false,
    priority: 220,
    target: { x: 0, y: 0 },
    nearRadius: 120,
    wanderStrength: 180,
    wanderPhaseSpeed: 2,
    seekStrength: 1.0,
    seekMaxSpeed: 300,
    arrivalRadius: 30,
    writeStateForColor: true,
    writeDistanceForVisual: true,
  };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);

  const toggleSubmenuVisibility = useCallback(() => {
    setIsSubmenuVisible((prev) => (prev === "collapse" ? "" : "collapse"));
  }, []);

  useEffect(() => {
    const handleWindowClick = (event) => {
      if (!isSelectingPositionRef.current) return;
      const localPosition = new Point(0, 0);
      pixiRefs.app.renderer.events.mapPositionToPoint(
        localPosition,
        event.clientX,
        event.clientY,
      );
      const newX = localPosition.x - pixiRefs.app.screen.width / 2;
      const newY = localPosition.y - pixiRefs.app.screen.height / 2;
      behaviour.target = { x: Math.round(newX), y: Math.round(newY) };
      setIsSelectingPosition(false);
      isSelectingPositionRef.current = false;
      updateBehaviours();
    };
    window.addEventListener("click", handleWindowClick);
    return () => window.removeEventListener("click", handleWindowClick);
  }, [defaultConfig]);

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
        Proximity State Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <ProximityStateDescription />
        <Checkbox
          label="Enabled"
          id="proximity-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="proximity-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Target"
          id="proximity-target"
          params={["x", "y"]}
          value={[
            behaviour.target?.x ?? keysToInitialize.target.x,
            behaviour.target?.y ?? keysToInitialize.target.y,
          ]}
          step="1"
          onChange={(value, id) => {
            behaviour.target[id] = value;
            updateBehaviours();
          }}
        />
        <button
          className={
            isSelectingPosition
              ? "btn btn-default btn-block active"
              : "btn btn-default btn-block"
          }
          onClick={(e) => {
            e.stopPropagation();
            setIsSelectingPosition(true);
            isSelectingPositionRef.current = true;
          }}
        >
          Select Position
        </button>
        <InputNumber
          label="Near Radius"
          id="proximity-nearRadius"
          value={behaviour.nearRadius ?? keysToInitialize.nearRadius}
          step="1"
          min="0"
          onChange={(value) => {
            behaviour.nearRadius = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Wander Strength"
          id="proximity-wanderStrength"
          value={behaviour.wanderStrength ?? keysToInitialize.wanderStrength}
          step="5"
          onChange={(value) => {
            behaviour.wanderStrength = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Wander Phase Speed"
          id="proximity-wanderPhaseSpeed"
          value={
            behaviour.wanderPhaseSpeed ?? keysToInitialize.wanderPhaseSpeed
          }
          step="0.1"
          onChange={(value) => {
            behaviour.wanderPhaseSpeed = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Seek Strength"
          id="proximity-seekStrength"
          value={behaviour.seekStrength ?? keysToInitialize.seekStrength}
          step="0.1"
          onChange={(value) => {
            behaviour.seekStrength = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Seek Max Speed"
          id="proximity-seekMaxSpeed"
          value={behaviour.seekMaxSpeed ?? keysToInitialize.seekMaxSpeed}
          step="10"
          onChange={(value) => {
            behaviour.seekMaxSpeed = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Arrival Radius"
          id="proximity-arrivalRadius"
          value={behaviour.arrivalRadius ?? keysToInitialize.arrivalRadius}
          step="1"
          min="0"
          onChange={(value) => {
            behaviour.arrivalRadius = value;
            updateBehaviours();
          }}
        />
        <Checkbox
          label="Write State For Color"
          id="proximity-writeStateForColor"
          onChange={(value) => {
            behaviour.writeStateForColor = value;
            updateBehaviours();
          }}
          checked={
            behaviour.writeStateForColor ?? keysToInitialize.writeStateForColor
          }
        />
        <Checkbox
          label="Write Distance For Visual"
          id="proximity-writeDistanceForVisual"
          onChange={(value) => {
            behaviour.writeDistanceForVisual = value;
            updateBehaviours();
          }}
          checked={
            behaviour.writeDistanceForVisual ??
            keysToInitialize.writeDistanceForVisual
          }
        />
      </div>
    </>
  );
}
