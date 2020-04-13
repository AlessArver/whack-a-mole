import { hole } from "./hole";
import { mole } from "./mole";
import { scoreBar } from "./scoreBar";

export const gameScene = (app, loader, PIXI, gameSceneContainer) => {
  scoreBar(PIXI, gameSceneContainer);
  hole(PIXI, gameSceneContainer);
  mole(app, loader, PIXI, gameSceneContainer);
};
