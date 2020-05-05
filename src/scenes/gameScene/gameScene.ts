import { hole } from "./hole";
import { ScoreBar } from "./scoreBar";
import { showMoles } from "./mole/mole";

export class GameScene {
  private _holes;
  private _whiteBackground;
  private _container;
  private _scoreBar;

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
  }

  get container() {
    return this._container
  }

  public resize(width: number, height: number) {
    this._whiteBackground.y = (height - this._whiteBackground.height) + 50;
    this._holes.x = (width - this._holes.width) / 2;
  }

  private initScene() {
    this._scoreBar = new ScoreBar();
    this._container.addChild(this._scoreBar.container);
    let interval = setInterval(() => {
      if (window.countTime > 0 && window.stopGame === false) {
        window.countTime--
        this._scoreBar.update(window.countTime, window.scoreCount);
        showMoles(window.countTime, this._container);
      }
      if (window.countTime === 0) {
        clearInterval(interval);
      }
    }, 1000);
    // this._scoreBar(this._container);
    hole(this._holes, this._container);
  }
}
