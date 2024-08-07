import * as React from 'react'
import { hot } from 'react-hot-loader'
import FormGroup from '../utils/FormGroup'

export interface IProps {
  config: any
  updateProps: any
  activeEffect: any
}

class PositionProperties extends React.Component<IProps> {
  state = {
    isSubmenuVisible: '',
  }

  public render() {
    if (this.props.activeEffect === 'office') return <></>
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
    if (typeof config.fromAtoB === 'undefined') {
      config.fromAtoB = false
    }
    if (typeof config.fromAtoBTwoWays === 'undefined') {
      config.fromAtoBTwoWays = false
    }
    if (typeof config.warp === 'undefined') {
      config.warp = false
    }
    if (typeof config.warpDistanceToCenter === 'undefined') {
      config.warpDistanceToCenter = false
    }
    if (typeof config.warpSpeed === 'undefined') {
      config.warpSpeed = 0
    }
    if (typeof config.warpBaseSpeed === 'undefined') {
      config.warpBaseSpeed = 0.05
    }
    if (typeof config.cameraZConverter === 'undefined') {
      config.cameraZConverter = 10
    }
    if (typeof config.warpFov === 'undefined') {
      config.warpFov = 20
    }
    if (typeof config.warpStretch === 'undefined') {
      config.warpStretch = 5
    }
    if (typeof config.warpDistanceScaleConverter === 'undefined') {
      config.warpDistanceScaleConverter = 2000
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
    if (typeof config.radius === 'undefined') {
      config.radius = 0
    }
    if (typeof config.radiusX === 'undefined') {
      config.radiusX = 0
    }
    if (typeof config.radiusY === 'undefined') {
      config.radiusY = 0
    }
    if (typeof config.pointA === 'undefined') {
      config.pointA = {
        x: 0,
        y: 0,
      }
    }
    if (typeof config.pointB === 'undefined') {
      config.pointB = {
        x: 0,
        y: 0,
      }
    }
    if (typeof config.thereDuration === 'undefined') {
      config.thereDuration = {
        min: 1,
        max: 1,
      }
    }
    if (typeof config.backDuration === 'undefined') {
      config.backDuration = {
        min: 1,
        max: 1,
      }
    }
    if (typeof config.thereAmplitude === 'undefined') {
      config.thereAmplitude = {
        min: 10,
        max: 10,
      }
    }
    if (typeof config.backAmplitude === 'undefined') {
      config.backAmplitude = {
        min: 10,
        max: 10,
      }
    }
    if (typeof config.there === 'undefined') {
      config.there = {
        x: '',
        y: '',
        ease: '',
      }
    }
    if (typeof config.back === 'undefined') {
      config.back = {
        x: '',
        y: '',
        ease: '',
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
            <div className="col-xs-4 form-label">From point A to point B</div>
            <div className="col-xs-8">
              <input type={'checkbox'} checked={config.fromAtoB} onChange={this.handleChangeFromAtoB} />
            </div>
          </div>
          <hr />
          {config.fromAtoB && (
            <>
              <div className="form-group">
                <div className="col-xs-4 form-label">Two ways</div>
                <div className="col-xs-8">
                  <input
                    type={'checkbox'}
                    checked={config.fromAtoBTwoWays}
                    onChange={this.handleChangeFromAtoBOneWay}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="col-xs-4 form-label">There X</div>
                <div className="col-xs-8">
                  <select
                    className={'form-control'}
                    value={config.there.x || ''}
                    onChange={this.handleChangeThere.bind(this, 0, 'positionProperties-thereX')}
                  >
                    <option>None</option>
                    <option>Sin</option>
                    <option>Cos</option>
                    <option>Tan</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <div className="col-xs-4 form-label">There Y</div>
                <div className="col-xs-8">
                  <select
                    className={'form-control'}
                    value={config.there.y || ''}
                    onChange={this.handleChangeThere.bind(this, 0, 'positionProperties-thereY')}
                  >
                    <option>None</option>
                    <option>Sin</option>
                    <option>Cos</option>
                    <option>Tan</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <div className="col-xs-4 form-label">There Ease</div>
                <div className="col-xs-8">
                  <select
                    className={'form-control'}
                    value={config.there.ease || ''}
                    onChange={this.handleChangeThere.bind(this, 0, 'positionProperties-thereEase')}
                  >
                    <option>None</option>
                    <option>back.in</option>
                    <option>back.out</option>
                    <option>back.inOut</option>
                    <option>power1.in</option>
                    <option>power1.out</option>
                    <option>power1.inOut</option>
                    <option>bounce.in</option>
                    <option>bounce.out</option>
                    <option>bounce.inOut</option>
                    <option>elastic.in</option>
                    <option>elastic.out</option>
                    <option>elastic.inOut</option>
                    <option>steps</option>
                  </select>
                </div>
              </div>
              <FormGroup
                type={'number'}
                step={'1'}
                title={'There Duration'}
                params={['min', 'max']}
                value={[
                  config.thereDuration && config.thereDuration.min,
                  config.thereDuration && config.thereDuration.max,
                ]}
                updateProps={this.updateProps.bind(this, 'positionProperties-there-duration')}
              />
              <FormGroup
                type={'number'}
                step={'1'}
                title={'There Amplitude'}
                params={['min', 'max']}
                value={[
                  config.thereAmplitude && config.thereAmplitude.min,
                  config.thereAmplitude && config.thereAmplitude.max,
                ]}
                updateProps={this.updateProps.bind(this, 'positionProperties-there-amplitude')}
              />

              {config.fromAtoBTwoWays && (
                <>
                  <hr />
                  <div className="form-group">
                    <div className="col-xs-4 form-label">Back X</div>
                    <div className="col-xs-8">
                      <select
                        className={'form-control'}
                        value={config.back.x || ''}
                        onChange={this.handleChangeThere.bind(this, 0, 'positionProperties-backX')}
                      >
                        <option>None</option>
                        <option>Sin</option>
                        <option>Cos</option>
                        <option>Tan</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-xs-4 form-label">Back Y</div>
                    <div className="col-xs-8">
                      <select
                        className={'form-control'}
                        value={config.back.y || ''}
                        onChange={this.handleChangeThere.bind(this, 0, 'positionProperties-backY')}
                      >
                        <option>None</option>
                        <option>Sin</option>
                        <option>Cos</option>
                        <option>Tan</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-xs-4 form-label">Back Ease</div>
                    <div className="col-xs-8">
                      <select
                        className={'form-control'}
                        value={config.back.ease || ''}
                        onChange={this.handleChangeThere.bind(this, 0, 'positionProperties-backEase')}
                      >
                        <option>None</option>
                        <option>back.in</option>
                        <option>back.out</option>
                        <option>back.inOut</option>
                        <option>power1.in</option>
                        <option>power1.out</option>
                        <option>power1.inOut</option>
                        <option>bounce.in</option>
                        <option>bounce.out</option>
                        <option>bounce.inOut</option>
                        <option>elastic.in</option>
                        <option>elastic.out</option>
                        <option>elastic.inOut</option>
                        <option>steps</option>
                      </select>
                    </div>
                  </div>
                  <FormGroup
                    type={'number'}
                    step={'1'}
                    title={'Back Duration'}
                    params={['min', 'max']}
                    value={[
                      config.backDuration && config.backDuration.min,
                      config.backDuration && config.backDuration.max,
                    ]}
                    updateProps={this.updateProps.bind(this, 'positionProperties-back-duration')}
                  />
                  <FormGroup
                    type={'number'}
                    step={'1'}
                    title={'Back Amplitude'}
                    params={['min', 'max']}
                    value={[
                      config.backAmplitude && config.backAmplitude.min,
                      config.backAmplitude && config.backAmplitude.max,
                    ]}
                    updateProps={this.updateProps.bind(this, 'positionProperties-back-amplitude')}
                  />
                  <hr />
                </>
              )}

              <FormGroup
                type={'number'}
                step={'1'}
                title={'Point A'}
                params={['X', 'Y']}
                value={[config.pointA && config.pointA.x, config.pointA && config.pointA.y]}
                updateProps={this.updateProps.bind(this, 'positionProperties-pointA')}
              />
              <FormGroup
                type={'number'}
                step={'1'}
                title={'Point B'}
                params={['X', 'Y']}
                value={[config.pointB && config.pointB.x, config.pointB && config.pointB.y]}
                updateProps={this.updateProps.bind(this, 'positionProperties-pointB')}
              />
            </>
          )}
          {!config.fromAtoB && (
            <>
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
                    <option>FrameRectangle</option>
                    <option>Ring</option>
                  </select>
                </div>
              </div>
              {config.spawnType === 'FrameRectangle' && (
                <>
                  <FormGroup
                    type={'number'}
                    step={'1'}
                    title={'Distance'}
                    params={['X Distance', 'Y Distance']}
                    value={[config.radiusX, config.radiusY]}
                    updateProps={this.updateProps.bind(this, 'positionProperties-radiusXY')}
                  />
                </>
              )}
              {config.spawnType !== 'FrameRectangle' && (
                <>
                  <FormGroup
                    type={'number'}
                    step={'1'}
                    title={'Radius'}
                    value={[config.radius]}
                    updateProps={this.updateProps.bind(this, 'positionProperties-radius')}
                  />
                </>
              )}
              <hr />
              <FormGroup
                type={'number'}
                step={'1'}
                title={'Position'}
                params={['X Position', 'Y Position']}
                value={[config.position && config.position.x, config.position && config.position.y]}
                updateProps={this.updateProps.bind(this, 'positionProperties-position')}
              />
              <FormGroup
                type={'number'}
                step={'1'}
                title={'Position Variance'}
                params={['X Variance', 'Y Variance']}
                value={[
                  config.positionVariance && config.positionVariance.x,
                  config.positionVariance && config.positionVariance.y,
                ]}
                updateProps={this.updateProps.bind(this, 'positionProperties-positionVariance')}
              />
              <hr />
              <FormGroup
                type={'number'}
                step={'1'}
                title={'Velocity'}
                params={['X Velocity', 'Y Velocity']}
                value={[config.velocity && config.velocity.x, config.velocity && config.velocity.y]}
                updateProps={this.updateProps.bind(this, 'positionProperties-velocity')}
              />
              <FormGroup
                type={'number'}
                step={'1'}
                title={'Velocity Variance'}
                params={['X Velocity Variance', 'Y Velocity Variance']}
                value={[
                  config.velocityVariance && config.velocityVariance.x,
                  config.velocityVariance && config.velocityVariance.y,
                ]}
                updateProps={this.updateProps.bind(this, 'positionProperties-velocityVariance')}
              />
              <hr />
              <FormGroup
                type={'number'}
                step={'1'}
                title={'Gravity/Acceleration'}
                params={['X Gravity', 'Y Gravity']}
                value={[config.acceleration && config.acceleration.x, config.acceleration && config.acceleration.y]}
                updateProps={this.updateProps.bind(this, 'positionProperties-acceleration')}
              />
              <FormGroup
                type={'number'}
                step={'1'}
                title={'Gravity Variance'}
                params={['X Gravity Variance', 'Y Gravity Variance']}
                value={[
                  config.accelerationVariance && config.accelerationVariance.x,
                  config.accelerationVariance && config.accelerationVariance.y,
                ]}
                updateProps={this.updateProps.bind(this, 'positionProperties-accelerationVariance')}
              />
              <hr />
              <div className="form-group">
                <div className="col-xs-4 form-label">Sine X</div>
                <div className="col-xs-8">
                  <input type={'checkbox'} checked={config.sinX} onChange={this.handleChangeSinX} />
                </div>
              </div>
              {config.sinX && (
                <>
                  <FormGroup
                    type={'number'}
                    title={'Sine X Value'}
                    params={['Value 1', 'Value 2']}
                    value={[config.sinXVal && config.sinXVal.x, config.sinXVal && config.sinXVal.y]}
                    updateProps={this.updateProps.bind(this, 'positionProperties-sinXVal')}
                  />
                  <FormGroup
                    type={'number'}
                    title={'Sine X Value Variance'}
                    params={['Value 1 Variance', 'Value 2 Variance']}
                    value={[
                      config.sinXValVariance && config.sinXValVariance.x,
                      config.sinXValVariance && config.sinXValVariance.y,
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
                    type={'number'}
                    title={'Sine Y Value'}
                    params={['Value 1', 'Value 2']}
                    value={[config.sinYVal && config.sinYVal.x, config.sinYVal && config.sinYVal.y]}
                    updateProps={this.updateProps.bind(this, 'positionProperties-sinYVal')}
                  />
                  <FormGroup
                    type={'number'}
                    title={'Sine Y Value Variance'}
                    params={['Value 1 Variance', 'Value 2 Variance']}
                    value={[
                      config.sinYValVariance && config.sinYValVariance.x,
                      config.sinYValVariance && config.sinYValVariance.y,
                    ]}
                    updateProps={this.updateProps.bind(this, 'positionProperties-sinYValVariance')}
                  />
                </>
              )}
              <hr />
              <div className="form-group">
                <div className="col-xs-4 form-label">Warp effect</div>
                <div className="col-xs-8">
                  <input type={'checkbox'} checked={config.warp} onChange={this.handleChangeWarp} />
                </div>
              </div>
              {config.warp && (
                <>
                  <FormGroup
                    type={'number'}
                    step={'0.0001'}
                    title={'Speed'}
                    value={[config.warpSpeed]}
                    updateProps={this.updateProps.bind(this, 'positionProperties-warpSpeed')}
                  />
                  <FormGroup
                    type={'number'}
                    step={'0.01'}
                    title={'Base Speed'}
                    value={[config.warpBaseSpeed]}
                    updateProps={this.updateProps.bind(this, 'positionProperties-warpBaseSpeed')}
                  />
                  <FormGroup
                    type={'number'}
                    step={'1'}
                    title={'Camera Z converter'}
                    value={[config.cameraZConverter]}
                    updateProps={this.updateProps.bind(this, 'positionProperties-cameraZConverter')}
                  />
                  <FormGroup
                    type={'number'}
                    step={'1'}
                    title={'FOV'}
                    value={[config.warpFov]}
                    updateProps={this.updateProps.bind(this, 'positionProperties-warpFov')}
                  />
                  <FormGroup
                    type={'number'}
                    step={'1'}
                    title={'Stretch'}
                    value={[config.warpStretch]}
                    updateProps={this.updateProps.bind(this, 'positionProperties-warpStretch')}
                  />
                  <FormGroup
                    type={'number'}
                    step={'1'}
                    title={'Distance Scale Converter'}
                    value={[config.warpDistanceScaleConverter]}
                    updateProps={this.updateProps.bind(this, 'positionProperties-warpDistanceScaleConverter')}
                  />
                  <div className="form-group">
                    <div className="col-xs-4 form-label">Closer to center</div>
                    <div className="col-xs-8">
                      <input
                        type={'checkbox'}
                        checked={config.warpDistanceToCenter}
                        onChange={this.handleChangeWarpCloser}
                      />
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    )
  }

  private handleChangeSinX = (event) => {
    this.props.updateProps('positionProperties-sinX', [0, event.target.checked])
  }

  private handleChangeFromAtoB = (event) => {
    this.props.updateProps('positionProperties-fromAtoB', [0, event.target.checked])
  }

  private handleChangeFromAtoBOneWay = (event) => {
    this.props.updateProps('positionProperties-fromAtoBTwoWays', [0, event.target.checked])
  }

  private handleChangeSinY = (event) => {
    this.props.updateProps('positionProperties-sinY', [0, event.target.checked])
  }

  private handleChangeWarp = (event) => {
    this.props.updateProps('positionProperties-warp', [0, event.target.checked])
  }

  private handleChangeWarpCloser = (event) => {
    this.props.updateProps('positionProperties-warpDistanceToCenter', [0, event.target.checked])
  }

  private handleChangeSpawnType(index: number, name: string, event) {
    this.setState({ effect: event.target.value })
    this.props.updateProps(name, [index, event.target.value])
  }

  private handleChangeThere(index: number, name: string, event) {
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
