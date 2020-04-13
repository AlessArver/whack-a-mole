export const hole = (PIXI, gameSceneContainer) => {
  const beginFill: number = 0x000000;
  const y: number = 400;
  const width: number = 100;
  const height: number = 30;

  let createAndShowHole = (x: number) => {
    let hole = new PIXI.Graphics();
    hole.beginFill(beginFill);
    hole.drawRect(x, y, width, height);
    hole.endFill();

    gameSceneContainer.addChild(hole);
  };

  createAndShowHole(100);
  createAndShowHole(250);
  createAndShowHole(400);
  createAndShowHole(550);
  createAndShowHole(700);
};