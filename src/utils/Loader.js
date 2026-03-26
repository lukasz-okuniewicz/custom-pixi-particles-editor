import { Loader as PixiLoader } from "pixi.js-legacy";

export default class Loader {
  static #loadPromise = null;

  static load(onProgress, onError) {
    // React Strict Mode can double-invoke effects in dev, so make the loader
    // re-entrant safe: return the same in-flight promise instead of re-adding.
    if (Loader.#loadPromise) return Loader.#loadPromise;

    Loader.#loadPromise = new Promise((resolve, reject) => {
      const loader = PixiLoader.shared;
      // Already loading (e.g. React Strict Mode double-mount): wait for completion
      if (loader.loading) {
        loader.onComplete.once(() => resolve(true));
        return;
      }
      // Already loaded (e.g. remount after load finished): resolve immediately
      if (loader.resources.mainTheme) {
        resolve(true);
        return;
      }
      loader.add("images.json");
      loader.add("multipacked-0.json");
      loader.add("autumn", "backgrounds/autumn.jpg");
      loader.add("campFire", "backgrounds/campfire.jpg");
      loader.add("birds", "backgrounds/birds.jpg");
      loader.add("cigarette", "backgrounds/cigarette.jpg");
      loader.add("face", "backgrounds/face.jpeg");
      loader.add("office1", "backgrounds/office1.png");
      loader.add("office2", "backgrounds/office2.png");
      loader.add("house", "backgrounds/house.jpg");
      loader.add("mainTheme", "audio/mainTheme.mp3");
      loader.add("instrumentalPiano", "audio/instrumentalPiano.mp3");
      loader.add("elDestino", "audio/elDestino.mp3");
      loader.add("honorAndSwords", "audio/honorAndSwords.mp3");
      loader.add("jingleBells", "audio/jingleBells.mp3");
      loader.add("relaxingInstrumental", "audio/relaxingInstrumental.mp3");
      loader.add("relaxingMusic", "audio/relaxingMusic.mp3");
      loader.add("instrumentalMusic", "audio/instrumentalMusic.mp3");
      loader.onProgress.add((instance) => {
        if (typeof onProgress === "function") {
          onProgress(Math.round(instance.progress || 0));
        }
      });
      loader.onError.once((err) => {
        // Make sure we always surface the real loader error somewhere visible.
        console.error("[PixiLoader] onError", err);
        if (typeof onError === "function") onError(err);
        // Allow future retries by clearing the shared promise.
        Loader.#loadPromise = null;
        reject(err);
      });
      loader.load();
      loader.onComplete.once(() => {
        resolve(true);
      });
    });

    return Loader.#loadPromise;
  }
}
