export default class ParticlesDefaultConfig {
    bloodHand: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                sinX: boolean;
                sinY: boolean;
                sinXVal: {
                    x: number;
                    y: number;
                };
                sinYVal: {
                    x: number;
                    y: number;
                };
                sinXValVariance: {
                    x: number;
                    y: number;
                };
                sinYValVariance: {
                    x: number;
                    y: number;
                };
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            alpha: number;
            blendMode: number;
        };
        textures: string[];
    };
    fromAtoB1: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
                fromAtoB?: undefined;
                fromAtoBTwoWays?: undefined;
                pointA?: undefined;
                pointB?: undefined;
                thereDuration?: undefined;
                thereAmplitude?: undefined;
                backDuration?: undefined;
                backAmplitude?: undefined;
                there?: undefined;
                back?: undefined;
                fromAtoBOneWay?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                warp: boolean;
                warpSpeed: number;
                warpBaseSpeed: number;
                sinX: boolean;
                sinY: boolean;
                sinXVal: {
                    x: number;
                    y: number;
                };
                sinYVal: {
                    x: number;
                    y: number;
                };
                sinXValVariance: {
                    x: number;
                    y: number;
                };
                sinYValVariance: {
                    x: number;
                    y: number;
                };
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                cameraZConverter: number;
                warpFov: number;
                warpStretch: number;
                warpDistanceScaleConverter: number;
                warpDistanceToCenter: boolean;
                fromAtoB: boolean;
                fromAtoBTwoWays: boolean;
                pointA: {
                    x: number;
                    y: number;
                };
                pointB: {
                    x: number;
                    y: number;
                };
                thereDuration: {
                    min: number;
                    max: number;
                };
                thereAmplitude: {
                    min: number;
                    max: number;
                };
                backDuration: {
                    min: number;
                    max: number;
                };
                backAmplitude: {
                    min: number;
                    max: number;
                };
                there: {
                    x: string;
                    y: string;
                    ease: string;
                };
                back: {
                    x: string;
                    y: string;
                    ease: string;
                };
                fromAtoBOneWay: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
                fromAtoB?: undefined;
                fromAtoBTwoWays?: undefined;
                pointA?: undefined;
                pointB?: undefined;
                thereDuration?: undefined;
                thereAmplitude?: undefined;
                backDuration?: undefined;
                backAmplitude?: undefined;
                there?: undefined;
                back?: undefined;
                fromAtoBOneWay?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
                fromAtoB?: undefined;
                fromAtoBTwoWays?: undefined;
                pointA?: undefined;
                pointB?: undefined;
                thereDuration?: undefined;
                thereAmplitude?: undefined;
                backDuration?: undefined;
                backAmplitude?: undefined;
                there?: undefined;
                back?: undefined;
                fromAtoBOneWay?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
                fromAtoB?: undefined;
                fromAtoBTwoWays?: undefined;
                pointA?: undefined;
                pointB?: undefined;
                thereDuration?: undefined;
                thereAmplitude?: undefined;
                backDuration?: undefined;
                backAmplitude?: undefined;
                there?: undefined;
                back?: undefined;
                fromAtoBOneWay?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                name: string;
            };
            duration: number;
            alpha: number;
            anchor: {
                x: number;
                y: number;
            };
            blendMode: number;
        };
        textures: string[];
    };
    fromAtoB2: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
                fromAtoB?: undefined;
                fromAtoBTwoWays?: undefined;
                pointA?: undefined;
                pointB?: undefined;
                thereDuration?: undefined;
                thereAmplitude?: undefined;
                backDuration?: undefined;
                backAmplitude?: undefined;
                there?: undefined;
                back?: undefined;
                fromAtoBOneWay?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                warp: boolean;
                warpSpeed: number;
                warpBaseSpeed: number;
                sinX: boolean;
                sinY: boolean;
                sinXVal: {
                    x: number;
                    y: number;
                };
                sinYVal: {
                    x: number;
                    y: number;
                };
                sinXValVariance: {
                    x: number;
                    y: number;
                };
                sinYValVariance: {
                    x: number;
                    y: number;
                };
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                cameraZConverter: number;
                warpFov: number;
                warpStretch: number;
                warpDistanceScaleConverter: number;
                warpDistanceToCenter: boolean;
                fromAtoB: boolean;
                fromAtoBTwoWays: boolean;
                pointA: {
                    x: number;
                    y: number;
                };
                pointB: {
                    x: number;
                    y: number;
                };
                thereDuration: {
                    min: number;
                    max: number;
                };
                thereAmplitude: {
                    min: number;
                    max: number;
                };
                backDuration: {
                    min: number;
                    max: number;
                };
                backAmplitude: {
                    min: number;
                    max: number;
                };
                there: {
                    x: string;
                    y: string;
                    ease: string;
                };
                back: {
                    x: string;
                    y: string;
                    ease: string;
                };
                fromAtoBOneWay: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
                fromAtoB?: undefined;
                fromAtoBTwoWays?: undefined;
                pointA?: undefined;
                pointB?: undefined;
                thereDuration?: undefined;
                thereAmplitude?: undefined;
                backDuration?: undefined;
                backAmplitude?: undefined;
                there?: undefined;
                back?: undefined;
                fromAtoBOneWay?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
                fromAtoB?: undefined;
                fromAtoBTwoWays?: undefined;
                pointA?: undefined;
                pointB?: undefined;
                thereDuration?: undefined;
                thereAmplitude?: undefined;
                backDuration?: undefined;
                backAmplitude?: undefined;
                there?: undefined;
                back?: undefined;
                fromAtoBOneWay?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
                fromAtoB?: undefined;
                fromAtoBTwoWays?: undefined;
                pointA?: undefined;
                pointB?: undefined;
                thereDuration?: undefined;
                thereAmplitude?: undefined;
                backDuration?: undefined;
                backAmplitude?: undefined;
                there?: undefined;
                back?: undefined;
                fromAtoBOneWay?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                name: string;
            };
            duration: number;
            alpha: number;
            anchor: {
                x: number;
                y: number;
            };
            blendMode: number;
        };
        textures: string[];
    };
    fromAtoB3: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
                fromAtoB?: undefined;
                fromAtoBTwoWays?: undefined;
                pointA?: undefined;
                pointB?: undefined;
                thereDuration?: undefined;
                thereAmplitude?: undefined;
                backDuration?: undefined;
                backAmplitude?: undefined;
                there?: undefined;
                back?: undefined;
                fromAtoBOneWay?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                warp: boolean;
                warpSpeed: number;
                warpBaseSpeed: number;
                sinX: boolean;
                sinY: boolean;
                sinXVal: {
                    x: number;
                    y: number;
                };
                sinYVal: {
                    x: number;
                    y: number;
                };
                sinXValVariance: {
                    x: number;
                    y: number;
                };
                sinYValVariance: {
                    x: number;
                    y: number;
                };
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                cameraZConverter: number;
                warpFov: number;
                warpStretch: number;
                warpDistanceScaleConverter: number;
                warpDistanceToCenter: boolean;
                fromAtoB: boolean;
                fromAtoBTwoWays: boolean;
                pointA: {
                    x: number;
                    y: number;
                };
                pointB: {
                    x: number;
                    y: number;
                };
                thereDuration: {
                    min: number;
                    max: number;
                };
                thereAmplitude: {
                    min: number;
                    max: number;
                };
                backDuration: {
                    min: number;
                    max: number;
                };
                backAmplitude: {
                    min: number;
                    max: number;
                };
                there: {
                    x: string;
                    y: string;
                    ease: string;
                };
                back: {
                    x: string;
                    y: string;
                    ease: string;
                };
                fromAtoBOneWay: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
                fromAtoB?: undefined;
                fromAtoBTwoWays?: undefined;
                pointA?: undefined;
                pointB?: undefined;
                thereDuration?: undefined;
                thereAmplitude?: undefined;
                backDuration?: undefined;
                backAmplitude?: undefined;
                there?: undefined;
                back?: undefined;
                fromAtoBOneWay?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
                fromAtoB?: undefined;
                fromAtoBTwoWays?: undefined;
                pointA?: undefined;
                pointB?: undefined;
                thereDuration?: undefined;
                thereAmplitude?: undefined;
                backDuration?: undefined;
                backAmplitude?: undefined;
                there?: undefined;
                back?: undefined;
                fromAtoBOneWay?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
                fromAtoB?: undefined;
                fromAtoBTwoWays?: undefined;
                pointA?: undefined;
                pointB?: undefined;
                thereDuration?: undefined;
                thereAmplitude?: undefined;
                backDuration?: undefined;
                backAmplitude?: undefined;
                there?: undefined;
                back?: undefined;
                fromAtoBOneWay?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                name: string;
            };
            duration: number;
            alpha: number;
            anchor: {
                x: number;
                y: number;
            };
            blendMode: number;
        };
        textures: string[];
    };
    fromAtoB4: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
                fromAtoB?: undefined;
                fromAtoBTwoWays?: undefined;
                pointA?: undefined;
                pointB?: undefined;
                thereDuration?: undefined;
                thereAmplitude?: undefined;
                backDuration?: undefined;
                backAmplitude?: undefined;
                there?: undefined;
                back?: undefined;
                fromAtoBOneWay?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                warp: boolean;
                warpSpeed: number;
                warpBaseSpeed: number;
                sinX: boolean;
                sinY: boolean;
                sinXVal: {
                    x: number;
                    y: number;
                };
                sinYVal: {
                    x: number;
                    y: number;
                };
                sinXValVariance: {
                    x: number;
                    y: number;
                };
                sinYValVariance: {
                    x: number;
                    y: number;
                };
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                cameraZConverter: number;
                warpFov: number;
                warpStretch: number;
                warpDistanceScaleConverter: number;
                warpDistanceToCenter: boolean;
                fromAtoB: boolean;
                fromAtoBTwoWays: boolean;
                pointA: {
                    x: number;
                    y: number;
                };
                pointB: {
                    x: number;
                    y: number;
                };
                thereDuration: {
                    min: number;
                    max: number;
                };
                thereAmplitude: {
                    min: number;
                    max: number;
                };
                backDuration: {
                    min: number;
                    max: number;
                };
                backAmplitude: {
                    min: number;
                    max: number;
                };
                there: {
                    x: string;
                    y: string;
                    ease: string;
                };
                back: {
                    x: string;
                    y: string;
                    ease: string;
                };
                fromAtoBOneWay: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
                fromAtoB?: undefined;
                fromAtoBTwoWays?: undefined;
                pointA?: undefined;
                pointB?: undefined;
                thereDuration?: undefined;
                thereAmplitude?: undefined;
                backDuration?: undefined;
                backAmplitude?: undefined;
                there?: undefined;
                back?: undefined;
                fromAtoBOneWay?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
                fromAtoB?: undefined;
                fromAtoBTwoWays?: undefined;
                pointA?: undefined;
                pointB?: undefined;
                thereDuration?: undefined;
                thereAmplitude?: undefined;
                backDuration?: undefined;
                backAmplitude?: undefined;
                there?: undefined;
                back?: undefined;
                fromAtoBOneWay?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
                fromAtoB?: undefined;
                fromAtoBTwoWays?: undefined;
                pointA?: undefined;
                pointB?: undefined;
                thereDuration?: undefined;
                thereAmplitude?: undefined;
                backDuration?: undefined;
                backAmplitude?: undefined;
                there?: undefined;
                back?: undefined;
                fromAtoBOneWay?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                name: string;
            };
            duration: number;
            alpha: number;
            anchor: {
                x: number;
                y: number;
            };
            blendMode: number;
        };
        textures: string[];
    };
    fromAtoB5: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
                fromAtoB?: undefined;
                fromAtoBTwoWays?: undefined;
                pointA?: undefined;
                pointB?: undefined;
                thereDuration?: undefined;
                thereAmplitude?: undefined;
                backDuration?: undefined;
                backAmplitude?: undefined;
                there?: undefined;
                back?: undefined;
                fromAtoBOneWay?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                warp: boolean;
                warpSpeed: number;
                warpBaseSpeed: number;
                sinX: boolean;
                sinY: boolean;
                sinXVal: {
                    x: number;
                    y: number;
                };
                sinYVal: {
                    x: number;
                    y: number;
                };
                sinXValVariance: {
                    x: number;
                    y: number;
                };
                sinYValVariance: {
                    x: number;
                    y: number;
                };
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                cameraZConverter: number;
                warpFov: number;
                warpStretch: number;
                warpDistanceScaleConverter: number;
                warpDistanceToCenter: boolean;
                fromAtoB: boolean;
                fromAtoBTwoWays: boolean;
                pointA: {
                    x: number;
                    y: number;
                };
                pointB: {
                    x: number;
                    y: number;
                };
                thereDuration: {
                    min: number;
                    max: number;
                };
                thereAmplitude: {
                    min: number;
                    max: number;
                };
                backDuration: {
                    min: number;
                    max: number;
                };
                backAmplitude: {
                    min: number;
                    max: number;
                };
                there: {
                    x: string;
                    y: string;
                    ease: string;
                };
                back: {
                    x: string;
                    y: string;
                    ease: string;
                };
                fromAtoBOneWay: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
                fromAtoB?: undefined;
                fromAtoBTwoWays?: undefined;
                pointA?: undefined;
                pointB?: undefined;
                thereDuration?: undefined;
                thereAmplitude?: undefined;
                backDuration?: undefined;
                backAmplitude?: undefined;
                there?: undefined;
                back?: undefined;
                fromAtoBOneWay?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
                fromAtoB?: undefined;
                fromAtoBTwoWays?: undefined;
                pointA?: undefined;
                pointB?: undefined;
                thereDuration?: undefined;
                thereAmplitude?: undefined;
                backDuration?: undefined;
                backAmplitude?: undefined;
                there?: undefined;
                back?: undefined;
                fromAtoBOneWay?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
                fromAtoB?: undefined;
                fromAtoBTwoWays?: undefined;
                pointA?: undefined;
                pointB?: undefined;
                thereDuration?: undefined;
                thereAmplitude?: undefined;
                backDuration?: undefined;
                backAmplitude?: undefined;
                there?: undefined;
                back?: undefined;
                fromAtoBOneWay?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                name: string;
            };
            duration: number;
            alpha: number;
            anchor: {
                x: number;
                y: number;
            };
            blendMode: number;
        };
        textures: string[];
    };
    fromAtoB6: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
                fromAtoB?: undefined;
                fromAtoBTwoWays?: undefined;
                pointA?: undefined;
                pointB?: undefined;
                thereDuration?: undefined;
                thereAmplitude?: undefined;
                backDuration?: undefined;
                backAmplitude?: undefined;
                there?: undefined;
                back?: undefined;
                fromAtoBOneWay?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                warp: boolean;
                warpSpeed: number;
                warpBaseSpeed: number;
                sinX: boolean;
                sinY: boolean;
                sinXVal: {
                    x: number;
                    y: number;
                };
                sinYVal: {
                    x: number;
                    y: number;
                };
                sinXValVariance: {
                    x: number;
                    y: number;
                };
                sinYValVariance: {
                    x: number;
                    y: number;
                };
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                cameraZConverter: number;
                warpFov: number;
                warpStretch: number;
                warpDistanceScaleConverter: number;
                warpDistanceToCenter: boolean;
                fromAtoB: boolean;
                fromAtoBTwoWays: boolean;
                pointA: {
                    x: number;
                    y: number;
                };
                pointB: {
                    x: number;
                    y: number;
                };
                thereDuration: {
                    min: number;
                    max: number;
                };
                thereAmplitude: {
                    min: number;
                    max: number;
                };
                backDuration: {
                    min: number;
                    max: number;
                };
                backAmplitude: {
                    min: number;
                    max: number;
                };
                there: {
                    x: string;
                    y: string;
                    ease: string;
                };
                back: {
                    x: string;
                    y: string;
                    ease: string;
                };
                fromAtoBOneWay: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
                fromAtoB?: undefined;
                fromAtoBTwoWays?: undefined;
                pointA?: undefined;
                pointB?: undefined;
                thereDuration?: undefined;
                thereAmplitude?: undefined;
                backDuration?: undefined;
                backAmplitude?: undefined;
                there?: undefined;
                back?: undefined;
                fromAtoBOneWay?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
                fromAtoB?: undefined;
                fromAtoBTwoWays?: undefined;
                pointA?: undefined;
                pointB?: undefined;
                thereDuration?: undefined;
                thereAmplitude?: undefined;
                backDuration?: undefined;
                backAmplitude?: undefined;
                there?: undefined;
                back?: undefined;
                fromAtoBOneWay?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
                fromAtoB?: undefined;
                fromAtoBTwoWays?: undefined;
                pointA?: undefined;
                pointB?: undefined;
                thereDuration?: undefined;
                thereAmplitude?: undefined;
                backDuration?: undefined;
                backAmplitude?: undefined;
                there?: undefined;
                back?: undefined;
                fromAtoBOneWay?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                name: string;
            };
            duration: number;
            alpha: number;
            anchor: {
                x: number;
                y: number;
            };
            blendMode: number;
        };
        textures: string[];
    };
    fromAtoB7: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
                fromAtoB?: undefined;
                fromAtoBTwoWays?: undefined;
                pointA?: undefined;
                pointB?: undefined;
                thereDuration?: undefined;
                thereAmplitude?: undefined;
                backDuration?: undefined;
                backAmplitude?: undefined;
                there?: undefined;
                back?: undefined;
                fromAtoBOneWay?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                warp: boolean;
                warpSpeed: number;
                warpBaseSpeed: number;
                sinX: boolean;
                sinY: boolean;
                sinXVal: {
                    x: number;
                    y: number;
                };
                sinYVal: {
                    x: number;
                    y: number;
                };
                sinXValVariance: {
                    x: number;
                    y: number;
                };
                sinYValVariance: {
                    x: number;
                    y: number;
                };
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                cameraZConverter: number;
                warpFov: number;
                warpStretch: number;
                warpDistanceScaleConverter: number;
                warpDistanceToCenter: boolean;
                fromAtoB: boolean;
                fromAtoBTwoWays: boolean;
                pointA: {
                    x: number;
                    y: number;
                };
                pointB: {
                    x: number;
                    y: number;
                };
                thereDuration: {
                    min: number;
                    max: number;
                };
                thereAmplitude: {
                    min: number;
                    max: number;
                };
                backDuration: {
                    min: number;
                    max: number;
                };
                backAmplitude: {
                    min: number;
                    max: number;
                };
                there: {
                    x: string;
                    y: string;
                    ease: string;
                };
                back: {
                    x: string;
                    y: string;
                    ease: string;
                };
                fromAtoBOneWay: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
                fromAtoB?: undefined;
                fromAtoBTwoWays?: undefined;
                pointA?: undefined;
                pointB?: undefined;
                thereDuration?: undefined;
                thereAmplitude?: undefined;
                backDuration?: undefined;
                backAmplitude?: undefined;
                there?: undefined;
                back?: undefined;
                fromAtoBOneWay?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
                fromAtoB?: undefined;
                fromAtoBTwoWays?: undefined;
                pointA?: undefined;
                pointB?: undefined;
                thereDuration?: undefined;
                thereAmplitude?: undefined;
                backDuration?: undefined;
                backAmplitude?: undefined;
                there?: undefined;
                back?: undefined;
                fromAtoBOneWay?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
                fromAtoB?: undefined;
                fromAtoBTwoWays?: undefined;
                pointA?: undefined;
                pointB?: undefined;
                thereDuration?: undefined;
                thereAmplitude?: undefined;
                backDuration?: undefined;
                backAmplitude?: undefined;
                there?: undefined;
                back?: undefined;
                fromAtoBOneWay?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                name: string;
            };
            duration: number;
            alpha: number;
            anchor: {
                x: number;
                y: number;
            };
            blendMode: number;
        };
        textures: string[];
    };
    fromAtoB8: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
                fromAtoB?: undefined;
                fromAtoBTwoWays?: undefined;
                pointA?: undefined;
                pointB?: undefined;
                thereDuration?: undefined;
                thereAmplitude?: undefined;
                backDuration?: undefined;
                backAmplitude?: undefined;
                there?: undefined;
                back?: undefined;
                fromAtoBOneWay?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                warp: boolean;
                warpSpeed: number;
                warpBaseSpeed: number;
                sinX: boolean;
                sinY: boolean;
                sinXVal: {
                    x: number;
                    y: number;
                };
                sinYVal: {
                    x: number;
                    y: number;
                };
                sinXValVariance: {
                    x: number;
                    y: number;
                };
                sinYValVariance: {
                    x: number;
                    y: number;
                };
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                cameraZConverter: number;
                warpFov: number;
                warpStretch: number;
                warpDistanceScaleConverter: number;
                warpDistanceToCenter: boolean;
                fromAtoB: boolean;
                fromAtoBTwoWays: boolean;
                pointA: {
                    x: number;
                    y: number;
                };
                pointB: {
                    x: number;
                    y: number;
                };
                thereDuration: {
                    min: number;
                    max: number;
                };
                thereAmplitude: {
                    min: number;
                    max: number;
                };
                backDuration: {
                    min: number;
                    max: number;
                };
                backAmplitude: {
                    min: number;
                    max: number;
                };
                there: {
                    x: string;
                    y: string;
                    ease: string;
                };
                back: {
                    x: string;
                    y: string;
                    ease: string;
                };
                fromAtoBOneWay: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
                fromAtoB?: undefined;
                fromAtoBTwoWays?: undefined;
                pointA?: undefined;
                pointB?: undefined;
                thereDuration?: undefined;
                thereAmplitude?: undefined;
                backDuration?: undefined;
                backAmplitude?: undefined;
                there?: undefined;
                back?: undefined;
                fromAtoBOneWay?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
                fromAtoB?: undefined;
                fromAtoBTwoWays?: undefined;
                pointA?: undefined;
                pointB?: undefined;
                thereDuration?: undefined;
                thereAmplitude?: undefined;
                backDuration?: undefined;
                backAmplitude?: undefined;
                there?: undefined;
                back?: undefined;
                fromAtoBOneWay?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
                fromAtoB?: undefined;
                fromAtoBTwoWays?: undefined;
                pointA?: undefined;
                pointB?: undefined;
                thereDuration?: undefined;
                thereAmplitude?: undefined;
                backDuration?: undefined;
                backAmplitude?: undefined;
                there?: undefined;
                back?: undefined;
                fromAtoBOneWay?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                name: string;
            };
            duration: number;
            alpha: number;
            anchor: {
                x: number;
                y: number;
            };
            blendMode: number;
        };
        textures: string[];
    };
    warpClouds: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _emissionRate: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            alpha: number;
            anchor: {
                x: number;
                y: number;
            };
            blendMode: number;
        };
        textures: string[];
    };
    warpWithEffect: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                warp: boolean;
                warpSpeed: number;
                warpBaseSpeed: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                cameraZConverter: number;
                warpFov: number;
                warpStretch: number;
                warpDistanceScaleConverter: number;
                warpDistanceToCenter: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _emissionRate: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            alpha: number;
            anchor: {
                x: number;
                y: number;
            };
            blendMode: number;
        };
        textures: string[];
    };
    warpWithEffectV2: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
                warpDistanceToCenter?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                warp: boolean;
                warpSpeed: number;
                warpBaseSpeed: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                cameraZConverter: number;
                warpFov: number;
                warpStretch: number;
                warpDistanceScaleConverter: number;
                warpDistanceToCenter: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _emissionRate: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            alpha: number;
            anchor: {
                x: number;
                y: number;
            };
            blendMode: number;
        };
        textures: string[];
    };
    warp: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                warp?: undefined;
                warpSpeed?: undefined;
                warpBaseSpeed?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                cameraZConverter?: undefined;
                warpFov?: undefined;
                warpStretch?: undefined;
                warpDistanceScaleConverter?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                warp: boolean;
                warpSpeed: number;
                warpBaseSpeed: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                cameraZConverter: number;
                warpFov: number;
                warpStretch: number;
                warpDistanceScaleConverter: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _emissionRate: string;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            alpha: number;
            anchor: {
                x: number;
                y: number;
            };
            blendMode: number;
        };
        textures: string[];
    };
    darkMagicSmoke: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                rotation?: undefined;
                variance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                sinX: boolean;
                sinY: boolean;
                sinXVal: {
                    x: number;
                    y: number;
                };
                sinYVal: {
                    x: number;
                    y: number;
                };
                sinXValVariance: {
                    x: number;
                    y: number;
                };
                sinYValVariance: {
                    x: number;
                    y: number;
                };
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                rotation?: undefined;
                variance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                rotation?: undefined;
                variance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            alpha: number;
            blendMode: number;
        };
        textures: string[];
    };
    darkMagicSmoke2: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                rotation?: undefined;
                variance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                rotation?: undefined;
                variance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                rotation?: undefined;
                variance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            alpha: number;
            blendMode: number;
        };
        textures: string[];
    };
    darkMagicSmoke3: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                rotation?: undefined;
                variance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                rotation?: undefined;
                variance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                rotation?: undefined;
                variance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            alpha: number;
            blendMode: number;
        };
        textures: string[];
    };
    runes: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                sinX: boolean;
                sinY: boolean;
                sinXVal: {
                    x: number;
                    y: number;
                };
                sinYVal: {
                    x: number;
                    y: number;
                };
                sinXValVariance: {
                    x: number;
                    y: number;
                };
                sinYValVariance: {
                    x: number;
                    y: number;
                };
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            alpha: number;
            blendMode: number;
        };
        textures: string[];
    };
    trail: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                sinX: boolean;
                sinY: boolean;
                sinXVal: {
                    x: number;
                    y: number;
                };
                sinYVal: {
                    x: number;
                    y: number;
                };
                sinXValVariance: {
                    x: number;
                    y: number;
                };
                sinYValVariance: {
                    x: number;
                    y: number;
                };
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            alpha: number;
            blendMode: number;
        };
        textures: string[];
    };
    trail2: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            alpha: number;
            blendMode: number;
        };
        textures: string[];
    };
    magic1: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                sinX: boolean;
                sinY: boolean;
                sinXVal: {
                    x: number;
                    y: number;
                };
                sinYVal: {
                    x: number;
                    y: number;
                };
                sinXValVariance: {
                    x: number;
                    y: number;
                };
                sinYValVariance: {
                    x: number;
                    y: number;
                };
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            alpha: number;
            blendMode: number;
        };
        textures: string[];
    };
    magic2: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                sinX: boolean;
                sinY: boolean;
                sinXVal: {
                    x: number;
                    y: number;
                };
                sinYVal: {
                    x: number;
                    y: number;
                };
                sinXValVariance: {
                    x: number;
                    y: number;
                };
                sinYValVariance: {
                    x: number;
                    y: number;
                };
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            alpha: number;
            blendMode: number;
        };
        textures: string[];
    };
    magic3: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                sinX: boolean;
                sinY: boolean;
                sinXVal: {
                    x: number;
                    y: number;
                };
                sinYVal: {
                    x: number;
                    y: number;
                };
                sinXValVariance: {
                    x: number;
                    y: number;
                };
                sinYValVariance: {
                    x: number;
                    y: number;
                };
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            alpha: number;
            blendMode: number;
        };
        textures: string[];
    };
    magic4: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                sinX: boolean;
                sinY: boolean;
                sinXVal: {
                    x: number;
                    y: number;
                };
                sinYVal: {
                    x: number;
                    y: number;
                };
                sinXValVariance: {
                    x: number;
                    y: number;
                };
                sinYValVariance: {
                    x: number;
                    y: number;
                };
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            alpha: number;
            blendMode: number;
        };
        textures: string[];
    };
    magic5: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                sinX: boolean;
                sinY: boolean;
                sinXVal: {
                    x: number;
                    y: number;
                };
                sinYVal: {
                    x: number;
                    y: number;
                };
                sinXValVariance: {
                    x: number;
                    y: number;
                };
                sinYValVariance: {
                    x: number;
                    y: number;
                };
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            alpha: number;
            blendMode: number;
        };
        textures: string[];
    };
    magic6: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                sinX: boolean;
                sinY: boolean;
                sinXVal: {
                    x: number;
                    y: number;
                };
                sinYVal: {
                    x: number;
                    y: number;
                };
                sinXValVariance: {
                    x: number;
                    y: number;
                };
                sinYValVariance: {
                    x: number;
                    y: number;
                };
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            alpha: number;
            blendMode: number;
        };
        textures: string[];
    };
    magic7: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                sinX: boolean;
                sinY: boolean;
                sinXVal: {
                    x: number;
                    y: number;
                };
                sinYVal: {
                    x: number;
                    y: number;
                };
                sinXValVariance: {
                    x: number;
                    y: number;
                };
                sinYValVariance: {
                    x: number;
                    y: number;
                };
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            alpha: number;
            blendMode: number;
        };
        textures: string[];
    };
    magic8: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                sinX: boolean;
                sinY: boolean;
                sinXVal: {
                    x: number;
                    y: number;
                };
                sinYVal: {
                    x: number;
                    y: number;
                };
                sinXValVariance: {
                    x: number;
                    y: number;
                };
                sinYValVariance: {
                    x: number;
                    y: number;
                };
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            alpha: number;
            blendMode: number;
        };
        textures: string[];
    };
    magic9: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                sinX: boolean;
                sinY: boolean;
                sinXVal: {
                    x: number;
                    y: number;
                };
                sinYVal: {
                    x: number;
                    y: number;
                };
                sinXValVariance: {
                    x: number;
                    y: number;
                };
                sinYValVariance: {
                    x: number;
                    y: number;
                };
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            alpha: number;
            blendMode: number;
        };
        textures: string[];
    };
    office: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                sinX: boolean;
                sinY: boolean;
                sinXVal: {
                    x: number;
                    y: number;
                };
                sinYVal: {
                    x: number;
                    y: number;
                };
                sinXValVariance: {
                    x: number;
                    y: number;
                };
                sinYValVariance: {
                    x: number;
                    y: number;
                };
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            alpha: number;
            blendMode: number;
        };
        textures: string[];
    };
    liquid: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                showVortices?: undefined;
                turbulence?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                vortileSize?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                showVortices?: undefined;
                turbulence?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                vortileSize?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                showVortices?: undefined;
                turbulence?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                vortileSize?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                showVortices?: undefined;
                turbulence?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                vortileSize?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                showVortices: boolean;
                turbulence: boolean;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                emitPerSecond: number;
                duration: number;
                maxLifeTime: number;
                vortileSize: number;
                name: string;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
        };
        textures: string[];
    };
    firework: {
        emitterConfig: {
            behaviours: ({
                enabled: boolean;
                priority: number;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
            };
            duration: number;
        };
        textures: string[];
    };
    waterTurbulence: {
        emitterConfig: {
            behaviours: ({
                enabled: boolean;
                priority: number;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                rotation?: undefined;
                variance?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                rotation?: undefined;
                variance?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                rotation?: undefined;
                variance?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                emitPerSecond: number;
                duration: number;
                maxLifeTime: number;
                name: string;
                timeVariance?: undefined;
                start?: undefined;
                end?: undefined;
                rotation?: undefined;
                variance?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
        };
        textures: string[];
    };
    water: {
        emitterConfig: {
            behaviours: ({
                enabled: boolean;
                priority: number;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
        };
        textures: string[];
    };
    chaos: {
        emitterConfig: {
            behaviours: ({
                enabled: boolean;
                priority: number;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
            };
            duration: number;
        };
        textures: string[];
    };
    fog: {
        emitterConfig: {
            behaviours: ({
                enabled: boolean;
                priority: number;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            alpha: number;
            blendMode: number;
        };
        textures: string[];
    };
    fog2: {
        emitterConfig: {
            behaviours: ({
                enabled: boolean;
                priority: number;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            alpha: number;
            blendMode: number;
        };
        textures: string[];
    };
    fire: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            blendMode: number;
        };
        textures: string[];
    };
    sun: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                version?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                version?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                version?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                version?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                version?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                showVortices: boolean;
                effect: number;
                turbulence: boolean;
                vortexOrgSize: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                emitPerSecond: number;
                duration: number;
                maxLifeTime: number;
                version: number;
                name: string;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                allowNegativeValues?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            blendMode: number;
        };
        textures: string[];
    };
    sun2: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                version?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                version?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                version?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                version?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                version?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                showVortices: boolean;
                effect: number;
                turbulence: boolean;
                vortexOrgSize: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                emitPerSecond: number;
                duration: number;
                maxLifeTime: number;
                version: number;
                name: string;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                allowNegativeValues?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            blendMode: number;
        };
        textures: string[];
    };
    campFire: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
                angle?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
                angle?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
                angle?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
                angle?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                angle?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                angle: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            blendMode: number;
        };
        textures: string[];
    };
    campFire2: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            blendMode: number;
        };
        textures: string[];
    };
    campFire3: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinXValVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                sinX: boolean;
                sinY: boolean;
                sinXVal: {
                    x: number;
                    y: number;
                };
                sinXValVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinXValVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinXValVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinXValVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            blendMode: number;
        };
        textures: string[];
    };
    campFireSparkles: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
        };
        textures: string[];
    };
    campFireSparkles2: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            blendMode: number;
        };
        textures: string[];
    };
    campFireTurbulence: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
                angle?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                version?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
                angle?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                version?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
                angle?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                version?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
                angle?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                version?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                angle?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                version?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                angle: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                version?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                showVortices: boolean;
                effect: number;
                turbulence: boolean;
                vortexOrgSize: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                emitPerSecond: number;
                duration: number;
                maxLifeTime: number;
                version: number;
                name: string;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
                angle?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            blendMode: number;
        };
        textures: string[];
    };
    flyingFire: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            blendMode: number;
        };
        textures: string[];
    };
    meteor: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            blendMode: number;
        };
        textures: string[];
    };
    fireWithTurbulence: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                showVortices: boolean;
                effect: number;
                turbulence: boolean;
                vortexOrgSize: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                emitPerSecond: number;
                duration: number;
                maxLifeTime: number;
                name: string;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            blendMode: number;
        };
        textures: string[];
    };
    coinShower: {
        emitterConfig: {
            behaviours: ({
                enabled: boolean;
                priority: number;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            animatedSprite: {
                enabled: boolean;
                frameRate: number;
                loop: boolean;
            };
        };
        textures: string[];
    };
    fountain: {
        emitterConfig: {
            behaviours: ({
                enabled: boolean;
                priority: number;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
        };
        textures: string[];
    };
    flyingFountain: {
        emitterConfig: {
            behaviours: ({
                enabled: boolean;
                priority: number;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
        };
        textures: string[];
    };
    label: {
        emitterConfig: {
            behaviours: ({
                enabled: boolean;
                priority: number;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                angle?: undefined;
                variance?: undefined;
                rotation?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                start?: undefined;
                end?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                angle?: undefined;
                variance?: undefined;
                rotation?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                angle?: undefined;
                variance?: undefined;
                rotation?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                angle?: undefined;
                variance?: undefined;
                rotation?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                angle: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                angle?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _emissionRate: number;
                _emitPerSecond: number;
                name: string;
            };
            duration: number;
        };
        textures: string[];
    };
    multiplier: {
        emitterConfig: {
            behaviours: ({
                enabled: boolean;
                priority: number;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _emissionRate: number;
                _emitCounter: number;
                _emitPerSecond: number;
                name: string;
            };
            duration: number;
        };
        textures: string[];
    };
    fall: {
        emitterConfig: {
            behaviours: ({
                enabled: boolean;
                priority: number;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
        };
        textures: string[];
    };
    fallSingle: {
        emitterConfig: {
            behaviours: ({
                enabled: boolean;
                priority: number;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
        };
        textures: string[];
    };
    twist: {
        emitterConfig: {
            behaviours: ({
                enabled: boolean;
                priority: number;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                degrees?: undefined;
                degreesVariance?: undefined;
                maxRadius?: undefined;
                maxRadiusVariance?: undefined;
                minRadius?: undefined;
                minRadiusVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                rotation?: undefined;
                variance?: undefined;
                angle?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                degrees?: undefined;
                degreesVariance?: undefined;
                maxRadius?: undefined;
                maxRadiusVariance?: undefined;
                minRadius?: undefined;
                minRadiusVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                rotation?: undefined;
                variance?: undefined;
                angle?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                degrees: number;
                degreesVariance: number;
                maxRadius: number;
                maxRadiusVariance: number;
                minRadius: number;
                minRadiusVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                rotation?: undefined;
                variance?: undefined;
                angle?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                degrees?: undefined;
                degreesVariance?: undefined;
                maxRadius?: undefined;
                maxRadiusVariance?: undefined;
                minRadius?: undefined;
                minRadiusVariance?: undefined;
                start?: undefined;
                end?: undefined;
                rotation?: undefined;
                variance?: undefined;
                angle?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                degrees?: undefined;
                degreesVariance?: undefined;
                maxRadius?: undefined;
                maxRadiusVariance?: undefined;
                minRadius?: undefined;
                minRadiusVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
                angle?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                degrees?: undefined;
                degreesVariance?: undefined;
                maxRadius?: undefined;
                maxRadiusVariance?: undefined;
                minRadius?: undefined;
                minRadiusVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                angle?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                angle: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                degrees?: undefined;
                degreesVariance?: undefined;
                maxRadius?: undefined;
                maxRadiusVariance?: undefined;
                minRadius?: undefined;
                minRadiusVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                rotation?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
        };
        textures: string[];
    };
    fallRainDrops: {
        emitterConfig: {
            behaviours: ({
                enabled: boolean;
                priority: number;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            animatedSprite: {
                enabled: boolean;
                frameRate: number;
                loop: boolean;
                randomFrameStart: boolean;
            };
        };
        textures: string[];
    };
    fallRainDrops2: {
        emitterConfig: {
            behaviours: ({
                enabled: boolean;
                priority: number;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            blendMode: number;
        };
        textures: string[];
    };
    snow: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
        };
        textures: string[];
    };
    explosion: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            blendMode: number;
            alpha: number;
        };
        textures: string[];
    };
    explosionForMeteor: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
        };
        textures: string[];
    };
    counter: {
        emitterConfig: {
            behaviours: ({
                enabled: boolean;
                priority: number;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
        };
        textures: string[];
    };
    bigWin: {
        emitterConfig: {
            behaviours: ({
                enabled: boolean;
                priority: number;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            animatedSprite: {
                enabled: boolean;
                frameRate: number;
                loop: boolean;
            };
        };
        textures: string[];
    };
    birds: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            animatedSprite: {
                enabled: boolean;
                frameRate: number;
                loop: boolean;
                randomFrameStart: boolean;
            };
        };
        textures: string[];
    };
    cigarette: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                version?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                version?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                version?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                version?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                version?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                showVortices: boolean;
                effect: number;
                turbulence: boolean;
                vortexOrgSize: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                emitPerSecond: number;
                duration: number;
                maxLifeTime: number;
                version: number;
                name: string;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            blendMode: number;
        };
        textures: string[];
    };
    squareSmoke: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            blendMode: number;
            animatedSprite: {
                enabled: boolean;
                frameRate: number;
                loop: boolean;
            };
        };
        textures: string[];
    };
    ember: {
        emitterConfig: {
            behaviours: ({
                enabled: boolean;
                priority: number;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                angle?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                angle?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                angle?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                angle?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                angle: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
        };
        textures: string[];
    };
    emberWithTurbulence: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                angle?: undefined;
                variance?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                version?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                angle?: undefined;
                variance?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                version?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                angle?: undefined;
                variance?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                version?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                angle: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                version?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                showVortices: boolean;
                effect: number;
                turbulence: boolean;
                vortexOrgSize: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                emitPerSecond: number;
                duration: number;
                maxLifeTime: number;
                version: number;
                name: string;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                angle?: undefined;
                variance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                angle?: undefined;
                variance?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                version?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
        };
        textures: string[];
    };
    bubbles: {
        emitterConfig: {
            behaviours: ({
                enabled: boolean;
                priority: number;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                angle?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                angle?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                angle?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                angle?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                angle: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
        };
        textures: string[];
    };
    flyingBubbles: {
        emitterConfig: {
            behaviours: ({
                enabled: boolean;
                priority: number;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                angle?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                angle?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                angle?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                angle?: undefined;
                variance?: undefined;
            } | {
                enabled: boolean;
                priority: number;
                angle: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
        };
        textures: string[];
    };
    background1: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
        };
        textures: string[];
    };
    abstractTunnel: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                angle?: undefined;
                variance?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                version?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                angle?: undefined;
                variance?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                version?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                angle?: undefined;
                variance?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                version?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                angle?: undefined;
                variance?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                version?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                angle: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
                version?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                showVortices: boolean;
                effect: number;
                turbulence: boolean;
                vortexOrgSize: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                emitPerSecond: number;
                duration: number;
                maxLifeTime: number;
                version: number;
                name: string;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                allowNegativeValues?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                angle?: undefined;
                variance?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
        };
        textures: string[];
    };
    warpOut: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                showVortices: boolean;
                effect: number;
                turbulence: boolean;
                vortexOrgSize: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                emitPerSecond: number;
                duration: number;
                maxLifeTime: number;
                name: string;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
        };
        textures: string[];
    };
    warpIn: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                showVortices: boolean;
                effect: number;
                turbulence: boolean;
                vortexOrgSize: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                emitPerSecond: number;
                duration: number;
                maxLifeTime: number;
                name: string;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
        };
        textures: string[];
    };
    blackHoles: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                showVortices: boolean;
                effect: number;
                turbulence: boolean;
                vortexOrgSize: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                emitPerSecond: number;
                duration: number;
                maxLifeTime: number;
                name: string;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
        };
        textures: string[];
    };
    warmOut: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                showVortices?: undefined;
                effect?: undefined;
                turbulence?: undefined;
                vortexOrgSize?: undefined;
                emitPerSecond?: undefined;
                duration?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                showVortices: boolean;
                effect: number;
                turbulence: boolean;
                vortexOrgSize: number;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                emitPerSecond: number;
                duration: number;
                maxLifeTime: number;
                name: string;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
        };
        textures: string[];
    };
    bubbleSpray: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                rotation?: undefined;
                variance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                rotation?: undefined;
                variance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                rotation?: undefined;
                variance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _emissionRate: string;
                _emitCounter: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
        };
        textures: string[];
    };
    cartoonSmoke: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                start: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                end: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                startVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                endVariance: {
                    _r: number;
                    _g: number;
                    _b: number;
                    _alpha: number;
                };
                sinus: boolean;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                start?: undefined;
                end?: undefined;
                sinus?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _emissionRate: string;
                _emitCounter: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
        };
        textures: string[];
    };
    explodingBubbles: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                angle?: undefined;
                variance?: undefined;
                rotation?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                angle?: undefined;
                variance?: undefined;
                rotation?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                angle?: undefined;
                variance?: undefined;
                rotation?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                angle: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                rotation?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                angle?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
        };
        finishingTextures: string[];
        textures: string[];
    };
    coinsRing: {
        emitterConfig: {
            behaviours: ({
                priority: number;
                enabled: boolean;
                maxLifeTime: number;
                timeVariance: number;
                name: string;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                spawnType: string;
                radius: number;
                sinX: boolean;
                sinY: boolean;
                sinXVal: {
                    x: number;
                    y: number;
                };
                sinYVal: {
                    x: number;
                    y: number;
                };
                sinXValVariance: {
                    x: number;
                    y: number;
                };
                sinYValVariance: {
                    x: number;
                    y: number;
                };
                position: {
                    x: number;
                    y: number;
                };
                positionVariance: {
                    x: number;
                    y: number;
                };
                velocity: {
                    x: number;
                    y: number;
                };
                velocityVariance: {
                    x: number;
                    y: number;
                };
                acceleration: {
                    x: number;
                    y: number;
                };
                accelerationVariance: {
                    x: number;
                    y: number;
                };
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                allowNegativeValues: boolean;
                sizeStart: {
                    x: number;
                    y: number;
                };
                sizeEnd: {
                    x: number;
                    y: number;
                };
                startVariance: number;
                endVariance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                rotation?: undefined;
                variance?: undefined;
            } | {
                priority: number;
                enabled: boolean;
                rotation: number;
                variance: number;
                name: string;
                maxLifeTime?: undefined;
                timeVariance?: undefined;
                spawnType?: undefined;
                radius?: undefined;
                sinX?: undefined;
                sinY?: undefined;
                sinXVal?: undefined;
                sinYVal?: undefined;
                sinXValVariance?: undefined;
                sinYValVariance?: undefined;
                position?: undefined;
                positionVariance?: undefined;
                velocity?: undefined;
                velocityVariance?: undefined;
                acceleration?: undefined;
                accelerationVariance?: undefined;
                allowNegativeValues?: undefined;
                sizeStart?: undefined;
                sizeEnd?: undefined;
                startVariance?: undefined;
                endVariance?: undefined;
            })[];
            emitController: {
                _maxParticles: number;
                _maxLife: number;
                _emitPerSecond: number;
                _frames: number;
                name: string;
            };
            duration: number;
            animatedSprite: {
                enabled: boolean;
                frameRate: number;
                loop: boolean;
                randomFrameStart: boolean;
            };
        };
        textures: string[];
    };
}
