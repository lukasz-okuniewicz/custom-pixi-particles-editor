import * as React from 'react'
import { hot } from 'react-hot-loader'

class Content extends React.Component {
  public render() {
    return <div className="content"></div>
  }
}

declare let module: Record<string, unknown>

export default hot(module)(Content)
