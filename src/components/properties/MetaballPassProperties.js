"use client";

import { useCallback, useEffect, useState } from "react";
import Checkbox from "@components/html/Checkbox";
import InputNumber from "@components/html/InputNumber";
import pixiRefs from "@pixi/pixiRefs";
import { updateProps } from "@utils";
import { METABALL_PASS_DEFAULTS as MB_DEFAULTS } from "@config/metaballPassDefaults";
import MetaballPassDescription from "@components/html/behaviourDescriptions/MetaballPass";

const METABALL_HINTS = {
  enabled: "Enables or disables the metaball post-processing pass.",
  width: "Internal metaball buffer width in pixels.",
  height: "Internal metaball buffer height in pixels.",
  resolutionScale:
    "Scales render resolution for the pass (lower is faster, higher is sharper).",
  blurStrength: "Blur amount applied before thresholding.",
  threshold:
    "Alpha cutoff used to merge nearby particles into smooth metaball shapes.",
  edgeSoftness: "Softens hard edges after thresholding for smoother blobs.",
};

/**
 * Collapsible “Metaball Pass” section: enable toggle + post-process controls.
 */
export default function MetaballPassProperties({ defaultConfig }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  const toggleSubmenuVisibility = useCallback(() => {
    setIsSubmenuVisible((prev) => (prev === "collapse" ? "" : "collapse"));
  }, []);

  const mb = { ...MB_DEFAULTS, ...(defaultConfig.metaballPass || {}) };
  const mbCfg = defaultConfig.metaballPass;

  useEffect(() => {
    const apply = () => {
      const pass = pixiRefs.metaballPassInstance;
      if (!pass || !mbCfg) return;
      const cfg = { ...MB_DEFAULTS, ...mbCfg };
      if (cfg.blurStrength != null) pass.setBlurStrength(cfg.blurStrength);
      if (cfg.threshold != null) pass.setThreshold(cfg.threshold);
      if (cfg.edgeSoftness != null) pass.setEdgeSoftness(cfg.edgeSoftness);
    };
    apply();
    const id = requestAnimationFrame(apply);
    return () => cancelAnimationFrame(id);
  }, [
    mbCfg?.blurStrength,
    mbCfg?.threshold,
    mbCfg?.edgeSoftness,
    defaultConfig.particlePredefinedEffect,
  ]);

  useEffect(() => {
    const apply = () => {
      const pass = pixiRefs.metaballPassInstance;
      if (!pass || !mbCfg) return;
      const cfg = { ...MB_DEFAULTS, ...mbCfg };
      if (cfg.width != null && cfg.height != null) {
        pass.resize(cfg.width, cfg.height, cfg.resolutionScale);
      }
    };
    apply();
    const id = requestAnimationFrame(apply);
    return () => cancelAnimationFrame(id);
  }, [
    mbCfg?.width,
    mbCfg?.height,
    mbCfg?.resolutionScale,
    defaultConfig.particlePredefinedEffect,
  ]);

  const patch = (key, value) => {
    const wasOff = defaultConfig.metaballPass == null;
    const next = {
      ...MB_DEFAULTS,
      ...(defaultConfig.metaballPass &&
      typeof defaultConfig.metaballPass === "object"
        ? defaultConfig.metaballPass
        : {}),
      [key]: value,
    };
    if (wasOff) {
      updateProps("metaballPass", next, undefined, true);
    } else {
      updateProps(`metaballPass.${key}`, value, undefined, false);
    }
  };

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") {
    return null;
  }

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>Metaball Pass</legend>
      <div className={`${isSubmenuVisible}`}>
        <MetaballPassDescription />
        <Checkbox
          label="Enable"
          id="metaball-pass-enable"
          tooltipText={METABALL_HINTS.enabled}
          onChange={(checked) => {
            if (checked) {
              updateProps(
                "metaballPass",
                {
                  ...MB_DEFAULTS,
                  ...(defaultConfig.metaballPass &&
                  typeof defaultConfig.metaballPass === "object"
                    ? defaultConfig.metaballPass
                    : {}),
                },
                undefined,
                true,
              );
            } else {
              updateProps("metaballPass", null, undefined, true);
            }
          }}
          checked={defaultConfig.metaballPass != null}
        />
        <hr />
        <InputNumber
          label="Buffer width"
          id="metaball-width"
          tooltipText={METABALL_HINTS.width}
          value={mb.width}
          step="1"
          min="64"
          onChange={(value) => patch("width", value)}
        />
        <InputNumber
          label="Buffer height"
          id="metaball-height"
          tooltipText={METABALL_HINTS.height}
          value={mb.height}
          step="1"
          min="64"
          onChange={(value) => patch("height", value)}
        />
        <InputNumber
          label="Resolution scale"
          id="metaball-resolutionScale"
          tooltipText={METABALL_HINTS.resolutionScale}
          value={mb.resolutionScale}
          step="0.05"
          min="0.1"
          max="1"
          onChange={(value) => patch("resolutionScale", value)}
        />
        <InputNumber
          label="Blur strength"
          id="metaball-blurStrength"
          tooltipText={METABALL_HINTS.blurStrength}
          value={mb.blurStrength}
          step="1"
          min="0"
          onChange={(value) => patch("blurStrength", value)}
        />
        <InputNumber
          label="Alpha threshold"
          id="metaball-threshold"
          tooltipText={METABALL_HINTS.threshold}
          value={mb.threshold}
          step="0.01"
          min="0"
          max="1"
          onChange={(value) => patch("threshold", value)}
        />
        <InputNumber
          label="Edge softness"
          id="metaball-edgeSoftness"
          tooltipText={METABALL_HINTS.edgeSoftness}
          value={mb.edgeSoftness}
          step="0.01"
          min="0"
          max="1"
          onChange={(value) => patch("edgeSoftness", value)}
        />
      </div>
    </>
  );
}
