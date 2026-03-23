"use client";

import { useCallback, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import ToroidalWrapDescription from "@components/html/behaviourDescriptions/ToroidalWrap";

export default function ToroidalWrapProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "ToroidalWrapBehaviour",
    enabled: true,
    priority: 45,
    wrapX: true,
    wrapY: true,
    useCanvasBounds: false,
    minX: -400,
    maxX: 400,
    minY: -300,
    maxY: 300,
    inset: 0,
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
    );
  };

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>
        Toroidal Wrap Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <ToroidalWrapDescription />
        <Checkbox
          label="Enabled"
          id="toroidal-wrap-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="toroidal-wrap-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="1"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <Checkbox
          label="Wrap X"
          id="toroidal-wrap-x"
          onChange={(value) => {
            behaviour.wrapX = value;
            updateBehaviours();
          }}
          checked={behaviour.wrapX ?? keysToInitialize.wrapX}
        />
        <Checkbox
          label="Wrap Y"
          id="toroidal-wrap-y"
          onChange={(value) => {
            behaviour.wrapY = value;
            updateBehaviours();
          }}
          checked={behaviour.wrapY ?? keysToInitialize.wrapY}
        />
        <Checkbox
          label="Use canvas size (auto bounds)"
          id="toroidal-use-canvas"
          onChange={(value) => {
            behaviour.useCanvasBounds = value;
            updateBehaviours();
          }}
          checked={behaviour.useCanvasBounds ?? keysToInitialize.useCanvasBounds}
        />
        {!behaviour.useCanvasBounds && (
          <>
        <InputNumber
          label="Min X"
          id="toroidal-minX"
          value={behaviour.minX ?? keysToInitialize.minX}
          step="10"
          onChange={(value) => {
            behaviour.minX = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Max X"
          id="toroidal-maxX"
          value={behaviour.maxX ?? keysToInitialize.maxX}
          step="10"
          onChange={(value) => {
            behaviour.maxX = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Min Y"
          id="toroidal-minY"
          value={behaviour.minY ?? keysToInitialize.minY}
          step="10"
          onChange={(value) => {
            behaviour.minY = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Max Y"
          id="toroidal-maxY"
          value={behaviour.maxY ?? keysToInitialize.maxY}
          step="10"
          onChange={(value) => {
            behaviour.maxY = value;
            updateBehaviours();
          }}
        />
          </>
        )}
        <InputNumber
          label="Inset"
          id="toroidal-inset"
          value={behaviour.inset ?? keysToInitialize.inset}
          step="1"
          min="0"
          onChange={(value) => {
            behaviour.inset = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
