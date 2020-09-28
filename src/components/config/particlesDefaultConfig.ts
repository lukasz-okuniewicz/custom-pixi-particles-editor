export default class ParticlesDefaultConfig {
  liquid = {
    emitterConfig: {
      behaviours: [
        {
          priority: 10000,
          enabled: true,
          maxLifeTime: 10,
          timeVariance: 0,
          name: 'LifeBehaviour',
        },
        {
          priority: 100,
          enabled: true,
          position: {
            x: 0,
            y: 0,
          },
          positionVariance: {
            x: 500,
            y: 500,
          },
          velocity: {
            x: 21,
            y: 21,
          },
          velocityVariance: {
            x: 87,
            y: 110,
          },
          acceleration: {
            x: -10,
            y: 0,
          },
          accelerationVariance: {
            x: 0,
            y: 0,
          },
          name: 'PositionBehaviour',
        },
        {
          priority: 0,
          enabled: true,
          allowNegativeValues: false,
          sizeStart: {
            x: 1,
            y: 1,
          },
          sizeEnd: {
            x: 0,
            y: 0,
          },
          startVariance: 1,
          endVariance: 0,
          name: 'SizeBehaviour',
        },
        {
          priority: 0,
          enabled: true,
          start: {
            _r: 110,
            _g: 255,
            _b: 110,
            _alpha: 1,
          },
          end: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 1,
          },
          startVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 1,
          },
          endVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          sinus: false,
          name: 'ColorBehaviour',
        },
        {
          priority: 0,
          enabled: true,
          showVortices: false,
          turbulence: false,
          position: {
            x: 0,
            y: 0,
          },
          positionVariance: {
            x: 500,
            y: 500,
          },
          velocity: {
            x: null,
            y: null,
          },
          velocityVariance: {
            x: 500,
            y: 500,
          },
          acceleration: {
            x: 0,
            y: 0,
          },
          accelerationVariance: {
            x: 0,
            y: 0,
          },
          sizeStart: {
            x: 1,
            y: 1,
          },
          sizeEnd: {
            x: 1,
            y: 1,
          },
          startVariance: 0,
          endVariance: 0,
          emitPerSecond: 5,
          duration: 0,
          maxLifeTime: 3,
          vortileSize: 500,
          name: 'TurbulenceBehaviour',
        },
      ],
      emitController: {
        _maxParticles: 0,
        _maxLife: 1,
        _emitPerSecond: 150,
        _frames: 0,
        name: 'UniformEmission',
      },
      duration: -1,
    },
    textures: ['cloud.png'],
  }
  firework = {
    emitterConfig: {
      behaviours: [
        {
          enabled: true,
          priority: 10000,
          maxLifeTime: 0.8,
          timeVariance: 0,
          name: 'LifeBehaviour',
        },
        {
          enabled: true,
          priority: 100,
          position: {
            x: 0,
            y: 0,
          },
          positionVariance: {
            x: 0,
            y: 0,
          },
          velocity: {
            x: 0,
            y: 0,
          },
          velocityVariance: {
            x: 500,
            y: 500,
          },
          acceleration: {
            x: 0,
            y: 500,
          },
          accelerationVariance: {
            x: 0,
            y: 0,
          },
          name: 'PositionBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          allowNegativeValues: false,
          sizeStart: {
            x: 1,
            y: 1,
          },
          sizeEnd: {
            x: 0,
            y: 0,
          },
          startVariance: 0,
          endVariance: 0,
          name: 'SizeBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          start: {
            _r: 255,
            _g: 0,
            _b: 0,
            _alpha: 1,
          },
          end: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 1,
          },
          startVariance: {
            _r: 255,
            _g: 255,
            _b: 255,
            _alpha: 1,
          },
          endVariance: {
            _r: 255,
            _g: 255,
            _b: 255,
            _alpha: 1,
          },
          name: 'ColorBehaviour',
        },
      ],
      emitController: {
        _maxParticles: 0,
        _maxLife: 1,
        _emitPerSecond: 500,
        _frames: 0,
      },
      duration: 0.2,
    },
    textures: ['sparkle.png'],
  }
  waterTurbulence = {
    emitterConfig: {
      behaviours: [
        {
          enabled: true,
          priority: 10000,
          maxLifeTime: 1.6,
          timeVariance: 0,
          name: 'LifeBehaviour',
        },
        {
          enabled: true,
          priority: 100,
          position: {
            x: 0,
            y: 400,
          },
          positionVariance: {
            x: 0,
            y: 0,
          },
          velocity: {
            x: -97,
            y: -800,
          },
          velocityVariance: {
            x: 80,
            y: 80,
          },
          acceleration: {
            x: 100,
            y: 600,
          },
          accelerationVariance: {
            x: 0,
            y: 150,
          },
          name: 'PositionBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          sizeStart: {
            x: 0.3,
            y: 0.3,
          },
          sizeEnd: {
            x: 0,
            y: 0,
          },
          startVariance: 0.2,
          endVariance: 0,
          name: 'SizeBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          start: {
            _r: 255,
            _g: 255,
            _b: 255,
            _alpha: 0,
          },
          end: {
            _r: 255,
            _g: 255,
            _b: 255,
            _alpha: 1,
          },
          startVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          endVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          name: 'ColorBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          rotation: 0,
          variance: 3.9983747833938095,
          name: 'RotationBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          position: {
            x: -30,
            y: 200,
          },
          positionVariance: {
            x: 0,
            y: 0,
          },
          velocity: {
            x: 0,
            y: -300,
          },
          velocityVariance: {
            x: 180,
            y: 80,
          },
          acceleration: {
            x: 0,
            y: 0,
          },
          accelerationVariance: {
            x: 0,
            y: 0,
          },
          sizeStart: {
            x: 2,
            y: 2,
          },
          sizeEnd: {
            x: 2,
            y: 2,
          },
          startVariance: 0,
          endVariance: 0,
          emitPerSecond: 2,
          duration: -1,
          maxLifeTime: 1.5,
          name: 'TurbulenceBehaviour',
        },
      ],
      emitController: {
        _maxParticles: 0,
        _maxLife: 1,
        _emitPerSecond: 100,
        _frames: 0,
        name: 'UniformEmission',
      },
      duration: -1,
    },
    textures: ['cloud2.png'],
  }
  water = {
    emitterConfig: {
      behaviours: [
        {
          enabled: true,
          priority: 10000,
          maxLifeTime: 1.6,
          timeVariance: 0,
          name: 'LifeBehaviour',
        },
        {
          enabled: true,
          priority: 100,
          position: {
            x: 0,
            y: 400,
          },
          positionVariance: {
            x: 0,
            y: 0,
          },
          velocity: {
            x: -97,
            y: -800,
          },
          velocityVariance: {
            x: 80,
            y: 80,
          },
          acceleration: {
            x: 100,
            y: 600,
          },
          accelerationVariance: {
            x: 0,
            y: 150,
          },
          name: 'PositionBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          sizeStart: {
            x: 0.3,
            y: 0.3,
          },
          sizeEnd: {
            x: 0,
            y: 0,
          },
          startVariance: 0.2,
          endVariance: 0,
          name: 'SizeBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          start: {
            _r: 255,
            _g: 255,
            _b: 255,
            _alpha: 0,
          },
          end: {
            _r: 255,
            _g: 255,
            _b: 255,
            _alpha: 1,
          },
          startVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          endVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          name: 'ColorBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          rotation: 0,
          variance: 3.9983747833938095,
          name: 'RotationBehaviour',
        },
      ],
      emitController: {
        _maxParticles: 0,
        _maxLife: 1,
        _emitPerSecond: 100,
        _frames: 0,
        name: 'UniformEmission',
      },
      duration: -1,
    },
    textures: ['cloud2.png'],
  }
  chaos = {
    emitterConfig: {
      behaviours: [
        {
          enabled: true,
          priority: 10000,
          maxLifeTime: 10,
          timeVariance: 0,
          name: 'LifeBehaviour',
        },
        {
          enabled: true,
          priority: 100,
          position: {
            x: 0,
            y: 0,
          },
          positionVariance: {
            x: 50,
            y: 50,
          },
          velocity: {
            x: 21,
            y: 21,
          },
          velocityVariance: {
            x: 110,
            y: 110,
          },
          acceleration: {
            x: 0,
            y: 0,
          },
          accelerationVariance: {
            x: 0,
            y: 0,
          },
          name: 'PositionBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          allowNegativeValues: false,
          sizeStart: {
            x: 1,
            y: 1,
          },
          sizeEnd: {
            x: 0,
            y: 0,
          },
          startVariance: 1,
          endVariance: 0,
          name: 'SizeBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          start: {
            _r: 110,
            _g: 255,
            _b: 110,
            _alpha: 1,
          },
          end: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 1,
          },
          startVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 1,
          },
          endVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          name: 'ColorBehaviour',
        },
      ],
      emitController: {
        _maxParticles: 0,
        _maxLife: 1,
        _emitPerSecond: 150,
        _frames: 0,
      },
      duration: -1,
    },
    textures: ['cloud2.png'],
  }
  fog = {
    emitterConfig: {
      behaviours: [
        {
          enabled: true,
          priority: 10000,
          maxLifeTime: 20,
          timeVariance: 0,
          name: 'LifeBehaviour',
        },
        {
          enabled: true,
          priority: 100,
          position: { x: -150, y: 600 },
          positionVariance: { x: 1300, y: 120 },
          velocity: { x: 0, y: 0 },
          velocityVariance: { x: 15, y: 0 },
          acceleration: { x: 0, y: 0 },
          accelerationVariance: { x: 0, y: 0 },
          name: 'PositionBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          allowNegativeValues: false,
          sizeStart: { x: 8, y: 8 },
          sizeEnd: { x: 8, y: 8 },
          startVariance: 0,
          endVariance: 0,
          name: 'SizeBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          start: { _r: 255, _g: 255, _b: 255, _alpha: 0 },
          end: { _r: 255, _g: 255, _b: 255, _alpha: 0 },
          startVariance: { _r: 0, _g: 0, _b: 0, _alpha: 0 },
          endVariance: { _r: 0, _g: 0, _b: 0, _alpha: 0 },
          sinus: true,
          name: 'ColorBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          rotation: 0,
          variance: 0.3,
          name: 'RotationBehaviour',
        },
      ],
      emitController: {
        _maxParticles: 0,
        _maxLife: 1,
        _emitPerSecond: 10,
        _frames: 0,
        _durationGuard: { maxTime: -1, _elapsedTime: 387.709583399969 },
        name: 'UniformEmission',
      },
      duration: -1,
    },
    textures: ['fog001.png', 'fog002.png', 'fog003.png', 'fog004.png'],
  }
  fire = {
    emitterConfig: {
      behaviours: [
        {
          priority: 10000,
          enabled: true,
          maxLifeTime: 2,
          timeVariance: 1,
          name: 'LifeBehaviour',
        },
        {
          priority: 100,
          enabled: true,
          position: {
            x: 0,
            y: 200,
          },
          positionVariance: {
            x: 20,
            y: 20,
          },
          velocity: {
            x: 0,
            y: -50,
          },
          velocityVariance: {
            x: 60,
            y: 0,
          },
          acceleration: {
            x: 5,
            y: 0,
          },
          accelerationVariance: {
            x: 0,
            y: 0,
          },
          name: 'PositionBehaviour',
        },
        {
          priority: 0,
          enabled: true,
          allowNegativeValues: false,
          sizeStart: {
            x: 0.7,
            y: 0.7,
          },
          sizeEnd: {
            x: 0.3,
            y: 0.3,
          },
          startVariance: 0.3,
          endVariance: 0.3,
          name: 'SizeBehaviour',
        },
        {
          priority: 0,
          enabled: true,
          start: {
            _r: 250,
            _g: 250,
            _b: 7,
            _alpha: 1,
          },
          end: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          startVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          endVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          sinus: false,
          name: 'ColorBehaviour',
        },
        {
          priority: 0,
          enabled: true,
          rotation: 0,
          variance: 3,
          name: 'RotationBehaviour',
        },
        {
          priority: 0,
          enabled: true,
          showVortices: false,
          turbulence: false,
          position: {
            x: 0,
            y: 200,
          },
          positionVariance: {
            x: 0,
            y: 0,
          },
          velocity: {
            x: 0,
            y: -100,
          },
          velocityVariance: {
            x: -30,
            y: 50,
          },
          acceleration: {
            x: 0,
            y: 0,
          },
          accelerationVariance: {
            x: 0,
            y: 0,
          },
          sizeStart: {
            x: 0.5,
            y: 0.5,
          },
          sizeEnd: {
            x: 0.5,
            y: 0.5,
          },
          startVariance: 0.5,
          endVariance: 0,
          emitPerSecond: 2,
          duration: 0,
          maxLifeTime: 2,
          name: 'TurbulenceBehaviour',
        },
      ],
      emitController: {
        _maxParticles: 200,
        _maxLife: 1,
        _emitPerSecond: 200,
        _frames: 0,
        name: 'UniformEmission',
      },
      duration: -1,
    },
    textures: ['fire001.png', 'fire002.png', 'fire003.png', 'fire004.png'],
  }
  coinShower = {
    emitterConfig: {
      behaviours: [
        {
          enabled: true,
          priority: 10000,
          maxLifeTime: 4.4,
          timeVariance: 0.4,
          name: 'LifeBehaviour',
        },
        {
          enabled: true,
          priority: 100,
          position: {
            x: 0,
            y: 0,
          },
          positionVariance: {
            x: 50,
            y: 20,
          },
          velocity: {
            x: 0,
            y: -1000,
          },
          velocityVariance: {
            x: 800,
            y: 0,
          },
          acceleration: {
            x: 0,
            y: 2500,
          },
          accelerationVariance: {
            x: 0,
            y: 500,
          },
          name: 'PositionBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          allowNegativeValues: false,
          sizeStart: {
            x: 0,
            y: 0,
          },
          sizeEnd: {
            x: 3,
            y: 3,
          },
          startVariance: 0.1,
          endVariance: 1,
          name: 'SizeBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          start: {
            _r: 255,
            _g: 255,
            _b: 0,
            _alpha: 1,
          },
          end: {
            _r: 255,
            _g: 255,
            _b: 255,
            _alpha: 1,
          },
          startVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          endVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          name: 'ColorBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          rotation: 0,
          variance: 6,
          name: 'RotationBehaviour',
        },
      ],
      emitController: {
        _maxParticles: 0,
        _maxLife: 3,
        _emitPerSecond: 250,
        _frames: 0,
        _durationGuard: {
          maxTime: -1,
          _elapsedTime: 387.709583399969,
        },
        name: 'UniformEmission',
      },
      duration: 0.3,
    },
    textures: ['sparkle.png'],
  }
  fountain = {
    emitterConfig: {
      behaviours: [
        {
          enabled: true,
          priority: 10000,
          maxLifeTime: 1.4,
          timeVariance: 0.4,
          name: 'LifeBehaviour',
        },
        {
          enabled: true,
          priority: 100,
          position: {
            x: 0,
            y: 0,
          },
          positionVariance: {
            x: 0,
            y: 0,
          },
          velocity: {
            x: 0,
            y: -142,
          },
          velocityVariance: {
            x: 50,
            y: 50,
          },
          acceleration: {
            x: 0,
            y: 200,
          },
          accelerationVariance: {
            x: 0,
            y: 0,
          },
          name: 'PositionBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          allowNegativeValues: false,
          sizeStart: {
            x: 0,
            y: 0,
          },
          sizeEnd: {
            x: 0,
            y: 0,
          },
          startVariance: 0.5,
          endVariance: 0.5,
          name: 'SizeBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          start: {
            _r: 255,
            _g: 255,
            _b: 255,
            _alpha: 1,
          },
          end: {
            _r: 255,
            _g: 212,
            _b: 169,
            _alpha: 0,
          },
          startVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          endVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          name: 'ColorBehaviour',
        },
      ],
      emitController: {
        _maxParticles: 0,
        _maxLife: 1,
        _emitPerSecond: 300,
        _frames: 0,
        _durationGuard: {
          maxTime: -1,
          _elapsedTime: 387.709583399969,
        },
        name: 'UniformEmission',
      },
      duration: -1,
    },
    textures: ['sparkle.png'],
  }
  label = {
    emitterConfig: {
      behaviours: [
        {
          enabled: true,
          priority: 10000,
          maxLifeTime: 1.0,
          timeVariance: 0.2,
          name: 'LifeBehaviour',
        },
        {
          enabled: true,
          priority: 100,
          position: {
            x: 0,
            y: 0,
          },
          positionVariance: {
            x: 160,
            y: 0,
          },
          velocity: {
            x: 0,
            y: 0,
          },
          velocityVariance: {
            x: 70,
            y: 40,
          },
          acceleration: {
            x: 0,
            y: 0,
          },
          accelerationVariance: {
            x: 0,
            y: 0,
          },
          name: 'PositionBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          start: {
            _r: 255,
            _g: 255,
            _b: 255,
            _alpha: 1,
          },
          end: {
            _r: 250,
            _g: 153,
            _b: 70,
            _alpha: 1,
          },
          startVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          endVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          name: 'ColorBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          allowNegativeValues: false,
          sizeStart: {
            x: 1.0,
            y: 1.0,
          },
          sizeEnd: {
            x: 0,
            y: 0,
          },
          startVariance: 0.2,
          endVariance: 0,
          name: 'SizeBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          angle: 0,
          variance: 0,
          name: 'EmitDirectionBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          rotation: 3.070208687183225,
          variance: 1.512976619996361,
          name: 'RotationBehaviour',
        },
      ],
      emitController: {
        _maxParticles: 300,
        _emissionRate: 30,
        name: 'RandomEmission',
      },
      duration: -1,
    },
    textures: ['sparkle.png'],
  }
  multiplier = {
    emitterConfig: {
      behaviours: [
        {
          enabled: true,
          priority: 10000,
          maxLifeTime: 1.3,
          timeVariance: 0,
          name: 'LifeBehaviour',
        },
        {
          enabled: true,
          priority: 100,
          position: {
            x: 72.37525744460885,
            y: 186.44522549485302,
          },
          positionVariance: {
            x: 11,
            y: 11,
          },
          velocity: {
            x: 0,
            y: -68,
          },
          velocityVariance: {
            x: 100,
            y: 0,
          },
          acceleration: {
            x: 0,
            y: 170,
          },
          accelerationVariance: {
            x: 0,
            y: 0,
          },
          name: 'PositionBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          allowNegativeValues: false,
          sizeStart: {
            x: 1,
            y: 1,
          },
          sizeEnd: {
            x: 0,
            y: 0,
          },
          startVariance: 0,
          endVariance: 0,
          name: 'SizeBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          start: {
            _r: 255,
            _g: 255,
            _b: 255,
            _alpha: 1,
          },
          end: {
            _r: 255,
            _g: 159,
            _b: 0,
            _alpha: 1,
          },
          startVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          endVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          name: 'ColorBehaviour',
        },
      ],
      emitController: {
        _maxParticles: 1000,
        _emissionRate: 200,
        _emitCounter: 0.0003099999999584468,
        name: 'StandardEmission',
      },
      duration: 1.2,
    },
    textures: ['sparkle.png'],
  }
  fall = {
    emitterConfig: {
      behaviours: [
        {
          enabled: true,
          priority: 10000,
          maxLifeTime: 20,
          timeVariance: 1,
          name: 'LifeBehaviour',
        },
        {
          enabled: true,
          priority: 100,
          position: {
            x: -800,
            y: 0,
          },
          positionVariance: {
            x: 0,
            y: 1000,
          },
          velocity: {
            x: 800,
            y: 0,
          },
          velocityVariance: {
            x: 300,
            y: 300,
          },
          acceleration: {
            x: 0,
            y: 0,
          },
          accelerationVariance: {
            x: 0,
            y: 0,
          },
          name: 'PositionBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          allowNegativeValues: false,
          sizeStart: {
            x: 0.4,
            y: 0.4,
          },
          sizeEnd: {
            x: 0.4,
            y: 0.4,
          },
          startVariance: 0.1,
          endVariance: 0.1,
          name: 'SizeBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          start: {
            _r: 0,
            _g: 255,
            _b: 0,
            _alpha: 1,
          },
          end: {
            _r: 255,
            _g: 255,
            _b: 255,
            _alpha: 1,
          },
          startVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          endVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          name: 'ColorBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          rotation: 3.14,
          variance: 1.8563321924211689,
          name: 'RotationBehaviour',
        },
      ],
      emitController: {
        _maxParticles: 0,
        _maxLife: 1,
        _emitPerSecond: 30,
        _frames: 0.17854999999981372,
        _durationGuard: {
          maxTime: -1,
          _elapsedTime: 387.709583399969,
        },
        name: 'UniformEmission',
      },
      duration: 3,
    },
    textures: ['sparkle.png'],
  }
  fallSingle = {
    emitterConfig: {
      behaviours: [
        {
          enabled: true,
          priority: 10000,
          maxLifeTime: 20,
          timeVariance: 1,
          name: 'LifeBehaviour',
        },
        {
          enabled: true,
          priority: 100,
          position: {
            x: -800,
            y: 0,
          },
          positionVariance: {
            x: 0,
            y: 1000,
          },
          velocity: {
            x: 1500,
            y: 0,
          },
          velocityVariance: {
            x: 300,
            y: 300,
          },
          acceleration: {
            x: 0,
            y: 0,
          },
          accelerationVariance: {
            x: 0,
            y: 0,
          },
          name: 'PositionBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          allowNegativeValues: false,
          sizeStart: {
            x: 1.5,
            y: 1.5,
          },
          sizeEnd: {
            x: 1.5,
            y: 1.5,
          },
          startVariance: 0.2,
          endVariance: 0.2,
          name: 'SizeBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          start: {
            _r: 254,
            _g: 255,
            _b: 255,
            _alpha: 1,
          },
          end: {
            _r: 255,
            _g: 200,
            _b: 200,
            _alpha: 1,
          },
          startVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          endVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          name: 'ColorBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          rotation: 3.14,
          variance: 1.8563321924211689,
          name: 'RotationBehaviour',
        },
      ],
      emitController: {
        _maxParticles: 0,
        _maxLife: 1,
        _emitPerSecond: 1,
        _frames: 0.17854999999981372,
        _durationGuard: {
          maxTime: -1,
          _elapsedTime: 387.709583399969,
        },
        name: 'UniformEmission',
      },
      duration: 3,
    },
    textures: ['sparkle.png'],
  }
  twist = {
    emitterConfig: {
      behaviours: [
        {
          enabled: true,
          priority: 10000,
          maxLifeTime: 2.5,
          timeVariance: 1,
          name: 'LifeBehaviour',
        },
        {
          enabled: true,
          priority: 100,
          position: {
            x: 0,
            y: 0,
          },
          positionVariance: {
            x: 17,
            y: 0,
          },
          velocity: {
            x: -148,
            y: -136,
          },
          velocityVariance: {
            x: 0,
            y: 0,
          },
          acceleration: {
            x: 85,
            y: 153,
          },
          accelerationVariance: {
            x: 0,
            y: 0,
          },
          name: 'PositionBehaviour',
        },
        {
          enabled: true,
          priority: 100,
          degrees: 120,
          degreesVariance: 100,
          maxRadius: 450,
          maxRadiusVariance: 50,
          minRadius: 40,
          minRadiusVariance: 0,
          name: 'AngularVelocityBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          allowNegativeValues: false,
          sizeStart: {
            x: 0.5,
            y: 0.5,
          },
          sizeEnd: {
            x: 0,
            y: 0,
          },
          startVariance: 0.3,
          endVariance: 0,
          name: 'SizeBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          start: {
            _r: 255,
            _g: 255,
            _b: 255,
            _alpha: 1,
          },
          end: {
            _r: 255,
            _g: 255,
            _b: 255,
            _alpha: 1,
          },
          startVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          endVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          name: 'ColorBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          rotation: 0,
          variance: 1.1423179954302887,
          name: 'RotationBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          angle: 0,
          variance: 0,
          name: 'EmitDirectionBehaviour',
        },
      ],
      emitController: {
        _maxParticles: 0,
        _maxLife: 1,
        _emitPerSecond: 10,
        _frames: 0.16724999999976717,
        _durationGuard: {
          maxTime: -1,
          _elapsedTime: 387.709583399969,
        },
        name: 'UniformEmission',
      },
      duration: 4,
    },
    textures: ['sparkle.png'],
  }
  fallRainDrops = {
    emitterConfig: {
      behaviours: [
        {
          enabled: true,
          priority: 10000,
          maxLifeTime: 15,
          timeVariance: 0,
          name: 'LifeBehaviour',
        },
        {
          enabled: true,
          priority: 100,
          position: {
            x: 0,
            y: 0,
          },
          positionVariance: {
            x: 1000,
            y: 500,
          },
          velocity: {
            x: 0,
            y: 0,
          },
          velocityVariance: {
            x: 0,
            y: 0,
          },
          acceleration: {
            x: 0,
            y: 1,
          },
          accelerationVariance: {
            x: 0,
            y: 1,
          },
          name: 'PositionBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          allowNegativeValues: false,
          sizeStart: {
            x: 1,
            y: 1,
          },
          sizeEnd: {
            x: 1,
            y: 1,
          },
          startVariance: 0.3,
          endVariance: 0.3,
          name: 'SizeBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          start: {
            _r: 255,
            _g: 255,
            _b: 255,
            _alpha: 1,
          },
          end: {
            _r: 255,
            _g: 255,
            _b: 255,
            _alpha: 1,
          },
          startVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          endVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          name: 'ColorBehaviour',
        },
      ],
      emitController: {
        _maxParticles: 0,
        _maxLife: 1,
        _emitPerSecond: 1,
        _frames: 0.948262999999994,
        _durationGuard: {
          maxTime: -1,
          _elapsedTime: 387.709583399969,
        },
        name: 'UniformEmission',
      },
      duration: 5,
    },
    textures: ['pump_snow_01.png'],
  }
  snow = {
    emitterConfig: {
      behaviours: [
        {
          priority: 10000,
          enabled: true,
          maxLifeTime: 4,
          timeVariance: 1,
          name: 'LifeBehaviour',
        },
        {
          priority: 100,
          enabled: true,
          position: {
            x: 0,
            y: -800,
          },
          positionVariance: {
            x: 1000,
            y: 0,
          },
          velocity: {
            x: -20,
            y: 1000,
          },
          velocityVariance: {
            x: 15,
            y: 145,
          },
          acceleration: {
            x: 0,
            y: 159,
          },
          accelerationVariance: {
            x: 0,
            y: 150,
          },
          name: 'PositionBehaviour',
        },
        {
          priority: 0,
          enabled: true,
          allowNegativeValues: false,
          sizeStart: {
            x: 0.6,
            y: 0.6,
          },
          sizeEnd: {
            x: 0.6,
            y: 0.6,
          },
          startVariance: 0.2,
          endVariance: 0.2,
          name: 'SizeBehaviour',
        },
        {
          priority: 0,
          enabled: true,
          start: {
            _r: 255,
            _g: 255,
            _b: 255,
            _alpha: 1,
          },
          end: {
            _r: 255,
            _g: 255,
            _b: 255,
            _alpha: 1,
          },
          startVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          endVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          sinus: false,
          name: 'ColorBehaviour',
        },
        {
          priority: 0,
          enabled: true,
          rotation: 0,
          variance: 0,
          name: 'RotationBehaviour',
        },
        {
          priority: 0,
          enabled: true,
          showVortices: false,
          turbulence: false,
          position: {
            x: 0,
            y: -1500,
          },
          positionVariance: {
            x: 800,
            y: 0,
          },
          velocity: {
            x: null,
            y: 800,
          },
          velocityVariance: {
            x: 200,
            y: 0,
          },
          acceleration: {
            x: 0,
            y: 0,
          },
          accelerationVariance: {
            x: 0,
            y: 0,
          },
          sizeStart: {
            x: 3,
            y: 3,
          },
          sizeEnd: {
            x: 3,
            y: 3,
          },
          startVariance: 0,
          endVariance: 0,
          emitPerSecond: 5,
          duration: 0,
          maxLifeTime: 3,
          name: 'TurbulenceBehaviour',
        },
      ],
      emitController: {
        _maxParticles: 0,
        _maxLife: 1,
        _emitPerSecond: 250,
        _frames: 0,
        _durationGuard: {
          maxTime: -1,
          _elapsedTime: 387.709583399969,
        },
        name: 'UniformEmission',
      },
      duration: -1,
    },
    textures: ['pump_snow_01.png'],
  }
  explosion = {
    emitterConfig: {
      behaviours: [
        {
          enabled: true,
          priority: 10000,
          maxLifeTime: 0.5,
          timeVariance: 0.3,
          name: 'LifeBehaviour',
        },
        {
          enabled: true,
          priority: 100,
          position: {
            x: 0,
            y: 0,
          },
          positionVariance: {
            x: 34,
            y: 65,
          },
          velocity: {
            x: 0,
            y: 0,
          },
          velocityVariance: {
            x: 381,
            y: 384,
          },
          acceleration: {
            x: 0,
            y: 500,
          },
          accelerationVariance: {
            x: 0,
            y: 500,
          },
          name: 'PositionBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          allowNegativeValues: false,
          sizeStart: {
            x: 0.7,
            y: 0.7,
          },
          sizeEnd: {
            x: 0,
            y: 0,
          },
          startVariance: 0.3,
          endVariance: 0,
          name: 'SizeBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          start: {
            _r: 255,
            _g: 0,
            _b: 0,
            _alpha: 1,
          },
          end: {
            _r: 255,
            _g: 212,
            _b: 169,
            _alpha: 1,
          },
          startVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          endVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          name: 'ColorBehaviour',
        },
      ],
      emitController: {
        _maxParticles: 0,
        _maxLife: 1,
        _emitPerSecond: 600,
        _frames: 0,
        _durationGuard: {
          maxTime: -1,
          _elapsedTime: 387.709583399969,
        },
        name: 'UniformEmission',
      },
      duration: 0.15,
    },
    textures: ['pump_snow_01.png'],
  }
  counter = {
    emitterConfig: {
      behaviours: [
        {
          enabled: true,
          priority: 10000,
          maxLifeTime: 0.4,
          timeVariance: 0.3,
          name: 'LifeBehaviour',
        },
        {
          enabled: true,
          priority: 100,
          position: {
            x: 0,
            y: 0,
          },
          positionVariance: {
            x: 34,
            y: 28,
          },
          velocity: {
            x: 0,
            y: -200,
          },
          velocityVariance: {
            x: 600,
            y: 301,
          },
          acceleration: {
            x: 0,
            y: 1000,
          },
          accelerationVariance: {
            x: 0,
            y: 300,
          },
          name: 'PositionBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          allowNegativeValues: false,
          sizeStart: {
            x: 3,
            y: 3,
          },
          sizeEnd: {
            x: 0,
            y: 0,
          },
          startVariance: 2,
          endVariance: 0,
          name: 'SizeBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          start: {
            _r: 255,
            _g: 255,
            _b: 255,
            _alpha: 0,
          },
          end: {
            _r: 255,
            _g: 255,
            _b: 255,
            _alpha: 1,
          },
          startVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          endVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          name: 'ColorBehaviour',
        },
      ],
      emitController: {
        _maxParticles: 0,
        _maxLife: 1,
        _emitPerSecond: 100,
        _frames: 0,
        _durationGuard: {
          maxTime: -1,
          _elapsedTime: 387.709583399969,
        },
        name: 'UniformEmission',
      },
      duration: -1,
    },
    textures: ['flare.png'],
  }
  bigWin = {
    emitterConfig: {
      behaviours: [
        {
          enabled: true,
          priority: 10000,
          maxLifeTime: 2.3,
          timeVariance: 0,
          name: 'LifeBehaviour',
        },
        {
          enabled: true,
          priority: 100,
          position: {
            x: 0,
            y: 0,
          },
          positionVariance: {
            x: 800,
            y: 0,
          },
          velocity: {
            x: 0,
            y: -3000,
          },
          velocityVariance: {
            x: 500,
            y: 1000,
          },
          acceleration: {
            x: 0,
            y: 6000,
          },
          accelerationVariance: {
            x: 0,
            y: 3000,
          },
          name: 'PositionBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          allowNegativeValues: false,
          sizeStart: {
            x: 0.3,
            y: 0.3,
          },
          sizeEnd: {
            x: 1.1,
            y: 1.1,
          },
          startVariance: 0,
          endVariance: 0,
          name: 'SizeBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          start: {
            _r: 250,
            _g: 242,
            _b: 110,
            _alpha: 1,
          },
          end: {
            _r: 255,
            _g: 255,
            _b: 255,
            _alpha: 1,
          },
          startVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          endVariance: {
            _r: 0,
            _g: 0,
            _b: 0,
            _alpha: 0,
          },
          name: 'ColorBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          rotation: 0,
          variance: 3.4985124856226335,
          name: 'RotationBehaviour',
        },
      ],
      emitController: {
        _maxParticles: 0,
        _maxLife: 1,
        _emitPerSecond: 200,
        _frames: 0,
        _durationGuard: {
          maxTime: -1,
          _elapsedTime: 387.709583399969,
        },
        name: 'UniformEmission',
      },
      duration: 1.6,
    },
    textures: ['cloud2.png'],
  }
  ember = {
    emitterConfig: {
      behaviours: [
        {
          enabled: true,
          priority: 10000,
          maxLifeTime: 10,
          timeVariance: 0,
          name: 'LifeBehaviour',
        },
        {
          enabled: true,
          priority: 100,
          position: {
            x: 0,
            y: 500,
          },
          positionVariance: {
            x: 800,
            y: 0,
          },
          velocity: {
            x: -100,
            y: 0,
          },
          velocityVariance: {
            x: 100,
            y: 0,
          },
          acceleration: {
            x: 0,
            y: -100,
          },
          accelerationVariance: {
            x: 0,
            y: 50,
          },
          name: 'PositionBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          allowNegativeValues: false,
          sizeStart: {
            x: 0.1,
            y: 0.1,
          },
          sizeEnd: {
            x: 0.05,
            y: 0.05,
          },
          startVariance: 0.05,
          endVariance: 0.025,
          name: 'SizeBehaviour',
        },
        {
          priority: 0,
          enabled: true,
          start: { _r: 255, _g: 0, _b: 4, _alpha: 1 },
          end: { _r: 255, _g: 0, _b: 0, _alpha: 1 },
          startVariance: { _r: 0, _g: 0, _b: 0, _alpha: 1 },
          endVariance: { _r: 0, _g: 0, _b: 0, _alpha: 1 },
          sinus: false,
          name: 'ColorBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          angle: 0,
          variance: 0,
          name: 'EmitDirectionBehaviour',
        },
      ],
      emitController: {
        _maxParticles: 0,
        _maxLife: 1,
        _emitPerSecond: 30,
        _frames: 0.99,
        _durationGuard: {
          maxTime: -1,
          _elapsedTime: 387.709583399969,
        },
        name: 'UniformEmission',
      },
      duration: -1,
    },
    textures: ['cloud2.png'],
  }
  emberWithTurbulence = {
    emitterConfig: {
      behaviours: [
        { priority: 10000, enabled: true, maxLifeTime: 10, timeVariance: 0, name: 'LifeBehaviour' },
        {
          priority: 100,
          enabled: true,
          position: { x: 0, y: 500 },
          positionVariance: { x: 800, y: 0 },
          velocity: { x: -100, y: 0 },
          velocityVariance: { x: 100, y: 0 },
          acceleration: { x: 0, y: -100 },
          accelerationVariance: { x: 0, y: 50 },
          name: 'PositionBehaviour',
        },
        {
          priority: 0,
          enabled: true,
          allowNegativeValues: false,
          sizeStart: { x: 0.15, y: 0.15 },
          sizeEnd: { x: 0.05, y: 0.05 },
          startVariance: 0.05,
          endVariance: 0.025,
          name: 'SizeBehaviour',
        },
        { priority: 0, enabled: true, angle: 0, variance: 0, name: 'EmitDirectionBehaviour' },
        {
          priority: 0,
          enabled: true,
          showVortices: false,
          effect: 4,
          turbulence: false,
          vortexOrgSize: 128,
          position: { x: 0, y: 500 },
          positionVariance: { x: 800, y: 0 },
          velocity: { x: -100, y: -100 },
          velocityVariance: { x: 0, y: 50 },
          acceleration: { x: 0, y: 0 },
          accelerationVariance: { x: 0, y: 0 },
          sizeStart: { x: 1, y: 1 },
          sizeEnd: { x: 1, y: 1 },
          startVariance: 0,
          endVariance: 0,
          emitPerSecond: 3,
          duration: 0,
          maxLifeTime: 3,
          version: 0,
          name: 'TurbulenceBehaviour',
        },
        {
          priority: 0,
          enabled: true,
          start: { _r: 255, _g: 0, _b: 4, _alpha: 1 },
          end: { _r: 255, _g: 0, _b: 0, _alpha: 1 },
          startVariance: { _r: 0, _g: 0, _b: 0, _alpha: 1 },
          endVariance: { _r: 0, _g: 0, _b: 0, _alpha: 1 },
          sinus: false,
          name: 'ColorBehaviour',
        },
      ],
      emitController: {
        _maxParticles: 0,
        _maxLife: 1,
        _emitPerSecond: 30,
        _frames: 0.6096000003162771,
        _durationGuard: { maxTime: -1, _elapsedTime: 387.709583399969 },
        name: 'UniformEmission',
      },
      duration: -1,
    },
    textures: ['cloud2.png'],
  }
  bubbles = {
    emitterConfig: {
      behaviours: [
        {
          enabled: true,
          priority: 10000,
          maxLifeTime: 2,
          timeVariance: 1,
          name: 'LifeBehaviour',
        },
        {
          enabled: true,
          priority: 100,
          position: { x: 0, y: 0 },
          positionVariance: { x: 20, y: 0 },
          velocity: {
            x: 0,
            y: -100,
          },
          velocityVariance: { x: 0, y: 0 },
          acceleration: {
            x: 0,
            y: 25,
          },
          accelerationVariance: { x: 0, y: 0 },
          name: 'PositionBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          allowNegativeValues: false,
          sizeStart: { x: 0.01, y: 0.01 },
          sizeEnd: { x: 0.1, y: 0.1 },
          startVariance: 0,
          endVariance: 0.05,
          name: 'SizeBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          start: { _r: 255, _g: 255, _b: 255, _alpha: 1 },
          end: { _r: 255, _g: 255, _b: 255, _alpha: 0 },
          startVariance: { _r: 0, _g: 0, _b: 0, _alpha: 0 },
          endVariance: { _r: 0, _g: 0, _b: 0, _alpha: 0 },
          name: 'ColorBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          angle: 0,
          variance: 0.5,
          name: 'EmitDirectionBehaviour',
        },
      ],
      emitController: {
        _maxParticles: 0,
        _maxLife: 1,
        _emitPerSecond: 100,
        _frames: 0.9935999999998602,
        _durationGuard: {
          maxTime: -1,
          _elapsedTime: 387.709583399969,
        },
        name: 'UniformEmission',
      },

      duration: -1,
    },
    textures: ['cloud.png'],
  }
  warpOut = {
    emitterConfig: {
      behaviours: [
        { priority: 10000, enabled: true, maxLifeTime: 2, timeVariance: 0, name: 'LifeBehaviour' },
        {
          priority: 100,
          enabled: true,
          position: { x: 0, y: 0 },
          positionVariance: { x: 500, y: 500 },
          velocity: { x: 0, y: 0 },
          velocityVariance: { x: 0, y: 0 },
          acceleration: { x: 0, y: 0 },
          accelerationVariance: { x: 0, y: 0 },
          name: 'PositionBehaviour',
        },
        {
          priority: 0,
          enabled: true,
          allowNegativeValues: false,
          sizeStart: { x: 1, y: 1 },
          sizeEnd: { x: 0, y: 0 },
          startVariance: 1,
          endVariance: 0,
          name: 'SizeBehaviour',
        },
        {
          priority: 0,
          enabled: true,
          start: { _r: 110, _g: 255, _b: 110, _alpha: 1 },
          end: { _r: 0, _g: 0, _b: 0, _alpha: 1 },
          startVariance: { _r: 0, _g: 0, _b: 0, _alpha: 1 },
          endVariance: { _r: 0, _g: 0, _b: 0, _alpha: 0 },
          sinus: false,
          name: 'ColorBehaviour',
        },
        {
          priority: 0,
          enabled: true,
          showVortices: false,
          effect: 2,
          turbulence: false,
          vortexOrgSize: 128,
          position: { x: 0, y: 0 },
          positionVariance: { x: 0, y: 0 },
          velocity: { x: 0, y: 0 },
          velocityVariance: { x: 0, y: 0 },
          acceleration: { x: 0, y: 0 },
          accelerationVariance: { x: 0, y: 0 },
          sizeStart: { x: 9, y: 9 },
          sizeEnd: { x: 9, y: 9 },
          startVariance: 0,
          endVariance: 0,
          emitPerSecond: 13,
          duration: 0,
          maxLifeTime: 1,
          name: 'TurbulenceBehaviour',
        },
      ],
      emitController: { _maxParticles: 0, _maxLife: 1, _emitPerSecond: 150, _frames: 0, name: 'UniformEmission' },
      duration: -1,
    },
    textures: ['cloud.png'],
  }
  warpIn = {
    emitterConfig: {
      behaviours: [
        { priority: 10000, enabled: true, maxLifeTime: 2, timeVariance: 0, name: 'LifeBehaviour' },
        {
          priority: 100,
          enabled: true,
          position: { x: 0, y: 0 },
          positionVariance: { x: 800, y: 800 },
          velocity: { x: 0, y: 0 },
          velocityVariance: { x: 0, y: 0 },
          acceleration: { x: 0, y: 0 },
          accelerationVariance: { x: 0, y: 0 },
          name: 'PositionBehaviour',
        },
        {
          priority: 0,
          enabled: true,
          allowNegativeValues: false,
          sizeStart: { x: 1, y: 1 },
          sizeEnd: { x: 0, y: 0 },
          startVariance: 1,
          endVariance: 0,
          name: 'SizeBehaviour',
        },
        {
          priority: 0,
          enabled: true,
          start: { _r: 110, _g: 255, _b: 110, _alpha: 1 },
          end: { _r: 0, _g: 0, _b: 0, _alpha: 1 },
          startVariance: { _r: 0, _g: 0, _b: 0, _alpha: 1 },
          endVariance: { _r: 0, _g: 0, _b: 0, _alpha: 0 },
          sinus: false,
          name: 'ColorBehaviour',
        },
        {
          priority: 0,
          enabled: true,
          showVortices: false,
          effect: 5,
          turbulence: false,
          vortexOrgSize: 128,
          position: { x: 0, y: 0 },
          positionVariance: { x: 0, y: 0 },
          velocity: { x: 0, y: 0 },
          velocityVariance: { x: 0, y: 0 },
          acceleration: { x: 0, y: 0 },
          accelerationVariance: { x: 0, y: 0 },
          sizeStart: { x: 9, y: 9 },
          sizeEnd: { x: 9, y: 9 },
          startVariance: 0,
          endVariance: 0,
          emitPerSecond: 13,
          duration: 0,
          maxLifeTime: 1,
          name: 'TurbulenceBehaviour',
        },
      ],
      emitController: { _maxParticles: 0, _maxLife: 1, _emitPerSecond: 150, _frames: 0, name: 'UniformEmission' },
      duration: -1,
    },
    textures: ['cloud.png'],
  }
  blackHoles = {
    emitterConfig: {
      behaviours: [
        { priority: 10000, enabled: true, maxLifeTime: 2, timeVariance: 0, name: 'LifeBehaviour' },
        {
          priority: 100,
          enabled: true,
          position: { x: 0, y: 0 },
          positionVariance: { x: 800, y: 800 },
          velocity: { x: 0, y: 0 },
          velocityVariance: { x: 0, y: 0 },
          acceleration: { x: 0, y: 0 },
          accelerationVariance: { x: 0, y: 0 },
          name: 'PositionBehaviour',
        },
        {
          priority: 0,
          enabled: true,
          allowNegativeValues: false,
          sizeStart: { x: 1, y: 1 },
          sizeEnd: { x: 0, y: 0 },
          startVariance: 1,
          endVariance: 0,
          name: 'SizeBehaviour',
        },
        {
          priority: 0,
          enabled: true,
          start: { _r: 110, _g: 255, _b: 110, _alpha: 1 },
          end: { _r: 0, _g: 0, _b: 0, _alpha: 1 },
          startVariance: { _r: 0, _g: 0, _b: 0, _alpha: 1 },
          endVariance: { _r: 0, _g: 0, _b: 0, _alpha: 0 },
          sinus: false,
          name: 'ColorBehaviour',
        },
        {
          priority: 0,
          enabled: true,
          showVortices: false,
          effect: 5,
          turbulence: false,
          vortexOrgSize: 128,
          position: { x: 0, y: 0 },
          positionVariance: { x: 800, y: 800 },
          velocity: { x: 0, y: 0 },
          velocityVariance: { x: 0, y: 0 },
          acceleration: { x: 0, y: 0 },
          accelerationVariance: { x: 0, y: 0 },
          sizeStart: { x: 1, y: 1 },
          sizeEnd: { x: 1, y: 1 },
          startVariance: 15,
          endVariance: 15,
          emitPerSecond: 1,
          duration: 0,
          maxLifeTime: 1,
          name: 'TurbulenceBehaviour',
        },
      ],
      emitController: { _maxParticles: 0, _maxLife: 1, _emitPerSecond: 150, _frames: 0, name: 'UniformEmission' },
      duration: -1,
    },
    textures: ['cloud.png'],
  }
  warmOut = {
    emitterConfig: {
      behaviours: [
        { priority: 10000, enabled: true, maxLifeTime: 2, timeVariance: 0, name: 'LifeBehaviour' },
        {
          priority: 100,
          enabled: true,
          position: { x: 0, y: 0 },
          positionVariance: { x: 800, y: 800 },
          velocity: { x: 0, y: 0 },
          velocityVariance: { x: 0, y: 0 },
          acceleration: { x: 0, y: 0 },
          accelerationVariance: { x: 0, y: 0 },
          name: 'PositionBehaviour',
        },
        {
          priority: 0,
          enabled: true,
          allowNegativeValues: false,
          sizeStart: { x: 1, y: 1 },
          sizeEnd: { x: 0, y: 0 },
          startVariance: 1,
          endVariance: 0,
          name: 'SizeBehaviour',
        },
        {
          priority: 0,
          enabled: true,
          start: { _r: 110, _g: 255, _b: 110, _alpha: 1 },
          end: { _r: 0, _g: 0, _b: 0, _alpha: 1 },
          startVariance: { _r: 0, _g: 0, _b: 0, _alpha: 1 },
          endVariance: { _r: 0, _g: 0, _b: 0, _alpha: 0 },
          sinus: false,
          name: 'ColorBehaviour',
        },
        {
          priority: 0,
          enabled: true,
          showVortices: false,
          effect: 3,
          turbulence: false,
          vortexOrgSize: 128,
          position: { x: 0, y: 0 },
          positionVariance: { x: 800, y: 800 },
          velocity: { x: 0, y: 0 },
          velocityVariance: { x: 0, y: 0 },
          acceleration: { x: 0, y: 0 },
          accelerationVariance: { x: 0, y: 0 },
          sizeStart: { x: 3, y: 3 },
          sizeEnd: { x: 1, y: 1 },
          startVariance: 15,
          endVariance: 15,
          emitPerSecond: 1,
          duration: 0,
          maxLifeTime: 1,
          name: 'TurbulenceBehaviour',
        },
      ],
      emitController: { _maxParticles: 0, _maxLife: 1, _emitPerSecond: 150, _frames: 0, name: 'UniformEmission' },
      duration: -1,
    },
    textures: ['cloud.png'],
  }
}
