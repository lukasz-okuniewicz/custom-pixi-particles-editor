"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import InputNumber from "@components/html/InputNumber";
import { Point } from "pixi.js";
import pixiRefs from "@pixi/pixiRefs";
import AttractionRepulsionDescription from "@components/html/behaviourDescriptions/AttractionRepulsion";

export default function AttractionRepulsionProperties({
  defaultConfig,
  index,
}) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [selectedPointIndex, setSelectedPointIndex] = useState(null);
  const selectedPointIndexRef = useRef(null);

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    priority: 200,
    enabled: false,
    influencePoints: [],
    name: "AttractionRepulsionBehaviour",
  };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);

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

        behaviour.influencePoints[selectedPointIndexRef.current].point = {
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

  const addPoint = (e) => {
    e.stopPropagation();
    setSelectedPointIndex(null);
    selectedPointIndexRef.current = null;
    const newPoint = { point: { x: 0, y: 0 }, strength: 1000, range: 200 }; // Default values for new point
    behaviour.influencePoints = [...behaviour.influencePoints, newPoint];
    updateBehaviours();
  };

  const updatePoint = (index, updatedValue, id) => {
    behaviour.influencePoints[index].point[id] = updatedValue;
    updateBehaviours();
  };

  const updateStrength = (index, updatedValue) => {
    behaviour.influencePoints[index].strength = updatedValue;
    updateBehaviours();
  };

  const updateRange = (index, updatedValue) => {
    behaviour.influencePoints[index].range = updatedValue;
    updateBehaviours();
  };

  const selectPoint = (index, event) => {
    event.stopPropagation();
    setSelectedPointIndex(index);
    selectedPointIndexRef.current = index;
  };

  const removePoint = (index, e) => {
    e.stopPropagation();
    setSelectedPointIndex(null);
    selectedPointIndexRef.current = null;
    behaviour.influencePoints = behaviour.influencePoints.filter(
      (_, i) => i !== index,
    );
    updateBehaviours();
  };

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>
        Attraction Repulsion Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <AttractionRepulsionDescription />
        <Checkbox
          label="Enabled"
          id="attraction-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? false}
        />
        <InputNumber
          label="Priority"
          id="attraction-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          min="0"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <hr />
        {behaviour.influencePoints &&
          behaviour.influencePoints.map((point, index) => (
            <Fragment key={index}>
              <h1>Point {index + 1}</h1>
              <InputNumber
                label="Position"
                id={`point-${index + 1}-position`}
                params={["x", "y"]}
                value={[point.point.x, point.point.y]}
                step="1"
                onChange={(value, id) => updatePoint(index, value, id)}
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
                label="Strength"
                id={`point-${index + 1}-strength`}
                value={point.strength}
                step="1"
                onChange={(value) => updateStrength(index, value)}
              />
              <InputNumber
                label="Range"
                id={`point-${index + 1}-range`}
                value={point.range}
                step="1"
                onChange={(value) => updateRange(index, value)}
              />
              <br />
              <button
                className="btn btn-default btn-block"
                onClick={(e) => removePoint(index, e)}
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
        <hr />
        <br />
        <button className="btn btn-default btn-block" onClick={addPoint}>
          Add New Point
        </button>
      </div>
    </>
  );
}
