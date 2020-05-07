import { hitMoleSound } from "../../../sounds";
import { MoleDataOptions } from "../../../types/types";

type MoleOptions = {
  TWEEN: any;
  holeIndex: number;
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

  protected _coordinates: Array<number>;

  protected _rectangle: any;

  protected _moleX: number;

  private _TWEEN: any;
  protected _holeIndex: number;

  protected _scoreCount: number;

  protected _moles: any;
  public simpleMole: any;

  constructor(options: MoleOptions) {
    this._TWEEN = options.TWEEN;
    this._holeIndex = options.holeIndex;

    this.createMoleContainer();
  }

  protected createMoleContainer(): void {
    this._moles = new window.PIXI.Container();
    this._moles.width = 388;
    this._moles.x = (window.app.view.width - this._moles.width) / 2;
    setInterval(
      () => (this._moles.x = (window.app.view.width - this._moles.width) / 2),
      100
    );
  }
  get moles() {
    return this._moles;
  }

  private _addMoleInHole(mole, container): void {
    for (let i = 0; i < 5; i++) {
      if (this._moleX === this._coordinates[i] && !holes[i].length) {
        holes[i].push(mole);
        this._moles.addChild(mole);
        container.addChild(this._moles);

        window.missesCount++;
      }
    }
  }

  private _animationUp(mole): void {
    let coords: MoleCoordsOptions = {
      y: window.app.view.height - mole.height - 50,
    };
    let tween: any = new this._TWEEN.Tween(coords)
      .to({ y: coords.y }, 1000)
      .onUpdate((): void => {
        mole.y = coords.y;
      });
    tween.start();
  }
  private _moleDown(array, mole, isMoleDown): void {
    let coords: MoleCoordsOptions = {
      y: window.app.view.height - mole.height + 80,
    };
    let tween: any = new this._TWEEN.Tween(coords)
      .to({ y: coords.y }, 500)
      .onUpdate((): void => {
        mole.y = coords.y;
      })
      .onComplete((): void => {
        array.pop();
        this._moles.removeChild(mole);

        if (isMoleDown === true) {
          window.hitMoleCount++;
          window.missesCount--;
        }
      });
    tween.start();
  }
  private _animationDown(mole, isMoleDown): void {
    if (isMoleDown && mole) {
      for (let i = 0; i < 5; i++) {
        if (this._moleX === this._coordinates[i] && holes[i].length)
          this._moleDown(holes[i], mole, isMoleDown);
      }
    } else {
      this._moles.children.forEach((m) => {
        for (let i = 0; i < 5; i++) {
          if (this._moleX === this._coordinates[i] && holes[i].length)
            this._moleDown(holes[i], m, isMoleDown);
        }
      });
    }
  }

  private _mouseDown = (e): void => {
    this._data.deadMoleTexture.frame = this._data.deadMoleRectangle;
    e.target.texture = this._data.deadMoleTexture;

    window.scoreCount += this._scoreCount;

    hitMoleSound.play();

    this._animationDown(e.target, true);
  };
  private _removeMole(mole): void {
    setTimeout(() => {
      this._animationDown(mole, false);
    }, 3000);
  }

  public create(container): void {
    this._data.texture.frame = this._rectangle;
    this._moleX = this._coordinates[this._holeIndex];
    let mole: any = new window.PIXI.Sprite(this._data.texture);
    mole.position.set(this._moleX, window.app.view.height - mole.height - 50);

    setInterval(
      () => mole.position.set(this._moleX, window.app.view.height - mole.height - 50),
      500
    );

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
    this._coordinates = [-190, -100, 0, 100, 195];
    this._rectangle = new window.PIXI.Rectangle(0, 0, 60, 150);
    this._scoreCount = 5;
    this.simpleMole = true;
  }
}

export class StrongMole extends Mole {
  constructor(options: MoleOptions) {
    super(options);
    this._coordinates = [-195, -95, 0, 95, 195];
    this._rectangle = new window.PIXI.Rectangle(60, 0, 70, 150);
    this._scoreCount = 15;
    this.simpleMole = false;
  }
}
