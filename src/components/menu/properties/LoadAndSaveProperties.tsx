import * as React from 'react'
import { hot } from 'react-hot-loader'
import FormGroup from '../utils/FormGroup'

export interface IProps {
  updateProps: any
}

class LoadAndSaveProperties extends React.Component<IProps> {
  public render() {
    return (
      <div className="general-properties">
        <legend>Config</legend>
        <div className={`collapse in`}>
          <div className="form-group">
            <div className="col-xs-5">
              <button className="btn btn-default btn-block" onClick={this.loadConfig}>
                Load
              </button>
              <input type={'file'} id={'load-config'} className={'hidden'} onChange={this.loadConfigChange} />
            </div>
            <div className="col-xs-5">
              <button className="btn btn-default btn-block" onClick={this.downloadConfig}>
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  private updateProps(name: string, props: any) {
    this.props.updateProps(name, props)
  }

  private loadConfigChange = () => {
    // @ts-ignore
    const file = document.getElementById('load-config').files[0]
    const reader = new FileReader()
    reader.onload = () => {
      this.sendConfig(reader.result)
    }
    reader.readAsText(file)
  }

  private sendConfig(config: any) {
    this.updateProps('load-config', [0, config])
  }

  private loadConfig = () => {
    document.getElementById('load-config').click()
  }

  private downloadConfig = () => {
    this.updateProps('download-config', [0, ''])
  }
}

declare let module: Record<string, unknown>

export default hot(module)(LoadAndSaveProperties)
