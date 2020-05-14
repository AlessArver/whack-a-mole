import { gameSceneBackgroundSound } from "../../sounds";

type ScoreBarOptions = {
  container: PIXI.Container;
};

export class ScoreBar {
  private _container: PIXI.Container;
  private _timer: PIXI.Text;
  private _timerContainer: PIXI.Container;
  private _score: PIXI.Text;
  private _stopButton: PIXI.Sprite;
  private _stopMusic: PIXI.Sprite;

  constructor(options: ScoreBarOptions) {
    this._container = options.container;

    const scoreTexture: PIXI.Texture =
      window.loader.resources["./assets/imgs/icons/score.svg"].texture;
    const scoreSprite: PIXI.Sprite = new window.PIXI.Sprite(scoreTexture);
    scoreSprite.width = 35;
    scoreSprite.height = 35;
    scoreSprite.position.set(0, 10);
    this._container.addChild(scoreSprite);

    this._score = new window.PIXI.Text(`${window.scoreCount}`);
    this._score.position.set(60, 10);
    this._container.addChild(this._score);

    this._timerContainer = new window.PIXI.Container();

    const clockTexture: PIXI.Texture =
      window.loader.resources["./assets/imgs/icons/clock.svg"].texture;
    const clockSprite: PIXI.Sprite = new window.PIXI.Sprite(clockTexture);
    clockSprite.width = 35;
    clockSprite.height = 35;
    clockSprite.position.set(150, 10);
    this._container.addChild(clockSprite);

    this._timer = new window.PIXI.Text(`${window.countTime}`);
    this._timer.position.set(200, 10);
    this._container.addChild(this._timer);

    this._createStopButton();
    this._createStopMusicButton();
  }

  public update(countTime: number, scoreCount: number): void {
    this._timer.text = `${countTime}`;
    this._score.text = `${scoreCount}`;
  }

  private _stopButtonMousedown = (
    stopButtonTexture: PIXI.Texture,
    stopButton: PIXI.Sprite
  ): void => {
    stopButton.on("mousedown", (): void => {
      window.stopGame = !window.stopGame;
      switch (window.stopGame) {
        case false:
          stopButton.texture = stopButtonTexture;
          break;
        case true:
          stopButton.texture =
            window.loader.resources["./assets/imgs/icons/pause.svg"].texture;
          break;
      }
    });
  };
  private _stopMusicMousedown = (
    stopMusicTexture: PIXI.Texture,
    stopMusic: PIXI.Sprite
  ): void => {
    stopMusic.on("mousedown", (): void => {
      window.stopMusic = !window.stopMusic;
      if (window.stopMusic) {
        stopMusic.texture =
          window.loader.resources["./assets/imgs/icons/nomusic.svg"].texture;
        gameSceneBackgroundSound.stop();
      } else {
        stopMusic.texture = stopMusicTexture;
        gameSceneBackgroundSound.play();
      }
    });
  };

  private _createStopButton = (): void => {
    const stopButtonTexture: PIXI.Texture =
      window.loader.resources["./assets/imgs/icons/play.svg"].texture;
    this._stopButton = new window.PIXI.Sprite(stopButtonTexture);
    this._stopButton.width = 35;
    this._stopButton.height = 35;
    this._stopButton.position.set(300, 10);

    this._stopButton.interactive = true;

    this._stopButtonMousedown(stopButtonTexture, this._stopButton);
    this._container.addChild(this._stopButton);
  };
  private _createStopMusicButton = (): void => {
    const stopMusicTexture: PIXI.Texture =
      window.loader.resources["./assets/imgs/icons/music.svg"].texture;
    this._stopMusic = new window.PIXI.Sprite(stopMusicTexture);
    this._stopMusic.width = 35;
    this._stopMusic.height = 35;
    this._stopMusic.position.set(400, 10);

    this._stopMusic.interactive = true;
    this._stopMusicMousedown(stopMusicTexture, this._stopMusic);
    this._container.addChild(this._stopMusic);
  };

  get stopButton(): PIXI.Sprite {
    return this._stopButton;
  }
  get stopMusic(): PIXI.Sprite {
    return this._stopMusic;
  }
}
