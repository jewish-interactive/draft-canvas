[![Build Status](https://travis-ci.org/jewish-interactive/draft-canvas.svg?branch=master)](https://travis-ci.org/jewish-interactive/draft-canvas)

# Draft Canvas

## [Live Demo](https://jewish-interactive.github.io/draft-canvas)

# Development

The `example` folder is setup to mimic a live app, but it does not install `draft-canvas` through npm.

Rather, it references the local code directly via the `lib/Lib` alias.

This allows seeing the live changes to the library upon save, without cluttering the library build with the examples's dependencies :)

To run it in dev mode, just change to the examples folder and `npm run dev:auto-reload`

You can also build the core app and run tests via the usual commands in the root folder (`npm run build`, `npm run test`, etc.)