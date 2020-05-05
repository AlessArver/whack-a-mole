import { showMoles } from "./mole/mole";
import { gameSceneBackgroundSound } from "../../sounds";

export class ScoreBar {
  private _container;
  private _timer;
  private _score;

  constructor() {
    this._container = new window.PIXI.Container();
    this._container.width = 234;

    this._score = new window.PIXI.Text(`Score: ${window.scoreCount}`);
    this._score.position.set(0, 0);
    this._container.addChild(this._score);

    this._timer = new window.PIXI.Text(`Timer: ${window.countTime}s`);
    this._timer.position.set(150, 0);
    this._container.addChild(this._timer);

    this._createStopButton();
  }

  get container() {
    return this._container;
  }

  public update(countTime: number, scoreCount: number) {
    this._timer.text = `Timer: ${countTime}s`;
    this._score.text = `Score: ${scoreCount}`;
  }

  public resize = (width: number, height: number) => {
      this._container.position.set((width - this._container.width) / 2, 0)
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