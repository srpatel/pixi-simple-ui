import * as PIXI from "pixi.js";
import Screen from "./layout/Screen";

type ResizeMode = "stretch" | "contain" | "extend" | "cover" | "none";

type ZunilApplicationOptions = PIXI.ApplicationOptions & {
  targetWidth: number;
  targetHeight: number;
  resizeMode: ResizeMode;
};

export default class Application extends PIXI.Application {
  static instance: Application;
  targetWidth: number | undefined;
  targetHeight: number | undefined;
  resizeMode: ResizeMode;
  currentScreen: Screen | null;
  modals: Screen[] = [];
  constructor() {
    super();

    Application.instance = this;
  }
  async init(options?: Partial<ZunilApplicationOptions>) {
    const result = await super.init({
      resizeTo: window,
      antialias: true,
      resolution: window.devicePixelRatio,
      autoDensity: true,
      ...options,
    });

    this.resizeMode = options?.resizeMode || "none";
    this.targetWidth = options?.targetWidth;
    this.targetHeight = options?.targetHeight;

    this.currentScreen = null;

    this.renderer.on("resize", this.onResize.bind(this));
    this.resize();

    // TODO : Add pushModal, popModal

    return result;
  }

  static async loadAssets(path: string) {
    const oldSetting = PIXI.TextureSource.defaultOptions.autoGenerateMipmaps;
    PIXI.TextureSource.defaultOptions.autoGenerateMipmaps = true;
    await PIXI.Assets.load([
      path + "/spritesheet.json",
      path + "/inter-sdf.fnt",
    ]);
    PIXI.TextureSource.defaultOptions.autoGenerateMipmaps = oldSetting;
  }

  setScreen(screen: Screen) {
    if (this.currentScreen) {
      this.currentScreen.onRemovedFromStage(this.stage);
      this.stage.removeChild(this.currentScreen);
    }
    this.currentScreen = screen;
    if (this.currentScreen) {
      this.currentScreen.onAddedToStage(this.stage);
      this.stage.addChildAt(this.currentScreen, 0);
    }
    this.resize();
  }

  pushModal(modal: Screen) {
    this.popModal(modal);
    this.modals.push(modal);
    this.stage.addChild(modal);
    this.resize();
  }

  popModal(modal?: Screen) {
    if (this.modals.length == 0) return;

    if (!modal) {
      modal = this.modals[this.modals.length - 1];
    }

    const index = this.modals.indexOf(modal);
    if (index < 0) {
      return;
    }

    this.modals.splice(index, 1);
    this.stage.removeChild(modal);
    this.resize();
  }

  onResize(width: number, height: number) {
    const targetWidth = this.targetWidth ?? width;
    const targetHeight = this.targetHeight ?? height;

    const targetScaleX = width / targetWidth;
    const targetScaleY = height / targetHeight;

    let screenWidth = width;
    let screenHeight = height;

    if (this.resizeMode == "contain") {
      const scale = Math.min(targetScaleX, targetScaleY);
      this.stage.scale.set(scale);
      screenWidth = targetWidth;
      screenHeight = targetHeight;
      const dw = width - targetWidth * scale;
      const dh = height - targetHeight * scale;
      this.stage.position.set(dw / 2, dh / 2);
    } else if (this.resizeMode == "extend") {
      const scale = Math.min(targetScaleX, targetScaleY);
      this.stage.scale.set(scale);
      screenWidth = width / scale;
      screenHeight = height / scale;
      this.stage.position.set(0, 0);
    } else if (this.resizeMode == "cover") {
      const scale = Math.max(targetScaleX, targetScaleY);
      this.stage.scale.set(scale);
      screenWidth = targetWidth;
      screenHeight = targetHeight;
      const dw = width - targetWidth * scale;
      const dh = height - targetHeight * scale;
      this.stage.position.set(dw / 2, dh / 2);
    } else if (this.resizeMode == "stretch") {
      this.stage.scale.set(targetScaleX, targetScaleY);
      screenWidth = targetWidth;
      screenHeight = targetHeight;
      this.stage.position.set(0, 0);
    }

    // Set size of current screen, if there is one
    if (this.currentScreen) {
      this.currentScreen.setSize(screenWidth, screenHeight);
    }
    // Set sizes of all modals
    for (const modal of this.modals) {
      modal.setSize(screenWidth, screenHeight);
    }
  }
}
