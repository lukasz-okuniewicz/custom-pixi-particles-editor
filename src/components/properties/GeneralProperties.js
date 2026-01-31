"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { camelCaseToNormal, updateProps } from "@utils";
import Select from "@components/html/Select";
import File from "@components/html/File";
import { Assets } from "pixi.js";
import { normalizeBlendModeForPixiV8 } from "@utils";

// Pixi v8 uses string blend modes; provide options for the dropdown
const EDITOR_BLEND_MODES = [
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
import Checkbox from "@components/html/Checkbox";
import InputNumber from "@components/html/InputNumber";
import InputString from "@components/html/InputString";
import ColorPicker from "@components/html/ColorPicker";
import GeneralDescription from "@components/html/behaviourDescriptions/General";

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

const GeneralProperties = ({
  defaultConfig,
  fullConfig,
  handlePredefinedEffectChange,
}) => {
  const [bgColor, setBgColor] = useState({ r: 0, g: 0, b: 0, a: 1 });
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("");
  const fileParticleImagesInputRef = useRef(null);
  const fileParticleFinishingInputRef = useRef(null);
  const fileParticleBackgroundImageRef = useRef(null);

  // Memoized particle effects grouped: Particle Effects + Sprite / Image Effects
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

  // Memoized blend modes list (Pixi v8 string blend modes)
  const blendModes = useMemo(
    () =>
      [...EDITOR_BLEND_MODES].sort((a, b) =>
        a.displayName.localeCompare(b.displayName)
      ),
    []
  );

  // Memoized predefined images (from Assets cache after Loader.load())
  const predefinedImages = useMemo(() => {
    const sheet1 = Assets.get("multipacked-0.json");
    const sheet2 = Assets.get("images.json");
    const textures = {
      ...(sheet1?.textures || {}),
      ...(sheet2?.textures || {}),
    };

    if (Object.keys(textures).length === 0) return [];

    return Object.keys(textures)
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

  // Handle effect selection change
  const handleEffectChange = useCallback(
    (value) => handlePredefinedEffectChange(value),
    [handlePredefinedEffectChange],
  );

  // Generic file handling
  const handleFileChange = useCallback((e, ref, propName) => {
    const images = [];
    const files = ref.current?.files;

    if (!files || files.length === 0) return;
    const promises = [];
    Array.from(files).forEach((file) => {
      promises.push(
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            images.push({ fileName: file.name, result: reader.result });

            // Update props after all files are read
            if (images.length === files.length) {
              updateProps(propName, images);
            }
            resolve();
          };
          reader.onerror = () => {
            console.error(`Failed to read file: ${file.name}`);
          };
          reader.readAsDataURL(file);
        }),
      );
    });
    Promise.all(promises).then(() => {
      e.target.value = "";
    });
  }, []);

  const bgImageChange = useCallback((e) => {
    const reader = new FileReader();
    reader.onload = () => {
      const file = fileParticleBackgroundImageRef.current.files[0];
      updateProps("noConfig.bg-image", {
        fileName: file.name,
        result: reader.result,
      });
      e.target.value = "";
    };

    reader.readAsDataURL(fileParticleBackgroundImageRef.current.files[0]);
  }, []);

  const renderAnimatedSprite = () => {
    if (!defaultConfig.emitterConfig.animatedSprite) return null;
    if (!defaultConfig.emitterConfig.animatedSprite.enabled) return null;

    return (
      <>
        <InputString
          label="Animated Sprite Name"
          id="animated-sprite-name"
          value={
            defaultConfig.emitterConfig.animatedSprite.animatedSpriteName ||
            defaultConfig.textures[0]
          }
          onChange={(value) =>
            updateProps(
              "emitterConfig.animatedSprite.animatedSpriteName",
              value,
            )
          }
        />
        <InputNumber
          label="Animated Sprite Frame Rate"
          id="animated-sprite-frame-rate"
          value={defaultConfig.emitterConfig.animatedSprite.frameRate ?? 0.25}
          step="0.1"
          onChange={(value) =>
            updateProps("emitterConfig.animatedSprite.frameRate", value)
          }
        />
        <InputNumber
          label="Animated Sprite Index To Start"
          id="animated-sprite-index-to-start"
          value={
            defaultConfig.emitterConfig.animatedSprite
              .animatedSpriteIndexToStart ?? 0
          }
          step="0.1"
          onChange={(value) =>
            updateProps(
              "emitterConfig.animatedSprite.animatedSpriteIndexToStart",
              value,
            )
          }
        />
        <InputNumber
          label="Animated Sprite Zero Pad"
          id="animated-sprite-zero-pad"
          value={
            defaultConfig.emitterConfig.animatedSprite.animatedSpriteZeroPad ??
            1
          }
          step="0.1"
          onChange={(value) =>
            updateProps(
              "emitterConfig.animatedSprite.animatedSpriteZeroPad",
              value,
            )
          }
        />
        <Checkbox
          label="Animated Sprite Loop"
          id="animated-sprite-loop"
          onChange={(value) => {
            updateProps("emitterConfig.animatedSprite.loop", value);
          }}
          checked={defaultConfig.emitterConfig.animatedSprite.loop ?? false}
        />
        <Checkbox
          label="Random Frame Start"
          id="random-frame-start"
          onChange={(value) => {
            updateProps("emitterConfig.animatedSprite.randomFrameStart", value);
          }}
          checked={
            defaultConfig.emitterConfig.animatedSprite.randomFrameStart || false
          }
        />
      </>
    );
  };

  if (
    defaultConfig.particlePredefinedEffect === "shatterEffect" ||
    defaultConfig.particlePredefinedEffect === "dissolveEffect" ||
    defaultConfig.particlePredefinedEffect === "pixelSortEffect" ||
    defaultConfig.particlePredefinedEffect === "prismRefractionEffect" ||
    defaultConfig.particlePredefinedEffect === "crystallizeEffect" ||
    defaultConfig.particlePredefinedEffect === "slitScanEffect" ||
    defaultConfig.particlePredefinedEffect === "granularErosionEffect" ||
    defaultConfig.particlePredefinedEffect === "liquidMercuryEffect" ||
    defaultConfig.particlePredefinedEffect === "magneticAssemblyEffect" ||
    defaultConfig.particlePredefinedEffect === "ghostEffect" ||
    defaultConfig.particlePredefinedEffect === "glitchEffect" ||
    defaultConfig.particlePredefinedEffect === "meltEffect"
  )
    return (
      <>
        <legend onClick={toggleSubmenuVisibility}>General Properties</legend>
        <div className={`${isSubmenuVisible}`}>
          <GeneralDescription />
          {/* Follow Mouse Toggle */}
          <Select
            label="Particle Effects"
            defaultValue={
              defaultConfig.particlePredefinedEffect || "coffeeShop"
            }
            onChange={handleEffectChange}
            groups={particleEffectsGrouped}
          />
        </div>
      </>
    );

  return (
    <>
      {/* General Properties Section */}
      <legend onClick={toggleSubmenuVisibility}>General Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        <GeneralDescription />
        {/* Follow Mouse Toggle */}
        {defaultConfig.particlePredefinedEffect !== "coffeeShop" && (
          <>
            <Checkbox
              label="Follow Mouse"
              id="follow-mouse"
              onChange={(value) => {
                updateProps("noConfig.followMouse", value);
              }}
              checked={defaultConfig.followMouse || false}
            />
            <hr />
          </>
        )}

        {/* Particle Effects Dropdown */}
        <Select
          label="Particle Effects"
          defaultValue={defaultConfig.particlePredefinedEffect || "coffeeShop"}
          onChange={handleEffectChange}
          groups={particleEffectsGrouped}
        />

        {defaultConfig.particlePredefinedEffect !== "coffeeShop" && (
          <>
            <hr />
            <Select
              label="Predefined Particle Image"
              defaultValue={
                defaultConfig.particlePredefinedImage ||
                defaultConfig.textures?.[0]
              }
              onChange={(value) =>
                updateProps("noConfig.predefinedImage", value)
              }
              elements={predefinedImages}
            />
            <File
              label="Particle Images"
              buttonText="Add Images"
              id="load-particle-images"
              onChange={(e) =>
                handleFileChange(
                  e,
                  fileParticleImagesInputRef,
                  "noConfig.images",
                )
              }
              onClick={() => fileParticleImagesInputRef.current?.click()}
              ref={fileParticleImagesInputRef}
            />
            <File
              label="Particle Finishing Images"
              buttonText="Add Finishing Images"
              id="load-particle-finishing-images"
              onChange={(e) =>
                handleFileChange(
                  e,
                  fileParticleFinishingInputRef,
                  "noConfig.finishing-images",
                )
              }
              onClick={() => fileParticleFinishingInputRef.current?.click()}
              ref={fileParticleFinishingInputRef}
            />
            <hr />
            <Checkbox
              label="Animated Sprite"
              id="animated-sprite"
              onChange={(value) => {
                updateProps("emitterConfig.animatedSprite.enabled", value);
              }}
              checked={
                defaultConfig.emitterConfig.animatedSprite?.enabled || false
              }
            />
            <hr />
            {renderAnimatedSprite()}
            <hr />
            <File
              label="Background Image"
              buttonText="Load image"
              id="load-particle-background-image"
              onChange={bgImageChange}
              onClick={() => fileParticleBackgroundImageRef.current?.click()}
              ref={fileParticleBackgroundImageRef}
            />
            <hr />
            <ColorPicker
              label="Background Color"
              color={{
                r: bgColor.r,
                g: bgColor.g,
                b: bgColor.b,
                a: bgColor.alpha,
              }}
              colorChanged={(color) => {
                setBgColor(color.rgb);
                updateProps("noConfig.BackgroundColor", color);
              }}
            />
            <InputNumber
              label="Alpha"
              id="alpha"
              value={defaultConfig.emitterConfig.alpha ?? 1}
              step="0.1"
              onChange={(value) =>
                updateProps("emitterConfig.alpha", value, undefined, true)
              }
            />
            <InputNumber
              label="Anchor"
              id="anchor"
              params={["x", "y"]}
              value={[
                defaultConfig.emitterConfig.anchor?.x ?? 0.5,
                defaultConfig.emitterConfig.anchor?.y ?? 0.5,
              ]}
              step="0.1"
              onChange={(value, id) =>
                updateProps("emitterConfig.anchor", value, id, true)
              }
            />
            <Select
              label="Blend Mode"
              defaultValue={normalizeBlendModeForPixiV8(
                defaultConfig.emitterConfig.blendMode
              )}
              onChange={(value) => {
                updateProps("emitterConfig.blendMode", value, undefined, true);
              }}
              elements={blendModes}
            />
          </>
        )}
      </div>
    </>
  );
};

export default GeneralProperties;
