import * as React from 'react'
import { hot } from 'react-hot-loader'
import FormGroup from '../utils/FormGroup'

export interface IProps {
  config: any
  updateProps: any
}

class PositionProperties extends React.Component<IProps> {
  state = {
    isSubmenuVisible: '',
  }

  public render() {
    const { config } = this.props
    const { isSubmenuVisible } = this.state
    if (typeof config.enabled === 'undefined') {
      config.enabled = false
    }

    return (
      <div className="position-properties">
        <legend onClick={this.changeSubmenuVisibility.bind(this)}>Position Properties</legend>
        <div className={`collapse ${isSubmenuVisible}`}>
          <div className="form-group">
            <div className="col-xs-4 form-label">Enabled</div>
            <div className="col-xs-8">
              <input type={'checkbox'} checked={config.enabled} onChange={this.handleChangeEnabled} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-4 form-label">Spawn Type</div>
            <div className="col-xs-8">
              <select
                className={'form-control'}
                value={config.spawnType || 'Rectangle'}
                onChange={this.handleChangeSpawnType.bind(this, 0, 'positionProperties-spawnType')}
              >
                <option>Rectangle</option>
                <option>Frame</option>
                <option>Ring</option>
              </select>
            </div>
          </div>
          <FormGroup
            title={'Radius'}
            value={[config.radius || 0]}
            updateProps={this.updateProps.bind(this, 'positionProperties-radius')}
          />
          <FormGroup
            title={'Position'}
            params={['X Position', 'Y Position']}
            value={[(config.position && config.position.x) || 0, (config.position && config.position.y) || 0]}
            updateProps={this.updateProps.bind(this, 'positionProperties-position')}
          />
          <FormGroup
            title={'Position Variance'}
            params={['X Variance', 'Y Variance']}
            value={[
              (config.positionVariance && config.positionVariance.x) || 0,
              (config.positionVariance && config.positionVariance.y) || 0,
            ]}
            updateProps={this.updateProps.bind(this, 'positionProperties-positionVariance')}
          />

          <FormGroup
            title={'Velocity'}
            params={['X Velocity', 'Y Velocity']}
            value={[(config.velocity && config.velocity.x) || 0, (config.velocity && config.velocity.y) || 0]}
            updateProps={this.updateProps.bind(this, 'positionProperties-velocity')}
          />
          <FormGroup
            title={'Velocity Variance'}
            params={['X Velocity Variance', 'Y Velocity Variance']}
            value={[
              (config.velocityVariance && config.velocityVariance.x) || 0,
              (config.velocityVariance && config.velocityVariance.y) || 0,
            ]}
            updateProps={this.updateProps.bind(this, 'positionProperties-velocityVariance')}
          />

          <FormGroup
            title={'Gravity/Acceleration'}
            params={['X Gravity', 'Y Gravity']}
            value={[
              (config.acceleration && config.acceleration.x) || 0,
              (config.acceleration && config.acceleration.y) || 0,
            ]}
            updateProps={this.updateProps.bind(this, 'positionProperties-acceleration')}
          />
          <FormGroup
            title={'Gravity Variance'}
            params={['X Gravity Variance', 'Y Gravity Variance']}
            value={[
              (config.accelerationVariance && config.accelerationVariance.x) || 0,
              (config.accelerationVariance && config.accelerationVariance.y) || 0,
            ]}
            updateProps={this.updateProps.bind(this, 'positionProperties-accelerationVariance')}
          />
        </div>
      </div>
    )
  }

  private handleChangeSpawnType(index: number, name: string, event) {
    this.setState({ effect: event.target.value })
    this.props.updateProps(name, [index, event.target.value])
  }

  private handleChangeEnabled = (event) => {
    this.props.updateProps('positionProperties-enabled', [0, event.target.checked])
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

export default hot(module)(PositionProperties)
