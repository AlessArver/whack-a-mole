import { buttonClickSound } from "../sounds";

type StartSceneOptions = {
  app: any;
  onGameStart: () => void;
};
type StartSceneDataOptions = {
  beginFill: number;
  buttonTextColor: number;
  buttonTextMouseOver: number;
};

export class StartScene {
  private _data: StartSceneDataOptions = {
    beginFill: 0xffffff,
    buttonTextColor: 0x000000,
    buttonTextMouseOver: 0xffffff,
  };
  private _style: PIXI.TextStyle;
  private _startButton: PIXI.Graphics;
  public _app: any;
  private _container: PIXI.Container;
  private _onGameSceneCallback: () => void;

  constructor(options: StartSceneOptions) {
    this._app = options.app;
    this._container = new PIXI.Container();
    this._onGameSceneCallback = options.onGameStart;
    this._style = new window.PIXI.TextStyle({
      fontFamily: "sans-serif",
      fontSize: 50,
      align: "center",
    });

    this._createShowButton();
  }

  get container(): PIXI.Container {
    return this._container;
  }

  private _startMouseover = (): void => {
    this._startButton.tint = 0x000000;
    this._style.fill = this._data.buttonTextMouseOver;
  };

  private _startMouseout = (): void => {
    this._startButton.tint = this._data.beginFill;
    this._style.fill = this._data.buttonTextColor;
  };

  private _startMousedown = (): void => {
    buttonClickSound.play();

    setTimeout((): void => {
      this._onGameSceneCallback();
    }, 500);
  };

  private _createShowButton(): void {
    const buttonText: any = new window.PIXI.Text("Start", this._style);

    buttonText.position.set(45, 2);

    this._startButton = new window.PIXI.Graphics();
    this._startButton.lineStyle(4, 0x00000, 1);
    this._startButton.beginFill(this._data.beginFill);
    this._startButton.drawRect(0, 0, 200, 64);
    this._startButton.endFill();

    this._startButton.interactive = true;

    this._startButton.on("mouseover", this._startMouseover);
    this._startButton.on("mouseout", this._startMouseout);
    this._startButton.on("mousedown", this._startMousedown);

    this._startButton.addChild(buttonText);
    this._container.addChild(this._startButton);

    const animate = (): void => {
      requestAnimationFrame(animate);
      this._app.render(this._startButton);
    };
  }

  public resize(newWidth: number, newHeight: number): void {
    this._container.position.set(
      (newWidth - this._container.width) / 2,
      (newHeight - this._container.height) / 2
    );
  }
}
