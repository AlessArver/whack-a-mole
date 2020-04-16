class GameScene {
  constructor() {}

  createWhiteBackground() {
    window.gameSceneContainer.sortableChildren = true;

    let whiteBackground = new window.PIXI.Graphics();
    whiteBackground.beginFill(0xffffff);
    whiteBackground.drawRect(0, 410, window.app.view.width, 400);
    whiteBackground.endFill();
    window.gameSceneContainer.addChild(whiteBackground);

    whiteBackground.zIndex = 1;
  }
}
