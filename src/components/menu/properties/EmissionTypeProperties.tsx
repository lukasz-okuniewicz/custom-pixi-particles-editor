import * as React from 'react'
import { hot } from 'react-hot-loader'
import FormGroup from '../utils/FormGroup'

export interface IProps {
  config: any
  updateProps: any
  value?: string[] | number[]
  activeEffect: any
}

class EmissionTypeProperties extends React.Component<IProps> {
  state = {
    emissionType: 'UniformEmission',
    isSubmenuVisible: '',
  }

  public render() {
    if (this.props.activeEffect === 'office') return <></>
    const { config } = this.props
    const { emissionType, isSubmenuVisible } = this.state

    return (
      <div className="emission-type-properties">
        <legend onClick={this.changeSubmenuVisibility.bind(this)}>Emission Type Properties</legend>
        <div className={`collapse ${isSubmenuVisible}`}>
          <div className="form-group">
            <div className="col-xs-4 form-label">Emission Type</div>
            <div className="col-xs-8">
              <select
                className={'form-control'}
                value={config.emitController && config.emitController.name ? config.emitController.name : emissionType}
                onChange={this.handleChange.bind(this, 0, 'EmissionTypeProperties-name')}
              >
                <option>UniformEmission</option>
                <option>RandomEmission</option>
                <option>StandardEmission</option>
              </select>
            </div>
          </div>
          {config.emitController.name === 'UniformEmission' && (
            <FormGroup
              type={'number'}
              step={'1'}
              title={'Emit/sec'}
              value={[config.emitController && config.emitController._emitPerSecond]}
              updateProps={this.updateProps.bind(this, 'EmissionTypeProperties-_emitPerSecond')}
            />
          )}
          {config.emitController.name !== 'UniformEmission' && (
            <>
              <FormGroup
                type={'number'}
                step={'1'}
                title={'Max Particles'}
                value={[config.emitController && config.emitController._maxParticles]}
                updateProps={this.updateProps.bind(this, 'EmissionTypeProperties-_maxParticles')}
              />
              <FormGroup
                type={'number'}
                step={'1'}
                title={'Emission Rate'}
                value={[config.emitController && config.emitController._emissionRate]}
                updateProps={this.updateProps.bind(this, 'EmissionTypeProperties-_emissionRate')}
              />
            </>
          )}
          <FormGroup
            type={'number'}
            title={'Duration'}
            value={[config.duration]}
            updateProps={this.updateProps.bind(this, 'EmissionTypeProperties-duration')}
          />
        </div>
      </div>
    )
  }

  private handleChange(index: number, name: string, event) {
    this.props.updateProps(name, [index, event.target.value])

    if (name === 'EmissionTypeProperties-name') {
      this.setState({ emissionType: event.target.value })
    }
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

export default hot(module)(EmissionTypeProperties)
