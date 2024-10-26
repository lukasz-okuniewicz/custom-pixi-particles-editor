import * as React from 'react';
export interface IProps {
    title: string;
    updateProps?: any;
    type?: string;
    step?: string;
    value?: string[] | number[];
    params?: string[];
    color?: boolean;
    inputHidden?: boolean;
}
declare class FormGroup extends React.Component<IProps> {
    state: {
        colorSelected: boolean[];
        value: never[];
    };
    private input;
    private timer;
    constructor(props: any);
    render(): React.JSX.Element;
    private handleChange;
    private colorChanged;
}
declare const _default: typeof FormGroup;
export default _default;
