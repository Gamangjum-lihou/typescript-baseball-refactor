# [미션 - 숫자 야구](https://github.com/woowacourse-precourse/javascript-baseball/)

## 💎 Typescript로 미션 코드 작성하기

### 📌 코드
#### [✅ 강철원](https://github.com/Gamangjum-lihou/typescript-baseball-refactor/tree/ryan-dia)
#### [✅ 신현호](https://github.com/Gamangjum-lihou/typescript-baseball-refactor/tree/swarvy)

<br>

## ❗️ Typescript 조건 
- 외부라이브러리는 index.d.ts 파일을 만들어서 사용해야 한다.
- 모든 파일은 TS로 작성해야 한다.
- tsconfig.json 추가 설정 
  - noImplicitAny : true
  - strictNullChecks : true



---

<br>

# 📚 Effective Typescript 적용 과제

#### 📌 목차
#### [1️⃣ 신현호](#1%EF%B8%8F⃣-신현호-1)
#### [2️⃣ 강철원](#2%EF%B8%8F⃣-강철원-1)

<br>

## 1️⃣ 신현호

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


### 4. 한꺼번에 객체 생성하기 (아이템 23)

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

### 5. 공개 API에 등장하는 모든 타입을 익스포트하기 (아이템 47)

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

### 6. 모던 자바스크립트로 작성하기 (1) (아이템 58)

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

### 7. 모던 자바스크립트로 작성하기 (2) (아이템 58)

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

---

<br>

## 2️⃣ 강철원

### 1. 타입스크립트 설정 이해하기 (Item 2)

```ts
"noImplicitAny": true /* Enable error reporting for expressions and declarations with an implied 'any' type. */,
"strictNullChecks": true

```

- 타입스크립트 설정은 커맨드 라인을 이용하기보다는 tsconfig.json을 사용하는게 좋다.
- 'undefined는 객체가 아닙니다' 같은 런타임 오류를 방지하기 위해 strictNullChecks를 설정하는 것이 좋다'
- 자바스크립트 프로젝트를 타입스크립트로 전환하는 게 아니라면 noImplicitAny를 설정하는 것이 좋다

### 2. any 타입은 가능한 한 좁은 범위에서만 사용하기 (Item 38)

문맥상으로 x라는 변수가 동시에 Foo 타입과 Bar 타입에 할당 가능하다면, 오류를 제거하는 방법은 두 가지이다.

```ts
function f1() {
  const x: any = expressionReturningFoo(); //  이렇게 x
  processBar(x);
}

function f2() {
  const x = expressionReturningFoo();
  processBar(x as any); // 이게 더 좋음
  // why? 다른 코드에 영향 x
}
```

```ts
checkNumber(input: unknown) {
    if (/\D/.test(input as any)) {
      throw new ValidationError(ERROR_MESSAGE.only_number);
    }
  },

  checkLength(input: string) {
    if (input.length !== 1) {
      throw new ValidationError(ERROR_MESSAGE.length_one);
    }
  },
```

- 의도치 않은 타입 안전성의 손실을 피하기 위해 any의 사용 범위를 최소한으로 좁혀야 한다.
- 함수의 반환 타입이 any인 경우 타입 아전성이 나빠진다. 따라서 any 타입을 반환하면 절대 안된다.
- 강제로 타입 오류를 제거하는 방법은 any 말고 @ts-ignore 도 가능하다.

---

<br>

### 3. 모르는 타입의 값에는 any 대신 unknown을 사용하기 (Item 42)

- unknown은 any 대신 사용할 수 있는 안전한 타입이다. 어떠한 값이 있지만 그 타입을 알지 못하는 경우라면 unknown을 사용하면 된다.
- unknown을 사용하려면 타입 단언문 or 타입체크를 해야한다.

```ts

class GameNumber {
  #inputNumbers;

  constructor(input: unknown) {
    this.#inputNumbers = input;
    this.#checkInput();
  }

  #checkInput() {
    this.#checkNumber();
    this.#checkZero();
    this.#checkNumberOfDigits();
    this.#checkDuplication();
  }

  #checkNumber() {
    if (this.#isNotNumber()) throw new ValidationError(ERROR_MESSAGE.only_number);
    this.#inputNumbers = Number(this.#inputNumbers);
  }

  #isNotNumber() {
    return isNaN(Number(this.#inputNumbers));
  }

  #checkZero() {
    if (this.#haveZero()) throw new ValidationError(ERROR_MESSAGE.not_zero);
  }

  #haveZero() {
    if (typeof this.#inputNumbers === 'number') {
      return [...this.#inputNumbers.toString()].includes('0');
    }
  }

```

```ts
const GameCommand = {
  checkGameCommand(input: unknown) {
    this.checkNumber(input);
    this.checkLength(input as string);
    this.checkOneOrTwo(input as string);
  },

  checkNumber(input: unknown) {
    if (/\D/.test(input as any)) {
      throw new ValidationError(ERROR_MESSAGE.only_number);
    }
  },

  checkLength(input: string) {
    if (input.length !== 1) {
      throw new ValidationError(ERROR_MESSAGE.length_one);
    }
  },

  checkOneOrTwo(input: string) {
    if (!/1|2/.test(input)) {
      throw new ValidationError(ERROR_MESSAGE.one_or_two);
    }
  },
};

export default GameCommand;
```

- 추가 1
  가끔 unknwon 대신 제너릭 매개변수가 사용되는 경우도 있다.

```ts
function safeParseYAML(yaml: string): unknown {
  return parseYAML(yaml);
}

function safeParseYAML<T>(yaml: string): T {
  return parseYAML(yaml);
}
```

제너릭을 사용한 스타일은 타입 단언문과 달라 보이지만 기능적으로는 동일하다.
제너릭보다는 unknown을 반환하고 사용자가 직접 단언문을 사용하거나 원하는 대로 타입을 좁히도록 강제하는 것이 좋다.

- 추가 2

{} 타입도 존재하는데 이는 unknown 보다는 범위가 약간 좁다.

{} 타입은 null과 undefined를 제외한 모든 값을 포함한다.
{} 타입은 unknown 타입이 도입되기 전에는 {}가 더 일반적으로 사용되었다. 최근사용은 드물다.

```ts
let emptyObject: {} = 123; // 숫자
emptyObject = 'hello'; // 문자열
emptyObject = [1, 2, 3]; // 배열
```

```ts
let emptyObject: {} = null; // 오류 발생
let emptyObject: {} = undefined; // 오류 발생
```

---

<br>

### 4. 타입 연산과 제너릭 사용으로 반복 줄이기  (Item 14)
값의 형태에 해당하는 타입을 정의하고 싶을 때 따로 interface 만들 필요없이 typeof를 사용하면 된다. 

```ts

class BaseballController {
  #view: typeof View;

  #model: Model;

  #validator: Validator;

```
```ts

const View = {
  printStart() {
    OutputView.printStart();
  },

  readGameNumbers(callback: callback) {
    InputView.readLine(`${INPUT_MESSAGE.game_number}`, callback);
  },

  readGameCommand(callback: callback) {
    InputView.readLine(`${INPUT_MESSAGE.game_command}`, callback);
  },

  printHint(value: IprintHint) {
    OutputView.printHint(value);
  },

  printSuccess() {
    OutputView.printSuccess();
  },

  printError(error: IError) {
    OutputView.printError(error);
    OutputView.printGameEnd();
  },

  finishGame() {
    OutputView.finishGame();
  },
};

export default View;
```

<img width="424" alt="image" src="https://github.com/Gamangjum-lihou/typescript-baseball-refactor/assets/76567238/4a1a0d9c-61a1-442c-9e3b-5eb0461bc2fe">

---

<br>

### 5.타입 좁히기 (Item 22)
타입 좁히기는 타입스크립트가 넓은 타입으로부터 좁은 타입으로 진행하는 과정을 말한다. 


> before
```ts

type Ivalidator = typeof Validator & {
  [key:string] : (input:unknown) => void;
}


#validator: Ivalidator;



#hasErrorWhanCheckInput(numbers: string, inputName: string) {
    try {
      this.#validator[inputName](numbers);
    } catch (error) {
      return this.#handleError(error as ErrorWithCause);
    }
  }
  

```

>after
```ts

  #validator: typeof Validator;

  type inputName = 'checkGameNumbers' | 'checkGameCommand';
  
   #hasErrorWhanCheckInput(numbers: string, inputName: inputName) {
    try {
      this.#validator[inputName](numbers);
    } catch (error) {
      return this.#handleError(error as ErrorWithCause);
    }
  }

```




