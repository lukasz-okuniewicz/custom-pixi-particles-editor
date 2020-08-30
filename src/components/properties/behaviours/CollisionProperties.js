"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import InputNumber from "@components/html/InputNumber";
import { Point } from "pixi.js-legacy";
import pixiRefs from "@pixi/pixiRefs";
import CollisionDescription from "@components/html/behaviourDescriptions/Collision";

export default function CollisionProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [selectedLineIndex, setSelectedLineIndex] = useState(null);
  const [pointKey, setPointKey] = useState("");

  const selectedLineIndexRef = useRef(null);
  const pointKeyRef = useRef("");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    enabled: false,
    showLines: true,
    skipPositionBehaviourOnCollision: false,
    skipAngularVelocityBehaviourOnCollision: false,
    skipColorBehaviourOnCollision: false,
    skipEmitDirectionBehaviourOnCollision: false,
    skipRotationBehaviourOnCollision: false,
    skipSizeBehaviourOnCollision: false,
    priority: 10000,
    lines: [],
    distance: 10,
    name: "CollisionBehaviour",
  };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);

  pixiRefs.graphics.visible = behaviour.showLines;

  useEffect(() => {
    const handleWindowClick = (event) => {
      if (selectedLineIndexRef.current !== null && pointKeyRef.current) {
        const localPosition = new Point(0, 0);
        pixiRefs.app.renderer.plugins.interaction.mapPositionToPoint(
          localPosition,
          event.clientX,
          event.clientY,
        );

        const newX = localPosition.x - pixiRefs.app.screen.width / 2;
        const newY = localPosition.y - pixiRefs.app.screen.height / 2;

        behaviour.lines[selectedLineIndexRef.current][pointKeyRef.current] = {
          x: parseInt(newX),
          y: parseInt(newY),
        }; // Update the specific point

        setSelectedLineIndex(null);
        selectedLineIndexRef.current = null;
        setPointKey("");
        pointKeyRef.current = "";

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

  const addLine = (e) => {
    e.stopPropagation();
    setSelectedLineIndex(null);
    selectedLineIndexRef.current = null;
    const newLine = { point1: { x: 0, y: 0 }, point2: { x: 0, y: 0 } }; // Default values for new line
    behaviour.lines = [...behaviour.lines, newLine];
    updateBehaviours();
  };

  const updateLinePoint = (index, pointKey, updatedValue, id) => {
    behaviour.lines[index][pointKey][id] = updatedValue;
    updateBehaviours();
  };

  const selectPoint = (index, pointKey, event) => {
    event.stopPropagation();
    setSelectedLineIndex(index);
    selectedLineIndexRef.current = index;
    setPointKey(pointKey);
    pointKeyRef.current = pointKey;
  };

  const removeLine = (index, e) => {
    e.stopPropagation();
    setSelectedLineIndex(null);
    selectedLineIndexRef.current = null;
    behaviour.lines = behaviour.lines.filter((_, i) => i !== index);
    updateBehaviours();
  };

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>Collision Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        <CollisionDescription />
        <Checkbox
          label="Enabled"
          id="collision-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="collision-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          min="0"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <Checkbox
          label="Show Line"
          id="collision-show-lines"
          onChange={(value) => {
            behaviour.showLines = value;
            updateBehaviours();
          }}
          checked={behaviour.showLines ?? keysToInitialize.showLines}
        />
        <InputNumber
          label="Distance"
          id="collision-distance"
          value={behaviour.distance ?? keysToInitialize.distance}
          step="1"
          onChange={(value) => {
            behaviour.distance = value;
            updateBehaviours();
          }}
        />
        <hr />
        {behaviour.lines &&
          behaviour.lines.map((line, index) => (
            <Fragment key={index}>
              <h1>Line {index + 1}</h1>
              <InputNumber
                label={`Line ${index + 1} - Point 1`}
                id={`line-${index + 1}-point-1`}
                params={["x", "y"]}
                value={[line.point1.x, line.point1.y]}
                step="1"
                onChange={(value, id) =>
                  updateLinePoint(index, "point1", value, id)
                }
              />
              <button
                className={
                  selectedLineIndex === index && pointKey === "point1"
                    ? "btn btn-default btn-block active"
                    : "btn btn-default btn-block"
                }
                onClick={(e) => selectPoint(index, "point1", e)}
              >
                Select Point 1
              </button>
              <InputNumber
                label={`Line ${index + 1} - Point 2`}
                id={`line-${index + 1}-point-2`}
                params={["x", "y"]}
                value={[line.point2.x, line.point2.y]}
                step="1"
                onChange={(value, id) =>
                  updateLinePoint(index, "point2", value, id)
                }
              />
              <button
                className={
                  selectedLineIndex === index && pointKey === "point2"
                    ? "btn btn-default btn-block active"
                    : "btn btn-default btn-block"
                }
                onClick={(e) => selectPoint(index, "point2", e)}
              >
                Select Point 2
              </button>
              <br />
              <button
                className="btn btn-default btn-block"
                onClick={(e) => removeLine(index, e)}
                style={{
                  backgroundImage:
                    "linear-gradient(rgb(71 11 11) 0px, rgb(136 13 13) 100%)",
                }}
              >
                Remove Line
              </button>
              <br />
              <hr />
            </Fragment>
          ))}
        <hr />
        <br />
        <button className="btn btn-default btn-block" onClick={addLine}>
          Add New Line
        </button>
        <br />
        <hr />
        <Checkbox
          label="Skip Position On Collision"
          id="collision-skip-position"
          onChange={(value) => {
            behaviour.skipPositionBehaviourOnCollision = value;
            updateBehaviours();
          }}
          checked={
            behaviour.skipPositionBehaviourOnCollision ??
            keysToInitialize.skipPositionBehaviourOnCollision
          }
        />
        <Checkbox
          label="Skip Angular Velocity On Collision"
          id="collision-skip-velocity"
          onChange={(value) => {
            behaviour.skipAngularVelocityBehaviourOnCollision = value;
            updateBehaviours();
          }}
          checked={
            behaviour.skipAngularVelocityBehaviourOnCollision ??
            keysToInitialize.skipAngularVelocityBehaviourOnCollision
          }
        />
        <Checkbox
          label="Skip Color On Collision"
          id="collision-skip-color"
          onChange={(value) => {
            behaviour.skipColorBehaviourOnCollision = value;
            updateBehaviours();
          }}
          checked={
            behaviour.skipColorBehaviourOnCollision ??
            keysToInitialize.skipColorBehaviourOnCollision
          }
        />
        <Checkbox
          label="Skip Emit Direction On Collision"
          id="collision-skip-emit"
          onChange={(value) => {
            behaviour.skipEmitDirectionBehaviourOnCollision = value;
            updateBehaviours();
          }}
          checked={
            behaviour.skipEmitDirectionBehaviourOnCollision ??
            keysToInitialize.skipEmitDirectionBehaviourOnCollision
          }
        />
        <Checkbox
          label="Skip Rotation On Collision"
          id="collision-skip-rotation"
          onChange={(value) => {
            behaviour.skipRotationBehaviourOnCollision = value;
            updateBehaviours();
          }}
          checked={
            behaviour.skipRotationBehaviourOnCollision ??
            keysToInitialize.skipRotationBehaviourOnCollision
          }
        />
        <Checkbox
          label="Skip Size On Collision"
          id="collision-skip-size"
          onChange={(value) => {
            behaviour.skipSizeBehaviourOnCollision = value;
            updateBehaviours();
          }}
          checked={
            behaviour.skipSizeBehaviourOnCollision ??
            keysToInitialize.skipSizeBehaviourOnCollision
          }
        />
      </div>
    </>
  );
}
