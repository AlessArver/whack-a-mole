import { scenesSettings } from "./scenesSettings";
import { gameScene } from "./gameScene/gameScene";
import { startScene } from "./start";
import { endScene } from "./endScene";

export const Scenes = (app, loader, TWEEN) => {
  let startSceneContainer = new window.PIXI.Container();
  let gameSceneContainer = new window.PIXI.Container();
  let endSceneContainer = new window.PIXI.Container();

  scenesSettings(
    app,
    startSceneContainer,
    gameSceneContainer,
    endSceneContainer
  );
  console.log(app.view.width)

  startScene(app, startSceneContainer, gameSceneContainer);
  gameScene(app, loader, TWEEN, gameSceneContainer);
  endScene(app, endSceneContainer);
};
