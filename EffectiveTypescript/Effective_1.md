# Effective TypeScript

### 1. 타입 단언보다는 타입 선언을 사용하기 (아이템 9)

```js
class Computer {
  #number: number[];

  constructor() {
    this.#number = this.generate();
    console.log(this.#number);
  }
  ...
}
```
```js
class Player {
  #numbers: number[];

  #ballCounts: { strike: number; ball: number; };

  storeNumber(numbers: number[]) {
    this.#numbers = numbers;
  }
  ...
}
```
- 타입 표시를 위한 방법으로는 타입 선언과 타입 단언 두 가지 방법이 존재하나, 타입 단언이 꼭 필요한 경우가 아니라면, 안전성 체크도 되는 타입 선언을 사용하는것이 좋기때문에 타입 선언을 사용하였습니다.
- 타입 단언은 타입 체커가 판단하는 타입보다 작성자인 내가 판단하는 타입이 더 정확할 때 의미가 있는데, 이 경우에는 해당되지 않는다고 생각했습니다.

### 2. 함수 표현식에 타입 적용하기 (아이템 12)

```js
readPlayerCommand(callback: Function) {
  Console.readLine(GAME_MESSAGE.inGame, (input: string) => {
    checkCorrectNumber(input);
    callback(input);
  });
}
```
- 해당 코드는 InputView 내부의 코드인데, 타입스크립트에서는 함수 문장과 함수 표현식을 구분합니다.
- 타입스크립트에서 권장되는 사항은 함수 표현식을 사용하는 것 입니다. 왜냐하면 함수 매개변수부터 반환값까지 전체를 함수 타입으로 사용하여 재사용 할 수 있기 때문입니다.
- 따라서 객체 내부 메소드로 선언한 readPlayerCommand, 그리고 이와 유사한 형태의 기능들을 모두 함수 표현식으로 바꾸어주는게 타입스크립트에서 권장하는 방법으로 보입니다.

### 3. 추론 가능한 타입을 사용해 장황한 코드 방지하기 (아이템 19)

```js
export const GAME_MESSAGE = Object.freeze({
  start: '숫자 야구 게임을 시작합니다.',
  inGame: '숫자를 입력해주세요 : ',
  end: '3개의 숫자를 모두 맞히셨습니다! 게임 종료',
  option: '게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.',
});

export const ERROR_MESSAGE = Object.freeze({
  invalidNumber: '[ERR] 유효하지 않은 입력입니다',
  invalidCommand: '[ERR] 유효하지 않은 종료/재시작 입력입니다',
});
```
- 타입 스크립트를 먼저 접한 개발자가 가장 많이 하는건 모든 코드에 타입 구문을 넣는 것이나, 타입 체커가 있기 때문에 모든 변수에 타입을 선언하는건 비생산적입니다.
- 타입 추론이 된다면 명시적 타입 구문은 필요하지 않습니다. 오히려 방해가 됩니다.
- 타입스크립트는 더 복잡한 객체 또한 추론할 수 있기때문에 타입을 장황하게 모두 달아주는 것 보단 추론 가능한 타입을 사용하는게 좋습니다.


