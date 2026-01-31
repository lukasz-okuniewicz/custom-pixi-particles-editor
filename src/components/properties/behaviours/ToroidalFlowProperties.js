"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import ToroidalFlowDescription from "@components/html/behaviourDescriptions/ToroidalFlow";
import { Point } from "pixi.js-legacy";
import pixiRefs from "@pixi/pixiRefs";

export default function ToroidalFlowProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [isSelectingPosition, setIsSelectingPosition] = useState(false);
  const isSelectingPositionRef = useRef(false);

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "ToroidalFlowBehaviour",
    enabled: false,
    priority: 80,
    center: { x: 0, y: 0 },
    majorRadius: 120,
    minorRadius: 40,
    majorSpeed: 1,
    minorSpeed: 2.5,
    strength: 1,
    writeSurfaceDistForVisual: true,
    surfaceDistFalloff: 30,
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
      null,
      true,
    );
  };

  const center = behaviour.center ?? keysToInitialize.center;

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>
        Toroidal Flow Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <ToroidalFlowDescription />
        <Checkbox
          label="Enabled"
          id="toroidal-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="toroidal-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Torus center"
          id="toroidal-center"
          params={["x", "y"]}
          value={[center.x ?? 0, center.y ?? 0]}
          step="1"
          onChange={(value, id) => {
            behaviour.center = { ...center, [id]: value };
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
          label="Major Radius"
          id="toroidal-majorRadius"
          value={behaviour.majorRadius ?? keysToInitialize.majorRadius}
          step="1"
          min="0"
          onChange={(value) => {
            behaviour.majorRadius = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Minor Radius"
          id="toroidal-minorRadius"
          value={behaviour.minorRadius ?? keysToInitialize.minorRadius}
          step="1"
          min="0"
          onChange={(value) => {
            behaviour.minorRadius = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Major Speed"
          id="toroidal-majorSpeed"
          value={behaviour.majorSpeed ?? keysToInitialize.majorSpeed}
          step="0.1"
          onChange={(value) => {
            behaviour.majorSpeed = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Minor Speed"
          id="toroidal-minorSpeed"
          value={behaviour.minorSpeed ?? keysToInitialize.minorSpeed}
          step="0.1"
          onChange={(value) => {
            behaviour.minorSpeed = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Strength"
          id="toroidal-strength"
          value={behaviour.strength ?? keysToInitialize.strength}
          step="0.1"
          onChange={(value) => {
            behaviour.strength = value;
            updateBehaviours();
          }}
        />
        <Checkbox
          label="Write Surface Dist For Visual"
          id="toroidal-writeSurfaceDistForVisual"
          onChange={(value) => {
            behaviour.writeSurfaceDistForVisual = value;
            updateBehaviours();
          }}
          checked={behaviour.writeSurfaceDistForVisual ?? keysToInitialize.writeSurfaceDistForVisual}
        />
        <InputNumber
          label="Surface Dist Falloff"
          id="toroidal-surfaceDistFalloff"
          value={behaviour.surfaceDistFalloff ?? keysToInitialize.surfaceDistFalloff}
          step="1"
          min="1"
          onChange={(value) => {
            behaviour.surfaceDistFalloff = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
