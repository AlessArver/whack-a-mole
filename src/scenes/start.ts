export const startScene = (app, startSceneContainer, gameSceneContainer) => {
  const lineWidth: number = 4;
  const lineColor: number = 0x00000;
  const beginFill: number = 0xffffff;
  const buttoBackgroundnMouseOver: number = 0x000000;

  const buttonTextColor: number = 0x000000;
  const buttonTextMouseOver: number = 0xffffff;

  let style = new window.PIXI.TextStyle({
    fontFamily: "sans-serif",
    fontSize: 50,
    align: "center",
  });

  function startMouseover(): void {
    this.tint = buttoBackgroundnMouseOver;
    style.fill = buttonTextMouseOver;
  }
  function startMouseout(): void {
    this.tint = beginFill;
    style.fill = buttonTextColor;
  }
  function startMousedown(): void {
    startSceneContainer.visible = false;
    app.stage.removeChild(startSceneContainer);

    gameSceneContainer.visible = true;
    app.stage.addChild(gameSceneContainer);

    window.stopGame = false;
  }

  let showButton = (): any => {
    // const parent = app.view.parentNode;

    // app.renderer.resize(parent.width, parent.height);

    const buttonText = new window.PIXI.Text("Start", style);

    buttonText.position.set(45, 2);

    let startButton = new window.PIXI.Graphics();
    startButton.lineStyle(lineWidth, lineColor, 1);
    startButton.beginFill(beginFill);
    startButton.drawRect(0, 0, 200, 64);
    startButton.endFill();
    startButton.x = (app.view.width - startButton.width) / 2;
    startButton.y = (app.view.height - startButton.height) / 2;

    startButton.interactive = true;

    startButton.on("mouseover", startMouseover);
    startButton.on("mouseout", startMouseout);
    startButton.on("mousedown", startMousedown);

    startButton.addChild(buttonText);
    startSceneContainer.addChild(startButton);

    const animate = () => {
      requestAnimationFrame(animate);
      app.render(startButton);
    };
  };

  // window.addEventListener("resize", showButton);

  // window.onload = () => showButton();
  showButton();
};
