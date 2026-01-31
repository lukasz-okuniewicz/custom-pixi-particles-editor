import { Assets, Texture } from "pixi.js";

const BASE = "";

const ASSET_IDS = [
  "images.json",
  "multipacked-0.json",
  "autumn",
  "campFire",
  "birds",
  "cigarette",
  "blackHole",
  "face",
  "office1",
  "office2",
  "house",
  "earth",
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
  blackHole: `${BASE}/backgrounds/blackHole.jpg`,
  face: `${BASE}/backgrounds/face.jpeg`,
  office1: `${BASE}/backgrounds/office1.png`,
  office2: `${BASE}/backgrounds/office2.png`,
  house: `${BASE}/backgrounds/house.jpg`,
  earth: `${BASE}/backgrounds/earth.jpg`,
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

export default class Loader {
  static get shared() {
    return shared;
  }

  static registerSpritesheetFrames() {
    registerSpritesheetFrames();
  }

  static async load() {
    if (shared.resources.mainTheme) {
      return;
    }
    Object.entries(ASSET_URLS).forEach(([id, url]) => {
      if (!Assets.resolver.hasKey(id)) {
        Assets.add({ alias: id, src: url });
      }
    });
    const [loadedArray, ...audioResults] = await Promise.all([
      Assets.load(ASSET_IDS),
      ...AUDIO_IDS.map((id) =>
        loadAudioBuffer(AUDIO_URLS[id]).then((r) => ({ id, ...r }))
      ),
    ]);
    ASSET_IDS.forEach((id, i) => {
      shared.resources[id] = loadedArray[i];
    });
    audioResults.forEach(({ id, data }) => {
      shared.resources[id] = { data };
    });

    registerSpritesheetFrames();
  }
}
