import * as React from 'react';
export interface IProps {
    config: any;
    updateProps: any;
    activeEffect: any;
    app: any;
    helpingLines: boolean;
}
interface IState {
    isSubmenuVisible: string;
    pointKey: string;
    selectedLineIndex: number | null;
}
declare class CollisionProperties extends React.Component<IProps, IState> {
    state: IState;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): React.JSX.Element;
    private handleChangeEnabled;
    private updateLinePoint;
    private updateProps;
    private selectPoint;
    private addLine;
    private removeLine;
    private changeSubmenuVisibility;
    private handleWindowClick;
    private handleChangeLines;
    private skipPositionBehaviourOnCollision;
    private skipAngularVelocityBehaviourOnCollision;
    private skipColorBehaviourOnCollision;
    private skipEmitDirectionBehaviourOnCollision;
    private skipRotationBehaviourOnCollision;
    private skipSizeBehaviourOnCollision;
}
declare const _default: typeof CollisionProperties;
export default _default;
