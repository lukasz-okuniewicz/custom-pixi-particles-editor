import * as React from 'react';
export interface IProps {
    config: any;
    updateProps: any;
    activeEffect: any;
}
declare class LifeProperties extends React.Component<IProps> {
    state: {
        isSubmenuVisible: string;
    };
    render(): React.JSX.Element;
    private updateProps;
    private changeSubmenuVisibility;
}
declare const _default: typeof LifeProperties;
export default _default;
