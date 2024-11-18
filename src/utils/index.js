import eventBus from "@utils/eventBus";
import pixiRefs from "@pixi/pixiRefs";
import { Sprite, Texture } from "pixi.js-legacy";
import { images } from "@utils/updatePropsLoogic";

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
  return (
    config?.emitterConfig?.behaviours?.findIndex(
      (behaviour) => behaviour.name === name,
    ) ?? -1
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
    console.warn(
      `Behaviour with name "${name}" not found. Creating new behaviour.`,
    );
    return pixiRefs.particles.emitter.createBehaviourProps(name);
  }

  if (!config?.emitterConfig?.behaviours?.[index]) {
    console.error(`Invalid index "${index}". Cannot retrieve behaviour.`);
    return null;
  }

  return config.emitterConfig.behaviours[index];
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
  const {
    app,
    particlesContainer,
    graphics,
    bgContainer,
    bgContainer2,
    bgSprite,
    bgSprite2,
    bgSpriteSize,
  } = pixiRefs;

  if (!contentRef) return;
  if (!contentRef.current) return;

  const content = contentRef.current;
  const finalInnerWidth = content.clientWidth;
  const finalInnerHeight = content.clientHeight;

  app.renderer.view.style.width = `${finalInnerWidth}px`;
  app.renderer.view.style.height = `${finalInnerHeight}px`;
  app.renderer.resize(finalInnerWidth, finalInnerHeight);

  particlesContainer.position.x = content.clientWidth / 2;
  particlesContainer.position.y = content.clientHeight / 2;
  graphics.position.set(content.clientWidth / 2, content.clientHeight / 2);

  if (bgSprite) {
    let scale;
    if (finalInnerWidth - 400 < bgSpriteSize.w) {
      scale = finalInnerWidth / bgSpriteSize.w;
      bgContainer.position.x = 0;
      bgContainer.position.y = (finalInnerHeight - bgSpriteSize.h * scale) / 2;
      bgContainer2.position.x = 0;
      bgContainer2.position.y = (finalInnerHeight - bgSpriteSize.h * scale) / 2;
    } else {
      scale = finalInnerHeight / bgSpriteSize.h;
      bgContainer.position.x = (finalInnerWidth - bgSpriteSize.w * scale) / 2;
      bgContainer.position.y = 0;
      bgContainer2.position.x = (finalInnerWidth - bgSpriteSize.w * scale) / 2;
      bgContainer2.position.y = 0;
    }
    if (bgSprite) {
      bgSprite.scale.set(scale);
    }
    if (bgSprite2) {
      bgSprite2.scale.set(scale);
    }
    particlesContainer.scale.set(scale);
  } else {
    particlesContainer.scale.set(1);
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

export const updateProps = (name, value, id) => {
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
    eventBus.emit("updateConfig", { value, id, arrayName });
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

const updateQueryParameter = (key, value) => {
  const url = new URL(window.location.href);

  if (value === null || value === undefined) {
    url.searchParams.delete(key); // Remove the parameter if value is null or undefined
  } else {
    url.searchParams.set(key, value); // Add or update the parameter
  }

  history.replaceState(null, "", url.toString());
};
