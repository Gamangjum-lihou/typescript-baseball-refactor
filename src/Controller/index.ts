import Validator from '../Validator';
import View from '../View';
import ReadError from '../Error/ReadError';
import ValidationError from '../Error/ValidationError';

const GAME_NUMBER = 'checkGameNumbers';

interface Validator {
  [key: string]: (input: unknown) => void;
}
interface IError extends Error {
  cause: string;
}

class BaseballController {
  #view: typeof View;

  #validator: Validator;

  constructor() {
    this.#view = View;
    this.#validator = Validator;
  }

  start() {
    this.#view.printStart();
    this.#inputGameNumbers();
  }

  #inputGameNumbers() {
    this.#view.readGameNumbers(this.#gameNumberHandler.bind(this));
  }

  #gameNumberHandler(input: unknown) {
    if (this.#hasErrorWhanCheckInput(input as string, GAME_NUMBER))
      return this.#inputGameNumbers();
  }

  #hasErrorWhanCheckInput(numbers: string, inputName: string) {
    try {
      this.#validator[inputName](numbers);
    } catch (error) {
      return this.#handleError(error as IError);
    }
  }

  #handleError(error: IError) {
    if (error instanceof ValidationError) {
      this.#view.printError(new ReadError('Validation Error', error));
      return true;
    }
    throw error;
  }
}

export default BaseballController;
