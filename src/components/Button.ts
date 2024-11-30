import * as PIXI from "pixi.js";
import Component from "./Component";
import Panel from "./Panel";

export type ButtonProps = {
  width: number;
  height: number;
  rounded: "none" | "sm" | "md" | "lg";
  raisedYOffset: number;
  pressedYOffset: number;
  topColorUp: PIXI.ColorSource;
  topColorOver: PIXI.ColorSource;
  topColorDown: PIXI.ColorSource;
  bottomColor: PIXI.ColorSource;
  actorUp?: PIXI.Container;
  actorOver?: PIXI.Container;
  actorDown?: PIXI.Container;
};

export default class Button extends Component {
  public static defaultProps: ButtonProps = {
    width: 150,
    height: 40,
    raisedYOffset: 10,
    pressedYOffset: 2,
    rounded: "none",
    topColorUp: 0xefefef,
    topColorOver: 0xe4e4e4,
    topColorDown: 0xc0bcbc,
    bottomColor: 0x666666,
  };

  private raisedYOffset: number;
  private bottomPane: PIXI.ViewContainer;
  private topPane: PIXI.ViewContainer;
  protected actorUp: PIXI.Container | undefined;
  protected actorOver: PIXI.Container | undefined;
  protected actorDown: PIXI.Container | undefined;

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

    this.actorUp = props.actorUp;
    this.actorOver = props.actorOver;
    this.actorDown = props.actorDown;

    this.showOnly(this.actorUp);

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
      this.showOnly(this.actorOver);
    });
    this.on("pointerout", () => {
      if (mode != "over") return;
      mode = "up";
      this.topPane.tint = props.topColorUp;
      this.showOnly(this.actorUp);
    });
    this.on("pointerdown", () => {
      mode = "down";
      this.topPane.tint = props.topColorDown;
      this.topPane.position.y =
        this.bottomPane.position.y - props.pressedYOffset;
      this.showOnly(this.actorDown);
      this.positionActors();
    });
    const onUp = () => {
      mode = "up";
      this.topPane.tint = props.topColorUp;
      this.topPane.position.y =
        this.bottomPane.position.y - props.raisedYOffset;
      this.showOnly(this.actorUp);
      this.positionActors();
    };
    this.on("pointerup", onUp);
    this.on("pointerupoutside", onUp);
    this.on("pointercancel", onUp);

    this.addChild(this.bottomPane);
    this.addChild(this.topPane);

    if (this.actorUp) this.addChild(this.actorUp);
    if (this.actorOver) this.addChild(this.actorOver);
    if (this.actorDown) this.addChild(this.actorDown);

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

    this.positionActors();
  }

  private showOnly(show: PIXI.Container) {
    for (const actor of [this.actorUp, this.actorOver, this.actorDown]) {
      if (actor) {
        actor.visible = show == actor;
      }
    }
  }

  private positionActors() {
    for (const actor of [this.actorUp, this.actorOver, this.actorDown]) {
      if (actor) {
        actor.position.set(
          this.topPane.position.x + (this.topPane.width - actor.width) / 2,
          this.topPane.position.y + (this.topPane.height - actor.height) / 2
        );
      }
    }
  }
}
