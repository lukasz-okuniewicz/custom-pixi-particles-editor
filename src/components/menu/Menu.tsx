import * as React from 'react'
import { hot } from 'react-hot-loader'
import SizeProperties from './properties/SizeProperties'
import LifeProperties from './properties/LifeProperties'
import RotationProperties from './properties/RotationProperties'
import PositionProperties from './properties/PositionProperties'
import ColorProperties from './properties/ColorProperties'
import EmitDirectionProperties from './properties/EmitDirectionProperties'
import GeneralProperties from './properties/GeneralProperties'
import AngularVelocityProperties from './properties/AngularVelocityProperties'
import EmissionTypeProperties from './properties/EmissionTypeProperties'
import LoadAndSaveProperties from './properties/LoadAndSaveProperties'

export interface IProps {
  config: any
  updateProps: any
}

class Menu extends React.Component<IProps> {
  public render() {
    return (
      <div className="menu">
        <LoadAndSaveProperties updateProps={this.props.updateProps} />
        <GeneralProperties config={this.props.config} updateProps={this.props.updateProps} />
        <EmissionTypeProperties config={this.props.config.emitterConfig} updateProps={this.props.updateProps} />
        <SizeProperties config={this.getConfigByName('SizeBehaviour')} updateProps={this.props.updateProps} />
        <RotationProperties config={this.getConfigByName('RotationBehaviour')} updateProps={this.props.updateProps} />
        <PositionProperties config={this.getConfigByName('PositionBehaviour')} updateProps={this.props.updateProps} />
        <ColorProperties config={this.getConfigByName('ColorBehaviour')} updateProps={this.props.updateProps} />
        <LifeProperties config={this.getConfigByName('LifeBehaviour')} updateProps={this.props.updateProps} />
        <AngularVelocityProperties
          config={this.getConfigByName('AngularVelocityBehaviour')}
          updateProps={this.props.updateProps}
        />
        <EmitDirectionProperties
          config={this.getConfigByName('EmitDirectionBehaviour')}
          updateProps={this.props.updateProps}
        />
      </div>
    )
  }

  private getConfigByName(name: string) {
    let config = {}
    this.props.config.emitterConfig.behaviours.forEach((behaviour) => {
      if (behaviour.name === name) {
        config = behaviour
      }
    })
    return config
  }
}

declare let module: Record<string, unknown>

export default hot(module)(Menu)
