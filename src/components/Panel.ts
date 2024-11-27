import * as PIXI from "pixi.js";
import Component from "./Component";


type Roundedness = "none" | "sm" | "md" | "lg";

type PanelProps = {
  width: number;
  height: number;
  rounded: Roundedness;
  color: PIXI.ColorSource;
};

export default class Panel extends Component {
  public static defaultProps: PanelProps = {
    width: 100,
    height: 100,
    rounded: "none",
    color: 0xffffff,
  };

  private pane: PIXI.ViewContainer;

  constructor(_props?: Partial<PanelProps>) {
    super();

    const props = {
      ...Panel.defaultProps,
      ...(_props ?? {}),
    };

    this.pane = Panel.makeViewContainer(props.rounded);
    this.addChild(this.pane);
    this.setSize(props.width, props.height);
    this.setColor(props.color);
  }

  static makeViewContainer(r: Roundedness) {
    if (r == "none") {
      return PIXI.Sprite.from(PIXI.Texture.WHITE);
    } else {
      return new PIXI.NineSliceSprite(
        PIXI.Texture.from(`simple-ui/rounded-${r}.png`)
      );
    }
  }

  setColor(color: PIXI.ColorSource) {
    this.pane.tint = color;
  }

  onSizeChanged(): void {
    this.pane.setSize(this.width, this.height);
  }
}
