import { MoleView } from "./../views/mole";
import { Mole } from "./../models/gameScene/mole";

export class MoleController {
  constructor(private moleView: MoleView) {
    this.moleView.showMoles(this.handleShowMole);
  }

  handleShowMole(moles: Mole[]) {
      this.moleView.showMoles(moles)
  }
}
