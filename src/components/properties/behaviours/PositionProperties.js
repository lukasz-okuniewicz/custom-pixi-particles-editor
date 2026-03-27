"use client";

import { useBehaviourSectionCollapse } from "@context/SidebarBehaviourAccordionContext";

import {
  BfSelect,
  BfInputNumber,
  BfCheckbox,
} from "@components/properties/BehaviourFieldWrappers";
import { useMemo } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import PositionDescription from "@components/html/behaviourDescriptions/Position";

export default function PositionProperties({ defaultConfig, index, accordionPanelId }) {
  const { isSubmenuVisible, toggleSubmenuVisibility } = useBehaviourSectionCollapse(accordionPanelId);
    if (index === -1) {
    index = (defaultConfig.emitterConfig?.behaviours?.push({}) || 1) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    priority: 100,
    spawnType: "Rectangle",
    radius: 200,
    sinX: false,
    sinY: false,
    sinXVal: { x: 50, y: 10 },
    sinYVal: { x: 50, y: 10 },
    sinXValVariance: { x: 100, y: 20 },
    sinYValVariance: { x: 100, y: 20 },
    position: { x: 0, y: 0 },
    positionVariance: { x: 100, y: 100 },
    velocity: { x: 0, y: 0 },
    velocityVariance: { x: 50, y: 50 },
    acceleration: { x: 0, y: 0 },
    accelerationVariance: { x: 0, y: 0 },
    drag: 0,
    dragVariance: 0,
    maxSpeed: -1,
    maxSpeedVariance: 0,
    boundsMode: "none",
    boundsMin: { x: -1000, y: -1000 },
    boundsMax: { x: 1000, y: 1000 },
    bounceDamping: 1,
    name: "PositionBehaviour",
  };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);
  const boundsModes = useMemo(
    () => [
      { key: "none", displayName: "None" },
      { key: "wrap", displayName: "Wrap" },
      { key: "bounce", displayName: "Bounce" },
      { key: "clamp", displayName: "Clamp" },
    ],
    [],
  );


  // Toggle submenu visibility
  const updateBehaviours = () => {
    defaultConfig.emitterConfig.behaviours[index] = behaviour;
    updateProps(
      "emitterConfig.behaviours",
      defaultConfig.emitterConfig.behaviours,
    );
  };

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;
  const renderSinX = () => {
    return (
      <>
        <BfInputNumber
          label="Horizontal Oscillation (Amp/Freq)"
          id="sin-x-value"
          params={["x", "y"]}
          value={[
            behaviour.sinXVal.x ?? keysToInitialize.sinXVal.x,
            behaviour.sinXVal.y ?? keysToInitialize.sinXVal.y,
          ]}
          step="1"
          onChange={(value, id) => {
            behaviour.sinXVal[id] = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Horizontal Oscillation Variance"
          id="sin-x-variance"
          params={["x", "y"]}
          value={[
            behaviour.sinXValVariance.x ?? keysToInitialize.sinXValVariance.x,
            behaviour.sinXValVariance.y ?? keysToInitialize.sinXValVariance.y,
          ]}
          step="1"
          onChange={(value, id) => {
            behaviour.sinXValVariance[id] = value;
            updateBehaviours();
          }}
        />
        <hr />
      </>
    );
  };

  const renderSinY = () => {
    return (
      <>
        <BfInputNumber
          label="Vertical Oscillation (Amp/Freq)"
          id="sin-y-value"
          params={["x", "y"]}
          value={[
            behaviour.sinYVal.x ?? keysToInitialize.sinYVal.x,
            behaviour.sinYVal.y ?? keysToInitialize.sinYVal.y,
          ]}
          step="1"
          onChange={(value, id) => {
            behaviour.sinYVal[id] = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Vertical Oscillation Variance"
          id="sin-y-variance"
          params={["x", "y"]}
          value={[
            behaviour.sinYValVariance.x ?? keysToInitialize.sinYValVariance.x,
            behaviour.sinYValVariance.y ?? keysToInitialize.sinYValVariance.y,
          ]}
          step="1"
          onChange={(value, id) => {
            behaviour.sinYValVariance[id] = value;
            updateBehaviours();
          }}
        />
      </>
    );
  };

  const renderNormal = () => {
    return (
      <>
        <BfInputNumber
          label="Velocity"
          id="velocity"
          params={["x", "y"]}
          value={[
            behaviour.velocity.x ?? keysToInitialize.velocity.x,
            behaviour.velocity.y ?? keysToInitialize.velocity.y,
          ]}
          step="1"
          onChange={(value, id) => {
            behaviour.velocity[id] = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Velocity Variance"
          id="velocity-variance"
          params={["x", "y"]}
          value={[
            behaviour.velocityVariance.x ?? keysToInitialize.velocityVariance.x,
            behaviour.velocityVariance.y ?? keysToInitialize.velocityVariance.y,
          ]}
          step="1"
          onChange={(value, id) => {
            behaviour.velocityVariance[id] = value;
            updateBehaviours();
          }}
        />
        <hr />
        <BfInputNumber
          label="Gravity/Acceleration"
          id="gravity"
          params={["x", "y"]}
          value={[
            behaviour.acceleration.x ?? keysToInitialize.acceleration.x,
            behaviour.acceleration.y ?? keysToInitialize.acceleration.y,
          ]}
          step="1"
          onChange={(value, id) => {
            behaviour.acceleration[id] = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Gravity Variance"
          id="gravity-variance"
          params={["x", "y"]}
          value={[
            behaviour.accelerationVariance.x ??
              keysToInitialize.accelerationVariance.x,
            behaviour.accelerationVariance.y ??
              keysToInitialize.accelerationVariance.y,
          ]}
          step="1"
          onChange={(value, id) => {
            behaviour.accelerationVariance[id] = value;
            updateBehaviours();
          }}
        />
        <hr />
        <BfInputNumber
          label="Drag"
          id="position-drag"
          value={behaviour.drag ?? keysToInitialize.drag}
          step="0.01"
          min="0"
          onChange={(value) => {
            behaviour.drag = value;
            updateBehaviours();
          }}
          tooltipText="Linear damping applied to velocity each second."
        />
        <BfInputNumber
          label="Drag Variance"
          id="position-drag-variance"
          value={behaviour.dragVariance ?? keysToInitialize.dragVariance}
          step="0.01"
          min="0"
          onChange={(value) => {
            behaviour.dragVariance = value;
            updateBehaviours();
          }}
          tooltipText="Per-particle random variation for drag."
        />
        <BfInputNumber
          label="Max Speed (-1 disabled)"
          id="position-max-speed"
          value={behaviour.maxSpeed ?? keysToInitialize.maxSpeed}
          step="1"
          onChange={(value) => {
            behaviour.maxSpeed = value;
            updateBehaviours();
          }}
          tooltipText="Caps particle speed magnitude. Use -1 to disable."
        />
        <BfInputNumber
          label="Max Speed Variance"
          id="position-max-speed-variance"
          value={behaviour.maxSpeedVariance ?? keysToInitialize.maxSpeedVariance}
          step="1"
          min="0"
          onChange={(value) => {
            behaviour.maxSpeedVariance = value;
            updateBehaviours();
          }}
          tooltipText="Per-particle random variation for max speed."
        />
        <BfSelect
          label="Bounds Mode"
          id="position-bounds-mode"
          defaultValue={behaviour.boundsMode ?? keysToInitialize.boundsMode}
          onChange={(value) => {
            behaviour.boundsMode = value;
            updateBehaviours();
          }}
          elements={boundsModes}
        />
        {behaviour.boundsMode !== "none" && (
          <>
            <BfInputNumber
              label="Bounds Min"
              id="position-bounds-min"
              params={["x", "y"]}
              value={[
                behaviour.boundsMin.x ?? keysToInitialize.boundsMin.x,
                behaviour.boundsMin.y ?? keysToInitialize.boundsMin.y,
              ]}
              step="1"
              onChange={(value, id) => {
                behaviour.boundsMin[id] = value;
                updateBehaviours();
              }}
              tooltipText="Lower X/Y limit for bounds mode."
            />
            <BfInputNumber
              label="Bounds Max"
              id="position-bounds-max"
              params={["x", "y"]}
              value={[
                behaviour.boundsMax.x ?? keysToInitialize.boundsMax.x,
                behaviour.boundsMax.y ?? keysToInitialize.boundsMax.y,
              ]}
              step="1"
              onChange={(value, id) => {
                behaviour.boundsMax[id] = value;
                updateBehaviours();
              }}
              tooltipText="Upper X/Y limit for bounds mode."
            />
            {behaviour.boundsMode === "bounce" && (
              <BfInputNumber
                label="Bounce Damping"
                id="position-bounce-damping"
                value={behaviour.bounceDamping ?? keysToInitialize.bounceDamping}
                step="0.1"
                min="0"
                onChange={(value) => {
                  behaviour.bounceDamping = value;
                  updateBehaviours();
                }}
                tooltipText="Velocity multiplier after each bounce (1 = full energy)."
              />
            )}
          </>
        )}
        <hr />
        <BfCheckbox
          label="Horizontal Oscillation"
          id="sin-x"
          onChange={(value) => {
            behaviour.sinX = value;
            updateBehaviours();
          }}
          checked={behaviour.sinX ?? keysToInitialize.sinX}
        />
        {behaviour.sinX === true && renderSinX()}
        <BfCheckbox
          label="Vertical Oscillation"
          id="sin-y"
          onChange={(value) => {
            behaviour.sinY = value;
            updateBehaviours();
          }}
          checked={behaviour.sinY ?? keysToInitialize.sinY}
        />
        {behaviour.sinY === true && renderSinY()}
      </>
    );
  };


  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>Position Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        <PositionDescription />
        <BfInputNumber
          label="Priority"
          id="position-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          min="0"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <hr />
        {renderNormal()}
      </div>
    </>
  );
}
