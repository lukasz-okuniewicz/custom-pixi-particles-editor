"use client";

import { useBehaviourSectionCollapse } from "@context/SidebarBehaviourAccordionContext";

import {
  BfInputNumber,
  BfCheckbox,
  BfSelect,
} from "@components/properties/BehaviourFieldWrappers";
import { useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import NoiseBasedMotionDescription from "@components/html/behaviourDescriptions/NoiseBasedMotion";

export default function NoiseBasedMotionProperties({ defaultConfig, index, accordionPanelId }) {
  const { isSubmenuVisible, toggleSubmenuVisibility } = useBehaviourSectionCollapse(accordionPanelId);
  const [selectedPreset, setSelectedPreset] = useState("custom");
  if (index === -1) {
    index = (defaultConfig.emitterConfig?.behaviours?.push({}) || 1) - 1;
  }

  const modeOptions = [
    { key: "vector", displayName: "Vector Noise", value: "vector" },
    { key: "curl", displayName: "Curl Noise", value: "curl" },
  ];
  const presetOptions = [
    { key: "custom", displayName: "Custom", value: "custom" },
    { key: "mist", displayName: "Mist", value: "mist" },
    { key: "flame", displayName: "Flame", value: "flame" },
    { key: "underwater", displayName: "Underwater", value: "underwater" },
    { key: "electric", displayName: "Electric", value: "electric" },
  ];
  const noisePresets = {
    mist: {
      mode: "vector",
      noiseScale: 0.06,
      noiseIntensity: 55,
      noiseSpeed: 1.4,
      noiseDirection: { x: 0.8, y: 1.1 },
      octaves: 4,
      lacunarity: 1.9,
      gain: 0.52,
      warpStrength: 0.32,
      warpScale: 0.025,
      warpSpeed: 0.4,
      curlEpsilon: 0.01,
      drag: 0.2,
      maxNoiseSpeed: 140,
    },
    flame: {
      mode: "vector",
      noiseScale: 0.11,
      noiseIntensity: 200,
      noiseSpeed: 3.6,
      noiseDirection: { x: 0.15, y: -1.6 },
      octaves: 3,
      lacunarity: 2.2,
      gain: 0.45,
      warpStrength: 0.7,
      warpScale: 0.04,
      warpSpeed: 1.05,
      curlEpsilon: 0.01,
      drag: 0.08,
      maxNoiseSpeed: 320,
    },
    underwater: {
      mode: "curl",
      noiseScale: 0.045,
      noiseIntensity: 90,
      noiseSpeed: 1,
      noiseDirection: { x: 1, y: 1 },
      octaves: 4,
      lacunarity: 1.85,
      gain: 0.55,
      warpStrength: 0.4,
      warpScale: 0.02,
      warpSpeed: 0.3,
      curlEpsilon: 0.012,
      drag: 0.15,
      maxNoiseSpeed: 180,
    },
    electric: {
      mode: "curl",
      noiseScale: 0.16,
      noiseIntensity: 260,
      noiseSpeed: 6.5,
      noiseDirection: { x: 1, y: 1 },
      octaves: 2,
      lacunarity: 2.5,
      gain: 0.35,
      warpStrength: 0.95,
      warpScale: 0.075,
      warpSpeed: 2.25,
      curlEpsilon: 0.007,
      drag: 0.02,
      maxNoiseSpeed: 460,
    },
  };

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    enabled: false,
    priority: 50,
    noiseScale: 0.08,
    noiseIntensity: 120,
    noiseSpeed: 2.5,
    noiseDirection: { x: 1, y: 1 },
    mode: "vector",
    octaves: 3,
    lacunarity: 2,
    gain: 0.5,
    warpStrength: 0.45,
    warpScale: 0.03,
    warpSpeed: 0.65,
    curlEpsilon: 0.01,
    drag: 0.12,
    maxNoiseSpeed: 260,
    name: "NoiseBasedMotionBehaviour",
  };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);

  // Toggle submenu visibility
  const updateBehaviours = () => {
    defaultConfig.emitterConfig.behaviours[index] = behaviour;
    updateProps(
      "emitterConfig.behaviours",
      defaultConfig.emitterConfig.behaviours,
    );
  };
  const applyNoisePreset = (presetName) => {
    const preset = noisePresets[presetName];
    if (!preset) return;
    Object.assign(behaviour, preset);
    setSelectedPreset(presetName);
    updateBehaviours();
  };

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>
        Noise Based Motion Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <NoiseBasedMotionDescription />
        <BfCheckbox
          label="Enabled"
          id="noise-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <BfSelect
          label="Preset"
          id="noisePreset"
          defaultValue={selectedPreset}
          onChange={(value) => {
            setSelectedPreset(value);
            if (value === "custom") return;
            applyNoisePreset(value);
          }}
          elements={presetOptions}
        />
        <BfInputNumber
          label="Priority"
          id="noise-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          min="0"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Noise Scale"
          id="noiseScale"
          value={behaviour.noiseScale ?? keysToInitialize.noiseScale}
          step="0.1"
          onChange={(value) => {
            behaviour.noiseScale = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Noise Intensity"
          id="noiseIntensity"
          value={behaviour.noiseIntensity ?? keysToInitialize.noiseIntensity}
          step="100"
          onChange={(value) => {
            behaviour.noiseIntensity = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Noise Speed"
          id="noiseSpeed"
          value={behaviour.noiseSpeed ?? keysToInitialize.noiseSpeed}
          step="1"
          onChange={(value) => {
            behaviour.noiseSpeed = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Noise Direction"
          id="noiseDirection"
          params={["x", "y"]}
          value={[
            behaviour.noiseDirection.x ?? keysToInitialize.noiseDirection.x,
            behaviour.noiseDirection.y ?? keysToInitialize.noiseDirection.y,
          ]}
          step="1"
          onChange={(value, id) => {
            behaviour.noiseDirection[id] = value;
            updateBehaviours();
          }}
        />
        <BfSelect
          label="Mode"
          id="noiseMode"
          defaultValue={behaviour.mode ?? keysToInitialize.mode}
          onChange={(value) => {
            behaviour.mode = value;
            updateBehaviours();
          }}
          elements={modeOptions}
        />
        <BfInputNumber
          label="Octaves"
          id="noiseOctaves"
          value={behaviour.octaves ?? keysToInitialize.octaves}
          step="1"
          min="1"
          onChange={(value) => {
            behaviour.octaves = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Lacunarity"
          id="noiseLacunarity"
          value={behaviour.lacunarity ?? keysToInitialize.lacunarity}
          step="0.1"
          min="0"
          onChange={(value) => {
            behaviour.lacunarity = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Gain"
          id="noiseGain"
          value={behaviour.gain ?? keysToInitialize.gain}
          step="0.05"
          min="0"
          onChange={(value) => {
            behaviour.gain = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Warp Strength"
          id="noiseWarpStrength"
          value={behaviour.warpStrength ?? keysToInitialize.warpStrength}
          step="0.05"
          onChange={(value) => {
            behaviour.warpStrength = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Warp Scale"
          id="noiseWarpScale"
          value={behaviour.warpScale ?? keysToInitialize.warpScale}
          step="0.005"
          min="0"
          onChange={(value) => {
            behaviour.warpScale = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Warp Speed"
          id="noiseWarpSpeed"
          value={behaviour.warpSpeed ?? keysToInitialize.warpSpeed}
          step="0.05"
          onChange={(value) => {
            behaviour.warpSpeed = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Curl Epsilon"
          id="noiseCurlEpsilon"
          value={behaviour.curlEpsilon ?? keysToInitialize.curlEpsilon}
          step="0.001"
          min="0.0001"
          onChange={(value) => {
            behaviour.curlEpsilon = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Drag"
          id="noiseDrag"
          value={behaviour.drag ?? keysToInitialize.drag}
          step="0.01"
          min="0"
          onChange={(value) => {
            behaviour.drag = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Max Noise Speed"
          id="noiseMaxNoiseSpeed"
          value={behaviour.maxNoiseSpeed ?? keysToInitialize.maxNoiseSpeed}
          step="10"
          onChange={(value) => {
            behaviour.maxNoiseSpeed = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
