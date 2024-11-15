import * as React from 'react'
import { hot } from 'react-hot-loader'
import './../assets/scss/App.scss'
import Menu from './menu/Menu'
import Content from './content/Content'
import ParticlesDefaultConfig from './config/particlesDefaultConfig'
import { saveAs } from 'file-saver'
import { customPixiParticles, Renderer } from 'custom-pixi-particles'
import { gsap, Linear } from 'gsap'
import { Application, Container, Loader as PixiLoader, Sprite, Texture, Graphics } from 'pixi.js-legacy'
import Loader from './utils/Loader'
import { propsToReloadEverything } from './config'

class App extends React.Component {
  state = {
    isLoading: true,
    name: '',
    props: {},
    defaultConfig: null,
  }

  private app: Application
  private bgContainer: Container
  private particlesContainer: Container
  private bgContainer2: Container
  private graphics: Graphics
  private particles: any
  private conf: ParticlesDefaultConfig = new ParticlesDefaultConfig()
  private activeEffect: string
  private orgConfig: any
  private defaultConfig: any
  private newDefaultConfig: any
  private tween: any
  private bgSprite: Sprite
  private bgSprite2: Sprite
  private bgSpriteSize: { w: number; h: number }
  private particlesArr: any[] = []

  async componentDidMount() {
    await Loader.load()

    this.setState({
      isLoading: false,
    })

    this.setActiveEffect()
    this.initApp()
    this.createParticles()
    this.resize()
    this.detectMouseMove()
    this.createOffice()
    this.createEventListeners()

    if (this.activeEffect !== 'office') {
      this.newDefaultConfig.particlePredefinedEffect = this.activeEffect
      this.defaultConfig.particlePredefinedEffect = this.activeEffect
      this.updateProps('refresh', null)
    }

    this.setState({
      defaultConfig: this.newDefaultConfig,
    })
  }

  render() {
    const { defaultConfig, isLoading } = this.state
    if (isLoading) {
      return <div className={'loading'}>Loading...</div>
    }
    return (
      <>
        <Content />
        {defaultConfig ? (
          <Menu
            config={defaultConfig}
            updateProps={this.updateProps}
            activeEffect={this.activeEffect}
            app={this.app}
            helpingLines={this.graphics.visible}
          />
        ) : (
          <></>
        )}
      </>
    )
  }

  private updateProps = (name: string, props: any) => {
    if (name === 'BackgroundColor') {
      this.app.renderer.backgroundColor = parseInt(`0x${props.hex.replace('#', '')}`, 16)
      return
    }

    switch (name) {
      case 'refresh':
        break
      case 'durationGuard-maxTime':
        this.newDefaultConfig.emitterConfig.emitController._durationGuard.maxTime = props[1]
        this.defaultConfig.emitterConfig.emitController._durationGuard.maxTime = parseFloat(props[1])
        break
      case 'sizeProperties-enabled':
        this.updateNewBehaviour('SizeBehaviour', 'enabled', props[1])
        this.updateBehaviour('SizeBehaviour', 'enabled', props[1])
        break
      case 'sizeProperties-sizeStart':
        if (props[0] === 0) {
          this.updateNewBehaviour('SizeBehaviour', ['sizeStart', 'x'], props[1])
          this.updateBehaviour('SizeBehaviour', ['sizeStart', 'x'], parseFloat(props[1]))
        } else {
          this.updateNewBehaviour('SizeBehaviour', ['sizeStart', 'y'], props[1])
          this.updateBehaviour('SizeBehaviour', ['sizeStart', 'y'], parseFloat(props[1]))
        }
        this.updateNewBehaviour('SizeBehaviour', 'enabled', true)
        this.updateBehaviour('SizeBehaviour', 'enabled', true)
        break
      case 'sizeProperties-sizeEnd':
        if (props[0] === 0) {
          this.updateNewBehaviour('SizeBehaviour', ['sizeEnd', 'x'], props[1])
          this.updateBehaviour('SizeBehaviour', ['sizeEnd', 'x'], parseFloat(props[1]))
        } else {
          this.updateNewBehaviour('SizeBehaviour', ['sizeEnd', 'y'], props[1])
          this.updateBehaviour('SizeBehaviour', ['sizeEnd', 'y'], parseFloat(props[1]))
        }
        this.updateNewBehaviour('SizeBehaviour', 'enabled', true)
        this.updateBehaviour('SizeBehaviour', 'enabled', true)
        break
      case 'sizeProperties-startVariance':
        this.updateNewBehaviour('SizeBehaviour', 'startVariance', props[1])
        this.updateBehaviour('SizeBehaviour', 'startVariance', parseFloat(props[1]))
        this.updateNewBehaviour('SizeBehaviour', 'enabled', true)
        this.updateBehaviour('SizeBehaviour', 'enabled', true)
        break
      case 'sizeProperties-endVariance':
        this.updateNewBehaviour('SizeBehaviour', 'endVariance', props[1])
        this.updateBehaviour('SizeBehaviour', 'endVariance', parseFloat(props[1]))
        this.updateNewBehaviour('SizeBehaviour', 'enabled', true)
        this.updateBehaviour('SizeBehaviour', 'enabled', true)
        break
      case 'rotationProperties-enabled':
        this.updateNewBehaviour('RotationBehaviour', 'enabled', props[1])
        this.updateBehaviour('RotationBehaviour', 'enabled', props[1])
        break
      case 'rotationProperties-rotation':
        this.updateNewBehaviour('RotationBehaviour', 'rotation', props[1])
        this.updateBehaviour('RotationBehaviour', 'rotation', parseFloat(props[1]))
        this.updateNewBehaviour('RotationBehaviour', 'enabled', true)
        this.updateBehaviour('RotationBehaviour', 'enabled', true)
        break
      case 'rotationProperties-variance':
        this.updateNewBehaviour('RotationBehaviour', 'variance', props[1])
        this.updateBehaviour('RotationBehaviour', 'variance', parseFloat(props[1]))
        this.updateNewBehaviour('RotationBehaviour', 'enabled', true)
        this.updateBehaviour('RotationBehaviour', 'enabled', true)
        break
      case 'turbulenceProperties-enabled':
        this.updateNewBehaviour('TurbulenceBehaviour', 'enabled', props[1])
        this.updateBehaviour('TurbulenceBehaviour', 'enabled', props[1])
        break
      case 'turbulenceProperties-showVortices':
        this.updateNewBehaviour('TurbulenceBehaviour', 'showVortices', props[1])
        this.updateBehaviour('TurbulenceBehaviour', 'showVortices', props[1])
        this.updateNewBehaviour('TurbulenceBehaviour', 'enabled', true)
        this.updateBehaviour('TurbulenceBehaviour', 'enabled', true)
        break
      case 'turbulenceProperties-effect':
        this.updateNewBehaviour('TurbulenceBehaviour', 'effect', props[1])
        this.updateBehaviour('TurbulenceBehaviour', 'effect', parseFloat(props[1]))
        this.updateNewBehaviour('TurbulenceBehaviour', 'enabled', true)
        this.updateBehaviour('TurbulenceBehaviour', 'enabled', true)
        break
      case 'turbulenceProperties-position':
        if (props[0] === 0) {
          this.updateNewBehaviour('TurbulenceBehaviour', ['position', 'x'], props[1])
          this.updateBehaviour('TurbulenceBehaviour', ['position', 'x'], parseFloat(props[1]))
        } else {
          this.updateNewBehaviour('TurbulenceBehaviour', ['position', 'y'], props[1])
          this.updateBehaviour('TurbulenceBehaviour', ['position', 'y'], parseFloat(props[1]))
        }
        this.updateNewBehaviour('TurbulenceBehaviour', 'enabled', true)
        this.updateBehaviour('TurbulenceBehaviour', 'enabled', true)
        break
      case 'turbulenceProperties-positionVariance':
        if (props[0] === 0) {
          this.updateNewBehaviour('TurbulenceBehaviour', ['positionVariance', 'x'], props[1])
          this.updateBehaviour('TurbulenceBehaviour', ['positionVariance', 'x'], parseFloat(props[1]))
        } else {
          this.updateNewBehaviour('TurbulenceBehaviour', ['positionVariance', 'y'], props[1])
          this.updateBehaviour('TurbulenceBehaviour', ['positionVariance', 'y'], parseFloat(props[1]))
        }
        this.updateNewBehaviour('TurbulenceBehaviour', 'enabled', true)
        this.updateBehaviour('TurbulenceBehaviour', 'enabled', true)
        break
      case 'turbulenceProperties-velocity':
        if (props[0] === 0) {
          this.updateNewBehaviour('TurbulenceBehaviour', ['velocity', 'x'], props[1])
          this.updateBehaviour('TurbulenceBehaviour', ['velocity', 'x'], parseFloat(props[1]))
        } else {
          this.updateNewBehaviour('TurbulenceBehaviour', ['velocity', 'y'], props[1])
          this.updateBehaviour('TurbulenceBehaviour', ['velocity', 'y'], parseFloat(props[1]))
        }
        this.updateNewBehaviour('TurbulenceBehaviour', 'enabled', true)
        this.updateBehaviour('TurbulenceBehaviour', 'enabled', true)
        break
      case 'turbulenceProperties-velocityVariance':
        if (props[0] === 0) {
          this.updateNewBehaviour('TurbulenceBehaviour', ['velocityVariance', 'x'], props[1])
          this.updateBehaviour('TurbulenceBehaviour', ['velocityVariance', 'x'], parseFloat(props[1]))
        } else {
          this.updateNewBehaviour('TurbulenceBehaviour', ['velocityVariance', 'y'], props[1])
          this.updateBehaviour('TurbulenceBehaviour', ['velocityVariance', 'y'], parseFloat(props[1]))
        }
        this.updateNewBehaviour('TurbulenceBehaviour', 'enabled', true)
        this.updateBehaviour('TurbulenceBehaviour', 'enabled', true)
        break
      case 'turbulenceProperties-acceleration':
        if (props[0] === 0) {
          this.updateNewBehaviour('TurbulenceBehaviour', ['acceleration', 'x'], props[1])
          this.updateBehaviour('TurbulenceBehaviour', ['acceleration', 'x'], parseFloat(props[1]))
        } else {
          this.updateNewBehaviour('TurbulenceBehaviour', ['acceleration', 'y'], props[1])
          this.updateBehaviour('TurbulenceBehaviour', ['acceleration', 'y'], parseFloat(props[1]))
        }
        this.updateNewBehaviour('TurbulenceBehaviour', 'enabled', true)
        this.updateBehaviour('TurbulenceBehaviour', 'enabled', true)
        break
      case 'turbulenceProperties-accelerationVariance':
        if (props[0] === 0) {
          this.updateNewBehaviour('TurbulenceBehaviour', ['accelerationVariance', 'x'], props[1])
          this.updateBehaviour('TurbulenceBehaviour', ['accelerationVariance', 'x'], parseFloat(props[1]))
        } else {
          this.updateNewBehaviour('TurbulenceBehaviour', ['accelerationVariance', 'y'], props[1])
          this.updateBehaviour('TurbulenceBehaviour', ['accelerationVariance', 'y'], parseFloat(props[1]))
        }
        this.updateNewBehaviour('TurbulenceBehaviour', 'enabled', true)
        this.updateBehaviour('TurbulenceBehaviour', 'enabled', true)
        break
      case 'turbulenceProperties-sizeStart':
        if (props[0] === 0) {
          this.updateNewBehaviour('TurbulenceBehaviour', ['sizeStart', 'x'], props[1])
          this.updateBehaviour('TurbulenceBehaviour', ['sizeStart', 'x'], parseFloat(props[1]))
        } else {
          this.updateNewBehaviour('TurbulenceBehaviour', ['sizeStart', 'y'], props[1])
          this.updateBehaviour('TurbulenceBehaviour', ['sizeStart', 'y'], parseFloat(props[1]))
        }
        this.updateNewBehaviour('TurbulenceBehaviour', 'enabled', true)
        this.updateBehaviour('TurbulenceBehaviour', 'enabled', true)
        break
      case 'turbulenceProperties-startVariance':
        this.updateNewBehaviour('TurbulenceBehaviour', 'startVariance', props[1])
        this.updateBehaviour('TurbulenceBehaviour', 'startVariance', parseFloat(props[1]))
        this.updateNewBehaviour('TurbulenceBehaviour', 'enabled', true)
        this.updateBehaviour('TurbulenceBehaviour', 'enabled', true)
        break
      case 'turbulenceProperties-sizeEnd':
        if (props[0] === 0) {
          this.updateNewBehaviour('TurbulenceBehaviour', ['sizeEnd', 'x'], props[1])
          this.updateBehaviour('TurbulenceBehaviour', ['sizeEnd', 'x'], parseFloat(props[1]))
        } else {
          this.updateNewBehaviour('TurbulenceBehaviour', ['sizeEnd', 'y'], props[1])
          this.updateBehaviour('TurbulenceBehaviour', ['sizeEnd', 'y'], parseFloat(props[1]))
        }
        this.updateNewBehaviour('TurbulenceBehaviour', 'enabled', true)
        this.updateBehaviour('TurbulenceBehaviour', 'enabled', true)
        break
      case 'turbulenceProperties-endVariance':
        this.updateNewBehaviour('TurbulenceBehaviour', 'endVariance', props[1])
        this.updateBehaviour('TurbulenceBehaviour', 'endVariance', parseFloat(props[1]))
        this.updateNewBehaviour('TurbulenceBehaviour', 'enabled', true)
        this.updateBehaviour('TurbulenceBehaviour', 'enabled', true)
        break
      case 'turbulenceProperties-emitPerSecond':
        this.updateNewBehaviour('TurbulenceBehaviour', 'emitPerSecond', props[1])
        this.updateBehaviour('TurbulenceBehaviour', 'emitPerSecond', parseFloat(props[1]))
        this.updateNewBehaviour('TurbulenceBehaviour', 'enabled', true)
        this.updateBehaviour('TurbulenceBehaviour', 'enabled', true)
        break
      case 'turbulenceProperties-duration':
        this.updateNewBehaviour('TurbulenceBehaviour', 'duration', props[1])
        this.updateBehaviour('TurbulenceBehaviour', 'duration', parseFloat(props[1]))
        this.updateNewBehaviour('TurbulenceBehaviour', 'enabled', true)
        this.updateBehaviour('TurbulenceBehaviour', 'enabled', true)
        break
      case 'turbulenceProperties-maxLifeTime':
        this.updateNewBehaviour('TurbulenceBehaviour', 'maxLifeTime', props[1])
        this.updateBehaviour('TurbulenceBehaviour', 'maxLifeTime', parseFloat(props[1]))
        this.updateNewBehaviour('TurbulenceBehaviour', 'enabled', true)
        this.updateBehaviour('TurbulenceBehaviour', 'enabled', true)
        break
      case 'turbulenceProperties-maxLifeTimeVariance':
        this.updateNewBehaviour('TurbulenceBehaviour', 'maxLifeTimeVariance', props[1])
        this.updateBehaviour('TurbulenceBehaviour', 'maxLifeTimeVariance', parseFloat(props[1]))
        this.updateNewBehaviour('TurbulenceBehaviour', 'enabled', true)
        this.updateBehaviour('TurbulenceBehaviour', 'enabled', true)
        break
      case 'positionProperties-enabled':
        this.updateNewBehaviour('PositionBehaviour', 'enabled', props[1])
        this.updateBehaviour('PositionBehaviour', 'enabled', props[1])
        break
      case 'positionProperties-spawnType':
        this.updateNewBehaviour('PositionBehaviour', 'spawnType', props[1])
        this.updateBehaviour('PositionBehaviour', 'spawnType', props[1])
        this.updateNewBehaviour('PositionBehaviour', 'enabled', true)
        this.updateBehaviour('PositionBehaviour', 'enabled', true)
        break
      case 'positionProperties-radius':
        this.updateNewBehaviour('PositionBehaviour', 'radius', props[1])
        this.updateBehaviour('PositionBehaviour', 'radius', parseFloat(props[1]))
        this.updateNewBehaviour('PositionBehaviour', 'enabled', true)
        this.updateBehaviour('PositionBehaviour', 'enabled', true)
        break
      case 'positionProperties-radiusXY':
        if (props[0] === 0) {
          this.updateNewBehaviour('PositionBehaviour', 'radiusX', props[1])
          this.updateBehaviour('PositionBehaviour', 'radiusX', parseFloat(props[1]))
        } else {
          this.updateNewBehaviour('PositionBehaviour', 'radiusY', props[1])
          this.updateBehaviour('PositionBehaviour', 'radiusY', parseFloat(props[1]))
        }
        this.updateNewBehaviour('PositionBehaviour', 'enabled', true)
        this.updateBehaviour('PositionBehaviour', 'enabled', true)
        break
      case 'positionProperties-position':
        if (props[0] === 0) {
          this.updateNewBehaviour('PositionBehaviour', ['position', 'x'], props[1])
          this.updateBehaviour('PositionBehaviour', ['position', 'x'], parseFloat(props[1]))
        } else {
          this.updateNewBehaviour('PositionBehaviour', ['position', 'y'], props[1])
          this.updateBehaviour('PositionBehaviour', ['position', 'y'], parseFloat(props[1]))
        }
        this.updateNewBehaviour('PositionBehaviour', 'enabled', true)
        this.updateBehaviour('PositionBehaviour', 'enabled', true)
        break
      case 'positionProperties-positionVariance':
        if (props[0] === 0) {
          this.updateNewBehaviour('PositionBehaviour', ['positionVariance', 'x'], props[1])
          this.updateBehaviour('PositionBehaviour', ['positionVariance', 'x'], parseFloat(props[1]))
        } else {
          this.updateNewBehaviour('PositionBehaviour', ['positionVariance', 'y'], props[1])
          this.updateBehaviour('PositionBehaviour', ['positionVariance', 'y'], parseFloat(props[1]))
        }
        this.updateNewBehaviour('PositionBehaviour', 'enabled', true)
        this.updateBehaviour('PositionBehaviour', 'enabled', true)
        break
      case 'positionProperties-velocity':
        if (props[0] === 0) {
          this.updateNewBehaviour('PositionBehaviour', ['velocity', 'x'], props[1])
          this.updateBehaviour('PositionBehaviour', ['velocity', 'x'], parseFloat(props[1]))
        } else {
          this.updateNewBehaviour('PositionBehaviour', ['velocity', 'y'], props[1])
          this.updateBehaviour('PositionBehaviour', ['velocity', 'y'], parseFloat(props[1]))
        }
        this.updateNewBehaviour('PositionBehaviour', 'enabled', true)
        this.updateBehaviour('PositionBehaviour', 'enabled', true)
        break
      case 'positionProperties-velocityVariance':
        if (props[0] === 0) {
          this.updateNewBehaviour('PositionBehaviour', ['velocityVariance', 'x'], props[1])
          this.updateBehaviour('PositionBehaviour', ['velocityVariance', 'x'], parseFloat(props[1]))
        } else {
          this.updateNewBehaviour('PositionBehaviour', ['velocityVariance', 'y'], props[1])
          this.updateBehaviour('PositionBehaviour', ['velocityVariance', 'y'], parseFloat(props[1]))
        }
        this.updateNewBehaviour('PositionBehaviour', 'enabled', true)
        this.updateBehaviour('PositionBehaviour', 'enabled', true)
        break
      case 'positionProperties-acceleration':
        if (props[0] === 0) {
          this.updateNewBehaviour('PositionBehaviour', ['acceleration', 'x'], props[1])
          this.updateBehaviour('PositionBehaviour', ['acceleration', 'x'], parseFloat(props[1]))
        } else {
          this.updateNewBehaviour('PositionBehaviour', ['acceleration', 'y'], props[1])
          this.updateBehaviour('PositionBehaviour', ['acceleration', 'y'], parseFloat(props[1]))
        }
        this.updateNewBehaviour('PositionBehaviour', 'enabled', true)
        this.updateBehaviour('PositionBehaviour', 'enabled', true)
        break
      case 'positionProperties-accelerationVariance':
        if (props[0] === 0) {
          this.updateNewBehaviour('PositionBehaviour', ['accelerationVariance', 'x'], props[1])
          this.updateBehaviour('PositionBehaviour', ['accelerationVariance', 'x'], parseFloat(props[1]))
        } else {
          this.updateNewBehaviour('PositionBehaviour', ['accelerationVariance', 'y'], props[1])
          this.updateBehaviour('PositionBehaviour', ['accelerationVariance', 'y'], parseFloat(props[1]))
        }
        this.updateNewBehaviour('PositionBehaviour', 'enabled', true)
        this.updateBehaviour('PositionBehaviour', 'enabled', true)
        break
      case 'positionProperties-sinX':
        this.updateNewBehaviour('PositionBehaviour', 'sinX', props[1])
        this.updateBehaviour('PositionBehaviour', 'sinX', props[1])
        this.updateNewBehaviour('PositionBehaviour', ['sinXVal', 'x'], 50)
        this.updateBehaviour('PositionBehaviour', ['sinXVal', 'x'], 50)
        this.updateNewBehaviour('PositionBehaviour', ['sinXValVariance', 'x'], 0)
        this.updateNewBehaviour('PositionBehaviour', ['sinXVal', 'y'], 10)
        this.updateBehaviour('PositionBehaviour', ['sinXVal', 'y'], 10)
        this.updateNewBehaviour('PositionBehaviour', ['sinXValVariance', 'y'], 0)
        break
      case 'positionProperties-sinY':
        this.updateNewBehaviour('PositionBehaviour', 'sinY', props[1])
        this.updateBehaviour('PositionBehaviour', 'sinY', props[1])
        this.updateNewBehaviour('PositionBehaviour', ['sinYVal', 'x'], 50)
        this.updateBehaviour('PositionBehaviour', ['sinYVal', 'x'], 50)
        this.updateNewBehaviour('PositionBehaviour', ['sinYValVariance', 'x'], 0)
        this.updateNewBehaviour('PositionBehaviour', ['sinYVal', 'y'], 10)
        this.updateBehaviour('PositionBehaviour', ['sinYVal', 'y'], 10)
        this.updateNewBehaviour('PositionBehaviour', ['sinYValVariance', 'y'], 0)
        break
      case 'positionProperties-fromAtoB':
        this.updateNewBehaviour('PositionBehaviour', 'fromAtoB', props[1])
        this.updateBehaviour('PositionBehaviour', 'fromAtoB', props[1])
        break
      case 'positionProperties-fromAtoBTwoWays':
        this.updateNewBehaviour('PositionBehaviour', 'fromAtoBTwoWays', props[1])
        this.updateBehaviour('PositionBehaviour', 'fromAtoBTwoWays', props[1])
        break
      case 'positionProperties-pointA':
        if (props[0] === 0) {
          this.updateNewBehaviour('PositionBehaviour', ['pointA', 'x'], props[1])
          this.updateBehaviour('PositionBehaviour', ['pointA', 'x'], parseFloat(props[1]))
        } else {
          this.updateNewBehaviour('PositionBehaviour', ['pointA', 'y'], props[1])
          this.updateBehaviour('PositionBehaviour', ['pointA', 'y'], parseFloat(props[1]))
        }
        break
      case 'positionProperties-pointB':
        if (props[0] === 0) {
          this.updateNewBehaviour('PositionBehaviour', ['pointB', 'x'], props[1])
          this.updateBehaviour('PositionBehaviour', ['pointB', 'x'], parseFloat(props[1]))
        } else {
          this.updateNewBehaviour('PositionBehaviour', ['pointB', 'y'], props[1])
          this.updateBehaviour('PositionBehaviour', ['pointB', 'y'], parseFloat(props[1]))
        }
        break
      case 'positionProperties-there-duration':
        if (props[0] === 0) {
          this.updateNewBehaviour('PositionBehaviour', ['thereDuration', 'min'], props[1])
          this.updateBehaviour('PositionBehaviour', ['thereDuration', 'min'], parseFloat(props[1]))
        } else {
          this.updateNewBehaviour('PositionBehaviour', ['thereDuration', 'max'], props[1])
          this.updateBehaviour('PositionBehaviour', ['thereDuration', 'max'], parseFloat(props[1]))
        }
        break
      case 'positionProperties-there-amplitude':
        if (props[0] === 0) {
          this.updateNewBehaviour('PositionBehaviour', ['thereAmplitude', 'min'], props[1])
          this.updateBehaviour('PositionBehaviour', ['thereAmplitude', 'min'], parseFloat(props[1]))
        } else {
          this.updateNewBehaviour('PositionBehaviour', ['thereAmplitude', 'max'], props[1])
          this.updateBehaviour('PositionBehaviour', ['thereAmplitude', 'max'], parseFloat(props[1]))
        }
        break
      case 'positionProperties-back-duration':
        if (props[0] === 0) {
          this.updateNewBehaviour('PositionBehaviour', ['backDuration', 'min'], props[1])
          this.updateBehaviour('PositionBehaviour', ['backDuration', 'min'], parseFloat(props[1]))
        } else {
          this.updateNewBehaviour('PositionBehaviour', ['backDuration', 'max'], props[1])
          this.updateBehaviour('PositionBehaviour', ['backDuration', 'max'], parseFloat(props[1]))
        }
        break
      case 'positionProperties-back-amplitude':
        if (props[0] === 0) {
          this.updateNewBehaviour('PositionBehaviour', ['backAmplitude', 'min'], props[1])
          this.updateBehaviour('PositionBehaviour', ['backAmplitude', 'min'], parseFloat(props[1]))
        } else {
          this.updateNewBehaviour('PositionBehaviour', ['backAmplitude', 'max'], props[1])
          this.updateBehaviour('PositionBehaviour', ['backAmplitude', 'max'], parseFloat(props[1]))
        }
        break
      case 'positionProperties-thereX':
        this.updateNewBehaviour('PositionBehaviour', ['there', 'x'], props[1])
        this.updateBehaviour('PositionBehaviour', ['there', 'x'], props[1])
        break
      case 'positionProperties-thereY':
        this.updateNewBehaviour('PositionBehaviour', ['there', 'y'], props[1])
        this.updateBehaviour('PositionBehaviour', ['there', 'y'], props[1])
        break
      case 'positionProperties-thereEase':
        this.updateNewBehaviour('PositionBehaviour', ['there', 'ease'], props[1])
        this.updateBehaviour('PositionBehaviour', ['there', 'ease'], props[1])
        break
      case 'positionProperties-backX':
        this.updateNewBehaviour('PositionBehaviour', ['back', 'x'], props[1])
        this.updateBehaviour('PositionBehaviour', ['back', 'x'], props[1])
        break
      case 'positionProperties-backY':
        this.updateNewBehaviour('PositionBehaviour', ['back', 'y'], props[1])
        this.updateBehaviour('PositionBehaviour', ['back', 'y'], props[1])
        break
      case 'positionProperties-backEase':
        this.updateNewBehaviour('PositionBehaviour', ['back', 'ease'], props[1])
        this.updateBehaviour('PositionBehaviour', ['back', 'ease'], props[1])
        break
      case 'positionProperties-warp':
        this.updateNewBehaviour('PositionBehaviour', 'warp', props[1])
        this.updateBehaviour('PositionBehaviour', 'warp', props[1])
        break
      case 'positionProperties-warpDistanceToCenter':
        this.updateNewBehaviour('PositionBehaviour', 'warpDistanceToCenter', props[1])
        this.updateBehaviour('PositionBehaviour', 'warpDistanceToCenter', props[1])
        break
      case 'positionProperties-warpSpeed':
        this.updateNewBehaviour('PositionBehaviour', 'warpSpeed', props[1])
        this.updateBehaviour('PositionBehaviour', 'warpSpeed', parseFloat(props[1]))
        break
      case 'positionProperties-warpBaseSpeed':
        this.updateNewBehaviour('PositionBehaviour', 'warpBaseSpeed', props[1])
        this.updateBehaviour('PositionBehaviour', 'warpBaseSpeed', parseFloat(props[1]))
        break
      case 'positionProperties-cameraZConverter':
        this.updateNewBehaviour('PositionBehaviour', 'cameraZConverter', props[1])
        this.updateBehaviour('PositionBehaviour', 'cameraZConverter', parseFloat(props[1]))
        break
      case 'positionProperties-warpFov':
        this.updateNewBehaviour('PositionBehaviour', 'warpFov', props[1])
        this.updateBehaviour('PositionBehaviour', 'warpFov', parseFloat(props[1]))
        break
      case 'positionProperties-warpStretch':
        this.updateNewBehaviour('PositionBehaviour', 'warpStretch', props[1])
        this.updateBehaviour('PositionBehaviour', 'warpStretch', parseFloat(props[1]))
        break
      case 'positionProperties-warpDistanceScaleConverter':
        this.updateNewBehaviour('PositionBehaviour', 'warpDistanceScaleConverter', props[1])
        this.updateBehaviour('PositionBehaviour', 'warpDistanceScaleConverter', parseFloat(props[1]))
        break
      case 'positionProperties-sinXVal':
        if (props[0] === 0) {
          this.updateNewBehaviour('PositionBehaviour', ['sinXVal', 'x'], props[1])
          this.updateBehaviour('PositionBehaviour', ['sinXVal', 'x'], parseFloat(props[1]))
        } else {
          this.updateNewBehaviour('PositionBehaviour', ['sinXVal', 'y'], props[1])
          this.updateBehaviour('PositionBehaviour', ['sinXVal', 'y'], parseFloat(props[1]))
        }
        this.updateNewBehaviour('PositionBehaviour', 'enabled', true)
        this.updateBehaviour('PositionBehaviour', 'enabled', true)
        this.updateNewBehaviour('PositionBehaviour', 'sinX', true)
        this.updateBehaviour('PositionBehaviour', 'sinX', true)
        break
      case 'positionProperties-sinYVal':
        if (props[0] === 0) {
          this.updateNewBehaviour('PositionBehaviour', ['sinYVal', 'x'], props[1])
          this.updateBehaviour('PositionBehaviour', ['sinYVal', 'x'], parseFloat(props[1]))
        } else {
          this.updateNewBehaviour('PositionBehaviour', ['sinYVal', 'y'], props[1])
          this.updateBehaviour('PositionBehaviour', ['sinYVal', 'y'], parseFloat(props[1]))
        }
        this.updateNewBehaviour('PositionBehaviour', 'enabled', true)
        this.updateBehaviour('PositionBehaviour', 'enabled', true)
        this.updateNewBehaviour('PositionBehaviour', 'sinY', true)
        this.updateBehaviour('PositionBehaviour', 'sinY', true)
        break
      case 'positionProperties-sinXValVariance':
        if (props[0] === 0) {
          this.updateNewBehaviour('PositionBehaviour', ['sinXValVariance', 'x'], props[1])
          this.updateBehaviour('PositionBehaviour', ['sinXValVariance', 'x'], parseFloat(props[1]))
        } else {
          this.updateNewBehaviour('PositionBehaviour', ['sinXValVariance', 'y'], props[1])
          this.updateBehaviour('PositionBehaviour', ['sinXValVariance', 'y'], parseFloat(props[1]))
        }
        this.updateNewBehaviour('PositionBehaviour', 'enabled', true)
        this.updateBehaviour('PositionBehaviour', 'enabled', true)
        this.updateNewBehaviour('PositionBehaviour', 'sinX', true)
        this.updateBehaviour('PositionBehaviour', 'sinX', true)
        break
      case 'positionProperties-sinYValVariance':
        if (props[0] === 0) {
          this.updateNewBehaviour('PositionBehaviour', ['sinYValVariance', 'x'], props[1])
          this.updateBehaviour('PositionBehaviour', ['sinYValVariance', 'x'], parseFloat(props[1]))
        } else {
          this.updateNewBehaviour('PositionBehaviour', ['sinYValVariance', 'y'], props[1])
          this.updateBehaviour('PositionBehaviour', ['sinYValVariance', 'y'], parseFloat(props[1]))
        }
        this.updateNewBehaviour('PositionBehaviour', 'enabled', true)
        this.updateBehaviour('PositionBehaviour', 'enabled', true)
        this.updateNewBehaviour('PositionBehaviour', 'sinY', true)
        this.updateBehaviour('PositionBehaviour', 'sinY', true)
        break
      case 'collisionProperties-enabled':
        this.updateNewBehaviour('CollisionBehaviour', 'enabled', props[1])
        this.updateBehaviour('CollisionBehaviour', 'enabled', props[1])
        break
      case 'collisionProperties-changeHelpingLines':
        this.graphics.visible = props[1]
        break
      case 'collisionProperties-distance':
        this.updateNewBehaviour('CollisionBehaviour', 'distance', props[1])
        this.updateBehaviour('CollisionBehaviour', 'distance', parseFloat(props[1]))
        this.updateNewBehaviour('CollisionBehaviour', 'enabled', true)
        this.updateBehaviour('CollisionBehaviour', 'enabled', true)
        break
      case 'collisionProperties-lines':
        this.updateNewBehaviour('CollisionBehaviour', 'lines', props[1])
        this.updateBehaviour('CollisionBehaviour', 'lines', props[1])
        this.updateNewBehaviour('CollisionBehaviour', 'enabled', true)
        this.updateBehaviour('CollisionBehaviour', 'enabled', true)
        this.updateProps('refresh', [])
        break
      case 'collisionProperties-skipPositionBehaviourOnCollision':
        this.updateNewBehaviour('CollisionBehaviour', 'skipPositionBehaviourOnCollision', props[1])
        this.updateBehaviour('CollisionBehaviour', 'skipPositionBehaviourOnCollision', props[1])
        break
      case 'collisionProperties-skipAngularVelocityBehaviourOnCollision':
        this.updateNewBehaviour('CollisionBehaviour', 'skipAngularVelocityBehaviourOnCollision', props[1])
        this.updateBehaviour('CollisionBehaviour', 'skipAngularVelocityBehaviourOnCollision', props[1])
        break
      case 'collisionProperties-skipColorBehaviourOnCollision':
        this.updateNewBehaviour('CollisionBehaviour', 'skipColorBehaviourOnCollision', props[1])
        this.updateBehaviour('CollisionBehaviour', 'skipColorBehaviourOnCollision', props[1])
        break
      case 'collisionProperties-skipEmitDirectionBehaviourOnCollision':
        this.updateNewBehaviour('CollisionBehaviour', 'skipEmitDirectionBehaviourOnCollision', props[1])
        this.updateBehaviour('CollisionBehaviour', 'skipEmitDirectionBehaviourOnCollision', props[1])
        break
      case 'collisionProperties-skipRotationBehaviourOnCollision':
        this.updateNewBehaviour('CollisionBehaviour', 'skipRotationBehaviourOnCollision', props[1])
        this.updateBehaviour('CollisionBehaviour', 'skipRotationBehaviourOnCollision', props[1])
        break
      case 'collisionProperties-skipSizeBehaviourOnCollision':
        this.updateNewBehaviour('CollisionBehaviour', 'skipSizeBehaviourOnCollision', props[1])
        this.updateBehaviour('CollisionBehaviour', 'skipSizeBehaviourOnCollision', props[1])
        break
      case 'colorProperties-enabled':
        this.updateNewBehaviour('ColorBehaviour', 'enabled', props[1])
        this.updateBehaviour('ColorBehaviour', 'enabled', props[1])
        break
      case 'colorProperties-sine':
        this.updateNewBehaviour('ColorBehaviour', 'sinus', props[1])
        this.updateBehaviour('ColorBehaviour', 'sinus', props[1])
        break
      case 'colorProperties-start':
        this.updateNewBehaviour('ColorBehaviour', ['start', '_r'], props.rgb.r)
        this.updateNewBehaviour('ColorBehaviour', ['start', '_g'], props.rgb.g)
        this.updateNewBehaviour('ColorBehaviour', ['start', '_b'], props.rgb.b)
        this.updateNewBehaviour('ColorBehaviour', ['start', '_alpha'], props.rgb.a)
        this.updateNewBehaviour('ColorBehaviour', 'enabled', true)
        this.updateBehaviour('ColorBehaviour', ['start', '_r'], parseFloat(props.rgb.r))
        this.updateBehaviour('ColorBehaviour', ['start', '_g'], parseFloat(props.rgb.g))
        this.updateBehaviour('ColorBehaviour', ['start', '_b'], parseFloat(props.rgb.b))
        this.updateBehaviour('ColorBehaviour', ['start', '_alpha'], parseFloat(props.rgb.a))
        this.updateBehaviour('ColorBehaviour', 'enabled', true)
        break
      case 'colorProperties-end':
        this.updateNewBehaviour('ColorBehaviour', ['end', '_r'], props.rgb.r)
        this.updateNewBehaviour('ColorBehaviour', ['end', '_g'], props.rgb.g)
        this.updateNewBehaviour('ColorBehaviour', ['end', '_b'], props.rgb.b)
        this.updateNewBehaviour('ColorBehaviour', ['end', '_alpha'], props.rgb.a)
        this.updateNewBehaviour('ColorBehaviour', 'enabled', true)
        this.updateBehaviour('ColorBehaviour', ['end', '_r'], parseFloat(props.rgb.r))
        this.updateBehaviour('ColorBehaviour', ['end', '_g'], parseFloat(props.rgb.g))
        this.updateBehaviour('ColorBehaviour', ['end', '_b'], parseFloat(props.rgb.b))
        this.updateBehaviour('ColorBehaviour', ['end', '_alpha'], parseFloat(props.rgb.a))
        this.updateBehaviour('ColorBehaviour', 'enabled', true)
        break
      case 'colorProperties-startVariance':
        this.updateNewBehaviour('ColorBehaviour', ['startVariance', '_r'], props.rgb.r)
        this.updateNewBehaviour('ColorBehaviour', ['startVariance', '_g'], props.rgb.g)
        this.updateNewBehaviour('ColorBehaviour', ['startVariance', '_b'], props.rgb.b)
        this.updateNewBehaviour('ColorBehaviour', ['startVariance', '_alpha'], props.rgb.a)
        this.updateNewBehaviour('ColorBehaviour', 'enabled', true)
        this.updateBehaviour('ColorBehaviour', ['startVariance', '_r'], parseFloat(props.rgb.r))
        this.updateBehaviour('ColorBehaviour', ['startVariance', '_g'], parseFloat(props.rgb.g))
        this.updateBehaviour('ColorBehaviour', ['startVariance', '_b'], parseFloat(props.rgb.b))
        this.updateBehaviour('ColorBehaviour', ['startVariance', '_alpha'], parseFloat(props.rgb.a))
        this.updateBehaviour('ColorBehaviour', 'enabled', true)
        break
      case 'colorProperties-endVariance':
        this.updateNewBehaviour('ColorBehaviour', ['endVariance', '_r'], props.rgb.r)
        this.updateNewBehaviour('ColorBehaviour', ['endVariance', '_g'], props.rgb.g)
        this.updateNewBehaviour('ColorBehaviour', ['endVariance', '_b'], props.rgb.b)
        this.updateNewBehaviour('ColorBehaviour', ['endVariance', '_alpha'], props.rgb.a)
        this.updateNewBehaviour('ColorBehaviour', 'enabled', true)
        this.updateBehaviour('ColorBehaviour', ['endVariance', '_r'], parseFloat(props.rgb.r))
        this.updateBehaviour('ColorBehaviour', ['endVariance', '_g'], parseFloat(props.rgb.g))
        this.updateBehaviour('ColorBehaviour', ['endVariance', '_b'], parseFloat(props.rgb.b))
        this.updateBehaviour('ColorBehaviour', ['endVariance', '_alpha'], parseFloat(props.rgb.a))
        this.updateBehaviour('ColorBehaviour', 'enabled', true)
        break
      case 'lifeProperties-maxLifeTime':
        this.updateNewBehaviour('LifeBehaviour', 'maxLifeTime', props[1])
        this.updateBehaviour('LifeBehaviour', 'maxLifeTime', parseFloat(props[1]))
        break
      case 'lifeProperties-timeVariance':
        this.updateNewBehaviour('LifeBehaviour', 'timeVariance', props[1])
        this.updateBehaviour('LifeBehaviour', 'timeVariance', parseFloat(props[1]))
        break
      case 'angularVelocityProperties-enabled':
        this.updateNewBehaviour('AngularVelocityBehaviour', 'enabled', props[1])
        this.updateBehaviour('AngularVelocityBehaviour', 'enabled', props[1])
        break
      case 'angularVelocityProperties-degrees':
        this.updateNewBehaviour('AngularVelocityBehaviour', 'degrees', props[1])
        this.updateNewBehaviour('AngularVelocityBehaviour', 'enabled', true)
        this.updateBehaviour('AngularVelocityBehaviour', 'degrees', parseFloat(props[1]))
        this.updateBehaviour('AngularVelocityBehaviour', 'enabled', true)
        break
      case 'angularVelocityProperties-degreesVariance':
        this.updateNewBehaviour('AngularVelocityBehaviour', 'degreesVariance', props[1])
        this.updateNewBehaviour('AngularVelocityBehaviour', 'enabled', true)
        this.updateBehaviour('AngularVelocityBehaviour', 'degreesVariance', parseFloat(props[1]))
        this.updateBehaviour('AngularVelocityBehaviour', 'enabled', true)
        break
      case 'angularVelocityProperties-maxRadius':
        this.updateNewBehaviour('AngularVelocityBehaviour', 'maxRadius', props[1])
        this.updateNewBehaviour('AngularVelocityBehaviour', 'enabled', true)
        this.updateBehaviour('AngularVelocityBehaviour', 'maxRadius', parseFloat(props[1]))
        this.updateBehaviour('AngularVelocityBehaviour', 'enabled', true)
        break
      case 'angularVelocityProperties-maxRadiusVariance':
        this.updateNewBehaviour('AngularVelocityBehaviour', 'maxRadiusVariance', props[1])
        this.updateNewBehaviour('AngularVelocityBehaviour', 'enabled', true)
        this.updateBehaviour('AngularVelocityBehaviour', 'maxRadiusVariance', parseFloat(props[1]))
        this.updateBehaviour('AngularVelocityBehaviour', 'enabled', true)
        break
      case 'angularVelocityProperties-minRadius':
        this.updateNewBehaviour('AngularVelocityBehaviour', 'minRadius', props[1])
        this.updateNewBehaviour('AngularVelocityBehaviour', 'enabled', true)
        this.updateBehaviour('AngularVelocityBehaviour', 'minRadius', parseFloat(props[1]))
        this.updateBehaviour('AngularVelocityBehaviour', 'enabled', true)
        break
      case 'angularVelocityProperties-minRadiusVariance':
        this.updateNewBehaviour('AngularVelocityBehaviour', 'minRadiusVariance', props[1])
        this.updateNewBehaviour('AngularVelocityBehaviour', 'enabled', true)
        this.updateBehaviour('AngularVelocityBehaviour', 'minRadiusVariance', parseFloat(props[1]))
        this.updateBehaviour('AngularVelocityBehaviour', 'enabled', true)
        break
      case 'emitDirectionProperties-enabled':
        this.updateNewBehaviour('EmitDirectionBehaviour', 'enabled', props[1])
        this.updateBehaviour('EmitDirectionBehaviour', 'enabled', props[1])
        break
      case 'emitDirectionProperties-angle':
        this.updateNewBehaviour('EmitDirectionBehaviour', 'angle', props[1])
        this.updateBehaviour('EmitDirectionBehaviour', 'angle', parseFloat(props[1]))
        break
      case 'emitDirectionProperties-variance':
        this.updateNewBehaviour('EmitDirectionBehaviour', 'variance', props[1])
        this.updateBehaviour('EmitDirectionBehaviour', 'variance', parseFloat(props[1]))
        break
      case 'EmissionTypeProperties-_maxParticles':
        this.newDefaultConfig.emitterConfig.emitController._maxParticles = props[1]
        this.defaultConfig.emitterConfig.emitController._maxParticles = parseFloat(props[1])
        break
      case 'EmissionTypeProperties-_emitPerSecond':
        this.newDefaultConfig.emitterConfig.emitController._emitPerSecond = props[1]
        this.defaultConfig.emitterConfig.emitController._emitPerSecond = parseFloat(props[1])
        break
      case 'EmissionTypeProperties-duration':
        this.newDefaultConfig.emitterConfig.duration = props[1]
        this.defaultConfig.emitterConfig.duration = parseFloat(props[1])
        break
      case 'EmissionTypeProperties-name':
        this.newDefaultConfig.emitterConfig.emitController.name = props[1]
        this.defaultConfig.emitterConfig.emitController.name = props[1]
        if (props[1] === 'UniformEmission') {
          this.newDefaultConfig.emitterConfig.emitController._emitPerSecond = 200
          this.defaultConfig.emitterConfig.emitController._emitPerSecond = 200
        } else {
          this.newDefaultConfig.emitterConfig.emitController._maxParticles = 10
          this.newDefaultConfig.emitterConfig.emitController._emissionRate = 10
          this.defaultConfig.emitterConfig.emitController._maxParticles = 10
          this.defaultConfig.emitterConfig.emitController._emissionRate = 10
        }
        break
      case 'EmissionTypeProperties-_maxParticles':
        this.newDefaultConfig.emitterConfig.emitController._maxParticles = props[1]
        this.defaultConfig.emitterConfig.emitController._maxParticles = props[1]
        break
      case 'EmissionTypeProperties-_emissionRate':
        this.newDefaultConfig.emitterConfig.emitController._emissionRate = props[1]
        this.defaultConfig.emitterConfig.emitController._emissionRate = props[1]
        break
      case 'particlePredefinedImage':
        this.newDefaultConfig.particlePredefinedImage = props[1]
        this.defaultConfig.particlePredefinedImage = props[1]
        this.newDefaultConfig.textures = [props[1]]
        this.defaultConfig.textures = [props[1]]
        this.resize()
        break
      case 'particlePredefinedEffect':
        // @ts-ignore
        this.bgSprite = null
        // @ts-ignore
        this.bgSprite2 = null
        this.bgContainer.removeChildren()
        this.bgContainer2.removeChildren()
        if (this.bgSprite) {
          this.bgSprite.removeChildren()
        }
        if (this.bgSprite2) {
          this.bgSprite2.removeChildren()
        }

        props = props[1]
        this.activeEffect = props

        function updateQueryParameter(key, value) {
          const url = new URL(window.location.href)

          if (value === null || value === undefined) {
            url.searchParams.delete(key) // Remove the parameter if value is null or undefined
          } else {
            url.searchParams.set(key, value) // Add or update the parameter
          }

          // Use history.pushState() or history.replaceState() to update the URL without reloading
          history.replaceState(null, '', url.toString())
        }

        updateQueryParameter('effect', this.activeEffect)

        this.orgConfig = JSON.parse(JSON.stringify(this.conf[props]))
        this.defaultConfig = JSON.parse(JSON.stringify(this.conf[props]))
        this.newDefaultConfig = JSON.parse(JSON.stringify(this.conf[props]))

        if (this.defaultConfig.emitterConfig.animatedSprite) {
          this.newDefaultConfig.emitterConfig.animatedSprite.animatedSpriteName = this.defaultConfig.textures[0]
          this.defaultConfig.emitterConfig.animatedSprite.animatedSpriteName = this.defaultConfig.textures[0]
        }

        if (props === 'sun') {
          const bgTexture = Texture.from('blackHole')
          const sprite = new Sprite(bgTexture)
          this.bgSprite = sprite
          this.bgSpriteSize = {
            w: sprite.width,
            h: sprite.height,
          }
          this.bgContainer.addChild(sprite)
        } else if (props === 'magic8') {
          const bgTexture = Texture.from('face')
          const sprite = new Sprite(bgTexture)
          this.bgSprite = sprite
          this.bgSpriteSize = {
            w: sprite.width,
            h: sprite.height,
          }
          this.bgContainer.addChild(sprite)
        } else if (props === 'magic9') {
          const bgTexture = Texture.from('face')
          const sprite = new Sprite(bgTexture)
          this.bgSprite = sprite
          this.bgSpriteSize = {
            w: sprite.width,
            h: sprite.height,
          }
          this.bgContainer.addChild(sprite)
        } else if (props === 'magic10') {
          const bgTexture = Texture.from('face')
          const sprite = new Sprite(bgTexture)
          this.bgSprite = sprite
          this.bgSpriteSize = {
            w: sprite.width,
            h: sprite.height,
          }
          this.bgContainer.addChild(sprite)
        } else if (props === 'sun2') {
          const bgTexture = Texture.from('blackHole')
          const sprite = new Sprite(bgTexture)
          this.bgSprite = sprite
          this.bgSpriteSize = {
            w: sprite.width,
            h: sprite.height,
          }
          this.bgContainer.addChild(sprite)
        } else if (props === 'squareSmoke') {
        } else if (props === 'fall') {
          const bgTexture = Texture.from('autumn')
          const sprite = new Sprite(bgTexture)
          this.bgSprite = sprite
          this.bgSpriteSize = {
            w: sprite.width,
            h: sprite.height,
          }
          this.bgContainer.addChild(sprite)
        } else if (props === 'twist') {
          const bgTexture = Texture.from('autumn')
          const sprite = new Sprite(bgTexture)
          this.bgSprite = sprite
          this.bgSpriteSize = {
            w: sprite.width,
            h: sprite.height,
          }
          this.bgContainer.addChild(sprite)
        } else if (props === 'snowWithCollision') {
          const bgTexture = Texture.from('house')
          const sprite = new Sprite(bgTexture)
          this.bgSprite = sprite
          this.bgSpriteSize = {
            w: sprite.width,
            h: sprite.height,
          }
          this.bgContainer.addChild(sprite)
          this.graphics.visible = false
        } else if (props === 'campFire') {
          const bgTexture = Texture.from('campFire')
          const sprite = new Sprite(bgTexture)
          this.bgSprite = sprite
          this.bgSpriteSize = {
            w: sprite.width,
            h: sprite.height,
          }
          this.bgContainer.addChild(sprite)
        } else if (props === 'coinShowerWithCollision') {
          this.graphics.visible = false
        } else if (props === 'campFireTurbulence') {
          const bgTexture = Texture.from('campFire')
          const sprite = new Sprite(bgTexture)
          this.bgSprite = sprite
          this.bgSpriteSize = {
            w: sprite.width,
            h: sprite.height,
          }
          this.bgContainer.addChild(sprite)
        } else if (props === 'birds') {
          const bgTexture = Texture.from('birds')
          const sprite = new Sprite(bgTexture)
          this.bgSprite = sprite
          this.bgSpriteSize = {
            w: sprite.width,
            h: sprite.height,
          }
          this.bgContainer.addChild(sprite)
        } else if (props === 'cigarette') {
          const bgTexture = Texture.from('cigarette')
          const sprite = new Sprite(bgTexture)
          this.bgSprite = sprite
          this.bgSpriteSize = {
            w: sprite.width,
            h: sprite.height,
          }
          this.bgContainer.addChild(sprite)
        } else {
          // this.newDefaultConfig.emitterConfig.alpha = this.particlesContainer.alpha
          // this.defaultConfig.emitterConfig.alpha = this.particlesContainer.alpha
        }
        this.newDefaultConfig.particlePredefinedEffect = props
        this.defaultConfig.particlePredefinedEffect = props
        this.resize()
        break
      case 'bg-image':
        const loader2 = PixiLoader.shared
        if (!loader2.resources[props[1].fileName]) {
          loader2.add(props[1].fileName, props[1].result)
          loader2.load()
          loader2.onComplete.once((x) => {
            this.bgContainer.removeChildren()
            this.bgContainer2.removeChildren()
            if (this.bgSprite) {
              this.bgSprite.removeChildren()
            }
            if (this.bgSprite2) {
              this.bgSprite2.removeChildren()
            }
            const bgTexture = Texture.from(props[1].fileName)
            const sprite = new Sprite(bgTexture)
            this.bgSprite = sprite
            this.bgContainer.addChild(sprite)
            this.bgSpriteSize = {
              w: sprite.width,
              h: sprite.height,
            }
            this.resize()
          })
        } else {
          this.bgContainer.removeChildren()
          this.bgContainer2.removeChildren()
          if (this.bgSprite) {
            this.bgSprite.removeChildren()
          }
          if (this.bgSprite2) {
            this.bgSprite2.removeChildren()
          }
          const bgTexture = Texture.from(props[1].fileName)
          const sprite = new Sprite(bgTexture)
          this.bgSprite = sprite
          this.bgContainer.addChild(sprite)
          this.bgSpriteSize = {
            w: sprite.width,
            h: sprite.height,
          }
          this.resize()
        }
        break
      case 'particle-images':
        const loader = PixiLoader.shared
        const arrayOfTextures = []

        let howManyToLoad = 0
        props[1].forEach((file) => {
          // @ts-ignore
          arrayOfTextures.push(file.fileName)
          if (!loader.resources[file.fileName]) {
            howManyToLoad++
            loader.add(file.fileName, file.result)
          } else {
            this.newDefaultConfig.textures = arrayOfTextures
            this.defaultConfig.textures = arrayOfTextures
            this.updateProps('refresh', [])
          }
        })
        if (howManyToLoad > 0) {
          loader.load()
          loader.onComplete.once((x) => {
            if (
              props[1][0].result.indexOf('data:application/octet-stream;') !== -1 ||
              props[1][0].result.indexOf('data:application/json;') !== -1
            ) {
              this.newDefaultConfig.textures = props[1]
              this.defaultConfig.textures = props[1]
            } else {
              this.newDefaultConfig.textures = arrayOfTextures
              this.defaultConfig.textures = arrayOfTextures
            }
            this.updateProps('refresh', [])
          })
        }
        break
      case 'particle-finishing-images':
        this.newDefaultConfig.finishingTextures = props[1]
        this.defaultConfig.finishingTextures = props[1]
        break
      case 'load-config':
        const config = JSON.parse(props[1])
        this.orgConfig.emitterConfig = JSON.parse(JSON.stringify(config))
        this.newDefaultConfig.emitterConfig = JSON.parse(JSON.stringify(config))
        this.defaultConfig.emitterConfig = JSON.parse(JSON.stringify(config))
        break
      case 'download-config':
        const downloadableObj = this.particles.emitter.getParser().write()
        const behaviourIndex = this.getConfigIndexByName('PositionBehaviour')
        const behaviour = this.getBehaviourByIndex(behaviourIndex, name)
        if (behaviour) {
          if (!behaviour.warp) {
            delete behaviour.warpStretch
            delete behaviour.warpSpeed
            delete behaviour.warpFov
            delete behaviour.warpDistanceScaleConverter
            delete behaviour.warpBaseSpeed
            delete behaviour.warp
            delete behaviour.cameraZConverter
          }
          if (!behaviour.sinX) {
            delete behaviour.sinXVal
            delete behaviour.sinX
            delete behaviour.sinXValVariance
          }
          if (!behaviour.sinY) {
            delete behaviour.sinYVal
            delete behaviour.sinY
            delete behaviour.sinYValVariance
          }
        }
        downloadableObj.behaviours[behaviourIndex] = behaviour
        const blob = new Blob([JSON.stringify(downloadableObj)], {
          type: 'application/json',
        })
        saveAs(blob, 'particle_config')
        break
      case 'global-alpha':
        this.newDefaultConfig.emitterConfig.alpha = props[1]
        this.defaultConfig.emitterConfig.alpha = parseFloat(props[1])
        break
      case 'global-anchor':
        if (!this.defaultConfig.emitterConfig.anchor) {
          this.defaultConfig.emitterConfig.anchor = {}
        }
        if (!this.newDefaultConfig.emitterConfig.anchor) {
          this.newDefaultConfig.emitterConfig.anchor = {}
        }
        if (props[0] === 0) {
          this.newDefaultConfig.emitterConfig.anchor.x = props[1]
          this.defaultConfig.emitterConfig.anchor.x = parseFloat(props[1])
        } else {
          this.newDefaultConfig.emitterConfig.anchor.y = props[1]
          this.defaultConfig.emitterConfig.anchor.y = parseFloat(props[1])
        }
        break
      case 'global-animatedSprite':
        if (props[1]) {
          this.newDefaultConfig.emitterConfig.animatedSprite = {
            enabled: props[1],
            loop: true,
            frameRate: 0.25,
          }
          this.defaultConfig.emitterConfig.animatedSprite = {
            enabled: props[1],
            loop: true,
            frameRate: 0.25,
          }
        } else {
          this.defaultConfig.emitterConfig.animatedSprite = undefined
          this.newDefaultConfig.emitterConfig.animatedSprite = undefined
          this.newDefaultConfig.textures = [...this.orgConfig.textures]
          this.defaultConfig.textures = [...this.orgConfig.textures]
        }

        break
      case 'global-animatedSpriteName':
        const spirites = props[1].replace(' ', '').split(',')
        this.newDefaultConfig.emitterConfig.animatedSpriteName = props[1]
        this.defaultConfig.emitterConfig.animatedSpriteName = props[1]
        this.newDefaultConfig.emitterConfig.animatedSprite.animatedSpriteName = props[1]
        this.defaultConfig.emitterConfig.animatedSprite.animatedSpriteName = props[1]
        this.newDefaultConfig.textures = spirites
        this.defaultConfig.textures = spirites
        break
      case 'global-animatedSpriteFrameRate':
        this.newDefaultConfig.emitterConfig.animatedSpriteFrameRate = props[1]
        this.defaultConfig.emitterConfig.animatedSpriteFrameRate = parseFloat(props[1])
        if (!this.newDefaultConfig.emitterConfig.animatedSprite) {
          this.newDefaultConfig.emitterConfig.animatedSprite = {
            loop: true,
            frameRate: 0.25,
          }
        }
        if (!this.defaultConfig.emitterConfig.animatedSprite) {
          this.defaultConfig.emitterConfig.animatedSprite = {
            loop: true,
            frameRate: 0.25,
          }
        }
        this.newDefaultConfig.emitterConfig.animatedSprite.frameRate = props[1]
        this.defaultConfig.emitterConfig.animatedSprite.frameRate = parseFloat(props[1])
        break
      case 'global-animatedSpriteIndexToStart':
        this.newDefaultConfig.emitterConfig.animatedSpriteIndexToStart = props[1]
        this.defaultConfig.emitterConfig.animatedSpriteIndexToStart = parseFloat(props[1])
        if (!this.newDefaultConfig.emitterConfig.animatedSprite) {
          this.newDefaultConfig.emitterConfig.animatedSprite = {
            loop: true,
            frameRate: 0.25,
          }
        }
        if (!this.defaultConfig.emitterConfig.animatedSprite) {
          this.defaultConfig.emitterConfig.animatedSprite = {
            loop: true,
            frameRate: 0.25,
          }
        }
        this.newDefaultConfig.animatedSpriteIndexToStart = props[1]
        this.defaultConfig.animatedSpriteIndexToStart = parseFloat(props[1])
        break
      case 'global-animatedSpriteZeroPad':
        this.newDefaultConfig.emitterConfig.animatedSpriteZeroPad = props[1]
        this.defaultConfig.emitterConfig.animatedSpriteZeroPad = parseFloat(props[1])
        if (!this.newDefaultConfig.emitterConfig.animatedSprite) {
          this.newDefaultConfig.emitterConfig.animatedSprite = {
            loop: true,
            frameRate: 0.25,
          }
        }
        if (!this.defaultConfig.emitterConfig.animatedSprite) {
          this.defaultConfig.emitterConfig.animatedSprite = {
            loop: true,
            frameRate: 0.25,
          }
        }
        this.newDefaultConfig.animatedSpriteZeroPad = props[1]
        this.defaultConfig.animatedSpriteZeroPad = parseFloat(props[1])
        break
      case 'global-animatedSpriteLoop':
        this.newDefaultConfig.emitterConfig.animatedSpriteLoop = props[1]
        this.defaultConfig.emitterConfig.animatedSpriteLoop = props[1]
        if (!this.newDefaultConfig.emitterConfig.animatedSprite) {
          this.newDefaultConfig.emitterConfig.animatedSprite = {
            loop: true,
            frameRate: 0.25,
          }
        }
        if (!this.defaultConfig.emitterConfig.animatedSprite) {
          this.defaultConfig.emitterConfig.animatedSprite = {
            loop: true,
            frameRate: 0.25,
          }
        }
        this.newDefaultConfig.emitterConfig.animatedSprite.loop = props[1]
        this.defaultConfig.emitterConfig.animatedSprite.loop = props[1]
        break
      case 'global-followMouse':
        this.app.stage.interactive = props[1]
        break
      case 'global-animatedSpriteRandomFrameStart':
        this.newDefaultConfig.emitterConfig.animatedSpriteRandomFrameStart = props[1]
        this.defaultConfig.emitterConfig.animatedSpriteRandomFrameStart = props[1]
        if (!this.newDefaultConfig.emitterConfig.animatedSprite) {
          this.newDefaultConfig.emitterConfig.animatedSprite = {
            RandomFrameStart: false,
            loop: true,
            frameRate: 0.25,
          }
        }
        if (!this.defaultConfig.emitterConfig.animatedSprite) {
          this.defaultConfig.emitterConfig.animatedSprite = {
            RandomFrameStart: false,
            loop: true,
            frameRate: 0.25,
          }
        }
        this.newDefaultConfig.emitterConfig.animatedSprite.randomFrameStart = props[1]
        this.defaultConfig.emitterConfig.animatedSprite.randomFrameStart = props[1]
        break
      case 'global-blendMode':
        this.newDefaultConfig.emitterConfig.blendMode = parseFloat(props[1])
        this.defaultConfig.emitterConfig.blendMode = parseFloat(props[1])
        break
    }

    if (this.activeEffect !== 'warpWithEffect' && this.activeEffect !== 'warpWithEffectV2') {
      this.stopAllParticlesArr()
    }

    if (propsToReloadEverything.includes(name)) {
      this.reloadEverything()
    } else {
      this.particles.updateConfig(this.defaultConfig.emitterConfig)
      this.particles.updateTexture()
    }

    this.setState({
      name,
      props,
      defaultConfig: this.newDefaultConfig,
    })
  }

  private createParticles(): Renderer {
    this.particles = customPixiParticles.create(this.defaultConfig)
    this.particles.play()
    // @ts-ignore
    return this.particlesContainer.addChild(this.particles)
  }

  private resize() {
    const content = document.getElementsByClassName('content')[0]
    const finalInnerWidth = content.clientWidth
    const finalInnerHeight = content.clientHeight
    this.app.renderer.view.style.width = `${finalInnerWidth}px`
    this.app.renderer.view.style.height = `${finalInnerHeight}px`
    this.app.renderer.resize(finalInnerWidth, finalInnerHeight)

    this.particlesContainer.position.x = content.clientWidth / 2
    this.particlesContainer.position.y = content.clientHeight / 2
    this.graphics.position.set(content.clientWidth / 2, content.clientHeight / 2)

    if (this.bgSprite) {
      let scale
      if (finalInnerWidth - 400 < this.bgSpriteSize.w) {
        scale = finalInnerWidth / this.bgSpriteSize.w
        this.bgContainer.position.x = 0
        this.bgContainer.position.y = (finalInnerHeight - this.bgSpriteSize.h * scale) / 2
        this.bgContainer2.position.x = 0
        this.bgContainer2.position.y = (finalInnerHeight - this.bgSpriteSize.h * scale) / 2
      } else {
        scale = finalInnerHeight / this.bgSpriteSize.h
        this.bgContainer.position.x = (finalInnerWidth - this.bgSpriteSize.w * scale) / 2
        this.bgContainer.position.y = 0
        this.bgContainer2.position.x = (finalInnerWidth - this.bgSpriteSize.w * scale) / 2
        this.bgContainer2.position.y = 0
      }
      if (this.bgSprite) {
        this.bgSprite.scale.set(scale)
      }
      if (this.bgSprite2) {
        this.bgSprite2.scale.set(scale)
      }
      this.particlesContainer.scale.set(scale)
    } else {
      this.particlesContainer.scale.set(1)
    }
  }

  private getConfigIndexByName(name: string) {
    let index = -1
    this.defaultConfig.emitterConfig.behaviours.forEach((behaviour, i) => {
      if (behaviour.name === name) {
        index = i
      }
    })
    return index
  }

  private updateNewBehaviour(name: string, key: string | [string, string], props) {
    const behaviourIndex = this.getConfigIndexByName(name)
    const behaviour = this.getNewBehaviourByIndex(behaviourIndex, name)
    if (typeof key === 'string') {
      behaviour[key] = props
    } else {
      if (behaviour[key[0]]) {
        behaviour[key[0]][key[1]] = props
      } else {
        behaviour[key[0]] = {}
        behaviour[key[0]][key[1]] = props
      }
    }
    this.updateNewBehaviourByIndex(behaviourIndex, behaviour)
  }

  private updateBehaviour(name: string, key: string | [string, string], props) {
    const behaviourIndex = this.getConfigIndexByName(name)
    const behaviour = this.getBehaviourByIndex(behaviourIndex, name)
    if (typeof key === 'string') {
      behaviour[key] = props
    } else {
      if (behaviour[key[0]]) {
        behaviour[key[0]][key[1]] = props
      } else {
        behaviour[key[0]] = {}
        behaviour[key[0]][key[1]] = props
      }
    }
    this.updateBehaviourByIndex(behaviourIndex, behaviour)
  }

  private getBehaviourByIndex(index: number, name: string) {
    if (index === -1) {
      return this.particles.emitter.createBehaviourProps(name)
    }
    return this.defaultConfig.emitterConfig.behaviours[index]
  }

  private getNewBehaviourByIndex(index: number, name: string) {
    if (index === -1) {
      return this.particles.emitter.createBehaviourProps(name)
    }
    return this.newDefaultConfig.emitterConfig.behaviours[index]
  }

  private updateBehaviourByIndex(index: number, behaviour: any) {
    if (index === -1) {
      this.defaultConfig.emitterConfig.behaviours[this.defaultConfig.emitterConfig.behaviours.length] = behaviour
    } else {
      this.defaultConfig.emitterConfig.behaviours[index] = behaviour
    }
  }

  private updateNewBehaviourByIndex(index: number, behaviour: any) {
    if (index === -1) {
      this.newDefaultConfig.emitterConfig.behaviours[this.defaultConfig.emitterConfig.behaviours.length] = behaviour
    } else {
      this.newDefaultConfig.emitterConfig.behaviours[index] = behaviour
    }
  }

  private animateTween(props: string) {
    this.killTween()

    if (props === 'flyingFire') {
      this.animateFlyingFire(props, 0.2)
    } else if (props === 'flyingFountain') {
      this.animateFlyingFountain(props, 0.2)
    } else if (props === 'flyingBubbles') {
      this.animateFlyingBubbles(props, 0.2)
    } else if (props === 'meteor') {
      this.animateMeteor()
    }
  }

  private detectMouseMove() {
    const content = document.getElementsByClassName('content')[0]
    this.app.stage.on('mousemove', (e) => {
      const finalInnerWidth = content.clientWidth
      const finalInnerHeight = content.clientHeight
      const x = -(finalInnerWidth / 2 - e.data.global.x)
      const y = -(finalInnerHeight / 2 - e.data.global.y)
      this.particles.updatePosition({ x, y })
    })
  }

  private createOffice() {
    if (this.activeEffect !== 'office') return
    const bgTexture = Texture.from('office2')
    const sprite = new Sprite(bgTexture)
    this.bgSprite = sprite
    this.bgSpriteSize = {
      w: sprite.width,
      h: sprite.height,
    }
    this.bgContainer.addChild(sprite)

    const bgTexture2 = Texture.from('office1')
    const sprite2 = new Sprite(bgTexture2)
    this.bgSprite2 = sprite2
    this.bgContainer2.addChild(sprite2)

    const fog = JSON.parse(JSON.stringify(this.conf.fog2))
    const particles7 = this.particlesContainer.addChild(customPixiParticles.create(fog))
    particles7.play()
    this.particlesArr.push(particles7)

    const fallRainDrops = JSON.parse(JSON.stringify(this.conf.fallRainDrops2))
    const particles10 = this.bgSprite2.addChild(customPixiParticles.create(fallRainDrops))
    particles10.play()
    this.particlesArr.push(particles10)

    const hotCoffee = JSON.parse(JSON.stringify(this.conf.darkMagicSmoke2))
    const particles8 = this.bgSprite2.addChild(customPixiParticles.create(hotCoffee))
    particles8.play()
    this.particlesArr.push(particles8)

    const hotCoffee2 = JSON.parse(JSON.stringify(this.conf.darkMagicSmoke3))
    const particles9 = this.bgSprite2.addChild(customPixiParticles.create(hotCoffee2))
    particles9.play()
    this.particlesArr.push(particles9)

    const runes = JSON.parse(JSON.stringify(this.conf.trail2))
    const particles6 = this.particlesContainer.addChild(customPixiParticles.create(runes))
    particles6.play()
    this.particlesArr.push(particles6)

    const campFire = JSON.parse(JSON.stringify(this.conf.campFire2))
    const particles = this.particlesContainer.addChild(customPixiParticles.create(campFire))
    particles.play()
    this.particlesArr.push(particles)

    const campFireSparkles = JSON.parse(JSON.stringify(this.conf.campFireSparkles2))
    const particles2 = this.particlesContainer.addChild(customPixiParticles.create(campFireSparkles))
    particles2.play()
    this.particlesArr.push(particles2)

    const campFire3 = JSON.parse(JSON.stringify(this.conf.campFire3))
    const particles3 = this.bgSprite2.addChild(customPixiParticles.create(campFire3))
    particles3.position.x = 870
    particles3.position.y = 182
    particles3.play()
    this.particlesArr.push(particles3)

    const campFire4 = JSON.parse(JSON.stringify(this.conf.campFire3))
    const particles4 = this.bgSprite2.addChild(customPixiParticles.create(campFire4))
    particles4.position.x = 886
    particles4.position.y = 193
    particles4.play()
    this.particlesArr.push(particles4)

    const campFire5 = JSON.parse(JSON.stringify(this.conf.campFire3))
    const particles5 = this.bgSprite2.addChild(customPixiParticles.create(campFire5))
    particles5.position.x = 897
    particles5.position.y = 230
    particles5.play()
    this.particlesArr.push(particles5)

    this.resize()
  }

  private animateWarp() {
    this.killTween()
    this.defaultConfig.emitterConfig.behaviours[2].warpSpeed = 0.001
    this.particles.updateConfig(this.defaultConfig.emitterConfig)
    const obj = {
      warpSpeed: this.defaultConfig.emitterConfig.behaviours[2].warpSpeed,
    }
    this.tween = gsap.to(obj, 4, {
      warpSpeed: this.defaultConfig.emitterConfig.behaviours[2].warpSpeed * 20,
      delay: 4,
      repeat: 0,
      onUpdate: () => {
        this.defaultConfig.emitterConfig.behaviours[2].warpSpeed = parseFloat(obj.warpSpeed)
        this.particles.updateConfig(this.defaultConfig.emitterConfig)
      },
      onComplete: () => this.animateWarpStop(),
    })
  }

  private animateWarpStop() {
    this.killTween()
    const obj = {
      warpSpeed: this.defaultConfig.emitterConfig.behaviours[2].warpSpeed,
    }
    this.tween = gsap.to(obj, 2, {
      warpSpeed: 0.001,
      delay: 2,
      repeat: 0,
      onUpdate: () => {
        this.defaultConfig.emitterConfig.behaviours[2].warpSpeed = parseFloat(obj.warpSpeed)
        this.particles.updateConfig(this.defaultConfig.emitterConfig)
      },
      onComplete: () => this.animateWarp(),
    })
  }

  private setActiveEffect() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const effect = urlParams.get('effect')
    if (effect) {
      this.activeEffect = effect
    } else {
      this.activeEffect = 'office'
    }
    this.orgConfig = JSON.parse(JSON.stringify(this.conf[this.activeEffect]))
    this.defaultConfig = JSON.parse(JSON.stringify(this.conf[this.activeEffect]))
    this.newDefaultConfig = JSON.parse(JSON.stringify(this.conf[this.activeEffect]))
  }

  private initApp() {
    this.app = new Application({ backgroundColor: 0 })
    this.bgContainer = new Container()
    this.bgContainer.name = 'bgContainer'
    this.app.stage.addChild(this.bgContainer)
    this.particlesContainer = new Container()
    this.particlesContainer.name = 'particlesContainer'
    this.app.stage.addChild(this.particlesContainer)
    this.bgContainer2 = new Container()
    this.bgContainer2.name = 'bgContainer2'
    this.app.stage.addChild(this.bgContainer2)
    document.body.getElementsByClassName('content')[0].appendChild(this.app.view)
    this.graphics = new Graphics()
    this.app.stage.addChild(this.graphics)

    setTimeout(() => {
      this.updateProps('particlePredefinedEffect', [null, this.activeEffect])
    })
  }

  private createEventListeners() {
    window.addEventListener('resize', this.resize.bind(this, true))
    window.addEventListener('orientationchange', this.resize.bind(this, true))
  }

  private animateMeteor() {
    this.tween = gsap.to(this.defaultConfig.emitterConfig.behaviours[1].position, 1, {
      x: -200,
      y: 200,
      ease: Linear.easeNone,
      onUpdate: () => {
        this.particles.updateConfig(this.defaultConfig.emitterConfig)
      },
      onComplete: () => {
        this.particles.updateConfig(this.conf.explosionForMeteor.emitterConfig)
      },
    })
  }

  private animateFlyingBubbles(props: string, speed: number) {
    this.tween = gsap.to(this.defaultConfig.emitterConfig.behaviours[1].position, speed, {
      x: -300,
      y: 300,
      ease: Linear.easeNone,
      onUpdate: () => {
        this.particles.updateConfig(this.defaultConfig.emitterConfig)
      },
      onComplete: () => {
        this.tween = gsap.to(this.defaultConfig.emitterConfig.behaviours[1].position, speed, {
          x: 300,
          y: 300,
          ease: Linear.easeNone,
          onUpdate: () => {
            this.particles.updateConfig(this.defaultConfig.emitterConfig)
          },
          onComplete: () => {
            this.tween = gsap.to(this.defaultConfig.emitterConfig.behaviours[1].position, speed, {
              x: 300,
              y: -300,
              ease: Linear.easeNone,
              onUpdate: () => {
                this.particles.updateConfig(this.defaultConfig.emitterConfig)
              },
              onComplete: () => {
                this.tween = gsap.to(this.defaultConfig.emitterConfig.behaviours[1].position, speed, {
                  x: -300,
                  y: -300,
                  ease: Linear.easeNone,
                  onUpdate: () => {
                    this.particles.updateConfig(this.defaultConfig.emitterConfig)
                  },
                  onComplete: () => {
                    this.animateTween(props)
                  },
                })
              },
            })
          },
        })
      },
    })
  }

  private animateFlyingFountain(props: string, speed: number) {
    this.tween = gsap.to(this.defaultConfig.emitterConfig.behaviours[1].position, speed, {
      x: -300,
      y: 300,
      ease: Linear.easeNone,
      onUpdate: () => {
        this.particles.updateConfig(this.defaultConfig.emitterConfig)
      },
      onComplete: () => {
        this.tween = gsap.to(this.defaultConfig.emitterConfig.behaviours[1].position, speed, {
          x: 300,
          y: 300,
          ease: Linear.easeNone,
          onUpdate: () => {
            this.particles.updateConfig(this.defaultConfig.emitterConfig)
          },
          onComplete: () => {
            this.tween = gsap.to(this.defaultConfig.emitterConfig.behaviours[1].position, speed, {
              x: 300,
              y: -300,
              ease: Linear.easeNone,
              onUpdate: () => {
                this.particles.updateConfig(this.defaultConfig.emitterConfig)
              },
              onComplete: () => {
                this.tween = gsap.to(this.defaultConfig.emitterConfig.behaviours[1].position, speed, {
                  x: -300,
                  y: -300,
                  ease: Linear.easeNone,
                  onUpdate: () => {
                    this.particles.updateConfig(this.defaultConfig.emitterConfig)
                  },
                  onComplete: () => {
                    this.animateTween(props)
                  },
                })
              },
            })
          },
        })
      },
    })
  }

  private animateFlyingFire(props: string, speed: number) {
    this.tween = gsap.to(this.defaultConfig.emitterConfig.behaviours[1].position, speed, {
      x: -300,
      y: 300,
      ease: Linear.easeNone,
      onUpdate: () => {
        this.particles.updateConfig(this.defaultConfig.emitterConfig)
      },
      onComplete: () => {
        this.tween = gsap.to(this.defaultConfig.emitterConfig.behaviours[1].position, speed, {
          x: 300,
          y: 300,
          ease: Linear.easeNone,
          onUpdate: () => {
            this.particles.updateConfig(this.defaultConfig.emitterConfig)
          },
          onComplete: () => {
            this.tween = gsap.to(this.defaultConfig.emitterConfig.behaviours[1].position, speed, {
              x: 300,
              y: -300,
              ease: Linear.easeNone,
              onUpdate: () => {
                this.particles.updateConfig(this.defaultConfig.emitterConfig)
              },
              onComplete: () => {
                this.tween = gsap.to(this.defaultConfig.emitterConfig.behaviours[1].position, speed, {
                  x: -300,
                  y: -300,
                  ease: Linear.easeNone,
                  onUpdate: () => {
                    this.particles.updateConfig(this.defaultConfig.emitterConfig)
                  },
                  onComplete: () => {
                    this.animateTween(props)
                  },
                })
              },
            })
          },
        })
      },
    })
  }

  private killTween() {
    if (!this.tween) return
    this.tween.kill()
  }

  private stopAllParticlesArr() {
    this.particlesArr.forEach((particle) => {
      particle.stopImmediately()
    })
    this.particlesArr = []
  }

  private reloadEverything() {
    this.particles.stopImmediately()
    this.particlesContainer.removeChildren()

    if (this.activeEffect === 'campFire' || this.activeEffect === 'campFireTurbulence') {
      const campfireSparklesConfig = JSON.parse(JSON.stringify(this.conf.campFireSparkles))
      // @ts-ignore
      const particles = this.particlesContainer.addChild(customPixiParticles.create(campfireSparklesConfig))
      particles.play()
      this.particlesArr.push(particles)
    }

    if (this.activeEffect === 'warpWithEffect' || this.activeEffect === 'warpWithEffectV2') {
      setTimeout(() => {
        this.animateWarp()
      })

      const warpCloudsConfig = JSON.parse(JSON.stringify(this.conf.warpClouds))
      // @ts-ignore
      const particles = this.particlesContainer.addChild(customPixiParticles.create(warpCloudsConfig))
      particles.play()
      this.particlesArr.push(particles)

      this.app.renderer.backgroundColor = parseInt(`0x000203`, 16)
    }

    this.createOffice()

    this.createParticles()

    this.animateTween(this.activeEffect)

    const behaviourIndex = this.getConfigIndexByName('CollisionBehaviour')
    if (behaviourIndex >= 0) {
      const drawLines = (lines) => {
        this.graphics.clear()
        this.graphics.lineStyle(2, 0xffffff, 1)

        if (lines.length > 0) {
          lines.forEach((line) => {
            this.graphics.moveTo(line.point1.x, line.point1.y)
            this.graphics.lineTo(line.point2.x, line.point2.y)
          })
        }
      }

      const lines = this.defaultConfig.emitterConfig.behaviours[behaviourIndex].lines
      drawLines(lines)
    } else {
      this.graphics.clear()
    }
  }
}

declare let module: Record<string, unknown>

export default hot(module)(App)
