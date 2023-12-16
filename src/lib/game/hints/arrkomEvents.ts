import { Hint } from ".."

export function buildHint(): Hint {
  const events = [
    "eksamensfest",
    "eksamensfest for 1. klasse!!",
    "badstue",
    "badstue på havet",
    "julebord",
    "julebord 2023",
    "pirbadet",
    "quiz",
    "quiz!!",
    "vors før oktoberfest",
    "vors før oktoberfest uka 2023!",
    "paint n sip",
    "blåtur",
    "blåtur 2023",
    "immball",
    "immeball",
    "immatrikuleringsball",
    "immatrikuleringsball 2023",
  ]

  return {
    text: "Passordet må inneholde navnet på et arrangement Arrkom har arrangert dette semesteret.",
    answers: events,
    specialFuncName: undefined,
    isObfuscated: true,
    obfuscationKey: undefined,
  }
}
