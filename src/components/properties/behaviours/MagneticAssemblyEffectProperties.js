"use client";

import { useCallback, useState, useEffect, useRef, useMemo } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import InputNumber from "@components/html/InputNumber";
import Select from "@components/html/Select";
import pixiRefs from "@pixi/pixiRefs";
import { MagneticAssemblyEffect } from "custom-pixi-particles";
import { Sprite, Texture } from "pixi.js-legacy";

export default function MagneticAssemblyEffectProperties({ defaultConfig }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [magneticAssemblyEffectInstance, setMagneticAssemblyEffectInstance] = useState(null);
  const [magneticAssemblySprite, setMagneticAssemblySprite] = useState(null);

  const triggerTimeoutRef = useRef(null);
  const isAssemblingRef = useRef(false);
  const magneticAssemblySpriteRef = useRef(null);

  const keysToInitialize = {
    gridCols: 100,
    gridRows: 100,
    duration: 2.0,
    easing: "linear",
    scatterRange: 500,
    stagger: 0.5,
    mode: "random-scatter",
    startAlpha: 0,
  };

  const magneticAssemblyConfig = useMemo(() => {
    return mergeObjectsWithDefaults(keysToInitialize, defaultConfig.magneticAssemblyEffect || {});
  }, [defaultConfig.magneticAssemblyEffect]);

  const toggleSubmenuVisibility = useCallback(() => {
    setIsSubmenuVisible((prev) => (prev === "collapse" ? "" : "collapse"));
  }, []);

  const updateMagneticAssemblyConfig = (updatedFields) => {
    const newConfig = { ...magneticAssemblyConfig, ...updatedFields };
    defaultConfig.magneticAssemblyEffect = newConfig;
    updateProps("magneticAssemblyEffect", newConfig);
  };

  useEffect(() => {
    const checkAndReattach = () => {
      const { bgContainer } = pixiRefs;
      const sprite = magneticAssemblySpriteRef.current;
      if (sprite && bgContainer && !sprite.parent && !isAssemblingRef.current) {
        bgContainer.addChild(sprite);
      }
    };
    checkAndReattach();
    const timeout = setTimeout(checkAndReattach, 50);
    return () => clearTimeout(timeout);
  });

  const createMagneticAssemblySprite = useCallback(() => {
    if (magneticAssemblySpriteRef.current) {
      if (magneticAssemblySpriteRef.current.parent) {
        magneticAssemblySpriteRef.current.parent.removeChild(magneticAssemblySpriteRef.current);
      }
      magneticAssemblySpriteRef.current.destroy();
      magneticAssemblySpriteRef.current = null;
    }

    if (magneticAssemblyEffectInstance) {
      magneticAssemblyEffectInstance.destroy();
      setMagneticAssemblyEffectInstance(null);
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
    magneticAssemblySpriteRef.current = sprite;
    setMagneticAssemblySprite(sprite);
  }, [magneticAssemblyEffectInstance]);

  const performAssembly = useCallback(() => {
    const sprite = magneticAssemblySpriteRef.current;
    if (!sprite || !sprite.parent || isAssemblingRef.current) return;

    isAssemblingRef.current = true;

    if (magneticAssemblyEffectInstance) {
      magneticAssemblyEffectInstance.destroy();
      setMagneticAssemblyEffectInstance(null);
    }

    sprite.visible = true;
    const options = { ...magneticAssemblyConfig };

    const effect = new MagneticAssemblyEffect(sprite, options);
    const index = sprite.parent.getChildIndex(sprite);
    sprite.parent.addChildAt(effect, index);

    setMagneticAssemblyEffectInstance(effect);

    effect.assemble().then(() => {
      effect.destroy();
      setMagneticAssemblyEffectInstance(null);
      isAssemblingRef.current = false;

      if (sprite && sprite.parent) {
        const newSprite = new Sprite(sprite.texture);
        newSprite.anchor.set(0.5, 0.5);
        newSprite.x = sprite.x;
        newSprite.y = sprite.y;
        newSprite.scale.set(sprite.scale.x, sprite.scale.y);
        sprite.parent.addChild(newSprite);

        magneticAssemblySpriteRef.current = newSprite;
        setMagneticAssemblySprite(newSprite);
        sprite.destroy();
      }
    });
  }, [magneticAssemblyConfig, magneticAssemblyEffectInstance]);

  const triggerAssembly = useCallback(() => {
    if (!magneticAssemblySpriteRef.current) {
      createMagneticAssemblySprite();
      setTimeout(performAssembly, 150);
    } else {
      performAssembly();
    }
  }, [createMagneticAssemblySprite, performAssembly]);

  useEffect(() => {
    return () => {
      if (magneticAssemblySpriteRef.current) magneticAssemblySpriteRef.current.destroy();
      if (triggerTimeoutRef.current) clearTimeout(triggerTimeoutRef.current);
    };
  }, []);

  const modeOptions = [
    { key: "random-scatter", displayName: "Random Scatter" },
    { key: "from-center", displayName: "From Center" },
    { key: "off-screen", displayName: "Off Screen" },
    { key: "vortex", displayName: "Vortex" },
  ];

  const easingOptions = [
    { key: "back.out", displayName: "Back Out" },
    { key: "power1.inOut", displayName: "Power In Out" },
    { key: "bounce.out", displayName: "Bounce Out" },
    { key: "linear", displayName: "Linear" },
  ];

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return null;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>Magnetic Assembly Effect Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        {!magneticAssemblySprite ? (
          <div className="form-group">
            <div className="col-xs-12">
              <button
                className="btn btn-default btn-block"
                onClick={createMagneticAssemblySprite}
                disabled={!!(magneticAssemblySprite && magneticAssemblySprite.parent)}
              >
                {magneticAssemblySprite && magneticAssemblySprite.parent ? "Sprite Active" : "Create Sprite"}
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
              onClick={triggerAssembly}
              disabled={isAssemblingRef.current}
            >
              {isAssemblingRef.current ? "Assembling..." : "Trigger Assembly"}
            </button>
          </div>
        </div>
        <hr />

        <InputNumber
          label="Grid Columns"
          id="gridCols"
          value={magneticAssemblyConfig.gridCols}
          step="1" min="1" max="50"
          onChange={(v) => updateMagneticAssemblyConfig({ gridCols: v })}
        />
        <InputNumber
          label="Grid Rows"
          id="gridRows"
          value={magneticAssemblyConfig.gridRows}
          step="1" min="1" max="50"
          onChange={(v) => updateMagneticAssemblyConfig({ gridRows: v })}
        />
        <InputNumber
          label="Duration"
          id="duration"
          value={magneticAssemblyConfig.duration}
          step="0.1" min="0.1"
          onChange={(v) => updateMagneticAssemblyConfig({ duration: v })}
        />
        <Select
          label="Easing"
          defaultValue={magneticAssemblyConfig.easing}
          onChange={(v) => updateMagneticAssemblyConfig({ easing: v })}
          elements={easingOptions}
        />
        <InputNumber
          label="Scatter Range"
          id="scatterRange"
          value={magneticAssemblyConfig.scatterRange}
          step="50" min="0"
          onChange={(v) => updateMagneticAssemblyConfig({ scatterRange: v })}
        />
        <InputNumber
          label="Stagger"
          id="stagger"
          value={magneticAssemblyConfig.stagger}
          step="0.1" min="0" max="1"
          onChange={(v) => updateMagneticAssemblyConfig({ stagger: v })}
        />
        <Select
          label="Mode"
          defaultValue={magneticAssemblyConfig.mode}
          onChange={(v) => updateMagneticAssemblyConfig({ mode: v })}
          elements={modeOptions}
        />
        <InputNumber
          label="Start Alpha"
          id="startAlpha"
          value={magneticAssemblyConfig.startAlpha}
          step="0.1" min="0" max="1"
          onChange={(v) => updateMagneticAssemblyConfig({ startAlpha: v })}
        />
      </div>
    </>
  );
}
