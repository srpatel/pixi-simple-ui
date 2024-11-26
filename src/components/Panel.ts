import * as PIXI from "pixi.js";
import Component from "./Component";

export default class Panel extends Component {
  private pane: PIXI.NineSliceSprite;
  constructor(
    props?: Partial<{
      width: number;
      height: number;
      rounded: "sm" | "md" | "lg";
      color: PIXI.ColorSource;
    }>
  ) {
    super();

    this.pane = new PIXI.NineSliceSprite(
      PIXI.Texture.from(`simple-ui/rounded-${props?.rounded ?? "md"}.png`)
    );
    this.addChild(this.pane);

    this.setSize(props?.width, props?.height);

    if (props?.color != undefined) {
      this.setColor(props?.color);
    }
  }

  setColor(color: PIXI.ColorSource) {
    this.pane.tint = color;
  }

  onSizeChanged(): void {
    this.pane.width = this.width;
    this.pane.height = this.height;
  }
}
