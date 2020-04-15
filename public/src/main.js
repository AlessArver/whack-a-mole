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
let loader = new PIXI.Loader();
let animate = () => {
    requestAnimationFrame(animate);
    TWEEN.update();
};
animate();
const setup = () => {
    Scenes(app, loader, PIXI, TWEEN);
};
loader.add("../assets/imgs/grass.png").add("../assets/imgs/moles.png").load(setup);
const play = (delta) => { };
//# sourceMappingURL=main.js.map