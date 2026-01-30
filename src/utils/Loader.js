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
  { alias: "blackHole", src: "backgrounds/blackHole.jpg" },
  { alias: "face", src: "backgrounds/face.jpeg" },
  { alias: "office1", src: "backgrounds/office1.png" },
  { alias: "office2", src: "backgrounds/office2.png" },
  { alias: "house", src: "backgrounds/house.jpg" },
  { alias: "earth", src: "backgrounds/earth.jpg" },
];

/** Cache of loaded HTML Audio elements (id -> HTMLAudioElement) for SoundReactive behaviour */
export const audioCache = {};

function loadAudio(id, src) {
  return new Promise((resolve, reject) => {
    const audio = new Audio(src);
    audio.addEventListener("canplaythrough", () => {
      audioCache[id] = audio;
      resolve();
    }, { once: true });
    audio.addEventListener("error", (e) => {
      reject(e);
    }, { once: true });
    audio.load();
  });
}

export default class Loader {
  static async load() {
    if (audioCache.mainTheme) {
      return;
    }
    await Promise.all([
      ...PIXI_ASSET_PATHS.map((item) =>
        typeof item === "string" ? Assets.load(item) : Assets.load(item)
      ),
      ...AUDIO_PATHS.map(({ id, src }) => loadAudio(id, src)),
    ]);
  }
}
