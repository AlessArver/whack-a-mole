export const hole = (hole) => {
  const y: number = 400;

  let createAndShowHole = (x: number) => {
    let texture = window.loader.resources["../assets/imgs/grass.png"].texture;
    let grass = new window.PIXI.Sprite(texture);
    grass.position.set(x, y);
    // let hole = new PIXI.Graphics();
    // hole.beginFill(beginFill);
    // hole.drawRect(x, y, width, height);
    // hole.endFill();

    hole.addChild(grass);

    window.gameSceneContainer.addChild(hole);
  };

  createAndShowHole(100);
  createAndShowHole(250);
  createAndShowHole(400);
  createAndShowHole(550);
  createAndShowHole(700);
};
