import { Hole } from "./hole";
import { ScoreBar } from "./scoreBar";
import { MoleController } from "./mole/moleController";
import { GameSceneDataOptions } from "../../types/types";

export class GameScene {
  private _data: GameSceneDataOptions = {
    scoreBarContainer: new window.PIXI.Container(),
    holesContainer: new window.PIXI.Container(),
    whiteBackground: new window.PIXI.Graphics(),
    holes: [],
  };
  private _container: PIXI.Container;
  private _grass: PIXI.Sprite;
  private _moleController: any;

  constructor() {
    this._container = new PIXI.Container();
    this._data.whiteBackground.beginFill(0xffffff);
    this._data.whiteBackground.drawRect(0, 0, window.app.view.width, 100);
    this._data.whiteBackground.endFill();

    this._container.addChild(this._data.whiteBackground);

    this._container.sortableChildren = true;

    this._data.holesContainer.zIndex = 2;
    this._data.whiteBackground.zIndex = 1;

    this.initScene();
  }

  get container(): PIXI.Container {
    return this._container;
  }

  private initScene(): void {
    let scoreBar: any = new ScoreBar({
      container: this._data.scoreBarContainer,
    });
    this._container.addChild(this._data.scoreBarContainer);
    this._moleController = new MoleController({
      gameSceneContainer: this._container,
    });
    let interval: any = setInterval((): void => {
      if (window.countTime > 0 && window.stopGame === false) {
        window.countTime--;
        scoreBar.update(window.countTime, window.scoreCount);
        this._moleController.showMoles(window.countTime);
      }
      if (window.countTime === 0) {
        clearInterval(interval);
      }
    }, 1000);

    const holesPositionsX: Array<number> = [0, 97, 194, 291, 388];
    const holesPositionsY: Array<number> = [400, 97, 194, 291, 388];
    for (let i: number = 0; i < 5; i++) {
      let hole: any = new Hole({
        appHeight: window.app.view.height,
        x: holesPositionsX[i],
        y: 200,
      });
      this._data.holes.push(hole);
      this._data.holesContainer.addChild(hole.grass);

      this._grass = hole.grass;
    }
    this._container.addChild(this._data.holesContainer);
  }

  public resize(newWidth: number, newHeight: number): void {
    this._data.whiteBackground.y =
      newHeight - this._data.whiteBackground.height + 50;
    this._data.holesContainer.x =
      (newWidth - this._data.holesContainer.width) / 2;
    this._data.scoreBarContainer.x =
      (newWidth - this._data.scoreBarContainer.width) / 2;
    this._data.holes.forEach(
      (hole: Hole) => (hole.grass.y = newHeight - this._grass.height - 50)
    );
    this._moleController.resize();
  }

  get grass(): PIXI.Sprite {
    return this._grass;
  }
}
