import { Console } from '@woowacourse/mission-utils';
import { OUTPUT_MESSAGE } from '../Constants/Message';

interface IError extends Error {
  cause: string;
}

const OutputView = {
  printStart() {
    Console.print('숫자 야구 게임을 시작합니다.');
  },

  printError({ name, message, cause }: IError) {
    Console.print(OUTPUT_MESSAGE.error(name, message, cause));
  },

  printGameEnd() {
    Console.print(OUTPUT_MESSAGE.end);
    Console.close();
  },
};

export default OutputView;
