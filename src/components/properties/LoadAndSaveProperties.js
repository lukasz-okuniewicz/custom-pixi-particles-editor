"use client";

import { useRef } from "react";
import { updateProps } from "@utils";

const LoadAndSaveProperties = ({ defaultConfig }) => {
  const fileInputRef = useRef(null);

  const loadConfigChange = (e) => {
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) return;

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      updateProps("noConfig.load-config", reader.result);
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

  return (
    <>
      <legend>Config</legend>
      <div className="form-group">
        <div className="col-xs-5">
          <button className="btn btn-default btn-block" onClick={loadConfig}>
            Load
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={loadConfigChange}
          />
        </div>
        <div className="col-xs-5">
          <button
            className="btn btn-default btn-block"
            onClick={() => {
              updateProps("noConfig.download-config");
            }}
          >
            Download
          </button>
        </div>
      </div>
      <div className="form-group">
        <div className="col-xs-10">
          <button
            className="btn btn-default btn-block"
            onClick={() => {
              updateProps("noConfig.refresh");
            }}
          >
            Refresh
          </button>
        </div>
      </div>
    </>
  );
};

export default LoadAndSaveProperties;
