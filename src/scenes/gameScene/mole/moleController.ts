import { SimpleMole, StrongMole } from "./mole";

type MoleControllerOptions = {
  gameSceneContainer: PIXI.Container;
};

export class MoleController {
  private _gameSceneContainer: PIXI.Container;
  private _moles: Array<SimpleMole | StrongMole> = [];

  constructor(options: MoleControllerOptions) {
    this._gameSceneContainer = options.gameSceneContainer;
  }

  private _choiceAndCreateMole(): void {
    let selectMole: number = Math.floor(Math.random() * 2);

    switch (selectMole) {
      case 0: {
        let mole: any = new SimpleMole({
          holeIndex: Math.floor(Math.random() * 5),
        });
        mole.create(this._gameSceneContainer);
        this._moles.push(mole);
        break;
      }
      case 1: {
        let mole: any = new StrongMole({
          holeIndex: Math.floor(Math.random() * 5),
        });
        mole.create(this._gameSceneContainer);
        this._moles.push(mole);
        break;
      }
    }
  }

  public resize(newWidth: number, newHeight: number): void {
    this._moles.forEach((mole) => mole.resize(newWidth, newHeight));
  }

  private _createAndRemoveMole(): void {
    setInterval((): void => {
      if (window.stopGame === false) {
        this._choiceAndCreateMole();
      }
    }, 5000);
  }

  public showMoles(currentTime: number): void {
    switch (currentTime) {
      case 119:
        this._createAndRemoveMole();
        break;
      case 90:
        for (let i: number = 1; i <= 3; i++) {
          this._createAndRemoveMole();
        }
        break;
      case 45:
        for (let i: number = 1; i <= 5; i++) {
          this._createAndRemoveMole();
        }
        break;
    }
  }
}
