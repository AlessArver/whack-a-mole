import * as PIXI from "pixi.js";

import { Scenes } from "./scenes/scenes";

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  resizeTo: window,
  transparent: true,
});
document.body.appendChild(app.view);

declare global {
  interface Window {
    countTime: number;
    hitMole: any;
    scoreCount: number;
    hitMoleCount: number;
    stopGame: boolean;
  }
}
window.countTime = 120;
window.scoreCount = 0;
window.hitMoleCount = 0;
window.hitMole = new PIXI.Text(`Hit: ${window.hitMoleCount}`);
window.stopGame = true;

let loader = new PIXI.Loader();

const setup = () => {
  Scenes(app, loader, PIXI);
};

loader.add("./assets/imgs/moles.png").load(setup);

const play = (delta) => {};
