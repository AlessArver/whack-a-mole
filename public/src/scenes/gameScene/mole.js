import { animationUp, animationDown } from "./../../funcs/animations";
const positionsX = [100, 250, 400, 550, 700];
let simpleOrStrongMole = ["simpleMole", "strongMole"];
function moleOnClick(e) {
    animationDown(e.target, 400, 500);
}
function simpleMoleOnClick(e) {
    let texture = window.loader.resources["../assets/imgs/moles_dead.png"].texture;
    let rectangle = new window.PIXI.Rectangle(0, 0, 60, 150);
    texture.frame = rectangle;
    e.target.texture = texture;
    window.scoreCount += 5;
    moleOnClick(e);
}
function strongMoleOnClick(e) {
    let texture = window.loader.resources["../assets/imgs/moles_dead.png"].texture;
    let rectangle = new window.PIXI.Rectangle(60, 0, 70, 150);
    texture.frame = rectangle;
    e.target.texture = texture;
    window.scoreCount += 15;
    moleOnClick(e);
}
let removeFromArray = (holes) => {
    if (holes.getChildAt(0).childern.length !== 0) {
        holes.getChildAt(0).removeChild(holes.getChildAt(0).children.length - 1);
        console.log(`remove from firstHole`);
    }
    if (holes.getChildAt(1).childern.length !== 0) {
        holes.getChildAt(1).removeChild(holes.getChildAt(1).children.length - 1);
        console.log(`remove from secondHole`);
    }
    if (holes.getChildAt(2).childern.length !== 0) {
        holes.getChildAt(2).removeChild(holes.getChildAt(2).children.length - 1);
        console.log(`remove from thirdHole`);
    }
    if (holes.getChildAt(3).children.length !== 0) {
        holes.getChildAt(3).removeChild(holes.getChildAt(3).children.length - 1);
        console.log(`remove from quaterHole`);
    }
    if (holes.getChildAt(4).childern.length !== 0) {
        holes.getChildAt(4).removeChild(holes.getChildAt(4).children.length - 1);
        console.log(`remove from fiftyHole`);
    }
};
const createMole = (resolve) => {
    let selectMole = simpleOrStrongMole[Math.floor(Math.random() * simpleOrStrongMole.length)];
    let hole = positionsX[Math.floor(Math.random() * positionsX.length)];
    let firstHole = new window.PIXI.Container();
    let secondHole = new window.PIXI.Container();
    let thirdHole = new window.PIXI.Container();
    let quaterHole = new window.PIXI.Container();
    let fiftyHole = new window.PIXI.Container();
    let holes = new window.PIXI.Container();
    holes.addChild(firstHole);
    holes.addChild(secondHole);
    holes.addChild(thirdHole);
    holes.addChild(quaterHole);
    holes.addChild(fiftyHole);
    console.log(holes.getChildAt(0).children);
    let addInHole = (data) => {
        if (hole === 100) {
            if (firstHole.children.length === 0) {
                console.log("FIRST");
                firstHole.addChild(data);
            }
        }
        else if (hole === 250) {
            if (secondHole.children.length === 0) {
                console.log("SECOND");
                secondHole.addChild(data);
            }
        }
        else if (hole === 400) {
            if (thirdHole.children.length === 0) {
                console.log("THIRD");
                thirdHole.addChild(data);
            }
        }
        else if (hole === 550) {
            if (quaterHole.children.length === 0) {
                console.log("QUATER");
                quaterHole.addChild(data);
            }
        }
        else if (hole === 700) {
            if (fiftyHole.children.length === 0) {
                console.log("FFTY");
                fiftyHole.addChild(data);
            }
        }
    };
    switch (selectMole) {
        case "simpleMole": {
            let texture = window.loader.resources["../assets/imgs/moles.png"].texture;
            let rectangle = new window.PIXI.Rectangle(0, 0, 60, 150);
            texture.frame = rectangle;
            let mole = new window.PIXI.Sprite(texture);
            mole.x = hole;
            mole.y = 390;
            mole.interactive = true;
            animationUp(mole, 280, 500);
            mole.on("mousedown", simpleMoleOnClick);
            console.log(mole.x);
            console.log(hole);
            addInHole(mole);
            resolve(holes);
            break;
        }
        case "strongMole": {
            let texture = window.loader.resources["../assets/imgs/moles.png"].texture;
            let rectangle = new window.PIXI.Rectangle(60, 0, 70, 150);
            texture.frame = rectangle;
            let mole = new window.PIXI.Sprite(texture);
            mole.x = hole;
            mole.y = 390;
            mole.interactive = true;
            animationUp(mole, 280, 500);
            mole.on("mousedown", strongMoleOnClick);
            console.log(mole.x);
            console.log(hole);
            addInHole(mole);
            window.gameSceneContainer.addChild(holes);
            resolve(holes);
            break;
        }
    }
};
const removeMole = (holes) => {
    setTimeout(() => {
        removeFromArray(holes);
    }, 3000);
};
const createAndRemoveMole = () => {
    setInterval(() => {
        if (window.stopGame === false) {
            let p = new Promise((resolve, reject) => {
                createMole(resolve);
            }).then((holes) => removeMole(holes));
        }
    }, 5000);
};
export const showMoles = (currentTime, randomIntSmall, randomIntAvegage) => {
    if (currentTime == 119) {
        console.log(`FIRST IF. Current time: ${currentTime}. RandomInt: ${randomIntSmall}`),
            createAndRemoveMole();
    }
    else if (currentTime == 75) {
        console.log(`SECOND IF. Current time: ${currentTime}. RandomInt: ${randomIntAvegage}`);
        createAndRemoveMole();
        createAndRemoveMole();
        createAndRemoveMole();
    }
    else if (currentTime == 0) {
        console.log(`THIRD IF. Current time: ${currentTime}. RandomInt: ${randomIntSmall}`);
        createAndRemoveMole();
        createAndRemoveMole();
        createAndRemoveMole();
        createAndRemoveMole();
        createAndRemoveMole();
    }
};
//# sourceMappingURL=mole.js.map