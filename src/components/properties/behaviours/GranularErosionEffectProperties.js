"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import InputNumber from "@components/html/InputNumber";
import File from "@components/html/File";
import pixiRefs from "@pixi/pixiRefs";
import { GranularErosionEffect } from "custom-pixi-particles";
import { Sprite, Texture } from "pixi.js";
import GranularErosionEffectDescription from "@components/html/behaviourDescriptions/GranularErosionEffect";

export default function GranularErosionEffectProperties({ defaultConfig }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [effectInstance, setEffectInstance] = useState(null);
  const [sprite, setSprite] = useState(null);
  const isRunningRef = useRef(false);
  const spriteRef = useRef(null);
  const fileInputRef = useRef(null);

  const keysToInitialize = {
    erosionProgress: 0.5,
    gravityScale: 80,
    windTurbulence: 15,
    grainSize: 0.08,
    duration: 2,
  };

  const config = useMemo(
    () =>
      mergeObjectsWithDefaults(
        keysToInitialize,
        defaultConfig.granularErosionEffect || {},
      ),
    [defaultConfig.granularErosionEffect],
  );

  const updateConfig = (updatedFields) => {
    const newConfig = { ...config, ...updatedFields };
    defaultConfig.granularErosionEffect = newConfig;
    updateProps("granularErosionEffect", newConfig);
  };

  useEffect(() => {
    const check = () => {
      const { bgContainer } = pixiRefs;
      const s = spriteRef.current;
      if (s && bgContainer && !s.parent && !isRunningRef.current)
        bgContainer.addChild(s);
    };
    check();
    const t = setTimeout(check, 50);
    return () => clearTimeout(t);
  });

  useEffect(() => {
    if (config.customSprite && !sprite && config.customSprite.result)
      createSprite(config.customSprite.result);
  }, [config.customSprite]);

  const createSprite = useCallback(
    (customDataUrl = null) => {
      if (spriteRef.current) {
        if (spriteRef.current.parent)
          spriteRef.current.parent.removeChild(spriteRef.current);
        spriteRef.current.destroy();
        spriteRef.current = null;
      }
      if (effectInstance) {
        effectInstance.destroy();
        setEffectInstance(null);
      }
      const { bgContainer, app } = pixiRefs;
      if (!bgContainer || !app) return;
      let texture;
      if (customDataUrl) {
        const img = new Image();
        img.onload = () => {
          texture = Texture.from(img);
          const s = new Sprite(texture);
          s.anchor.set(0.5, 0.5);
          s.x = app.screen.width / 2;
          s.y = app.screen.height / 2 - 100;
          s.scale.set(1.5);
          bgContainer.addChild(s);
          spriteRef.current = s;
          setSprite(s);
        };
        img.src = customDataUrl;
        return;
      }
      const names = ["campFire", "face", "blackHole", "earth", "autumn"];
      for (const name of names) {
        try {
          texture = Texture.from(name);
          if (texture) break;
        } catch (e) {}
      }
      if (!texture) texture = Texture.WHITE;
      const s = new Sprite(texture);
      s.anchor.set(0.5, 0.5);
      s.x = app.screen.width / 2;
      s.y = app.screen.height / 2 - 100;
      s.scale.set(1.5);
      bgContainer.addChild(s);
      spriteRef.current = s;
      setSprite(s);
    },
    [effectInstance, config],
  );

  const performEffect = useCallback(() => {
    const s = spriteRef.current;
    if (!s || !s.parent || isRunningRef.current) return;
    isRunningRef.current = true;
    if (effectInstance) {
      effectInstance.destroy();
      setEffectInstance(null);
    }
    s.visible = true;
    const { customSprite, ...options } = config;
    const effect = new GranularErosionEffect(s, options);
    const index = s.parent.getChildIndex(s);
    s.parent.addChildAt(effect, index);
    setEffectInstance(effect);
    effect.play().then(() => {
      effect.destroy();
      setEffectInstance(null);
      isRunningRef.current = false;
      if (s?.parent) {
        const newSprite = new Sprite(s.texture);
        newSprite.anchor.set(0.5, 0.5);
        newSprite.x = s.x;
        newSprite.y = s.y;
        newSprite.scale.set(s.scale.x, s.scale.y);
        s.parent.addChild(newSprite);
        spriteRef.current = newSprite;
        setSprite(newSprite);
        s.destroy();
      }
    });
  }, [config, effectInstance]);

  const triggerEffect = useCallback(() => {
    if (!spriteRef.current) {
      createSprite();
      setTimeout(performEffect, 150);
    } else performEffect();
  }, [createSprite, performEffect]);

  useEffect(
    () => () => {
      if (spriteRef.current) spriteRef.current.destroy();
    },
    [],
  );

  const handleUpload = useCallback(
    (e) => {
      const file = fileInputRef.current?.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const newConfig = {
          ...config,
          customSprite: { fileName: file.name, result: reader.result },
        };
        defaultConfig.granularErosionEffect = newConfig;
        updateProps("granularErosionEffect", newConfig);
        createSprite(reader.result);
      };
      reader.readAsDataURL(file);
      e.target.value = "";
    },
    [config, createSprite],
  );

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return null;

  return (
    <>
      <legend
        onClick={() =>
          setIsSubmenuVisible((p) => (p === "collapse" ? "" : "collapse"))
        }
      >
        Granular Erosion Effect Properties
      </legend>
      <div className={isSubmenuVisible}>
        <GranularErosionEffectDescription />
        <File
          label="Custom Sprite"
          buttonText={config.customSprite ? "Replace Sprite" : "Upload Sprite"}
          id="granular-erosion-sprite-upload"
          onChange={handleUpload}
          onClick={() => fileInputRef.current?.click()}
          ref={fileInputRef}
        />
        {!sprite && (
          <div className="form-group">
            <div className="col-xs-12">
              <button
                className="btn btn-default btn-block"
                onClick={() => createSprite()}
                disabled={!!sprite?.parent}
              >
                {sprite?.parent ? "Sprite Active" : "Create Sprite"}
              </button>
            </div>
          </div>
        )}
        <div className="form-group">
          <div className="col-xs-12">
            <button
              className="btn btn-primary btn-block"
              onClick={triggerEffect}
              disabled={isRunningRef.current}
            >
              {isRunningRef.current ? "Running..." : "Trigger Granular Erosion"}
            </button>
          </div>
        </div>
        <hr />
        <InputNumber
          label="Erosion Progress"
          id="erosionProgress"
          value={config.erosionProgress}
          step="0.05"
          min="0"
          max="1"
          onChange={(v) => updateConfig({ erosionProgress: v })}
        />
        <InputNumber
          label="Gravity Scale"
          id="gravityScale"
          value={config.gravityScale}
          step="10"
          min="0"
          max="500"
          onChange={(v) => updateConfig({ gravityScale: v })}
        />
        <InputNumber
          label="Wind Turbulence"
          id="windTurbulence"
          value={config.windTurbulence}
          step="1"
          min="0"
          max="100"
          onChange={(v) => updateConfig({ windTurbulence: v })}
        />
        <InputNumber
          label="Grain Size"
          id="grainSize"
          value={config.grainSize}
          step="0.01"
          min="0.01"
          max="0.5"
          onChange={(v) => updateConfig({ grainSize: v })}
        />
        <InputNumber
          label="Duration"
          id="duration"
          value={config.duration}
          step="0.1"
          min="0.1"
          max="10"
          onChange={(v) => updateConfig({ duration: v })}
        />
      </div>
    </>
  );
}
