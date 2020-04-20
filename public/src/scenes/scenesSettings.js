import { gameSceneBackgroundSound } from "./../sounds";
export const scenesSettings = () => {
    window.startSceneContainer.visible = true;
    window.app.stage.addChild(window.startSceneContainer);
    const endOfTheGame = () => {
        setInterval(() => {
            if (window.countTime === 0) {
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
//# sourceMappingURL=scenesSettings.js.map