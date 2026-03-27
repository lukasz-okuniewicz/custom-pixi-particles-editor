import { Assets, Texture } from "pixi.js";

const BASE = "";

const ASSET_IDS = [
  "images.json",
  "multipacked-0.json",
  "autumn",
  "campFire",
  "birds",
  "cigarette",
  "face",
  "office1",
  "office2",
  "house",
];
const AUDIO_IDS = [
  "mainTheme",
  "instrumentalPiano",
  "elDestino",
  "honorAndSwords",
  "jingleBells",
  "relaxingInstrumental",
  "relaxingMusic",
  "instrumentalMusic",
];

const ASSET_URLS = {
  "images.json": `${BASE}/images.json`,
  "multipacked-0.json": `${BASE}/multipacked-0.json`,
  autumn: `${BASE}/backgrounds/autumn.jpg`,
  campFire: `${BASE}/backgrounds/campfire.jpg`,
  birds: `${BASE}/backgrounds/birds.jpg`,
  cigarette: `${BASE}/backgrounds/cigarette.jpg`,
  face: `${BASE}/backgrounds/face.jpeg`,
  office1: `${BASE}/backgrounds/office1.png`,
  office2: `${BASE}/backgrounds/office2.png`,
  house: `${BASE}/backgrounds/house.jpg`,
};
const AUDIO_URLS = {
  mainTheme: `${BASE}/audio/mainTheme.mp3`,
  instrumentalPiano: `${BASE}/audio/instrumentalPiano.mp3`,
  elDestino: `${BASE}/audio/elDestino.mp3`,
  honorAndSwords: `${BASE}/audio/honorAndSwords.mp3`,
  jingleBells: `${BASE}/audio/jingleBells.mp3`,
  relaxingInstrumental: `${BASE}/audio/relaxingInstrumental.mp3`,
  relaxingMusic: `${BASE}/audio/relaxingMusic.mp3`,
  instrumentalMusic: `${BASE}/audio/instrumentalMusic.mp3`,
};

/** Load one audio file and return { data: AudioBuffer } for compatibility with old loader.resources[key].data */
async function loadAudioBuffer(url) {
  const res = await fetch(url);
  const arrayBuffer = await res.arrayBuffer();
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const data = await ctx.decodeAudioData(arrayBuffer);
  return { data };
}

/** Shared resources object: same shape as old Loader.shared.resources (spritesheet .textures, audio .data). */
const shared = { resources: {} };

/**
 * Register all spritesheet frame textures in Pixi's TextureCache so Texture.from(frameName)
 * resolves (used by the particle engine). Call after load() and before creating particles.
 */
function registerSpritesheetFrames() {
  ["images.json", "multipacked-0.json"].forEach((sheetId) => {
    const sheet = shared.resources[sheetId];
    if (sheet?.textures && typeof sheet.textures === "object") {
      Object.entries(sheet.textures).forEach(([name, tex]) => {
        if (tex && typeof tex === "object") Texture.addToCache(tex, name);
      });
    }
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

  static get shared() {
    return shared;
  }

  static registerSpritesheetFrames() {
    registerSpritesheetFrames();
  }

  /**
   * @param {(pct: number) => void} [onProgress] — 0–100
   * @param {(err: unknown) => void} [onError]
   */
  static load(onProgress, onError) {
    if (shared.resources.mainTheme) {
      return Promise.resolve(true);
    }
    if (Loader.#loadPromise) {
      return Loader.#loadPromise;
    }

    Loader.#loadPromise = (async () => {
      try {
        Object.entries(ASSET_URLS).forEach(([id, url]) => {
          if (!Assets.resolver.hasKey(id)) {
            Assets.add({ alias: id, src: url });
          }
        });
        const [loaded, ...audioResults] = await Promise.all([
          Assets.load(ASSET_IDS, (progress) =>
            reportAssetProgress(onProgress, progress),
          ),
          ...AUDIO_IDS.map((id) =>
            loadAudioBuffer(AUDIO_URLS[id]).then((r) => ({ id, ...r })),
          ),
        ]);
        ASSET_IDS.forEach((id) => {
          shared.resources[id] = loaded[id];
        });
        audioResults.forEach(({ id, data }) => {
          shared.resources[id] = { data };
        });

        registerSpritesheetFrames();
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
