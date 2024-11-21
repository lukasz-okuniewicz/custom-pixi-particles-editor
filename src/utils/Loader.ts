import { Loader as PixiLoader } from "pixi.js-legacy";

export default class Loader {
  static load() {
    return new Promise((resolve) => {
      const loader = PixiLoader.shared;
      loader.add("images.json");
      loader.add("multipacked-0.json");
      loader.add("autumn", "backgrounds/autumn.jpg");
      loader.add("campFire", "backgrounds/campfire.jpg");
      loader.add("birds", "backgrounds/birds.jpg");
      loader.add("cigarette", "backgrounds/cigarette.jpg");
      loader.add("blackHole", "backgrounds/blackHole.jpg");
      loader.add("face", "backgrounds/face.jpeg");
      loader.add("office1", "backgrounds/office1.png");
      loader.add("office2", "backgrounds/office2.png");
      loader.add("house", "backgrounds/house.jpg");
      loader.add("earth", "backgrounds/earth.jpg");
      loader.add("music_base", "audio/music_base.mp3");
      loader.add("music_base2", "audio/music_base2.mp3");
      loader.add("music_base3", "audio/music_base3.mp3");
      loader.add("music_base4", "audio/music_base4.mp3");
      loader.add("music_base5", "audio/music_base5.mp3");
      loader.add("music_base6", "audio/music_base6.mp3");
      loader.add("music_base7", "audio/music_base7.mp3");
      loader.add("music_base8", "audio/music_base8.mp3");
      loader.add("music_base9", "audio/music_base9.mp3");
      loader.add("music_base10", "audio/music_base10.mp3");
      loader.load();
      loader.onComplete.once(() => resolve(true));
    });
  }
}
