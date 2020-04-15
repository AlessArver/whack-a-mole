export const startScene = (app, PIXI, startSceneContainer, gameSceneContainer) => {
    const lineWidth = 4;
    const lineColor = 0x00000;
    const beginFill = 0xffffff;
    const buttoBackgroundnMouseOver = 0x000000;
    const buttonTextColor = 0x000000;
    const buttonTextMouseOver = 0xffffff;
    let style = new PIXI.TextStyle({
        fontFamily: "sans-serif",
        fontSize: 50,
        align: "center",
    });
    function startMouseover() {
        this.tint = buttoBackgroundnMouseOver;
        style.fill = buttonTextMouseOver;
    }
    function startMouseout() {
        this.tint = beginFill;
        style.fill = buttonTextColor;
    }
    function startMousedown() {
        startSceneContainer.visible = false;
        app.stage.removeChild(startSceneContainer);
        gameSceneContainer.visible = true;
        app.stage.addChild(gameSceneContainer);
        window.stopGame = false;
    }
    let showButton = (message, x, y, mouseover, mouseout, mousedown) => {
        const buttonText = new PIXI.Text(message, style);
        buttonText.position.set(45, 2);
        let startButton = new PIXI.Graphics();
        startButton.lineStyle(lineWidth, lineColor, 1);
        startButton.beginFill(beginFill);
        startButton.drawRect(0, 0, 200, 64);
        startButton.endFill();
        startButton.position.set(x, y);
        startButton.interactive = true;
        startButton.on("mouseover", mouseover);
        startButton.on("mouseout", mouseout);
        startButton.on("mousedown", mousedown);
        startButton.addChild(buttonText);
        startSceneContainer.addChild(startButton);
        const animate = () => {
            requestAnimationFrame(animate);
            app.render(startButton);
        };
    };
    showButton("Start", 170, 170, startMouseover, startMouseout, startMousedown);
};
//# sourceMappingURL=start.js.map