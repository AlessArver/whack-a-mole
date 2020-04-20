import { hole } from "./hole";
import { scoreBar } from "./scoreBar";
export const gameScene = () => {
    let holee = new window.PIXI.Container(), moles = new window.PIXI.Container();
    let whiteBackground = new window.PIXI.Graphics();
    whiteBackground.beginFill(0xffffff);
    whiteBackground.drawRect(0, 410, window.app.view.width, 400);
    whiteBackground.endFill();
    window.gameSceneContainer.addChild(whiteBackground);
    window.gameSceneContainer.sortableChildren = true;
    holee.zIndex = 2;
    whiteBackground.zIndex = 1;
    moles.zIndex = 0;
    scoreBar();
    hole(holee);
};
//# sourceMappingURL=gameScene.js.map