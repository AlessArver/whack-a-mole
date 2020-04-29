import {animationUp, animationDown} from "./animation";

const positionsXSimple: Array<number> = [190, 290, 390, 490, 590];
const positionsXStrong: Array<number> = [180, 280, 380, 480, 580];

let simpleOrStrongMole = ["simpleMole", "strongMole"];

let firstHole = []
let secondHole = []
let thirdHole = []
let quarterHole = []
let fiftyHole = []

function moleOnClick(e, x, y, width, height) {
  const texture =
      window.loader.resources["../assets/imgs/moles_dead.png"].texture;
  const rectangle = new window.PIXI.Rectangle(x, y, width, height);
  texture.frame = rectangle;

  let coords = { y: e.target.y };

  let tween = new window.TWEEN.Tween(coords)
    .to({ y: window.app.view.height - e.height + 50 }, 500)
    .onUpdate(function () {
      e.target.y = coords.y;
      e.target.texture = texture;
    })
    .onComplete(() => {
      window.missesCount--;
    });
  tween.start();
}
function simpleMoleOnClick(e) {
  window.scoreCount += 5;

  moleOnClick(e, 0, 0, 60, 150);
}
function strongMoleOnClick(e) {
  window.scoreCount += 15;

  moleOnClick(e, 60, 0, 70, 150);
}

let pushMole = (array, arrayName, moles, mole) => {
  array.push(mole);
  moles.addChild(mole)
  window.gameSceneContainer.addChild(moles);
  
  window.missesCount++;
  
  console.log(`ADD. ${arrayName} length: ${array.length}`);
}
let choiceHole = (moles, mole) => {
  if (mole.x === 190 && !firstHole.length || mole.x === 180 && !firstHole.length ) {
    pushMole(firstHole, 'FIRST', moles, mole)
  }
  if (mole.x === 280 && !secondHole.length || mole.x === 290 && !secondHole.length) {
    pushMole(secondHole, 'SECOND', moles, mole)
  }
  if (mole.x === 380 && !thirdHole.length || mole.x === 390 && !thirdHole.length) {
    pushMole(thirdHole, 'THIRD', moles, mole)
  }
  if (mole.x === 480 && !quarterHole.length || mole.x === 490 && !quarterHole.length) {
    pushMole(quarterHole, 'QUATER', moles, mole)
  }
  if (mole.x === 580 && !fiftyHole.length || mole.x === 590 && !fiftyHole.length) {
    pushMole(fiftyHole, 'FIFTY', moles, mole)
  }
};

let createMole = (
  resolve,
  moles,
  moleX,
  rectangleX,
  rectangleY,
  rectangleWidth,
  rectangleHeight,
  moleClick
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

  mole.x = moleX;
  mole.y = window.app.view.height - mole.height + 100;

  mole.interactive = true;
  animationUp(mole, (window.app.view.height - mole.height) - 50, 500);
  mole.on("mousedown", moleClick);

  choiceHole(moles, mole);
  resolve(moles);
};

const choiceCreateMole = (resolve) => {
  let selectMole =
    simpleOrStrongMole[Math.floor(Math.random() * simpleOrStrongMole.length)];

  let moles = new window.PIXI.Container();
  // moles.width = 320;
  moles.width = 388;
  moles.y = 0;

  // setInterval(
  //   () => (moles.x = (window.app.view.width - moles.width) / 2),
  //   1000
  // );

  switch (selectMole) {
    case "simpleMole": {
      createMole(resolve, moles, positionsXSimple[Math.floor(Math.random() * positionsXSimple.length)], 0, 0, 60, 150, simpleMoleOnClick);
      break;
    }
    case "strongMole": {
      createMole(resolve, moles, positionsXStrong[Math.floor(Math.random() * positionsXStrong.length)], 60, 0, 70, 150, strongMoleOnClick);
      break;
    }
  }
};

const removeMole = (moles) => {
  setTimeout(() => {
    animationDown(firstHole, secondHole, thirdHole, quarterHole, fiftyHole, moles)
  }, 3000);
};

const createAndRemoveMole = () => {
  setInterval(() => {
    if (window.stopGame === false) {
      let p = new Promise((resolve, reject) => {
        choiceCreateMole(resolve);
      }).then((moles) => removeMole(moles));
    }
  }, 5000);
};

export const showMoles = (currentTime) => {
  switch (currentTime) {
    case 119:
      console.log(`FIRST IF. Current time: ${currentTime}.`);
      createAndRemoveMole();
      createAndRemoveMole();
      createAndRemoveMole();
      break;
    case 75:
      console.log(`SECOND IF. Current time: ${currentTime}.`);
      createAndRemoveMole();
      createAndRemoveMole();
      createAndRemoveMole();
      break;
    case 0:
      console.log(`THIRD IF. Current time: ${currentTime}.`);
      createAndRemoveMole();
      createAndRemoveMole();
      createAndRemoveMole();
      createAndRemoveMole();
      createAndRemoveMole();
      break;
  }
};
