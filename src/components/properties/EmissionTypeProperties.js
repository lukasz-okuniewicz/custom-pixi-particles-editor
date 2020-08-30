"use client";

import Select from "@components/html/Select";
import { useCallback, useMemo, useState } from "react";
import { updateProps } from "@utils";
import InputNumber from "@components/html/InputNumber";
import EmissionTypeDescription from "@components/html/behaviourDescriptions/EmissionType";

export default function EmissionTypeProperties({ defaultConfig }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  // Memoized predefined images
  const predefinedEmitControllerNames = useMemo(() => {
    const names = {
      UniformEmission: true,
      RandomEmission: true,
      StandardEmission: true,
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

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  const renderUniformEmission = () => {
    return (
      <>
        <InputNumber
          label="Emit/Sec"
          id="emit-sec"
          value={
            defaultConfig.emitterConfig.emitController._emitPerSecond ?? 10
          }
          step="1"
          onChange={(value) =>
            updateProps("emitterConfig.emitController._emitPerSecond", value)
          }
        />
        <InputNumber
          label="Duration"
          id="duration"
          value={defaultConfig.emitterConfig.duration ?? 1}
          step="1"
          onChange={(value) => updateProps("emitterConfig.duration", value)}
        />
      </>
    );
  };

  const renderStandardAndRandomEmission = () => {
    return (
      <>
        <InputNumber
          label="Max Particles"
          id="max-particles"
          value={
            defaultConfig.emitterConfig.emitController._maxParticles > 0
              ? defaultConfig.emitterConfig.emitController._maxParticles
              : 100
          }
          step="1"
          onChange={(value) =>
            updateProps("emitterConfig.emitController._maxParticles", value)
          }
        />
        <InputNumber
          label="Emission Rate"
          id="emission-rate"
          value={
            defaultConfig.emitterConfig.emitController._emissionRate ?? 100
          }
          step="1"
          onChange={(value) =>
            updateProps("emitterConfig.emitController._emissionRate", value)
          }
        />
        <InputNumber
          label="Duration"
          id="duration"
          value={defaultConfig.emitterConfig.duration ?? 1}
          step="1"
          onChange={(value) => updateProps("emitterConfig.duration", value)}
        />
      </>
    );
  };

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>
        Emission Type Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <EmissionTypeDescription />
        <Select
          label="Emission Type"
          defaultValue={
            defaultConfig.emitterConfig.emitController.name || "UniformEmission"
          }
          onChange={(value) => {
            updateProps(
              "emitterConfig.emitController.name",
              value,
              undefined,
              true,
            );
            if (value === "UniformEmission") {
              updateProps(
                "emitterConfig.emitController._emitPerSecond",
                10,
                undefined,
                true,
              );
            } else {
              updateProps(
                "emitterConfig.emitController._maxParticles",
                100,
                undefined,
                true,
              );
              updateProps(
                "emitterConfig.emitController._emissionRate",
                100,
                undefined,
                true,
              );
            }
          }}
          elements={predefinedEmitControllerNames}
        />
        {defaultConfig.emitterConfig.emitController.name ===
          "UniformEmission" && renderUniformEmission()}
        {defaultConfig.emitterConfig.emitController.name ===
          "StandardEmission" && renderStandardAndRandomEmission()}
        {defaultConfig.emitterConfig.emitController.name === "RandomEmission" &&
          renderStandardAndRandomEmission()}
      </div>
    </>
  );
}
