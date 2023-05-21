# Item 2 타입스크립트 설정 이해하기

```ts
"noImplicitAny": true /* Enable error reporting for expressions and declarations with an implied 'any' type. */,
"strictNullChecks": true

```

- 타입스크립트 설정은 커맨드 라인을 이용하기보다는 tsconfig.json을 사용하는게 좋다.
- 'undefined는 객체가 아닙니다' 같은 런타임 오류를 방지하기 위해 strictNullChecks를 설정하는 것이 좋다'
- 자바스크립트 프로젝트를 타입스크립트로 전환하는 게 아니라면 noImplicitAny를 설정하는 것이 좋다

# Item 38 any 타입은 가능한 한 좁은 범위에서만 사용하기

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

# Item 42 모르는 타입의 값에는 any 대신 unknown을 사용하기

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
