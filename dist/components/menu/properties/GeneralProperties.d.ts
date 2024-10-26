import * as React from 'react';
export interface IProps {
    config: any;
    updateProps: any;
    activeEffect: any;
}
declare class GeneralProperties extends React.Component<IProps> {
    state: {
        isSubmenuVisible: string;
        blendMode: string;
        globalAlpha: number;
        test: number;
    };
    render(): React.JSX.Element;
    private handleChangeGlobalAlpha;
    private handleChange;
    private handleChangeEffect;
    private handleChangePredefinedImage;
    private updateProps;
    private handleChangeAnimatedSprite;
    private handleChangeFollowMouse;
    private handleChangeAnimatedSpriteLoop;
    private handleChangeAnimatedSpriteRandomFrameStart;
    private changeSubmenuVisibility;
    private bgImageChange;
    private particleImagesChange;
    private particleFinishingImagesChange;
    private sendParticleImages;
    private sendParticleFinishingImages;
    private loadBgImage;
    private loadParticleImages;
    private loadParticleFinishingImages;
}
declare const _default: typeof GeneralProperties;
export default _default;
