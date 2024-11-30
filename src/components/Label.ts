import * as PIXI from "pixi.js";
import Component from "./Component";

type AlignType = "left" | "center" | "right";

type LabelProps = {
  style: Partial<PIXI.TextStyle>;
  text: string;
  color: PIXI.ColorSource;
  align: AlignType;
  verticalAlign: AlignType;
  width: number;
  height: number;
};

export default class Label extends Component {
  public static defaultProps: LabelProps = {
    style: {
      fontFamily: "Inter Variable",
      fontSize: 24,
      align: "center",
      wordWrap: true,
    },
    text: "Text",
    color: 0,
    align: "center",
    verticalAlign: "center",
    width: 100,
    height: 100,
  };

  private textActor: PIXI.BitmapText;
  private align: AlignType;
  private verticalAlign: AlignType;
  constructor(_props?: Partial<LabelProps>) {
    super();

    const props = {
      ...Label.defaultProps,
      ...(_props ?? {}),
    };

    this.align = props.align;
    this.verticalAlign = props.verticalAlign;

    this.textActor = new PIXI.BitmapText({
      text: props.text,
      style: props.style,
    });
    this.textActor.tint = props.color;

    this.addChild(this.textActor);

    this.setSize(props.width, props.height);
  }

  public setText(text: string) {
    this.textActor.text = text;
    this.onSizeChanged();
  }

  onSizeChanged() {
    this.textActor.style.wordWrapWidth = this.width;

    let x = 0;
    if (this.align == "center") {
      x = (this.width - this.textActor.width) / 2;
    } else if (this.align == "right") {
      x = this.width - this.textActor.width;
    }

    let y = 0;
    if (this.verticalAlign == "center") {
      y = (this.height - this.textActor.height) / 2;
    } else if (this.verticalAlign == "right") {
      y = this.height - this.textActor.height;
    }

    this.textActor.position.set(x, y);
  }
}