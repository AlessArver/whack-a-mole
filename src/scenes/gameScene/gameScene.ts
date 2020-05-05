import { hole } from "./hole";
import { scoreBar } from "./scoreBar";

export class GameScene {
  private _holes;
  private _whiteBackground;
  private _container

  constructor() {
    this._container = new window.PIXI.Container()
    this._holes = new window.PIXI.Container()

    this._whiteBackground = new window.PIXI.Graphics();
    this._whiteBackground.beginFill(0xffffff);
    this._whiteBackground.drawRect(0, 0, window.app.view.width, 100);
    this._whiteBackground.endFill();

    this._container.addChild(this._whiteBackground);

    this._container.sortableChildren = true;

    this._holes.zIndex = 2;
    this._whiteBackground.zIndex = 1;

    this.initScene();
    this.resize()
  }

  get container() {
    return this._container
  }

  public resize() {
    setInterval(
      () => (this._whiteBackground.y = (window.app.view.height - this._whiteBackground.height) + 50),
      1000
    );
    setInterval(
      () => (this._holes.x = (window.app.view.width - this._holes.width) / 2),
      1000
    );
  }

  private initScene() {
    scoreBar(this._container);
    hole(this._holes, this._container);
  }
}
