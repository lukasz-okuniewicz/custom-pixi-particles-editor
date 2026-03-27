"use client";

import { useRef, useState } from "react";
import { updateProps } from "@utils";
import LoadAndSaveDescription from "@components/html/behaviourDescriptions/LoadAndSave";

const LoadAndSaveProperties = ({ defaultConfig, isDirty = false }) => {
  const fileInputRef = useRef(null);
  const baselineRef = useRef(null);
  const [loadError, setLoadError] = useState("");
  const [opStatus, setOpStatus] = useState("");

  const loadConfigChange = (e) => {
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) return;

    const file = fileInput.files[0];
    const reader = new FileReader();
    setOpStatus(`Parsing ${file.name}...`);

    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        baselineRef.current = parsed;
        setLoadError("");
        updateProps("noConfig.load-config", reader.result);
        setOpStatus(`Loaded ${file.name}`);
      } catch (error) {
        setLoadError(
          `Invalid JSON: ${error instanceof Error ? error.message : "Unknown parse error"}`,
        );
        setOpStatus("Load failed");
      }
      e.target.value = "";
    };

    reader.onerror = () => {
      setLoadError("Unable to read file. Please try again.");
      setOpStatus("Read failed");
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
        <button
          className="btn btn-default"
          onClick={() => {
            setOpStatus("Saving snapshot...");
            updateProps("noConfig.download-config");
            setTimeout(() => setOpStatus("Snapshot saved"), 200);
          }}
          title="Save JSON snapshot"
        >
          Save
        </button>
        <button
          className="btn btn-default"
          onClick={() => {
            setOpStatus("Refreshing particles...");
            updateProps("noConfig.refresh");
            setTimeout(() => setOpStatus("Particles refreshed"), 120);
          }}
          title="Rebuild particles from current settings"
        >
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
      {opStatus ? (
        <p className="editor-op-status" role="status" aria-live="polite">
          {opStatus}
        </p>
      ) : null}
      <LoadAndSaveDescription />
      <input
        id="editor-load-config-input"
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
