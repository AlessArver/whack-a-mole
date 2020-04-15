export const mole = async (app, moles) => {
  const positionsX: Array<number> = [100, 250, 400, 550, 700];

  let simpleOrStrongMole = ["simpleMole", "strongMole"];

  function moleOnClick(e) {
    let coords = { y: e.target.y };
    let tween = new TWEEN.Tween(coords)
      .to({ y: 390 }, 500)
      .onUpdate(function () {
        e.target.y = coords.y;
      })
      .onComplete(() => {
        window.hitMoleCount += 1;
        gameSceneContainer.removeChild(mole);
        // moles.removeChild(e.target);
      });
    tween.start();
  }

  function simpleMoleOnClick(e) {
    let texture = loader.resources["../assets/imgs/moles_dead.png"].texture;
    let rectangle = new window.PIXI.Rectangle(0, 0, 60, 150);
    texture.frame = rectangle;
    e.target.texture = texture;
    window.scoreCount += 5;

    moleOnClick(e);
  }

  function strongMoleOnClick(e) {
    let texture = loader.resources["../assets/imgs/moles_dead.png"].texture;
    let rectangle = new window.PIXI.Rectangle(60, 0, 70, 150);
    texture.frame = rectangle;
    e.target.texture = texture;
    window.scoreCount += 15;

    moleOnClick(e);
  }

  let animationUp = (mole) => {
    let coords = { y: mole.y };
    let tween = new TWEEN.Tween(coords)
      .to({ y: 280 }, 500)
      .onUpdate(function () {
        mole.y = coords.y;
        console.log("mole animation up");
      });
    tween.start();
  };

  const createMole = (resolve) => {
    let selectMole =
      simpleOrStrongMole[Math.floor(Math.random() * simpleOrStrongMole.length)];

    switch (selectMole) {
      case "simpleMole": {
        let texture = loader.resources["../assets/imgs/moles.png"].texture;
        let rectangle = new window.PIXI.Rectangle(0, 0, 60, 150);
        texture.frame = rectangle;
        let mole = new window.PIXI.Sprite(texture);

        mole.x = positionsX[Math.floor(Math.random() * positionsX.length)];
        mole.y = 390;

        mole.interactive = true;

        animationUp(mole);

        mole.on("mousedown", simpleMoleOnClick);

        // moles.addChild(mole);
        gameSceneContainer.addChild(mole);
        resolve(mole);

        break;
      }
      case "strongMole": {
        let texture = loader.resources["../assets/imgs/moles.png"].texture;
        let rectangle = new window.PIXI.Rectangle(60, 0, 70, 150);
        texture.frame = rectangle;
        let mole = new window.PIXI.Sprite(texture);

        mole.x = positionsX[Math.floor(Math.random() * positionsX.length)];
        mole.y = 390;

        mole.interactive = true;

        animationUp(mole);

        mole.on("mousedown", strongMoleOnClick);

        // moles.addChild(mole);
        gameSceneContainer.addChild(mole);
        resolve(mole);

        break;
      }
    }
  };

  const removeMole = (mole) => {
    // if (moles.children[0]) {
    setTimeout(() => {
      // let firstMole = moles.children[0];
      // if (firstMole) {
      let coords = { y: mole.y };
      let tween = new TWEEN.Tween(coords)
        .to({ y: 390 }, 500)
        .onUpdate(() => {
          mole.y = coords.y;
        })
        .onComplete(() => {
          // moles.removeChild(firstMole);
          gameSceneContainer.removeChild(mole);
        });
      tween.start();
      // }
    }, 3000);
    // }
  };

  const createAndDeleteMole = () => {
    setInterval(() => {
      if (window.stopGame === false) {
        let p = new Promise((resolve, reject) => {
          createMole(resolve);
        }).then((mole) => removeMole(mole));
      }
    }, 5000);
  };

  if (window.countTime >= 90) {
    createAndDeleteMole();
  } else if (window.countTime <= 90 && window.countTime >= 75) {
    for (let i = 1; i <= 3; i++) {
      createAndDeleteMole();
    }
  } else if (window.countTime <= 75 && window.countTime >= 0) {
    for (let i = 1; i <= 6; i++) {
      createAndDeleteMole();
    }
  }
};
