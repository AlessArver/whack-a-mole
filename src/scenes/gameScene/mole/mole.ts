// import TWEEN from "@tweenjs/tween.js";
const TWEEN: any = require("@tweenjs/tween.js");
import { hitMoleSound } from "../../../sounds";

type MoleOptions = {
  holeIndex: number;
};
type MoleDataOptions = {
  texture: any;
  deadMoleTexture: any;
  deadMoleRectangle: PIXI.Rectangle;
};

let holes: Array<any> = [[], [], [], [], []];

type MoleCoordsOptions = {
  y: number;
};

class Mole {
  private _data: MoleDataOptions = {
    texture: window.loader.resources["../assets/imgs/moles.png"].texture,
    deadMoleTexture:
      window.loader.resources["../assets/imgs/moles_dead.png"].texture,
    deadMoleRectangle: new window.PIXI.Rectangle(0, 0, 60, 150),
  };

  protected _positionsX: Array<number>;
  protected _rectangle: PIXI.Rectangle;
  protected _moleX: number;
  private _moleY: number;
  protected _holeIndex: number;
  protected _scoreCount: number;
  protected _moles: PIXI.Container;
  public simpleMole: boolean;

  constructor(options: MoleOptions) {
    this._holeIndex = options.holeIndex;

    this.createMoleContainer();
  }

  protected createMoleContainer(): void {
    this._moles = new window.PIXI.Container();
    this._moles.x = (window.app.view.width - this._moles.width) / 2;
  }
  get moles(): PIXI.Container {
    return this._moles;
  }

  public resize(newWidth: number, newHeight: number): void {
    this._moles.x = (window.app.view.width - this._moles.width) / 2;
  }

  private _addMoleInHole(mole: PIXI.Sprite, container): void {
    for (let i = 0; i < 5; i++) {
      if (this._moleX === this._positionsX[i] && !holes[i].length) {
        holes[i].push(mole);
        this._moles.addChild(mole);
        container.addChild(this._moles);

        window.missesCount++;
      }
    }
  }

  private _animationUp(mole: PIXI.Sprite): void {
    let target: MoleCoordsOptions = { y: mole.y };

    // new (TWEEN as any)
    let tween: any = new TWEEN.default.Tween(target)
      .to({ y: window.app.view.height - mole.height - 50 }, 1000)
      // .easing(TWEEN.default.Easing.Back.Out)
      .onUpdate((): void => {
        mole.y = target.y;
      });
    tween.start();
  }
  private _moleDown(array: Array<any>, mole: any, isMoleDown: boolean): void {
    let target: MoleCoordsOptions = { y: mole.y };

    let tween: any = new TWEEN.default.Tween(target)
      .to({ y: window.app.view.height - mole.height + 85 }, 1000)
      // .easing(TWEEN.default.Easing.Back.Out)
      .onUpdate((): void => {
        mole.y = target.y;
      })
      .onComplete((): void => {
        array.pop();
        this._moles.removeChild(mole);

        if (isMoleDown === true) {
          window.hitMoleCount++;
          if (window.missesCount > 0) window.missesCount--;
        }
      });
    tween.start();
  }
  private _animationDown(mole: PIXI.Sprite, isMoleDown: boolean): void {
    if (isMoleDown && mole) {
      for (let i: number = 0; i < 5; i++) {
        if (this._moleX === this._positionsX[i] && holes[i].length)
          this._moleDown(holes[i], mole, isMoleDown);
      }
    } else {
      this._moles.children.forEach((m) => {
        for (let i: number = 0; i < 5; i++) {
          if (this._moleX === this._positionsX[i] && holes[i].length)
            this._moleDown(holes[i], m, isMoleDown);
        }
      });
    }
  }

  private _mouseDown = (e: { target: PIXI.Sprite }): void => {
    this._data.deadMoleTexture.frame = this._data.deadMoleRectangle;
    e.target.texture = this._data.deadMoleTexture;

    window.scoreCount += this._scoreCount;

    hitMoleSound.play();

    this._animationDown(e.target, true);
  };
  private _removeMole(mole: PIXI.Sprite): void {
    setTimeout((): void => {
      this._animationDown(mole, false);
    }, 3000);
  }

  public create(container: PIXI.Container): void {
    this._data.texture.frame = this._rectangle;
    this._moleX = this._positionsX[this._holeIndex];
    let mole: PIXI.Sprite = new window.PIXI.Sprite(this._data.texture);
    mole.position.set(this._moleX, window.app.view.height - mole.height + 85);

    mole.interactive = true;
    this._animationUp(mole);
    mole.on("mousedown", this._mouseDown);

    this._addMoleInHole(mole, container);
    this._removeMole(mole);
  }
}

export class SimpleMole extends Mole {
  constructor(options: MoleOptions) {
    super(options);
    this._positionsX = [-190, -100, 0, 100, 195];
    this._rectangle = new window.PIXI.Rectangle(0, 0, 60, 150);
    this._scoreCount = 5;
    this.simpleMole = true;
  }
}

export class StrongMole extends Mole {
  constructor(options: MoleOptions) {
    super(options);
    this._positionsX = [-195, -95, 0, 95, 195];
    this._rectangle = new window.PIXI.Rectangle(60, 0, 70, 150);
    this._scoreCount = 15;
    this.simpleMole = false;
  }
}
