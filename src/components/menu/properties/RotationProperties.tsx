import * as React from 'react'
import { hot } from 'react-hot-loader'
import FormGroup from '../utils/FormGroup'

export interface IProps {
  config: any
  updateProps: any
}

class RotationProperties extends React.Component<IProps> {
  state = {
    isSubmenuVisible: '',
  }

  public render() {
    const { config } = this.props
    const { isSubmenuVisible } = this.state
    if (typeof config.enabled === 'undefined') {
      config.enabled = false
    }
    if (typeof config.rotation === 'undefined') {
      config.rotation = 0
    }
    if (typeof config.variance === 'undefined') {
      config.variance = 0
    }

    return (
      <div className="rotation-properties">
        <legend onClick={this.changeSubmenuVisibility.bind(this)}>Rotation Properties</legend>
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
            title={'Rotation'}
            value={[config.rotation]}
            updateProps={this.updateProps.bind(this, 'rotationProperties-rotation')}
          />
          <FormGroup
              type={'number'}
              step={'1'}
            title={'Variance'}
            value={[config.variance]}
            updateProps={this.updateProps.bind(this, 'rotationProperties-variance')}
          />
        </div>
      </div>
    )
  }

  private handleChangeEnabled = (event) => {
    this.props.updateProps('rotationProperties-enabled', [0, event.target.checked])
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

export default hot(module)(RotationProperties)
