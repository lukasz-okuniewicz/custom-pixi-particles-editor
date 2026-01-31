import { Application, Container, Graphics, Sprite } from "pixi.js";
import pixiRefs from "./pixiRefs";

export const initializeApp = (contentRef) => {
  if (pixiRefs.app) return;

  const app = new Application();
  app.renderer.background.color = 0;
  globalThis.__PIXI_APP__ = app;
  pixiRefs.app = app;

  const bgContainer = new Container();
  const bgContainer2 = new Container();
  const particlesContainer = new Container();
  const graphics = new Graphics();
  pixiRefs.bgSprite2 = new Sprite();

  bgContainer.name = "bgContainer";
  bgContainer2.name = "bgContainer2";
  particlesContainer.name = "particlesContainer";

  pixiRefs.bgContainer = bgContainer;
  pixiRefs.bgContainer2 = bgContainer2;
  pixiRefs.particlesContainer = particlesContainer;
  pixiRefs.graphics = graphics;

  app.stage.addChild(bgContainer, particlesContainer, bgContainer2, graphics);
  contentRef.current.appendChild(app.view);

  return () => {
    app.destroy(true, { children: true, texture: true, baseTexture: true });
    pixiRefs.app = null; // Reset app ref
  };
};
