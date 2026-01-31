"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import ConversionCascadeDescription from "@components/html/behaviourDescriptions/ConversionCascade";
import { Point } from "pixi.js-legacy";
import pixiRefs from "@pixi/pixiRefs";

export default function ConversionCascadeProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [selectingPosition, setSelectingPosition] = useState(null);
  const selectingPositionRef = useRef(null);

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "ConversionCascadeBehaviour",
    enabled: false,
    priority: -10,
    active: false,
    source: { x: 400, y: 500 },
    target: { x: 400, y: 100 },
    speed: 200,
    killOnArrival: true,
    arrivalThreshold: 5,
  };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);

  const toggleSubmenuVisibility = useCallback(() => {
    setIsSubmenuVisible((prev) => (prev === "collapse" ? "" : "collapse"));
  }, []);

  useEffect(() => {
    const handleWindowClick = (event) => {
      const which = selectingPositionRef.current;
      if (which !== "source" && which !== "target") return;
      const localPosition = new Point(0, 0);
      pixiRefs.app.renderer.plugins.interaction.mapPositionToPoint(
        localPosition,
        event.clientX,
        event.clientY,
      );
      const newX = localPosition.x - pixiRefs.app.screen.width / 2;
      const newY = localPosition.y - pixiRefs.app.screen.height / 2;
      behaviour[which] = { x: Math.round(newX), y: Math.round(newY) };
      setSelectingPosition(null);
      selectingPositionRef.current = null;
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
        Conversion Cascade Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <ConversionCascadeDescription />
        <Checkbox
          label="Enabled"
          id="conversionCascade-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <Checkbox
          label="Active (Trigger Flow)"
          id="conversionCascade-active"
          onChange={(value) => {
            behaviour.active = value;
            updateBehaviours();
          }}
          checked={behaviour.active ?? keysToInitialize.active}
        />
        <InputNumber
          label="Source"
          id="conversionCascade-source"
          params={["x", "y"]}
          value={[
            behaviour.source?.x ?? keysToInitialize.source.x,
            behaviour.source?.y ?? keysToInitialize.source.y,
          ]}
          step="1"
          onChange={(value, id) => {
            behaviour.source[id] = value;
            updateBehaviours();
          }}
        />
        <button
          className={
            selectingPosition === "source"
              ? "btn btn-default btn-block active"
              : "btn btn-default btn-block"
          }
          onClick={(e) => {
            e.stopPropagation();
            setSelectingPosition("source");
            selectingPositionRef.current = "source";
          }}
        >
          Select Position
        </button>
        <InputNumber
          label="Target"
          id="conversionCascade-target"
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
            selectingPosition === "target"
              ? "btn btn-default btn-block active"
              : "btn btn-default btn-block"
          }
          onClick={(e) => {
            e.stopPropagation();
            setSelectingPosition("target");
            selectingPositionRef.current = "target";
          }}
        >
          Select Position
        </button>
        <InputNumber
          label="Speed"
          id="conversionCascade-speed"
          value={behaviour.speed ?? keysToInitialize.speed}
          step="10"
          onChange={(value) => {
            behaviour.speed = value;
            updateBehaviours();
          }}
        />
        <Checkbox
          label="Kill On Arrival"
          id="conversionCascade-killOnArrival"
          onChange={(value) => {
            behaviour.killOnArrival = value;
            updateBehaviours();
          }}
          checked={behaviour.killOnArrival ?? keysToInitialize.killOnArrival}
        />
        <InputNumber
          label="Arrival Threshold"
          id="conversionCascade-arrivalThreshold"
          value={
            behaviour.arrivalThreshold ?? keysToInitialize.arrivalThreshold
          }
          step="1"
          min="0"
          onChange={(value) => {
            behaviour.arrivalThreshold = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
