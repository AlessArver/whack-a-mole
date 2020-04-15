export const scenesSettings = (app, startSceneContainer, gameSceneContainer, endSceneContainer) => {
    startSceneContainer.visible = true;
    app.stage.addChild(startSceneContainer);
    const endOfTheGame = () => {
        setInterval(() => {
            if (window.countTime === 100) {
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
//# sourceMappingURL=scenesSettings.js.map