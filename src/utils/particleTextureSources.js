import Loader from "@utils/Loader";
import { Assets, Cache, Texture } from "pixi.js";

/**
 * Pixi v8: `Texture.from(string)` only resolves the global {@link Cache}; it does not load URLs.
 * User uploads are data URLs — decode via `HTMLImageElement` then `Texture.from(image)`.
 */
async function textureFromUploadResult(result) {
  if (typeof result !== "string") {
    return Texture.from(result);
  }
  const img = new Image();
  img.src = result;
  if (typeof img.decode === "function") {
    try {
      await img.decode();
    } catch {
      // still attempt Texture.from; dimensions may populate after load
    }
  }
  return Texture.from(img);
}

function bindExistingCacheEntry(fileName, resources) {
  if (!Cache.has(fileName)) return false;
  resources[fileName] = { texture: Assets.get(fileName) };
  return true;
}

async function queueSourcesOnLoader(sources, resources) {
  let added = 0;
  if (!Array.isArray(sources)) return 0;
  for (const { fileName, result } of sources) {
    if (!fileName || !result || resources[fileName]) continue;
    // `images()` / Assets.load may already have registered this alias — do not Cache.set again.
    if (bindExistingCacheEntry(fileName, resources)) {
      added++;
      continue;
    }
    const tex = await textureFromUploadResult(result);
    if (bindExistingCacheEntry(fileName, resources)) {
      added++;
      continue;
    }
    resources[fileName] = { texture: tex };
    Cache.set(fileName, tex);
    added++;
  }
  return added;
}

/**
 * Ensures disk-picked particle and finishing textures (data URLs) are registered on
 * Loader.shared.resources and in Pixi v8's global Cache under each file name.
 */
export function loadParticleTextureSourcesIfNeeded(defaultConfig, next) {
  if (typeof next !== "function") return;
  const resources = Loader.shared.resources;
  void (async () => {
    try {
      await queueSourcesOnLoader(
        defaultConfig?.particleTextureSources,
        resources,
      );
      await queueSourcesOnLoader(
        defaultConfig?.finishingTextureSources,
        resources,
      );
    } finally {
      queueMicrotask(next);
    }
  })();
}
