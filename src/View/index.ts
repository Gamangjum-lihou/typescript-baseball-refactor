import InputView from './InputView';
import OutputView from './OutputView';
import Validator from '../Validator';

type callback = (input: unknown) => void;

interface IError extends Error {
  cause: string;
}

const View = {
  printStart() {
    OutputView.printStart();
  },

  readGameNumbers(callback: callback) {
    InputView.readLine('숫자를 입력해주세요', callback);
  },

  printError(error: IError) {
    OutputView.printError(error);
    OutputView.printGameEnd();
  },
};

export default View;
