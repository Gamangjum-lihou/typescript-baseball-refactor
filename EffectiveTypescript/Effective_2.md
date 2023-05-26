# Effective TypeScript

### 1. 한꺼번에 객체 생성하기 (아이템 23)

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
- 객체를 생성할 떄는 속성을 하나씩 추가하기보다는 여러 속성을 포함해서 한꺼번에 생성해야 타입 추론에 유리합니다.
- 안전한 타입으로 속성을 추가하려면 객체 전개 `({...a, ...b})`를 사용하면 됩니다.
- 조건부로 속성을 추가하고싶다면 ? 를 사용합시다.

### 2. 공개 API에 등장하는 모든 타입을 익스포트하기 (아이템 47)

```js
declare module '@woowacourse/mission-utils' {
  class Console {
    static readLine(input: string, callback: Function): void;
    static print(message: string): void;
    static close(): void;
  }

  class Random {
    static pickNumberInRange(start: number, end: number): number;
  }
}
```

- 타입스크립트를 사용하다보면 서드파티의 모듈에서 익스포트되지 않은 타입 정보가 필요한 경우가 생깁니다
- 불필요한 any를 피하기 위해서라도 타입을 명시적으로 작성합시다.
- 공개 api 매개변수에 놓이는 순간 탕팁은 노출되므로 숨기려하지말고 라이브러리 사용자를 위해 명시적으로 타입을 익스포트하는것이 좋습니다.

### 3. 모던 자바스크립트로 작성하기 (1) (아이템 58)

```js
// 클래스
class BaseBallController {
  #computer: Computer;

  #player: Player;

  constructor() {
    this.#player = new Player();
  }

  start = () => {
    OutputView.printStart();
    this.#computer = new Computer();
    this.getPlayerCommand();
  };
  
  ...
}
```
```js
// import, export
import { Random } from "@woowacourse/mission-utils";
export default Computer;
```
- 타입스크립트 컴파일러를 자바스크립트 트랜스파일러로 사용할 수 있습니다.
- 타입스크립트는 자바스크립트의 상위집합이기때문에, 최신 버전의 자바스크립트 코드를 옛날 버전의 자바스크립트 코드로 변환할 수 있습니다.
- 따라서 모던 자바스크립트 문법을 사용하는것을 권장합니다.
- ECMAScript의 모듈, 프로토타입 대신 클래스, var 대신 let/const 등과 같은 요소들이 있습니다.

### 4. 모던 자바스크립트로 작성하기 (2) (아이템 58)

```js
// 화살표 함수
start = () => {
  OutputView.printStart();
  this.#computer = new Computer();
  this.getPlayerCommand();
};

getPlayerCommand = () => {
  InputView.readPlayerCommand(this.sendPlayerCommand);
};

sendPlayerCommand = (input: string) => {
  this.#player.storeNumber(input.split('').map(Number));
  this.playBall();
};
```
- this 키워드는 일반적인 변수들과는 다른 스코프 규칙을 가지기때문에, 자바스크립트에서 가장 어려운 개념 중 하나입니다.
- 화살표 함수를 사용하면 상위 스코프의 this를 유지할 수 있습니다.
- 일반 함수보다 화살표 함수가 더 직관적이며 코드도 간결해지기 때문에 가급적 화살표 함수를 사용하는 것이 좋습니다.






