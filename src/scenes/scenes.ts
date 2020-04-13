import { scenesSettings } from "./scenesSettings";
import { gameScene } from "./gameScene/gameScene";
import { startScene } from "./start";
import { endScene } from "./endScene";

export const Scenes = (app, loader, PIXI) => {
  let startSceneContainer = new PIXI.Container();
  let gameSceneContainer = new PIXI.Container();
  let endSceneContainer = new PIXI.Container();

  scenesSettings(
    app,
    startSceneContainer,
    gameSceneContainer,
    endSceneContainer
  );

  startScene(app, PIXI, startSceneContainer, gameSceneContainer);
  gameScene(app, loader, PIXI, gameSceneContainer);
  endScene(app, PIXI, endSceneContainer);
};
