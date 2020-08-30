import * as React from 'react'
import { hot } from 'react-hot-loader'
import FormGroup from '../utils/FormGroup'

export interface IProps {
  config: any
  updateProps: any
}

class GeneralProperties extends React.Component<IProps> {
  state = {
    isSubmenuVisible: 'in',
    blendMode: 'normal',
    globalAlpha: 1,
  }

  public render() {
    const { config } = this.props
    const { isSubmenuVisible, globalAlpha, blendMode } = this.state

    return (
      <div className="general-properties">
        <legend onClick={this.changeSubmenuVisibility.bind(this)}>General Properties</legend>
        <div className={`collapse ${isSubmenuVisible}`}>
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
          <div className="form-group">
            <div className="col-xs-10 form-label">Particle Effects</div>
            <div className="col-xs-2">
              <button
                className="btn btn-default btn-block"
                onClick={this.updateProps.bind(this, 'particlePredefinedEffect', 1)}
              >
                1
              </button>
            </div>
            <div className="col-xs-2">
              <button
                className="btn btn-default btn-block"
                onClick={this.updateProps.bind(this, 'particlePredefinedEffect', 2)}
              >
                2
              </button>
            </div>
            <div className="col-xs-2">
              <button
                className="btn btn-default btn-block"
                onClick={this.updateProps.bind(this, 'particlePredefinedEffect', 3)}
              >
                3
              </button>
            </div>
            <div className="col-xs-2">
              <button
                className="btn btn-default btn-block"
                onClick={this.updateProps.bind(this, 'particlePredefinedEffect', 4)}
              >
                4
              </button>
            </div>
            <div className="col-xs-2">
              <button
                className="btn btn-default btn-block"
                onClick={this.updateProps.bind(this, 'particlePredefinedEffect', 5)}
              >
                5
              </button>
            </div>
            <div className="col-xs-2">
              <button
                className="btn btn-default btn-block"
                onClick={this.updateProps.bind(this, 'particlePredefinedEffect', 6)}
              >
                6
              </button>
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-4 form-label">Background Image</div>
            <div className="col-xs-8">
              <button type="button" className="btn btn-default btn-block" onClick={this.loadBgImage}>
                Load image
              </button>
              <input type={'file'} id={'load-bg-image'} className={'hidden'} onChange={this.bgImageChange} />
            </div>
          </div>
          <FormGroup
            title={'Background'}
            type={'text'}
            color={true}
            value={['#000000']}
            inputHidden={true}
            updateProps={this.updateProps.bind(this, 'BackgroundColor')}
          />
          <div className="form-group">
            <div className="col-xs-4 form-label">Alpha</div>
            <div className="col-xs-8">
              <input
                className={`form-control`}
                type="number"
                step="0.1"
                value={config.alpha ? config.alpha : globalAlpha}
                onChange={this.handleChangeGlobalAlpha.bind(this)}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-4 form-label">Blend Mode</div>
            <div className="col-xs-8">
              <select
                className={'form-control'}
                value={config.blendMode ? config.blendMode : blendMode}
                onChange={this.handleChange.bind(this, 0, 'global-blendMode')}
              >
                <option>Normal</option>
                <option>Add</option>
                <option>Multiply</option>
                <option>Screen</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    )
  }

  private handleChangeGlobalAlpha(event) {
    this.setState({ globalAlpha: event.target.value })
    this.props.updateProps('global-alpha', [0, event.target.value])
  }

  private handleChange(index: number, name: string, event) {
    this.setState({ blendMode: event.target.value })
    this.props.updateProps(name, [index, event.target.value])
  }

  private updateProps(name: string, props: any) {
    this.props.updateProps(name, props)
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
    var reader = new FileReader()
    reader.onload = () => {
      this.updateProps('bg-image', [0, reader.result])
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
      var reader = new FileReader()
      reader.onload = () => {
        images.push(reader.result)
        loadedImages++
        if (loadedImages === files.length) {
          this.sendParticleImages(images)
        }
      }
      reader.readAsDataURL(file)
    })
  }

  private sendParticleImages(images: any[]) {
    this.updateProps('particle-images', [0, images])
  }

  private loadBgImage = () => {
    document.getElementById('load-bg-image').click()
  }

  private loadParticleImages = () => {
    document.getElementById('load-particle-images').click()
  }
}

declare let module: Record<string, unknown>

export default hot(module)(GeneralProperties)
