"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import ProximityTriggeredPhaseDescription from "@components/html/behaviourDescriptions/ProximityTriggeredPhase";
import { Point } from "pixi.js-legacy";
import pixiRefs from "@pixi/pixiRefs";

export default function ProximityTriggeredPhaseProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [isSelectingPosition, setIsSelectingPosition] = useState(false);
  const isSelectingPositionRef = useRef(false);

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "ProximityTriggeredPhaseBehaviour",
    enabled: false,
    priority: 218,
    triggerPos: { x: 0, y: 0 },
    triggerRadius: 150,
    orbitStrength: 0.5,
    orbitPhaseSpeed: 1,
    escapeStrength: 15,
    jitterStrength: 5,
    stateSmoothEdge: 1,
    writeStateForColor: true,
  };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);

  const toggleSubmenuVisibility = useCallback(() => {
    setIsSubmenuVisible((prev) => (prev === "collapse" ? "" : "collapse"));
  }, []);

  useEffect(() => {
    const handleWindowClick = (event) => {
      if (!isSelectingPositionRef.current) return;
      const localPosition = new Point(0, 0);
      pixiRefs.app.renderer.plugins.interaction.mapPositionToPoint(
        localPosition,
        event.clientX,
        event.clientY,
      );
      const newX = localPosition.x - pixiRefs.app.screen.width / 2;
      const newY = localPosition.y - pixiRefs.app.screen.height / 2;
      behaviour.triggerPos = { x: Math.round(newX), y: Math.round(newY) };
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

  const triggerPos = behaviour.triggerPos ?? keysToInitialize.triggerPos;

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>
        Proximity Triggered Phase Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <ProximityTriggeredPhaseDescription />
        <Checkbox
          label="Enabled"
          id="proxtrig-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="proxtrig-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Trigger"
          id="proxtrig-triggerPos"
          params={["x", "y"]}
          value={[triggerPos.x ?? 0, triggerPos.y ?? 0]}
          step="1"
          onChange={(value, id) => {
            behaviour.triggerPos = { ...triggerPos, [id]: value };
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
          label="Trigger Radius"
          id="proxtrig-triggerRadius"
          value={behaviour.triggerRadius ?? keysToInitialize.triggerRadius}
          step="5"
          min="0"
          onChange={(value) => {
            behaviour.triggerRadius = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Orbit Strength"
          id="proxtrig-orbitStrength"
          value={behaviour.orbitStrength ?? keysToInitialize.orbitStrength}
          step="0.1"
          onChange={(value) => {
            behaviour.orbitStrength = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Orbit Phase Speed"
          id="proxtrig-orbitPhaseSpeed"
          value={behaviour.orbitPhaseSpeed ?? keysToInitialize.orbitPhaseSpeed}
          step="0.1"
          onChange={(value) => {
            behaviour.orbitPhaseSpeed = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Escape Strength"
          id="proxtrig-escapeStrength"
          value={behaviour.escapeStrength ?? keysToInitialize.escapeStrength}
          step="1"
          onChange={(value) => {
            behaviour.escapeStrength = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Jitter Strength"
          id="proxtrig-jitterStrength"
          value={behaviour.jitterStrength ?? keysToInitialize.jitterStrength}
          step="0.5"
          onChange={(value) => {
            behaviour.jitterStrength = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="State Smooth Edge"
          id="proxtrig-stateSmoothEdge"
          value={behaviour.stateSmoothEdge ?? keysToInitialize.stateSmoothEdge}
          step="0.1"
          min="0.01"
          max="1"
          onChange={(value) => {
            behaviour.stateSmoothEdge = value;
            updateBehaviours();
          }}
        />
        <Checkbox
          label="Write State For Color"
          id="proxtrig-writeStateForColor"
          onChange={(value) => {
            behaviour.writeStateForColor = value;
            updateBehaviours();
          }}
          checked={behaviour.writeStateForColor ?? keysToInitialize.writeStateForColor}
        />
      </div>
    </>
  );
}
