import { SimpleMole, StrongMole } from './../models/gameScene/mole';
class MoleView {
  constructor() {
    if (currentTime == 119) {
      console.log(
        `FIRST IF. Current time: ${currentTime}. RandomInt: ${randomIntSmall}`
      ),
        this.createAndDeleteMoleController();
    } else if (currentTime == 75) {
      console.log(
        `SECOND IF. Current time: ${currentTime}. RandomInt: ${randomIntAvegage}`
      );
      for (let i = 0; i <= 3; i++) {
        if (propably !== 0) {
          setTimeout(() => {
            this.createAndDeleteMoleController();
          }, 300 * i);
        }
      }
    } else if (currentTime == 0) {
      console.log(
        `THIRD IF. Current time: ${currentTime}. RandomInt: ${randomIntSmall}`
      );
      for (let i = 0; i <= 6; i++) {
        if (propably !== 0) {
          setTimeout(() => {
            createAndDeleteMoleController();
          }, 300 * i);
        }
      }
    }
  }
}