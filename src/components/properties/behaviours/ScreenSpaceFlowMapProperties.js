"use client";

import { useCallback, useEffect, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import ScreenSpaceFlowMapDescription from "@components/html/behaviourDescriptions/ScreenSpaceFlowMap";

export default function ScreenSpaceFlowMapProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [flowJson, setFlowJson] = useState("[]");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "ScreenSpaceFlowMapBehaviour",
    enabled: false,
    priority: 302,
    gridWidth: 8,
    gridHeight: 8,
    worldMinX: -400,
    worldMinY: -300,
    worldMaxX: 400,
    worldMaxY: 300,
    flowData: [],
    strength: 1,
    bilinear: true,
  };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);

  const rawBehaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const flowDataSnapshot = JSON.stringify(rawBehaviour.flowData ?? null);

  useEffect(() => {
    const raw = defaultConfig.emitterConfig.behaviours[index] || {};
    const merged = mergeObjectsWithDefaults(keysToInitialize, raw);
    const fd = merged.flowData;
    setFlowJson(JSON.stringify(Array.isArray(fd) ? fd : []));
  }, [defaultConfig.particlePredefinedEffect, index, flowDataSnapshot]);

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
      <legend onClick={toggleSubmenuVisibility}>Screen Space Flow Map</legend>
      <div className={`${isSubmenuVisible}`}>
        <ScreenSpaceFlowMapDescription />
        <p className="text-xs opacity-80 mb-2">
          CPU grid [vx,vy] pairs row-major. Populate flowData from code or paste
          a JSON number array (length = width×height×2).
        </p>
        <Checkbox
          label="Enabled"
          id="ssfm-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="ssfm-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="1"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Grid width"
          id="ssfm-gw"
          value={behaviour.gridWidth ?? keysToInitialize.gridWidth}
          step="1"
          min="1"
          onChange={(value) => {
            behaviour.gridWidth = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Grid height"
          id="ssfm-gh"
          value={behaviour.gridHeight ?? keysToInitialize.gridHeight}
          step="1"
          min="1"
          onChange={(value) => {
            behaviour.gridHeight = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="World min"
          id="ssfm-wmin"
          params={["x", "y"]}
          value={[
            behaviour.worldMinX ?? keysToInitialize.worldMinX,
            behaviour.worldMinY ?? keysToInitialize.worldMinY,
          ]}
          step="10"
          onChange={(value, id) => {
            if (id === "x") behaviour.worldMinX = value;
            else behaviour.worldMinY = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="World max"
          id="ssfm-wmax"
          params={["x", "y"]}
          value={[
            behaviour.worldMaxX ?? keysToInitialize.worldMaxX,
            behaviour.worldMaxY ?? keysToInitialize.worldMaxY,
          ]}
          step="10"
          onChange={(value, id) => {
            if (id === "x") behaviour.worldMaxX = value;
            else behaviour.worldMaxY = value;
            updateBehaviours();
          }}
        />
        <label className="block text-sm mt-2" htmlFor="ssfm-flowData">
          flowData (JSON array)
        </label>
        <textarea
          id="ssfm-flowData"
          className="w-full font-mono text-xs p-2 bg-[#1e2122] border border-[#444] rounded min-h-[80px]"
          value={flowJson}
          onChange={(e) => setFlowJson(e.target.value)}
          onBlur={(e) => {
            try {
              behaviour.flowData = JSON.parse(e.target.value || "[]");
              updateBehaviours();
            } catch {
              /* invalid — keep editing */
            }
          }}
          spellCheck={false}
        />
        <InputNumber
          label="Strength"
          id="ssfm-strength"
          value={behaviour.strength ?? keysToInitialize.strength}
          step="0.1"
          onChange={(value) => {
            behaviour.strength = value;
            updateBehaviours();
          }}
        />
        <Checkbox
          label="Bilinear"
          id="ssfm-bilinear"
          onChange={(value) => {
            behaviour.bilinear = value;
            updateBehaviours();
          }}
          checked={behaviour.bilinear ?? keysToInitialize.bilinear}
        />
      </div>
    </>
  );
}
