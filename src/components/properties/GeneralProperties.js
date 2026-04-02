"use client";

import { useBehaviourSectionCollapse } from "@context/SidebarBehaviourAccordionContext";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAutoResizeTextarea } from "@hooks/useAutoResizeTextarea";
import { normalizeBlendModeToPixiNumber, updateProps } from "@utils";
import {
  buildAnimatedSpriteNameSelectElements,
  coerceAnimatedSpriteSelectValue,
  getAnimatedSpritePrefixesForEditor,
  resolveAnimatedSpriteSelectValue,
} from "@utils/animatedSpritePrefixes";
import File from "@components/html/File";
import { BLEND_MODES, Loader } from "pixi.js-legacy";
import {
  BfCheckbox,
  BfColorPicker,
  BfFieldHint,
  BfInputNumber,
  BfSelect,
} from "@components/properties/BehaviourFieldWrappers";
import GeneralDescription from "@components/html/behaviourDescriptions/General";
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

  // Memoized blend modes list
  const blendModes = useMemo(() => {
    // Filter only string keys from the enum
    return Object.entries(BLEND_MODES)
      .filter(([_, value]) => typeof value === "number") // Exclude reverse mappings
      .map(([key, value]) => ({
        key,
        value,
        displayName: key.replace(/_/g, " "), // Transform keys to normal text
      }))
      .sort((a, b) => a.displayName.localeCompare(b.displayName)); // Sort by display name
  }, []);

  // Memoized predefined images
  const predefinedImages = useMemo(() => {
    const textures =
      Loader.shared.resources?.["multipacked-0.json"]?.textures || {};
    const textures2 = Loader.shared.resources?.["images.json"]?.textures || {};

    // Combine textures1 and textures2
    const combinedTextures = { ...textures, ...textures2 };

    if (Object.keys(combinedTextures).length === 0) return [];

    return Object.keys(combinedTextures)
      .sort()
      .map((key) => ({
        key,
        displayName: key,
      }));
  }, []);

  const handleAnimatedSpriteEnabledChange = useCallback(
    (checked) => {
      const anim = {
        ...(defaultConfig?.emitterConfig?.animatedSprite || {}),
      };
      if (checked) {
        anim.enabled = true;
        const detected = getAnimatedSpritePrefixesForEditor(
          Loader.shared,
          defaultConfig?.particleTextureSources,
          defaultConfig?.textures,
        );
        if (detected.length === 1) {
          anim.animatedSpriteName = detected[0].prefix;
        }
        updateProps("emitterConfig.animatedSprite", anim, undefined, true);
      } else {
        anim.enabled = false;
        updateProps("emitterConfig.animatedSprite", anim, undefined, true);
      }
    },
    [
      defaultConfig?.emitterConfig?.animatedSprite,
      defaultConfig?.particleTextureSources,
      defaultConfig?.textures,
    ],
  );

  const animatedSpriteSelect = useMemo(() => {
    const detected = getAnimatedSpritePrefixesForEditor(
      Loader.shared,
      defaultConfig?.particleTextureSources,
      defaultConfig?.textures,
    );
    const resolved = resolveAnimatedSpriteSelectValue(
      defaultConfig?.emitterConfig?.animatedSprite?.animatedSpriteName,
      defaultConfig?.textures?.[0],
    );
    const needsPlaceholder = detected.length > 1;
    const selectValue = needsPlaceholder
      ? resolved
      : coerceAnimatedSpriteSelectValue(resolved, detected);
    const elements = buildAnimatedSpriteNameSelectElements(detected, resolved, {
      prependPlaceholder: needsPlaceholder,
    });
    return { elements, selectValue };
  }, [
    defaultConfig?.particleTextureSources,
    defaultConfig?.textures,
    defaultConfig?.emitterConfig?.animatedSprite?.animatedSpriteName,
  ]);

  useEffect(() => {
    if (!defaultConfig?.emitterConfig?.animatedSprite?.enabled) return;
    const anim = defaultConfig.emitterConfig.animatedSprite;
    const resolved = resolveAnimatedSpriteSelectValue(
      anim.animatedSpriteName,
      defaultConfig?.textures?.[0],
    );
    if (resolved) return;
    const detected = getAnimatedSpritePrefixesForEditor(
      Loader.shared,
      defaultConfig?.particleTextureSources,
      defaultConfig?.textures,
    );
    if (detected.length !== 1) return;
    const only = detected[0].prefix;
    if (anim.animatedSpriteName === only) return;
    updateProps(
      "emitterConfig.animatedSprite.animatedSpriteName",
      only,
      undefined,
      true,
    );
  }, [
    defaultConfig?.emitterConfig?.animatedSprite?.enabled,
    defaultConfig?.emitterConfig?.animatedSprite?.animatedSpriteName,
    defaultConfig?.particleTextureSources,
    defaultConfig?.textures,
  ]);

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
    const emitterConfig = defaultConfig?.emitterConfig || {};
    const tv = emitterConfig.textureVariants;
    setTextureVariantsJson(
      tv && tv.length ? JSON.stringify(tv, null, 2) : "[]",
    );
    const w = emitterConfig.variantWeights;
    setVariantWeightsJson(
      w && w.length ? JSON.stringify(w) : "",
    );
    setTextureVariantsJsonError(false);
  }, [
    defaultConfig?.emitterConfig?.textureVariants,
    defaultConfig?.emitterConfig?.variantWeights,
  ]);

  useEffect(() => {
    const bg = defaultConfig?.bgColor;
    if (!bg || typeof bg !== "object") return;
    const r = Number(bg.r) || 0;
    const g = Number(bg.g) || 0;
    const b = Number(bg.b) || 0;
    const a = bg.a != null ? Number(bg.a) : 1;
    setBgColor((prev) => {
      const pa = prev.a ?? prev.alpha ?? 1;
      if (prev.r === r && prev.g === g && prev.b === b && pa === a) {
        return prev;
      }
      return { r, g, b, a, alpha: a };
    });
  }, [defaultConfig?.bgColor]);

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
    if (!defaultConfig?.emitterConfig?.animatedSprite) return null;
    if (!defaultConfig.emitterConfig.animatedSprite.enabled) return null;

    return (
      <>
        <BfSelect
          label="Animated Sprite Name"
          id="animated-sprite-name"
          defaultValue={animatedSpriteSelect.selectValue}
          elements={animatedSpriteSelect.elements}
          onChange={(value) => {
            if (value === "") return;
            updateProps(
              "emitterConfig.animatedSprite.animatedSpriteName",
              value,
              undefined,
              true,
            );
          }}
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
            <BfCheckbox
              label="Animated Sprite"
              id="animated-sprite"
              onChange={handleAnimatedSpriteEnabledChange}
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
              defaultValue={normalizeBlendModeToPixiNumber(
                defaultConfig.emitterConfig?.blendMode ?? defaultConfig.blendMode,
              )}
              onChange={(value) => {
                updateProps(
                  "emitterConfig.blendMode",
                  normalizeBlendModeToPixiNumber(value),
                  undefined,
                  true,
                );
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
            <File
              label="Particle Finishing"
              buttonText="Add Images"
              id="load-particle-finishing"
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
            <BfCheckbox
              label="Animated Sprite"
              id="animated-sprite"
              onChange={handleAnimatedSpriteEnabledChange}
              checked={
                defaultConfig.emitterConfig.animatedSprite?.enabled || false
              }
            />
            <hr />
            {renderAnimatedSprite()}
            <BfColorPicker
              label="Background Color"
              id="background-color"
              color={bgColor}
              colorChanged={(value) => {
                setBgColor(value.rgb);
                updateProps("noConfig.bg-color", value.rgb);
              }}
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
              defaultValue={normalizeBlendModeToPixiNumber(
                defaultConfig.emitterConfig?.blendMode ??
                  defaultConfig.blendMode,
              )}
              onChange={(value) =>
                updateProps(
                  "noConfig.blend-mode",
                  normalizeBlendModeToPixiNumber(value),
                )
              }
              elements={blendModes}
            />
            {renderTextureVariantsEditor()}
          </>
        )}
      </div>
    </>
  );
};

export default GeneralProperties;
