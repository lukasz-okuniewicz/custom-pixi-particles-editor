"use client";

import { useBehaviourSectionCollapse } from "@context/SidebarBehaviourAccordionContext";

import Select from "@components/html/Select";
import { useCallback, useMemo, useState } from "react";
import { updateProps } from "@utils";
import InputNumber from "@components/html/InputNumber";
import EmissionTypeDescription from "@components/html/behaviourDescriptions/EmissionType";

const EMISSION_HINTS = {
  emissionType:
    "Chooses how particles are emitted over time (uniform, random, standard, persistent fill, burst schedule, or curve).",
  emitPerSecond: "How many particles are spawned each second.",
  maxParticles:
    "Maximum number of live particles this emitter can keep at once.",
  duration:
    "How long emission runs in seconds. Use -1 for effectively continuous emission.",
  emissionRate:
    "Base emission intensity used by Standard/Random emission controllers.",
  burstPerFrame:
    "Particles spawned per frame while filling to max capacity (supports fractional carry, e.g. 0.1).",
  burstCount: "Particles emitted in each burst.",
  cooldown:
    "Seconds between bursts in Burst Schedule emission.",
  jitter:
    "Adds random variation to burst cooldown (0-1 range).",
  randomSeed:
    "Optional deterministic seed for Random emission. Leave empty for non-deterministic behaviour.",
  curveDuration:
    "Duration in seconds used to traverse the curve timeline.",
  curvePoints:
    "Normalized curve points as JSON array: [[time0to1, emitPerSecond], ...].",
};

export default function EmissionTypeProperties({ defaultConfig, accordionPanelId }) {
  const { isSubmenuVisible, toggleSubmenuVisibility } = useBehaviourSectionCollapse(accordionPanelId);
  // Memoized predefined images
  const predefinedEmitControllerNames = useMemo(() => {
    const names = {
      UniformEmission: true,
      RandomEmission: true,
      StandardEmission: true,
      PersistentFillEmission: true,
      BurstScheduleEmission: true,
      CurveEmission: true,
    };
    return Object.keys(names)
      .sort()
      .map((key) => ({
        key,
        displayName: key,
      }));
  }, []);

  // Toggle submenu visibility
  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  const renderUniformEmission = () => {
    return (
      <>
        <InputNumber
          label="Emit/Sec"
          id="emit-sec"
          tooltipText={EMISSION_HINTS.emitPerSecond}
          value={
            defaultConfig.emitterConfig.emitController._emitPerSecond ?? 10
          }
          step="1"
          onChange={(value) =>
            updateProps("emitterConfig.emitController._emitPerSecond", value)
          }
        />
        <InputNumber
          label="Max Particles"
          id="max-particles"
          tooltipText={EMISSION_HINTS.maxParticles}
          value={defaultConfig.emitterConfig.emitController._maxParticles ?? 10}
          step="1"
          onChange={(value) =>
            updateProps("emitterConfig.emitController._maxParticles", value)
          }
        />
        <InputNumber
          label="Duration"
          id="duration"
          tooltipText={EMISSION_HINTS.duration}
          value={defaultConfig.emitterConfig.duration ?? 1}
          step="1"
          onChange={(value) => updateProps("emitterConfig.duration", value)}
        />
      </>
    );
  };

  const renderPersistentFillEmission = () => {
    return (
      <>
        <InputNumber
          label="Max Particles"
          id="persistent-max-particles"
          tooltipText={EMISSION_HINTS.maxParticles}
          value={
            defaultConfig.emitterConfig.emitController._maxParticles > 0
              ? defaultConfig.emitterConfig.emitController._maxParticles
              : 200
          }
          step="1"
          onChange={(value) =>
            updateProps("emitterConfig.emitController._maxParticles", value)
          }
        />
        <InputNumber
          label="Burst Per Frame"
          id="persistent-burst"
          tooltipText={EMISSION_HINTS.burstPerFrame}
          value={
            defaultConfig.emitterConfig.emitController._burstPerFrame > 0
              ? defaultConfig.emitterConfig.emitController._burstPerFrame
              : 100
          }
          step="0.01"
          min="0"
          onChange={(value) =>
            updateProps("emitterConfig.emitController._burstPerFrame", value)
          }
        />
        <InputNumber
          label="Duration"
          id="duration-persistent"
          tooltipText={EMISSION_HINTS.duration}
          value={defaultConfig.emitterConfig.duration ?? -1}
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
          tooltipText={EMISSION_HINTS.maxParticles}
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
          tooltipText={EMISSION_HINTS.emissionRate}
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
          tooltipText={EMISSION_HINTS.duration}
          value={defaultConfig.emitterConfig.duration ?? 1}
          step="1"
          onChange={(value) => updateProps("emitterConfig.duration", value)}
        />
        {defaultConfig.emitterConfig.emitController.name === "RandomEmission" && (
          <InputNumber
            label="Seed"
            id="random-seed"
            tooltipText={EMISSION_HINTS.randomSeed}
            value={
              defaultConfig.emitterConfig.emitController._seed ?? ""
            }
            step="1"
            onChange={(value) =>
              updateProps("emitterConfig.emitController._seed", value)
            }
          />
        )}
      </>
    );
  };

  const renderBurstScheduleEmission = () => {
    return (
      <>
        <InputNumber
          label="Max Particles"
          id="burst-max-particles"
          tooltipText={EMISSION_HINTS.maxParticles}
          value={defaultConfig.emitterConfig.emitController._maxParticles ?? 200}
          step="1"
          onChange={(value) =>
            updateProps("emitterConfig.emitController._maxParticles", value)
          }
        />
        <InputNumber
          label="Burst Count"
          id="burst-count"
          tooltipText={EMISSION_HINTS.burstCount}
          value={defaultConfig.emitterConfig.emitController._burstCount ?? 20}
          step="1"
          min="1"
          onChange={(value) =>
            updateProps("emitterConfig.emitController._burstCount", value)
          }
        />
        <InputNumber
          label="Cooldown"
          id="burst-cooldown"
          tooltipText={EMISSION_HINTS.cooldown}
          value={defaultConfig.emitterConfig.emitController._cooldown ?? 0.3}
          step="0.01"
          min="0"
          onChange={(value) =>
            updateProps("emitterConfig.emitController._cooldown", value)
          }
        />
        <InputNumber
          label="Jitter"
          id="burst-jitter"
          tooltipText={EMISSION_HINTS.jitter}
          value={defaultConfig.emitterConfig.emitController._jitter ?? 0}
          step="0.01"
          min="0"
          max="1"
          onChange={(value) =>
            updateProps("emitterConfig.emitController._jitter", value)
          }
        />
        <InputNumber
          label="Duration"
          id="duration-burst"
          tooltipText={EMISSION_HINTS.duration}
          value={defaultConfig.emitterConfig.duration ?? 1}
          step="1"
          onChange={(value) => updateProps("emitterConfig.duration", value)}
        />
      </>
    );
  };

  const renderCurveEmission = () => {
    const curveValue = JSON.stringify(
      defaultConfig.emitterConfig.emitController._curve ?? [
        [0, 0],
        [1, 100],
      ],
    );
    return (
      <>
        <InputNumber
          label="Max Particles"
          id="curve-max-particles"
          tooltipText={EMISSION_HINTS.maxParticles}
          value={defaultConfig.emitterConfig.emitController._maxParticles ?? 200}
          step="1"
          onChange={(value) =>
            updateProps("emitterConfig.emitController._maxParticles", value)
          }
        />
        <InputNumber
          label="Curve Duration"
          id="curve-duration"
          tooltipText={EMISSION_HINTS.curveDuration}
          value={defaultConfig.emitterConfig.emitController._duration ?? 1}
          step="0.01"
          min="0.001"
          onChange={(value) =>
            updateProps("emitterConfig.emitController._duration", value)
          }
        />
        <InputNumber
          label="Loop (0/1)"
          id="curve-loop"
          tooltipText="Set 1 to loop the curve, 0 to clamp at end."
          value={defaultConfig.emitterConfig.emitController._loop ? 1 : 0}
          step="1"
          min="0"
          max="1"
          onChange={(value) =>
            updateProps("emitterConfig.emitController._loop", Number(value) > 0)
          }
        />
        <label htmlFor="curve-points" className="mt-3 block text-xs uppercase tracking-wide opacity-70">
          Curve Points (JSON)
        </label>
        <textarea
          id="curve-points"
          className="w-full rounded border border-white/20 bg-black/30 p-2 text-xs"
          rows={4}
          defaultValue={curveValue}
          title={EMISSION_HINTS.curvePoints}
          onBlur={(event) => {
            try {
              const parsed = JSON.parse(event.target.value);
              if (Array.isArray(parsed)) {
                updateProps("emitterConfig.emitController._curve", parsed);
              }
            } catch {
              // Ignore invalid JSON while editing.
            }
          }}
        />
        <InputNumber
          label="Duration"
          id="duration-curve"
          tooltipText={EMISSION_HINTS.duration}
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
          tooltipText={EMISSION_HINTS.emissionType}
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
            } else if (value === "PersistentFillEmission") {
              updateProps(
                "emitterConfig.emitController._maxParticles",
                200,
                undefined,
                true,
              );
              updateProps(
                "emitterConfig.emitController._burstPerFrame",
                100,
                undefined,
                true,
              );
              updateProps("emitterConfig.duration", -1, undefined, true);
            } else if (value === "BurstScheduleEmission") {
              updateProps(
                "emitterConfig.emitController._maxParticles",
                200,
                undefined,
                true,
              );
              updateProps(
                "emitterConfig.emitController._burstCount",
                20,
                undefined,
                true,
              );
              updateProps(
                "emitterConfig.emitController._cooldown",
                0.3,
                undefined,
                true,
              );
              updateProps(
                "emitterConfig.emitController._jitter",
                0,
                undefined,
                true,
              );
              updateProps("emitterConfig.duration", 1, undefined, true);
            } else if (value === "CurveEmission") {
              updateProps(
                "emitterConfig.emitController._maxParticles",
                200,
                undefined,
                true,
              );
              updateProps(
                "emitterConfig.emitController._duration",
                1,
                undefined,
                true,
              );
              updateProps(
                "emitterConfig.emitController._loop",
                false,
                undefined,
                true,
              );
              updateProps(
                "emitterConfig.emitController._curve",
                [
                  [0, 0],
                  [1, 100],
                ],
                undefined,
                true,
              );
              updateProps("emitterConfig.duration", 1, undefined, true);
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
        {defaultConfig.emitterConfig.emitController.name ===
          "PersistentFillEmission" && renderPersistentFillEmission()}
        {defaultConfig.emitterConfig.emitController.name ===
          "BurstScheduleEmission" && renderBurstScheduleEmission()}
        {defaultConfig.emitterConfig.emitController.name ===
          "CurveEmission" && renderCurveEmission()}
      </div>
    </>
  );
}
