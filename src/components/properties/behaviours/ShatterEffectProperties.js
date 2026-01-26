"use client";

import { useCallback, useState, useEffect, useRef, useMemo } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import InputNumber from "@components/html/InputNumber";
import ColorPicker from "@components/html/ColorPicker";
import Select from "@components/html/Select";
import pixiRefs from "@pixi/pixiRefs";
import { ShatterEffect } from "custom-pixi-particles";
import { Sprite, Texture } from "pixi.js-legacy";

export default function ShatterEffectProperties({ defaultConfig }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [shatterEffectInstance, setShatterEffectInstance] = useState(null);
  const [shatterSprite, setShatterSprite] = useState(null);

  const triggerTimeoutRef = useRef(null);
  const isExplodingRef = useRef(false);

  // Use a Ref to keep track of the sprite object synchronously
  const shatterSpriteRef = useRef(null);

  // Initialize and merge defaults
  const keysToInitialize = {
    gridCols: 50,
    gridRows: 50,
    explosionPower: 100,
    friction: 0.96,
    gravity: 800,
    turbulence: 0.2,
    lifetime: 2.0,
    fadeOutDuration: 0.5,
    mode: "radial",
    explosionOrigin: { x: 0.5, y: 0.5 },
    blastDirection: 0,
    swirlStrength: 0,
    randomizeScale: false,
    endTint: 0xffffff,
  };

  const shatterConfig = useMemo(() => {
    return mergeObjectsWithDefaults(keysToInitialize, defaultConfig.shatterEffect || {});
  }, [defaultConfig.shatterEffect]);

  const toggleSubmenuVisibility = useCallback(() => {
    setIsSubmenuVisible((prev) => (prev === "collapse" ? "" : "collapse"));
  }, []);

  const updateShatterConfig = (updatedFields) => {
    const newConfig = { ...shatterConfig, ...updatedFields };
    defaultConfig.shatterEffect = newConfig;
    updateProps("shatterEffect", newConfig);
  };

  /**
   * RE-ATTACHMENT LOGIC
   * This ensures the sprite stays on stage even if updateProps()
   * triggers a global Pixi stage clear.
   */
  useEffect(() => {
    const checkAndReattach = () => {
      const { bgContainer } = pixiRefs;
      const sprite = shatterSpriteRef.current;
      // If we have a sprite state but it lost its parent and we aren't currently exploding
      if (sprite && bgContainer && !sprite.parent && !isExplodingRef.current) {
        bgContainer.addChild(sprite);
      }
    };

    // Run immediately on every render of this component
    checkAndReattach();

    // Also check on a slight delay to catch late stage clears
    const timeout = setTimeout(checkAndReattach, 50);
    return () => clearTimeout(timeout);
  });

  const createShatterSprite = useCallback(() => {
    // 1. Clean up existing Ref (synchronous)
    if (shatterSpriteRef.current) {
      if (shatterSpriteRef.current.parent) {
        shatterSpriteRef.current.parent.removeChild(shatterSpriteRef.current);
      }
      shatterSpriteRef.current.destroy();
      shatterSpriteRef.current = null;
    }

    // 2. Clean up effect
    if (shatterEffectInstance) {
      shatterEffectInstance.destroy();
      setShatterEffectInstance(null);
    }

    const { bgContainer, app } = pixiRefs;
    if (!bgContainer || !app) return;

    let texture;
    const textureNames = ["autumn", "face", "blackHole", "earth", "campFire"];
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
    sprite.scale.set(0.7);

    bgContainer.addChild(sprite);

    // Update Ref and State
    shatterSpriteRef.current = sprite;
    setShatterSprite(sprite);
  }, [shatterEffectInstance]);

  const performExplosion = useCallback(() => {
    const sprite = shatterSpriteRef.current;
    if (!sprite || !sprite.parent || isExplodingRef.current) return;

    isExplodingRef.current = true;

    if (shatterEffectInstance) {
      shatterEffectInstance.destroy();
      setShatterEffectInstance(null);
    }

    sprite.visible = true;

    // Use current shatterConfig values
    const options = { ...shatterConfig };

    const effect = new ShatterEffect(sprite, options);
    const index = sprite.parent.getChildIndex(sprite);
    sprite.parent.addChildAt(effect, index);

    setShatterEffectInstance(effect);

    effect.Explode().then(() => {
      effect.destroy();
      setShatterEffectInstance(null);
      isExplodingRef.current = false;

      // ShatterEffect typically hides the original sprite,
      // so we create a fresh one in its place.
      if (sprite && sprite.parent) {
        const newSprite = new Sprite(sprite.texture);
        newSprite.anchor.set(0.5, 0.5);
        newSprite.x = sprite.x;
        newSprite.y = sprite.y;
        newSprite.scale.set(sprite.scale.x, sprite.scale.y);
        sprite.parent.addChild(newSprite);

        shatterSpriteRef.current = newSprite;
        setShatterSprite(newSprite);
        sprite.destroy();
      }
    });
  }, [shatterConfig, shatterEffectInstance]);

  const triggerExplosion = useCallback(() => {
    if (!shatterSpriteRef.current) {
      createShatterSprite();
      setTimeout(performExplosion, 150);
    } else {
      performExplosion();
    }
  }, [createShatterSprite, performExplosion]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (shatterSpriteRef.current) shatterSpriteRef.current.destroy();
      if (triggerTimeoutRef.current) clearTimeout(triggerTimeoutRef.current);
    };
  }, []);

  const modeOptions = [
    { key: "radial", displayName: "Radial" },
    { key: "directional", displayName: "Directional" },
    { key: "swirl", displayName: "Swirl" },
  ];

  const hexToRgb = (hex) => ({ r: (hex >> 16) & 0xff, g: (hex >> 8) & 0xff, b: hex & 0xff, a: 1 });
  const rgbToHex = (r, g, b) => (r << 16) | (g << 8) | b;

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return null;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>Shatter Effect Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        {!shatterSprite ?
        <div className="form-group">
          <div className="col-xs-12">
            <button
              className="btn btn-default btn-block"
              onClick={createShatterSprite}
              // Button disabled only if sprite is valid AND has a parent (visible on stage)
              disabled={!!(shatterSprite && shatterSprite.parent)}
            >
              {shatterSprite && shatterSprite.parent ? "Sprite Active" : "Create Sprite"}
            </button>
          </div>
        </div>
          : <></> }
        <div className="form-group">
          <div className="col-xs-12">
            <button
              className="btn btn-primary btn-block"
              onClick={triggerExplosion}
              disabled={isExplodingRef.current}
            >
              {isExplodingRef.current ? "Exploding..." : "Trigger Explosion"}
            </button>
          </div>
        </div>
        <hr />
        <InputNumber
          label="Grid Columns"
          id="gridCols"
          value={shatterConfig.gridCols}
          step="1" min="1" max="50"
          onChange={(v) => updateShatterConfig({ gridCols: v })}
        />
        <InputNumber
          label="Grid Rows"
          id="gridRows"
          value={shatterConfig.gridRows}
          step="1" min="1" max="50"
          onChange={(v) => updateShatterConfig({ gridRows: v })}
        />
        <InputNumber
          label="Explosion Power"
          id="explosionPower"
          value={shatterConfig.explosionPower}
          step="100" min="0"
          onChange={(v) => updateShatterConfig({ explosionPower: v })}
        />
        <InputNumber
          label="Friction"
          id="friction"
          value={shatterConfig.friction}
          step="0.01" min="0" max="1"
          onChange={(v) => updateShatterConfig({ friction: v })}
        />
        <InputNumber
          label="Gravity"
          id="gravity"
          value={shatterConfig.gravity}
          step="50" min="0"
          onChange={(v) => updateShatterConfig({ gravity: v })}
        />
        <InputNumber
          label="Turbulence"
          id="turbulence"
          value={shatterConfig.turbulence}
          step="0.1" min="0" max="2"
          onChange={(v) => updateShatterConfig({ turbulence: v })}
        />
        <InputNumber
          label="Lifetime"
          id="lifetime"
          value={shatterConfig.lifetime}
          step="0.1" min="0.1"
          onChange={(v) => updateShatterConfig({ lifetime: v })}
        />
        <InputNumber
          label="Fade Out Duration"
          id="fadeOutDuration"
          value={shatterConfig.fadeOutDuration}
          step="0.1" min="0"
          onChange={(v) => updateShatterConfig({ fadeOutDuration: v })}
        />
        <Select
          label="Mode"
          defaultValue={shatterConfig.mode}
          onChange={(v) => updateShatterConfig({ mode: v })}
          elements={modeOptions}
        />
        <InputNumber
          label="Explosion Origin"
          id="explosionOrigin"
          params={["x", "y"]}
          value={[shatterConfig.explosionOrigin.x, shatterConfig.explosionOrigin.y]}
          step="0.1" min="0" max="1"
          onChange={(v, id) => {
            const origin = { ...shatterConfig.explosionOrigin, [id]: v };
            updateShatterConfig({ explosionOrigin: origin });
          }}
        />
        {shatterConfig.mode === "directional" && (
          <InputNumber
            label="Blast Direction"
            id="blastDirection"
            value={shatterConfig.blastDirection}
            step="0.1"
            onChange={(v) => updateShatterConfig({ blastDirection: v })}
          />
        )}
        {shatterConfig.mode === "swirl" && (
          <InputNumber
            label="Swirl Strength"
            id="swirlStrength"
            value={shatterConfig.swirlStrength}
            step="0.1"
            onChange={(v) => updateShatterConfig({ swirlStrength: v })}
          />
        )}
        <Checkbox
          label="Randomize Scale"
          id="randomizeScale"
          onChange={(v) => updateShatterConfig({ randomizeScale: v })}
          checked={shatterConfig.randomizeScale}
        />
        <ColorPicker
          label="End Tint"
          color={hexToRgb(shatterConfig.endTint)}
          colorChanged={(color) => {
            updateShatterConfig({ endTint: rgbToHex(color.rgb.r, color.rgb.g, color.rgb.b) });
          }}
        />
      </div>
    </>
  );
}