import { hitMoleSound } from "../../../sounds";

let holes = [[], [], [], [], []];

type MoleOptions = {
  holeIndex: number;
}

class Mole {
  protected _coordinates: Array<number>;
  protected _texture;
  protected _deadMoleTexture;

  protected _rectangle;
  protected _deadMoleRectangle;

  protected _moleX;
  protected _holeIndex;
  protected _scoreCount;

  protected _moles;

  constructor(options: MoleOptions) {
    this._texture = window.loader.resources["../assets/imgs/moles.png"].texture;
    this._deadMoleTexture =
      window.loader.resources["../assets/imgs/moles_dead.png"].texture;

    this._holeIndex = options.holeIndex;
    this._deadMoleRectangle = new window.PIXI.Rectangle(0, 0, 60, 150);

    this.createMoleContainer();
  }

  protected createMoleContainer() {
    this._moles = new window.PIXI.Container();
    this._moles.width = 388;
    this._moles.x = (window.app.view.width - this._moles.width) / 2;
    setInterval(
      () => (this._moles.x = (window.app.view.width - this._moles.width) / 2),
      100
    );
  }

  private _addMoleInHole(mole, container) {
    for (let i = 0; i < 5; i++) {
      if (this._moleX === this._coordinates[i] && !holes[i].length) {
        holes[i].push(mole);
        this._moles.addChild(mole);
        container.addChild(this._moles);

        window.missesCount++;
      }
    }
  }

  private _animationUp(mole) {
    let coords = { y: window.app.view.height - mole.height - 50 };
    let tween = new window.TWEEN.Tween(coords)
      .to({ y: coords.y }, 1000)
      .onUpdate(function () {
        mole.y = coords.y;
      });
    tween.start();
  }
  private _moleDown(array, mole, isMoleDown) {
    let coords = { y: window.app.view.height - mole.height + 80 };
    let tween = new window.TWEEN.Tween(coords)
      .to({ y: coords.y }, 500)
      .onUpdate(() => {
        mole.y = coords.y;
      })
      .onComplete(() => {
        array.pop();
        this._moles.removeChild(mole);

        if (isMoleDown === true) {
          window.hitMoleCount++;
          window.missesCount--;
        }
      });
    tween.start();
  }
  private _animationDown(mole, isMoleDown) {
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

  private _mouseDown(e) {
    this._deadMoleTexture.frame = this._deadMoleRectangle;
    e.target.texture = this._deadMoleTexture;

    window.scoreCount += this._scoreCount;

    hitMoleSound.play();

    this._animationDown(e.target, true);
  }
  private _removeMole(mole) {
    setTimeout(() => {
      this._animationDown(mole, false);
    }, 3000);
  }

  public create(container) {
    this._texture.frame = this._rectangle;
    this._moleX = this._coordinates[this._holeIndex];
    let mole = new window.PIXI.Sprite(this._texture);
    mole.position.set(this._moleX, window.app.view.height - mole.height - 50);

    mole.interactive = true;
    this._animationUp(mole);
    mole.on("mousedown", this._mouseDown);

    this._addMoleInHole(mole, container);
    this._removeMole(mole);
  }
}

class SimpleMole extends Mole {
  constructor(options: MoleOptions) {
    super(options);
    this._coordinates = [-190, -100, 0, 100, 195];
    this._rectangle = new window.PIXI.Rectangle(0, 0, 60, 150);
    this._scoreCount = 5;
  }
}

class StrongMole extends Mole {
  constructor(options: MoleOptions) {
    super(options);
    this._coordinates = [-195, -95, 0, 95, 195];
    this._rectangle = new window.PIXI.Rectangle(60, 0, 70, 150);
    this._scoreCount = 15;
  }
}

const choiceAndCreateMole = (container) => {
  let selectMole = Math.floor(Math.random() * 2)

  switch (selectMole) {
    case 0: {
      let mole = new SimpleMole({
        holeIndex: Math.floor(Math.random() * 5),
      });
      mole.create(container);
      break;
    }
    case 1: {
      let mole = new StrongMole({
        holeIndex: Math.floor(Math.random() * 5),
      });
      mole.create(container);
      break;
    }
  }
};

const createAndRemoveMole = (container) => {
  setInterval(() => {
    if (window.stopGame === false) {
      choiceAndCreateMole(container);
    }
  }, 5000);
};

export const showMoles = (currentTime, container) => {
  switch (currentTime) {
    case 119:
      console.log(`FIRST IF. Current time: ${currentTime}.`);
      createAndRemoveMole(container);
      break;
    case 75:
      console.log(`SECOND IF. Current time: ${currentTime}.`);
      createAndRemoveMole(container);
      createAndRemoveMole(container);
      createAndRemoveMole(container);
      break;
    case 0:
      console.log(`THIRD IF. Current time: ${currentTime}.`);
      createAndRemoveMole(container);
      createAndRemoveMole(container);
      createAndRemoveMole(container);
      createAndRemoveMole(container);
      createAndRemoveMole(container);
      break;
  }
};