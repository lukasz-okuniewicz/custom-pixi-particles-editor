import { Loader as PixiLoader } from "@pixi/loaders";

function queueSourcesOnLoader(sources, loader) {
  let needLoad = 0;
  if (!Array.isArray(sources)) return 0;
  sources.forEach(({ fileName, result }) => {
    if (fileName && result && !loader.resources[fileName]) {
      loader.add(fileName, result);
      needLoad++;
    }
  });
  return needLoad;
}

/**
 * Ensures disk-picked particle and finishing textures (data URLs) are registered on
 * Pixi Loader.shared before the particle library reads asset ids by file name.
 * Calls `next` when ready.
 */
export function loadParticleTextureSourcesIfNeeded(defaultConfig, next) {
  if (typeof next !== "function") return;
  const loader = PixiLoader.shared;
  const needParticle = queueSourcesOnLoader(
    defaultConfig?.particleTextureSources,
    loader,
  );
  const needFinishing = queueSourcesOnLoader(
    defaultConfig?.finishingTextureSources,
    loader,
  );
  const needLoad = needParticle + needFinishing;
  if (needLoad === 0) {
    next();
    return;
  }
  loader.load();
  loader.onComplete.once(next);
}
