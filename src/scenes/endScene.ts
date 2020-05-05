import {
  gameSceneBackgroundSound
} from "../sounds";

export class EndScene {
  constructor() {
    let text = new window.PIXI.Text("The End!");
    text.position.set(0, 0);
    window.endSceneContainer.addChild(text);

    let score = new window.PIXI.Text(`Score: ${window.scoreCount}`);
    score.position.set(0, 50);
    window.endSceneContainer.addChild(score);

    let hitMole = new window.PIXI.Text(`Hit: ${window.hitMoleCount}`);
    hitMole.position.set(0, 100);
    window.endSceneContainer.addChild(hitMole);

    let missesMole = new window.PIXI.Text(`Misses: ${window.missesCount}`);
    missesMole.position.set(0, 150);
    window.endSceneContainer.addChild(missesMole);
    
    let tryAgain = new window.PIXI.Text("Try again");
    tryAgain.position.set(0, 250);

    tryAgain.interactive = true;
    tryAgain.on("mousedown", this._onmousedownTryAgain);
    window.endSceneContainer.addChild(tryAgain);

    setInterval(() => {
      score.text = `Score: ${window.scoreCount}`;
      hitMole.text = `Hit: ${window.hitMoleCount}`;
      missesMole.text = `Misses: ${window.missesCount}`;
    }, 1000);

    this._resize()
  }

  private _onmousedownTryAgain = () => {
    window.endSceneContainer.visible = false;
    window.app.stage.removeChild(window.endSceneContainer);

    window.app.stage.addChild(window.gameSceneContainer);
    window.gameSceneContainer.visible = true;

    window.stopGame = false;
    window.countTime = 120;
    window.scoreCount = 0;
    window.missesCount = 0;

    gameSceneBackgroundSound.play()
  }

  private _resize() {
    setInterval(
      () =>
      window.endSceneContainer.position.set(
        (window.app.view.width - window.endSceneContainer.width) / 2,
        (window.app.view.height - window.endSceneContainer.height) / 2
      ),
      1000
    );
  }
}
