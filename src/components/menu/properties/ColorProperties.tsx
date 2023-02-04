import * as React from 'react'
import { hot } from 'react-hot-loader'
import FormGroup from '../utils/FormGroup'

export interface IProps {
  config: any
  updateProps: any
  activeEffect: any
}

class ColorProperties extends React.Component<IProps> {
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

    if (!config || !config.start) {
      config.enabled = false
      config.start = {
        _r: 250,
        _g: 250,
        _b: 250,
        _alpha: 1,
      }
      config.end = {
        _r: 250,
        _g: 250,
        _b: 250,
        _alpha: 1,
      }
      config.startVariance = {
        _r: 250,
        _g: 250,
        _b: 250,
        _alpha: 1,
      }
      config.endVariance = {
        _r: 250,
        _g: 250,
        _b: 250,
        _alpha: 1,
      }
    }
    if (typeof config.sinus === 'undefined') {
      config.sinus = false
    }

    return (
      <div className="color-properties">
        <legend onClick={this.changeSubmenuVisibility.bind(this)}>Color Properties</legend>
        <div className={`collapse ${isSubmenuVisible}`}>
          <div className="form-group">
            <div className="col-xs-4 form-label">Enabled</div>
            <div className="col-xs-8">
              <input type={'checkbox'} checked={config.enabled} onChange={this.handleChangeEnabled} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-4 form-label">Fade in and out</div>
            <div className="col-xs-8">
              <input
                title={'Let it fade in and out'}
                type={'checkbox'}
                checked={config.sinus}
                onChange={this.handleChangeSine}
              />
            </div>
          </div>
          <FormGroup
            title={'Starting Color'}
            type={'text'}
            color={true}
            value={[config.start]}
            inputHidden={true}
            updateProps={this.updateProps.bind(this, 'colorProperties-start')}
          />
          <FormGroup
            title={'Ending Color'}
            type={'text'}
            color={true}
            value={[config.end]}
            inputHidden={true}
            updateProps={this.updateProps.bind(this, 'colorProperties-end')}
          />
          <FormGroup
            title={'Starting Color Variance'}
            type={'text'}
            color={true}
            value={[config.startVariance]}
            inputHidden={true}
            updateProps={this.updateProps.bind(this, 'colorProperties-startVariance')}
          />
          <FormGroup
            title={'Ending Color Variance'}
            type={'text'}
            color={true}
            value={[config.endVariance]}
            inputHidden={true}
            updateProps={this.updateProps.bind(this, 'colorProperties-endVariance')}
          />
        </div>
      </div>
    )
  }

  private handleChangeSine = (event) => {
    this.props.updateProps('colorProperties-sine', [0, event.target.checked])
  }

  private handleChangeEnabled = (event) => {
    this.props.updateProps('colorProperties-enabled', [0, event.target.checked])
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

export default hot(module)(ColorProperties)
