"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import { Point } from "pixi.js-legacy";
import pixiRefs from "@pixi/pixiRefs";
import ColorPicker from "@components/html/ColorPicker";
import TemperatureDescription from "@components/html/behaviourDescriptions/Temperature";
import Checkbox from "@components/html/Checkbox";

export default function TemperatureProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [selectedPointIndex, setSelectedPointIndex] = useState(null);
  const selectedPointIndexRef = useRef(null);

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    enabled: false,
    priority: 0,
    zones: [
      {
        center: { x: -200, y: 200 },
        radius: 100,
        color: { r: 0, g: 255, b: 0, alpha: 1 },
        velocity: { x: 0.99, y: 0.99 },
      },
    ],
    name: "TemperatureBehaviour",
  };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);

  // Toggle submenu visibility
  const toggleSubmenuVisibility = useCallback(() => {
    setIsSubmenuVisible((prev) => (prev === "collapse" ? "" : "collapse"));
  }, []);

  const updateBehaviours = () => {
    defaultConfig.emitterConfig.behaviours[index] = behaviour;
    updateProps(
      "emitterConfig.behaviours",
      defaultConfig.emitterConfig.behaviours,
    );
  };

  useEffect(() => {
    const handleWindowClick = (event) => {
      if (selectedPointIndexRef.current !== null) {
        const localPosition = new Point(0, 0);
        pixiRefs.app.renderer.plugins.interaction.mapPositionToPoint(
          localPosition,
          event.clientX,
          event.clientY,
        );

        const newX = localPosition.x - pixiRefs.app.screen.width / 2;
        const newY = localPosition.y - pixiRefs.app.screen.height / 2;

        behaviour.zones[selectedPointIndexRef.current].center = {
          x: parseInt(newX),
          y: parseInt(newY),
        }; // Update the specific point

        setSelectedPointIndex(null);
        selectedPointIndexRef.current = null;

        updateBehaviours();
      }
    };

    window.addEventListener("click", handleWindowClick);

    // Cleanup event handlers
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, [defaultConfig]);

  const selectPoint = (index, event) => {
    event.stopPropagation();
    setSelectedPointIndex(index);
    selectedPointIndexRef.current = index;
  };

  const removeZone = (index, e) => {
    e.stopPropagation();
    setSelectedPointIndex(null);
    selectedPointIndexRef.current = null;
    behaviour.zones = behaviour.zones.filter((_, i) => i !== index);
    updateBehaviours();
  };

  const addZone = (e) => {
    e.stopPropagation();
    setSelectedPointIndex(null);
    selectedPointIndexRef.current = null;
    const newZone = {
      center: { x: -200, y: 200 },
      radius: 100,
      color: { r: 0, g: 255, b: 0, alpha: 1 },
      velocity: { x: 0.99, y: 0.99 },
    };
    behaviour.zones = [...behaviour.zones, newZone];
    updateBehaviours();
  };

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>Temperature Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        <TemperatureDescription />
        <Checkbox
          label="Enabled"
          id="angular-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="color-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          min="0"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <hr />
        {behaviour.zones &&
          behaviour.zones.map((zone, index) => (
            <Fragment key={index}>
              <br />
              <h1>Zone {index + 1}</h1>
              <InputNumber
                label="Center"
                id="center"
                params={["x", "y"]}
                value={[
                  zone.center.x ?? keysToInitialize.center.x,
                  zone.center.y ?? keysToInitialize.center.y,
                ]}
                step="1"
                onChange={(value, id) => {
                  zone.center[id] = value;
                  updateBehaviours();
                }}
              />
              <button
                className={
                  selectedPointIndex === index
                    ? "btn btn-default btn-block active"
                    : "btn btn-default btn-block"
                }
                onClick={(e) => selectPoint(index, e)}
              >
                Select Position
              </button>
              <InputNumber
                label="Radius"
                id="radius"
                value={zone.radius ?? keysToInitialize.radius}
                step="1"
                onChange={(value) => {
                  zone.radius = value;
                  updateBehaviours();
                }}
              />
              <InputNumber
                label="Velocity Modifier"
                id="velocity"
                params={["x", "y"]}
                value={[
                  zone.velocity.x ?? keysToInitialize.velocity.x,
                  zone.velocity.y ?? keysToInitialize.velocity.y,
                ]}
                step="1"
                onChange={(value, id) => {
                  zone.velocity[id] = value;
                  updateBehaviours();
                }}
              />
              <ColorPicker
                label="Color"
                color={{
                  r: zone.color.r,
                  g: zone.color.g,
                  b: zone.color.b,
                  a: zone.color.alpha,
                }}
                colorChanged={(color) => {
                  zone.color.r = color.rgb.r;
                  zone.color.g = color.rgb.g;
                  zone.color.b = color.rgb.b;
                  zone.color.alpha = color.rgb.a;
                  updateBehaviours();
                }}
              />
              <br />
              <button
                className="btn btn-default btn-block"
                onClick={(e) => removeZone(index, e)}
                style={{
                  backgroundImage:
                    "linear-gradient(rgb(71 11 11) 0px, rgb(136 13 13) 100%)",
                }}
              >
                Remove Point
              </button>
              <br />
              <hr />
            </Fragment>
          ))}
        <button
          className="btn btn-default btn-block"
          onClick={(e) => addZone(e)}
        >
          Add New Zone
        </button>
      </div>
    </>
  );
}
