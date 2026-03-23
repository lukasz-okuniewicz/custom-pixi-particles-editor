"use client";

import { useCallback, useState } from "react";
import Checkbox from "@components/html/Checkbox";
import InputNumber from "@components/html/InputNumber";
import Select from "@components/html/Select";
import { normalizeBlendModeForPixiV8, updateProps } from "@utils";
import ParticleLinksDescription from "@components/html/behaviourDescriptions/ParticleLinks";

/** Defaults aligned with library `PARTICLE_LINK_DEFAULTS` */
const PL_DEFAULTS = {
  enabled: false,
  maxDistance: 88,
  maxLinksPerParticle: 4,
  lineWidth: 1,
  lineAlpha: 0.38,
  lineColor: 8947839,
  useParticleTint: true,
  fadeByDistance: true,
  updateEveryNFrames: 1,
  blendMode: "screen",
};

const BLEND_ELEMENTS = [
  { key: "unset", value: "", displayName: "Default (no override)" },
  { key: "normal", value: "normal", displayName: "Normal" },
  { key: "add", value: "add", displayName: "Add" },
  { key: "multiply", value: "multiply", displayName: "Multiply" },
  { key: "screen", value: "screen", displayName: "Screen" },
  { key: "overlay", value: "overlay", displayName: "Overlay" },
  { key: "darken", value: "darken", displayName: "Darken" },
  { key: "lighten", value: "lighten", displayName: "Lighten" },
  { key: "difference", value: "difference", displayName: "Difference" },
  { key: "exclusion", value: "exclusion", displayName: "Exclusion" },
  { key: "color-dodge", value: "color-dodge", displayName: "Color Dodge" },
  { key: "color-burn", value: "color-burn", displayName: "Color Burn" },
  { key: "hard-light", value: "hard-light", displayName: "Hard Light" },
  { key: "soft-light", value: "soft-light", displayName: "Soft Light" },
  { key: "none", value: "none", displayName: "None" },
];

/**
 * Proximity line mesh between particles (`particleLinks` in config).
 * Updates renderer via `setParticleLinks` without full emitter refresh.
 */
export default function ParticleLinksProperties({ defaultConfig }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  const toggleSubmenuVisibility = useCallback(() => {
    setIsSubmenuVisible((prev) => (prev === "collapse" ? "" : "collapse"));
  }, []);

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  const pl = { ...PL_DEFAULTS, ...(defaultConfig.particleLinks || {}) };
  const enabled = pl.enabled === true;

  const blendValue =
    pl.blendMode == null || pl.blendMode === ""
      ? ""
      : normalizeBlendModeForPixiV8(pl.blendMode);

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>Particle links (mesh)</legend>
      <div className={`${isSubmenuVisible}`}>
        <ParticleLinksDescription />
        <hr />
        <Checkbox
          label="Enable"
          id="particle-links-enabled"
          onChange={(value) =>
            updateProps("particleLinks.enabled", value, undefined, false)
          }
          checked={enabled}
        />
        <InputNumber
          label="Max distance"
          id="particle-links-maxDistance"
          value={pl.maxDistance}
          step="1"
          min="1"
          onChange={(value) =>
            updateProps("particleLinks.maxDistance", value, undefined, false)
          }
        />
        <InputNumber
          label="Max links per particle"
          id="particle-links-maxLinksPerParticle"
          value={pl.maxLinksPerParticle}
          step="1"
          min="1"
          max="16"
          onChange={(value) =>
            updateProps(
              "particleLinks.maxLinksPerParticle",
              value,
              undefined,
              false,
            )
          }
        />
        <InputNumber
          label="Line width"
          id="particle-links-lineWidth"
          value={pl.lineWidth}
          step="0.5"
          min="0.5"
          onChange={(value) =>
            updateProps("particleLinks.lineWidth", value, undefined, false)
          }
        />
        <InputNumber
          label="Line alpha"
          id="particle-links-lineAlpha"
          value={pl.lineAlpha}
          step="0.05"
          min="0"
          max="1"
          onChange={(value) =>
            updateProps("particleLinks.lineAlpha", value, undefined, false)
          }
        />
        <InputNumber
          label="Line color (decimal hex)"
          id="particle-links-lineColor"
          value={pl.lineColor}
          step="1"
          min="0"
          onChange={(value) =>
            updateProps("particleLinks.lineColor", value, undefined, false)
          }
        />
        <Checkbox
          label="Tint lines from particle colors"
          id="particle-links-useParticleTint"
          onChange={(value) =>
            updateProps(
              "particleLinks.useParticleTint",
              value,
              undefined,
              false,
            )
          }
          checked={pl.useParticleTint}
        />
        <Checkbox
          label="Fade lines by distance"
          id="particle-links-fadeByDistance"
          onChange={(value) =>
            updateProps(
              "particleLinks.fadeByDistance",
              value,
              undefined,
              false,
            )
          }
          checked={pl.fadeByDistance}
        />
        <InputNumber
          label="Update every N frames"
          id="particle-links-updateEveryNFrames"
          value={pl.updateEveryNFrames}
          step="1"
          min="1"
          max="10"
          onChange={(value) =>
            updateProps(
              "particleLinks.updateEveryNFrames",
              value,
              undefined,
              false,
            )
          }
        />
        <Select
          label="Link blend mode"
          defaultValue={blendValue}
          onChange={(value) => {
            if (value === "") {
              updateProps("particleLinks.blendMode", null, undefined, false);
            } else {
              updateProps(
                "particleLinks.blendMode",
                value,
                undefined,
                false,
              );
            }
          }}
          elements={BLEND_ELEMENTS}
        />
      </div>
    </>
  );
}
