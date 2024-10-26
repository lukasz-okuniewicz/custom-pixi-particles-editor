import * as React from 'react';
export interface IProps {
    updateProps: any;
    activeEffect: any;
}
declare class LoadAndSaveProperties extends React.Component<IProps> {
    render(): React.JSX.Element;
    private updateProps;
    private loadConfigChange;
    private sendConfig;
    private loadConfig;
    private downloadConfig;
    private refresh;
}
declare const _default: typeof LoadAndSaveProperties;
export default _default;
