import { showMoles } from "./mole/mole";
import { gameSceneBackgroundSound } from "../../sounds";
export const scoreBar = () => {
  let scoreBar = new window.PIXI.Container();
  setInterval(
    () =>
      scoreBar.position.set((window.app.view.width - scoreBar.width) / 2, 0),
    1000
  );
  scoreBar.width = 234;
  window.gameSceneContainer.addChild(scoreBar);

  let score = new window.PIXI.Text(`Score: ${window.scoreCount}`);
  score.position.set(0, 0);
  console.log(`Score width: ${score.width}`);
  scoreBar.addChild(score);

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
        score.text = `Score: ${window.scoreCount}`;

        showMoles(window.countTime);
      }
    }, 1000);

    timer.position.set(97, 0);
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
