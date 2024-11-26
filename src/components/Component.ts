import SizeableContainer from "src/layout/SizeableContainer";
import Style from "src/Style";

export default abstract class Component extends SizeableContainer {
  private _style: Style = null;
  constructor() {
    super();

    this.on("added", this.onAdded.bind(this));
  }

  onAdded() {
    this.updateStyle();
  }

  get style(): Style {
    if (this._style) return this._style;
    return Style.defaultStyle;
  }

  set style(style: Style) {
    this._style = style;

    this.updateStyle();
  }

  updateStyle() {}
}
