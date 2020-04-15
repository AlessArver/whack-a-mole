export const endScene = (app) => {
  let text = new window.PIXI.Text("The End!");
  text.position.set(0, 0);
  window.endSceneContainer.addChild(text);

  let score = new window.PIXI.Text(`Score: ${window.scoreCount}`);
  score.position.set(0, 100);
  window.endSceneContainer.addChild(score);

  window.hitMole.position.set(0, 200);
  window.endSceneContainer.addChild(window.hitMole);
};
