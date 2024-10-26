import * as React from 'react';
export interface IProps {
    config: any;
    updateProps: any;
    activeEffect: any;
}
declare class Menu extends React.Component<IProps> {
    render(): React.JSX.Element;
    private getConfigByName;
}
declare const _default: typeof Menu;
export default _default;
