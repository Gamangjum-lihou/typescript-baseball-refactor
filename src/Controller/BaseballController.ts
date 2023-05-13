import { OutputView } from "../View/OutputView";
import { InputView } from "../View/InputView";
import { isClear } from "../Util/checkGameOption";
import { getBallCounts } from "../Util/getBallCounts";
import Computer from "../Model/Computer";
import Player from "../Model/Player";

const TYPE = {
  restart: '1',
  quit: '2',
};

class BaseBallController {
  #computer: Computer;

  #player: Player;

  constructor() {
    this.#player = new Player();
  }

  start = () => {
    OutputView.printStart();
    this.#computer = new Computer();
    this.getPlayerCommand();
  };

  getPlayerCommand = () => {
    InputView.readPlayerCommand(this.sendPlayerCommand);
  };

  sendPlayerCommand = (input: string) => {
    this.#player.storeNumber(input.split('').map(Number));
    this.playBall();
  };

  playBall = () => {
    const computer = this.#computer.getNumber();
    const player = this.#player.getNumber();
    this.#player.storeBallCounts(getBallCounts(computer, player));
    this.printBallCount();
  };

  printBallCount = () => {
    OutputView.printStatus(this.#player.getBallCounts());
    this.gameOption();
  };

  gameOption = () => {
    const { strike } = this.#player.getBallCounts();
    if (isClear(strike)) {
      OutputView.printClear();
      this.getRetryCommand();
    }
    if (!isClear(strike)) this.getPlayerCommand();
  };

  getRetryCommand = () => {
    InputView.readRetryCommand(this.retry);
  };

  retry = (input: string) => {
    if (input === TYPE.restart) this.start();
    if (input === TYPE.quit) InputView.exit();
  };
}

export default BaseBallController;
