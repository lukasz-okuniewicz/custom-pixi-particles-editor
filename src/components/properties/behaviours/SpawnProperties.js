"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import InputNumber from "@components/html/InputNumber";
import Select from "@components/html/Select";
import InputString from "@components/html/InputString";
import SpawnDescription from "@components/html/behaviourDescriptions/Spawn";
import { Point } from "pixi.js-legacy";
import pixiRefs from "@pixi/pixiRefs";

export default function SpawnProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [isCustomPointSubmenuVisible, setIsCustomPointSubmenuVisible] =
    useState({});
  const [selectedPositionIndex, setSelectedPositionIndex] = useState(null);
  const [selectedPathPositionIndex, setSelectedPathPositionIndex] =
    useState(null);
  const selectedPositionIndexRef = useRef(null);
  const selectedPathPositionIndexRef = useRef(null);

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    priority: 100,
    enabled: true,
    trailingEnabled: false, // Enable trailing
    spawnAlongTrail: false, // Spawn particles along the entire trail
    trailSpeed: 1, // Speed of the trail
    trailRepeat: false, // Loop the trail
    trailStart: 0, // Start the trail at 20% of its path
    trailRangeSegments: 20, // Segments for trail range (higher = finer distribution)
    trailRangeWeightFactor: 4, // Weight decay toward trail end
    customPoints: [
      {
        spawnType: "Rectangle",
        word: "Hello",
        fontSize: 150,
        fontSpacing: 5,
        particleDensity: 1,
        fontMaxWidth: 1334,
        fontMaxHeight: 750,
        textAlign: "center",
        textBaseline: "middle",
        radius: 200,
        radiusX: 100,
        radiusY: 100,
        starPoints: 5,
        rows: 10,
        columns: 10,
        cellSize: 20,
        center: { x: 0, y: 0, z: 0 },
        apex: { x: 0, y: 0, z: 0 },
        spread: 360,
        baseRadius: 200,
        coneDirection: 1,
        height: 200,
        coneAngle: 45,
        position: { x: 0, y: 0 },
        positionVariance: { x: 0, y: 0 },
        perspective: 0, // Distance for perspective
        maxZ: 0, // Maximum z distance for effects
        frequency: { x: 3, y: 2 },
        start: { x: 10, y: 10 },
        end: { x: 20, y: 20 },
        control1: { x: 0, y: 0 },
        control2: { x: 0, y: 0 },
        delta: 1,
        pitch: 50,
        turns: 5,
        pathPoints: [{ x: 0, y: 0, z: 0 }],
      },
    ],
    name: "PositionBehaviour",
  };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);

  const predefinedSpawnType = useMemo(() => {
    const names = {
      Rectangle: true,
      Frame: true,
      FrameRectangle: true,
      Ring: true,
      Star: true,
      Word: true,
      Sphere: true,
      Cone: true,
      Grid: true,
      Lissajous: true,
      Bezier: true,
      Heart: true,
      Helix: true,
      Spring: true,
      Path: true,
      Oval: true,
    };
    return Object.keys(names)
      .sort()
      .map((key) => ({
        key,
        displayName: key,
      }));
  }, []);

  const predefinedTextAlign = useMemo(() => {
    const names = {
      Center: "center",
      End: "end",
      Left: "left",
      Right: "right",
      Start: "start",
    };
    return Object.keys(names)
      .sort()
      .map((key, value) => ({
        key: value,
        displayName: key,
      }));
  }, []);

  const predefinedTextBaseline = useMemo(() => {
    const names = {
      Alphabetic: "alphabetic",
      Bottom: "bottom",
      Hanging: "hanging",
      Ideographic: "ideographic",
      Middle: "middle",
      Top: "top",
    };
    return Object.keys(names)
      .sort()
      .map((key, value) => ({
        key: value,
        displayName: key,
      }));
  }, []);

  // Check if trailing should be disabled for any spawn type
  const shouldHideTrailing = useMemo(() => {
    const customPoints =
      defaultConfig.emitterConfig.behaviours[index]?.customPoints;
    if (!customPoints || customPoints.length === 0) {
      return false;
    }
    const restrictedSpawnTypes = [
      "Word",
      "Sphere",
      "Rectangle",
      "Helix",
      "Grid",
      "Cone",
      "Spring",
    ];
    return customPoints.some(
      (point) =>
        point.spawnType && restrictedSpawnTypes.includes(point.spawnType),
    );
  }, [defaultConfig, index]);

  // Toggle submenu visibility
  const toggleSubmenuVisibility = useCallback(() => {
    setIsSubmenuVisible((prev) => (prev === "collapse" ? "" : "collapse"));
  }, []);

  const toggleCustomPointSubmenuVisibility = useCallback((customPointIndex) => {
    setIsCustomPointSubmenuVisible((prev) => ({
      ...prev,
      [customPointIndex]: !prev[customPointIndex],
    }));
  }, []);

  useEffect(() => {
    const handleWindowClick = (event) => {
      if (selectedPositionIndexRef.current !== null) {
        const localPosition = new Point(0, 0);
        pixiRefs.app.renderer.plugins.interaction.mapPositionToPoint(
          localPosition,
          event.clientX,
          event.clientY,
        );

        const newX = localPosition.x - pixiRefs.app.screen.width / 2;
        const newY = localPosition.y - pixiRefs.app.screen.height / 2;

        if (selectedPathPositionIndexRef.current !== null) {
          behaviour.customPoints[selectedPositionIndexRef.current].pathPoints[
            selectedPathPositionIndexRef.current
          ] = {
            x: parseInt(newX),
            y: parseInt(newY),
            z: 0,
          }; // Update the specific point
        } else {
          behaviour.customPoints[selectedPositionIndexRef.current].position = {
            x: parseInt(newX),
            y: parseInt(newY),
          }; // Update the specific point
        }

        setSelectedPositionIndex(null);
        selectedPositionIndexRef.current = null;
        setSelectedPathPositionIndex(null);
        selectedPathPositionIndexRef.current = null;

        updateBehaviours();
      }
    };

    window.addEventListener("click", handleWindowClick);

    // Cleanup event handlers
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, [defaultConfig]);

  const updateBehaviours = () => {
    defaultConfig.emitterConfig.behaviours[index] = behaviour;
    updateProps(
      "emitterConfig.behaviours",
      defaultConfig.emitterConfig.behaviours,
    );
  };

  const removeCustomSpawnPoint = (index, e) => {
    e.stopPropagation();
    behaviour.customPoints = behaviour.customPoints.filter(
      (_, i) => i !== index,
    );
    updateBehaviours();
  };

  const addCustomSpawnPoint = (e) => {
    e.stopPropagation();
    const newLine = {
      ...keysToInitialize.customPoints[0],
    }; // Default values for new line
    behaviour.customPoints = [...behaviour.customPoints, newLine];
    updateBehaviours();
  };

  const addPathPoint = (e, index) => {
    e.stopPropagation();
    const newPath = { x: 0, y: 0, z: 0 }; // Default values for new line
    behaviour.customPoints[index].pathPoints = [
      ...behaviour.customPoints[index].pathPoints,
      newPath,
    ];
    updateBehaviours();
  };

  const removePathPoint = (e, index, pathIndex) => {
    e.stopPropagation();
    behaviour.customPoints[index].pathPoints = behaviour.customPoints[
      index
    ].pathPoints.filter((_, i) => i !== pathIndex);
    updateBehaviours();
  };

  const selectPosition = (index, event) => {
    event.stopPropagation();
    setSelectedPositionIndex(index);
    selectedPositionIndexRef.current = index;
  };

  const selectPathPoint = (event, index, pathIndex) => {
    event.stopPropagation();
    setSelectedPathPositionIndex(pathIndex);
    selectedPathPositionIndexRef.current = pathIndex;
    selectPosition(index, event);
  };

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>Spawn Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        <SpawnDescription />
        <Checkbox
          label="Enabled"
          id="position-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
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
        {!shouldHideTrailing && (
          <>
            <Checkbox
              label="Trailing Enabled"
              id="trailingEnabled"
              onChange={(value) => {
                behaviour.trailingEnabled = value;
                updateBehaviours();
              }}
              checked={
                behaviour.trailingEnabled ?? keysToInitialize.trailingEnabled
              }
            />
            {behaviour.trailingEnabled && (
              <>
                <Checkbox
                  label="Trailing Repeat"
                  id="trailRepeat"
                  onChange={(value) => {
                    behaviour.trailRepeat = value;
                    updateBehaviours();
                  }}
                  checked={
                    behaviour.trailRepeat ?? keysToInitialize.trailRepeat
                  }
                />
                <Checkbox
                  label="Spawn Along Trail"
                  id="spawnAlongTrail"
                  onChange={(value) => {
                    behaviour.spawnAlongTrail = value;
                    updateBehaviours();
                  }}
                  checked={
                    behaviour.spawnAlongTrail ??
                    keysToInitialize.spawnAlongTrail
                  }
                />
                <InputNumber
                  label="Trail Speed"
                  id="trailSpeed"
                  value={behaviour.trailSpeed ?? keysToInitialize.trailSpeed}
                  step="0.01"
                  onChange={(value) => {
                    behaviour.trailSpeed = value;
                    updateBehaviours();
                  }}
                />
                <InputNumber
                  label="Trail Start 0-1"
                  id="trailStart"
                  value={behaviour.trailStart ?? keysToInitialize.trailStart}
                  step="0.01"
                  onChange={(value) => {
                    behaviour.trailStart = value;
                    updateBehaviours();
                  }}
                />
                {behaviour.spawnAlongTrail && (
                  <>
                    <InputNumber
                      label="Trail Range Segments"
                      id="trailRangeSegments"
                      value={
                        behaviour.trailRangeSegments ??
                        keysToInitialize.trailRangeSegments
                      }
                      step="1"
                      min={2}
                      onChange={(value) => {
                        behaviour.trailRangeSegments = value;
                        updateBehaviours();
                      }}
                    />
                    <InputNumber
                      label="Trail Range Weight Factor"
                      id="trailRangeWeightFactor"
                      value={
                        behaviour.trailRangeWeightFactor ??
                        keysToInitialize.trailRangeWeightFactor
                      }
                      step="0.1"
                      onChange={(value) => {
                        behaviour.trailRangeWeightFactor = value;
                        updateBehaviours();
                      }}
                    />
                  </>
                )}
              </>
            )}
          </>
        )}
        <hr />
        {behaviour.customPoints &&
          behaviour.customPoints.map((customPoint, index) => (
            <Fragment key={index}>
              <h3 onClick={() => toggleCustomPointSubmenuVisibility(index)}>
                Spawn Point {index + 1} - {customPoint.spawnType}
              </h3>
              <div
                className={isCustomPointSubmenuVisible[index] ? "" : "collapse"}
              >
                <InputNumber
                  label="Perspective"
                  id="perspective"
                  value={
                    customPoint.perspective ??
                    keysToInitialize.customPoints[0].perspective
                  }
                  step="100"
                  onChange={(value) => {
                    customPoint.perspective = value;
                    updateBehaviours();
                  }}
                />
                <InputNumber
                  label="Max Z"
                  id="maxZ"
                  value={
                    customPoint.maxZ ?? keysToInitialize.customPoints[0].maxZ
                  }
                  step="100"
                  onChange={(value) => {
                    customPoint.maxZ = value;
                    updateBehaviours();
                  }}
                />
                <InputNumber
                  label="Position"
                  className={customPoint.spawnType === "Path" ? "alert" : ""}
                  id="position"
                  params={["x", "y"]}
                  value={[
                    customPoint.position.x ??
                      keysToInitialize.customPoints[0].position.x,
                    customPoint.position.y ??
                      keysToInitialize.customPoints[0].position.y,
                  ]}
                  step="1"
                  onChange={(value, id) => {
                    customPoint.position[id] = value;
                    updateBehaviours();
                  }}
                />
                <button
                  className={
                    selectedPositionIndex === index &&
                    selectedPathPositionIndex === null
                      ? "btn btn-default btn-block active"
                      : "btn btn-default btn-block"
                  }
                  onClick={(e) => selectPosition(index, e)}
                >
                  Select Position
                </button>
                <InputNumber
                  label="Position Variance"
                  id="position-variance"
                  params={["x", "y"]}
                  value={[
                    customPoint.positionVariance.x ??
                      keysToInitialize.customPoints[0].positionVariance.x,
                    customPoint.positionVariance.y ??
                      keysToInitialize.customPoints[0].positionVariance.y,
                  ]}
                  step="1"
                  onChange={(value, id) => {
                    customPoint.positionVariance[id] = value;
                    updateBehaviours();
                  }}
                />
                <hr />
                <Select
                  label="Spawn Type"
                  defaultValue={
                    customPoint.spawnType ||
                    keysToInitialize.customPoints[0].spawnType
                  }
                  onChange={(value) => {
                    const oldSpawnType = customPoint.spawnType;
                    customPoint.spawnType = value;

                    // Reset trail state when spawn type changes
                    // This prevents issues when switching between spawn types with trailing enabled
                    if (behaviour.trailingEnabled) {
                      // Check if new spawn type is restricted (doesn't support trailing)
                      const restrictedSpawnTypes = [
                        "Word",
                        "Sphere",
                        "Rectangle",
                        "Helix",
                        "Grid",
                        "Cone",
                        "Spring",
                      ];
                      if (restrictedSpawnTypes.includes(value)) {
                        // Disable trailing for restricted types
                        behaviour.trailingEnabled = false;
                        behaviour.trailProgress = 0;
                        behaviour.currentProgress = 0;
                        behaviour.overOne = false;
                      } else if (oldSpawnType !== value) {
                        // Reset trail state when switching between non-restricted types
                        behaviour.trailProgress = 0;
                        behaviour.currentProgress = 0;
                        behaviour.overOne = false;
                      }
                    }

                    updateBehaviours();
                  }}
                  elements={predefinedSpawnType}
                />

                {(customPoint.spawnType === "Star" ||
                  customPoint.spawnType === "Sphere" ||
                  customPoint.spawnType === "Helix" ||
                  customPoint.spawnType === "Spiral" ||
                  customPoint.spawnType === "Heart" ||
                  customPoint.spawnType === "Spring" ||
                  customPoint.spawnType === "Lissajous" ||
                  customPoint.spawnType === "Ring") && (
                  <InputNumber
                    label="Radius"
                    id="radius"
                    value={
                      customPoint.radius ??
                      keysToInitialize.customPoints[0].radius
                    }
                    step="1"
                    onChange={(value) => {
                      customPoint.radius = value;
                      updateBehaviours();
                    }}
                  />
                )}
                {customPoint.spawnType === "Frame" && (
                  <InputNumber
                    label="Area"
                    id="radius"
                    value={
                      customPoint.radius ??
                      keysToInitialize.customPoints[0].radius
                    }
                    step="1"
                    onChange={(value) => {
                      customPoint.radius = value;
                      updateBehaviours();
                    }}
                  />
                )}
                {customPoint.spawnType === "Path" &&
                  customPoint.pathPoints &&
                  customPoint.pathPoints.map((pathPoint, pathIndex) => (
                    <Fragment key={"pathPoint" + pathIndex}>
                      <InputNumber
                        label="Path Point"
                        id="point"
                        params={["x", "y", "z"]}
                        value={[
                          pathPoint.x ?? 0,
                          pathPoint.y ?? 0,
                          pathPoint.z ?? 0,
                        ]}
                        step="1"
                        onChange={(value, id) => {
                          pathPoint[id] = value;
                          updateBehaviours();
                        }}
                      />
                      <div className="form-group">
                        <div className="col-xs-8">
                          <button
                            className={
                              selectedPathPositionIndex === pathIndex
                                ? "btn btn-default btn-block active"
                                : "btn btn-default btn-block"
                            }
                            onClick={(e) =>
                              selectPathPoint(e, index, pathIndex)
                            }
                          >
                            Select Path Point
                          </button>
                        </div>
                        <div className="col-xs-8">
                          <button
                            className="btn btn-default btn-block btn-remove"
                            onClick={(e) =>
                              removePathPoint(e, index, pathIndex)
                            }
                          >
                            Remove Path Point
                          </button>
                        </div>
                      </div>
                    </Fragment>
                  ))}
                {customPoint.spawnType === "Path" && (
                  <>
                    <button
                      className="btn btn-default btn-block"
                      onClick={(e) => addPathPoint(e, index)}
                    >
                      Add Another Path Point
                    </button>
                  </>
                )}
                {customPoint.spawnType === "Lissajous" && (
                  <>
                    <InputNumber
                      label="Frequency"
                      id="frequency"
                      params={["x", "y"]}
                      value={[
                        customPoint.frequency.x ??
                          keysToInitialize.customPoints[0].frequency.x,
                        customPoint.frequency.y ??
                          keysToInitialize.customPoints[0].frequency.y,
                      ]}
                      step="1"
                      onChange={(value, id) => {
                        customPoint.frequency[id] = value;
                        updateBehaviours();
                      }}
                    />
                    <InputNumber
                      label="Delta"
                      id="delta"
                      value={
                        customPoint.delta ??
                        keysToInitialize.customPoints[0].delta
                      }
                      step="1"
                      onChange={(value) => {
                        customPoint.delta = value;
                        updateBehaviours();
                      }}
                    />
                  </>
                )}
                {customPoint.spawnType === "Bezier" && (
                  <>
                    <InputNumber
                      label="Start"
                      id="start"
                      params={["x", "y"]}
                      value={[
                        customPoint.start.x ??
                          keysToInitialize.customPoints[0].start.x,
                        customPoint.start.y ??
                          keysToInitialize.customPoints[0].start.y,
                      ]}
                      step="1"
                      onChange={(value, id) => {
                        customPoint.start[id] = value;
                        updateBehaviours();
                      }}
                    />
                    <InputNumber
                      label="End"
                      id="end"
                      params={["x", "y"]}
                      value={[
                        customPoint.end.x ??
                          keysToInitialize.customPoints[0].end.x,
                        customPoint.end.y ??
                          keysToInitialize.customPoints[0].end.y,
                      ]}
                      step="1"
                      onChange={(value, id) => {
                        customPoint.end[id] = value;
                        updateBehaviours();
                      }}
                    />
                    <InputNumber
                      label="Control 1"
                      id="control1"
                      params={["x", "y"]}
                      value={[
                        customPoint.control1.x ??
                          keysToInitialize.customPoints[0].control1.x,
                        customPoint.control1.y ??
                          keysToInitialize.customPoints[0].control1.y,
                      ]}
                      step="1"
                      onChange={(value, id) => {
                        customPoint.control1[id] = value;
                        updateBehaviours();
                      }}
                    />
                    <InputNumber
                      label="Control 2"
                      id="control2"
                      params={["x", "y"]}
                      value={[
                        customPoint.control2.x ??
                          keysToInitialize.customPoints[0].control2.x,
                        customPoint.control2.y ??
                          keysToInitialize.customPoints[0].control2.y,
                      ]}
                      step="1"
                      onChange={(value, id) => {
                        customPoint.control2[id] = value;
                        updateBehaviours();
                      }}
                    />
                  </>
                )}
                {customPoint.spawnType === "FrameRectangle" && (
                  <InputNumber
                    label="Width"
                    id="radiusx"
                    value={
                      customPoint.radiusX ??
                      keysToInitialize.customPoints[0].radiusX
                    }
                    step="1"
                    onChange={(value) => {
                      customPoint.radiusX = value;
                      updateBehaviours();
                    }}
                  />
                )}
                {customPoint.spawnType === "Oval" && (
                  <InputNumber
                    label="Radius X"
                    id="radiusx"
                    value={
                      customPoint.radiusX ??
                      keysToInitialize.customPoints[0].radiusX
                    }
                    step="1"
                    onChange={(value) => {
                      customPoint.radiusX = value;
                      updateBehaviours();
                    }}
                  />
                )}
                {customPoint.spawnType === "Oval" && (
                  <InputNumber
                    label="Radius Y"
                    id="radiusy"
                    value={
                      customPoint.radiusY ??
                      keysToInitialize.customPoints[0].radiusY
                    }
                    step="1"
                    onChange={(value) => {
                      customPoint.radiusY = value;
                      updateBehaviours();
                    }}
                  />
                )}
                {(customPoint.spawnType === "FrameRectangle" ||
                  customPoint.spawnType === "Helix") && (
                  <InputNumber
                    label="Height"
                    id="radiusy"
                    value={
                      customPoint.radiusY ??
                      keysToInitialize.customPoints[0].radiusY
                    }
                    step="1"
                    onChange={(value) => {
                      customPoint.radiusY = value;
                      updateBehaviours();
                    }}
                  />
                )}
                {(customPoint.spawnType === "Helix" ||
                  customPoint.spawnType === "Spring") && (
                  <>
                    <InputNumber
                      label="Pitch"
                      id="pitch"
                      value={
                        customPoint.pitch ??
                        keysToInitialize.customPoints[0].pitch
                      }
                      step="1"
                      onChange={(value) => {
                        customPoint.pitch = value;
                        updateBehaviours();
                      }}
                    />
                    <InputNumber
                      label="Turns"
                      id="turns"
                      value={
                        customPoint.turns ??
                        keysToInitialize.customPoints[0].turns
                      }
                      step="1"
                      onChange={(value) => {
                        customPoint.turns = value;
                        updateBehaviours();
                      }}
                    />
                  </>
                )}
                {customPoint.spawnType === "Cone" && (
                  <>
                    <InputNumber
                      label="Base Radius"
                      id="baseRadius"
                      value={
                        customPoint.baseRadius ??
                        keysToInitialize.customPoints[0].baseRadius
                      }
                      step="1"
                      onChange={(value) => {
                        customPoint.baseRadius = value;
                        updateBehaviours();
                      }}
                    />
                    <InputNumber
                      label="Angle"
                      id="coneAngle"
                      value={
                        customPoint.coneAngle ??
                        keysToInitialize.customPoints[0].coneAngle
                      }
                      step="1"
                      onChange={(value) => {
                        customPoint.coneAngle = value;
                        updateBehaviours();
                      }}
                    />
                    <InputNumber
                      label="Direction"
                      id="coneDirection"
                      value={
                        customPoint.coneDirection ??
                        keysToInitialize.customPoints[0].coneDirection
                      }
                      step="1"
                      onChange={(value) => {
                        customPoint.coneDirection = value;
                        updateBehaviours();
                      }}
                    />
                    <InputNumber
                      label="Height"
                      id="height"
                      value={
                        customPoint.height ??
                        keysToInitialize.customPoints[0].height
                      }
                      step="1"
                      onChange={(value) => {
                        customPoint.height = value;
                        updateBehaviours();
                      }}
                    />
                    <InputNumber
                      label="Apex"
                      id="apex"
                      params={["x", "y", "z"]}
                      value={[
                        customPoint.apex.x ??
                          keysToInitialize.customPoints[0].apex.x,
                        customPoint.apex.y ??
                          keysToInitialize.customPoints[0].apex.y,
                        customPoint.apex.z ??
                          keysToInitialize.customPoints[0].apex.z,
                      ]}
                      step="1"
                      onChange={(value, id) => {
                        customPoint.apex[id] = value;
                        updateBehaviours();
                      }}
                    />
                  </>
                )}
                {customPoint.spawnType === "Grid" && (
                  <>
                    <InputNumber
                      label="Rows"
                      id="rows"
                      value={
                        customPoint.rows ??
                        keysToInitialize.customPoints[0].rows
                      }
                      step="1"
                      onChange={(value) => {
                        customPoint.rows = value;
                        updateBehaviours();
                      }}
                    />
                    <InputNumber
                      label="Columns"
                      id="columns"
                      value={
                        customPoint.columns ??
                        keysToInitialize.customPoints[0].columns
                      }
                      step="1"
                      onChange={(value) => {
                        customPoint.columns = value;
                        updateBehaviours();
                      }}
                    />
                    <InputNumber
                      label="Cell Size"
                      id="cellSize"
                      value={
                        customPoint.cellSize ??
                        keysToInitialize.customPoints[0].cellSize
                      }
                      step="1"
                      onChange={(value) => {
                        customPoint.cellSize = value;
                        updateBehaviours();
                      }}
                    />
                  </>
                )}
                {customPoint.spawnType === "Sphere" && (
                  <>
                    <InputNumber
                      label="Spread"
                      id="spread"
                      value={
                        customPoint.spread ??
                        keysToInitialize.customPoints[0].spread
                      }
                      step="1"
                      onChange={(value) => {
                        customPoint.spread = value;
                        updateBehaviours();
                      }}
                    />
                    <InputNumber
                      label="Center"
                      id="center"
                      params={["x", "y", "z"]}
                      value={[
                        customPoint.center.x ??
                          keysToInitialize.customPoints[0].center.x,
                        customPoint.center.y ??
                          keysToInitialize.customPoints[0].center.y,
                        customPoint.center.z ??
                          keysToInitialize.customPoints[0].center.z,
                      ]}
                      step="1"
                      onChange={(value, id) => {
                        customPoint.center[id] = value;
                        updateBehaviours();
                      }}
                    />
                  </>
                )}
                {customPoint.spawnType === "Star" && (
                  <InputNumber
                    label="Points"
                    id="starPoints"
                    value={
                      customPoint.starPoints ??
                      keysToInitialize.customPoints[0].starPoints
                    }
                    step="1"
                    onChange={(value) => {
                      customPoint.starPoints = value;
                      updateBehaviours();
                    }}
                  />
                )}
                {customPoint.spawnType === "Word" && (
                  <>
                    <InputString
                      label="Word"
                      id="word"
                      value={
                        customPoint.word ??
                        keysToInitialize.customPoints[0].word
                      }
                      onChange={(value) => {
                        customPoint.word = value;
                        updateBehaviours();
                      }}
                    />
                    <InputNumber
                      label="Font Size"
                      id="fontSize"
                      value={
                        customPoint.fontSize ??
                        keysToInitialize.customPoints[0].fontSize
                      }
                      step="1"
                      onChange={(value) => {
                        customPoint.fontSize = value;
                        updateBehaviours();
                      }}
                    />
                    <InputNumber
                      label="Font Spacing"
                      id="fontSpacing"
                      value={
                        customPoint.fontSpacing ??
                        keysToInitialize.customPoints[0].fontSpacing
                      }
                      step="1"
                      onChange={(value) => {
                        customPoint.fontSpacing = value;
                        updateBehaviours();
                      }}
                    />
                    <InputNumber
                      label="Particle Density"
                      id="particleDensity"
                      value={
                        customPoint.particleDensity ??
                        keysToInitialize.customPoints[0].particleDensity
                      }
                      step="1"
                      onChange={(value) => {
                        customPoint.particleDensity = value;
                        updateBehaviours();
                      }}
                    />
                    <InputNumber
                      label="Font Max Width"
                      id="fontMaxWidth"
                      value={
                        customPoint.fontMaxWidth ??
                        keysToInitialize.customPoints[0].fontMaxWidth
                      }
                      step="1"
                      onChange={(value) => {
                        customPoint.fontMaxWidth = value;
                        updateBehaviours();
                      }}
                    />
                    <InputNumber
                      label="Font Max Height"
                      id="fontMaxHeight"
                      value={
                        customPoint.fontMaxHeight ??
                        keysToInitialize.customPoints[0].fontMaxHeight
                      }
                      step="1"
                      onChange={(value) => {
                        customPoint.fontMaxHeight = value;
                        updateBehaviours();
                      }}
                    />
                    <Select
                      label="Text Align"
                      defaultValue={
                        customPoint.textAlign ||
                        keysToInitialize.customPoints[0].textAlign
                      }
                      onChange={(value) => {
                        customPoint.textAlign = value;
                        updateBehaviours();
                      }}
                      elements={predefinedTextAlign}
                    />
                    <Select
                      label="Text Baseline"
                      defaultValue={
                        customPoint.textBaseline ||
                        keysToInitialize.customPoints[0].textBaseline
                      }
                      onChange={(value) => {
                        customPoint.textBaseline = value;
                        updateBehaviours();
                      }}
                      elements={predefinedTextBaseline}
                    />
                  </>
                )}
                {index > 0 && (
                  <>
                    <br />
                    <button
                      className="btn btn-default btn-block btn-remove"
                      onClick={(e) => removeCustomSpawnPoint(index, e)}
                    >
                      Remove Custom Spawn Point
                    </button>
                    <br />
                  </>
                )}
              </div>
            </Fragment>
          ))}
        <br />
        <button
          className="btn btn-default btn-block"
          onClick={addCustomSpawnPoint}
        >
          Add Another Spawn Point
        </button>
        <br />
      </div>
    </>
  );
}
