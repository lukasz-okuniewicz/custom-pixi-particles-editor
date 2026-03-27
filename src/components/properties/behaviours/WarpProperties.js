"use client";

import { useBehaviourSectionCollapse } from "@context/SidebarBehaviourAccordionContext";
import {
  BfCheckbox,
  BfInputNumber,
} from "@components/properties/BehaviourFieldWrappers";
import {
  ensureBehaviourIndexByName,
  mergeObjectsWithDefaults,
  updateProps,
} from "@utils";
import WarpDescription from "@components/html/behaviourDescriptions/Warp";

export default function WarpProperties({ defaultConfig, index, accordionPanelId }) {
  const { isSubmenuVisible, toggleSubmenuVisibility } =
    useBehaviourSectionCollapse(accordionPanelId);

  if (index === -1) {
    index = ensureBehaviourIndexByName("WarpBehaviour", defaultConfig);
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    enabled: false,
    priority: 90,
    warpSpeed: 0.001,
    warpBaseSpeed: 0.001,
    cameraZConverter: 4,
    warpFov: 13,
    warpStretch: 3,
    warpDistanceScaleConverter: 7,
    warpDistanceToCenter: false,
    positionVariance: { x: 100, y: 100 },
    name: "WarpBehaviour",
  };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);

  const updateBehaviours = () => {
    defaultConfig.emitterConfig.behaviours[index] = behaviour;
    updateProps("emitterConfig.behaviours", defaultConfig.emitterConfig.behaviours);
  };

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>Warp Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        <WarpDescription />
        <BfCheckbox
          label="Enabled"
          id="warp-enabled"
          checked={behaviour.enabled ?? keysToInitialize.enabled}
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Priority"
          id="warp-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Position Variance"
          id="warp-position-variance"
          params={["x", "y"]}
          value={[
            behaviour.positionVariance.x ?? keysToInitialize.positionVariance.x,
            behaviour.positionVariance.y ?? keysToInitialize.positionVariance.y,
          ]}
          step="1"
          onChange={(value, id) => {
            behaviour.positionVariance[id] = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Speed"
          id="warp-speed"
          value={behaviour.warpSpeed ?? keysToInitialize.warpSpeed}
          step="1"
          onChange={(value) => {
            behaviour.warpSpeed = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Base Speed"
          id="warp-base-speed"
          value={behaviour.warpBaseSpeed ?? keysToInitialize.warpBaseSpeed}
          step="0.01"
          onChange={(value) => {
            behaviour.warpBaseSpeed = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Camera Z Converter"
          id="warp-camera-z-converter"
          value={behaviour.cameraZConverter ?? keysToInitialize.cameraZConverter}
          step="1"
          onChange={(value) => {
            behaviour.cameraZConverter = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="FOV"
          id="warp-fov"
          value={behaviour.warpFov ?? keysToInitialize.warpFov}
          step="1"
          onChange={(value) => {
            behaviour.warpFov = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Stretch"
          id="warp-stretch"
          value={behaviour.warpStretch ?? keysToInitialize.warpStretch}
          step="1"
          onChange={(value) => {
            behaviour.warpStretch = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Distance Scale Converter"
          id="warp-distance-scale-converter"
          value={
            behaviour.warpDistanceScaleConverter ??
            keysToInitialize.warpDistanceScaleConverter
          }
          step="1"
          onChange={(value) => {
            behaviour.warpDistanceScaleConverter = value;
            updateBehaviours();
          }}
        />
        <BfCheckbox
          label="Closer to Center"
          id="warp-distance-to-center"
          checked={
            behaviour.warpDistanceToCenter ??
            keysToInitialize.warpDistanceToCenter
          }
          onChange={(value) => {
            behaviour.warpDistanceToCenter = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}
