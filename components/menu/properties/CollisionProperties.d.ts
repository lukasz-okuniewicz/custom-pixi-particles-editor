import * as React from 'react';
export interface IProps {
    config: any;
    updateProps: any;
    activeEffect: any;
    app: any;
}
declare class CollisionProperties extends React.Component<IProps> {
    state: {
        isSubmenuVisible: string;
        selectedPointIndex: null;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): React.JSX.Element;
    private handleChangeEnabled;
    private updateProps;
    private updatePoints;
    private addPoint;
    private removePoint;
    private changeSubmenuVisibility;
    private selectPoint;
    private handleWindowClick;
}
declare const _default: typeof CollisionProperties;
export default _default;
