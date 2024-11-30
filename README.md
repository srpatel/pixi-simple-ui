# pixi-zunil-ui

`pixi-zunil-ui` is a very simple layout and ui library for PixiJS.

The easiest way to see it in action is to look at the [examples](#examples).

If you like this, you may like my other PixiJS library [pixi-actions](https://github.com/srpatel/pixi-actions).

This is manually for personal use, using an API which is useful for me. If you want more well-developed ui and layout libraries, the official [pixi-ui](https://github.com/pixijs/ui) and [pixi-layout](https://github.com/pixijs/layout) are probably more suitable. That said, if you like this library, then feel free to use it!

## Installing

```bash
npm install pixi-zunil-ui
```

Some of the UI components require assets. If you want to use these, the assets are included in the package and should be copied into the assets folder of your project. This can be done as part of an appropriate script in `package.json` if you want to make sure it's kept up-to-date, or as a one-off:

```
cp node_modules/pixi-zunil-ui/assets/* public/zunil-ui/
```

The copied assets will also need loading when initialising the application. Where "zunil-ui" is the path to the folder into which you copied the assets.

```javascript
await Z.Application.loadAssets("zunil-ui");
```

## General Usage

You can import just the classes you need, or import everything with a namespace such as `Z`:

```javascript
import { Panel } from "pixi-zunil-ui";
import * as Z from "pixi-zunil-ui";
```

## Application

`Z.Application` is a replacement for `PIXI.Application` which handles:

- scaling and placement of the `stage` according to a chosen resize mode
- switching between various screens
- maintaing a modal stack
- ensuring screens and modals take up the full screen

Resize modes mean you can code to target a specific width/height no matter the screen size. The stage is scaled such that your application fits on the screen.

```javascript
import * as Z from "pixi-zunil-ui";
const app = new Z.Application();
await app.init({
  targetHeight: 1920,
  targetWidth: 1080,
  resizeMode: "extend",
  // plus any other PIXI.Application options...
});
```

## Screens and Modals

Screens and modals will take up the full screen, even as you resize the application.

```javascript
app.setScreen(new Z.MenuScreen());
app.pushModal(new Z.TextModal({ text: "This is a message", dismissible: true }));
```

Screens should implement `onSizeChanged(_width: number, _height: number): void` to layout their elements according to the size of the screen. This ensures that even if the user resizes the window, all the screen elements are correctly placed.

If you're using Tables, then you should resize the root table here.

## Components

Every component has a mutable default props object which are applied when a new component of that type is instantiated. If you supply any props to the constructor, any values supplied override the defaults. In this way you can set a "look and feel" for your application.

```javascript
Z.Panel.defaultProps.color = 0x90bade;
Z.TextButton.defaultProps.rounded = "lg";
Z.Button.defaultProps.rounded = "md";
```

Currently, the components which exist are:
- Button
- TextButton
- Panel
- Label

## Tables

The crux of the layout system is the `Table` class. It's a `PIXI.Container` that manages the size and position of its child elements.

### Creating a Table

You can create an add a table to the stage as with any other `PIXI.Container`. Be sure to set the table's size as appropriate; this is what determines the bounds of its child elements.

```javascript
const root = new Table();
root.setSize(500, 500);
container.addChild(root);
```

If you are using a table to manage layout of the whole stage, and you want to take advantage of the automatic resizing capabilities, it makes sense to add a resize listener. For example, if you are using the `resizeTo` option, and adding the root directly to the stage:

```javascript
await app.init({ resizeTo: window });

const root = new Table();
app.stage.addChild(root);
function resizeTable() {
	root.setSize(app.renderer.width, app.renderer.height);
}
app.renderer.on('resize', resizeTable);
resizeTable();
```

### Layout

Tables are made up of rows, and rows are made up of cells. Rows and cells have a basis, which determines how much room they take up:

- `number` - the size in pixels to take up
- `string` of the form `"10%"` - the percentage of the total space in pixels
- `null` (default) - all remaining space is divided equally by items with a null-basis

That is, a row with a basis of `50` will have a height of `50px`. A cell with a basis of `25%` will take up `25%` of the total available width.

A cell can also have any number of elements. An element is a `PIXI.Container`, a sizing strategy and an anchor. Each of the cell's elements are added to the table, and the position and size of each are managed according to the sizing strategy and anchor.

| Sizing strategy| Details |
|:---|:---|
| `null` | _Default._ Do not size the element, manage only the position. |
| `'contain'` | Set size as large as possible whilst still fitting within the cell. Maintain aspect ratio. |
| `'cover'` | Set size to the minimum size such that the cell is entired covered. Maintain aspect ratio. |
| `'stretch'` or `'cover!'` | Set size to the exact size of the cell. Ignore aspect ratio. |
| `grow` | If the cell is larger than the initial size, grow the element to fit the cell. Maintain aspect ratio. |
| `grow!` | If the cell is larger than the initial size, grow the element to fit the cell. Ignore aspect ratio. |
| `shrink` | If the cell is smaller than the initial size, shrink the element to fit the cell. Maintain aspect ratio. |
| `shrink!` | If the cell is smaller than the initial size, shrink the element to fit the cell. Ignore aspect ratio. |

Cell anchor is a `PIXI.Point` representing the x and y anchors. There are some self-explanatory helper constants:

- `CellAnchor.TopLeft`
- `CellAnchor.Top`
- `CellAnchor.TopRight`
- `CellAnchor.Left`
- `CellAnchor.Middle` (default)
- `CellAnchor.Right`
- `CellAnchor.BottomLeft`
- `CellAnchor.Bottom`
- `CellAnchor.BottomRight`

### API

Add rows, cells and elements to the table using these methods:

- `Table.row(basis: Basis = null)`
- `Table.cell(basis: Basis = null)`
- `Table.element(element: PIXI.Container, strategy: SizingStrategy = null, anchor: PIXI.Point = null)`

You can turn on debug drawing which draws a red outline around each cell:

- `Table.debug = true;`

It is recommended to disable prettier for the table definition so you can use the indentation to visualise the layout.

## Examples

All of these examples are show with debug draw on.

<table>
	<thead>
		<tr>
			<th>Picture</th>
			<th>Code</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><img src="https://github.com/srpatel/pixi-table-layout/assets/4903502/fb31f4db-4ab5-4c34-a2ca-139d38ef855e">
</td>
			<td><b>Contain</b><pre lang="js">
// prettier-ignore
root
  .row()
    .cell()
    .cell("20%").element(PIXI.Sprite.from("doughnut.png"), "contain", CellAnchor.Top)
    .cell()
  .row("20%")
    .cell().element(PIXI.Sprite.from("doughnut.png"), "contain", CellAnchor.Left)
    .cell().element(PIXI.Sprite.from("doughnut.png"), "contain")
    .cell().element(PIXI.Sprite.from("doughnut.png"), "contain", CellAnchor.Right)
  .row()
    .cell()
    .cell("20%").element(PIXI.Sprite.from("doughnut.png"), "contain", CellAnchor.Bottom)
    .cell();
root.debug = true;</pre>
Sprites are resized to fit within cells, but aspect ratio is maintained.
</td>
		</tr>
		<tr>
			<td><img src="https://github.com/srpatel/pixi-table-layout/assets/4903502/54cb9a86-5a48-4232-9658-64b33181e438">
</td>
			<td><b>Stretch</b><pre lang="js">
// prettier-ignore
root
  .row()
    .cell().element(PIXI.Sprite.from("doughnut.png"), "stretch")
    .cell().element(PIXI.Sprite.from("doughnut.png"), "stretch")
    .cell().element(PIXI.Sprite.from("doughnut.png"), "stretch")
  .row(20)
  .row()
    .cell().element(PIXI.Sprite.from("doughnut.png"), "stretch");
root.debug = true;</pre>
Sprites are sized exactly to their containing cells.
</td>
		</tr>
		<tr>
			<td><img src="https://github.com/srpatel/pixi-table-layout/assets/4903502/11e47a93-3f7f-4831-a4b4-599d24cb5aa6">
</td>
			<td><b>Cover</b><pre lang="js">
// prettier-ignore
root
  .row()
  .row(150)
    .cell(100)
    .cell().element(PIXI.Sprite.from("doughnut.png"), "cover", CellAnchor.Top)
    .cell(100)
  .row();
root.debug = true;</pre>
Sprite grows to completely cover the cell, even spilling outside the cell's bounds.
</td>
		</tr>
		<tr>
			<td><img src="https://github.com/srpatel/pixi-table-layout/assets/4903502/cb3fbce5-c0a3-40d1-8dc1-c1b948c6216d">
</td>
			<td><b>No sizing strategy</b><pre lang="js">
// prettier-ignore
root
  .row()
    .cell().element(PIXI.Sprite.from("doughnut.png"), CellAnchor.Top)
    .cell().element(PIXI.Sprite.from("doughnut.png"), new PIXI.Point(0.2, 0.9))
    .cell().element(PIXI.Sprite.from("doughnut.png"))
  .row()
    .cell()
      .element(PIXI.Sprite.from("doughnut.png"), CellAnchor.TopLeft)
      .element(PIXI.Sprite.from("doughnut.png"), CellAnchor.BottomRight);
root.debug = true;</pre>
Sprites are left at their original size, and simple placed according to their anchors. Note that one cell can have multiple elements
</td>
		</tr>
		<tr>
			<td><img src="https://github.com/srpatel/pixi-table-layout/assets/4903502/756b7386-b501-402a-af62-5cac81b46397">
</td>
			<td><b>Sub-tables</b><pre lang="js">
// prettier-ignore
root
  .row()
    .cell("33%").element(subTable1, "stretch")
    .cell().element(PIXI.Sprite.from("doughnut.png"))
  .row()
    .cell().element(PIXI.Sprite.from("doughnut.png"))
    .cell(350).element(subTable2, "stretch");
root.debug = true;</pre>
Sub-tables are permitted and encouraged! When adding a table as an element, you almost certainly want to use the "stretch" sizing strategy.
</td>
		</tr>
	</tbody>
</table>