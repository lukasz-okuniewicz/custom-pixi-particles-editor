"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import RippleDescription from "@components/html/behaviourDescriptions/Ripple";
import { Point } from "pixi.js-legacy";
import pixiRefs from "@pixi/pixiRefs";

export default function RippleProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [isSelectingPosition, setIsSelectingPosition] = useState(false);
  const isSelectingPositionRef = useRef(false);

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "RippleBehaviour",
    enabled: false,
    priority: 55,
    origin: { x: 0, y: 0 },
    waveSpeed: 200,
    wavelength: 80,
    amplitude: 15,
    decayWithDistance: true,
    decayFactor: 0.002,
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
      behaviour.origin = { x: Math.round(newX), y: Math.round(newY) };
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
        Ripple Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <RippleDescription />
        <Checkbox
          label="Enabled"
          id="ripple-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="ripple-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Origin"
          id="ripple-origin"
          params={["x", "y"]}
          value={[
            behaviour.origin?.x ?? keysToInitialize.origin.x,
            behaviour.origin?.y ?? keysToInitialize.origin.y,
          ]}
          step="1"
          onChange={(value, id) => {
            behaviour.origin[id] = value;
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
          label="Wave Speed"
          id="ripple-waveSpeed"
          value={behaviour.waveSpeed ?? keysToInitialize.waveSpeed}
          step="10"
          onChange={(value) => {
            behaviour.waveSpeed = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Wavelength"
          id="ripple-wavelength"
          value={behaviour.wavelength ?? keysToInitialize.wavelength}
          step="5"
          onChange={(value) => {
            behaviour.wavelength = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Amplitude"
          id="ripple-amplitude"
          value={behaviour.amplitude ?? keysToInitialize.amplitude}
          step="1"
          onChange={(value) => {
            behaviour.amplitude = value;
            updateBehaviours();
          }}
        />
        <Checkbox
          label="Decay With Distance"
          id="ripple-decayWithDistance"
          onChange={(value) => {
            behaviour.decayWithDistance = value;
            updateBehaviours();
          }}
          checked={behaviour.decayWithDistance ?? keysToInitialize.decayWithDistance}
        />
        <InputNumber
          label="Decay Factor"
          id="ripple-decayFactor"
          value={behaviour.decayFactor ?? keysToInitialize.decayFactor}
          step="0.001"
          onChange={(value) => {
            behaviour.decayFactor = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
