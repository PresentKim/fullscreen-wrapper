# fullscreen-wrapper

A Light Wrapper for FullScreen API for cross-browser supports

## Installation

> ```sh
> npm install fullscreen-wrapper --save
> yarn add fullscreen-wrapper
> ```

## Usage

### Import library

> ```javascript
> import fullscreen from 'fullscreen-wrapper';
> //or
> var fullscreen = require('fullscreen-wrapper');
> ```

### Check supported fullscreen features in document

> ```javascript
> //Returns true if document has the ability to display elements fullscreen and fullscreen is supported, or false otherwise.
> if (fullscreen.isEnabled) {
>   //do somethings
> }
> ```

### Check supported fullscreen features in document

> ```javascript
> if (fullscreen.isEnabled) {
>   //do somethings
> }
> ```

All functions are executed only when fullscreen.isEnabled, so there is no need to check separately.  
I think it only needs to be used when adding a fullscreen-button when fullscreen is available.

### Toggle the fullscreen when document clicked

> ```javascript
> //In fact, it works as document.documentElement if no arguments are given.
> document.onclick = () => {
>   if (fullscreen.isFullscreen) {
>     fullscreen.exit();
>   } else {
>     fullscreen.request(document.documentElement);
>   }
> };
> ```
>
> or use `toggle()` method
>
> ```javascript
> document.onclick = () => fullscreen.toggle(document.documentElement);
> ```

### Listen fullscreen change and error events

> Listen change
>
> ```javascript
> fullscreen.onClick(() => {
>   console.log(fullscreen.isFullscreen ? '[Fullscreen] on' : '[Fullscreen] off');
> });
> ```

> Listen error
>
> ```javascript
> fullscreen.onError((err) => console.log(err));
> ```
