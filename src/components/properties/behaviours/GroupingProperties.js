"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import InputNumber from "@components/html/InputNumber";
import GroupingDescription from "@components/html/behaviourDescriptions/Grouping";
import { Point } from "pixi.js";
import pixiRefs from "@pixi/pixiRefs";

export default function GroupingProperties({ defaultConfig, index }) {
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
    priority: 0,
    groupCenter: { x: 0, y: 0 },
    groupRadius: 200,
    repulsionStrength: 0,
    attractionStrength: 1,
    orbitSpeed: 0,
    randomness: 0.5,
    boundaryEnforcement: false,
    dynamicRadiusSpeed: 1,
    maxRadius: 150,
    minRadius: 50,
    clusterPoints: [],
    name: "GroupingBehaviour",
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
        pixiRefs.app.renderer.events.mapPositionToPoint(
          localPosition,
          event.clientX,
          event.clientY,
        );

        const newX = localPosition.x - pixiRefs.app.screen.width / 2;
        const newY = localPosition.y - pixiRefs.app.screen.height / 2;

        behaviour.groupCenter = {
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

  const updateBehaviours = () => {
    defaultConfig.emitterConfig.behaviours[index] = behaviour;
    updateProps(
      "emitterConfig.behaviours",
      defaultConfig.emitterConfig.behaviours,
    );
  };

  const selectPosition = (index, event) => {
    event.stopPropagation();
    setSelectedPositionIndex(index);
    selectedPositionIndexRef.current = index;
  };

  const addClusterPoint = (e) => {
    e.stopPropagation();
    const newPoint = { x: 0, y: 0 }; // Default values for new line
    behaviour.clusterPoints = [...behaviour.clusterPoints, newPoint];
    updateBehaviours();
  };

  const removeClusterPoint = (index, e) => {
    e.stopPropagation();
    behaviour.clusterPoints = behaviour.clusterPoints.filter(
      (_, i) => i !== index,
    );
    updateBehaviours();
  };

  const updateSize = (index, value) => {
    behaviour.lines[index].properties.size = value;
    updateBehaviours();
  };

  const updateClusterPoint = (index, value, id) => {
    behaviour.clusterPoints[index][id] = value;
    updateBehaviours();
  };

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>Grouping Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        <GroupingDescription />
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
        <hr />
        <InputNumber
          label="Group Center"
          id="groupCenter"
          params={["x", "y"]}
          value={[behaviour.groupCenter.x, behaviour.groupCenter.y]}
          step="1"
          onChange={(value, id) => {
            behaviour.groupCenter[id] = value;
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
        <InputNumber
          label="Group Radius"
          id="groupRadius"
          value={behaviour.groupRadius}
          step="10"
          onChange={(value) => {
            behaviour.groupRadius = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Attraction Strength"
          id="attractionStrength"
          value={behaviour.attractionStrength}
          step="0.1"
          onChange={(value) => {
            behaviour.attractionStrength = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Repulsion Strength"
          id="repulsionStrength"
          value={behaviour.repulsionStrength}
          step="0.1"
          onChange={(value) => {
            behaviour.repulsionStrength = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Orbit Speed"
          id="orbitSpeed"
          value={behaviour.orbitSpeed}
          step="0.1"
          onChange={(value) => {
            behaviour.orbitSpeed = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Randomness"
          id="randomness"
          value={behaviour.randomness}
          step="0.1"
          onChange={(value) => {
            behaviour.randomness = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Dynamic Radius Speed"
          id="dynamicRadiusSpeed"
          value={behaviour.dynamicRadiusSpeed}
          step="0.1"
          onChange={(value) => {
            behaviour.dynamicRadiusSpeed = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Max Radius"
          id="maxRadius"
          value={behaviour.maxRadius}
          step="10"
          onChange={(value) => {
            behaviour.maxRadius = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Min Radius"
          id="minRadius"
          value={behaviour.minRadius}
          step="10"
          onChange={(value) => {
            behaviour.minRadius = value;
            updateBehaviours();
          }}
        />
        <hr />
        {behaviour.clusterPoints &&
          behaviour.clusterPoints.map((point, index) => (
            <Fragment key={index}>
              <h1>Point {index + 1}</h1>
              <InputNumber
                label="Point"
                id="point"
                params={["x", "y"]}
                value={[point.x, point.y]}
                step="1"
                onChange={(value, id) => updateClusterPoint(index, value, id)}
              />
              <br />
              <button
                className="btn btn-default btn-block"
                onClick={(e) => removeClusterPoint(index, e)}
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
        <br />
        <button className="btn btn-default btn-block" onClick={addClusterPoint}>
          Add New Point
        </button>
      </div>
    </>
  );
}
