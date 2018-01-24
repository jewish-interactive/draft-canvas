[![Build Status](https://travis-ci.org/jewish-interactive/draft-canvas.svg?branch=master)](https://travis-ci.org/jewish-interactive/draft-canvas)

# Draft Canvas

## [Live Demo](https://jewish-interactive.github.io/draft-canvas)

# Development

The easiest way to develop the library is to cd to the [example/](example/) folder and `npm run dev:auto-reload` (or just `npm run dev` if you don't want auto-reloading on save)

This is because while the _example_ is setup to mimic a live app, it does not install `draft-canvas` through npm. Rather, it references the local code directly via the `lib/Lib` alias.

In this way, you can see the live changes while developing, without cluttering the library build with the examples's dependencies :)

You can also build the library and run tests via the usual commands in the root folder (`npm run build`, `npm run test`, etc.)