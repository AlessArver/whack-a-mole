import * as PIXI from "pixi.js";
import TWEEN from "tween";
import { Scenes } from "./scenes/scenes";

declare global {
  interface Window {
    TWEEN: any;

    PIXI: any;
    app: any;

    loader: any;
    renderer: any;

    startSceneContainer: any;
    gameSceneContainer: any;
    endSceneContainer: any;

    countTime: number;
    scoreCount: number;
    hitMoleCount: number;
    missesCount: number;

    score: any;
    hitMole: any;

    stopGame: boolean;
  }
}
window.TWEEN = TWEEN;

window.PIXI = PIXI;

window.loader = new PIXI.Loader();
window.renderer = new PIXI.Renderer();

window.startSceneContainer = new window.PIXI.Container();
window.gameSceneContainer = new window.PIXI.Container();
window.endSceneContainer = new window.PIXI.Container();

window.countTime = 120;
window.scoreCount = 0;
window.hitMoleCount = 0;
window.missesCount = 0;

window.score = new window.PIXI.Text(`Score: ${window.scoreCount}`);
window.hitMole = new PIXI.Text(`Hit: ${window.hitMoleCount}`);

window.stopGame = true;

// Responsive app
const logicalWidth: number = 320;
const logicalHeight: number = 240;

const app = new PIXI.Application({
  autoResize: true,
  transparent: true,
});
document.body.appendChild(app.view);

function resize() {
  const scaleFactor = Math.min(
    window.innerWidth / logicalWidth,
    window.innerHeight / logicalHeight
  );
  const newWidth: number = Math.ceil(logicalWidth * scaleFactor);
  const newHeight: number = Math.ceil(logicalHeight * scaleFactor);

  app.view.style.width = `${newWidth}px`;
  app.view.style.height = `${newHeight}px`;

  app.view.width = newWidth;
  app.view.height = newHeight;

  app.view.style.display = "block";
  app.view.style.margin = "auto";
  app.view.style.border = "5px solid black";

  app.resize(newWidth, newHeight);
}
resize()
window.addEventListener("resize", resize);
window.app = app;

let animate = () => {
  requestAnimationFrame(animate);
  TWEEN.update();
};
animate();

const setup = () => {
  Scenes();
};

window.loader
  .add("../assets/imgs/grass.png")
  .add("../assets/imgs/moles.png")
  .add("../assets/imgs/moles_dead.png")
  .load(setup);

const play = (delta) => {};
