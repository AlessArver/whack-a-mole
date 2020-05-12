import { gameSceneBackgroundSound } from "../../sounds";

type ScoreBarOptions = {
  container: PIXI.Container;
};

export class ScoreBar {
  private _container: PIXI.Container;
  private _timer: PIXI.Text;
  private _timerContainer: PIXI.Container;
  private _score: PIXI.Text;

  constructor(options: ScoreBarOptions) {
    this._container = options.container;

    const scoreTexture =
      window.loader.resources["../assets/imgs/icons/score.svg"].texture;
    const scoreSprite = new window.PIXI.Sprite(scoreTexture)
    scoreSprite.width = 35;
    scoreSprite.height = 35;
    scoreSprite.position.set(0, 10)
    this._container.addChild(scoreSprite)


    this._score = new window.PIXI.Text(`${window.scoreCount}`);
    this._score.position.set(60, 10);
    this._container.addChild(this._score);

    this._timerContainer = new window.PIXI.Container();

    const clockTexture =
      window.loader.resources["../assets/imgs/icons/clock.svg"].texture;
    const clockSprite = new window.PIXI.Sprite(clockTexture);
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

  private _stopButtonMousedown = (stopButtonTexturePause, stopButton): void => {
    stopButton.on("mousedown", () => {
      window.stopGame = !window.stopGame;
      switch (window.stopGame) {
        case false:
          stopButton.texture = stopButtonTexturePause;
          break;
        case true:
          const stopButtonTexturePlay =
            window.loader.resources["../assets/imgs/icons/play.svg"].texture;
          stopButton.texture = stopButtonTexturePlay;
          break;
      }
    });
  };
  private _stopMusicMousedown = (
    stopMusicTexture: PIXI.Texture,
    stopMusic: PIXI.Sprite,
    isStopMusic: boolean
  ): void => {
    stopMusic.on("mousedown", () => {
      isStopMusic = !isStopMusic;
      if (isStopMusic) {
        const stopMusicTextureStop =
          window.loader.resources["../assets/imgs/icons/nomusic.svg"].texture;
        stopMusic.texture = stopMusicTextureStop;
        gameSceneBackgroundSound.stop();
      } else {
        stopMusic.texture = stopMusicTexture;
        gameSceneBackgroundSound.play();
      }
    });
  };

  private _createStopButton = (): void => {
    const stopButtonTexture =
      window.loader.resources["../assets/imgs/icons/pause.svg"].texture;
    const stopButton = new window.PIXI.Sprite(stopButtonTexture);
    stopButton.width = 35;
    stopButton.height = 35;
    stopButton.position.set(300, 10);

    stopButton.interactive = true;

    this._stopButtonMousedown(stopButtonTexture, stopButton);
    this._container.addChild(stopButton);
  };
  private _createStopMusicButton = () => {
    const stopMusicTexture: PIXI.Texture =
      window.loader.resources["../assets/imgs/icons/music.svg"].texture;
    const stopMusic: PIXI.Sprite = new window.PIXI.Sprite(stopMusicTexture);
    stopMusic.width = 35;
    stopMusic.height = 35;
    stopMusic.position.set(400, 10);

    let isStopMusic: boolean = false;

    stopMusic.interactive = true;
    this._stopMusicMousedown(stopMusicTexture, stopMusic, isStopMusic);

    this._container.addChild(stopMusic);
  };
}
