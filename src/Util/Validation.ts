import { ERROR_MESSAGE } from "../Constants/Message";

export function checkCorrectNumber(input: string) {
  const RegExp = /^[1-9]{3}$/;
  if (!RegExp.test(input)) throw new Error(`${ERROR_MESSAGE.invalidNumber}`);
}

export function checkCorrectCommand(input: string) {
  const RegExp = /^[1-2]{1}$/;
  if (!RegExp.test(input)) throw new Error(`${ERROR_MESSAGE.invalidCommand}`);
}
