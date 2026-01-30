import { Assets } from "pixi.js";
import eventBus from "@utils/eventBus";

export const images = async (value, emitName) => {
  const arrayOfTextures = [];
  const toLoad = [];

  value.forEach((file) => {
    arrayOfTextures.push(file.fileName);
    if (!Assets.get(file.fileName)) {
      toLoad.push(Assets.load({ alias: file.fileName, src: file.result }));
    }
  });

  if (toLoad.length > 0) {
    await Promise.all(toLoad);
  }

  const emitWithFullList = () => {
    if (
      value[0].result &&
      (value[0].result.indexOf("data:application/octet-stream;") !== -1 ||
        value[0].result.indexOf("data:application/json;") !== -1)
    ) {
      eventBus.emit(emitName, value);
    } else {
      eventBus.emit(emitName, arrayOfTextures);
    }
  };

  emitWithFullList();
};

export const bgImage = async (value, onImageLoaded) => {
  if (!Assets.get(value.fileName)) {
    await Assets.load({ alias: value.fileName, src: value.result });
  }
  onImageLoaded(value);
};
