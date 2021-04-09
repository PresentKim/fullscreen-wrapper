const document = (window.document as any);

class FullScreen {
    /**
     * Returns true if document has the ability to display elements fullscreen and fullscreen is supported, or false otherwise.
     * @see Document.fullscreenEnabled
     */
    public isEnabled: boolean;

    /** @inner Name of element property */
    public elementProperty: string;

    /** @inner Name of request method */
    public requestMethod: string;

    /** @inner Name of exit method */
    public exitMethod: string;

    /** @inner Name of change event */
    public changeEvent: string;

    /** @inner Name of error event */
    public errorEvent: string;

    /** @inner */
    constructor() {
        this.isEnabled = false;
        this.elementProperty = "";
        this.requestMethod = "";
        this.exitMethod = "";
        this.changeEvent = "";
        this.errorEvent = "";
    }

    /** Returns true if document has fullscreen element, or false otherwise. */
    get isFullscreen(): boolean {
        return Boolean(this.element);
    }

    /**
     * Returns document's fullscreen element.
     * @see Document.fullscreenElement
     */
    get element(): Element | undefined {
        return document[this.elementProperty];
    }

    /**
     * Displays element fullscreen and resolves promise when done.
     * @see Element.requestFullscreen
     */
    request(element: Element = document.documentElement): boolean {
        if (!(element as any)[this.requestMethod])
            return false;

        (element as any)[this.requestMethod]();
        return true;
    }

    /**
     * Stops document's fullscreen element from being displayed fullscreen and resolves promise when done.
     * @see Element.exitFullscreen
     */
    exit(): boolean {
        if (!document[this.exitMethod])
            return false;

        document[this.exitMethod]();
        return true;
    }

    /** Appends an event listener for "fullscreenchange" event. The callback argument sets the callback that will be invoked when the event is dispatched. */
    onChange(callback: (this: Document, ev: Event) => any): boolean {
        if (!this.isEnabled)
            return false;

        document.addEventListener(this.changeEvent, callback, false);
        return true;
    }

    /** Appends an event listener for "fullscreenerror" event. The callback argument sets the callback that will be invoked when the event is dispatched. */
    onError(callback: (this: Document, ev: Event) => any): boolean {
        if (!this.isEnabled)
            return false;

        document.addEventListener(this.errorEvent, callback, false);
        return true;
    }

    /** Toggle fullscreen */
    toggle(element: Element = document.documentElement): boolean {
        return this.isFullscreen ? this.exit() : this.request(element);
    }
}

const fullscreen = new FullScreen();
if (document.fullscreenEnabled) {
    fullscreen.isEnabled = document.fullscreenEnabled;
    fullscreen.elementProperty = "fullscreenElement";
    fullscreen.requestMethod = "requestFullscreen";
    fullscreen.exitMethod = "exitFullscreen";
    fullscreen.changeEvent = "fullscreenchange";
    fullscreen.errorEvent = "fullscreenerror";
} else if (document.webkitFullscreenEnabled || document.webkitCancelFullScreen) {
    fullscreen.isEnabled = document.fullscreenEnabled || Boolean(document.webkitCancelFullScreen);
    fullscreen.requestMethod = "webkitRequestFullScreen";
    fullscreen.changeEvent = "webkitfullscreenchange";
    fullscreen.errorEvent = "webkitfullscreenerror";
    if (document.webkitFullscreenEnabled) {
        fullscreen.elementProperty = "webkitFullscreenElement";
        fullscreen.exitMethod = "webkitExitFullscreen";
    } else {
        fullscreen.elementProperty = "webkitCurrentFullScreenElement";
        fullscreen.exitMethod = "webkitCancelFullScreen";
    }
} else if (document.msFullscreenEnabled) {
    fullscreen.isEnabled = document.msFullscreenEnabled;
    fullscreen.elementProperty = "msFullscreenElement";
    fullscreen.requestMethod = "msRequestFullscreen";
    fullscreen.exitMethod = "msExitFullscreen";
    fullscreen.changeEvent = "MSFullscreenChange";
    fullscreen.errorEvent = "MSFullscreenError";
} else if (document.mozFullScreenEnabled) {
    fullscreen.isEnabled = document.mozFullScreenEnabled;
    fullscreen.elementProperty = "mozFullScreenElement";
    fullscreen.requestMethod = "mozRequestFullScreen";
    fullscreen.exitMethod = "mozCancelFullScreen";
    fullscreen.changeEvent = "mozfullscreenchange";
    fullscreen.errorEvent = "mozfullscreenerror";
}

export default fullscreen;