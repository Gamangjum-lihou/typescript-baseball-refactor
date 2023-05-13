import { Console } from "@woowacourse/mission-utils";
import { GAME_MESSAGE } from "../Constants/Message";

export const OutputView = {
  printStart() {
    Console.print(GAME_MESSAGE.start);
  },

  printStatus({ball, strike} : { ball : number, strike : number }) {
    if (strike && ball) Console.print(`${ball}볼 ${strike}스트라이크`);
    if (strike && !ball) Console.print(`${strike}스트라이크`);
    if (!strike && ball) Console.print(`${ball}볼`);
    if (!strike && !ball) Console.print('낫싱');
  },

  printClear() {
    Console.print(GAME_MESSAGE.end);
  },
};
