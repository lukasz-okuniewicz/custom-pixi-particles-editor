import * as React from 'react'
import { hot } from 'react-hot-loader'
import ColorPicker from './ColorPicker'

export interface IProps {
  title: string
  updateProps?: any
  type?: string
  step?: string
  value?: string[] | number[]
  params?: string[]
  color?: boolean
  inputHidden?: boolean
}

class FormGroup extends React.Component<IProps> {
  state = {
    colorSelected: [false, false],
    value: [],
    // didMount: false,
  }
  private input: any
  private timer: NodeJS.Timeout

  constructor(props) {
    super(props)
    this.input = React.createRef()
  }

  // componentDidMount() {
  //   const { value } = this.props
  //   this.setState({
  //     value,
  //   })
  //   this.setState({
  //     didMount: true,
  //   })
  // }

  public render() {
    const { title, params, color, inputHidden, value } = this.props
    let { type, step } = this.props

    if (!type) {
      type = 'text'
    }
    if (!step) {
      step = '0.1'
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
                  step={step}
                  value={value![0]}
                  onChange={this.handleChange.bind(this, 0)}
                />
                <span className="tooltiptext">{params[0]}</span>
              </div>
              <div className="col-xs-4">
                <input
                  className={`form-control ${inputHidden ? 'hidden' : ''}`}
                  type={type}
                  step={step}
                  value={value![1]}
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
                step={step}
                value={value![0]}
                onChange={this.handleChange.bind(this, 0)}
              />
              {color ? <ColorPicker color={value![0]} colorChanged={this.colorChanged} /> : ''}
            </div>
          )}
        </div>
      </>
    )
  }

  private handleChange(index: number, event) {
    // const { value } = this.state
    // value[index] = event.target.value
    // this.setState({
    //   value,
    // })

    // clearTimeout(this.timer)
    // this.timer = setTimeout(() => {
    this.props.updateProps([index, event.target.value])
    // }, 300)
  }

  private colorChanged = (color: any) => {
    this.props.updateProps(color)
  }
}

declare let module: Record<string, unknown>

export default hot(module)(FormGroup)
