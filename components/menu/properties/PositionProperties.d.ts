import * as React from 'react';
export interface IProps {
    config: any;
    updateProps: any;
    activeEffect: any;
}
declare class PositionProperties extends React.Component<IProps> {
    state: {
        isSubmenuVisible: string;
    };
    render(): React.JSX.Element;
    private handleChangeSinX;
    private handleChangeFromAtoB;
    private handleChangeFromAtoBOneWay;
    private handleChangeSinY;
    private handleChangeWarp;
    private handleChangeWarpCloser;
    private handleChangeSpawnType;
    private handleChangeThere;
    private handleChangeEnabled;
    private updateProps;
    private changeSubmenuVisibility;
}
declare const _default: typeof PositionProperties;
export default _default;
