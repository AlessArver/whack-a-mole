import { SimpleMole, StrongMole } from "./mole";

type MoleControllerOptions = {
  currentTime: number;
  gameSceneContainer: any;
};

export class MoleController {
  protected _currentTime;
  private _gameSceneContainer

  constructor(options: MoleControllerOptions) {
      this._currentTime = options.currentTime
      this._gameSceneContainer = options.gameSceneContainer
  }

  private _choiceAndCreateMole() {
    let selectMole = Math.floor(Math.random() * 2);

    switch (selectMole) {
      case 0: {
        let mole = new SimpleMole({
          holeIndex: Math.floor(Math.random() * 5),
        });
        mole.create(this._gameSceneContainer);
        break;
      }
      case 1: {
        let mole = new StrongMole({
          holeIndex: Math.floor(Math.random() * 5),
        });
        mole.create(this._gameSceneContainer);
        break;
      }
    }
  }

  private _createAndRemoveMole() {
    setInterval(() => {
      if (window.stopGame === false) {
        this._choiceAndCreateMole();
      }
    }, 5000);
  }

  public showMoles() {
    switch (this._currentTime) {
      case 119:
        console.log(`FIRST IF. Current time: ${this._currentTime}.`);
        this._createAndRemoveMole();
        break;
      case 75:
        console.log(`SECOND IF. Current time: ${this._currentTime}.`);
        this._createAndRemoveMole();
        this._createAndRemoveMole();
        this._createAndRemoveMole();
        break;
      case 0:
        console.log(`THIRD IF. Current time: ${this._currentTime}.`);
        this._createAndRemoveMole();
        this._createAndRemoveMole();
        this._createAndRemoveMole();
        this._createAndRemoveMole();
        this._createAndRemoveMole();
        break;
    }
  }
}
