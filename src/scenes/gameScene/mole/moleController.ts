import { SimpleMole, StrongMole } from "./mole";
import { MoleControllerOptions } from "../../../types/types";

export class MoleController {
  protected _currentTime: number;
  private _gameSceneContainer: any;

  constructor(options: MoleControllerOptions) {
    this._currentTime = options.currentTime;
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
        break;
      }
      case 1: {
        let mole: any = new StrongMole({
          holeIndex: Math.floor(Math.random() * 5),
        });
        mole.create(this._gameSceneContainer);
        break;
      }
    }
  }

  private _createAndRemoveMole(): void {
    setInterval((): void => {
      if (window.stopGame === false) {
        this._choiceAndCreateMole();
      }
    }, 3500);
  }

  public showMoles(): void {
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
