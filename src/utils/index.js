import eventBus from "@utils/eventBus";
import pixiRefs from "@pixi/pixiRefs";
import { BLEND_MODES, Sprite, Texture } from "pixi.js-legacy";
import { images } from "@utils/updatePropsLoogic";

/** Built-in behaviour names; any other name in config is treated as a custom behaviour */
export const BUILT_IN_BEHAVIOUR_NAMES = [
  "AngularVelocityBehaviour",
  "LifeBehaviour",
  "ColorBehaviour",
  "PositionBehaviour",
  "WarpBehaviour",
  "SizeBehaviour",
  "EmitDirectionBehaviour",
  "RotationBehaviour",
  "TurbulenceBehaviour",
  "CollisionBehaviour",
  "AttractionRepulsionBehaviour",
  "NoiseBasedMotionBehaviour",
  "ForceFieldsBehaviour",
  "SpawnBehaviour",
  "TimelineBehaviour",
  "GroupingBehaviour",
  "SoundReactiveBehaviour",
  "LightEffectBehaviour",
  "StretchBehaviour",
  "TemperatureBehaviour",
  "MoveToPointBehaviour",
  "PointToPointBehaviour",
  "FormPatternBehaviour",
  "VortexBehaviour",
  "PulseBehaviour",
  "RippleBehaviour",
  "OrbitBehaviour",
  "FlickerBehaviour",
  "WobbleBehaviour",
  "ColorCycleBehaviour",
  "ConstrainToShapeBehaviour",
  "GravityWellBehaviour",
  "TrailBehaviour",
  "BounceBehaviour",
  "ToroidalWrapBehaviour",
  "HomingBehaviour",
  "FloatUpBehaviour",
  "MagnetBehaviour",
  "NearMissDispersionBehaviour",
  "ConversionCascadeBehaviour",
  "BoidsFlockingBehaviour",
  "ProximityStateBehaviour",
  "PhaseFieldFlowBehaviour",
  "PhaseCoherenceBehaviour",
  "CurvatureFlowBehaviour",
  "LimitCycleBehaviour",
  "AizawaAttractorBehaviour",
  "ToroidalFlowBehaviour",
  "ProximityTriggeredPhaseBehaviour",
  "LissajousHarmonicLatticeBehaviour",
  "JacobianCurlFieldBehaviour",
  "ShearFlowBehaviour",
  "ObstacleSDFSteerBehaviour",
  "RVOAvoidanceBehaviour",
  "EmitterAttractorLinkBehaviour",
  "KelvinWakeBehaviour",
  "BezierFlowTubeBehaviour",
  "ScreenSpaceFlowMapBehaviour",
  "BeatPhaseLockBehaviour",
  "DamageFlashRippleBehaviour",
  "RecursiveFireworkBehaviour",
  "FlockingBehaviour",
  "FlowFieldDriftBehaviour",
  "TemperatureSimulationBehaviour",
  "PredatorPreyBehaviour",
  "GlitchBehaviour",
];

export const camelCaseToNormal = (text) => {
  return text
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
    .replace(/^./, (str) => str.toUpperCase());
};

export const getConfigByName = (name, config) => {
  return (
    config?.emitterConfig?.behaviours?.find(
      (behaviour) => behaviour.name === name,
    ) || {}
  );
};

export const getConfigIndexByName = (name, config) => {
  if (config.behaviours) {
    return config.behaviours.findIndex((behaviour) => behaviour.name === name);
  }
  return config.emitterConfig?.behaviours?.findIndex(
    (behaviour) => behaviour.name === name,
  );
};

export const ensureBehaviourIndexByName = (name, config) => {
  const existing = getConfigIndexByName(name, config);
  if (existing !== -1) return existing;
  const target = config?.emitterConfig?.behaviours || config?.behaviours;
  if (!Array.isArray(target)) return -1;
  return target.push({ name }) - 1;
};

export const updateNewBehaviour = (name, key, props, config) => {
  const behaviourIndex = getConfigIndexByName(name, config);
  if (behaviourIndex === -1) {
    console.warn(`Behaviour with name "${name}" not found.`);
    return;
  }

  const behaviour = getNewBehaviourByIndex(behaviourIndex, name, config);

  if (typeof key === "string") {
    behaviour[key] = props;
  } else if (Array.isArray(key) && key.length === 2) {
    behaviour[key[0]] = {
      ...behaviour[key[0]],
      [key[1]]: props,
    };
  } else {
    console.warn(`Invalid key format: "${key}".`);
    return;
  }

  updateNewBehaviourByIndex(behaviourIndex, behaviour, config);
};

export const updateBehaviour = (name, key, props, config) => {
  const behaviourIndex = getConfigIndexByName(name, config);

  if (behaviourIndex === -1) {
    console.warn(`Behaviour with name "${name}" not found.`);
    return;
  }

  const behaviour = getBehaviourByIndex(behaviourIndex, name, config);

  if (typeof key === "string") {
    // Update single key
    behaviour[key] = props;
  } else if (Array.isArray(key) && key.length === 2) {
    // Update nested key
    behaviour[key[0]] = {
      ...behaviour[key[0]],
      [key[1]]: props,
    };
  } else {
    console.warn(`Invalid key format: "${key}".`);
    return;
  }

  updateBehaviourByIndex(behaviourIndex, behaviour, config);
};

export const getBehaviourByIndex = (index, name, config) => {
  if (index === -1) {
    return;
  }

  if (config.behaviours) {
    if (!config.behaviours?.[index]) {
      console.error(`Invalid index "${index}". Cannot retrieve behaviour.`);
      return null;
    }

    return config.behaviours[index];
  }

  if (!config?.emitterConfig?.behaviours?.[index]) {
    console.error(`Invalid index "${index}". Cannot retrieve behaviour.`);
    return null;
  }

  return config.emitterConfig.behaviours[index];
};

export const getBehaviourByName = (name, config) => {
  if (!name || !Array.isArray(config?.emitterConfig?.behaviours)) return;

  return config.emitterConfig.behaviours.find((b) => b.name === name);
};

/**
 * Returns list of { index, name } for behaviours in config that are not built-in
 * (so they can be shown in the Custom Behaviour properties panel).
 */
export const getCustomBehaviourEntries = (config) => {
  const behaviours = config?.emitterConfig?.behaviours;
  if (!Array.isArray(behaviours)) return [];
  return behaviours
    .map((b, i) => ({ index: i, name: b?.name }))
    .filter((b) => b.name && !BUILT_IN_BEHAVIOUR_NAMES.includes(b.name));
};

/**
 * Map Pixi v7 {@link BLEND_MODES} numbers to editor UI string values (Select keys).
 * Also normalizes string blend modes for display (lowercase, underscores → hyphens).
 */
const BLEND_MODE_NUMBER_TO_STRING = {
  0: "normal",
  1: "add",
  2: "multiply",
  3: "screen",
  4: "overlay",
  5: "darken",
  6: "lighten",
  7: "color-dodge",
  8: "color-burn",
  9: "hard-light",
  10: "soft-light",
  11: "difference",
  12: "exclusion",
  17: "normal",
  18: "add",
  19: "screen",
  20: "none",
};

export const normalizeBlendModeForPixiV8 = (mode) => {
  if (mode == null || mode === "") return mode;
  if (typeof mode === "number") {
    return BLEND_MODE_NUMBER_TO_STRING[mode] ?? "normal";
  }
  if (typeof mode === "string") {
    const s = mode.trim().toLowerCase().replace(/_/g, "-");
    if (s === "src-over" || s === "source-over") return "normal";
    return s;
  }
  return mode;
};

/**
 * Coerce emitter blendMode (number, numeric string, or Pixi name like "screen"/"SCREEN")
 * to a {@link BLEND_MODES} number so the General Properties blend select matches an option.
 */
export const normalizeBlendModeToPixiNumber = (mode) => {
  if (mode == null || mode === "") return BLEND_MODES.NORMAL;
  if (typeof mode === "number" && Number.isFinite(mode)) {
    if (BLEND_MODES[mode] !== undefined) return mode;
    return BLEND_MODES.NORMAL;
  }
  if (typeof mode === "string") {
    const t = mode.trim();
    if (/^\d+$/.test(t)) {
      const n = parseInt(t, 10);
      if (BLEND_MODES[n] !== undefined) return n;
    }
    const key = t.toUpperCase().replace(/-/g, "_");
    if (typeof BLEND_MODES[key] === "number") return BLEND_MODES[key];
  }
  return BLEND_MODES.NORMAL;
};

/**
 * Applies `defaultConfig.bgColor` (r, g, b) to the Pixi renderer clear color.
 * Use after load/restore/draft so the canvas matches editor state (same as noConfig.bg-color).
 */
export const applyBgColorFromConfigToRenderer = (defaultConfig) => {
  const rgb = defaultConfig?.bgColor;
  if (!rgb || !pixiRefs.app?.renderer) return;
  const r = Math.max(0, Math.min(255, Math.round(Number(rgb.r) || 0)));
  const g = Math.max(0, Math.min(255, Math.round(Number(rgb.g) || 0)));
  const b = Math.max(0, Math.min(255, Math.round(Number(rgb.b) || 0)));
  pixiRefs.app.renderer.backgroundColor = (r << 16) | (g << 8) | b;
};

/**
 * Returns a deep clone of config with only built-in behaviours in emitterConfig.behaviours.
 * Use when passing config to the library create() or updateConfig() so older library
 * versions that don't support custom behaviours (PlaceholderBehaviour) won't throw.
 * Preserves live SoundReactive fields (analyser, audioContext, frequencyData) from the
 * original config so sound reactive behaviour keeps working after update.
 */
export const getConfigSafeForLibrary = (config) => {
  if (!config?.emitterConfig?.behaviours) {
    if (!Object.prototype.hasOwnProperty.call(config, "metaballPass")) {
      if (!config?.particleTextureSources && !config?.finishingTextureSources)
        return config;
      const copy = { ...config };
      delete copy.particleTextureSources;
      delete copy.finishingTextureSources;
      return copy;
    }
    const stripped = { ...config };
    delete stripped.metaballPass;
    delete stripped.particleTextureSources;
    delete stripped.finishingTextureSources;
    return stripped;
  }
  const origBehaviours = Array.isArray(config.emitterConfig.behaviours)
    ? config.emitterConfig.behaviours
    : [];
  const safeBehaviours = origBehaviours
    .filter((b) => b?.name && BUILT_IN_BEHAVIOUR_NAMES.includes(b.name))
    .map((b) => ({ ...b }));
  const origSound = origBehaviours.find(
    (b) => b?.name === "SoundReactiveBehaviour",
  );
  const safeSound = safeBehaviours.find(
    (b) => b?.name === "SoundReactiveBehaviour",
  );
  if (origSound && safeSound) {
    if (origSound.analyser != null) safeSound.analyser = origSound.analyser;
    if (origSound.audioContext != null)
      safeSound.audioContext = origSound.audioContext;
    if (origSound.frequencyData != null)
      safeSound.frequencyData = origSound.frequencyData;
    if (typeof origSound.isPlaying === "boolean")
      safeSound.isPlaying = origSound.isPlaying;
  }
  const safe = {
    ...config,
    emitterConfig: {
      ...config.emitterConfig,
      behaviours: safeBehaviours,
    },
  };
  // Keep emitterConfig.blendMode as stored (number or string); library resolves for Pixi v7 WebGL.
  if (Object.prototype.hasOwnProperty.call(safe, "metaballPass")) {
    delete safe.metaballPass;
  }
  delete safe.particleTextureSources;
  delete safe.finishingTextureSources;
  return safe;
};

export const updateBehaviourByIndex = (index, behaviour, config) => {
  if (!config?.emitterConfig?.behaviours) {
    console.error("Invalid configuration. Cannot update behaviour.");
    return;
  }

  if (index === -1) {
    // Append new behaviour if index is -1
    config.emitterConfig.behaviours.push(behaviour);
    console.info("New behaviour added:", behaviour);
  } else if (index >= 0 && index < config.emitterConfig.behaviours.length) {
    // Update existing behaviour
    config.emitterConfig.behaviours[index] = behaviour;
    console.info(`Behaviour at index ${index} updated:`, behaviour);
  } else {
    console.error(`Invalid index "${index}". Cannot update behaviour.`);
  }
};

export const updateNestedConfig = (config, keys, value, id) => {
  const updatedConfig = { ...config }; // Create a shallow copy of the root object
  let current = updatedConfig;

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      if (typeof id !== "undefined") {
        if (!current[key]) {
          current[key] = {};
        }
        current[key][id] = value; // Update the value at the last key
      } else {
        current[key] = value; // Update the value at the last key
      }
    } else {
      current[key] = { ...(current[key] || {}) }; // Copy nested object (handles undefined)
      current = current[key]; // Traverse deeper
    }
  });
  return updatedConfig;
};

export const resize = (contentRef) => {
  const { app, bgSprite, particlesContainer, graphics, bgSprite2, metaballPassInstance } =
    pixiRefs;

  if (!contentRef || !contentRef.current) return;

  const content = contentRef.current;
  const finalInnerWidth = content.clientWidth;
  const finalInnerHeight = content.clientHeight;

  // Original game dimensions
  const GAME_WIDTH = 1334;
  const GAME_HEIGHT = 750;

  // Resize renderer
  app.renderer.view.style.width = `${finalInnerWidth}px`;
  app.renderer.view.style.height = `${finalInnerHeight}px`;
  app.renderer.resize(finalInnerWidth, finalInnerHeight);

  particlesContainer.position.x = GAME_WIDTH / 2;
  particlesContainer.position.y = GAME_HEIGHT / 2;
  graphics.position.set(GAME_WIDTH / 2, GAME_HEIGHT / 2);

  // Scale the stage
  const stageScale = Math.min(
    finalInnerWidth / GAME_WIDTH,
    finalInnerHeight / GAME_HEIGHT,
  );
  app.stage.scale.set(stageScale);
  app.stage.position.set(
    (finalInnerWidth - GAME_WIDTH * stageScale) / 2, // Center horizontally
    (finalInnerHeight - GAME_HEIGHT * stageScale) / 2, // Center vertically
  );

  if (metaballPassInstance && typeof metaballPassInstance.resize === "function") {
    metaballPassInstance.resize(GAME_WIDTH, GAME_HEIGHT);
  }

  // Adjust background sprite to 100% width while maintaining aspect ratio
  // Guard against zero-dimension sprites (e.g. texture not loaded yet when re-selecting effects)
  if (bgSprite && bgSprite.width > 0 && bgSprite.height > 0) {
    const isPortrait = bgSprite.height > bgSprite.width;
    if (!isPortrait) {
      const scale = GAME_WIDTH / bgSprite.width;
      bgSprite.width = GAME_WIDTH;
      bgSprite.height = bgSprite.height * scale;

      bgSprite.position.set(0, (GAME_HEIGHT - bgSprite.height) / 2);
    } else {
      const scale = GAME_HEIGHT / bgSprite.height;
      bgSprite.height = GAME_HEIGHT;
      bgSprite.width = bgSprite.width * scale;

      bgSprite.position.set((GAME_WIDTH - bgSprite.width) / 2, 0);
    }
  }
  if (bgSprite2 && bgSprite2.width > 0 && bgSprite2.height > 0) {
    const isPortrait = bgSprite2.height > bgSprite2.width;
    if (!isPortrait) {
      const scale = GAME_WIDTH / bgSprite2.width;
      bgSprite2.width = GAME_WIDTH;
      bgSprite2.height = bgSprite2.height * scale;

      bgSprite2.position.set(0, (GAME_HEIGHT - bgSprite2.height) / 2);
    } else {
      const scale = GAME_HEIGHT / bgSprite2.height;
      bgSprite2.height = GAME_HEIGHT;
      bgSprite2.width = bgSprite2.width * scale;

      bgSprite2.position.set((GAME_WIDTH - bgSprite2.width) / 2, 0);
    }
  }
};

export const detectMouseMove = (contentRef, e) => {
  if (!contentRef.current) return;
  const finalInnerWidth = contentRef.current.clientWidth;
  const finalInnerHeight = contentRef.current.clientHeight;
  const global =
    e?.global || e?.data?.global || e?.originalEvent?.global || null;
  if (!global) return;
  const x = -(finalInnerWidth / 2 - global.x);
  const y = -(finalInnerHeight / 2 - global.y);
  pixiRefs.particles.updatePosition({ x, y });
};

/**
 * Maps General Properties panel paths (`noConfig.*`) to real config keys for setDefaultConfig.
 * (The Menu uses wrapInSection={false}, which calls these paths; they are not nested under a `noConfig` object.)
 */
const NO_CONFIG_MAPPED_UPDATES = {
  "noConfig.blend-mode": {
    arrayName: ["emitterConfig", "blendMode"],
    refresh: true,
  },
};

const emitUpdateConfigEvent = (value, id, arrayName, refresh) => {
  if (refresh) {
    eventBus.emit("updateConfig", { value, id, arrayName, refresh });
    return;
  }
  if (typeof window === "undefined") {
    eventBus.emit("updateConfig", { value, id, arrayName, refresh });
    return;
  }
  window.__particleEditorPendingUpdateConfig = {
    value,
    id,
    arrayName,
    refresh,
  };
  if (window.__particleEditorUpdateConfigRafId) return;
  window.__particleEditorUpdateConfigRafId = window.requestAnimationFrame(
    () => {
      const payload = window.__particleEditorPendingUpdateConfig;
      window.__particleEditorPendingUpdateConfig = null;
      window.__particleEditorUpdateConfigRafId = 0;
      if (payload) {
        eventBus.emit("updateConfig", payload);
      }
    },
  );
};

export const updateProps = (name, value, id, refresh) => {
  if (!name) return;
  const arrayName = name.split(".");
  if (!arrayName.length) return;

  if (arrayName[0] === "noConfig") {
    switch (name) {
      case "noConfig.handlePredefinedEffectChange":
        updateQueryParameter("effect", value);
        return;
      case "noConfig.followMouse":
        eventBus.emit("followMouse", value);
        if (!value) {
          pixiRefs.particles.updatePosition({ x: 0, y: 0 });
        }
        return;
      case "noConfig.refresh":
        eventBus.emit("refresh");
        return;
      case "noConfig.BackgroundColor": {
        const hex = value.hex.replace("#", "");
        const n = parseInt(hex, 16);
        pixiRefs.app.renderer.backgroundColor = parseInt(`0x${hex}`, 16);
        // Persist rgb so autosave draft / restore round-trip matches coffeeShop canvas color
        emitUpdateConfigEvent(
          { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255, a: 1 },
          undefined,
          ["bgColor"],
          false,
        );
        return;
      }
      case "noConfig.bg-color": {
        applyBgColorFromConfigToRenderer({ bgColor: value });
        emitUpdateConfigEvent(value, undefined, ["bgColor"], false);
        return;
      }
      case "noConfig.predefinedImage":
        eventBus.emit("predefinedImage", value);
        return;
      case "noConfig.finishing-images":
        images(value, "finishingImages");
        return;
      case "noConfig.images":
        images(value, "newImages");
        return;
      case "noConfig.bg-image":
        eventBus.emit("newBgImage", value);
        return;
      case "noConfig.load-config":
        try {
          const parsed = typeof value === "string" ? JSON.parse(value) : value;
          eventBus.emit("loadConfig", parsed);
          eventBus.emit("uiNotice", {
            type: "success",
            message: "Config loaded successfully.",
          });
        } catch (error) {
          eventBus.emit("loadConfigError", {
            message:
              "Could not parse JSON file. Please verify the file content and try again.",
            details: error instanceof Error ? error.message : String(error),
          });
        }
        return;
      case "noConfig.download-config":
        eventBus.emit("downloadConfig");
        return;
      default:
        break;
    }
    const mapped = NO_CONFIG_MAPPED_UPDATES[name];
    if (mapped) {
      const useRefresh =
        mapped.refresh !== undefined ? mapped.refresh : Boolean(refresh);
      emitUpdateConfigEvent(value, id, mapped.arrayName, useRefresh);
    }
    return;
  }
  emitUpdateConfigEvent(value, id, arrayName, refresh);
};

export const onImageLoaded = (value) => {
  pixiRefs.bgContainer.removeChildren();
  pixiRefs.bgContainer2.removeChildren();
  if (pixiRefs.bgSprite) {
    pixiRefs.bgSprite.removeChildren();
  }
  if (pixiRefs.bgSprite2) {
    pixiRefs.bgSprite2.removeChildren();
  }
  const bgTexture = Texture.from(value.fileName);
  const sprite = new Sprite(bgTexture);
  pixiRefs.bgSprite = sprite;
  pixiRefs.bgContainer.addChild(sprite);
  pixiRefs.bgSpriteSize = {
    w: sprite.width,
    h: sprite.height,
  };
};

// Helper to initialize nested properties
export const initializeProperty = (obj, key, defaultValue = {}) => {
  if (typeof obj[key] === "undefined") {
    obj[key] = defaultValue;
  }
};

export const mergeObjectsWithDefaults = (defaults, target) => {
  if (Array.isArray(defaults)) {
    if (Array.isArray(target)) {
      const isPrimitiveArrayElt = (x) =>
        x === null ||
        typeof x === "number" ||
        typeof x === "boolean" ||
        typeof x === "string";

      // Empty default `[]` + authored primitive list — return as-is. Element-wise merge would call
      // merge({}, string) and corrupt entries (e.g. RecursiveFirework texture key lists).
      if (
        defaults.length === 0 &&
        target.length > 0 &&
        target.every(isPrimitiveArrayElt)
      ) {
        return [...target];
      }
      // Previous buggy merge: 128 empty objects — treat as empty
      if (
        target.length > 0 &&
        target.every(
          (x) =>
            typeof x === "object" &&
            x !== null &&
            !Array.isArray(x) &&
            Object.keys(x).length === 0,
        )
      ) {
        return [];
      }

      const defaultsArePrimitiveTuple =
        defaults.length > 0 && defaults.every(isPrimitiveArrayElt);
      const targetArePrimitiveTuple =
        target.length > 0 && target.every(isPrimitiveArrayElt);

      // Numeric / primitive tuples (e.g. depth lists). Avoid `defaults[i] || {}` which breaks on 0.
      // If target is shorter than the template, repeat the last authored value (same semantics as
      // RecursiveFireworkBehaviour.getByDepth). Padding with template defaults breaks presets that
      // intentionally use a single entry for all depths (e.g. palm: spreadByDepth [0]).
      if (
        defaultsArePrimitiveTuple &&
        (target.length === 0 || targetArePrimitiveTuple)
      ) {
        const maxLen = Math.max(defaults.length, target.length);
        if (target.length === 0) {
          return [...defaults];
        }
        const tail = target[target.length - 1];
        return Array.from({ length: maxLen }, (_, i) => {
          if (target[i] !== undefined) return target[i];
          if (target.length < defaults.length) return tail;
          return defaults[i];
        });
      }
    }
    if (!Array.isArray(target)) {
      return defaults;
    }
    return target.map((targetItem, index) => {
      const defaultItem = defaults[index] ?? {};
      return mergeObjectsWithDefaults(defaultItem, targetItem);
    });
  }

  if (typeof defaults === "object" && defaults !== null) {
    return Object.keys(defaults).reduce(
      (acc, key) => {
        acc[key] =
          key in target
            ? mergeObjectsWithDefaults(defaults[key], target[key])
            : defaults[key];
        return acc;
      },
      { ...target },
    );
  }

  return target !== undefined ? target : defaults;
};

const updateQueryParameter = (key, value) => {
  const url = new URL(window.location.href);

  if (value === null || value === undefined) {
    url.searchParams.delete(key); // Remove the parameter if value is null or undefined
  } else {
    url.searchParams.set(key, value); // Add or update the parameter
  }

  history.replaceState(null, "", url.toString());
};
