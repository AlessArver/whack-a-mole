export let animationUp = (mole) => {
  let coords = { y: window.app.view.height - mole.height - 50 };
  let tween = new window.TWEEN.Tween(coords)
    .to({ y: coords.y }, 500)
    .onUpdate(function () {
      mole.y = coords.y;
    });
  tween.start();
};

let moleDown = (array, arrayName, moles, mole, isMoleDown) => {
  let coords = { y: window.app.view.height - mole.height + 80 };
  let tween = new window.TWEEN.Tween(coords)
    .to({ y: coords.y }, 500)
    .onUpdate(() => {
      mole.y = coords.y;
    })
    .onComplete(() => {
      array.pop();
      moles.removeChild(mole);

      if (isMoleDown === true) {
        window.hitMoleCount++
        window.missesCount--
      }

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
  moleXSecond,
  func,
  isMoleDown
) => {
  if (
    (mole.x === moleXFirst && array.length) ||
    (mole.x === moleXSecond && array.length)
  )
    func(array, arrayName, moles, mole, isMoleDown);
};
export const animationDown = (
  firstHole,
  secondHole,
  thirdHole,
  quarterHole,
  fiftyHole,
  moles,
  mole,
  isMoleDown
) => {
  if (isMoleDown === true && mole !== 0) {
    ifElseChoiceHole(firstHole, "FIRST", moles, mole, 180, 190, moleDown, isMoleDown);
    ifElseChoiceHole(secondHole, "SECOND", moles, mole, 280, 290, moleDown, isMoleDown);
    ifElseChoiceHole(thirdHole, "THIRD", moles, mole, 380, 390, moleDown, isMoleDown);
    ifElseChoiceHole(quarterHole, "QUARTER", moles, mole, 480, 490, moleDown, isMoleDown);
    ifElseChoiceHole(fiftyHole, "FIFTY", moles, mole, 580, 590, moleDown, isMoleDown);
  } else {
    moles.children.forEach((m) => {
      ifElseChoiceHole(firstHole, "FIRST", moles, m, 180, 190, moleDown, isMoleDown);
      ifElseChoiceHole(secondHole, "SECOND", moles, m, 280, 290, moleDown, isMoleDown);
      ifElseChoiceHole(thirdHole, "THIRD", moles, m, 380, 390, moleDown, isMoleDown);
      ifElseChoiceHole(quarterHole, "QUARTER", moles, m, 480, 490, moleDown, isMoleDown);
      ifElseChoiceHole(fiftyHole, "FIFTY", moles, m, 580, 590, moleDown, isMoleDown);
    });
  }
};