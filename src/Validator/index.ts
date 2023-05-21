import GameNumber from './GameNumber';
import GameCommand from './GameCommand';

const Validator = {
  checkGameNumbers(input: unknown) {
    new GameNumber(input);
  },

  checkGameCommand(input: unknown) {
    GameCommand.checkGameCommand(input);
  },
};

export default Validator;
