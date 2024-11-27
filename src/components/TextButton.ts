import * as PIXI from "pixi.js";
import Button, { ButtonProps } from "./Button";
import Label from "./Label";

type TextButtonProps = Omit<
  ButtonProps,
  "actorUp" | "actorDown" | "actorOver"
> & {
  textColorUp: PIXI.ColorSource;
  textColorOver: PIXI.ColorSource;
  textColorDown: PIXI.ColorSource;
  text: string;
};

export default class TextButton extends Button {
  public static defaultProps: TextButtonProps = {
    ...Button.defaultProps,
    textColorUp: 0,
    textColorOver: 0,
    textColorDown: 0x333333,
    text: "Button",
  };

  constructor(_props?: Partial<TextButtonProps>) {
    const props = {
      ...TextButton.defaultProps,
      ...(_props ?? {}),
    };

    const actorUp = new Label({
      text: props.text,
      color: props.textColorUp,
    });

    const actorOver = new Label({
      text: props.text,
      color: props.textColorOver,
    });

    const actorDown = new Label({
      text: props.text,
      color: props.textColorDown,
    });

    const subProps = {
      ...props,
      actorUp,
      actorOver,
      actorDown,
    };

    super(subProps);
  }

  onSizeChanged() {
    this.actorUp.setSize(this.width, this.height);
    this.actorOver.setSize(this.width, this.height);
    this.actorDown.setSize(this.width, this.height);
    super.onSizeChanged();
  }
}
