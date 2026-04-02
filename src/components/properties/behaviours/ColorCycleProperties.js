"use client";

import { useBehaviourSectionCollapse } from "@context/SidebarBehaviourAccordionContext";

import {
  BfSelect,
  BfInputNumber,
  BfCheckbox,
  BfColorPicker,
} from "@components/properties/BehaviourFieldWrappers";
import { useCallback, useState } from "react";
import { propertyHint } from "@components/properties/behaviourPropertyHints";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import ColorCycleDescription from "@components/html/behaviourDescriptions/ColorCycle";

export default function ColorCycleProperties({ defaultConfig, index, accordionPanelId }) {
  const { isSubmenuVisible, toggleSubmenuVisibility } = useBehaviourSectionCollapse(accordionPanelId);
    if (index === -1) {
    index = (defaultConfig.emitterConfig?.behaviours?.push({}) || 1) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "ColorCycleBehaviour",
    enabled: false,
    priority: 90,
    colorStops: [
      { t: 0, r: 255, g: 0, b: 0 },
      { t: 0.5, r: 0, g: 255, b: 0 },
      { t: 1, r: 0, g: 0, b: 255 },
    ],
    mode: "life",
    cycleSpeed: 1,
    interpolationMode: "rgb",
    segmentEasing: "linear",
    blendMode: "override",
    blendStrength: 1,
    perParticlePhaseOffset: 0,
  };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);

  const updateBehaviours = () => {
    defaultConfig.emitterConfig.behaviours[index] = behaviour;
    updateProps(
      "emitterConfig.behaviours",
      defaultConfig.emitterConfig.behaviours,
    );
  };

  if (!defaultConfig.emitterConfig.behaviours[index]?.name) {
    updateBehaviours();
  }

  const modeOptions = [
    { key: "life", displayName: "Life" },
    { key: "time", displayName: "Time" },
  ];
  const interpolationOptions = [
    { key: "rgb", displayName: "RGB" },
    { key: "hsv", displayName: "HSV" },
    { key: "hsl", displayName: "HSL" },
  ];
  const easingOptions = [
    { key: "linear", displayName: "Linear" },
    { key: "easeIn", displayName: "Ease In" },
    { key: "easeOut", displayName: "Ease Out" },
    { key: "easeInOut", displayName: "Ease In/Out" },
    { key: "smoothstep", displayName: "Smoothstep" },
  ];
  const blendOptions = [
    { key: "override", displayName: "Override" },
    { key: "add", displayName: "Add" },
    { key: "multiply", displayName: "Multiply" },
    { key: "screen", displayName: "Screen" },
    { key: "lerp", displayName: "Lerp" },
  ];

  const addStop = (e) => {
    e?.stopPropagation?.();
    if (!behaviour.colorStops) behaviour.colorStops = [];
    const last = behaviour.colorStops[behaviour.colorStops.length - 1];
    const t = last ? Math.min(1, last.t + 0.2) : 0;
    behaviour.colorStops = [
      ...behaviour.colorStops,
      { t, r: 255, g: 255, b: 255 },
    ];
    updateBehaviours();
  };

  const removeStop = (i, e) => {
    e?.stopPropagation?.();
    if (behaviour.colorStops.length <= 2) return;
    behaviour.colorStops = behaviour.colorStops.filter((_, idx) => idx !== i);
    updateBehaviours();
  };

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>
        Color Cycle Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <ColorCycleDescription />
        <BfCheckbox
          label="Enabled"
          id="colorCycle-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <BfInputNumber
          label="Priority"
          id="colorCycle-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <BfSelect
          label="Mode"
          defaultValue={behaviour.mode ?? keysToInitialize.mode}
          onChange={(value) => {
            behaviour.mode = value;
            updateBehaviours();
          }}
          elements={modeOptions}
        />
        <BfInputNumber
          label="Cycle Speed"
          id="colorCycle-cycleSpeed"
          value={behaviour.cycleSpeed ?? keysToInitialize.cycleSpeed}
          step="0.1"
          onChange={(value) => {
            behaviour.cycleSpeed = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Per Particle Phase Offset"
          id="colorCycle-perParticlePhaseOffset"
          value={behaviour.perParticlePhaseOffset ?? keysToInitialize.perParticlePhaseOffset}
          step="0.01"
          min="0"
          max="1"
          onChange={(value) => {
            behaviour.perParticlePhaseOffset = value;
            updateBehaviours();
          }}
        />
        <BfSelect
          label="Interpolation Mode"
          id="colorCycle-interpolationMode"
          defaultValue={behaviour.interpolationMode ?? keysToInitialize.interpolationMode}
          onChange={(value) => {
            behaviour.interpolationMode = value;
            updateBehaviours();
          }}
          elements={interpolationOptions}
        />
        <BfSelect
          label="Segment Easing"
          id="colorCycle-segmentEasing"
          defaultValue={behaviour.segmentEasing ?? keysToInitialize.segmentEasing}
          onChange={(value) => {
            behaviour.segmentEasing = value;
            updateBehaviours();
          }}
          elements={easingOptions}
        />
        <BfSelect
          label="Blend Mode"
          id="colorCycle-blendMode"
          defaultValue={behaviour.blendMode ?? keysToInitialize.blendMode}
          onChange={(value) => {
            behaviour.blendMode = value;
            updateBehaviours();
          }}
          elements={blendOptions}
        />
        <BfInputNumber
          label="Blend Strength"
          id="colorCycle-blendStrength"
          value={behaviour.blendStrength ?? keysToInitialize.blendStrength}
          step="0.05"
          min="0"
          max="1"
          onChange={(value) => {
            behaviour.blendStrength = value;
            updateBehaviours();
          }}
        />
        <div>
          <span>Color Stops</span>
          <button type="button" className="btn btn-default btn-block" onClick={addStop}>
            Add stop
          </button>
        </div>
        {(behaviour.colorStops || []).map((stop, i) => (
          <div key={i} style={{ marginLeft: 8, marginTop: 4 }}>
            <BfInputNumber
              label={`Stop ${i + 1} (t)`}
              id={`colorCycle-stop-t-${i}`}
              value={stop.t}
              step="0.05"
              min="0"
              max="1"
              tooltipText={propertyHint("colorCycle-stop-t")}
              onChange={(value) => {
                behaviour.colorStops[i].t = value;
                updateBehaviours();
              }}
            />
            <BfColorPicker
              id={`colorCycle-stop-color-${i}`}
              label={`Stop ${i + 1} color`}
              tooltipText={propertyHint("colorCycle-stop-color")}
              value={{
                _r: stop.r ?? 255,
                _g: stop.g ?? 255,
                _b: stop.b ?? 255,
                _alpha: 1,
              }}
              onChange={(value) => {
                behaviour.colorStops[i].r = value._r;
                behaviour.colorStops[i].g = value._g;
                behaviour.colorStops[i].b = value._b;
                updateBehaviours();
              }}
            />
            {behaviour.colorStops.length > 2 && (
              <button type="button" className="btn btn-default btn-block" onClick={(e) => removeStop(i, e)}>
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
