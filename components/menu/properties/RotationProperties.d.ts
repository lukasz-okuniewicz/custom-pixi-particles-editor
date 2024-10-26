import * as React from 'react';
export interface IProps {
    config: any;
    updateProps: any;
    activeEffect: any;
}
declare class RotationProperties extends React.Component<IProps> {
    state: {
        isSubmenuVisible: string;
    };
    render(): React.JSX.Element;
    private handleChangeEnabled;
    private updateProps;
    private changeSubmenuVisibility;
}
declare const _default: typeof RotationProperties;
export default _default;
