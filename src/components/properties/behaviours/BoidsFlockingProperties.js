"use client";

import { useCallback, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import BoidsFlockingDescription from "@components/html/behaviourDescriptions/BoidsFlocking";

export default function BoidsFlockingProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "BoidsFlockingBehaviour",
    enabled: false,
    priority: 250,
    separationRadius: 40,
    separationStrength: 1.2,
    alignmentRadius: 60,
    alignmentStrength: 0.8,
    cohesionRadius: 80,
    cohesionStrength: 0.5,
    maxSpeed: 400,
    maxSteerForce: 600,
    scaleByDensity: false,
    densityScaleMin: 0.8,
    densityScaleMax: 1.5,
    densityRadius: 50,
    writeSpeedForColor: true,
  };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);

  const toggleSubmenuVisibility = useCallback(() => {
    setIsSubmenuVisible((prev) => (prev === "collapse" ? "" : "collapse"));
  }, []);

  const updateBehaviours = () => {
    defaultConfig.emitterConfig.behaviours[index] = behaviour;
    updateProps(
      "emitterConfig.behaviours",
      defaultConfig.emitterConfig.behaviours,
      null,
      true,
    );
  };

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>
        Boids Flocking Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <BoidsFlockingDescription />
        <Checkbox
          label="Enabled"
          id="boids-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="boids-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Separation Radius"
          id="boids-separationRadius"
          value={behaviour.separationRadius ?? keysToInitialize.separationRadius}
          step="1"
          min="0"
          onChange={(value) => {
            behaviour.separationRadius = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Separation Strength"
          id="boids-separationStrength"
          value={behaviour.separationStrength ?? keysToInitialize.separationStrength}
          step="0.1"
          onChange={(value) => {
            behaviour.separationStrength = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Alignment Radius"
          id="boids-alignmentRadius"
          value={behaviour.alignmentRadius ?? keysToInitialize.alignmentRadius}
          step="1"
          min="0"
          onChange={(value) => {
            behaviour.alignmentRadius = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Alignment Strength"
          id="boids-alignmentStrength"
          value={behaviour.alignmentStrength ?? keysToInitialize.alignmentStrength}
          step="0.1"
          onChange={(value) => {
            behaviour.alignmentStrength = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Cohesion Radius"
          id="boids-cohesionRadius"
          value={behaviour.cohesionRadius ?? keysToInitialize.cohesionRadius}
          step="1"
          min="0"
          onChange={(value) => {
            behaviour.cohesionRadius = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Cohesion Strength"
          id="boids-cohesionStrength"
          value={behaviour.cohesionStrength ?? keysToInitialize.cohesionStrength}
          step="0.1"
          onChange={(value) => {
            behaviour.cohesionStrength = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Max Speed"
          id="boids-maxSpeed"
          value={behaviour.maxSpeed ?? keysToInitialize.maxSpeed}
          step="10"
          onChange={(value) => {
            behaviour.maxSpeed = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Max Steer Force"
          id="boids-maxSteerForce"
          value={behaviour.maxSteerForce ?? keysToInitialize.maxSteerForce}
          step="10"
          onChange={(value) => {
            behaviour.maxSteerForce = value;
            updateBehaviours();
          }}
        />
        <Checkbox
          label="Scale By Density"
          id="boids-scaleByDensity"
          onChange={(value) => {
            behaviour.scaleByDensity = value;
            updateBehaviours();
          }}
          checked={behaviour.scaleByDensity ?? keysToInitialize.scaleByDensity}
        />
        <InputNumber
          label="Density Scale Min"
          id="boids-densityScaleMin"
          value={behaviour.densityScaleMin ?? keysToInitialize.densityScaleMin}
          step="0.1"
          onChange={(value) => {
            behaviour.densityScaleMin = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Density Scale Max"
          id="boids-densityScaleMax"
          value={behaviour.densityScaleMax ?? keysToInitialize.densityScaleMax}
          step="0.1"
          onChange={(value) => {
            behaviour.densityScaleMax = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Density Radius"
          id="boids-densityRadius"
          value={behaviour.densityRadius ?? keysToInitialize.densityRadius}
          step="1"
          min="0"
          onChange={(value) => {
            behaviour.densityRadius = value;
            updateBehaviours();
          }}
        />
        <Checkbox
          label="Write Speed For Color"
          id="boids-writeSpeedForColor"
          onChange={(value) => {
            behaviour.writeSpeedForColor = value;
            updateBehaviours();
          }}
          checked={behaviour.writeSpeedForColor ?? keysToInitialize.writeSpeedForColor}
        />
      </div>
    </>
  );
}
