import { Hint } from ".."

export function buildHint(): Hint {
  const rooms = [
    "bråkerommet",
    "utsikten",
    "kontoret",
    "tihlderommet",
    "tihlde",
    "tihlde-rommet",
    "webtekrommet",
    "webtek",
    "webtek-rommet",
    "grupperom",
    "a4-100",
    "a4100",
    "a4-156",
    "a4156",
    "a4-112",
    "a4112",
  ]

  return {
    text: "Passordet må inneholde navnet (slangnavnet) til et rom eller sted du kan sitte på A4.",
    answers: rooms,
    specialFuncName: undefined,
    isObfuscated: true,
    obfuscationKey: undefined,
  }
}
