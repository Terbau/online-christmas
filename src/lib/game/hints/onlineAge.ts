import { Hint } from ".."

export function buildHint(): Hint {
  const ages = ["1985"]

  return {
    text: "Passordet må inneholde årstallet Online linjeforening ble stiftet.",
    answers: ages,
    specialFuncName: undefined,
    isObfuscated: true,
    obfuscationKey: undefined,
  }
}
