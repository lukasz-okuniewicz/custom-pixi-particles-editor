"use client";

import { Fragment, useCallback, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import InputNumber from "@components/html/InputNumber";
import TimelineDescription from "@components/html/behaviourDescriptions/Timeline";
import ColorPicker from "@components/html/ColorPicker";

export default function TimelineProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    enabled: false,
    priority: 0,
    timeline: [],
    name: "TimelineBehaviour",
  };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);

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

  const addTimeline = (e) => {
    e.stopPropagation();
    const newLine = {
      time: 0,
      properties: {
        size: 1,
        color: { r: 255, g: 255, b: 255, alpha: 1 },
        rotation: 0,
      },
    }; // Default values for new line
    behaviour.timeline = [...behaviour.timeline, newLine];
    updateBehaviours();
  };

  const removeLine = (index, e) => {
    e.stopPropagation();
    behaviour.timeline = behaviour.timeline.filter((_, i) => i !== index);
    updateBehaviours();
  };

  const updateSize = (index, value) => {
    behaviour.timeline[index].properties.size = value;
    updateBehaviours();
  };

  const updateTime = (index, value) => {
    behaviour.timeline[index].time = value;
    updateBehaviours();
  };

  const updateRotation = (index, value) => {
    behaviour.timeline[index].properties.rotation = value;
    updateBehaviours();
  };

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>Timeline Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        <TimelineDescription />
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
        {behaviour.timeline &&
          behaviour.timeline.map((line, index) => (
            <Fragment key={index}>
              <h1>Timeline {index + 1}</h1>
              <InputNumber
                label="Time"
                id="time"
                value={line.time}
                step="0.1"
                onChange={(value) => updateTime(index, value)}
              />
              <InputNumber
                label="Size"
                id="size"
                value={line.properties.size}
                step="0.1"
                onChange={(value) => updateSize(index, value)}
              />
              <InputNumber
                label="Rotation"
                id="rotation"
                value={line.properties.rotation}
                step="1"
                onChange={(value) => updateRotation(index, value)}
              />
              <ColorPicker
                label="Color"
                color={{
                  r: line.properties.color.r,
                  g: line.properties.color.g,
                  b: line.properties.color.b,
                  a: line.properties.color.alpha,
                }}
                colorChanged={(color) => {
                  line.properties.color.r = color.rgb.r;
                  line.properties.color.g = color.rgb.g;
                  line.properties.color.b = color.rgb.b;
                  line.properties.color.alpha = color.rgb.a;
                  updateBehaviours();
                }}
              />
              <br />
              <button
                className="btn btn-default btn-block"
                onClick={(e) => removeLine(index, e)}
                style={{
                  backgroundImage:
                    "linear-gradient(rgb(71 11 11) 0px, rgb(136 13 13) 100%)",
                }}
              >
                Remove Line
              </button>
              <br />
              <hr />
            </Fragment>
          ))}
        <br />
        <button className="btn btn-default btn-block" onClick={addTimeline}>
          Add New Timeline
        </button>
      </div>
    </>
  );
}
