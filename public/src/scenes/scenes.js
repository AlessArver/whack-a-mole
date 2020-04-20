import { scenesSettings } from "./scenesSettings";
import { gameScene } from "./gameScene/gameScene";
import { startScene } from "./start";
import { endScene } from "./endScene";
export const Scenes = () => {
    scenesSettings();
    startScene();
    gameScene();
    endScene();
};
//# sourceMappingURL=scenes.js.map