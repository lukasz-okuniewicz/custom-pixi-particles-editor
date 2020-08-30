"use client";

import { Fragment, useCallback, useMemo, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import InputNumber from "@components/html/InputNumber";
import SizeDescription from "@components/html/behaviourDescriptions/Size";
import Select from "@components/html/Select";

export default function SizeProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    enabled: false,
    priority: 0,
    sizeStart: { x: 1, y: 1 },
    sizeEnd: { x: 0, y: 0 },
    startVariance: 0.1,
    endVariance: 0,
    maxSize: { x: 5, y: 5 },
    uniformScaling: true,
    pulsate: false,
    pulsationSpeed: 1,
    pulsationAmplitude: 0.2,

    useNoise: false,
    noiseScale: 0.1,
    invertAtMidpoint: false,
    sizeSteps: [],
    timeOffset: 0,
    xScalingFunction: "linear",
    yScalingFunction: "linear",
    sizeAlphaDependency: false,
    name: "SizeBehaviour",
  };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);

  const predefinedEasingFunctions = useMemo(() => {
    const names = {
      linear: true,
      easeIn: true,
      easeOut: true,
      easeInOut: true,
    };
    return Object.keys(names)
      .sort()
      .map((key) => ({
        key,
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

  const addSizeStep = (e) => {
    e.stopPropagation();
    const newSizeStep = {
      x: 0,
      y: 0,
    }; // Default values for new line
    behaviour.sizeSteps = [...behaviour.sizeSteps, newSizeStep];
    updateBehaviours();
  };

  const removeSizeStep = (index, e) => {
    e.stopPropagation();
    behaviour.sizeSteps = behaviour.sizeSteps.filter((_, i) => i !== index);
    updateBehaviours();
  };

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>Size Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        <SizeDescription />
        <Checkbox
          label="Enabled"
          id="size-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="size-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          min="0"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        {!behaviour.sizeSteps.length && (
          <>
            <InputNumber
              label="Size Start"
              id="size-start"
              params={["x", "y"]}
              value={[
                behaviour.sizeStart.x ?? keysToInitialize.sizeStart.x,
                behaviour.sizeStart.y ?? keysToInitialize.sizeStart.y,
              ]}
              step="0.1"
              min="0"
              onChange={(value, id) => {
                behaviour.sizeStart[id] = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Start Variance"
              id="size-start-variance"
              value={behaviour.startVariance ?? keysToInitialize.startVariance}
              step="0.1"
              min="0"
              onChange={(value) => {
                behaviour.startVariance = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Size End"
              id="size-end"
              params={["x", "y"]}
              value={[
                behaviour.sizeEnd.x ?? keysToInitialize.sizeEnd.x,
                behaviour.sizeEnd.y ?? keysToInitialize.sizeEnd.y,
              ]}
              step="0.1"
              min="0"
              onChange={(value, id) => {
                behaviour.sizeEnd[id] = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="End Variance"
              id="size-end-variance"
              value={behaviour.endVariance ?? keysToInitialize.endVariance}
              step="0.1"
              min="0"
              onChange={(value) => {
                behaviour.endVariance = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Max Size"
              id="maxSize"
              params={["x", "y"]}
              value={[
                behaviour.maxSize.x ?? keysToInitialize.maxSize.x,
                behaviour.maxSize.y ?? keysToInitialize.maxSize.y,
              ]}
              step="0.1"
              min="0"
              onChange={(value, id) => {
                behaviour.maxSize[id] = value;
                updateBehaviours();
              }}
            />
            <Checkbox
              label="Uniform Scaling"
              id="uniformScaling"
              onChange={(value) => {
                behaviour.uniformScaling = value;
                updateBehaviours();
              }}
              checked={
                behaviour.uniformScaling ?? keysToInitialize.uniformScaling
              }
            />
            <Checkbox
              label="Pulsate"
              id="pulsate"
              onChange={(value) => {
                behaviour.pulsate = value;
                updateBehaviours();
              }}
              checked={behaviour.pulsate ?? keysToInitialize.pulsate}
            />
            {behaviour.pulsate && (
              <>
                <InputNumber
                  label="Pulsation Speed"
                  id="pulsationSpeed"
                  value={
                    behaviour.pulsationSpeed ?? keysToInitialize.pulsationSpeed
                  }
                  step="0.1"
                  onChange={(value) => {
                    behaviour.pulsationSpeed = value;
                    updateBehaviours();
                  }}
                />
                <InputNumber
                  label="Pulsation Amplitude"
                  id="pulsationAmplitude"
                  value={
                    behaviour.pulsationAmplitude ??
                    keysToInitialize.pulsationAmplitude
                  }
                  step="0.1"
                  onChange={(value) => {
                    behaviour.pulsationAmplitude = value;
                    updateBehaviours();
                  }}
                />
              </>
            )}
            <Checkbox
              label="Use Noise"
              id="useNoise"
              onChange={(value) => {
                behaviour.useNoise = value;
                updateBehaviours();
              }}
              checked={behaviour.useNoise ?? keysToInitialize.useNoise}
            />
            {behaviour.useNoise && (
              <>
                <InputNumber
                  label="Noise Scale"
                  id="noiseScale"
                  value={behaviour.noiseScale ?? keysToInitialize.noiseScale}
                  step="0.1"
                  onChange={(value) => {
                    behaviour.noiseScale = value;
                    updateBehaviours();
                  }}
                />
              </>
            )}
            <Checkbox
              label="Invert At Midpoint"
              id="invertAtMidpoint"
              onChange={(value) => {
                behaviour.invertAtMidpoint = value;
                updateBehaviours();
              }}
              checked={
                behaviour.invertAtMidpoint ?? keysToInitialize.invertAtMidpoint
              }
            />
            <InputNumber
              label="Time Offset"
              id="timeOffset"
              value={behaviour.timeOffset ?? keysToInitialize.timeOffset}
              step="0.1"
              min="0"
              onChange={(value) => {
                behaviour.timeOffset = value;
                updateBehaviours();
              }}
            />
            <Select
              label="X Scaling Function"
              defaultValue={
                behaviour.xScalingFunction || keysToInitialize.xScalingFunction
              }
              onChange={(value) => {
                behaviour.xScalingFunction = value;
                updateBehaviours();
              }}
              elements={predefinedEasingFunctions}
            />
            <Select
              label="Y Scaling Function"
              defaultValue={
                behaviour.yScalingFunction || keysToInitialize.yScalingFunction
              }
              onChange={(value) => {
                behaviour.yScalingFunction = value;
                updateBehaviours();
              }}
              elements={predefinedEasingFunctions}
            />
            <Checkbox
              label="Size Alpha Dependency"
              id="sizeAlphaDependency"
              onChange={(value) => {
                behaviour.sizeAlphaDependency = value;
                updateBehaviours();
              }}
              checked={
                behaviour.sizeAlphaDependency ??
                keysToInitialize.sizeAlphaDependency
              }
            />
          </>
        )}
        {behaviour.sizeSteps &&
          behaviour.sizeSteps.map((sizeStep, index) => (
            <Fragment key={index}>
              <hr />
              <h1>Step {index + 1}</h1>
              <InputNumber
                label="Size"
                id="size"
                params={["x", "y"]}
                value={[sizeStep.x ?? sizeStep.x, sizeStep.y ?? sizeStep.y]}
                step="1"
                onChange={(value, id) => {
                  sizeStep[id] = value;
                  updateBehaviours();
                }}
              />
              <br />
              <button
                className="btn btn-default btn-block"
                onClick={(e) => removeSizeStep(index, e)}
                style={{
                  backgroundImage:
                    "linear-gradient(rgb(71 11 11) 0px, rgb(136 13 13) 100%)",
                }}
              >
                Remove Size Step
              </button>
              <br />
              <hr />
            </Fragment>
          ))}
        <br />
        <button className="btn btn-default btn-block" onClick={addSizeStep}>
          Add New Size Step
        </button>
      </div>
    </>
  );
}
