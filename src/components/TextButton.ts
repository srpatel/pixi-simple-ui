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
    textColorUp: 0,
    textColorOver: 0,
    textColorDown: 0x333333,
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
    actorUp.tint = props.textColorUp;

    const actorOver = new PIXI.BitmapText({
      text: props.text,
      style: {
        fontFamily: "Mesmerize",
        fontSize: 24,
        align: "center",
      },
    });
    actorOver.tint = props.textColorOver;

    const actorDown = new PIXI.BitmapText({
      text: props.text,
      style: {
        fontFamily: "Mesmerize",
        fontSize: 24,
        align: "center",
      },
    });
    actorDown.tint = props.textColorDown;

    const subProps = {
      ...props,
      actorUp,
      actorOver,
      actorDown,
    };

    super(subProps);
  }
}
