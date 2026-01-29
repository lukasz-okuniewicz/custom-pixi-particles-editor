import eventBus from "@utils/eventBus";
import pixiRefs from "@pixi/pixiRefs";
import { Sprite, Texture } from "pixi.js-legacy";
import { images } from "@utils/updatePropsLoogic";

/** Built-in behaviour names; any other name in config is treated as a custom behaviour */
export const BUILT_IN_BEHAVIOUR_NAMES = [
  "AngularVelocityBehaviour",
  "LifeBehaviour",
  "ColorBehaviour",
  "PositionBehaviour",
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
 * Returns a deep clone of config with only built-in behaviours in emitterConfig.behaviours.
 * Use when passing config to the library create() or updateConfig() so older library
 * versions that don't support custom behaviours (PlaceholderBehaviour) won't throw.
 */
export const getConfigSafeForLibrary = (config) => {
  if (!config?.emitterConfig?.behaviours) return config;
  const safe = JSON.parse(JSON.stringify(config));
  safe.emitterConfig.behaviours = safe.emitterConfig.behaviours.filter(
    (b) => b?.name && BUILT_IN_BEHAVIOUR_NAMES.includes(b.name),
  );
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
      current[key] = { ...current[key] }; // Create a shallow copy of the nested object
      current = current[key]; // Traverse deeper
    }
  });
  return updatedConfig;
};

export const resize = (contentRef) => {
  const { app, bgSprite, particlesContainer, graphics, bgSprite2 } = pixiRefs;

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

  // Adjust background sprite to 100% width while maintaining aspect ratio
  if (bgSprite) {
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
  if (bgSprite2) {
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
  const x = -(finalInnerWidth / 2 - e.data.global.x);
  const y = -(finalInnerHeight / 2 - e.data.global.y);
  pixiRefs.particles.updatePosition({ x, y });
};

export const updateProps = (name, value, id, refresh) => {
  if (!name) return;
  const arrayName = name.split(".");
  if (!arrayName.length) return;

  if (arrayName[0] === "noConfig") {
    switch (name) {
      case "noConfig.handlePredefinedEffectChange":
        updateQueryParameter("effect", value);
        break;
      case "noConfig.followMouse":
        eventBus.emit("followMouse", value);
        if (!value) {
          pixiRefs.particles.updatePosition({ x: 0, y: 0 });
        }
        break;
      case "noConfig.refresh":
        eventBus.emit("refresh");
        break;
      case "noConfig.BackgroundColor":
        pixiRefs.app.renderer.backgroundColor = parseInt(
          `0x${value.hex.replace("#", "")}`,
          16,
        );
        break;
      case "noConfig.predefinedImage":
        eventBus.emit("predefinedImage", value);
        break;
      case "noConfig.finishing-images":
        images(value, "finishingImages");
        break;
      case "noConfig.images":
        images(value, "newImages");
        break;
      case "noConfig.bg-image":
        eventBus.emit("newBgImage", value);
        break;
      case "noConfig.load-config":
        eventBus.emit("loadConfig", JSON.parse(value));
        break;
      case "noConfig.download-config":
        eventBus.emit("downloadConfig");
        break;
    }
  } else {
    eventBus.emit("updateConfig", { value, id, arrayName, refresh });
  }
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
    return target.map((targetItem, index) => {
      const defaultItem = defaults[index] || {};
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
