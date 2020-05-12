type HoleOptions = {
  x: number;
  y: number;
};

export class Hole {
  private _texture: any;
  private _grass: PIXI.Sprite;
  private _x: number;
  private _y: number;

  constructor(options: HoleOptions) {
    this._x = options.x;
    this._y = options.y;

    this._createHole();
  }

  private _createHole() {
    this._texture = window.loader.resources["../assets/imgs/grass.png"].texture;
    this._grass = new window.PIXI.Sprite(this._texture);
    this._grass.position.set(this._x, this._y);

    this._grass.interactive = true;
    this._grass.on("mousedown", e => {
      console.log(`Grass. x: ${e.target.x}. y: ${e.target.y}`)
    })
  }

  get grass(): PIXI.Sprite {
    return this._grass;
  }
}
