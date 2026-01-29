"use client";

import { useCallback, useState } from "react";
import Checkbox from "@components/html/Checkbox";
import InputNumber from "@components/html/InputNumber";
import { updateProps } from "@utils";

/**
 * Renders a generic properties panel for custom behaviours (those not in the
 * built-in list). Allows editing enabled, priority, and raw JSON.
 * Used when a config contains behaviours registered via BehaviourRegistry.
 */
export default function CustomBehaviourProperties({
  defaultConfig,
  customBehaviours,
}) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [jsonErrorByIndex, setJsonErrorByIndex] = useState({});

  const toggleSubmenuVisibility = useCallback(() => {
    setIsSubmenuVisible((prev) => (prev === "collapse" ? "" : "collapse"));
  }, []);

  const updateBehaviourAt = useCallback(
    (index, patch) => {
      if (!defaultConfig?.emitterConfig?.behaviours?.[index]) return;
      defaultConfig.emitterConfig.behaviours[index] = {
        ...defaultConfig.emitterConfig.behaviours[index],
        ...patch,
      };
      updateProps(
        "emitterConfig.behaviours",
        defaultConfig.emitterConfig.behaviours,
      );
    },
    [defaultConfig],
  );

  const handleJsonChange = useCallback(
    (index, rawJson) => {
      setJsonErrorByIndex((prev) => ({ ...prev, [index]: null }));
      try {
        const parsed = JSON.parse(rawJson);
        if (typeof parsed !== "object" || parsed === null) {
          setJsonErrorByIndex((prev) => ({
            ...prev,
            [index]: "Must be a JSON object",
          }));
          return;
        }
        if (parsed.name === undefined || parsed.name === "") {
          setJsonErrorByIndex((prev) => ({
            ...prev,
            [index]: "Object must have a 'name' property",
          }));
          return;
        }
        defaultConfig.emitterConfig.behaviours[index] = parsed;
        updateProps(
          "emitterConfig.behaviours",
          defaultConfig.emitterConfig.behaviours,
        );
      } catch (e) {
        setJsonErrorByIndex((prev) => ({
          ...prev,
          [index]: e.message || "Invalid JSON",
        }));
      }
    },
    [defaultConfig],
  );

  if (!customBehaviours?.length) return null;
  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return null;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>Custom behaviours</legend>
      <div className={`${isSubmenuVisible}`}>
        <p className="form-group text-muted small">
          These behaviours are not built-in. Register them with
          BehaviourRegistry in your app so they run when config is loaded.
        </p>
        {customBehaviours.map(({ index, name }) => {
        const behaviour =
          defaultConfig.emitterConfig.behaviours[index] || {};
        const isExpanded = expandedIndex === index;
        return (
          <div key={`${index}-${name}`} className="form-group">
            <div
              role="button"
              tabIndex={0}
              onClick={() =>
                setExpandedIndex(isExpanded ? null : index)
              }
              onKeyDown={(e) =>
                e.key === "Enter" &&
                setExpandedIndex(isExpanded ? null : index)
              }
              className="cursor-pointer font-weight-bold mb-2"
              style={{ cursor: "pointer" }}
            >
              Custom: {name}
            </div>
            {isExpanded && (
              <div>
                <Checkbox
                  label="Enabled"
                  id={`custom-${index}-enabled`}
                  checked={behaviour.enabled !== false}
                  onChange={(value) =>
                    updateBehaviourAt(index, { enabled: value })
                  }
                />
                <InputNumber
                  label="Priority"
                  id={`custom-${index}-priority`}
                  value={behaviour.priority ?? 0}
                  step="10"
                  onChange={(value) =>
                    updateBehaviourAt(index, { priority: value })
                  }
                />
                <div className="form-group">
                  <label className="form-label">Raw JSON</label>
                  <textarea
                    className="form-control"
                    rows={8}
                    defaultValue={JSON.stringify(behaviour, null, 2)}
                    onBlur={(e) =>
                      handleJsonChange(index, e.target.value)
                    }
                  />
                  {jsonErrorByIndex[index] && (
                    <div className="text-danger small">
                      {jsonErrorByIndex[index]}
                    </div>
                  )}
                </div>
              </div>
            )}
            <hr />
          </div>
        );
      })}
      </div>
    </>
  );
}
