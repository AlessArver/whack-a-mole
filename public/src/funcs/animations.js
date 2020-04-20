export let animationUp = (data, y, duration) => {
    let coords = { y: data.y };
    let tween = new window.TWEEN.Tween(coords)
        .to({ y: y }, duration)
        .onUpdate(function () {
        data.y = coords.y;
    });
    tween.start();
};
export let animationDown = (data, y, durationm) => {
    let coords = { y: data.y };
    let tween = new window.TWEEN.Tween(coords)
        .to({ y: y }, durationm)
        .onUpdate(function () {
        data.y = coords.y;
    });
    tween.start();
};
//# sourceMappingURL=animations.js.map