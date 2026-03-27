"use client";

import { useBehaviourSectionCollapse } from "@context/SidebarBehaviourAccordionContext";

import {
  BfSelect,
  BfCheckbox,
  BfInputNumber,
} from "@components/properties/BehaviourFieldWrappers";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import LifeDescription from "@components/html/behaviourDescriptions/Life";

export default function LifeProperties({ defaultConfig, index, accordionPanelId }) {
  const { isSubmenuVisible, toggleSubmenuVisibility } = useBehaviourSectionCollapse(accordionPanelId);
    if (index === -1) {
    index = (defaultConfig.emitterConfig?.behaviours?.push({}) || 1) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    enabled: true,
    priority: 10000,
    maxLifeTime: 1.4,
    timeVariance: 0.4,
    progressMode: "linear",
    startDelay: 0,
    startDelayVariance: 0,
    timeScale: 1,
    timeScaleVariance: 0,
    infiniteLifeVisualPeriod: 5,
    infiniteLifePhaseOffset: 0,
    killAtProgress: -1,
    useLifeProgressForInfiniteTimeline: false,
    name: "LifeBehaviour",
  };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);
  const progressModeOptions = [
    { key: "linear", displayName: "Linear" },
    { key: "loop", displayName: "Loop" },
    { key: "pingPong", displayName: "Ping Pong" },
  ];

  // Toggle submenu visibility
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
      <legend onClick={toggleSubmenuVisibility}>Life Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        <LifeDescription />
        <BfCheckbox
          label="Enabled"
          id="life-enabled"
          checked={behaviour.enabled ?? keysToInitialize.enabled}
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          tooltipText="Enable or disable life progression updates."
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
        <hr />
        <BfInputNumber
          label="Max Life Time (-1 = infinite)"
          id="max-life-time"
          value={behaviour.maxLifeTime ?? keysToInitialize.maxLifeTime}
          step="1"
          onChange={(value) => {
            behaviour.maxLifeTime = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Time Variance"
          id="time-variance"
          value={behaviour.timeVariance ?? keysToInitialize.timeVariance}
          step="1"
          onChange={(value) => {
            behaviour.timeVariance = value;
            updateBehaviours();
          }}
        />
        <BfSelect
          label="Progress Mode"
          id="life-progress-mode"
          defaultValue={behaviour.progressMode ?? keysToInitialize.progressMode}
          elements={progressModeOptions}
          onChange={(value) => {
            behaviour.progressMode = value;
            updateBehaviours();
          }}
          tooltipText="Linear clamps 0..1. Loop repeats 0..1. Ping Pong alternates forward/backward."
        />
        <BfInputNumber
          label="Start Delay"
          id="life-start-delay"
          value={behaviour.startDelay ?? keysToInitialize.startDelay}
          step="0.1"
          min="0"
          onChange={(value) => {
            behaviour.startDelay = value;
            updateBehaviours();
          }}
          tooltipText="Delay in seconds before life starts progressing."
        />
        <BfInputNumber
          label="Start Delay Variance"
          id="life-start-delay-variance"
          value={
            behaviour.startDelayVariance ?? keysToInitialize.startDelayVariance
          }
          step="0.1"
          min="0"
          onChange={(value) => {
            behaviour.startDelayVariance = value;
            updateBehaviours();
          }}
          tooltipText="Randomized per-particle offset added/subtracted from Start Delay."
        />
        <BfInputNumber
          label="Time Scale"
          id="life-time-scale"
          value={behaviour.timeScale ?? keysToInitialize.timeScale}
          step="0.1"
          min="0"
          onChange={(value) => {
            behaviour.timeScale = value;
            updateBehaviours();
          }}
          tooltipText="Multiplier for how fast particle life advances."
        />
        <BfInputNumber
          label="Time Scale Variance"
          id="life-time-scale-variance"
          value={behaviour.timeScaleVariance ?? keysToInitialize.timeScaleVariance}
          step="0.1"
          min="0"
          onChange={(value) => {
            behaviour.timeScaleVariance = value;
            updateBehaviours();
          }}
          tooltipText="Randomized per-particle variation for Time Scale."
        />
        <BfInputNumber
          label="Infinite life: visual period (sec)"
          id="infinite-life-visual-period"
          value={
            behaviour.infiniteLifeVisualPeriod ??
            keysToInitialize.infiniteLifeVisualPeriod
          }
          step="0.5"
          min="0.1"
          onChange={(value) => {
            behaviour.infiniteLifeVisualPeriod = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Infinite life: phase offset (sec)"
          id="infinite-life-phase-offset"
          value={
            behaviour.infiniteLifePhaseOffset ??
            keysToInitialize.infiniteLifePhaseOffset
          }
          step="0.1"
          min="0"
          onChange={(value) => {
            behaviour.infiniteLifePhaseOffset = value;
            updateBehaviours();
          }}
          tooltipText="Randomized phase offset base for infinite life cycling."
        />
        <BfCheckbox
          label="Timeline uses life progress for infinite life"
          id="life-use-progress-infinite-timeline"
          checked={
            behaviour.useLifeProgressForInfiniteTimeline ??
            keysToInitialize.useLifeProgressForInfiniteTimeline
          }
          onChange={(value) => {
            behaviour.useLifeProgressForInfiniteTimeline = value;
            updateBehaviours();
          }}
          tooltipText="When enabled, TimelineBehaviour animates infinite-life particles using lifeProgress."
        />
        <BfInputNumber
          label="Kill At Progress (-1 disabled)"
          id="life-kill-at-progress"
          value={behaviour.killAtProgress ?? keysToInitialize.killAtProgress}
          step="0.05"
          min="-1"
          max="1"
          onChange={(value) => {
            behaviour.killAtProgress = value;
            updateBehaviours();
          }}
          tooltipText="Optional early-death threshold based on lifeProgress (0..1)."
        />
        <p className="explanation" style={{ fontSize: "0.85em", marginTop: 4 }}>
          When max life is infinite, life progress repeats every this many seconds
          so Color and other life-based effects keep animating.
        </p>
      </div>
    </>
  );
}
