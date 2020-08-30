import * as React from 'react'
import { hot } from 'react-hot-loader'
import ColorPicker from './ColorPicker'

export interface IProps {
  title: string
  updateProps?: any
  type?: string
  value?: string[] | number[]
  params?: string[]
  color?: boolean
  inputHidden?: boolean
}

class FormGroup extends React.Component<IProps> {
  state = {
    colorSelected: [false, false],
  }
  private input: any

  constructor(props) {
    super(props)
    this.input = React.createRef()
  }

  public render() {
    const { title, params, color, inputHidden, value } = this.props
    let { type } = this.props

    if (!type) {
      type = 'number'
    }

    return (
      <>
        <div className="form-group">
          <div className="col-xs-4 form-label">{title}</div>
          {params && params.length ? (
            <>
              <div className="col-xs-4">
                <input
                  className={`form-control ${inputHidden ? 'hidden' : ''}`}
                  type={type}
                  step="0.1"
                  value={value[0]}
                  onChange={this.handleChange.bind(this, 0)}
                />
                <span className="tooltiptext">{params[0]}</span>
              </div>
              <div className="col-xs-4">
                <input
                  className={`form-control ${inputHidden ? 'hidden' : ''}`}
                  type={type}
                  step="0.1"
                  value={value[1]}
                  onChange={this.handleChange.bind(this, 1)}
                />
                <span className="tooltiptext">{params[1]}</span>
              </div>
            </>
          ) : (
            <div className="col-xs-8">
              <input
                ref={this.input}
                className={`form-control ${inputHidden ? 'hidden' : ''}`}
                type={type}
                step="0.1"
                value={value[0]}
                onChange={this.handleChange.bind(this, 0)}
              />
              {color ? <ColorPicker color={value[0]} colorChanged={this.colorChanged} /> : ''}
            </div>
          )}
        </div>
      </>
    )
  }

  private handleChange(index: number, event) {
    this.props.updateProps([index, event.target.value])
  }

  private colorChanged = (color: any) => {
    this.props.updateProps(color)
  }
}

declare let module: Record<string, unknown>

export default hot(module)(FormGroup)
