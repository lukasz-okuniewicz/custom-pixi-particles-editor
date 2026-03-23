import { _customPixiParticlesEditorOnly, MetaballPass } from "custom-pixi-particles";
import pixiRefs from "@pixi/pixiRefs";
import { getConfigSafeForLibrary } from "@utils";
import { METABALL_PASS_DEFAULTS } from "@config/metaballPassDefaults";

export const createParticles = (defaultConfig) => {
  if (!defaultConfig) return;
  const safeConfig = getConfigSafeForLibrary(defaultConfig);
  const particles = _customPixiParticlesEditorOnly.create({
    ...safeConfig,
    canvasSizeProvider: () => ({
      width: pixiRefs.app?.renderer?.width ?? 1334,
      height: pixiRefs.app?.renderer?.height ?? 750,
    }),
  });
  particles.play();
  pixiRefs.particles = particles;
  pixiRefs.particlesArr.push(particles);

  const mbRaw = defaultConfig.metaballPass;
  const useMetaball =
    mbRaw != null &&
    typeof mbRaw === "object" &&
    !Array.isArray(mbRaw) &&
    typeof MetaballPass === "function";
  const renderer = pixiRefs.app?.renderer;
  if (useMetaball && renderer) {
    const mb = { ...METABALL_PASS_DEFAULTS, ...mbRaw };
    const pass = new MetaballPass({
      renderer,
      width: mb.width,
      height: mb.height,
      resolutionScale: mb.resolutionScale,
      blurStrength: mb.blurStrength,
      threshold: mb.threshold,
      edgeSoftness: mb.edgeSoftness,
      clearColor: mb.clearColor,
    });
    pass.source.addChild(particles);
    pixiRefs.particlesContainer.addChild(pass);
    pixiRefs.metaballPassInstance = pass;
  } else {
    pixiRefs.particlesContainer.addChild(particles);
  }
};

export const updateParticles = (defaultConfig) => {
  if (!defaultConfig) return;
  const safeConfig = getConfigSafeForLibrary(defaultConfig);
  pixiRefs.particles.updateConfig(safeConfig.emitterConfig);

  const links = safeConfig.particleLinks;
  if (links === undefined) return;

  const applyParticleLinks = (emitter) => {
    if (emitter && typeof emitter.setParticleLinks === "function") {
      emitter.setParticleLinks(links);
    }
  };

  applyParticleLinks(pixiRefs.particles);
  pixiRefs.particlesArr.forEach((emitter) => {
    if (emitter !== pixiRefs.particles) {
      applyParticleLinks(emitter);
    }
  });
};

export const createAndAddParticles = (config, parent, options = {}) => {
  const safeConfig = getConfigSafeForLibrary(
    JSON.parse(JSON.stringify(config)),
  );
  const particles = _customPixiParticlesEditorOnly.create({
    ...safeConfig,
    canvasSizeProvider: () => ({
      width: pixiRefs.app?.renderer?.width ?? 1334,
      height: pixiRefs.app?.renderer?.height ?? 750,
    }),
  });
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
  if (pixiRefs.metaballPassInstance) {
    pixiRefs.metaballPassInstance.destroy();
    pixiRefs.metaballPassInstance = null;
  }
  pixiRefs.particlesContainer.removeChildren();
};
