import {buttonClickSound, gameSceneBackgroundSound} from "../sounds";

type StartSceneOptions = {
  onGameStart: () => void
}

export class StartScene {
  private _data = {
    beginFill: 0xffffff,

    buttonTextColor: 0x000000,
    buttonTextMouseOver: 0xffffff
  }
  private _style;
  private _startButton;
  private _container;
  private _onGameSceneCallback

  constructor(options: StartSceneOptions) {
    this._onGameSceneCallback = options.onGameStart;
    this._style = new window.PIXI.TextStyle({
      fontFamily: "sans-serif",
      fontSize: 50,
      align: "center",
    });

    this._container = new window.PIXI.Container();
    this._createShowButton();
  }

  get container() {
    return this._container;
  }

  private _startMouseover = (e) => {
    this._startButton.tint = 0x000000;
    this._style.fill = this._data.buttonTextMouseOver;
  }

  private _startMouseout = (e) => {
    this._startButton.tint = this._data.beginFill;
    this._style.fill = this._data.buttonTextColor;
  }

  private _startMousedown = () => {
    buttonClickSound.play()

    setTimeout(() => {
      this._onGameSceneCallback();
    }, 500)
  }

  public resize(width: number, height: number) {
    this._startButton.position.set(
      (width - this._startButton.width) / 2,
      (height - this._startButton.height) / 2
    );
  }

  private _createShowButton() {
    const buttonText = new window.PIXI.Text("Start", this._style);

    buttonText.position.set(45, 2);

    let startButton = new window.PIXI.Graphics();
    startButton.lineStyle(4, 0x00000, 1);
    startButton.beginFill(this._data.beginFill);
    startButton.drawRect(0, 0, 200, 64);
    startButton.endFill();


    startButton.interactive = true;

    startButton.on("mouseover", this._startMouseover);
    startButton.on("mouseout", this._startMouseout);
    startButton.on("mousedown", this._startMousedown);

    startButton.addChild(buttonText);
    this._startButton = startButton;
    this._container.addChild(this._startButton);

    const animate = () => {
      requestAnimationFrame(animate);
      window.app.render(startButton);
    };
  }
}