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
  } else if (defaultConfig.particlePredefinedEffect === "animatedHelloWord") {
    animateHelloWord(defaultConfig);
  } else if (defaultConfig.particlePredefinedEffect === "starAnimations") {
    animateStarAnimations(defaultConfig);
  } else if (defaultConfig.particlePredefinedEffect === "coneAnimations") {
    animateCone(defaultConfig);
  }
};

export const animateWarp = ({ defaultConfig }) => {
  defaultConfig.emitterConfig.behaviours[3].warpSpeed = 0.001;
  pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
  const obj = {
    warpSpeed: defaultConfig.emitterConfig.behaviours[3].warpSpeed,
  };
  tween = gsap.to(obj, 4, {
    warpSpeed: defaultConfig.emitterConfig.behaviours[3].warpSpeed * 20,
    delay: 4,
    repeat: 0,
    onUpdate: () => {
      defaultConfig.emitterConfig.behaviours[3].warpSpeed = parseFloat(
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
  tween = gsap.to(defaultConfig.emitterConfig.behaviours[0].position, 1, {
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

const animateHelloWord = async (defaultConfig) => {
  const words = [
    "Hola", // Spanish
    "Bonjour", // French
    "Hallo", // German
    "Ciao", // Italian
    "Olá", // Portuguese
    "Привет", // Russian
    "こんにちは", // Japanese (Konnichiwa)
    "你好", // Chinese (Nǐ hǎo)
    "안녕하세요", // Korean (Annyeonghaseyo)
    "Merhaba", // Turkish
    "سلام", // Arabic (Salam)
    "नमस्ते", // Hindi (Namaste)
    "Sawubona", // Zulu
    "Γειά σου", // Greek (Yia sou)
    "Shalom", // Hebrew
    "Halo", // Indonesian
    "Hei", // Norwegian/Finnish
    "Ahoj", // Czech
    "Hej", // Swedish
    "Halló", // Icelandic
    "Terve", // Finnish
    "Здраво", // Serbian/Macedonian (Zdravo)
    "Habari", // Swahili
    "Mingalaba", // Burmese
    "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", // Punjabi (Sat Sri Akal)
    "Selamat", // Malay
    "Dzień dobry", // Polish
    "Sveiki", // Latvian
    "Përshëndetje", // Albanian
    "สวัสดี", // Thai (Sawasdee)
    "Hallo", // Dutch
    "Hujambo", // Swahili
    "Saluton", // Esperanto
    "Tashi Delek", // Tibetan
    "Hello", // English
  ];

  if (tween) {
    killTween();
  }

  // Helper function for tween animations
  const animateVelocityVariance = (x, y, duration = 2) => {
    return new Promise((resolve) => {
      const obj = { x, y };
      tween = gsap.to(obj, {
        x,
        y,
        duration,
        onUpdate: () => {
          defaultConfig.emitterConfig.behaviours[2].velocityVariance = {
            x: obj.x,
            y: obj.y,
          };
          pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
        },
        onComplete: resolve,
      });
    });
  };

  // Helper function for delays
  const delay = (seconds) => {
    return new Promise((resolve) => {
      tween = gsap.delayedCall(seconds, resolve);
    });
  };

  const animate = async () => {
    for (const word of words) {
      await delay(1); // Delay before animation
      await animateVelocityVariance(0, 0); // Animate to zero velocity
      await delay(1); // Delay before next animation
      await animateVelocityVariance(200, 200); // Animate to target velocity

      // Update the word and refresh the particles
      defaultConfig.emitterConfig.behaviours[0].word = word;
      pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
    }
  };

  // Main animation loop
  await animate();
  await animate();
  await animate();
  await animate();
  await animate();
  await animate();
};

const animateStarAnimations = async (defaultConfig) => {
  if (tween) {
    killTween();
  }

  // Helper function for delays
  const delay = (seconds) => {
    return new Promise((resolve) => {
      tween = gsap.delayedCall(seconds, resolve);
    });
  };

  // Main animation loop
  for (let i = 3; i < 20; i++) {
    await delay(2); // Delay before animation
    defaultConfig.emitterConfig.behaviours[1].starPoints = i;
    pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
  }
};

const animateCone = async (defaultConfig) => {
  if (tween) {
    killTween();
  }
  const obj = {
    coneDirection: defaultConfig.emitterConfig.behaviours[1].coneDirection,
  };
  tween = gsap.to(obj, 10, {
    coneDirection: 360,
    repeat: -1,
    ease: "linear",
    onUpdate: () => {
      defaultConfig.emitterConfig.behaviours[1].coneDirection = parseFloat(
        obj.coneDirection,
      );
      pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
    },
  });
};
