class Hole {
  constructor() {

  }
}

export const hole = (holes, container) => {
  let createHole = (x: number) => {
    let texture = window.loader.resources["../assets/imgs/grass.png"].texture;
    let grass = new window.PIXI.Sprite(texture);
    setInterval(
      () => grass.position.set(x, window.app.view.height - grass.height - 50),
      1000
    );

    holes.addChild(grass);
    container.addChild(holes);
  };

  createHole(0);
  createHole(97);
  createHole(194);
  createHole(291);
  createHole(388);
};
