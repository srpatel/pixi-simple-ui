import * as PIXI from "pixi.js";
import Button, { ButtonProps } from "./Button";

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
    textColorUp: 0xffffff,
    textColorOver: 0xe4e4e4,
    textColorDown: 0xc0bcbc,
    text: "Button",
  };

  constructor(_props?: Partial<TextButtonProps>) {
    // Make a Label component which has default params?
    // Otherwise, how do change the default fonts

    const props = {
      ...TextButton.defaultProps,
      ...(_props ?? {}),
    };

    const actorUp = new PIXI.BitmapText({
      text: props.text,
      style: {
        fontFamily: "Mesmerize",
        fontSize: 24,
        align: "center",
      },
    });
    actorUp.tint = 0;

    const subProps = {
      ...props,
      actorUp,
      actorOver: actorUp,
      actorDown: actorUp,
    };

    super(subProps);
  }
}
