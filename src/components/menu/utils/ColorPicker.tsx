import * as React from 'react'
import { hot } from 'react-hot-loader'
import { SketchPicker } from 'react-color'

export interface IProps {
  colorChanged: any
  color: string | number
}

class ColorPicker extends React.Component<IProps> {
  state = {
    background: this.props.color,
  }

  handleChange = (color) => {
    this.setState({ background: color.hex })
  }

  handleChangeComplete = (color) => {
    this.props.colorChanged(color)
    this.setState({ background: color.hex })
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
