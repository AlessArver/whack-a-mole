export let animationUp = (data, y, duration) => {
  let coords = { y: data.y };
  let tween = new window.TWEEN.Tween(coords)
    .to({ y: y }, duration)
    .onUpdate(function () {
      data.y = coords.y;
    });
  tween.start();
};

// window.app.view.height - firstMole.height + 100

let moleDown = (holes, holeName, getChildAt, duration) => { 
  let coords = {
    y: (window.app.view.height - holes.getChildAt(getChildAt).getChildAt(0).height ) + 50
  };
  let tween = new window.TWEEN.Tween(coords)
    .to({ y: coords.y }, duration)
    .onUpdate( () => {
      holes.getChildAt(getChildAt).getChildAt(0).y = coords.y;
    })
    .onComplete(() => {
      holes
        .getChildAt(getChildAt)
        .removeChild(holes.getChildAt(getChildAt).getChildAt(0));
      console.log(
        `REMOVE. ${holeName} length: ${
          holes.getChildAt(getChildAt).children.length
        }`
      );
    });
  tween.start();
};

export let animationDown = (holes, duration) => {
  if (holes.getChildAt(0).children.length !== 0) {
    moleDown(holes, "First", 0, duration);
  }
  if (holes.getChildAt(1).children.length !== 0) {
    moleDown(holes, "Second", 1, duration);
  }
  if (holes.getChildAt(2).children.length !== 0) {
    moleDown(holes, "Third", 2, duration);
  }
  if (holes.getChildAt(3).children.length !== 0) {
    moleDown(holes, "Quarter", 3, duration);
  }
  if (holes.getChildAt(4).children.length !== 0) {
    moleDown(holes, "Fifty", 4, duration);
  }
  // let coords = { y: data.y };
  // let tween = new window.TWEEN.Tween(coords)
  //   .to({ y: y }, durationm)
  //   .onUpdate(function () {
  //     data.y = coords.y;
  //   });
  // tween.start();
};
