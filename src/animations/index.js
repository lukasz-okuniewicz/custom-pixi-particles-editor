import { gsap, Linear } from "gsap";
import pixiRefs from "@pixi/pixiRefs";

let tween = null;

export const animateTween = (defaultConfig, fullConfig) => {
  if (defaultConfig.particlePredefinedEffect === "flyingFire") {
    animateFlyingFire(defaultConfig, fullConfig, 0.2);
  } else if (defaultConfig.particlePredefinedEffect === "flyingFountain") {
    animateFlyingFountain(defaultConfig, fullConfig, 0.2);
  } else if (defaultConfig.particlePredefinedEffect === "flyingBubbles") {
    animateFlyingBubbles(defaultConfig, fullConfig, 0.2);
  } else if (defaultConfig.particlePredefinedEffect === "meteor") {
    animateMeteor(defaultConfig, fullConfig);
  }
};

export const animateWarp = ({ defaultConfig }) => {
  defaultConfig.emitterConfig.behaviours[2].warpSpeed = 0.001;
  pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
  const obj = {
    warpSpeed: defaultConfig.emitterConfig.behaviours[2].warpSpeed,
  };
  tween = gsap.to(obj, 4, {
    warpSpeed: defaultConfig.emitterConfig.behaviours[2].warpSpeed * 20,
    delay: 4,
    repeat: 0,
    onUpdate: () => {
      defaultConfig.emitterConfig.behaviours[2].warpSpeed = parseFloat(
        obj.warpSpeed,
      );
      pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
    },
    onComplete: () => animateWarpStop({ defaultConfig }),
  });
};

const animateWarpStop = ({ defaultConfig }) => {
  killTween();
  const obj = {
    warpSpeed: defaultConfig.emitterConfig.behaviours[2].warpSpeed,
  };
  tween = gsap.to(obj, 2, {
    warpSpeed: 0.001,
    delay: 2,
    repeat: 0,
    onUpdate: () => {
      defaultConfig.emitterConfig.behaviours[2].warpSpeed = parseFloat(
        obj.warpSpeed,
      );
      pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
    },
    onComplete: () => animateWarp({ defaultConfig }),
  });
};

export const killTween = () => {
  if (!tween) return;
  tween.kill();
};

const animateFlyingFire = (defaultConfig, fullConfig, speed) => {
  tween = gsap.to(defaultConfig.emitterConfig.behaviours[1].position, speed, {
    x: -300,
    y: 300,
    ease: Linear.easeNone,
    onUpdate: () => {
      pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
    },
    onComplete: () => {
      tween = gsap.to(
        defaultConfig.emitterConfig.behaviours[1].position,
        speed,
        {
          x: 300,
          y: 300,
          ease: Linear.easeNone,
          onUpdate: () => {
            pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
          },
          onComplete: () => {
            tween = gsap.to(
              defaultConfig.emitterConfig.behaviours[1].position,
              speed,
              {
                x: 300,
                y: -300,
                ease: Linear.easeNone,
                onUpdate: () => {
                  pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
                },
                onComplete: () => {
                  tween = gsap.to(
                    defaultConfig.emitterConfig.behaviours[1].position,
                    speed,
                    {
                      x: -300,
                      y: -300,
                      ease: Linear.easeNone,
                      onUpdate: () => {
                        pixiRefs.particles.updateConfig(
                          defaultConfig.emitterConfig,
                        );
                      },
                      onComplete: () => {
                        animateTween(defaultConfig, fullConfig);
                      },
                    },
                  );
                },
              },
            );
          },
        },
      );
    },
  });
};

const animateFlyingFountain = (defaultConfig, fullConfig, speed) => {
  tween = gsap.to(defaultConfig.emitterConfig.behaviours[1].position, speed, {
    x: -300,
    y: 300,
    ease: Linear.easeNone,
    onUpdate: () => {
      pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
    },
    onComplete: () => {
      tween = gsap.to(
        defaultConfig.emitterConfig.behaviours[1].position,
        speed,
        {
          x: 300,
          y: 300,
          ease: Linear.easeNone,
          onUpdate: () => {
            pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
          },
          onComplete: () => {
            tween = gsap.to(
              defaultConfig.emitterConfig.behaviours[1].position,
              speed,
              {
                x: 300,
                y: -300,
                ease: Linear.easeNone,
                onUpdate: () => {
                  pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
                },
                onComplete: () => {
                  tween = gsap.to(
                    defaultConfig.emitterConfig.behaviours[1].position,
                    speed,
                    {
                      x: -300,
                      y: -300,
                      ease: Linear.easeNone,
                      onUpdate: () => {
                        pixiRefs.particles.updateConfig(
                          defaultConfig.emitterConfig,
                        );
                      },
                      onComplete: () => {
                        animateTween(defaultConfig, fullConfig);
                      },
                    },
                  );
                },
              },
            );
          },
        },
      );
    },
  });
};

const animateFlyingBubbles = (defaultConfig, fullConfig, speed) => {
  tween = gsap.to(defaultConfig.emitterConfig.behaviours[1].position, speed, {
    x: -300,
    y: 300,
    ease: Linear.easeNone,
    onUpdate: () => {
      pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
    },
    onComplete: () => {
      tween = gsap.to(
        defaultConfig.emitterConfig.behaviours[1].position,
        speed,
        {
          x: 300,
          y: 300,
          ease: Linear.easeNone,
          onUpdate: () => {
            pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
          },
          onComplete: () => {
            tween = gsap.to(
              defaultConfig.emitterConfig.behaviours[1].position,
              speed,
              {
                x: 300,
                y: -300,
                ease: Linear.easeNone,
                onUpdate: () => {
                  pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
                },
                onComplete: () => {
                  tween = gsap.to(
                    defaultConfig.emitterConfig.behaviours[1].position,
                    speed,
                    {
                      x: -300,
                      y: -300,
                      ease: Linear.easeNone,
                      onUpdate: () => {
                        pixiRefs.particles.updateConfig(
                          defaultConfig.emitterConfig,
                        );
                      },
                      onComplete: () => {
                        animateTween(defaultConfig, fullConfig);
                      },
                    },
                  );
                },
              },
            );
          },
        },
      );
    },
  });
};

const animateMeteor = (defaultConfig, fullConfig) => {
  tween = gsap.to(defaultConfig.emitterConfig.behaviours[1].position, 1, {
    x: -200,
    y: 200,
    ease: Linear.easeNone,
    onUpdate: () => {
      pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
    },
    onComplete: () => {
      pixiRefs.particles.updateConfig(
        fullConfig.explosionForMeteor.emitterConfig,
        true,
      );
    },
  });
};
