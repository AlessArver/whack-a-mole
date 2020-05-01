import { showMoles } from "./mole/mole";
import { hole } from "./hole";
import { scoreBar } from "./scoreBar";

export const gameScene = () => {
  let holes = new window.PIXI.Container()

  let whiteBackground = new window.PIXI.Graphics();
  whiteBackground.beginFill(0xffffff);
  whiteBackground.drawRect(0, 0, window.app.view.width, 100);
  whiteBackground.endFill();
  setInterval(
    () => (whiteBackground.y = (window.app.view.height - whiteBackground.height) + 50),
    1000
  );
  window.gameSceneContainer.addChild(whiteBackground);

  window.gameSceneContainer.sortableChildren = true;

  holes.zIndex = 2;
  whiteBackground.zIndex = 1;

  setInterval(
    () => (holes.x = (window.app.view.width - holes.width) / 2),
    1000
  );

  scoreBar();
  hole(holes);
};
