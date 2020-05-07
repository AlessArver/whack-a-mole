import * as PIXI from "pixi.js";
import TWEEN from "@tweenjs/tween.js";
import { GameScene } from "./scenes/gameScene/gameScene";
import { StartScene } from "./scenes/start";
import { EndScene } from "./scenes/endScene";
import { gameSceneBackgroundSound } from "./sounds";
import { Hole } from "./scenes/gameScene/hole";
import { ScenesSettings } from "./scenes/scenesSettings";

type MainDataOptions = {
  TWEEN: any;
  startSceneContainer: any;
  gameSceneContainer: any;
  endSceneContainer: any;
  countTime: number;
  scoreCount: number;
  hitMoleCount: number;
  missesCount: number;
  stopGame: boolean;
};

// Responsive app
const logicalWidth: number = 320;
const logicalHeight: number = 240;

class Game {
  private _data: MainDataOptions = {
    TWEEN: TWEEN,
    startSceneContainer: new PIXI.Container(),
    gameSceneContainer: new PIXI.Container(),
    endSceneContainer: new PIXI.Container(),
    countTime: 120,
    scoreCount: 0,
    hitMoleCount: 0,
    missesCount: 0,
    stopGame: true,
  };
  private _app: any;

  private _startScene: any;
  private _gameScene: any;
  private _endScene: any;

  private _sceneSettings: any;

  constructor() {
    this._app = new PIXI.Application({
      autoDensity: true,
      transparent: true,
    });
    window.app = this._app;
    document.body.appendChild(this._app.view);
    this._data.startSceneContainer = new PIXI.Container();
    this._data.gameSceneContainer = new PIXI.Container();
    this._data.endSceneContainer = new PIXI.Container();
    window.addEventListener("resize", this.resize);
    this.initCanvasStyles();
    this.setup();
  }

  private setup(): void {
    window.loader
      .add("../assets/imgs/grass.png")
      .add("../assets/imgs/moles.png")
      .add("../assets/imgs/moles_dead.png")
      .load((): void => {
        this._startScene = new StartScene({
          app: this._app,
          container: this._data.startSceneContainer,
          onGameStart: this._startGame,
        });
        this._gameScene = new GameScene({
          TWEEN: this._data.TWEEN,
          container: this._data.gameSceneContainer,
        });
        this._endScene = new EndScene({
          container: this._data.endSceneContainer,
          onTryAgain: this.tryAgain,
        });

        this._sceneSettings = new ScenesSettings({
          app: this._app,
          gameScene: this._gameScene,
          startSceneContainer: this._data.startSceneContainer,
          gameSceneContainer: this._data.gameSceneContainer,
          endSceneContainer: this._data.endSceneContainer,
        });
        this._sceneSettings.endOfTheGame();
        this.resize();
      });
  }

  private tryAgain = (): void => {
    this._data.endSceneContainer.visible = false;
    this._app.stage.removeChild(this._data.endSceneContainer);

    this._app.stage.addChild(this._data.gameSceneContainer);
    this._data.gameSceneContainer.visible = true;

    window.stopGame = false;
    window.countTime = 120;
    window.scoreCount = 0;
    window.missesCount = 0;

    gameSceneBackgroundSound.play();
  };

  private _startGame = (): void => {
    this._data.startSceneContainer.visible = false;
    this._app.stage.removeChild(this._data.startSceneContainer);

    this._data.gameSceneContainer.visible = true;
    this._app.stage.addChild(this._data.gameSceneContainer);

    window.stopGame = false;
    gameSceneBackgroundSound.play();
  };

  private resize = (): void => {
    const scaleFactor: number = Math.min(
      window.innerWidth / logicalWidth,
      window.innerHeight / logicalHeight
    );
    const newWidth: number = Math.ceil(logicalWidth * scaleFactor);
    const newHeight: number = Math.ceil(logicalHeight * scaleFactor);

    this._app.view.style.width = `${newWidth}px`;
    this._app.view.style.height = `${newHeight}px`;

    this._app.view.width = newWidth;
    this._app.view.height = newHeight;

    this._app.resize(newWidth, newHeight);

    this._sceneSettings.resize(newWidth, newHeight);
  };

  private initCanvasStyles(): void {
    let appStyle = this._app.view.style;
    appStyle.display = "block";
    appStyle.margin = "auto";
    appStyle.border = "5px solid black";
  }
}
declare global {
  interface Window {
    TWEEN: any;

    PIXI: any;
    app: any;

    loader: any;
    renderer: any;

    countTime: number;
    scoreCount: number;
    hitMoleCount: number;
    missesCount: number;

    stopGame: boolean;
  }
}
window.TWEEN = TWEEN;

window.PIXI = PIXI;

window.loader = new PIXI.Loader();
window.renderer = new PIXI.Renderer();

window.countTime = 120;
window.scoreCount = 0;
window.hitMoleCount = 0;
window.missesCount = 0;

window.stopGame = true;

let animate = (): void => {
  requestAnimationFrame(animate);
  TWEEN.update();
};
animate();

const newGame = new Game();
