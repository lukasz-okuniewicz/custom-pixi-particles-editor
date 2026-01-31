"use client";

import { useCallback, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import Select from "@components/html/Select";
import ColorPicker from "@components/html/ColorPicker";
import ColorCycleDescription from "@components/html/behaviourDescriptions/ColorCycle";

export default function ColorCycleProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
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

  const modeOptions = [
    { key: "life", displayName: "Life" },
    { key: "time", displayName: "Time" },
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
        <Checkbox
          label="Enabled"
          id="colorCycle-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="colorCycle-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <Select
          label="Mode"
          defaultValue={behaviour.mode ?? keysToInitialize.mode}
          onChange={(value) => {
            behaviour.mode = value;
            updateBehaviours();
          }}
          elements={modeOptions}
        />
        <InputNumber
          label="Cycle Speed"
          id="colorCycle-cycleSpeed"
          value={behaviour.cycleSpeed ?? keysToInitialize.cycleSpeed}
          step="0.1"
          onChange={(value) => {
            behaviour.cycleSpeed = value;
            updateBehaviours();
          }}
        />
        <div>
          <span>Color Stops</span>
          <button type="button" onClick={addStop}>
            Add stop
          </button>
        </div>
        {(behaviour.colorStops || []).map((stop, i) => (
          <div key={i} style={{ marginLeft: 8, marginTop: 4 }}>
            <InputNumber
              label={`Stop ${i + 1} (t)`}
              id={`colorCycle-stop-t-${i}`}
              value={stop.t}
              step="0.05"
              min="0"
              max="1"
              onChange={(value) => {
                behaviour.colorStops[i].t = value;
                updateBehaviours();
              }}
            />
            <ColorPicker
              label={`Stop ${i + 1} color`}
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
              <button type="button" onClick={(e) => removeStop(i, e)}>
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
