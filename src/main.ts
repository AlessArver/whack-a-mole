import * as PIXI from "pixi.js";
import TWEEN from "@tweenjs/tween.js";
import { GameScene } from "./scenes/gameScene/gameScene";
import { StartScene } from "./scenes/start";
import { EndScene } from "./scenes/endScene";
import { gameSceneBackgroundSound } from "./sounds";
import { ScenesSettings } from "./scenes/scenesSettings";

// Responsive app
const logicalWidth: number = 320;
const logicalHeight: number = 240;

class Game {
  private _app: any;

  private _startScene: StartScene;
  private _gameScene: GameScene;
  private _endScene: EndScene;

  private _sceneSettings: ScenesSettings;

  constructor() {
    this._app = new PIXI.Application({
      autoDensity: true,
      transparent: true,
    });
    window.app = this._app;
    document.body.appendChild(this._app.view);
    window.addEventListener("resize", this.resize);
    this.initCanvasStyles();
    this.setup();
  }

  private setup(): void {
    window.loader
      .add("../assets/imgs/grass.png")
      .add("../assets/imgs/moles.png")
      .add("../assets/imgs/moles_dead.png")
      .add("../assets/imgs/icons/clock.svg")
      .add("../assets/imgs/icons/pause.svg")
      .add("../assets/imgs/icons/play.svg")
      .add("../assets/imgs/icons/music.svg")
        .add("../assets/imgs/icons/nomusic.svg")
        .add("../assets/imgs/icons/score.svg")
      .load((): void => {
        this._startScene = new StartScene({
          app: this._app,
          onGameStart: this._startGame,
        });
        this._gameScene = new GameScene();
        this._endScene = new EndScene({
          onTryAgain: this.tryAgain,
        });

        this._sceneSettings = new ScenesSettings({
          app: this._app,
          gameSceneContainer: this._gameScene.container,
          startSceneContainer: this._startScene.container,
          endSceneContainer: this._endScene.container,
        });
        this._sceneSettings.setStartScene();
        this._waitWhenGameToEnd();
        this.resize();
      });
  }

  private _waitWhenGameToEnd(): void {
    setInterval((): void => {
      if (window.countTime === 0) {
        this._endScene.setGameEndData(
          window.scoreCount,
          window.hitMoleCount,
          window.missesCount
        );
        this._sceneSettings.setEndScene();

        window.stopGame = true;
        gameSceneBackgroundSound.stop();
      }
    }, 1000);
  }

  private tryAgain = (): void => {
    window.stopGame = false;
    window.countTime = 120;
    window.scoreCount = 0;
    window.hitMoleCount = 0;
    window.missesCount = 0;

    this._sceneSettings.setGameScene();

    gameSceneBackgroundSound.play();
  };

  private _startGame = (): void => {
    this._sceneSettings.setGameScene();

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

    this._startScene.resize(newWidth, newHeight);
    this._gameScene.resize(newWidth, newHeight);
    this._endScene.resize(newWidth, newHeight);
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
    PIXI: any;
    app: any;

    loader: PIXI.Loader;

    countTime: number;
    scoreCount: number;
    hitMoleCount: number;
    missesCount: number;

    stopGame: boolean;
  }
}
window.PIXI = PIXI;

window.loader = new PIXI.Loader();

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
