import { animationUp, animationDown } from "./animation";
import { hitMoleSound } from "../../../sounds";

const moleXSimple: Array<number> = [-190, -100, 0, 100, 195];
const moleXStrong: Array<number> = [-195, -95, 0, 95, 195];

let simpleOrStrongMole = ["simpleMole", "strongMole"];

let firstHole = [];
let secondHole = [];
let thirdHole = [];
let quarterHole = [];
let fiftyHole = [];

const moleMousedown = (
  moles,
  mole,
  deadMoleX,
  deadMoleY,
  deadMoleWidth,
  deadMoleHeight,
  scoreCount
) => {
  mole.on("mousedown", (e) => {
    let texture =
      window.loader.resources["../assets/imgs/moles_dead.png"].texture;
    let rectangle = new window.PIXI.Rectangle(
      deadMoleX,
      deadMoleY,
      deadMoleWidth,
      deadMoleHeight
    );
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

const createMole = (
  resolve,
  moles,
  moleX,
  rectangleX,
  rectangleY,
  rectangleWidth,
  rectangleHeight,
  deadMoleX,
  deadMoleY,
  deadMoleWidth,
  deadMoleHeight,
  scoreCount,
  container
) => {
  let texture = window.loader.resources["../assets/imgs/moles.png"].texture;
  let rectangle = new window.PIXI.Rectangle(
    rectangleX,
    rectangleY,
    rectangleWidth,
    rectangleHeight
  );
  texture.frame = rectangle;
  let mole = new window.PIXI.Sprite(texture);
  mole.position.set(moleX, window.app.view.height - mole.height - 50);

  mole.interactive = true;
  animationUp(mole);
  moleMousedown(
    moles,
    mole,
    deadMoleX,
    deadMoleY,
    deadMoleWidth,
    deadMoleHeight,
    scoreCount
  );

  choiceHole(moles, mole, container);
  resolve(moles);
};

const choiceAndCreateMole = (resolve, container) => {
  let selectMole =
    simpleOrStrongMole[Math.floor(Math.random() * simpleOrStrongMole.length)];

  let moles = new window.PIXI.Container();
  moles.width = 388;
  moles.x = (window.app.view.width - moles.width) / 2
  setInterval(() => (moles.x = (window.app.view.width - moles.width) / 2), 100);

  switch (selectMole) {
    case "simpleMole": {
      createMole(
        resolve,
        moles,
        moleXSimple[Math.floor(Math.random() * moleXSimple.length)],
        0,
        0,
        60,
        150,
        0,
        0,
        60,
        150,
        5,
        container
      );
      break;
    }
    case "strongMole": {
      createMole(
        resolve,
        moles,
        moleXStrong[Math.floor(Math.random() * moleXStrong.length)],
        60,
        0,
        70,
        150,
        0,
        0,
        60,
        150,
        15,
        container
      );
      break;
    }
  }
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
      let p = new Promise((resolve, reject) => {
        choiceAndCreateMole(resolve, container);
      }).then((moles) => removeMole(moles));
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
