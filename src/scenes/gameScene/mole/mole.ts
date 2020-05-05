import { animationUp, animationDown } from "./animation";
import { hitMoleSound } from "../../../sounds";

let firstHole = [];
let secondHole = [];
let thirdHole = [];
let quarterHole = [];
let fiftyHole = [];

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

  protected _moles

  constructor(options: MoleOptions) {
    this._texture = window.loader.resources["../assets/imgs/moles.png"].texture
    this._deadMoleTexture =
      window.loader.resources["../assets/imgs/moles_dead.png"].texture

    this._holeIndex = options.holeIndex;
    this._deadMoleRectangle = new window.PIXI.Rectangle(0, 0, 60, 150);

    this.createMoleContainer()
  }

  protected createMoleContainer() {
    this._moles = new window.PIXI.Container();
    this._moles.width = 388;
    this._moles.x = (window.app.view.width - this._moles.width) / 2
    setInterval(() => (this._moles.x = (window.app.view.width - this._moles.width) / 2), 100);
  }

  public create(container) {
    this._texture.frame = this._rectangle;
    this._moleX = this._coordinates[this._holeIndex];
    let mole = new window.PIXI.Sprite(this._texture);
    mole.position.set(this._moleX, window.app.view.height - mole.height - 50);

    mole.interactive = true;
    animationUp(mole);
    
    mole.on("mousedown", this._mouseDown);
    // moleMousedown(
    //   this._moles,
    //   mole,
    //   this._deadMoleRectangle,
    //   this._scoreCount
    // );
    choiceHole(this._moles, mole, container);
    removeMole(this._moles);
  }

  private _mouseDown = (e) => {
    this._deadMoleTexture.frame = this._deadMoleRectangle;
    e.target.texture = this._deadMoleTexture;

    window.scoreCount += this._scoreCount;

    hitMoleSound.play();

    animationDown(
      firstHole,
      secondHole,
      thirdHole,
      quarterHole,
      fiftyHole,
      this._moles,
      e.target,
      true
    );
  };
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
    this._rectangle = new window.PIXI.Rectangle(60, 0, 70, 150,);
    this._scoreCount = 15;
  }
}

const moleXSimple: Array<number> = [-190, -100, 0, 100, 195];
const moleXStrong: Array<number> = [-195, -95, 0, 95, 195];

let simpleOrStrongMole = ["simpleMole", "strongMole"];


const moleMousedown = (
  moles,
  mole,
  rectangle,
  scoreCount
) => {
  mole.on("mousedown", (e) => {
    let texture =
      window.loader.resources["../assets/imgs/moles_dead.png"].texture;
    // let rectangle = new window.PIXI.Rectangle(
    //   deadMoleX,
    //   deadMoleY,
    //   deadMoleWidth,
    //   deadMoleHeight
    // );
    texture.frame = rectangle;
    e.target.texture = texture;

    window.scoreCount += scoreCount;

    hitMoleSound.play();

    animationDown(
      firstHole,
      secondHole,
      thirdHole,
      quarterHole,
      fiftyHole,
      moles,
      mole,
      true
    );
  });
};

const addMole = (array, arrayName, moles, mole, container) => {
  array.push(mole);
  moles.addChild(mole);
  container.addChild(moles);

  window.missesCount++;

  console.log(
    `ADD. ${arrayName} length: ${array.length}. Moles length: ${moles.children.length}`
  );
};
const ifElseChoiceHole = (
  array,
  arrayName,
  moles,
  mole,
  moleXFirst,
  moleXSecond,
  container
) => {
  if (
    (mole.x === moleXFirst && array.length === 0) ||
    (mole.x === moleXSecond && array.length === 0)
  )
    addMole(array, arrayName, moles, mole, container);
};
const choiceHole = (moles, mole, container) => {
  ifElseChoiceHole(firstHole, "FIRST", moles, mole, -190, -195, container);
  ifElseChoiceHole(secondHole, "SECOND", moles, mole, -100, -95, container);
  ifElseChoiceHole(thirdHole, "THIRD", moles, mole, 0, 0, container);
  ifElseChoiceHole(quarterHole, "QUARTER", moles, mole, 100, 95, container);
  ifElseChoiceHole(fiftyHole, "FIFTY", moles, mole, 195, 195, container);
};

// const createMole = (
//   moles,
//   moleX,
//   rectangleX,
//   rectangleY,
//   rectangleWidth,
//   rectangleHeight,
//   scoreCount,
//   container
// ) => {
//   let texture = window.loader.resources["../assets/imgs/moles.png"].texture;
//   let rectangle = new window.PIXI.Rectangle(
//     rectangleX,
//     rectangleY,
//     rectangleWidth,
//     rectangleHeight
//   );
//   texture.frame = rectangle;
//   let mole = new window.PIXI.Sprite(texture);
//   mole.position.set(moleX, window.app.view.height - mole.height - 50);

//   mole.interactive = true;
//   animationUp(mole);
//   let deadMoleRectangle = new window.PIXI.Rectangle(0, 0, 60, 150);
//   moleMousedown(
//     moles,
//     mole,
//     deadMoleRectangle,
//     scoreCount
//   );

//   choiceHole(moles, mole, container);
// };

const choiceAndCreateMole = (container) => {
  let selectMole =
    simpleOrStrongMole[Math.floor(Math.random() * simpleOrStrongMole.length)];

  // let moles = new window.PIXI.Container();
  // moles.width = 388;
  // moles.x = (window.app.view.width - moles.width) / 2
  // setInterval(() => (moles.x = (window.app.view.width - moles.width) / 2), 100);

  switch (selectMole) {
    case "simpleMole": {
      let mole = new SimpleMole({
        holeIndex: Math.floor(Math.random() * 5)
      });
      mole.create(container)
      // createMole(
      //   moles,
      //   moleXSimple[Math.floor(Math.random() * moleXSimple.length)],
      //   0,
      //   0,
      //   60,
      //   150,
      //   5,
      //   container
      // );
      break;
    }
    case "strongMole": {
      let mole = new StrongMole({
        holeIndex: Math.floor(Math.random() * 5)
      })
      mole.create(container)
      // createMole(
      //   moles,
      //   moleXStrong[Math.floor(Math.random() * moleXStrong.length)],
      //   60,
      //   0,
      //   70,
      //   150,
      //   15,
      //   container
      // );
      break;
    }
  }
  // return moles;
};

const removeMole = (moles) => {
  setTimeout(() => {
    animationDown(
      firstHole,
      secondHole,
      thirdHole,
      quarterHole,
      fiftyHole,
      moles,
      0,
      false
    );
  }, 3000);
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
