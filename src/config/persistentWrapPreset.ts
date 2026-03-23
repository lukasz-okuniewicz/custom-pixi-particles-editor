/**
 * Reference emitter config: fixed particle count, no despawn, toroidal wrap.
 *
 * - LifeBehaviour: `maxLifeTime: -1` → infinite life (see LifeBehaviour in the library).
 * - duration `-1` → emitter does not expire by time.
 * - PersistentFillEmission: one-shot fill to `_maxParticles` (`_burstPerFrame` limits per-frame creation).
 * - ToroidalWrapBehaviour: wraps within the rectangle in particle space. Do not combine with
 *   BounceBehaviour on the same axis (conflicting bounds).
 *
 * Merge `emitterConfig` into your scene or use as `particlePredefinedEffect` data source.
 */
export const persistentWrapEmitterPreset = {
  emitterConfig: {
    duration: -1,
    emitController: {
      name: 'PersistentFillEmission',
      _maxParticles: 200,
      _burstPerFrame: 100,
    },
    behaviours: [
      {
        enabled: true,
        priority: 100,
        customPoints: [
          {
            spawnType: 'Ring',
            radius: 180,
            perspective: 0,
            maxZ: 0,
            position: { x: 0, y: 0 },
            positionVariance: { x: 40, y: 40 },
          },
        ],
        name: 'SpawnBehaviour',
      },
      {
        enabled: true,
        priority: 10000,
        maxLifeTime: -1,
        timeVariance: 0,
        name: 'LifeBehaviour',
      },
      {
        enabled: true,
        priority: 100,
        warp: false,
        velocity: { x: 40, y: -20 },
        velocityVariance: { x: 30, y: 30 },
        acceleration: { x: 0, y: 0 },
        accelerationVariance: { x: 0, y: 0 },
        name: 'PositionBehaviour',
      },
      {
        enabled: true,
        priority: 45,
        wrapX: true,
        wrapY: true,
        minX: -400,
        maxX: 400,
        minY: -300,
        maxY: 300,
        inset: 0,
        name: 'ToroidalWrapBehaviour',
      },
      {
        enabled: true,
        priority: 0,
        allowNegativeValues: false,
        sizeStart: { x: 4, y: 4 },
        sizeEnd: { x: 4, y: 4 },
        startVariance: 1,
        endVariance: 0,
        name: 'SizeBehaviour',
      },
      {
        enabled: true,
        priority: 0,
        start: { _r: 200, _g: 220, _b: 255, _alpha: 0.85 },
        end: { _r: 120, _g: 160, _b: 255, _alpha: 0.85 },
        startVariance: { _r: 40, _g: 40, _b: 40, _alpha: 0 },
        endVariance: { _r: 0, _g: 0, _b: 0, _alpha: 0 },
        name: 'ColorBehaviour',
      },
    ],
    alpha: 1,
    blendMode: 1,
  },
  textures: ['particle.png'],
}
