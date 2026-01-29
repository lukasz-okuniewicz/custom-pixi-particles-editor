import { _customPixiParticlesEditorOnly } from "custom-pixi-particles";
import pixiRefs from "@pixi/pixiRefs";
import { getConfigSafeForLibrary } from "@utils";

export const createParticles = (defaultConfig) => {
  if (!defaultConfig) return;
  const safeConfig = getConfigSafeForLibrary(defaultConfig);
  const particles = _customPixiParticlesEditorOnly.create(safeConfig);
  particles.play();
  pixiRefs.particles = particles;
  pixiRefs.particlesArr.push(particles);
  pixiRefs.particlesContainer.addChild(particles);
};

export const updateParticles = (defaultConfig) => {
  if (!defaultConfig) return;
  const safeConfig = getConfigSafeForLibrary(defaultConfig);
  pixiRefs.particles.updateConfig(safeConfig.emitterConfig);
};

export const createAndAddParticles = (config, parent, options = {}) => {
  const safeConfig = getConfigSafeForLibrary(
    JSON.parse(JSON.stringify(config)),
  );
  const particles = _customPixiParticlesEditorOnly.create(safeConfig);
  if (options.position) {
    particles.position.set(options.position.x, options.position.y);
  }
  parent.addChild(particles);
  particles.play();
  pixiRefs.particlesArr.push(particles);
  return particles;
};

export const stopAllParticlesArr = () => {
  pixiRefs.particlesArr.forEach((particle) => {
    particle.stopImmediately();
  });
  pixiRefs.particlesArr = [];
  pixiRefs.particlesContainer.removeChildren();
};
