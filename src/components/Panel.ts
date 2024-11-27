import * as PIXI from "pixi.js";
import Component from "./Component";

type PanelProps = {
  width: number;
  height: number;
  rounded: "sm" | "md" | "lg";
  color: PIXI.ColorSource;
};

export default class Panel extends Component {
  private pane: PIXI.NineSliceSprite;
  public static defaultProps: PanelProps = {
    width: 100,
    height: 100,
    rounded: "md",
    color: 0xffffff,
  };

  constructor(props?: Partial<PanelProps>) {
    super();

    props = {
      ...Panel.defaultProps,
      ...(props ?? {}),
    };

    this.pane = new PIXI.NineSliceSprite(
      PIXI.Texture.from(`simple-ui/rounded-${props.rounded}.png`)
    );
    this.addChild(this.pane);
    this.setSize(props.width, props.height);
    this.setColor(props.color);
  }

  setColor(color: PIXI.ColorSource) {
    this.pane.tint = color;
  }

  onSizeChanged(): void {
    this.pane.width = this.width;
    this.pane.height = this.height;
  }
}
