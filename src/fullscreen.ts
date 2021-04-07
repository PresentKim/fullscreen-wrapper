const document = (window.document as any);

class FullScreen {
    public isEnabled: boolean;
    public elementProperty: string;
    public requestMethod: string;
    public exitMethod: string;
    public changeEvent: string;
    public errorEvent: string;

    constructor() {
        this.isEnabled = false;
        this.elementProperty = "";
        this.requestMethod = "";
        this.exitMethod = "";
        this.changeEvent = "";
        this.errorEvent = "";
    }

    get isFullscreen(): boolean {
        return Boolean(this.element);
    }

    get element(): Element | undefined {
        return document[this.elementProperty];
    }

    request(element: Element = document.documentElement): boolean {
        if (!(element as any)[this.requestMethod])
            return false;

        (element as any)[this.requestMethod]();
        return true;
    }

    exit(): boolean {
        if (!document[this.exitMethod])
            return false;

        document[this.exitMethod]();
        return true;
    }

    onChange(callback: (this: Document, ev: Event) => any): boolean {
        if (!this.isEnabled)
            return false;

        document.addEventListener(this.changeEvent, callback, false);
        return true;
    }

    onError(callback: (this: Document, ev: Event) => any): boolean {
        if (!this.isEnabled)
            return false;

        document.addEventListener(this.errorEvent, callback, false);
        return true;
    }

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