import { Hole } from "./../models/gameScene/hole";

export class HoleView extends Hole {
  constructor() {
    super();
  }

  showHoles() {
    this.createHole(100);
    this.createHole(250);
    this.createHole(400);
    this.createHole(550);
    this.createHole(700);
  }
}
