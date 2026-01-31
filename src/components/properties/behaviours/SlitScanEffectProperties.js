"use client";

import { useCallback, useState, useEffect, useRef, useMemo } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import InputNumber from "@components/html/InputNumber";
import Select from "@components/html/Select";
import File from "@components/html/File";
import pixiRefs from "@pixi/pixiRefs";
import { SlitScanEffect } from "custom-pixi-particles";
import { Sprite, Texture } from "pixi.js";
import SlitScanEffectDescription from "@components/html/behaviourDescriptions/SlitScanEffect";

export default function SlitScanEffectProperties({ defaultConfig }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [effectInstance, setEffectInstance] = useState(null);
  const [sprite, setSprite] = useState(null);
  const isRunningRef = useRef(false);
  const spriteRef = useRef(null);
  const fileInputRef = useRef(null);

  const keysToInitialize = {
    mode: "wave",
    speed: 2,
    amplitude: 20,
    frequency: 0.02,
    direction: "horizontal",
    duration: 2,
  };

  const config = useMemo(
    () => mergeObjectsWithDefaults(keysToInitialize, defaultConfig.slitScanEffect || {}),
    [defaultConfig.slitScanEffect]
  );

  const updateConfig = (updatedFields) => {
    const newConfig = { ...config, ...updatedFields };
    defaultConfig.slitScanEffect = newConfig;
    updateProps("slitScanEffect", newConfig);
  };

  useEffect(() => {
    const check = () => {
      const { bgContainer } = pixiRefs;
      const s = spriteRef.current;
      if (s && bgContainer && !s.parent && !isRunningRef.current) bgContainer.addChild(s);
    };
    check();
    const t = setTimeout(check, 50);
    return () => clearTimeout(t);
  });

  useEffect(() => {
    if (config.customSprite && !sprite && config.customSprite.result) createSprite(config.customSprite.result);
  }, [config.customSprite]);

  const createSprite = useCallback((customDataUrl = null) => {
    if (spriteRef.current) {
      if (spriteRef.current.parent) spriteRef.current.parent.removeChild(spriteRef.current);
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
        if (texture?.valid) break;
      } catch (e) {}
    }
    const s = new Sprite(texture);
    s.anchor.set(0.5, 0.5);
    s.x = app.screen.width / 2;
    s.y = app.screen.height / 2 - 100;
    s.scale.set(1.5);
    bgContainer.addChild(s);
    spriteRef.current = s;
    setSprite(s);
  }, [effectInstance, config]);

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
    const effect = new SlitScanEffect(s, options);
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

  useEffect(() => () => { if (spriteRef.current) spriteRef.current.destroy(); }, []);

  const handleUpload = useCallback((e) => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const newConfig = { ...config, customSprite: { fileName: file.name, result: reader.result } };
      defaultConfig.slitScanEffect = newConfig;
      updateProps("slitScanEffect", newConfig);
      createSprite(reader.result);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }, [config, createSprite]);

  const modeOptions = [{ key: "wave", displayName: "Wave" }, { key: "slit-scan", displayName: "Slit-Scan" }];
  const directionOptions = [{ key: "horizontal", displayName: "Horizontal" }, { key: "vertical", displayName: "Vertical" }];

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return null;

  return (
    <>
      <legend onClick={() => setIsSubmenuVisible((p) => (p === "collapse" ? "" : "collapse"))}>Slit-Scan Effect Properties</legend>
      <div className={isSubmenuVisible}>
        <SlitScanEffectDescription />
        <File label="Custom Sprite" buttonText={config.customSprite ? "Replace Sprite" : "Upload Sprite"} id="slitscan-sprite-upload" onChange={handleUpload} onClick={() => fileInputRef.current?.click()} ref={fileInputRef} />
        {!sprite && (
          <div className="form-group">
            <div className="col-xs-12">
              <button className="btn btn-default btn-block" onClick={() => createSprite()} disabled={!!(sprite?.parent)}>{sprite?.parent ? "Sprite Active" : "Create Sprite"}</button>
            </div>
          </div>
        )}
        <div className="form-group">
          <div className="col-xs-12">
            <button className="btn btn-primary btn-block" onClick={triggerEffect} disabled={isRunningRef.current}>{isRunningRef.current ? "Running..." : "Trigger Slit-Scan"}</button>
          </div>
        </div>
        <hr />
        <Select label="Mode" defaultValue={config.mode} onChange={(v) => updateConfig({ mode: v })} elements={modeOptions} />
        <InputNumber label="Speed" id="speed" value={config.speed} step="0.5" min="0" max="20" onChange={(v) => updateConfig({ speed: v })} />
        <InputNumber label="Amplitude" id="amplitude" value={config.amplitude} step="1" min="0" max="100" onChange={(v) => updateConfig({ amplitude: v })} />
        <InputNumber label="Frequency" id="frequency" value={config.frequency} step="0.01" min="0" max="0.2" onChange={(v) => updateConfig({ frequency: v })} />
        <Select label="Direction" defaultValue={config.direction} onChange={(v) => updateConfig({ direction: v })} elements={directionOptions} />
        <InputNumber label="Duration" id="duration" value={config.duration} step="0.1" min="0.1" max="10" onChange={(v) => updateConfig({ duration: v })} />
      </div>
    </>
  );
}
