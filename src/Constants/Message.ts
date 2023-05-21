const ERROR_MESSAGE = Object.freeze({
  error: '[ERROR]',
  length_one: '1자릿수가 아닙니다.',
  length_three: '3자릿수가 아닙니다.',
  only_number: '숫자이외의 다른 문자가 존재합니다.',
  not_zero: '0을 포함시켜면 안됩니다. ',
  not_duplication: '서로 다른 숫자를 입력하세요',
  one_or_two: '숫자 1 또는 2만 입력이 가능합니다.',
});

const INPUT_MESSAGE = Object.freeze({
  new_line: '\n',
  game_number: '숫자를 입력해주세요',
  game_command: '게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요',
});

const OUTPUT_MESSAGE = Object.freeze({
  start: '숫자 야구 게임을 시작합니다.',
  success: '3개의 숫자를 모두 맞히셨습니다! 게임 종료',
  end: '잘못된 값을 입력하여 게임이 종료됩니다.',
  error: (name: string, message: string, cause: string) =>
    `${name} : ${message}\n[CAUSE] : ${cause}`,
  noting: '낫싱',
  ball_and_strike: (ball: number, strike: number) => `${ball}볼 ${strike}스트라이크`,
  strike: (strike: number) => `${strike}스트라이크`,
  ball: (ball: number) => `${ball}볼`,
});

export { ERROR_MESSAGE, INPUT_MESSAGE, OUTPUT_MESSAGE };
