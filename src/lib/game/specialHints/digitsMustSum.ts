import { Hint } from "../index"

const DIGITS_SUM = 35

export function buildHint(): Hint {
  return {
    text: `Sifrene i passordet må summere seg til ${DIGITS_SUM}.`,
    answers: [],
    specialFuncName: "digitsMustSum",
    isObfuscated: false,
    obfuscationKey: undefined,
  }
}

export function validate(answer: string): boolean {
  const digits = answer.match(/\d/g)?.map((digit) => parseInt(digit)) ?? []
  const sum = digits.reduce((a, b) => a + b, 0)

  return sum === DIGITS_SUM
}
