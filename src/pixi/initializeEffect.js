import particlesDefaultConfig from "@config/particlesDefaultConfig";
import { updateProps } from "@utils";

export const initializeEffect = ({ setDefaultConfig }) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const effect = urlParams.get("effect") || "coffeeShop";

  const config = JSON.parse(JSON.stringify(particlesDefaultConfig));
  const effectConfig = config[effect]
    ? JSON.parse(JSON.stringify(config[effect]))
    : null;

  if (!effectConfig) {
    console.error(`Effect "${effect}" not found in configuration.`);
    return;
  }

  const updatedEffectConfig = {
    ...effectConfig,
    particlePredefinedEffect: effect,
  };

  setDefaultConfig(updatedEffectConfig);

  // Trigger refresh for effects other than "coffeeShop"
  if (effect !== "coffeeShop") {
    updateProps("refresh", null);
  }
};