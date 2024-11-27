import * as PIXI from "pixi.js";

export default class SimpleUI {
  static async init(path: string) {
    await PIXI.Assets.load([
      path + "/spritesheet.json",
      path + "/inter-sdf.fnt",
    ]);
  }
}
