import particlesDefaultConfig from "@config/particlesDefaultConfig";
import { updateProps } from "@utils";

const LAST_SELECTED_EFFECT_STORAGE_KEY = "particleEditor.lastSelectedEffect.v1";
const AUTOSAVE_DRAFT_STORAGE_KEY = "particleEditor.autosaveDraft.v1";

/**
 * Resolves the same initial effect config as the legacy initializeEffect (URL, last effect, draft).
 * Safe to call synchronously on the client so the first paint can include Menu + full layout.
 */
export function computeInitialDefaultConfig() {
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

  return {
    ...effectConfig,
    particlePredefinedEffect: effect,
  };
}

export const initializeEffect = ({ setDefaultConfig }) => {
  const updatedEffectConfig = computeInitialDefaultConfig();
  setDefaultConfig(updatedEffectConfig);

  if (updatedEffectConfig.particlePredefinedEffect !== "coffeeShop") {
    updateProps("refresh", null);
  }
};
