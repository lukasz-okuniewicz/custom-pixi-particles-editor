"use client";

import { useBehaviourSectionCollapse } from "@context/SidebarBehaviourAccordionContext";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAutoResizeTextarea } from "@hooks/useAutoResizeTextarea";
import { camelCaseToNormal, normalizeBlendModeForPixiV8, updateProps } from "@utils";
import File from "@components/html/File";
import { Assets } from "pixi.js";
import {
  BfCheckbox,
  BfColorPicker,
  BfFieldHint,
  BfInputNumber,
  BfInputString,
  BfSelect,
} from "@components/properties/BehaviourFieldWrappers";
import GeneralDescription from "@components/html/behaviourDescriptions/General";
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
import { GENERAL_PROPERTIES_PANEL_ID } from "@utils/editorNav";

const GeneralProperties = ({
  defaultConfig,
  fullConfig,
  accordionPanelId,
  wrapInSection = true,
}) => {
  const { isSubmenuVisible, toggleSubmenuVisibility } = useBehaviourSectionCollapse(
    accordionPanelId ?? GENERAL_PROPERTIES_PANEL_ID,
  );
  const [bgColor, setBgColor] = useState({ r: 0, g: 0, b: 0, a: 1 });
  const [fileFeedback, setFileFeedback] = useState("");
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

  // Generic file handling
  const handleFileChange = useCallback((e, ref, propName) => {
    const images = [];
    const files = ref.current?.files;

    if (!files || files.length === 0) return;
    setFileFeedback(`Loading ${files.length} file(s)...`);
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
            setFileFeedback(`Failed to read ${file.name}`);
          };
          reader.readAsDataURL(file);
        }),
      );
    });
    Promise.all(promises).then(() => {
      setFileFeedback(`Loaded ${files.length} file(s)`);
      e.target.value = "";
    });
  }, []);

  const bgImageChange = useCallback((e) => {
    setFileFeedback("Loading background image...");
    const reader = new FileReader();
    reader.onload = () => {
      const file = fileParticleBackgroundImageRef.current.files[0];
      updateProps("noConfig.bg-image", {
        fileName: file.name,
        result: reader.result,
      });
      setFileFeedback(`Loaded ${file.name}`);
      e.target.value = "";
    };
    reader.onerror = () => setFileFeedback("Failed to read background image");

    reader.readAsDataURL(fileParticleBackgroundImageRef.current.files[0]);
  }, []);

  const [textureVariantsJson, setTextureVariantsJson] = useState("[]");
  const [variantWeightsJson, setVariantWeightsJson] = useState("");
  const [textureVariantsJsonError, setTextureVariantsJsonError] =
    useState(false);

  useEffect(() => {
    const ec = defaultConfig?.emitterConfig;
    const tv = ec?.textureVariants;
    setTextureVariantsJson(
      tv && tv.length ? JSON.stringify(tv, null, 2) : "[]",
    );
    const w = ec?.variantWeights;
    setVariantWeightsJson(w && w.length ? JSON.stringify(w) : "");
    setTextureVariantsJsonError(false);
  }, [
    defaultConfig?.emitterConfig?.textureVariants,
    defaultConfig?.emitterConfig?.variantWeights,
  ]);

  const textureVariantsTextarea = useAutoResizeTextarea(textureVariantsJson);

  const applyTextureVariantsFromJson = useCallback(() => {
    try {
      const parsed = JSON.parse(textureVariantsJson);
      if (!Array.isArray(parsed)) throw new Error("Expected array");
      updateProps(
        "emitterConfig.textureVariants",
        parsed.length ? parsed : undefined,
      );
      if (variantWeightsJson.trim()) {
        const w = JSON.parse(variantWeightsJson);
        if (!Array.isArray(w)) throw new Error("Weights must be array");
        updateProps(
          "emitterConfig.variantWeights",
          w.length ? w : undefined,
        );
      } else {
        updateProps("emitterConfig.variantWeights", undefined);
      }
      setTextureVariantsJsonError(false);
    } catch {
      setTextureVariantsJsonError(true);
    }
  }, [
    textureVariantsJson,
    variantWeightsJson,
    updateProps,
  ]);

  const renderAnimatedSprite = () => {
    if (!defaultConfig.emitterConfig.animatedSprite) return null;
    if (!defaultConfig.emitterConfig.animatedSprite.enabled) return null;

    return (
      <>
        <BfInputString
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
        <BfInputNumber
          label="Animated Sprite Frame Rate"
          id="animated-sprite-frame-rate"
          value={defaultConfig.emitterConfig.animatedSprite.frameRate ?? 0.25}
          step="0.1"
          onChange={(value) =>
            updateProps("emitterConfig.animatedSprite.frameRate", value)
          }
        />
        <BfInputNumber
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
        <BfInputNumber
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
        <BfCheckbox
          label="Animated Sprite Loop"
          id="animated-sprite-loop"
          onChange={(value) => {
            updateProps("emitterConfig.animatedSprite.loop", value);
          }}
          checked={defaultConfig.emitterConfig.animatedSprite.loop ?? false}
        />
        <BfCheckbox
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

  const renderTextureVariantsEditor = () => (
    <>
      <p className="col-xs-12" style={{ fontSize: "12px", opacity: 0.85 }}>
        Optional: mix static and animated particles in one emitter. Non-empty
        list overrides legacy <code>textures</code> + Animated Sprite mode.
        Use <code>frames</code> (prefix for 00.png, 01.png…) or{" "}
        <code>staticRandom</code> (full texture keys). Leave weights empty for
        equal probability.
      </p>
      <div className="form-group">
        <label className="col-xs-4 form-label" htmlFor="texture-variants-json">
          Texture variants JSON
        </label>
        <div className="col-xs-8">
          <textarea
            id="texture-variants-json"
            ref={textureVariantsTextarea.ref}
            className="form-control"
            rows={1}
            value={textureVariantsJson}
            onChange={(e) => setTextureVariantsJson(e.target.value)}
            onInput={textureVariantsTextarea.onInput}
            onBlur={applyTextureVariantsFromJson}
            spellCheck={false}
            style={{ resize: "none", overflow: "hidden" }}
          />
          <BfFieldHint id="texture-variants-json" />
          {textureVariantsJsonError && (
            <span className="text-danger" style={{ fontSize: "12px" }}>
              Invalid JSON
            </span>
          )}
        </div>
      </div>
      <div className="form-group">
        <label className="col-xs-4 form-label" htmlFor="variant-weights-json">
          Variant weights (JSON array, optional)
        </label>
        <div className="col-xs-8">
          <input
            id="variant-weights-json"
            className="form-control"
            type="text"
            value={variantWeightsJson}
            onChange={(e) => setVariantWeightsJson(e.target.value)}
            onBlur={applyTextureVariantsFromJson}
            spellCheck={false}
          />
          <BfFieldHint id="variant-weights-json" />
        </div>
      </div>
    </>
  );

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
    return wrapInSection ? (
      <div id={GENERAL_PROPERTIES_PANEL_ID} className="editor-sidebar-section">
        <legend onClick={toggleSubmenuVisibility}>General Properties</legend>
        <div className={`${isSubmenuVisible}`}>
          <GeneralDescription />
        </div>
      </div>
    ) : (
      <>
        <legend onClick={toggleSubmenuVisibility}>General Properties</legend>
        <div className={`${isSubmenuVisible}`}>
          <GeneralDescription />
        </div>
      </>
    );

  return wrapInSection ? (
    <div id={GENERAL_PROPERTIES_PANEL_ID} className="editor-sidebar-section">
      {/* General Properties Section */}
      <legend onClick={toggleSubmenuVisibility}>General Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        <GeneralDescription />
        {/* Follow Mouse Toggle */}
        {defaultConfig.particlePredefinedEffect !== "coffeeShop" && (
          <>
            <BfCheckbox
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

        {defaultConfig.particlePredefinedEffect !== "coffeeShop" && (
          <>
            {fileFeedback ? (
              <p className="editor-op-status" role="status" aria-live="polite">
                {fileFeedback}
              </p>
            ) : null}
            <hr />
            <BfSelect
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
            <BfFieldHint id="load-particle-images" />
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
            <BfFieldHint id="load-particle-finishing-images" />
            <hr />
            <BfCheckbox
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
            {renderTextureVariantsEditor()}
            <hr />
            <File
              label="Background Image"
              buttonText="Load image"
              id="load-particle-background-image"
              onChange={bgImageChange}
              onClick={() => fileParticleBackgroundImageRef.current?.click()}
              ref={fileParticleBackgroundImageRef}
            />
            <BfFieldHint id="load-particle-background-image" />
            <hr />
            <BfColorPicker
              id="general-background-color"
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
            <BfInputNumber
              label="Alpha"
              id="alpha"
              value={defaultConfig.emitterConfig.alpha ?? 1}
              step="0.1"
              onChange={(value) =>
                updateProps("emitterConfig.alpha", value, undefined, true)
              }
            />
            <BfInputNumber
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
            <BfSelect
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
    </div>
  ) : (
    <>
      <legend onClick={toggleSubmenuVisibility}>General Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        <GeneralDescription />
        {defaultConfig.particlePredefinedEffect !== "coffeeShop" && (
          <>
            <BfCheckbox
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

        {defaultConfig.particlePredefinedEffect !== "coffeeShop" && (
          <>
            <hr />
            <BfSelect
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
            <BfFieldHint id="load-particle-images" />
            <File
              label="Particle Finishing"
              buttonText="Add Images"
              id="load-particle-finishing"
              onChange={(e) =>
                handleFileChange(
                  e,
                  fileParticleFinishingInputRef,
                  "noConfig.finishing",
                )
              }
              onClick={() => fileParticleFinishingInputRef.current?.click()}
              ref={fileParticleFinishingInputRef}
            />
            <BfFieldHint id="load-particle-finishing" />
            <BfInputNumber
              label="Particle Start Scale"
              id="particle-start-scale"
              value={defaultConfig.particleStartScale ?? 1}
              step="0.1"
              onChange={(value) =>
                updateProps("noConfig.particle-start-scale", value)
              }
            />
            <BfInputNumber
              label="Particle End Scale"
              id="particle-end-scale"
              value={defaultConfig.particleEndScale ?? 1}
              step="0.1"
              onChange={(value) =>
                updateProps("noConfig.particle-end-scale", value)
              }
            />
            <BfInputNumber
              label="Speed Scale"
              id="speed-scale"
              value={defaultConfig.speedScale ?? 1}
              step="0.1"
              onChange={(value) => updateProps("noConfig.speed-scale", value)}
            />
            <BfCheckbox
              label="Particle Add Back"
              id="particle-add-back"
              onChange={(value) =>
                updateProps("noConfig.particle-add-back", value)
              }
              checked={defaultConfig.particleAddBack || false}
            />
            <BfCheckbox
              label="Animate"
              id="emitter-animate"
              onChange={(value) => updateProps("noConfig.emitter-animate", value)}
              checked={defaultConfig.emitterAnimate || false}
            />
            {renderAnimatedSprite()}
            <BfInputNumber
              label="FPS"
              id="fps"
              value={defaultConfig.fps ?? 60}
              step="1"
              onChange={(value) => updateProps("noConfig.fps", value)}
            />
            <BfColorPicker
              label="Background Color"
              id="background-color"
              color={bgColor}
              onChange={(value) => {
                setBgColor(value.rgb);
                updateProps("noConfig.bg-color", value.rgb);
              }}
              hideAlpha={false}
            />
            <File
              label="Background Image"
              buttonText="Add Image"
              id="load-bg-image"
              onChange={bgImageChange}
              onClick={() => fileParticleBackgroundImageRef.current?.click()}
              ref={fileParticleBackgroundImageRef}
            />
            <BfInputNumber
              label="Mouse Radius"
              id="mouse-radius"
              value={defaultConfig.mouseRadius || 40}
              step="1"
              onChange={(value) => updateProps("noConfig.mouse-radius", value)}
            />
            <BfInputNumber
              label="Max Particles"
              id="max-particles"
              value={defaultConfig.maxParticles || 100}
              step="10"
              onChange={(value) => updateProps("noConfig.max-particles", value)}
            />
            <BfSelect
              label="Blend Mode"
              defaultValue={defaultConfig.blendMode || "NORMAL"}
              onChange={(value) => updateProps("noConfig.blend-mode", value)}
              elements={blendModes}
            />
            <BfCheckbox
              label="Composite Parent"
              id="composite-parent"
              onChange={(value) =>
                updateProps("noConfig.composite-parent", value)
              }
              checked={defaultConfig.compositeParent || false}
            />
            {renderTextureVariantsEditor()}
          </>
        )}
      </div>
    </>
  );
};

export default GeneralProperties;
