"use client";

import {
  BfInputNumber,
  BfCheckbox,
} from "@components/properties/BehaviourFieldWrappers";
import { useCallback, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import BeatPhaseLockDescription from "@components/html/behaviourDescriptions/BeatPhaseLock";

export default function BeatPhaseLockProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "BeatPhaseLockBehaviour",
    enabled: false,
    priority: -35,
    bpm: 120,
    phaseOffset: 0,
    lockStrength: 0.85,
    jitter: 0.1,
    harmonic: 1,
    writePhaseForVisual: true,
    applyScalePulse: false,
    scalePulseAmount: 0.15,
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
      <legend onClick={toggleSubmenuVisibility}>Beat Phase Lock</legend>
      <div className={`${isSubmenuVisible}`}>
        <BeatPhaseLockDescription />
        <p className="text-xs opacity-80 mb-2">
          BPM-locked phase; sets beatPhase01 on particles for color pipelines.
        </p>
        <BfCheckbox
          label="Enabled"
          id="bpl-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <BfInputNumber
          label="Priority"
          id="bpl-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="1"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="BPM"
          id="bpl-bpm"
          value={behaviour.bpm ?? keysToInitialize.bpm}
          step="1"
          min="1"
          onChange={(value) => {
            behaviour.bpm = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Phase offset"
          id="bpl-phase"
          value={behaviour.phaseOffset ?? keysToInitialize.phaseOffset}
          step="0.1"
          onChange={(value) => {
            behaviour.phaseOffset = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Lock strength"
          id="bpl-lock"
          value={behaviour.lockStrength ?? keysToInitialize.lockStrength}
          step="0.05"
          min="0"
          max="1"
          onChange={(value) => {
            behaviour.lockStrength = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Jitter"
          id="bpl-jitter"
          value={behaviour.jitter ?? keysToInitialize.jitter}
          step="0.05"
          onChange={(value) => {
            behaviour.jitter = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Harmonic"
          id="bpl-harmonic"
          value={behaviour.harmonic ?? keysToInitialize.harmonic}
          step="1"
          min="1"
          onChange={(value) => {
            behaviour.harmonic = value;
            updateBehaviours();
          }}
        />
        <BfCheckbox
          label="Write phase for visual"
          id="bpl-write"
          onChange={(value) => {
            behaviour.writePhaseForVisual = value;
            updateBehaviours();
          }}
          checked={
            behaviour.writePhaseForVisual ?? keysToInitialize.writePhaseForVisual
          }
        />
        <BfCheckbox
          label="Apply scale pulse"
          id="bpl-scale"
          onChange={(value) => {
            behaviour.applyScalePulse = value;
            updateBehaviours();
          }}
          checked={behaviour.applyScalePulse ?? keysToInitialize.applyScalePulse}
        />
        <BfInputNumber
          label="Scale pulse amount"
          id="bpl-scaleAmt"
          value={behaviour.scalePulseAmount ?? keysToInitialize.scalePulseAmount}
          step="0.05"
          onChange={(value) => {
            behaviour.scalePulseAmount = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
