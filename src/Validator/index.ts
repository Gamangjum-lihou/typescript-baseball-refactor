import GameNumber from './GameNumber';

const Validator = {
  checkGameNumbers(input: unknown) {
    new GameNumber(input);
  },
};

export default Validator;
