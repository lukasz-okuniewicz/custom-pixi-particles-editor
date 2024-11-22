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
  const [selectedPositionIndex, setSelectedPositionIndex] = useState(null);
  const selectedPositionIndexRef = useRef(null);

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    priority: 100,
    enabled: true,
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

  // Toggle submenu visibility
  const toggleSubmenuVisibility = useCallback(() => {
    setIsSubmenuVisible((prev) => (prev === "collapse" ? "" : "collapse"));
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

        behaviour.customPoints[selectedPositionIndexRef.current].position = {
          x: parseInt(newX),
          y: parseInt(newY),
        }; // Update the specific point

        setSelectedPositionIndex(null);
        selectedPositionIndexRef.current = null;

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
      ...JSON.parse(JSON.stringify(behaviour.customPoints[0])),
    }; // Default values for new line
    behaviour.customPoints = [...behaviour.customPoints, newLine];
    updateBehaviours();
  };

  const selectPosition = (index, event) => {
    event.stopPropagation();
    setSelectedPositionIndex(index);
    selectedPositionIndexRef.current = index;
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
        {behaviour.customPoints &&
          behaviour.customPoints.map((customPoint, index) => (
            <Fragment key={index}>
              <br />
              <hr />
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
                  selectedPositionIndex === index
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
              <Select
                label="Spawn Type"
                defaultValue={
                  customPoint.spawnType ||
                  keysToInitialize.customPoints[0].spawnType
                }
                onChange={(value) => {
                  customPoint.spawnType = value;
                  updateBehaviours();
                }}
                elements={predefinedSpawnType}
              />

              {(customPoint.spawnType === "Star" ||
                customPoint.spawnType === "Sphere" ||
                customPoint.spawnType === "Helix" ||
                customPoint.spawnType === "Spiral" ||
                customPoint.spawnType === "Heart" ||
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
              {customPoint.spawnType === "Helix" && (
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
                      customPoint.rows ?? keysToInitialize.customPoints[0].rows
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
                      customPoint.word ?? keysToInitialize.customPoints[0].word
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
                  <button
                    className="btn btn-default btn-block"
                    onClick={(e) => removeCustomSpawnPoint(index, e)}
                    style={{
                      backgroundImage:
                        "linear-gradient(rgb(71 11 11) 0px, rgb(136 13 13) 100%)",
                    }}
                  >
                    Remove Custom Spawn Point
                  </button>
                </>
              )}
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
