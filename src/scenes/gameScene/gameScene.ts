import { hole } from "./hole";
// import { mole } from "./mole";
// import gameSceneView from "../../views/gameScene"
import { scoreBar } from "./scoreBar";

export const gameScene = (app) => {
  let holee = new window.PIXI.Container(),
    moles = new window.PIXI.Container();

  let whiteBackground = new window.PIXI.Graphics();
  whiteBackground.beginFill(0xffffff);
  whiteBackground.drawRect(0, 410, app.view.width, 400);
  whiteBackground.endFill();
  window.gameSceneContainer.addChild(whiteBackground);

  window.gameSceneContainer.sortableChildren = true;

  console.log(window.gameSceneContainer);

  holee.zIndex = 2;
  whiteBackground.zIndex = 1;
  moles.zIndex = 0;

  scoreBar();
  hole(holee);
  // gameSceneView()
  // mole(app, moles);
};
