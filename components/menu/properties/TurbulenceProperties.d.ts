import * as React from 'react';
export interface IProps {
    config: any;
    updateProps: any;
    activeEffect: any;
}
declare class TurbulenceProperties extends React.Component<IProps> {
    state: {
        isSubmenuVisible: string;
    };
    render(): React.JSX.Element;
    private handleChangeEffect;
    private handleChangeEnabled;
    private handleChangeShowVortices;
    private updateProps;
    private changeSubmenuVisibility;
}
declare const _default: typeof TurbulenceProperties;
export default _default;
