export const mole = async (app, loader, PIXI, gameSceneContainer) => {
  const positionsX: Array<number> = [100, 250, 400, 550, 700];
  let moles: any = new PIXI.Container();

  function moleOnClick(e) {
    // this.width = 100;

    const play = (delta) => {
      e.target.vy = 1;
      e.target.y += e.target.vy;
    };

    let gameLoop = (delta) => play(delta);
    app.ticker.add((delta) => gameLoop(delta));

    window.scoreCount += 5;
    window.hitMoleCount += 1;
  }
    
  let texture = loader.resources["./assets/imgs/moles.png"].texture;
  // let rectangle = new PIXI.Rectangle(0, 0, 64, 64);
  // texture.frame = rectangle;
  console.log(texture);

  const createMole = (resolve) => {
    let mole = new PIXI.Graphics();
    mole.beginFill(0x000000);
    mole.drawRect(0, 100, 50, 100);
    mole.endFill();

    // let e = PIXI.loader.resources("moles.png").texture;
    // let rectangle = new PIXI.Rectangle(60, 0, 70, 150);
    // e.frame = rectangle;
    // let mole = new PIXI.Sprite(e);

    mole.x = positionsX[Math.floor(Math.random() * positionsX.length)];
    mole.y = 200;

    mole.interactive = true;

    mole.on("mousedown", moleOnClick);

    moles.addChild(mole);
    gameSceneContainer.addChild(moles);
    resolve(moles);
  };

  const removeMole = (moles) => {
    if (moles.children[0]) {
      setTimeout(() => {
        let firstMole = moles.children[0];
        firstMole.visible = false;
        moles.removeChild(firstMole);
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
    }, 3000);
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
