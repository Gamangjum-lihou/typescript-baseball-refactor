import { Console } from '@woowacourse/mission-utils';

const InputView = {
  readLine(message: string, callback: (input: string) => void) {
    Console.readLine(message, callback);
  },
};

export default InputView;
