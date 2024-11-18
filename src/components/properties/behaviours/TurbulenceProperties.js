"use client";

import { useCallback, useMemo, useState } from "react";
import { initializeProperty, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import InputNumber from "@components/html/InputNumber";
import Select from "@components/html/Select";

export default function TurbulenceProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    priority: 0,
    enabled: false,
    showVortices: false,
    effect: 0,
    startVariance: 0,
    endVariance: 0,
    duration: -1,
    position: { x: 0, y: 0 },
    positionVariance: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    velocityVariance: { x: 500, y: 500 },
    acceleration: { x: 0, y: 0 },
    accelerationVariance: { x: 0, y: 0 },
    sizeStart: { x: 1, y: 1 },
    sizeEnd: { x: 1, y: 1 },
    emitPerSecond: 5,
    maxLifeTime: 3,
    vortileSize: 500,
    name: "TurbulenceBehaviour",
  };
  Object.keys(keysToInitialize).forEach((key) => {
    initializeProperty(behaviour, key, keysToInitialize[key]);
  });

  const predefinedVersion = useMemo(() => {
    const names = {
      "ClockWise rotation": 0,
      "Non ClockWise rotation": 1,
      "Pushing V1": 2,
      "Pushing V2": 3,
      "Sucking V1": 4,
      "Sucking V2": 5,
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
      <legend onClick={toggleSubmenuVisibility}>Turbulence Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        <span className="explanation">
          <b>Turbulence</b> in a particle system introduces random or
          semi-random motion to particles, simulating chaotic, natural effects
          like swirling smoke, drifting leaves, or turbulent water flows. It
          makes particle motion less uniform, adding realism and complexity to
          the simulation.
          <span>
            <a
              href="http://localhost:3000/?effect=fireWithTurbulence"
              target="_blank"
            >
              Example
            </a>
          </span>
        </span>
        <Checkbox
          label="Enabled"
          id="turbulence-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <Checkbox
          label="Show Vertices"
          id="show-vertices"
          onChange={(value) => {
            behaviour.showVortices = value;
            updateBehaviours();
          }}
          checked={behaviour.showVortices ?? keysToInitialize.showVortices}
        />
        <Select
          label="Turbulence Version"
          defaultValue={behaviour.effect || 0}
          onChange={(value) => {
            behaviour.effect = parseInt(value);
            updateBehaviours();
          }}
          elements={predefinedVersion}
        />
        <InputNumber
          label="Position"
          id="turbulence-position"
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
          id="turbulence-position-variance"
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
        <InputNumber
          label="Velocity"
          id="turbulence-velocity"
          params={["x", "y"]}
          value={[
            behaviour.velocity.x ?? keysToInitialize.velocity.x,
            behaviour.velocity.y ?? keysToInitialize.velocity.y,
          ]}
          step="1"
          onChange={(value, id) => {
            behaviour.velocity[id] = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Velocity Variance"
          id="turbulence-velocity-variance"
          params={["x", "y"]}
          value={[
            behaviour.velocityVariance.x ?? keysToInitialize.velocityVariance.x,
            behaviour.velocityVariance.y ?? keysToInitialize.velocityVariance.y,
          ]}
          step="1"
          onChange={(value, id) => {
            behaviour.velocityVariance[id] = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Acceleration"
          id="turbulence-acceleration"
          params={["x", "y"]}
          value={[
            behaviour.acceleration.x ?? keysToInitialize.acceleration.x,
            behaviour.acceleration.y ?? keysToInitialize.acceleration.y,
          ]}
          step="1"
          onChange={(value, id) => {
            behaviour.acceleration[id] = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Acceleration Variance"
          id="turbulence-acceleration-variance"
          params={["x", "y"]}
          value={[
            behaviour.accelerationVariance.x ??
              keysToInitialize.accelerationVariance.x,
            behaviour.accelerationVariance.y ??
              keysToInitialize.accelerationVariance.y,
          ]}
          step="1"
          onChange={(value, id) => {
            behaviour.accelerationVariance[id] = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Size Start"
          id="turbulence-size-start"
          params={["x", "y"]}
          value={[
            behaviour.sizeStart.x ?? keysToInitialize.sizeStart.x,
            behaviour.sizeStart.y ?? keysToInitialize.sizeStart.y,
          ]}
          step="1"
          onChange={(value, id) => {
            behaviour.sizeStart[id] = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Size Start Variance"
          id="turbulence-size-start-variance"
          value={behaviour.startVariance ?? keysToInitialize.startVariance}
          step="1"
          onChange={(value) => {
            behaviour.startVariance = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Size End"
          id="turbulence-size-end"
          params={["x", "y"]}
          value={[
            behaviour.sizeEnd.x ?? keysToInitialize.sizeEnd.x,
            behaviour.sizeEnd.y ?? keysToInitialize.sizeEnd.y,
          ]}
          step="1"
          onChange={(value, id) => {
            behaviour.sizeEnd[id] = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Size End Variance"
          id="turbulence-size-end-variance"
          value={behaviour.endVariance ?? keysToInitialize.endVariance}
          step="1"
          onChange={(value) => {
            behaviour.endVariance = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Emit/sec"
          id="turbulence-emit-sec"
          value={behaviour.emitPerSecond ?? keysToInitialize.emitPerSecond}
          step="1"
          onChange={(value) => {
            behaviour.emitPerSecond = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Duration"
          id="turbulence-duration"
          value={behaviour.duration ?? keysToInitialize.duration}
          step="1"
          onChange={(value) => {
            behaviour.duration = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Max Life Time"
          id="turbulence-max-life-time"
          value={behaviour.maxLifeTime ?? keysToInitialize.maxLifeTime}
          step="1"
          onChange={(value) => {
            behaviour.maxLifeTime = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Vortile Size"
          id="turbulence-vortileSize"
          value={behaviour.vortileSize ?? keysToInitialize.vortileSize}
          step="1"
          onChange={(value) => {
            behaviour.vortileSize = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
