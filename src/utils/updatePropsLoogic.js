import { Assets } from "pixi.js";
import eventBus from "@utils/eventBus";

export const images = async (value, emitName) => {
  const arrayOfTextures = [];
  const toLoad = [];

  value.forEach((file) => {
    arrayOfTextures.push(file.fileName);
    if (!Assets.cache.has(file.fileName)) {
      toLoad.push(Assets.load({ alias: file.fileName, src: file.result }));
    }
  });

  if (toLoad.length > 0) {
    await Promise.all(toLoad);
  }

  const emitWithFullList = () => {
    const isFilePick =
      Array.isArray(value) &&
      value.length > 0 &&
      typeof value[0] === "object" &&
      value[0] !== null &&
      typeof value[0].fileName === "string" &&
      typeof value[0].result === "string";
    // Keep full { fileName, result } so config/drafts can restore Loader after refresh/restore.
    if (isFilePick) {
      eventBus.emit(emitName, value);
      return;
    }
    if (
      value[0] &&
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
  if (!Assets.cache.has(value.fileName)) {
    await Assets.load({ alias: value.fileName, src: value.result });
  }
  onImageLoaded(value);
};
