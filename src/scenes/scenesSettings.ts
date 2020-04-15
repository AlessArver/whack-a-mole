export const scenesSettings = (
  app,
  startSceneContainer,
  gameSceneContainer,
  endSceneContainer
) => {
  startSceneContainer.visible = true;
  app.stage.addChild(startSceneContainer);

  const endOfTheGame = (): void => {
    setInterval(() => {
      if (window.countTime === 0) {
        gameSceneContainer.visible = false;
        app.stage.removeChild(gameSceneContainer);

        endSceneContainer.visible = true;
        app.stage.addChild(endSceneContainer);

        window.stopGame = true;
      }
    }, 1000);
  };
  endOfTheGame();
};
