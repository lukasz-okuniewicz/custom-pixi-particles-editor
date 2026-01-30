import { Assets, Sprite, Texture } from "pixi.js";
import pixiRefs from "./pixiRefs";
import {
  createAndAddParticles,
  createParticles,
  stopAllParticlesArr,
  updateParticles,
} from "./particles";
import { getConfigIndexByName, resize } from "@utils";
import { _customPixiParticlesEditorOnly } from "custom-pixi-particles";
import { animateTween, animateWarp, killTween } from "@animations";

let lastPredefinedEffect = null;

export const createEffect = ({ defaultConfig, fullConfig, contentRef }) => {
  if (!defaultConfig || !fullConfig) return;

  // Skip particle creation for shatterEffect, dissolveEffect, magneticAssemblyEffect, ghostEffect, glitchEffect, and meltEffect
  if (defaultConfig.particlePredefinedEffect === "shatterEffect" || defaultConfig.particlePredefinedEffect === "dissolveEffect" || defaultConfig.particlePredefinedEffect === "magneticAssemblyEffect" || defaultConfig.particlePredefinedEffect === "ghostEffect" || defaultConfig.particlePredefinedEffect === "glitchEffect" || defaultConfig.particlePredefinedEffect === "meltEffect") {
    killTween();
    resetPixiContainers();
    stopAllParticlesArr();
    lastPredefinedEffect = defaultConfig.particlePredefinedEffect;
    resize(contentRef, pixiRefs);
    return;
  }

  if (
    defaultConfig.particlePredefinedEffect === lastPredefinedEffect &&
    !defaultConfig.refresh
  ) {
    updateParticles(defaultConfig);
    reloadEverything(defaultConfig, fullConfig);
  } else {
    killTween();
    resetPixiContainers();
    stopAllParticlesArr();
    reloadEverything(defaultConfig, fullConfig);
    createParticles(defaultConfig);
    lastPredefinedEffect = defaultConfig.particlePredefinedEffect;
  }

  const effectMapping = {
    coffeeShop: () => createCoffeeShop({ fullConfig }),
    faded: () => createFaded({ defaultConfig }),
    ringFire: () => createRingFire({ defaultConfig }),
    helloWord: () => createHelloWord({ defaultConfig }),
    leaves: () => createLeaves({ defaultConfig }),
    spiralAnimation: () => createSpiral({ defaultConfig }),
    starAnimations: () => createStarAnimations({ defaultConfig }),
    coneAnimations: () => createConeAnimations({ defaultConfig }),
    leavesWithTurbulence: () => createLeaves({ defaultConfig }),
    sun: () => createSprite("blackHole"),
    sun2: () => createSprite("blackHole"),
    magic8: () => createSprite("face"),
    magic9: () => createSprite("face"),
    magic10: () => createSprite("face"),
    fall: () => createSprite("autumn"),
    earthBarrier: () => createSprite("earth"),
    twist: () => createSprite("autumn"),
    warp: () => {
      prepareWarp(fullConfig);
      animateWarp({ defaultConfig });
    },
    snowWithCollision: () => {
      createSprite("house");
    },
    campFire: () => createSprite("campFire"),
    campFireTurbulence: () => createSprite("campFire"),
    birds: () => createSprite("birds"),
    cigarette: () => createSprite("cigarette"),
  };

  const effectHandler = effectMapping[defaultConfig.particlePredefinedEffect];
  if (effectHandler) {
    effectHandler();
  }

  // Resize to ensure proper positioning
  resize(contentRef, pixiRefs);
};

const createCoffeeShop = ({ fullConfig }) => {
  const { particlesContainer, bgContainer2, bgSprite2 } = pixiRefs;

  createSprite("office2");

  pixiRefs.bgSprite2.texture = Assets.get("office1");
  bgContainer2.addChild(pixiRefs.bgSprite2);

  // Create particles
  createAndAddParticles(fullConfig.fog2, particlesContainer);
  createAndAddParticles(fullConfig.fallRainDrops2, bgSprite2);
  createAndAddParticles(fullConfig.darkMagicSmoke2, bgSprite2);
  createAndAddParticles(fullConfig.darkMagicSmoke3, bgSprite2);
  createAndAddParticles(fullConfig.trail2, particlesContainer);
  createAndAddParticles(fullConfig.campFire2, particlesContainer);
  createAndAddParticles(fullConfig.campFireSparkles2, particlesContainer);

  // Create positioned particles
  const campFireConfigs = [
    { config: fullConfig.campFire3, position: { x: 870, y: 182 } },
    { config: fullConfig.campFire3, position: { x: 886, y: 193 } },
    { config: fullConfig.campFire3, position: { x: 897, y: 230 } },
  ];
  campFireConfigs.forEach(({ config, position }) => {
    createAndAddParticles(config, bgSprite2, { position });
  });
};

const createFaded = ({ defaultConfig }) => {
  const { particlesContainer } = pixiRefs;

  // Create positioned particles
  const fadedConfigs = Array(19).fill({ config: defaultConfig });

  fadedConfigs.forEach(({ config, position }, index) => {
    const particles = createAndAddParticles(config, particlesContainer);
    particles.angle = index * 18 + 18;
  });
};

const createRingFire = ({ defaultConfig }) => {
  const { particlesContainer } = pixiRefs;

  // Create positioned particles
  const fadedConfigs = Array(19).fill({ config: defaultConfig });

  fadedConfigs.forEach(({ config, position }, index) => {
    const particles = createAndAddParticles(config, particlesContainer);
    particles.angle = index * 18 + 18;
  });
};

const createHelloWord = ({ defaultConfig }) => {
  animateTween(defaultConfig);
};

const createStarAnimations = ({ defaultConfig }) => {
  animateTween(defaultConfig);
};

const createConeAnimations = ({ defaultConfig }) => {
  animateTween(defaultConfig);
};

const createLeaves = ({ defaultConfig }) => {
  const { particlesContainer } = pixiRefs;

  // Create positioned particles
  const fadedConfigs = Array(19).fill({ config: defaultConfig });

  fadedConfigs.forEach(({ config, position }, index) => {
    const particles = createAndAddParticles(config, particlesContainer);
    particles.angle = index * 18 + 18;
  });
};

const createSpiral = ({ defaultConfig }) => {
  animateTween(defaultConfig);
};

const createSprite = (textureName) => {
  const { bgContainer } = pixiRefs;
  const bgTexture = Assets.get(textureName);
  const sprite = new Sprite(bgTexture);

  pixiRefs.bgSprite = sprite;
  pixiRefs.bgSpriteSize = {
    w: sprite.width,
    h: sprite.height,
  };

  bgContainer.addChild(sprite);
};

const resetPixiContainers = () => {
  const { bgContainer, bgContainer2, bgSprite, bgSprite2 } = pixiRefs;

  // Stop melt effect if running (prevents error when switching effects mid-animation)
  if (pixiRefs.meltEffectInstance) {
    pixiRefs.meltEffectInstance.destroy();
    pixiRefs.meltEffectInstance = null;
  }

  // Clear containers
  bgContainer.removeChildren();
  bgContainer2.removeChildren();

  // Clear sprites
  if (bgSprite) bgSprite.removeChildren();
  if (bgSprite2) bgSprite2.removeChildren();

  pixiRefs.bgSprite = null;
};

const prepareWarp = (fullConfig) => {
  const warpCloudsConfig = JSON.parse(JSON.stringify(fullConfig.warpClouds));
  const particles = pixiRefs.particlesContainer.addChild(
    _customPixiParticlesEditorOnly.create(warpCloudsConfig),
  );
  particles.play();
  pixiRefs.particlesArr.push(particles);

  pixiRefs.app.renderer.backgroundColor = parseInt(`0x000203`, 16);
};

const reloadEverything = (defaultConfig, fullConfig) => {
  animateTween(defaultConfig, fullConfig);

  const behaviourIndex = getConfigIndexByName(
    "CollisionBehaviour",
    defaultConfig,
  );
  if (behaviourIndex >= 0) {
    const lines = defaultConfig.emitterConfig.behaviours[behaviourIndex].lines;
    drawLines(lines);
  } else {
    pixiRefs.graphics.clear();
  }
};

const drawLines = (lines) => {
  pixiRefs.graphics.clear();

  if (lines.length > 0) {
    lines.forEach((line) => {
      pixiRefs.graphics.moveTo(line.point1.x, line.point1.y);
      pixiRefs.graphics.lineTo(line.point2.x, line.point2.y);
    });
    pixiRefs.graphics.stroke({ width: 2, color: 0xffffff });
  }
};
