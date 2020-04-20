export const endScene = () => {
    let text = new window.PIXI.Text("The End!");
    text.position.set(0, 0);
    window.endSceneContainer.addChild(text);
    let score = new window.PIXI.Text(`Score: ${window.scoreCount}`);
    score.position.set(0, 100);
    window.endSceneContainer.addChild(score);
    window.hitMole.position.set(0, 200);
    window.endSceneContainer.addChild(window.hitMole);
    let tryAgain = new window.PIXI.Text("Try again");
    tryAgain.position.set(0, 250);
    tryAgain.interactive = true;
    const tryAgainMousedown = (e) => {
        window.endSceneContainer.visible = false;
        window.app.stage.removeChild(window.endSceneContainer);
        window.app.stage.addChild(window.gameSceneContainer);
        window.gameSceneContainer.visible = true;
        window.stopGame = false;
        window.countTime = 120;
        window.scoreCount = 0;
    };
    tryAgain.on("mousedown", tryAgainMousedown);
    window.endSceneContainer.addChild(tryAgain);
};
//# sourceMappingURL=endScene.js.map