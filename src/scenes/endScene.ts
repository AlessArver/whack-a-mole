type EndSceneOptions = {
  onTryAgain: () => void;
};

export class EndScene {
  private _container: PIXI.Container;
  private _onTryAgainCallback: () => void;

  private _score: PIXI.Text;
  private _hitMole: PIXI.Text;
  private _missesMole: PIXI.Text;

  constructor(options: EndSceneOptions) {
    this._container = new PIXI.Container();
    this._onTryAgainCallback = options.onTryAgain;

    this._score = new window.PIXI.Text();
    this._hitMole = new window.PIXI.Text();
    this._missesMole = new window.PIXI.Text();

    let text = new window.PIXI.Text("The End!");
    text.position.set(0, 0);
    this._container.addChild(text);

    this._score.position.set(0, 50);
    this._container.addChild(this._score);

    this._hitMole.position.set(0, 100);
    this._container.addChild(this._hitMole);

    this._missesMole.position.set(0, 150);
    this._container.addChild(this._missesMole);

    let tryAgain = new window.PIXI.Text("Try again");
    tryAgain.position.set(0, 250);

    tryAgain.interactive = true;
    tryAgain.on("mousedown", this._onTryAgainCallback);
    this._container.addChild(tryAgain);
  }

  public setGameEndData(
    scoreCount: number,
    hitMoleCount: number,
    missesCount: number
  ): void {
    this._score.text = `Score: ${scoreCount}`;
    this._hitMole.text = `Hit: ${hitMoleCount}`;
    this._missesMole.text = `Misses: ${missesCount}`;
  }

  public get container(): PIXI.Container {
    return this._container;
  }

  public resize(newWidth: number, newHeight: number): void {
    this._container.position.set(
      (newWidth - this._container.width) / 2,
      (newHeight - this._container.height) / 2
    );
  }
}
