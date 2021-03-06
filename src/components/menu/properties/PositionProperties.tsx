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
    if (typeof config.sinX === 'undefined') {
      config.sinX = false
    }
    if (typeof config.sinY === 'undefined') {
      config.sinY = false
    }
    if (typeof config.sinXVal === 'undefined') {
      config.sinXVal = {
        x: 0,
        y: 0,
      }
    }
    if (typeof config.sinYVal === 'undefined') {
      config.sinYVal = {
        x: 0,
        y: 0,
      }
    }
    if (typeof config.sinXValVariance === 'undefined') {
      config.sinXValVariance = {
        x: 0,
        y: 0,
      }
    }
    if (typeof config.sinYValVariance === 'undefined') {
      config.sinYValVariance = {
        x: 0,
        y: 0,
      }
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
          <div className="form-group">
            <div className="col-xs-4 form-label">Sine X</div>
            <div className="col-xs-8">
              <input type={'checkbox'} checked={config.sinX} onChange={this.handleChangeSinX} />
            </div>
          </div>
          {config.sinX && (
            <>
              <FormGroup
                title={'Sine X Value'}
                params={['Value 1', 'Value 2']}
                value={[(config.sinXVal && config.sinXVal.x) || 0, (config.sinXVal && config.sinXVal.y) || 0]}
                updateProps={this.updateProps.bind(this, 'positionProperties-sinXVal')}
              />
              <FormGroup
                title={'Sine X Value Variance'}
                params={['Value 1 Variance', 'Value 2 Variance']}
                value={[
                  (config.sinXValVariance && config.sinXValVariance.x) || 0,
                  (config.sinXValVariance && config.sinXValVariance.y) || 0,
                ]}
                updateProps={this.updateProps.bind(this, 'positionProperties-sinXValVariance')}
              />
            </>
          )}
          <div className="form-group">
            <div className="col-xs-4 form-label">Sine Y</div>
            <div className="col-xs-8">
              <input type={'checkbox'} checked={config.sinY} onChange={this.handleChangeSinY} />
            </div>
          </div>
          {config.sinY && (
            <>
              <FormGroup
                title={'Sine Y Value'}
                params={['Value 1', 'Value 2']}
                value={[(config.sinYVal && config.sinYVal.x) || 0, (config.sinYVal && config.sinYVal.y) || 0]}
                updateProps={this.updateProps.bind(this, 'positionProperties-sinYVal')}
              />
              <FormGroup
                title={'Sine Y Value Variance'}
                params={['Value 1 Variance', 'Value 2 Variance']}
                value={[
                  (config.sinYValVariance && config.sinYValVariance.x) || 0,
                  (config.sinYValVariance && config.sinYValVariance.y) || 0,
                ]}
                updateProps={this.updateProps.bind(this, 'positionProperties-sinYValVariance')}
              />
            </>
          )}
        </div>
      </div>
    )
  }

  private handleChangeSinX = (event) => {
    this.props.updateProps('positionProperties-sinX', [0, event.target.checked])
  }

  private handleChangeSinY = (event) => {
    this.props.updateProps('positionProperties-sinY', [0, event.target.checked])
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
