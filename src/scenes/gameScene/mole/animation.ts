export let animationUp = (data) => {
    let coords = { y: 250};
    let tween = new window.TWEEN.Tween(coords)
        .to({ y: coords.y }, 500)
        .onUpdate(function () {
            data.y = coords.y;
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

export let animationDown = (firstHole, secondHole, thirdHole, quarterHole, fiftyHole, moles) => {
    moles.children.forEach(mole => {
        if (firstHole.length) moleDown(firstHole, moles, mole, "First")
        if (secondHole.length) moleDown(secondHole, moles, mole, "Second");
        if (thirdHole.length) moleDown(thirdHole, moles, mole, "Third");
        if (quarterHole.length) moleDown(quarterHole, moles, mole, "Quarter");
        if (fiftyHole.length) moleDown(fiftyHole, moles, mole, "Fifty");
    })
};
