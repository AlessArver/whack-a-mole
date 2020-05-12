type HoleOptions = {
  x: number;
};

export class Hole {
  private _texture: any;
  private _grass: PIXI.Sprite;
  private _x: number;

  constructor(options: HoleOptions) {
    this._x = options.x;

    this._createMole();
  }

  private _createMole() {
    this._texture = window.loader.resources["../assets/imgs/grass.png"].texture;
    this._grass = new window.PIXI.Sprite(this._texture);
    this._grass.position.set(
      this._x,
      window.app.view.height - this._grass.height - 50
    );

    this._grass.interactive = true;
    this._grass.on("mousedown", (e) => {
      console.log(`click. x: ${e.target.x}. y: ${e.target.y}`);
    });
  }

  get grass(): PIXI.Sprite {
    return this._grass;
  }
}
