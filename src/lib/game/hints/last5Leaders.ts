import { Hint } from ".."

export function buildHint(): Hint {
  const leaders = ["carolina", "anders", "sindre", "mathias", "august"]

  return {
    text: "Passordet må inneholde fornavnet til en av Online's fem siste ledere.",
    answers: leaders,
    specialFuncName: undefined,
    isObfuscated: true,
    obfuscationKey: undefined,
  }
}
