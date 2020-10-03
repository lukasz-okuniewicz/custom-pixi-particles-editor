import * as React from 'react'
import { hot } from 'react-hot-loader'
import FormGroup from '../utils/FormGroup'

export interface IProps {
  config: any
  updateProps: any
}

class TurbulenceProperties extends React.Component<IProps> {
  state = {
    isSubmenuVisible: '',
  }

  public render() {
    const { config } = this.props
    const { isSubmenuVisible } = this.state
    if (typeof config.enabled === 'undefined') {
      config.enabled = false
    }
    if (typeof config.showVortices === 'undefined') {
      config.showVortices = false
    }

    return (
      <div className="turbulence-properties">
        <legend onClick={this.changeSubmenuVisibility.bind(this)}>Turbulence Properties</legend>
        <div className={`collapse ${isSubmenuVisible}`}>
          <div className="form-group">
            <div className="col-xs-4 form-label">Enabled</div>
            <div className="col-xs-8">
              <input type={'checkbox'} checked={config.enabled} onChange={this.handleChangeEnabled} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-4 form-label">Show Vortices</div>
            <div className="col-xs-8">
              <input type={'checkbox'} checked={config.showVortices} onChange={this.handleChangeShowVortices} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-4 form-label">Turbulence Version</div>
            <div className="col-xs-8">
              <select
                className={'form-control'}
                value={config.effect || 'chaos'}
                onChange={this.handleChangeEffect.bind(this, 0, 'turbulenceProperties-effect')}
              >
                <option value={0}>ClockWise rotation</option>
                <option value={1}>Non ClockWise rotation</option>
                <option value={2}>Pushing V1</option>
                <option value={3}>Pushing V2</option>
                <option value={4}>Sucking V1</option>
                <option value={5}>Sucking V2</option>
              </select>
            </div>
          </div>
          <FormGroup
            title={'Position'}
            params={['X Position', 'Y Position']}
            value={[(config.position && config.position.x) || 0, (config.position && config.position.y) || 0]}
            updateProps={this.updateProps.bind(this, 'turbulenceProperties-position')}
          />
          <FormGroup
            title={'Position Variance'}
            params={['X Variance', 'Y Variance']}
            value={[
              (config.positionVariance && config.positionVariance.x) || 0,
              (config.positionVariance && config.positionVariance.y) || 0,
            ]}
            updateProps={this.updateProps.bind(this, 'turbulenceProperties-positionVariance')}
          />

          <FormGroup
            title={'Velocity'}
            params={['X Velocity', 'Y Velocity']}
            value={[(config.velocity && config.velocity.x) || 0, (config.velocity && config.velocity.y) || 0]}
            updateProps={this.updateProps.bind(this, 'turbulenceProperties-velocity')}
          />
          <FormGroup
            title={'Velocity Variance'}
            params={['X Velocity Variance', 'Y Velocity Variance']}
            value={[
              (config.velocityVariance && config.velocityVariance.x) || 0,
              (config.velocityVariance && config.velocityVariance.y) || 0,
            ]}
            updateProps={this.updateProps.bind(this, 'turbulenceProperties-velocityVariance')}
          />

          <FormGroup
            title={'Acceleration'}
            params={['X Acceleration', 'Y Acceleration']}
            value={[
              (config.acceleration && config.acceleration.x) || 0,
              (config.acceleration && config.acceleration.y) || 0,
            ]}
            updateProps={this.updateProps.bind(this, 'turbulenceProperties-acceleration')}
          />
          <FormGroup
            title={'Acceleration Variance'}
            params={['X Acceleration Variance', 'Y Acceleration Variance']}
            value={[
              (config.accelerationVariance && config.accelerationVariance.x) || 0,
              (config.accelerationVariance && config.accelerationVariance.y) || 0,
            ]}
            updateProps={this.updateProps.bind(this, 'turbulenceProperties-accelerationVariance')}
          />
          <FormGroup
            title={'Size Start'}
            params={['X Size Start', 'Y Size Start']}
            value={[(config.sizeStart && config.sizeStart.x) || 0, (config.sizeStart && config.sizeStart.y) || 1]}
            updateProps={this.updateProps.bind(this, 'turbulenceProperties-sizeStart')}
          />
          <FormGroup
            title={'Start Variance'}
            value={[config.startVariance || 0]}
            updateProps={this.updateProps.bind(this, 'turbulenceProperties-startVariance')}
          />
          <FormGroup
            title={'Size End'}
            params={['X Size End', 'Y Size End']}
            value={[(config.sizeEnd && config.sizeEnd.x) || 0, (config.sizeEnd && config.sizeEnd.y) || 0]}
            updateProps={this.updateProps.bind(this, 'turbulenceProperties-sizeEnd')}
          />
          <FormGroup
            title={'End Variance'}
            value={[config.endVariance || 0]}
            updateProps={this.updateProps.bind(this, 'turbulenceProperties-endVariance')}
          />
          <FormGroup
            title={'Emit/sec'}
            value={[config.emitPerSecond || 2]}
            updateProps={this.updateProps.bind(this, 'turbulenceProperties-emitPerSecond')}
          />
          <FormGroup
            title={'Duration'}
            value={[config.duration || -1]}
            updateProps={this.updateProps.bind(this, 'turbulenceProperties-duration')}
          />
          <FormGroup
            title={'Max Life Time'}
            value={[config.maxLifeTime || 2]}
            updateProps={this.updateProps.bind(this, 'turbulenceProperties-maxLifeTime')}
          />
          <FormGroup
            title={'Max Life Time Variance'}
            value={[config.maxLifeTimeVariance || 0]}
            updateProps={this.updateProps.bind(this, 'turbulenceProperties-maxLifeTimeVariance')}
          />
        </div>
      </div>
    )
  }

  private handleChangeEffect(index: number, name: string, event) {
    this.setState({ effect: event.target.value })
    this.props.updateProps(name, [index, event.target.value])
  }

  private handleChangeEnabled = (event) => {
    this.props.updateProps('turbulenceProperties-enabled', [0, event.target.checked])
  }

  private handleChangeShowVortices = (event) => {
    this.props.updateProps('turbulenceProperties-showVortices', [0, event.target.checked])
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
}

declare let module: Record<string, unknown>

export default hot(module)(TurbulenceProperties)
