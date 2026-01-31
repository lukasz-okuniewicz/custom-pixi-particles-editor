"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import HomingDescription from "@components/html/behaviourDescriptions/Homing";
import { Point } from "pixi.js";
import pixiRefs from "@pixi/pixiRefs";

export default function HomingProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [isSelectingPosition, setIsSelectingPosition] = useState(false);
  const isSelectingPositionRef = useRef(false);

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "HomingBehaviour",
    enabled: false,
    priority: 200,
    target: { x: 0, y: 0 },
    strength: 5,
    maxSpeed: 0,
    delay: 0,
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
    );
  };

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>
        Homing Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <HomingDescription />
        <Checkbox
          label="Enabled"
          id="homing-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="homing-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Target"
          id="homing-target"
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
          label="Strength"
          id="homing-strength"
          value={behaviour.strength ?? keysToInitialize.strength}
          step="0.5"
          onChange={(value) => {
            behaviour.strength = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Max Speed"
          id="homing-maxSpeed"
          value={behaviour.maxSpeed ?? keysToInitialize.maxSpeed}
          step="10"
          min="0"
          onChange={(value) => {
            behaviour.maxSpeed = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Delay (s)"
          id="homing-delay"
          value={behaviour.delay ?? keysToInitialize.delay}
          step="0.1"
          min="0"
          onChange={(value) => {
            behaviour.delay = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
