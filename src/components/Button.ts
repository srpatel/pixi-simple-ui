import * as PIXI from "pixi.js";
import Component from "./Component";
import Panel from "./Panel";

type ButtonProps = {
  width: number;
  height: number;
  rounded: "none" | "sm" | "md" | "lg";
  raisedYOffset: number;
  pressedYOffset: number;
  topColorUp: PIXI.ColorSource;
  topColorOver: PIXI.ColorSource;
  topColorDown: PIXI.ColorSource;
  bottomColor: PIXI.ColorSource;
};

export default class Button extends Component {
  public static defaultProps: ButtonProps = {
    width: 100,
    height: 50,
    raisedYOffset: 10,
    pressedYOffset: 2,
    rounded: "none",
    topColorUp: 0xffffff,
    topColorOver: 0xe4e4e4,
    topColorDown: 0xc0bcbc,
    bottomColor: 0x666666,
  };

  private raisedYOffset: number;
  private bottomPane: PIXI.ViewContainer;
  private topPane: PIXI.ViewContainer;

  constructor(_props?: Partial<ButtonProps>) {
    super();

    const props = {
      ...Button.defaultProps,
      ...(_props ?? {}),
    };

    this.raisedYOffset = props.raisedYOffset;
    this.bottomPane = Panel.makeViewContainer(props.rounded);
    this.topPane = Panel.makeViewContainer(props.rounded);
    this.bottomPane.tint = props.bottomColor;
    this.topPane.tint = props.topColorUp;

    this.hitArea = new PIXI.Rectangle(
      0,
      -props.raisedYOffset,
      props.width,
      props.height + props.raisedYOffset
    );
    this.eventMode = "static";
    this.cursor = "pointer";

    let mode = "up";
    this.on("pointerover", () => {
      if (mode != "up") return;
      mode = "over";
      this.topPane.tint = props.topColorOver;
    });
    this.on("pointerout", () => {
      if (mode != "over") return;
      mode = "up";
      this.topPane.tint = props.topColorUp;
    });
    this.on("pointerdown", () => {
      mode = "down";
      this.topPane.tint = props.topColorDown;
      this.topPane.position.y =
        this.bottomPane.position.y - props.pressedYOffset;
    });
    const onUp = () => {
      mode = "up";
      this.topPane.tint = props.topColorUp;
      this.topPane.position.y =
        this.bottomPane.position.y - props.raisedYOffset;
    };
    this.on("pointerup", onUp);
    this.on("pointerupoutside", onUp);
    this.on("pointercancel", onUp);

    this.addChild(this.bottomPane);
    this.addChild(this.topPane);

    this.setSize(props.width, props.height);
  }

  onSizeChanged(): void {
    this.bottomPane.setSize(this.width, this.height);
    this.topPane.setSize(this.width, this.height);
    this.hitArea = new PIXI.Rectangle(
      0,
      -this.raisedYOffset,
      this.width,
      this.height + this.raisedYOffset
    );

    this.topPane.position.set(
      this.bottomPane.position.x,
      this.bottomPane.position.y - this.raisedYOffset
    );
  }
}
