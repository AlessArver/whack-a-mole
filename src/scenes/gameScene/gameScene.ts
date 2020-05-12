import { Hole } from "./hole";
import { ScoreBar } from "./scoreBar";
import { MoleController } from "./mole/moleController";

type GameSceneDataOptions = {
  scoreBarContainer: PIXI.Container;
  holesContainer: PIXI.Container;
  whiteBackground: PIXI.Graphics;
  holes: Array<Hole>;
};

export class GameScene {
  private _data: GameSceneDataOptions = {
    scoreBarContainer: new window.PIXI.Container(),
    holesContainer: new window.PIXI.Container(),
    whiteBackground: new window.PIXI.Graphics(),
    holes: [],
  };
  private _container: PIXI.Container;
  private _hole: Hole;
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
    setInterval((): void => {
      if (window.countTime > 0 && window.stopGame === false) {
        window.countTime--;
        scoreBar.update(window.countTime, window.scoreCount);
        this._moleController.showMoles(window.countTime);
      }
    }, 1000);
    setInterval(
      (): void =>
        this._moleController.resize(
          window.app.view.width,
          window.app.view.height
        ),
      100
    );

    const holesPositionsX = [0, 0, 190, 388, 388];
    const holesPositionsY = [70, 250, 150, 250, 70];

    for (let i: number = 0; i < 5; i++) {
      this._hole = new Hole({
        x: holesPositionsX[i],
        y: holesPositionsY[i],
      });
      // this._data.holes.push(this._hole);
      this._data.holesContainer.addChild(this._hole.grass);
    }
    this._container.addChild(this._data.holesContainer);
  }

  public resize(newWidth: number, newHeight: number): void {
    this._data.whiteBackground.y =
      newHeight - this._data.whiteBackground.height + 50;
    this._data.holesContainer.position.set(
      (newWidth - this._data.holesContainer.width) / 2,
      (newHeight - this._data.holesContainer.height) / 2
    );
    // this._data.holesContainer.x =
    //   (newWidth - this._data.holesContainer.width) / 2;
    this._data.scoreBarContainer.x =
      (newWidth - this._data.scoreBarContainer.width) / 2;
    this._moleController.resize(newWidth, newHeight);
    // this._data.holes.forEach(
    //   (hole: Hole) => (hole.grass.y = newHeight - hole.grass.height - 50)
    // );
    this._moleController.resize();
  }
}
