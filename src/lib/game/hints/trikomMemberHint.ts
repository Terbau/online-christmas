import { Hint } from "../index"

export function buildHint(): Hint {
  const members = [
    "sebastian",
    "ida",
    "markus",
    "tone",
    "eeman",
    "julie",
    "frida",
    "duvara",
    "lotte",
    "martine",
    "farhad",
  ]

  return {
    text: "Passordet må inneholde fornavnet til en Trikommer.",
    answers: members,
    specialFuncName: undefined,
    isObfuscated: true,
    obfuscationKey: undefined,
  }
}
