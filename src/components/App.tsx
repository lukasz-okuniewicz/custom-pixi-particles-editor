import * as React from 'react'
import { hot } from 'react-hot-loader'
import './../assets/scss/App.scss'
import Menu from './menu/Menu'
import Content from './content/Content'
import ParticlesDefaultConfig from './config/particlesDefaultConfig'
import { saveAs } from 'file-saver'
import { customPixiParticles, Renderer } from 'custom-pixi-particles'
import * as Stats from 'stats.js'
import { gsap, Linear } from 'gsap'
import { Application, Container, Loader, Sprite, Texture } from 'pixi.js'
import { Simulate } from 'react-dom/test-utils'
import load = Simulate.load
import TestRenderer from "custom-pixi-particles/dist/lib/pixi/TestRenderer";

class App extends React.Component {
  state = {
    name: '',
    props: {},
    defaultConfig: null,
  }

  private app: Application
  private bgContainer: Container
  private particlesContainer: Container
  private particles: TestRenderer
  private conf: ParticlesDefaultConfig = new ParticlesDefaultConfig()
  private orgConfig: any = JSON.parse(JSON.stringify(this.conf.chaos))
  private defaultConfig: any = JSON.parse(JSON.stringify(this.conf.chaos))
  private newDefaultConfig: any = JSON.parse(JSON.stringify(this.conf.chaos))
  private tween: any
  private activeEffect: string
  private bgSprite: Sprite
  private bgSpriteSize: { w: number; h: number }

  componentDidMount() {
    const stats = new Stats()
    stats.showPanel(0)
    document.body.appendChild(stats.dom)

    // @ts-ignore
    this.app = new Application({ backgroundColor: 0 })
    // @ts-ignore
    window.app = this.app
    document.body.getElementsByClassName('content')[0].appendChild(this.app.view)
    this.app.ticker.add(() => {
      stats.begin()
      stats.end()
    })

    this.bgContainer = new Container()
    this.app.stage.addChild(this.bgContainer)
    this.particlesContainer = new Container()
    this.app.stage.addChild(this.particlesContainer)

    const loader = Loader.shared
    loader.add('assets/img/images.json')
    loader.add('autumn', 'assets/img/backgrounds/autumn.jpg')
    loader.add('campFire', 'assets/img/backgrounds/campfire.jpg')
    loader.add('birds', 'assets/img/backgrounds/birds.jpg')
    loader.add('cigarette', 'assets/img/backgrounds/cigarette.jpg')
    loader.add('blackHole', 'assets/img/backgrounds/blackHole.jpg')
    loader.load()
    loader.onComplete.add((x) => {
      this.createParticles()
      this.resize()
    })

    window.addEventListener('resize', this.resize.bind(this, true))
    window.addEventListener('orientationchange', this.resize.bind(this, true))

    this.setState({
      defaultConfig: this.newDefaultConfig,
    })
  }

  render() {
    const { defaultConfig } = this.state
    return (
      <>
        <Content />
        {defaultConfig ? <Menu config={defaultConfig} updateProps={this.updateProps} /> : <></>}
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
      case 'particlePredefinedEffect':
        this.bgSprite = null
        this.bgContainer.removeChildren()
        props = props[1]
        this.activeEffect = props
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
        } else if (props === 'campFire') {
          const bgTexture = Texture.from('campFire')
          const sprite = new Sprite(bgTexture)
          this.bgSprite = sprite
          this.bgSpriteSize = {
            w: sprite.width,
            h: sprite.height,
          }
          this.bgContainer.addChild(sprite)
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
          this.newDefaultConfig.emitterConfig.alpha = this.particlesContainer.alpha
          this.defaultConfig.emitterConfig.alpha = this.particlesContainer.alpha
        }
        this.newDefaultConfig.particlePredefinedEffect = props
        this.defaultConfig.particlePredefinedEffect = props
        this.resize()
        break
      case 'bg-image':
        this.bgContainer.removeChildren()
        const bgTexture = Texture.from(props[1])
        const sprite = new Sprite(bgTexture)
        this.bgSprite = sprite
        this.bgContainer.addChild(sprite)
        setTimeout(() => {
          this.bgSpriteSize = {
            w: sprite.width,
            h: sprite.height,
          }
          this.resize()
        }, 100)
        break
      case 'particle-images':
        const loader = Loader.shared
        const arrayOfTextures = []
        props[1].forEach((file) => {
          loader.add(file.fileName, file.result)
          arrayOfTextures.push(file.fileName)
        })
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
        this.particles.emitter.getParser().write()
        const blob = new Blob([JSON.stringify(this.particles.emitter.getParser().write())], {
          type: 'application/json',
        })
        saveAs(blob, 'particle_config')
        break
      case 'global-alpha':
        this.newDefaultConfig.emitterConfig.alpha = props[1]
        this.defaultConfig.emitterConfig.alpha = parseFloat(props[1])
        break
      case 'global-animatedSprite':
        if (props[1]) {
          this.newDefaultConfig.emitterConfig.animatedSprite = {
            enabled: props[1],
            loop: true,
            frameRate: 0.25,
          }
        } else {
          this.newDefaultConfig.emitterConfig.animatedSprite = undefined
        }
        if (props[1]) {
          this.defaultConfig.emitterConfig.animatedSprite = {
            enabled: props[1],
            loop: true,
            frameRate: 0.25,
          }
        } else {
          this.newDefaultConfig.emitterConfig.animatedSprite = undefined
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
        this.newDefaultConfig.emitterConfig.blendMode = props[1]
        this.defaultConfig.emitterConfig.blendMode = props[1]
        break
      case 'pathProperties-enabledPath':
        this.newDefaultConfig.speed = 0
        if (!this.newDefaultConfig.point1) {
          this.newDefaultConfig.point1 = {
            x: 0,
            y: 0,
          }
        }
        if (!this.newDefaultConfig.point2) {
          this.newDefaultConfig.point2 = {
            x: 0,
            y: 0,
          }
        }
        this.newDefaultConfig.enabledPath = props[1]
        this.defaultConfig.enabledPath = props[1]
        break
      case 'pathProperties-speed':
        this.newDefaultConfig.speed = props[1]
        this.defaultConfig.speed = parseFloat(props[1])
        break
      case 'pathProperties-point1':
        if (!this.newDefaultConfig.point1) {
          this.newDefaultConfig.point1 = {
            x: 0,
            y: 0,
          }
          this.defaultConfig.point1 = {
            x: 0,
            y: 0,
          }
        }
        if (props[0] === 0) {
          this.newDefaultConfig.point1.x = props[1]
          this.defaultConfig.point1.x = parseFloat(props[1])
        } else {
          this.newDefaultConfig.point1.y = props[1]
          this.defaultConfig.point1.y = parseFloat(props[1])
        }
        break
      case 'pathProperties-point2':
        if (!this.newDefaultConfig.point2) {
          this.newDefaultConfig.point2 = {
            x: 0,
            y: 0,
          }
          this.defaultConfig.point2 = {
            x: 0,
            y: 0,
          }
        }
        if (props[0] === 0) {
          this.newDefaultConfig.point2.x = props[1]
          this.defaultConfig.point2.x = parseFloat(props[1])
        } else {
          this.newDefaultConfig.point2.y = props[1]
          this.defaultConfig.point2.y = parseFloat(props[1])
        }
        break
    }

    this.particles.stopImmediately()
    this.particlesContainer.removeChildren()

    if (this.activeEffect === 'campFire' || this.activeEffect === 'campFireTurbulence') {
      const campfireSparklesConfig = JSON.parse(JSON.stringify(this.conf.campFireSparkles))
      // @ts-ignore
      const particles = this.particlesContainer.addChild(customPixiParticles.create(campfireSparklesConfig))
      particles.play()
    }

    this.createParticles()

    this.animateTween(this.activeEffect)

    this.setState({
      name,
      props,
      defaultConfig: this.newDefaultConfig,
    })
  }

  private createParticles(): Renderer {
    this.particles = customPixiParticles.createTest(this.defaultConfig)
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

    if (this.bgSprite) {
      let scale
      if (finalInnerWidth - 400 < this.bgSpriteSize.w) {
        scale = finalInnerWidth / this.bgSpriteSize.w
        this.bgContainer.position.x = 0
        this.bgContainer.position.y = (finalInnerHeight - this.bgSpriteSize.h * scale) / 2
      } else {
        scale = finalInnerHeight / this.bgSpriteSize.h
        this.bgContainer.position.x = (finalInnerWidth - this.bgSpriteSize.w * scale) / 2
        this.bgContainer.position.y = 0
      }
      this.bgSprite.scale.set(scale)
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
      behaviour[key[0]][key[1]] = props
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
    if (this.tween) {
      this.tween.kill()
    }

    let speed = 0.2

    if (this.newDefaultConfig.enabledPath) {
      speed = this.newDefaultConfig.speed

      this.defaultConfig.emitterConfig.behaviours[1].position.x = this.newDefaultConfig.point1.x
      this.defaultConfig.emitterConfig.behaviours[1].position.y = this.newDefaultConfig.point1.y

      this.tween = gsap.to(this.defaultConfig.emitterConfig.behaviours[1].position, speed, {
        x: this.newDefaultConfig.point2.x,
        y: this.newDefaultConfig.point2.y,
        ease: Linear.easeNone,
        onUpdate: () => {
          this.particles.updateConfig(this.defaultConfig.emitterConfig)
        },
        onComplete: () => {},
      })
      return
    }

    if (props === 'flyingFire') {
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
    } else if (props === 'flyingFountain') {
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
    } else if (props === 'flyingBubbles') {
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
    } else if (props === 'meteor') {
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
  }
}

declare let module: Record<string, unknown>

export default hot(module)(App)
