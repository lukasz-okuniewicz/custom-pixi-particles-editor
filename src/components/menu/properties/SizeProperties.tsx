import * as React from 'react'
import { hot } from 'react-hot-loader'
import FormGroup from '../utils/FormGroup'

export interface IProps {
  config: any
  updateProps: any
  activeEffect: any
}

class SizeProperties extends React.Component<IProps> {
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
            type={'number'}
            title={'Size Start'}
            params={['X Size Start', 'Y Size Start']}
            value={[config.sizeStart && config.sizeStart.x, config.sizeStart && config.sizeStart.y]}
            updateProps={this.updateProps.bind(this, 'sizeProperties-sizeStart')}
          />
          <FormGroup
            type={'number'}
            title={'Start Variance'}
            value={[config.startVariance]}
            updateProps={this.updateProps.bind(this, 'sizeProperties-startVariance')}
          />
          <FormGroup
            type={'number'}
            title={'Size End'}
            params={['X Size End', 'Y Size End']}
            value={[config.sizeEnd && config.sizeEnd.x, config.sizeEnd && config.sizeEnd.y]}
            updateProps={this.updateProps.bind(this, 'sizeProperties-sizeEnd')}
          />
          <FormGroup
            type={'number'}
            title={'End Variance'}
            value={[config.endVariance]}
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
