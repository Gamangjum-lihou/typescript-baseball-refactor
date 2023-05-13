import { Random } from "@woowacourse/mission-utils";

class Computer {
  #number : number[];

  constructor() {
    this.#number = this.generate();
    console.log(this.#number);
  }

  generate() {
    const computer : number[] = [];
    while (computer.length < 3) {
      const number = Random.pickNumberInRange(1, 9);
      if (!computer.includes(number)) {
        computer.push(number);
      }
    }
    return computer;
  }

  getNumber() {
    return this.#number;
  }
}

export default Computer;
