import { Assets } from "pixi.js";
import eventBus from "@utils/eventBus";

export const images = (value, emitName) => {
  const arrayOfTextures = [];
  const toLoad = [];

  value.forEach((file) => {
    arrayOfTextures.push(file.fileName);
    if (!Assets.cache.has(file.fileName)) {
      toLoad.push(file);
      Assets.add({ alias: file.fileName, src: file.result });
    }
  });

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

  if (toLoad.length > 0) {
    Assets.load(toLoad.map((f) => f.fileName)).then(emitWithFullList);
  } else {
    emitWithFullList();
  }
};

export const bgImage = (value, onImageLoaded) => {
  if (!Assets.cache.has(value.fileName)) {
    Assets.add({ alias: value.fileName, src: value.result });
    Assets.load(value.fileName).then(() => onImageLoaded(value));
  } else {
    onImageLoaded(value);
  }
};
