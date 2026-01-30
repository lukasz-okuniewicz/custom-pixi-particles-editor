// No pixi imports here - this file is loaded during SSR. bgSprite2 is created
// in initializePixi.js when the app runs in the browser.
const pixiRefs = {
  app: null,
  bgContainer: null,
  bgContainer2: null,
  particlesContainer: null,
  graphics: null,
  bgSprite: null,
  bgSprite2: null,
  bgSpriteSize: null,
  particles: null,
  particlesArr: [],
  meltEffectInstance: null,
};

export default pixiRefs;
