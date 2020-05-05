import { showMoles } from "./mole/mole";
import { hole } from "./hole";
import { scoreBar } from "./scoreBar";

export class GameScene {
  private _holes;
  private _whiteBackground;

  constructor() {
    this._holes = new window.PIXI.Container()

    this._whiteBackground = new window.PIXI.Graphics();
    this._whiteBackground.beginFill(0xffffff);
    this._whiteBackground.drawRect(0, 0, window.app.view.width, 100);
    this._whiteBackground.endFill();

    window.gameSceneContainer.addChild(this._whiteBackground);
  
    window.gameSceneContainer.sortableChildren = true;
  
    this._holes.zIndex = 2;
    this._whiteBackground.zIndex = 1;

    this.initScene();
    this.resize()
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
    scoreBar();
    hole(this._holes);
  }

}
