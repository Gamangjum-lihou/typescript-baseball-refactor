import Validator from '../Validator';
import View from '../View';
import Model from '../Model/BaseballModel';
import ReadError from '../Error/ReadError';
import ValidationError from '../Error/ValidationError';

const RESTART = '1';
const GAME_NUMBER = 'checkGameNumbers';
const GAME_COMMAND = 'checkGameCommand';

interface Validator {
  [key: string]: (input: unknown) => void;
}
interface ErrorWithCause extends Error {
  cause: string;
}

class BaseballController {
  #view: typeof View;

  #model: Model;

  #validator: Validator;

  constructor() {
    this.#view = View;
    this.#model = new Model();
    this.#validator = Validator;
  }

  start() {
    this.#view.printStart();
    this.#setGame();
  }

  #setGame() {
    this.#model.setGame();
    return this.#inputGameNumbers();
  }

  #inputGameNumbers() {
    this.#view.readGameNumbers(this.#gameNumberHandler.bind(this));
  }

  #gameNumberHandler(input: unknown) {
    if (this.#hasErrorWhanCheckInput(input as string, GAME_NUMBER))
      return this.#inputGameNumbers();
    this.#view.printHint(this.#model.compareUserWithComputerNumbers(input as string));
    if (this.#model.isThreeStrikes()) return this.#threeStrikes();
    this.#inputGameNumbers();
  }

  #threeStrikes() {
    this.#view.printSuccess();
    this.#inputGameCommand();
  }

  #inputGameCommand() {
    this.#view.readGameCommand(this.#gameCommandHandler.bind(this));
  }

  #gameCommandHandler(input: unknown) {
    if (this.#hasErrorWhanCheckInput(input as string, GAME_COMMAND))
      return this.#inputGameCommand();
    this.#restartOrFinish(input as string);
  }

  #restartOrFinish(number: string) {
    if (number === RESTART) return this.#setGame();
    return this.#view.finishGame();
  }

  #hasErrorWhanCheckInput(numbers: string, inputName: string) {
    try {
      this.#validator[inputName](numbers);
    } catch (error) {
      return this.#handleError(error as ErrorWithCause);
    }
  }

  #handleError(error: ErrorWithCause) {
    if (error instanceof ValidationError) {
      this.#view.printError(new ReadError('Validation Error', error));
      return true;
    }
    throw error;
  }
}

export default BaseballController;
