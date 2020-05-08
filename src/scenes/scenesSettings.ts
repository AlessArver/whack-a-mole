import { Hole } from "./gameScene/hole";
import { gameSceneBackgroundSound } from "../sounds";

type ScenesSettingsOptions = {
  app: any;
  gameSceneContainer: any;
  startSceneContainer: any;
  endSceneContainer: any;
};

export class ScenesSettings {
  private _app;
  private _gameSceneContainer;
  private _startSceneContainer;
  private _endSceneContainer;

  constructor(options: ScenesSettingsOptions) {
    this._app = options.app;
    this._gameSceneContainer = options.gameSceneContainer
    this._startSceneContainer = options.startSceneContainer;
    this._endSceneContainer = options.endSceneContainer;
  }

  public setGameScene() {
    this._startSceneContainer.visible = false;
    this._app.stage.removeChild(this._startSceneContainer);
    
    this._endSceneContainer.visible = false;
    this._app.stage.removeChild(this._endSceneContainer);

    this._gameSceneContainer.visible = true;
    this._app.stage.addChild(this._gameSceneContainer);
  }

  public setStartScene() {
    this._gameSceneContainer.visible = false;
    this._app.stage.removeChild(this._gameSceneContainer);
    
    this._endSceneContainer.visible = false;
    this._app.stage.removeChild(this._endSceneContainer);

    this._startSceneContainer.visible = true;
    this._app.stage.addChild(this._startSceneContainer);
  }

  public setEndScene() {
    this._gameSceneContainer.visible = false;
    this._app.stage.removeChild(this._gameSceneContainer);

    this._startSceneContainer.visible = false;
    this._app.stage.removeChild(this._startSceneContainer);

    this._endSceneContainer.visible = true;
    this._app.stage.addChild(this._endSceneContainer);
  }

}
