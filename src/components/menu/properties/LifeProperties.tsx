import * as React from 'react'
import { hot } from 'react-hot-loader'
import FormGroup from '../utils/FormGroup'

export interface IProps {
  config: any
  updateProps: any
}

class LifeProperties extends React.Component<IProps> {
  state = {
    isSubmenuVisible: '',
  }

  public render() {
    const { config } = this.props
    const { isSubmenuVisible } = this.state

    return (
      <div className="life-properties">
        <legend onClick={this.changeSubmenuVisibility.bind(this)}>Particle Properties</legend>
        <div className={`collapse ${isSubmenuVisible}`}>
          <FormGroup
            title={'Max Life Time'}
            value={[config.maxLifeTime]}
            updateProps={this.updateProps.bind(this, 'lifeProperties-maxLifeTime')}
          />
          <FormGroup
            title={'Time Variance'}
            value={[config.timeVariance]}
            updateProps={this.updateProps.bind(this, 'lifeProperties-timeVariance')}
          />
        </div>
      </div>
    )
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

export default hot(module)(LifeProperties)
