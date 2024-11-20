"use client";

import { useCallback, useMemo, useState } from "react";
import { initializeProperty, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import InputNumber from "@components/html/InputNumber";
import Select from "@components/html/Select";
import InputString from "@components/html/InputString";
import SpawnDescription from "@components/html/behaviourDescriptions/Spawn";

export default function SpawnProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    priority: 100,
    enabled: true,
    spawnType: "Rectangle",
    position: { x: 0, y: 0 },
    positionVariance: { x: 100, y: 100 },
    word: "HELLO",
    fontSize: 50,
    fontSpacing: 5,
    particleDensity: 1,
    fontMaxWidth: 1334,
    fontMaxHeight: 750,
    textAlign: "center",
    textBaseline: "middle",
    radius: 0,
    radiusX: 0,
    radiusY: 0,
    starPoints: 5,
    perspective: 0,
    maxZ: 0,
    baseRadius: 500,
    coneAngle: 45,
    coneDirection: 0,
    spread: 360,
    height: 50,
    rows: 10,
    columns: 10,
    cellSize: 20,
    center: { x: 0, y: 0, z: 0 },
    apex: { x: 0, y: 0, z: 0 },
    name: "PositionBehaviour",
  };
  Object.keys(keysToInitialize).forEach((key) => {
    initializeProperty(behaviour, key, keysToInitialize[key]);
  });

  const predefinedSpawnType = useMemo(() => {
    const names = {
      Rectangle: true,
      Frame: true,
      FrameRectangle: true,
      Ring: true,
      Star: true,
      Word: true,
      Sphere: true,
      Cone: true,
      Grid: true,
    };
    return Object.keys(names)
      .sort()
      .map((key) => ({
        key,
        displayName: key,
      }));
  }, []);

  const predefinedTextAlign = useMemo(() => {
    const names = {
      Center: "center",
      End: "end",
      Left: "left",
      Right: "right",
      Start: "start",
    };
    return Object.keys(names)
      .sort()
      .map((key, value) => ({
        key: value,
        displayName: key,
      }));
  }, []);

  const predefinedTextBaseline = useMemo(() => {
    const names = {
      Alphabetic: "alphabetic",
      Bottom: "bottom",
      Hanging: "hanging",
      Ideographic: "ideographic",
      Middle: "middle",
      Top: "top",
    };
    return Object.keys(names)
      .sort()
      .map((key, value) => ({
        key: value,
        displayName: key,
      }));
  }, []);

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

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>Spawn Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        <SpawnDescription />
        <Checkbox
          label="Enabled"
          id="position-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="position-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <hr />
        <InputNumber
          label="Perspective"
          id="perspective"
          value={behaviour.perspective ?? keysToInitialize.perspective}
          step="100"
          onChange={(value) => {
            behaviour.perspective = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Max Z"
          id="maxZ"
          value={behaviour.maxZ ?? keysToInitialize.maxZ}
          step="100"
          onChange={(value) => {
            behaviour.maxZ = value;
            updateBehaviours();
          }}
        />
        <hr />
        <InputNumber
          label="Position"
          id="position"
          params={["x", "y"]}
          value={[
            behaviour.position.x ?? keysToInitialize.position.x,
            behaviour.position.y ?? keysToInitialize.position.y,
          ]}
          step="1"
          onChange={(value, id) => {
            behaviour.position[id] = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Position Variance"
          id="position-variance"
          params={["x", "y"]}
          value={[
            behaviour.positionVariance.x ?? keysToInitialize.positionVariance.x,
            behaviour.positionVariance.y ?? keysToInitialize.positionVariance.y,
          ]}
          step="1"
          onChange={(value, id) => {
            behaviour.positionVariance[id] = value;
            updateBehaviours();
          }}
        />
        <hr />
        <Select
          label="Spawn Type"
          defaultValue={behaviour.spawnType || keysToInitialize.spawnType}
          onChange={(value) => {
            behaviour.spawnType = value;
            updateBehaviours();
          }}
          elements={predefinedSpawnType}
        />
        {behaviour.spawnType !== "Word" &&
          behaviour.spawnType !== "Rectangle" &&
          behaviour.spawnType !== "Cone" &&
          behaviour.spawnType !== "Grid" &&
          behaviour.spawnType !== "FrameRectangle" && (
            <InputNumber
              label="Radius"
              id="radius"
              value={behaviour.radius ?? keysToInitialize.radius}
              step="1"
              onChange={(value) => {
                behaviour.radius = value;
                updateBehaviours();
              }}
            />
          )}

        {behaviour.spawnType === "FrameRectangle" && (
          <>
            <InputNumber
              label="Width"
              id="radiusx"
              value={behaviour.radiusX ?? keysToInitialize.radiusX}
              step="1"
              onChange={(value) => {
                behaviour.radiusX = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Height"
              id="radiusy"
              value={behaviour.radiusY ?? keysToInitialize.radiusY}
              step="1"
              onChange={(value) => {
                behaviour.radiusY = value;
                updateBehaviours();
              }}
            />
          </>
        )}

        {behaviour.spawnType === "Cone" && (
          <>
            <InputNumber
              label="Base Radius"
              id="baseRadius"
              value={behaviour.baseRadius ?? keysToInitialize.baseRadius}
              step="1"
              onChange={(value) => {
                behaviour.baseRadius = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Angle"
              id="coneAngle"
              value={behaviour.coneAngle ?? keysToInitialize.coneAngle}
              step="1"
              onChange={(value) => {
                behaviour.coneAngle = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Direction"
              id="coneDirection"
              value={behaviour.coneDirection ?? keysToInitialize.coneDirection}
              step="1"
              onChange={(value) => {
                behaviour.coneDirection = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Height"
              id="height"
              value={behaviour.height ?? keysToInitialize.height}
              step="1"
              onChange={(value) => {
                behaviour.height = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Apex"
              id="apex"
              params={["x", "y", "z"]}
              value={[
                behaviour.apex.x ?? keysToInitialize.apex.x,
                behaviour.apex.y ?? keysToInitialize.apex.y,
                behaviour.apex.z ?? keysToInitialize.apex.z,
              ]}
              step="1"
              onChange={(value, id) => {
                behaviour.apex[id] = value;
                updateBehaviours();
              }}
            />
          </>
        )}

        {behaviour.spawnType === "Grid" && (
          <>
            <InputNumber
              label="Rows"
              id="rows"
              value={behaviour.rows ?? keysToInitialize.rows}
              step="1"
              onChange={(value) => {
                behaviour.rows = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Columns"
              id="columns"
              value={behaviour.columns ?? keysToInitialize.columns}
              step="1"
              onChange={(value) => {
                behaviour.columns = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Cell Size"
              id="cellSize"
              value={behaviour.cellSize ?? keysToInitialize.cellSize}
              step="1"
              onChange={(value) => {
                behaviour.cellSize = value;
                updateBehaviours();
              }}
            />
          </>
        )}

        {behaviour.spawnType === "Sphere" && (
          <>
            <InputNumber
              label="Spread"
              id="spread"
              value={behaviour.spread ?? keysToInitialize.spread}
              step="1"
              onChange={(value) => {
                behaviour.spread = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Center"
              id="center"
              params={["x", "y", "z"]}
              value={[
                behaviour.center.x ?? keysToInitialize.center.x,
                behaviour.center.y ?? keysToInitialize.center.y,
                behaviour.center.z ?? keysToInitialize.center.z,
              ]}
              step="1"
              onChange={(value, id) => {
                behaviour.center[id] = value;
                updateBehaviours();
              }}
            />
          </>
        )}

        {behaviour.spawnType === "Star" && (
          <InputNumber
            label="Points"
            id="starPoints"
            value={behaviour.starPoints ?? keysToInitialize.starPoints}
            step="1"
            onChange={(value) => {
              behaviour.starPoints = value;
              updateBehaviours();
            }}
          />
        )}
        {behaviour.spawnType === "Word" && (
          <>
            <InputString
              label="Word"
              id="word"
              value={behaviour.word ?? keysToInitialize.word}
              onChange={(value) => {
                behaviour.word = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Font Size"
              id="fontSize"
              value={behaviour.fontSize ?? keysToInitialize.fontSize}
              step="1"
              onChange={(value) => {
                behaviour.fontSize = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Font Spacing"
              id="fontSpacing"
              value={behaviour.fontSpacing ?? keysToInitialize.fontSpacing}
              step="1"
              onChange={(value) => {
                behaviour.fontSpacing = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Particle Density"
              id="particleDensity"
              value={
                behaviour.particleDensity ?? keysToInitialize.particleDensity
              }
              step="1"
              onChange={(value) => {
                behaviour.particleDensity = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Font Max Width"
              id="fontMaxWidth"
              value={behaviour.fontMaxWidth ?? keysToInitialize.fontMaxWidth}
              step="1"
              onChange={(value) => {
                behaviour.fontMaxWidth = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Font Max Height"
              id="fontMaxHeight"
              value={behaviour.fontMaxHeight ?? keysToInitialize.fontMaxHeight}
              step="1"
              onChange={(value) => {
                behaviour.fontMaxHeight = value;
                updateBehaviours();
              }}
            />
            <Select
              label="Text Align"
              defaultValue={behaviour.textAlign || keysToInitialize.textAlign}
              onChange={(value) => {
                behaviour.textAlign = value;
                updateBehaviours();
              }}
              elements={predefinedTextAlign}
            />
            <Select
              label="Text Baseline"
              defaultValue={
                behaviour.textBaseline || keysToInitialize.textBaseline
              }
              onChange={(value) => {
                behaviour.textBaseline = value;
                updateBehaviours();
              }}
              elements={predefinedTextBaseline}
            />
          </>
        )}
      </div>
    </>
  );
}
