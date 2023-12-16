import { Hint } from ".."

export function buildHint(): Hint {
  const numbers = ["3", "22"]

  return {
    text: "Passordet må inneholde nummeret til en av bussene som stopper på Gløshaugen-stoppet.",
    answers: numbers,
    specialFuncName: undefined,
    isObfuscated: true,
    obfuscationKey: undefined,
  }
}
