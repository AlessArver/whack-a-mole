import { gameSceneBackgroundSound } from "./../../sounds";
import { hole } from "./hole";
import { mole } from "./mole";
import { scoreBar } from "./scoreBar";
export const gameScene = (app, loader, PIXI, TWEEN, gameSceneContainer) => {
    gameSceneBackgroundSound.play();
    let holee = new PIXI.Container(), moles = new PIXI.Container();
    console.log(app);
    scoreBar(PIXI, gameSceneContainer);
    hole(PIXI, loader, gameSceneContainer, holee);
    mole(app, loader, PIXI, TWEEN, gameSceneContainer, moles);
};
//# sourceMappingURL=gameScene.js.map