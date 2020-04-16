interface MoleInterface {
  frameX: number;
  frameY: number;
  frameWidth: number;
  frameHeight: number;
  typeMoleOnClick: any;
}

export class Mole extends GameScene {
  public frameX: number;
  public frameY: number;
  public frameWidth: number;
  public frameHeight: number;
  public typeMoleOnClick: any;

  constructor(
    {
      frameX,
      frameY,
      frameWidth,
      frameHeight,
      typeMoleOnClick,
    }: MoleInterface = {
      frameX: null,
      frameY: null,
      frameWidth: null,
      frameHeight: null,
      typeMoleOnClick: null,
    }
  ) {
    super();
    this.frameX = frameX;
    this.frameY = frameY;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.typeMoleOnClick = typeMoleOnClick;
  }

  moleOnClick(e) {
    let coords = { y: e.target.y };
    let tween = new window.TWEEN.Tween(coords)
      .to({ y: 390 }, 500)
      .onUpdate(function () {
        e.target.y = coords.y;
      })
      .onComplete(() => {
        window.hitMoleCount += 1;
        window.gameSceneContainer.removeChild(e.target);
      });
    tween.start();
  }

  moleAnimationUp(mole) {
    let coords = { y: mole.y };
    let tween = new window.TWEEN.Tween(coords)
      .to({ y: 280 }, 500)
      .onUpdate(function () {
        mole.y = coords.y;
        console.log("mole animation up");
      });
    tween.start();
  }

  createMole(resolve) {
    let texture = window.loader.resources["../assets/imgs/moles.png"].texture;
    let rectangle = new window.PIXI.Rectangle(
      this.frameX,
      this.frameY,
      this.frameWidth,
      this.frameHeight
    );
    texture.frame = rectangle;
    let mole = new window.PIXI.Sprite(texture);

    // mole.x = positionsX[Math.floor(Math.random() * positionsX.length)];
    mole.y = 390;

    mole.interactive = true;

    this.moleAnimationUp(mole);

    mole.on("mousedown", this.typeMoleOnClick);

    window.gameSceneContainer.addChild(mole);

    resolve(mole);
  }

  removeMole(mole) {
    setTimeout(() => {
      let coords = { y: mole.y };
      let tween = new window.TWEEN.Tween(coords)
        .to({ y: 390 }, 500)
        .onUpdate(() => {
          mole.y = coords.y;
        })
        .onComplete(() => {
          window.gameSceneContainer.removeChild(mole);
        });
      tween.start();
    }, 3000);
  }

  createAndRemoveMole() {
    setInterval(() => {
      if (window.stopGame === false) {
        let p = new Promise((resolve, reject) => {
          this.createMole(resolve);
        }).then((mole) => this.removeMole(mole));
      }
    }, 5000);
  }
}

export class SimpleMole extends Mole {
  simpleMoleOnClick(e) {
    let texture =
      window.loader.resources["../assets/imgs/moles_dead.png"].texture;
    let rectangle = new window.PIXI.Rectangle(0, 0, 60, 150);
    texture.frame = rectangle;
    e.target.texture = texture;
    window.scoreCount += 5;

    this.moleOnClick(e);
  }
}

export class StrongMole extends Mole {
  strongMoleOnClick(e) {
    let texture =
      window.loader.resources["../assets/imgs/moles_dead.png"].texture;
    let rectangle = new window.PIXI.Rectangle(60, 0, 70, 150);
    texture.frame = rectangle;
    e.target.texture = texture;
    window.scoreCount += 15;

    this.moleOnClick(e);
  }
}
