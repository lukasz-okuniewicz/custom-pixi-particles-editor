import { Application, Container, Graphics, Sprite } from "pixi.js";
import pixiRefs from "./pixiRefs";

export const initializeApp = async (contentRef) => {
  if (pixiRefs.app) return () => {};

  const app = new Application();
  await app.init();
  app.renderer.background.color = 0;
  globalThis.__PIXI_APP__ = app;
  pixiRefs.app = app;

  const bgContainer = new Container();
  const bgContainer2 = new Container();
  const particlesContainer = new Container();
  const graphics = new Graphics();
  pixiRefs.bgSprite2 = new Sprite();

  bgContainer.label = "bgContainer";
  bgContainer2.label = "bgContainer2";
  particlesContainer.label = "particlesContainer";

  pixiRefs.bgContainer = bgContainer;
  pixiRefs.bgContainer2 = bgContainer2;
  pixiRefs.particlesContainer = particlesContainer;
  pixiRefs.graphics = graphics;

  app.stage.addChild(bgContainer, particlesContainer, bgContainer2, graphics);
  contentRef.current.appendChild(app.canvas);

  return () => {
    app.destroy(true, { children: true, texture: true, baseTexture: true });
    pixiRefs.app = null; // Reset app ref
  };
};
