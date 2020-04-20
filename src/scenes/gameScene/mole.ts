import { animationUp, animationDown } from "./../../funcs/animations";
const positionsX: Array<number> = [135, 230, 325, 425, 525];

let simpleOrStrongMole = ["simpleMole", "strongMole"];

function moleOnClick(e) {
  let coords = { y: e.target.y };
  let tween = new window.TWEEN.Tween(coords)
    .to({ y: window.app.view.height - e.height + 50 }, 500)
    .onUpdate(function () {
      e.target.y = coords.y;
    })
    .onComplete(() => {
      window.misses--;
    });
  tween.start();
}

function simpleMoleOnClick(e) {
  let texture =
    window.loader.resources["../assets/imgs/moles_dead.png"].texture;
  let rectangle = new window.PIXI.Rectangle(0, 0, 60, 150);
  texture.frame = rectangle;
  e.target.texture = texture;
  window.scoreCount += 5;

  moleOnClick(e);
}

function strongMoleOnClick(e) {
  let texture =
    window.loader.resources["../assets/imgs/moles_dead.png"].texture;
  let rectangle = new window.PIXI.Rectangle(60, 0, 70, 150);
  texture.frame = rectangle;
  e.target.texture = texture;
  window.scoreCount += 15;

  moleOnClick(e);
}

let addInArr = (moles, data) => {
  if (data.x === 135 && moles.getChildAt(0).children.length === 0) {
    moles.getChildAt(0).addChild(data);
    console.log(`ADD. First length: ${moles.getChildAt(0).children.length}`);
  }
  if (data.x === 230 && moles.getChildAt(1).children.length === 0) {
    moles.getChildAt(1).addChild(data);
    console.log(`ADD. Second length: ${moles.getChildAt(1).children.length}`);
  }
  if (data.x === 325 && moles.getChildAt(2).children.length === 0) {
    moles.getChildAt(2).addChild(data);
    console.log(`ADD. Third length: ${moles.getChildAt(3).children.length}`);
  }
  if (data.x === 425 && moles.getChildAt(2).children.length === 0) {
    moles.getChildAt(3).addChild(data);
    console.log(`ADD. Quarter length: ${moles.getChildAt(4).children.length}`);
  }
  if (data.x === 525 && moles.getChildAt(4).children.length === 0) {
    moles.getChildAt(4).addChild(data);
    console.log(`ADD. Fifty length: ${moles.getChildAt(4).children.length}`);
  }
};

let createHoles = (moles) => {
  let firstHole = new window.PIXI.Container();
  let secondHole = new window.PIXI.Container();
  let thirdHole = new window.PIXI.Container();
  let quarterHole = new window.PIXI.Container();
  let fiftyHole = new window.PIXI.Container();

  moles.addChild(firstHole);
  moles.addChild(secondHole);
  moles.addChild(thirdHole);
  moles.addChild(quarterHole);
  moles.addChild(fiftyHole);
};

let createMole = (
  resolve,
  moles,
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

  mole.x = positionsX[Math.floor(Math.random() * positionsX.length)];
  mole.y = window.app.view.height - mole.height + 100;

  mole.interactive = true;

  animationUp(mole, window.app.view.height - mole.height - 50, 500);

  mole.on("mousedown", moleClick);

  addInArr(moles, mole);

  window.gameSceneContainer.addChild(moles);
  resolve(moles);

  window.misses++;
};

let createMoles = () => {
  let moles = new window.PIXI.Container();
  setInterval(
    () => (moles.x = (window.app.view.width - moles.width) / 2),
    1000
  );
  moles.y = 0;
  moles.width = 320;

  return moles;
};

const choiseCreateMole = (resolve) => {
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

  createHoles(moles);

  switch (selectMole) {
    case "simpleMole": {
      createMole(resolve, moles, 0, 0, 60, 150, simpleMoleOnClick);
      break;
    }
    case "strongMole": {
      createMole(resolve, moles, 60, 0, 70, 150, strongMoleOnClick);
      break;
    }
  }
};

const removeMole = (moles) => {
  setTimeout(() => {
    // removeFromArray(firstMole);
    animationDown(moles, 500);
  }, 3000);
};

const createAndRemoveMole = () => {
  setInterval(() => {
    if (window.stopGame === false) {
      let p = new Promise((resolve, reject) => {
        choiseCreateMole(resolve);
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
