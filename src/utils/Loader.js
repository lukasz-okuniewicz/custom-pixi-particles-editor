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
      loader.add("mainTheme", "audio/mainTheme.mp3");
      loader.add("instrumentalPiano", "audio/instrumentalPiano.mp3");
      loader.add("elDestino", "audio/elDestino.mp3");
      loader.add("honorAndSwords", "audio/honorAndSwords.mp3");
      loader.add("jingleBells", "audio/jingleBells.mp3");
      loader.add("relaxingInstrumental", "audio/relaxingInstrumental.mp3");
      loader.add("relaxingMusic", "audio/relaxingMusic.mp3");
      loader.add("instrumentalMusic", "audio/instrumentalMusic.mp3");
      loader.load();
      loader.onComplete.once(() => resolve(true));
    });
  }
}
