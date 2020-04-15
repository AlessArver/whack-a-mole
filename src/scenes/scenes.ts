import { scenesSettings } from "./scenesSettings";
import { gameScene } from "./gameScene/gameScene";
import { startScene } from "./start";
import { endScene } from "./endScene";

export const Scenes = (app) => {
  scenesSettings(app);

  startScene(app);
  gameScene(app);
  endScene(app);
};
