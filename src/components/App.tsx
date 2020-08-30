///<reference types="pixi.js"/>
import * as React from 'react'
import { hot } from 'react-hot-loader'
import './../assets/scss/App.scss'
import Menu from './menu/Menu'
import Content from './content/Content'
import ParticlesDefaultConfig from './content/particlesDefaultConfig'
import { saveAs } from 'file-saver'
import { customPixiParticles, Renderer } from 'custom-pixi-particles'
import * as Stats from 'stats.js'

class App extends React.Component {
  state = {
    name: '',
    props: {},
  }

  private app: PIXI.Application
  private bgContainer: PIXI.Container
  private particlesContainer: PIXI.Container
  private particles: Renderer
  private conf: ParticlesDefaultConfig = new ParticlesDefaultConfig()
  private defaultConfig: any = this.conf.chaos

  componentDidMount() {
    const stats = new Stats()
    stats.showPanel(0)
    document.body.appendChild(stats.dom)

    this.app = new PIXI.Application({ resolution: devicePixelRatio, backgroundColor: 0 })
    document.body.getElementsByClassName('content')[0].appendChild(this.app.view)
    this.app.ticker.add(() => {
      stats.begin()
      stats.end()
    })

    this.bgContainer = new PIXI.Container()
    this.app.stage.addChild(this.bgContainer)
    this.particlesContainer = new PIXI.Container()
    this.app.stage.addChild(this.particlesContainer)

    const loader = PIXI.Loader.shared
    loader.add('cloud', 'assets/img/cloud.png')
    loader.add('cloud2', 'assets/img/cloud2.png')
    loader.add('flare', 'assets/img/flare.png')
    loader.add('flare_blue', 'assets/img/flare_blue.png')
    loader.add('pump_snow_01', 'assets/img/pump_snow_01.png')
    loader.add('sparkle', 'assets/img/sparkle.png')
    loader.add('fog001', 'assets/img/fog/fog001.png')
    loader.add('fog002', 'assets/img/fog/fog002.png')
    loader.add('fog003', 'assets/img/fog/fog003.png')
    loader.add('fog004', 'assets/img/fog/fog004.png')
    loader.add('fire001', 'assets/img/fire/fire001.png')
    loader.add('fire002', 'assets/img/fire/fire002.png')
    loader.add('fire003', 'assets/img/fire/fire003.png')
    loader.add('fire004', 'assets/img/fire/fire004.png')
    loader.load()
    loader.onComplete.add((x) => {
      this.createParticles()
      this.resize()

      // TODO remove
      setTimeout(() => {
        this.particles.paused = true

        setTimeout(() => {
          this.particles.paused = false
        }, 3000)
      }, 3000)
    })

    window.addEventListener('resize', this.resize.bind(this, true))
    window.addEventListener('orientationchange', this.resize.bind(this, true))
  }

  public render() {
    return (
      <>
        <Content />
        <Menu config={this.defaultConfig} updateProps={this.updateProps} />
      </>
    )
  }

  private updateProps = (name: string, props: any) => {
    if (name === 'BackgroundColor') {
      this.app.renderer.backgroundColor = parseInt(`0x${props.hex.replace('#', '')}`, 16)
      return
    }

    switch (name) {
      case 'durationGuard-maxTime':
        this.defaultConfig.emitterConfig.emitController._durationGuard.maxTime = parseFloat(props[1])
        break
      case 'sizeProperties-enabled':
        this.updateBehaviour('SizeBehaviour', 'enabled', props[1])
        break
      case 'sizeProperties-sizeStart':
        if (props[0] === 0) {
          this.defaultConfig.emitterConfig.behaviours[
            this.getConfigIndexByName('SizeBehaviour')
          ].sizeStart.x = parseFloat(props[1])
        } else {
          this.defaultConfig.emitterConfig.behaviours[
            this.getConfigIndexByName('SizeBehaviour')
          ].sizeStart.y = parseFloat(props[1])
        }
        this.updateBehaviour('SizeBehaviour', 'enabled', true)
        break
      case 'sizeProperties-sizeEnd':
        if (props[0] === 0) {
          this.defaultConfig.emitterConfig.behaviours[
            this.getConfigIndexByName('SizeBehaviour')
          ].sizeEnd.x = parseFloat(props[1])
        } else {
          this.defaultConfig.emitterConfig.behaviours[
            this.getConfigIndexByName('SizeBehaviour')
          ].sizeEnd.y = parseFloat(props[1])
        }
        this.updateBehaviour('SizeBehaviour', 'enabled', true)
        break
      case 'sizeProperties-startVariance':
        this.updateBehaviour('SizeBehaviour', 'startVariance', parseFloat(props[1]))
        this.updateBehaviour('SizeBehaviour', 'enabled', true)
        break
      case 'sizeProperties-endVariance':
        this.updateBehaviour('SizeBehaviour', 'endVariance', parseFloat(props[1]))
        this.updateBehaviour('SizeBehaviour', 'enabled', true)
        break
      case 'rotationProperties-enabled':
        this.updateBehaviour('RotationBehaviour', 'enabled', props[1])
        break
      case 'rotationProperties-rotation':
        this.updateBehaviour('RotationBehaviour', 'rotation', parseFloat(props[1]))
        this.updateBehaviour('RotationBehaviour', 'enabled', true)
        break
      case 'rotationProperties-variance':
        this.updateBehaviour('RotationBehaviour', 'variance', parseFloat(props[1]))
        this.updateBehaviour('RotationBehaviour', 'enabled', true)
        break
      case 'positionProperties-enabled':
        this.updateBehaviour('PositionBehaviour', 'enabled', props[1])
        break
      case 'positionProperties-position':
        if (props[0] === 0) {
          this.defaultConfig.emitterConfig.behaviours[
            this.getConfigIndexByName('PositionBehaviour')
          ].position.x = parseFloat(props[1])
        } else {
          this.defaultConfig.emitterConfig.behaviours[
            this.getConfigIndexByName('PositionBehaviour')
          ].position.y = parseFloat(props[1])
        }
        this.updateBehaviour('PositionBehaviour', 'enabled', true)
        break
      case 'positionProperties-positionVariance':
        if (props[0] === 0) {
          this.defaultConfig.emitterConfig.behaviours[
            this.getConfigIndexByName('PositionBehaviour')
          ].positionVariance.x = parseFloat(props[1])
        } else {
          this.defaultConfig.emitterConfig.behaviours[
            this.getConfigIndexByName('PositionBehaviour')
          ].positionVariance.y = parseFloat(props[1])
        }
        this.updateBehaviour('PositionBehaviour', 'enabled', true)
        break
      case 'positionProperties-velocity':
        if (props[0] === 0) {
          this.defaultConfig.emitterConfig.behaviours[
            this.getConfigIndexByName('PositionBehaviour')
          ].velocity.x = parseFloat(props[1])
        } else {
          this.defaultConfig.emitterConfig.behaviours[
            this.getConfigIndexByName('PositionBehaviour')
          ].velocity.y = parseFloat(props[1])
        }
        this.updateBehaviour('PositionBehaviour', 'enabled', true)
        break
      case 'positionProperties-velocityVariance':
        if (props[0] === 0) {
          this.defaultConfig.emitterConfig.behaviours[
            this.getConfigIndexByName('PositionBehaviour')
          ].velocityVariance.x = parseFloat(props[1])
        } else {
          this.defaultConfig.emitterConfig.behaviours[
            this.getConfigIndexByName('PositionBehaviour')
          ].velocityVariance.y = parseFloat(props[1])
        }
        this.updateBehaviour('PositionBehaviour', 'enabled', true)
        break
      case 'positionProperties-acceleration':
        if (props[0] === 0) {
          this.defaultConfig.emitterConfig.behaviours[
            this.getConfigIndexByName('PositionBehaviour')
          ].acceleration.x = parseFloat(props[1])
        } else {
          this.defaultConfig.emitterConfig.behaviours[
            this.getConfigIndexByName('PositionBehaviour')
          ].acceleration.y = parseFloat(props[1])
        }
        this.updateBehaviour('PositionBehaviour', 'enabled', true)
        break
      case 'positionProperties-accelerationVariance':
        if (props[0] === 0) {
          this.defaultConfig.emitterConfig.behaviours[
            this.getConfigIndexByName('PositionBehaviour')
          ].accelerationVariance.x = parseFloat(props[1])
        } else {
          this.defaultConfig.emitterConfig.behaviours[
            this.getConfigIndexByName('PositionBehaviour')
          ].accelerationVariance.y = parseFloat(props[1])
        }
        this.updateBehaviour('PositionBehaviour', 'enabled', true)
        break
      case 'colorProperties-enabled':
        this.updateBehaviour('ColorBehaviour', 'enabled', props[1])
        break
      case 'colorProperties-start':
        this.defaultConfig.emitterConfig.behaviours[this.getConfigIndexByName('ColorBehaviour')].start._r = parseFloat(
          props.rgb.r,
        )
        this.defaultConfig.emitterConfig.behaviours[this.getConfigIndexByName('ColorBehaviour')].start._g = parseFloat(
          props.rgb.g,
        )
        this.defaultConfig.emitterConfig.behaviours[this.getConfigIndexByName('ColorBehaviour')].start._b = parseFloat(
          props.rgb.b,
        )
        this.defaultConfig.emitterConfig.behaviours[
          this.getConfigIndexByName('ColorBehaviour')
        ].start._alpha = parseFloat(props.rgb.a)
        this.updateBehaviour('ColorBehaviour', 'enabled', true)
        break
      case 'colorProperties-end':
        this.defaultConfig.emitterConfig.behaviours[this.getConfigIndexByName('ColorBehaviour')].end._r = parseFloat(
          props.rgb.r,
        )
        this.defaultConfig.emitterConfig.behaviours[this.getConfigIndexByName('ColorBehaviour')].end._g = parseFloat(
          props.rgb.g,
        )
        this.defaultConfig.emitterConfig.behaviours[this.getConfigIndexByName('ColorBehaviour')].end._b = parseFloat(
          props.rgb.b,
        )
        this.defaultConfig.emitterConfig.behaviours[
          this.getConfigIndexByName('ColorBehaviour')
        ].end._alpha = parseFloat(props.rgb.a)
        this.updateBehaviour('ColorBehaviour', 'enabled', true)
        break
      case 'colorProperties-startingColorVariance':
        this.defaultConfig.emitterConfig.behaviours[
          this.getConfigIndexByName('ColorBehaviour')
        ].startVariance._r = parseFloat(props.rgb.r)
        this.defaultConfig.emitterConfig.behaviours[
          this.getConfigIndexByName('ColorBehaviour')
        ].startVariance._g = parseFloat(props.rgb.g)
        this.defaultConfig.emitterConfig.behaviours[
          this.getConfigIndexByName('ColorBehaviour')
        ].startVariance._b = parseFloat(props.rgb.b)
        this.defaultConfig.emitterConfig.behaviours[
          this.getConfigIndexByName('ColorBehaviour')
        ].startVariance._alpha = parseFloat(props.rgb.a)
        this.updateBehaviour('ColorBehaviour', 'enabled', true)
        break
      case 'colorProperties-endVariance':
        this.defaultConfig.emitterConfig.behaviours[
          this.getConfigIndexByName('ColorBehaviour')
        ].endVariance._r = parseFloat(props.rgb.r)
        this.defaultConfig.emitterConfig.behaviours[
          this.getConfigIndexByName('ColorBehaviour')
        ].endVariance._g = parseFloat(props.rgb.g)
        this.defaultConfig.emitterConfig.behaviours[
          this.getConfigIndexByName('ColorBehaviour')
        ].endVariance._b = parseFloat(props.rgb.b)
        this.defaultConfig.emitterConfig.behaviours[
          this.getConfigIndexByName('ColorBehaviour')
        ].endVariance._alpha = parseFloat(props.rgb.a)
        this.updateBehaviour('ColorBehaviour', 'enabled', true)
        break
      case 'lifeProperties-maxLifeTime':
        this.updateBehaviour('LifeBehaviour', 'maxLifeTime', parseFloat(props[1]))
        break
      case 'lifeProperties-timeVariance':
        this.updateBehaviour('LifeBehaviour', 'timeVariance', parseFloat(props[1]))
        break
      case 'angularVelocityProperties-enabled':
        this.updateBehaviour('AngularVelocityBehaviour', 'enabled', props[1])
        break
      case 'angularVelocityProperties-degrees':
        this.updateBehaviour('AngularVelocityBehaviour', 'degrees', parseFloat(props[1]))
        this.updateBehaviour('AngularVelocityBehaviour', 'enabled', true)
        break
      case 'angularVelocityProperties-degreesVariance':
        this.updateBehaviour('AngularVelocityBehaviour', 'degreesVariance', parseFloat(props[1]))
        this.updateBehaviour('AngularVelocityBehaviour', 'enabled', true)
        break
      case 'angularVelocityProperties-maxRadius':
        this.updateBehaviour('AngularVelocityBehaviour', 'maxRadius', parseFloat(props[1]))
        this.updateBehaviour('AngularVelocityBehaviour', 'enabled', true)
        break
      case 'angularVelocityProperties-maxRadiusVariance':
        this.updateBehaviour('AngularVelocityBehaviour', 'maxRadiusVariance', parseFloat(props[1]))
        this.updateBehaviour('AngularVelocityBehaviour', 'enabled', true)
        break
      case 'angularVelocityProperties-minRadius':
        this.updateBehaviour('AngularVelocityBehaviour', 'minRadius', parseFloat(props[1]))
        this.updateBehaviour('AngularVelocityBehaviour', 'enabled', true)
        break
      case 'angularVelocityProperties-minRadiusVariance':
        this.updateBehaviour('AngularVelocityBehaviour', 'minRadiusVariance', parseFloat(props[1]))
        this.updateBehaviour('AngularVelocityBehaviour', 'enabled', true)
        break
      case 'emitDirectionProperties-angle':
        this.updateBehaviour('EmitDirectionBehaviour', 'angle', parseFloat(props[1]))
        break
      case 'emitDirectionProperties-variance':
        this.updateBehaviour('EmitDirectionBehaviour', 'variance', parseFloat(props[1]))
        break
      case 'EmissionTypeProperties-_maxParticles':
        this.defaultConfig.emitterConfig.emitController._maxParticles = parseFloat(props[1])
        break
      case 'EmissionTypeProperties-_emitPerSecond':
        this.defaultConfig.emitterConfig.emitController._emitPerSecond = parseFloat(props[1])
        break
      case 'EmissionTypeProperties-duration':
        this.defaultConfig.emitterConfig.duration = parseFloat(props[1])
        break
      case 'EmissionTypeProperties-name':
        this.defaultConfig.emitterConfig.emitController.name = props[1]
        if (props[1] === 'UniformEmission') {
          this.defaultConfig.emitterConfig.emitController._emitPerSecond = 200
        } else {
          this.defaultConfig.emitterConfig.emitController._maxParticles = 10
          this.defaultConfig.emitterConfig.emitController._emissionRate = 10
        }
        break
      case 'EmissionTypeProperties-_maxParticles':
        this.defaultConfig.emitterConfig.emitController._maxParticles = props[1]
        break
      case 'EmissionTypeProperties-_emissionRate':
        this.defaultConfig.emitterConfig.emitController._emissionRate = props[1]
        break
      case 'particlePredefinedEffect':
        this.particlesContainer.alpha = 1
        this.particles.blendMode = PIXI.BLEND_MODES.NORMAL
        this.defaultConfig.alpha = this.particlesContainer.alpha
        if (props === 1) {
          this.defaultConfig = this.conf.default
        } else if (props === 2) {
          this.defaultConfig = this.conf.chaos
        } else if (props === 3) {
          this.defaultConfig = this.conf.firework
        } else if (props === 4) {
          this.defaultConfig = this.conf.radial
        } else if (props === 5) {
          this.particlesContainer.alpha = 0.15
          this.defaultConfig = this.conf.fog
          this.particles.blendMode = PIXI.BLEND_MODES.ADD
          this.defaultConfig.blendMode = 'Add'
          this.defaultConfig.alpha = this.particlesContainer.alpha
        } else if (props === 6) {
          this.particlesContainer.alpha = 0.4
          this.defaultConfig = this.conf.fire
          this.particles.blendMode = PIXI.BLEND_MODES.ADD
          this.defaultConfig.blendMode = 'Add'
          this.defaultConfig.alpha = this.particlesContainer.alpha
        }
        break
      case 'bg-image':
        this.bgContainer.removeChildren()
        const bgTexture = PIXI.Texture.from(props[1])
        const sprite = new PIXI.Sprite(bgTexture)
        this.bgContainer.addChild(sprite)
        break
      case 'particle-images':
        this.defaultConfig.textures = props[1]
        break
      case 'load-config':
        const config = JSON.parse(props[1])
        this.defaultConfig.emitterConfig = config
        break
      case 'download-config':
        this.particles.emitter.getParser().write()
        const blob = new Blob([JSON.stringify(this.particles.emitter.getParser().write())], {
          type: 'application/json',
        })
        saveAs(blob, 'particle_config')
        break
      case 'global-alpha':
        this.particlesContainer.alpha = parseFloat(props[1])
        this.defaultConfig.alpha = parseFloat(props[1])
        break
      case 'global-blendMode':
        if (props[1] === 'Normal') {
          this.particles.blendMode = PIXI.BLEND_MODES.NORMAL
        } else if (props[1] === 'Add') {
          this.particles.blendMode = PIXI.BLEND_MODES.ADD
        } else if (props[1] === 'Multiply') {
          this.particles.blendMode = PIXI.BLEND_MODES.MULTIPLY
        } else if (props[1] === 'Screen') {
          this.particles.blendMode = PIXI.BLEND_MODES.SCREEN
        }
        this.defaultConfig.blendMode = props[1]
        break
    }

    this.particles.stopEmitter()
    this.particlesContainer.removeChildren()
    this.createParticles()

    this.setState({
      name,
      props,
    })
  }

  private createParticles(): Renderer {
    this.particles = customPixiParticles.create(this.defaultConfig.textures, this.defaultConfig.emitterConfig)
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

  private createAngularVelocityBehaviour() {
    return {
      enabled: false,
      priority: 100,
      degrees: 0,
      degreesVariance: 0,
      maxRadius: 0,
      maxRadiusVariance: 0,
      minRadius: 0,
      minRadiusVariance: 0,
      name: 'AngularVelocityBehaviour',
    }
  }

  private updateBehaviour(name: string, key: string, props) {
    const behaviourIndex = this.getConfigIndexByName(name)
    const behaviour = this.getBehaviourByIndex(behaviourIndex, name)
    behaviour[key] = props
    this.updateBehaviourByIndex(behaviourIndex, behaviour)
  }

  private getBehaviourByIndex(index: number, name: string) {
    if (index === -1) {
      if (name === 'AngularVelocityBehaviour') {
        return this.particles.emitter.createBehaviourProps('AngularVelocityBehaviour')
      } else if (name === 'RotationBehaviour') {
        return this.particles.emitter.createBehaviourProps('RotationBehaviour')
      }
    }
    return this.defaultConfig.emitterConfig.behaviours[index]
  }

  private updateBehaviourByIndex(index: number, behaviour: any) {
    if (index === -1) {
      this.defaultConfig.emitterConfig.behaviours[this.defaultConfig.emitterConfig.behaviours.length] = behaviour
    } else {
      this.defaultConfig.emitterConfig.behaviours[index] = behaviour
    }
  }
}

declare let module: Record<string, unknown>

export default hot(module)(App)
