import * as React from 'react';
import './../assets/scss/App.scss';
declare class App extends React.Component {
    state: {
        isLoading: boolean;
        name: string;
        props: {};
        defaultConfig: null;
    };
    private app;
    private bgContainer;
    private particlesContainer;
    private bgContainer2;
    private particles;
    private conf;
    private activeEffect;
    private orgConfig;
    private defaultConfig;
    private newDefaultConfig;
    private tween;
    private bgSprite;
    private bgSprite2;
    private bgSpriteSize;
    private particlesArr;
    componentDidMount(): Promise<void>;
    render(): React.JSX.Element;
    private updateProps;
    private createParticles;
    private resize;
    private getConfigIndexByName;
    private updateNewBehaviour;
    private updateBehaviour;
    private getBehaviourByIndex;
    private getNewBehaviourByIndex;
    private updateBehaviourByIndex;
    private updateNewBehaviourByIndex;
    private animateTween;
    private detectMouseMove;
    private createOffice;
    private animateWarp;
    private animateWarpStop;
    private setActiveEffect;
    private initApp;
    private createEventListeners;
    private animateMeteor;
    private animateFlyingBubbles;
    private animateFlyingFountain;
    private animateFlyingFire;
    private killTween;
    private stopAllParticlesArr;
    private reloadEverything;
}
declare const _default: typeof App;
export default _default;