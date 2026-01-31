"use client";

import { useCallback, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import CurvatureFlowDescription from "@components/html/behaviourDescriptions/CurvatureFlow";

export default function CurvatureFlowProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "CurvatureFlowBehaviour",
    enabled: false,
    priority: 245,
    radius: 70,
    strength: 120,
    kernelType: "poly",
    maxSpeed: 500,
    writeDensityForColor: true,
    scaleByDensity: false,
    densityScaleMin: 0.6,
    densityScaleMax: 1.4,
    densityNormalizeCount: 12,
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
        Curvature Flow Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <CurvatureFlowDescription />
        <Checkbox
          label="Enabled"
          id="curvatureflow-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="curvatureflow-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Radius"
          id="curvatureflow-radius"
          value={behaviour.radius ?? keysToInitialize.radius}
          step="1"
          min="0"
          onChange={(value) => {
            behaviour.radius = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Strength"
          id="curvatureflow-strength"
          value={behaviour.strength ?? keysToInitialize.strength}
          step="5"
          onChange={(value) => {
            behaviour.strength = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Max Speed"
          id="curvatureflow-maxSpeed"
          value={behaviour.maxSpeed ?? keysToInitialize.maxSpeed}
          step="10"
          onChange={(value) => {
            behaviour.maxSpeed = value;
            updateBehaviours();
          }}
        />
        <Checkbox
          label="Write Density For Color"
          id="curvatureflow-writeDensityForColor"
          onChange={(value) => {
            behaviour.writeDensityForColor = value;
            updateBehaviours();
          }}
          checked={behaviour.writeDensityForColor ?? keysToInitialize.writeDensityForColor}
        />
        <Checkbox
          label="Scale By Density"
          id="curvatureflow-scaleByDensity"
          onChange={(value) => {
            behaviour.scaleByDensity = value;
            updateBehaviours();
          }}
          checked={behaviour.scaleByDensity ?? keysToInitialize.scaleByDensity}
        />
        <InputNumber
          label="Density Scale Min"
          id="curvatureflow-densityScaleMin"
          value={behaviour.densityScaleMin ?? keysToInitialize.densityScaleMin}
          step="0.1"
          onChange={(value) => {
            behaviour.densityScaleMin = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Density Scale Max"
          id="curvatureflow-densityScaleMax"
          value={behaviour.densityScaleMax ?? keysToInitialize.densityScaleMax}
          step="0.1"
          onChange={(value) => {
            behaviour.densityScaleMax = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Density Normalize Count"
          id="curvatureflow-densityNormalizeCount"
          value={behaviour.densityNormalizeCount ?? keysToInitialize.densityNormalizeCount}
          step="1"
          min="1"
          onChange={(value) => {
            behaviour.densityNormalizeCount = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
