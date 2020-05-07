type HoleOptions = {
  appHeight: number;
  x: number;
};

export class Hole {
  private _texture: any;
  private _grass: any;
  private _appHeight: number;
  private _x: number;

  constructor(options: HoleOptions) {
    this._appHeight = options.appHeight;
    this._x = options.x;
    this._texture = window.loader.resources["../assets/imgs/grass.png"].texture;
    this._grass = new window.PIXI.Sprite(this._texture);
    this._grass.position.set(
      this._x,
      this._appHeight - this._grass.height - 50
    );
  }

  get grass(): any {
    return this._grass;
  }
}
