"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import InputNumber from "@components/html/InputNumber";
import ColorPicker from "@components/html/ColorPicker";
import { Point } from "pixi.js-legacy";
import pixiRefs from "@pixi/pixiRefs";
import LightEffectDescription from "@components/html/behaviourDescriptions/LightEffect";

export default function LightEffectProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [selectedPositionIndex, setSelectedPositionIndex] = useState(null);
  const selectedPositionIndexRef = useRef(null);

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    enabled: false,
    priority: 100,
    lightSource: { x: 0, y: 0 },
    lightIntensity: 1,
    lightColor: { r: 255, g: 255, b: 255 },
    attenuationFactor: 0.005,
    ambientLight: 0.3,
    directionalLight: false,
    direction: { x: 0, y: 0 },
    spreadAngle: 0.5,
    volumetricLight: true,
    volumetricIntensity: 1.2,
    fogDensity: 0.01,

    lightPulsation: false,
    pulsationSpeed: 1,
    pulsationAmplitude: 0.2,
    flicker: false,
    flickerIntensity: 0.2,
    lightTrails: false,
    trailFadeSpeed: 0.05,
    spotlight: false,
    beamCutoff: 0.8,
    name: "LightEffectBehaviour",
  };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);

  // Toggle submenu visibility
  const toggleSubmenuVisibility = useCallback(() => {
    setIsSubmenuVisible((prev) => (prev === "collapse" ? "" : "collapse"));
  }, []);

  useEffect(() => {
    const handleWindowClick = (event) => {
      if (selectedPositionIndexRef.current !== null) {
        const localPosition = new Point(0, 0);
        pixiRefs.app.renderer.plugins.interaction.mapPositionToPoint(
          localPosition,
          event.clientX,
          event.clientY,
        );

        const newX = localPosition.x - pixiRefs.app.screen.width / 2;
        const newY = localPosition.y - pixiRefs.app.screen.height / 2;

        behaviour.lightSource = {
          x: parseInt(newX),
          y: parseInt(newY),
        }; // Update the specific point

        setSelectedPositionIndex(null);
        selectedPositionIndexRef.current = null;

        updateBehaviours();
      }
    };

    window.addEventListener("click", handleWindowClick);

    // Cleanup event handlers
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, [defaultConfig]);

  const selectPosition = (index, event) => {
    event.stopPropagation();
    setSelectedPositionIndex(index);
    selectedPositionIndexRef.current = index;
  };

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
      <legend onClick={toggleSubmenuVisibility}>Light Effect Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        <LightEffectDescription />
        <Checkbox
          label="Enabled"
          id="emit-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? false}
        />
        <InputNumber
          label="Priority"
          id="emit-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          min="0"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Light Position"
          id="lightSource"
          params={["x", "y"]}
          value={[
            behaviour.lightSource.x ?? keysToInitialize.lightSource.x,
            behaviour.lightSource.y ?? keysToInitialize.lightSource.y,
          ]}
          step="1"
          onChange={(value, id) => {
            behaviour.lightSource[id] = value;
            updateBehaviours();
          }}
        />
        <button
          className={
            selectedPositionIndex === index
              ? "btn btn-default btn-block active"
              : "btn btn-default btn-block"
          }
          onClick={(e) => selectPosition(index, e)}
        >
          Select Position
        </button>
        {!behaviour.volumetricLight && (
          <>
            <InputNumber
              label="Light Intensity"
              id="lightIntensity"
              value={
                behaviour.lightIntensity ?? keysToInitialize.lightIntensity
              }
              step="1"
              onChange={(value) => {
                behaviour.lightIntensity = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Attenuation Factor"
              id="attenuationFactor"
              value={
                behaviour.attenuationFactor ??
                keysToInitialize.attenuationFactor
              }
              step="1"
              onChange={(value) => {
                behaviour.attenuationFactor = value;
                updateBehaviours();
              }}
            />
          </>
        )}

        <InputNumber
          label="Ambient Light"
          id="ambientLight"
          value={behaviour.ambientLight ?? keysToInitialize.ambientLight}
          step="0.1"
          onChange={(value) => {
            behaviour.ambientLight = value;
            updateBehaviours();
          }}
        />
        <ColorPicker
          label="Light Color"
          color={{
            r: behaviour.lightColor.r ?? keysToInitialize.lightColor.r,
            g: behaviour.lightColor.g ?? keysToInitialize.lightColor.g,
            b: behaviour.lightColor.b ?? keysToInitialize.lightColor.b,
            a: 1,
          }}
          colorChanged={(color) => {
            behaviour.lightColor.r = color.rgb.r;
            behaviour.lightColor.g = color.rgb.g;
            behaviour.lightColor.b = color.rgb.b;
            updateBehaviours();
          }}
        />
        <Checkbox
          label="Directional Light"
          id="directionalLight"
          onChange={(value) => {
            behaviour.directionalLight = value;
            updateBehaviours();
          }}
          checked={
            behaviour.directionalLight ?? keysToInitialize.directionalLight
          }
        />
        {behaviour.directionalLight && (
          <>
            <InputNumber
              label="Direction"
              id="direction"
              params={["x", "y"]}
              value={[
                behaviour.direction.x ?? keysToInitialize.direction.x,
                behaviour.direction.y ?? keysToInitialize.direction.y,
              ]}
              step="1"
              onChange={(value, id) => {
                behaviour.direction[id] = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Spread Angle"
              id="spreadAngle"
              value={behaviour.spreadAngle ?? keysToInitialize.spreadAngle}
              step="0.1"
              onChange={(value) => {
                behaviour.spreadAngle = value;
                updateBehaviours();
              }}
            />
          </>
        )}
        <Checkbox
          label="Volumetric Light"
          id="volumetricLight"
          onChange={(value) => {
            behaviour.volumetricLight = value;
            updateBehaviours();
          }}
          checked={
            behaviour.volumetricLight ?? keysToInitialize.volumetricLight
          }
        />
        {behaviour.volumetricLight && (
          <>
            <InputNumber
              label="Volumetric Intensity"
              id="volumetricIntensity"
              value={
                behaviour.volumetricIntensity ??
                keysToInitialize.volumetricIntensity
              }
              step="0.1"
              onChange={(value) => {
                behaviour.volumetricIntensity = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Fog Density"
              id="fogDensity"
              value={behaviour.fogDensity ?? keysToInitialize.fogDensity}
              step="0.001"
              onChange={(value) => {
                behaviour.fogDensity = value;
                updateBehaviours();
              }}
            />
          </>
        )}
      </div>
    </>
  );
}
