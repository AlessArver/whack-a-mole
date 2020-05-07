import { Hole } from "./gameScene/hole";
import { gameSceneBackgroundSound } from "../sounds";

type ScenesSettingsOptions = {
  app: any;
  gameScene: any;
  startSceneContainer: any;
  gameSceneContainer: any;
  endSceneContainer: any;
};

export class ScenesSettings {
  private _app;
  private _gameScene;
  private _gameSceneContainer;
  private _startSceneContainer;
  private _endSceneContainer;

  private _newWidth: number;
  private _newHeight: number;

  constructor(options: ScenesSettingsOptions) {
    this._app = options.app;
    this._gameScene = options.gameScene;
    this._startSceneContainer = options.startSceneContainer;
    this._gameSceneContainer = options.gameSceneContainer;
    this._endSceneContainer = options.endSceneContainer;
  }

  public endOfTheGame() {
    this._startSceneContainer.visible = true;
    this._app.stage.addChild(this._startSceneContainer);
    setInterval(() => {
      if (window.countTime === 0) {
        this._gameScene.container.visible = false;
        this._app.stage.removeChild(this._gameScene.container);

        this._endSceneContainer.visible = true;
        this._app.stage.addChild(this._endSceneContainer);

        window.stopGame = true;

        gameSceneBackgroundSound.stop();
      }
    }, 1000);
  }

  public resize = (newWidth, newHeight): void => {
    this._newWidth = newWidth;
    this._newHeight = newHeight;
    this._startSceneResize();
    this._gameSceneResize();
    this._endSceneResize();
  };
  private _startSceneResize(): void {
    this._startSceneContainer.position.set(
      (this._newWidth - this._startSceneContainer.width) / 2,
      (this._newHeight - this._startSceneContainer.height) / 2
    );
  }
  private _gameSceneResize(): void {
    this._gameScene.gameSceneData.whiteBackground.y =
      this._newHeight -
      this._gameScene.gameSceneData.whiteBackground.height +
      50;
    this._gameScene.gameSceneData.holesContainer.x =
      (this._newWidth - this._gameScene.gameSceneData.holesContainer.width) / 2;
    this._gameScene.gameSceneData.scoreBarContainer.x =
      (this._newWidth - this._gameScene.gameSceneData.scoreBarContainer.width) /
      2;
    this._gameScene.gameSceneData.holes.forEach(
      (hole: Hole) =>
        (hole.grass.y = this._newHeight - this._gameScene.grass.height - 50)
    );
  }
  private _endSceneResize(): void {
    this._endSceneContainer.position.set(
      (this._newWidth - this._endSceneContainer.width) / 2,
      (this._newHeight - this._endSceneContainer.height) / 2
    );
  }
}
