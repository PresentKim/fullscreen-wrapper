declare class FullScreen {
    isEnabled: boolean;
    elementProperty: string;
    requestMethod: string;
    exitMethod: string;
    changeEvent: string;
    errorEvent: string;
    constructor();
    get isFullscreen(): boolean;
    get element(): Element | undefined;
    request(element?: Element): boolean;
    exit(): boolean;
    onChange(callback: (this: Document, ev: Event) => any): boolean;
    onError(callback: (this: Document, ev: Event) => any): boolean;
    toggle(element?: Element): boolean;
}
declare const fullscreen: FullScreen;
export default fullscreen;
