import * as PIXI from "pixi.js";
import TWEEN from "tween";

import { Scenes } from "./scenes/scenes";

// const app = new PIXI.Application({
//   width: window.innerWidth,
//   height: window.innerHeight,
//   resizeTo: window,
//   transparent: true,
// });
// document.body.appendChild(app.view);

declare global {
  interface Window {
    countTime: number;
    hitMole: any;
    misses: number
    score: any;
    scoreCount: number;
    hitMoleCount: number;
    stopGame: boolean;
    PIXI: any;
    mainContainer: any;
    startSceneContainer: any;
    gameSceneContainer: any;
    endSceneContainer: any;
    TWEEN: any;
    loader: any;
    renderer: any;
    app: any;
  }
}
window.countTime = 120;
window.misses = 0
window.scoreCount = 0;
window.hitMoleCount = 0;
window.hitMole = new PIXI.Text(`Hit: ${window.hitMoleCount}`);
window.stopGame = true;
window.PIXI = PIXI;
window.score = new window.PIXI.Text(`Score: ${window.scoreCount}`);
window.mainContainer = new window.PIXI.Container();
window.startSceneContainer = new window.PIXI.Container();
window.gameSceneContainer = new window.PIXI.Container();
window.endSceneContainer = new window.PIXI.Container();
window.TWEEN = TWEEN;
window.loader = new PIXI.Loader();
window.renderer = new PIXI.Renderer();

const logicalWidth = 320;
const logicalHeight = 240;

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
  const newWidth = Math.ceil(logicalWidth * scaleFactor);
  const newHeight = Math.ceil(logicalHeight * scaleFactor);

  app.view.style.width = `${newWidth}px`;
  app.view.style.height = `${newHeight}px`;

  app.view.width = newWidth;
  app.view.height = newHeight;

  app.view.style.display = "block";
  app.view.style.margin = "auto";
  app.view.style.border = "5px solid black";

  app.resize(newWidth, newHeight);
  // window.startSceneContainer.scale.set(scaleFactor);
  // window.gameSceneContainer.scale.set(scaleFactor);
}

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
