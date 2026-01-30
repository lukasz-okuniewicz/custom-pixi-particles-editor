"use client";

import { useCallback, useState, useEffect, useRef, useMemo } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import InputNumber from "@components/html/InputNumber";
import File from "@components/html/File";
import pixiRefs from "@pixi/pixiRefs";
import { MeltEffect } from "custom-pixi-particles";
import { Sprite, Texture } from "pixi.js-legacy";
import { Loader as PixiLoader } from "@pixi/loaders";
import MeltEffectDescription from "@components/html/behaviourDescriptions/MeltEffect";

export default function MeltEffectProperties({ defaultConfig }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [meltEffectInstance, setMeltEffectInstance] = useState(null);
  const [meltSprite, setMeltSprite] = useState(null);

  const triggerTimeoutRef = useRef(null);
  const isMeltingRef = useRef(false);
  const meltSpriteRef = useRef(null);
  const meltEffectInstanceRef = useRef(null);
  const fileSpriteInputRef = useRef(null);

  const keysToInitialize = {
    gridCols: 15,
    gridRows: 15,
    gravity: 1200,
    viscosity: 0.98,
    horizontalSpread: 50,
    duration: 2.5,
    blurAmount: 6,
    threshold: 0.5,
  };

  const meltConfig = useMemo(() => {
    return mergeObjectsWithDefaults(keysToInitialize, defaultConfig.meltEffect || {});
  }, [defaultConfig.meltEffect]);

  const toggleSubmenuVisibility = useCallback(() => {
    setIsSubmenuVisible((prev) => (prev === "collapse" ? "" : "collapse"));
  }, []);

  const updateMeltConfig = (updatedFields) => {
    const newConfig = { ...meltConfig, ...updatedFields };
    defaultConfig.meltEffect = newConfig;
    updateProps("meltEffect", newConfig);
  };

  useEffect(() => {
    const checkAndReattach = () => {
      const { bgContainer } = pixiRefs;
      const sprite = meltSpriteRef.current;
      if (sprite && bgContainer && !sprite.parent && !isMeltingRef.current) {
        bgContainer.addChild(sprite);
      }
    };
    checkAndReattach();
    const timeout = setTimeout(checkAndReattach, 50);
    return () => clearTimeout(timeout);
  });

  // Load custom sprite from config on mount / when customSprite changes (e.g. upload)
  useEffect(() => {
    if (meltConfig.customSprite?.result) {
      createMeltSprite(meltConfig.customSprite.result);
    }
  }, [meltConfig.customSprite]);

  const createMeltSprite = useCallback((customDataUrl = null) => {
    if (meltSpriteRef.current) {
      if (meltSpriteRef.current.parent) {
        meltSpriteRef.current.parent.removeChild(meltSpriteRef.current);
      }
      meltSpriteRef.current.destroy();
      meltSpriteRef.current = null;
    }

    if (meltEffectInstance) {
      meltEffectInstance.destroy();
      setMeltEffectInstance(null);
      meltEffectInstanceRef.current = null;
      pixiRefs.meltEffectInstance = null;
    }

    const { bgContainer, app } = pixiRefs;
    if (!bgContainer || !app) return;

    let texture;
    
    // Use custom uploaded sprite if available - create texture directly from data URL
    if (customDataUrl) {
      try {
        // Create an image element from the data URL
        const img = new Image();
        img.onload = () => {
          texture = Texture.from(img);
          const sprite = new Sprite(texture);
          sprite.anchor.set(0.5, 0.5);
          sprite.x = app.screen.width / 2;
          sprite.y = app.screen.height / 2 - 100;
          sprite.scale.set(1);

          bgContainer.addChild(sprite);
          meltSpriteRef.current = sprite;
          setMeltSprite(sprite);
        };
        img.onerror = (e) => {
          console.error("Failed to load image from data URL:", e);
          // Fall through to default textures
        };
        img.src = customDataUrl;
        return; // Return early, sprite will be created in onload
      } catch (e) {
        console.error("Failed to create texture from data URL:", e);
      }
    }
    
    // Fallback to default textures if custom texture not available
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
    sprite.scale.set(1);

    bgContainer.addChild(sprite);
    meltSpriteRef.current = sprite;
    setMeltSprite(sprite);
  }, [meltEffectInstance, meltConfig]);

  const performMelt = useCallback(() => {
    const sprite = meltSpriteRef.current;
    if (!sprite || !sprite.parent || isMeltingRef.current) return;

    isMeltingRef.current = true;

    if (meltEffectInstance) {
      meltEffectInstance.destroy();
      setMeltEffectInstance(null);
      meltEffectInstanceRef.current = null;
      pixiRefs.meltEffectInstance = null;
    }

    sprite.visible = true;
    const options = { ...meltConfig };

    const effect = new MeltEffect(sprite, options);
    const index = sprite.parent.getChildIndex(sprite);
    sprite.parent.addChildAt(effect, index);

    setMeltEffectInstance(effect);
    meltEffectInstanceRef.current = effect;
    pixiRefs.meltEffectInstance = effect;

    effect.start().then(() => {
      effect.destroy();
      setMeltEffectInstance(null);
      meltEffectInstanceRef.current = null;
      pixiRefs.meltEffectInstance = null;
      isMeltingRef.current = false;

      if (sprite && sprite.parent) {
        const newSprite = new Sprite(sprite.texture);
        newSprite.anchor.set(0.5, 0.5);
        newSprite.x = sprite.x;
        newSprite.y = sprite.y;
        newSprite.scale.set(sprite.scale.x, sprite.scale.y);
        sprite.parent.addChild(newSprite);

        meltSpriteRef.current = newSprite;
        setMeltSprite(newSprite);
        sprite.destroy();
      }
    });
  }, [meltConfig, meltEffectInstance]);

  const triggerMelt = useCallback(() => {
    if (!meltSpriteRef.current) {
      createMeltSprite();
      setTimeout(performMelt, 150);
    } else {
      performMelt();
    }
  }, [createMeltSprite, performMelt]);

  useEffect(() => {
    return () => {
      if (meltEffectInstanceRef.current) {
        meltEffectInstanceRef.current.destroy();
        meltEffectInstanceRef.current = null;
        pixiRefs.meltEffectInstance = null;
      }
      if (meltSpriteRef.current) meltSpriteRef.current.destroy();
      if (triggerTimeoutRef.current) clearTimeout(triggerTimeoutRef.current);
    };
  }, []);

  const handleSpriteUpload = useCallback((e) => {
    const file = fileSpriteInputRef.current?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const fileName = `melt-sprite-${Date.now()}-${file.name}`;
      const imageData = {
        fileName: fileName,
        result: reader.result,
      };

      // Store in config - the useEffect watching meltConfig.customSprite will call createMeltSprite
      const newConfig = { ...meltConfig, customSprite: imageData };
      defaultConfig.meltEffect = newConfig;
      updateProps("meltEffect", newConfig);
    };
    reader.onerror = () => {
      console.error("Failed to read sprite file");
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }, [meltConfig, createMeltSprite]);

  const handleSpriteUploadClick = useCallback(() => {
    fileSpriteInputRef.current?.click();
  }, []);

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return null;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>Melt Effect Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        <MeltEffectDescription />
        <File
          label="Custom Sprite"
          buttonText={meltConfig.customSprite ? "Replace Sprite" : "Upload Sprite"}
          id="melt-sprite-upload"
          onChange={handleSpriteUpload}
          onClick={handleSpriteUploadClick}
          ref={fileSpriteInputRef}
        />
        {!meltSprite ? (
          <div className="form-group">
            <div className="col-xs-12">
              <button
                className="btn btn-default btn-block"
                onClick={() => createMeltSprite()}
                disabled={!!(meltSprite && meltSprite.parent)}
              >
                {meltSprite && meltSprite.parent ? "Sprite Active" : "Create Sprite"}
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="form-group">
          <div className="col-xs-12">
            <button
              className="btn btn-primary btn-block"
              onClick={triggerMelt}
              disabled={isMeltingRef.current}
            >
              {isMeltingRef.current ? "Melting..." : "Trigger Melt"}
            </button>
          </div>
        </div>
        <hr />

        <InputNumber
          label="Grid Columns"
          id="gridCols"
          value={meltConfig.gridCols}
          step="1" min="1" max="50"
          onChange={(v) => updateMeltConfig({ gridCols: v })}
        />
        <InputNumber
          label="Grid Rows"
          id="gridRows"
          value={meltConfig.gridRows}
          step="1" min="1" max="50"
          onChange={(v) => updateMeltConfig({ gridRows: v })}
        />
        <InputNumber
          label="Gravity"
          id="gravity"
          value={meltConfig.gravity}
          step="50" min="0"
          onChange={(v) => updateMeltConfig({ gravity: v })}
        />
        <InputNumber
          label="Viscosity"
          id="viscosity"
          value={meltConfig.viscosity}
          step="0.01" min="0" max="1"
          onChange={(v) => updateMeltConfig({ viscosity: v })}
        />
        <InputNumber
          label="Horizontal Spread"
          id="horizontalSpread"
          value={meltConfig.horizontalSpread}
          step="5" min="0" max="200"
          onChange={(v) => updateMeltConfig({ horizontalSpread: v })}
        />
        <InputNumber
          label="Duration"
          id="duration"
          value={meltConfig.duration}
          step="0.1" min="0.1" max="10"
          onChange={(v) => updateMeltConfig({ duration: v })}
        />
        <InputNumber
          label="Blur Amount"
          id="blurAmount"
          value={meltConfig.blurAmount}
          step="1" min="0" max="20"
          onChange={(v) => updateMeltConfig({ blurAmount: v })}
        />
        <InputNumber
          label="Threshold"
          id="threshold"
          value={meltConfig.threshold}
          step="0.1" min="0" max="1"
          onChange={(v) => updateMeltConfig({ threshold: v })}
        />
      </div>
    </>
  );
}
