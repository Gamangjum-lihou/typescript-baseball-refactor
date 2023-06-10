import InputView from './InputView';
import OutputView from './OutputView';
import { INPUT_MESSAGE } from '../Constants/Message';

type callback = (input: unknown) => void;

interface IError extends Error {
  cause: string;
}

interface IprintHint {
  ball: number;
  strike: number;
}

const View = {
  printStart() {
    OutputView.printStart();
  },

  readGameNumbers(callback: callback) {
    InputView.readLine(`${INPUT_MESSAGE.game_number}`, callback);
  },

  readGameCommand(callback: callback) {
    InputView.readLine(`${INPUT_MESSAGE.game_command}`, callback);
  },

  printHint(value: IprintHint) {
    OutputView.printHint(value);
  },

  printSuccess() {
    OutputView.printSuccess();
  },

  printError(error: IError) {
    OutputView.printError(error);
    OutputView.printGameEnd();
  },

  finishGame() {
    OutputView.finishGame();
  },
};

export default View;
