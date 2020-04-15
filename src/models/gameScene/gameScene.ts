class GameScene {
  constructor() {}

  createWhiteBackground() {
    let whiteBackground = new window.PIXI.Graphics();
    whiteBackground.beginFill(0xffffff);
    whiteBackground.drawRect(0, 410, window.app.view.width, 400);
    whiteBackground.endFill();
    window.gameSceneContainer.addChild(whiteBackground);

    window.gameSceneContainer.sortableChildren = true;
  }
}
