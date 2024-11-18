"use client";

import Menu from "@components/Menu";
import { useCallback, useEffect, useRef, useState } from "react";
import pixiRefs from "@pixi/pixiRefs";
import {
  detectMouseMove,
  getBehaviourByIndex,
  getConfigIndexByName,
  onImageLoaded,
  resize,
  updateNestedConfig,
  updateProps,
} from "@utils";
import { initializeEffect } from "@pixi/initializeEffect";
import { initializeApp } from "@pixi/initializePixi";
import { createEffect } from "@pixi/effects";
import eventBus from "@utils/eventBus";
import particlesDefaultConfig from "@config/particlesDefaultConfig";
import {
  followMouseHandler,
  predefinedImageHandler,
  refreshHandler,
} from "@pixi/handlers";
import { bgImage } from "@utils/updatePropsLoogic";
import { saveAs } from "file-saver";

export default function Content() {
  const [defaultConfig, setDefaultConfig2] = useState(null);
  const contentRef = useRef(null);
  const fullConfig = JSON.parse(JSON.stringify(particlesDefaultConfig));

  const setDefaultConfig = (a) => {
    setDefaultConfig2(a);
  };

  const handleResize = useCallback(() => {
    resize(contentRef);
  }, [contentRef]);

  useEffect(() => {
    const eventHandlers = {
      updateConfig: ({ value, id, arrayName }) =>
        setDefaultConfig((prevConfig) =>
          updateNestedConfig(prevConfig, arrayName, value, id),
        ),
      followMouse: (value) => followMouseHandler({ value, setDefaultConfig }),
      refresh: () => refreshHandler({ setDefaultConfig, defaultConfig }),
      predefinedImage: (value) =>
        predefinedImageHandler({
          value,
          defaultConfig,
          setDefaultConfig,
          handleResize,
        }),
      resize: handleResize,
      newImages: (value) => {
        defaultConfig.textures = value;
        setDefaultConfig(() => ({
          ...defaultConfig,
        }));
      },
      finishingImages: (value) => {
        defaultConfig.finishingTextures = value;
        setDefaultConfig(() => ({
          ...defaultConfig,
        }));
      },
      newBgImage: (value) => {
        bgImage(value, () => {
          defaultConfig.bgImage = value;
          setDefaultConfig(() => ({
            ...defaultConfig,
          }));
        });
      },
      loadConfig: (value) => {
        defaultConfig.emitterConfig = value;
        defaultConfig.particlePredefinedEffect = undefined;
        setDefaultConfig(() => ({
          ...defaultConfig,
        }));
      },
      downloadConfig: () => {
        const downloadableObj = pixiRefs.particles.emitter.getParser().write();
        const behaviourIndex = getConfigIndexByName(
          "PositionBehaviour",
          defaultConfig,
        );
        const behaviour = getBehaviourByIndex(
          behaviourIndex,
          name,
          defaultConfig,
        );
        if (behaviour) {
          if (!behaviour.warp) {
            delete behaviour.warpStretch;
            delete behaviour.warpSpeed;
            delete behaviour.warpFov;
            delete behaviour.warpDistanceScaleConverter;
            delete behaviour.warpBaseSpeed;
            delete behaviour.warp;
            delete behaviour.cameraZConverter;
          }
          if (!behaviour.sinX) {
            delete behaviour.sinXVal;
            delete behaviour.sinX;
            delete behaviour.sinXValVariance;
          }
          if (!behaviour.sinY) {
            delete behaviour.sinYVal;
            delete behaviour.sinY;
            delete behaviour.sinYValVariance;
          }
        }
        downloadableObj.behaviours[behaviourIndex] = behaviour;
        const blob = new Blob([JSON.stringify(downloadableObj)], {
          type: "application/json",
        });
        saveAs(blob, "particle_config");
      },
    };

    // Register event handlers
    Object.entries(eventHandlers).forEach(([event, handler]) =>
      eventBus.on(event, handler),
    );

    // Cleanup event handlers
    return () => {
      Object.entries(eventHandlers).forEach(([event, handler]) =>
        eventBus.off(event, handler),
      );
    };
  }, [defaultConfig, handleResize]);

  const handleMouseMove = useCallback(
    (e) => {
      detectMouseMove(contentRef, e);
    },
    [contentRef],
  );

  // Handle predefined effect change
  const handlePredefinedEffectChange = useCallback(
    (name) => {
      if (!fullConfig[name]) return;
      setDefaultConfig(() => ({
        ...fullConfig[name],
        particlePredefinedEffect: name,
      }));

      updateProps("noConfig.handlePredefinedEffectChange", name);
    },
    [fullConfig],
  );

  // Initialization
  useEffect(() => {
    const initialize = () => {
      initializeEffect({
        setDefaultConfig,
      });
      initializeApp(contentRef);
    };

    initialize();
  }, []);

  // Handle effects and events
  useEffect(() => {
    if (!defaultConfig) return;

    if (
      defaultConfig.emitterConfig.animatedSprite &&
      defaultConfig.emitterConfig.animatedSprite.animatedSpriteName
    ) {
      defaultConfig.textures[0] =
        defaultConfig.emitterConfig.animatedSprite.animatedSpriteName;
      defaultConfig.emitterConfig.animatedSprite.frameRate =
        defaultConfig.emitterConfig.animatedSprite.frameRate || 0.25;
    }

    createEffect({ defaultConfig, fullConfig, contentRef });

    if (defaultConfig.bgImage) {
      onImageLoaded(defaultConfig.bgImage);
    }

    handleResize();

    // Add event listeners
    pixiRefs.app.stage.on("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      pixiRefs.app.stage.off("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [defaultConfig, fullConfig, handleResize, handleMouseMove]);

  return (
    <>
      <div
        className="fixed top-0 left-0 bottom-0 right-[400px] bg-gray-600"
        ref={contentRef}
      ></div>

      {defaultConfig && (
        <Menu
          fullConfig={fullConfig}
          handlePredefinedEffectChange={handlePredefinedEffectChange}
          defaultConfig={defaultConfig}
        />
      )}
    </>
  );
}
