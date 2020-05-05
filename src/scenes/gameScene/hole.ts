type HoleOptions = {
  x: number
}

export class Hole {
  private _texture;
  private _grass;
  private _x;

  constructor(options: HoleOptions) {
    this._x = options.x
    this._texture = window.loader.resources["../assets/imgs/grass.png"].texture;
    this._grass = new window.PIXI.Sprite(this._texture);
    this._grass.position.set(this._x, window.app.view.height - this._grass.height - 50)
  }

  get grass() {
    return this._grass;
  }

  resize = (width: number, height: number) => {
    this._grass.position.set(this._x, height - this._grass.height - 50)
  }
}