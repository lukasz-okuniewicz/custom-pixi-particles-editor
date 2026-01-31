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
  const [containerReady, setContainerReady] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const contentRef = useRef(null);
  const fullConfig = JSON.parse(JSON.stringify(particlesDefaultConfig));

  const setContentRef = useCallback((el) => {
    contentRef.current = el;
    if (el) setContainerReady(true);
  }, []);

  const setDefaultConfig = (conf) => {
    setDefaultConfig2(conf);
  };

  const handleResize = useCallback(() => {
    resize(contentRef);
  }, [contentRef]);

  const removeFromPosition = (downloadableObj) => {
    const behaviourIndex = getConfigIndexByName(
      "PositionBehaviour",
      downloadableObj,
    );
    const behaviour = getBehaviourByIndex(
      behaviourIndex,
      "PositionBehaviour",
      downloadableObj,
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
        delete behaviour.warpDistanceToCenter;
        delete behaviour.position;
        delete behaviour.positionVariance;
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
      if (!behaviour.fromAtoB) {
        delete behaviour.fromAtoB;
        delete behaviour.fromAtoBTwoWays;
        delete behaviour.there;
        delete behaviour.back;
        delete behaviour.pointA;
        delete behaviour.pointB;
        delete behaviour.thereDuration;
        delete behaviour.thereAmplitude;
        delete behaviour.backDuration;
        delete behaviour.backAmplitude;
      }
    }
    downloadableObj.behaviours[behaviourIndex] = behaviour;
  };

  const removeFromSpawn = (downloadableObj) => {
    const behaviourIndex = getConfigIndexByName(
      "SpawnBehaviour",
      downloadableObj,
    );
    const behaviour = getBehaviourByIndex(
      behaviourIndex,
      "SpawnBehaviour",
      downloadableObj,
    );

    if (behaviour && behaviour.customPoints && behaviour.customPoints.length) {
      behaviour.customPoints.forEach((customPoint) => {
        if (customPoint.spawnType && customPoint.spawnType !== "Word") {
          delete customPoint.word;
          delete customPoint.fontSize;
          delete customPoint.fontSpacing;
          delete customPoint.particleDensity;
          delete customPoint.fontMaxWidth;
          delete customPoint.fontMaxHeight;
          delete customPoint.textAlign;
          delete customPoint.textBaseline;
        }
        if (customPoint.spawnType && customPoint.spawnType !== "Bezier") {
          delete customPoint.control1;
          delete customPoint.control2;
          delete customPoint.start;
          delete customPoint.end;
        }
        if (customPoint.spawnType && customPoint.spawnType !== "Lissajous") {
          delete customPoint.frequency;
          delete customPoint.delta;
        }
        if (customPoint.spawnType && customPoint.spawnType !== "Path") {
          delete customPoint.pathPoints;
        }
        if (
          customPoint.spawnType &&
          customPoint.spawnType !== "Helix" &&
          customPoint.spawnType !== "Spring"
        ) {
          delete customPoint.pitch;
          delete customPoint.turns;
        }
        if (
          (customPoint.spawnType && customPoint.spawnType === "Word") ||
          customPoint.spawnType === "Rectangle" ||
          customPoint.spawnType === "Cone" ||
          customPoint.spawnType === "Grid" ||
          customPoint.spawnType === "Path" ||
          customPoint.spawnType === "FrameRectangle"
        ) {
          delete customPoint.radius;
        }
        if (
          customPoint.spawnType &&
          customPoint.spawnType !== "FrameRectangle" &&
          customPoint.spawnType !== "Oval"
        ) {
          delete customPoint.radiusX;
          delete customPoint.radiusY;
        }
        if (customPoint.spawnType && customPoint.spawnType !== "Cone") {
          delete customPoint.baseRadius;
          delete customPoint.coneAngle;
          delete customPoint.coneDirection;
          delete customPoint.height;
          delete customPoint.apex;
        }
        if (customPoint.spawnType && customPoint.spawnType !== "Grid") {
          delete customPoint.rows;
          delete customPoint.columns;
          delete customPoint.cellSize;
        }
        if (customPoint.spawnType && customPoint.spawnType !== "Sphere") {
          delete customPoint.spread;
          delete customPoint.center;
        }
        if (customPoint.spawnType && customPoint.spawnType !== "Star") {
          delete customPoint.starPoints;
        }
        if (!customPoint.perspective && !customPoint.maxZ) {
          delete customPoint.perspective;
          delete customPoint.maxZ;
        }
      });
    }

    downloadableObj.behaviours[behaviourIndex] = behaviour;
  };

  const removeFromEmission = (downloadableObj) => {
    const emitController = downloadableObj.emitController;
    if (emitController && emitController.name === "UniformEmission") {
      delete emitController._maxLife;
      delete emitController._emissionRate;
    } else if (emitController && emitController.name === "StandardEmission") {
      delete emitController._emitPerSecond;
      delete emitController._emitCounter;
      delete emitController._maxLife;
    } else if (emitController && emitController.name === "RandomEmission") {
      delete emitController._emitPerSecond;
      delete emitController._emitCounter;
      delete emitController._maxLife;
    }
  };

  const removeFromTimeline = (downloadableObj) => {
    const behaviourIndex = getConfigIndexByName(
      "TimelineBehaviour",
      downloadableObj,
    );
    const behaviour = getBehaviourByIndex(
      behaviourIndex,
      "TimelineBehaviour",
      downloadableObj,
    );

    if (behaviour && behaviour.timeline && behaviour.timeline.length === 0) {
      delete downloadableObj.behaviours[behaviourIndex];
    }
  };

  const removeFromSize = (downloadableObj) => {
    const behaviourIndex = getConfigIndexByName(
      "SizeBehaviour",
      downloadableObj,
    );
    const behaviour = getBehaviourByIndex(
      behaviourIndex,
      "SizeBehaviour",
      downloadableObj,
    );

    if (behaviour) {
      if (!behaviour.pulsate) {
        delete behaviour.pulsate;
        delete behaviour.pulsationSpeed;
        delete behaviour.pulsationAmplitude;
      }
      if (!behaviour.useNoise) {
        delete behaviour.useNoise;
        delete behaviour.noiseScale;
      }
      if (!behaviour.uniformScaling) {
        delete behaviour.uniformScaling;
      }
      if (!behaviour.invertAtMidpoint) {
        delete behaviour.invertAtMidpoint;
      }
      if (!behaviour.timeOffset) {
        delete behaviour.timeOffset;
      }
      if (!behaviour.sizeAlphaDependency) {
        delete behaviour.sizeAlphaDependency;
      }
      if (behaviour.sizeSteps && behaviour.sizeSteps.length === 0) {
        delete behaviour.sizeSteps;
      }
      if (behaviour.sizeSteps && behaviour.sizeSteps.length) {
        delete behaviour.sizeAlphaDependency;
        delete behaviour.timeOffset;
        delete behaviour.invertAtMidpoint;
        delete behaviour.uniformScaling;
        delete behaviour.noiseScale;
        delete behaviour.pulsate;
        delete behaviour.pulsationSpeed;
        delete behaviour.pulsationAmplitude;
        delete behaviour.sizeStart;
        delete behaviour.sizeEnd;
        delete behaviour.startVariance;
        delete behaviour.endVariance;
        delete behaviour.maxSize;
        delete behaviour.useNoise;
        delete behaviour.xScalingFunction;
        delete behaviour.yScalingFunction;
      }
    }

    downloadableObj.behaviours[behaviourIndex] = behaviour;
  };

  const removeFromRotation = (downloadableObj) => {
    const behaviourIndex = getConfigIndexByName(
      "RotationBehaviour",
      downloadableObj,
    );
    const behaviour = getBehaviourByIndex(
      behaviourIndex,
      "RotationBehaviour",
      downloadableObj,
    );

    if (behaviour) {
      if (!behaviour.oscillate) {
        delete behaviour.oscillate;
        delete behaviour.oscillationSpeed;
        delete behaviour.oscillationAmplitude;
      }
      if (!behaviour.useNoise) {
        delete behaviour.useNoise;
        delete behaviour.noiseScale;
        delete behaviour.acceleration;
      }
      if (!behaviour.clockwise) {
        delete behaviour.clockwise;
      }
    }

    downloadableObj.behaviours[behaviourIndex] = behaviour;
  };

  const removeFromAttraction = (downloadableObj) => {
    const behaviourIndex = getConfigIndexByName(
      "AttractionRepulsionBehaviour",
      downloadableObj,
    );
    const behaviour = getBehaviourByIndex(
      behaviourIndex,
      "AttractionRepulsionBehaviour",
      downloadableObj,
    );

    if (
      behaviour &&
      behaviour.influencePoints &&
      behaviour.influencePoints.length === 0
    ) {
      delete downloadableObj.behaviours[behaviourIndex];
    }
  };

  const removeFromCollision = (downloadableObj) => {
    const behaviourIndex = getConfigIndexByName(
      "CollisionBehaviour",
      downloadableObj,
    );
    const behaviour = getBehaviourByIndex(
      behaviourIndex,
      "CollisionBehaviour",
      downloadableObj,
    );

    if (behaviour) {
      if (behaviour.lines && behaviour.lines.length === 0) {
        delete downloadableObj.behaviours[behaviourIndex];
      } else {
        delete behaviour.showLines;

        if (!behaviour.skipPositionBehaviourOnCollision) {
          delete behaviour.skipPositionBehaviourOnCollision;
        }
        if (!behaviour.skipAngularVelocityBehaviourOnCollision) {
          delete behaviour.skipAngularVelocityBehaviourOnCollision;
        }
        if (!behaviour.skipColorBehaviourOnCollision) {
          delete behaviour.skipColorBehaviourOnCollision;
        }
        if (!behaviour.skipEmitDirectionBehaviourOnCollision) {
          delete behaviour.skipEmitDirectionBehaviourOnCollision;
        }
        if (!behaviour.skipRotationBehaviourOnCollision) {
          delete behaviour.skipRotationBehaviourOnCollision;
        }
        if (!behaviour.skipSizeBehaviourOnCollision) {
          delete behaviour.skipSizeBehaviourOnCollision;
        }
        downloadableObj.behaviours[behaviourIndex] = behaviour;
      }
    }
  };

  const removeFromForce = (downloadableObj) => {
    const behaviourIndex = getConfigIndexByName(
      "ForceFieldsBehaviour",
      downloadableObj,
    );
    const behaviour = getBehaviourByIndex(
      behaviourIndex,
      "ForceFieldsBehaviour",
      downloadableObj,
    );

    if (behaviour && behaviour.fields && behaviour.fields.length === 0) {
      delete downloadableObj.behaviours[behaviourIndex];
    }
  };

  const removeFromColor = (downloadableObj) => {
    const behaviourIndex = getConfigIndexByName(
      "ColorBehaviour",
      downloadableObj,
    );
    const behaviour = getBehaviourByIndex(
      behaviourIndex,
      "ColorBehaviour",
      downloadableObj,
    );

    if (behaviour) {
      if (behaviour.colorStops && behaviour.colorStops.length === 0) {
        delete behaviour.colorStops;

        if (!behaviour.sinus) {
          delete behaviour.sinus;
        }
        if (!behaviour.usePerlin) {
          delete behaviour.usePerlin;
        }
        if (!behaviour.mirrorTransition) {
          delete behaviour.mirrorTransition;
        }
        if (!behaviour.fadeToGray) {
          delete behaviour.fadeToGray;
        }
        if (!behaviour.fadeToTransparent) {
          delete behaviour.fadeToTransparent;
        }
        if (!behaviour.flickerIntensity) {
          delete behaviour.flickerIntensity;
        }
        if (!behaviour.pulseIntensity) {
          delete behaviour.pulseIntensity;
        }
        if (!behaviour.pulseSpeed) {
          delete behaviour.pulseSpeed;
        }
      } else {
        delete behaviour.start;
        delete behaviour.end;
        delete behaviour.startVariance;
        delete behaviour.endVariance;
        delete behaviour.sinus;
        delete behaviour.usePerlin;
        delete behaviour.mirrorTransition;
        delete behaviour.fadeToGray;
        delete behaviour.fadeToTransparent;
        delete behaviour.flickerIntensity;
        delete behaviour.pulseIntensity;
        delete behaviour.pulseSpeed;
      }
    }

    downloadableObj.behaviours[behaviourIndex] = behaviour;
  };

  const removeFromAngular = (downloadableObj) => {
    const behaviourIndex = getConfigIndexByName(
      "AngularVelocityBehaviour",
      downloadableObj,
    );
    const behaviour = getBehaviourByIndex(
      behaviourIndex,
      "AngularVelocityBehaviour",
      downloadableObj,
    );

    if (behaviour) {
      if (!behaviour.oscillate) {
        delete behaviour.oscillate;
        delete behaviour.oscillationSpeed;
        delete behaviour.oscillationAmplitude;
      }
      if (!behaviour.linearRadiusReduction) {
        delete behaviour.linearRadiusReduction;
      }
      if (!behaviour.dynamicRadius) {
        delete behaviour.dynamicRadius;
      }
    }

    downloadableObj.behaviours[behaviourIndex] = behaviour;
  };

  const removeFromEmitDirectional = (downloadableObj) => {
    const behaviourIndex = getConfigIndexByName(
      "EmitDirectionBehaviour",
      downloadableObj,
    );
    const behaviour = getBehaviourByIndex(
      behaviourIndex,
      "EmitDirectionBehaviour",
      downloadableObj,
    );

    if (behaviour) {
      if (!behaviour.oscillate) {
        delete behaviour.oscillate;
        delete behaviour.oscillationSpeed;
        delete behaviour.oscillationAmplitude;
      }
      if (!behaviour.useNoise) {
        delete behaviour.useNoise;
        delete behaviour.noiseScale;
      }
      if (!behaviour.velocityScaling) {
        delete behaviour.velocityScaling;
      }
    }

    downloadableObj.behaviours[behaviourIndex] = behaviour;
  };

  useEffect(() => {
    const eventHandlers = {
      updateConfig: ({ value, id, arrayName, refresh }) => {
        setDefaultConfig((prevConfig) => ({
          ...updateNestedConfig(prevConfig, arrayName, value, id),
          refresh: refresh ?? false,
        }));
      },
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
        defaultConfig.refresh = true;
        // Defer so loader resources are fully committed before particle system reads them (fixes animated sprite needing multiple refresh)
        requestAnimationFrame(() => {
          setDefaultConfig(() => ({
            ...defaultConfig,
          }));
        });
      },
      finishingImages: (value) => {
        defaultConfig.finishingTextures = value;
        defaultConfig.refresh = true;
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
        // Check if this is a shatter effect config file
        // Pure shatter effect config: { shatterEffect: {...} }
        if (value.shatterEffect !== undefined && !value.emitterConfig) {
          defaultConfig.shatterEffect = value.shatterEffect;
          defaultConfig.particlePredefinedEffect = "shatterEffect";
          defaultConfig.refresh = true;
          setDefaultConfig(() => ({
            ...defaultConfig,
          }));
        } else if (value.dissolveEffect !== undefined && !value.emitterConfig) {
          // Check if this is a dissolve effect config file
          // Pure dissolve effect config: { dissolveEffect: {...} }
          defaultConfig.dissolveEffect = value.dissolveEffect;
          defaultConfig.particlePredefinedEffect = "dissolveEffect";
          defaultConfig.refresh = true;
          setDefaultConfig(() => ({
            ...defaultConfig,
          }));
        } else if (
          value.magneticAssemblyEffect !== undefined &&
          !value.emitterConfig
        ) {
          // Check if this is a magnetic assembly effect config file
          // Pure magnetic assembly effect config: { magneticAssemblyEffect: {...} }
          defaultConfig.magneticAssemblyEffect = value.magneticAssemblyEffect;
          defaultConfig.particlePredefinedEffect = "magneticAssemblyEffect";
          defaultConfig.refresh = true;
          setDefaultConfig(() => ({
            ...defaultConfig,
          }));
        } else if (value.ghostEffect !== undefined && !value.emitterConfig) {
          // Check if this is a ghost effect config file
          // Pure ghost effect config: { ghostEffect: {...} }
          defaultConfig.ghostEffect = value.ghostEffect;
          defaultConfig.particlePredefinedEffect = "ghostEffect";
          defaultConfig.refresh = true;
          setDefaultConfig(() => ({
            ...defaultConfig,
          }));
        } else if (value.glitchEffect !== undefined && !value.emitterConfig) {
          // Check if this is a glitch effect config file
          // Pure glitch effect config: { glitchEffect: {...} }
          defaultConfig.glitchEffect = value.glitchEffect;
          defaultConfig.particlePredefinedEffect = "glitchEffect";
          defaultConfig.refresh = true;
          setDefaultConfig(() => ({
            ...defaultConfig,
          }));
        } else if (value.meltEffect !== undefined && !value.emitterConfig) {
          // Check if this is a melt effect config file
          // Pure melt effect config: { meltEffect: {...} }
          defaultConfig.meltEffect = value.meltEffect;
          defaultConfig.particlePredefinedEffect = "meltEffect";
          defaultConfig.refresh = true;
          setDefaultConfig(() => ({
            ...defaultConfig,
          }));
        } else if (
          value.pixelSortEffect !== undefined &&
          !value.emitterConfig
        ) {
          defaultConfig.pixelSortEffect = value.pixelSortEffect;
          defaultConfig.particlePredefinedEffect = "pixelSortEffect";
          defaultConfig.refresh = true;
          setDefaultConfig(() => ({ ...defaultConfig }));
        } else if (
          value.prismRefractionEffect !== undefined &&
          !value.emitterConfig
        ) {
          defaultConfig.prismRefractionEffect = value.prismRefractionEffect;
          defaultConfig.particlePredefinedEffect = "prismRefractionEffect";
          defaultConfig.refresh = true;
          setDefaultConfig(() => ({ ...defaultConfig }));
        } else if (
          value.crystallizeEffect !== undefined &&
          !value.emitterConfig
        ) {
          defaultConfig.crystallizeEffect = value.crystallizeEffect;
          defaultConfig.particlePredefinedEffect = "crystallizeEffect";
          defaultConfig.refresh = true;
          setDefaultConfig(() => ({ ...defaultConfig }));
        } else if (value.slitScanEffect !== undefined && !value.emitterConfig) {
          defaultConfig.slitScanEffect = value.slitScanEffect;
          defaultConfig.particlePredefinedEffect = "slitScanEffect";
          defaultConfig.refresh = true;
          setDefaultConfig(() => ({ ...defaultConfig }));
        } else if (
          value.granularErosionEffect !== undefined &&
          !value.emitterConfig
        ) {
          defaultConfig.granularErosionEffect = value.granularErosionEffect;
          defaultConfig.particlePredefinedEffect = "granularErosionEffect";
          defaultConfig.refresh = true;
          setDefaultConfig(() => ({ ...defaultConfig }));
        } else if (
          value.liquidMercuryEffect !== undefined &&
          !value.emitterConfig
        ) {
          defaultConfig.liquidMercuryEffect = value.liquidMercuryEffect;
          defaultConfig.particlePredefinedEffect = "liquidMercuryEffect";
          defaultConfig.refresh = true;
          setDefaultConfig(() => ({ ...defaultConfig }));
        } else {
          // Regular particle config (has emitterConfig or is particle config format)
          if (value.emitterConfig) {
            defaultConfig.emitterConfig = value.emitterConfig;
          } else {
            // Assume it's a particle config in the old format
            defaultConfig.emitterConfig = value;
          }
          // Preserve shatterEffect if it exists in the loaded config
          if (value.shatterEffect) {
            defaultConfig.shatterEffect = value.shatterEffect;
          }
          // Preserve dissolveEffect if it exists in the loaded config
          if (value.dissolveEffect) {
            defaultConfig.dissolveEffect = value.dissolveEffect;
          }
          // Preserve magneticAssemblyEffect if it exists in the loaded config
          if (value.magneticAssemblyEffect) {
            defaultConfig.magneticAssemblyEffect = value.magneticAssemblyEffect;
          }
          // Preserve ghostEffect if it exists in the loaded config
          if (value.ghostEffect) {
            defaultConfig.ghostEffect = value.ghostEffect;
          }
          // Preserve glitchEffect if it exists in the loaded config
          if (value.glitchEffect) {
            defaultConfig.glitchEffect = value.glitchEffect;
          }
          // Preserve meltEffect if it exists in the loaded config
          if (value.meltEffect) {
            defaultConfig.meltEffect = value.meltEffect;
          }
          if (value.pixelSortEffect)
            defaultConfig.pixelSortEffect = value.pixelSortEffect;
          if (value.prismRefractionEffect)
            defaultConfig.prismRefractionEffect = value.prismRefractionEffect;
          if (value.crystallizeEffect)
            defaultConfig.crystallizeEffect = value.crystallizeEffect;
          if (value.slitScanEffect)
            defaultConfig.slitScanEffect = value.slitScanEffect;
          if (value.granularErosionEffect)
            defaultConfig.granularErosionEffect = value.granularErosionEffect;
          if (value.liquidMercuryEffect)
            defaultConfig.liquidMercuryEffect = value.liquidMercuryEffect;
          defaultConfig.particlePredefinedEffect = undefined;
          defaultConfig.refresh = true;
          setDefaultConfig(() => ({
            ...defaultConfig,
          }));
        }
      },
      downloadConfig: () => {
        // Check if shatter effect is selected
        if (defaultConfig.particlePredefinedEffect === "shatterEffect") {
          // Download only shatter effect config
          const shatterConfig = defaultConfig.shatterEffect || {};
          const downloadableObj = {
            shatterEffect: shatterConfig,
          };

          const blob = new Blob([JSON.stringify(downloadableObj, null, 2)], {
            type: "application/json",
          });
          saveAs(blob, "shatter_effect_config.json");
        } else if (
          defaultConfig.particlePredefinedEffect === "dissolveEffect"
        ) {
          // Download only dissolve effect config
          const dissolveConfig = defaultConfig.dissolveEffect || {};
          const downloadableObj = {
            dissolveEffect: dissolveConfig,
          };

          const blob = new Blob([JSON.stringify(downloadableObj, null, 2)], {
            type: "application/json",
          });
          saveAs(blob, "dissolve_effect_config.json");
        } else if (
          defaultConfig.particlePredefinedEffect === "magneticAssemblyEffect"
        ) {
          // Download only magnetic assembly effect config
          const magneticAssemblyConfig =
            defaultConfig.magneticAssemblyEffect || {};
          const downloadableObj = {
            magneticAssemblyEffect: magneticAssemblyConfig,
          };

          const blob = new Blob([JSON.stringify(downloadableObj, null, 2)], {
            type: "application/json",
          });
          saveAs(blob, "magnetic_assembly_effect_config.json");
        } else if (defaultConfig.particlePredefinedEffect === "ghostEffect") {
          // Download only ghost effect config
          const ghostConfig = defaultConfig.ghostEffect || {};
          const downloadableObj = {
            ghostEffect: ghostConfig,
          };

          const blob = new Blob([JSON.stringify(downloadableObj, null, 2)], {
            type: "application/json",
          });
          saveAs(blob, "ghost_effect_config.json");
        } else if (defaultConfig.particlePredefinedEffect === "glitchEffect") {
          // Download only glitch effect config
          const glitchConfig = defaultConfig.glitchEffect || {};
          const downloadableObj = {
            glitchEffect: glitchConfig,
          };

          const blob = new Blob([JSON.stringify(downloadableObj, null, 2)], {
            type: "application/json",
          });
          saveAs(blob, "glitch_effect_config.json");
        } else if (defaultConfig.particlePredefinedEffect === "meltEffect") {
          // Download only melt effect config
          const meltConfig = defaultConfig.meltEffect || {};
          const downloadableObj = {
            meltEffect: meltConfig,
          };

          const blob = new Blob([JSON.stringify(downloadableObj, null, 2)], {
            type: "application/json",
          });
          saveAs(blob, "melt_effect_config.json");
        } else if (
          defaultConfig.particlePredefinedEffect === "pixelSortEffect"
        ) {
          const pixelSortConfig = defaultConfig.pixelSortEffect || {};
          saveAs(
            new Blob(
              [JSON.stringify({ pixelSortEffect: pixelSortConfig }, null, 2)],
              { type: "application/json" },
            ),
            "pixel_sort_effect_config.json",
          );
        } else if (
          defaultConfig.particlePredefinedEffect === "prismRefractionEffect"
        ) {
          const prismConfig = defaultConfig.prismRefractionEffect || {};
          saveAs(
            new Blob(
              [JSON.stringify({ prismRefractionEffect: prismConfig }, null, 2)],
              { type: "application/json" },
            ),
            "prism_refraction_effect_config.json",
          );
        } else if (
          defaultConfig.particlePredefinedEffect === "crystallizeEffect"
        ) {
          const crystallizeConfig = defaultConfig.crystallizeEffect || {};
          saveAs(
            new Blob(
              [
                JSON.stringify(
                  { crystallizeEffect: crystallizeConfig },
                  null,
                  2,
                ),
              ],
              { type: "application/json" },
            ),
            "crystallize_effect_config.json",
          );
        } else if (
          defaultConfig.particlePredefinedEffect === "slitScanEffect"
        ) {
          const slitScanConfig = defaultConfig.slitScanEffect || {};
          saveAs(
            new Blob(
              [JSON.stringify({ slitScanEffect: slitScanConfig }, null, 2)],
              { type: "application/json" },
            ),
            "slit_scan_effect_config.json",
          );
        } else if (
          defaultConfig.particlePredefinedEffect === "granularErosionEffect"
        ) {
          const cfg = defaultConfig.granularErosionEffect || {};
          saveAs(
            new Blob(
              [JSON.stringify({ granularErosionEffect: cfg }, null, 2)],
              { type: "application/json" },
            ),
            "granular_erosion_effect_config.json",
          );
        } else if (
          defaultConfig.particlePredefinedEffect === "liquidMercuryEffect"
        ) {
          const cfg = defaultConfig.liquidMercuryEffect || {};
          saveAs(
            new Blob([JSON.stringify({ liquidMercuryEffect: cfg }, null, 2)], {
              type: "application/json",
            }),
            "liquid_mercury_effect_config.json",
          );
        } else {
          // Download particle config as usual
          if (!pixiRefs.particles || !pixiRefs.particles.emitter) {
            console.warn("Particles not initialized, cannot download config");
            return;
          }
          const downloadableObj = pixiRefs.particles.emitter
            .getParser()
            .write();

          removeFromPosition(downloadableObj);
          removeFromSpawn(downloadableObj);
          removeFromEmission(downloadableObj);
          removeFromTimeline(downloadableObj);
          removeFromSize(downloadableObj);
          removeFromRotation(downloadableObj);
          removeFromAttraction(downloadableObj);
          removeFromCollision(downloadableObj);
          removeFromForce(downloadableObj);
          removeFromColor(downloadableObj);
          removeFromAngular(downloadableObj);
          removeFromEmitDirectional(downloadableObj);

          const blob = new Blob([JSON.stringify(downloadableObj)], {
            type: "application/json",
          });
          saveAs(blob, "particle_config");
        }
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

  // Initialization (run when container ref is ready)
  useEffect(() => {
    if (!containerReady || !contentRef.current) return;

    let destroyApp = () => {};
    let mounted = true;
    const initialize = async () => {
      // Set default config first so Menu shows even if Pixi init fails
      initializeEffect({
        setDefaultConfig,
      });
      try {
        const cleanup = await initializeApp(contentRef);
        if (mounted && cleanup) {
          destroyApp = cleanup;
          setAppReady(true);
        } else if (cleanup) {
          cleanup();
        }
      } catch (err) {
        console.error("Content: Pixi init failed", err);
        if (mounted) setAppReady(true);
      }
    };

    initialize();
    return () => {
      mounted = false;
      setAppReady(false);
      destroyApp();
    };
  }, [containerReady]);

  // Handle effects and events
  useEffect(() => {
    if (!defaultConfig || !pixiRefs.app) return;

    const { emitterConfig, textures } = defaultConfig;

    if (
      !emitterConfig?.animatedSprite &&
      Array.isArray(textures) &&
      textures.length > 0 &&
      textures[0] === "coin_"
    ) {
      const updatedConfig = {
        ...defaultConfig,
        textures: ["sparkle.png", ...textures.slice(1)], // Ensures immutability
      };

      setDefaultConfig(updatedConfig);
      return;
    }

    if (
      defaultConfig.emitterConfig?.animatedSprite &&
      defaultConfig.emitterConfig?.animatedSprite.animatedSpriteName
    ) {
      defaultConfig.textures = [
        defaultConfig.emitterConfig.animatedSprite.animatedSpriteName,
      ];
      defaultConfig.emitterConfig.animatedSprite.frameRate =
        defaultConfig.emitterConfig.animatedSprite.frameRate || 0.25;
    }

    createEffect({ defaultConfig, fullConfig, contentRef });

    // Clear refresh flag so repeated effect runs (e.g. from dependency changes) don't keep doing full reload
    if (defaultConfig.refresh) {
      setDefaultConfig((prev) => ({ ...prev, refresh: false }));
    }

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
  }, [defaultConfig, fullConfig, handleResize, handleMouseMove, appReady]);

  return (
    <>
      <div
        className="fixed top-0 left-0 bottom-0 bg-gray-600 editor-canvas-area"
        style={{ right: "var(--editor-sidebar-width)" }}
        ref={setContentRef}
      ></div>

      {/* Backdrop when mobile menu is open — tap to close */}
      <div
        role="button"
        tabIndex={-1}
        aria-label="Close menu"
        className={`editor-menu-backdrop ${mobileMenuOpen ? "editor-menu-backdrop--visible" : ""}`}
        onClick={() => setMobileMenuOpen(false)}
        onKeyDown={(e) => e.key === "Enter" && setMobileMenuOpen(false)}
      />

      {/* Floating button to open menu on mobile */}
      <button
        type="button"
        aria-label="Open menu"
        className={`editor-menu-fab ${mobileMenuOpen ? "editor-menu-fab--hidden" : ""}`}
        onClick={() => setMobileMenuOpen(true)}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {defaultConfig && (
        <Menu
          fullConfig={fullConfig}
          handlePredefinedEffectChange={handlePredefinedEffectChange}
          defaultConfig={defaultConfig}
          isMobileMenuOpen={mobileMenuOpen}
          onCloseMenu={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
