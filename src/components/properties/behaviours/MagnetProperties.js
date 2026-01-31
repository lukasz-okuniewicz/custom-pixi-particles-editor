"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import MagnetDescription from "@components/html/behaviourDescriptions/Magnet";
import { Point } from "pixi.js";
import pixiRefs from "@pixi/pixiRefs";

export default function MagnetProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [isSelectingPosition, setIsSelectingPosition] = useState(false);
  const isSelectingPositionRef = useRef(false);

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "MagnetBehaviour",
    enabled: false,
    priority: 200,
    center: { x: 0, y: 0 },
    radius: 150,
    strength: 400,
    falloffExponent: 1,
    maxSpeed: 500,
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
        Magnet Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <MagnetDescription />
        <Checkbox
          label="Enabled"
          id="magnet-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="magnet-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Magnet center"
          id="magnet-center"
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
          label="Radius"
          id="magnet-radius"
          value={behaviour.radius ?? keysToInitialize.radius}
          step="10"
          onChange={(value) => {
            behaviour.radius = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Strength"
          id="magnet-strength"
          value={behaviour.strength ?? keysToInitialize.strength}
          step="20"
          onChange={(value) => {
            behaviour.strength = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Falloff Exponent"
          id="magnet-falloffExponent"
          value={behaviour.falloffExponent ?? keysToInitialize.falloffExponent}
          step="0.1"
          onChange={(value) => {
            behaviour.falloffExponent = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Max Speed"
          id="magnet-maxSpeed"
          value={behaviour.maxSpeed ?? keysToInitialize.maxSpeed}
          step="10"
          min="0"
          onChange={(value) => {
            behaviour.maxSpeed = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
