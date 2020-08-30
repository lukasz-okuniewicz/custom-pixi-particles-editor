import * as React from 'react'
import { hot } from 'react-hot-loader'
import FormGroup from '../utils/FormGroup'

export interface IProps {
  config: any
  updateProps: any
}

class SizeProperties extends React.Component<IProps> {
  state = {
    isSubmenuVisible: '',
  }

  public render() {
    const { config } = this.props
    const { isSubmenuVisible } = this.state

    return (
      <div className="size-properties">
        <legend onClick={this.changeSubmenuVisibility.bind(this)}>Size Properties</legend>
        <div className={`collapse ${isSubmenuVisible}`}>
          <div className="form-group">
            <div className="col-xs-4 form-label">Enabled</div>
            <div className="col-xs-8">
              <input type={'checkbox'} checked={config.enabled} onChange={this.handleChangeEnabled} />
            </div>
          </div>
          <FormGroup
            title={'Size Start'}
            params={['X Size Start', 'Y Size Start']}
            value={[(config.sizeStart && config.sizeStart.x) || 0, (config.sizeStart && config.sizeStart.y) || 1]}
            updateProps={this.updateProps.bind(this, 'sizeProperties-sizeStart')}
          />
          <FormGroup
            title={'Start Variance'}
            value={[config.startVariance || 0]}
            updateProps={this.updateProps.bind(this, 'sizeProperties-startVariance')}
          />
          <FormGroup
            title={'Size End'}
            params={['X Size End', 'Y Size End']}
            value={[(config.sizeEnd && config.sizeEnd.x) || 0, (config.sizeEnd && config.sizeEnd.y) || 0]}
            updateProps={this.updateProps.bind(this, 'sizeProperties-sizeEnd')}
          />
          <FormGroup
            title={'End Variance'}
            value={[config.endVariance || 0]}
            updateProps={this.updateProps.bind(this, 'sizeProperties-endVariance')}
          />
        </div>
      </div>
    )
  }

  private handleChangeEnabled = (event) => {
    this.props.updateProps('sizeProperties-enabled', [0, event.target.checked])
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

export default hot(module)(SizeProperties)
