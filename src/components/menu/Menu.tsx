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
import TurbulenceProperties from './properties/TurbulenceProperties'
import CollisionProperties from './properties/CollisionProperties'

export interface IProps {
  config: any
  updateProps: any
  activeEffect: any
  app: any
  helpingLines: boolean
}

class Menu extends React.Component<IProps> {
  public render() {
    return (
      <div
        className="menu"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <LoadAndSaveProperties updateProps={this.props.updateProps} activeEffect={this.props.activeEffect} />
        <GeneralProperties
          config={this.props.config}
          updateProps={this.props.updateProps}
          activeEffect={this.props.activeEffect}
        />
        <EmissionTypeProperties
          config={this.props.config.emitterConfig}
          updateProps={this.props.updateProps}
          activeEffect={this.props.activeEffect}
        />
        <LifeProperties
          config={this.getConfigByName('LifeBehaviour')}
          updateProps={this.props.updateProps}
          activeEffect={this.props.activeEffect}
        />
        <SizeProperties
          config={this.getConfigByName('SizeBehaviour')}
          updateProps={this.props.updateProps}
          activeEffect={this.props.activeEffect}
        />
        <RotationProperties
          config={this.getConfigByName('RotationBehaviour')}
          updateProps={this.props.updateProps}
          activeEffect={this.props.activeEffect}
        />
        <PositionProperties
          config={this.getConfigByName('PositionBehaviour')}
          updateProps={this.props.updateProps}
          activeEffect={this.props.activeEffect}
        />
        <CollisionProperties
          config={this.getConfigByName('CollisionBehaviour')}
          updateProps={this.props.updateProps}
          activeEffect={this.props.activeEffect}
          app={this.props.app}
          helpingLines={this.props.helpingLines}
        />
        <ColorProperties
          config={this.getConfigByName('ColorBehaviour')}
          updateProps={this.props.updateProps}
          activeEffect={this.props.activeEffect}
        />
        <AngularVelocityProperties
          config={this.getConfigByName('AngularVelocityBehaviour')}
          updateProps={this.props.updateProps}
          activeEffect={this.props.activeEffect}
        />
        <EmitDirectionProperties
          config={this.getConfigByName('EmitDirectionBehaviour')}
          updateProps={this.props.updateProps}
          activeEffect={this.props.activeEffect}
        />
        <TurbulenceProperties
          config={this.getConfigByName('TurbulenceBehaviour')}
          updateProps={this.props.updateProps}
          activeEffect={this.props.activeEffect}
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
