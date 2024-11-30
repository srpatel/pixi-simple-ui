import * as PIXI from "pixi.js";

export default abstract class Screen extends PIXI.Container {
  protected screenWidth: number;
  protected screenHeight: number;
  setSize(width: number, height: number) {
    this.screenWidth = width;
    this.screenHeight = height;
    this.resize();
  }
  resize() {
    this.onSizeChanged(this.screenWidth, this.screenHeight);
  }
  onSizeChanged(_width: number, _height: number) {}
  onAddedToStage(_stage: PIXI.Container) {}
  onRemovedFromStage(_stage: PIXI.Container) {}
}
