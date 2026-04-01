"use client";

import EditorCommandPalette from "@components/EditorCommandPalette";
import Menu from "@components/Menu";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import pixiRefs from "@pixi/pixiRefs";
import {
  applyBgColorFromConfigToRenderer,
  detectMouseMove,
  getBehaviourByIndex,
  getConfigIndexByName,
  normalizeBlendModeToPixiNumber,
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
  syncFollowMouseInteraction,
} from "@pixi/handlers";
import { bgImage } from "@utils/updatePropsLoogic";
import { menuLabelToPanelId } from "@utils/behaviourSummary";
import { saveAs } from "file-saver";

const DRAFT_STORAGE_KEY = "particleEditor.autosaveDraft.v1";
const LAST_SELECTED_EFFECT_STORAGE_KEY = "particleEditor.lastSelectedEffect.v1";

export default function Content() {
  const [defaultConfig, setDefaultConfig2] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [uiNotice, setUiNotice] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [validationWarnings, setValidationWarnings] = useState([]);
  const [autosaveDraftPrompt, setAutosaveDraftPrompt] = useState(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isNarrowViewport, setIsNarrowViewport] = useState(false);
  const contentRef = useRef(null);
  const isApplyingHistoryRef = useRef(false);
  const configRef = useRef(null);
  const revisionRef = useRef(0);
  const lastHandledRevisionRef = useRef(0);
  const baselineRevisionRef = useRef(0);
  const didAttemptDraftRestoreRef = useRef(false);
  const draftWorkerRef = useRef(null);
  const workerRequestIdRef = useRef(0);
  const workerListenersRef = useRef(new Map());
  const lastCreateEffectKeyRef = useRef("");
  const lastEmitterConfigRef = useRef(null);
  // Keep stable reference: rebuilding this object on every render can retrigger effects.
  const fullConfig = useMemo(
    () => JSON.parse(JSON.stringify(particlesDefaultConfig)),
    [],
  );

  const setDefaultConfig = useCallback((next) => {
    setDefaultConfig2((prev) => {
      const resolved = typeof next === "function" ? next(prev) : next;
      if (resolved == null || resolved === prev) return prev;
      revisionRef.current += 1;
      return resolved;
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || typeof Worker === "undefined") return;
    const worker = new Worker(
      new URL("../workers/configSnapshot.worker.js", import.meta.url),
    );
    draftWorkerRef.current = worker;
    worker.onmessage = (event) => {
      const payload = event.data || {};
      const listener = workerListenersRef.current.get(payload.id);
      if (!listener) return;
      workerListenersRef.current.delete(payload.id);
      listener(payload);
    };
    return () => {
      workerListenersRef.current.clear();
      worker.terminate();
      draftWorkerRef.current = null;
    };
  }, []);

  const sanitizeWorkerPayload = useCallback((value) => {
    const seen = new WeakSet();
    const skipNodeNames = new Set([
      "AudioContext",
      "AnalyserNode",
      "AudioNode",
      "MediaElementAudioSourceNode",
    ]);

    const walk = (input) => {
      if (input == null) return input;
      const inputType = typeof input;
      if (inputType === "function" || inputType === "symbol" || inputType === "bigint")
        return undefined;
      if (inputType !== "object") return input;
      if (seen.has(input)) return undefined;

      const ctorName = input?.constructor?.name;
      if (ctorName && skipNodeNames.has(ctorName)) return undefined;
      if (typeof AudioContext !== "undefined" && input instanceof AudioContext)
        return undefined;
      if (ArrayBuffer.isView(input)) return Array.from(input);
      if (input instanceof ArrayBuffer) return Array.from(new Uint8Array(input));
      if (input instanceof Date) return input.toISOString();

      if (Array.isArray(input)) {
        seen.add(input);
        return input.map((entry) => walk(entry));
      }

      const proto = Object.getPrototypeOf(input);
      if (proto !== Object.prototype && proto !== null) {
        // Keep worker messages strictly plain and clone-safe.
        return undefined;
      }

      seen.add(input);
      const output = {};
      for (const [key, val] of Object.entries(input)) {
        const next = walk(val);
        if (next !== undefined) output[key] = next;
      }
      return output;
    };

    const sanitized = walk(value);
    return sanitized && typeof sanitized === "object" ? sanitized : {};
  }, []);

  const runWorkerTask = useCallback(
    (type, payload) => {
      const worker = draftWorkerRef.current;
      if (!worker) return Promise.resolve(null);
      workerRequestIdRef.current += 1;
      const id = workerRequestIdRef.current;
      return new Promise((resolve) => {
        workerListenersRef.current.set(id, resolve);
        const safePayload = sanitizeWorkerPayload(payload);
        try {
          worker.postMessage({ id, type, ...safePayload });
        } catch {
          workerListenersRef.current.delete(id);
          resolve(null);
        }
      });
    },
    [sanitizeWorkerPayload],
  );

  const pushNotice = useCallback((notice) => {
    setUiNotice(notice);
  }, []);

  const openMobileMenuAfterJump = useCallback(() => {
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      setMobileMenuOpen(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setIsNarrowViewport(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const handleResize = useCallback(() => {
    resize(contentRef);
  }, [contentRef]);

  const computeWarnings = useCallback((config) => {
    const warnings = [];
    const emitter = config?.emitterConfig || {};
    const behaviours = Array.isArray(emitter.behaviours) ? emitter.behaviours : [];
    const lifeIdx = behaviours.findIndex((b) => b?.name === "LifeBehaviour");
    const life = lifeIdx >= 0 ? behaviours[lifeIdx] : null;
    const effectName = config?.particlePredefinedEffect || "coffeeShop";
    const heavyEffects = new Set([
      "shatterEffect",
      "liquidMercuryEffect",
      "pixelSortEffect",
      "crystallizeEffect",
      "slitScanEffect",
    ]);
    const heavyMultiplier = heavyEffects.has(effectName) ? 0.7 : 1;
    const maxParticles = Number(emitter.maxParticles || 0);
    const emitRate = Number(emitter.emitRate || 0);
    const lifeEnd = Number(life?.maxLifeTime ?? 0);

    if (maxParticles > 12000 * heavyMultiplier)
      warnings.push({
        message: "Very high maxParticles can degrade real-time editing performance.",
        panelId: menuLabelToPanelId("Emission Type"),
      });
    if (emitRate > 1500 * heavyMultiplier)
      warnings.push({
        message: "High emitRate may cause visual instability and FPS drops.",
        panelId: menuLabelToPanelId("Emission Type"),
      });
    if (lifeEnd > 18 * heavyMultiplier)
      warnings.push({
        message: "Long particle lifetime can create buildup and memory pressure.",
        panelId: menuLabelToPanelId("Life"),
      });
    return warnings;
  }, []);

  const sanitizeTemplateConfig = useCallback((template) => {
    const clone = JSON.parse(JSON.stringify(template || {}));
    if (!clone?.emitterConfig) return clone;
    if (!clone.emitterConfig.reactiveSignals || typeof clone.emitterConfig.reactiveSignals !== "object") {
      clone.emitterConfig.reactiveSignals = {};
    }
    const behaviours = Array.isArray(clone.emitterConfig.behaviours)
      ? clone.emitterConfig.behaviours
      : [];
    clone.emitterConfig.behaviours = behaviours
      .filter((b) => b && typeof b === "object")
      .map((b) =>
        b.name === "SoundReactiveBehaviour"
          ? {
              ...b,
              reactiveSignals:
                b.reactiveSignals && typeof b.reactiveSignals === "object"
                  ? b.reactiveSignals
                  : {},
            }
          : b,
      );
    return clone;
  }, []);

  const normalizeRuntimeConfig = useCallback((config) => {
    const originalBehaviours = Array.isArray(config?.emitterConfig?.behaviours)
      ? config.emitterConfig.behaviours
      : [];
    const clone = JSON.parse(JSON.stringify(config || {}));
    if (!clone?.emitterConfig) return clone;
    if (!clone.emitterConfig.reactiveSignals || typeof clone.emitterConfig.reactiveSignals !== "object") {
      clone.emitterConfig.reactiveSignals = {};
    }
    if (Array.isArray(clone.emitterConfig.behaviours)) {
      clone.emitterConfig.behaviours = clone.emitterConfig.behaviours.map((b) => {
        if (!b || typeof b !== "object") return b;
        if (b.name !== "SoundReactiveBehaviour") return b;
        const original = originalBehaviours.find(
          (orig) => orig?.name === "SoundReactiveBehaviour",
        );
        return {
          ...b,
          analyser: original?.analyser ?? null,
          audioContext: original?.audioContext ?? null,
          frequencyData: original?.frequencyData ?? null,
          isPlaying:
            typeof original?.isPlaying === "boolean"
              ? original.isPlaying
              : b.isPlaying,
          reactiveSignals:
            b.reactiveSignals && typeof b.reactiveSignals === "object"
              ? b.reactiveSignals
              : {},
        };
      });
    }
    return clone;
  }, []);

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
    if (!emitController) return;
    if (emitController.name === "UniformEmission") {
      delete emitController._maxLife;
      delete emitController._emissionRate;
      delete emitController._emitCounter;
      delete emitController._burstPerFrame;
      delete emitController._burstCount;
      delete emitController._cooldown;
      delete emitController._jitter;
      delete emitController._duration;
      delete emitController._loop;
      delete emitController._curve;
      delete emitController._timeUntilNextBurst;
      delete emitController._pendingBurst;
    } else if (emitController.name === "StandardEmission") {
      delete emitController._emitPerSecond;
      delete emitController._maxLife;
      delete emitController._burstPerFrame;
      delete emitController._burstCount;
      delete emitController._cooldown;
      delete emitController._jitter;
      delete emitController._duration;
      delete emitController._loop;
      delete emitController._curve;
      delete emitController._seed;
      delete emitController._rngState;
      delete emitController._timeUntilNextBurst;
      delete emitController._pendingBurst;
    } else if (emitController.name === "RandomEmission") {
      delete emitController._emitPerSecond;
      delete emitController._emitCounter;
      delete emitController._maxLife;
      delete emitController._burstPerFrame;
      delete emitController._burstCount;
      delete emitController._cooldown;
      delete emitController._jitter;
      delete emitController._duration;
      delete emitController._loop;
      delete emitController._curve;
      delete emitController._timeUntilNextBurst;
      delete emitController._pendingBurst;
    } else if (emitController.name === "PersistentFillEmission") {
      delete emitController._emitPerSecond;
      delete emitController._emitCounter;
      delete emitController._maxLife;
      delete emitController._emissionRate;
      delete emitController._burstCount;
      delete emitController._cooldown;
      delete emitController._jitter;
      delete emitController._duration;
      delete emitController._loop;
      delete emitController._curve;
      delete emitController._seed;
      delete emitController._rngState;
      delete emitController._timeUntilNextBurst;
      delete emitController._pendingBurst;
    } else if (emitController.name === "BurstScheduleEmission") {
      delete emitController._emitPerSecond;
      delete emitController._emitCounter;
      delete emitController._maxLife;
      delete emitController._emissionRate;
      delete emitController._burstPerFrame;
      delete emitController._duration;
      delete emitController._loop;
      delete emitController._curve;
      delete emitController._seed;
      delete emitController._rngState;
    } else if (emitController.name === "CurveEmission") {
      delete emitController._emitPerSecond;
      delete emitController._emitCounter;
      delete emitController._maxLife;
      delete emitController._emissionRate;
      delete emitController._burstPerFrame;
      delete emitController._burstCount;
      delete emitController._cooldown;
      delete emitController._jitter;
      delete emitController._seed;
      delete emitController._rngState;
      delete emitController._timeUntilNextBurst;
      delete emitController._pendingBurst;
      delete emitController._elapsed;
      delete emitController._carry;
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
      } else if (behaviour.colorStops && behaviour.colorStops.length > 0) {
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
    if (!uiNotice) return undefined;
    const timeout = setTimeout(() => setUiNotice(null), 2800);
    return () => clearTimeout(timeout);
  }, [uiNotice]);

  useEffect(() => {
    configRef.current = defaultConfig;
  }, [defaultConfig]);

  useEffect(() => {
    if (!defaultConfig) return;
    const revision = revisionRef.current;
    if (!lastHandledRevisionRef.current) {
      lastHandledRevisionRef.current = revision;
      return;
    }
    if (revision === lastHandledRevisionRef.current) return;
    if (isApplyingHistoryRef.current) {
      isApplyingHistoryRef.current = false;
      lastHandledRevisionRef.current = revision;
      return;
    }
    lastHandledRevisionRef.current = revision;
    setIsDirty(revision !== baselineRevisionRef.current);
  }, [defaultConfig]);

  useEffect(() => {
    if (!defaultConfig) return;
    setValidationWarnings(computeWarnings(defaultConfig));
  }, [computeWarnings, defaultConfig]);

  useEffect(() => {
    if (!defaultConfig) return;
    const draft = window.setTimeout(() => {
      runWorkerTask("serialize", { config: defaultConfig }).then((result) => {
        const serialized = result?.serialized;
        if (typeof serialized !== "string") return;
        try {
          window.localStorage.setItem(DRAFT_STORAGE_KEY, serialized);
        } catch {}
      });
    }, 800);
    return () => window.clearTimeout(draft);
  }, [defaultConfig, runWorkerTask]);

  useEffect(() => {
    const id = defaultConfig?.particlePredefinedEffect;
    if (!id) return;
    try {
      window.localStorage.setItem(LAST_SELECTED_EFFECT_STORAGE_KEY, id);
    } catch {}
  }, [defaultConfig?.particlePredefinedEffect]);

  useEffect(() => {
    if (!defaultConfig || didAttemptDraftRestoreRef.current) return;
    didAttemptDraftRestoreRef.current = true;
    baselineRevisionRef.current = revisionRef.current;
    try {
      const draftRaw = window.localStorage.getItem(DRAFT_STORAGE_KEY);
      if (!draftRaw) return;
      const draft = JSON.parse(draftRaw);
      runWorkerTask("compare", { base: defaultConfig, draft }).then((result) => {
        if (!result || result.equal) return;
        setAutosaveDraftPrompt({ draft });
      });
    } catch {}
  }, [defaultConfig, runWorkerTask]);

  const dismissAutosaveDraftPrompt = useCallback(() => {
    setAutosaveDraftPrompt(null);
  }, []);

  const restoreAutosaveDraft = useCallback(() => {
    if (!autosaveDraftPrompt?.draft) return;
    const draft = autosaveDraftPrompt.draft;
    isApplyingHistoryRef.current = true;
    // Drafts persist refresh: false after the last run; full recreate is required so animated sprites,
    // textures, and emitter state match the restored config (updateParticles alone is not enough).
    setDefaultConfig({ ...draft, refresh: true });
    applyBgColorFromConfigToRenderer(draft);
    pushNotice({ type: "info", message: "Autosave draft restored." });
    setAutosaveDraftPrompt(null);
  }, [autosaveDraftPrompt, pushNotice]);

  useEffect(() => {
    const eventHandlers = {
      updateConfig: ({ value, id, arrayName, refresh }) => {
        setDefaultConfig((prevConfig) => ({
          ...updateNestedConfig(prevConfig, arrayName, value, id),
          refresh: refresh ?? false,
        }));
      },
      followMouse: (value) => followMouseHandler({ value, setDefaultConfig }),
      refresh: () =>
        refreshHandler({ setDefaultConfig, defaultConfig: configRef.current }),
      predefinedImage: (value) =>
        predefinedImageHandler({
          value,
          defaultConfig: configRef.current,
          setDefaultConfig,
          handleResize,
        }),
      resize: handleResize,
      newImages: (value) => {
        const config = configRef.current;
        if (!config) return;
        if (
          Array.isArray(value) &&
          value.length > 0 &&
          typeof value[0] === "object" &&
          value[0] !== null &&
          typeof value[0].fileName === "string" &&
          typeof value[0].result === "string"
        ) {
          config.particleTextureSources = value.map((f) => ({
            fileName: f.fileName,
            result: f.result,
          }));
          config.textures = value.map((f) => f.fileName);
        } else {
          config.textures = value;
          config.particleTextureSources = undefined;
        }
        config.refresh = true;
        // Defer so loader resources are fully committed before particle system reads them (fixes animated sprite needing multiple refresh)
        requestAnimationFrame(() => {
          setDefaultConfig(() => ({
            ...config,
          }));
        });
      },
      finishingImages: (value) => {
        const config = configRef.current;
        if (!config) return;
        if (
          Array.isArray(value) &&
          value.length > 0 &&
          typeof value[0] === "object" &&
          value[0] !== null &&
          typeof value[0].fileName === "string" &&
          typeof value[0].result === "string"
        ) {
          config.finishingTextureSources = value.map((f) => ({
            fileName: f.fileName,
            result: f.result,
          }));
          config.finishingTextures = value.map((f) => f.fileName);
        } else {
          config.finishingTextures = value;
          config.finishingTextureSources = undefined;
        }
        config.refresh = true;
        setDefaultConfig(() => ({
          ...config,
        }));
      },
      newBgImage: (value) => {
        const config = configRef.current;
        if (!config) return;
        bgImage(value, () => {
          config.bgImage = value;
          setDefaultConfig(() => ({
            ...config,
          }));
        });
      },
      loadConfig: (value) => {
        const config = configRef.current;
        if (!config) return;
        // Check if this is a shatter effect config file
        // Pure shatter effect config: { shatterEffect: {...} }
        if (value.shatterEffect !== undefined && !value.emitterConfig) {
          config.shatterEffect = value.shatterEffect;
          config.particlePredefinedEffect = "shatterEffect";
          config.refresh = true;
          setDefaultConfig(() => ({
            ...config,
          }));
        } else if (value.dissolveEffect !== undefined && !value.emitterConfig) {
          // Check if this is a dissolve effect config file
          // Pure dissolve effect config: { dissolveEffect: {...} }
          config.dissolveEffect = value.dissolveEffect;
          config.particlePredefinedEffect = "dissolveEffect";
          config.refresh = true;
          setDefaultConfig(() => ({
            ...config,
          }));
        } else if (
          value.magneticAssemblyEffect !== undefined &&
          !value.emitterConfig
        ) {
          // Check if this is a magnetic assembly effect config file
          // Pure magnetic assembly effect config: { magneticAssemblyEffect: {...} }
          config.magneticAssemblyEffect = value.magneticAssemblyEffect;
          config.particlePredefinedEffect = "magneticAssemblyEffect";
          config.refresh = true;
          setDefaultConfig(() => ({
            ...config,
          }));
        } else if (value.ghostEffect !== undefined && !value.emitterConfig) {
          // Check if this is a ghost effect config file
          // Pure ghost effect config: { ghostEffect: {...} }
          config.ghostEffect = value.ghostEffect;
          config.particlePredefinedEffect = "ghostEffect";
          config.refresh = true;
          setDefaultConfig(() => ({
            ...config,
          }));
        } else if (value.glitchEffect !== undefined && !value.emitterConfig) {
          // Check if this is a glitch effect config file
          // Pure glitch effect config: { glitchEffect: {...} }
          config.glitchEffect = value.glitchEffect;
          config.particlePredefinedEffect = "glitchEffect";
          config.refresh = true;
          setDefaultConfig(() => ({
            ...config,
          }));
        } else if (value.meltEffect !== undefined && !value.emitterConfig) {
          // Check if this is a melt effect config file
          // Pure melt effect config: { meltEffect: {...} }
          config.meltEffect = value.meltEffect;
          config.particlePredefinedEffect = "meltEffect";
          config.refresh = true;
          setDefaultConfig(() => ({
            ...config,
          }));
        } else if (value.pixelSortEffect !== undefined && !value.emitterConfig) {
          config.pixelSortEffect = value.pixelSortEffect;
          config.particlePredefinedEffect = "pixelSortEffect";
          config.refresh = true;
          setDefaultConfig(() => ({ ...config }));
        } else if (value.prismRefractionEffect !== undefined && !value.emitterConfig) {
          config.prismRefractionEffect = value.prismRefractionEffect;
          config.particlePredefinedEffect = "prismRefractionEffect";
          config.refresh = true;
          setDefaultConfig(() => ({ ...config }));
        } else if (value.crystallizeEffect !== undefined && !value.emitterConfig) {
          config.crystallizeEffect = value.crystallizeEffect;
          config.particlePredefinedEffect = "crystallizeEffect";
          config.refresh = true;
          setDefaultConfig(() => ({ ...config }));
        } else if (value.slitScanEffect !== undefined && !value.emitterConfig) {
          config.slitScanEffect = value.slitScanEffect;
          config.particlePredefinedEffect = "slitScanEffect";
          config.refresh = true;
          setDefaultConfig(() => ({ ...config }));
        } else if (value.granularErosionEffect !== undefined && !value.emitterConfig) {
          config.granularErosionEffect = value.granularErosionEffect;
          config.particlePredefinedEffect = "granularErosionEffect";
          config.refresh = true;
          setDefaultConfig(() => ({ ...config }));
        } else if (value.liquidMercuryEffect !== undefined && !value.emitterConfig) {
          config.liquidMercuryEffect = value.liquidMercuryEffect;
          config.particlePredefinedEffect = "liquidMercuryEffect";
          config.refresh = true;
          setDefaultConfig(() => ({ ...config }));
        } else {
          // Regular particle config (has emitterConfig or is particle config format)
          if (value.emitterConfig) {
            const ec = { ...value.emitterConfig };
            if (ec.blendMode !== undefined) {
              ec.blendMode = normalizeBlendModeToPixiNumber(ec.blendMode);
            }
            config.emitterConfig = ec;
          } else {
            // Assume it's a particle config in the old format
            const ec = { ...value };
            if (ec.blendMode !== undefined) {
              ec.blendMode = normalizeBlendModeToPixiNumber(ec.blendMode);
            }
            config.emitterConfig = ec;
          }
          // Round-trip: downloaded JSON may omit textures; merge so load matches editor state
          if (Array.isArray(value.textures) && value.textures.length > 0) {
            config.textures = value.textures;
          }
          if (
            Array.isArray(value.particleTextureSources) &&
            value.particleTextureSources.length > 0
          ) {
            config.particleTextureSources = value.particleTextureSources.map(
              (t) => ({
                fileName: t.fileName,
                result: t.result,
              }),
            );
          }
          if (
            Array.isArray(value.finishingTextureSources) &&
            value.finishingTextureSources.length > 0
          ) {
            config.finishingTextureSources = value.finishingTextureSources.map(
              (t) => ({
                fileName: t.fileName,
                result: t.result,
              }),
            );
          }
          if (Array.isArray(value.finishingTextures)) {
            const ft = value.finishingTextures;
            if (
              ft.length > 0 &&
              typeof ft[0] === "object" &&
              ft[0] !== null &&
              typeof ft[0].fileName === "string"
            ) {
              config.finishingTextureSources = ft.map((f) => ({
                fileName: f.fileName,
                result: f.result,
              }));
              config.finishingTextures = ft.map((f) => f.fileName);
            } else {
              config.finishingTextures = ft;
            }
          }
          if (value.particleLinks != null) {
            config.particleLinks = value.particleLinks;
          }
          // Preserve shatterEffect if it exists in the loaded config
          if (value.shatterEffect) {
            config.shatterEffect = value.shatterEffect;
          }
          // Preserve dissolveEffect if it exists in the loaded config
          if (value.dissolveEffect) {
            config.dissolveEffect = value.dissolveEffect;
          }
          // Preserve magneticAssemblyEffect if it exists in the loaded config
          if (value.magneticAssemblyEffect) {
            config.magneticAssemblyEffect = value.magneticAssemblyEffect;
          }
          // Preserve ghostEffect if it exists in the loaded config
          if (value.ghostEffect) {
            config.ghostEffect = value.ghostEffect;
          }
          // Preserve glitchEffect if it exists in the loaded config
          if (value.glitchEffect) {
            config.glitchEffect = value.glitchEffect;
          }
          // Preserve meltEffect if it exists in the loaded config
          if (value.meltEffect) {
            config.meltEffect = value.meltEffect;
          }
          if (value.pixelSortEffect)
            config.pixelSortEffect = value.pixelSortEffect;
          if (value.prismRefractionEffect)
            config.prismRefractionEffect = value.prismRefractionEffect;
          if (value.crystallizeEffect)
            config.crystallizeEffect = value.crystallizeEffect;
          if (value.slitScanEffect)
            config.slitScanEffect = value.slitScanEffect;
          if (value.granularErosionEffect)
            config.granularErosionEffect = value.granularErosionEffect;
          if (value.liquidMercuryEffect)
            config.liquidMercuryEffect = value.liquidMercuryEffect;
          if (value.metaballPass !== undefined)
            config.metaballPass = value.metaballPass;
          if (value.bgImage && typeof value.bgImage === "object") {
            config.bgImage = value.bgImage;
          }
          config.particlePredefinedEffect = undefined;
          config.refresh = true;
          setDefaultConfig(() => ({
            ...config,
          }));
          baselineRevisionRef.current = revisionRef.current + 1;
          setIsDirty(false);
        }
      },
      downloadConfig: () => {
        // Check if shatter effect is selected
        const config = configRef.current;
        if (!config) return;
        if (config.particlePredefinedEffect === "shatterEffect") {
          // Download only shatter effect config
          const shatterConfig = config.shatterEffect || {};
          const downloadableObj = {
            shatterEffect: shatterConfig,
          };

          const blob = new Blob([JSON.stringify(downloadableObj, null, 2)], {
            type: "application/json",
          });
          saveAs(blob, "shatter_effect_config.json");
        } else if (
          config.particlePredefinedEffect === "dissolveEffect"
        ) {
          // Download only dissolve effect config
          const dissolveConfig = config.dissolveEffect || {};
          const downloadableObj = {
            dissolveEffect: dissolveConfig,
          };

          const blob = new Blob([JSON.stringify(downloadableObj, null, 2)], {
            type: "application/json",
          });
          saveAs(blob, "dissolve_effect_config.json");
        } else if (
          config.particlePredefinedEffect === "magneticAssemblyEffect"
        ) {
          // Download only magnetic assembly effect config
          const magneticAssemblyConfig =
            config.magneticAssemblyEffect || {};
          const downloadableObj = {
            magneticAssemblyEffect: magneticAssemblyConfig,
          };

          const blob = new Blob([JSON.stringify(downloadableObj, null, 2)], {
            type: "application/json",
          });
          saveAs(blob, "magnetic_assembly_effect_config.json");
        } else if (config.particlePredefinedEffect === "ghostEffect") {
          // Download only ghost effect config
          const ghostConfig = config.ghostEffect || {};
          const downloadableObj = {
            ghostEffect: ghostConfig,
          };

          const blob = new Blob([JSON.stringify(downloadableObj, null, 2)], {
            type: "application/json",
          });
          saveAs(blob, "ghost_effect_config.json");
        } else if (config.particlePredefinedEffect === "glitchEffect") {
          // Download only glitch effect config
          const glitchConfig = config.glitchEffect || {};
          const downloadableObj = {
            glitchEffect: glitchConfig,
          };

          const blob = new Blob([JSON.stringify(downloadableObj, null, 2)], {
            type: "application/json",
          });
          saveAs(blob, "glitch_effect_config.json");
        } else if (config.particlePredefinedEffect === "meltEffect") {
          // Download only melt effect config
          const meltConfig = config.meltEffect || {};
          const downloadableObj = {
            meltEffect: meltConfig,
          };

          const blob = new Blob([JSON.stringify(downloadableObj, null, 2)], {
            type: "application/json",
          });
          saveAs(blob, "melt_effect_config.json");
        } else if (config.particlePredefinedEffect === "pixelSortEffect") {
          const pixelSortConfig = config.pixelSortEffect || {};
          saveAs(new Blob([JSON.stringify({ pixelSortEffect: pixelSortConfig }, null, 2)], { type: "application/json" }), "pixel_sort_effect_config.json");
        } else if (config.particlePredefinedEffect === "prismRefractionEffect") {
          const prismConfig = config.prismRefractionEffect || {};
          saveAs(new Blob([JSON.stringify({ prismRefractionEffect: prismConfig }, null, 2)], { type: "application/json" }), "prism_refraction_effect_config.json");
        } else if (config.particlePredefinedEffect === "crystallizeEffect") {
          const crystallizeConfig = config.crystallizeEffect || {};
          saveAs(new Blob([JSON.stringify({ crystallizeEffect: crystallizeConfig }, null, 2)], { type: "application/json" }), "crystallize_effect_config.json");
        } else if (config.particlePredefinedEffect === "slitScanEffect") {
          const slitScanConfig = config.slitScanEffect || {};
          saveAs(new Blob([JSON.stringify({ slitScanEffect: slitScanConfig }, null, 2)], { type: "application/json" }), "slit_scan_effect_config.json");
        } else if (config.particlePredefinedEffect === "granularErosionEffect") {
          const cfg = config.granularErosionEffect || {};
          saveAs(new Blob([JSON.stringify({ granularErosionEffect: cfg }, null, 2)], { type: "application/json" }), "granular_erosion_effect_config.json");
        } else if (config.particlePredefinedEffect === "liquidMercuryEffect") {
          const cfg = config.liquidMercuryEffect || {};
          saveAs(new Blob([JSON.stringify({ liquidMercuryEffect: cfg }, null, 2)], { type: "application/json" }), "liquid_mercury_effect_config.json");
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

          if (Array.isArray(config.textures) && config.textures.length > 0) {
            downloadableObj.textures = [...config.textures];
          }
          if (
            Array.isArray(config.particleTextureSources) &&
            config.particleTextureSources.length > 0
          ) {
            downloadableObj.particleTextureSources =
              config.particleTextureSources.map((t) => ({
                fileName: t.fileName,
                result: t.result,
              }));
          }
          if (
            Array.isArray(config.finishingTextureSources) &&
            config.finishingTextureSources.length > 0
          ) {
            downloadableObj.finishingTextureSources =
              config.finishingTextureSources.map((t) => ({
                fileName: t.fileName,
                result: t.result,
              }));
          }
          if (
            Array.isArray(config.finishingTextures) &&
            config.finishingTextures.length > 0
          ) {
            downloadableObj.finishingTextures = [...config.finishingTextures];
          }
          if (config.particleLinks != null) {
            downloadableObj.particleLinks = config.particleLinks;
          }
          // Emitter write() can lag; HTML select stores blendMode as a string — ensure file matches editor state.
          if (config.emitterConfig?.blendMode !== undefined) {
            downloadableObj.blendMode = normalizeBlendModeToPixiNumber(
              config.emitterConfig.blendMode,
            );
          }
          if (
            config.bgImage &&
            typeof config.bgImage === "object" &&
            config.bgImage.fileName &&
            config.bgImage.result
          ) {
            downloadableObj.bgImage = {
              fileName: config.bgImage.fileName,
              result: config.bgImage.result,
            };
          }

          const blob = new Blob([JSON.stringify(downloadableObj)], {
            type: "application/json",
          });
          saveAs(blob, "particle_config.json");
        }
        pushNotice({ type: "success", message: "Config downloaded." });
        baselineRevisionRef.current = revisionRef.current;
        setIsDirty(false);
      },
      loadConfigError: ({ message, details }) => {
        pushNotice({
          type: "error",
          message: details ? `${message} (${details})` : message,
        });
      },
      uiNotice: ({ type, message }) => pushNotice({ type, message }),
      applyTemplate: (templateName) => {
        if (!templateName || !fullConfig[templateName]) return;
        const safeTemplate = sanitizeTemplateConfig(fullConfig[templateName]);
        setDefaultConfig(() => ({
          ...safeTemplate,
          particlePredefinedEffect: templateName,
        }));
        pushNotice({ type: "success", message: `Template applied: ${templateName}` });
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
  }, [fullConfig, handleResize, pushNotice, sanitizeTemplateConfig, setDefaultConfig]);

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

  useEffect(() => {
    if (!pixiRefs.app?.stage) return;
    pixiRefs.app.stage.on("pointermove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    return () => {
      pixiRefs.app.stage.off("pointermove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleMouseMove, handleResize]);

  // Handle effects and config updates
  useEffect(() => {
    if (!defaultConfig) return;

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
      defaultConfig.emitterConfig?.animatedSprite.animatedSpriteName &&
      !(
        Array.isArray(defaultConfig.emitterConfig.textureVariants) &&
        defaultConfig.emitterConfig.textureVariants.length > 0
      )
    ) {
      defaultConfig.textures = [
        defaultConfig.emitterConfig.animatedSprite.animatedSpriteName,
      ];
      defaultConfig.emitterConfig.animatedSprite.frameRate =
        defaultConfig.emitterConfig.animatedSprite.frameRate || 0.25;
    }

    const createEffectKey = [
      defaultConfig.particlePredefinedEffect || "",
      defaultConfig.refresh ? "1" : "0",
      JSON.stringify(defaultConfig.bgColor ?? null),
      defaultConfig.bgImage?.fileName || "",
      defaultConfig.followMouse ? "1" : "0",
      defaultConfig.emitterConfig?.animatedSprite?.animatedSpriteName || "",
      Array.isArray(defaultConfig.emitterConfig?.textureVariants)
        ? defaultConfig.emitterConfig.textureVariants.length
        : 0,
      Array.isArray(defaultConfig.textures) ? defaultConfig.textures.join("|") : "",
    ].join("::");
    const shouldRecreateOrUpdate =
      createEffectKey !== lastCreateEffectKeyRef.current ||
      lastEmitterConfigRef.current !== defaultConfig.emitterConfig;
    if (shouldRecreateOrUpdate) {
      const runtimeConfig = normalizeRuntimeConfig(defaultConfig);
      createEffect({ defaultConfig: runtimeConfig, fullConfig, contentRef });
      lastCreateEffectKeyRef.current = createEffectKey;
      lastEmitterConfigRef.current = defaultConfig.emitterConfig;
    }

    // Clear refresh flag so repeated effect runs (e.g. from dependency changes) don't keep doing full reload
    if (defaultConfig.refresh) {
      setDefaultConfig((prev) => ({ ...prev, refresh: false }));
    }

    if (defaultConfig.bgImage) {
      const bi = defaultConfig.bgImage;
      if (bi.result) {
        bgImage(bi, () => {
          onImageLoaded(bi);
          // Loader is async; second resize runs after texture dimensions exist so bg is centered in the game frame.
          handleResize();
        });
      } else {
        onImageLoaded(bi);
        handleResize();
      }
    }

    handleResize();
    syncFollowMouseInteraction(defaultConfig.followMouse);
  }, [defaultConfig, fullConfig, handleResize, normalizeRuntimeConfig]);

  useEffect(() => {
    const onKeyDown = (e) => {
      const targetTag = e.target?.tagName?.toLowerCase();
      const isTypingTarget =
        targetTag === "input" ||
        targetTag === "textarea" ||
        targetTag === "select" ||
        e.target?.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        updateProps("noConfig.download-config");
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((o) => !o);
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "f") {
        e.preventDefault();
        const searchInput = document.getElementById("sidebar-behaviour-search");
        if (searchInput && typeof searchInput.focus === "function") searchInput.focus();
        return;
      }
      if (!isTypingTarget && e.key === "/") {
        e.preventDefault();
        const searchInput = document.getElementById("sidebar-behaviour-search");
        if (searchInput && typeof searchInput.focus === "function") searchInput.focus();
      }
      if (!isTypingTarget && e.key === "?") {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
      if (!isTypingTarget && e.key.toLowerCase() === "m") {
        setMobileMenuOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        if (autosaveDraftPrompt) {
          e.preventDefault();
          setAutosaveDraftPrompt(null);
          return;
        }
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [autosaveDraftPrompt]);

  return (
    <>
      <div
        className="fixed top-0 left-0 bottom-0 editor-canvas-area"
        style={{ right: "var(--editor-sidebar-width)" }}
        ref={contentRef}
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <EditorCommandPalette
        open={commandPaletteOpen && Boolean(defaultConfig)}
        onClose={() => setCommandPaletteOpen(false)}
        onAfterNavigate={openMobileMenuAfterJump}
        isNarrowViewport={isNarrowViewport}
        onTriggerLoad={() =>
          document.getElementById("editor-load-config-input")?.click?.()
        }
        onToggleMobileMenu={() => setMobileMenuOpen((v) => !v)}
      />
      {defaultConfig && (
        <Menu
          fullConfig={fullConfig}
          handlePredefinedEffectChange={handlePredefinedEffectChange}
          defaultConfig={defaultConfig}
          isDirty={isDirty}
          validationWarnings={validationWarnings}
          isMobileMenuOpen={mobileMenuOpen}
          onCloseMenu={() => setMobileMenuOpen(false)}
        />
      )}
      {autosaveDraftPrompt ? (
        <div className="editor-draft-modal" role="presentation">
          <div
            className="editor-draft-modal__backdrop"
            aria-hidden="true"
            onClick={dismissAutosaveDraftPrompt}
          />
          <div
            className="editor-draft-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="editor-draft-modal-title"
          >
            <h2 id="editor-draft-modal-title" className="editor-draft-modal__title">
              Restore autosave draft?
            </h2>
            <p className="editor-draft-modal__text">
              A local autosave draft was found that differs from what you have open. You can restore it or keep the
              current configuration.
            </p>
            <div className="editor-draft-modal__actions">
              <button type="button" className="editor-draft-modal__btn editor-draft-modal__btn--secondary" onClick={dismissAutosaveDraftPrompt}>
                Keep current
              </button>
              <button type="button" className="editor-draft-modal__btn editor-draft-modal__btn--primary" onClick={restoreAutosaveDraft}>
                Restore draft
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {uiNotice ? (
        <div
          className={`editor-ui-notice editor-ui-notice--${uiNotice.type || "info"}`}
          role="status"
          aria-live="polite"
        >
          {uiNotice.message}
        </div>
      ) : null}
    </>
  );
}
