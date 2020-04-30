import { gameSceneBackgroundSound } from "./../sounds";
export const scenesSettings = () => {
  window.startSceneContainer.visible = true;
  window.app.stage.addChild(window.startSceneContainer);

  const endOfTheGame = (): void => {
    setInterval(() => {
      if (window.countTime === 110) {
        window.gameSceneContainer.visible = false;
        window.app.stage.removeChild(window.gameSceneContainer);

        window.endSceneContainer.visible = true;
        window.app.stage.addChild(window.endSceneContainer);

        window.stopGame = true;

        gameSceneBackgroundSound.stop();
      }
    }, 1000);
  };
  endOfTheGame();
};
