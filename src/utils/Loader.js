import { Assets } from "pixi.js";

// Pixi v8 Assets has no built-in audio parser; load audio as HTML Audio elements for Web Audio API
const AUDIO_PATHS = [
  { id: "mainTheme", src: "audio/mainTheme.mp3" },
  { id: "instrumentalPiano", src: "audio/instrumentalPiano.mp3" },
  { id: "elDestino", src: "audio/elDestino.mp3" },
  { id: "honorAndSwords", src: "audio/honorAndSwords.mp3" },
  { id: "jingleBells", src: "audio/jingleBells.mp3" },
  { id: "relaxingInstrumental", src: "audio/relaxingInstrumental.mp3" },
  { id: "relaxingMusic", src: "audio/relaxingMusic.mp3" },
  { id: "instrumentalMusic", src: "audio/instrumentalMusic.mp3" },
];

const PIXI_ASSET_PATHS = [
  "images.json",
  "multipacked-0.json",
  { alias: "autumn", src: "backgrounds/autumn.jpg" },
  { alias: "campFire", src: "backgrounds/campfire.jpg" },
  { alias: "birds", src: "backgrounds/birds.jpg" },
  { alias: "cigarette", src: "backgrounds/cigarette.jpg" },
  { alias: "face", src: "backgrounds/face.jpeg" },
  { alias: "office1", src: "backgrounds/office1.png" },
  { alias: "office2", src: "backgrounds/office2.png" },
  { alias: "house", src: "backgrounds/house.jpg" },
];

/** Cache of loaded HTML Audio elements (id -> HTMLAudioElement) for SoundReactive behaviour */
export const audioCache = {};

function loadAudio(id, src) {
  return new Promise((resolve, reject) => {
    const audio = new Audio(src);
    audio.addEventListener(
      "canplaythrough",
      () => {
        audioCache[id] = audio;
        resolve();
      },
      { once: true },
    );
    audio.addEventListener(
      "error",
      (e) => {
        reject(e);
      },
      { once: true },
    );
    audio.load();
  });
}

function reportAssetProgress(onProgress, progress) {
  if (typeof onProgress !== "function") return;
  const n = typeof progress === "number" ? progress : progress?.progress;
  if (n === undefined || n === null) return;
  const pct = n <= 1 ? Math.round(n * 100) : Math.round(n);
  onProgress(pct);
}

export default class Loader {
  static #loadPromise = null;

  /**
   * Register spritesheet frame keys as Assets aliases so Texture.from(frameName) resolves in the editor runtime.
   */
  static registerSpritesheetFrames() {
    for (const id of ["multipacked-0.json", "images.json"]) {
      const asset = Assets.get(id);
      const textures = asset?.textures;
      if (!textures || typeof textures !== "object") continue;
      for (const [name, texture] of Object.entries(textures)) {
        try {
          if (
            texture &&
            typeof Assets.add === "function" &&
            typeof Assets.resolver?.hasKey === "function" &&
            !Assets.resolver.hasKey(name)
          ) {
            Assets.add({ alias: name, src: texture });
          }
        } catch {
          // ignore frames that cannot be aliased
        }
      }
    }
  }

  /**
   * @param {(pct: number) => void} [onProgress] — 0–100
   * @param {(err: unknown) => void} [onError]
   */
  static load(onProgress, onError) {
    if (audioCache.mainTheme) {
      return Promise.resolve(true);
    }
    if (Loader.#loadPromise) {
      return Loader.#loadPromise;
    }

    Loader.#loadPromise = (async () => {
      try {
        await Promise.all([
          Assets.load(PIXI_ASSET_PATHS, (progress) =>
            reportAssetProgress(onProgress, progress),
          ),
          ...AUDIO_PATHS.map(({ id, src }) => loadAudio(id, src)),
        ]);
        Loader.registerSpritesheetFrames();
        return true;
      } catch (err) {
        console.error("[Loader] load failed", err);
        Loader.#loadPromise = null;
        if (typeof onError === "function") onError(err);
        throw err;
      }
    })();

    return Loader.#loadPromise;
  }
}
