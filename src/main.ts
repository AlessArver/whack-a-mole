import * as PIXI from "pixi.js";
import TWEEN from "@tweenjs/tween.js";
import { GameScene } from "./scenes/gameScene/gameScene";
import { StartScene } from "./scenes/start";
import { EndScene } from "./scenes/endScene";
import { gameSceneBackgroundSound } from "./sounds";
import { MainDataOptions } from "./types/types";
import { Hole } from "./scenes/gameScene/hole";

// Responsive app
const logicalWidth: number = 320;
const logicalHeight: number = 240;

class Game {
  private _data: MainDataOptions = {
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

  private _startSceneContainer: any;
  private _gameSceneContainer: any;
  private _endSceneContainer: any;

  constructor() {
    this._app = new PIXI.Application({
      autoDensity: true,
      transparent: true,
    });
    window.app = this._app;
    document.body.appendChild(this._app.view);
    this._startSceneContainer = new PIXI.Container();
    this._gameSceneContainer = new PIXI.Container();
    this._endSceneContainer = new PIXI.Container();
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
          container: this._startSceneContainer,
          onGameStart: this._startGame,
        });
        this._gameScene = new GameScene({
          container: this._gameSceneContainer,
        });
        this._endScene = new EndScene({
          container: this._endSceneContainer,
          onTryAgain: this.tryAgain,
        });

        this.scenesSettings();
        this.resize();
      });
  }

  private scenesSettings(): void {
    this._startSceneContainer.visible = true;
    window.app.stage.addChild(this._startSceneContainer);

    const endOfTheGame = (): void => {
      setInterval((): void => {
        if (window.countTime === 0) {
          this._gameSceneContainer.visible = false;
          window.app.stage.removeChild(this._gameSceneContainer);

          this._endSceneContainer.visible = true;
          window.app.stage.addChild(this._endSceneContainer);

          window.stopGame = true;

          gameSceneBackgroundSound.stop();
        }
      }, 1000);
    };
    endOfTheGame();
  }

  private tryAgain = (): void => {
    this._endSceneContainer.visible = false;
    window.app.stage.removeChild(this._endSceneContainer);

    window.app.stage.addChild(this._gameSceneContainer);
    this._gameSceneContainer.visible = true;

    window.stopGame = false;
    window.countTime = 120;
    window.scoreCount = 0;
    window.missesCount = 0;

    gameSceneBackgroundSound.play();
  };

  private _startGame = (): void => {
    this._startSceneContainer.visible = false;
    window.app.stage.removeChild(this._startSceneContainer);

    this._gameSceneContainer.visible = true;
    window.app.stage.addChild(this._gameSceneContainer);

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

    this._startSceneContainer.position.set(
      (newWidth - this._startSceneContainer.width) / 2,
      (newHeight - this._startSceneContainer.height) / 2
    );

    this._gameScene.gameSceneData.whiteBackground.y =
      newHeight - this._gameScene.gameSceneData.whiteBackground.height + 50;
    this._gameScene.gameSceneData.holesContainer.x =
      (newWidth - this._gameScene.gameSceneData.holesContainer.width) / 2;
    this._gameScene.gameSceneData.scoreBarContainer.x =
      (newWidth - this._gameScene.gameSceneData.scoreBarContainer.width) / 2;
    this._gameScene.gameSceneData.holes.forEach(
      (hole: Hole) =>
        (hole.grass.y = newHeight - this._gameScene.grass.height - 50)
    );

    this._endSceneContainer.position.set(
      (newWidth - this._endSceneContainer.width) / 2,
      (newHeight - this._endSceneContainer.height) / 2
    );
  };

  private initCanvasStyles(): void {
    this._app.view.style.display = "block";
    this._app.view.style.margin = "auto";
    this._app.view.style.border = "5px solid black";
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
