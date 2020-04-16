interface HoleInterface {
  holes: any;
}

export class Hole extends GameScene {
  public holes: any;
  constructor(
    { holes }: HoleInterface = { holes: new window.PIXI.Container() }
  ) {
    super();
    this.holes = holes;
  }

  createHole(x: number) {
    let texture = window.loader.resources["../assets/imgs/grass.png"].texture;
    let grass = new window.PIXI.Sprite(texture);
    grass.position.set(x, 400);

    this.holes.addChild(grass);
    this.holes.zInedx = 2;

    window.gameSceneContainer.addChild(this.holes);
  }
}
