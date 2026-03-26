import particlesDefaultConfig from "@config/particlesDefaultConfig";
import { updateProps } from "@utils";

const LAST_SELECTED_EFFECT_STORAGE_KEY = "particleEditor.lastSelectedEffect.v1";
const AUTOSAVE_DRAFT_STORAGE_KEY = "particleEditor.autosaveDraft.v1";

export const initializeEffect = ({ setDefaultConfig }) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let effect = urlParams.get("effect");
  const config = JSON.parse(JSON.stringify(particlesDefaultConfig));

  if (!effect) {
    try {
      effect = window.localStorage.getItem(LAST_SELECTED_EFFECT_STORAGE_KEY) || undefined;
    } catch {
      effect = undefined;
    }
  }
  if (!effect) {
    try {
      const draftRaw = window.localStorage.getItem(AUTOSAVE_DRAFT_STORAGE_KEY);
      if (draftRaw) {
        const parsed = JSON.parse(draftRaw);
        const fromDraft =
          parsed && typeof parsed.particlePredefinedEffect === "string"
            ? parsed.particlePredefinedEffect
            : null;
        if (fromDraft && config[fromDraft]) {
          effect = fromDraft;
        }
      }
    } catch {
      effect = undefined;
    }
  }
  effect = effect || "coffeeShop";
  let effectConfig = config[effect]
    ? JSON.parse(JSON.stringify(config[effect]))
    : null;

  if (!effectConfig) {
    console.warn(`Effect "${effect}" not found in configuration.`);
    effect = "coffeeShop";
    effectConfig = JSON.parse(JSON.stringify(config[effect]));
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
