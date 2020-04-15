class Hole {
  hole = new window.PIXI.Container();
  constructor() {}

  createHole(x: number) {
    let texture = window.loader.resources["../assets/imgs/grass.png"].texture;
    let grass = new window.PIXI.Sprite(texture);
    grass.position.set(x, 400);

    this.hole.addChild(grass);

    window.gameSceneContainer.addChild(this.hole);
  }
}
