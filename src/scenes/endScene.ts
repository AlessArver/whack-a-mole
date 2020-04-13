export const endScene = (app, PIXI, endSceneContainer) => {
  let text = new PIXI.Text("The End!");
  text.position.set(0, 0);
  endSceneContainer.addChild(text);

  let score = new PIXI.Text(`Score: ${window.scoreCount}`);
  score.position.set(0, 100);
  endSceneContainer.addChild(score);

  window.hitMole.position.set(0, 200);
  endSceneContainer.addChild(window.hitMole);
};
