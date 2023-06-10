import { ERROR_MESSAGE } from '../Constants/Message';
import ValidationError from '../Error/ValidationError';

class GameNumber {
  #inputNumbers;

  constructor(input: unknown) {
    this.#inputNumbers = input;
    this.#checkInput();
  }

  #checkInput() {
    this.#checkNumber();
    this.#checkZero();
    this.#checkNumberOfDigits();
    this.#checkDuplication();
  }

  #checkNumber() {
    if (this.#isNotNumber()) throw new ValidationError(ERROR_MESSAGE.only_number);
    this.#inputNumbers = Number(this.#inputNumbers);
  }

  #isNotNumber() {
    return isNaN(Number(this.#inputNumbers));
  }

  #checkZero() {
    if (this.#haveZero()) throw new ValidationError(ERROR_MESSAGE.not_zero);
  }

  #haveZero() {
    if (typeof this.#inputNumbers === 'number') {
      return [...this.#inputNumbers.toString()].includes('0');
    }
  }

  #checkNumberOfDigits() {
    if (this.#isNotThreeDigitNumber())
      throw new ValidationError(ERROR_MESSAGE.length_three);
  }

  #isNotThreeDigitNumber() {
    if (typeof this.#inputNumbers === 'number') {
      return this.#inputNumbers.toString().length !== 3;
    }
  }

  #checkDuplication() {
    if (this.#isDuplcation()) throw new ValidationError(ERROR_MESSAGE.not_duplication);
  }

  #isDuplcation() {
    if (typeof this.#inputNumbers === 'number') {
      const set = new Set(this.#inputNumbers.toString());
      return this.#inputNumbers.toString().length !== set.size;
    }
  }
}

export default GameNumber;
