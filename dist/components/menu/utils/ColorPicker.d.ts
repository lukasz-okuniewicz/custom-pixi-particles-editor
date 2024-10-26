import * as React from 'react';
export interface IProps {
    colorChanged: any;
    color: any;
}
declare class ColorPicker extends React.Component<IProps> {
    state: {
        background: {};
    };
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    handleChange: (color: any) => void;
    handleChangeComplete: (color: any) => void;
    render(): React.JSX.Element;
}
declare const _default: typeof ColorPicker;
export default _default;
