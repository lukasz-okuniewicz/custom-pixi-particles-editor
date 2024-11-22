import { gsap, Linear } from "gsap";
import pixiRefs from "@pixi/pixiRefs";
import { getBehaviourByName } from "@utils";

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
  const behaviour = getBehaviourByName("PositionBehaviour", defaultConfig);

  behaviour.warpSpeed = 0.001;
  pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
  const obj = {
    warpSpeed: behaviour.warpSpeed,
  };
  tween = gsap.to(obj, 4, {
    warpSpeed: behaviour.warpSpeed * 20,
    delay: 4,
    repeat: 0,
    onUpdate: () => {
      behaviour.warpSpeed = parseFloat(obj.warpSpeed);
      pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
    },
    onComplete: () => animateWarpStop({ defaultConfig }),
  });
};

const animateWarpStop = ({ defaultConfig }) => {
  const behaviour = getBehaviourByName("PositionBehaviour", defaultConfig);

  killTween();
  const obj = {
    warpSpeed: behaviour.warpSpeed,
  };
  tween = gsap.to(obj, 2, {
    warpSpeed: 0.001,
    delay: 2,
    repeat: 0,
    onUpdate: () => {
      behaviour.warpSpeed = parseFloat(obj.warpSpeed);
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
  const behaviour = getBehaviourByName("SpawnBehaviour", defaultConfig)
    .customPoints[0];

  tween = gsap.to(behaviour.position, speed, {
    x: -300,
    y: 300,
    ease: Linear.easeNone,
    onUpdate: () => {
      pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
    },
    onComplete: () => {
      tween = gsap.to(behaviour.position, speed, {
        x: 300,
        y: 300,
        ease: Linear.easeNone,
        onUpdate: () => {
          pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
        },
        onComplete: () => {
          tween = gsap.to(behaviour.position, speed, {
            x: 300,
            y: -300,
            ease: Linear.easeNone,
            onUpdate: () => {
              pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
            },
            onComplete: () => {
              tween = gsap.to(behaviour.position, speed, {
                x: -300,
                y: -300,
                ease: Linear.easeNone,
                onUpdate: () => {
                  pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
                },
                onComplete: () => {
                  animateTween(defaultConfig, fullConfig);
                },
              });
            },
          });
        },
      });
    },
  });
};

const animateFlyingFountain = (defaultConfig, fullConfig, speed) => {
  const behaviour = getBehaviourByName("SpawnBehaviour", defaultConfig)
    .customPoints[0];

  tween = gsap.to(behaviour.position, speed, {
    x: -300,
    y: 300,
    ease: Linear.easeNone,
    onUpdate: () => {
      pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
    },
    onComplete: () => {
      tween = gsap.to(behaviour.position, speed, {
        x: 300,
        y: 300,
        ease: Linear.easeNone,
        onUpdate: () => {
          pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
        },
        onComplete: () => {
          tween = gsap.to(behaviour.position, speed, {
            x: 300,
            y: -300,
            ease: Linear.easeNone,
            onUpdate: () => {
              pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
            },
            onComplete: () => {
              tween = gsap.to(behaviour.position, speed, {
                x: -300,
                y: -300,
                ease: Linear.easeNone,
                onUpdate: () => {
                  pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
                },
                onComplete: () => {
                  animateTween(defaultConfig, fullConfig);
                },
              });
            },
          });
        },
      });
    },
  });
};

const animateFlyingBubbles = (defaultConfig, fullConfig, speed) => {
  const behaviour = getBehaviourByName("SpawnBehaviour", defaultConfig)
    .customPoints[0];

  tween = gsap.to(behaviour.position, speed, {
    x: -300,
    y: 300,
    ease: Linear.easeNone,
    onUpdate: () => {
      pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
    },
    onComplete: () => {
      tween = gsap.to(behaviour.position, speed, {
        x: 300,
        y: 300,
        ease: Linear.easeNone,
        onUpdate: () => {
          pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
        },
        onComplete: () => {
          tween = gsap.to(behaviour.position, speed, {
            x: 300,
            y: -300,
            ease: Linear.easeNone,
            onUpdate: () => {
              pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
            },
            onComplete: () => {
              tween = gsap.to(behaviour.position, speed, {
                x: -300,
                y: -300,
                ease: Linear.easeNone,
                onUpdate: () => {
                  pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
                },
                onComplete: () => {
                  animateTween(defaultConfig, fullConfig);
                },
              });
            },
          });
        },
      });
    },
  });
};

const animateMeteor = (defaultConfig, fullConfig) => {
  const behaviour = getBehaviourByName("SpawnBehaviour", defaultConfig)
    .customPoints[0];

  tween = gsap.to(behaviour.position, 1, {
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
    const behaviour = getBehaviourByName("PositionBehaviour", defaultConfig);

    return new Promise((resolve) => {
      const obj = { x, y };
      tween = gsap.to(obj, {
        x,
        y,
        duration,
        onUpdate: () => {
          behaviour.velocityVariance = {
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
    const behaviour = getBehaviourByName("SpawnBehaviour", defaultConfig)
      .customPoints[0];

    for (const word of words) {
      await delay(1); // Delay before animation
      await animateVelocityVariance(0, 0); // Animate to zero velocity
      await delay(1); // Delay before next animation
      await animateVelocityVariance(200, 200); // Animate to target velocity

      // Update the word and refresh the particles
      behaviour.word = word;
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
  const behaviour = getBehaviourByName("SpawnBehaviour", defaultConfig)
    .customPoints[0];

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
    behaviour.starPoints = i;
    pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
  }
};

const animateCone = async (defaultConfig) => {
  const behaviour = getBehaviourByName("SpawnBehaviour", defaultConfig)
    .customPoints[0];

  if (tween) {
    killTween();
  }
  const obj = {
    coneDirection: behaviour.coneDirection,
  };
  tween = gsap.to(obj, 10, {
    coneDirection: 360,
    repeat: -1,
    ease: "linear",
    onUpdate: () => {
      behaviour.coneDirection = parseFloat(obj.coneDirection);
      pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
    },
  });
};
