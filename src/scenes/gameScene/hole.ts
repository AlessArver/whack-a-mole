type HoleOptions = {
  appHeight: number;
  x: number;
  y: number;
};

export class Hole {
  private _texture: any;
  private _grass: PIXI.Sprite;
  private _appHeight: number;
  private _x: number;
  private _y: number;

  constructor(options: HoleOptions) {
    this._appHeight = options.appHeight;
    this._x = options.x;
    this._y = options.y;
    this._texture = window.loader.resources["../assets/imgs/grass.png"].texture;
    this._grass = new window.PIXI.Sprite(this._texture);
    this._grass.x = this._x
  }

  get grass(): PIXI.Sprite {
    return this._grass;
  }
}
