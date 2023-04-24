import InputView from './InputView';
import OutputView from './OutputView';

class View {
  #input;

  #output;

  constructor() {
    this.#input = InputView;
    this.#output = OutputView;
  }

  printStart() {
    this.#output.printStart();
    this.#inputFun();
  }

  #inputFun() {
    this.#input.readLine('숫자를 입력해주세요 : ', (answer) => console.log(answer));
  }
}

export default View;
