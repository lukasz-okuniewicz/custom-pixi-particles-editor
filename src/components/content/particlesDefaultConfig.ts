export default class ParticlesDefaultConfig {
  default = {
    emitterConfig: {
      behaviours: [
        {
          enabled: true,
          priority: 10000,
          maxLifeTime: 4,
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
            x: 0,
            y: 0,
          },
          velocity: {
            x: 0,
            y: 0,
          },
          velocityVariance: {
            x: 0,
            y: 74,
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
          startVariance: 0,
          endVariance: 0,
          name: 'SizeBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          start: {
            _r: 254,
            _g: 14,
            _b: 14,
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
        _emitPerSecond: 20,
        _frames: 0,
      },
      duration: -1,
    },
    textures: ['cloud'],
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
    textures: ['sparkle'],
  }
  radial = {
    emitterConfig: {
      behaviours: [
        {
          enabled: true,
          priority: 10000,
          maxLifeTime: 1,
          timeVariance: 0,
          name: 'LifeBehaviour',
        },
        {
          enabled: true,
          priority: 100,
          degrees: 360,
          degreesVariance: 0,
          maxRadius: 316.33,
          maxRadiusVariance: 0,
          minRadius: 0,
          minRadiusVariance: 0,
          name: 'AngularVelocityBehaviour',
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
        _emitPerSecond: 80,
        _frames: 0,
      },
      duration: -1,
    },
    textures: ['cloud2'],
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
            x: 39,
            y: 36,
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
    textures: ['cloud2'],
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
          position: { x: 600, y: -150 },
          positionVariance: { x: 120, y: 1300 },
          velocity: { x: 0, y: 0 },
          velocityVariance: { x: 0, y: 15 },
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
          startVariance: 2,
          endVariance: 2,
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
          angle: 1.5707963267948966,
          variance: 0.06981317007977318,
          name: 'EmitDirectionBehaviour',
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
        _maxParticles: 10,
        _maxLife: 1,
        _emitPerSecond: 10,
        _frames: 0,
        _durationGuard: { maxTime: -1, _elapsedTime: 387.709583399969 },
        name: 'UniformEmission',
      },
      duration: -1,
    },
    textures: ['fog001', 'fog002', 'fog003', 'fog004'],
  }
  fire = {
    emitterConfig: {
      behaviours: [
        {
          enabled: true,
          priority: 10000,
          maxLifeTime: 3,
          timeVariance: 2,
          name: 'LifeBehaviour',
        },
        {
          enabled: true,
          priority: 100,
          position: { x: 0, y: 200 },
          positionVariance: { x: 50, y: 50 },
          velocity: { x: 0, y: -50 },
          velocityVariance: { x: 0, y: 0 },
          acceleration: { x: 5, y: -10 },
          accelerationVariance: { x: 0, y: -5 },
          name: 'PositionBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          allowNegativeValues: false,
          sizeStart: { x: 0.7, y: 0.7 },
          sizeEnd: { x: 0.5, y: 0.5 },
          startVariance: 0.5,
          endVariance: 0.5,
          name: 'SizeBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          start: { _r: 255, _g: 117, _b: 133, _alpha: 1 },
          end: { _r: 0, _g: 0, _b: 0, _alpha: 0 },
          startVariance: { _r: 0, _g: 0, _b: 0, _alpha: 0 },
          endVariance: { _r: 0, _g: 0, _b: 0, _alpha: 0 },
          sinus: false,
          name: 'ColorBehaviour',
        },
        {
          enabled: true,
          priority: 0,
          rotation: 0.5,
          variance: -1,
          name: 'RotationBehaviour',
        },
      ],
      emitController: {
        _maxParticles: 200,
        _maxLife: 1,
        _emitPerSecond: 100,
        _frames: 0,
        name: 'UniformEmission',
      },
      duration: -1,
    },
    textures: ['fire001', 'fire002', 'fire003', 'fire004'],
  }
}
