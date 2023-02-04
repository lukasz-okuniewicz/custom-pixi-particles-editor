import * as React from 'react'
import { hot } from 'react-hot-loader'
import { SketchPicker } from 'react-color'

export interface IProps {
  colorChanged: any
  color: any
}

class ColorPicker extends React.Component<IProps> {
  state = {
    background: {},
  }

  componentDidMount() {
    const { color } = this.props
    this.setState({
      background: {
        r: color._r,
        g: color._g,
        b: color._b,
        a: color._alpha,
      },
    })
  }

  componentDidUpdate(prevProps) {
    const { color } = this.props
    if (JSON.stringify(prevProps.color) !== JSON.stringify(color)) {
      this.setState({
        background: {
          r: color._r,
          g: color._g,
          b: color._b,
          a: color._alpha,
        },
      })
    }
  }

  handleChange = (color) => {
    this.setState({
      background: {
        r: color.rgb.r,
        g: color.rgb.g,
        b: color.rgb.b,
        a: color.rgb.a,
      },
    })
  }

  handleChangeComplete = (color) => {
    this.props.colorChanged(color)
    this.setState({
      background: {
        r: color.rgb.r,
        g: color.rgb.g,
        b: color.rgb.b,
        a: color.rgb.a,
      },
    })
  }

  public render() {
    return (
      <SketchPicker
        color={this.state.background}
        onChange={this.handleChange}
        onChangeComplete={this.handleChangeComplete}
      />
    )
  }
}

declare let module: Record<string, unknown>

export default hot(module)(ColorPicker)
