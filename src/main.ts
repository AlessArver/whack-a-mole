import * as PIXI from "pixi.js";
import TWEEN from "@tweenjs/tween.js";
import { GameScene } from "./scenes/gameScene/gameScene";
import { StartScene } from "./scenes/start";
import { EndScene } from "./scenes/endScene";
import { gameSceneBackgroundSound } from "./sounds";

// Responsive app
const logicalWidth: number = 320;
const logicalHeight: number = 240;

class Game {
  private _data = {
    countTime: 120,
    scoreCount: 0,
    hitMoleCount: 0,
    missesCount: 0,
    stopGame: true
  }
  private _app;

  private _startScene;
  private _gameScene;
  private _endScene;

  constructor() {
    this._app = new PIXI.Application({
      autoDensity: true,
      transparent: true,
    });
    window.app = this._app;
    document.body.appendChild(this._app.view);
    window.addEventListener("resize", this.resize);
    this.initCanvasStyles();
    this.resize();
    this.setup();
  }

  private setup() {
    // let loader = new PIXI.Loader();
    window.loader
      .add("../assets/imgs/grass.png")
      .add("../assets/imgs/moles.png")
      .add("../assets/imgs/moles_dead.png")
      .load(() => {
        this._startScene = new StartScene();
        this._gameScene = new GameScene();
        this._endScene = new EndScene()

        this.scenesSettings();
      });
  }

  private scenesSettings () {
    this._startScene.container.visible = true
    window.app.stage.addChild(this._startScene.container);

    const endOfTheGame = (): void => {
      setInterval(() => {
        if (window.countTime === 0) {
          window.gameSceneContainer.visible = false;
          window.app.stage.removeChild(window.gameSceneContainer);

          this._endScene.container.visible = true;
          window.app.stage.addChild(this._endScene.container);

          window.stopGame = true;

          gameSceneBackgroundSound.stop()
        }
      }, 1000);
    };
    endOfTheGame();
  };

  private resize = () => {
    const scaleFactor = Math.min(
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
  }

  private initCanvasStyles() {
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

    gameSceneContainer: any;

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

window.gameSceneContainer = new window.PIXI.Container();

window.countTime = 120;
window.scoreCount = 0;
window.hitMoleCount = 0;
window.missesCount = 0;

window.stopGame = true;

let animate = () => {
  requestAnimationFrame(animate);
  TWEEN.update();
};
animate();

const newGame = new Game();