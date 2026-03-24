import pixiRefs from "@pixi/pixiRefs";

/**
 * Makes the whole canvas receive pointer hit-tests so pointermove fires even in
 * gaps between particle sprites (Pixi v8 only bubbles from actual hit targets).
 * Re-apply after resize because renderer.screen is updated in place.
 */
export const syncFollowMouseInteraction = (follow) => {
  if (!pixiRefs.app) return;
  const { stage, screen } = pixiRefs.app;
  // Pixi v8 interaction API
  stage.eventMode = follow ? "dynamic" : "none";
  // Pixi v7 (pixi.js-legacy) interaction API
  stage.interactive = !!follow;
  stage.interactiveChildren = !!follow;
  stage.hitArea = follow ? screen : null;
};

export const predefinedImageHandler = ({
  value,
  defaultConfig,
  setDefaultConfig,
  handleResize,
}) => {
  defaultConfig.particlePredefinedImage = value;
  defaultConfig.textures = [value];
  defaultConfig.refresh = true;
  setDefaultConfig(() => ({
    ...defaultConfig,
  }));
  handleResize();
};

export const refreshHandler = ({ setDefaultConfig, defaultConfig }) => {
  syncFollowMouseInteraction(defaultConfig.followMouse);
  setDefaultConfig(() => ({
    ...defaultConfig,
    refresh: true,
  }));
};

export const followMouseHandler = ({ value, setDefaultConfig }) => {
  syncFollowMouseInteraction(value);
  setDefaultConfig((prevConfig) => ({
    ...prevConfig,
    followMouse: value,
  }));
};
