"use client";

import { useBehaviourSectionCollapse } from "@context/SidebarBehaviourAccordionContext";
import {
  BfSelect,
  BfInputNumber,
  BfCheckbox,
} from "@components/properties/BehaviourFieldWrappers";
import { useMemo } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import PointToPointDescription from "@components/html/behaviourDescriptions/PointToPoint";

export default function PointToPointProperties({ defaultConfig, index, accordionPanelId }) {
  const { isSubmenuVisible, toggleSubmenuVisibility } = useBehaviourSectionCollapse(accordionPanelId);
  if (index === -1) {
    index = (defaultConfig.emitterConfig?.behaviours?.push({}) || 1) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "PointToPointBehaviour",
    enabled: false,
    priority: 90,
    fromAtoBTwoWays: false,
    pointA: { x: -300, y: 0 },
    pointB: { x: 300, y: 0 },
    thereDuration: { min: 7, max: 7 },
    thereAmplitude: { min: 220, max: 330 },
    backDuration: { min: 7, max: 7 },
    backAmplitude: { min: -220, max: -320 },
    there: { x: "Sin", y: "Tan", ease: "power1.inOut" },
    back: { x: "Sin", y: "Tan", ease: "power1.inOut" },
  };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);

  const predefinedThereBack = useMemo(
    () =>
      ["None", "Sin", "Cos", "Tan"].map((key) => ({
        key,
        displayName: key,
      })),
    [],
  );

  const predefinedEase = useMemo(
    () =>
      [
        "None",
        "back.in",
        "back.out",
        "back.inOut",
        "power1.in",
        "power1.out",
        "power1.inOut",
        "bounce.in",
        "bounce.out",
        "bounce.inOut",
        "elastic.in",
        "elastic.out",
        "elastic.inOut",
        "steps",
      ].map((key) => ({
        key,
        displayName: key,
      })),
    [],
  );

  const updateBehaviours = () => {
    defaultConfig.emitterConfig.behaviours[index] = behaviour;
    updateProps("emitterConfig.behaviours", defaultConfig.emitterConfig.behaviours);
  };

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>Point To Point Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        <PointToPointDescription />
        <BfCheckbox
          label="Enabled"
          id="point-to-point-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <BfInputNumber
          label="Priority"
          id="point-to-point-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <hr />
        <BfCheckbox
          label="Two Ways"
          id="point-to-point-two-ways"
          onChange={(value) => {
            behaviour.fromAtoBTwoWays = value;
            updateBehaviours();
          }}
          checked={behaviour.fromAtoBTwoWays ?? keysToInitialize.fromAtoBTwoWays}
        />
        <BfSelect
          label="There X"
          defaultValue={behaviour.there.x || keysToInitialize.there.x}
          onChange={(value) => {
            behaviour.there.x = value;
            updateBehaviours();
          }}
          elements={predefinedThereBack}
        />
        <BfSelect
          label="There Y"
          defaultValue={behaviour.there.y || keysToInitialize.there.y}
          onChange={(value) => {
            behaviour.there.y = value;
            updateBehaviours();
          }}
          elements={predefinedThereBack}
        />
        <BfSelect
          label="There Ease"
          defaultValue={behaviour.there.ease || keysToInitialize.there.ease}
          onChange={(value) => {
            behaviour.there.ease = value;
            updateBehaviours();
          }}
          elements={predefinedEase}
        />
        <BfInputNumber
          label="There Duration"
          id="point-to-point-there-duration"
          params={["min", "max"]}
          value={[
            behaviour.thereDuration.min ?? keysToInitialize.thereDuration.min,
            behaviour.thereDuration.max ?? keysToInitialize.thereDuration.max,
          ]}
          step="0.1"
          onChange={(value, id) => {
            behaviour.thereDuration[id] = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="There Amplitude"
          id="point-to-point-there-amplitude"
          params={["min", "max"]}
          value={[
            behaviour.thereAmplitude.min ?? keysToInitialize.thereAmplitude.min,
            behaviour.thereAmplitude.max ?? keysToInitialize.thereAmplitude.max,
          ]}
          step="0.1"
          onChange={(value, id) => {
            behaviour.thereAmplitude[id] = value;
            updateBehaviours();
          }}
        />
        {behaviour.fromAtoBTwoWays ? (
          <>
            <hr />
            <BfSelect
              label="Back X"
              defaultValue={behaviour.back.x || keysToInitialize.back.x}
              onChange={(value) => {
                behaviour.back.x = value;
                updateBehaviours();
              }}
              elements={predefinedThereBack}
            />
            <BfSelect
              label="Back Y"
              defaultValue={behaviour.back.y || keysToInitialize.back.y}
              onChange={(value) => {
                behaviour.back.y = value;
                updateBehaviours();
              }}
              elements={predefinedThereBack}
            />
            <BfSelect
              label="Back Ease"
              defaultValue={behaviour.back.ease || keysToInitialize.back.ease}
              onChange={(value) => {
                behaviour.back.ease = value;
                updateBehaviours();
              }}
              elements={predefinedEase}
            />
            <BfInputNumber
              label="Back Duration"
              id="point-to-point-back-duration"
              params={["min", "max"]}
              value={[
                behaviour.backDuration.min ?? keysToInitialize.backDuration.min,
                behaviour.backDuration.max ?? keysToInitialize.backDuration.max,
              ]}
              step="0.1"
              onChange={(value, id) => {
                behaviour.backDuration[id] = value;
                updateBehaviours();
              }}
            />
            <BfInputNumber
              label="Back Amplitude"
              id="point-to-point-back-amplitude"
              params={["min", "max"]}
              value={[
                behaviour.backAmplitude.min ?? keysToInitialize.backAmplitude.min,
                behaviour.backAmplitude.max ?? keysToInitialize.backAmplitude.max,
              ]}
              step="0.1"
              onChange={(value, id) => {
                behaviour.backAmplitude[id] = value;
                updateBehaviours();
              }}
            />
          </>
        ) : null}
        <hr />
        <BfInputNumber
          label="Point A"
          id="point-to-point-a"
          params={["x", "y"]}
          value={[
            behaviour.pointA.x ?? keysToInitialize.pointA.x,
            behaviour.pointA.y ?? keysToInitialize.pointA.y,
          ]}
          step="0.1"
          onChange={(value, id) => {
            behaviour.pointA[id] = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Point B"
          id="point-to-point-b"
          params={["x", "y"]}
          value={[
            behaviour.pointB.x ?? keysToInitialize.pointB.x,
            behaviour.pointB.y ?? keysToInitialize.pointB.y,
          ]}
          step="0.1"
          onChange={(value, id) => {
            behaviour.pointB[id] = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
