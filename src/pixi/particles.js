import { _customPixiParticlesEditorOnly } from "custom-pixi-particles";
import pixiRefs from "@pixi/pixiRefs";

export const createParticles = (defaultConfig) => {
  if (!defaultConfig) return;
  const particles = _customPixiParticlesEditorOnly.create(defaultConfig);
  particles.play();
  pixiRefs.particles = particles;
  pixiRefs.particlesArr.push(particles);
  pixiRefs.particlesContainer.addChild(particles);
};

export const updateParticles = (defaultConfig) => {
  if (!defaultConfig) return;
  pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
};

export const createAndAddParticles = (config, parent, options = {}) => {
  const particleConfig = JSON.parse(JSON.stringify(config));
  const particles = _customPixiParticlesEditorOnly.create(particleConfig);
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
