export const mole = async (app, loader, TWEEN, gameSceneContainer, moles) => {
  const positionsX: Array<number> = [100, 250, 400, 550, 700];

  let simpleOrStrongMole = ["simpleMole", "strongMole"];

  function moleOnClick(e) {
    let coords = { y: e.target.y };
    let tween = new TWEEN.Tween(coords)
      .to({ y: 300 }, 200)
      .onUpdate(function () {
        e.target.y = coords.y;
        console.log("ANIMATION");
      })
      .onComplete(() => {
        window.hitMoleCount += 1;
        moles.removeChild(e.target);
      });
    tween.start();
  }

  function simpleMoleOnClick(e) {
    window.scoreCount += 5;
    window.score.text = `Score: ${window.scoreCount}`;
    console.log("LOLOLOL", window.scoreCount);

    moleOnClick(e);
  }

  function strongMoleOnClick(e) {
    window.scoreCount += 15;
    window.score.text = `Score: ${window.scoreCount}`;
    console.log("KEKEKEK", window.scoreCount);

    moleOnClick(e);
  }

  let animationUp = (mole) => {
    let coords = { y: mole.y };
    let tween = new TWEEN.Tween(coords)
      .to({ y: 250 }, 1000)
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

        moles.addChild(mole);
        gameSceneContainer.addChild(moles);
        resolve(moles);

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

        moles.addChild(mole);
        gameSceneContainer.addChild(moles);
        resolve(moles);

        break;
      }
    }
  };

  const removeMole = (moles) => {
    if (moles.children[0]) {
      setTimeout(() => {
        let firstMole = moles.children[0];
        if (firstMole) {
          let coords = { y: firstMole.y };
          let tween = new TWEEN.Tween(coords)
            .to({ y: 390 }, 1000)
            .onUpdate(() => {
              firstMole.y = coords.y;
            })
            .onComplete(() => {
              moles.removeChild(firstMole);
            });
          tween.start();
        }
      }, 3000);
    }
  };

  const createAndDeleteMole = () => {
    setInterval(() => {
      if (window.stopGame === false) {
        let p = new Promise((resolve, reject) => {
          createMole(resolve);
        }).then((moles) => removeMole(moles));
      }
    }, 5000);
  };

  if (window.countTime >= 90) {
    createAndDeleteMole();
  }
  setTimeout(() => {
    if (window.countTime <= 90 && window.countTime >= 75) {
      for (let i = 1; i <= 3; i++) {
        createAndDeleteMole();
      }
    }
  }, 30000);
  setTimeout(() => {
    if (window.countTime <= 75 && window.countTime >= 0) {
      for (let i = 1; i <= 6; i++) {
        createAndDeleteMole();
      }
    }
  }, 45000);
};
