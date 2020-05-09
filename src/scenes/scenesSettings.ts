type ScenesSettingsOptions = {
  app: any;
  gameSceneContainer: PIXI.Container;
  startSceneContainer: PIXI.Container;
  endSceneContainer: PIXI.Container;
};

export class ScenesSettings {
  private _app;
  private _gameSceneContainer: PIXI.Container;
  private _startSceneContainer: PIXI.Container;
  private _endSceneContainer: PIXI.Container;

  constructor(options: ScenesSettingsOptions) {
    this._app = options.app;
    this._gameSceneContainer = options.gameSceneContainer;
    this._startSceneContainer = options.startSceneContainer;
    this._endSceneContainer = options.endSceneContainer;
  }

  public setGameScene(): void {
    this._startSceneContainer.visible = false;
    this._app.stage.removeChild(this._startSceneContainer);

    this._endSceneContainer.visible = false;
    this._app.stage.removeChild(this._endSceneContainer);

    this._gameSceneContainer.visible = true;
    this._app.stage.addChild(this._gameSceneContainer);
  }

  public setStartScene(): void {
    this._gameSceneContainer.visible = false;
    this._app.stage.removeChild(this._gameSceneContainer);

    this._endSceneContainer.visible = false;
    this._app.stage.removeChild(this._endSceneContainer);

    this._startSceneContainer.visible = true;
    this._app.stage.addChild(this._startSceneContainer);
  }

  public setEndScene(): void {
    this._gameSceneContainer.visible = false;
    this._app.stage.removeChild(this._gameSceneContainer);

    this._startSceneContainer.visible = false;
    this._app.stage.removeChild(this._startSceneContainer);

    this._endSceneContainer.visible = true;
    this._app.stage.addChild(this._endSceneContainer);
  }
}
