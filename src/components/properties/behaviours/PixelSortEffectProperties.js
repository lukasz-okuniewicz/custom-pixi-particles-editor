"use client";

import { useCallback, useState, useEffect, useRef, useMemo } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import InputNumber from "@components/html/InputNumber";
import Select from "@components/html/Select";
import File from "@components/html/File";
import pixiRefs from "@pixi/pixiRefs";
import { PixelSortEffect } from "custom-pixi-particles";
import { Sprite, Texture } from "pixi.js";
import PixelSortEffectDescription from "@components/html/behaviourDescriptions/PixelSortEffect";

export default function PixelSortEffectProperties({ defaultConfig }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [pixelSortEffectInstance, setPixelSortEffectInstance] = useState(null);
  const [pixelSortSprite, setPixelSortSprite] = useState(null);

  const isSortingRef = useRef(false);
  const pixelSortSpriteRef = useRef(null);
  const fileSpriteInputRef = useRef(null);

  const keysToInitialize = {
    direction: "horizontal",
    sortMode: "luminance",
    sortOrder: "ascending",
    thresholdLow: 0.2,
    thresholdHigh: 0.8,
    duration: 1.5,
    refreshRate: 0.016,
    rowStep: 1,
  };

  const pixelSortConfig = useMemo(() => {
    return mergeObjectsWithDefaults(
      keysToInitialize,
      defaultConfig.pixelSortEffect || {}
    );
  }, [defaultConfig.pixelSortEffect]);

  const toggleSubmenuVisibility = useCallback(() => {
    setIsSubmenuVisible((prev) => (prev === "collapse" ? "" : "collapse"));
  }, []);

  const updatePixelSortConfig = (updatedFields) => {
    const newConfig = { ...pixelSortConfig, ...updatedFields };
    defaultConfig.pixelSortEffect = newConfig;
    updateProps("pixelSortEffect", newConfig);
  };

  useEffect(() => {
    const checkAndReattach = () => {
      const { bgContainer } = pixiRefs;
      const sprite = pixelSortSpriteRef.current;
      if (
        sprite &&
        bgContainer &&
        !sprite.parent &&
        !isSortingRef.current
      ) {
        bgContainer.addChild(sprite);
      }
    };
    checkAndReattach();
    const timeout = setTimeout(checkAndReattach, 50);
    return () => clearTimeout(timeout);
  });

  useEffect(() => {
    if (
      pixelSortConfig.customSprite &&
      !pixelSortSprite &&
      pixelSortConfig.customSprite.result
    ) {
      createPixelSortSprite(pixelSortConfig.customSprite.result);
    }
  }, [pixelSortConfig.customSprite]);

  const createPixelSortSprite = useCallback(
    (customDataUrl = null) => {
      if (pixelSortSpriteRef.current) {
        if (pixelSortSpriteRef.current.parent) {
          pixelSortSpriteRef.current.parent.removeChild(
            pixelSortSpriteRef.current
          );
        }
        pixelSortSpriteRef.current.destroy();
        pixelSortSpriteRef.current = null;
      }

      if (pixelSortEffectInstance) {
        pixelSortEffectInstance.destroy();
        setPixelSortEffectInstance(null);
      }

      const { bgContainer, app } = pixiRefs;
      if (!bgContainer || !app) return;

      let texture;

      if (customDataUrl) {
        const img = new Image();
        img.onload = () => {
          texture = Texture.from(img);
          const sprite = new Sprite(texture);
          sprite.anchor.set(0.5, 0.5);
          sprite.x = app.screen.width / 2;
          sprite.y = app.screen.height / 2 - 100;
          sprite.scale.set(1.5);

          bgContainer.addChild(sprite);
          pixelSortSpriteRef.current = sprite;
          setPixelSortSprite(sprite);
        };
        img.onerror = () => {}
        img.src = customDataUrl;
        return;
      }

      const textureNames = ["campFire", "face", "blackHole", "earth", "autumn"];
      for (const name of textureNames) {
        try {
          texture = Texture.from(name);
          if (texture && texture.valid) break;
        } catch (e) {}
      }

      const sprite = new Sprite(texture);
      sprite.anchor.set(0.5, 0.5);
      sprite.x = app.screen.width / 2;
      sprite.y = app.screen.height / 2 - 100;
      sprite.scale.set(1.5);

      bgContainer.addChild(sprite);
      pixelSortSpriteRef.current = sprite;
      setPixelSortSprite(sprite);
    },
    [pixelSortEffectInstance, pixelSortConfig]
  );

  const performPixelSort = useCallback(() => {
    const sprite = pixelSortSpriteRef.current;
    if (!sprite || !sprite.parent || isSortingRef.current) return;

    isSortingRef.current = true;

    if (pixelSortEffectInstance) {
      pixelSortEffectInstance.destroy();
      setPixelSortEffectInstance(null);
    }

    sprite.visible = true;
    const { customSprite, ...options } = pixelSortConfig;

    const effect = new PixelSortEffect(sprite, options);
    const index = sprite.parent.getChildIndex(sprite);
    sprite.parent.addChildAt(effect, index);

    setPixelSortEffectInstance(effect);

    effect.play().then(() => {
      effect.destroy();
      setPixelSortEffectInstance(null);
      isSortingRef.current = false;

      if (sprite && sprite.parent) {
        const newSprite = new Sprite(sprite.texture);
        newSprite.anchor.set(0.5, 0.5);
        newSprite.x = sprite.x;
        newSprite.y = sprite.y;
        newSprite.scale.set(sprite.scale.x, sprite.scale.y);
        sprite.parent.addChild(newSprite);

        pixelSortSpriteRef.current = newSprite;
        setPixelSortSprite(newSprite);
        sprite.destroy();
      }
    });
  }, [pixelSortConfig, pixelSortEffectInstance]);

  const triggerPixelSort = useCallback(() => {
    if (!pixelSortSpriteRef.current) {
      createPixelSortSprite();
      setTimeout(performPixelSort, 150);
    } else {
      performPixelSort();
    }
  }, [createPixelSortSprite, performPixelSort]);

  useEffect(() => {
    return () => {
      if (pixelSortSpriteRef.current) pixelSortSpriteRef.current.destroy();
    };
  }, []);

  const directionOptions = [
    { key: "horizontal", displayName: "Horizontal" },
    { key: "vertical", displayName: "Vertical" },
  ];

  const sortModeOptions = [
    { key: "luminance", displayName: "Luminance" },
    { key: "hue", displayName: "Hue" },
    { key: "saturation", displayName: "Saturation" },
    { key: "red", displayName: "Red" },
    { key: "green", displayName: "Green" },
    { key: "blue", displayName: "Blue" },
  ];

  const sortOrderOptions = [
    { key: "ascending", displayName: "Ascending" },
    { key: "descending", displayName: "Descending" },
  ];

  const handleSpriteUpload = useCallback(
    (e) => {
      const file = fileSpriteInputRef.current?.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const fileName = `pixel-sort-sprite-${Date.now()}-${file.name}`;
        const imageData = {
          fileName,
          result: reader.result,
        };

        const newConfig = { ...pixelSortConfig, customSprite: imageData };
        defaultConfig.pixelSortEffect = newConfig;
        updateProps("pixelSortEffect", newConfig);

        createPixelSortSprite(reader.result);
      };
      reader.onerror = () => {
        console.error("Failed to read sprite file");
      };
      reader.readAsDataURL(file);
      e.target.value = "";
    },
    [pixelSortConfig, createPixelSortSprite]
  );

  const handleSpriteUploadClick = useCallback(() => {
    fileSpriteInputRef.current?.click();
  }, []);

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return null;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>
        Pixel Sort Effect Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <PixelSortEffectDescription />
        <File
          label="Custom Sprite"
          buttonText={
            pixelSortConfig.customSprite ? "Replace Sprite" : "Upload Sprite"
          }
          id="pixel-sort-sprite-upload"
          onChange={handleSpriteUpload}
          onClick={handleSpriteUploadClick}
          ref={fileSpriteInputRef}
        />
        {!pixelSortSprite ? (
          <div className="form-group">
            <div className="col-xs-12">
              <button
                className="btn btn-default btn-block"
                onClick={() => createPixelSortSprite()}
                disabled={!!(pixelSortSprite && pixelSortSprite.parent)}
              >
                {pixelSortSprite && pixelSortSprite.parent
                  ? "Sprite Active"
                  : "Create Sprite"}
              </button>
            </div>
          </div>
        ) : null}
        <div className="form-group">
          <div className="col-xs-12">
            <button
              className="btn btn-primary btn-block"
              onClick={triggerPixelSort}
              disabled={isSortingRef.current}
            >
              {isSortingRef.current ? "Sorting..." : "Trigger Pixel Sort"}
            </button>
          </div>
        </div>
        <hr />

        <Select
          label="Direction"
          defaultValue={pixelSortConfig.direction}
          onChange={(v) => updatePixelSortConfig({ direction: v })}
          elements={directionOptions}
        />
        <Select
          label="Sort Mode"
          defaultValue={pixelSortConfig.sortMode}
          onChange={(v) => updatePixelSortConfig({ sortMode: v })}
          elements={sortModeOptions}
        />
        <Select
          label="Sort Order"
          defaultValue={pixelSortConfig.sortOrder}
          onChange={(v) => updatePixelSortConfig({ sortOrder: v })}
          elements={sortOrderOptions}
        />
        <InputNumber
          label="Threshold Low"
          id="thresholdLow"
          value={pixelSortConfig.thresholdLow}
          step="0.05"
          min="0"
          max="1"
          onChange={(v) => updatePixelSortConfig({ thresholdLow: v })}
        />
        <InputNumber
          label="Threshold High"
          id="thresholdHigh"
          value={pixelSortConfig.thresholdHigh}
          step="0.05"
          min="0"
          max="1"
          onChange={(v) => updatePixelSortConfig({ thresholdHigh: v })}
        />
        <InputNumber
          label="Duration"
          id="duration"
          value={pixelSortConfig.duration}
          step="0.1"
          min="0.1"
          onChange={(v) => updatePixelSortConfig({ duration: v })}
        />
        <InputNumber
          label="Row Step"
          id="rowStep"
          value={pixelSortConfig.rowStep}
          step="1"
          min="1"
          max="20"
          onChange={(v) => updatePixelSortConfig({ rowStep: v })}
        />
      </div>
    </>
  );
}
