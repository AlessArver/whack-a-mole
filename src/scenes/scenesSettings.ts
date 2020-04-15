import { gameSceneBackgroundSound } from "./../sounds";
export const scenesSettings = (app) => {
  window.startSceneContainer.visible = true;
  app.stage.addChild(window.startSceneContainer);

  const endOfTheGame = (): void => {
    setInterval(() => {
      if (window.countTime === 0) {
        window.gameSceneContainer.visible = false;
        app.stage.removeChild(window.gameSceneContainer);

        window.endSceneContainer.visible = true;
        app.stage.addChild(window.endSceneContainer);

        window.stopGame = true;

        gameSceneBackgroundSound.stop();
      }
    }, 1000);
  };
  endOfTheGame();
};
