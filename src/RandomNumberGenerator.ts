import { Random } from '@woowacourse/mission-utils';
import GENERATOR from './Constants/System';

const RandomNumberGenerator = {
  generateRandomNumber(): number[] {
    const computer: Set<number> = new Set();
    while (computer.size < GENERATOR.pick_count) {
      const number = Random.pickNumberInRange(
        GENERATOR.start_number,
        GENERATOR.end_number
      );
      computer.add(number);
    }
    return [...computer];
  },
};

export default RandomNumberGenerator;
