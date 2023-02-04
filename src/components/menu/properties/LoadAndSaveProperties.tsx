import * as React from 'react'
import { hot } from 'react-hot-loader'
import FormGroup from '../utils/FormGroup'

export interface IProps {
  updateProps: any
  activeEffect: any
}

class LoadAndSaveProperties extends React.Component<IProps> {
  public render() {
    if (this.props.activeEffect === 'office') return <></>
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
          <div className="form-group">
            <div className="col-xs-10">
              <button className="btn btn-default btn-block" onClick={this.refresh}>
                Refresh
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
    // @ts-ignore
    document.getElementById('load-config').click()
  }

  private downloadConfig = () => {
    this.updateProps('download-config', [0, ''])
  }

  private refresh = () => {
    this.updateProps('refresh', [])
  }
}

declare let module: Record<string, unknown>

export default hot(module)(LoadAndSaveProperties)
