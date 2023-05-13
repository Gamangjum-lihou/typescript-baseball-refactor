class Player {
  #numbers: number[];

  #ballCounts: { strike: number; ball: number; };

  storeNumber(numbers: number[]) {
    this.#numbers = numbers;
  }

  storeBallCounts(ballCounts: { strike: number; ball: number; }) {
    this.#ballCounts = ballCounts;
  }

  getNumber() {
    return this.#numbers;
  }

  getBallCounts() {
    return this.#ballCounts;
  }
}

export default Player;
