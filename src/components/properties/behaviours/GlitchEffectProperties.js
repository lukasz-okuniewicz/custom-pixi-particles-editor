"use client";

import { useCallback, useState, useEffect, useRef, useMemo } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import InputNumber from "@components/html/InputNumber";
import pixiRefs from "@pixi/pixiRefs";
import { GlitchEffect } from "custom-pixi-particles";
import { Sprite, Texture } from "pixi.js-legacy";

export default function GlitchEffectProperties({ defaultConfig }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [glitchEffectInstance, setGlitchEffectInstance] = useState(null);
  const [glitchSprite, setGlitchSprite] = useState(null);

  const triggerTimeoutRef = useRef(null);
  const isGlitchingRef = useRef(false);
  const glitchSpriteRef = useRef(null);

  const keysToInitialize = {
    slices: 15,
    offsetRange: 30,
    flickerIntensity: 0.3,
    rgbSplit: true,
    rgbOffset: 10,
    duration: 0.5,
    refreshRate: 0.06,
  };

  const glitchConfig = useMemo(() => {
    return mergeObjectsWithDefaults(keysToInitialize, defaultConfig.glitchEffect || {});
  }, [defaultConfig.glitchEffect]);

  const toggleSubmenuVisibility = useCallback(() => {
    setIsSubmenuVisible((prev) => (prev === "collapse" ? "" : "collapse"));
  }, []);

  const updateGlitchConfig = (updatedFields) => {
    const newConfig = { ...glitchConfig, ...updatedFields };
    defaultConfig.glitchEffect = newConfig;
    updateProps("glitchEffect", newConfig);
  };

  useEffect(() => {
    const checkAndReattach = () => {
      const { bgContainer } = pixiRefs;
      const sprite = glitchSpriteRef.current;
      if (sprite && bgContainer && !sprite.parent && !isGlitchingRef.current) {
        bgContainer.addChild(sprite);
      }
    };
    checkAndReattach();
    const timeout = setTimeout(checkAndReattach, 50);
    return () => clearTimeout(timeout);
  });

  const createGlitchSprite = useCallback(() => {
    if (glitchSpriteRef.current) {
      if (glitchSpriteRef.current.parent) {
        glitchSpriteRef.current.parent.removeChild(glitchSpriteRef.current);
      }
      glitchSpriteRef.current.destroy();
      glitchSpriteRef.current = null;
    }

    if (glitchEffectInstance) {
      glitchEffectInstance.destroy();
      setGlitchEffectInstance(null);
    }

    const { bgContainer, app } = pixiRefs;
    if (!bgContainer || !app) return;

    let texture;
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
    glitchSpriteRef.current = sprite;
    setGlitchSprite(sprite);
  }, [glitchEffectInstance]);

  const performGlitch = useCallback(() => {
    const sprite = glitchSpriteRef.current;
    if (!sprite || !sprite.parent || isGlitchingRef.current) return;

    isGlitchingRef.current = true;

    if (glitchEffectInstance) {
      glitchEffectInstance.destroy();
      setGlitchEffectInstance(null);
    }

    sprite.visible = true;
    const options = { ...glitchConfig };

    const effect = new GlitchEffect(sprite, options);
    const index = sprite.parent.getChildIndex(sprite);
    sprite.parent.addChildAt(effect, index);

    setGlitchEffectInstance(effect);

    effect.play().then(() => {
      effect.destroy();
      setGlitchEffectInstance(null);
      isGlitchingRef.current = false;

      if (sprite && sprite.parent) {
        const newSprite = new Sprite(sprite.texture);
        newSprite.anchor.set(0.5, 0.5);
        newSprite.x = sprite.x;
        newSprite.y = sprite.y;
        newSprite.scale.set(sprite.scale.x, sprite.scale.y);
        sprite.parent.addChild(newSprite);

        glitchSpriteRef.current = newSprite;
        setGlitchSprite(newSprite);
        sprite.destroy();
      }
    });
  }, [glitchConfig, glitchEffectInstance]);

  const triggerGlitch = useCallback(() => {
    if (!glitchSpriteRef.current) {
      createGlitchSprite();
      setTimeout(performGlitch, 150);
    } else {
      performGlitch();
    }
  }, [createGlitchSprite, performGlitch]);

  useEffect(() => {
    return () => {
      if (glitchSpriteRef.current) glitchSpriteRef.current.destroy();
      if (triggerTimeoutRef.current) clearTimeout(triggerTimeoutRef.current);
    };
  }, []);

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return null;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>Glitch Effect Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        {!glitchSprite ? (
          <div className="form-group">
            <div className="col-xs-12">
              <button
                className="btn btn-default btn-block"
                onClick={createGlitchSprite}
                disabled={!!(glitchSprite && glitchSprite.parent)}
              >
                {glitchSprite && glitchSprite.parent ? "Sprite Active" : "Create Sprite"}
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
              onClick={triggerGlitch}
              disabled={isGlitchingRef.current}
            >
              {isGlitchingRef.current ? "Glitching..." : "Trigger Glitch"}
            </button>
          </div>
        </div>
        <hr />

        <InputNumber
          label="Slices"
          id="slices"
          value={glitchConfig.slices}
          step="1" min="1" max="50"
          onChange={(v) => updateGlitchConfig({ slices: v })}
        />
        <InputNumber
          label="Offset Range"
          id="offsetRange"
          value={glitchConfig.offsetRange}
          step="1" min="0" max="200"
          onChange={(v) => updateGlitchConfig({ offsetRange: v })}
        />
        <InputNumber
          label="Flicker Intensity"
          id="flickerIntensity"
          value={glitchConfig.flickerIntensity}
          step="0.1" min="0" max="1"
          onChange={(v) => updateGlitchConfig({ flickerIntensity: v })}
        />
        <Checkbox
          label="RGB Split"
          id="rgbSplit"
          onChange={(v) => updateGlitchConfig({ rgbSplit: v })}
          checked={glitchConfig.rgbSplit}
        />
        {glitchConfig.rgbSplit && (
          <InputNumber
            label="RGB Offset"
            id="rgbOffset"
            value={glitchConfig.rgbOffset}
            step="1" min="0" max="50"
            onChange={(v) => updateGlitchConfig({ rgbOffset: v })}
          />
        )}
        <InputNumber
          label="Duration"
          id="duration"
          value={glitchConfig.duration}
          step="0.1" min="0.1" max="5"
          onChange={(v) => updateGlitchConfig({ duration: v })}
        />
        <InputNumber
          label="Refresh Rate"
          id="refreshRate"
          value={glitchConfig.refreshRate}
          step="0.01" min="0.01" max="1"
          onChange={(v) => updateGlitchConfig({ refreshRate: v })}
        />
      </div>
    </>
  );
}
