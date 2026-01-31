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
import InputNumber from "@components/html/InputNumber";
import Checkbox from "@components/html/Checkbox";
import Select from "@components/html/Select";
import { Point } from "pixi.js";
import pixiRefs from "@pixi/pixiRefs";
import ForceFieldsDescription from "@components/html/behaviourDescriptions/ForceFields";

export default function ForceFieldsProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [selectedPositionIndex, setSelectedPositionIndex] = useState(null);
  const selectedPositionIndexRef = useRef(null);

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    enabled: false,
    priority: 300,
    fields: [],
    name: "ForceFieldsBehaviour",
  };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);

  // Toggle submenu visibility
  const toggleSubmenuVisibility = useCallback(() => {
    setIsSubmenuVisible((prev) => (prev === "collapse" ? "" : "collapse"));
  }, []);

  const predefinedType = useMemo(() => {
    const names = {
      Wind: "wind",
      Gravity: "gravity",
      Turbulence: "turbulence",
    };
    return Object.keys(names)
      .sort()
      .map((key) => ({
        key: names[key],
        displayName: key,
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

        behaviour.fields[selectedPositionIndexRef.current].position = {
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

  const updatePosition = (index, updatedValue, id) => {
    behaviour.fields[index].position[id] = updatedValue;
    updateBehaviours();
  };

  const updateStrength = (index, updatedValue) => {
    behaviour.fields[index].strength = updatedValue;
    updateBehaviours();
  };

  const updateRadius = (index, updatedValue) => {
    behaviour.fields[index].radius = updatedValue;
    updateBehaviours();
  };

  const updateType = (index, updatedValue) => {
    behaviour.fields[index].type = updatedValue;
    updateBehaviours();
  };

  const updateDirection = (index, updatedValue, id) => {
    behaviour.fields[index].direction[id] = updatedValue;
    updateBehaviours();
  };

  const addField = (e) => {
    e.stopPropagation();
    setSelectedPositionIndex(null);
    selectedPositionIndexRef.current = null;
    const newPosition = {
      position: { x: 0, y: 0 },
      direction: { x: 1, y: 0 },
      radius: 150,
      strength: 150,
      type: "turbulence",
    }; // Default values for new point
    behaviour.fields = [...behaviour.fields, newPosition];

    updateBehaviours();
  };

  const selectPosition = (index, event) => {
    event.stopPropagation();
    setSelectedPositionIndex(index);
    selectedPositionIndexRef.current = index;
  };

  const removeField = (index, e) => {
    e.stopPropagation();
    setSelectedPositionIndex(null);
    selectedPositionIndexRef.current = null;
    behaviour.fields = behaviour.fields.filter((_, i) => i !== index);
    updateBehaviours();
  };

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>Force Fields Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        <ForceFieldsDescription />
        <Checkbox
          label="Enabled"
          id="attraction-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? false}
        />
        <InputNumber
          label="Priority"
          id="attraction-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          min="0"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        {behaviour.fields &&
          behaviour.fields.map((field, index) => (
            <Fragment key={index}>
              <hr />
              <h1>Field {index + 1}</h1>
              <InputNumber
                label={`Position`}
                id={`field-${index + 1}-position`}
                params={["x", "y"]}
                value={[field.position.x, field.position.y]}
                step="1"
                onChange={(value, id) => updatePosition(index, value, id)}
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
                label={`Radius`}
                id={`field-${index + 1}-radius`}
                value={field.radius}
                step="10"
                onChange={(value) => updateRadius(index, value)}
              />
              <InputNumber
                label={`Strength`}
                id={`field-${index + 1}-strength`}
                value={field.strength}
                step="10"
                onChange={(value) => updateStrength(index, value)}
              />
              <Select
                label="Type"
                defaultValue={field.type || keysToInitialize.type}
                onChange={(value) => updateType(index, value)}
                elements={predefinedType}
              />
              {field.type === "wind" && (
                <InputNumber
                  label={`Direction`}
                  id={`field-${index + 1}-direction`}
                  params={["x", "y"]}
                  value={[field.direction.x, field.direction.y]}
                  step="1"
                  onChange={(value, id) => updateDirection(index, value, id)}
                />
              )}

              <br />
              <button
                className="btn btn-default btn-block"
                onClick={(e) => removeField(index, e)}
                style={{
                  backgroundImage:
                    "linear-gradient(rgb(71 11 11) 0px, rgb(136 13 13) 100%)",
                }}
              >
                Remove Field
              </button>
            </Fragment>
          ))}
        <hr />
        <br />
        <button className="btn btn-default btn-block" onClick={addField}>
          Add New Field
        </button>
      </div>
    </>
  );
}
