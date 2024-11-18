import { Application, Container, Graphics } from "pixi.js-legacy";
import pixiRefs from "./pixiRefs";

export const initializeApp = (contentRef) => {
  if (pixiRefs.app) return;

  const app = new Application({ backgroundColor: 0 });
  pixiRefs.app = app;

  const bgContainer = new Container();
  const bgContainer2 = new Container();
  const particlesContainer = new Container();
  const graphics = new Graphics();

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
