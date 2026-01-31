"use client";

import { useCallback, useState, useEffect, useRef, useMemo } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import InputNumber from "@components/html/InputNumber";
import ColorPicker from "@components/html/ColorPicker";
import Select from "@components/html/Select";
import File from "@components/html/File";
import pixiRefs from "@pixi/pixiRefs";
import { GhostEffect } from "custom-pixi-particles";
import { Sprite, Texture, BLEND_MODES } from "pixi.js";
import GhostEffectDescription from "@components/html/behaviourDescriptions/GhostEffect";

export default function GhostEffectProperties({ defaultConfig }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [ghostEffectInstance, setGhostEffectInstance] = useState(null);
  const [ghostSprite, setGhostSprite] = useState(null);
  const [isTracking, setIsTracking] = useState(false);

  const ghostSpriteRef = useRef(null);
  const fileSpriteInputRef = useRef(null);

  const keysToInitialize = {
    spawnInterval: 0.05,
    ghostLifetime: 0.5,
    startAlpha: 0.6,
    endAlpha: 0,
    startTint: 0xffffff,
    endTint: 0x00ffff,
    blendMode: BLEND_MODES.NORMAL,
    maxGhosts: 20,
  };

  const ghostConfig = useMemo(() => {
    return mergeObjectsWithDefaults(keysToInitialize, defaultConfig.ghostEffect || {});
  }, [defaultConfig.ghostEffect]);

  const toggleSubmenuVisibility = useCallback(() => {
    setIsSubmenuVisible((prev) => (prev === "collapse" ? "" : "collapse"));
  }, []);

  const updateGhostConfig = (updatedFields) => {
    const newConfig = { ...ghostConfig, ...updatedFields };
    defaultConfig.ghostEffect = newConfig;
    updateProps("ghostEffect", newConfig);
    
    // If effect is running, recreate it with new config
    if (isTracking && ghostEffectInstance) {
      stopTracking();
      setTimeout(() => {
        startTracking();
      }, 100);
    }
  };

  useEffect(() => {
    const checkAndReattach = () => {
      const { bgContainer } = pixiRefs;
      const sprite = ghostSpriteRef.current;
      if (sprite && bgContainer && !sprite.parent) {
        bgContainer.addChild(sprite);
      }
    };
    checkAndReattach();
    const timeout = setTimeout(checkAndReattach, 50);
    return () => clearTimeout(timeout);
  });

  // Load custom sprite from config on mount
  useEffect(() => {
    if (ghostConfig.customSprite && !ghostSprite && ghostConfig.customSprite.result) {
      createGhostSprite(ghostConfig.customSprite.result);
    }
  }, [ghostConfig.customSprite]);

  const createGhostSprite = useCallback((customDataUrl = null) => {
    if (ghostSpriteRef.current) {
      if (ghostSpriteRef.current.parent) {
        ghostSpriteRef.current.parent.removeChild(ghostSpriteRef.current);
      }
      ghostSpriteRef.current.destroy();
      ghostSpriteRef.current = null;
    }

    if (ghostEffectInstance) {
      ghostEffectInstance.destroy();
      setGhostEffectInstance(null);
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
          ghostSpriteRef.current = sprite;
          setGhostSprite(sprite);
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
    ghostSpriteRef.current = sprite;
    setGhostSprite(sprite);
  }, [ghostEffectInstance, ghostConfig]);

  const startTracking = useCallback(() => {
    const sprite = ghostSpriteRef.current;
    if (!sprite || !sprite.parent || isTracking) return;

    if (ghostEffectInstance) {
      ghostEffectInstance.destroy();
      setGhostEffectInstance(null);
    }

    sprite.visible = true;
    const options = { ...ghostConfig };

    const { bgContainer } = pixiRefs;
    const effect = new GhostEffect(sprite, options);
    bgContainer.addChild(effect);

    setGhostEffectInstance(effect);
    setIsTracking(true);
    effect.start();
  }, [ghostConfig, ghostEffectInstance, isTracking]);

  const stopTracking = useCallback(() => {
    if (ghostEffectInstance) {
      ghostEffectInstance.stop();
      setIsTracking(false);
      // Don't destroy immediately - let ghosts fade out
      setTimeout(() => {
        if (ghostEffectInstance) {
          ghostEffectInstance.destroy();
          setGhostEffectInstance(null);
        }
      }, ghostConfig.ghostLifetime * 1000 + 100);
    }
  }, [ghostEffectInstance, ghostConfig.ghostLifetime]);

  const animateSprite = useRef(null);

  useEffect(() => {
    if (isTracking && ghostSpriteRef.current) {
      const startTime = Date.now();
      const { app } = pixiRefs;
      
      const animate = () => {
        if (!isTracking || !ghostSpriteRef.current) return;
        
        const sprite = ghostSpriteRef.current;
        const time = (Date.now() - startTime) * 0.001;
        
        sprite.x = app.screen.width / 2 + Math.sin(time) * 100;
        sprite.y = app.screen.height / 2 - 100 + Math.cos(time * 0.7) * 50;
        sprite.rotation = time * 0.5;

        animateSprite.current = requestAnimationFrame(animate);
      };
      
      animate();
    } else {
      if (animateSprite.current) {
        cancelAnimationFrame(animateSprite.current);
        animateSprite.current = null;
      }
    }

    return () => {
      if (animateSprite.current) {
        cancelAnimationFrame(animateSprite.current);
        animateSprite.current = null;
      }
    };
  }, [isTracking]);

  useEffect(() => {
    return () => {
      if (ghostSpriteRef.current) ghostSpriteRef.current.destroy();
      if (ghostEffectInstance) {
        ghostEffectInstance.destroy();
      }
    };
  }, []);

  const blendModeOptions = useMemo(() => {
    const seen = new Set();
    return Object.entries(BLEND_MODES)
      .filter(([key, value]) => {
        // Filter only numeric values and avoid duplicates
        if (typeof value !== "number") return false;
        if (seen.has(value)) return false;
        seen.add(value);
        return true;
      })
      .map(([key, value]) => ({
        key: key, // Use the string key as the unique identifier
        value: value.toString(), // Use value for the option value
        displayName: key.replace(/_/g, " "),
      }))
      .sort((a, b) => a.displayName.localeCompare(b.displayName));
  }, []);

  const handleSpriteUpload = useCallback((e) => {
    const file = fileSpriteInputRef.current?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const fileName = `ghost-sprite-${Date.now()}-${file.name}`;
      const imageData = {
        fileName: fileName,
        result: reader.result,
      };

      // Store in config
      const newConfig = { ...ghostConfig, customSprite: imageData };
      defaultConfig.ghostEffect = newConfig;
      updateProps("ghostEffect", newConfig);

      // Create texture directly from data URL
      createGhostSprite(reader.result);
    };
    reader.onerror = () => {
      console.error("Failed to read sprite file");
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }, [ghostConfig, createGhostSprite]);

  const handleSpriteUploadClick = useCallback(() => {
    fileSpriteInputRef.current?.click();
  }, []);

  const hexToRgb = (hex) => ({ r: (hex >> 16) & 0xff, g: (hex >> 8) & 0xff, b: hex & 0xff, a: 1 });
  const rgbToHex = (r, g, b) => (r << 16) | (g << 8) | b;

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return null;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>Ghost Effect Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        <GhostEffectDescription />
        <File
          label="Custom Sprite"
          buttonText={ghostConfig.customSprite ? "Replace Sprite" : "Upload Sprite"}
          id="ghost-sprite-upload"
          onChange={handleSpriteUpload}
          onClick={handleSpriteUploadClick}
          ref={fileSpriteInputRef}
        />
        {!ghostSprite ? (
          <div className="form-group">
            <div className="col-xs-12">
              <button
                className="btn btn-default btn-block"
                onClick={() => createGhostSprite()}
                disabled={!!(ghostSprite && ghostSprite.parent)}
              >
                {ghostSprite && ghostSprite.parent ? "Sprite Active" : "Create Sprite"}
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="form-group">
          <div className="col-xs-12">
            {!isTracking ? (
              <button
                className="btn btn-primary btn-block"
                onClick={startTracking}
                disabled={!ghostSprite}
              >
                Start Tracking
              </button>
            ) : (
              <button
                className="btn btn-danger btn-block"
                onClick={stopTracking}
              >
                Stop Tracking
              </button>
            )}
          </div>
        </div>
        <hr />

        <InputNumber
          label="Spawn Interval"
          id="spawnInterval"
          value={ghostConfig.spawnInterval}
          step="0.01" min="0.01" max="1"
          onChange={(v) => updateGhostConfig({ spawnInterval: v })}
        />
        <InputNumber
          label="Ghost Lifetime"
          id="ghostLifetime"
          value={ghostConfig.ghostLifetime}
          step="0.1" min="0.1" max="5"
          onChange={(v) => updateGhostConfig({ ghostLifetime: v })}
        />
        <InputNumber
          label="Start Alpha"
          id="startAlpha"
          value={ghostConfig.startAlpha}
          step="0.1" min="0" max="1"
          onChange={(v) => updateGhostConfig({ startAlpha: v })}
        />
        <InputNumber
          label="End Alpha"
          id="endAlpha"
          value={ghostConfig.endAlpha}
          step="0.1" min="0" max="1"
          onChange={(v) => updateGhostConfig({ endAlpha: v })}
        />
        <ColorPicker
          label="Start Tint"
          color={hexToRgb(ghostConfig.startTint)}
          colorChanged={(color) => {
            updateGhostConfig({ startTint: rgbToHex(color.rgb.r, color.rgb.g, color.rgb.b) });
          }}
        />
        <ColorPicker
          label="End Tint"
          color={hexToRgb(ghostConfig.endTint)}
          colorChanged={(color) => {
            updateGhostConfig({ endTint: rgbToHex(color.rgb.r, color.rgb.g, color.rgb.b) });
          }}
        />
        <Select
          label="Blend Mode"
          defaultValue={ghostConfig.blendMode.toString()}
          onChange={(v) => updateGhostConfig({ blendMode: parseInt(v) })}
          elements={blendModeOptions}
        />
        <InputNumber
          label="Max Ghosts"
          id="maxGhosts"
          value={ghostConfig.maxGhosts}
          step="1" min="1" max="100"
          onChange={(v) => updateGhostConfig({ maxGhosts: v })}
        />
      </div>
    </>
  );
}
