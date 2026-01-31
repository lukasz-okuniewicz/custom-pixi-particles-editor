"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import GravityWellDescription from "@components/html/behaviourDescriptions/GravityWell";
import { Point } from "pixi.js";
import pixiRefs from "@pixi/pixiRefs";

export default function GravityWellProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [isSelectingPosition, setIsSelectingPosition] = useState(false);
  const isSelectingPositionRef = useRef(false);

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "GravityWellBehaviour",
    enabled: false,
    priority: 48,
    center: { x: 0, y: 0 },
    strength: 500,
    falloffExponent: 2,
    maxSpeed: 800,
    killRadius: 0,
    killOnEnter: false,
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

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>
        Gravity Well Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <GravityWellDescription />
        <Checkbox
          label="Enabled"
          id="gravityWell-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="gravityWell-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Well center"
          id="gravityWell-center"
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
          id="gravityWell-strength"
          value={behaviour.strength ?? keysToInitialize.strength}
          step="10"
          onChange={(value) => {
            behaviour.strength = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Falloff Exponent"
          id="gravityWell-falloffExponent"
          value={behaviour.falloffExponent ?? keysToInitialize.falloffExponent}
          step="0.1"
          onChange={(value) => {
            behaviour.falloffExponent = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Max Speed"
          id="gravityWell-maxSpeed"
          value={behaviour.maxSpeed ?? keysToInitialize.maxSpeed}
          step="10"
          min="0"
          onChange={(value) => {
            behaviour.maxSpeed = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Kill Radius"
          id="gravityWell-killRadius"
          value={behaviour.killRadius ?? keysToInitialize.killRadius}
          step="10"
          min="0"
          onChange={(value) => {
            behaviour.killRadius = value;
            updateBehaviours();
          }}
        />
        <Checkbox
          label="Kill On Enter"
          id="gravityWell-killOnEnter"
          onChange={(value) => {
            behaviour.killOnEnter = value;
            updateBehaviours();
          }}
          checked={behaviour.killOnEnter ?? keysToInitialize.killOnEnter}
        />
        <InputNumber
          label="Min Distance"
          id="gravityWell-minDistance"
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
