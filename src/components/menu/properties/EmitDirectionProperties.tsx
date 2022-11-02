import * as React from 'react'
import { hot } from 'react-hot-loader'
import FormGroup from '../utils/FormGroup'

export interface IProps {
  config: any
  updateProps: any
}

class EmitDirectionProperties extends React.Component<IProps> {
  state = {
    isSubmenuVisible: '',
  }

  public render() {
    const { config } = this.props
    const { isSubmenuVisible } = this.state
    if (typeof config.enabled === 'undefined') {
      config.enabled = false
    }
    if (typeof config.angle === 'undefined') {
      config.angle = 0
    }
    if (typeof config.variance === 'undefined') {
      config.variance = 0
    }

    return (
      <div className="emit-direction-properties">
        <legend onClick={this.changeSubmenuVisibility.bind(this)}>Emit Direction Properties</legend>
        <div className={`collapse ${isSubmenuVisible}`}>
          <div className="form-group">
            <div className="col-xs-4 form-label">Enabled</div>
            <div className="col-xs-8">
              <input type={'checkbox'} checked={config.enabled} onChange={this.handleChangeEnabled} />
            </div>
          </div>
          <FormGroup
            title={'Angle'}
            value={[config.angle]}
            updateProps={this.updateProps.bind(this, 'emitDirectionProperties-angle')}
          />
          <FormGroup
            title={'Variance'}
            value={[config.variance]}
            updateProps={this.updateProps.bind(this, 'emitDirectionProperties-variance')}
          />
        </div>
      </div>
    )
  }

  private handleChangeEnabled = (event) => {
    this.props.updateProps('emitDirectionProperties-enabled', [0, event.target.checked])
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

export default hot(module)(EmitDirectionProperties)
