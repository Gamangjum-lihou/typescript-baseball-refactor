declare module '@woowacourse/mission-utils' {
  class Console {
    static readLine(query: string, callback: Function): void;
    static close(): void;
    static print(message: string): void;
  }

  class Random {
    static pickNumberInRange(start: number, end: number): number;
  }
}
