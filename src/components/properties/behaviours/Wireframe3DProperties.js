"use client";

import { useCallback, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import InputNumber from "@components/html/InputNumber";
import Select from "@components/html/Select";
import Wireframe3DDescription from "@components/html/behaviourDescriptions/Wireframe3D";

export default function Wireframe3DProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  if (index === -1) {
    index = defaultConfig.emitterConfig.behaviours.length;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    enabled: false,
    priority: 50,
    shapeType: "cube",
    size: 100,
    rotationSpeedX: 0.5,
    rotationSpeedY: 0.3,
    rotationSpeedZ: 0.2,
    lineColor: 0xffffff,
    lineWidth: 1,
    perspective: 400,
    cameraZ: 500,
    depthStyle: "none",
    sortByDepth: false,
    orbitEnabled: false,
    orbitRadius: 50,
    orbitSpeed: 1,
    pulsateEnabled: false,
    pulsateMin: 80,
    pulsateMax: 120,
    pulsateSpeed: 2,
    pathType: "none",
    pathSpeed: 1,
    pathScale: 50,
    dashedEnabled: false,
    dashLength: 10,
    gapLength: 5,
    colorOverTimeEnabled: false,
    colorOverTimeSpeed: 1,
    perVertexColor: false,
    noiseWobbleEnabled: false,
    noiseWobbleAmount: 10,
    noiseWobbleSpeed: 1,
    attractParticlesEnabled: false,
    attractStrength: 0.5,
    latticeSegmentsX: 4,
    latticeSegmentsY: 4,
    latticeSegmentsZ: 4,
    gridSegments: 8,
    torusInnerRadius: 0.4,
    cylinderHeight: 1,
    customVertices: [],
    customEdges: [],
    wireframes: [],
    name: "Wireframe3DBehaviour",
  };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);

  const toggleSubmenuVisibility = useCallback(() => {
    setIsSubmenuVisible((prev) => (prev === "collapse" ? "" : "collapse"));
  }, []);

  const updateBehaviours = () => {
    defaultConfig.emitterConfig.behaviours[index] = behaviour;
    updateProps("emitterConfig.behaviours", defaultConfig.emitterConfig.behaviours);
  };

  const shapeOptions = [
    { key: "cube", displayName: "Cube" },
    { key: "sphere", displayName: "Sphere" },
    { key: "pyramid", displayName: "Pyramid" },
    { key: "torus", displayName: "Torus" },
    { key: "cylinder", displayName: "Cylinder" },
    { key: "tetrahedron", displayName: "Tetrahedron" },
    { key: "octahedron", displayName: "Octahedron" },
    { key: "grid", displayName: "Grid" },
    { key: "lattice", displayName: "Lattice" },
    { key: "custom", displayName: "Custom" },
  ];

  const depthStyleOptions = [
    { key: "none", displayName: "None" },
    { key: "fade", displayName: "Fade" },
    { key: "thickness", displayName: "Thickness" },
    { key: "both", displayName: "Both" },
  ];

  const pathTypeOptions = [
    { key: "none", displayName: "None" },
    { key: "circle", displayName: "Circle" },
    { key: "lissajous", displayName: "Lissajous" },
    { key: "figure8", displayName: "Figure 8" },
  ];

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;
  
  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>
        Wireframe 3D Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <Wireframe3DDescription />
        <Checkbox
          label="Enabled"
          id="wireframe-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? false}
        />
        <InputNumber
          label="Priority"
          id="wireframe-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          min="0"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <Select
          label="Shape"
          defaultValue={behaviour.shapeType ?? keysToInitialize.shapeType}
          onChange={(value) => {
            behaviour.shapeType = value;
            updateBehaviours();
          }}
          elements={shapeOptions}
        />
        <InputNumber
          label="Size"
          id="wireframe-size"
          value={behaviour.size ?? keysToInitialize.size}
          step="5"
          min="1"
          onChange={(value) => {
            behaviour.size = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Rotation speed X"
          id="wireframe-rotationSpeedX"
          value={behaviour.rotationSpeedX ?? keysToInitialize.rotationSpeedX}
          step="0.1"
          onChange={(value) => {
            behaviour.rotationSpeedX = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Rotation speed Y"
          id="wireframe-rotationSpeedY"
          value={behaviour.rotationSpeedY ?? keysToInitialize.rotationSpeedY}
          step="0.1"
          onChange={(value) => {
            behaviour.rotationSpeedY = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Rotation speed Z"
          id="wireframe-rotationSpeedZ"
          value={behaviour.rotationSpeedZ ?? keysToInitialize.rotationSpeedZ}
          step="0.1"
          onChange={(value) => {
            behaviour.rotationSpeedZ = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Line color (hex)"
          id="wireframe-lineColor"
          value={behaviour.lineColor ?? keysToInitialize.lineColor}
          step="1"
          min="0"
          onChange={(value) => {
            behaviour.lineColor = Number(value);
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Line width"
          id="wireframe-lineWidth"
          value={behaviour.lineWidth ?? keysToInitialize.lineWidth}
          step="0.5"
          min="0.5"
          onChange={(value) => {
            behaviour.lineWidth = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Perspective"
          id="wireframe-perspective"
          value={behaviour.perspective ?? keysToInitialize.perspective}
          step="50"
          min="0"
          onChange={(value) => {
            behaviour.perspective = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Camera Z"
          id="wireframe-cameraZ"
          value={behaviour.cameraZ ?? keysToInitialize.cameraZ}
          step="50"
          min="1"
          onChange={(value) => {
            behaviour.cameraZ = value;
            updateBehaviours();
          }}
        />

        <legend className="sub-legend">Depth &amp; visibility</legend>
        <Select
          label="Depth style"
          defaultValue={behaviour.depthStyle ?? keysToInitialize.depthStyle}
          onChange={(value) => {
            behaviour.depthStyle = value;
            updateBehaviours();
          }}
          elements={depthStyleOptions}
        />
        <Checkbox
          label="Sort by depth"
          id="wireframe-sortByDepth"
          onChange={(value) => {
            behaviour.sortByDepth = value;
            updateBehaviours();
          }}
          checked={behaviour.sortByDepth ?? false}
        />

        <legend className="sub-legend">Motion</legend>
        <Checkbox
          label="Orbit"
          id="wireframe-orbitEnabled"
          onChange={(value) => {
            behaviour.orbitEnabled = value;
            updateBehaviours();
          }}
          checked={behaviour.orbitEnabled ?? false}
        />
        {behaviour.orbitEnabled && (
          <>
            <InputNumber
              label="Orbit radius"
              id="wireframe-orbitRadius"
              value={behaviour.orbitRadius ?? keysToInitialize.orbitRadius}
              step="5"
              min="0"
              onChange={(value) => {
                behaviour.orbitRadius = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Orbit speed"
              id="wireframe-orbitSpeed"
              value={behaviour.orbitSpeed ?? keysToInitialize.orbitSpeed}
              step="0.1"
              onChange={(value) => {
                behaviour.orbitSpeed = value;
                updateBehaviours();
              }}
            />
          </>
        )}
        <Checkbox
          label="Pulsate size"
          id="wireframe-pulsateEnabled"
          onChange={(value) => {
            behaviour.pulsateEnabled = value;
            updateBehaviours();
          }}
          checked={behaviour.pulsateEnabled ?? false}
        />
        {behaviour.pulsateEnabled && (
          <>
            <InputNumber
              label="Pulsate min"
              id="wireframe-pulsateMin"
              value={behaviour.pulsateMin ?? keysToInitialize.pulsateMin}
              step="5"
              min="1"
              onChange={(value) => {
                behaviour.pulsateMin = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Pulsate max"
              id="wireframe-pulsateMax"
              value={behaviour.pulsateMax ?? keysToInitialize.pulsateMax}
              step="5"
              min="1"
              onChange={(value) => {
                behaviour.pulsateMax = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Pulsate speed"
              id="wireframe-pulsateSpeed"
              value={behaviour.pulsateSpeed ?? keysToInitialize.pulsateSpeed}
              step="0.1"
              onChange={(value) => {
                behaviour.pulsateSpeed = value;
                updateBehaviours();
              }}
            />
          </>
        )}
        <Select
          label="Path"
          defaultValue={behaviour.pathType ?? keysToInitialize.pathType}
          onChange={(value) => {
            behaviour.pathType = value;
            updateBehaviours();
          }}
          elements={pathTypeOptions}
        />
        {(behaviour.pathType ?? keysToInitialize.pathType) !== "none" && (
          <>
            <InputNumber
              label="Path speed"
              id="wireframe-pathSpeed"
              value={behaviour.pathSpeed ?? keysToInitialize.pathSpeed}
              step="0.1"
              onChange={(value) => {
                behaviour.pathSpeed = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Path scale"
              id="wireframe-pathScale"
              value={behaviour.pathScale ?? keysToInitialize.pathScale}
              step="5"
              min="0"
              onChange={(value) => {
                behaviour.pathScale = value;
                updateBehaviours();
              }}
            />
          </>
        )}

        <legend className="sub-legend">Line style</legend>
        <Checkbox
          label="Dashed lines"
          id="wireframe-dashedEnabled"
          onChange={(value) => {
            behaviour.dashedEnabled = value;
            updateBehaviours();
          }}
          checked={behaviour.dashedEnabled ?? false}
        />
        {behaviour.dashedEnabled && (
          <>
            <InputNumber
              label="Dash length"
              id="wireframe-dashLength"
              value={behaviour.dashLength ?? keysToInitialize.dashLength}
              step="1"
              min="1"
              onChange={(value) => {
                behaviour.dashLength = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Gap length"
              id="wireframe-gapLength"
              value={behaviour.gapLength ?? keysToInitialize.gapLength}
              step="1"
              min="0"
              onChange={(value) => {
                behaviour.gapLength = value;
                updateBehaviours();
              }}
            />
          </>
        )}
        <Checkbox
          label="Color over time"
          id="wireframe-colorOverTimeEnabled"
          onChange={(value) => {
            behaviour.colorOverTimeEnabled = value;
            updateBehaviours();
          }}
          checked={behaviour.colorOverTimeEnabled ?? false}
        />
        {behaviour.colorOverTimeEnabled && (
          <InputNumber
            label="Color speed"
            id="wireframe-colorOverTimeSpeed"
            value={behaviour.colorOverTimeSpeed ?? keysToInitialize.colorOverTimeSpeed}
            step="0.1"
            onChange={(value) => {
              behaviour.colorOverTimeSpeed = value;
              updateBehaviours();
            }}
          />
        )}
        <Checkbox
          label="Per-vertex color (depth)"
          id="wireframe-perVertexColor"
          onChange={(value) => {
            behaviour.perVertexColor = value;
            updateBehaviours();
          }}
          checked={behaviour.perVertexColor ?? false}
        />

        <legend className="sub-legend">Procedural</legend>
        <Checkbox
          label="Noise wobble"
          id="wireframe-noiseWobbleEnabled"
          onChange={(value) => {
            behaviour.noiseWobbleEnabled = value;
            updateBehaviours();
          }}
          checked={behaviour.noiseWobbleEnabled ?? false}
        />
        {behaviour.noiseWobbleEnabled && (
          <>
            <InputNumber
              label="Wobble amount"
              id="wireframe-noiseWobbleAmount"
              value={behaviour.noiseWobbleAmount ?? keysToInitialize.noiseWobbleAmount}
              step="1"
              min="0"
              onChange={(value) => {
                behaviour.noiseWobbleAmount = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Wobble speed"
              id="wireframe-noiseWobbleSpeed"
              value={behaviour.noiseWobbleSpeed ?? keysToInitialize.noiseWobbleSpeed}
              step="0.1"
              onChange={(value) => {
                behaviour.noiseWobbleSpeed = value;
                updateBehaviours();
              }}
            />
          </>
        )}

        <legend className="sub-legend">Particle interaction</legend>
        <Checkbox
          label="Attract particles"
          id="wireframe-attractParticlesEnabled"
          onChange={(value) => {
            behaviour.attractParticlesEnabled = value;
            updateBehaviours();
          }}
          checked={behaviour.attractParticlesEnabled ?? false}
        />
        {behaviour.attractParticlesEnabled && (
          <InputNumber
            label="Attract strength"
            id="wireframe-attractStrength"
            value={behaviour.attractStrength ?? keysToInitialize.attractStrength}
            step="0.1"
            min="0"
            onChange={(value) => {
              behaviour.attractStrength = value;
              updateBehaviours();
            }}
          />
        )}

        <legend className="sub-legend">Shape options</legend>
        {(behaviour.shapeType ?? keysToInitialize.shapeType) === "lattice" && (
          <>
            <InputNumber
              label="Lattice X"
              id="wireframe-latticeSegmentsX"
              value={behaviour.latticeSegmentsX ?? keysToInitialize.latticeSegmentsX}
              step="1"
              min="1"
              onChange={(value) => {
                behaviour.latticeSegmentsX = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Lattice Y"
              id="wireframe-latticeSegmentsY"
              value={behaviour.latticeSegmentsY ?? keysToInitialize.latticeSegmentsY}
              step="1"
              min="1"
              onChange={(value) => {
                behaviour.latticeSegmentsY = value;
                updateBehaviours();
              }}
            />
            <InputNumber
              label="Lattice Z"
              id="wireframe-latticeSegmentsZ"
              value={behaviour.latticeSegmentsZ ?? keysToInitialize.latticeSegmentsZ}
              step="1"
              min="1"
              onChange={(value) => {
                behaviour.latticeSegmentsZ = value;
                updateBehaviours();
              }}
            />
          </>
        )}
        {(behaviour.shapeType ?? keysToInitialize.shapeType) === "grid" && (
          <InputNumber
            label="Grid segments"
            id="wireframe-gridSegments"
            value={behaviour.gridSegments ?? keysToInitialize.gridSegments}
            step="1"
            min="2"
            onChange={(value) => {
              behaviour.gridSegments = value;
              updateBehaviours();
            }}
          />
        )}
        {(behaviour.shapeType ?? keysToInitialize.shapeType) === "torus" && (
          <InputNumber
            label="Torus inner (0–1)"
            id="wireframe-torusInnerRadius"
            value={behaviour.torusInnerRadius ?? keysToInitialize.torusInnerRadius}
            step="0.05"
            min="0.1"
            max="1"
            onChange={(value) => {
              behaviour.torusInnerRadius = value;
              updateBehaviours();
            }}
          />
        )}
        {(behaviour.shapeType ?? keysToInitialize.shapeType) === "cylinder" && (
          <InputNumber
            label="Cylinder height mult"
            id="wireframe-cylinderHeight"
            value={behaviour.cylinderHeight ?? keysToInitialize.cylinderHeight}
            step="0.1"
            min="0.1"
            onChange={(value) => {
              behaviour.cylinderHeight = value;
              updateBehaviours();
            }}
          />
        )}
      </div>
    </>
  );
}
