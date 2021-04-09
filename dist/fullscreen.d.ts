declare class FullScreen {
    /**
     * Returns true if document has the ability to display elements fullscreen and fullscreen is supported, or false otherwise.
     * @see Document.fullscreenEnabled
     */
    isEnabled: boolean;
    /** @inner Name of element property */
    elementProperty: string;
    /** @inner Name of request method */
    requestMethod: string;
    /** @inner Name of exit method */
    exitMethod: string;
    /** @inner Name of change event */
    changeEvent: string;
    /** @inner Name of error event */
    errorEvent: string;
    /** @inner */
    constructor();
    /** Returns true if document has fullscreen element, or false otherwise. */
    get isFullscreen(): boolean;
    /**
     * Returns document's fullscreen element.
     * @see Document.fullscreenElement
     */
    get element(): Element | undefined;
    /**
     * Displays element fullscreen and resolves promise when done.
     * @see Element.requestFullscreen
     */
    request(element?: Element): boolean;
    /**
     * Stops document's fullscreen element from being displayed fullscreen and resolves promise when done.
     * @see Element.exitFullscreen
     */
    exit(): boolean;
    /** Appends an event listener for "fullscreenchange" event. The callback argument sets the callback that will be invoked when the event is dispatched. */
    onChange(callback: (this: Document, ev: Event) => any): boolean;
    /** Appends an event listener for "fullscreenerror" event. The callback argument sets the callback that will be invoked when the event is dispatched. */
    onError(callback: (this: Document, ev: Event) => any): boolean;
    /** Toggle fullscreen */
    toggle(element?: Element): boolean;
}
declare const fullscreen: FullScreen;
export default fullscreen;
