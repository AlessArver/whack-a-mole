import { gameSceneBackgroundSound } from "./../../sounds";
import { moleTimerController } from "../../controllers/gameController/moleController";
export const scoreBar = () => {
  let scoreBar = new window.PIXI.Container();
  scoreBar.position.set(0, 0);
  window.gameSceneContainer.addChild(scoreBar);

  window.score.position.set(0, 0);
  scoreBar.addChild(window.score);

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const timerScoreBar = () => {
    let timer = new window.PIXI.Text(`Timer: ${window.countTime}s`);
    setInterval(() => {
      if (window.countTime > 0 && window.stopGame === false) {
        timer.text = `Timer: ${window.countTime--}s`;
        let randomIntSmall = getRandomInt(0, 3);
        let randomIntAvegage = getRandomInt(0, 1);
        let probably = getRandomInt(0, 4);

        // console.log(`Small: ${randomIntSmall}, average: ${randomIntAvegage}`);
        // moleController(app, loader, TWEEN, gameSceneContainer, moles);
        moleTimerController(
          window.countTime,
          getRandomInt(0, 3),
          getRandomInt(0, 1),
          getRandomInt(0, 4)
        );
      }
    }, 1000);

    timer.position.set(150, 0);
    scoreBar.addChild(timer);
  };

  let stopButtonScoreBar = (x) => {
    let stopButton = new window.PIXI.Container();
    let stopButtonText = new window.PIXI.Text("Stop");
    stopButton.position.set(x, 0);

    stopButton.interactive = true;

    let stopButtonMousedown = (e) => {
      window.stopGame = !window.stopGame;
      switch (window.stopGame) {
        case false:
          gameSceneBackgroundSound.play();
          break;
        case true:
          gameSceneBackgroundSound.stop();
          break;
      }
    };

    stopButton.on("mousedown", stopButtonMousedown);
    stopButton.addChild(stopButtonText);
    scoreBar.addChild(stopButton);
  };

  timerScoreBar();
  stopButtonScoreBar(300);
};
