import { Loader as PixiLoader } from "@pixi/loaders";
import eventBus from "@utils/eventBus";

export const images = (value, emitName) => {
  const loader = PixiLoader.shared;
  const arrayOfTextures = [];

  let howManyToLoad = 0;
  value.forEach((file) => {
    arrayOfTextures.push(file.fileName);
    if (!loader.resources[file.fileName]) {
      howManyToLoad++;
      loader.add(file.fileName, file.result);
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

  if (howManyToLoad > 0) {
    loader.load();
    loader.onComplete.once(emitWithFullList);
  } else {
    // All resources already in loader: emit once with full list so refresh runs with complete textures
    emitWithFullList();
  }
};

export const bgImage = (value, onImageLoaded) => {
  const loader2 = PixiLoader.shared;
  if (!loader2.resources[value.fileName]) {
    loader2.add(value.fileName, value.result);
    loader2.load();
    loader2.onComplete.once(() => {
      onImageLoaded(value);
    });
  } else {
    onImageLoaded(value);
  }
};
