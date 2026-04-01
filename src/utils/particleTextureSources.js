import Loader from "@utils/Loader";
import { Texture } from "pixi.js";

function queueSourcesOnLoader(sources, resources) {
  let added = 0;
  if (!Array.isArray(sources)) return 0;
  sources.forEach(({ fileName, result }) => {
    if (fileName && result && !resources[fileName]) {
      const tex = Texture.from(result);
      resources[fileName] = { texture: tex };
      Texture.addToCache(tex, fileName);
      added++;
    }
  });
  return added;
}

/**
 * Ensures disk-picked particle and finishing textures (data URLs) are registered on
 * Loader.shared.resources before the particle library reads asset ids by file name.
 * Calls `next` when ready (next tick after registration; Pixi v7 has no Loader.load queue).
 */
export function loadParticleTextureSourcesIfNeeded(defaultConfig, next) {
  if (typeof next !== "function") return;
  const resources = Loader.shared.resources;
  const needParticle = queueSourcesOnLoader(
    defaultConfig?.particleTextureSources,
    resources,
  );
  const needFinishing = queueSourcesOnLoader(
    defaultConfig?.finishingTextureSources,
    resources,
  );
  const needLoad = needParticle + needFinishing;
  if (needLoad === 0) {
    next();
    return;
  }
  queueMicrotask(next);
}
