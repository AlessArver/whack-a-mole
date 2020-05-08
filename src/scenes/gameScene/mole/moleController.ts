import { SimpleMole, StrongMole } from "./mole";

type MoleControllerOptions = {
  gameSceneContainer: any;
};

export class MoleController {
  private _gameSceneContainer: any;
  private _moles: Array<SimpleMole|StrongMole> = [];

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
        this._moles.push(mole)
        break;
      }
    }
  }

  public resize(newWidth: number, newHeight: number) {
    this._moles.forEach(mole => mole.resize(newWidth, newHeight))
  }

  private _createAndRemoveMole(): void {
    setInterval((): void => {
      if (window.stopGame === false) {
        this._choiceAndCreateMole();
      }
    }, 3500);
  }

  public showMoles(currentTime): void {
    switch (currentTime) {
      case 119:
        console.log(`FIRST IF. Current time: ${currentTime}.`);
        this._createAndRemoveMole();
        break;
      case 75:
        console.log(`SECOND IF. Current time: ${currentTime}.`);
        for (let i = 1; i <= 3; i++) {
          this._createAndRemoveMole();
        }
        break;
      case 0:
        console.log(`THIRD IF. Current time: ${currentTime}.`);
        for (let i = 1; i <= 5; i++) {
          this._createAndRemoveMole();
        }
        break;
    }
  }
}
