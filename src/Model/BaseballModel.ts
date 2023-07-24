import RandomNumberGenerator from '../RandomNumberGenerator';

class BaseballModel {
  #computerNumbers: number[];

  #score: { ball: number; strike: number };

  constructor() {
    this.#computerNumbers = [];
    this.#score = { ball: 0, strike: 0 };
  }

  setGame() {
    this.#saveComputerNumbers();
    this.resetStatus();
  }

  #saveComputerNumbers() {
    this.#computerNumbers = RandomNumberGenerator.generateRandomNumber();
  }

  compareUserWithComputerNumbers(input: string) {
    input.split('').forEach((cur, index) => {
      const isStrike =
        this.#computerNumbers.includes(Number(cur)) &&
        this.#computerNumbers.indexOf(Number(cur)) === index;
      const isBall = this.#computerNumbers.includes(Number(cur));
      if (isStrike) this.#score.strike += 1;
      if (!isStrike && isBall) this.#score.ball += 1;
    });
    return this.#score;
  }

  isThreeStrikes() {
    const boolean = this.#score.strike === 3;
    this.resetStatus();
    return boolean;
  }

  resetStatus() {
    this.#score = { ball: 0, strike: 0 };
  }
}

export default BaseballModel;
