import { gsap, Linear, Power2 } from "gsap";
import pixiRefs from "@pixi/pixiRefs";
import { getBehaviourByName } from "@utils";


let tween = null;
let updateConfigRafId = 0;
let pendingEmitterConfig = null;
let animationRunId = 0;
const activeGsapHandles = new Set();

const nextAnimationRunId = () => {
  animationRunId += 1;
  return animationRunId;
};

const clearPendingEmitterConfigUpdate = () => {
  if (typeof window !== "undefined" && updateConfigRafId) {
    window.cancelAnimationFrame(updateConfigRafId);
  }
  updateConfigRafId = 0;
  pendingEmitterConfig = null;
};

const trackGsapHandle = (handle) => {
  if (!handle || typeof handle.kill !== "function") return handle;

  activeGsapHandles.add(handle);
  const cleanup = () => {
    activeGsapHandles.delete(handle);
  };

  if (typeof handle.eventCallback === "function") {
    const prevComplete = handle.eventCallback("onComplete");
    handle.eventCallback("onComplete", function (...args) {
      cleanup();
      if (typeof prevComplete === "function") {
        prevComplete.apply(this, args);
      }
    });

    const prevInterrupt = handle.eventCallback("onInterrupt");
    handle.eventCallback("onInterrupt", function (...args) {
      cleanup();
      if (typeof prevInterrupt === "function") {
        prevInterrupt.apply(this, args);
      }
    });
  }

  return handle;
};

const createTween = (...args) => trackGsapHandle(gsap.to(...args));
const createDelayedCall = (...args) => trackGsapHandle(gsap.delayedCall(...args));

const isRunCurrent = (runId) => runId === animationRunId;

const dedupeBehavioursByName = (emitterConfig) => {
  if (!emitterConfig || !Array.isArray(emitterConfig.behaviours)) {
    return emitterConfig;
  }
  const seen = new Set();
  emitterConfig.behaviours = emitterConfig.behaviours.filter((b) => {
    const name = b?.name;
    if (!name) return false;
    if (seen.has(name)) return false;
    seen.add(name);
    return true;
  });
  return emitterConfig;
};

const updateEmitterConfig = (emitterConfig, force = false) => {
  if (!pixiRefs.particles) return;
  dedupeBehavioursByName(emitterConfig);
  if (force || typeof window === "undefined") {
    if (updateConfigRafId) {
      window.cancelAnimationFrame(updateConfigRafId);
      updateConfigRafId = 0;
      pendingEmitterConfig = null;
    }
    pixiRefs.particles.updateConfig(emitterConfig, force);
    return;
  }
  pendingEmitterConfig = emitterConfig;
  if (updateConfigRafId) return;
  updateConfigRafId = window.requestAnimationFrame(() => {
    updateConfigRafId = 0;
    if (!pendingEmitterConfig || !pixiRefs.particles) return;
    const next = pendingEmitterConfig;
    pendingEmitterConfig = null;
    pixiRefs.particles.updateConfig(next);
  });
};

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
  const behaviour = getBehaviourByName("WarpBehaviour", defaultConfig);

  behaviour.warpSpeed = 0.001;
  updateEmitterConfig(defaultConfig.emitterConfig);
  const obj = {
    warpSpeed: behaviour.warpSpeed,
  };
  tween = createTween(obj, 4, {
    warpSpeed: behaviour.warpSpeed * 20,
    delay: 4,
    repeat: 0,
    onUpdate: () => {
      behaviour.warpSpeed = parseFloat(obj.warpSpeed);
      updateEmitterConfig(defaultConfig.emitterConfig);
    },
    onComplete: () => animateWarpStop({ defaultConfig }),
  });
};

const animateWarpStop = ({ defaultConfig }) => {
  const behaviour = getBehaviourByName("WarpBehaviour", defaultConfig);

  killTween();
  const obj = {
    warpSpeed: behaviour.warpSpeed,
  };
  tween = createTween(obj, 2, {
    warpSpeed: 0.001,
    delay: 2,
    repeat: 0,
    onUpdate: () => {
      behaviour.warpSpeed = parseFloat(obj.warpSpeed);
      updateEmitterConfig(defaultConfig.emitterConfig);
    },
    onComplete: () => animateWarp({ defaultConfig }),
  });
};

export const killTween = () => {
  if (tween && typeof tween.kill === "function") {
    tween.kill();
  }
  activeGsapHandles.forEach((handle) => {
    if (handle && typeof handle.kill === "function") {
      handle.kill();
    }
  });
  activeGsapHandles.clear();
  tween = null;
};

export const stopAllAnimationsNow = () => {
  nextAnimationRunId();
  killTween();
  clearPendingEmitterConfigUpdate();
};

const animateFlyingFire = (defaultConfig, fullConfig, speed) => {
  const behaviour = getBehaviourByName("SpawnBehaviour", defaultConfig)
    .customPoints[0];

  const obj = { x: behaviour.position.x, y: behaviour.position.y };
  tween = createTween(obj, speed, {
    x: -300,
    y: 300,
    ease: Linear.easeNone,
    onUpdate: () => {
      behaviour.position.x = obj.x;
      behaviour.position.y = obj.y;
      updateEmitterConfig(defaultConfig.emitterConfig);
    },
    onComplete: () => {
      tween = createTween(obj, speed, {
        x: 300,
        y: 300,
        ease: Linear.easeNone,
        onUpdate: () => {
          behaviour.position.x = obj.x;
          behaviour.position.y = obj.y;
          updateEmitterConfig(defaultConfig.emitterConfig);
        },
        onComplete: () => {
          tween = createTween(obj, speed, {
            x: 300,
            y: -300,
            ease: Linear.easeNone,
            onUpdate: () => {
              behaviour.position.x = obj.x;
              behaviour.position.y = obj.y;
              updateEmitterConfig(defaultConfig.emitterConfig);
            },
            onComplete: () => {
              tween = createTween(obj, speed, {
                x: -300,
                y: -300,
                ease: Linear.easeNone,
                onUpdate: () => {
                  behaviour.position.x = obj.x;
                  behaviour.position.y = obj.y;
                  updateEmitterConfig(defaultConfig.emitterConfig);
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
  tween = createTween(obj, speed, {
    x: -300,
    y: 300,
    ease: Linear.easeNone,
    onUpdate: () => {
      behaviour.position.x = obj.x;
      behaviour.position.y = obj.y;
      updateEmitterConfig(defaultConfig.emitterConfig);
    },
    onComplete: () => {
      tween = createTween(obj, speed, {
        x: 300,
        y: 300,
        ease: Linear.easeNone,
        onUpdate: () => {
          behaviour.position.x = obj.x;
          behaviour.position.y = obj.y;
          updateEmitterConfig(defaultConfig.emitterConfig);
        },
        onComplete: () => {
          tween = createTween(obj, speed, {
            x: 300,
            y: -300,
            ease: Linear.easeNone,
            onUpdate: () => {
              behaviour.position.x = obj.x;
              behaviour.position.y = obj.y;
              updateEmitterConfig(defaultConfig.emitterConfig);
            },
            onComplete: () => {
              tween = createTween(obj, speed, {
                x: -300,
                y: -300,
                ease: Linear.easeNone,
                onUpdate: () => {
                  behaviour.position.x = obj.x;
                  behaviour.position.y = obj.y;
                  updateEmitterConfig(defaultConfig.emitterConfig);
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
  tween = createTween(obj, speed, {
    x: -300,
    y: 300,
    ease: Linear.easeNone,
    onUpdate: () => {
      behaviour.position.x = obj.x;
      behaviour.position.y = obj.y;
      updateEmitterConfig(defaultConfig.emitterConfig);
    },
    onComplete: () => {
      tween = createTween(obj, speed, {
        x: 300,
        y: 300,
        ease: Linear.easeNone,
        onUpdate: () => {
          behaviour.position.x = obj.x;
          behaviour.position.y = obj.y;
          updateEmitterConfig(defaultConfig.emitterConfig);
        },
        onComplete: () => {
          tween = createTween(obj, speed, {
            x: 300,
            y: -300,
            ease: Linear.easeNone,
            onUpdate: () => {
              behaviour.position.x = obj.x;
              behaviour.position.y = obj.y;
              updateEmitterConfig(defaultConfig.emitterConfig);
            },
            onComplete: () => {
              tween = createTween(obj, speed, {
                x: -300,
                y: -300,
                ease: Linear.easeNone,
                onUpdate: () => {
                  behaviour.position.x = obj.x;
                  behaviour.position.y = obj.y;
                  updateEmitterConfig(defaultConfig.emitterConfig);
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
  tween = createTween(obj, 1, {
    x: -200,
    y: 200,
    ease: Linear.easeNone,
    onUpdate: () => {
      behaviour.position.x = obj.x;
      behaviour.position.y = obj.y;
      updateEmitterConfig(defaultConfig.emitterConfig);
    },
    onComplete: () => {
      updateEmitterConfig(
        fullConfig.explosionForMeteor.emitterConfig,
        true,
      );
    },
  });
};

const animateHelloWord = async (defaultConfig) => {
  const runId = nextAnimationRunId();
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
      tween = createTween(obj, {
        x,
        y,
        duration,
        onUpdate: () => {
          if (!isRunCurrent(runId)) return;
          behaviour.velocityVariance = {
            x: obj.x,
            y: obj.y,
          };
          updateEmitterConfig(defaultConfig.emitterConfig);
        },
        onComplete: resolve,
      });
    });
  };

  // Helper function for delays
  const delay = (seconds) => {
    return new Promise((resolve) => {
      tween = createDelayedCall(seconds, resolve);
    });
  };

  const animate = async () => {
    const behaviour = getBehaviourByName("SpawnBehaviour", defaultConfig)
      .customPoints[0];

    for (const word of words) {
      if (!isRunCurrent(runId)) return;
      await delay(1); // Delay before animation
      if (!isRunCurrent(runId)) return;
      await animateVelocityVariance(0, 0); // Animate to zero velocity
      if (!isRunCurrent(runId)) return;
      await delay(1); // Delay before next animation
      if (!isRunCurrent(runId)) return;
      await animateVelocityVariance(200, 200); // Animate to target velocity

      // Update the word and refresh the particles
      if (!isRunCurrent(runId)) return;
      behaviour.word = word;
      updateEmitterConfig(defaultConfig.emitterConfig);
    }
  };

  // Main animation loop
  if (!isRunCurrent(runId)) return;
  await animate();
  if (!isRunCurrent(runId)) return;
  await animate();
  if (!isRunCurrent(runId)) return;
  await animate();
  if (!isRunCurrent(runId)) return;
  await animate();
  if (!isRunCurrent(runId)) return;
  await animate();
  if (!isRunCurrent(runId)) return;
  await animate();
};

const animateStarAnimations = async (defaultConfig) => {
  const runId = nextAnimationRunId();
  const behaviour = getBehaviourByName("SpawnBehaviour", defaultConfig)
    .customPoints[0];

  if (tween) {
    killTween();
  }

  // Helper function for delays
  const delay = (seconds) => {
    return new Promise((resolve) => {
      tween = createDelayedCall(seconds, resolve);
    });
  };

  // Main animation loop
  for (let i = 3; i < 20; i++) {
    if (!isRunCurrent(runId)) return;
    await delay(2); // Delay before animation
    if (!isRunCurrent(runId)) return;
    behaviour.starPoints = i;
    updateEmitterConfig(defaultConfig.emitterConfig);
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
  tween = createTween(obj, 10, {
    coneDirection: 360,
    repeat: -1,
    ease: "linear",
    onUpdate: () => {
      behaviour.coneDirection = parseFloat(obj.coneDirection);
      updateEmitterConfig(defaultConfig.emitterConfig);
    },
  });
};

const animateSpiral = async (defaultConfig) => {
  const spawn = getBehaviourByName("SpawnBehaviour", defaultConfig);
  const spawnBehaviour = Array.isArray(spawn?.customPoints)
    ? spawn.customPoints[0]
    : null;
  const noiseBasedMotionBehaviour = getBehaviourByName(
    "NoiseBasedMotionBehaviour",
    defaultConfig,
  );
  if (!spawnBehaviour) return;

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
  tween = createTween(obj, {
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
      if (noiseBasedMotionBehaviour) {
        noiseBasedMotionBehaviour.noiseIntensity = 4000;
      }
      updateEmitterConfig(defaultConfig.emitterConfig);
    },
  });
};
