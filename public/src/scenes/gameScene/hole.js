export const hole = (PIXI, loader, gameSceneContainer, hole) => {
    const beginFill = 0x000000;
    const y = 400;
    const width = 100;
    const height = 30;
    let createAndShowHole = (x) => {
        let texture = loader.resources["../assets/imgs/grass.png"].texture;
        let grass = new PIXI.Sprite(texture);
        grass.position.set(x, y);
        hole.addChild(grass);
        gameSceneContainer.addChild(hole);
    };
    createAndShowHole(100);
    createAndShowHole(250);
    createAndShowHole(400);
    createAndShowHole(550);
    createAndShowHole(700);
};
//# sourceMappingURL=hole.js.map