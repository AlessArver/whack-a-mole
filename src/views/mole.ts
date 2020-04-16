const positionsX: Array<number> = [100, 250, 400, 550, 700];

let simpleOrStrongMole = ["simpleMole", "strongMole"];

function moleOnClick(e) {
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

let animationUp = (mole) => {
  let coords = { y: mole.y };
  let tween = new window.TWEEN.Tween(coords)
    .to({ y: 280 }, 500)
    .onUpdate(function () {
      mole.y = coords.y;
      console.log("mole animation up");
    });
  tween.start();
};

export const moleTimerController = (
  currentTime,
  randomIntSmall,
  randomIntAvegage,
  propably
) => {
  if (currentTime == 119) {
    console.log(
      `FIRST IF. Current time: ${currentTime}. RandomInt: ${randomIntSmall}`
    ),
      createAndDeleteMoleController();
  } else if (currentTime == 75) {
    console.log(
      `SECOND IF. Current time: ${currentTime}. RandomInt: ${randomIntAvegage}`
    );
    createAndDeleteMoleController();
    createAndDeleteMoleController();
    createAndDeleteMoleController();
  } else if (currentTime == 0) {
    console.log(
      `THIRD IF. Current time: ${currentTime}. RandomInt: ${randomIntSmall}`
    );
    createAndDeleteMoleController();
    createAndDeleteMoleController();
    createAndDeleteMoleController();
    createAndDeleteMoleController();
    createAndDeleteMoleController();
  }
};

const createMole = (resolve) => {
  let selectMole =
    simpleOrStrongMole[Math.floor(Math.random() * simpleOrStrongMole.length)];

  switch (selectMole) {
    case "simpleMole": {
      let texture = window.loader.resources["../assets/imgs/moles.png"].texture;
      let rectangle = new window.PIXI.Rectangle(0, 0, 60, 150);
      texture.frame = rectangle;
      let mole = new window.PIXI.Sprite(texture);

      mole.x = positionsX[Math.floor(Math.random() * positionsX.length)];
      mole.y = 390;

      mole.interactive = true;

      animationUp(mole);

      mole.on("mousedown", simpleMoleOnClick);

      window.gameSceneContainer.addChild(mole);
      resolve(mole);

      break;
    }
    case "strongMole": {
      let texture = window.loader.resources["../assets/imgs/moles.png"].texture;
      let rectangle = new window.PIXI.Rectangle(60, 0, 70, 150);
      texture.frame = rectangle;
      let mole = new window.PIXI.Sprite(texture);

      mole.x = positionsX[Math.floor(Math.random() * positionsX.length)];
      mole.y = 390;

      mole.interactive = true;

      animationUp(mole);

      mole.on("mousedown", strongMoleOnClick);

      window.gameSceneContainer.addChild(mole);
      resolve(mole);

      break;
    }
  }
};

const removeMole = (mole) => {
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
};

export const createAndDeleteMoleController = () => {
  setInterval(() => {
    if (window.stopGame === false) {
      let p = new Promise((resolve, reject) => {
        createMole(resolve);
      }).then((mole) => removeMole(mole));
    }
  }, 5000);
};
