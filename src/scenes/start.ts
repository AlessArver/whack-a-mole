import {buttonClickSound, gameSceneBackgroundSound} from "../sounds";

export class StartScene {
  private _data = {
    beginFill: 0xffffff,
  
    buttonTextColor: 0x000000,
    buttonTextMouseOver: 0xffffff
  }
  private _style;
  private _startButton;

  constructor() {
    this._style = new window.PIXI.TextStyle({
      fontFamily: "sans-serif",
      fontSize: 50,
      align: "center",
    });
    
    this.createShowButton();
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
      window.startSceneContainer.visible = false;
      window.app.stage.removeChild(window.startSceneContainer);

      window.gameSceneContainer.visible = true;
      window.app.stage.addChild(window.gameSceneContainer);

      window.stopGame = false;

      gameSceneBackgroundSound.play();
    }, 500)
  }

  createShowButton() {
    const buttonText = new window.PIXI.Text("Start", this._style);

    buttonText.position.set(45, 2);

    let startButton = new window.PIXI.Graphics();
    startButton.lineStyle(4, 0x00000, 1);
    startButton.beginFill(this._data.beginFill);
    startButton.drawRect(0, 0, 200, 64);
    startButton.endFill();
    setInterval(() => {
      startButton.position.set(
        (window.app.view.width - startButton.width) / 2,
        (window.app.view.height - startButton.height) / 2
      );
    }, 1000);

    startButton.interactive = true;

    startButton.on("mouseover", this._startMouseover);
    startButton.on("mouseout", this._startMouseout);
    startButton.on("mousedown", this._startMousedown);

    startButton.addChild(buttonText);
    this._startButton = startButton;
    window.startSceneContainer.addChild(this._startButton);

    const animate = () => {
      requestAnimationFrame(animate);
      window.app.render(startButton);
    };
  }
}