import { gameSceneBackgroundSound } from "./../sounds";
export const startScene = () => {
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
    window.startSceneContainer.visible = false;
    window.app.stage.removeChild(window.startSceneContainer);

    window.gameSceneContainer.visible = true;
    window.app.stage.addChild(window.gameSceneContainer);

    window.stopGame = false;

    gameSceneBackgroundSound.play();
  }

  let showButton = (): any => {
    const buttonText = new window.PIXI.Text("Start", style);

    buttonText.position.set(45, 2);

    let startButton = new window.PIXI.Graphics();
    startButton.lineStyle(lineWidth, lineColor, 1);
    startButton.beginFill(beginFill);
    startButton.drawRect(0, 0, 200, 64);
    startButton.endFill();
    setInterval(() => {
      startButton.position.set(
        (window.app.view.width - startButton.width) / 2,
        (window.app.view.height - startButton.height) / 2
      );
    }, 1000);

    startButton.interactive = true;

    startButton.on("mouseover", startMouseover);
    startButton.on("mouseout", startMouseout);
    startButton.on("mousedown", startMousedown);

    startButton.addChild(buttonText);
    window.startSceneContainer.addChild(startButton);

    const animate = () => {
      requestAnimationFrame(animate);
      window.app.render(startButton);
    };
  };
  showButton();
};
