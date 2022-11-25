import * as React from 'react'
import { hot } from 'react-hot-loader'
import FormGroup from '../utils/FormGroup'

export interface IProps {
  config: any
  updateProps: any
}

class PathProperties extends React.Component<IProps> {
  state = {
    isSubmenuVisible: '',
  }

  public render() {
    const { config } = this.props
    const { isSubmenuVisible } = this.state
    if (typeof config.enabledPath === 'undefined') {
      config.enabledPath = false
    }
    if (typeof config.point1 === 'undefined') {
      config.point1 = {
        x: 0,
        y: 0,
      }
    }
    if (typeof config.point2 === 'undefined') {
      config.point2 = {
        x: 0,
        y: 0,
      }
    }
    if (typeof config.speed === 'undefined') {
      config.speed = 0
    }

    return (
      <div className="turbulence-properties">
        <legend onClick={this.changeSubmenuVisibility.bind(this)}>Path Properties</legend>
        <div className={`collapse ${isSubmenuVisible}`}>
          <div className="form-group">
            <div className="col-xs-4 form-label">Enabled</div>
            <div className="col-xs-8">
              <input type={'checkbox'} checked={config.enabledPath} onChange={this.handleChangeEnabled} />
            </div>
          </div>
          <FormGroup
            title={'Speed'}
            type={'number'}
            value={[config.speed]}
            updateProps={this.updateProps.bind(this, 'pathProperties-speed')}
          />
          <FormGroup
              type={'number'}
            title={'Point 1'}
            params={['X Point 1', 'Y Point 1']}
            value={[(config.point1 && config.point1.x), (config.point1 && config.point1.y)]}
            updateProps={this.updateProps.bind(this, 'pathProperties-point1')}
          />
          <FormGroup
              type={'number'}
            title={'Point 2'}
            params={['X Point 2', 'Y Point 2']}
            value={[(config.point2 && config.point2.x), (config.point2 && config.point2.y)]}
            updateProps={this.updateProps.bind(this, 'pathProperties-point2')}
          />
        </div>
      </div>
    )
  }

  private handleChangeEnabled = (event) => {
    this.props.updateProps('pathProperties-enabledPath', [0, event.target.checked])
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

export default hot(module)(PathProperties)
