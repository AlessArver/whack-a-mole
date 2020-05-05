import {
  gameSceneBackgroundSound
} from "../sounds";

type EndSceneOptions = {
  onTryAgain: () => void
}

export class EndScene {
  private _container;
  private _onTryAgainCallback;

  constructor(options: EndSceneOptions) {
    this._onTryAgainCallback = options.onTryAgain;
    this._container = new window.PIXI.Container();

    let text = new window.PIXI.Text("The End!");
    text.position.set(0, 0);
    this._container.addChild(text);

    let score = new window.PIXI.Text(`Score: ${window.scoreCount}`);
    score.position.set(0, 50);
    this._container.addChild(score);

    let hitMole = new window.PIXI.Text(`Hit: ${window.hitMoleCount}`);
    hitMole.position.set(0, 100);
    this._container.addChild(hitMole);

    let missesMole = new window.PIXI.Text(`Misses: ${window.missesCount}`);
    missesMole.position.set(0, 150);
    this._container.addChild(missesMole);

    let tryAgain = new window.PIXI.Text("Try again");
    tryAgain.position.set(0, 250);

    tryAgain.interactive = true;
    tryAgain.on("mousedown", this._onTryAgainCallback);
    this._container.addChild(tryAgain);

    setInterval(() => {
      score.text = `Score: ${window.scoreCount}`;
      hitMole.text = `Hit: ${window.hitMoleCount}`;
      missesMole.text = `Misses: ${window.missesCount}`;
    }, 1000);
  }

  get container() {
    return this._container
  }

  public resize(width: number, height: number) {
    this._container.position.set(
      (width - this._container.width) / 2,
      (height - this._container.height) / 2
    );
  }
}
