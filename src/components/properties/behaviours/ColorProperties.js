"use client";

import { useBehaviourSectionCollapse } from "@context/SidebarBehaviourAccordionContext";

import {
  BfSelect,
  BfInputNumber,
  BfCheckbox,
  BfColorPicker,
} from "@components/properties/BehaviourFieldWrappers";
import { Fragment, useCallback, useState } from "react";
import { propertyHint } from "@components/properties/behaviourPropertyHints";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import ColorDescription from "@components/html/behaviourDescriptions/Color";

export default function ColorProperties({ defaultConfig, index, accordionPanelId }) {
  const { isSubmenuVisible, toggleSubmenuVisibility } = useBehaviourSectionCollapse(accordionPanelId);
    if (index === -1) {
    index = (defaultConfig.emitterConfig?.behaviours?.push({}) || 1) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    enabled: false,
    priority: 0,
    start: { _r: 0, _g: 255, _b: 255, _alpha: 1 },
    end: { _r: 255, _g: 0, _b: 0, _alpha: 1 },
    startVariance: { _r: 0, _g: 0, _b: 0, _alpha: 0 },
    endVariance: { _r: 0, _g: 0, _b: 0, _alpha: 0 },
    sinus: false,
    usePerlin: false,
    perParticlePhaseOffset: 0,
    mirrorTransition: false,
    fadeToGray: false,
    fadeToTransparent: false,
    flickerIntensity: 0,
    pulseIntensity: 0,
    pulseSpeed: 0,
    interpolationMode: "rgb",
    segmentEasing: "linear",
    blendMode: "override",
    blendStrength: 1,
    colorStops: [],
    name: "ColorBehaviour",
  };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);
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

  // Toggle submenu visibility
  const updateBehaviours = () => {
    defaultConfig.emitterConfig.behaviours[index] = behaviour;
    updateProps(
      "emitterConfig.behaviours",
      defaultConfig.emitterConfig.behaviours,
    );
  };

  const addColorStop = (e) => {
    e.stopPropagation();
    const newColorStop = {
      r: 255,
      g: 255,
      b: 255,
      alpha: 1,
    }; // Default values for new line
    behaviour.colorStops = [...behaviour.colorStops, newColorStop];
    updateBehaviours();
  };

  const removeColorStop = (index, e) => {
    e.stopPropagation();
    behaviour.colorStops = behaviour.colorStops.filter((_, i) => i !== index);
    updateBehaviours();
  };

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>Color Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        <ColorDescription />
        <BfCheckbox
          label="Enabled"
          id="color-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <BfInputNumber
          label="Priority"
          id="color-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          min="0"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />

        {!behaviour.fadeToTransparent && (
          <>
            <BfCheckbox
              label="Fade In and Out"
              id="fade-in-out"
              onChange={(value) => {
                behaviour.sinus = value;
                updateBehaviours();
              }}
              checked={behaviour.sinus ?? keysToInitialize.sinus}
            />
          </>
        )}

        {!behaviour.colorStops.length && (
          <>
            <BfColorPicker
              id="color-start"
              label="Starting Color"
              color={{
                r: behaviour.start._r ?? keysToInitialize.start._r,
                g: behaviour.start._g ?? keysToInitialize.start._g,
                b: behaviour.start._b ?? keysToInitialize.start._b,
                a: behaviour.start._alpha ?? keysToInitialize.start._alpha,
              }}
              colorChanged={(color) => {
                behaviour.start._r = color.rgb.r;
                behaviour.start._g = color.rgb.g;
                behaviour.start._b = color.rgb.b;
                behaviour.start._alpha = color.rgb.a;
                updateBehaviours();
              }}
            />
            <BfColorPicker
              id="color-start-variance"
              label="Starting Color Variance"
              color={{
                r:
                  behaviour.startVariance._r ??
                  keysToInitialize.startVariance._r,
                g:
                  behaviour.startVariance._g ??
                  keysToInitialize.startVariance._g,
                b:
                  behaviour.startVariance._b ??
                  keysToInitialize.startVariance._b,
                a:
                  behaviour.startVariance._alpha ??
                  keysToInitialize.startVariance._alpha,
              }}
              colorChanged={(color) => {
                behaviour.startVariance._r = color.rgb.r;
                behaviour.startVariance._g = color.rgb.g;
                behaviour.startVariance._b = color.rgb.b;
                behaviour.startVariance._alpha = color.rgb.a;
                updateBehaviours();
              }}
            />
            <BfColorPicker
              id="color-end"
              label="Ending Color"
              color={{
                r: behaviour.end._r ?? keysToInitialize.end._r,
                g: behaviour.end._g ?? keysToInitialize.end._g,
                b: behaviour.end._b ?? keysToInitialize.end._b,
                a: behaviour.end._alpha ?? keysToInitialize.end._alpha,
              }}
              colorChanged={(color) => {
                behaviour.end._r = color.rgb.r;
                behaviour.end._g = color.rgb.g;
                behaviour.end._b = color.rgb.b;
                behaviour.end._alpha = color.rgb.a;
                updateBehaviours();
              }}
            />
            <BfColorPicker
              id="color-end-variance"
              label="Ending Color Variance"
              color={{
                r: behaviour.endVariance._r ?? keysToInitialize.endVariance._r,
                g: behaviour.endVariance._g ?? keysToInitialize.endVariance._g,
                b: behaviour.endVariance._b ?? keysToInitialize.endVariance._b,
                a:
                  behaviour.endVariance._alpha ??
                  keysToInitialize.endVariance._alpha,
              }}
              colorChanged={(color) => {
                behaviour.endVariance._r = color.rgb.r;
                behaviour.endVariance._g = color.rgb.g;
                behaviour.endVariance._b = color.rgb.b;
                behaviour.endVariance._alpha = color.rgb.a;
                updateBehaviours();
              }}
            />
            <BfCheckbox
              label="Use Perlin"
              id="color-usePerlin"
              onChange={(value) => {
                behaviour.usePerlin = value;
                updateBehaviours();
              }}
              checked={behaviour.usePerlin ?? keysToInitialize.usePerlin}
            />
            <BfInputNumber
              label="Per Particle Phase Offset"
              id="color-perParticlePhaseOffset"
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
              id="color-interpolationMode"
              defaultValue={behaviour.interpolationMode ?? keysToInitialize.interpolationMode}
              onChange={(value) => {
                behaviour.interpolationMode = value;
                updateBehaviours();
              }}
              elements={interpolationOptions}
            />
            <BfSelect
              label="Segment Easing"
              id="color-segmentEasing"
              defaultValue={behaviour.segmentEasing ?? keysToInitialize.segmentEasing}
              onChange={(value) => {
                behaviour.segmentEasing = value;
                updateBehaviours();
              }}
              elements={easingOptions}
            />
            <BfSelect
              label="Blend Mode"
              id="color-blendMode"
              defaultValue={behaviour.blendMode ?? keysToInitialize.blendMode}
              onChange={(value) => {
                behaviour.blendMode = value;
                updateBehaviours();
              }}
              elements={blendOptions}
            />
            <BfInputNumber
              label="Blend Strength"
              id="color-blendStrength"
              value={behaviour.blendStrength ?? keysToInitialize.blendStrength}
              step="0.05"
              min="0"
              max="1"
              onChange={(value) => {
                behaviour.blendStrength = value;
                updateBehaviours();
              }}
            />
            <BfCheckbox
              label="Mirror Transition"
              id="color-mirrorTransition"
              onChange={(value) => {
                behaviour.mirrorTransition = value;
                updateBehaviours();
              }}
              checked={
                behaviour.mirrorTransition ?? keysToInitialize.mirrorTransition
              }
            />
            <BfCheckbox
              label="Fade To Gray"
              id="color-fadeToGray"
              onChange={(value) => {
                behaviour.fadeToGray = value;
                updateBehaviours();
              }}
              checked={behaviour.fadeToGray ?? keysToInitialize.fadeToGray}
            />
            {!behaviour.sinus && (
              <>
                <BfCheckbox
                  label="Fade To Transparent"
                  id="color-fadeToTransparent"
                  onChange={(value) => {
                    behaviour.fadeToTransparent = value;
                    updateBehaviours();
                  }}
                  checked={
                    behaviour.fadeToTransparent ??
                    keysToInitialize.fadeToTransparent
                  }
                />
              </>
            )}

            <BfInputNumber
              label={`Flicker Intensity`}
              id={`color-flickerIntensity`}
              value={behaviour.flickerIntensity}
              step="0.1"
              onChange={(value) => {
                behaviour.flickerIntensity = value;
                updateBehaviours();
              }}
            />
            <BfInputNumber
              label={`Pulse Intensity`}
              id={`color-pulseIntensity`}
              value={behaviour.pulseIntensity}
              step="0.1"
              onChange={(value) => {
                behaviour.pulseIntensity = value;
                updateBehaviours();
              }}
            />
            <BfInputNumber
              label={`Pulse Speed`}
              id={`color-pulseSpeed`}
              value={behaviour.pulseSpeed}
              step="0.1"
              onChange={(value) => {
                behaviour.pulseSpeed = value;
                updateBehaviours();
              }}
            />
            <hr />
          </>
        )}
        {behaviour.colorStops &&
          behaviour.colorStops.map((colorStop, index) => (
            <Fragment key={index}>
              <hr />
              <h1>Color Stop {index + 1}</h1>
              <BfColorPicker
                id={`color-stop-${index}`}
                label="Stop"
                tooltipText={propertyHint("color-gradient-stop")}
                color={{
                  r: colorStop.r,
                  g: colorStop.g,
                  b: colorStop.b,
                  a: colorStop.alpha,
                }}
                colorChanged={(color) => {
                  colorStop.r = color.rgb.r;
                  colorStop.g = color.rgb.g;
                  colorStop.b = color.rgb.b;
                  colorStop.alpha = color.rgb.a;
                  updateBehaviours();
                }}
              />
              <br />
              <button
                className="btn btn-default btn-block"
                onClick={(e) => removeColorStop(index, e)}
                style={{
                  backgroundImage:
                    "linear-gradient(rgb(71 11 11) 0px, rgb(136 13 13) 100%)",
                }}
              >
                Remove Color Stop
              </button>
              <br />
              <hr />
            </Fragment>
          ))}
        <br />
        <button className="btn btn-default btn-block" onClick={addColorStop}>
          Add New Color Stop
        </button>
      </div>
    </>
  );
}
