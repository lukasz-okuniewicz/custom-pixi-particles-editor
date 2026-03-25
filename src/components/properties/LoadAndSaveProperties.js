"use client";

import { useRef, useState } from "react";
import { updateProps } from "@utils";
import LoadAndSaveDescription from "@components/html/behaviourDescriptions/LoadAndSave";

const LoadAndSaveProperties = ({ defaultConfig, isDirty = false }) => {
  const fileInputRef = useRef(null);
  const baselineRef = useRef(null);
  const [loadError, setLoadError] = useState("");

  const loadConfigChange = (e) => {
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) return;

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        baselineRef.current = parsed;
        setLoadError("");
        updateProps("noConfig.load-config", reader.result);
      } catch (error) {
        setLoadError(
          `Invalid JSON: ${error instanceof Error ? error.message : "Unknown parse error"}`,
        );
      }
      e.target.value = "";
    };

    reader.onerror = () => {
      setLoadError("Unable to read file. Please try again.");
      e.target.value = "";
    };

    reader.readAsText(file);
  };

  const loadConfig = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return null;
  if (!baselineRef.current) baselineRef.current = defaultConfig;

  return (
    <>
      <div className="editor-sticky-toolbar">
        <button className="btn btn-default" onClick={loadConfig} title="Load JSON config">
          Load
        </button>
        <button className="btn btn-default" onClick={() => updateProps("noConfig.download-config")} title="Save JSON snapshot">
          Save
        </button>
        <button className="btn btn-default" onClick={() => updateProps("noConfig.refresh")} title="Rebuild particles from current settings">
          Refresh
        </button>
      </div>
      <p
        className={isDirty ? "editor-dirty-indicator editor-dirty-indicator--dirty" : "editor-dirty-indicator"}
        role="status"
        aria-live="polite"
      >
        {isDirty ? "Unsaved changes" : "All changes saved"}
      </p>
      <LoadAndSaveDescription />
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={loadConfigChange}
        accept=".json,application/json,text/json"
      />
      {loadError ? (
        <div className="form-group">
          <div className="col-xs-10">
            <p className="alert p-2 text-xs rounded" role="alert">
              {loadError}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default LoadAndSaveProperties;
