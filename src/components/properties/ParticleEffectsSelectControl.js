"use client";

import { useCallback, useMemo } from "react";
import { camelCaseToNormal } from "@utils";
import { BfSelect } from "@components/properties/BehaviourFieldWrappers";

// Sprite/Image effects shown in a separate section of the Particle Effects select
const SPRITE_IMAGE_EFFECT_KEYS = [
  "dissolveEffect",
  "ghostEffect",
  "glitchEffect",
  "magneticAssemblyEffect",
  "meltEffect",
  "pixelSortEffect",
  "prismRefractionEffect",
  "crystallizeEffect",
  "slitScanEffect",
  "granularErosionEffect",
  "liquidMercuryEffect",
  "shatterEffect",
];

const ParticleEffectsSelectControl = ({
  defaultConfig,
  fullConfig,
  handlePredefinedEffectChange,
  className = "editor-sidebar-top-control editor-particle-effects-control",
}) => {
  const particleEffectsGrouped = useMemo(() => {
    const keys = Object.keys(fullConfig || {}).filter(
      (key) => !fullConfig[key].hide,
    );
    const particleKeys = keys
      .filter((key) => !SPRITE_IMAGE_EFFECT_KEYS.includes(key))
      .sort();
    const spriteKeys = keys
      .filter((key) => SPRITE_IMAGE_EFFECT_KEYS.includes(key))
      .sort(
        (a, b) =>
          SPRITE_IMAGE_EFFECT_KEYS.indexOf(a) -
          SPRITE_IMAGE_EFFECT_KEYS.indexOf(b),
      );

    const groups = [];
    if (particleKeys.length > 0) {
      groups.push({
        label: "Particle Effects",
        options: particleKeys.map((key) => ({
          key,
          displayName: camelCaseToNormal(key),
        })),
      });
    }
    if (spriteKeys.length > 0) {
      groups.push({
        label: "Sprite / Image Effects",
        options: spriteKeys.map((key) => ({
          key,
          displayName: camelCaseToNormal(key),
        })),
      });
    }
    return groups;
  }, [fullConfig]);

  const handleEffectChange = useCallback(
    (value) => handlePredefinedEffectChange(value),
    [handlePredefinedEffectChange],
  );

  return (
    <div className={className}>
      <BfSelect
        label="Particle Effects"
        defaultValue={defaultConfig.particlePredefinedEffect || "coffeeShop"}
        onChange={handleEffectChange}
        groups={particleEffectsGrouped}
      />
    </div>
  );
};

export default ParticleEffectsSelectControl;
