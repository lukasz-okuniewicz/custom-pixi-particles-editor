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
            title={'Degrees/sec'}
            value={[config.degrees || 0]}
            updateProps={this.updateProps.bind(this, 'angularVelocityProperties-degrees')}
          />
          <FormGroup
            title={'Degrees Variance/sec'}
            value={[config.degreesVariance || 0]}
            updateProps={this.updateProps.bind(this, 'angularVelocityProperties-degreesVariance')}
          />
          <FormGroup
            title={'Max Radius'}
            value={[config.maxRadius || 0]}
            updateProps={this.updateProps.bind(this, 'angularVelocityProperties-maxRadius')}
          />
          <FormGroup
            title={'Max Radius Variance'}
            value={[config.maxRadiusVariance || 0]}
            updateProps={this.updateProps.bind(this, 'angularVelocityProperties-maxRadiusVariance')}
          />
          <FormGroup
            title={'Min Radius'}
            value={[config.minRadius || 0]}
            updateProps={this.updateProps.bind(this, 'angularVelocityProperties-minRadius')}
          />
          <FormGroup
            title={'Min Radius Variance'}
            value={[config.minRadiusVariance || 0]}
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
