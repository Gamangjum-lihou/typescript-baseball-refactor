import { Console } from "@woowacourse/mission-utils";
import { GAME_MESSAGE } from "../Constants/Message";
import { checkCorrectCommand, checkCorrectNumber } from "../Util/Validation";

export const InputView = {
  readPlayerCommand(callback: Function) {
    Console.readLine(GAME_MESSAGE.inGame, (input: string) => {
      checkCorrectNumber(input);
      callback(input);
    });
  },

  readRetryCommand(callback: Function) {
    Console.readLine(GAME_MESSAGE.option, (input: string) => {
      checkCorrectCommand(input);
      callback(input);
    });
  },

  exit() {
    return Console.close();
  },
};
