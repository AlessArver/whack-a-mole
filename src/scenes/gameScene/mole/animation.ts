export let animationUp = (mole) => {
    let coords = { y: 250};
    let tween = new window.TWEEN.Tween(coords)
        .to({ y: coords.y }, 500)
        .onUpdate(function () {
            mole.y = coords.y;
        });
    tween.start();
};

// window.app.view.height - firstMole.height + 100
// (window.app.view.height - mole.height ) + 50

let moleDown = (hole, moles, mole, holeName) => {
    let coords = {
        y: 390
    };
    let tween = new window.TWEEN.Tween(coords)
        .to({ y: coords.y }, 500)
        .onUpdate( () => {
            mole.y = coords.y;

            hole.pop()
            moles.removeChild(mole)
        })
        .onComplete(() => {
            console.log(
                `REMOVE. Hole ${holeName} length: ${
                    hole.length
                } Moles length: ${moles.children.length}`
            );
        });
    tween.start();
};

let ifElseChoiceHole = (array, arrayName, moles, mole, moleXFirst, moleXSecond) => {
    if (mole.x === moleXFirst && array.length || mole.x === moleXSecond && array.length) moleDown(array, arrayName, moles, mole)
}

export let animationDown = (firstHole, secondHole, thirdHole, quarterHole, fiftyHole, moles) => {
    moles.children.forEach(mole => {
        ifElseChoiceHole(firstHole, 'FIRST', moles, mole, 180, 190)
        ifElseChoiceHole(secondHole, 'SECOND', moles, mole, 280, 290)
        ifElseChoiceHole(thirdHole, 'THIRD', moles, mole, 380, 390)
        ifElseChoiceHole(quarterHole, 'QUARTER', moles, mole, 480, 490)
        ifElseChoiceHole(fiftyHole, 'FIFTY', moles, mole, 580, 590)
    })
};
