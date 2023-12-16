import { Hint } from "../index"

export function buildHint(): Hint {
  const members = [
    "birk",
    "duvara",
    "eeman",
    "emil",
    "erik",
    "farhad",
    "ferdinand",
    "frida",
    "hallvard",
    "ida",
    "iver",
    "jørgen",
    "julie",
    "knut",
    "lotte",
    "markus",
    "martine",
    "mikkel",
    "monika",
    "sebastian",
    "sigbjørn",
    "silje",
    "silviu",
    "thea",
    "tone",
    "tone-lill",
  ]

  return {
    text: "Passordet må inneholde fornavnet til en Trikommer.",
    answers: members,
    specialFuncName: undefined,
    isObfuscated: true,
    obfuscationKey: undefined,
  }
}
