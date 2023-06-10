import ValidationError from '../Error/ValidationError';
import { ERROR_MESSAGE } from '../Constants/Message';

const GameCommand = {
  checkGameCommand(input: unknown) {
    this.checkNumber(input);
    this.checkLength(input as string);
    this.checkOneOrTwo(input as string);
  },

  checkNumber(input: unknown) {
    if (/\D/.test(input as any)) {
      throw new ValidationError(ERROR_MESSAGE.only_number);
    }
  },

  checkLength(input: string) {
    if (input.length !== 1) {
      throw new ValidationError(ERROR_MESSAGE.length_one);
    }
  },

  checkOneOrTwo(input: string) {
    if (!/1|2/.test(input)) {
      throw new ValidationError(ERROR_MESSAGE.one_or_two);
    }
  },
};

export default GameCommand;
