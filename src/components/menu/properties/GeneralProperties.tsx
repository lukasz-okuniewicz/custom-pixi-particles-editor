import { BLEND_MODES } from 'pixi.js-legacy'
import * as React from 'react'
import { hot } from 'react-hot-loader'
import FormGroup from '../utils/FormGroup'
import { Loader } from 'pixi.js-legacy'

export interface IProps {
  config: any
  updateProps: any
  activeEffect: any
}

class GeneralProperties extends React.Component<IProps> {
  state = {
    isSubmenuVisible: 'in',
    blendMode: 'normal',
    globalAlpha: 1,
    test: 1,
  }

  public render() {
    const { config } = this.props
    const { isSubmenuVisible, globalAlpha, blendMode, test } = this.state

    if (typeof config.emitterConfig.animatedSprite === 'undefined') {
      config.emitterConfig.animatedSprite = {
        enabled: false,
      }
    }
    if (typeof config.emitterConfig.animatedSprite.frameRate === 'undefined') {
      config.emitterConfig.animatedSprite.frameRate = 0.25
    }
    if (typeof config.animatedSpriteIndexToStart === 'undefined') {
      config.animatedSpriteIndexToStart = 0
    }
    if (typeof config.animatedSpriteZeroPad === 'undefined') {
      config.animatedSpriteZeroPad = 1
    }
    if (typeof config.emitterConfig.animatedSprite.loop === 'undefined') {
      config.emitterConfig.animatedSprite.loop = true
    }
    if (typeof config.emitterConfig.animatedSprite.randomFrameStart === 'undefined') {
      config.emitterConfig.animatedSprite.randomFrameStart = false
    }
    if (typeof config.emitterConfig.animatedSprite.animatedSpriteName === 'undefined') {
      config.emitterConfig.animatedSprite.animatedSpriteName = ''
    }
    if (typeof config.emitterConfig.anchor === 'undefined') {
      config.emitterConfig.anchor = { x: 0.5, y: 0.5 }
    }

    const textures: any = Loader.shared.resources['assets/img/multipacked-0.json'].textures
    const textures2: any = Loader.shared.resources['assets/img/images.json'].textures

    if (test === 2) {
      return <div></div>
    } else {
      return (
        <div className="general-properties">
          <legend onClick={this.changeSubmenuVisibility.bind(this)}>General Properties</legend>
          <div className={`collapse ${isSubmenuVisible}`}>
            {this.props.activeEffect === 'office' ? (
              <></>
            ) : (
              <div className="form-group">
                <div className="col-xs-4 form-label">Follow Mouse</div>
                <div className="col-xs-8">
                  <input type={'checkbox'} checked={config.followMouse} onChange={this.handleChangeFollowMouse} />
                </div>
              </div>
            )}
            {this.props.activeEffect === 'office' ? <></> : <hr />}
            <div className="form-group">
              <div className="col-xs-4 form-label">Particle Effects</div>
              <div className="col-xs-8">
                <select
                  className={'form-control'}
                  value={config.particlePredefinedEffect || 'office'}
                  onChange={this.handleChangeEffect.bind(this, 0, 'particlePredefinedEffect')}
                >
                  <option value={'office'}>Coffee Shop</option>
                  <option value={'fromAtoB5'}>From A to B version 5</option>
                  <option value={'fromAtoB6'}>From A to B version 6</option>
                  <option value={'fromAtoB7'}>From A to B version 7</option>
                  <option value={'fromAtoB8'}>From A to B version 8</option>
                  <option value={'warpWithEffect'}>Warp Animation</option>
                  <option value={'warpWithEffectV2'}>Warp Animation v2</option>
                  <option value={'warp'}>Warp</option>
                  <option value={'bloodHand'}>Blood Hand</option>
                  <option value={'darkMagicSmoke'}>Dark Magic Smoke</option>
                  <option value={'runes'}>Runes</option>
                  <option value={'trail'}>Trail</option>
                  <option value={'magic1'}>Magic 1</option>
                  <option value={'magic2'}>Magic 2</option>
                  <option value={'magic3'}>Magic 3</option>
                  <option value={'magic4'}>Magic 4</option>
                  <option value={'magic5'}>Magic 5</option>
                  <option value={'magic6'}>Magic 6</option>
                  <option value={'magic7'}>Magic 7</option>
                  <option value={'magic8'}>Magic 8</option>
                  <option value={'magic9'}>Magic 9</option>
                  <option value={'chaos'}>Chaos</option>
                  <option value={'liquid'}>Liquid</option>
                  <option value={'explodingBubbles'}>Exploding Bubbles</option>
                  <option value={'fire'}>Fire</option>
                  <option value={'fireWithTurbulence'}>Fire with Turbulence</option>
                  <option value={'campFire'}>Camp Fire</option>
                  <option value={'campFireTurbulence'}>Camp Fire with Turbulence</option>
                  <option value={'flyingFire'}>Flying Fire</option>
                  <option value={'meteor'}>Meteor</option>
                  <option value={'ember'}>Ember</option>
                  <option value={'emberWithTurbulence'}>Ember with Turbulence</option>
                  <option value={'birds'}>Birds</option>
                  <option value={'cigarette'}>Cigarette</option>
                  <option value={'squareSmoke'}>Square smoke</option>
                  <option value={'sun'}>Sun</option>
                  <option value={'sun2'}>Sun 2</option>
                  <option value={'water'}>Water</option>
                  <option value={'waterTurbulence'}>Water with Turbulence</option>
                  <option value={'coinShower'}>Coin Shower</option>
                  <option value={'bigWin'}>Big Win</option>
                  <option value={'coinsRing'}>Coins Ring</option>
                  <option value={'firework'}>Firework</option>
                  <option value={'explosion'}>Explosion</option>
                  <option value={'fountain'}>Fountain</option>
                  <option value={'flyingFountain'}>Flying Fountain</option>
                  <option value={'label'}>Label</option>
                  <option value={'multiplier'}>Multiplier</option>
                  <option value={'fall'}>Fall</option>
                  <option value={'twist'}>Twist</option>
                  <option value={'snow'}>Snow</option>
                  <option value={'counter'}>Counter</option>
                  <option value={'bubbles'}>Bubbles</option>
                  <option value={'flyingBubbles'}>Flying Bubbles</option>
                  <option value={'background1'}>Background 1</option>
                  <option value={'abstractTunnel'}>Abstract tunnel</option>
                  <option value={'warpOut'}>Warp Out</option>
                  <option value={'warpIn'}>Warp In</option>
                  <option value={'blackHoles'}>Black Holes</option>
                  <option value={'warmOut'}>Warm Out</option>
                  <option value={'bubbleSpray'}>Bubble Spray</option>
                  <option value={'cartoonSmoke'}>Cartoon Smoke</option>
                  <option value={'fog'}>Fog</option>
                  <option value={'fallSingle'}>Fall Single</option>
                  <option value={'fallRainDrops'}>Fall Rain Drops</option>
                </select>
              </div>
            </div>
            {this.props.activeEffect === 'office' ? <></> : <hr />}
            {this.props.activeEffect === 'office' ? (
              <></>
            ) : (
              <div className="form-group">
                <div className="col-xs-4 form-label">Predefined Particle Image</div>
                <div className="col-xs-8">
                  <select
                    className={'form-control'}
                    value={config.particlePredefinedImage || config.textures[0]}
                    onChange={this.handleChangePredefinedImage.bind(this, 0, 'particlePredefinedImage')}
                  >
                    <option value={''}>Choose</option>;
                    {textures &&
                      Object.keys(textures).map((key) => {
                        return (
                          <option key={key} value={key}>
                            {key}
                          </option>
                        )
                      })}
                    {textures2 &&
                      Object.keys(textures2).map((key) => {
                        return (
                          <option key={key} value={key}>
                            {key}
                          </option>
                        )
                      })}
                  </select>
                </div>
              </div>
            )}
            {this.props.activeEffect === 'office' ? (
              <></>
            ) : (
              <div className="form-group">
                <div className="col-xs-4 form-label">Particle Images</div>
                <div className="col-xs-8">
                  <button className="btn btn-default btn-block" onClick={this.loadParticleImages}>
                    Add Images
                  </button>
                  <input
                    type={'file'}
                    id={'load-particle-images'}
                    className={'hidden'}
                    onChange={this.particleImagesChange}
                    multiple
                  />
                </div>
              </div>
            )}
            {this.props.activeEffect === 'office' ? (
              <></>
            ) : (
              <div className="form-group">
                <div className="col-xs-4 form-label">Particle Finishing Images</div>
                <div className="col-xs-8">
                  <button className="btn btn-default btn-block" onClick={this.loadParticleFinishingImages}>
                    Add Finishing Images
                  </button>
                  <input
                    type={'file'}
                    id={'load-particle-finishing-images'}
                    className={'hidden'}
                    onChange={this.particleFinishingImagesChange}
                    multiple
                  />
                </div>
              </div>
            )}
            {this.props.activeEffect === 'office' ? <></> : <hr />}
            {this.props.activeEffect === 'office' ? (
              <></>
            ) : (
              <div className="form-group">
                <div className="col-xs-4 form-label">Animated Sprite</div>
                <div className="col-xs-8">
                  <input
                    type={'checkbox'}
                    checked={config.emitterConfig.animatedSprite.enabled}
                    onChange={this.handleChangeAnimatedSprite}
                  />
                </div>
              </div>
            )}
            {config.emitterConfig.animatedSprite && config.emitterConfig.animatedSprite.enabled && (
              <>
                <FormGroup
                  title={'Animated Sprite Name'}
                  type={'text'}
                  value={[config.emitterConfig.animatedSprite.animatedSpriteName]}
                  updateProps={this.updateProps.bind(this, 'global-animatedSpriteName')}
                />
                <FormGroup
                  title={'Animated Sprite Frame Rate'}
                  type={'number'}
                  value={[config.emitterConfig.animatedSprite.frameRate]}
                  updateProps={this.updateProps.bind(this, 'global-animatedSpriteFrameRate')}
                />
                <FormGroup
                  title={'Animated Sprite Index To Start'}
                  type={'number'}
                  step={'1'}
                  value={[config.animatedSpriteIndexToStart]}
                  updateProps={this.updateProps.bind(this, 'global-animatedSpriteIndexToStart')}
                />
                <FormGroup
                  title={'Animated Sprite Zero Pad'}
                  type={'number'}
                  step={'1'}
                  value={[config.animatedSpriteZeroPad]}
                  updateProps={this.updateProps.bind(this, 'global-animatedSpriteZeroPad')}
                />
                <div className="form-group">
                  <div className="col-xs-4 form-label">Animated Sprite Loop</div>
                  <div className="col-xs-8">
                    <input
                      type={'checkbox'}
                      checked={config.emitterConfig.animatedSprite.loop}
                      onChange={this.handleChangeAnimatedSpriteLoop}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-xs-4 form-label">Random Frame Start</div>
                  <div className="col-xs-8">
                    <input
                      type={'checkbox'}
                      checked={config.emitterConfig.animatedSprite.randomFrameStart}
                      onChange={this.handleChangeAnimatedSpriteRandomFrameStart}
                    />
                  </div>
                </div>
              </>
            )}
            {this.props.activeEffect === 'office' ? <></> : <hr />}
            {this.props.activeEffect === 'office' ? (
              <></>
            ) : (
              <div className="form-group">
                <div className="col-xs-4 form-label">Background Image</div>
                <div className="col-xs-8">
                  <button type="button" className="btn btn-default btn-block" onClick={this.loadBgImage}>
                    Load image
                  </button>
                  <input type={'file'} id={'load-bg-image'} className={'hidden'} onChange={this.bgImageChange} />
                </div>
              </div>
            )}
            {this.props.activeEffect === 'office' ? (
              <></>
            ) : (
              <FormGroup
                title={'Background'}
                type={'text'}
                color={true}
                value={['#000000']}
                inputHidden={true}
                updateProps={this.updateProps.bind(this, 'BackgroundColor')}
              />
            )}
            {this.props.activeEffect === 'office' ? (
              <></>
            ) : (
              <div className="form-group">
                <div className="col-xs-4 form-label">Alpha</div>
                <div className="col-xs-8">
                  <input
                    className={`form-control`}
                    type="number"
                    step="0.1"
                    value={config.emitterConfig.alpha ? config.emitterConfig.alpha : globalAlpha}
                    onChange={this.handleChangeGlobalAlpha.bind(this)}
                  />
                </div>
              </div>
            )}
            {this.props.activeEffect === 'office' ? (
              <></>
            ) : (
              <FormGroup
                type={'number'}
                title={'Anchor'}
                params={['x', 'y']}
                step={'0.1'}
                value={[
                  config.emitterConfig.anchor && config.emitterConfig.anchor.x,
                  config.emitterConfig.anchor && config.emitterConfig.anchor.y,
                ]}
                updateProps={this.updateProps.bind(this, 'global-anchor')}
              />
            )}
            {this.props.activeEffect === 'office' ? (
              <></>
            ) : (
              <div className="form-group">
                <div className="col-xs-4 form-label">Blend Mode</div>
                <div className="col-xs-8">
                  <select
                    className={'form-control'}
                    value={config.emitterConfig.blendMode ? config.emitterConfig.blendMode : blendMode}
                    onChange={this.handleChange.bind(this, 0, 'global-blendMode')}
                  >
                    <option value={BLEND_MODES.NORMAL}>NORMAL</option>
                    <option value={BLEND_MODES.ADD}>ADD</option>
                    <option value={BLEND_MODES.MULTIPLY}>MULTIPLY</option>
                    <option value={BLEND_MODES.SCREEN}>SCREEN</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      )
    }
  }

  private handleChangeGlobalAlpha(event) {
    this.setState({ globalAlpha: event.target.value })
    this.props.updateProps('global-alpha', [0, event.target.value])
  }

  private handleChange(index: number, name: string, event) {
    this.setState({ blendMode: event.target.value })
    this.props.updateProps(name, [index, event.target.value])
  }

  private handleChangeEffect(index: number, name: string, event) {
    this.setState({ blendMode: event.target.value })
    this.props.updateProps(name, [index, event.target.value])
  }

  private handleChangePredefinedImage(index: number, name: string, event) {
    this.setState({ blendMode: event.target.value })
    this.props.updateProps(name, [index, event.target.value])
  }

  private updateProps(name: string, props: any) {
    this.props.updateProps(name, props)
  }

  private handleChangeAnimatedSprite = (event) => {
    this.props.updateProps('global-animatedSprite', [0, event.target.checked])
  }

  private handleChangeFollowMouse = (event) => {
    this.props.updateProps('global-followMouse', [0, event.target.checked])
  }

  private handleChangeAnimatedSpriteLoop = (event) => {
    this.props.updateProps('global-animatedSpriteLoop', [0, event.target.checked])
  }

  private handleChangeAnimatedSpriteRandomFrameStart = (event) => {
    this.props.updateProps('global-animatedSpriteRandomFrameStart', [0, event.target.checked])
  }

  private changeSubmenuVisibility() {
    let { isSubmenuVisible } = this.state
    if (!isSubmenuVisible) {
      isSubmenuVisible = 'in'
    } else {
      isSubmenuVisible = ''
    }
    this.setState({ isSubmenuVisible })
  }

  private bgImageChange = () => {
    const reader = new FileReader()
    reader.onload = () => {
      // @ts-ignore
      const file = document.getElementById('load-bg-image').files[0]
      this.updateProps('bg-image', [0, { fileName: file.name, result: reader.result }])

      this.setState({ test: 2 })
      setTimeout(() => {
        this.setState({ test: 1 })
      }, 0)
    }

    // @ts-ignore
    reader.readAsDataURL(document.getElementById('load-bg-image').files[0])
  }

  private particleImagesChange = () => {
    const images = []
    let loadedImages = 0
    // @ts-ignore
    const files: any[] = document.getElementById('load-particle-images').files
    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        // @ts-ignore
        images.push({ fileName: file.name, result: reader.result })
        loadedImages++
        if (loadedImages === files.length) {
          this.sendParticleImages(images)

          this.setState({ test: 2 })
          setTimeout(() => {
            this.setState({ test: 1 })
          }, 0)
        }
      }
      reader.readAsDataURL(file)
    })
  }

  private particleFinishingImagesChange = () => {
    const images = []
    let loadedImages = 0
    // @ts-ignore
    const files: any[] = document.getElementById('load-particle-finishing-images').files
    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        // @ts-ignore
        images.push(reader.result)
        loadedImages++
        if (loadedImages === files.length) {
          this.sendParticleFinishingImages(images)

          this.setState({ test: 2 })
          setTimeout(() => {
            this.setState({ test: 1 })
          }, 0)
        }
      }
      reader.readAsDataURL(file)
    })
  }

  private sendParticleImages(images: any[]) {
    this.updateProps('particle-images', [0, images])
  }

  private sendParticleFinishingImages(images: any[]) {
    this.updateProps('particle-finishing-images', [0, images])
  }

  private loadBgImage = () => {
    // @ts-ignore
    document.getElementById('load-bg-image').click()
  }

  private loadParticleImages = () => {
    // @ts-ignore
    document.getElementById('load-particle-images').click()
  }

  private loadParticleFinishingImages = () => {
    // @ts-ignore
    document.getElementById('load-particle-finishing-images').click()
  }
}

declare let module: Record<string, unknown>

export default hot(module)(GeneralProperties)
