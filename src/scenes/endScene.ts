export const endScene = (app, endSceneContainer) => {
  let text = new window.PIXI.Text("The End!");
  text.position.set(0, 0);
  endSceneContainer.addChild(text);

  let score = new window.PIXI.Text(`Score: ${window.scoreCount}`);
  score.position.set(0, 100);
  endSceneContainer.addChild(score);

  window.hitMole.position.set(0, 200);
  endSceneContainer.addChild(window.hitMole);
};
