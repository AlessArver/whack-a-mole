import * as PIXI from "pixi.js";
import TWEEN from "tween";
import { Scenes } from "./scenes/scenes";
const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    resizeTo: window,
    transparent: true,
});
document.body.appendChild(app.view);
window.countTime = 120;
window.scoreCount = 0;
window.hitMoleCount = 0;
window.hitMole = new PIXI.Text(`Hit: ${window.hitMoleCount}`);
window.stopGame = true;
window.PIXI = PIXI;
window.score = new window.PIXI.Text(`Score: ${window.scoreCount}`);
window.startSceneContainer = new window.PIXI.Container();
window.gameSceneContainer = new window.PIXI.Container();
window.endSceneContainer = new window.PIXI.Container();
window.TWEEN = TWEEN;
window.loader = new PIXI.Loader();
window.renderer = new PIXI.Renderer();
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
const play = (delta) => { };
//# sourceMappingURL=main.js.map