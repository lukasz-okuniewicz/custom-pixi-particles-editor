import * as React from 'react'
import { hot } from 'react-hot-loader'
import FormGroup from '../utils/FormGroup'
import { Point } from 'pixi.js-legacy'

export interface IProps {
  config: any
  updateProps: any
  activeEffect: any
  app: any
  helpingLines: boolean
}

interface IState {
  isSubmenuVisible: string
  pointKey: string
  selectedLineIndex: number | null
}

class CollisionProperties extends React.Component<IProps, IState> {
  state: IState = {
    isSubmenuVisible: '',
    pointKey: '',
    selectedLineIndex: null, // Tracks the currently selected line
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
    const { isSubmenuVisible, selectedLineIndex } = this.state

    if (typeof config.enabled === 'undefined') {
      config.enabled = false
    }
    if (typeof config.hideLines === 'undefined') {
      config.hideLines = false
    }
    if (typeof config.distance === 'undefined') {
      config.distance = 10
    }
    if (typeof config.lines === 'undefined') {
      config.lines = [{ point1: { x: 0, y: 0 }, point2: { x: 0, y: 0 } }]
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
              <input type="checkbox" checked={config.enabled} onChange={this.handleChangeEnabled} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-4 form-label">Show Lines</div>
            <div className="col-xs-8">
              <input type={'checkbox'} checked={this.props.helpingLines} onChange={this.handleChangeLines} />
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
          {config.lines &&
            config.lines.map((line, index) => (
              <React.Fragment key={index}>
                <h1>Line {index + 1}</h1>
                <FormGroup
                  type="number"
                  step="1"
                  title={`Line ${index + 1} - Point 1`}
                  params={['X', 'Y']}
                  value={[line.point1.x, line.point1.y]}
                  updateProps={this.updateLinePoint.bind(this, index, 'point1')}
                />
                <button
                  className="btn btn-default btn-block"
                  onClick={(e) => this.selectPoint(index, 'point1', e)}
                  style={{
                    backgroundColor:
                      this.state.selectedLineIndex === index && this.state.isSubmenuVisible === 'point1'
                        ? 'blue'
                        : 'grey',
                  }}
                >
                  Select Point 1
                </button>
                <FormGroup
                  type="number"
                  step="1"
                  title={`Line ${index + 1} - Point 2`}
                  params={['X', 'Y']}
                  value={[line.point2.x, line.point2.y]}
                  updateProps={this.updateLinePoint.bind(this, index, 'point2')}
                />
                <button
                  className="btn btn-default btn-block"
                  onClick={(e) => this.selectPoint(index, 'point2', e)}
                  style={{
                    backgroundColor:
                      this.state.selectedLineIndex === index && this.state.isSubmenuVisible === 'point2'
                        ? 'blue'
                        : 'grey',
                  }}
                >
                  Select Point 2
                </button>
                <br />
                <button
                  className="btn btn-default btn-block"
                  onClick={(e) => this.removeLine(index, e)}
                  style={{
                    backgroundImage: 'linear-gradient(rgb(71 11 11) 0px, rgb(136 13 13) 100%)',
                  }}
                >
                  Remove Line
                </button>
                <br />
                <hr />
              </React.Fragment>
            ))}
          <button
            className="btn btn-default btn-block"
            onClick={this.addLine}
            style={{
              backgroundImage: 'linear-gradient(rgb(11 71 24) 0px, rgb(15 136 13) 100%)',
            }}
          >
            Add New Line
          </button>
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

  private updateLinePoint(index: number, pointKey: 'point1' | 'point2', updatedValue: any) {
    const updatedLines = [...this.props.config.lines]
    if (updatedValue[0] === 0) {
      updatedLines[index][pointKey].x = parseInt(updatedValue[1])
    } else if (updatedValue[0] === 1) {
      updatedLines[index][pointKey].y = parseInt(updatedValue[1])
    }
    this.props.updateProps('collisionProperties-lines', [0, updatedLines])
  }

  private updateProps(name: string, props: any) {
    this.props.updateProps(name, props)
  }

  private selectPoint = (index: number, pointKey: 'point1' | 'point2', event: React.MouseEvent) => {
    event.stopPropagation()
    this.setState({
      selectedLineIndex: index,
      pointKey, // Tracks which point is being selected
    })
  }

  private addLine = (e) => {
    e.stopPropagation()
    this.setState({ selectedLineIndex: null })
    const newLine = { point1: { x: 0, y: 0 }, point2: { x: 0, y: 0 } } // Default values for new line
    const updatedLines = [...this.props.config.lines, newLine]
    this.props.updateProps('collisionProperties-lines', [0, updatedLines])
  }

  private removeLine = (index, e) => {
    e.stopPropagation()
    this.setState({ selectedLineIndex: null })
    const updatedLines = this.props.config.lines.filter((_, i) => i !== index)
    this.props.updateProps('collisionProperties-lines', [0, updatedLines])
  }

  private changeSubmenuVisibility() {
    this.setState((prevState) => ({
      isSubmenuVisible: prevState.isSubmenuVisible ? '' : 'in',
    }))
  }

  private handleWindowClick = (event: MouseEvent) => {
    const { selectedLineIndex, pointKey } = this.state

    if (selectedLineIndex !== null && pointKey) {
      const localPosition = new Point(0, 0)
      this.props.app.renderer.plugins.interaction.mapPositionToPoint(localPosition, event.clientX, event.clientY)

      const newX = localPosition.x - this.props.app.screen.width / 2
      const newY = localPosition.y - this.props.app.screen.height / 2

      const updatedLines = [...this.props.config.lines]
      updatedLines[selectedLineIndex][pointKey] = { x: newX, y: newY } // Update the specific point

      this.props.updateProps('collisionProperties-lines', [0, updatedLines])

      // Reset state
      this.setState({
        selectedLineIndex: null,
        pointKey: '',
      })
    }
  }

  private handleChangeLines = (event) => {
    this.props.updateProps('collisionProperties-changeHelpingLines', [0, event.target.checked])
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
}

declare let module: Record<string, unknown>

export default hot(module)(CollisionProperties)
