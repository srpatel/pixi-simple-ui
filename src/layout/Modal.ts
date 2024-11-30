import Panel from "../components/Panel";
import Screen from "./Screen";
import Application from "../Application";

export default abstract class Modal extends Screen {
  background: Panel;
  constructor(props?: Partial<{ dismissible: boolean }>) {
    super();

    this.background = new Panel({
      color: 0,
      rounded: "none",
    });
    this.background.alpha = 0.8;
    this.background.eventMode = "static";
    this.addChild(this.background);

    if (props?.dismissible) {
      this.background.on("pointertap", () => {
        Application.instance.popModal(this);
      });
    }
  }
  onSizeChanged(width: number, height: number) {
    this.background.setSize(width, height);
  }
}
