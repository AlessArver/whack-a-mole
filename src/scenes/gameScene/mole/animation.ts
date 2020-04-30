export let animationUp = (mole) => {
  let coords = { y: 100 };
  let tween = new window.TWEEN.Tween(coords)
    .to({ y: coords.y }, 500)
    .onUpdate(function () {
      mole.y = coords.y;
    });
  tween.start();
};

// window.app.view.height - firstMole.height + 100
// (window.app.view.height - mole.height ) + 50

let moleDown = (array, arrayName, moles, mole) => {
  let coords = { y: 0 };
  let tween = new window.TWEEN.Tween(coords)
    .to({ y: coords.y }, 500)
    .onUpdate(() => {
      mole.y = coords.y;
    })
    .onComplete(() => {
      console.log(array);
      console.log(
        `REMOVE. START. Hole ${arrayName} length: ${array.length} Moles length: ${moles.children.length}`
      );
      array.pop();
      moles.removeChild(mole);

      console.log(
        `REMOVE. Hole ${arrayName} length: ${array.length} Moles length: ${moles.children.length}`
      );
    });
  tween.start();
};

let ifElseChoiceHole = (
  array,
  arrayName,
  moles,
  mole,
  moleXFirst,
  moleXSecond
) => {
  if (
    (mole.x === moleXFirst && array.length) ||
    (mole.x === moleXSecond && array.length)
  )
    moleDown(array, arrayName, moles, mole);
};

export let animationDown = (
  firstHole,
  secondHole,
  thirdHole,
  quarterHole,
  fiftyHole,
  moles
) => {
  moles.children.forEach((mole) => {
    ifElseChoiceHole(firstHole, "FIRST", moles, mole, 180, 190);
    ifElseChoiceHole(secondHole, "SECOND", moles, mole, 280, 290);
    ifElseChoiceHole(thirdHole, "THIRD", moles, mole, 380, 390);
    ifElseChoiceHole(quarterHole, "QUARTER", moles, mole, 480, 490);
    ifElseChoiceHole(fiftyHole, "FIFTY", moles, mole, 580, 590);
  });
};
