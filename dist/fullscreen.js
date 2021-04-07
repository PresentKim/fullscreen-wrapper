"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var document = window.document;
var FullScreen = /** @class */ (function () {
    function FullScreen() {
        this.isEnabled = false;
        this.elementProperty = "";
        this.requestMethod = "";
        this.exitMethod = "";
        this.changeEvent = "";
        this.errorEvent = "";
    }
    Object.defineProperty(FullScreen.prototype, "isFullscreen", {
        get: function () {
            return Boolean(this.element);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FullScreen.prototype, "element", {
        get: function () {
            return document[this.elementProperty];
        },
        enumerable: false,
        configurable: true
    });
    FullScreen.prototype.request = function (element) {
        if (element === void 0) { element = document.documentElement; }
        if (!element[this.requestMethod])
            return false;
        element[this.requestMethod]();
        return true;
    };
    FullScreen.prototype.exit = function () {
        if (!document[this.exitMethod])
            return false;
        document[this.exitMethod]();
        return true;
    };
    FullScreen.prototype.onChange = function (callback) {
        if (!this.isEnabled)
            return false;
        document.addEventListener(this.changeEvent, callback, false);
        return true;
    };
    FullScreen.prototype.onError = function (callback) {
        if (!this.isEnabled)
            return false;
        document.addEventListener(this.errorEvent, callback, false);
        return true;
    };
    FullScreen.prototype.toggle = function (element) {
        if (element === void 0) { element = document.documentElement; }
        return this.isFullscreen ? this.exit() : this.request(element);
    };
    return FullScreen;
}());
var fullscreen = new FullScreen();
if (document.fullscreenEnabled) {
    fullscreen.isEnabled = document.fullscreenEnabled;
    fullscreen.elementProperty = "fullscreenElement";
    fullscreen.requestMethod = "requestFullscreen";
    fullscreen.exitMethod = "exitFullscreen";
    fullscreen.changeEvent = "fullscreenchange";
    fullscreen.errorEvent = "fullscreenerror";
}
else if (document.webkitFullscreenEnabled || document.webkitCancelFullScreen) {
    fullscreen.isEnabled = document.fullscreenEnabled || Boolean(document.webkitCancelFullScreen);
    fullscreen.requestMethod = "webkitRequestFullScreen";
    fullscreen.changeEvent = "webkitfullscreenchange";
    fullscreen.errorEvent = "webkitfullscreenerror";
    if (document.webkitFullscreenEnabled) {
        fullscreen.elementProperty = "webkitFullscreenElement";
        fullscreen.exitMethod = "webkitExitFullscreen";
    }
    else {
        fullscreen.elementProperty = "webkitCurrentFullScreenElement";
        fullscreen.exitMethod = "webkitCancelFullScreen";
    }
}
else if (document.msFullscreenEnabled) {
    fullscreen.isEnabled = document.msFullscreenEnabled;
    fullscreen.elementProperty = "msFullscreenElement";
    fullscreen.requestMethod = "msRequestFullscreen";
    fullscreen.exitMethod = "msExitFullscreen";
    fullscreen.changeEvent = "msfullscreenchange";
    fullscreen.errorEvent = "msfullscreenerror";
}
else if (document.mozFullScreenEnabled) {
    fullscreen.isEnabled = document.mozFullScreenEnabled;
    fullscreen.elementProperty = "mozFullScreenElement";
    fullscreen.requestMethod = "mozRequestFullScreen";
    fullscreen.exitMethod = "mozCancelFullScreen";
    fullscreen.changeEvent = "mozfullscreenchange";
    fullscreen.errorEvent = "mozfullscreenerror";
}
exports.default = fullscreen;
