import { gsap, Linear, Power2 } from "gsap";
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
  } else if (defaultConfig.particlePredefinedEffect === "spiralAnimation") {
    animateSpiral(defaultConfig);
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

  const obj = { x: behaviour.position.x, y: behaviour.position.y };
  tween = gsap.to(obj, speed, {
    x: -300,
    y: 300,
    ease: Linear.easeNone,
    onUpdate: () => {
      behaviour.position.x = obj.x;
      behaviour.position.y = obj.y;
      pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
    },
    onComplete: () => {
      tween = gsap.to(obj, speed, {
        x: 300,
        y: 300,
        ease: Linear.easeNone,
        onUpdate: () => {
          behaviour.position.x = obj.x;
          behaviour.position.y = obj.y;
          pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
        },
        onComplete: () => {
          tween = gsap.to(obj, speed, {
            x: 300,
            y: -300,
            ease: Linear.easeNone,
            onUpdate: () => {
              behaviour.position.x = obj.x;
              behaviour.position.y = obj.y;
              pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
            },
            onComplete: () => {
              tween = gsap.to(obj, speed, {
                x: -300,
                y: -300,
                ease: Linear.easeNone,
                onUpdate: () => {
                  behaviour.position.x = obj.x;
                  behaviour.position.y = obj.y;
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

  const obj = { x: behaviour.position.x, y: behaviour.position.y };
  tween = gsap.to(obj, speed, {
    x: -300,
    y: 300,
    ease: Linear.easeNone,
    onUpdate: () => {
      behaviour.position.x = obj.x;
      behaviour.position.y = obj.y;
      pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
    },
    onComplete: () => {
      tween = gsap.to(obj, speed, {
        x: 300,
        y: 300,
        ease: Linear.easeNone,
        onUpdate: () => {
          behaviour.position.x = obj.x;
          behaviour.position.y = obj.y;
          pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
        },
        onComplete: () => {
          tween = gsap.to(obj, speed, {
            x: 300,
            y: -300,
            ease: Linear.easeNone,
            onUpdate: () => {
              behaviour.position.x = obj.x;
              behaviour.position.y = obj.y;
              pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
            },
            onComplete: () => {
              tween = gsap.to(obj, speed, {
                x: -300,
                y: -300,
                ease: Linear.easeNone,
                onUpdate: () => {
                  behaviour.position.x = obj.x;
                  behaviour.position.y = obj.y;
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

  const obj = { x: behaviour.position.x, y: behaviour.position.y };
  tween = gsap.to(obj, speed, {
    x: -300,
    y: 300,
    ease: Linear.easeNone,
    onUpdate: () => {
      behaviour.position.x = obj.x;
      behaviour.position.y = obj.y;
      pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
    },
    onComplete: () => {
      tween = gsap.to(obj, speed, {
        x: 300,
        y: 300,
        ease: Linear.easeNone,
        onUpdate: () => {
          behaviour.position.x = obj.x;
          behaviour.position.y = obj.y;
          pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
        },
        onComplete: () => {
          tween = gsap.to(obj, speed, {
            x: 300,
            y: -300,
            ease: Linear.easeNone,
            onUpdate: () => {
              behaviour.position.x = obj.x;
              behaviour.position.y = obj.y;
              pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
            },
            onComplete: () => {
              tween = gsap.to(obj, speed, {
                x: -300,
                y: -300,
                ease: Linear.easeNone,
                onUpdate: () => {
                  behaviour.position.x = obj.x;
                  behaviour.position.y = obj.y;
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

  const obj = {
    x: behaviour.position.x,
    y: behaviour.position.y,
  };
  tween = gsap.to(obj, 1, {
    x: -200,
    y: 200,
    ease: Linear.easeNone,
    onUpdate: () => {
      behaviour.position.x = obj.x;
      behaviour.position.y = obj.y;
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

const animateSpiral = async (defaultConfig) => {
  const spawnBehaviour = getBehaviourByName("SpawnBehaviour", defaultConfig)
    .customPoints[0];
  const noiseBasedMotionBehaviour = getBehaviourByName(
    "NoiseBasedMotionBehaviour",
    defaultConfig,
  );

  if (tween) {
    killTween();
  }
  const obj = {
    x: 0,
    y: 0,
  };

  const centerX = 0; // Center of the spiral (X-axis)
  const centerY = 0; // Center of the spiral (Y-axis)
  const startRadius = 350; // Starting radius
  const endRadius = 10; // Ending radius
  const totalTime = 9; // Total animation time (in seconds)
  const totalLoops = 10; // Number of full rotations

  // Animate the sprite along a spiral
  gsap.to(obj, {
    duration: totalTime,
    ease: Power2.easeIn, // Ease that starts slow and speeds up
    onUpdate: function () {
      // Calculate the current progress
      const easedProgress = gsap.parseEase("power2.inOut")(this.progress());

      // Use eased progress for angular velocity
      const angle = easedProgress * totalLoops * 2 * Math.PI; // Current angle in radians
      const radius = startRadius - easedProgress * (startRadius - endRadius); // Interpolated radius

      // Update the sprite's position
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      // Update position using your custom function
      pixiRefs.particles.updatePosition({ x, y });
    },
    onComplete: function () {
      defaultConfig.emitterConfig.duration = 0.1;
      noiseBasedMotionBehaviour.noiseIntensity = 4000;
      pixiRefs.particles.updateConfig(defaultConfig.emitterConfig);
    },
  });
};
