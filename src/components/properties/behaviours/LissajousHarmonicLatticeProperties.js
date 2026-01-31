"use client";

import { useCallback, useState } from "react";
import InputNumber from "@components/html/InputNumber";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import LissajousHarmonicLatticeDescription from "@components/html/behaviourDescriptions/LissajousHarmonicLattice";

export default function LissajousHarmonicLatticeProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "LissajousHarmonicLatticeBehaviour",
    enabled: false,
    priority: -50,
    freqX: 1,
    freqY: 2,
    freqZ: 3,
    amplitude: 30,
    speed: 1,
    phaseScale: 0.1,
    scaleXY: 1,
    writeRestorationForAlpha: true,
    writeDensityForScale: true,
    restorationNormalize: 1,
    alphaScale: 1,
    scaleFromDensity: 1,
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
        Lissajous Harmonic Lattice Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <LissajousHarmonicLatticeDescription />
        <Checkbox
          label="Enabled"
          id="lissajous-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="lissajous-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Freq X"
          id="lissajous-freqX"
          value={behaviour.freqX ?? keysToInitialize.freqX}
          step="0.5"
          onChange={(value) => {
            behaviour.freqX = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Freq Y"
          id="lissajous-freqY"
          value={behaviour.freqY ?? keysToInitialize.freqY}
          step="0.5"
          onChange={(value) => {
            behaviour.freqY = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Freq Z"
          id="lissajous-freqZ"
          value={behaviour.freqZ ?? keysToInitialize.freqZ}
          step="0.5"
          onChange={(value) => {
            behaviour.freqZ = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Amplitude"
          id="lissajous-amplitude"
          value={behaviour.amplitude ?? keysToInitialize.amplitude}
          step="1"
          onChange={(value) => {
            behaviour.amplitude = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Speed"
          id="lissajous-speed"
          value={behaviour.speed ?? keysToInitialize.speed}
          step="0.1"
          onChange={(value) => {
            behaviour.speed = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Phase Scale"
          id="lissajous-phaseScale"
          value={behaviour.phaseScale ?? keysToInitialize.phaseScale}
          step="0.02"
          onChange={(value) => {
            behaviour.phaseScale = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Scale XY"
          id="lissajous-scaleXY"
          value={behaviour.scaleXY ?? keysToInitialize.scaleXY}
          step="0.1"
          onChange={(value) => {
            behaviour.scaleXY = value;
            updateBehaviours();
          }}
        />
        <Checkbox
          label="Write Restoration For Alpha"
          id="lissajous-writeRestorationForAlpha"
          onChange={(value) => {
            behaviour.writeRestorationForAlpha = value;
            updateBehaviours();
          }}
          checked={behaviour.writeRestorationForAlpha ?? keysToInitialize.writeRestorationForAlpha}
        />
        <Checkbox
          label="Write Density For Scale"
          id="lissajous-writeDensityForScale"
          onChange={(value) => {
            behaviour.writeDensityForScale = value;
            updateBehaviours();
          }}
          checked={behaviour.writeDensityForScale ?? keysToInitialize.writeDensityForScale}
        />
        <InputNumber
          label="Restoration Normalize"
          id="lissajous-restorationNormalize"
          value={behaviour.restorationNormalize ?? keysToInitialize.restorationNormalize}
          step="0.1"
          onChange={(value) => {
            behaviour.restorationNormalize = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Alpha Scale"
          id="lissajous-alphaScale"
          value={behaviour.alphaScale ?? keysToInitialize.alphaScale}
          step="0.1"
          onChange={(value) => {
            behaviour.alphaScale = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Scale From Density"
          id="lissajous-scaleFromDensity"
          value={behaviour.scaleFromDensity ?? keysToInitialize.scaleFromDensity}
          step="0.1"
          onChange={(value) => {
            behaviour.scaleFromDensity = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
