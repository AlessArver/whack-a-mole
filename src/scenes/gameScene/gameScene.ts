import { gameSceneBackgroundSound } from "./../../sounds";
import { hole } from "./hole";
import { mole } from "./mole";
import { scoreBar } from "./scoreBar";

export const gameScene = (app, loader, TWEEN, gameSceneContainer) => {
  gameSceneBackgroundSound.play();

  let holee = new window.PIXI.Container(),
    moles = new window.PIXI.Container();

  gameSceneContainer.sortableChildren = true;

  holee.zIndex = 1;
  moles.zIndex = 0;

  console.log(gameSceneContainer);

  scoreBar(gameSceneContainer, gameSceneBackgroundSound);
  hole(loader, gameSceneContainer, holee);
  mole(app, loader, TWEEN, gameSceneContainer, moles);
};
