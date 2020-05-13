const TWEEN: any = require("@tweenjs/tween.js");
import { hitMoleSound } from "../../../sounds";

type MoleOptions = {
  holeIndex: number;
};
type MoleDataOptions = {
  positionsY: Array<number>;
  texture: PIXI.Texture;
  deadMoleTexture: PIXI.Texture;
  deadMoleRectangle: PIXI.Rectangle;
};

let holes: Array<any> = [[], [], [], [], []];

class Mole {
  private _data: MoleDataOptions = {
    positionsY: [200, 300, 150, 300, 200],
    texture: window.loader.resources["../assets/imgs/moles.png"].texture,
    deadMoleTexture:
      window.loader.resources["../assets/imgs/moles_dead.png"].texture,
    deadMoleRectangle: new window.PIXI.Rectangle(0, 0, 60, 150),
  };

  protected _positionsX: Array<number>;
  protected _rectangle: PIXI.Rectangle;
  protected _moleX: number;
  protected _moleY: number;
  protected _holeIndex: number;
  protected _scoreCount: number;
  protected _moles: PIXI.Container;
  protected _masks: PIXI.Container;
  public simpleMole: boolean;

  constructor(options: MoleOptions) {
    this._holeIndex = options.holeIndex;

    this._createMoleContainer();
    this._createMasksContainer();
  }

  protected _createMoleContainer(): void {
    this._moles = new window.PIXI.Container();
    this._moles.position.set(
      (window.app.view.width - this._moles.width) / 2,
      (window.app.view.height - this._moles.height) / 2
    );
  }
  protected _createMasksContainer(): void {
    this._masks = new window.PIXI.Container();
    this._masks.position.set(
      (window.app.view.width - this._masks.width) / 2,
      (window.app.view.height - this._masks.height) / 2
    );
  }
  get moles(): PIXI.Container {
    return this._moles;
  }

  public resize(newWidth: number, newHeight: number): void {
    this._moles.position.set(
      (window.app.view.width - this._moles.width) / 2,
      (window.app.view.height - this._moles.height) / 2
    );

    this._masks.position.set(
        (window.app.view.width - this._masks.width) / 2,
        (window.app.view.height - this._masks.height) / 2
    );
  }

  private _addMoleInHole(mole: PIXI.Sprite, mask, container): void {
    for (let i = 0; i < 5; i++) {
      if (this._moleX === this._positionsX[i] && !holes[i].length) {
        holes[i].push(mole);
        this._masks.addChild(mask);
        container.addChild(this._masks);

        this._moles.addChild(mole);
        container.addChild(this._moles);

        window.missesCount++;
      }
    }
  }

  private _animationUp(mole: PIXI.Sprite): void {
    let target: any = { y: mole.y, alpha: 0 };

    let tween: any = new TWEEN.default.Tween(target)
      .to({ y: mole.y - 60 }, 500)
      .onUpdate((): void => {
        mole.y = target.y;
      });
    tween.start();
  }
  private _moleDown(
    array: Array<any>,
    mole: any,
    mask: PIXI.Graphics,
    isMoleDown: boolean
  ): void {
    let target: any = { y: mole.y };
    let tween: any = new TWEEN.default.Tween(target)
      .to({ y: mole.y + 100 }, 1000)
      .onUpdate((): void => {
        mole.y = target.y;
      })
      .onComplete((): void => {
        array.pop();
        this._moles.removeChild(mole);
        this._masks.removeChild(mask);

        if (isMoleDown === true) {
          window.hitMoleCount++;
          if (window.missesCount > 0) window.missesCount--;
        }
      });
    tween.start();
  }
  private _animationDown(
    mole: PIXI.Sprite,
    mask: PIXI.Graphics,
    isMoleDown: boolean
  ): void {
    if (isMoleDown && mole) {
      for (let i: number = 0; i < 5; i++) {
        if (this._moleX === this._positionsX[i] && holes[i].length)
          this._moleDown(holes[i], mole, mask, isMoleDown);
      }
    } else {
      this._moles.children.forEach((m) => {
        for (let i: number = 0; i < 5; i++) {
          if (this._moleX === this._positionsX[i] && holes[i].length)
            this._moleDown(holes[i], m, mask, isMoleDown);
        }
      });
    }
  }

  private _mouseDown = (mole: PIXI.Sprite, mask: PIXI.Graphics): void => {
    mole.on("mousedown", (e) => {
      this._data.deadMoleTexture.frame = this._data.deadMoleRectangle;
      e.target.texture = this._data.deadMoleTexture;

      console.log(e.target.x)

      window.scoreCount += this._scoreCount;

      hitMoleSound.play();

      this._animationDown(e.target, mask, true);
    });
  };
  private _removeMole(mole: PIXI.Sprite, mask: PIXI.Graphics): void {
    setTimeout((): void => {
      this._animationDown(mole, mask, false);
    }, 3000);
  }

  public create(container: PIXI.Container): void {
    this._data.texture.frame = this._rectangle;
    this._moleX = this._positionsX[this._holeIndex];

    let mole: PIXI.Sprite = new window.PIXI.Sprite(this._data.texture);

    let y = [-110, 80];
    if (this._moleX === -35 || this._moleX === -30) this._moleY = -30;
    if (
      this._moleX === -230 ||
      this._moleX === -220 ||
      this._moleX === 160 ||
      this._moleX === 165
    )
      this._moleY = y[Math.floor(Math.random() * y.length)];

    mole.position.set(this._moleX, this._moleY);

    let maskY: number;
    if (this._moleY === -30) maskY = -90;
    else if (this._moleY === 80) maskY = 10;
    else if (this._moleY === -110) maskY = -170;

    let mask: PIXI.Graphics = new PIXI.Graphics();
    mask.beginFill(0x66ccff);
    mask.drawRect(mole.x - 5, maskY, 85, 150);
    mask.endFill();
    mole.mask = mask;

    mole.interactive = true;
    this._animationUp(mole);

    this._addMoleInHole(mole, mask, container);
    this._mouseDown(mole, mask);
    this._removeMole(mole, mask);
  }
}

export class SimpleMole extends Mole {
  constructor(options: MoleOptions) {
    super(options);
    this._positionsX = [-220, -220, -30, 165, 165];
    this._rectangle = new window.PIXI.Rectangle(0, 0, 60, 150);
    this._scoreCount = 5;
    this.simpleMole = true;
  }
}

export class StrongMole extends Mole {
  constructor(options: MoleOptions) {
    super(options);
    this._positionsX = [-230, -230, -35, 160, 160];
    this._rectangle = new window.PIXI.Rectangle(60, 0, 70, 150);
    this._scoreCount = 15;
    this.simpleMole = false;
  }
}
