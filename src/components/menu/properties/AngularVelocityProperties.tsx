import * as React from 'react'
import { hot } from 'react-hot-loader'
import FormGroup from '../utils/FormGroup'

export interface IProps {
  config: any
  updateProps: any
}

class AngularVelocityProperties extends React.Component<IProps> {
  state = {
    isSubmenuVisible: '',
  }

  public render() {
    const { config } = this.props
    const { isSubmenuVisible } = this.state
    if (typeof config.enabled === 'undefined') {
      config.enabled = false
    }
    if (typeof config.degrees === 'undefined') {
      config.degrees = 0
    }
    if (typeof config.degreesVariance === 'undefined') {
      config.degreesVariance = 0
    }
    if (typeof config.maxRadius === 'undefined') {
      config.maxRadius = 0
    }
    if (typeof config.maxRadiusVariance === 'undefined') {
      config.maxRadiusVariance = 0
    }
    if (typeof config.minRadius === 'undefined') {
      config.minRadius = 0
    }
    if (typeof config.minRadiusVariance === 'undefined') {
      config.minRadiusVariance = 0
    }

    return (
      <div className="color-properties">
        <legend onClick={this.changeSubmenuVisibility.bind(this)}>Angular Velocity Properties</legend>
        <div className={`collapse ${isSubmenuVisible}`}>
          <div className="form-group">
            <div className="col-xs-4 form-label">Enabled</div>
            <div className="col-xs-8">
              <input type={'checkbox'} checked={config.enabled} onChange={this.handleChangeEnabled} />
            </div>
          </div>
          <FormGroup
              type={'number'}
              step={'1'}
            title={'Degrees/sec'}
            value={[config.degrees]}
            updateProps={this.updateProps.bind(this, 'angularVelocityProperties-degrees')}
          />
          <FormGroup
              type={'number'}
              step={'1'}
            title={'Degrees Variance/sec'}
            value={[config.degreesVariance]}
            updateProps={this.updateProps.bind(this, 'angularVelocityProperties-degreesVariance')}
          />
          <FormGroup
              type={'number'}
              step={'1'}
            title={'Max Radius'}
            value={[config.maxRadius]}
            updateProps={this.updateProps.bind(this, 'angularVelocityProperties-maxRadius')}
          />
          <FormGroup
              type={'number'}
              step={'1'}
            title={'Max Radius Variance'}
            value={[config.maxRadiusVariance]}
            updateProps={this.updateProps.bind(this, 'angularVelocityProperties-maxRadiusVariance')}
          />
          <FormGroup
              type={'number'}
              step={'1'}
            title={'Min Radius'}
            value={[config.minRadius]}
            updateProps={this.updateProps.bind(this, 'angularVelocityProperties-minRadius')}
          />
          <FormGroup
              type={'number'}
              step={'1'}
            title={'Min Radius Variance'}
            value={[config.minRadiusVariance]}
            updateProps={this.updateProps.bind(this, 'angularVelocityProperties-minRadiusVariance')}
          />
        </div>
      </div>
    )
  }

  private handleChangeEnabled = (event) => {
    this.props.updateProps('angularVelocityProperties-enabled', [0, event.target.checked])
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

export default hot(module)(AngularVelocityProperties)
