"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import Select from "@components/html/Select";
import VortexDescription from "@components/html/behaviourDescriptions/Vortex";
import { Point } from "pixi.js";
import pixiRefs from "@pixi/pixiRefs";

export default function VortexProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [isSelectingPosition, setIsSelectingPosition] = useState(false);
  const isSelectingPositionRef = useRef(false);

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "VortexBehaviour",
    enabled: false,
    priority: 110,
    center: { x: 0, y: 0 },
    strength: 1200,
    spiralDirection: "in",
    spiralStrength: 150,
    falloffPower: 1,
    minDistance: 1,
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

  const spiralOptions = [
    { key: "in", displayName: "In" },
    { key: "out", displayName: "Out" },
    { key: "none", displayName: "None" },
  ];

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>
        Vortex Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <VortexDescription />
        <Checkbox
          label="Enabled"
          id="vortex-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="vortex-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Vortex center"
          id="vortex-center"
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
          label="Strength"
          id="vortex-strength"
          value={behaviour.strength ?? keysToInitialize.strength}
          step="10"
          onChange={(value) => {
            behaviour.strength = value;
            updateBehaviours();
          }}
        />
        <Select
          label="Spiral Direction"
          defaultValue={behaviour.spiralDirection ?? keysToInitialize.spiralDirection}
          onChange={(value) => {
            behaviour.spiralDirection = value;
            updateBehaviours();
          }}
          elements={spiralOptions}
        />
        <InputNumber
          label="Spiral Strength"
          id="vortex-spiralStrength"
          value={behaviour.spiralStrength ?? keysToInitialize.spiralStrength}
          step="5"
          onChange={(value) => {
            behaviour.spiralStrength = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Falloff Power"
          id="vortex-falloffPower"
          value={behaviour.falloffPower ?? keysToInitialize.falloffPower}
          step="0.1"
          onChange={(value) => {
            behaviour.falloffPower = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Min Distance"
          id="vortex-minDistance"
          value={behaviour.minDistance ?? keysToInitialize.minDistance}
          step="1"
          min="0"
          onChange={(value) => {
            behaviour.minDistance = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
