import * as PIXI from "pixi.js";

export default abstract class Screen extends PIXI.Container {
  protected screenWidth: number;
  protected screenHeight: number;
  setSize(width: number, height: number) {
    this.screenWidth = width;
    this.screenHeight = height;
    this.onSizeChanged();
  }
  onSizeChanged() {}
  onAddedToStage(stage: PIXI.Container) {}
  onRemovedFromStage(stage: PIXI.Container) {}
}
