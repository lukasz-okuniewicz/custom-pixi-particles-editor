"use client";

import { useCallback, useMemo, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import Select from "@components/html/Select";
import InputNumber from "@components/html/InputNumber";
import PositionDescription from "@components/html/behaviourDescriptions/Position";

export default function PositionProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    priority: 100,
    spawnType: "Rectangle",
    radius: 200,
    warp: false,
    warpSpeed: 0.001,
    warpBaseSpeed: 0.001,
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
    cameraZConverter: 4,
    warpFov: 13,
    warpStretch: 3,
    warpDistanceScaleConverter: 7,
    warpDistanceToCenter: false,
    fromAtoB: false,
    fromAtoBTwoWays: false,
    pointA: { x: -300, y: 0 },
    pointB: { x: 300, y: 0 },
    thereDuration: { min: 7, max: 7 },
    thereAmplitude: { min: 220, max: 330 },
    backDuration: { min: 7, max: 7 },
    backAmplitude: { min: -220, max: -320 },
    there: { x: "Sin", y: "Tan", ease: "power1.inOut" },
    back: { x: "Sin", y: "Tan", ease: "power1.inOut" },
    fromAtoBOneWay: false,
    name: "PositionBehaviour",
  };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);

  const predefinedThereBack = useMemo(() => {
    const names = {
      None: true,
      Sin: true,
      Cos: true,
      Tan: true,
    };
    return Object.keys(names)
      .sort()
      .map((key) => ({
        key,
        displayName: key,
      }));
  }, []);

  const predefinedEase = useMemo(() => {
    const names = {
      None: true,
      "back.in": true,
      "back.out": true,
      "back.inOut": true,
      "power1.in": true,
      "power1.out": true,
      "power1.inOut": true,
      "bounce.in": true,
      "bounce.out": true,
      "bounce.inOut": true,
      "elastic.in": true,
      "elastic.out": true,
      "elastic.inOut": true,
      steps: true,
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

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;
  const renderSinX = () => {
    return (
      <>
        <InputNumber
          label="Sin X Value"
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
        <InputNumber
          label="Sin X Variance"
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
        <InputNumber
          label="Sin Y Value"
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
        <InputNumber
          label="Sin Y Variance"
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

  const renderWarp = () => {
    return (
      <>
        <InputNumber
          label="Position Variance"
          id="position-variance"
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
        <InputNumber
          label="Speed"
          id="speed"
          value={behaviour.warpSpeed ?? keysToInitialize.warpSpeed}
          step="1"
          onChange={(value) => {
            behaviour.warpSpeed = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Base Speed"
          id="base-speed"
          value={behaviour.warpBaseSpeed ?? keysToInitialize.warpBaseSpeed}
          step="0.01"
          onChange={(value) => {
            behaviour.warpBaseSpeed = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Camera Z Converter"
          id="camera-z"
          value={
            behaviour.cameraZConverter ?? keysToInitialize.cameraZConverter
          }
          step="1"
          onChange={(value) => {
            behaviour.cameraZConverter = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="FOV"
          id="fov"
          value={behaviour.warpFov ?? keysToInitialize.warpFov}
          step="1"
          onChange={(value) => {
            behaviour.warpFov = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Stretch"
          id="stretch"
          value={behaviour.warpStretch ?? keysToInitialize.warpStretch}
          step="1"
          onChange={(value) => {
            behaviour.warpStretch = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Distance Scale Converter"
          id="warpDistanceScaleConverter"
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
        <Checkbox
          label="Closer to Center"
          id="closer-to-center"
          onChange={(value) => {
            behaviour.warpDistanceToCenter = value;
            updateBehaviours();
          }}
          checked={
            behaviour.warpDistanceToCenter ??
            keysToInitialize.warpDistanceToCenter
          }
        />
      </>
    );
  };

  const renderNormal = () => {
    return (
      <>
        <InputNumber
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
        <InputNumber
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
        <InputNumber
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
        <InputNumber
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
        <Checkbox
          label="Sin X"
          id="sin-x"
          onChange={(value) => {
            behaviour.sinX = value;
            updateBehaviours();
          }}
          checked={behaviour.sinX ?? keysToInitialize.sinX}
        />
        {behaviour.sinX === true && renderSinX()}
        <Checkbox
          label="Sin Y"
          id="sin-y"
          onChange={(value) => {
            behaviour.sinY = value;
            updateBehaviours();
          }}
          checked={behaviour.sinY ?? keysToInitialize.sinY}
        />
        {behaviour.sinY === true && renderSinY()}
        <hr />
        <Checkbox
          label="Warp Effect"
          id="warp"
          onChange={(value) => {
            behaviour.warp = value;
            updateBehaviours();
          }}
          checked={behaviour.warp ?? keysToInitialize.warp}
        />
        {behaviour.warp === true && renderWarp()}
      </>
    );
  };

  const renderFromAtoB = () => {
    return (
      <>
        <Checkbox
          label="Two Ways"
          id="fromAtoBTwoWays"
          onChange={(value) => {
            behaviour.fromAtoBTwoWays = value;
            updateBehaviours();
          }}
          checked={
            behaviour.fromAtoBTwoWays ?? keysToInitialize.fromAtoBTwoWays
          }
        />
        <Select
          label="There X"
          defaultValue={behaviour.there.x || keysToInitialize.there.x}
          onChange={(value) => {
            behaviour.there.x = value;
            updateBehaviours();
          }}
          elements={predefinedThereBack}
        />
        <Select
          label="There Y"
          defaultValue={behaviour.there.y || keysToInitialize.there.y}
          onChange={(value) => {
            behaviour.there.y = value;
            updateBehaviours();
          }}
          elements={predefinedThereBack}
        />
        <Select
          label="There Ease"
          defaultValue={behaviour.there.ease || keysToInitialize.there.ease}
          onChange={(value) => {
            behaviour.there.ease = value;
            updateBehaviours();
          }}
          elements={predefinedEase}
        />
        <InputNumber
          label="There Duration"
          id="there-duration"
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
        <InputNumber
          label="There Amplitude"
          id="there-duration"
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
        {behaviour.fromAtoBTwoWays === true && renderSecondWay()}
        <hr />
        <InputNumber
          label="Point A"
          id="point-a"
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
        <InputNumber
          label="Point B"
          id="point-b"
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
      </>
    );
  };

  const renderSecondWay = () => {
    return (
      <>
        <hr />
        <Select
          label="Back X"
          defaultValue={behaviour.back.x || keysToInitialize.back.x}
          onChange={(value) => {
            behaviour.back.x = value;
            updateBehaviours();
          }}
          elements={predefinedThereBack}
        />
        <Select
          label="Back Y"
          defaultValue={behaviour.back.y || keysToInitialize.back.y}
          onChange={(value) => {
            behaviour.back.y = value;
            updateBehaviours();
          }}
          elements={predefinedThereBack}
        />
        <Select
          label="Back Ease"
          defaultValue={behaviour.back.ease || keysToInitialize.back.ease}
          onChange={(value) => {
            behaviour.back.ease = value;
            updateBehaviours();
          }}
          elements={predefinedEase}
        />
        <InputNumber
          label="Back Duration"
          id="back-duration"
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
        <InputNumber
          label="Back Amplitude"
          id="back-duration"
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
    );
  };

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>Position Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        <PositionDescription />
        <InputNumber
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
        <Checkbox
          label="From Point A to Point B"
          id="fromAtoB"
          onChange={(value) => {
            behaviour.fromAtoB = value;
            updateBehaviours();
          }}
          checked={behaviour.fromAtoB ?? keysToInitialize.fromAtoB}
        />
        <hr />
        {!behaviour.fromAtoB && renderNormal()}
        {behaviour.fromAtoB === true && renderFromAtoB()}
      </div>
    </>
  );
}
