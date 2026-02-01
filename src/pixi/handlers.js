import pixiRefs from "@pixi/pixiRefs";

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
  pixiRefs.app.stage.eventMode = "none";
  setDefaultConfig(() => ({
    ...defaultConfig,
    refresh: true,
  }));
};

export const followMouseHandler = ({ value, setDefaultConfig }) => {
  pixiRefs.app.stage.eventMode = value ? "dynamic" : "none";
  setDefaultConfig((prevConfig) => ({
    ...prevConfig,
    followMouse: value,
  }));
};
