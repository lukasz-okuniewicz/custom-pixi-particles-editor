"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import Select from "@components/html/Select";
import BounceDescription from "@components/html/behaviourDescriptions/Bounce";
import { Point } from "pixi.js-legacy";
import pixiRefs from "@pixi/pixiRefs";

export default function BounceProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [isSelectingPosition, setIsSelectingPosition] = useState(false);
  const isSelectingPositionRef = useRef(false);

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "BounceBehaviour",
    enabled: false,
    priority: 50,
    mode: "rectangle",
    minX: -400,
    maxX: 400,
    minY: -300,
    maxY: 300,
    center: { x: 0, y: 0 },
    radius: 300,
    bounciness: 1,
    maxBounces: -1,
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

  const modeOptions = [
    { key: "rectangle", displayName: "Rectangle" },
    { key: "circle", displayName: "Circle" },
  ];

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>
        Bounce Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <BounceDescription />
        <Checkbox
          label="Enabled"
          id="bounce-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="bounce-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <Select
          label="Mode"
          defaultValue={behaviour.mode ?? keysToInitialize.mode}
          onChange={(value) => {
            behaviour.mode = value;
            updateBehaviours();
          }}
          elements={modeOptions}
        />
        {behaviour.mode === "rectangle" && (
          <>
            <InputNumber
              label="Min X"
              id="bounce-minX"
              value={behaviour.minX ?? keysToInitialize.minX}
              step="10"
              onChange={(value) => {
                behaviour.minX = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Max X"
              id="bounce-maxX"
              value={behaviour.maxX ?? keysToInitialize.maxX}
              step="10"
              onChange={(value) => {
                behaviour.maxX = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Min Y"
              id="bounce-minY"
              value={behaviour.minY ?? keysToInitialize.minY}
              step="10"
              onChange={(value) => {
                behaviour.minY = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Max Y"
              id="bounce-maxY"
              value={behaviour.maxY ?? keysToInitialize.maxY}
              step="10"
              onChange={(value) => {
                behaviour.maxY = value;
                updateBehaviours();
              }}
            />
          </>
        )}
        {behaviour.mode === "circle" && (
          <>
            <InputNumber
              label="Circle center"
              id="bounce-center"
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
              id="bounce-radius"
              value={behaviour.radius ?? keysToInitialize.radius}
              step="10"
              onChange={(value) => {
                behaviour.radius = value;
                updateBehaviours();
              }}
            />
          </>
        )}
        <InputNumber
          label="Bounciness"
          id="bounce-bounciness"
          value={behaviour.bounciness ?? keysToInitialize.bounciness}
          step="0.1"
          min="0"
          max="1"
          onChange={(value) => {
            behaviour.bounciness = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Max Bounces"
          id="bounce-maxBounces"
          value={behaviour.maxBounces ?? keysToInitialize.maxBounces}
          step="1"
          onChange={(value) => {
            behaviour.maxBounces = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
