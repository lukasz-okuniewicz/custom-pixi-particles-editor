import * as React from 'react';
export interface IProps {
    config: any;
    updateProps: any;
    activeEffect: any;
}
declare class ColorProperties extends React.Component<IProps> {
    state: {
        isSubmenuVisible: string;
    };
    render(): React.JSX.Element;
    private handleChangeSine;
    private handleChangeEnabled;
    private updateProps;
    private changeSubmenuVisibility;
}
declare const _default: typeof ColorProperties;
export default _default;
