export const hole = ( loader, gameSceneContainer, hole) => {
  const beginFill: number = 0x000000;
  const y: number = 400;
  const width: number = 100;
  const height: number = 30;

  let createAndShowHole = (x: number) => {
    let texture = loader.resources["../assets/imgs/grass.png"].texture;
    let grass = new window.PIXI.Sprite(texture);
    grass.position.set(x, y);
    // let hole = new PIXI.Graphics();
    // hole.beginFill(beginFill);
    // hole.drawRect(x, y, width, height);
    // hole.endFill();

    hole.addChild(grass);

    gameSceneContainer.addChild(hole);
  };

  createAndShowHole(100);
  createAndShowHole(250);
  createAndShowHole(400);
  createAndShowHole(550);
  createAndShowHole(700);
};
