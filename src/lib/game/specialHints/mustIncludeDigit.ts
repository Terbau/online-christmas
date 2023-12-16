import { Hint } from "../index"

export function buildHint(): Hint {
  return {
    text: `Passordet må inneholde minst ett tall.`,
    answers: [],
    specialFuncName: "mustIncludeDigit",
    isObfuscated: false,
    obfuscationKey: undefined,
  }
}

export function validate(answer: string): boolean {
  return /\d/.test(answer)
}
