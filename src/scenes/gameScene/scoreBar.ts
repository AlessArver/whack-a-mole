import { gameSceneBackgroundSound } from "../../sounds";
import { ScoreBarOptions } from "../../types/types";

export class ScoreBar {
  private _container: any;
  private _timer: any;
  private _score: any;

  constructor(options: ScoreBarOptions) {
    this._container = options.container;

    this._score = new window.PIXI.Text(`Score: ${window.scoreCount}`);
    this._score.position.set(0, 0);
    this._container.addChild(this._score);

    this._timer = new window.PIXI.Text(`Timer: ${window.countTime}s`);
    this._timer.position.set(150, 0);
    this._container.addChild(this._timer);

    this._createStopButton();
  }

  public update(countTime: number, scoreCount: number) {
    this._timer.text = `Timer: ${countTime}s`;
    this._score.text = `Score: ${scoreCount}`;
  }

  private _stopButtonMousedown = (e) => {
    window.stopGame = !window.stopGame;
    switch (window.stopGame) {
      case false:
        gameSceneBackgroundSound.play();
        break;
      case true:
        gameSceneBackgroundSound.stop();
        break;
    }
  };

  private _createStopButton = () => {
    let stopButton = new window.PIXI.Container();
    let stopButtonText = new window.PIXI.Text("Stop");
    stopButton.position.set(350, 0);

    stopButton.interactive = true;

    stopButton.on("mousedown", this._stopButtonMousedown);
    stopButton.addChild(stopButtonText);
    this._container.addChild(stopButton);
  };
}
