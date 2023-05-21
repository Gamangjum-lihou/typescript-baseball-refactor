import { Random } from '@woowacourse/mission-utils';
import GENERATOR from './Constants/System';

const RandomNumberGenerator = {
  generateRandomNumber(): number[] {
    const computer: number[] = [];
    while (computer.length < GENERATOR.pick_number_end) {
      const number = Random.pickNumberInRange(
        GENERATOR.start_number,
        GENERATOR.end_number
      );
      if (!computer.includes(number)) computer.push(number);
    }
    return computer;
  },
};

export default RandomNumberGenerator;
