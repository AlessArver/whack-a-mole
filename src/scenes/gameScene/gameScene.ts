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
  private _container: any;
  private _grass;
  private _moles;

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

  get gameSceneData(): any {
    return this._data;
  }

  private initScene(): void {
    let scoreBar: any = new ScoreBar({
      container: this._data.scoreBarContainer,
    });
    this._container.addChild(this._data.scoreBarContainer);
    let interval: any = setInterval((): void => {
      if (window.countTime > 0 && window.stopGame === false) {
        window.countTime--;
        scoreBar.update(window.countTime, window.scoreCount);
        let mole: any = new MoleController({
          currentTime: window.countTime,
          gameSceneContainer: this._container,
        });
        mole.showMoles();
      }
      if (window.countTime === 0) {
        clearInterval(interval);
      }
    }, 1000);

    const holesPositions = [0, 97, 194, 291, 388];
    for (let index = 0; index < 5; index++) {
      let hole: any = new Hole({
        appHeight: window.app.view.height,
        x: holesPositions[index],
      });
      this._data.holes.push(hole);
      this._data.holesContainer.addChild(hole.grass);

      this._grass = hole.grass;
    }
    this._container.addChild(this._data.holesContainer);
  }

  public resize(newWidth: number, newHeight) {
    this._data.whiteBackground.y = newHeight - this._data.whiteBackground.height + 50;
    this._data.holesContainer.x = (newWidth - this._data.holesContainer.width) / 2;
    this._data.scoreBarContainer.x = (newWidth - this._data.scoreBarContainer.width) / 2;
    this._data.holes.forEach(
      (hole: Hole) =>
        (hole.grass.y = newHeight - this._grass.height - 50)
    );
  }

  get grass(): any {
    return this._grass;
  }
}
