"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import Select from "@components/html/Select";
import ConstrainToShapeDescription from "@components/html/behaviourDescriptions/ConstrainToShape";
import { Point } from "pixi.js";
import pixiRefs from "@pixi/pixiRefs";

export default function ConstrainToShapeProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [isSelectingPosition, setIsSelectingPosition] = useState(false);
  const isSelectingPositionRef = useRef(false);

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "ConstrainToShapeBehaviour",
    enabled: false,
    priority: 40,
    shapeType: "circle",
    center: { x: 0, y: 0 },
    radius: 200,
    halfWidth: 150,
    halfHeight: 100,
    softness: 0.5,
    bounce: false,
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

  const shapeOptions = [
    { key: "circle", displayName: "Circle" },
    { key: "rectangle", displayName: "Rectangle" },
  ];

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>
        Constrain To Shape Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <ConstrainToShapeDescription />
        <Checkbox
          label="Enabled"
          id="constrain-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="constrain-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <Select
          label="Shape Type"
          defaultValue={behaviour.shapeType ?? keysToInitialize.shapeType}
          onChange={(value) => {
            behaviour.shapeType = value;
            updateBehaviours();
          }}
          elements={shapeOptions}
        />
        <InputNumber
          label="Shape center"
          id="constrain-center"
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
        {behaviour.shapeType === "circle" && (
          <InputNumber
            label="Radius"
            id="constrain-radius"
            value={behaviour.radius ?? keysToInitialize.radius}
            step="10"
            onChange={(value) => {
              behaviour.radius = value;
              updateBehaviours();
            }}
          />
        )}
        {behaviour.shapeType === "rectangle" && (
          <>
            <InputNumber
              label="Half Width"
              id="constrain-halfWidth"
              value={behaviour.halfWidth ?? keysToInitialize.halfWidth}
              step="10"
              onChange={(value) => {
                behaviour.halfWidth = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Half Height"
              id="constrain-halfHeight"
              value={behaviour.halfHeight ?? keysToInitialize.halfHeight}
              step="10"
              onChange={(value) => {
                behaviour.halfHeight = value;
                updateBehaviours();
              }}
            />
          </>
        )}
        <InputNumber
          label="Softness"
          id="constrain-softness"
          value={behaviour.softness ?? keysToInitialize.softness}
          step="0.1"
          min="0"
          max="1"
          onChange={(value) => {
            behaviour.softness = value;
            updateBehaviours();
          }}
        />
        <Checkbox
          label="Bounce"
          id="constrain-bounce"
          onChange={(value) => {
            behaviour.bounce = value;
            updateBehaviours();
          }}
          checked={behaviour.bounce ?? keysToInitialize.bounce}
        />
      </div>
    </>
  );
}
