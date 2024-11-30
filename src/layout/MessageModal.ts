import Panel from "../components/Panel";
import Modal from "./Modal";
import Label from "../components/Label";

export default class MessageModal extends Modal {
  messagePanel: Panel;
  constructor(
    props?: Partial<{ dismissible: boolean; text: string; width: number }>
  ) {
    super(props);

    this.messagePanel = new Panel({
      width: props?.width ?? 200,
      height: 200,
    });
    this.messagePanel.eventMode = "static";
    this.addChild(this.messagePanel);

    const label = new Label({
      text: props?.text ?? "Message",
      width: this.messagePanel.width / 1.2,
      align: "center",
      verticalAlign: "center",
      style: {
        fontSize: 12,
      },
    });
    this.messagePanel.height = label.getTextHeight() * 1.2;
    label.height = this.messagePanel.height;
    this.messagePanel.addChild(label);
    label.position.set(
      (this.messagePanel.width - label.width) / 2,
      (this.messagePanel.height - label.height) / 2
    );
  }
  onSizeChanged(width: number, height: number) {
    super.onSizeChanged(width, height);

    this.messagePanel.position.set(
      (width - this.messagePanel.width) / 2,
      (height - this.messagePanel.height) / 2
    );
  }
}
