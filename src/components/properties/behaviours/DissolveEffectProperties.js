"use client";

import { useCallback, useState, useEffect, useRef, useMemo } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import InputNumber from "@components/html/InputNumber";
import Select from "@components/html/Select";
import pixiRefs from "@pixi/pixiRefs";
import { DissolveEffect } from "custom-pixi-particles";
import { Sprite, Texture } from "pixi.js-legacy";

export default function DissolveEffectProperties({ defaultConfig }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [dissolveEffectInstance, setDissolveEffectInstance] = useState(null);
  const [dissolveSprite, setDissolveSprite] = useState(null);

  const triggerTimeoutRef = useRef(null);
  const isDissolvingRef = useRef(false);
  const dissolveSpriteRef = useRef(null);

  const keysToInitialize = {
    pixelSize: 4,
    edgeSoftness: 0.6,
    driftStrength: 100,
    noiseIntensity: 50,
    lifetime: 1,
    fadeOutDuration: 0.5,
    direction: "center-out",
    windAngle: -Math.PI / 4,
  };

  const dissolveConfig = useMemo(() => {
    return mergeObjectsWithDefaults(keysToInitialize, defaultConfig.dissolveEffect || {});
  }, [defaultConfig.dissolveEffect]);

  const toggleSubmenuVisibility = useCallback(() => {
    setIsSubmenuVisible((prev) => (prev === "collapse" ? "" : "collapse"));
  }, []);

  const updateDissolveConfig = (updatedFields) => {
    const newConfig = { ...dissolveConfig, ...updatedFields };
    defaultConfig.dissolveEffect = newConfig;
    updateProps("dissolveEffect", newConfig);
  };

  useEffect(() => {
    const checkAndReattach = () => {
      const { bgContainer } = pixiRefs;
      const sprite = dissolveSpriteRef.current;
      if (sprite && bgContainer && !sprite.parent && !isDissolvingRef.current) {
        bgContainer.addChild(sprite);
      }
    };
    checkAndReattach();
    const timeout = setTimeout(checkAndReattach, 50);
    return () => clearTimeout(timeout);
  });

  const createDissolveSprite = useCallback(() => {
    if (dissolveSpriteRef.current) {
      if (dissolveSpriteRef.current.parent) {
        dissolveSpriteRef.current.parent.removeChild(dissolveSpriteRef.current);
      }
      dissolveSpriteRef.current.destroy();
      dissolveSpriteRef.current = null;
    }

    if (dissolveEffectInstance) {
      dissolveEffectInstance.destroy();
      setDissolveEffectInstance(null);
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
    dissolveSpriteRef.current = sprite;
    setDissolveSprite(sprite);
  }, [dissolveEffectInstance]);

  const performDissolve = useCallback(() => {
    const sprite = dissolveSpriteRef.current;
    if (!sprite || !sprite.parent || isDissolvingRef.current) return;

    isDissolvingRef.current = true;

    if (dissolveEffectInstance) {
      dissolveEffectInstance.destroy();
      setDissolveEffectInstance(null);
    }

    sprite.visible = true;
    const options = { ...dissolveConfig };

    const effect = new DissolveEffect(sprite, options);
    const index = sprite.parent.getChildIndex(sprite);
    sprite.parent.addChildAt(effect, index);

    setDissolveEffectInstance(effect);

    effect.start(3).then(() => {
      effect.destroy();
      setDissolveEffectInstance(null);
      isDissolvingRef.current = false;

      if (sprite && sprite.parent) {
        const newSprite = new Sprite(sprite.texture);
        newSprite.anchor.set(0.5, 0.5);
        newSprite.x = sprite.x;
        newSprite.y = sprite.y;
        newSprite.scale.set(sprite.scale.x, sprite.scale.y);
        sprite.parent.addChild(newSprite);

        dissolveSpriteRef.current = newSprite;
        setDissolveSprite(newSprite);
        sprite.destroy();
      }
    });
  }, [dissolveConfig, dissolveEffectInstance]);

  const triggerDissolve = useCallback(() => {
    if (!dissolveSpriteRef.current) {
      createDissolveSprite();
      setTimeout(performDissolve, 150);
    } else {
      performDissolve();
    }
  }, [createDissolveSprite, performDissolve]);

  useEffect(() => {
    return () => {
      if (dissolveSpriteRef.current) dissolveSpriteRef.current.destroy();
      if (triggerTimeoutRef.current) clearTimeout(triggerTimeoutRef.current);
    };
  }, []);

  const directionOptions = [
    { key: "left-to-right", displayName: "Left to Right" },
    { key: "right-to-left", displayName: "Right to Left" },
    { key: "top-to-bottom", displayName: "Top to Bottom" },
    { key: "bottom-to-top", displayName: "Bottom to Top" },
    { key: "center-out", displayName: "Center Out" },
  ];

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return null;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>Dissolve Effect Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        {!dissolveSprite ? (
          <div className="form-group">
            <div className="col-xs-12">
              <button
                className="btn btn-default btn-block"
                onClick={createDissolveSprite}
                disabled={!!(dissolveSprite && dissolveSprite.parent)}
              >
                {dissolveSprite && dissolveSprite.parent ? "Sprite Active" : "Create Sprite"}
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
              onClick={triggerDissolve}
              disabled={isDissolvingRef.current}
            >
              {isDissolvingRef.current ? "Dissolving..." : "Trigger Dissolve"}
            </button>
          </div>
        </div>
        <hr />

        <InputNumber
          label="Pixel Size"
          id="pixelSize"
          value={dissolveConfig.pixelSize}
          step="1" min="1" max="10"
          onChange={(v) => updateDissolveConfig({ pixelSize: v })}
        />
        <InputNumber
          label="Edge Softness"
          id="edgeSoftness"
          value={dissolveConfig.edgeSoftness}
          step="0.1" min="0" max="1"
          onChange={(v) => updateDissolveConfig({ edgeSoftness: v })}
        />
        <InputNumber
          label="Drift Strength"
          id="driftStrength"
          value={dissolveConfig.driftStrength}
          step="10" min="0"
          onChange={(v) => updateDissolveConfig({ driftStrength: v })}
        />
        <InputNumber
          label="Noise Intensity"
          id="noiseIntensity"
          value={dissolveConfig.noiseIntensity}
          step="5" min="0"
          onChange={(v) => updateDissolveConfig({ noiseIntensity: v })}
        />
        <InputNumber
          label="Lifetime"
          id="lifetime"
          value={dissolveConfig.lifetime}
          step="0.1" min="0.1"
          onChange={(v) => updateDissolveConfig({ lifetime: v })}
        />
        <InputNumber
          label="Fade Out Duration"
          id="fadeOutDuration"
          value={dissolveConfig.fadeOutDuration}
          step="0.1" min="0"
          onChange={(v) => updateDissolveConfig({ fadeOutDuration: v })}
        />
        <Select
          label="Direction"
          defaultValue={dissolveConfig.direction}
          onChange={(v) => updateDissolveConfig({ direction: v })}
          elements={directionOptions}
        />
        <InputNumber
          label="Wind Angle (radians)"
          id="windAngle"
          value={dissolveConfig.windAngle}
          step="0.1" min="-3.14" max="3.14"
          onChange={(v) => updateDissolveConfig({ windAngle: v })}
        />
      </div>
    </>
  );
}
