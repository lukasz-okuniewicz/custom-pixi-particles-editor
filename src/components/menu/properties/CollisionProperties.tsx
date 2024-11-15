import * as React from 'react'
import { hot } from 'react-hot-loader'
import FormGroup from '../utils/FormGroup'
import { Point } from 'pixi.js-legacy'

export interface IProps {
  config: any
  updateProps: any
  activeEffect: any
  app: any
}

class CollisionProperties extends React.Component<IProps> {
  state = {
    isSubmenuVisible: '',
    selectedPointIndex: null, // Tracks the currently selected point
  }

  componentDidMount() {
    window.addEventListener('click', this.handleWindowClick)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleWindowClick)
  }

  public render() {
    if (this.props.activeEffect === 'office') return <></>
    const { config } = this.props
    const { isSubmenuVisible, selectedPointIndex } = this.state
    if (typeof config.enabled === 'undefined') {
      config.enabled = false
    }
    if (typeof config.distance === 'undefined') {
      config.distance = 0
    }
    if (typeof config.points === 'undefined') {
      config.points = [{ x: 0, y: 0 }]
    }
    if (typeof config.skipPositionBehaviourOnCollision === 'undefined') {
      config.skipPositionBehaviourOnCollision = false
    }
    if (typeof config.skipAngularVelocityBehaviourOnCollision === 'undefined') {
      config.skipAngularVelocityBehaviourOnCollision = false
    }
    if (typeof config.skipColorBehaviourOnCollision === 'undefined') {
      config.skipColorBehaviourOnCollision = false
    }
    if (typeof config.skipEmitDirectionBehaviourOnCollision === 'undefined') {
      config.skipEmitDirectionBehaviourOnCollision = false
    }
    if (typeof config.skipRotationBehaviourOnCollision === 'undefined') {
      config.skipRotationBehaviourOnCollision = false
    }
    if (typeof config.skipSizeBehaviourOnCollision === 'undefined') {
      config.skipSizeBehaviourOnCollision = false
    }

    return (
      <div className="position-properties">
        <legend onClick={this.changeSubmenuVisibility.bind(this)}>Collision Properties</legend>
        <div className={`collapse ${isSubmenuVisible}`}>
          <div className="form-group">
            <div className="col-xs-4 form-label">Enabled</div>
            <div className="col-xs-8">
              <input type={'checkbox'} checked={config.enabled} onChange={this.handleChangeEnabled} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-4 form-label">Hide Lines</div>
            <div className="col-xs-8">
              <input type={'checkbox'} checked={config.hideLines} onChange={this.handleChangeLines} />
            </div>
          </div>
          <FormGroup
            type={'number'}
            step={'1'}
            title={'distance'}
            value={[config.distance]}
            updateProps={this.updateProps.bind(this, 'collisionProperties-distance')}
          />
          <hr />
          {config.points &&
            config.points.map((point, index) => (
              <React.Fragment key={index}>
                <FormGroup
                  type="number"
                  step="1"
                  title={`Point ${index + 1}`}
                  params={['X Point', 'Y Point']}
                  value={[point.x, point.y]}
                  updateProps={this.updatePoints.bind(this, index, 'collisionProperties-points')}
                />
                <button onClick={(e) => this.removePoint(index, e)}>Remove Point</button>
                <button
                  onClick={(e) => this.selectPoint(index, e)}
                  style={{
                    backgroundColor: selectedPointIndex === index ? 'blue' : 'grey',
                  }}
                >
                  Select
                </button>
                <hr />
              </React.Fragment>
            ))}
          <button onClick={this.addPoint}>Add Point</button>
          <br />
          <br />

          <hr />
          <div className="form-group">
            <div className="col-xs-4 form-label">Skip Position on Collision</div>
            <div className="col-xs-8">
              <input
                type={'checkbox'}
                checked={config.skipPositionBehaviourOnCollision}
                onChange={this.skipPositionBehaviourOnCollision}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-4 form-label">Skip Angular Velocity on Collision</div>
            <div className="col-xs-8">
              <input
                type={'checkbox'}
                checked={config.skipAngularVelocityBehaviourOnCollision}
                onChange={this.skipAngularVelocityBehaviourOnCollision}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-4 form-label">Skip Color on Collision</div>
            <div className="col-xs-8">
              <input
                type={'checkbox'}
                checked={config.skipColorBehaviourOnCollision}
                onChange={this.skipColorBehaviourOnCollision}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-4 form-label">Skip Emit Direction on Collision</div>
            <div className="col-xs-8">
              <input
                type={'checkbox'}
                checked={config.skipEmitDirectionBehaviourOnCollision}
                onChange={this.skipEmitDirectionBehaviourOnCollision}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-4 form-label">Skip Rotation on Collision</div>
            <div className="col-xs-8">
              <input
                type={'checkbox'}
                checked={config.skipRotationBehaviourOnCollision}
                onChange={this.skipRotationBehaviourOnCollision}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-4 form-label">Skip Size on Collision</div>
            <div className="col-xs-8">
              <input
                type={'checkbox'}
                checked={config.skipSizeBehaviourOnCollision}
                onChange={this.skipSizeBehaviourOnCollision}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  private handleChangeEnabled = (event) => {
    this.props.updateProps('collisionProperties-enabled', [0, event.target.checked])
  }

  private handleChangeLines = (event) => {
    this.props.updateProps('collisionProperties-lines', [0, event.target.checked])
  }

  private updateProps(name: string, props: any) {
    this.props.updateProps(name, props)
  }

  private updatePoints(index: string, name: string, updatedValue: any) {
    const updatedPoints = [...this.props.config.points]
    if (updatedValue[0] === 0) {
      updatedPoints[index].x = parseInt(updatedValue[1])
    } else if (updatedValue[0] === 1) {
      updatedPoints[index].y = parseInt(updatedValue[1])
    }
    this.props.updateProps(name, [0, updatedPoints])
  }

  private addPoint = (e) => {
    e.stopPropagation()
    this.setState({ selectedPointIndex: null })
    const newPoint = { x: 0, y: 0 } // Default values for new point
    const updatedPoints = [...this.props.config.points]
    updatedPoints.push(newPoint)
    this.props.updateProps('collisionProperties-points', [0, updatedPoints])
  }

  private removePoint = (index, e) => {
    e.stopPropagation()
    this.setState({ selectedPointIndex: null })
    let updatedPoints = [...this.props.config.points]
    updatedPoints = updatedPoints.filter((_, i) => i !== index)
    console.log(updatedPoints)
    this.props.updateProps('collisionProperties-points', [0, updatedPoints])
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

  private selectPoint = (index, event) => {
    event.stopPropagation()
    const { selectedPointIndex } = this.state
    if (selectedPointIndex === index) {
      this.setState({ selectedPointIndex: null })
      return
    }
    this.setState({ selectedPointIndex: index })
  }

  private skipPositionBehaviourOnCollision = (event) => {
    this.props.updateProps('collisionProperties-skipPositionBehaviourOnCollision', [0, event.target.checked])
  }

  private skipAngularVelocityBehaviourOnCollision = (event) => {
    this.props.updateProps('collisionProperties-skipAngularVelocityBehaviourOnCollision', [0, event.target.checked])
  }

  private skipColorBehaviourOnCollision = (event) => {
    this.props.updateProps('collisionProperties-skipColorBehaviourOnCollision', [0, event.target.checked])
  }

  private skipEmitDirectionBehaviourOnCollision = (event) => {
    this.props.updateProps('collisionProperties-skipEmitDirectionBehaviourOnCollision', [0, event.target.checked])
  }

  private skipRotationBehaviourOnCollision = (event) => {
    this.props.updateProps('collisionProperties-skipRotationBehaviourOnCollision', [0, event.target.checked])
  }

  private skipSizeBehaviourOnCollision = (event) => {
    this.props.updateProps('collisionProperties-skipSizeBehaviourOnCollision', [0, event.target.checked])
  }

  private handleWindowClick = (event) => {
    const { selectedPointIndex } = this.state

    if (selectedPointIndex !== null) {
      console.log(event.clientX, event.clientY)
      const localPosition = new Point(0, 0)
      this.props.app.renderer.plugins.interaction.mapPositionToPoint(localPosition, event.clientX, event.clientY)

      // Calculate cursor position relative to the canvas center
      const newX = localPosition.x - this.props.app.screen.width / 2
      const newY = localPosition.y - this.props.app.screen.height / 2

      const updatedPoints = [...this.props.config.points]
      updatedPoints[selectedPointIndex] = {
        x: newX,
        y: newY,
      }

      this.props.updateProps('collisionProperties-points', [0, updatedPoints])
    }
  }
}

declare let module: Record<string, unknown>

export default hot(module)(CollisionProperties)
