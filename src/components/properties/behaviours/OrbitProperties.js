"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import OrbitDescription from "@components/html/behaviourDescriptions/Orbit";
import { Point } from "pixi.js-legacy";
import pixiRefs from "@pixi/pixiRefs";

export default function OrbitProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [isSelectingPosition, setIsSelectingPosition] = useState(false);
  const isSelectingPositionRef = useRef(false);

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "OrbitBehaviour",
    enabled: false,
    priority: 45,
    center: { x: 0, y: 0 },
    baseRadius: 100,
    radiusVariance: 0,
    angularSpeed: 1,
    spiralRate: 0,
    angleVariance: 6.283185307179586,
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
      behaviour.center = { x: Math.round(newX), y: Math.round(newY) };
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
    );
  };

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>
        Orbit Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <OrbitDescription />
        <Checkbox
          label="Enabled"
          id="orbit-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="orbit-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Orbit center"
          id="orbit-center"
          params={["x", "y"]}
          value={[
            behaviour.center?.x ?? keysToInitialize.center.x,
            behaviour.center?.y ?? keysToInitialize.center.y,
          ]}
          step="1"
          onChange={(value, id) => {
            behaviour.center[id] = value;
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
          label="Base Radius"
          id="orbit-baseRadius"
          value={behaviour.baseRadius ?? keysToInitialize.baseRadius}
          step="10"
          onChange={(value) => {
            behaviour.baseRadius = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Radius Variance"
          id="orbit-radiusVariance"
          value={behaviour.radiusVariance ?? keysToInitialize.radiusVariance}
          step="5"
          min="0"
          onChange={(value) => {
            behaviour.radiusVariance = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Angular Speed"
          id="orbit-angularSpeed"
          value={behaviour.angularSpeed ?? keysToInitialize.angularSpeed}
          step="0.1"
          onChange={(value) => {
            behaviour.angularSpeed = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Spiral Rate"
          id="orbit-spiralRate"
          value={behaviour.spiralRate ?? keysToInitialize.spiralRate}
          step="1"
          onChange={(value) => {
            behaviour.spiralRate = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Angle Variance"
          id="orbit-angleVariance"
          value={behaviour.angleVariance ?? keysToInitialize.angleVariance}
          step="0.1"
          onChange={(value) => {
            behaviour.angleVariance = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
