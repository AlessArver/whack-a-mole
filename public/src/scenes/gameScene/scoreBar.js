export const scoreBar = (PIXI, gameSceneContainer) => {
    let scoreBar = new PIXI.Container();
    scoreBar.position.set(0, 0);
    gameSceneContainer.addChild(scoreBar);
    let score = new PIXI.Text(`Score: ${window.scoreCount}`);
    score.position.set(0, 0);
    scoreBar.addChild(score);
    const timerScoreBar = () => {
        let timer = new PIXI.Text(`Timer: ${window.countTime}s`);
        setInterval(() => {
            if (window.countTime > 0 && window.stopGame === false) {
                timer.text = `Timer: ${window.countTime--}s`;
            }
        }, 1000);
        timer.position.set(150, 0);
        scoreBar.addChild(timer);
    };
    let stopButtonScoreBar = (x) => {
        let stopButton = new PIXI.Container();
        let stopButtonText = new PIXI.Text("Stop");
        stopButton.position.set(x, 0);
        stopButton.interactive = true;
        let stopButtonMousedown = (e) => {
            window.stopGame = !window.stopGame;
            console.log(window.stopGame);
        };
        stopButton.on("mousedown", stopButtonMousedown);
        stopButton.addChild(stopButtonText);
        scoreBar.addChild(stopButton);
    };
    timerScoreBar();
    stopButtonScoreBar(300);
};
//# sourceMappingURL=scoreBar.js.map