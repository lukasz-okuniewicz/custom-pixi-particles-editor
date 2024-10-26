import * as React from 'react';
export interface IProps {
    config: any;
    updateProps: any;
    value?: string[] | number[];
    activeEffect: any;
}
declare class EmissionTypeProperties extends React.Component<IProps> {
    state: {
        emissionType: string;
        isSubmenuVisible: string;
    };
    render(): React.JSX.Element;
    private handleChange;
    private updateProps;
    private changeSubmenuVisibility;
}
declare const _default: typeof EmissionTypeProperties;
export default _default;
