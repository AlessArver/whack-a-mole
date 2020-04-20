export const hole = (hole) => {
    let createHole = (x) => {
        let texture = window.loader.resources["../assets/imgs/grass.png"].texture;
        let grass = new window.PIXI.Sprite(texture);
        grass.position.set(x, 400);
        hole.addChild(grass);
        window.gameSceneContainer.addChild(hole);
    };
    createHole(100);
    createHole(250);
    createHole(400);
    createHole(550);
    createHole(700);
};
//# sourceMappingURL=hole.js.map