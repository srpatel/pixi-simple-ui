# pixi-simple-ui

`pixi-simple-ui` is a very simple layout and ui library for PixiJS.

The easiest way to see it in action is to look at the [examples](#examples).

It's a work-in-progress. Contributions welcome.

If you like this, you may like my other PixiJS library [pixi-actions](https://github.com/srpatel/pixi-actions).

## Installing

```bash
npm install pixi-simple-ui
```

It's quite an opinionated library, because it's mainly for personal use.
It's also designed to be really easy to use. If you want much more control/flexibility, might be better of making your own.

Some of the UI components require assets. These are packaged in the package's assets folder and should be copied into the assets folder of your project.
This can be done as part of an appropriate script in `package.json`.

```
cp node_modules/pixi-simple-ui/assets/* public/simple-ui/
```

The assets will also need loading when initialising the application. Where "simple-ui" is the path to the folder into which you copied the simple-ui assets.

```javascript
await SimpleUI.init("simple-ui");
```

## Usage

Default props. Every component has mutable default props which are applied when a new component of that type is instantiated.
If you supply any props to the constructor, any values supplied override the defaults. In this way you can set a "look and feel" for your application.

- UI components
  - [ ] Button (text button, image button, etc.)
  - [ ] Panel
  - [ ] Stretch: Radio, Checkbox, ScrollPane, SwipeablePane etc.
- Font
  - [ ] How to set the default font style? needed for e.g. buttons
- Screen
  - screen
  - modals
  - resizing
  - resize strategy (letterboxing, cover, contain)
- Table
  - bring it in from pixi-table-layout, then deprecate that.

- make an example app which uses this... how to copy assets in?

Make a Storybook doc for this?