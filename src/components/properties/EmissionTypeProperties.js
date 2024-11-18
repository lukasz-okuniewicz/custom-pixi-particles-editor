"use client";

import Select from "@components/html/Select";
import { useCallback, useMemo, useState } from "react";
import { updateProps } from "@utils";
import InputNumber from "@components/html/InputNumber";

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
        <span className="explanation">
          <span>
            <b>Emission type properties</b> in a particle system control how
            particles are emitted over time. There are three types:
          </span>
          <ul>
            <li>
              <b>Uniform Emission</b>: Particles are emitted at a consistent
              rate.
              <ul>
                <li>
                  <b>Emit/Sec</b>: Number of particles emitted per second.
                </li>
                <li>
                  <b>Duration</b>: How long the emission lasts.
                </li>
              </ul>
            </li>
            <li>
              <b>Standard Emission</b>: Particles are emitted at a defined rate,
              up to a maximum count.
              <ul>
                <li>
                  <b>Max Particles</b>: Total number of particles that can exist
                  simultaneously.
                </li>
                <li>
                  <b>Emission Rate</b>: Speed of particle generation.
                </li>
                <li>
                  <b>Duration</b>: How long the emission lasts.
                </li>
              </ul>
            </li>
            <li>
              <b>Random Emission</b>: Particles are emitted with a randomized
              pattern.
              <ul>
                <li>
                  <b>Max Particles</b>: Maximum number of particles at any time.
                </li>
                <li>
                  <b>Emission Rate</b>: Rate of particle generation with
                  randomness.
                </li>
                <li>
                  <b>Duration</b>: Length of the emission period.
                </li>
              </ul>
            </li>
          </ul>
          <span>
            If Duration = -1, the emission continues indefinitely. These options
            allow for precise control of particle flow, from steady streams to
            bursts and randomized patterns.
          </span>
        </span>
        <Select
          label="Emission Type"
          defaultValue={
            defaultConfig.emitterConfig.emitController.name || "UniformEmission"
          }
          onChange={(value) => {
            updateProps("emitterConfig.emitController.name", value);
            if (value === "UniformEmission") {
              updateProps("emitterConfig.emitController._emitPerSecond", 10);
            } else {
              updateProps("emitterConfig.emitController._maxParticles", 100);
              updateProps("emitterConfig.emitController._emissionRate", 100);
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
